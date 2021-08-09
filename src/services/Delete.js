const Connection = require('../database/connectDatabase');

module.exports = async (id) => {
    try {   
        // Delete MySql query
        const query = `DELETE FROM `+
                        `user ` +
                        `WHERE `+
                        `user_id=${id}`;
        // The Mysql Connection that execute the query
        await Connection(query);
        // If successful this async function will return true
        return true;
    } catch (error) {
        // If the Connection fails it returns false
        return false;
    }
}