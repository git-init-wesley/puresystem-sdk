import {ObjectId} from "mongodb";
import {Model, Schema} from "mongoose";

export declare module user {
    enum UserPermissions {
        WARN_ADD = 0,
        WARN_CLOSE = 1,
        WARN_OPEN = 2,
        WARN_UPDATE = 3,
        WARN_STATE = 4,
        PERMISSION_ADD_USER = 5,
        PERMISSION_REMOVE_USER = 6,
        WHITELIST_ADD_GUILD = 7,
        WHITELIST_REMOVE_GUILD = 8
    }

    interface IDiscordUser {
        readonly discordId?: string;
    }

    interface IMinecraftUser {
        readonly minecraftUUID?: string;
    }

    interface IUser extends IDiscordUser, IMinecraftUser {
        readonly uuid?: ObjectId;
        discordId?: string;
        minecraftUUID?: string;
        permissions?: Array<UserPermissions>;
    }

    const UserSchema: Schema<IUser, Model<IUser, {}, {}, {}>, IUser>;

    class User implements IUser {
        readonly uuid?: ObjectId;
        discordId?: string;
        minecraftUUID?: string;
        permissions?: Array<UserPermissions>;

        constructor(uuid?: ObjectId, discordId?: string, minecraftUUID?: string, permissions?: Array<UserPermissions>);

        static create(discordId?: string, minecraftUUID?: string): User;
    }

    interface IUserMongoose {
        getUsers(): Promise<Array<IUser>>;

        getUserById(uuid: string): Promise<IUser>;

        getUserByDiscordId(discordId: string): Promise<IUser>;

        getUserByMinecraftUUID(minecraftUUID: string): Promise<IUser>;

        addUserPermission(permission: UserPermissions, userId: string, moderator: IUser): Promise<IUser>;

        removeUserPermission(permission: UserPermissions, userId: string, moderator: IUser): Promise<IUser>;

        updateUserDiscordId(discordId: string, userId: string, moderator: IUser): Promise<IUser>;

        updateUserMinecraftUUID(minecraftUUID: string, userId: string, moderator: IUser): Promise<IUser>;

        createUser(discordId: string, moderator: IUser): Promise<IUser>;
    }

    const PureSystemUser: User;
}
