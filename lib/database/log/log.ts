import {ObjectId} from "mongodb";
import {Model, Schema} from "mongoose";

export module log {

    export enum LogActions {
        WARN_ADD,
        WARN_CLOSE,
        WARN_OPEN,
        WARN_UPDATE,
        WARN_STATE,
        PERMISSION_ADD_USER,
        PERMISSION_REMOVE_USER,
        WHITELIST_ADD_GUILD,
        WHITELIST_REMOVE_GUILD,
        USER_UPDATE_DISCORD_ID,
        USER_UPDATE_MINECRAFT_UUID,
        USER_CREATE,
    }

    export interface ILog {
        readonly uuid?: ObjectId;
        readonly userId?: ObjectId;
        readonly action?: LogActions;
        readonly actionDetailed?: string;
    }

    export const LogSchema = new Schema<ILog, Model<ILog>, ILog>({
        uuid: {type: ObjectId, required: true, unique: true, index: true},
        userId: {type: ObjectId, required: true, index: true},
        action: {type: Number, enum: LogActions, required: true, index: true},
        actionDetailed: {type: String, required: true}
    });

    export class Log implements ILog {
        public readonly uuid?: ObjectId;
        public readonly userId?: ObjectId;
        public readonly action?: LogActions;
        public readonly actionDetailed?: string;

        constructor(uuid?: ObjectId, userId?: ObjectId, action?: LogActions, actionDetailed?: string) {
            this.uuid = uuid ?? new ObjectId();
            this.userId = userId;
            this.action = action;
            this.actionDetailed = actionDetailed;
        }

        public static create(userId: string, action: LogActions, actionDetailed: string): Log {
            return new Log(undefined, ObjectId.createFromHexString(userId), action, actionDetailed);
        }
    }

    export interface ILogMongoose {
        getLogs(): Promise<Array<ILog>>;

        getLogsByUserId(userId: string): Promise<Array<ILog>>;

        getLogsByAction(action: LogActions): Promise<Array<ILog>>;

        getLogById(uuid: string): Promise<ILog>;

        addLog(log: Log): Promise<ILog>;
    }
}