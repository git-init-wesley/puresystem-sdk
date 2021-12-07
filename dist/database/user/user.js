"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.user = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
var user;
(function (user) {
    let UserPermissions;
    (function (UserPermissions) {
        UserPermissions[UserPermissions["WARN_ADD"] = 0] = "WARN_ADD";
        UserPermissions[UserPermissions["WARN_CLOSE"] = 1] = "WARN_CLOSE";
        UserPermissions[UserPermissions["WARN_OPEN"] = 2] = "WARN_OPEN";
        UserPermissions[UserPermissions["WARN_UPDATE"] = 3] = "WARN_UPDATE";
        UserPermissions[UserPermissions["WARN_STATE"] = 4] = "WARN_STATE";
        UserPermissions[UserPermissions["PERMISSION_ADD_USER"] = 5] = "PERMISSION_ADD_USER";
        UserPermissions[UserPermissions["PERMISSION_REMOVE_USER"] = 6] = "PERMISSION_REMOVE_USER";
        UserPermissions[UserPermissions["WHITELIST_ADD_GUILD"] = 7] = "WHITELIST_ADD_GUILD";
        UserPermissions[UserPermissions["WHITELIST_REMOVE_GUILD"] = 8] = "WHITELIST_REMOVE_GUILD";
    })(UserPermissions = user.UserPermissions || (user.UserPermissions = {}));
    user.UserSchema = new mongoose_1.Schema({
        uuid: {type: mongodb_1.ObjectId, required: true, unique: true, index: true},
        discordId: {type: String},
        minecraftUUID: {type: String},
        permissions: {type: Number, enum: UserPermissions, default: []}
    });

    class User {
        constructor(uuid, discordId, minecraftUUID, permissions) {
            this.uuid = uuid !== null && uuid !== void 0 ? uuid : new mongodb_1.ObjectId();
            this.discordId = discordId;
            this.minecraftUUID = minecraftUUID;
            this.permissions = permissions;
        }

        static create(discordId, minecraftUUID) {
            return new User(undefined, discordId, minecraftUUID, []);
        }
    }

    user.User = User;
    user.PureSystemUser = new User(mongodb_1.ObjectId.createFromHexString("61ae9b9860dfe5dabf223225"), undefined, undefined, [
        UserPermissions.WARN_ADD,
        UserPermissions.WARN_CLOSE,
        UserPermissions.WARN_OPEN,
        UserPermissions.WARN_UPDATE,
        UserPermissions.WARN_STATE,
        UserPermissions.PERMISSION_ADD_USER,
        UserPermissions.PERMISSION_REMOVE_USER,
        UserPermissions.WHITELIST_ADD_GUILD,
        UserPermissions.WHITELIST_REMOVE_GUILD
    ]);
})(user = exports.user || (exports.user = {}));
