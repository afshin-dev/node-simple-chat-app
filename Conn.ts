import net from "node:net";
import {
  UPLOAD_PROTOCOL_REQUEST_HEADER,
  UPLOAD_PROTOCOL_RESPONSE_HEADER,
} from "./config.js";
import fspromise from "node:fs/promises";
import { WriteStream } from "node:fs";

export class Conn {
  private isAllowedCommunication: boolean = false;
  private fileHandle: fspromise.FileHandle | null = null;
  private fileWritableStream: WriteStream | null = null;
  private s: net.Socket | null = null;
  /**
   *
   */
  constructor(socket: net.Socket) {
    this.s = socket;
    this.s.on("data", this.handleDataEvent);
    this.s.on("connect", this.handleConnectEvent);
    this.s.on("error", this.handleErrorEvent);
    this.s.on("end", this.handleEndEvent);
  }

  public handleDataEvent = async (chunk: Buffer | string) => {
    if (!this.isAllowedCommunication) {
      if (chunk.toString("utf-8") == UPLOAD_PROTOCOL_REQUEST_HEADER) {
        this.s && this.s.write(UPLOAD_PROTOCOL_RESPONSE_HEADER);
        this.isAllowedCommunication = true;

        // this file stuff initialization and organization should not be here
        this.fileHandle = await fspromise.open(
          `server-storage/${Math.random().toString()}.txt`,
          "w"
        );
        this.fileWritableStream = this.fileHandle.createWriteStream();

        return;
      }
    }

    if (this.isAllowedCommunication) {
      try {
        this.fileWritableStream?.write(chunk);
      } catch (e) {
        console.error(e);
        await this.fileHandle?.close();
      }
    }
  };

  public handleEndEvent = async (e: Error) => {
    await this.fileHandle?.close();
  };

  public handleConnectEvent = async () => {
    console.log(`socket `, this.s && this.s.address(), `connected`);
  };

  public handleErrorEvent = async (e: Error) => {
    await this.fileHandle?.close();

    console.log(e);
  };
}
