import { Page }  from "playwright";

module.exports = {
    "send_message": async ({ page, data }: { page: Page, data: any }) => {
        await page.locator(".MessageComposer_input textarea").fill(data["message"]);
        await page.locator(".MessageComposer_input textarea").press("Enter");
        return "message_sent";
    },

    "verify_message_in_timeline": async ({ page, data }: { page: Page, data: any }) => {
        await page.getByText(data["message"], { exact: true }).waitFor();
        return "verified";
    },

    "verify_last_message_is_utd": async ({ page }: { page: Page, data: any }) => {
        await page
            .locator(".Timeline_scroller")
            .locator("ul")
            .locator(".Timeline_message")
            .last()
            .getByText("The sender hasn't sent us the key for this message yet.")
            .waitFor();
        return "verified";
    }
};
