const fs = require('fs/promises');

async function readResourceFile(path){
    
    const studentsBsuffer = await fs.readFile(path);
    const studentsString = JSON.parse(studentsBsuffer);

    return studentsString;
}

async function writeResourceFile(arrayJson, path){
    const studentStringfy = JSON.stringify(arrayJson);
    await fs.writeFile(path, studentStringfy);
}

module.exports = {
    readResourceFile,
    writeResourceFile
}