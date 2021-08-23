const path = require('path');
const fs = require('fs/promises');

const usersPath = path.join(process.cwd(), 'database', 'users.json');

module.exports = {
  getUsers: async () => {
    try {
      const data = await fs.readFile(usersPath, 'utf-8');
      return JSON.parse(data.toString());
    } catch (e) {
      console.log(e);
    }
  },

  writeUser: async (arrUsers) => {
    try {
      const fileWrite = JSON.stringify(arrUsers);

      await fs.writeFile(usersPath, fileWrite);
    } catch (e) {
      console.log(e);
    }
  }
};
