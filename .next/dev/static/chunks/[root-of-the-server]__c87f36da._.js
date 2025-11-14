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
        priority: ""
    });
    function submitForm() {
        props.onAdd(card);
        setCard({
            task: "",
            description: "",
            due_date: "",
            priority: ""
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
                    lineNumber: 71,
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
                    lineNumber: 81,
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
                            lineNumber: 91,
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
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 103,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 104,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "high",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                    lineNumber: 89,
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
                            lineNumber: 113,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                        lineNumber: 112,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                    lineNumber: 111,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
            lineNumber: 70,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
        lineNumber: 69,
        columnNumber: 13
    }, this);
}
_s(Card, "W1kxWmtM5k8pppYPIP3ZPxI3cMs=");
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
    const [card] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        task: props.task,
        description: props.description,
        due_date: props.due_date,
        priority: props.priority
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: '300px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: card.task
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: card.description
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Due: ",
                                card.due_date && new Date(card.due_date).toDateString() || 'N/A'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 22,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Priority: ",
                                card.priority
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 23,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 21,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].icons,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].edit, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"]['my-button']),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                                lineNumber: 27,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 26,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].delete, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"]['my-button']),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                                lineNumber: 30,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 29,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 25,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
            lineNumber: 18,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_s(DisplayCard, "MUHGFDFD/+RMumM86Inwiwl+ykY=");
_c = DisplayCard;
const __TURBOPACK__default__export__ = DisplayCard;
var _c;
__turbopack_context__.k.register(_c, "DisplayCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gemini-next-app/views/content1.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Content1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.tsx [client] (ecmascript)"); //one way of setting path
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/displayCard.tsx [client] (ecmascript)"); //another way of setting path
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function Content1(props) {
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Content1.useEffect": ()=>{
            const fetchTasks = {
                "Content1.useEffect.fetchTasks": async ()=>{
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/api/tasks');
                        setTasks(response.data);
                    } catch (error) {
                        console.error('Error fetching tasks:', error);
                    }
                }
            }["Content1.useEffect.fetchTasks"];
            fetchTasks();
        }
    }["Content1.useEffect"], []);
    //the task with the type: "any" is coming from the Card component when the form is submitted where it was changed from props.onAdd(card);
    const addTask = async (task)=>{
        const columnname = 'To Do'; // Default column for new tasks
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
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editedTask, setEditedTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(tasks);
    function editForm() {
        setIsEditing(true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: props.className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content,
            children: [
                tasks.map((task, index)=>isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        task: task.task,
                        description: task.description,
                        due_date: task.due_date,
                        priority: task.priority
                    }, index, false, {
                        fileName: "[project]/gemini-next-app/views/content1.tsx",
                        lineNumber: 55,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        task: task.task,
                        description: task.description,
                        due_date: task.due_date,
                        priority: task.priority,
                        onEdit: editForm
                    }, index, false, {
                        fileName: "[project]/gemini-next-app/views/content1.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    onAdd: addTask
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/content1.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/content1.tsx",
            lineNumber: 52,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/content1.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
}
_s(Content1, "55/35louTbNzH8XCrvrGQk+hADw=");
_c = Content1;
var _c;
__turbopack_context__.k.register(_c, "Content1");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/content1.tsx [client] (ecmascript)");
;
;
;
function App() {
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
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sidebar,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content1
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content2,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].content3
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c87f36da._.js.map