"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.findAll = function (req, res) {
        res.json([
            {
                statusCode: 200,
                message: 'user fetched sucessfully',
                data: [
                    {
                        username: 'Mário Norberto',
                        password: 'adakdlaoow323'
                    }
                ],
                timestamp: Date.now()
            }
        ]);
    };
    UserController.prototype.create = function (req, res) { };
    UserController.prototype.findOne = function (req, res) { };
    UserController.prototype.updateOne = function (req, res) { };
    UserController.prototype.deleteOne = function (req, res) { };
    UserController.prototype.getUserTasks = function (req, res) { };
    return UserController;
}());
exports.default = new UserController();
