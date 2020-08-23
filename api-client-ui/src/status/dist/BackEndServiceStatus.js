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
require("./BackEndServiceStatus");
var axios_1 = require("axios");
var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus[ServiceStatus["UP"] = 0] = "UP";
    ServiceStatus[ServiceStatus["DOWN"] = 1] = "DOWN";
})(ServiceStatus || (ServiceStatus = {}));
var BackEndServiceStatus = /** @class */ (function (_super) {
    __extends(BackEndServiceStatus, _super);
    function BackEndServiceStatus(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            status: ServiceStatus.DOWN
        };
        _this.refreshStatus = _this.refreshStatus.bind(_this);
        _this.getStatusImage = _this.getStatusImage.bind(_this);
        setInterval(_this.refreshStatus, serviceStatusRefreshRate);
        console.log("constructor called...");
        return _this;
    }
    BackEndServiceStatus.prototype.getStatusImage = function () {
        if (this.state.status === ServiceStatus.UP) {
            return (react_1["default"].createElement("img", { src: require('../images/g.png'), alt: "service up image", id: ".status_image", width: iconsize, height: iconsize }));
        }
        else {
            return (react_1["default"].createElement("img", { src: require('../images/r.png'), alt: "service down image", id: ".status_image", width: iconsize, height: iconsize }));
        }
    };
    BackEndServiceStatus.prototype.refreshStatus = function () {
        var _this = this;
        console.log("Refreshing status now: " + currentDate());
        var config = {
            headers: {
                'token': "$x$x$x"
            }
        };
        axios_1["default"].get(healthCheckUrl, config).then(function (res) {
            res.data.status === "UP" ? _this.setStatus(ServiceStatus.UP) : _this.setStatus(ServiceStatus.DOWN);
        })["catch"](function (e) {
            console.error(e);
            if (_this.state.status === ServiceStatus.UP) {
                _this.setStatus(ServiceStatus.DOWN);
            }
        });
    };
    BackEndServiceStatus.prototype.setStatus = function (s) {
        this.setState({
            status: s
        });
    };
    BackEndServiceStatus.prototype.render = function () {
        return (react_1["default"].createElement("div", null, this.getStatusImage()));
    };
    return BackEndServiceStatus;
}(react_1.Component));
exports["default"] = BackEndServiceStatus;
function currentDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date;
}
var port = "8110";
var backEndBaseUrl = "http://localhost:" + port;
var healthCheckUrl = backEndBaseUrl + "/health";
var serviceStatusRefreshRate = 2000;
var iconsize = "24px";
