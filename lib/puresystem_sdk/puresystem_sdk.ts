import {database} from "../database/database";

export module puresystem_sdk {

    import Database = database.Database;

    export class PureSystemSdk extends Database {
        private static _instance?: PureSystemSdk;
        public static readonly instance: PureSystemSdk = PureSystemSdk._instance ??= new PureSystemSdk();

        constructor() {
            super();
        }
    }
}