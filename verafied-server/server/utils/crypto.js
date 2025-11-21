const crypto = require("crypto");

const algorithm = "aes-256-cbc";
// const key = crypto
//   .createHash("sha256")
//   .update(String(process.env.ENCRYPTION_KEY)) // from .env
//   .digest("base64")
//   .substr(0, 32); // must be 32 bytes for AES-256

const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function encrypt(text) {
  if (text === undefined || text === null) {
    throw new Error("Cannot encrypt undefined or null value");
  }

  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new Error(
      "Invalid or missing encryption key: must be 32 bytes for AES-256-CBC"
    );
  }
  const stringText = text.toString();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(stringText, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = Buffer.concat(
    decipher.update(encrypted, "hex"),
    decipher.final()
  );
  return decrypted.toString("utf8");
}

function normalizeOrgId(value) {
  // If it's a MySQL Buffer object, convert to Buffer and then to hex
  if (value && value.type === "Buffer" && Array.isArray(value.data)) {
    return Buffer.from(value.data).toString("hex");
  }

  // If it's already a Buffer, convert to hex
  if (Buffer.isBuffer(value)) {
    return value.toString("hex");
  }

  // Otherwise assume it's already a string
  return value;
}

module.exports = { encrypt, decrypt, normalizeOrgId };
