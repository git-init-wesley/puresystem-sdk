"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
const puresystem_sdk_1 = require("./puresystem_sdk/puresystem_sdk");
const user_1 = require("./database/user/user");
const mongodb_1 = require("mongodb");
var PureSystemSdk = puresystem_sdk_1.puresystem_sdk.PureSystemSdk;
var PureSystemUser = user_1.user.PureSystemUser;
require('dotenv').config();
var Colors;
(function (Colors) {
    Colors["RESET"] = "\u001B[0m";
    Colors["BLACK"] = "\u001B[30m";
    Colors["RED"] = "\u001B[31m";
    Colors["GREEN"] = "\u001B[32m";
    Colors["YELLOW"] = "\u001B[33m";
    Colors["BLUE"] = "\u001B[34m";
    Colors["PURPLE"] = "\u001B[35m";
    Colors["CYAN"] = "\u001B[36m";
    Colors["WHITE"] = "\u001B[37m";
})(Colors || (Colors = {}));

function log(color, name, message) {
    console.log(`${color.valueOf()}[${new Date(Date.now())}] ${name} » ${message}`);
}

function timing(color, name, message, func) {
    return __awaiter(this, void 0, void 0, function* () {
        if (func != null)
            log(Colors.CYAN, name, `${message}.`);
        let start = Date.now();
        if (func != null)
            yield func();
        let end = Date.now() - start;
        if (func != null)
            log(color, name, `${message} (+${end} ms)`);
        else
            log(color, name, `${message}`);
    });
}

function testCreateWarn(sdk) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield timing(Colors.PURPLE, 'sdk.addWarn()', 'Creating "Test" warn...', () => __awaiter(this, void 0, void 0, function* () {
                yield sdk.addWarn(new mongodb_1.ObjectId().toString(), 'Test...', PureSystemUser);
            }));
            yield timing(Colors.BLUE, 'sdk.addWarn()', 'Create "Test" warn succefully...');
        } catch (_a) {
            yield timing(Colors.RED, 'sdk.addWarn()', 'Create "Test" warn unsuccefully...');
        }
    });
}

function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let sdk = PureSystemSdk.instance;
        try {
            yield timing(Colors.PURPLE, 'sdk.connect()', 'Connecting to database...', () => __awaiter(this, void 0, void 0, function* () {
                //sdk.connect('');
                yield sdk.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@discord-bot.r3zfx.mongodb.net/PureSystem?retryWrites=true&w=majority`);
            }));
            yield timing(Colors.BLUE, 'sdk.connect()', 'Connect database succefully...');
        } catch (_a) {
            yield timing(Colors.RED, 'sdk.connect()', 'Connect database unsuccefully...');
        }
        // await testCreateWarn(sdk);
        try {
            yield timing(Colors.PURPLE, 'sdk.getWarns()', 'Get all warns.', () => __awaiter(this, void 0, void 0, function* () {
                for (const _warn of (yield sdk.getWarns())) {
                    yield timing(Colors.YELLOW, `sdk.getWarns() -> ${_warn.uuid}`, `\n\nCreated: ${new Date(_warn.created)}\nCreatedModeratorId: ${_warn.createdModeratorId}`);
                }
            }));
            yield timing(Colors.BLUE, 'sdk.getWarns()', 'Get all warn succefully...');
        } catch (_b) {
            yield timing(Colors.RED, 'sdk.getWarns()', 'Get all warns unsuccefully...');
        }
        try {
            yield timing(Colors.PURPLE, 'sdk.getWarnsOnlyAccepted()', 'Get all warns only accepted.', () => __awaiter(this, void 0, void 0, function* () {
                for (const _warn of (yield sdk.getWarnsOnlyAccepted())) {
                    yield timing(Colors.YELLOW, `sdk.getWarnsOnlyAccepted() -> ${_warn.uuid}`, `\n\nCreated: ${new Date(_warn.created)}\nCreatedModeratorId: ${_warn.createdModeratorId}`);
                }
            }));
            yield timing(Colors.BLUE, 'sdk.getWarnsOnlyAccepted()', 'Get all warn only accepted succefully...');
        } catch (_c) {
            yield timing(Colors.RED, 'sdk.getWarnsOnlyAccepted()', 'Get all warns only accepted unsuccefully...');
        }
    });
}

test();
