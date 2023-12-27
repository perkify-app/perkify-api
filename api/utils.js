exports.encodeBase64 = (str) => Buffer.from(str).toSrting('base64');
exports.decodeBase64 = (strBase64) => Buffer.from(strBase64, 'base64').toString();