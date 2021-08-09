const Connection = require('../database/connectDatabase');

// Problem:
// You have to update each field to make it successful
module.exports = async (user_id, user_name, user_hobby) => {
    try {
        const query = `UPDATE user SET user_name = '${user_name}', user_hobby = '${user_hobby}' WHERE user_id = ${user_id}`;
        await Connection(query);
        return true;
    } catch (error) {
        return false;
    }
}