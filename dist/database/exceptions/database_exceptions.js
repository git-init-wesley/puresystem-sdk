"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.database_exceptions = void 0;
var database_exceptions;
(function (database_exceptions) {
    class DatabaseError extends Error {
        constructor(message) {
            super(message);
            Object.setPrototypeOf(this, DatabaseError.prototype);
        }
    }

    database_exceptions.DatabaseError = DatabaseError;

    class DatabaseNoSuchData extends Error {
        constructor(message) {
            super(message);
            Object.setPrototypeOf(this, DatabaseNoSuchData.prototype);
        }
    }

    database_exceptions.DatabaseNoSuchData = DatabaseNoSuchData;

    class UserPermissionNotEnough extends Error {
        constructor(message) {
            super(message);
            Object.setPrototypeOf(this, UserPermissionNotEnough.prototype);
        }
    }

    database_exceptions.UserPermissionNotEnough = UserPermissionNotEnough;

    class UserPermissionAlready extends Error {
        constructor(message) {
            super(message);
            Object.setPrototypeOf(this, UserPermissionAlready.prototype);
        }
    }

    database_exceptions.UserPermissionAlready = UserPermissionAlready;
})(database_exceptions = exports.database_exceptions || (exports.database_exceptions = {}));
