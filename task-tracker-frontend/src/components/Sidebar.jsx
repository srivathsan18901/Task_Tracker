import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={{ marginBottom: "30px" }}>⚡ TaskFlow</h2>

      <Link to="/dashboard" style={styles.link}>Overview</Link>
      <Link to="/create-report" style={styles.link}>Daily Report</Link>

      <hr style={{ margin: "20px 0", borderColor: "#333" }} />

      <Link to="/" style={styles.link}>Logout</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#0b0d12",
    padding: "20px",
    borderRight: "1px solid #222"
  },
  link: {
    display: "block",
    marginBottom: "15px",
    color: "#aaa",
    textDecoration: "none"
  }
};