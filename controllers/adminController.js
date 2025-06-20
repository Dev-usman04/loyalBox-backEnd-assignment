const asyncHandler = require('express-async-handler');
const Reward = require('../models/Reward');
const User = require('../models/User');


const createReward = asyncHandler(async (req, res) => {
  const { name, Points, description } = req.body;

  if (!name || !Points) {
    res.status(400);
    throw new Error('Name and Points are required');
  }

  const reward = await Reward.create({ name, Points, description });
  res.status(201).json(reward);
});



const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); 

  res.json(users);
});

const promoteUserToAdmin = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error('User is already an admin');
  }

  user.isAdmin = true;
  await user.save();

  res.json({ message: `User ${user.name} is now an admin.` });
});



const getAllTransactions = asyncHandler(async (req, res) => {
  const users = await User.find().select('name email transactions').lean(); // <-- .lean() is key

  const allTransactions = users.flatMap(user =>
    user.transactions.map(item => ({
      userName: user.name,
      email: user.email,
      type: item.type,
      amount: item.amount,
      description: item.description,
      date: item.date
    }))
  );

  res.json(allTransactions);
});




module.exports = { createReward,
                  getAllUsers,
                  promoteUserToAdmin,
                  getAllTransactions};
