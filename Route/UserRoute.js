const express = require('express');
const UserModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

userRouter.post('/signup', async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });
     console.log(userExists)
    if (userExists) {
      return res.status(400).json({ err: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({ ...req.body, password: hashPassword });
    console.log(newUser)
    await newUser.save();
    res.status(200).json({ msg: 'User is successfully registered', user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ err: 'An error occurred during signup' });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ err: err.message });
      }

      if (result) {
        const token = jwt.sign({ userId: user.id, name: user.name }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ msg: 'Login successful', token: token });
      } else {
        res.status(401).json({ err: 'Authentication failed' });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(400).json({ err: 'An error occurred during login' });
  }
});

module.exports = userRouter;
