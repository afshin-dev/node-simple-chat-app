export interface ServerDropEventData {
  localAddress: string; //  Local address.
  localPort: number; //  Local port.
  localFamily: string; // Local family.
  remoteAddress: string; // Remote address.
  remotePort: number; // Remote port.
  remoteFamily: string; // Remote IP family. 'IPv4' or 'IPv6'.
}
