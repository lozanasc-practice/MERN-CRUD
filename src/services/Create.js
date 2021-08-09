const Connection = require('../database/connectDatabase');

module.exports = async (user_name, user_hobby) => {
    try {
const query = `INSERT INTO userbase.user (user_id,user_name,user_hobby) VALUES (null, '${user_name}', '${user_hobby}');`;
    await Connection(query);
    return true;
    }
    catch(error) {
        return false;
    }
}