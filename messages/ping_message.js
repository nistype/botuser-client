const headers = require('./headers');
const ClientPacket = require('../client_packet');

module.exports = () => {

  let pkt = new ClientPacket(headers.ping);
  pkt.prepare();

  return pkt.getBuffer();

}
