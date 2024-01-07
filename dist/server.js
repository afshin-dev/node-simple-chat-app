import net from "node:net";
import { PORT, HOST } from "./config.js";
import { Conn } from "./Conn.js";
const server = net.createServer();
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
