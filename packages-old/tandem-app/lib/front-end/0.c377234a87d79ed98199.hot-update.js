webpackHotUpdate(0,{

/***/ "../aerial-browser-sandbox/src/environment/renderers/base.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/events/index.ts");
var EventTarget = events_1.getSEnvEventTargetClass();
var _a = events_1.getSEnvEventClasses(), SEnvEvent = _a.SEnvEvent, SEnvMutationEvent = _a.SEnvMutationEvent;
;
;
var SyntheticWindowRendererEvent = /** @class */ (function (_super) {
    __extends(SyntheticWindowRendererEvent, _super);
    function SyntheticWindowRendererEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyntheticWindowRendererEvent.prototype.initRendererEvent = function (type, rects, styles, scrollRect, scrollPosition) {
        _super.prototype.initEvent.call(this, type, true, true);
        this.rects = rects;
        this.styles = styles;
        this.scrollRect = scrollRect;
        this.scrollPosition = scrollPosition;
    };
    SyntheticWindowRendererEvent.PAINTED = "PAINTED";
    return SyntheticWindowRendererEvent;
}(SEnvEvent));
exports.SyntheticWindowRendererEvent = SyntheticWindowRendererEvent;
var SyntheticWindowRendererNativeEvent = /** @class */ (function (_super) {
    __extends(SyntheticWindowRendererNativeEvent, _super);
    function SyntheticWindowRendererNativeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyntheticWindowRendererNativeEvent.prototype.init = function (type, targetNodeId, event) {
        _super.prototype.initEvent.call(this, type, true, true);
        this.targetNodeId = targetNodeId;
        this.nativeEvent = event;
    };
    SyntheticWindowRendererNativeEvent.NATIVE_EVENT = "NATIVE_EVENT";
    return SyntheticWindowRendererNativeEvent;
}(SEnvEvent));
exports.SyntheticWindowRendererNativeEvent = SyntheticWindowRendererNativeEvent;
var REQUEST_UPDATE_TIMEOUT = 50;
var BaseSyntheticWindowRenderer = /** @class */ (function (_super) {
    __extends(BaseSyntheticWindowRenderer, _super);
    function BaseSyntheticWindowRenderer(_sourceWindow) {
        var _this = _super.call(this) || this;
        _this._sourceWindow = _sourceWindow;
        _this._runningPromise = Promise.resolve();
        _this._onDocumentLoad = _this._onDocumentLoad.bind(_this);
        _this._onDocumentReadyStateChange = _this._onDocumentReadyStateChange.bind(_this);
        _this._onWindowResize = _this._onWindowResize.bind(_this);
        _this._onWindowScroll = _this._onWindowScroll.bind(_this);
        _this._onWindowMutation = _this._onWindowMutation.bind(_this);
        _this._addTargetListeners();
        _this.reset();
        return _this;
    }
    Object.defineProperty(BaseSyntheticWindowRenderer.prototype, "allBoundingClientRects", {
        get: function () {
            return this._rects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSyntheticWindowRenderer.prototype, "clientRects", {
        get: function () {
            return this._rects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSyntheticWindowRenderer.prototype, "computedStyles", {
        get: function () {
            return this._styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSyntheticWindowRenderer.prototype, "scrollRect", {
        get: function () {
            return this._scrollRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSyntheticWindowRenderer.prototype, "scrollPosition", {
        get: function () {
            return this._scrollPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSyntheticWindowRenderer.prototype, "sourceWindow", {
        get: function () {
            return this._sourceWindow;
        },
        enumerable: true,
        configurable: true
    });
    BaseSyntheticWindowRenderer.prototype.getBoundingClientRect = function (element) {
        return this._rects && this._rects[element.$id];
    };
    BaseSyntheticWindowRenderer.prototype.getComputedStyle = function (element, pseudoElement) {
        return this._styles && this._styles[element.$id];
    };
    BaseSyntheticWindowRenderer.prototype._removeTargetListeners = function () {
    };
    BaseSyntheticWindowRenderer.prototype.dispose = function () {
        this._disposed = true;
        this._sourceWindow.document.removeEventListener("readystatechange", this._onDocumentReadyStateChange);
        this._sourceWindow.removeEventListener("resize", this._onWindowResize);
        this._sourceWindow.removeEventListener("scroll", this._onWindowScroll);
        this._sourceWindow.removeEventListener(SEnvMutationEvent.MUTATION, this._onWindowMutation);
    };
    BaseSyntheticWindowRenderer.prototype._addTargetListeners = function () {
        this._sourceWindow.document.addEventListener("readystatechange", this._onDocumentReadyStateChange);
        this._sourceWindow.addEventListener("resize", this._onWindowResize);
        this._sourceWindow.addEventListener("scroll", this._onWindowScroll);
    };
    BaseSyntheticWindowRenderer.prototype.start = function () {
        if (this._started || this._disposed) {
            return;
        }
        this._started = true;
        this.requestRender();
        // document load is when the page is visible to the user, so only listen for 
        // mutations after stuff is loaded in (They'll be fired as the document is loaded in) (CC)
        this._sourceWindow.addEventListener(SEnvMutationEvent.MUTATION, this._onWindowMutation);
    };
    BaseSyntheticWindowRenderer.prototype._onDocumentReadyStateChange = function (event) {
        if (this._sourceWindow.document.readyState === "complete") {
            this._onDocumentLoad(event);
        }
    };
    BaseSyntheticWindowRenderer.prototype.whenRunning = function () {
        return this._runningPromise;
    };
    BaseSyntheticWindowRenderer.prototype.resume = function () {
        if (this._resolveRunningPromise) {
            var resolve = this._resolveRunningPromise;
            this._resolveRunningPromise = undefined;
            resolve();
        }
    };
    BaseSyntheticWindowRenderer.prototype.pause = function () {
        var _this = this;
        if (!this._resolveRunningPromise) {
            this._runningPromise = new Promise(function (resolve) {
                _this._resolveRunningPromise = resolve;
            });
        }
    };
    BaseSyntheticWindowRenderer.prototype._onDocumentLoad = function (event) {
        this.reset();
        this.requestRender();
    };
    BaseSyntheticWindowRenderer.prototype.requestRender = function () {
        var _this = this;
        if (!this._sourceWindow)
            return;
        if (this._currentRenderPromise) {
            this._shouldRenderAgain = true;
        }
        return this._currentRenderPromise || (this._currentRenderPromise = new Promise(function (resolve, reject) {
            var done = function () {
                _this._currentRenderPromise = undefined;
            };
            // renderer here doesn't need to be particularly fast since the user
            // doesn't get to interact with visual content. Provide a slowish
            // timeout to ensure that we don't kill CPU from unecessary renders.
            var render = function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._sourceWindow)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.whenRunning()];
                        case 1:
                            _a.sent();
                            this._shouldRenderAgain = false;
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.getRequestUpdateTimeout()); })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.render()];
                        case 3:
                            _a.sent();
                            if (!this._shouldRenderAgain) return [3 /*break*/, 5];
                            this._shouldRenderAgain = false;
                            return [4 /*yield*/, render()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            render().then(resolve, reject).then(done, done);
        }));
    };
    BaseSyntheticWindowRenderer.prototype.reset = function () {
    };
    BaseSyntheticWindowRenderer.prototype._onWindowResize = function (event) {
        this.requestRender();
    };
    BaseSyntheticWindowRenderer.prototype._onWindowScroll = function (event) {
        this.requestRender();
    };
    BaseSyntheticWindowRenderer.prototype._onWindowMutation = function (event) {
        this.requestRender();
    };
    BaseSyntheticWindowRenderer.prototype.getRequestUpdateTimeout = function () {
        // OVERRIDE ME - used for dynamic render throttling
        return REQUEST_UPDATE_TIMEOUT;
    };
    BaseSyntheticWindowRenderer.prototype.setPaintedInfo = function (rects, styles, scrollRect, scrollPosition) {
        this._rects = rects;
        this._styles = styles;
        this._scrollRect = scrollRect;
        this._scrollPosition = scrollPosition;
        var event = new SyntheticWindowRendererEvent();
        event.initRendererEvent(SyntheticWindowRendererEvent.PAINTED, rects, styles, scrollRect, scrollPosition);
        this.dispatchEvent(event);
    };
    return BaseSyntheticWindowRenderer;
}(EventTarget));
exports.BaseSyntheticWindowRenderer = BaseSyntheticWindowRenderer;


 ;(function register() { /* react-hot-loader/webpack */ if (process.env.NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/base.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/base.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../aerial-browser-sandbox/src/environment/renderers/dom.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__("./node_modules/lodash/lodash.js");
var constants_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/constants.ts");
var nodes_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/nodes/index.ts");
var window_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/window.ts");
var nodes_2 = __webpack_require__("../aerial-browser-sandbox/src/environment/nodes/index.ts");
var events_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/events/index.ts");
var base_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/renderers/base.ts");
var NODE_NAME_MAP = {
    head: "span",
    html: "span",
    body: "span",
    link: "style",
    script: "span",
    iframe: "span"
};
var SEnvWrapperEvent = events_1.getSEnvEventClasses().SEnvWrapperEvent;
var RECOMPUTE_TIMEOUT = 1;
function getHostStylesheets(node) {
    var p = node.parentNode;
    while (p.parentNode)
        p = p.parentNode;
    return p.styleSheets || [];
}
// See https://github.com/crcn/tandem/blob/318095f9e8672935be4bffea6c7c72aa6d8b95cb/src/@tandem/synthetic-browser/renderers/dom/index.ts
// TODO - this should contain an iframe
var SyntheticDOMRenderer = /** @class */ (function (_super) {
    __extends(SyntheticDOMRenderer, _super);
    function SyntheticDOMRenderer(sourceWindow, targetDocument) {
        var _this = _super.call(this, sourceWindow) || this;
        _this.targetDocument = targetDocument;
        _this.onElementChange = function () {
            _this.requestRender();
        };
        _this._deferResetComputedInfo = lodash_1.throttle(function () {
            _this._resetComputedInfo();
        }, 10);
        _this.container = targetDocument.createElement("iframe");
        Object.assign(_this.container.style, {
            border: "none",
            width: "100%",
            height: "100%"
        });
        _this._onContainerResize = _this._onContainerResize.bind(_this);
        _this.mount = targetDocument.createElement("div");
        _this.container.onload = function () {
            _this.container.contentWindow.document.body.appendChild(_this.mount);
            _this.container.contentWindow.addEventListener("resize", _this._onContainerResize);
            _this.requestRender();
        };
        return _this;
    }
    SyntheticDOMRenderer.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._documentElement) {
                    this._documentElement = renderHTMLNode(this.sourceWindow.document, {
                        nodes: this._elementDictionary = {},
                        sheets: this._cssRuleDictionary = {}
                    }, this.onElementChange, this.targetDocument);
                    this.mount.appendChild(this._documentElement);
                }
                this._resetComputedInfo();
                return [2 /*return*/];
            });
        });
    };
    SyntheticDOMRenderer.prototype._updateCSSRules = function (staleStyleSheet, syntheticStyleSheet) {
        while (staleStyleSheet.rules.length) {
            staleStyleSheet.deleteRule(0);
        }
        for (var i = 0, n = syntheticStyleSheet.cssRules.length; i < n; i++) {
            var rule = syntheticStyleSheet.cssRules[i];
            try {
                console.log(rule.previewCSSText);
                staleStyleSheet.insertRule(rule.previewCSSText, staleStyleSheet.cssRules.length);
            }
            catch (e) {
                // browser may throw errors if it cannot parse the rule -- this will
                // happen unsupported vendor prefixes.
            }
        }
    };
    SyntheticDOMRenderer.prototype._getSourceCSSText = function () {
        return Array.prototype.map.call(this.sourceWindow.document.stylesheets, function (ss) { return (ss.previewCSSText); }).join("\n");
    };
    SyntheticDOMRenderer.prototype._onContainerResize = function (event) {
        this._resetComputedInfo();
    };
    SyntheticDOMRenderer.prototype._onWindowMutation = function (event) {
        _super.prototype._onWindowMutation.call(this, event);
        var mutation = event.mutation;
        if (nodes_1.documentMutators[mutation.type]) {
            var _a = this.getElementDictItem(mutation.target), nativeNode = _a[0], syntheticObject = _a[1];
            // if(!nativeNode) {
            //   console.warn(`Unable to find DOM node for mutation ${mutation.$type}`);
            //   console.log(mutation.target);
            //   console.log(Object.assign({}, this._elementDictionary));
            // }
            if (nativeNode) {
                if (mutation.type === nodes_1.REMOVE_CHILD_NODE_EDIT) {
                    var removeMutation = mutation;
                    window_1.windowMutators[mutation.type](nativeNode, mutation);
                }
                else if (mutation.type === nodes_1.INSERT_CHILD_NODE_EDIT) {
                    var insertMutation = mutation;
                    var child = renderHTMLNode(insertMutation.child, {
                        nodes: this._elementDictionary,
                        sheets: this._cssRuleDictionary
                    }, this.onElementChange, this.targetDocument);
                    window_1.windowMutators[mutation.type](nativeNode, nodes_2.createParentNodeInsertChildMutation(nativeNode, child, insertMutation.index, false));
                }
                else if (mutation.type === nodes_1.ATTACH_SHADOW_ROOT_EDIT) {
                    var shadow = nativeNode.attachShadow({ mode: "open" });
                    this._elementDictionary[mutation.target.shadowRoot.$id] = [shadow, mutation.target.shadowRoot];
                }
                else {
                    window_1.windowMutators[mutation.type](nativeNode, mutation);
                }
            }
            else {
                // MUST replace the entire CSS text here since vendor prefixes get stripped out
                // depending on the browser. This is the simplest method for syncing changes.
                var parentStyleSheet = ((mutation.target.parentRule && mutation.target.parentRule.parentStyleSheet) || mutation.target.parentStyleSheet);
                if (parentStyleSheet) {
                    var _b = this.getCSSObjectDictItem(parentStyleSheet), getNativeStyleSheet = _b[0], syntheticStyleSheet = _b[1];
                    this._updateCSSRules(getNativeStyleSheet(), syntheticStyleSheet);
                }
            }
        }
    };
    SyntheticDOMRenderer.prototype.getElementDictItem = function (synthetic) {
        return this._elementDictionary && this._elementDictionary[synthetic.$id] || [undefined, undefined];
    };
    SyntheticDOMRenderer.prototype.getCSSObjectDictItem = function (synthetic) {
        return this._cssRuleDictionary && this._cssRuleDictionary[synthetic.$id] || [undefined, undefined];
    };
    SyntheticDOMRenderer.prototype._onWindowScroll = function (event) {
        _super.prototype._onWindowScroll.call(this, event);
        // TODO - possibly move this to render
        this.container.contentWindow.scroll(this._sourceWindow.scrollX, this._sourceWindow.scrollY);
    };
    SyntheticDOMRenderer.prototype._resetComputedInfo = function () {
        var rects = {};
        var styles = {};
        var targetWindow = this.targetDocument.defaultView;
        var containerWindow = this.container.contentWindow;
        var containerBody = containerWindow && containerWindow.document.body;
        if (!containerBody) {
            return;
        }
        for (var $id in this._elementDictionary) {
            var _a = this._elementDictionary[$id] || [undefined, undefined], native = _a[0], synthetic = _a[1];
            if (synthetic && synthetic.nodeType === constants_1.SEnvNodeTypes.ELEMENT) {
                var rect = native.getBoundingClientRect() || { width: 0, height: 0, left: 0, top: 0 };
                if (rect.width || rect.height || rect.left || rect.top) {
                    rects[$id] = rect;
                }
                // just attach whatever's returned by the DOM -- don't wrap this in a synthetic, or else
                // there'll be massive performance penalties.
                styles[$id] = targetWindow.getComputedStyle(native);
            }
        }
        if (containerBody) {
            this.setPaintedInfo(rects, styles, {
                width: containerBody.scrollWidth,
                height: containerBody.scrollHeight
            }, {
                left: containerWindow.scrollX,
                top: containerWindow.scrollY
            });
        }
    };
    SyntheticDOMRenderer.prototype.reset = function () {
        var _this = this;
        this._documentElement = undefined;
        this._cssRuleDictionary = {};
        this._elementDictionary = {};
        var mount = this.mount;
        if (mount) {
            mount.innerHTML = "";
            mount.onclick =
                mount.ondblclick =
                    mount.onsubmit =
                        mount.onmousedown =
                            mount.onmouseenter =
                                mount.onmouseleave =
                                    mount.onmousemove =
                                        mount.onmouseout =
                                            mount.onmouseover =
                                                mount.onmouseup =
                                                    mount.onmousewheel =
                                                        mount.onkeydown =
                                                            mount.onkeypress =
                                                                mount.onkeyup = function (event) {
                                                                    for (var $id in _this._elementDictionary) {
                                                                        var _a = _this._elementDictionary[$id] || [undefined, undefined], native = _a[0], synthetic = _a[1];
                                                                        if (native === event.target) {
                                                                            _this.onDOMEvent(synthetic, event);
                                                                        }
                                                                    }
                                                                };
        }
    };
    SyntheticDOMRenderer.prototype.onDOMEvent = function (element, event) {
        // need to cast as synthetic event. This is fine for now though.
        var e = new SEnvWrapperEvent();
        e.init(event);
        element.dispatchEvent(e);
        event.stopPropagation();
        if (/submit/.test(event.type)) {
            event.preventDefault();
        }
        var ne = new base_1.SyntheticWindowRendererNativeEvent();
        ne.init(base_1.SyntheticWindowRendererNativeEvent.NATIVE_EVENT, element.$id, e);
        if (element.tagName.toLowerCase() === "input") {
            element.value = event.target.value;
        }
        this.dispatchEvent(ne);
    };
    return SyntheticDOMRenderer;
}(base_1.BaseSyntheticWindowRenderer));
exports.SyntheticDOMRenderer = SyntheticDOMRenderer;
var eachMatchingElement = function (a, b, each) {
    each(a, b);
    Array.prototype.forEach.call(a.childNodes, function (ac, i) {
        eachMatchingElement(ac, b.childNodes[i], each);
    });
};
var renderHTMLNode = function (node, dicts, onChange, document) {
    switch (node.nodeType) {
        case constants_1.SEnvNodeTypes.TEXT:
            var value = node.textContent;
            var textNode = document.createTextNode(/^[\s\r\n\t]+$/.test(value) ? "" : value);
            dicts.nodes[node.$id] = [textNode, node];
            return textNode;
        case constants_1.SEnvNodeTypes.COMMENT:
            var comment = document.createComment(node.nodeValue);
            dicts.nodes[node.$id] = [comment, node];
            return comment;
        case constants_1.SEnvNodeTypes.ELEMENT:
            var syntheticElement = node;
            var tagNameLower = syntheticElement.tagName.toLowerCase();
            var element_1 = renderHTMLElement(tagNameLower, syntheticElement, dicts, onChange, document);
            element_1.onload = onChange;
            for (var i = 0, n = syntheticElement.attributes.length; i < n; i++) {
                var syntheticAttribute = syntheticElement.attributes[i];
                if (syntheticAttribute.name === "class") {
                    element_1.className = syntheticAttribute.value;
                }
                else {
                    // some cases where the attribute name may be invalid - especially as the app is updating
                    // as the user is typing. E.g: <i </body> will be parsed, but will thrown an error since "<" will be
                    // defined as an attribute of <i>
                    try {
                        // get preview attribute value instead here
                        var value_1 = syntheticElement.getPreviewAttribute(syntheticAttribute.name);
                        element_1.setAttribute(syntheticAttribute.name, value_1);
                    }
                    catch (e) {
                        console.warn(e.stack);
                    }
                }
            }
            if (tagNameLower === "iframe") {
                var iframe = syntheticElement;
                element_1.appendChild(iframe.contentWindow.renderer.container);
            }
            if (tagNameLower === "style" || tagNameLower === "link") {
                var el = syntheticElement;
                element_1.type = "text/css";
                element_1.appendChild(document.createTextNode(el.sheet.previewCSSText));
                // define function since sheet is not set until it's added to the document
                dicts.sheets[el.sheet.$id] = [function () { return element_1.sheet; }, el.sheet];
            }
            // add a placeholder for these blacklisted elements so that diffing & patching work properly. !!!!Note that we STILL want to append child nodes so that DOM mutations can be synchronized. !!!
            if (/^(script|head)$/.test(tagNameLower)) {
                element_1.style.display = "none";
            }
            return appendChildNodes(element_1, syntheticElement.childNodes, dicts, onChange, document);
        case constants_1.SEnvNodeTypes.DOCUMENT:
        case constants_1.SEnvNodeTypes.DOCUMENT_FRAGMENT:
            var syntheticContainer = node;
            var containerElement = renderHTMLElement("span", syntheticContainer, dicts, onChange, document);
            return appendChildNodes(containerElement, syntheticContainer.childNodes, dicts, onChange, document);
    }
};
var renderHTMLElement = function (tagName, source, dicts, onChange, document) {
    var mappedTagName = NODE_NAME_MAP[tagName.toLowerCase()] || tagName;
    var element = document.createElementNS(source.namespaceURI === constants_1.SVG_XMLNS ? constants_1.SVG_XMLNS : constants_1.HTML_XMLNS, mappedTagName.toLowerCase());
    if (source.shadowRoot) {
        var shadowRoot = element.attachShadow({ mode: "open" });
        dicts.nodes[source.shadowRoot.$id] = [shadowRoot, source.shadowRoot];
        appendChildNodes(shadowRoot, source.shadowRoot.childNodes, dicts, onChange, document);
    }
    dicts.nodes[source.$id] = [element, source];
    return element;
};
var appendChildNodes = function (container, syntheticChildNodes, dicts, onChange, document) {
    for (var i = 0, n = syntheticChildNodes.length; i < n; i++) {
        var childNode = renderHTMLNode(syntheticChildNodes[i], dicts, onChange, document);
        // ignored
        if (childNode == null)
            continue;
        container.appendChild(childNode);
    }
    return container;
};
exports.createSyntheticDOMRendererFactory = function (targetDocument) { return function (window) { return new SyntheticDOMRenderer(window, targetDocument); }; };


 ;(function register() { /* react-hot-loader/webpack */ if (process.env.NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/dom.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/dom.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../aerial-browser-sandbox/src/environment/renderers/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../aerial-browser-sandbox/src/environment/renderers/base.ts"));
__export(__webpack_require__("../aerial-browser-sandbox/src/environment/renderers/dom.ts"));
__export(__webpack_require__("../aerial-browser-sandbox/src/environment/renderers/noop.ts"));
__export(__webpack_require__("../aerial-browser-sandbox/src/environment/renderers/mirror.ts"));


 ;(function register() { /* react-hot-loader/webpack */ if (process.env.NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/index.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/index.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../aerial-browser-sandbox/src/environment/renderers/mirror.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/renderers/base.ts");
var events_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/events/index.ts");
var state_1 = __webpack_require__("../aerial-browser-sandbox/src/state/index.ts");
var SEnvWrapperEvent = events_1.getSEnvEventClasses().SEnvWrapperEvent;
var SyntheticMirrorRenderer = /** @class */ (function (_super) {
    __extends(SyntheticMirrorRenderer, _super);
    function SyntheticMirrorRenderer(window) {
        var _this = _super.call(this, window) || this;
        _this.container = null;
        _this._onSourcePainted = function (event) {
            _this._sync();
        };
        _this._onSourceEvent = function (_a) {
            var nativeEvent = _a.nativeEvent, targetNodeId = _a.targetNodeId;
            var target = state_1.getSyntheticNodeById(_this._sourceWindow.struct, targetNodeId);
            if (target) {
                // TODO - need syncElement function
                target.instance.value = nativeEvent.target.value;
                var wrapperEvent = new SEnvWrapperEvent();
                wrapperEvent.init(nativeEvent);
                target.instance.dispatchEvent(wrapperEvent);
            }
            else {
                console.warn("Cannot dispatch synthetic event " + nativeEvent.type + " on element " + targetNodeId + ".");
            }
        };
        return _this;
    }
    SyntheticMirrorRenderer.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(SyntheticMirrorRenderer.prototype, "source", {
        set: function (source) {
            this._disposeSourceListeners();
            this._source = source;
            if (this._source) {
                this._source.addEventListener(base_1.SyntheticWindowRendererEvent.PAINTED, this._onSourcePainted);
                this._source.addEventListener(base_1.SyntheticWindowRendererNativeEvent.NATIVE_EVENT, this._onSourceEvent);
                this._sync();
            }
        },
        enumerable: true,
        configurable: true
    });
    SyntheticMirrorRenderer.prototype.dispose = function () {
        this._disposeSourceListeners();
    };
    SyntheticMirrorRenderer.prototype._disposeSourceListeners = function () {
        if (this._source) {
            this._source.removeEventListener(base_1.SyntheticWindowRendererEvent.PAINTED, this._onSourcePainted);
            this._source.removeEventListener(base_1.SyntheticWindowRendererNativeEvent.NATIVE_EVENT, this._onSourceEvent);
        }
    };
    SyntheticMirrorRenderer.prototype._sync = function () {
        if (this._source.computedStyles) {
            this.setPaintedInfo(this._source.clientRects, this._source.computedStyles, this._source.scrollRect, this._source.scrollPosition);
        }
    };
    return SyntheticMirrorRenderer;
}(base_1.BaseSyntheticWindowRenderer));
exports.SyntheticMirrorRenderer = SyntheticMirrorRenderer;


 ;(function register() { /* react-hot-loader/webpack */ if (process.env.NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/mirror.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/mirror.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../aerial-browser-sandbox/src/environment/renderers/noop.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__("../aerial-browser-sandbox/src/environment/renderers/base.ts");
var NoopRendererer = /** @class */ (function (_super) {
    __extends(NoopRendererer, _super);
    function NoopRendererer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = null;
        return _this;
    }
    NoopRendererer.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return NoopRendererer;
}(base_1.BaseSyntheticWindowRenderer));
exports.NoopRendererer = NoopRendererer;
exports.createNoopRenderer = function (window) {
    return new NoopRendererer(window);
};


 ;(function register() { /* react-hot-loader/webpack */ if (process.env.NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/noop.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/crcn/Developer/work/tandem/public/packages/aerial-browser-sandbox/src/environment/renderers/noop.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ })

})