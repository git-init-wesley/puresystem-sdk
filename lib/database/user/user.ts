import {ObjectId} from "mongodb";
import {Model, Schema} from "mongoose";

export module user {

    export enum UserPermissions {
        WARN_ADD,
        WARN_CLOSE,
        WARN_OPEN,
        WARN_UPDATE,
        WARN_STATE,
        PERMISSION_ADD_USER,
        PERMISSION_REMOVE_USER,
        WHITELIST_ADD_GUILD,
        WHITELIST_REMOVE_GUILD
    }

    export interface IDiscordUser {
        readonly discordId?: string;
        //TODO: Actually name, and History names.
    }

    export interface IMinecraftUser {
        readonly minecraftUUID?: string;
    }

    export interface IUser extends IDiscordUser, IMinecraftUser {
        readonly uuid?: ObjectId;
        discordId?: string;
        minecraftUUID?: string;
        permissions?: Array<UserPermissions>;
    }

    export const UserSchema = new Schema<IUser, Model<IUser>, IUser>({
        uuid: {type: ObjectId, required: true, unique: true, index: true},
        discordId: {type: String},
        minecraftUUID: {type: String},
        permissions: {type: Number, enum: UserPermissions, default: []}
    });

    export class User implements IUser {
        public readonly uuid?: ObjectId;
        public discordId?: string;
        public minecraftUUID?: string;
        public permissions?: Array<UserPermissions>;

        constructor(uuid?: ObjectId, discordId?: string, minecraftUUID?: string, permissions?: Array<UserPermissions>) {
            this.uuid = uuid ?? new ObjectId();
            this.discordId = discordId;
            this.minecraftUUID = minecraftUUID;
            this.permissions = permissions;
        }

        public static create(discordId?: string, minecraftUUID?: string): User {
            return new User(undefined, discordId, minecraftUUID, []);
        }
    }

    export interface IUserMongoose {
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

    export const PureSystemUser: User = new User(ObjectId.createFromHexString("61ae9b9860dfe5dabf223225"), undefined, undefined, [
        UserPermissions.WARN_ADD,
        UserPermissions.WARN_CLOSE,
        UserPermissions.WARN_OPEN,
        UserPermissions.WARN_UPDATE,
        UserPermissions.WARN_STATE,
        UserPermissions.PERMISSION_ADD_USER,
        UserPermissions.PERMISSION_REMOVE_USER,
        UserPermissions.WHITELIST_ADD_GUILD,
        UserPermissions.WHITELIST_REMOVE_GUILD
    ]);


}