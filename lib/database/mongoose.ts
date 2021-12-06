export * from "./warn/warn";
export * from "./mongoose_d";

import {MongoClient, MongoClientOptions, ObjectId, ReadConcern, WriteConcern} from "mongodb";
import {imongoose} from "./mongoose_d";
import {warn} from "./warn/warn";

export module mongoose {
    import IMongoose = imongoose.IMongoose;
    import Warn = warn.Warn;

    export class Mongoose implements IMongoose {
        private _mongoClient?: MongoClient;
        public readonly mongoClient?: MongoClient = this._mongoClient;

        private _canRead?: ReadConcern;
        public readonly canRead?: ReadConcern = this._canRead;

        private _canWrite?: WriteConcern;
        public readonly canWrite?: WriteConcern = this._canWrite;

        public async connect(url: string, options?: MongoClientOptions): Promise<MongoClient> {
            this._mongoClient = new MongoClient(url, options);
            await this._mongoClient.connect();
            this._canRead = this._mongoClient.readConcern;
            this._canWrite = this._mongoClient.writeConcern;
            console.log(this._canRead);
            console.log(this._canWrite);
            return this._mongoClient;
        }

        public getWarnById(id: ObjectId): Warn | undefined | null {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

        public getWarnByModeratorId(moderatorId: string): Warn | undefined | null {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

        public getWarnByUserId(userId: string): Warn | undefined | null {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

        public getWarns(): [Warn] | undefined | null {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

        public addWarn(warn: warn.Warn): boolean {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

        public updateWarn(warn: Warn): boolean {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

        public deleteWarn(warn: Warn): boolean {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }

    }
}