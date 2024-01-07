import net from "node:net";
import { HOST, PORT, UPLOAD_PROTOCOL_RESPONSE_HEADER, UPLOAD_PROTOCOL_REQUEST_HEADER, } from "./config.js";
import fspromise from "node:fs/promises";
const FILENAME = "payload.txt";
const client = net.createConnection({
    port: PORT,
    host: HOST,
});
client.on("connect", () => {
    console.log("we are connected");
    client.write(UPLOAD_PROTOCOL_REQUEST_HEADER);
});
client.on("data", async (chunk) => {
    let isAllowedCommunication = false;
    if (!isAllowedCommunication) {
        if (chunk.toString("utf-8") === UPLOAD_PROTOCOL_RESPONSE_HEADER) {
            // isAllowedCommunication remain true
            isAllowedCommunication = true;
        }
        else {
            isAllowedCommunication = false;
        }
    }
    if (isAllowedCommunication) {
        const fileHandle = await fspromise.open(FILENAME, "r");
        const fileReadableStream = fileHandle.createReadStream();
        fileReadableStream.on("data", (chunck) => {
            client.write(chunck);
        });
    }
});
