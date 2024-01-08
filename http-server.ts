import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.headers);

  req.on("data", (chunk: any) => {
    console.log(chunk);
  });
  req.on("end", () => {
    console.log(`end connection with: ${req.socket.remoteAddress}`);
    res.statusCode = 200;
    res.end("received all data");
  });

  req.on("error", (e: Error) => {
    console.error(e);
  });
  req.on("close", () => {
    console.log(`closed connection on: ${req.socket.remoteAddress}`);
  });
});

server.on("error", (e: Error) => {
  console.error(e);
});
server.listen(8099, "localhost", () => {
  console.log("server connect on http://localhost:8099");
});
