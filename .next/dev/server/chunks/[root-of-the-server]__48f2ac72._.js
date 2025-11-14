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
"[project]/gemini-next-app/pages/api/users/[id].ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/lib/db.ts [api] (ecmascript)");
;
async function handler(req, res) {
    const { id } = req.query;
    if (typeof id !== 'string') {
        return res.status(400).json({
            error: 'Invalid user ID'
        });
    }
    switch(req.method){
        case 'GET':
            // Get a single user by ID
            try {
                const { rows } = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('SELECT * FROM users WHERE id = $1', [
                    id
                ]);
                if (rows.length === 0) {
                    return res.status(404).json({
                        error: 'User not found'
                    });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: error.message
                    });
                } else {
                    res.status(500).json({
                        error: 'An unknown error occurred'
                    });
                }
            }
            break;
        case 'PUT':
            // Update a user by ID
            try {
                const { name } = req.body;
                if (!name) {
                    return res.status(400).json({
                        error: 'Name is required for update'
                    });
                }
                const { rows } = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [
                    name,
                    id
                ]);
                if (rows.length === 0) {
                    return res.status(404).json({
                        error: 'User not found'
                    });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: error.message
                    });
                } else {
                    res.status(500).json({
                        error: 'An unknown error occurred'
                    });
                }
            }
            break;
        case 'DELETE':
            // Delete a user by ID
            try {
                const { rowCount } = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM users WHERE id = $1', [
                    id
                ]);
                if (rowCount === 0) {
                    return res.status(404).json({
                        error: 'User not found'
                    });
                }
                res.status(204).end(); // 204 No Content
            } catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: error.message
                    });
                } else {
                    res.status(500).json({
                        error: 'An unknown error occurred'
                    });
                }
            }
            break;
        default:
            res.setHeader('Allow', [
                'GET',
                'PUT',
                'DELETE'
            ]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__48f2ac72._.js.map