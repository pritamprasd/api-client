"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
require("./RequestParentComponent.css");
var axios_1 = require("axios");
var RequestParentComponent = /** @class */ (function (_super) {
    __extends(RequestParentComponent, _super);
    function RequestParentComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            url: "",
            response: ""
        };
        _this.sendRequest = _this.sendRequest.bind(_this);
        _this.setUrl = _this.setUrl.bind(_this);
        _this.setResponse = _this.setResponse.bind(_this);
        return _this;
    }
    RequestParentComponent.prototype.setUrl = function (u) {
        this.setState({
            url: u
        });
    };
    RequestParentComponent.prototype.setResponse = function (r) {
        this.setState({
            response: r
        });
    };
    RequestParentComponent.prototype.sendRequest = function () {
        var _this = this;
        if (isValidUrl(this.state.url)) {
            console.log("Calling : " + getNormalizedUrl(this.state.url));
            var config = {
                headers: {}
            };
            var requestBody = {
                "method": "GET",
                "url": getNormalizedUrl(this.state.url)
            };
            axios_1["default"].post(backendServiceSingleApiExeUrl, requestBody, config).then(function (res) {
                _this.setResponse(JSON.stringify(res.data));
            })["catch"](function (e) { return console.error(e); });
        }
        else {
            console.log("Invalid url: " + this.state.url);
        }
    };
    RequestParentComponent.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { id: "input" },
                react_1["default"].createElement("label", null,
                    "URL:",
                    react_1["default"].createElement("input", { type: "url", value: this.state.url, onChange: function (e) { return _this.setUrl(e.target.value); }, required: true }),
                    react_1["default"].createElement("input", { type: "button", value: "Send", onClick: this.sendRequest }))),
            react_1["default"].createElement("div", { id: "output" },
                react_1["default"].createElement("textarea", { id: "apiOutput", value: this.state.response }))));
    };
    return RequestParentComponent;
}(react_1.Component));
function isValidUrl(s) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(s);
}
function getNormalizedUrl(s) {
    return s.search("http") === -1 ? "http://" + s : s;
}
exports["default"] = RequestParentComponent;
var backendServiceSingleApiExeUrl = "http://localhost:8110/api";
