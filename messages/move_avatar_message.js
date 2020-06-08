const headers = require('./headers');
const ClientPacket = require('../client_packet');

module.exports = (x, y) => {

  let pkt = new ClientPacket(headers.move_avatar);
  pkt.writeInteger(x);
  pkt.writeInteger(y);
  pkt.prepare();

  return pkt.getBuffer();

}
