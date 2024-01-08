import http from "node:http";

const agent: http.Agent = new http.Agent({
  keepAlive: true,
});
const request = new http.ClientRequest({
  agent: agent,
  host: "localhost",
  method: "POST",
  port: 8099,
  headers: {
    "content-type": "application/json",
  },
});

request.on("response", (res: http.IncomingMessage) => {
  let content = "";
  res.on("data", (chunk: any) => {
    content += chunk;
  });

  res.on("end", () => {
    console.log(`end of connection/response`);
    console.log(`${content}`);
  });

  res.on("error", (e: Error) => {
    console.error(e);
  });
});

request.write(JSON.stringify({ msg: "hello from http client" }));
request.end();
