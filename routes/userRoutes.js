const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
	'/updateMyPassword',
	authController.protect,
	authController.updatePassword
);
router.get(
	'/myInfo',
	authController.protect,
	userController.getMe,
	userController.getUser
);
router.patch(
	'/updateMe',
	authController.protect,
	userController.getMe,
	userController.updateUser
);

router
	.route('/')
	.get(
		authController.protect,
		authController.restrictTo('backOffice'),
		userController.getAllUsers
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('backOffice'),
		userController.getUser
	)
	.patch(
		authController.protect,
		authController.restrictTo('backOffice'),
		userController.updateUser
	)
	.delete(
		authController.protect,
		authController.restrictTo('backOffice'),
		userController.deleteUser
	);

module.exports = router;
