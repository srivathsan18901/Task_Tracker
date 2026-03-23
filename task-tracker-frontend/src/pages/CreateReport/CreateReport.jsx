import { useState } from "react";
import API from "../../services/api";
import "./CreateReport.css";
import Layout from "../../components/Layout";

export default function CreateReport() {
  const [form, setForm] = useState({
    date: "",
    cw: "",
    weeklyTask: "",
    activities: [],
  });

  const isEditableDay = () => {
    const day = new Date().getDay();
    return day === 1 || day === 3 || day === 5;
  };

  const addRow = () => {
    setForm({
      ...form,
      activities: [
        ...form.activities,
        {
          fromTime: "",
          toTime: "",
          workDone: "",
          completion: "",
          remarks: "",
        },
      ],
    });
  };

  const deleteRow = (index) => {
    const updated = form.activities.filter((_, i) => i !== index);
    setForm({ ...form, activities: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...form.activities];
    updated[index][field] = value;
    setForm({ ...form, activities: updated });
  };

  const handleSubmit = async () => {
    await API.post("/reports", form);
    alert("Report Submitted ✅");
  };

  return (
    <Layout>
      <div className="card">
        <h2>Daily Task Report</h2>
      </div>
      <div className="container">
        {/* HEADER */}
        <div className="card">
          <h2>Daily Task Report</h2>

          <div className="row">
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Calendar Week</label>
              <input
                placeholder="CW"
                onChange={(e) => setForm({ ...form, cw: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* WEEKLY TASK */}
        <div className="card">
          <h3>Weekly Task</h3>
          <textarea
            placeholder="Enter weekly task..."
            disabled={!isEditableDay()}
            onChange={(e) => setForm({ ...form, weeklyTask: e.target.value })}
          />
          {!isEditableDay() && (
            <p style={{ color: "red" }}>
              Weekly task can only be edited on Monday, Wednesday, and Friday.
            </p>
          )}
        </div>

        {/* TABLE */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Daily Activities</h3>
            <button className="btn btn-add" onClick={addRow}>
              Add Row
            </button>
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
              {form.activities.map((row, index) => (
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
          </table>
        </div>

        {/* SUBMIT */}
        <button className="btn btn-submit" onClick={handleSubmit}>
          Submit Report
        </button>
      </div>{" "}
    </Layout>
  );
}
