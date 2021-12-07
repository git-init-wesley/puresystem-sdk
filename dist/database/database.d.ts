import {MongoClient, MongoClientOptions} from "mongodb";
import {log} from "./log/log";
import {user} from "./user/user";
import {warn} from "./warn/warn";
import {idatabase} from "./database_d";

export * from "./log/log";
export * from "./user/user";
export * from "./warn/warn";
export * from "./exceptions/database_exceptions";
export * from "./database_d";
import UserPermissions = user.UserPermissions;
import LogActions = log.LogActions;

export declare module database {
    import Log = log.Log;
    import IDatabase = idatabase.IDatabase;
    import IWarn = warn.IWarn;
    import ILog = log.ILog;
    import IUser = user.IUser;

    class Database implements IDatabase {
        private _mongoose;
        private _mongoClient?;
        private _warnsCollection?;
        private _logsCollection?;
        private _usersCollection?;

        connect(url: string, options?: MongoClientOptions): Promise<MongoClient>;

        getLogs(): Promise<Array<ILog>>;

        getLogsByUserId(userId: string): Promise<Array<ILog>>;

        getLogsByAction(action: LogActions): Promise<Array<ILog>>;

        getLogById(uuid: string): Promise<ILog>;

        getWarns(): Promise<Array<IWarn>>;

        getWarnsOnlyAccepted(): Promise<Array<IWarn>>;

        getWarnById(uuid: string): Promise<IWarn>;

        getWarnByUserId(userId: string): Promise<IWarn>;

        getWarnByModeratorId(moderatorId: string): Promise<IWarn>;

        addWarn(userId: string, cause: string, moderator: IUser): Promise<IWarn>;

        openWarn(warnId: string, moderator: IUser): Promise<IWarn>;

        acceptWarn(warnId: string, moderator: IUser): Promise<IWarn>;

        refuseWarn(warnId: string, moderator: IUser): Promise<IWarn>;

        updateWarn(cause: string, warnId: string, moderator: IUser): Promise<IWarn>;

        closeWarn(warnId: string, moderator: IUser): Promise<IWarn>;

        getUsers(): Promise<Array<IUser>>;

        getUserById(uuid: string): Promise<IUser>;

        getUserByDiscordId(discordId: string): Promise<IUser>;

        getUserByMinecraftUUID(minecraftUUID: string): Promise<IUser>;

        addUserPermission(permission: UserPermissions, userId: string, moderator: IUser): Promise<IUser>;

        removeUserPermission(permission: UserPermissions, userId: string, moderator: IUser): Promise<IUser>;

        updateUserDiscordId(discordId: string, userId: string, moderator: IUser): Promise<IUser>;

        updateUserMinecraftUUID(minecraftUUID: string, userId: string, moderator: IUser): Promise<IUser>;

        createUser(discordId: string, moderator: IUser): Promise<IUser>;

        addLog(log: Log): Promise<ILog>;
    }
}
