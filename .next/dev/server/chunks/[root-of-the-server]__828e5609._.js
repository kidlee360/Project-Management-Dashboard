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
"[project]/gemini-next-app/pages/api/users.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gemini-next-app/lib/db.ts [api] (ecmascript)");
;
async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name } = req.body; // Assuming you are sending a 'name' property
            if (!name) {
                return res.status(400).json({
                    error: 'Name is required'
                });
            }
            const { rows } = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO users (name) VALUES ($1) RETURNING *', [
                name
            ]);
            res.status(201).json(rows[0]);
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
    } else if (req.method === 'GET') {
        try {
            const { rows } = await __TURBOPACK__imported__module__$5b$project$5d2f$gemini$2d$next$2d$app$2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('SELECT * FROM users');
            res.status(200).json(rows);
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
    } else {
        res.setHeader('Allow', [
            'GET',
            'POST'
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__828e5609._.js.map