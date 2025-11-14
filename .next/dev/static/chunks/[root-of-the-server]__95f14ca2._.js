(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/gemini-next-app/views/HomeComponent.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "app": "HomeComponent-module__3SabYG__app",
  "check": "HomeComponent-module__3SabYG__check",
  "content1": "HomeComponent-module__3SabYG__content1",
  "content2": "HomeComponent-module__3SabYG__content2",
  "content3": "HomeComponent-module__3SabYG__content3",
  "header": "HomeComponent-module__3SabYG__header",
  "sidebar": "HomeComponent-module__3SabYG__sidebar",
});
}),
"[project]/gemini-next-app/views/partials/card.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "add": "card-module__1QO8NG__add",
  "bottomSection": "card-module__1QO8NG__bottomSection",
  "card": "card-module__1QO8NG__card",
  "cardParent": "card-module__1QO8NG__cardParent",
  "content": "card-module__1QO8NG__content",
  "delete": "card-module__1QO8NG__delete",
  "edit": "card-module__1QO8NG__edit",
  "icons": "card-module__1QO8NG__icons",
  "input": "card-module__1QO8NG__input",
  "my-button": "card-module__1QO8NG__my-button",
  "select": "card-module__1QO8NG__select",
});
}),
"[project]/gemini-next-app/views/partials/card.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Add.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function Card(props) {
    _s();
    const [isExpanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function expand() {
        setExpanded(true);
    }
    function collapse() {
        setExpanded(false);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Card.useEffect": ()=>{
            function handleClickOutside(event) {
                if (cardRef.current && !cardRef.current.contains(event.target)) {
                    collapse();
                }
            }
            //don't quite understand why the event listener below was added and 
            //then removed but it seems like a crucial logic to prevent errors
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "Card.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["Card.useEffect"];
        }
    }["Card.useEffect"], [
        cardRef
    ]);
    const [card, setCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        task: "",
        description: "",
        due_date: "",
        priority: "",
        columnName: props.columnName
    });
    function submitForm() {
        props.onAdd(card);
        setCard({
            task: "",
            description: "",
            due_date: "",
            priority: "",
            columnName: props.columnName
        });
        collapse();
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setCard((prevCard)=>{
            const newCard = {
                ...prevCard,
                [name]: value
            };
            console.log(newCard);
            return newCard;
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: isExpanded ? "300px" : ''
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                    type: "text",
                    name: "task",
                    value: card.task,
                    onChange: handleChange,
                    onClick: expand,
                    placeholder: "Add a task",
                    style: {
                        background: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                    lineNumber: 73,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                    type: "text",
                    name: "description",
                    value: card.description,
                    onChange: handleChange,
                    placeholder: "Add a description",
                    style: {
                        display: isExpanded ? '' : "none",
                        background: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                    lineNumber: 83,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].date),
                            style: {
                                display: isExpanded ? '' : "none"
                            },
                            type: "date",
                            onChange: handleChange,
                            value: card.due_date,
                            name: "due_date"
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].priority),
                            style: {
                                display: isExpanded ? '' : "none"
                            },
                            name: "priority",
                            value: card.priority,
                            onChange: handleChange,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    disabled: true,
                                    hidden: true,
                                    children: "Priority"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 104,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "high",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 107,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                            lineNumber: 99,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                    lineNumber: 91,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].icons}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"]['my-button']),
                        style: {
                            display: isExpanded ? '' : "none"
                        },
                        onClick: submitForm,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            style: {
                                color: 'white'
                            }
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                            lineNumber: 115,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                        lineNumber: 114,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                    lineNumber: 113,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
            lineNumber: 72,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
        lineNumber: 71,
        columnNumber: 13
    }, this);
}
_s(Card, "ECEsnFUT3WUft3ieJr9vRuNaW1k=");
_c = Card;
const __TURBOPACK__default__export__ = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gemini-next-app/views/partials/displayCard.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Edit.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Delete.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function DisplayCard(props) {
    _s();
    const { id, task, description } = props; // Destructure props for clarity
    // State to track the touch position and whether the card is currently being dragged
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [offset, setOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    }); // Stores current transform offset
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function editForm() {
        props.onEdit(props);
    }
    function deleteForm() {
        props.onDelete(props.id);
    }
    const handleDragStart = (e)=>{
        // CRITICAL: Store the task ID so the drop target knows which task to move
        e.dataTransfer.setData("taskId", props.id.toString());
    };
    // --- TOUCH DRAG HANDLERS ---
    // 1. Starts the drag
    const handleTouchStart = (e)=>{
        e.stopPropagation();
        sessionStorage.setItem("draggingTaskId", props.id.toString());
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        setDragging(true);
        setOffset({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        });
        // Add visual feedback
        e.currentTarget.style.opacity = '0.8';
        e.currentTarget.style.zIndex = '1000';
    };
    // 2. Handles movement (Attached via useEffect)
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DisplayCard.useCallback[handleTouchMove]": (e)=>{
            if (!cardRef.current || !dragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            const newX = touch.clientX - offset.x;
            const newY = touch.clientY - offset.y;
            cardRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    }["DisplayCard.useCallback[handleTouchMove]"], [
        dragging,
        offset
    ]);
    // 3. Ends the drag
    const handleTouchEnd = (e)=>{
        setDragging(false);
        sessionStorage.removeItem("draggingTaskId");
        const cardElement = e.currentTarget;
        // Reset visual state
        cardElement.style.opacity = '1';
        cardElement.style.zIndex = 'auto';
        cardElement.style.transform = 'none';
    };
    // --- EFFECT: Manual Attachment of touchmove Listener ---
    // This attaches the listener directly to the DOM with { passive: false }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DisplayCard.useEffect": ()=>{
            const element = cardRef.current;
            // TypeScript now knows 'element' is an HTMLDivElement
            if (element) {
                // Attach the listener explicitly using addEventListener
                element.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
            }
            // Cleanup function to remove the listener when the component unmounts
            return ({
                "DisplayCard.useEffect": ()=>{
                    if (element) {
                        element.removeEventListener('touchmove', handleTouchMove);
                    }
                }
            })["DisplayCard.useEffect"];
        }
    }["DisplayCard.useEffect"], [
        handleTouchMove
    ]); // Re-attach only if handleTouchMove changes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardParent,
        draggable: "true",
        onDragStart: handleDragStart,
        onTouchStart: handleTouchStart,
        // 💡 FIX 2: onTouchMove REMOVED from JSX. It is attached via useEffect.
        onTouchEnd: handleTouchEnd,
        // 💡 FIX 3: Apply temporary positioning style for visual dragging
        style: dragging ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: cardRef.current ? cardRef.current.offsetWidth : '300px',
            height: cardRef.current ? cardRef.current.offsetHeight : '300px'
        } : {
            height: "300px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: props.task
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 111,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: props.description
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Due: ",
                                props.due_date && new Date(props.due_date).toDateString() || 'N/A'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Priority: ",
                                props.priority
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 115,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 113,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].icons,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].edit, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"]['my-button']),
                            onClick: editForm,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                                lineNumber: 119,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 118,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].delete, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"]['my-button']),
                            onClick: deleteForm,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 121,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 117,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
            lineNumber: 110,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
        lineNumber: 98,
        columnNumber: 9
    }, this);
}
_s(DisplayCard, "CyIJ2hlRsKZ+I4IMaNEuYIUjuuw=");
_c = DisplayCard;
const __TURBOPACK__default__export__ = DisplayCard;
var _c;
__turbopack_context__.k.register(_c, "DisplayCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gemini-next-app/views/partials/editCard.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Add.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function EditCard(props) {
    _s();
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function cancelEdit() {
        props.onCancel();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditCard.useEffect": ()=>{
            function handleClickOutside(event) {
                if (cardRef.current && !cardRef.current.contains(event.target)) {
                    cancelEdit();
                }
            }
            //don't quite understand why the event listener below was added and 
            //then removed but it seems like a crucial logic to prevent errors
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "EditCard.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["EditCard.useEffect"];
        }
    }["EditCard.useEffect"], [
        cardRef
    ]);
    const [eCard, setCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        id: props.id,
        task: props.task,
        description: props.description,
        due_date: props.due_date,
        priority: props.priority,
        columnName: props.columnName
    });
    // 💡 CRITICAL FIX: Sync local state when props change
    // This runs when the task ID changes (e.g., if you switch to edit a different task)
    // and ensures the form is always initialized with the correct, fresh data.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditCard.useEffect": ()=>{
            setCard({
                id: props.id,
                task: props.task,
                description: props.description,
                due_date: props.due_date,
                priority: props.priority,
                columnName: props.columnName
            });
        }
    }["EditCard.useEffect"], [
        props.id,
        props.task,
        props.description,
        props.due_date,
        props.priority,
        props.columnName
    ]);
    // Added all data props to the dependency array to ensure the form updates if the 
    // parent component happens to send new data without changing the ID (less common, but safe).
    function submitForm() {
        props.onSave(eCard);
        cancelEdit();
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setCard((prevCard)=>{
            const newCard = {
                ...prevCard,
                [name]: value
            };
            console.log(newCard);
            return newCard;
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: "300px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                    type: "text",
                    name: "task",
                    value: eCard.task,
                    onChange: handleChange,
                    placeholder: "Add a task",
                    style: {
                        background: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                    lineNumber: 78,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                    type: "text",
                    name: "description",
                    value: eCard.description,
                    onChange: handleChange,
                    placeholder: "Add a description",
                    style: {
                        background: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                    lineNumber: 87,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].date),
                            type: "date",
                            onChange: handleChange,
                            value: eCard.due_date,
                            name: "due_date"
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].priority),
                            name: "priority",
                            value: eCard.priority,
                            onChange: handleChange,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    disabled: true,
                                    hidden: true,
                                    children: "Priority"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 110,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "high",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                            lineNumber: 103,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                    lineNumber: 95,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].icons}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"]['my-button']),
                        onClick: submitForm,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            style: {
                                color: 'white'
                            }
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                            lineNumber: 119,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                        lineNumber: 118,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                    lineNumber: 117,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
            lineNumber: 77,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
        lineNumber: 76,
        columnNumber: 13
    }, this);
}
_s(EditCard, "6+2CZpK5WjUj/oetPmXVyjcKqkM=");
_c = EditCard;
const __TURBOPACK__default__export__ = EditCard;
var _c;
__turbopack_context__.k.register(_c, "EditCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gemini-next-app/views/content.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Content
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.tsx [client] (ecmascript)"); //one way of setting path
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/displayCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$editCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/editCard.tsx [client] (ecmascript)"); //another way of setting path
;
;
;
;
;
function Content(props) {
    const { columnName, tasks, addTask, handleSaveChanges, editingTaskId, onMoveTask, setEditingTaskId, deleteTask } = props;
    // Filter the global task list to show only tasks belonging to this column
    const columnTasks = tasks.filter((task)=>task.columnname === columnName);
    const handleStartEditing = (taskData)=>{
        setEditingTaskId(taskData.id);
    };
    const handleStopEditing = ()=>{
        setEditingTaskId(null);
    };
    // --- DRAG AND DROP HANDLERS ---
    // 1. Required to allow dropping (prevents default browser behavior)
    const handleDragOver = (e)=>{
        e.preventDefault();
    };
    // 2. Handles the drop event
    const handleDrop = (e)=>{
        e.preventDefault();
        // Retrieve the task ID stored in the DisplayCard's onDragStart handler
        const taskIdString = e.dataTransfer.getData("taskId");
        const taskId = parseInt(taskIdString);
        if (taskId) {
            // Call the parent function to update the task's column in the database
            onMoveTask(taskId, columnName);
        }
    };
    // 3. Optional: Used for visual feedback when drag enters the drop zone
    const handleDragLeave = (e)=>{};
    //--TOUCH DROP HANDLER (MOBILE)--//
    const handleTouchDrop = (e)=>{
        // Retrieve the task ID from the global window data (set in DisplayCard's touch logic)
        const taskIdString = sessionStorage.getItem("draggingTaskId");
        const taskId = parseInt(taskIdString || '0');
        // --- DEBUGGING LINES ADDED HERE ---
        console.log(`[TOUCH DROP] Target Column: ${columnName}`);
        console.log(`[TOUCH DROP] Retrieved Task ID: ${taskId}`);
        // --- END DEBUGGING LINES ---
        // Clear the global storage immediately
        sessionStorage.removeItem("draggingTaskId");
        if (taskId) {
            // Drop confirmed: call the parent function to update the task
            onMoveTask(taskId, columnName);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: props.className,
        // 💡 Add Drop Zone Handlers to the column container
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        onDragLeave: handleDragLeave,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content,
            children: [
                columnTasks.map((task)=>editingTaskId === task.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$editCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        id: task.id,
                        task: task.task,
                        description: task.description,
                        due_date: task.due_date,
                        priority: task.priority,
                        columnName: task.columnname,
                        onSave: handleSaveChanges,
                        onCancel: handleStopEditing
                    }, task.id, false, {
                        fileName: "[project]/gemini-next-app/views/content.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        id: task.id,
                        task: task.task,
                        description: task.description,
                        due_date: task.due_date,
                        priority: task.priority,
                        columnName: task.columnname,
                        onEdit: handleStartEditing,
                        onDelete: deleteTask,
                        onTouchEnd: handleTouchDrop
                    }, task.id, false, {
                        fileName: "[project]/gemini-next-app/views/content.tsx",
                        lineNumber: 99,
                        columnNumber: 21
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    onAdd: addTask,
                    columnName: columnName
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/content.tsx",
                    lineNumber: 114,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/content.tsx",
            lineNumber: 84,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/content.tsx",
        lineNumber: 78,
        columnNumber: 9
    }, this);
}
_c = Content;
var _c;
__turbopack_context__.k.register(_c, "Content");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gemini-next-app/views/HomeComponent.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/HomeComponent.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/content.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function App() {
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [refetchToggle, setRefetchToggle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    //--GET ROUTE--//
    const fetchTasks = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            fetchTasks();
        }
    }["App.useEffect"], [
        refetchToggle
    ]); // 💡 Now it runs on initial load AND when refetchToggle changes
    //--POST ROUTE--//
    //the task with the type: "any" is coming from the Card component when the form is submitted where it was changed from props.onAdd(card);
    const addTask = async (task)=>{
        const columnname = task.columnName || 'To Do'; // Default column for new tasks
        const addTaskData = [
            task.task,
            task.description,
            task.due_date,
            columnname,
            task.priority
        ];
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/api/tasks', addTaskData);
            setTasks([
                ...tasks,
                response.data
            ]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    const [editingTaskId, setEditingTaskId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // This function will be called when the user clicks the "Edit" button
    const handleStartEditing = (dCard)=>{
        setEditingTaskId(dCard.id); //whatever you name it above influences it eg task above would be = task.id
    };
    // This function will be called to exit edit mode (e.g., on cancel or save)
    const handleStopEditing = ()=>{
        setEditingTaskId(null);
    };
    //--EDIT ROUTE--// 
    // You'll also need a function to handle the actual save logic
    const handleSaveChanges = async (eCard)=>{
        // ... logic to update the task in your main 'tasks' array
        const updateTaskData = {
            task: eCard.task,
            description: eCard.description,
            due_date: eCard.due_date,
            columnname: eCard.columnName || 'To Do',
            priority: eCard.priority,
            id: eCard.id // CRUCIAL for the WHERE clause
        };
        try {
            console.log(updateTaskData);
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put('/api/tasks', updateTaskData);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
        handleStopEditing(); // Exit edit mode after saving
    };
    //--DELETE ROUTE--//
    const deleteTask = async (taskId)=>{
        try {
            // 1. Send the DELETE request
            // Axios sends the object { id: taskId } in the request body
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete('/api/tasks', {
                data: {
                    id: taskId
                }
            });
            // Note on Axios: For DELETE requests, the body must be passed via the 'data' property
            // 2. Update the state by removing the task (optimistic update)
            // Alternatively, you could call await fetchTasks(); again (safe, but slower)
            setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        // Add logic here to re-fetch if the delete failed, or show an error message
        }
    };
    //--LOGIC FOR MOVING TASKS--//
    const moveTask = async (taskId, newColumn)=>{
        const taskToMove = tasks.find((t)=>t.id === taskId);
        if (!taskToMove || taskToMove.columnname === newColumn) return;
        // 1. Optimistic UI Update: Change columnname in local state immediately
        const updatedTask = {
            ...taskToMove,
            columnname: newColumn
        };
        setTasks((prevTasks)=>prevTasks.map((task)=>task.id === taskId ? updatedTask : task));
        // 2. API Call to update the database
        try {
            // Note: Since you're using PUT for updates, the task ID and new columnname are included.
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put('/api/tasks', updatedTask);
        } catch (error) {
            console.error(`Error moving task ${taskId} to ${newColumn}:`, error);
            // 3. Revert: If the API call fails, revert the UI state by fetching the correct data
            fetchTasks();
        }
    };
    const columnProps = {
        tasks,
        addTask,
        handleSaveChanges,
        editingTaskId,
        setEditingTaskId,
        deleteTask
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].app,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].check,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sidebar,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    ...columnProps,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content1,
                    columnName: "To Do",
                    onMoveTask: moveTask
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    ...columnProps,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content2,
                    columnName: "In Progress",
                    onMoveTask: moveTask
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    ...columnProps,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content3,
                    columnName: "Done",
                    onMoveTask: moveTask
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(App, "iUKSH01D8T6u5Kn7fmoyZWE7RxI=");
_c = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gemini-next-app/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/HomeComponent.tsx [client] (ecmascript)");
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Create Next App"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Generated by create next app"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/gemini-next-app/pages/index.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/gemini-next-app/pages/index.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/gemini-next-app/pages/index.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/gemini-next-app/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/gemini-next-app/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/gemini-next-app/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/gemini-next-app/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__95f14ca2._.js.map