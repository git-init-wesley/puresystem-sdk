import {puresystem_sdk} from "./puresystem_sdk/puresystem_sdk";
import {user} from "./database/user/user";
import {ObjectId} from "mongodb";
import PureSystemSdk = puresystem_sdk.PureSystemSdk;
import PureSystemUser = user.PureSystemUser;

require('dotenv').config();

enum Colors {
    RESET = ("\u001b[0m"),
    BLACK = ("\u001b[30m"),
    RED = ("\u001b[31m"),
    GREEN = ("\u001b[32m"),
    YELLOW = ("\u001b[33m"),
    BLUE = ("\u001b[34m"),
    PURPLE = ("\u001b[35m"),
    CYAN = ("\u001b[36m"),
    WHITE = ("\u001b[37m")
}

function log(color: Colors, name: string, message: string) {
    console.log(`${color.valueOf()}[${new Date(Date.now())}] ${name} » ${message}`);
}

async function timing(color: Colors, name: string, message: string, func?: () => any) {
    if (func != null) log(Colors.CYAN, name, `${message}.`);
    let start = Date.now();
    if (func != null) await func();
    let end = Date.now() - start;
    if (func != null) log(color, name, `${message} (+${end} ms)`);
    else log(color, name, `${message}`);
}

async function testCreateWarn(sdk: PureSystemSdk) {
    try {
        await timing(Colors.PURPLE, 'sdk.addWarn()', 'Creating "Test" warn...', async () => {
            await sdk.addWarn(new ObjectId().toString(), 'Test...', PureSystemUser);
        });
        await timing(Colors.BLUE, 'sdk.addWarn()', 'Create "Test" warn succefully...');
    } catch {
        await timing(Colors.RED, 'sdk.addWarn()', 'Create "Test" warn unsuccefully...');
    }
}

async function test() {
    let sdk: PureSystemSdk = PureSystemSdk.instance;
    try {
        await timing(Colors.PURPLE, 'sdk.connect()', 'Connecting to database...', async () => {
            //sdk.connect('');
            await sdk.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@discord-bot.r3zfx.mongodb.net/PureSystem?retryWrites=true&w=majority`);
        });
        await timing(Colors.BLUE, 'sdk.connect()', 'Connect database succefully...');
    } catch {
        await timing(Colors.RED, 'sdk.connect()', 'Connect database unsuccefully...');
    }

    // await testCreateWarn(sdk);

    try {
        await timing(Colors.PURPLE, 'sdk.getWarns()', 'Get all warns.', async () => {
            for (const _warn of (await sdk.getWarns())) {
                await timing(Colors.YELLOW, `sdk.getWarns() -> ${_warn.uuid}`,
                    `\n\nCreated: ${new Date(_warn.created!)}\nCreatedModeratorId: ${_warn.createdModeratorId}`
                );
            }
        });
        await timing(Colors.BLUE, 'sdk.getWarns()', 'Get all warn succefully...');
    } catch {
        await timing(Colors.RED, 'sdk.getWarns()', 'Get all warns unsuccefully...');
    }


    try {
        await timing(Colors.PURPLE, 'sdk.getWarnsOnlyAccepted()', 'Get all warns only accepted.', async () => {
            for (const _warn of (await sdk.getWarnsOnlyAccepted())) {
                await timing(Colors.YELLOW, `sdk.getWarnsOnlyAccepted() -> ${_warn.uuid}`,
                    `\n\nCreated: ${new Date(_warn.created!)}\nCreatedModeratorId: ${_warn.createdModeratorId}`
                );
            }
        });
        await timing(Colors.BLUE, 'sdk.getWarnsOnlyAccepted()', 'Get all warn only accepted succefully...');
    } catch {
        await timing(Colors.RED, 'sdk.getWarnsOnlyAccepted()', 'Get all warns only accepted unsuccefully...');
    }
}

test();