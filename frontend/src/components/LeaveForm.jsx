import { useState } from "react";

export default function LeaveForm() {
  const [form, setForm] = useState({
    employeeName: "",
    leaveDate: "",
    reason: "",
    leaveType: "casual", 
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const { employeeName, leaveDate, reason, leaveType } = form;

    if (!employeeName.trim() || employeeName.length < 3 || !/^[A-Za-z\s]+$/.test(employeeName)) {
      return "Name must be at least 3 characters and contain only letters.";
    }

    const leaveDateObj = new Date(leaveDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!leaveDate || isNaN(leaveDateObj) || leaveDateObj < today) {
      return "Leave date must be a valid future date.";
    }

    if (!reason.trim() || reason.length < 5) {
      return "Reason must be at least 5 characters.";
    }

    const validTypes = ["casual", "sick", "earned"];
    if (!validTypes.includes(leaveType.toLowerCase())) {
      return "Invalid leave type.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return setMessage(error);

    try {
      const res = await fetch("http://localhost:5000/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setMessage("Leave request submitted successfully.");
      setForm({ employeeName: "", leaveDate: "", reason: "", leaveType: "casual" });
    } catch (err) {
      setMessage(` ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white p-10 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Leave Application</h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-lg">
        {}
        <div>
          <label className="block font-semibold mb-1">Employee Name</label>
          <input
            id="employeeName"
            value={form.employeeName}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Anubha Khanna"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {}
        <div>
          <label className="block font-semibold mb-1">Leave Date</label>
          <input
            id="leaveDate"
            value={form.leaveDate}
            onChange={handleChange}
            type="date"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {}
        <div>
          <label className="block font-semibold mb-1">Reason</label>
          <textarea
            id="reason"
            value={form.reason}
            onChange={handleChange}
            rows="4"
            placeholder="Explain why you need the leave..."
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {}
        <div>
          <label className="block font-semibold mb-1">Leave Type</label>
          <select
            id="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="earned">Earned</option>
          </select>
        </div>

        {}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
        >
          Submit Leave Request
        </button>

        {}
        {message && (
          <p className="text-center mt-4 text-base font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
