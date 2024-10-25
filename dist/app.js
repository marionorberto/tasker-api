"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var datasource_1 = __importDefault(require("./config/datasource"));
var routes_1 = __importDefault(require("./routes/routes"));
require('dotenv/config');
var Application = /** @class */ (function () {
    function Application() {
        this.app = (0, express_1.default)();
        this.appConfig();
    }
    Application.prototype.appConfig = function () {
        datasource_1.default;
        this.app.use(express_1.default.json());
        this.app.use(routes_1.default);
    };
    return Application;
}());
exports.default = Application;
