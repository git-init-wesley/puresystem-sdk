"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true, get: function () {
            return m[k];
        }
    });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function (m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.database = void 0;
const mongodb_1 = require("mongodb");
const log_1 = require("./log/log");
const user_1 = require("./user/user");
const warn_1 = require("./warn/warn");
const database_exceptions_1 = require("./exceptions/database_exceptions");
__exportStar(require("./log/log"), exports);
__exportStar(require("./user/user"), exports);
__exportStar(require("./warn/warn"), exports);
__exportStar(require("./exceptions/database_exceptions"), exports);
__exportStar(require("./database_d"), exports);
var UserPermissions = user_1.user.UserPermissions;
var LogActions = log_1.log.LogActions;
var database;
(function (database) {
    var WarnSchema = warn_1.warn.WarnSchema;
    var Warn = warn_1.warn.Warn;
    var Log = log_1.log.Log;
    var UserPermissionNotEnough = database_exceptions_1.database_exceptions.UserPermissionNotEnough;
    var LogSchema = log_1.log.LogSchema;
    var UserSchema = user_1.user.UserSchema;
    var UserPermissionAlready = database_exceptions_1.database_exceptions.UserPermissionAlready;
    var DatabaseNoSuchData = database_exceptions_1.database_exceptions.DatabaseNoSuchData;
    var DatabaseError = database_exceptions_1.database_exceptions.DatabaseError;
    var User = user_1.user.User;
    var WarnState = warn_1.warn.WarnState;

    class Database {
        constructor() {
            this._mongoose = require('mongoose');
        }

        connect(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                this._mongoClient = yield this._mongoose.connect(url, options);
                this._warnsCollection = this._mongoose.model('Warns', WarnSchema);
                this._logsCollection = this._mongoose.model('Logs', LogSchema);
                this._usersCollection = this._mongoose.model('Users', UserSchema);
                return this._mongoClient;
            });
        }

        getLogs() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._logsCollection.find();
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        getLogsByUserId(userId) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._logsCollection.find({userId: userId});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        getLogsByAction(action) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._logsCollection.find({action: action});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        getLogById(uuid) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempLog;
                try {
                    _tempLog = yield this._logsCollection.findOne({uuid: mongodb_1.ObjectId.createFromHexString(uuid)});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempLog === null)
                    throw new DatabaseNoSuchData();
                return _tempLog;
            });
        }

        getWarns() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._warnsCollection.find();
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        getWarnsOnlyAccepted() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._warnsCollection.find({state: WarnState.ACCEPTED});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        getWarnById(uuid) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOne({uuid: mongodb_1.ObjectId.createFromHexString(uuid)});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        getWarnByUserId(userId) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOne({userId: userId});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        getWarnByModeratorId(moderatorId) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOne({moderatorId: moderatorId});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        addWarn(userId, cause, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.WARN_ADD))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.WARN_ADD, `The Moderator (${moderator.uuid.toString()}) warn The User (${userId})`);
                yield this.addLog(log);
                let warn = Warn.create(log, userId, cause, moderator.uuid);
                try {
                    return yield this._warnsCollection.create(warn);
                } catch (e) {
                    console.log(e);
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        openWarn(warnId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.WARN_OPEN))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.WARN_OPEN, `The Moderator (${moderator.uuid.toString()}) open warn. (${warnId})`);
                yield this.addLog(log);
                let _findWarn = yield this.getWarnById(warnId);
                _findWarn.logs.push(log.uuid);
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOneAndUpdate({uuid: _findWarn.uuid}, {
                        logs: _findWarn.logs,
                        closed: false,
                        closedModeratorId: undefined,
                        lastUpdated: Date.now(),
                        lastUpdatedModeratorId: moderator.uuid
                    });
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        acceptWarn(warnId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.WARN_STATE))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.WARN_STATE, `The Moderator (${moderator.uuid.toString()}) update state (${WarnState.ACCEPTED}) warn. (${warnId})`);
                yield this.addLog(log);
                let _findWarn = yield this.getWarnById(warnId);
                _findWarn.logs.push(log.uuid);
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOneAndUpdate({uuid: _findWarn.uuid}, {
                        state: WarnState.ACCEPTED
                    });
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        refuseWarn(warnId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.WARN_STATE))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.WARN_STATE, `The Moderator (${moderator.uuid.toString()}) update state (${WarnState.ACCEPTED}) warn. (${warnId})`);
                yield this.addLog(log);
                let _findWarn = yield this.getWarnById(warnId);
                _findWarn.logs.push(log.uuid);
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOneAndUpdate({uuid: _findWarn.uuid}, {
                        state: WarnState.REFUSED
                    });
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        updateWarn(cause, warnId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.WARN_CLOSE))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.WARN_UPDATE, `The Moderator (${moderator.uuid.toString()}) update warn. (${warnId})`);
                yield this.addLog(log);
                let _findWarn = yield this.getWarnById(warnId);
                _findWarn.logs.push(log.uuid);
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOneAndUpdate({uuid: _findWarn.uuid}, {
                        logs: _findWarn.logs,
                        cause: cause,
                        lastUpdated: Date.now(),
                        lastUpdatedModeratorId: moderator.uuid
                    });
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        closeWarn(warnId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.WARN_CLOSE))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.WARN_CLOSE, `The Moderator (${moderator.uuid.toString()}) close warn. (${warnId})`);
                yield this.addLog(log);
                let _findWarn = yield this.getWarnById(warnId);
                _findWarn.logs.push(log.uuid);
                let _tempWarn;
                try {
                    _tempWarn = yield this._warnsCollection.findOneAndUpdate({uuid: _findWarn.uuid}, {
                        logs: _findWarn.logs,
                        closed: true,
                        closedModeratorId: moderator.uuid,
                        lastUpdated: Date.now(),
                        lastUpdatedModeratorId: moderator.uuid
                    });
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempWarn == null)
                    throw new DatabaseNoSuchData();
                return _tempWarn;
            });
        }

        getUsers() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._usersCollection.find();
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        getUserById(uuid) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOne({uuid: mongodb_1.ObjectId.createFromHexString(uuid)});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        getUserByDiscordId(discordId) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOne({discordId: discordId});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        getUserByMinecraftUUID(minecraftUUID) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOne({minecraftUUID: minecraftUUID});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        addUserPermission(permission, userId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.PERMISSION_ADD_USER))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.PERMISSION_ADD_USER, `The Moderator (${moderator.uuid.toString()}) add permission (${permission}) to user. (${userId})`);
                yield this.addLog(log);
                let _findUser = (yield this.getUserById(userId));
                if (_findUser.permissions.includes(permission))
                    throw new UserPermissionAlready();
                _findUser.permissions.push(permission);
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOneAndUpdate({uuid: _findUser.uuid}, {permissions: _findUser.permissions});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        removeUserPermission(permission, userId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!moderator.permissions.includes(UserPermissions.PERMISSION_REMOVE_USER))
                    throw new UserPermissionNotEnough();
                let log = Log.create(moderator.uuid.toString(), LogActions.PERMISSION_REMOVE_USER, `The Moderator (${moderator.uuid.toString()}) remove permission (${permission}) to user. (${userId})`);
                yield this.addLog(log);
                let _findUser = (yield this.getUserById(userId));
                if (!_findUser.permissions.includes(permission))
                    throw new UserPermissionAlready();
                _findUser.permissions.filter(e => e != permission);
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOneAndUpdate({uuid: _findUser.uuid}, {permissions: _findUser.permissions});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        updateUserDiscordId(discordId, userId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let log = Log.create(moderator.uuid.toString(), LogActions.USER_UPDATE_DISCORD_ID, `The Moderator (${moderator.uuid.toString()}) update discord (${discordId}) to user. (${userId})`);
                yield this.addLog(log);
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOneAndUpdate({uuid: userId}, {discordId: discordId});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        updateUserMinecraftUUID(minecraftUUID, userId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let log = Log.create(moderator.uuid.toString(), LogActions.USER_UPDATE_MINECRAFT_UUID, `The Moderator (${moderator.uuid.toString()}) update minecraft (${minecraftUUID}) to user. (${userId})`);
                yield this.addLog(log);
                let _tempUser;
                try {
                    _tempUser = yield this._usersCollection.findOneAndUpdate({uuid: userId}, {minecraftUUID: minecraftUUID});
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
                if (_tempUser == null)
                    throw new DatabaseNoSuchData();
                return _tempUser;
            });
        }

        createUser(discordId, moderator) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let user = User.create(discordId, undefined);
                let log = Log.create(moderator.uuid.toString(), LogActions.USER_CREATE, `The Moderator (${moderator.uuid.toString()}) create user. (${user.uuid})`);
                yield this.addLog(log);
                try {
                    return yield this._usersCollection.create(user);
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }

        addLog(log) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return this._logsCollection.create(log);
                } catch (e) {
                    if (e != null && e instanceof Error) {
                        throw new DatabaseError(((_a = e) === null || _a === void 0 ? void 0 : _a.message));
                    }
                    throw e;
                }
            });
        }
    }

    database.Database = Database;
})(database = exports.database || (exports.database = {}));
