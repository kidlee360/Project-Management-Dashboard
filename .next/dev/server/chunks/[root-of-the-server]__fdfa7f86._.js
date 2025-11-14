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
"[project]/lib/db.ts [api] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/cookie [external] (cookie, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("cookie", () => require("cookie"));

module.exports = mod;
}),
"[project]/pages/api/tasks.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/api/tasks.js (Requires the 'pages/api' folder structure)
__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$cookie__$5b$external$5d$__$28$cookie$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/cookie [external] (cookie, cjs)");
;
;
async function handler(req, res) {
    const cookies = __TURBOPACK__imported__module__$5b$externals$5d2f$cookie__$5b$external$5d$__$28$cookie$2c$__cjs$29$__["default"].parse(req.headers.cookie || '');
    if (req.method === 'GET') {
        try {
            const userId = cookies.user_id;
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC', [
                userId
            ]);
            // 💡 Fix: Use the standard Pages Router method for JSON response
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({
                error: 'Failed to fetch tasks.'
            });
        }
    } else if (req.method === 'POST') {
        try {
            const [task, description, due_date, columnname, priority] = req.body;
            const userId = cookies.user_id;
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO tasks (task, description, due_date, columnname, priority, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
                task,
                description,
                due_date,
                columnname,
                priority,
                userId
            ]);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({
                error: 'Failed to create task.'
            });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, task, description, due_date, columnname, priority } = req.body;
            const userId = cookies.user_id;
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('UPDATE tasks SET task = $1, description = $2, due_date = $3, columnname = $4, priority = $5 WHERE id = $6 RETURNING *', [
                task,
                description,
                due_date,
                columnname,
                priority,
                id
            ]);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({
                error: 'Failed to update task.'
            });
        }
    } else if (req.method === 'DELETE') {
        try {
            // 1. Get the task ID from the request body
            // Note: DELETE requests typically send data in the body or query params.
            // Sending in the body (req.body) is often cleaner for complex data.
            const { id } = req.body;
            const userId = cookies.user_id; // Assuming auth checks later
            // 2. Execute the PostgreSQL DELETE command
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id', [
                id,
                userId
            ] // Use parameterized query for security
            );
            // 3. Check if a row was actually deleted
            if (result.rowCount === 0) {
                // Task not found or not owned by the user
                return res.status(404).json({
                    error: 'Task not found or unauthorized.'
                });
            }
            // 4. Send a success response (typically status 204 or the ID of the deleted item)
            // 200 is also acceptable if you want to send JSON back.
            res.status(200).json({
                id: id,
                message: 'Task deleted successfully.'
            });
        } catch (error) {
            console.error('Database Delete Error:', error);
            res.status(500).json({
                error: 'Failed to delete task.'
            });
        }
    } else if (req.method === 'PATCH') {
        try {
            const { id, columnname } = req.body;
            if (!id || !columnname) {
                return res.status(400).json({
                    error: 'Task ID and column name are required.'
                });
            }
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].query('UPDATE tasks SET columnname = $1 WHERE id = $2 RETURNING *', [
                columnname,
                id
            ]);
            if (result.rowCount === 0) {
                return res.status(404).json({
                    error: 'Task not found.'
                });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({
                error: 'Failed to update task column.'
            });
        }
    } else {
        // Handle other methods like POST, PUT, DELETE
        res.setHeader('Allow', [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH'
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fdfa7f86._.js.map