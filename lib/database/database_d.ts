import {warn} from "./warn/warn";
import {log} from "./log/log";
import {MongoClient, MongoClientOptions} from "mongodb";
import {user} from "./user/user";

export module idatabase {
    import IWarnMongoose = warn.IWarnMongoose;
    import ILogMongoose = log.ILogMongoose;
    import IUserMongoose = user.IUserMongoose;

    export interface IDatabase extends ILogMongoose, IWarnMongoose, IUserMongoose {
        connect(url: string, options?: MongoClientOptions): Promise<MongoClient>;
    }
}