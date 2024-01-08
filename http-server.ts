import http from "node:http";

const server = http.createServer((req, res) => {
  let body: string = "";

  console.log(req.method);
  console.log(req.headers);

  req.on("data", (chunk: any) => {
    if (typeof chunk === "object" && chunk instanceof Buffer) {
      body += chunk.toString("utf-8");
    }
  });

  req.on("end", () => {
    console.log(`end connection with: ${req.socket.remoteAddress}`);
    console.log(body);

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");

    res.write(JSON.stringify({ msg: "all message received" }));

    res.end();
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
