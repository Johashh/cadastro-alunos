const fs = require("fs/promises");

async function readResourceFile(path) {
  const arrayBuffer = await fs.readFile(path);
  const arrayString = JSON.parse(arrayBuffer);

  return arrayString;
}

async function writeResourceFile(arrayJson, path) {
  const arrayStringfy = JSON.stringify(arrayJson);
  await fs.writeFile(path, arrayStringfy);
}

module.exports = {
  readResourceFile,
  writeResourceFile,
};
