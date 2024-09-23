import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  date: Date,
  status: String,
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;