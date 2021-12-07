"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.warn = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
var warn;
(function (warn) {
    let WarnState;
    (function (WarnState) {
        WarnState[WarnState["PENDING"] = 0] = "PENDING";
        WarnState[WarnState["REFUSED"] = 1] = "REFUSED";
        WarnState[WarnState["ACCEPTED"] = 2] = "ACCEPTED";
    })(WarnState = warn.WarnState || (warn.WarnState = {}));
    warn.WarnSchema = new mongoose_1.Schema({
        uuid: {type: mongodb_1.ObjectId, required: true, unique: true, index: true},
        userId: {type: mongodb_1.ObjectId, required: true, unique: true, index: true},
        cause: {type: String, required: true},
        closed: {type: Boolean, required: true},
        closedModeratorId: {type: mongodb_1.ObjectId},
        state: {type: Number, enum: WarnState, required: true},
        logs: [{type: mongodb_1.ObjectId, required: true}],
        lastUpdated: {type: Number, required: true},
        lastUpdatedModeratorId: {type: mongodb_1.ObjectId, required: true},
        createdModeratorId: {type: mongodb_1.ObjectId, required: true},
        created: {type: Number, required: true}
    });

    class Warn {
        constructor(uuid, userId, cause, closed, closedModeratorId, state, logs, lastUpdated, lastUpdatedModeratorId, createdModeratorId, created) {
            this.uuid = uuid !== null && uuid !== void 0 ? uuid : new mongodb_1.ObjectId();
            this.userId = userId;
            this.cause = cause;
            this.closed = closed;
            this.closedModeratorId = closedModeratorId;
            this.state = state;
            this.logs = logs;
            this.lastUpdated = lastUpdated;
            this.lastUpdatedModeratorId = lastUpdatedModeratorId;
            this.createdModeratorId = createdModeratorId;
            this.created = created;
        }

        static create(log, userId, cause, moderatorId) {
            let _tempDate = Date.now();
            return new Warn(undefined, mongodb_1.ObjectId.createFromHexString(userId), cause, false, undefined, WarnState.PENDING, [log.uuid], _tempDate, moderatorId, moderatorId, _tempDate);
        }
    }

    warn.Warn = Warn;
})(warn = exports.warn || (exports.warn = {}));
