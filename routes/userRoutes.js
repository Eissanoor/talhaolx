const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware.js');
const multer = require('multer');
const { upload } = require("../config/multerConfig.js");

// const upload = multer({ storage: storage });
const apicache = require('apicache');
const cache = apicache.middleware;
router.get('/login_with_google', userController.loginWithGoogle);
router.get('/signup_with_google', userController.signupWithGoogle);
router.get('/auth/google/callback', userController.googleCallback);
router.post('/login', userController.loginUser);
router.get('/', cache('5 minutes'), userController.getUsers)
router.post('/',upload.fields([{ name: 'image', maxCount: 1 }, {name:"pictureBusinessCertificate",maxCount: 1},{name:"frontImage",maxCount: 1},{name:"backImage",maxCount: 1} ]), userController.addUser)
router.put('/:id',upload.fields([{ name: 'image', maxCount: 1 },{name:"pictureBusinessCertificate",maxCount: 1},{name:"frontImage",maxCount: 1},{name:"backImage",maxCount: 1}]), userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.get('/:id',cache('5 minutes'), userController.getUserById)
router.put('/password_change/:id', userController.changePassword)
module.exports = router;