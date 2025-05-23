import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  leaveDate: { type: Date, required: true },
  reason: { type: String, required: true },
  leaveType: { type: String, default: 'casual' }
});

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
