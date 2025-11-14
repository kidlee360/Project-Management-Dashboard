module.exports = [
"[project]/gemini-next-app/views/HomeComponent.module.css [ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/gemini-next-app/views/partials/card.module.css [ssr] (css module)", ((__turbopack_context__) => {

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
"[externals]/clsx [external] (clsx, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("clsx");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/gemini-next-app/views/partials/card.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Add.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/clsx [external] (clsx, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function Card(props) {
    const [isExpanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    function expand() {
        setExpanded(true);
    }
    function collapse() {
        setExpanded(false);
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                collapse();
            }
        }
        //don't quite understand why the event listener below was added and 
        //then removed but it seems like a crucial logic to prevent errors
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        cardRef
    ]);
    const [card, setCard] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: isExpanded ? "300px" : ''
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].date),
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].priority),
                            style: {
                                display: isExpanded ? '' : "none"
                            },
                            name: "priority",
                            value: card.priority,
                            onChange: handleChange,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    disabled: true,
                                    hidden: true,
                                    children: "Priority"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 103,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 104,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                        style: {
                            display: isExpanded ? '' : "none"
                        },
                        onClick: submitForm,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
const __TURBOPACK__default__export__ = Card;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/gemini-next-app/views/partials/displayCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Edit.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Delete.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/clsx [external] (clsx, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function DisplayCard(props) {
    function editForm() {
        props.onEdit(props);
    }
    function deleteForm() {
        props.onDelete(props.id);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: '300px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    children: props.task
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 23,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    children: props.description
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "Due: ",
                                props.due_date && new Date(props.due_date).toDateString() || 'N/A'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 26,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "Priority: ",
                                props.priority
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 27,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 25,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].edit, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                            onClick: editForm,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 30,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].delete, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                            onClick: deleteForm,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                                lineNumber: 34,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/displayCard.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = DisplayCard;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/gemini-next-app/views/partials/editCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/@mui/icons-material/esm/Add.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/clsx [external] (clsx, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function EditCard(props) {
    const cardRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    function cancelEdit() {
        props.onCancel();
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                cancelEdit();
            }
        }
        //don't quite understand why the event listener below was added and 
        //then removed but it seems like a crucial logic to prevent errors
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        cardRef
    ]);
    const [eCard, setCard] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        id: props.id,
        task: props.task,
        description: props.description,
        due_date: props.due_date,
        priority: props.priority
    });
    // 💡 CRITICAL FIX: Sync local state when props change
    // This runs when the task ID changes (e.g., if you switch to edit a different task)
    // and ensures the form is always initialized with the correct, fresh data.
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setCard({
            id: props.id,
            task: props.task,
            description: props.description,
            due_date: props.due_date,
            priority: props.priority
        });
    }, [
        props.id,
        props.task,
        props.description,
        props.due_date,
        props.priority
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: "300px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
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
                    lineNumber: 76,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
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
                    lineNumber: 85,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].date),
                            type: "date",
                            onChange: handleChange,
                            value: eCard.due_date,
                            name: "due_date"
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                            lineNumber: 95,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].priority),
                            name: "priority",
                            value: eCard.priority,
                            onChange: handleChange,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    disabled: true,
                                    hidden: true,
                                    children: "Priority"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 107,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "high",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                    lineNumber: 93,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                        onClick: submitForm,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            style: {
                                color: 'white'
                            }
                        }, void 0, false, {
                            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                            lineNumber: 117,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                        lineNumber: 116,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
                    lineNumber: 115,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
            lineNumber: 75,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/editCard.tsx",
        lineNumber: 74,
        columnNumber: 13
    }, this);
}
const __TURBOPACK__default__export__ = EditCard;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/gemini-next-app/views/content1.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Content1
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.tsx [ssr] (ecmascript)"); //one way of setting path
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/displayCard.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/editCard.tsx [ssr] (ecmascript)"); //another way of setting path
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function Content1(props) {
    const { columnName, tasks, addTask, handleSaveChanges, editingTaskId, setEditingTaskId, deleteTask } = props;
    // Filter the global task list to show only tasks belonging to this column
    const columnTasks = tasks.filter((task)=>task.columnname === columnName);
    const handleStartEditing = (taskData)=>{
        setEditingTaskId(taskData.id);
    };
    const handleStopEditing = ()=>{
        setEditingTaskId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: props.className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content,
            children: [
                columnTasks.map((task)=>editingTaskId === task.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        id: task.id,
                        task: task.task,
                        description: task.description,
                        due_date: task.due_date,
                        priority: task.priority,
                        onSave: handleSaveChanges,
                        onCancel: handleStopEditing
                    }, task.id, false, {
                        fileName: "[project]/gemini-next-app/views/content1.tsx",
                        lineNumber: 36,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        id: task.id,
                        task: task.task,
                        description: task.description,
                        due_date: task.due_date,
                        priority: task.priority,
                        onEdit: handleStartEditing,
                        onDelete: deleteTask
                    }, task.id, false, {
                        fileName: "[project]/gemini-next-app/views/content1.tsx",
                        lineNumber: 47,
                        columnNumber: 21
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onAdd: addTask
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/content1.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/gemini-next-app/views/content1.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/content1.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/gemini-next-app/views/HomeComponent.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/HomeComponent.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/content1.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function App() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].app,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].check,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sidebar,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content1
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content2,
                    children: " "
                }, void 0, false, {
                    fileName: "[project]/gemini-next-app/views/HomeComponent.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content3
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/gemini-next-app/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/HomeComponent.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Create Next App"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Generated by create next app"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/gemini-next-app/pages/index.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__27af765e._.js.map