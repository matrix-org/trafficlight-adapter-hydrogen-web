# Hydrogen Web Adapter
[Trafficlight](https://github.com/matrix-org/trafficlight) adapter for [hydrogen web](https://github.com/vector-im/hydrogen-web)!

## Running
---
```bash
yarn install
yarn test:trafficlight
```

## Adding new actions
---
This adapter will pickup any actions defined in `.ts` files from `src/actions`.

To define a new set of actions (eg: relating to settings):
1. Create a new file in `src/actions` (say settings.ts, any name is fine).
2. Export an object as follows:
    ```ts
    import { Page }  from "playwright";
    import { Browser } from "playwright";
    import { BrowserContext } from "playwright";

    type Args = {
        page: Page;
        data: any;
        browser: Browser;
        context: BrowserContext;
    };

    module.exports = {
        "my-action-1": async ({context, browser, data, page}: Args) => {
            // Logic for your actions
            // await page.selector("#matrix-foo).click();
        },
        "my-action-2": async ({context, browser, data, page}: Args) => {
            // Logic for your actions
            // await page.selector("#matrix-foo).click();
        },
    };
    ```
3. Run the adapter, and look at the output to see if your actions were picked up:
    ```
    The following actions were found:
    login, logout, enable_dehydrated_device, idle, wait, exit, reload, clear_idb_storage, create_room, open_room, accept_invite, send_message, verify_message_in_timeline, verify_last_message_is_utd
    ```
