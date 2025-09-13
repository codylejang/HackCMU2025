module.exports = [
"[project]/.next-internal/server/app/api/qa/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/qa/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Backend API configuration
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5055';
async function POST(request) {
    try {
        const body = await request.json();
        const { question, bookId, context } = body;
        if (!question || !bookId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Question and bookId are required'
            }, {
                status: 400
            });
        }
        // Try to connect to the backend Open Notebook API
        try {
            // First, check if backend is available
            const healthResponse = await fetch(`${BACKEND_API_URL}/health`);
            if (!healthResponse.ok) {
                throw new Error('Backend not available');
            }
            // Get available models from backend
            const modelsResponse = await fetch(`${BACKEND_API_URL}/api/models`);
            if (!modelsResponse.ok) {
                throw new Error('Could not fetch models from backend');
            }
            const models = await modelsResponse.json();
            // Find suitable models for the ask operation
            const strategyModel = models.find((m)=>m.type === 'chat' || m.type === 'completion')?.id;
            const answerModel = models.find((m)=>m.type === 'chat' || m.type === 'completion')?.id;
            const finalAnswerModel = models.find((m)=>m.type === 'chat' || m.type === 'completion')?.id;
            if (!strategyModel || !answerModel || !finalAnswerModel) {
                throw new Error('No suitable models found in backend');
            }
            // Call the backend ask endpoint
            const askResponse = await fetch(`${BACKEND_API_URL}/api/search/ask/simple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    context: context,
                    bookId: bookId,
                    strategy_model: strategyModel,
                    answer_model: answerModel,
                    final_answer_model: finalAnswerModel
                })
            });
            if (!askResponse.ok) {
                const errorData = await askResponse.json();
                throw new Error(`Backend ask failed: ${errorData.detail || 'Unknown error'}`);
            }
            const askData = await askResponse.json();
            // Transform backend response to frontend format
            const response = {
                answer: askData.answer,
                references: [
                    {
                        id: 'backend-ref-1',
                        content: 'This answer was generated by the Open Notebook backend using AI models and vector search.',
                        page: 1,
                        chapter: 'AI Generated Response',
                        relevanceScore: 0.95
                    }
                ]
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: response,
                source: 'backend'
            });
        } catch (backendError) {
            console.warn('Backend connection failed, using AI-powered response:', backendError);
            // Generate a real AI response using OpenAI API directly
            try {
                const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful AI assistant that answers questions about books and content. Provide detailed, accurate, and helpful responses with proper context.'
                            },
                            {
                                role: 'user',
                                content: `Question: ${question}\n\nContext: ${context || 'No specific context provided'}\n\nPlease provide a comprehensive answer to this question.`
                            }
                        ],
                        max_tokens: 1000,
                        temperature: 0.7
                    })
                });
                if (!openaiResponse.ok) {
                    throw new Error('OpenAI API request failed');
                }
                const openaiData = await openaiResponse.json();
                const aiAnswer = openaiData.choices[0]?.message?.content || 'Unable to generate response';
                const response = {
                    answer: aiAnswer,
                    references: [
                        {
                            id: 'ai-ref-1',
                            content: 'This answer was generated by AI using OpenAI GPT-3.5-turbo model.',
                            page: 1,
                            chapter: 'AI Generated Response',
                            relevanceScore: 0.95
                        }
                    ]
                };
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    data: response,
                    source: 'openai'
                });
            } catch (aiError) {
                console.error('AI API Error:', aiError);
                // Final fallback - simple response
                const simpleResponse = {
                    answer: `I understand you're asking: "${question}". While I don't have access to the full backend system right now, I can help you with general information about this topic. Could you provide more context about what specific aspect you'd like to know about?`,
                    references: [
                        {
                            id: 'simple-ref-1',
                            content: 'This is a basic response while the full AI system is being set up.',
                            page: 1,
                            chapter: 'Basic Response',
                            relevanceScore: 0.8
                        }
                    ]
                };
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    data: simpleResponse,
                    source: 'fallback'
                });
            }
        }
    } catch (error) {
        console.error('QA API Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to process question'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__49c0423d._.js.map