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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_LaZER_Desktop_GymBro_GymBro_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\LaZER\\\\Desktop\\\\GymBro\\\\GymBro\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_LaZER_Desktop_GymBro_GymBro_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMYVpFUiU1Q0Rlc2t0b3AlNUNHeW1Ccm8lNUNHeW1Ccm8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xhWkVSJTVDRGVza3RvcCU1Q0d5bUJybyU1Q0d5bUJybyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNrQztBQUMvRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL2d5bWJyby8/NWNjZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxMYVpFUlxcXFxEZXNrdG9wXFxcXEd5bUJyb1xcXFxHeW1Ccm9cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcTGFaRVJcXFxcRGVza3RvcFxcXFxHeW1Ccm9cXFxcR3ltQnJvXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth_auth_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth/auth-options */ \"(rsc)/./lib/auth/auth-options.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth_auth_options__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNxQjtBQUV0RCxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0MsK0RBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9neW1icm8vLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGgvYXV0aC1vcHRpb25zXCI7XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9OyAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJhdXRoT3B0aW9ucyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/zod","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLaZER%5CDesktop%5CGymBro%5CGymBro&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();