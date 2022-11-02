import { Page }  from "playwright";

module.exports = {
    "create_room": async ({ page, data }: { page: Page, data: any }) => {
        await page.locator(".create").click();
        await page.getByText("Create Room", { exact: true }).click();
        await page.locator("#name").fill(data["name"]);
        if (data["topic"]) {
            await page.locator("#topic").fill(data["topic"]);
        }
        await page.locator(".primary").click();
        await page.waitForSelector(".RoomView");
        await page.getByText(`named the room "${data["name"]}"`).waitFor();
        return "room_created";
    },

    "open_room": async ({ page, data }: { page: Page, data: any }) => {
        await page.locator(".RoomList").getByText(data["name"], { exact: true }).click();
        return "room-opened";
    },

    "accept_invite": async ({ page }: { page: Page, data: any }) => {
        await page.locator(".RoomList").locator("li").first().click();
        await page.getByText("Accept", { exact: true }).click();
        return "accepted";
    }
};
