# PureSystemSdk

The SDK allowing the global creation of PureSystem.

# npm ([here](https://www.npmjs.com/package/@puresystem/puresystem-sdk))

```json
{
  "dependencies": {
    "@puresystem/puresystem-sdk": "^1.0.0-beta.202112071640"
  }
}
```

# Use?

## Get SDK instance

You can get the SDK as below.

```js
let sdk: PureSystemSdk = PureSystemSdk.instance;
```

## Connect SDK

Only if you have access to PureSystem.

*<u>**Feature**: Automatic connection with public access by default.</u>*

### Without async

```typescript
sdk.connect("url").then(() => {
    //CODE HERE   
});
```

### With async

```typescript
await sdk.connect("url");
//CODE HERE
```

## Use SDK functions?

Below is the list of functions offered by the SDK, as well as the return value.

### Log

```typescript
interface {
    getLogs(): Promise<Array<ILog>>;

    getLogsByUserId(userId: string): Promise<Array<ILog>>;

    getLogsByAction(action: LogActions): Promise<Array<ILog>>;

    getLogById(uuid: string): Promise<ILog>;

    addLog(log: Log): Promise<ILog>;
}
```

### User

```typescript
interface {
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
```

### Warn

```typescript
interface {
    getWarns(): Promise<Array<IWarn>>;

    getWarnsOnlyAccepted(): Promise<Array<IWarn>>

    getWarnById(uuid: string): Promise<IWarn>;

    getWarnByUserId(userId: string): Promise<IWarn>;

    getWarnByModeratorId(moderatorId: string): Promise<IWarn>;

    addWarn(userId: string, cause: string, moderator: IUser): Promise<IWarn>;

    openWarn(warnId: string, moderator: IUser): Promise<IWarn>;

    acceptWarn(warnId: string, moderator: IUser): Promise<IWarn>;

    refuseWarn(warnId: string, moderator: IUser): Promise<IWarn>;

    updateWarn(cause: string, warnId: string, moderator: IUser): Promise<IWarn>;

    closeWarn(warnId: string, moderator: IUser): Promise<IWarn>;
}
```