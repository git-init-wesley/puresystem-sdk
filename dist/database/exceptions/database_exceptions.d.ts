export declare module database_exceptions {
    class DatabaseError extends Error {
        constructor(message?: string);
    }

    class DatabaseNoSuchData extends Error {
        constructor(message?: string);
    }

    class UserPermissionNotEnough extends Error {
        constructor(message?: string);
    }

    class UserPermissionAlready extends Error {
        constructor(message?: string);
    }
}
