export module database_exceptions {

    export class DatabaseError extends Error {
        constructor(message?: string) {
            super(message);
            Object.setPrototypeOf(this, DatabaseError.prototype);
        }
    }

    export class DatabaseNoSuchData extends Error {
        constructor(message?: string) {
            super(message);
            Object.setPrototypeOf(this, DatabaseNoSuchData.prototype);
        }
    }

    export class UserPermissionNotEnough extends Error {
        constructor(message?: string) {
            super(message);
            Object.setPrototypeOf(this, UserPermissionNotEnough.prototype);
        }
    }

    export class UserPermissionAlready extends Error {
        constructor(message?: string) {
            super(message);
            Object.setPrototypeOf(this, UserPermissionAlready.prototype);
        }
    }
}