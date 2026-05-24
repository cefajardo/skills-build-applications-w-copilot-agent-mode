"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// GET all users
router.get('/', async (_req, res) => {
    const users = await User_1.User.find().select('-password');
    res.json(users);
});
// GET single user
router.get('/:id', async (req, res) => {
    const user = await User_1.User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
});
// POST create user
router.post('/', async (req, res) => {
    const user = new User_1.User(req.body);
    await user.save();
    const { password: _pw, ...safe } = user.toObject();
    res.status(201).json(safe);
});
// PUT update user
router.put('/:id', async (req, res) => {
    const user = await User_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
});
// DELETE user
router.delete('/:id', async (req, res) => {
    await User_1.User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
exports.default = router;
