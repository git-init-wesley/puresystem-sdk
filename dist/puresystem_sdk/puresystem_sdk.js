"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puresystem_sdk = void 0;
const mongoose_1 = require("../database/mongoose");
var puresystem_sdk;
(function (puresystem_sdk) {
    var _a;
    var Mongoose = mongoose_1.mongoose.Mongoose;
    class PureSystemSdk extends Mongoose {
        constructor() {
            super();
        }
    }
    PureSystemSdk.instance = (_a = PureSystemSdk._instance) !== null && _a !== void 0 ? _a : (PureSystemSdk._instance = new PureSystemSdk());
    puresystem_sdk.PureSystemSdk = PureSystemSdk;
})(puresystem_sdk = exports.puresystem_sdk || (exports.puresystem_sdk = {}));
