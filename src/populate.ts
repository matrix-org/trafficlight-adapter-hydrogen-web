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

import type { HydrogenTrafficlightClient } from "./trafficlight";
import glob from "glob";
import path from "path";

export async function addActionsToClient(client: HydrogenTrafficlightClient, playwrightObjects) {
    console.log("dirname", __dirname);

    console.log("glob matches", glob.sync('./src/actions/**/*.js'));
    const rootPath = path.resolve(__dirname, "./actions");
    glob.sync(`${rootPath}/**/*.js`).forEach(async function( file ) {
        console.log(`Loading actions from file at ${file}`);
        const actions: Record<string, any> = require(path.resolve(file));
        for (const [action, func] of Object.entries(actions)) {
            client.on(action, async (data, _client) => { return await func({ ...playwrightObjects, data, client:_client }) });
        }
    });

}
