const Connection = require('../database/connectDatabase');

module.exports = async (fields) => {
    try {
        const query = `SELECT ${fields} FROM user`;
        const data = await Connection(query);
        // Returns an Array of Objects containing user information
        return data;
    } catch (error) {
        return [];
    }
};