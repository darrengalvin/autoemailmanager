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
exports.id = "app/api/oauth/microsoft/route";
exports.ids = ["app/api/oauth/microsoft/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foauth%2Fmicrosoft%2Froute&page=%2Fapi%2Foauth%2Fmicrosoft%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foauth%2Fmicrosoft%2Froute.ts&appDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foauth%2Fmicrosoft%2Froute&page=%2Fapi%2Foauth%2Fmicrosoft%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foauth%2Fmicrosoft%2Froute.ts&appDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_darrengalvin_Downloads_email_connector_src_app_api_oauth_microsoft_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/oauth/microsoft/route.ts */ \"(rsc)/./src/app/api/oauth/microsoft/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/oauth/microsoft/route\",\n        pathname: \"/api/oauth/microsoft\",\n        filename: \"route\",\n        bundlePath: \"app/api/oauth/microsoft/route\"\n    },\n    resolvedPagePath: \"/Users/darrengalvin/Downloads/email connector/src/app/api/oauth/microsoft/route.ts\",\n    nextConfigOutput,\n    userland: _Users_darrengalvin_Downloads_email_connector_src_app_api_oauth_microsoft_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZvYXV0aCUyRm1pY3Jvc29mdCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGb2F1dGglMkZtaWNyb3NvZnQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZvYXV0aCUyRm1pY3Jvc29mdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRhcnJlbmdhbHZpbiUyRkRvd25sb2FkcyUyRmVtYWlsJTIwY29ubmVjdG9yJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmRhcnJlbmdhbHZpbiUyRkRvd25sb2FkcyUyRmVtYWlsJTIwY29ubmVjdG9yJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQztBQUMvRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2RhcnJlbmdhbHZpbi9Eb3dubG9hZHMvZW1haWwgY29ubmVjdG9yL3NyYy9hcHAvYXBpL29hdXRoL21pY3Jvc29mdC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvb2F1dGgvbWljcm9zb2Z0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvb2F1dGgvbWljcm9zb2Z0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9vYXV0aC9taWNyb3NvZnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZGFycmVuZ2FsdmluL0Rvd25sb2Fkcy9lbWFpbCBjb25uZWN0b3Ivc3JjL2FwcC9hcGkvb2F1dGgvbWljcm9zb2Z0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foauth%2Fmicrosoft%2Froute&page=%2Fapi%2Foauth%2Fmicrosoft%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foauth%2Fmicrosoft%2Froute.ts&appDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/oauth/microsoft/route.ts":
/*!**********************************************!*\
  !*** ./src/app/api/oauth/microsoft/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\nasync function GET() {\n    const headersList = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.headers)();\n    const host = headersList.get('host') || '';\n    // Determine if we're in development or production\n    const isDevelopment = host.includes('localhost') || host.includes('127.0.0.1');\n    const redirectUri = isDevelopment ? `${\"http://localhost:3001\"}/api/oauth/microsoft/callback` : `${\"https://autoemailmanager.netlify.app\"}/api/oauth/microsoft/callback`;\n    const microsoftOAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${new URLSearchParams({\n        client_id: \"2b41741c-e649-4b63-a92a-a6eb26f02d7c\",\n        response_type: 'code',\n        redirect_uri: redirectUri,\n        scope: 'offline_access Mail.Read Mail.Send User.Read',\n        response_mode: 'query',\n        state: 'managed-setup'\n    })}`;\n    return Response.redirect(microsoftOAuthUrl, 307);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9vYXV0aC9taWNyb3NvZnQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDdUM7QUFFaEMsZUFBZUM7SUFDcEIsTUFBTUMsY0FBYyxNQUFNRixxREFBT0E7SUFDakMsTUFBTUcsT0FBT0QsWUFBWUUsR0FBRyxDQUFDLFdBQVc7SUFFeEMsa0RBQWtEO0lBQ2xELE1BQU1DLGdCQUFnQkYsS0FBS0csUUFBUSxDQUFDLGdCQUFnQkgsS0FBS0csUUFBUSxDQUFDO0lBQ2xFLE1BQU1DLGNBQWNGLGdCQUNoQixHQUFHRyx1QkFBK0IsQ0FBQyw2QkFBNkIsQ0FBQyxHQUNqRSxHQUFHQSxzQ0FBc0MsQ0FBQyw2QkFBNkIsQ0FBQztJQUU1RSxNQUFNSSxvQkFBb0IsQ0FBQywrREFBK0QsRUFBRSxJQUFJQyxnQkFBZ0I7UUFDOUdDLFdBQVdOLHNDQUEyQztRQUN0RFEsZUFBZTtRQUNmQyxjQUFjVjtRQUNkVyxPQUFPO1FBQ1BDLGVBQWU7UUFDZkMsT0FBTztJQUNULElBQUk7SUFFSixPQUFPQyxTQUFTQyxRQUFRLENBQUNWLG1CQUFtQjtBQUM5QyIsInNvdXJjZXMiOlsiL1VzZXJzL2RhcnJlbmdhbHZpbi9Eb3dubG9hZHMvZW1haWwgY29ubmVjdG9yL3NyYy9hcHAvYXBpL29hdXRoL21pY3Jvc29mdC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgY29uc3QgaGVhZGVyc0xpc3QgPSBhd2FpdCBoZWFkZXJzKCk7XG4gIGNvbnN0IGhvc3QgPSBoZWFkZXJzTGlzdC5nZXQoJ2hvc3QnKSB8fCAnJztcbiAgXG4gIC8vIERldGVybWluZSBpZiB3ZSdyZSBpbiBkZXZlbG9wbWVudCBvciBwcm9kdWN0aW9uXG4gIGNvbnN0IGlzRGV2ZWxvcG1lbnQgPSBob3N0LmluY2x1ZGVzKCdsb2NhbGhvc3QnKSB8fCBob3N0LmluY2x1ZGVzKCcxMjcuMC4wLjEnKTtcbiAgY29uc3QgcmVkaXJlY3RVcmkgPSBpc0RldmVsb3BtZW50IFxuICAgID8gYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBQX1VSTH0vYXBpL29hdXRoL21pY3Jvc29mdC9jYWxsYmFja2BcbiAgICA6IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BST0RVQ1RJT05fVVJMfS9hcGkvb2F1dGgvbWljcm9zb2Z0L2NhbGxiYWNrYDtcblxuICBjb25zdCBtaWNyb3NvZnRPQXV0aFVybCA9IGBodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL2F1dGhvcml6ZT8ke25ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgIGNsaWVudF9pZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTUlDUk9TT0ZUX0NMSUVOVF9JRCEsXG4gICAgcmVzcG9uc2VfdHlwZTogJ2NvZGUnLFxuICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgc2NvcGU6ICdvZmZsaW5lX2FjY2VzcyBNYWlsLlJlYWQgTWFpbC5TZW5kIFVzZXIuUmVhZCcsXG4gICAgcmVzcG9uc2VfbW9kZTogJ3F1ZXJ5JyxcbiAgICBzdGF0ZTogJ21hbmFnZWQtc2V0dXAnXG4gIH0pfWA7XG5cbiAgcmV0dXJuIFJlc3BvbnNlLnJlZGlyZWN0KG1pY3Jvc29mdE9BdXRoVXJsLCAzMDcpO1xufSAiXSwibmFtZXMiOlsiaGVhZGVycyIsIkdFVCIsImhlYWRlcnNMaXN0IiwiaG9zdCIsImdldCIsImlzRGV2ZWxvcG1lbnQiLCJpbmNsdWRlcyIsInJlZGlyZWN0VXJpIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQUF9VUkwiLCJORVhUX1BVQkxJQ19QUk9EVUNUSU9OX1VSTCIsIm1pY3Jvc29mdE9BdXRoVXJsIiwiVVJMU2VhcmNoUGFyYW1zIiwiY2xpZW50X2lkIiwiTkVYVF9QVUJMSUNfTUlDUk9TT0ZUX0NMSUVOVF9JRCIsInJlc3BvbnNlX3R5cGUiLCJyZWRpcmVjdF91cmkiLCJzY29wZSIsInJlc3BvbnNlX21vZGUiLCJzdGF0ZSIsIlJlc3BvbnNlIiwicmVkaXJlY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/oauth/microsoft/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foauth%2Fmicrosoft%2Froute&page=%2Fapi%2Foauth%2Fmicrosoft%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foauth%2Fmicrosoft%2Froute.ts&appDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdarrengalvin%2FDownloads%2Femail%20connector&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();