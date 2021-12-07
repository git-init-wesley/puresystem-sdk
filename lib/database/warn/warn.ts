import {ObjectId} from "mongodb";
import {Model, Schema} from "mongoose";
import {user} from "../user/user";
import {log} from "../log/log";

export module warn {

    import IUser = user.IUser;
    import Log = log.Log;

    export enum WarnState {
        PENDING,
        REFUSED,
        ACCEPTED,
    }

    export interface IWarn {
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


    export const WarnSchema = new Schema<IWarn, Model<IWarn>, IWarn>({
        uuid: {type: ObjectId, required: true, unique: true, index: true},
        userId: {type: ObjectId, required: true, unique: true, index: true},
        cause: {type: String, required: true},
        closed: {type: Boolean, required: true},
        closedModeratorId: {type: ObjectId},
        state: {type: Number, enum: WarnState, required: true},
        logs: [{type: ObjectId, required: true}],
        lastUpdated: {type: Number, required: true},
        lastUpdatedModeratorId: {type: ObjectId, required: true},
        createdModeratorId: {type: ObjectId, required: true},
        created: {type: Number, required: true}
    });


    export class Warn implements IWarn {
        public readonly uuid?: ObjectId;
        public readonly userId?: ObjectId;
        public cause?: string;
        public closed?: boolean;
        public closedModeratorId?: ObjectId;
        public state?: WarnState;
        public logs?: Array<ObjectId>
        public lastUpdated?: number;
        public lastUpdatedModeratorId?: ObjectId;
        public readonly createdModeratorId?: ObjectId;
        public readonly created?: number;

        constructor(uuid?: ObjectId,
                    userId?: ObjectId,
                    cause?: string,
                    closed?: boolean,
                    closedModeratorId?: ObjectId,
                    state?: WarnState,
                    logs?: Array<ObjectId>,
                    lastUpdated?: number,
                    lastUpdatedModeratorId?: ObjectId,
                    createdModeratorId?: ObjectId,
                    created?: number) {
            this.uuid = uuid ?? new ObjectId();
            this.userId = userId;
            this.cause = cause;
            this.closed = closed;
            this.closedModeratorId = closedModeratorId;
            this.state = state;
            this.logs = logs;
            this.lastUpdated = lastUpdated;
            this.lastUpdatedModeratorId = lastUpdatedModeratorId;
            this.createdModeratorId = createdModeratorId;
            this.created = created;
        }

        public static create(log: Log, userId: string, cause: string, moderatorId: ObjectId): Warn {
            let _tempDate: number = Date.now();
            return new Warn(
                undefined,
                ObjectId.createFromHexString(userId),
                cause,
                false,
                undefined,
                WarnState.PENDING,
                [log.uuid!],
                _tempDate,
                moderatorId,
                moderatorId,
                _tempDate
            );
        }

    }

    export interface IWarnMongoose {
        getWarns(): Promise<Array<IWarn>>;

        getWarnsOnlyAccepted(): Promise<Array<IWarn>>

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