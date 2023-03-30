/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import playwright from "playwright";
import { HydrogenTrafficlightClient } from "./trafficlight";
import trafficlightConfig from "../trafficlight.config.json";
import { addActionsToClient } from "./populate";

async function start() {
    console.log("Starting Hydrogen-web trafficlight adapter");
    const playwrightObjects = await getPlaywrightPage();
    const { page } = playwrightObjects;

    const trafficlightUrl = process.env.TRAFFICLIGHT_URL || "http://127.0.0.1:5000";
    const client = new HydrogenTrafficlightClient(trafficlightUrl);
    await addActionsToClient(client, playwrightObjects);
    console.log("\nThe following actions were found:\n", client.availableActions.join(", "));
    await client.register();
    try {
        client.start();
        const hydrogenURL = process.env["BASE_APP_URL"] ?? trafficlightConfig["hydrogen-instance-url"];
        // There's a disconnect that happens after you register, not sure how to properly fix this (?)
        // so block for 3 seconds as a temp fix
        await new Promise(r => setTimeout(r, 3000));
        await page.goto(hydrogenURL);
    }
    catch (e) {
        console.error(e);
    }
}

async function getPlaywrightPage() {
    const browser = await playwright.chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    return {browser, context, page};
}

start();
