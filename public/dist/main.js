/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_mainpage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mainpage */ \"./src/modules/mainpage.js\");\n/* harmony import */ var _modules_registrate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/registrate */ \"./src/modules/registrate.js\");\n\r\n\r\n(0,_modules_registrate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n(0,_modules_mainpage__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack://taskmanager/./src/index.js?");

/***/ }),

/***/ "./src/modules/mainpage.js":
/*!*********************************!*\
  !*** ./src/modules/mainpage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mainpage = () => {\r\n    (function($) {\r\n        \"use strict\";\r\n\r\n        $('.validate-form').on('submit', function() {\r\n            var input = $('.validate-input .input100');\r\n            var check = true;\r\n\r\n            for (var i = 0; i < input.length; i++) {\r\n                if (validate(input[i]) == false) {\r\n                    showValidate(input[i]);\r\n                    check = false;\r\n                }\r\n            }\r\n\r\n            return check;\r\n        });\r\n\r\n\r\n        $('.validate-form .input100').each(function() {\r\n            $(this).focus(function() {\r\n                hideValidate(this);\r\n            });\r\n        });\r\n\r\n        function validate(input) {\r\n            if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {\r\n                if ($(input).val().trim().match(/^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\\]?)$/) == null) {\r\n                    return false;\r\n                }\r\n            } else {\r\n                if ($(input).val().trim() == '') {\r\n                    return false;\r\n                }\r\n            }\r\n        }\r\n\r\n        function showValidate(input) {\r\n            var thisAlert = $(input).parent();\r\n\r\n            $(thisAlert).addClass('alert-validate');\r\n        }\r\n\r\n        function hideValidate(input) {\r\n            var thisAlert = $(input).parent();\r\n\r\n            $(thisAlert).removeClass('alert-validate');\r\n        }\r\n    })(jQuery);\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainpage);\n\n//# sourceURL=webpack://taskmanager/./src/modules/mainpage.js?");

/***/ }),

/***/ "./src/modules/registrate.js":
/*!***********************************!*\
  !*** ./src/modules/registrate.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mainpage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainpage */ \"./src/modules/mainpage.js\");\n\r\nconst registrate = () => {\r\n    let btn_reg = document.querySelector('#regbtn');\r\n    const emailfield = document.querySelector('.email-filed-div');\r\n    const input_email = emailfield.querySelector('input[name=\"logines\"]');\r\n    const btn_authreg = document.querySelector('.login100-form-btn');\r\n    const title = document.querySelector(\".login100-form-title\");\r\n    const formg = document.querySelector('.login100-form');\r\n\r\n    const error = document.querySelector('.alert-danger');\r\n\r\n    const registrateForm = () => {\r\n        if (title.innerHTML === \"Авторизация\") {\r\n            try {\r\n                error.remove();\r\n            } catch (e) {}\r\n            input_email.setAttribute('data-validate', \"Некорректный Email\");\r\n            input_email.placeholder = 'Email';\r\n            btn_authreg.textContent = \"Зарегистрироваться\";\r\n            title.innerHTML = \"Регистрация\";\r\n            formg.setAttribute(\"action\", \"/api/user\");\r\n\r\n            btn_reg.innerHTML = 'Авторизоваться <i class=\"fa fa-long-arrow-right m-l-5\" aria-hidden=\"true\"></i>';\r\n\r\n            emailfield.insertAdjacentHTML('beforebegin', `\r\n                    <div class=\"registration-dannie\">\r\n                        <div class=\"login-filed-div wrap-input100 validate-input\" data-validate=\"Некорректный логин\">\r\n                            <input class=\"input100\" type=\"text\" name=\"login\" placeholder=\"Логин\" oninput=\"this.value=this.value.replace(/[^A-Za-z0-9\\s]/g,'');\">\r\n                            <span class=\"focus-input100\"></span>\r\n                            <span class=\"symbol-input100\">\r\n                                <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n                            </span>\r\n                        </div>\r\n\r\n                        <div class=\"ima-filed-div wrap-input100 validate-input\" data-validate=\"Некорректное имя\">\r\n                            <input class=\"input100\" type=\"text\" name=\"ima\" placeholder=\"Имя\" oninput=\"this.value=this.value.replace(/[^а-яА-Я]/g,'');\">\r\n                            <span class=\"focus-input100\"></span>\r\n                            <span class=\"symbol-input100\">\r\n                                <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n                            </span>\r\n                        </div>\r\n\r\n                        <div class=\"fam-filed-div wrap-input100 validate-input\" data-validate=\"Некорректная фамилия\">\r\n                            <input class=\"input100\" type=\"text\" name=\"fam\" placeholder=\"Фамилия\" oninput=\"this.value=this.value.replace(/[^а-яА-Я]/g,'');\">\r\n                            <span class=\"focus-input100\"></span>\r\n                            <span class=\"symbol-input100\">\r\n                                <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n            `);\r\n        } else {\r\n            try {\r\n                error.remove();\r\n            } catch (e) {}\r\n            input_email.removeAttribute('data-validate');\r\n            input_email.placeholder = 'Email/Логин';\r\n            btn_authreg.textContent = \"Авторизоваться\";\r\n            formg.setAttribute(\"action\", \"/api/login\");\r\n            title.innerHTML = \"Авторизация\";\r\n            btn_reg.innerHTML = 'Создать аккаунт <i class=\"fa fa-long-arrow-right m-l-5\" aria-hidden=\"true\"></i>';\r\n            const d = document.querySelector(\".registration-dannie\");\r\n            d.remove();\r\n        }\r\n    }\r\n\r\n    btn_reg.addEventListener('click', registrateForm);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registrate);\n\n//# sourceURL=webpack://taskmanager/./src/modules/registrate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;