const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/rewards', auth, adminAuth, adminController.createReward);
router.put('/rewards/:rewardId', auth, adminAuth, adminController.updateReward);
router.delete('/rewards/:rewardId', auth, adminAuth, adminController.deleteReward);
router.get('/users', auth, adminAuth, adminController.getAllUsers);
router.get('/users/:userId/history', auth, adminAuth, adminController.getUserHistory);
router.post('/promote', auth, adminAuth, adminController.promoteToAdmin);

module.exports = router;