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
;
;
function Card() {
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
        dueDate: ""
    });
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
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                        lineNumber: 59,
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
                        lineNumber: 69,
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
                                value: card.dueDate,
                                name: "dueDate"
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].priority),
                                style: {
                                    display: isExpanded ? '' : "none"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "",
                                        disabled: true,
                                        hidden: true,
                                        children: "Priority"
                                    }, void 0, false, {
                                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                        lineNumber: 86,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "low",
                                        children: "Low"
                                    }, void 0, false, {
                                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                        lineNumber: 87,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "medium",
                                        children: "Medium"
                                    }, void 0, false, {
                                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                        lineNumber: 88,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "high",
                                        children: "High"
                                    }, void 0, false, {
                                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                        lineNumber: 89,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                lineNumber: 85,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                        lineNumber: 77,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                                style: {
                                    display: isExpanded ? '' : "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    style: {
                                        color: 'white'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 97,
                                    columnNumber: 31
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                lineNumber: 96,
                                columnNumber: 27
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].edit, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                                style: {
                                    display: isExpanded ? '' : "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    style: {
                                        color: 'white'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 100,
                                    columnNumber: 31
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                lineNumber: 99,
                                columnNumber: 27
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].delete, __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                                style: {
                                    display: isExpanded ? '' : "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    style: {
                                        color: 'white'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                    lineNumber: 103,
                                    columnNumber: 31
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                                lineNumber: 102,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                        lineNumber: 95,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/gemini-next-app/views/partials/card.tsx",
                lineNumber: 58,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/gemini-next-app/views/partials/card.tsx",
            lineNumber: 57,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/partials/card.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = Card;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/gemini-next-app/views/content1.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/partials/card.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/gemini-next-app/views/HomeComponent.module.css [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function Content1() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content1,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/gemini-next-app/views/content1.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/gemini-next-app/views/content1.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = Content1;
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$views$2f$content1$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4c811aee._.js.map