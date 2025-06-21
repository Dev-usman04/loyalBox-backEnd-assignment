const Reward = require('../models/Reward');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.createReward = async (req, res) => {
  try {
    const { name, pointsRequired, description } = req.body;
    const reward = new Reward({ name, pointsRequired, description });
    await reward.save();
    res.status(201).json({ message: 'Reward created', reward });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reward', error });
  }
};

exports.updateReward = async (req, res) => {
  try {
    const { rewardId } = req.params;
    const reward = await Reward.findByIdAndUpdate(rewardId, req.body, { new: true });
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward updated', reward });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reward', error });
  }
};

exports.deleteReward = async (req, res) => {
  try {
    const { rewardId } = req.params;
    const reward = await Reward.findByIdAndDelete(rewardId);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reward', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user history', error });
  }
};

exports.promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User promoted to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Error promoting user', error });
  }
};