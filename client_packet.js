let PacketEncoding = require('./encoding');

class ClientPacket {
    constructor (header) {
        this._bytes = [];
        this._header = header;
        this.writeShort(header);
    }

    remainingBytes () {
        return this._bytes.length - this._pointer;
    }

    getBuffer () {
      return new Buffer(this._bytes);
    }

    getBytes () {
        var arr = new Uint8Array(this._bytes);
        var arraybuffer = arr.buffer;
        return arraybuffer;
    }

    writeBytes (bytes) {
        for(var i = 0; i < bytes.length; i++)
        {
            this._bytes.push(bytes[i]);
        }
    }

    prepare () {
      let pktlen = PacketEncoding.encodeInt32(this._bytes.length);
      this._bytes = pktlen.concat(this._bytes);
    }

    writeByte (byt)
    {
        this._bytes.push(byt);
    }

    writeInteger (i) {
        i = PacketEncoding.encodeInt32(i);
        this.writeBytes(i);
    }

    writeShort (i) {
        i = PacketEncoding.encodeInt16(i);
        this.writeBytes(i);
    }

    writeString (str) {
        this.writeShort(str.length);
        this.writeBytes(PacketEncoding.stringToBytes(str));
    }

    writeBoolean (flag) {
        this.writeByte(PacketEncoding.encodeBool(flag));
    }


    toString () {
        return "\x57\x65\x62\x43\x6F\x72\x65\x20\x4A\x53\x20\x43\x6C\x69\x65\x6E\x74\x20\x62\x79\x20\x4B\x65\x69\x7A\x20\xA9\x20\x32\x30\x31\x37";
    }
};

module.exports = ClientPacket;
