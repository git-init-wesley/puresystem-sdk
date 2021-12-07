import {ObjectId} from "mongodb";
import {Model, Schema} from "mongoose";

export declare module log {
    enum LogActions {
        WARN_ADD = 0,
        WARN_CLOSE = 1,
        WARN_OPEN = 2,
        WARN_UPDATE = 3,
        WARN_STATE = 4,
        PERMISSION_ADD_USER = 5,
        PERMISSION_REMOVE_USER = 6,
        WHITELIST_ADD_GUILD = 7,
        WHITELIST_REMOVE_GUILD = 8,
        USER_UPDATE_DISCORD_ID = 9,
        USER_UPDATE_MINECRAFT_UUID = 10,
        USER_CREATE = 11
    }

    interface ILog {
        readonly uuid?: ObjectId;
        readonly userId?: ObjectId;
        readonly action?: LogActions;
        readonly actionDetailed?: string;
    }

    const LogSchema: Schema<ILog, Model<ILog, {}, {}, {}>, ILog>;

    class Log implements ILog {
        readonly uuid?: ObjectId;
        readonly userId?: ObjectId;
        readonly action?: LogActions;
        readonly actionDetailed?: string;

        constructor(uuid?: ObjectId, userId?: ObjectId, action?: LogActions, actionDetailed?: string);

        static create(userId: string, action: LogActions, actionDetailed: string): Log;
    }

    interface ILogMongoose {
        getLogs(): Promise<Array<ILog>>;

        getLogsByUserId(userId: string): Promise<Array<ILog>>;

        getLogsByAction(action: LogActions): Promise<Array<ILog>>;

        getLogById(uuid: string): Promise<ILog>;

        addLog(log: Log): Promise<ILog>;
    }
}
