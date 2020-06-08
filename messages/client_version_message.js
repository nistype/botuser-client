const headers = require('./headers');
const ClientPacket = require('../client_packet');

module.exports = () => {

  let pkt = new ClientPacket(headers.client_version);
  pkt.writeString("bot-user");
  pkt.prepare();

  return pkt.getBuffer();

}
