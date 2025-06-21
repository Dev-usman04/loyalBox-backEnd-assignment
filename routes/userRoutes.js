const express = require('express');
const router = express.Router();
const {getRewards,
  purchaseItem,
  redeemReward,
  getTransactionHistory} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.get('/rewards', auth, getRewards);
router.post('/purchase', auth, purchaseItem);
router.post('/redeem', auth, redeemReward);
router.get('/transactions', auth, getTransactionHistory);

module.exports = router;