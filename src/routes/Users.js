const express = require('express');
const router = express.Router();

// * Backend CRUD Functionality
const addUser = require('../services/Create');
const viewUser = require('../services/Retrieve');
const editUser = require('../services/Update');
const deleteUser = require('../services/Delete');


// Router to Add User in the Database (:
router.post('/addUser', async (req, res) => {

    const {user_name, user_hobby} = req.body;
    const isAdded = await addUser(user_name, user_hobby);

    if(isAdded){
        res.status(200)
        .send({
            status: isAdded,
            description: 'Adding User Information is Successful!'
        });
    }
    else {
        res.status(500)
        .send({
            status: isAdded,
            description: 'Something went wrong, operation failed.'
        });
    }
});


// Router to View User in the Database (:
router.get('/viewUser', async (req, res) => {
    const {fields} = req.query;

    const toView = await viewUser(fields);

    if(toView){
        res.status(200)
        .send(toView);
    }
    else {
        res.status(500)
        .send({
            status: toView,
            description: 'Something went wrong, operation failed.'
        })
    }
});

// Router to Delete User in the Database C:
router.get('/deleteUser', async (req, res) => {
    const {user_id} = req.query;

    const isDeleted = await deleteUser(user_id);

    if(isDeleted){
        res.status(200)
        .send({
            status: isDeleted,
            description: 'Deletion of User Information is successful!' 
        });
    }
    else {
        res.status(500)
        .send({
            status: isDeleted,
            description: 'Something went wrong, operation failed.'
        })
    }
});

// Router to Edit User in the Database C:
router.post('/editUser', async (req, res) => {
    const {user_id, user_name, user_hobby} = req.body;

    const isUpdated = await editUser(user_id,user_name, user_hobby);

    if(isUpdated){
        res.status(200)
        .send({
            status: isUpdated,
            description: 'Update of User Information is successful.'
        });
    }
    else {
        res.status(500)
        .send({
            status: isUpdated,
            description: 'Something went wrong, operation failed.'
        })
    }
});

module.exports = router;