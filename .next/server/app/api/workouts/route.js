"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/workouts/route";
exports.ids = ["app/api/workouts/route"];
exports.modules = {

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("better-sqlite3");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fworkouts%2Froute&page=%2Fapi%2Fworkouts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fworkouts%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fworkouts%2Froute&page=%2Fapi%2Fworkouts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fworkouts%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_LaZER_Desktop_GymBro_GymBro_app_api_workouts_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/workouts/route.ts */ \"(rsc)/./app/api/workouts/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/workouts/route\",\n        pathname: \"/api/workouts\",\n        filename: \"route\",\n        bundlePath: \"app/api/workouts/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\LaZER\\\\Desktop\\\\GymBro\\\\GymBro\\\\app\\\\api\\\\workouts\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_LaZER_Desktop_GymBro_GymBro_app_api_workouts_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/workouts/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ3b3Jrb3V0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGd29ya291dHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ3b3Jrb3V0cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMYVpFUiU1Q0Rlc2t0b3AlNUNHeW1Ccm8lNUNHeW1Ccm8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xhWkVSJTVDRGVza3RvcCU1Q0d5bUJybyU1Q0d5bUJybyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN1QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL2d5bWJyby8/ZGNmZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxMYVpFUlxcXFxEZXNrdG9wXFxcXEd5bUJyb1xcXFxHeW1Ccm9cXFxcYXBwXFxcXGFwaVxcXFx3b3Jrb3V0c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvd29ya291dHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS93b3Jrb3V0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvd29ya291dHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxMYVpFUlxcXFxEZXNrdG9wXFxcXEd5bUJyb1xcXFxHeW1Ccm9cXFxcYXBwXFxcXGFwaVxcXFx3b3Jrb3V0c1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS93b3Jrb3V0cy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fworkouts%2Froute&page=%2Fapi%2Fworkouts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fworkouts%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/workouts/route.ts":
/*!***********************************!*\
  !*** ./app/api/workouts/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth_auth_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth/auth-options */ \"(rsc)/./lib/auth/auth-options.ts\");\n\n\n\n\nasync function GET(req) {\n    try {\n        // Get the authenticated user\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth_auth_options__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const userId = session.user.id;\n        // Get workouts from the database for the authenticated user\n        const workouts = _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.prepare(`\r\n      SELECT id, name, date, notes \r\n      FROM workouts \r\n      WHERE user_id = ? \r\n      ORDER BY date DESC\r\n    `).all(userId);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(workouts);\n    } catch (error) {\n        console.error(\"Error fetching workouts:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"An error occurred while fetching the workouts\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth_auth_options__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const userId = session.user.id;\n        const body = await req.json();\n        // Validate required fields\n        if (!body.name || !body.date) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Name and date are required\"\n            }, {\n                status: 400\n            });\n        }\n        // Insert workout into the database\n        const insertStmt = _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.prepare(`\r\n      INSERT INTO workouts (user_id, name, date, notes)\r\n      VALUES (?, ?, ?, ?)\r\n    `);\n        const info = insertStmt.run(userId, body.name, body.date, body.notes || null);\n        const workoutId = info.lastInsertRowid;\n        // If exercises are provided, insert them\n        if (body.exercises && Array.isArray(body.exercises) && body.exercises.length > 0) {\n            const insertExerciseStmt = _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.prepare(`\r\n        INSERT INTO exercises (workout_id, name, sets, reps, weight)\r\n        VALUES (?, ?, ?, ?, ?)\r\n      `);\n            for (const exercise of body.exercises){\n                if (!exercise.name || !exercise.sets || !exercise.reps) {\n                    continue; // Skip invalid exercises\n                }\n                insertExerciseStmt.run(workoutId, exercise.name, exercise.sets, exercise.reps, exercise.weight || null);\n            }\n        }\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            id: workoutId,\n            message: \"Workout created successfully\"\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Error creating workout:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"An error occurred while creating the workout\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDUyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBK0MsR0FDeEQ7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9neW1icm8vLi9hcHAvYXBpL3dvcmtvdXRzL3JvdXRlLnRzP2U4Y2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2xpYi9kYlwiO1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoL2F1dGgtb3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEdldCB0aGUgYXV0aGVudGljYXRlZCB1c2VyXHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgICBcclxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi51c2VyLmlkO1xyXG4gICAgXHJcbiAgICAvLyBHZXQgd29ya291dHMgZnJvbSB0aGUgZGF0YWJhc2UgZm9yIHRoZSBhdXRoZW50aWNhdGVkIHVzZXJcclxuICAgIGNvbnN0IHdvcmtvdXRzID0gZGIucHJlcGFyZShgXHJcbiAgICAgIFNFTEVDVCBpZCwgbmFtZSwgZGF0ZSwgbm90ZXMgXHJcbiAgICAgIEZST00gd29ya291dHMgXHJcbiAgICAgIFdIRVJFIHVzZXJfaWQgPSA/IFxyXG4gICAgICBPUkRFUiBCWSBkYXRlIERFU0NcclxuICAgIGApLmFsbCh1c2VySWQpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24od29ya291dHMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgd29ya291dHM6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyB0aGUgd29ya291dHNcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxuICAgIFxyXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuICAgIFxyXG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgZmllbGRzXHJcbiAgICBpZiAoIWJvZHkubmFtZSB8fCAhYm9keS5kYXRlKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIk5hbWUgYW5kIGRhdGUgYXJlIHJlcXVpcmVkXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gSW5zZXJ0IHdvcmtvdXQgaW50byB0aGUgZGF0YWJhc2VcclxuICAgIGNvbnN0IGluc2VydFN0bXQgPSBkYi5wcmVwYXJlKGBcclxuICAgICAgSU5TRVJUIElOVE8gd29ya291dHMgKHVzZXJfaWQsIG5hbWUsIGRhdGUsIG5vdGVzKVxyXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8pXHJcbiAgICBgKTtcclxuICAgIFxyXG4gICAgY29uc3QgaW5mbyA9IGluc2VydFN0bXQucnVuKHVzZXJJZCwgYm9keS5uYW1lLCBib2R5LmRhdGUsIGJvZHkubm90ZXMgfHwgbnVsbCk7XHJcbiAgICBcclxuICAgIGNvbnN0IHdvcmtvdXRJZCA9IGluZm8ubGFzdEluc2VydFJvd2lkO1xyXG4gICAgXHJcbiAgICAvLyBJZiBleGVyY2lzZXMgYXJlIHByb3ZpZGVkLCBpbnNlcnQgdGhlbVxyXG4gICAgaWYgKGJvZHkuZXhlcmNpc2VzICYmIEFycmF5LmlzQXJyYXkoYm9keS5leGVyY2lzZXMpICYmIGJvZHkuZXhlcmNpc2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgaW5zZXJ0RXhlcmNpc2VTdG10ID0gZGIucHJlcGFyZShgXHJcbiAgICAgICAgSU5TRVJUIElOVE8gZXhlcmNpc2VzICh3b3Jrb3V0X2lkLCBuYW1lLCBzZXRzLCByZXBzLCB3ZWlnaHQpXHJcbiAgICAgICAgVkFMVUVTICg/LCA/LCA/LCA/LCA/KVxyXG4gICAgICBgKTtcclxuICAgICAgXHJcbiAgICAgIGZvciAoY29uc3QgZXhlcmNpc2Ugb2YgYm9keS5leGVyY2lzZXMpIHtcclxuICAgICAgICBpZiAoIWV4ZXJjaXNlLm5hbWUgfHwgIWV4ZXJjaXNlLnNldHMgfHwgIWV4ZXJjaXNlLnJlcHMpIHtcclxuICAgICAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIGludmFsaWQgZXhlcmNpc2VzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGluc2VydEV4ZXJjaXNlU3RtdC5ydW4oXHJcbiAgICAgICAgICB3b3Jrb3V0SWQsXHJcbiAgICAgICAgICBleGVyY2lzZS5uYW1lLFxyXG4gICAgICAgICAgZXhlcmNpc2Uuc2V0cyxcclxuICAgICAgICAgIGV4ZXJjaXNlLnJlcHMsXHJcbiAgICAgICAgICBleGVyY2lzZS53ZWlnaHQgfHwgbnVsbFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGlkOiB3b3Jrb3V0SWQsIG1lc3NhZ2U6IFwiV29ya291dCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiAyMDEgfVxyXG4gICAgKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNyZWF0aW5nIHdvcmtvdXQ6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBjcmVhdGluZyB0aGUgd29ya291dFwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiR0VUIiwicmVxIiwic2Vzc2lvbiIsInVzZXIiLCJpZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVzZXJJZCIsIndvcmtvdXRzIiwicHJlcGFyZSIsImFsbCIsImNvbnNvbGUiLCJQT1NUIiwiYm9keSIsIm5hbWUiLCJkYXRlIiwiaW5zZXJ0U3RtdCIsImluZm8iLCJydW4iLCJub3RlcyIsIndvcmtvdXRJZCIsImxhc3RJbnNlcnRSb3dpZCIsImV4ZXJjaXNlcyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImluc2VydEV4ZXJjaXNlU3RtdCIsImV4ZXJjaXNlIiwic2V0cyIsInJlcHMiLCJ3ZWlnaHQiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/workouts/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth/auth-options.ts":
/*!**********************************!*\
  !*** ./lib/auth/auth-options.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n\n\n\n\n// Validation schema\nconst loginSchema = zod__WEBPACK_IMPORTED_MODULE_3__.z.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_3__.z.string().email(\"Invalid email address\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_3__.z.string().min(6, \"Password must be at least 6 characters\")\n});\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    // Validate input\n                    const result = loginSchema.safeParse(credentials);\n                    if (!result.success) {\n                        return null;\n                    }\n                    const { email, password } = result.data;\n                    // Find user in database\n                    const user = _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.prepare(\"SELECT * FROM users WHERE email = ?\").get(email);\n                    if (!user) {\n                        return null;\n                    }\n                    // Verify password\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(password, user.password);\n                    if (!isPasswordValid) {\n                        return null;\n                    }\n                    // Return user object without the password\n                    const { password: _, ...userWithoutPassword } = user;\n                    return userWithoutPassword;\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n                token.name = user.name;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user = {\n                    id: token.id,\n                    email: token.email,\n                    name: token.name\n                };\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/login\",\n        signOut: \"/\",\n        error: \"/auth/error\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"your-super-secret-key-change-in-production\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC9hdXRoLW9wdGlvbnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDa0U7QUFDcEM7QUFDQTtBQUNOO0FBRXhCLG9CQUFvQjtBQUNwQixNQUFNSSxjQUFjRCxrQ0FBQ0EsQ0FBQ0UsTUFBTSxDQUFDO0lBQzNCQyxPQUFPSCxrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHRCxLQUFLLENBQUM7SUFDeEJFLFVBQVVMLGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdFLEdBQUcsQ0FBQyxHQUFHO0FBQzlCO0FBRU8sTUFBTUMsY0FBK0I7SUFDMUNDLFdBQVc7UUFDVFgsMkVBQW1CQSxDQUFDO1lBQ2xCWSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hQLE9BQU87b0JBQUVRLE9BQU87b0JBQVNDLE1BQU07Z0JBQU87Z0JBQ3RDUCxVQUFVO29CQUFFTSxPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUMsV0FBVUgsV0FBVztnQkFDekIsSUFBSTtvQkFDRixpQkFBaUI7b0JBQ2pCLE1BQU1JLFNBQVNiLFlBQVljLFNBQVMsQ0FBQ0w7b0JBQ3JDLElBQUksQ0FBQ0ksT0FBT0UsT0FBTyxFQUFFO3dCQUNuQixPQUFPO29CQUNUO29CQUVBLE1BQU0sRUFBRWIsS0FBSyxFQUFFRSxRQUFRLEVBQUUsR0FBR1MsT0FBT0csSUFBSTtvQkFFdkMsd0JBQXdCO29CQUN4QixNQUFNQyxPQUFPcEIsdUNBQUVBLENBQUNxQixPQUFPLENBQUMsdUNBQXVDQyxHQUFHLENBQUNqQjtvQkFFbkUsSUFBSSxDQUFDZSxNQUFNO3dCQUNULE9BQU87b0JBQ1Q7b0JBRUEsa0JBQWtCO29CQUNsQixNQUFNRyxrQkFBa0IsTUFBTXRCLHdEQUFjLENBQUNNLFVBQVVhLEtBQUtiLFFBQVE7b0JBRXBFLElBQUksQ0FBQ2dCLGlCQUFpQjt3QkFDcEIsT0FBTztvQkFDVDtvQkFFQSwwQ0FBMEM7b0JBQzFDLE1BQU0sRUFBRWhCLFVBQVVrQixDQUFDLEVBQUUsR0FBR0MscUJBQXFCLEdBQUdOO29CQUVoRCxPQUFPTTtnQkFDVCxFQUFFLE9BQU9DLE9BQU87b0JBQ2RDLFFBQVFELEtBQUssQ0FBQyxlQUFlQTtvQkFDN0IsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7S0FDRDtJQUNERSxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVYLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSVyxNQUFNQyxFQUFFLEdBQUdaLEtBQUtZLEVBQUU7Z0JBQ2xCRCxNQUFNMUIsS0FBSyxHQUFHZSxLQUFLZixLQUFLO2dCQUN4QjBCLE1BQU1wQixJQUFJLEdBQUdTLEtBQUtULElBQUk7WUFDeEI7WUFDQSxPQUFPb0I7UUFDVDtRQUNBLE1BQU1FLFNBQVEsRUFBRUEsT0FBTyxFQUFFRixLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEUsUUFBUWIsSUFBSSxHQUFHO29CQUNiWSxJQUFJRCxNQUFNQyxFQUFFO29CQUNaM0IsT0FBTzBCLE1BQU0xQixLQUFLO29CQUNsQk0sTUFBTW9CLE1BQU1wQixJQUFJO2dCQUNsQjtZQUNGO1lBQ0EsT0FBT3NCO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7UUFDUkMsU0FBUztRQUNUVCxPQUFPO0lBQ1Q7SUFDQU0sU0FBUztRQUNQSSxVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLLEtBQUs7SUFDekI7SUFDQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlLElBQUk7QUFDekMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2d5bWJyby8uL2xpYi9hdXRoL2F1dGgtb3B0aW9ucy50cz9hMDlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9saWIvZGJcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcclxuXHJcbi8vIFZhbGlkYXRpb24gc2NoZW1hXHJcbmNvbnN0IGxvZ2luU2NoZW1hID0gei5vYmplY3Qoe1xyXG4gIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKFwiSW52YWxpZCBlbWFpbCBhZGRyZXNzXCIpLFxyXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig2LCBcIlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzXCIpLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gVmFsaWRhdGUgaW5wdXRcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGxvZ2luU2NoZW1hLnNhZmVQYXJzZShjcmVkZW50aWFscyk7XHJcbiAgICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXN1bHQuZGF0YTtcclxuXHJcbiAgICAgICAgICAvLyBGaW5kIHVzZXIgaW4gZGF0YWJhc2VcclxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBkYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ID9cIikuZ2V0KGVtYWlsKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFZlcmlmeSBwYXNzd29yZFxyXG4gICAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4gdXNlciBvYmplY3Qgd2l0aG91dCB0aGUgcGFzc3dvcmRcclxuICAgICAgICAgIGNvbnN0IHsgcGFzc3dvcmQ6IF8sIC4uLnVzZXJXaXRob3V0UGFzc3dvcmQgfSA9IHVzZXI7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHJldHVybiB1c2VyV2l0aG91dFBhc3N3b3JkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQXV0aCBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgdG9rZW4uZW1haWwgPSB1c2VyLmVtYWlsO1xyXG4gICAgICAgIHRva2VuLm5hbWUgPSB1c2VyLm5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgIHNlc3Npb24udXNlciA9IHtcclxuICAgICAgICAgIGlkOiB0b2tlbi5pZCxcclxuICAgICAgICAgIGVtYWlsOiB0b2tlbi5lbWFpbCxcclxuICAgICAgICAgIG5hbWU6IHRva2VuLm5hbWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL2F1dGgvbG9naW4nLFxyXG4gICAgc2lnbk91dDogJy8nLFxyXG4gICAgZXJyb3I6ICcvYXV0aC9lcnJvcicsXHJcbiAgfSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcclxuICB9LFxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUIHx8IFwieW91ci1zdXBlci1zZWNyZXQta2V5LWNoYW5nZS1pbi1wcm9kdWN0aW9uXCIsXHJcbn07ICJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiZGIiLCJiY3J5cHQiLCJ6IiwibG9naW5TY2hlbWEiLCJvYmplY3QiLCJlbWFpbCIsInN0cmluZyIsInBhc3N3b3JkIiwibWluIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJsYWJlbCIsInR5cGUiLCJhdXRob3JpemUiLCJyZXN1bHQiLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZGF0YSIsInVzZXIiLCJwcmVwYXJlIiwiZ2V0IiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsIl8iLCJ1c2VyV2l0aG91dFBhc3N3b3JkIiwiZXJyb3IiLCJjb25zb2xlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJpZCIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsInNpZ25PdXQiLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth/auth-options.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Create the db directory if it doesn't exist\nconst dbDir = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"db\");\nif (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(dbDir)) {\n    fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(dbDir, {\n        recursive: true\n    });\n}\nconst dbPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(dbDir, \"gymbro.db\");\nlet db;\ntry {\n    // Dynamic import because better-sqlite3 is only used on the server\n    const sqlite = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n    db = new sqlite(dbPath);\n    // Enable foreign keys\n    db.pragma(\"foreign_keys = ON\");\n    // Create users table\n    db.exec(`\r\n    CREATE TABLE IF NOT EXISTS users (\r\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\r\n      email TEXT UNIQUE NOT NULL,\r\n      password TEXT NOT NULL,\r\n      name TEXT NOT NULL,\r\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n    );\r\n  `);\n    // Create workouts table\n    db.exec(`\r\n    CREATE TABLE IF NOT EXISTS workouts (\r\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\r\n      user_id INTEGER NOT NULL,\r\n      name TEXT NOT NULL,\r\n      date TEXT NOT NULL,\r\n      notes TEXT,\r\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\r\n    );\r\n  `);\n    // Create exercises table\n    db.exec(`\r\n    CREATE TABLE IF NOT EXISTS exercises (\r\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\r\n      workout_id INTEGER NOT NULL,\r\n      name TEXT NOT NULL,\r\n      sets INTEGER NOT NULL,\r\n      reps INTEGER NOT NULL,\r\n      weight REAL,\r\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n      FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE\r\n    );\r\n  `);\n    // Create weight_logs table for tracking user weight progress\n    db.exec(`\r\n    CREATE TABLE IF NOT EXISTS weight_logs (\r\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\r\n      user_id INTEGER NOT NULL,\r\n      weight REAL NOT NULL,\r\n      date TEXT NOT NULL,\r\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\r\n    );\r\n  `);\n    console.log(\"Database setup completed\");\n} catch (error) {\n    console.error(\"Database setup failed:\", error);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDb0I7QUFDSTtBQUV4Qiw4Q0FBOEM7QUFDOUMsTUFBTUUsUUFBUUQsZ0RBQVMsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJO0FBQ3ZDLElBQUksQ0FBQ0wsb0RBQWEsQ0FBQ0UsUUFBUTtJQUN6QkYsbURBQVksQ0FBQ0UsT0FBTztRQUFFTSxXQUFXO0lBQUs7QUFDeEM7QUFFQSxNQUFNQyxTQUFTUixnREFBUyxDQUFDQyxPQUFPO0FBQ2hDLElBQUlRO0FBRUosSUFBSTtJQUNGLG1FQUFtRTtJQUNuRSxNQUFNQyxTQUFTQyxtQkFBT0EsQ0FBQztJQUN2QkYsS0FBSyxJQUFJQyxPQUFPRjtJQUVoQixzQkFBc0I7SUFDdEJDLEdBQUdHLE1BQU0sQ0FBQztJQUVWLHFCQUFxQjtJQUNyQkgsR0FBR0ksSUFBSSxDQUFDLENBQUM7Ozs7Ozs7OztFQVNULENBQUM7SUFFRCx3QkFBd0I7SUFDeEJKLEdBQUdJLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7OztFQVdULENBQUM7SUFFRCx5QkFBeUI7SUFDekJKLEdBQUdJLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7RUFZVCxDQUFDO0lBRUQsNkRBQTZEO0lBQzdESixHQUFHSSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7O0VBU1QsQ0FBQztJQUVEQyxRQUFRQyxHQUFHLENBQUM7QUFDZCxFQUFFLE9BQU9DLE9BQU87SUFDZEYsUUFBUUUsS0FBSyxDQUFDLDBCQUEwQkE7QUFDMUM7QUFFYyIsInNvdXJjZXMiOlsid2VicGFjazovL2d5bWJyby8uL2xpYi9kYi50cz8xZGYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbi8vIENyZWF0ZSB0aGUgZGIgZGlyZWN0b3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcclxuY29uc3QgZGJEaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RiJyk7XHJcbmlmICghZnMuZXhpc3RzU3luYyhkYkRpcikpIHtcclxuICBmcy5ta2RpclN5bmMoZGJEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG59XHJcblxyXG5jb25zdCBkYlBhdGggPSBwYXRoLmpvaW4oZGJEaXIsICdneW1icm8uZGInKTtcclxubGV0IGRiOiBEYXRhYmFzZTtcclxuXHJcbnRyeSB7XHJcbiAgLy8gRHluYW1pYyBpbXBvcnQgYmVjYXVzZSBiZXR0ZXItc3FsaXRlMyBpcyBvbmx5IHVzZWQgb24gdGhlIHNlcnZlclxyXG4gIGNvbnN0IHNxbGl0ZSA9IHJlcXVpcmUoJ2JldHRlci1zcWxpdGUzJyk7XHJcbiAgZGIgPSBuZXcgc3FsaXRlKGRiUGF0aCk7XHJcbiAgXHJcbiAgLy8gRW5hYmxlIGZvcmVpZ24ga2V5c1xyXG4gIGRiLnByYWdtYSgnZm9yZWlnbl9rZXlzID0gT04nKTtcclxuICBcclxuICAvLyBDcmVhdGUgdXNlcnMgdGFibGVcclxuICBkYi5leGVjKGBcclxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHVzZXJzIChcclxuICAgICAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxyXG4gICAgICBlbWFpbCBURVhUIFVOSVFVRSBOT1QgTlVMTCxcclxuICAgICAgcGFzc3dvcmQgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgbmFtZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICB1cGRhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QXHJcbiAgICApO1xyXG4gIGApO1xyXG5cclxuICAvLyBDcmVhdGUgd29ya291dHMgdGFibGVcclxuICBkYi5leGVjKGBcclxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHdvcmtvdXRzIChcclxuICAgICAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxyXG4gICAgICB1c2VyX2lkIElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIG5hbWUgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgZGF0ZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBub3RlcyBURVhULFxyXG4gICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICB1cGRhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICBGT1JFSUdOIEtFWSAodXNlcl9pZCkgUkVGRVJFTkNFUyB1c2VycyhpZCkgT04gREVMRVRFIENBU0NBREVcclxuICAgICk7XHJcbiAgYCk7XHJcblxyXG4gIC8vIENyZWF0ZSBleGVyY2lzZXMgdGFibGVcclxuICBkYi5leGVjKGBcclxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGV4ZXJjaXNlcyAoXHJcbiAgICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcclxuICAgICAgd29ya291dF9pZCBJTlRFR0VSIE5PVCBOVUxMLFxyXG4gICAgICBuYW1lIFRFWFQgTk9UIE5VTEwsXHJcbiAgICAgIHNldHMgSU5URUdFUiBOT1QgTlVMTCxcclxuICAgICAgcmVwcyBJTlRFR0VSIE5PVCBOVUxMLFxyXG4gICAgICB3ZWlnaHQgUkVBTCxcclxuICAgICAgY3JlYXRlZF9hdCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgICAgdXBkYXRlZF9hdCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgICAgRk9SRUlHTiBLRVkgKHdvcmtvdXRfaWQpIFJFRkVSRU5DRVMgd29ya291dHMoaWQpIE9OIERFTEVURSBDQVNDQURFXHJcbiAgICApO1xyXG4gIGApO1xyXG5cclxuICAvLyBDcmVhdGUgd2VpZ2h0X2xvZ3MgdGFibGUgZm9yIHRyYWNraW5nIHVzZXIgd2VpZ2h0IHByb2dyZXNzXHJcbiAgZGIuZXhlYyhgXHJcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB3ZWlnaHRfbG9ncyAoXHJcbiAgICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcclxuICAgICAgdXNlcl9pZCBJTlRFR0VSIE5PVCBOVUxMLFxyXG4gICAgICB3ZWlnaHQgUkVBTCBOT1QgTlVMTCxcclxuICAgICAgZGF0ZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICBGT1JFSUdOIEtFWSAodXNlcl9pZCkgUkVGRVJFTkNFUyB1c2VycyhpZCkgT04gREVMRVRFIENBU0NBREVcclxuICAgICk7XHJcbiAgYCk7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdEYXRhYmFzZSBzZXR1cCBjb21wbGV0ZWQnKTtcclxufSBjYXRjaCAoZXJyb3IpIHtcclxuICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBzZXR1cCBmYWlsZWQ6JywgZXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgeyBkYiB9OyAiXSwibmFtZXMiOlsiZnMiLCJwYXRoIiwiZGJEaXIiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJyZWN1cnNpdmUiLCJkYlBhdGgiLCJkYiIsInNxbGl0ZSIsInJlcXVpcmUiLCJwcmFnbWEiLCJleGVjIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/zod","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fworkouts%2Froute&page=%2Fapi%2Fworkouts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fworkouts%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();