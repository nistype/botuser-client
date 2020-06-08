module.exports.decodeInt32 = function(bytes) {
    if(bytes.length < 4)
        return -1;
    if(bytes[0] < 0 || bytes[1] < 0 || bytes[2] < 0 || bytes[3] < 0)
        return -2;
    return (bytes[0]*16777216) + (bytes[1]*65536) + (bytes[2]*256) + (bytes[3]);
},

module.exports.encodeInt32 = function(i) {
    var bytes = [];

    if(i < 0)
        return [0, 0, 0, 0];

    bytes[0] = Math.floor(i / 16777216);
    i = i % 16777216;
    bytes[1] = Math.floor(i / 65536);
    i = i % 65536;
    bytes[2] = Math.floor(i / 256);
    i = i % 256;
    bytes[3] = i;
    return bytes;
},

module.exports.encodeInt16 = function(i) {
    var bytes = [];

    if(i < 0)
        return [0, 0];

    bytes[0] = Math.floor(i / 256);
    i = i % 256;
    bytes[1] = i;
    return bytes;
},

module.exports.decodeInt16 = function(bytes) {
    if(bytes.length < 2)
        return -1;
    if(bytes[0] < 0 || bytes[1] < 0)
        return -2;
    return (bytes[0]*256) + (bytes[1]);
},

module.exports.decodeBool = function(bytes) {
    if(bytes.length !== 1)
        return false;

    return parseInt(bytes[0]) === 1;
},

module.exports.encodeBool = function(flag) {
    return flag ? 1 : 0;
},

module.exports.stringToBytes = function(str) {
    var bytes = [];

    for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);
        bytes = bytes.concat([code]);
    }

    return bytes;
},

module.exports.bytesToString = function(bytes) {
    var s = "";
    if(bytes.length == 0)
        return s;
    for(var i = 0; i < bytes.length; i++)
    {
        s += String.fromCharCode(bytes[i]);
    }
    return s;
},

module.exports.stringToBytes = function(str) {
    if(str.length == 0)
        return [];
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);
        bytes = bytes.concat([code]);
    }
    return bytes;
}
