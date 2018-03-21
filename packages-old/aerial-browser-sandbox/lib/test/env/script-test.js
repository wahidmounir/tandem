"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var chai_1 = require("chai");
describe(__filename + "#", function () {
    it("can execute a simple script", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow(utils_1.wrapHTML("<script>console.log(\"hello\");</script>"), {
                        console: {
                            log: function (text) {
                                logs.push(text);
                            }
                        }
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    chai_1.expect(logs).to.eql(["hello"]);
                    window.close();
                    return [2 /*return*/];
            }
        });
    }); });
    it("can attach a value to the global window object via this", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow(utils_1.wrapHTML("<script>window.a = 1;</script>"));
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    chai_1.expect(window["" + "a"]).to.eql(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("can fetch values from previously executed scripts", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow(utils_1.wrapHTML("<script>window.a = 1;</script><script>console.log(window.a);</script>"), {
                        console: {
                            log: function (text) {
                                logs.push(text);
                            }
                        }
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    chai_1.expect(logs).to.eql([1]);
                    return [2 /*return*/];
            }
        });
    }); });
    // not working for now
    xit("is executed before proceeding child nodes are added", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow("<script>console.log(document.querySelector(\"span\"));</script><span></span>", {
                        console: {
                            log: function (text) {
                                logs.push(text);
                            }
                        }
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    chai_1.expect(logs).to.eql([undefined]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("can execute a script that queries the element it's executed in", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow("<script>console.log(document.querySelector(\"script\").textContent);</script><span></span>", {
                        console: {
                            log: function (text) {
                                logs.push(text);
                            }
                        }
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    chai_1.expect(logs).to.eql(["console.log(document.querySelector(\"script\").textContent);"]);
                    window.close();
                    return [2 /*return*/];
            }
        });
    }); });
    xit("can append an element immediately after the script", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window, innerHTML;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow(utils_1.wrapHTML("<span><script>\n      const script = document.querySelector(\"script\");\n      script.parentElement.appendChild(document.createTextNode(\"hello\"));\n    </script><span></span></span>"), {
                        console: {
                            log: function (text) {
                                logs.push(text);
                            }
                        }
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    window.close();
                    innerHTML = utils_1.stripWhitespace(window.document.body.innerHTML);
                    chai_1.expect(innerHTML).to.eql("<span><script>const script = document.querySelector(\"script\");script.parentElement.appendChild(document.createTextNode(\"hello\"));</script>hello<span></span></span>");
                    return [2 /*return*/];
            }
        });
    }); });
    xit("can load from an external resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    window = utils_1.openTestWindow({
                        "local://index.html": utils_1.wrapHTML("\n        <span>\n          <script src=\"local://index.js\"></script>\n          <span>a</span>\n        </span>\n      "),
                        "local://index.js": "\n        const script = document.querySelector(\"script\");\n        script.parentElement.appendChild(document.createTextNode(\"b\"));\n      "
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    window.close();
                    chai_1.expect(utils_1.stripWhitespace(window.document.body.innerHTML)).to.eql("<span><script src=\"local://index.js\"></script>b<span>a</span></span>");
                    return [2 /*return*/];
            }
        });
    }); });
    it("can execute a script in a script via createElement", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs, window;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logs = [];
                    window = utils_1.openTestWindow(utils_1.wrapHTML("<script>const script = document.createElement(\"script\"); script.textContent = \"console.log('hello');\"; document.body.appendChild(script); </script>"), {
                        console: {
                            log: function (text) {
                                logs.push(text);
                            }
                        }
                    });
                    return [4 /*yield*/, utils_1.waitForDocumentComplete(window)];
                case 1:
                    _a.sent();
                    chai_1.expect(logs).to.eql(["hello"]);
                    window.close();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=script-test.js.map