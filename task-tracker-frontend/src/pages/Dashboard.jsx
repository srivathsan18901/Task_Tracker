import Layout from "../components/Layout";
import WeeklyChart from "../components/WeeklyChart";
import TaskPieChart from "../components/TaskPieChart";
import PageWrapper from "../components/PageWrapper";

export default function Dashboard() {
  return (
    <Layout>
      <PageWrapper>
        <div className="card">
          <h1>Welcome back 👋</h1>
        </div>

        <div style={styles.grid}>
          <div className="card">
            <h3>Weekly Progress</h3>
            <WeeklyChart />
          </div>

          <div className="card">
            <h3>Time Distribution</h3>
            <TaskPieChart />
          </div>

          <div className="card">
            <h3>Quick Stats</h3>
            <p>Total Hours: 32h</p>
            <p>Tasks Completed: 18</p>
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
};
