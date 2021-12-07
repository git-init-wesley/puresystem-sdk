import {Model} from "mongoose";
import {MongoClient, MongoClientOptions, ObjectId} from "mongodb";

import {log} from "./log/log";
import {user} from "./user/user";
import {warn} from "./warn/warn";
import {database_exceptions} from "./exceptions/database_exceptions";
import {idatabase} from "./database_d";

export * from "./log/log";
export * from "./user/user";
export * from "./warn/warn";
export * from "./exceptions/database_exceptions";
export * from "./database_d";

import UserPermissions = user.UserPermissions;
import LogActions = log.LogActions;

export module database {
    import WarnSchema = warn.WarnSchema;
    import Warn = warn.Warn;
    import Log = log.Log;
    import UserPermissionNotEnough = database_exceptions.UserPermissionNotEnough;
    import IDatabase = idatabase.IDatabase;
    import IWarn = warn.IWarn;
    import LogSchema = log.LogSchema;
    import ILog = log.ILog;
    import IUser = user.IUser;
    import UserSchema = user.UserSchema;
    import UserPermissionAlready = database_exceptions.UserPermissionAlready;
    import DatabaseNoSuchData = database_exceptions.DatabaseNoSuchData;
    import DatabaseError = database_exceptions.DatabaseError;
    import User = user.User;
    import WarnState = warn.WarnState;

    export class Database implements IDatabase {
        private _mongoose = require('mongoose');
        private _mongoClient?: MongoClient;
        private _warnsCollection?: Model<IWarn>;
        private _logsCollection?: Model<ILog>;
        private _usersCollection?: Model<IUser>;

        public async connect(url: string, options?: MongoClientOptions): Promise<MongoClient> {
            this._mongoClient = await this._mongoose.connect(url, options);
            this._warnsCollection = this._mongoose.model('Warns', WarnSchema);
            this._logsCollection = this._mongoose.model('Logs', LogSchema);
            this._usersCollection = this._mongoose.model('Users', UserSchema);
            return this._mongoClient!;
        }

