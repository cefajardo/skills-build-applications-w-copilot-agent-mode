"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.Activity.find().populate('user', '-password');
    res.json(activities);
});
router.get('/:id', async (req, res) => {
    const activity = await Activity_1.Activity.findById(req.params.id).populate('user', '-password');
    if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
    }
    res.json(activity);
});
router.post('/', async (req, res) => {
    const activity = new Activity_1.Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
});
router.put('/:id', async (req, res) => {
    const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
    }
    res.json(activity);
});
router.delete('/:id', async (req, res) => {
    await Activity_1.Activity.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
exports.default = router;
