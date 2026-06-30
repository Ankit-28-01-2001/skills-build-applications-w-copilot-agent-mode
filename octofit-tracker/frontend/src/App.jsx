import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier app for tracking activity, building teams, and staying motivated.
              </p>
              <p className="text-muted small">
                Define VITE_CODESPACE_NAME in .env.local to use Codespaces URLs; otherwise localhost is used.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Link className="btn btn-primary btn-lg" to="/users">Explore users</Link>
                <Link className="btn btn-outline-secondary btn-lg" to="/activities">View activities</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4"><Activities /></div>
        <div className="col-md-4"><Teams /></div>
        <div className="col-md-4"><Leaderboard /></div>
      </div>
      <div className="row g-4 mt-2">
        <div className="col-md-6"><Users /></div>
        <div className="col-md-6"><Workouts /></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;
