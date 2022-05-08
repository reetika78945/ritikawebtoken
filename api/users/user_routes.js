const { createUser, getUsers, updateUser, getUserByUserId,deleteUser, login } = require('./user_controller');
const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByUserId);
router.put('/',updateUser);
router.delete('/:id',deleteUser);
router.post('/login', login)

module.exports = router;