import { Page }  from "playwright";

module.exports = {
    "login": async ({ page, data }: {page: Page, data: any}) => { 
        await page.locator("#homeserver").fill("")
        await page.locator("#homeserver").type(data["homeserver_url"]["local"]);
        await (await page.waitForSelector("#username")).fill(data["username"]);
        await (await page.waitForSelector("#password")).fill(data["password"]);
        await page.getByText("Log In").click();
        await page.waitForSelector(".SessionView");
        return "loggedin";
    },
    "logout": async ({ page, data }: {page: Page, data: any}) => { 
        await page.locator(".settings").click();
        await page.getByText("Log out").click();
        await page.getByText("Log out", {exact: true}).click();
        return "logged_out";
    },
}
