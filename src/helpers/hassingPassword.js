const Crypto = require("crypto");

module.exports = {
  hashpassword : (password) => {
    let keyword = process.env.HASH_KEY;
    return Crypto.createHmac("sha256", keyword).update(password).digest("hex");
  }
} 