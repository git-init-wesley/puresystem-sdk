import {ObjectId} from "mongodb";

export module warn {
    export class Warn {
        public readonly id?: ObjectId;
        public readonly userId?: string;
        public moderatorId?: string;
        public cause?: string;
        public lastUpdated?: bigint;
        public readonly created?: bigint;

        constructor(id: ObjectId, userId: string, moderatorId: string, cause: string, lastUpdated: bigint, created: bigint) {
            this.id = id;
            this.userId = userId;
            this.moderatorId = moderatorId;
            this.cause = cause;
            this.lastUpdated = lastUpdated;
            this.created = created;
        }
    }

    export interface IWarnMongoose {
        getWarns(): [Warn] | undefined | null;

        getWarnById(id: ObjectId): Warn | undefined | null;

        getWarnByUserId(userId: string): Warn | undefined | null;

        getWarnByModeratorId(moderatorId: string): Warn | undefined | null;

        addWarn(warn: Warn): boolean;

        updateWarn(warn: Warn): boolean;

        deleteWarn(warn: Warn): boolean;
    }
}