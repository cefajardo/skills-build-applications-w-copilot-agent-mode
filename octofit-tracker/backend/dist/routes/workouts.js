"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find();
    res.json(workouts);
});
router.get('/:id', async (req, res) => {
    const workout = await Workout_1.Workout.findById(req.params.id);
    if (!workout) {
        res.status(404).json({ message: 'Workout not found' });
        return;
    }
    res.json(workout);
});
router.post('/', async (req, res) => {
    const workout = new Workout_1.Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
});
router.put('/:id', async (req, res) => {
    const workout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) {
        res.status(404).json({ message: 'Workout not found' });
        return;
    }
    res.json(workout);
});
router.delete('/:id', async (req, res) => {
    await Workout_1.Workout.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
exports.default = router;
