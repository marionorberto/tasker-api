"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var application = new app_1.default();
var PORT = process.env.PORT || 3000;
application.app.listen(PORT, function () { return console.log("Server Running \uD83D\uDD25 On Port:".concat(PORT, " | http://localhost:3000")); });
