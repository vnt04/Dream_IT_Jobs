const express = require("express");
const router = express.Router();

const userController = require('../Controllers/UserController')

router.get('/:uid',userController.userInfo)
router.post('/sign-up',userController.signUp);
router.get('/',userController.index);


module.exports = router;