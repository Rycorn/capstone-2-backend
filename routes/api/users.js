const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

/*.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser); */

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.createNewUser)
    .put(verifyRoles(ROLES_LIST.User), usersController.updateUser)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

router.route('/:id')
    .get(usersController.getUser);

module.exports = router;