        public async getLogs(): Promise<Array<ILog>> {
            try {
                return this._logsCollection!.find();
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async getLogsByUserId(userId: string): Promise<Array<ILog>> {
            try {
                return this._logsCollection!.find({userId: userId});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async getLogsByAction(action: LogActions): Promise<Array<ILog>> {
            try {
                return this._logsCollection!.find({action: action});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async getLogById(uuid: string): Promise<ILog> {
            let _tempLog: ILog | null;
            try {
                _tempLog = await this._logsCollection!.findOne({uuid: ObjectId.createFromHexString(uuid)})
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempLog === null) throw new DatabaseNoSuchData();
            return _tempLog;

        }

        public async getWarns(): Promise<Array<IWarn>> {
            try {
                return this._warnsCollection!.find();
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async getWarnsOnlyAccepted(): Promise<Array<IWarn>> {
            try {
                return this._warnsCollection!.find({state: WarnState.ACCEPTED});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async getWarnById(uuid: string): Promise<IWarn> {
            let _tempWarn: IWarn | null;
            try {
                _tempWarn = await this._warnsCollection!.findOne({uuid: ObjectId.createFromHexString(uuid)});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async getWarnByUserId(userId: string): Promise<IWarn> {
            let _tempWarn: IWarn | null;
            try {
                _tempWarn = await this._warnsCollection!.findOne({userId: userId});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async getWarnByModeratorId(moderatorId: string): Promise<IWarn> {
            let _tempWarn: IWarn | null;
            try {
                _tempWarn = await this._warnsCollection!.findOne({moderatorId: moderatorId});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async addWarn(userId: string, cause: string, moderator: IUser): Promise<IWarn> {
            if (!moderator.permissions!.includes(UserPermissions.WARN_ADD)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.WARN_ADD, `The Moderator (${moderator.uuid!.toString()}) warn The User (${userId})`);
            await this.addLog(log);

            let warn: Warn = Warn.create(log, userId, cause, moderator.uuid!);
            try {
                return await this._warnsCollection!.create(warn);
            } catch (e) {
                console.log(e);
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async openWarn(warnId: string, moderator: IUser): Promise<IWarn> {
            if (!moderator.permissions!.includes(UserPermissions.WARN_OPEN)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.WARN_OPEN, `The Moderator (${moderator.uuid!.toString()}) open warn. (${warnId})`);
            await this.addLog(log);

            let _findWarn: IWarn = await this.getWarnById(warnId);
            _findWarn.logs!.push(log.uuid!);

            let _tempWarn: IWarn | null
            try {
                _tempWarn = await this._warnsCollection!.findOneAndUpdate({uuid: _findWarn.uuid}, {
                    logs: _findWarn.logs,
                    closed: false,
                    closedModeratorId: undefined,
                    lastUpdated: Date.now(),
                    lastUpdatedModeratorId: moderator.uuid
                });
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }

            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async acceptWarn(warnId: string, moderator: IUser): Promise<IWarn> {
            if (!moderator.permissions!.includes(UserPermissions.WARN_STATE)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.WARN_STATE, `The Moderator (${moderator.uuid!.toString()}) update state (${WarnState.ACCEPTED}) warn. (${warnId})`);
            await this.addLog(log);

            let _findWarn: IWarn = await this.getWarnById(warnId);
            _findWarn.logs!.push(log.uuid!);

            let _tempWarn: IWarn | null
            try {
                _tempWarn = await this._warnsCollection!.findOneAndUpdate({uuid: _findWarn.uuid}, {
                    state: WarnState.ACCEPTED
                });
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }

            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async refuseWarn(warnId: string, moderator: IUser): Promise<IWarn> {
            if (!moderator.permissions!.includes(UserPermissions.WARN_STATE)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.WARN_STATE, `The Moderator (${moderator.uuid!.toString()}) update state (${WarnState.ACCEPTED}) warn. (${warnId})`);
            await this.addLog(log);

            let _findWarn: IWarn = await this.getWarnById(warnId);
            _findWarn.logs!.push(log.uuid!);

            let _tempWarn: IWarn | null
            try {
                _tempWarn = await this._warnsCollection!.findOneAndUpdate({uuid: _findWarn.uuid}, {
                    state: WarnState.REFUSED
                });
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }

            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async updateWarn(cause: string, warnId: string, moderator: IUser): Promise<IWarn> {
            if (!moderator.permissions!.includes(UserPermissions.WARN_CLOSE)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.WARN_UPDATE, `The Moderator (${moderator.uuid!.toString()}) update warn. (${warnId})`);
            await this.addLog(log);

            let _findWarn: IWarn = await this.getWarnById(warnId);
            _findWarn.logs!.push(log.uuid!);

            let _tempWarn: IWarn | null
            try {
                _tempWarn = await this._warnsCollection!.findOneAndUpdate({uuid: _findWarn.uuid}, {
                    logs: _findWarn.logs,
                    cause: cause,
                    lastUpdated: Date.now(),
                    lastUpdatedModeratorId: moderator.uuid
                });
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }

            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async closeWarn(warnId: string, moderator: IUser): Promise<IWarn> {
            if (!moderator.permissions!.includes(UserPermissions.WARN_CLOSE)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.WARN_CLOSE, `The Moderator (${moderator.uuid!.toString()}) close warn. (${warnId})`);
            await this.addLog(log);

            let _findWarn: IWarn = await this.getWarnById(warnId);
            _findWarn.logs!.push(log.uuid!);

            let _tempWarn: IWarn | null
            try {
                _tempWarn = await this._warnsCollection!.findOneAndUpdate({uuid: _findWarn.uuid}, {
                    logs: _findWarn.logs,
                    closed: true,
                    closedModeratorId: moderator.uuid,
                    lastUpdated: Date.now(),
                    lastUpdatedModeratorId: moderator.uuid
                });
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }

            if (_tempWarn == null) throw new DatabaseNoSuchData();
            return _tempWarn;
        }

        public async getUsers(): Promise<Array<IUser>> {
            try {
                return this._usersCollection!.find();
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async getUserById(uuid: string): Promise<IUser> {
            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOne({uuid: ObjectId.createFromHexString(uuid)});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async getUserByDiscordId(discordId: string): Promise<IUser> {
            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOne({discordId: discordId});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async getUserByMinecraftUUID(minecraftUUID: string): Promise<IUser> {
            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOne({minecraftUUID: minecraftUUID})
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async addUserPermission(permission: UserPermissions, userId: string, moderator: IUser): Promise<IUser> {
            if (!moderator.permissions!.includes(UserPermissions.PERMISSION_ADD_USER)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.PERMISSION_ADD_USER, `The Moderator (${moderator.uuid!.toString()}) add permission (${permission}) to user. (${userId})`);
            await this.addLog(log);

            let _findUser: IUser = (await this.getUserById(userId))!;
            if (_findUser.permissions!.includes(permission)) throw new UserPermissionAlready();
            _findUser.permissions!.push(permission);
            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOneAndUpdate({uuid: _findUser.uuid}, {permissions: _findUser.permissions});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async removeUserPermission(permission: UserPermissions, userId: string, moderator: IUser): Promise<IUser> {
            if (!moderator.permissions!.includes(UserPermissions.PERMISSION_REMOVE_USER)) throw new UserPermissionNotEnough();

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.PERMISSION_REMOVE_USER, `The Moderator (${moderator.uuid!.toString()}) remove permission (${permission}) to user. (${userId})`);
            await this.addLog(log);

            let _findUser: IUser = (await this.getUserById(userId))!;
            if (!_findUser.permissions!.includes(permission)) throw new UserPermissionAlready();
            _findUser.permissions!.filter(e => e != permission);
            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOneAndUpdate({uuid: _findUser.uuid}, {permissions: _findUser.permissions});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async updateUserDiscordId(discordId: string, userId: string, moderator: IUser): Promise<IUser> {
            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.USER_UPDATE_DISCORD_ID, `The Moderator (${moderator.uuid!.toString()}) update discord (${discordId}) to user. (${userId})`);
            await this.addLog(log);

            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOneAndUpdate({uuid: userId}, {discordId: discordId});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async updateUserMinecraftUUID(minecraftUUID: string, userId: string, moderator: IUser): Promise<IUser> {
            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.USER_UPDATE_MINECRAFT_UUID, `The Moderator (${moderator.uuid!.toString()}) update minecraft (${minecraftUUID}) to user. (${userId})`);
            await this.addLog(log);

            let _tempUser: IUser | null;
            try {
                _tempUser = await this._usersCollection!.findOneAndUpdate({uuid: userId}, {minecraftUUID: minecraftUUID});
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
            if (_tempUser == null) throw new DatabaseNoSuchData();
            return _tempUser;
        }

        public async createUser(discordId: string, moderator: IUser): Promise<IUser> {
            let user: User = User.create(discordId, undefined);

            let log: Log = Log.create(moderator.uuid!.toString(), LogActions.USER_CREATE, `The Moderator (${moderator.uuid!.toString()}) create user. (${user.uuid})`);
            await this.addLog(log);

            try {
                return await this._usersCollection!.create(user);
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

        public async addLog(log: Log): Promise<ILog> {
            try {
                return this._logsCollection!.create(log);
            } catch (e) {
                if (e != null && e instanceof Error) {
                    throw new DatabaseError(((e as Error | null)?.message));
                }
                throw e;
            }
        }

    }
}