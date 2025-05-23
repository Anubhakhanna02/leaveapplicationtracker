import Leave from '../models/leaveModel.js';

export const submitLeave = async (req, res) => {
  try {
    const { employeeName, leaveDate, reason, leaveType } = req.body;


    if (!employeeName || employeeName.length < 3 || !/^[A-Za-z\s]+$/.test(employeeName)) {
      return res.status(400).json({ error: "Invalid employee name" });
    }

    if (!leaveDate || isNaN(Date.parse(leaveDate)) || new Date(leaveDate) < new Date().setHours(0,0,0,0)) {
      return res.status(400).json({ error: "Invalid or past leave date" });
    }

    if (!reason || reason.length < 5) {
      return res.status(400).json({ error: "Reason must be at least 5 characters" });
    }

    const validTypes = ['casual', 'sick', 'earned'];
    const type = leaveType ? leaveType.toLowerCase() : 'casual';
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid leave type" });
    }

    const newLeave = new Leave({ employeeName, leaveDate, reason, leaveType: type });
    await newLeave.save();
    res.status(201).json({ message: 'Leave request submitted', data: newLeave });

  } catch (error) {
    res.status(500).json({ error: 'Server error while submitting leave request' });
  }
};


export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ leaveDate: 1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leave records' });
  }
};




export const updateLeave = async (req, res) => {
  try {
    const { employeeName, leaveDate, reason, leaveType } = req.body;
    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      { employeeName, leaveDate, reason, leaveType },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Leave not found" });
    res.json({ message: "Leave updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Error updating leave" });
  }
};


export const deleteLeave = async (req, res) => {
  try {
    const deleted = await Leave.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Leave not found" });
    res.json({ message: "Leave deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting leave" });
  }
};
