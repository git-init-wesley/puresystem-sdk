import {database} from "../database/database";

export declare module puresystem_sdk {
    import Database = database.Database;

    class PureSystemSdk extends Database {
        static readonly instance: PureSystemSdk;
        private static _instance?;

        constructor();
    }
}
