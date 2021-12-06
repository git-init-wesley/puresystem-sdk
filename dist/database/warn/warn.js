"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = void 0;
var warn;
(function (warn_1) {
    class Warn {
        constructor(id, userId, moderatorId, cause, lastUpdated, created) {
            this.id = id;
            this.userId = userId;
            this.moderatorId = moderatorId;
            this.cause = cause;
            this.lastUpdated = lastUpdated;
            this.created = created;
        }
    }
    warn_1.Warn = Warn;
})(warn = exports.warn || (exports.warn = {}));
