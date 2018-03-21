"use strict";
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
var parse5 = require("parse5");
var effects_1 = require("redux-saga/effects");
var environment_1 = require("../environment");
var aerial_common2_1 = require("aerial-common2");
var source_mutation_1 = require("source-mutation");
var actions_1 = require("../actions");
var maintinWhitespaceTrimmings = function (oldContent, newContent) {
    var wsParts = oldContent.match(/(^[\s\r\n\t]*|[\s\r\n\t]*$)/g);
    return wsParts[0] + newContent.trim() + wsParts[1];
};
function htmlContentEditorSaga(contentType) {
    if (contentType === void 0) { contentType = "text/html"; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.fork(function handleSetValueNode() {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!true) return [3 /*break*/, 2];
                                return [4 /*yield*/, aerial_common2_1.takeRequest(actions_1.testMutateContentRequest(contentType, environment_1.UPDATE_VALUE_NODE), function (_a) {
                                        var mutation = _a.mutation, content = _a.content;
                                        var targetNode = findMutationTargetExpression(mutation.target, parseHTML(content));
                                        return source_mutation_1.createStringMutation(targetNode.__location.startOffset, targetNode.__location.startOffset + targetNode.value.trim().length, mutation.newValue);
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 0];
                            case 2: return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(function handleRemoveNode() {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!true) return [3 /*break*/, 2];
                                    return [4 /*yield*/, aerial_common2_1.takeRequest(actions_1.testMutateContentRequest(contentType, environment_1.REMOVE_CHILD_NODE_EDIT), function (_a) {
                                            var mutation = _a.mutation, content = _a.content;
                                            var targetNode = findMutationTargetExpression(mutation.child, parseHTML(content));
                                            return source_mutation_1.createStringMutation(targetNode.__location.startOffset, targetNode.__location.endOffset, "");
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 2: return [2 /*return*/];
                            }
                        });
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(function handleSetTextContent() {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!true) return [3 /*break*/, 2];
                                    return [4 /*yield*/, aerial_common2_1.takeRequest(actions_1.testMutateContentRequest(contentType, environment_1.SET_TEXT_CONTENT), function (_a) {
                                            var mutation = _a.mutation, content = _a.content;
                                            var targetNode = findMutationTargetExpression(mutation.target, parseHTML(content));
                                            var start = targetNode.__location.startTag.endOffset;
                                            var end = targetNode.__location.endTag ? targetNode.__location.endTag.startOffset : targetNode.__location.endOffset;
                                            var oldContent = content.substr(start, end - start);
                                            return source_mutation_1.createStringMutation(start, end, maintinWhitespaceTrimmings(oldContent, mutation.newValue));
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 2: return [2 /*return*/];
                            }
                        });
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(function handleSetAttributes() {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!true) return [3 /*break*/, 2];
                                    return [4 /*yield*/, aerial_common2_1.takeRequest(actions_1.testMutateContentRequest(contentType, environment_1.SET_ELEMENT_ATTRIBUTE_EDIT), function (_a) {
                                            var mutation = _a.mutation, content = _a.content;
                                            var node = findMutationTargetExpression(mutation.target, parseHTML(content));
                                            var target = mutation.target, name = mutation.name, newValue = mutation.newValue, oldName = mutation.oldName, index = mutation.index;
                                            var syntheticElement = target;
                                            var start = node.__location.startTag.startOffset + node.tagName.length + 1; // eat < + tagName
                                            var end = start;
                                            var found = false;
                                            var mutations = [];
                                            for (var i = node.attrs.length; i--;) {
                                                var attr = node.attrs[i];
                                                if (attr.name === name) {
                                                    found = true;
                                                    var attrLocation = node.__location.attrs[attr.name];
                                                    var beforeAttr = node.attrs[index];
                                                    start = attrLocation.startOffset;
                                                    end = attrLocation.endOffset;
                                                    if (i !== index && beforeAttr) {
                                                        var beforeAttrLocation = node.__location.attrs[beforeAttr.name];
                                                        mutations.push(source_mutation_1.createStringMutation(start, end, ""));
                                                        start = end = beforeAttrLocation.startOffset;
                                                        node.attrs.splice(i, 1);
                                                        node.attrs.splice(index, 0, attr);
                                                    }
                                                    mutations.push(source_mutation_1.createStringMutation(start, end, newValue ? name + "=\"" + newValue + "\"" : ""));
                                                }
                                            }
                                            if (!found) {
                                                var newMutation = source_mutation_1.createStringMutation(start, end, newValue ? " " + name + "=\"" + newValue + "\"" : "");
                                                // let i = 0;
                                                // for (i = 0; i < this._sourceMutations.length; i++) {
                                                //   const stringMutation = this._sourceMutations[i];
                                                //   if (stringMutation.node === node && stringMutation.source.type === SyntheticDOMElementMutationTypes.SET_ELEMENT_ATTRIBUTE_EDIT) {
                                                //     const prevAttrMutation = stringMutation.source as PropertyMutation<any>;
                                                //     if (prevAttrMutation.index < index && stringMutation.startIndex === start) {
                                                //       break;
                                                //     }
                                                //   }
                                                // }
                                                return newMutation;
                                            }
                                            return mutations;
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 2: return [2 /*return*/];
                            }
                        });
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.htmlContentEditorSaga = htmlContentEditorSaga;
var parseHTML = aerial_common2_1.weakMemo(function (content) {
    return parse5.parse(content, { locationInfo: true });
});
var findMutationTargetExpression = function (target, root) {
    return environment_1.findDOMNodeExpression(root, function (expression) {
        var location = environment_1.getHTMLASTNodeLocation(expression);
        return expression.nodeName === target.nodeName.toLowerCase() && aerial_common2_1.expressionPositionEquals(location, target.source.start);
    });
};
//# sourceMappingURL=html-content-editor.js.map