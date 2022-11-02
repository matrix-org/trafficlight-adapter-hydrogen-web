import { Page }  from "playwright";

module.exports = {
    "idle": async () => {
        await new Promise(r => setTimeout(r, 5000));
    },

    "wait": async ({data}) => {
        const time = data["time"]? parseInt(data["time"], 10): 5000;
        await new Promise(r => setTimeout(r, time));
        return "wait_over";
    },

    "exit": async ({context, browser}) => {
        await context.close();
        await browser.close();
    },

    "reload": async ({page}: {page: Page}) => {
        await page.reload();
        return "reloaded";
    },

    "clear_idb_storage": async ({page}: {page: Page}) => {
        await page.evaluate(async () => {
            const databases = await window.indexedDB.databases();
            const databaseNames: string[] = databases
                .map((db) => db.name)
                .filter((name) => name !== undefined) as string[];
            for (const name of databaseNames) {
                window.indexedDB.deleteDatabase(name);
            }
        });
        return "storage_cleared";
    },
};
