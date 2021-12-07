import {mongoose} from "../database/mongoose";

export module puresystem_sdk {
    import Mongoose = mongoose.Mongoose;

    export class PureSystemSdk extends Mongoose {
        private static _instance?: PureSystemSdk;
        public static readonly instance: PureSystemSdk = PureSystemSdk._instance ??= new PureSystemSdk();

        constructor() {
            super();
        }
    }
}