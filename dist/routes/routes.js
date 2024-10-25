"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var router = (0, express_1.Router)();
router.get('/', function (req, res) { res.send('welcome to TASKER API'); });
router.get('users/all', userController_1.default.findAll);
// .get('user/:userId', () => {})
// .post('create/user', () => {})
// .put('update/user/:userId', () => {})
// .delete('delete/user/:userId', () => {})
exports.default = router;
