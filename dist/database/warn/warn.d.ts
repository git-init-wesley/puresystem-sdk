import {ObjectId} from "mongodb";
import {Model, Schema} from "mongoose";
import {user} from "../user/user";
import {log} from "../log/log";

export declare module warn {
    import IUser = user.IUser;
    import Log = log.Log;

    enum WarnState {
        PENDING = 0,
        REFUSED = 1,
        ACCEPTED = 2
    }

    interface IWarn {
        readonly uuid?: ObjectId;
        readonly userId?: ObjectId;
        cause?: string;
        closed?: boolean;
        closedModeratorId?: ObjectId;
        state?: WarnState;
        logs?: Array<ObjectId>;
        lastUpdated?: number;
        lastUpdatedModeratorId?: ObjectId;
        readonly createdModeratorId?: ObjectId;
        readonly created?: number;
    }

    const WarnSchema: Schema<IWarn, Model<IWarn, {}, {}, {}>, IWarn>;

    class Warn implements IWarn {
        readonly uuid?: ObjectId;
        readonly userId?: ObjectId;
        cause?: string;
        closed?: boolean;
        closedModeratorId?: ObjectId;
        state?: WarnState;
        logs?: Array<ObjectId>;
        lastUpdated?: number;
        lastUpdatedModeratorId?: ObjectId;
        readonly createdModeratorId?: ObjectId;
        readonly created?: number;

        constructor(uuid?: ObjectId, userId?: ObjectId, cause?: string, closed?: boolean, closedModeratorId?: ObjectId, state?: WarnState, logs?: Array<ObjectId>, lastUpdated?: number, lastUpdatedModeratorId?: ObjectId, createdModeratorId?: ObjectId, created?: number);

        static create(log: Log, userId: string, cause: string, moderatorId: ObjectId): Warn;
    }

    interface IWarnMongoose {
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
    }
}
