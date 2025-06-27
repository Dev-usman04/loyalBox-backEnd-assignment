const User = require('../models/User');
const Reward = require('../models/Reward');
const Transaction = require('../models/Transaction');

const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rewards', error });
  }
};

const purchaseItem = async (req, res) => {
  try {
    const { itemName, points } = req.body;
    const user = await User.findById(req.user.id);
    user.points += points;
    await user.save();

    const transaction = new Transaction({
      user: req.user.id,
      type: 'purchase',
      points,
      description: `Purchased ${itemName}`,
    });
    await transaction.save();

    res.json({ message: `You have successfully purchased  ${itemName}, and earned ${user.points} points` });
  } catch (error) {
    res.status(500).json({ message: 'Error processing purchase', error });
  }
};

const redeemReward = async (req, res) => {
  try {
    const { rewardId } = req.body;
    const user = await User.findById(req.user.id);
    const reward = await Reward.findById(rewardId);

    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    if (user.points < reward.pointsRequired) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    user.points -= reward.pointsRequired;
    await user.save();

    const transaction = new Transaction({
      user: req.user.id,
      type: 'redeem',
      points: -reward.pointsRequired,
      description: `Redeemed ${reward.name}`,
    });
    await transaction.save();

    res.json({ message: 'Reward redeemed', points: user.points });
  } catch (error) {
    res.status(500).json({ message: 'Error redeeming reward', error });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

module.exports = {
  getRewards,
  purchaseItem,
  redeemReward,
  getTransactionHistory
};