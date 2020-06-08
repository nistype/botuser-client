const headers = require('./headers');
const ClientPacket = require('../client_packet');

module.exports = (sso) => {

  let pkt = new ClientPacket(headers.sso_ticket);
  pkt.writeString(sso);
  pkt.prepare();

  return pkt.getBuffer();

}
