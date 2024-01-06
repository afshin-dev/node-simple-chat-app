import net from "node:net";
import { PORT, HOST } from "./config.js";
const server = net.createServer((s) => { });
server.on("connection", () => { });
server.listen(PORT, HOST, () => {
    console.log(`server listen on: ${HOST}:${PORT}`);
});
