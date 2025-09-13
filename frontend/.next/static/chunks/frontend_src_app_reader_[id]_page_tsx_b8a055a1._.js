(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/app/reader/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReaderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const CHUNK_SIZE = 10000; // Characters per chunk (~10k words per page)
const CHUNKS_PER_PAGE = 1; // One chunk per section for single screen fit
const CHUNKS_TO_LOAD = 5; // Number of chunks to load ahead/behind current position
const CHUNK_LOAD_THRESHOLD = 0.8; // Load more chunks when 80% through current set
const MAX_LOADED_CHUNKS = 50; // Maximum number of chunks to keep in memory
// Memoized chat message component
const ChatMessageComponent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((param)=>{
    let { message, isFullscreen, refGroups, openRefMessageId, openRefId, onToggleRef, renderRefBlock } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: "flex ".concat(message.type === 'user' ? 'justify-end' : 'justify-start'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-2 rounded-lg ".concat(isFullscreen ? 'w-full' : 'max-w-xs', " ").concat(message.type === 'user' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-900'),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start space-x-2",
                children: [
                    message.type === 'assistant' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                        className: "h-4 w-4 mt-0.5 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    message.type === 'user' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                        className: "h-4 w-4 mt-0.5 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: (()=>{
                            const paragraphs = message.content.split(/\n{2,}/);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: paragraphs.map((para, idx)=>{
                                    var _refGroups_idx;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 last:mb-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: isFullscreen ? 'text-base' : 'text-sm',
                                                children: para
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            refGroups[idx] && refGroups[idx].length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex items-center space-x-2 flex-wrap",
                                                children: refGroups[idx].map((refId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onToggleRef(message.id, refId),
                                                        className: "text-[11px] inline-flex items-center space-x-1 text-amber-700 hover:text-amber-800",
                                                        title: "Toggle reference",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-4 h-4 rounded-full border border-current flex items-center justify-center",
                                                                children: openRefMessageId === message.id && openRefId === refId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 113,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 115,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                lineNumber: 111,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Reference (",
                                                                    refGroups[idx].length,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                lineNumber: 118,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, refId, true, {
                                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            openRefMessageId === message.id && ((_refGroups_idx = refGroups[idx]) === null || _refGroups_idx === void 0 ? void 0 : _refGroups_idx.includes(openRefId || '')) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2",
                                                children: openRefId ? renderRefBlock(openRefId) : null
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 124,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, "".concat(message.id, "_p_").concat(idx), true, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })()
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
            lineNumber: 80,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
        lineNumber: 75,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c = ChatMessageComponent;
ChatMessageComponent.displayName = 'ChatMessageComponent';
function ReaderPage(param) {
    let { params } = param;
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const [isChatOpen, setIsChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isChatMinimized, setIsChatMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasNewResponse, setHasNewResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputMessage, setInputMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isThinking, setIsThinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showThinkingIndicator, setShowThinkingIndicator] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openRefMessageId, setOpenRefMessageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [openRefId, setOpenRefId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPageSelector, setShowPageSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pageInput, setPageInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [references, setReferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [bookContent, setBookContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [contentChunks, setContentChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [bookMetadata, setBookMetadata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInitialLoad, setIsInitialLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Progressive loading state
    const [loadedChunks, setLoadedChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentChunkIndex, setCurrentChunkIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoadingChunks, setIsLoadingChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrollPosition, setScrollPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lastLoadTime, setLastLoadTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const chatInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chatContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Cache for referenced books' content and chunks (when refs point to other books)
    const [referencedBooks, setReferencedBooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loadingBookIds, setLoadingBookIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Precompute start offsets for each chunk within the full book content
    const chunkStartOffsets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReaderPage.useMemo[chunkStartOffsets]": ()=>{
            const starts = [];
            let acc = 0;
            for (const chunk of contentChunks){
                starts.push(acc);
                acc += chunk.content.length;
            }
            return starts;
        }
    }["ReaderPage.useMemo[chunkStartOffsets]"], [
        contentChunks
    ]);
    const escapeHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[escapeHtml]": (text)=>{
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    }["ReaderPage.useCallback[escapeHtml]"], []);
    const highlightRangeInChunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[highlightRangeInChunk]": (chunkText, chunkStart, refStart, refEnd)=>{
            const chunkEnd = chunkStart + chunkText.length;
            const effectiveStart = Math.max(refStart, chunkStart);
            const effectiveEnd = Math.min(refEnd, chunkEnd);
            if (isNaN(refStart) || isNaN(refEnd) || effectiveStart >= effectiveEnd) {
                return escapeHtml(chunkText);
            }
            const localStart = effectiveStart - chunkStart;
            const localEnd = effectiveEnd - chunkStart;
            const beforeRef = chunkText.substring(0, localStart);
            const refText = chunkText.substring(localStart, localEnd);
            const afterRef = chunkText.substring(localEnd);
            return escapeHtml(beforeRef) + '<mark class="bg-yellow-200 px-1 rounded">' + escapeHtml(refText) + '</mark>' + escapeHtml(afterRef);
        }
    }["ReaderPage.useCallback[highlightRangeInChunk]"], [
        escapeHtml
    ]);
    // Save current page when component unmounts or page unloads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReaderPage.useEffect": ()=>{
            const saveCurrentState = {
                "ReaderPage.useEffect.saveCurrentState": ()=>{
                    if (id && currentPage > 0 && totalPages > 0 && !isInitialLoad) {
                        // Save current page
                        const pageData = JSON.stringify({
                            currentPage
                        });
                        if (navigator.sendBeacon) {
                            navigator.sendBeacon("/api/books/".concat(id, "/current-page"), pageData);
                        } else {
                            fetch("/api/books/".concat(id, "/current-page"), {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: pageData
                            }).catch({
                                "ReaderPage.useEffect.saveCurrentState": (error)=>{
                                    console.error('Error saving current page on exit:', error);
                                }
                            }["ReaderPage.useEffect.saveCurrentState"]);
                        }
                    }
                }
            }["ReaderPage.useEffect.saveCurrentState"];
            // Save on page unload
            const handleBeforeUnload = {
                "ReaderPage.useEffect.handleBeforeUnload": ()=>{
                    saveCurrentState();
                }
            }["ReaderPage.useEffect.handleBeforeUnload"];
            window.addEventListener('beforeunload', handleBeforeUnload);
            return ({
                "ReaderPage.useEffect": ()=>{
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                    // Also save on component unmount
                    saveCurrentState();
                }
            })["ReaderPage.useEffect"];
        }
    }["ReaderPage.useEffect"], [
        id,
        currentPage,
        totalPages,
        isInitialLoad
    ]);
    // Auto-scroll chat to bottom when new messages arrive
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReaderPage.useEffect": ()=>{
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
    }["ReaderPage.useEffect"], [
        chatMessages
    ]);
    // Extract chapter title from content - only look for H1, H2, H3 headings
    const extractChapterTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[extractChapterTitle]": (content)=>{
            const lines = content.split('\n');
            for (const line of lines){
                const trimmedLine = line.trim();
                // Look for H1 headings (starting with #)
                if (trimmedLine.startsWith('# ')) {
                    const title = trimmedLine.replace('# ', '').trim();
                    const lowerTitle = title.toLowerCase();
                    if (title.length > 5 && !lowerTitle.includes('table of contents') && !lowerTitle.includes('introduction') && !lowerTitle.includes('preface') && !lowerTitle.includes('acknowledgments') && !lowerTitle.includes('notes') && !lowerTitle.includes('index') && !lowerTitle.includes('bibliography') && !lowerTitle.includes('appendix')) {
                        return title;
                    }
                }
                // Look for H2 headings (starting with ##)
                if (trimmedLine.startsWith('## ')) {
                    const title = trimmedLine.replace('## ', '').trim();
                    const lowerTitle = title.toLowerCase();
                    if (title.length > 5 && !lowerTitle.includes('table of contents') && !lowerTitle.includes('introduction') && !lowerTitle.includes('preface') && !lowerTitle.includes('acknowledgments') && !lowerTitle.includes('notes') && !lowerTitle.includes('index') && !lowerTitle.includes('bibliography') && !lowerTitle.includes('appendix')) {
                        return title;
                    }
                }
                // Look for H3 headings (starting with ###)
                if (trimmedLine.startsWith('### ')) {
                    const title = trimmedLine.replace('### ', '').trim();
                    const lowerTitle = title.toLowerCase();
                    if (title.length > 5 && !lowerTitle.includes('table of contents') && !lowerTitle.includes('introduction') && !lowerTitle.includes('preface') && !lowerTitle.includes('acknowledgments') && !lowerTitle.includes('notes') && !lowerTitle.includes('index') && !lowerTitle.includes('bibliography') && !lowerTitle.includes('appendix')) {
                        return title;
                    }
                }
            }
            return undefined;
        }
    }["ReaderPage.useCallback[extractChapterTitle]"], []);
    // Utility function to find the best break point at punctuation
    const findBestBreakPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[findBestBreakPoint]": (text, maxLength)=>{
            // console.log(`findBestBreakPoint called: text.length=${text.length}, maxLength=${maxLength}`);
            if (text.length <= maxLength) {
                // console.log(`Text length <= maxLength, returning ${text.length}`);
                return text.length;
            }
            // Look for break points in order of preference
            const breakPoints = [
                // Paragraph breaks (highest priority)
                {
                    pattern: /\n\n/g,
                    offset: 0
                },
                // Sentence endings with proper punctuation
                {
                    pattern: /[.!?]+\s+/g,
                    offset: 1
                },
                // Semicolons and colons
                {
                    pattern: /[;:]\s+/g,
                    offset: 1
                },
                // Commas (lower priority)
                {
                    pattern: /,\s+/g,
                    offset: 1
                },
                // Line breaks
                {
                    pattern: /\n/g,
                    offset: 0
                },
                // Spaces (last resort)
                {
                    pattern: /\s+/g,
                    offset: 1
                }
            ];
            // Start from the maximum length and work backwards
            let searchText = text.substring(0, Math.min(maxLength, text.length));
            for (const breakPoint of breakPoints){
                const matches = Array.from(searchText.matchAll(breakPoint.pattern));
                if (matches.length > 0) {
                    // Find the last match that's within our target range
                    for(let i = matches.length - 1; i >= 0; i--){
                        const match = matches[i];
                        const breakPosition = match.index + match[0].length - breakPoint.offset;
                        // Ensure we're not too close to the beginning (at least 20% of max length)
                        if (breakPosition > maxLength * 0.2) {
                            return breakPosition;
                        }
                    }
                }
            }
            // If no good break point found, break at the maximum length
            // console.log(`No good break point found, returning maxLength: ${maxLength}`);
            return maxLength;
        }
    }["ReaderPage.useCallback[findBestBreakPoint]"], []);
    // Utility function to chunk content with smart punctuation-based breaking
    const chunkContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[chunkContent]": (content)=>{
            // console.log('chunkContent called with content length:', content.length);
            // console.log('Content preview:', content.substring(0, 100));
            const chunks = [];
            let currentChunk = '';
            let chunkIndex = 0;
            let pageNumber = 1;
            let currentChapter = '';
            let isInTOC = false;
            // Split content into lines for processing
            const lines = content.split('\n');
            // console.log('Lines count:', lines.length);
            // console.log('First few lines:', lines.slice(0, 3));
            for(let i = 0; i < lines.length; i++){
                const line = lines[i];
                const potentialChunk = currentChunk + (currentChunk ? '\n' : '') + line;
                // if (i < 5) { // Debug first few iterations
                //   console.log(`Line ${i}:`, line);
                //   console.log(`Potential chunk length:`, potentialChunk.length);
                // }
                // Check if we're in table of contents section (only for first few pages)
                if (pageNumber <= 5 && (line.toLowerCase().includes('table of contents') || line.toLowerCase().includes('contents') || line.toLowerCase().includes('chapter') && line.length < 100 || line.toLowerCase().includes('part') && line.length < 100 || line.toLowerCase().includes('book') && line.length < 100 || line.startsWith('#') && (line.toLowerCase().includes('chapter') || line.toLowerCase().includes('part')) || line.match(/^\d+\./) && line.length < 100)) {
                    isInTOC = true;
                }
                // Reset TOC detection after page 5 or when we encounter actual content
                if (pageNumber > 5 || line.startsWith('#') && line.length > 20 && !line.toLowerCase().includes('chapter') && !line.toLowerCase().includes('part')) {
                    isInTOC = false;
                }
                // Check if this line is a chapter heading (not in TOC)
                if (!isInTOC) {
                    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
                        const chapterTitle = extractChapterTitle(line);
                        if (chapterTitle) {
                            currentChapter = chapterTitle;
                        }
                    }
                }
                // Use different chunk sizes based on content type and page number
                let currentChunkSize;
                if (isInTOC || pageNumber <= 5) {
                    currentChunkSize = CHUNK_SIZE * 0.3; // 30% for first 5 pages and TOC
                } else {
                    currentChunkSize = CHUNK_SIZE; // Full chunk size for all non-TOC pages
                }
                // if (i < 5) { // Debug first few iterations
                //   console.log(`Chunk size:`, currentChunkSize, `isInTOC:`, isInTOC, `pageNumber:`, pageNumber);
                // }
                // Check if adding this line would exceed chunk size
                if (potentialChunk.length > currentChunkSize && currentChunk) {
                    // console.log(`Creating chunk at line ${i}, potentialChunk.length: ${potentialChunk.length}, currentChunkSize: ${currentChunkSize}`);
                    // Find the best break point using punctuation
                    const breakPoint = findBestBreakPoint(currentChunk, currentChunkSize);
                    // console.log(`Break point found: ${breakPoint}`);
                    if (breakPoint > 0) {
                        const chunkContent = currentChunk.substring(0, breakPoint).trim();
                        const chapterTitle = extractChapterTitle(chunkContent);
                        chunks.push({
                            id: "chunk_".concat(chunkIndex),
                            content: chunkContent,
                            page: pageNumber,
                            chapter: chapterTitle || currentChapter
                        });
                        // console.log(`Created chunk ${chunkIndex} with content length: ${chunkContent.length}`);
                        // Keep the remaining content and add the current line
                        currentChunk = currentChunk.substring(breakPoint).trim() + (line ? '\n' + line : '');
                    } else {
                        // Fallback: save current chunk as is
                        const chapterTitle = extractChapterTitle(currentChunk);
                        chunks.push({
                            id: "chunk_".concat(chunkIndex),
                            content: currentChunk,
                            page: pageNumber,
                            chapter: chapterTitle || currentChapter
                        });
                        // console.log(`Created fallback chunk ${chunkIndex} with content length: ${currentChunk.length}`);
                        currentChunk = line;
                    }
                    chunkIndex++;
                    pageNumber++;
                } else {
                    currentChunk = potentialChunk;
                }
            }
            // Add the last chunk if it exists
            // console.log(`Final currentChunk length: ${currentChunk.length}, trimmed: ${currentChunk.trim().length}`);
            if (currentChunk.trim()) {
                const chapterTitle = extractChapterTitle(currentChunk);
                chunks.push({
                    id: "chunk_".concat(chunkIndex),
                    content: currentChunk,
                    page: pageNumber,
                    chapter: chapterTitle || (currentChapter && currentChapter !== 'Steve Jobs' ? currentChapter : undefined)
                });
            // console.log(`Created final chunk ${chunkIndex} with content length: ${currentChunk.length}`);
            }
            // console.log(`Total chunks created: ${chunks.length}`);
            // console.log('chunkContent result:', {
            //   chunksLength: chunks.length,
            //   chunks: chunks.slice(0, 2) // Show first 2 chunks for debugging
            // });
            // Emergency fallback: if no chunks were created, create one with the entire content
            if (chunks.length === 0 && content.trim().length > 0) {
                // console.log('No chunks created, creating emergency chunk with full content');
                chunks.push({
                    id: 'emergency-chunk-full',
                    content: content,
                    page: 1,
                    chapter: 'Full Content'
                });
            }
            return chunks;
        }
    }["ReaderPage.useCallback[chunkContent]"], [
        extractChapterTitle,
        findBestBreakPoint
    ]);
    // Progressive loading logic
    const loadChunksAroundIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[loadChunksAroundIndex]": (centerIndex, allChunks)=>{
            const startIndex = Math.max(0, centerIndex - CHUNKS_TO_LOAD);
            const endIndex = Math.min(allChunks.length - 1, centerIndex + CHUNKS_TO_LOAD);
            return allChunks.slice(startIndex, endIndex + 1);
        }
    }["ReaderPage.useCallback[loadChunksAroundIndex]"], []);
    const expandChunksUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[expandChunksUp]": ()=>{
            if (contentChunks.length === 0) return;
            setIsLoadingChunks(true);
            // Get the current first loaded chunk index
            const currentFirstChunk = loadedChunks[0];
            if (!currentFirstChunk) return;
            const currentFirstIndex = contentChunks.findIndex({
                "ReaderPage.useCallback[expandChunksUp].currentFirstIndex": (chunk)=>chunk.id === currentFirstChunk.id
            }["ReaderPage.useCallback[expandChunksUp].currentFirstIndex"]);
            if (currentFirstIndex <= 0) {
                setIsLoadingChunks(false);
                return; // Already at the beginning
            }
            // Load more chunks before the current first chunk
            const newStartIndex = Math.max(0, currentFirstIndex - CHUNKS_TO_LOAD);
            const newChunks = contentChunks.slice(newStartIndex, currentFirstIndex);
            // Prepend new chunks to the beginning, avoiding duplicates
            setLoadedChunks({
                "ReaderPage.useCallback[expandChunksUp]": (prev)=>{
                    // Filter out chunks that are already loaded
                    const existingIds = new Set(prev.map({
                        "ReaderPage.useCallback[expandChunksUp]": (chunk)=>chunk.id
                    }["ReaderPage.useCallback[expandChunksUp]"]));
                    const uniqueNewChunks = newChunks.filter({
                        "ReaderPage.useCallback[expandChunksUp].uniqueNewChunks": (chunk)=>!existingIds.has(chunk.id)
                    }["ReaderPage.useCallback[expandChunksUp].uniqueNewChunks"]);
                    // If no new unique chunks, don't update
                    if (uniqueNewChunks.length === 0) {
                        setIsLoadingChunks(false);
                        return prev;
                    }
                    const updated = [
                        ...uniqueNewChunks,
                        ...prev
                    ];
                    // Trim from the end if we exceed max chunks
                    if (updated.length > MAX_LOADED_CHUNKS) {
                        return updated.slice(0, MAX_LOADED_CHUNKS);
                    }
                    return updated;
                }
            }["ReaderPage.useCallback[expandChunksUp]"]);
            // console.log('Expanded chunks up:', { 
            //   requestedChunks: newChunks.length,
            //   uniqueChunksAdded: newChunks.filter(chunk => !loadedChunks.some(loaded => loaded.id === chunk.id)).length,
            //   newStartIndex, 
            //   currentFirstIndex 
            // });
            setTimeout({
                "ReaderPage.useCallback[expandChunksUp]": ()=>setIsLoadingChunks(false)
            }["ReaderPage.useCallback[expandChunksUp]"], 100);
        }
    }["ReaderPage.useCallback[expandChunksUp]"], [
        contentChunks,
        loadedChunks
    ]);
    const expandChunksDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[expandChunksDown]": ()=>{
            if (contentChunks.length === 0) return;
            setIsLoadingChunks(true);
            // Get the current last loaded chunk index
            const currentLastChunk = loadedChunks[loadedChunks.length - 1];
            if (!currentLastChunk) return;
            const currentLastIndex = contentChunks.findIndex({
                "ReaderPage.useCallback[expandChunksDown].currentLastIndex": (chunk)=>chunk.id === currentLastChunk.id
            }["ReaderPage.useCallback[expandChunksDown].currentLastIndex"]);
            if (currentLastIndex >= contentChunks.length - 1) {
                setIsLoadingChunks(false);
                return; // Already at the end
            }
            // Load more chunks after the current last chunk
            const newEndIndex = Math.min(contentChunks.length, currentLastIndex + 1 + CHUNKS_TO_LOAD);
            const newChunks = contentChunks.slice(currentLastIndex + 1, newEndIndex);
            // Append new chunks to the end, avoiding duplicates
            setLoadedChunks({
                "ReaderPage.useCallback[expandChunksDown]": (prev)=>{
                    // Filter out chunks that are already loaded
                    const existingIds = new Set(prev.map({
                        "ReaderPage.useCallback[expandChunksDown]": (chunk)=>chunk.id
                    }["ReaderPage.useCallback[expandChunksDown]"]));
                    const uniqueNewChunks = newChunks.filter({
                        "ReaderPage.useCallback[expandChunksDown].uniqueNewChunks": (chunk)=>!existingIds.has(chunk.id)
                    }["ReaderPage.useCallback[expandChunksDown].uniqueNewChunks"]);
                    // If no new unique chunks, don't update
                    if (uniqueNewChunks.length === 0) {
                        setIsLoadingChunks(false);
                        return prev;
                    }
                    const updated = [
                        ...prev,
                        ...uniqueNewChunks
                    ];
                    // Trim from the beginning if we exceed max chunks
                    if (updated.length > MAX_LOADED_CHUNKS) {
                        return updated.slice(-MAX_LOADED_CHUNKS);
                    }
                    return updated;
                }
            }["ReaderPage.useCallback[expandChunksDown]"]);
            // console.log('Expanded chunks down:', { 
            //   requestedChunks: newChunks.length,
            //   uniqueChunksAdded: newChunks.filter(chunk => !loadedChunks.some(loaded => loaded.id === chunk.id)).length,
            //   currentLastIndex, 
            //   newEndIndex 
            // });
            setTimeout({
                "ReaderPage.useCallback[expandChunksDown]": ()=>setIsLoadingChunks(false)
            }["ReaderPage.useCallback[expandChunksDown]"], 100);
        }
    }["ReaderPage.useCallback[expandChunksDown]"], [
        contentChunks,
        loadedChunks
    ]);
    // Scroll detection for dynamic expansion
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[handleScroll]": (e)=>{
            const container = e.currentTarget;
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            setScrollPosition(scrollTop);
            // Handle edge cases where scrollHeight equals clientHeight
            if (scrollHeight <= clientHeight) return;
            // Calculate scroll position as percentage
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
            // Define expansion thresholds
            const expandUpThreshold = 0.1; // Expand up when in top 10%
            const expandDownThreshold = 0.9; // Expand down when in bottom 10%
            const now = Date.now();
            const timeSinceLastLoad = now - lastLoadTime;
            const minLoadInterval = 500; // Minimum 500ms between loads (faster for better UX)
            // Check if we should expand up (user scrolled near the top)
            if (scrollPercentage < expandUpThreshold && timeSinceLastLoad > minLoadInterval) {
                // console.log('Expanding chunks up - user near top:', { scrollPercentage });
                setLastLoadTime(now);
                expandChunksUp();
            } else if (scrollPercentage > expandDownThreshold && timeSinceLastLoad > minLoadInterval) {
                // console.log('Expanding chunks down - user near bottom:', { scrollPercentage });
                setLastLoadTime(now);
                expandChunksDown();
            }
        }
    }["ReaderPage.useCallback[handleScroll]"], [
        expandChunksUp,
        expandChunksDown,
        lastLoadTime
    ]);
    // Load book content from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReaderPage.useEffect": ()=>{
            const loadBook = {
                "ReaderPage.useEffect.loadBook": async ()=>{
                    // console.log('Starting to load book, setting isProcessing to true');
                    setIsProcessing(true);
                    try {
                        // Add a test message with multiple references per paragraph and different books
                        const testRefs = [
                            // First paragraph - 2 references from current book
                            {
                                id: 'ref-para-1a',
                                content: 'answering',
                                chapter: 'Current Book Chapter 1',
                                page: 1,
                                startOffset: 10,
                                endOffset: 20,
                                bookId: id
                            },
                            {
                                id: 'ref-para-1b',
                                content: 'something',
                                chapter: 'Current Book Chapter 2',
                                page: 3,
                                startOffset: 50,
                                endOffset: 60,
                                bookId: id
                            },
                            // Second paragraph - 2 references from different book
                            {
                                id: 'ref-para-2a',
                                content: 'elaborates',
                                chapter: 'Other Book Chapter 1',
                                page: 1,
                                startOffset: 30,
                                endOffset: 40,
                                bookId: 'other-book-123'
                            },
                            {
                                id: 'ref-para-2b',
                                content: 'further',
                                chapter: 'Other Book Chapter 2',
                                page: 5,
                                startOffset: 80,
                                endOffset: 90,
                                bookId: 'other-book-123'
                            },
                            // Third paragraph - 3 references from different books
                            {
                                id: 'ref-para-3a',
                                content: 'concludes',
                                chapter: 'Current Book Chapter 3',
                                page: 2,
                                startOffset: 110,
                                endOffset: 120,
                                bookId: id
                            },
                            {
                                id: 'ref-para-3b',
                                content: 'thought',
                                chapter: 'Third Book Chapter 1',
                                page: 1,
                                startOffset: 25,
                                endOffset: 35,
                                bookId: 'third-book-456'
                            },
                            {
                                id: 'ref-para-3c',
                                content: 'analysis',
                                chapter: 'Other Book Chapter 3',
                                page: 7,
                                startOffset: 150,
                                endOffset: 160,
                                bookId: 'other-book-123'
                            }
                        ];
                        const testMessage = {
                            id: 'test-message',
                            type: 'assistant',
                            content: 'Para one answering something with multiple references.\n\nPara two that elaborates further with cross-book citations.\n\nPara three concludes the thought with comprehensive analysis.',
                            timestamp: new Date(),
                            references: testRefs.map({
                                "ReaderPage.useEffect.loadBook": (r)=>r.id
                            }["ReaderPage.useEffect.loadBook"])
                        };
                        const refsMap = {};
                        testRefs.forEach({
                            "ReaderPage.useEffect.loadBook": (r)=>{
                                refsMap[r.id] = r;
                            }
                        }["ReaderPage.useEffect.loadBook"]);
                        console.log('Setting up test data...');
                        setReferences(refsMap);
                        setChatMessages([
                            testMessage
                        ]);
                        console.log('Test setup complete for book ID:', id, 'Expected: book_1757773062667_nr0jeva');
                        console.log('Test message:', testMessage);
                        console.log('Test references:', testRefs);
                        // Optimize: Only fetch the specific book instead of all books
                        const response = await fetch("/api/books/".concat(id));
                        if (response.ok) {
                            const data = await response.json();
                            // console.log('Single book API response:', data);
                            if (data.success) {
                                const book = data.data; // Single book endpoint returns the book directly
                                // console.log('Book found:', { book: !!book, bookId: id, bookContent: book?.content?.substring(0, 100) });
                                if (book) {
                                    setBookMetadata(book);
                                    setBookContent(book.content || 'No content available');
                                    // Chunk the content for better performance
                                    const chunks = chunkContent(book.content || '');
                                    setContentChunks(chunks);
                                    setTotalPages(chunks.length);
                                    // Initialize progressive loading immediately with the chunks
                                    const initialChunkIndex = book.currentPage && book.currentPage >= 1 && book.currentPage <= chunks.length ? book.currentPage - 1 : 0;
                                    // Load initial chunks around the starting position using the chunks directly
                                    const startIndex = Math.max(0, initialChunkIndex - CHUNKS_TO_LOAD);
                                    const endIndex = Math.min(chunks.length - 1, initialChunkIndex + CHUNKS_TO_LOAD);
                                    const initialLoadedChunks = chunks.slice(startIndex, endIndex + 1);
                                    // Ensure we always have at least some chunks loaded
                                    const finalLoadedChunks = initialLoadedChunks.length > 0 ? initialLoadedChunks : chunks.slice(0, Math.min(CHUNKS_TO_LOAD * 2 + 1, chunks.length));
                                    // console.log('Setting loaded chunks:', finalLoadedChunks);
                                    setLoadedChunks(finalLoadedChunks);
                                    setCurrentChunkIndex(initialChunkIndex);
                                    // Set current page for compatibility
                                    setCurrentPage(initialChunkIndex + 1);
                                    // Mark initial load as complete
                                    setIsInitialLoad(false);
                                }
                            }
                        } else {
                            // Fallback: fetch all books if specific book endpoint doesn't exist
                            const response = await fetch('/api/books');
                            const data = await response.json();
                            // console.log('API response:', { success: data.success, dataLength: data.data?.length });
                            if (data.success) {
                                const book = data.data.find({
                                    "ReaderPage.useEffect.loadBook.book": (b)=>b.id === id
                                }["ReaderPage.useEffect.loadBook.book"]);
                                // console.log('Book found:', { book: !!book, bookId: id, bookContent: book?.content?.substring(0, 100) });
                                if (book) {
                                    setBookMetadata(book);
                                    const bookContent = book.content || 'No content available';
                                    setBookContent(bookContent);
                                    // console.log('Book content length:', bookContent.length);
                                    // console.log('Book content preview:', bookContent.substring(0, 200));
                                    // Test chunking with a simple string first
                                    // const testChunks = chunkContent('This is a test. This should create at least one chunk.');
                                    // console.log('Test chunking result:', testChunks);
                                    // Chunk the content for better performance
                                    const chunks = chunkContent(bookContent);
                                    setContentChunks(chunks);
                                    setTotalPages(chunks.length);
                                    // Initialize progressive loading immediately with the chunks
                                    const initialChunkIndex = book.currentPage && book.currentPage >= 1 && book.currentPage <= chunks.length ? book.currentPage - 1 : 0;
                                    // Load initial chunks around the starting position using the chunks directly
                                    const startIndex = Math.max(0, initialChunkIndex - CHUNKS_TO_LOAD);
                                    const endIndex = Math.min(chunks.length - 1, initialChunkIndex + CHUNKS_TO_LOAD);
                                    const initialLoadedChunks = chunks.slice(startIndex, endIndex + 1);
                                    // Ensure we always have at least some chunks loaded
                                    const finalLoadedChunks = initialLoadedChunks.length > 0 ? initialLoadedChunks : chunks.slice(0, Math.min(CHUNKS_TO_LOAD * 2 + 1, chunks.length));
                                    // console.log('Initializing progressive loading:', {
                                    //   totalChunks: chunks.length,
                                    //   initialChunkIndex,
                                    //   loadedChunksCount: finalLoadedChunks.length,
                                    //   startIndex,
                                    //   endIndex
                                    // });
                                    // console.log('Setting loaded chunks:', finalLoadedChunks);
                                    setLoadedChunks(finalLoadedChunks);
                                    setCurrentChunkIndex(initialChunkIndex);
                                    // Set current page for compatibility
                                    setCurrentPage(initialChunkIndex + 1);
                                    // Mark initial load as complete
                                    setIsInitialLoad(false);
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Error loading book:', error);
                        // console.log('Falling back to mock content');
                        // Fallback to mock content
                        const mockContent = "\n# Chapter 1: The Beginning\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n## Section 1.1: The Journey Begins\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\n## Section 1.2: The First Challenge\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.\n\n# Chapter 2: The Middle\n\nNam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.\n\n## Section 2.1: The Plot Thickens\n\nItaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\n## Section 2.2: The Revelation\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\n# Chapter 3: The End\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\n## Section 3.1: The Final Battle\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.\n\nNam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n\n## Section 3.2: The Resolution\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.\n\nItaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n        ".trim();
                        setBookContent(mockContent);
                        const chunks = chunkContent(mockContent);
                        setContentChunks(chunks);
                        setTotalPages(chunks.length);
                        // Initialize progressive loading for mock content using chunks directly
                        const startIndex = Math.max(0, 0 - CHUNKS_TO_LOAD);
                        const endIndex = Math.min(chunks.length - 1, 0 + CHUNKS_TO_LOAD);
                        const initialLoadedChunks = chunks.slice(startIndex, endIndex + 1);
                        // Ensure we always have at least some chunks loaded
                        const finalLoadedChunks = initialLoadedChunks.length > 0 ? initialLoadedChunks : chunks.slice(0, Math.min(CHUNKS_TO_LOAD * 2 + 1, chunks.length));
                        // console.log('Setting loaded chunks (mock):', finalLoadedChunks);
                        setLoadedChunks(finalLoadedChunks);
                        setCurrentChunkIndex(0);
                    } finally{
                        // console.log('Setting isProcessing to false');
                        setIsProcessing(false);
                    }
                // Safety check removed - progressive loading should work now
                }
            }["ReaderPage.useEffect.loadBook"];
            loadBook();
        }
    }["ReaderPage.useEffect"], [
        id,
        chunkContent,
        loadChunksAroundIndex
    ]);
    const handleSendMessage = async ()=>{
        if (!inputMessage.trim() || isLoading) return;
        const userMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        };
        setChatMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setIsLoading(true);
        setIsThinking(true);
        setShowThinkingIndicator(false);
        setHasNewResponse(false);
        // Close chat and show minimized indicator while thinking (unless in fullscreen mode)
        if (!isFullscreen) {
            setIsChatOpen(false);
            setIsChatMinimized(true);
        }
        try {
            // Call the QA API
            const response = await fetch('/api/qa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: currentMessage,
                    bookId: id,
                    context: loadedChunks.map((chunk)=>chunk.content).join('\n\n'),
                    loadedChunkCount: loadedChunks.length,
                    totalChunkCount: contentChunks.length
                })
            });
            const data = await response.json();
            if (data.success) {
                const assistantMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    content: data.data.answer,
                    timestamp: new Date(),
                    references: data.data.references.map((ref)=>ref.id)
                };
                // Store references
                const refsMap = {};
                data.data.references.forEach((ref)=>{
                    refsMap[ref.id] = {
                        id: ref.id,
                        content: ref.content,
                        page: ref.page,
                        chapter: ref.chapter,
                        startOffset: ref.startOffset,
                        endOffset: ref.endOffset,
                        bookId: ref.bookId
                    };
                });
                setReferences((prev)=>({
                        ...prev,
                        ...refsMap
                    }));
                setChatMessages((prev)=>[
                        ...prev,
                        assistantMessage
                    ]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: 'Sorry, I encountered an error processing your question. Please try again.',
                timestamp: new Date()
            };
            setChatMessages((prev)=>[
                    ...prev,
                    errorMessage
                ]);
        } finally{
            setIsLoading(false);
            setIsThinking(false);
            setShowThinkingIndicator(true);
            // Only set new response notification if not in fullscreen mode
            if (!isFullscreen) {
                setHasNewResponse(true);
            }
            // Show thinking indicator for 2 seconds, then show notification
            setTimeout(()=>{
                setShowThinkingIndicator(false);
            }, 2000);
        }
    };
    const handleKeyPress = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleChatClick = ()=>{
        if (hasNewResponse) {
            // Open full screen when there's a new response
            setIsChatOpen(true);
            setIsChatMinimized(false);
            setIsFullscreen(true);
            setHasNewResponse(false);
        } else {
            // Toggle chat normally
            setIsChatOpen(!isChatOpen);
            setIsChatMinimized(false);
            // Only exit fullscreen if we're closing the chat
            if (!isChatOpen) {
                setIsFullscreen(false);
            }
        }
    };
    const toggleRef = (messageId, refId)=>{
        if (openRefMessageId === messageId && openRefId === refId) {
            setOpenRefMessageId(null);
            setOpenRefId(null);
        } else {
            setOpenRefMessageId(messageId);
            setOpenRefId(refId);
        }
    };
    const navigateToReference = (pageNumber)=>{
        setCurrentPage(pageNumber);
        // Close chat to show the reference
        setIsChatOpen(false);
        setIsChatMinimized(false);
    };
    const loadInlineReferenceContent = (startOffset, endOffset)=>{
        console.log('Loading inline reference content for book_1757773062667_nr0jeva:', {
            startOffset,
            endOffset,
            bookContentLength: bookContent === null || bookContent === void 0 ? void 0 : bookContent.length
        });
        if (bookContent) {
            // If endOffset is provided, use the range; otherwise use startOffset as center point
            const actualStart = endOffset ? startOffset : Math.max(0, startOffset - 25);
            const actualEnd = endOffset ? endOffset : Math.min(bookContent.length, startOffset + 25);
            console.log('Actual range:', {
                actualStart,
                actualEnd
            });
            // Extract content around the range (e.g., 2000 characters before and after)
            const contextStart = Math.max(0, actualStart - 1000);
            const contextEnd = Math.min(bookContent.length, actualEnd + 1000);
            const content = bookContent.substring(contextStart, contextEnd);
            console.log('Context range:', {
                contextStart,
                contextEnd,
                contentLength: content.length
            });
            // Calculate the position of the reference within the context
            const refStartInContext = actualStart - contextStart;
            const refEndInContext = actualEnd - contextStart;
            // Split content into before, reference, and after parts
            const beforeRef = content.substring(0, refStartInContext);
            const refText = content.substring(refStartInContext, refEndInContext);
            const afterRef = content.substring(refEndInContext);
            console.log('Reference text:', refText);
            // Create highlighted content
            const highlightedContent = beforeRef + '<mark class="bg-yellow-200 px-1 rounded">'.concat(refText, "</mark>") + afterRef;
            return highlightedContent;
        }
        return '';
    };
    // When expanding references for a message, prefetch any referenced book contents not yet loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReaderPage.useEffect": ()=>{
            const prefetchReferencedBooks = {
                "ReaderPage.useEffect.prefetchReferencedBooks": async ()=>{
                    if (!openRefMessageId || !openRefId) return;
                    const msg = chatMessages.find({
                        "ReaderPage.useEffect.prefetchReferencedBooks.msg": (m)=>m.id === openRefMessageId
                    }["ReaderPage.useEffect.prefetchReferencedBooks.msg"]);
                    if (!msg || !msg.references) return;
                    const bookIds = new Set();
                    for (const refId of msg.references){
                        const ref = references[refId];
                        if (ref && ref.bookId && ref.bookId !== id) {
                            bookIds.add(ref.bookId);
                        }
                    }
                    for (const bookId of bookIds){
                        if (referencedBooks[bookId] || loadingBookIds[bookId]) continue;
                        setLoadingBookIds({
                            "ReaderPage.useEffect.prefetchReferencedBooks": (prev)=>({
                                    ...prev,
                                    [bookId]: true
                                })
                        }["ReaderPage.useEffect.prefetchReferencedBooks"]);
                        try {
                            var _data_data;
                            const resp = await fetch("/api/books/".concat(bookId));
                            if (!resp.ok) throw new Error('Failed to fetch referenced book');
                            const data = await resp.json();
                            if (!data.success || !((_data_data = data.data) === null || _data_data === void 0 ? void 0 : _data_data.content)) throw new Error('Invalid referenced book data');
                            const book = data.data;
                            const chunks = chunkContent(book.content || '');
                            // compute chunk starts
                            const starts = [];
                            let acc = 0;
                            for (const ch of chunks){
                                starts.push(acc);
                                acc += ch.content.length;
                            }
                            setReferencedBooks({
                                "ReaderPage.useEffect.prefetchReferencedBooks": (prev)=>({
                                        ...prev,
                                        [bookId]: {
                                            content: book.content || '',
                                            chunks,
                                            chunkStarts: starts,
                                            title: book.title
                                        }
                                    })
                            }["ReaderPage.useEffect.prefetchReferencedBooks"]);
                        } catch (e) {
                            console.error('Error prefetching referenced book', bookId, e);
                        } finally{
                            setLoadingBookIds({
                                "ReaderPage.useEffect.prefetchReferencedBooks": (prev)=>({
                                        ...prev,
                                        [bookId]: false
                                    })
                            }["ReaderPage.useEffect.prefetchReferencedBooks"]);
                        }
                    }
                }
            }["ReaderPage.useEffect.prefetchReferencedBooks"];
            prefetchReferencedBooks();
        }
    }["ReaderPage.useEffect"], [
        openRefMessageId,
        openRefId,
        chatMessages,
        references,
        id,
        referencedBooks,
        loadingBookIds,
        chunkContent
    ]);
    // Page selection functions
    const handlePageSelect = ()=>{
        const pageNum = parseInt(pageInput);
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
            setShowPageSelector(false);
            setPageInput('');
        }
    };
    const handlePageInputKeyPress = (e)=>{
        if (e.key === 'Enter') {
            handlePageSelect();
        } else if (e.key === 'Escape') {
            setShowPageSelector(false);
            setPageInput('');
        }
    };
    // Get loaded chunks for progressive loading
    const allChunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReaderPage.useMemo[allChunks]": ()=>{
            // console.log('allChunks useMemo:', {
            //   loadedChunksLength: loadedChunks.length,
            //   contentChunksLength: contentChunks.length,
            //   loadedChunks: loadedChunks,
            //   contentChunks: contentChunks
            // });
            return loadedChunks; // Return only loaded chunks for progressive loading
        }
    }["ReaderPage.useMemo[allChunks]"], [
        loadedChunks,
        contentChunks
    ]);
    // Reset scroll position to top when page changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReaderPage.useEffect": ()=>{
            if (contentContainerRef.current && !isInitialLoad) {
                contentContainerRef.current.scrollTop = 0;
            }
        }
    }["ReaderPage.useEffect"], [
        currentPage,
        isInitialLoad
    ]);
    // Save current page to database
    const saveCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[saveCurrentPage]": async (page)=>{
            if (id && page > 0 && totalPages > 0) {
                try {
                    const response = await fetch("/api/books/".concat(id, "/current-page"), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            currentPage: page
                        })
                    });
                    await response.json();
                } catch (error) {
                    console.error('Error saving current page:', error);
                }
            }
        }
    }["ReaderPage.useCallback[saveCurrentPage]"], [
        id,
        totalPages
    ]);
    // Navigation functions
    const goToNextPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[goToNextPage]": ()=>{
            if (currentPage < totalPages) {
                setCurrentPage({
                    "ReaderPage.useCallback[goToNextPage]": (prev)=>prev + 1
                }["ReaderPage.useCallback[goToNextPage]"]);
            }
        }
    }["ReaderPage.useCallback[goToNextPage]"], [
        currentPage,
        totalPages
    ]);
    const goToPreviousPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReaderPage.useCallback[goToPreviousPage]": ()=>{
            if (currentPage > 1) {
                setCurrentPage({
                    "ReaderPage.useCallback[goToPreviousPage]": (prev)=>prev - 1
                }["ReaderPage.useCallback[goToPreviousPage]"]);
            }
        }
    }["ReaderPage.useCallback[goToPreviousPage]"], [
        currentPage
    ]);
    // Memoized markdown component
    const MemoizedMarkdown = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((param)=>{
        let { content } = param;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
            remarkPlugins: [
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
            ],
            components: {
                h1: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-gray-900 mt-0 mb-4",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1227,
                        columnNumber: 31
                    }, void 0);
                },
                h2: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold text-gray-800 mt-0 mb-3",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1228,
                        columnNumber: 31
                    }, void 0);
                },
                h3: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-gray-700 mt-0 mb-2",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1229,
                        columnNumber: 31
                    }, void 0);
                },
                p: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 leading-relaxed text-base",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1230,
                        columnNumber: 30
                    }, void 0);
                },
                ul: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc list-inside mb-4 space-y-1 ml-2",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1231,
                        columnNumber: 31
                    }, void 0);
                },
                ol: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "list-none mb-4 space-y-1 ml-2",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1232,
                        columnNumber: 31
                    }, void 0);
                },
                li: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "text-base leading-relaxed",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1233,
                        columnNumber: 31
                    }, void 0);
                },
                strong: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "font-semibold text-gray-900",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1234,
                        columnNumber: 35
                    }, void 0);
                },
                em: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                        className: "italic text-gray-700",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1235,
                        columnNumber: 31
                    }, void 0);
                },
                blockquote: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                        className: "border-l-4 border-amber-300 pl-4 italic text-gray-600 my-4 text-base",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1236,
                        columnNumber: 39
                    }, void 0);
                },
                code: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "bg-gray-100 px-2 py-1 rounded text-sm font-mono",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1237,
                        columnNumber: 33
                    }, void 0);
                },
                pre: (param)=>{
                    let { children } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "bg-gray-100 p-3 rounded-lg overflow-x-auto my-4 text-sm",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1238,
                        columnNumber: 32
                    }, void 0);
                }
            },
            children: content
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
            lineNumber: 1224,
            columnNumber: 7
        }, this);
    });
    MemoizedMarkdown.displayName = 'MemoizedMarkdown';
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReaderPage.useEffect": ()=>{
            const handleKeyDown = {
                "ReaderPage.useEffect.handleKeyDown": (e)=>{
                    // Only handle shortcuts when not typing in input fields
                    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                        return;
                    }
                    switch(e.key){
                        case 'm':
                            if (e.ctrlKey || e.metaKey) {
                                e.preventDefault();
                                handleChatClick();
                            }
                            break;
                        case 'Escape':
                            if (isChatOpen) {
                                if (isFullscreen) {
                                    setIsFullscreen(false);
                                } else {
                                    setIsChatOpen(false);
                                }
                            } else if (isChatMinimized) {
                                setIsChatMinimized(false);
                            }
                            break;
                        case 'Home':
                            e.preventDefault();
                            if (contentContainerRef.current) {
                                contentContainerRef.current.scrollTop = 0;
                            }
                            break;
                        case 'End':
                            e.preventDefault();
                            if (contentContainerRef.current) {
                                contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
                            }
                            break;
                    }
                }
            }["ReaderPage.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "ReaderPage.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["ReaderPage.useEffect"];
        }
    }["ReaderPage.useEffect"], [
        isChatOpen,
        handleChatClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: 0.95
                                            },
                                            className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                className: "h-5 w-5 text-gray-600"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1307,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1302,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                className: "h-6 w-6 text-amber-600"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: (bookMetadata === null || bookMetadata === void 0 ? void 0 : bookMetadata.title) || 'Loading...'
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1312,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1310,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                lineNumber: 1300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
                                        title: "Settings (Coming Soon)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            className: "h-5 w-5 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: handleChatClick,
                                        className: "p-2 rounded-lg transition-colors relative ".concat(hasNewResponse ? 'bg-green-600 hover:bg-green-700 text-white animate-pulse' : 'bg-amber-600 hover:bg-amber-700 text-white'),
                                        title: hasNewResponse ? "New response available! Click to view" : "Toggle Chat (Ctrl+M)",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1333,
                                                columnNumber: 17
                                            }, this),
                                            hasNewResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1335,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1322,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                lineNumber: 1315,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1299,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                    lineNumber: 1298,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                lineNumber: 1297,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 h-screen overflow-y-auto transition-all duration-300 ".concat(isChatOpen && !isFullscreen ? 'mr-80' : ''),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-full",
                            children: [
                                isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-lg p-8 h-[calc(100vh-12rem)] flex flex-col overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1354,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600",
                                                    children: "Processing book content..."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1355,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1353,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 flex-1 flex flex-col justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-6 bg-gray-200 rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1360,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1362,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse w-3/4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1363,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse w-1/2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1364,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1361,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-5 bg-gray-200 rounded animate-pulse w-1/3"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1366,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1368,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse w-5/6"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1369,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse w-2/3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1370,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1367,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1373,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse w-4/5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1374,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded animate-pulse w-3/5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1375,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1372,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1359,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1352,
                                    columnNumber: 15
                                }, this),
                                !isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-lg p-8 h-[calc(100vh-12rem)] flex flex-col relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: contentContainerRef,
                                        className: "text-gray-800 leading-relaxed flex-1 overflow-y-auto",
                                        onScroll: handleScroll,
                                        children: [
                                            allChunks.map((chunk, index)=>{
                                                // Create a unique key that includes the chunk's position in the loaded array
                                                const uniqueKey = "".concat(chunk.id, "-loaded-").concat(index);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-12",
                                                    children: [
                                                        chunk.chapter && index === 0 && chunk.chapter.length > 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-8 p-6 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-semibold text-amber-800",
                                                                children: chunk.chapter
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                lineNumber: 1396,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1395,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "prose prose-lg max-w-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemoizedMarkdown, {
                                                                content: chunk.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                lineNumber: 1400,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1399,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, uniqueKey, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1393,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            allChunks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center text-gray-500 flex items-center justify-center h-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                            className: "h-12 w-12 mx-auto mb-4 text-gray-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "No content available for this section."
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1410,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1408,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1407,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1384,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1383,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                            lineNumber: 1348,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isChatOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
                            initial: {
                                x: 320
                            },
                            animate: {
                                x: 0
                            },
                            exit: {
                                x: 320
                            },
                            className: "fixed right-0 top-16 bottom-0 bg-white shadow-xl border-l border-gray-200 flex flex-col z-30 ".concat(isFullscreen ? 'w-full' : 'w-80'),
                            children: [
                                !isFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsFullscreen(true),
                                    className: "absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-16 bg-amber-600 hover:bg-amber-700 text-white rounded-l-lg flex items-center justify-center transition-colors z-40",
                                    title: "Expand to fullscreen",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1455,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1450,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border-b border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "AI Assistant"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1461,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setIsFullscreen(!isFullscreen),
                                                        className: "p-1 hover:bg-gray-100 rounded transition-colors",
                                                        title: isFullscreen ? "Exit fullscreen" : "Fullscreen",
                                                        children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                            className: "h-4 w-4 text-gray-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1468,
                                                            columnNumber: 39
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                            className: "h-4 w-4 text-gray-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1468,
                                                            columnNumber: 89
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                        lineNumber: 1463,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setIsChatOpen(false),
                                                        className: "p-1 hover:bg-gray-100 rounded transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "h-4 w-4 text-gray-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1474,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                        lineNumber: 1470,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1462,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1460,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1459,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: chatContainerRef,
                                    className: "flex-1 overflow-y-auto p-4 space-y-4",
                                    children: [
                                        chatMessages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center text-gray-500 py-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "h-12 w-12 mx-auto mb-4 text-gray-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1487,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Ask me anything about this book!"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1488,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1486,
                                            columnNumber: 19
                                        }, this) : chatMessages.map((message)=>{
                                            // Group references by paragraph index: manual assignment for testing
                                            const refGroups = {};
                                            if (message.references && message.references.length) {
                                                const paragraphs = message.content.split(/\n{2,}/);
                                                // For test message, manually assign references to paragraphs
                                                if (message.id === 'test-message') {
                                                    // First paragraph: ref-para-1a, ref-para-1b
                                                    refGroups[0] = [
                                                        'ref-para-1a',
                                                        'ref-para-1b'
                                                    ];
                                                    // Second paragraph: ref-para-2a, ref-para-2b  
                                                    refGroups[1] = [
                                                        'ref-para-2a',
                                                        'ref-para-2b'
                                                    ];
                                                    // Third paragraph: ref-para-3a, ref-para-3b, ref-para-3c
                                                    refGroups[2] = [
                                                        'ref-para-3a',
                                                        'ref-para-3b',
                                                        'ref-para-3c'
                                                    ];
                                                } else {
                                                    // For other messages, use the original distribution logic
                                                    message.references.forEach((refId)=>{
                                                        const ref = references[refId];
                                                        let targetIdx = paragraphs.length - 1;
                                                        if (ref && typeof ref.startOffset === 'number' && typeof ref.endOffset === 'number') {
                                                            // Distribute by position in full content if available (fallback to last paragraph)
                                                            const len = message.content.length;
                                                            const pos = Math.min(Math.max(ref.startOffset, 0), len);
                                                            let acc = 0;
                                                            for(let i = 0; i < paragraphs.length; i++){
                                                                const next = acc + paragraphs[i].length + (i < paragraphs.length - 1 ? 2 : 0);
                                                                if (pos <= next) {
                                                                    targetIdx = i;
                                                                    break;
                                                                }
                                                                acc = next;
                                                            }
                                                        }
                                                        if (!refGroups[targetIdx]) refGroups[targetIdx] = [];
                                                        refGroups[targetIdx].push(refId);
                                                    });
                                                }
                                            }
                                            const renderRefBlock = (refId)=>{
                                                var _referencedBooks_ref_bookId, _referencedBooks_ref_bookId1, _referencedBooks_ref_bookId2, _referencedBooks_ref_bookId3;
                                                const ref = references[refId];
                                                if (!ref) return null;
                                                let refStart = typeof ref.startOffset === 'number' ? ref.startOffset : -1;
                                                let refEnd = typeof ref.endOffset === 'number' ? ref.endOffset : -1;
                                                const useCurrentBook = !ref.bookId || ref.bookId === id;
                                                const sourceContent = useCurrentBook ? bookContent : (_referencedBooks_ref_bookId = referencedBooks[ref.bookId]) === null || _referencedBooks_ref_bookId === void 0 ? void 0 : _referencedBooks_ref_bookId.content;
                                                const sourceChunks = useCurrentBook ? contentChunks : ((_referencedBooks_ref_bookId1 = referencedBooks[ref.bookId]) === null || _referencedBooks_ref_bookId1 === void 0 ? void 0 : _referencedBooks_ref_bookId1.chunks) || [];
                                                const sourceStarts = useCurrentBook ? chunkStartOffsets : ((_referencedBooks_ref_bookId2 = referencedBooks[ref.bookId]) === null || _referencedBooks_ref_bookId2 === void 0 ? void 0 : _referencedBooks_ref_bookId2.chunkStarts) || [];
                                                if (refStart < 0 && ref.content && sourceContent) {
                                                    const idx = sourceContent.indexOf(ref.content);
                                                    if (idx >= 0) {
                                                        refStart = idx;
                                                        refEnd = idx + ref.content.length;
                                                    }
                                                }
                                                if (refStart < 0 || refEnd <= refStart) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-amber-700",
                                                        children: "Unable to locate reference range in the book content."
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                        lineNumber: 1545,
                                                        columnNumber: 27
                                                    }, this);
                                                }
                                                const pagesToRender = [];
                                                for(let i = 0; i < sourceChunks.length; i++){
                                                    var _sourceStarts_i;
                                                    const cStart = (_sourceStarts_i = sourceStarts[i]) !== null && _sourceStarts_i !== void 0 ? _sourceStarts_i : 0;
                                                    const cEnd = cStart + sourceChunks[i].content.length;
                                                    if (refStart < cEnd && refEnd > cStart) {
                                                        pagesToRender.push(i);
                                                    }
                                                    if (cStart > refEnd) break;
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        height: 0
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        height: 'auto'
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        height: 0
                                                    },
                                                    className: "rounded-lg p-3 ".concat(message.type === 'user' ? 'bg-gray-200 text-gray-800 border border-gray-300' : 'bg-gray-200 text-gray-800 border border-gray-300'),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm mb-2 text-gray-700",
                                                            children: [
                                                                ref.chapter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: ref.chapter
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1569,
                                                                    columnNumber: 45
                                                                }, this),
                                                                ref.page && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-2 text-amber-600",
                                                                    children: [
                                                                        "(Page ",
                                                                        ref.page,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1570,
                                                                    columnNumber: 42
                                                                }, this),
                                                                !useCurrentBook && ref.bookId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-2 text-gray-500",
                                                                    children: [
                                                                        "[",
                                                                        ((_referencedBooks_ref_bookId3 = referencedBooks[ref.bookId]) === null || _referencedBooks_ref_bookId3 === void 0 ? void 0 : _referencedBooks_ref_bookId3.title) || ref.bookId,
                                                                        "]"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1571,
                                                                    columnNumber: 63
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1568,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-h-80 overflow-y-auto",
                                                            children: pagesToRender.map((pi)=>{
                                                                const chunk = sourceChunks[pi];
                                                                var _sourceStarts_pi;
                                                                const cStart = (_sourceStarts_pi = sourceStarts[pi]) !== null && _sourceStarts_pi !== void 0 ? _sourceStarts_pi : 0;
                                                                const html = highlightRangeInChunk(chunk.content, cStart, refStart, refEnd);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-3 border-b last:border-b-0 border-gray-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs mb-2 text-gray-500",
                                                                            children: [
                                                                                "Page ",
                                                                                chunk.page,
                                                                                chunk.chapter ? " • ".concat(chunk.chapter) : ''
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                            lineNumber: 1580,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm leading-relaxed whitespace-pre-wrap text-gray-700",
                                                                            dangerouslySetInnerHTML: {
                                                                                __html: html
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                            lineNumber: 1581,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, chunk.id, true, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1579,
                                                                    columnNumber: 33
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1573,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1558,
                                                    columnNumber: 25
                                                }, this);
                                            };
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatMessageComponent, {
                                                message: message,
                                                isFullscreen: isFullscreen,
                                                refGroups: refGroups,
                                                openRefMessageId: openRefMessageId,
                                                openRefId: openRefId,
                                                onToggleRef: toggleRef,
                                                renderRefBlock: renderRefBlock
                                            }, message.id, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1591,
                                                columnNumber: 23
                                            }, this);
                                        }),
                                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            className: "flex justify-start",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-100 rounded-lg px-4 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1616,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex space-x-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1618,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                                                    style: {
                                                                        animationDelay: '0.1s'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1619,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                                                    style: {
                                                                        animationDelay: '0.2s'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                                    lineNumber: 1620,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1617,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1615,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1614,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1609,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1481,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border-t border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: chatInputRef,
                                                type: "text",
                                                value: inputMessage,
                                                onChange: (e)=>setInputMessage(e.target.value),
                                                onKeyPress: handleKeyPress,
                                                placeholder: "Ask about the book...",
                                                className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent",
                                                disabled: isLoading
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1631,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: 0.95
                                                },
                                                onClick: handleSendMessage,
                                                disabled: !inputMessage.trim() || isLoading,
                                                className: "px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1648,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1641,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                        lineNumber: 1630,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1629,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                            lineNumber: 1440,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1438,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isChatMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                y: 100,
                                opacity: 0
                            },
                            animate: {
                                y: 0,
                                opacity: 1
                            },
                            exit: {
                                y: 100,
                                opacity: 0
                            },
                            className: "fixed bottom-6 right-6 z-40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white p-4 rounded-lg shadow-lg ".concat(hasNewResponse ? 'bg-green-600' : 'bg-amber-600'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        hasNewResponse ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    className: "h-4 w-4 animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1671,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "Response ready!"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1672,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex space-x-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 bg-white rounded-full animate-bounce"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1677,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 bg-white rounded-full animate-bounce",
                                                            style: {
                                                                animationDelay: '0.1s'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1678,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 bg-white rounded-full animate-bounce",
                                                            style: {
                                                                animationDelay: '0.2s'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                            lineNumber: 1679,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1676,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "AI is thinking..."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                    lineNumber: 1681,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setIsChatMinimized(false);
                                                setIsChatOpen(true);
                                                if (hasNewResponse) {
                                                    setIsFullscreen(true);
                                                }
                                            },
                                            className: "ml-2 p-1 hover:bg-opacity-80 rounded transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                                lineNumber: 1694,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1684,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1668,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                lineNumber: 1665,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                            lineNumber: 1659,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1657,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showThinkingIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.8
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.8
                            },
                            className: "fixed bottom-6 right-6 z-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-green-600 text-white p-4 rounded-full shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "h-5 w-5 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1713,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: "Done thinking!"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                            lineNumber: 1714,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                    lineNumber: 1712,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                                lineNumber: 1711,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                            lineNumber: 1705,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                        lineNumber: 1703,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
                lineNumber: 1343,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/reader/[id]/page.tsx",
        lineNumber: 1295,
        columnNumber: 5
    }, this);
}
_s(ReaderPage, "VcJkDzeYCsFLT/ZUNUitAuWdJN4=");
_c1 = ReaderPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatMessageComponent");
__turbopack_context__.k.register(_c1, "ReaderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_app_reader_%5Bid%5D_page_tsx_b8a055a1._.js.map