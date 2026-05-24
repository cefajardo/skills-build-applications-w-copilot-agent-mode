import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema({
  user:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score:  { type: Number, required: true, default: 0 },
}, { timestamps: true });

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
