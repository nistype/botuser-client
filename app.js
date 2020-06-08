let net = require('net');
let ClientPacket = require('./client_packet');
let ClientVersionMessage = require('./messages/client_version_message');
let SSOTicketMessage = require('./messages/sso_ticket_message');
let OpenFlatConnectionMessage = require('./messages/open_flat_connection_message');
let GetRoomEntryDataMessage = require('./messages/get_room_entry_data_message');
let MoveAvatarMessage = require('./messages/move_avatar_message.js');
let PingMessage = require('./messages/ping_message');

let client = new net.Socket();

client.connect(1232, '127.0.0.1', () => {

  // L'utilisateur s'authentifiera, entrera dans l'id de salle 13, marchera jusqu'à x: 5 y: 5
	client.write(ClientVersionMessage());
	client.write(SSOTicketMessage("2"));
	client.write(OpenFlatConnectionMessage(13));
	client.write(GetRoomEntryDataMessage());
  client.write(MoveAvatarMessage(5, 5));

});

client.on('data', (data) => {

});

client.on('close', () => {

});
