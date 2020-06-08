const headers = require('./headers');
const ClientPacket = require('../client_packet');

module.exports = (room_id) => {

  let pkt = new ClientPacket(headers.open_flat_connection);
  pkt.writeInteger(room_id);
  pkt.writeString("");
  pkt.prepare();

  return pkt.getBuffer();

}
