import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <p className="p-4">Loading workouts...</p>;
  if (error) return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Workouts</h3>
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id || workout.title} className="list-group-item">
              <strong>{workout.title}</strong>
              <div className="text-muted">{workout.difficulty} · {workout.duration} min</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
