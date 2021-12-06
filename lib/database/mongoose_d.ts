import {warn} from "./warn/warn";
import {MongoClient, MongoClientOptions, ReadConcern, WriteConcern} from "mongodb";

export module imongoose {
    import IWarnMongoose = warn.IWarnMongoose;

    export interface IMongoose extends IWarnMongoose {
        readonly mongoClient?: MongoClient;

        readonly canRead?: ReadConcern;

        readonly canWrite?: WriteConcern;

        connect(url: string, options?: MongoClientOptions): Promise<MongoClient>;
    }
}