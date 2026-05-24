"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const entries = await LeaderboardEntry_1.LeaderboardEntry.find()
        .populate('user', '-password')
        .sort({ score: -1 });
    res.json(entries);
});
router.get('/:id', async (req, res) => {
    const entry = await LeaderboardEntry_1.LeaderboardEntry.findById(req.params.id).populate('user', '-password');
    if (!entry) {
        res.status(404).json({ message: 'Entry not found' });
        return;
    }
    res.json(entry);
});
router.post('/', async (req, res) => {
    const entry = new LeaderboardEntry_1.LeaderboardEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
});
router.put('/:id', async (req, res) => {
    const entry = await LeaderboardEntry_1.LeaderboardEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) {
        res.status(404).json({ message: 'Entry not found' });
        return;
    }
    res.json(entry);
});
router.delete('/:id', async (req, res) => {
    await LeaderboardEntry_1.LeaderboardEntry.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
exports.default = router;
