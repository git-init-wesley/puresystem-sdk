"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
__exportStar(require("./warn/warn"), exports);
__exportStar(require("./mongoose_d"), exports);
const mongodb_1 = require("mongodb");
var mongoose;
(function (mongoose) {
    class Mongoose {
        constructor() {
            this.mongoClient = this._mongoClient;
            this.canRead = this._canRead;
            this.canWrite = this._canWrite;
        }
        connect(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                this._mongoClient = new mongodb_1.MongoClient(url, options);
                yield this._mongoClient.connect();
                this._canRead = this._mongoClient.readConcern;
                this._canWrite = this._mongoClient.writeConcern;
                console.log(this._canRead);
                console.log(this._canWrite);
                return this._mongoClient;
            });
        }
        getWarnById(id) {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
        getWarnByModeratorId(moderatorId) {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
        getWarnByUserId(userId) {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
        getWarns() {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
        addWarn(warn) {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
        updateWarn(warn) {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
        deleteWarn(warn) {
            //TODO: Unimplemented
            throw new DOMException('Unimplemented exception.');
        }
    }
    mongoose.Mongoose = Mongoose;
})(mongoose = exports.mongoose || (exports.mongoose = {}));
