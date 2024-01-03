import http from "node:http";
import os from "node:os";

// if you look for your local ip address
// simply log ni constant to console
// and look for connected network interface object in array
const ni = os.networkInterfaces();

// change IP to your local ip adrress
// to access server from another machine
// at the same local area network
const IP = "localhost";

// a random port
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
