import { Page }  from "playwright";

module.exports = {
    "login": async ({ page, data }: { page: Page, data: any }) => {
        if (page.getByText("Sign In").isVisible()) {
            await page.getByText("Sign In").click();
        }
        await page.locator("#homeserver").fill("");
        await page.locator("#homeserver").type(data["homeserver_url"]["local"]);
        await (await page.waitForSelector("#username")).fill(data["username"]);
        await (await page.waitForSelector("#password")).fill(data["password"]);
        await page.getByText("Log In").click();
        await page.waitForSelector(".SessionView");
        return "loggedin";
    },
    "logout": async ({ page }: { page: Page, data: any }) => {
        await page.locator(".settings").click();
        await page.getByText("Log out").click();
        await page.getByText("Log out", { exact: true }).click();
        return "logged_out";
    },
    "enable_dehydrated_device": async ({ page, data }: { page: Page, data: any }) => {
        await page.locator(".settings").click();
        await page.getByText("use a security phrase").click();
        const password = data["key_backup_passphrase"];
        await page.getByPlaceholder("Security phrase").fill(password);
        await page.locator("#enable-dehydrated-device").check();
        await page.getByText("Set up", { exact: true }).click();
        return "enabled_dehydrated_device";
    }
};
