// CreateReport.jsx
import { useState, useEffect } from "react";
import API from "../../services/api";
import "./CreateReport.css";
import Layout from "../../components/Layout";
import PageWrapper from "../../components/PageWrapper";
import toast from "react-hot-toast";

export default function CreateReport() {
  const [isWeeklySaved, setIsWeeklySaved] = useState(false);
  const [currentActivities, setCurrentActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getWeekNumber = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = (now - start) / (1000 * 60 * 60 * 24);
    return "CW" + Math.ceil((diff + start.getDay() + 1) / 7);
  };

  const [form, setForm] = useState({
    date: getTodayDate(),
    cw: getWeekNumber(),
    weeklyTask: "",
  });

  const isEditableDay = () => {
    const day = new Date().getDay();
    return day === 1 || day === 3 || day === 4;
  };

  // Load weekly task
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const res = await API.get(`/reports/week?cw=${form.cw}`);

        if (res.data && res.data.weeklyTask) {
          setForm((prev) => ({
            ...prev,
            weeklyTask: res.data.weeklyTask,
          }));
          setIsWeeklySaved(true);
        } else {
          setIsWeeklySaved(false);
        }
      } catch (err) {
        console.error("Error fetching weekly data:", err);
        setIsWeeklySaved(false);
      }
    };

    fetchWeeklyData();
  }, [form.cw]);

  // Load activities for the selected date
  useEffect(() => {
    const fetchDailyActivities = async () => {
      if (!isWeeklySaved) return;

      try {
        const res = await API.get(
          `/reports/daily?cw=${form.cw}&date=${form.date}`,
        );
        setCurrentActivities(res.data.activities || []);
      } catch (err) {
        console.error("Error fetching daily activities:", err);
        setCurrentActivities([]);
      }
    };

    fetchDailyActivities();
  }, [form.cw, form.date, isWeeklySaved]);

  const addRow = () => {
    setCurrentActivities([
      ...currentActivities,
      {
        fromTime: "",
        toTime: "",
        workDone: "",
        completion: "",
        remarks: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    const updated = currentActivities.filter((_, i) => i !== index);
    setCurrentActivities(updated);
    toast.success("Row deleted", { icon: "🗑️", duration: 2000 });
  };

  const handleChange = (index, field, value) => {
    const updated = [...currentActivities];
    updated[index][field] = value;
    setCurrentActivities(updated);
  };

  const handleWeeklySubmit = async () => {
    if (!form.weeklyTask) {
      alert("Enter weekly task first");
      return;
    }

    try {
      await API.post("/reports", {
        cw: form.cw,
        weeklyTask: form.weeklyTask,
        date: form.date,
        activities: [],
      });

      setIsWeeklySaved(true);
      alert("Weekly Task Saved ✅");
    } catch (err) {
      alert("Error saving weekly task");
    }
  };

  const handleSubmit = async () => {
    if (currentActivities.length === 0) {
      toast.error("Add at least one activity before submitting", {
        icon: "⚠️",
        duration: 3000,
      });
      return;
    }

    const invalidActivities = currentActivities.filter(
      (activity) =>
        !activity.workDone || !activity.fromTime || !activity.toTime,
    );

    if (invalidActivities.length > 0) {
      toast.error("Please fill all required fields (From, To, Work Done)", {
        icon: "⚠️",
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting daily report...");

    try {
      await API.post("/reports", {
        cw: form.cw,
        weeklyTask: form.weeklyTask,
        date: form.date,
        activities: currentActivities,
      });

      toast.success("Daily Report Submitted Successfully! ✅", {
        id: toastId,
        duration: 3000,
      });
      // setCurrentActivities([]); // Clear activities after successful submission
    } catch (err) {
      toast.error("Error submitting report", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <Layout>
      <PageWrapper>
        <div className="card">
          <h2>Daily Task Report</h2>
        </div>

        <div className="container">
          {/* WEEKLY TASK */}
          <div className="card">
            <h3>Weekly Task</h3>

            <div className="inp_card">
              <label>Calendar Week</label>
              <input value={form.cw} disabled />
            </div>

            <textarea
              value={form.weeklyTask}
              placeholder="Enter weekly task..."
              disabled={!isEditableDay()}
              onChange={(e) => setForm({ ...form, weeklyTask: e.target.value })}
            />

            <button
              className="btn btn-submit"
              onClick={handleWeeklySubmit}
              disabled={!isEditableDay()}
            >
              Save Weekly Task
            </button>

            {!isEditableDay() && (
              <p style={{ color: "red" }}>*Editable only on Mon, Wed, Fri</p>
            )}
          </div>

          {/* DAILY ACTIVITIES */}
          <div className="card" style={{ opacity: isWeeklySaved ? 1 : 0.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Daily Activities</h3>
              <button
                className="btn btn-add"
                disabled={!isWeeklySaved}
                onClick={addRow}
              >
                Add Row
              </button>
            </div>
            <div className="inp_card">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Work Done</th>
                  <th>%</th>
                  <th>Remarks</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {currentActivities.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        value={row.fromTime}
                        onChange={(e) =>
                          handleChange(index, "fromTime", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={row.toTime}
                        onChange={(e) =>
                          handleChange(index, "toTime", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={row.workDone}
                        onChange={(e) =>
                          handleChange(index, "workDone", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.completion}
                        onChange={(e) =>
                          handleChange(index, "completion", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={row.remarks}
                        onChange={(e) =>
                          handleChange(index, "remarks", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteRow(index)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
            <button
              className="btn btn-submit"
              disabled={!isWeeklySaved}
              onClick={handleSubmit}
            >
              Submit Daily Report
            </button>
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
}
