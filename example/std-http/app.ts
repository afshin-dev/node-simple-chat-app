import http from "node:http";

const IP = "192.168.1.3";
const PORT = 4090;

const server = http.createServer((req, res) => {
  const response = {
    data: "accepted",
  };

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  res.end(JSON.stringify(response));
});

server.listen(PORT, IP, () => {
  console.log(`server conected at http://${IP}:${PORT}`);
});
