module.exports = [
"[project]/views/HomeComponent.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "app": "HomeComponent-module__rFbzXW__app",
  "button": "HomeComponent-module__rFbzXW__button",
  "check": "HomeComponent-module__rFbzXW__check",
  "content1": "HomeComponent-module__rFbzXW__content1",
  "content2": "HomeComponent-module__rFbzXW__content2",
  "content3": "HomeComponent-module__rFbzXW__content3",
  "form": "HomeComponent-module__rFbzXW__form",
  "header": "HomeComponent-module__rFbzXW__header",
  "input": "HomeComponent-module__rFbzXW__input",
  "logo": "HomeComponent-module__rFbzXW__logo",
  "sidebar": "HomeComponent-module__rFbzXW__sidebar",
});
}),
"[externals]/axios [external] (axios, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@dnd-kit/core [external] (@dnd-kit/core, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@dnd-kit/core", () => require("@dnd-kit/core"));

module.exports = mod;
}),
"[externals]/@dnd-kit/sortable [external] (@dnd-kit/sortable, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@dnd-kit/sortable", () => require("@dnd-kit/sortable"));

module.exports = mod;
}),
"[project]/views/partials/bars.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "bars-module__KfWFFW__container",
  "header": "bars-module__KfWFFW__header",
  "myButton": "bars-module__KfWFFW__myButton",
});
}),
"[project]/views/partials/sideBar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SideBar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LowPriority$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/LowPriority.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$PriorityHigh$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/PriorityHigh.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$PendingActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/PendingActions.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/partials/bars.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
;
;
function SideBar(props) {
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    function highPriority() {
        setActive(active === "high" ? "" : "high");
        props.sideBarClick(active);
    }
    function lowPriority() {
        setActive(active === "low" ? "" : "low");
        props.sideBarClick(active);
    }
    function dueDate() {
        setActive(active === "date" ? "" : "date");
        props.sideBarClick(active);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: props.className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].myButton,
                    style: {
                        backgroundColor: active === "high" ? "rgba(34, 30, 30, 0.2)" : ''
                    },
                    onClick: highPriority,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$PriorityHigh$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        style: {
                            color: "white"
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/partials/sideBar.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/views/partials/sideBar.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].myButton,
                    style: {
                        backgroundColor: active === "low" ? "rgba(34, 30, 30, 0.2)" : ''
                    },
                    onClick: lowPriority,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LowPriority$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        style: {
                            color: "white"
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/partials/sideBar.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/views/partials/sideBar.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].myButton,
                    style: {
                        backgroundColor: active === "date" ? "rgba(34, 30, 30, 0.2)" : ''
                    },
                    onClick: dueDate,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$PendingActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        style: {
                            color: "white"
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/partials/sideBar.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/views/partials/sideBar.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/views/partials/sideBar.tsx",
            lineNumber: 29,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/views/partials/sideBar.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/views/partials/card.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "add": "card-module__vggomq__add",
  "bottomSection": "card-module__vggomq__bottomSection",
  "card": "card-module__vggomq__card",
  "cardParent": "card-module__vggomq__cardParent",
  "content": "card-module__vggomq__content",
  "delete": "card-module__vggomq__delete",
  "edit": "card-module__vggomq__edit",
  "icons": "card-module__vggomq__icons",
  "input": "card-module__vggomq__input",
  "my-button": "card-module__vggomq__my-button",
  "select": "card-module__vggomq__select",
});
}),
"[externals]/clsx [external] (clsx, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("clsx");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/views/partials/card.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/partials/card.module.css [ssr] (css module)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: isExpanded ? "300px" : ''
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
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
                    fileName: "[project]/views/partials/card.tsx",
                    lineNumber: 73,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
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
                    fileName: "[project]/views/partials/card.tsx",
                    lineNumber: 83,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].date),
                            style: {
                                display: isExpanded ? '' : "none"
                            },
                            type: "date",
                            onChange: handleChange,
                            value: card.due_date,
                            name: "due_date"
                        }, void 0, false, {
                            fileName: "[project]/views/partials/card.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].priority),
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
                                    fileName: "[project]/views/partials/card.tsx",
                                    lineNumber: 104,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/views/partials/card.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/views/partials/card.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "high",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/views/partials/card.tsx",
                                    lineNumber: 107,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/partials/card.tsx",
                            lineNumber: 99,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/partials/card.tsx",
                    lineNumber: 91,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                        style: {
                            display: isExpanded ? '' : "none"
                        },
                        onClick: submitForm,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            style: {
                                color: 'white'
                            }
                        }, void 0, false, {
                            fileName: "[project]/views/partials/card.tsx",
                            lineNumber: 115,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/views/partials/card.tsx",
                        lineNumber: 114,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/views/partials/card.tsx",
                    lineNumber: 113,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/views/partials/card.tsx",
            lineNumber: 72,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/views/partials/card.tsx",
        lineNumber: 71,
        columnNumber: 13
    }, this);
}
const __TURBOPACK__default__export__ = Card;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@dnd-kit/utilities [external] (@dnd-kit/utilities, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@dnd-kit/utilities", () => require("@dnd-kit/utilities"));

module.exports = mod;
}),
"[project]/views/partials/displayCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/sortable [external] (@dnd-kit/sortable, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$utilities__$5b$external$5d$__$2840$dnd$2d$kit$2f$utilities$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/utilities [external] (@dnd-kit/utilities, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Delete.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/partials/card.module.css [ssr] (css module)");
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
;
function DisplayCard(props) {
    const { id, task, description, due_date, priority, onEdit, onDelete } = props;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__["useSortable"])({
        id: id,
        data: {
            type: 'Task',
            task: props
        }
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$utilities__$5b$external$5d$__$2840$dnd$2d$kit$2f$utilities$2c$__cjs$29$__["CSS"].Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 0,
        height: "300px"
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isDragging) {
            sessionStorage.setItem("draggedTaskId", id);
            console.log(sessionStorage.setItem("draggedTaskId", id));
        }
    }, [
        isDragging,
        id
    ]);
    function editForm() {
        onEdit(props);
    }
    function deleteForm() {
        onDelete(id);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        // 1. Assign the ref for DND Kit to track the DOM node
        ref: setNodeRef,
        // 2. Apply the dynamic style object calculated above
        style: style,
        ...attributes,
        ...listeners,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardParent,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    children: task
                }, void 0, false, {
                    fileName: "[project]/views/partials/displayCard.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    children: description
                }, void 0, false, {
                    fileName: "[project]/views/partials/displayCard.tsx",
                    lineNumber: 71,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "Due: ",
                                due_date && new Date(due_date).toDateString() || 'N/A'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/partials/displayCard.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "Priority: ",
                                priority
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/partials/displayCard.tsx",
                            lineNumber: 74,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/partials/displayCard.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].edit, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                            onClick: editForm,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/views/partials/displayCard.tsx",
                                lineNumber: 78,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/views/partials/displayCard.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].delete, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                            onClick: deleteForm,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                style: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/views/partials/displayCard.tsx",
                                lineNumber: 81,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/views/partials/displayCard.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/partials/displayCard.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/views/partials/displayCard.tsx",
            lineNumber: 69,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/views/partials/displayCard.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = DisplayCard;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/views/partials/editCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/partials/card.module.css [ssr] (css module)");
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
        priority: props.priority,
        columnName: props.columnName
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
            priority: props.priority,
            columnName: props.columnName
        });
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardParent,
        style: {
            height: "300px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                    type: "text",
                    name: "task",
                    value: eCard.task,
                    onChange: handleChange,
                    placeholder: "Add a task",
                    style: {
                        background: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/views/partials/editCard.tsx",
                    lineNumber: 78,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                    type: "text",
                    name: "description",
                    value: eCard.description,
                    onChange: handleChange,
                    placeholder: "Add a description",
                    style: {
                        background: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/views/partials/editCard.tsx",
                    lineNumber: 87,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].date),
                            type: "date",
                            onChange: handleChange,
                            value: eCard.due_date,
                            name: "due_date"
                        }, void 0, false, {
                            fileName: "[project]/views/partials/editCard.tsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].select, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].priority),
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
                                    fileName: "[project]/views/partials/editCard.tsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "low",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/views/partials/editCard.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "medium",
                                    children: "Medium"
                                }, void 0, false, {
                                    fileName: "[project]/views/partials/editCard.tsx",
                                    lineNumber: 110,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "high",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/views/partials/editCard.tsx",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/partials/editCard.tsx",
                            lineNumber: 103,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/partials/editCard.tsx",
                    lineNumber: 95,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].icons}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].add, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['my-button']),
                        onClick: submitForm,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            style: {
                                color: 'white'
                            }
                        }, void 0, false, {
                            fileName: "[project]/views/partials/editCard.tsx",
                            lineNumber: 119,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/views/partials/editCard.tsx",
                        lineNumber: 118,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/views/partials/editCard.tsx",
                    lineNumber: 117,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/views/partials/editCard.tsx",
            lineNumber: 77,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/views/partials/editCard.tsx",
        lineNumber: 76,
        columnNumber: 13
    }, this);
}
const __TURBOPACK__default__export__ = EditCard;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/views/content.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Content
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/partials/card.tsx [ssr] (ecmascript)"); //one way of setting path
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/core [external] (@dnd-kit/core, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/partials/displayCard.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/partials/card.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/partials/editCard.tsx [ssr] (ecmascript)"); //another way of setting path
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/sortable [external] (@dnd-kit/sortable, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function Content(props) {
    const { columnName, tasks, addTask, handleSaveChanges, editingTaskId, setEditingTaskId, barClicked, deleteTask } = props;
    // Define a static map to translate priority strings to numbers
    const PRIORITY_ORDER = {
        'low': 1,
        'medium': 2,
        'high': 3
    };
    // Filter the global task list to show only tasks belonging to this column
    const columnTasks = tasks.filter((task)=>task.columnname === columnName);
    // Filter based on sideBar button that was clicked
    if (barClicked === "high") {
        // Sort from High (3) down to Low (1)
        columnTasks.sort((a, b)=>{
            const priorityA = PRIORITY_ORDER[a.priority] || 0;
            const priorityB = PRIORITY_ORDER[b.priority] || 0;
            console.log(priorityA, priorityB);
            return priorityA - priorityB; // Descending order (3 then 2 then 1)
        });
    } else if (barClicked === "low") {
        // Sort from Low (1) up to High (3)
        columnTasks.sort((a, b)=>{
            const priorityA = PRIORITY_ORDER[a.priority] || 0;
            const priorityB = PRIORITY_ORDER[b.priority] || 0;
            console.log(priorityA, priorityB);
            return priorityB - priorityA; // Ascending order (1 then 2 then 3)
        });
    } else if (barClicked === "date") {
        // Sorts by date (oldest first) - This logic is fine
        columnTasks.sort((a, b)=>new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
    }
    // --- DND Kit useDroppable hook ---
    const { setNodeRef, isOver } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["useDroppable"])({
        // CRITICAL: The ID DND Kit uses to identify the drop target
        id: columnName,
        data: {
            type: 'Column',
            name: columnName
        }
    });
    const handleStartEditing = (taskData)=>{
        setEditingTaskId(taskData.id);
    };
    const handleStopEditing = ()=>{
        setEditingTaskId(null);
    };
    const taskIds = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useMemo(()=>columnTasks.map((task)=>task.id), [
        columnTasks
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: props.className,
        ref: setNodeRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__["SortableContext"], {
                    items: taskIds,
                    strategy: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__["verticalListSortingStrategy"],
                    children: columnTasks.map((task)=>editingTaskId === task.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$editCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: task.id,
                            task: task.task,
                            description: task.description,
                            due_date: task.due_date,
                            priority: task.priority,
                            columnName: task.columnname,
                            onSave: handleSaveChanges,
                            onCancel: handleStopEditing
                        }, task.id, false, {
                            fileName: "[project]/views/content.tsx",
                            lineNumber: 84,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: task.id,
                            task: task.task,
                            description: task.description,
                            due_date: task.due_date,
                            priority: task.priority,
                            columnName: task.columnname,
                            onEdit: handleStartEditing,
                            onDelete: deleteTask
                        }, task.id, false, {
                            fileName: "[project]/views/content.tsx",
                            lineNumber: 96,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/views/content.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$card$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onAdd: addTask,
                    columnName: columnName
                }, void 0, false, {
                    fileName: "[project]/views/content.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/views/content.tsx",
            lineNumber: 80,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/views/content.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/views/partials/header.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/partials/bars.module.css [ssr] (css module)");
;
;
function Header(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: props.className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    style: {
                        textAlign: "center"
                    },
                    children: " To Do"
                }, void 0, false, {
                    fileName: "[project]/views/partials/header.tsx",
                    lineNumber: 7,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/views/partials/header.tsx",
                lineNumber: 6,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    style: {
                        textAlign: "center"
                    },
                    children: " In Progress"
                }, void 0, false, {
                    fileName: "[project]/views/partials/header.tsx",
                    lineNumber: 10,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/views/partials/header.tsx",
                lineNumber: 9,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$bars$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    style: {
                        textAlign: "center"
                    },
                    children: " On Hold"
                }, void 0, false, {
                    fileName: "[project]/views/partials/header.tsx",
                    lineNumber: 13,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/views/partials/header.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/views/partials/header.tsx",
        lineNumber: 5,
        columnNumber: 9
    }, this);
}
}),
"[project]/views/authentication.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Component
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/HomeComponent.module.css [ssr] (css module)");
;
;
;
function Component(props) {
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        userName: "",
        email: "",
        password: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prevForm)=>{
            const newForm = {
                ...prevForm,
                [name]: value
            };
            console.log(newForm);
            return newForm;
        });
    }
    function submitForm() {
        props.userForm(form, account);
        setForm({
            userName: "",
            email: "",
            password: ""
        });
    }
    function changeAccount() {
        setAccount((prevAccount)=>!prevAccount);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].form,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: [
                    "Sign ",
                    account ? 'In' : 'Up'
                ]
            }, void 0, true, {
                fileName: "[project]/views/authentication.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                name: "userName",
                type: "text",
                value: form.userName,
                onChange: handleChange,
                placeholder: "username"
            }, void 0, false, {
                fileName: "[project]/views/authentication.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                name: "email",
                type: "text",
                value: form.email,
                onChange: handleChange,
                placeholder: "email"
            }, void 0, false, {
                fileName: "[project]/views/authentication.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                name: "password",
                type: "text",
                value: form.password,
                onChange: handleChange,
                placeholder: "password"
            }, void 0, false, {
                fileName: "[project]/views/authentication.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].button,
                type: "submit",
                onClick: submitForm,
                children: "submit"
            }, void 0, false, {
                fileName: "[project]/views/authentication.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                children: [
                    account ? "don't" : 'already',
                    " have an account? ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        onClick: changeAccount,
                        style: {
                            textDecoration: 'underline'
                        },
                        children: [
                            "sign ",
                            account ? 'up' : 'in'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/authentication.tsx",
                        lineNumber: 48,
                        columnNumber: 65
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/views/authentication.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/views/authentication.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
}),
"[project]/views/HomeComponent.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/views/HomeComponent.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/core [external] (@dnd-kit/core, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/sortable [external] (@dnd-kit/sortable, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$sideBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/partials/sideBar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/content.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/partials/displayCard.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$header$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/partials/header.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$authentication$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/authentication.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
function App() {
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [refetchToggle, setRefetchToggle] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [activeTask, setActiveTask] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [barClicked, setBarClicked] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [userAuthenticated, setUserAuthenticated] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const storedAuthStatus = sessionStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
            setUserAuthenticated(true);
        }
    }, []);
    //--GET ROUTE--//
    const fetchTasks = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchTasks();
    }, [
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
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post('/api/tasks', addTaskData);
            setTasks([
                ...tasks,
                response.data
            ]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    const [editingTaskId, setEditingTaskId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
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
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].put('/api/tasks', updateTaskData);
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
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].delete('/api/tasks', {
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
            const payload = {
                id: taskId,
                columnname: newColumn
            };
            console.log('Attempting to move task with payload:', payload);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].patch('/api/tasks', payload);
            console.log('Task move successful for task ID:', taskId);
        } catch (error) {
            console.error(`Error moving task ${taskId} to ${newColumn}:`, error);
            // 3. Revert: If the API call fails, revert the UI state by fetching the correct data
            alert(`Failed to save card position. The card will be moved back.\n\nError: ${error.message}\n\nCheck the browser's developer console (F12) for more details.`);
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
    const findContainer = (id)=>{
        if ([
            'To Do',
            'In Progress',
            'Done'
        ].includes(id.toString())) {
            return id.toString();
        }
        const task = tasks.find((t)=>t.id === id);
        return task?.columnname;
    };
    const sensors = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["PointerSensor"], {
        // Require the pointer to move by 10 pixels before activating
        // For mobile, this avoids conflicts with scrolling
        activationConstraint: {
            distance: 10
        }
    }), (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragStart = (event)=>{
        const { active } = event;
        const task = tasks.find((t)=>t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };
    // In homeComponent.jsx
    const handleDragOver = (event)=>{
        // Only handling visual reordering if needed. 
        // Since you only care about column persistence, we can leave this simple.
        // DND Kit handles the visual effects automatically when using SortableContext/useSortable.
        // For pure column moves, we can often leave this empty or remove it.
        // For now, let's keep it minimal and let handleDragEnd handle the state/db update.
        const { active, over } = event;
        if (!over) return;
        const isOverAColumn = [
            'To Do',
            'In Progress',
            'Done'
        ].includes(over.id.toString());
        const isOverATask = tasks.some((t)=>t.id === over.id);
    // If the active item is a task and the over item is not a task, 
    // or if the active item is a task and the over item is a task in another column, 
    // DND-Kit will handle the visual transition into the new container. 
    };
    const handleDragEnd = (event)=>{
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId !== overId) {
            const activeContainer = activeTask?.columnname;
            const overContainer = findContainer(overId);
            if (!activeContainer || !overContainer) return;
            const activeIndex = tasks.findIndex((t)=>t.id === activeId);
            const overIndex = tasks.findIndex((t)=>t.id === overId);
            if (activeContainer === overContainer) {
                // Reordering within the same column
                if (activeIndex !== overIndex) {
                    setTasks((items)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$29$__["arrayMove"])(items, activeIndex, overIndex > -1 ? overIndex : items.length - 1));
                }
            } else {
                // Moving to a different column
                moveTask(active.id, overContainer);
            }
        }
    };
    function barClick(active) {
        setBarClicked(active);
        console.log(active);
    }
    ////======= SEND THE FORM TO THE REGISTER OR LOGIN FOR AUTHENTICATION AND VERIFICATION ======////
    const sendForm = async (form, account)=>{
        const url = '/api/users';
        try {
            const body = {
                username: form.userName,
                email: form.email,
                password: form.password,
                account: account
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                sessionStorage.setItem('isAuthenticated', 'true');
                setUserAuthenticated(true);
                sessionStorage.setItem('id', data);
            // Handle successful login or registration, e.g., redirect or update UI
            } else {
                console.error(data.message);
            // Handle error, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const logOut = ()=>{
        sessionStorage.setItem('isAuthenticated', 'false');
        setUserAuthenticated(false);
    };
    ////////============RETURN DIFFERENT PAGES BASED ON IF USER IS AUTHENTICATED ===============////////////
    return userAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["DndContext"], {
        sensors: sensors,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
        collisionDetection: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["closestCorners"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].app,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].check,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo,
                            onClick: logOut,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: "Log Out"
                                }, void 0, false, {
                                    fileName: "[project]/views/HomeComponent.tsx",
                                    lineNumber: 296,
                                    columnNumber: 59
                                }, this),
                                " "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/HomeComponent.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$header$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header
                        }, void 0, false, {
                            fileName: "[project]/views/HomeComponent.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$sideBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sidebar,
                            sideBarClick: barClick
                        }, void 0, false, {
                            fileName: "[project]/views/HomeComponent.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...columnProps,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content1,
                            columnName: "To Do",
                            onMoveTask: moveTask,
                            barClicked: barClicked
                        }, void 0, false, {
                            fileName: "[project]/views/HomeComponent.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...columnProps,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content2,
                            columnName: "In Progress",
                            onMoveTask: moveTask,
                            barClicked: barClicked
                        }, void 0, false, {
                            fileName: "[project]/views/HomeComponent.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...columnProps,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content3,
                            columnName: "Done",
                            onMoveTask: moveTask,
                            barClicked: barClicked
                        }, void 0, false, {
                            fileName: "[project]/views/HomeComponent.tsx",
                            lineNumber: 313,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/HomeComponent.tsx",
                    lineNumber: 295,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/views/HomeComponent.tsx",
                lineNumber: 294,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$29$__["DragOverlay"], {
                children: activeTask ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$partials$2f$displayCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: activeTask.id,
                    task: activeTask.task,
                    description: activeTask.description,
                    due_date: activeTask.due_date,
                    priority: activeTask.priority,
                    onEdit: ()=>{},
                    onDelete: ()=>{}
                }, void 0, false, {
                    fileName: "[project]/views/HomeComponent.tsx",
                    lineNumber: 325,
                    columnNumber: 27
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/views/HomeComponent.tsx",
                lineNumber: 324,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/views/HomeComponent.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$authentication$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        userForm: sendForm
    }, void 0, false, {
        fileName: "[project]/views/HomeComponent.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/views/HomeComponent.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Create Next App"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Generated by create next app"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$views$2f$HomeComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
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

//# sourceMappingURL=%5Broot-of-the-server%5D__5ba6f690._.js.map