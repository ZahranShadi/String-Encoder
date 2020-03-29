function encode(req, res) {
  const { string } = req.body;

  let encodedString = encodeString(string);
  return res.send({ encodedString: encodedString });
}

function encodeString(string) {
  let encodedString = [];
  let charCount = 0;
  for (let i = 0; i < string.length; i++) {
    charCount++;

    if (i + 1 >= string.length || string.charAt(i) !== string.charAt(i + 1)) {
      encodedString.push(string.charAt(i) + charCount);
      charCount = 0;
    }
  }
  return encodedString.join("");
}

module.exports = {
  apiEncode: encode,
  encodeString: encodeString
};
