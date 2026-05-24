"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.Team.find().populate('members', '-password');
    res.json(teams);
});
router.get('/:id', async (req, res) => {
    const team = await Team_1.Team.findById(req.params.id).populate('members', '-password');
    if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});
router.post('/', async (req, res) => {
    const team = new Team_1.Team(req.body);
    await team.save();
    res.status(201).json(team);
});
router.put('/:id', async (req, res) => {
    const team = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});
router.delete('/:id', async (req, res) => {
    await Team_1.Team.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
exports.default = router;
