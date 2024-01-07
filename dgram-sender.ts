import dgram from "node:dgram";

const sender: dgram.Socket = dgram.createSocket("udp4");

setInterval(
  () => {
    sender.send(
      Buffer.from("---"),
      4321,
      "127.0.0.1",
      (e: Error | null, bytes: number) => {
        console.log(`${bytes} send and error is : ${e}`);
      }
    );
  },

  1000
);
