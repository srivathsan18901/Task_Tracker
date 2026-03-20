import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 style={{ marginBottom: "20px" }}>Welcome back 👋</h1>

      <div style={styles.grid}>
        <div className="card">
          <h3>Weekly Progress</h3>
          <p style={styles.bigText}>15.1 hrs</p>
        </div>

        <div className="card">
          <h3>Time Tracker</h3>
          <p style={styles.bigText}>06:27:51</p>
        </div>

        <div className="card">
          <h3>Daily Summary</h3>
          <p>Focus: 55%</p>
          <p>Meetings: 25%</p>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },
  bigText: {
    fontSize: "28px",
    marginTop: "10px"
  }
};