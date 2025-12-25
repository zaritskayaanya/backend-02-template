const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, 'data', 'users.json');

async function getUsers() {
    const data = await fs.readFile(usersFilePath);
    return JSON.parse(data);
}

module.exports = { getUsers };