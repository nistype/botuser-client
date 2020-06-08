const headers = require('./headers');
const ClientPacket = require('../client_packet');

module.exports = (room_id) => {

  let pkt = new ClientPacket(headers.get_room_entry_data);
  pkt.prepare();

  return pkt.getBuffer();

}
