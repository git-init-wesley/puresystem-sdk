"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.log = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
var log;
(function (log_1) {
    let LogActions;
    (function (LogActions) {
        LogActions[LogActions["WARN_ADD"] = 0] = "WARN_ADD";
        LogActions[LogActions["WARN_CLOSE"] = 1] = "WARN_CLOSE";
        LogActions[LogActions["WARN_OPEN"] = 2] = "WARN_OPEN";
        LogActions[LogActions["WARN_UPDATE"] = 3] = "WARN_UPDATE";
        LogActions[LogActions["PERMISSION_ADD_USER"] = 4] = "PERMISSION_ADD_USER";
        LogActions[LogActions["PERMISSION_REMOVE_USER"] = 5] = "PERMISSION_REMOVE_USER";
        LogActions[LogActions["USER_UPDATE_DISCORD_ID"] = 6] = "USER_UPDATE_DISCORD_ID";
        LogActions[LogActions["USER_UPDATE_MINECRAFT_UUID"] = 7] = "USER_UPDATE_MINECRAFT_UUID";
        LogActions[LogActions["USER_CREATE"] = 8] = "USER_CREATE";
        LogActions[LogActions["WHITELIST_ADD_GUILD"] = 9] = "WHITELIST_ADD_GUILD";
        LogActions[LogActions["WHITELIST_REMOVE_GUILD"] = 10] = "WHITELIST_REMOVE_GUILD";
    })(LogActions = log_1.LogActions || (log_1.LogActions = {}));
    log_1.LogSchema = new mongoose_1.Schema({
        uuid: {type: mongodb_1.ObjectId, required: true, unique: true, index: true},
        userId: {type: mongodb_1.ObjectId, required: true, index: true},
        action: {type: Number, enum: LogActions, required: true, index: true},
        actionDetailed: {type: String, required: true}
    });

    class Log {
        constructor(uuid, userId, action, actionDetailed) {
            this.uuid = uuid !== null && uuid !== void 0 ? uuid : new mongodb_1.ObjectId();
            this.userId = userId;
            this.action = action;
            this.actionDetailed = actionDetailed;
        }

        static create(userId, action, actionDetailed) {
            return new Log(undefined, mongodb_1.ObjectId.createFromHexString(userId), action, actionDetailed);
        }
    }

    log_1.Log = Log;
})(log = exports.log || (exports.log = {}));
