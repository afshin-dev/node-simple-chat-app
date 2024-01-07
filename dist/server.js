import net from "node:net";
import { PORT, HOST, UPLOAD_PROTOCOL_REQUEST_HEADER, UPLOAD_PROTOCOL_RESPONSE_HEADER, } from "./config.js";
import fspromise from "node:fs/promises";
const server = net.createServer();
class Conn {
    /**
     *
     */
    constructor(socket) {
        this.isAllowedCommunication = false;
        this.fileHandle = null;
        this.fileWritableStream = null;
        this.s = null;
        this.handleDataEvent = async (chunk) => {
            if (!this.isAllowedCommunication) {
                if (chunk.toString("utf-8") == UPLOAD_PROTOCOL_REQUEST_HEADER) {
                    this.s && this.s.write(UPLOAD_PROTOCOL_RESPONSE_HEADER);
                    this.isAllowedCommunication = true;
                    // this file stuff initialization and organization should not be here
                    this.fileHandle = await fspromise.open(`server-storage/${Math.random().toString()}.txt`, "w");
                    this.fileWritableStream = this.fileHandle.createWriteStream();
                    return;
                }
            }
            if (this.isAllowedCommunication) {
                try {
                    this.fileWritableStream?.write(chunk);
                }
                catch (e) {
                    console.error(e);
                    await this.fileHandle?.close();
                }
            }
        };
        this.handleEndEvent = async (e) => {
            await this.fileHandle?.close();
        };
        this.handleConnectEvent = async () => {
            console.log(`socket `, this.s && this.s.address(), `connected`);
        };
        this.handleErrorEvent = async (e) => {
            await this.fileHandle?.close();
            console.log(e);
        };
        this.s = socket;
        this.s.on("data", this.handleDataEvent);
        this.s.on("connect", this.handleConnectEvent);
        this.s.on("error", this.handleErrorEvent);
        this.s.on("end", this.handleEndEvent);
    }
}
server.on("connection", async (s) => {
    new Conn(s);
});
//   server.on("connection", async (s: net.Socket) => {
//   let isAllowedCommunication: boolean = false;
//   let fileHandle: fspromise.FileHandle = await fspromise.open(
//     `server-storage/${Math.random().toString()}.txt`,
//     "w"
//   );
//   const fileWritableStream = fileHandle.createWriteStream();
//   s.on("data", async (chunk: Buffer | string) => {
//     if (!isAllowedCommunication) {
//       if (chunk.toString("utf-8") == UPLOAD_PROTOCOL_REQUEST_HEADER) {
//         s.write(UPLOAD_PROTOCOL_RESPONSE_HEADER);
//         isAllowedCommunication = true;
//         return;
//       }
//     }
//     if (isAllowedCommunication) {
//       try {
//         fileWritableStream.write(chunk);
//       } catch (e) {
//         console.error(e);
//         await fileHandle?.close();
//       }
//     }
//   });
//   s.on("end", async (e: Error) => {
//     await fileHandle?.close();
//   });
//   s.on("connect", () => {
//     console.log(`socket `, s.address(), `connected`);
//   });
//   s.on("error", (e: Error) => {
//     console.log(e);
//   });
// });
server.on("error", (e) => {
    // somethings bad happen for whole application you should check
    //     and close the server like
    //     server.close()
    // if (very bad accident) {
    //     close the server
    // }
    console.error(e);
});
server.on("close", () => {
    console.log("Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended.");
});
server.on("listening", () => {
    console.log(`server listen on: ${HOST}:${PORT}`);
});
server.on("drop", (data) => {
    console.log("[server] Dropped: ", data);
});
server.listen(PORT, HOST);
