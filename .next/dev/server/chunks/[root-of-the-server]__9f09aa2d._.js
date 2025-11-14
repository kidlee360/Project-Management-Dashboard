module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pg", () => require("pg"));

module.exports = mod;
}),
"[project]/gemini-next-app/lib/db.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, cjs)");
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__cjs$29$__["Pool"]({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT ? parseInt(process.env.PGSQL_PORT, 10) : undefined,
    database: process.env.PGSQL_DATABASE
});
const __TURBOPACK__default__export__ = pool;
}),
"[project]/gemini-next-app/pages/api/users/id.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT,
    "default",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/lib/db.ts [api] (ecmascript)");
;
async function GET(request) {
    //request hasn't been used but can be utilized for query parameters if needed
    try {
        const userId = 1; // Example user ID
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('SELECT * FROM users WHERE id = $1', [
            userId
        ]);
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Database Error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch tasks.'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
async function POST(request) {
    const { title, column, priority } = await request.json();
    const userId = 1; // Example user ID
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO tasks (title, column_status, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [
            title,
            column,
            priority,
            userId
        ]);
        return NextResponse.json(result.rows[0], {
            status: 201
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message
            }, {
                status: 500
            });
        } else {
            return NextResponse.json({
                error: 'Failed to insert task'
            }, {
                status: 500
            });
        }
    }
}
async function PUT(request) {
    const { id, title, column, priority } = await request.json();
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('UPDATE tasks SET title = $1, column_status = $2, priority = $3 WHERE id = $4 RETURNING *', [
            title,
            column,
            priority,
            id
        ]);
        if (result.rows.length === 0) {
            return NextResponse.json({
                error: 'Task not found'
            }, {
                status: 404
            });
        }
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message
            }, {
                status: 500
            });
        } else {
            return NextResponse.json({
                error: 'Failed to update task'
            }, {
                status: 500
            });
        }
    }
}
async function DELETE(request) {
    const { id } = await request.json();
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM tasks WHERE id = $1 RETURNING *', [
            id
        ]);
        if (result.rows.length === 0) {
            return NextResponse.json({
                error: 'Task not found'
            }, {
                status: 404
            });
        }
        return NextResponse.json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message
            }, {
                status: 500
            });
        } else {
            return NextResponse.json({
                error: 'Failed to delete task'
            }, {
                status: 500
            });
        }
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9f09aa2d._.js.map