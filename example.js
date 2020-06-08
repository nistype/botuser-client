let net = require('net');
let ClientPacket = require('./client_packet');
let ClientVersionMessage = require('./messages/client_version_message');
let SSOTicketMessage = require('./messages/sso_ticket_message');
let OpenFlatConnectionMessage = require('./messages/open_flat_connection_message');
let GetRoomEntryDataMessage = require('./messages/get_room_entry_data_message');
let MoveAvatarMessage = require('./messages/move_avatar_message.js');
let PingMessage = require('./messages/ping_message');

/*
// Cela authentifiera 75 utilisateurs, les fera entrer et sortir des pièces du tableau ROOM_IDS et les fera marcher vers des carrés aléatoires
*/

const USER_AMOUNT = 76;
const ROOM_IDS = [349, 408, 4, 80]

// sso 2 ou 1
for(let i = 2; i <= USER_AMOUNT; i++) {
	let client = new net.Socket();
	client.connect(1232, '127.0.0.1', () => {
		console.log('Client connecté # ' + i);

		client.write(ClientVersionMessage());
		client.write(SSOTicketMessage("" + i + ""));
		client.write(OpenFlatConnectionMessage(ROOM_IDS[Math.floor(Math.random() * ROOM_IDS.length)]));
		client.write(GetRoomEntryDataMessage());

		setInterval(() => {
			let rnd = Math.floor((Math.random() * 20) + 1);

			if(rnd > 15) {
				client.write(OpenFlatConnectionMessage(ROOM_IDS[Math.floor(Math.random() * ROOM_IDS.length)]));
				client.write(GetRoomEntryDataMessage());
			}
			else if(rnd > 7) {
				let x = Math.floor((Math.random() * 10) + 1);
				let y = Math.floor((Math.random() * 20) + 1);
				client.write(MoveAvatarMessage(x, y))
			}

		}, 5000);

		setInterval(() => {
			client.write(PingMessage());
		}, 10000)

	});

	client.on('data', (data) => {
		//console.log('Received: ' + data);
	});

	client.on('close', () => {
		console.log('Connexion fermée');
	});
}
