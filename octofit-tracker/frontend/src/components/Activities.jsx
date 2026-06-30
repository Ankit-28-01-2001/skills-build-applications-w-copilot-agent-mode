import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p className="p-4">Loading activities...</p>;
  if (error) return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Activities</h3>
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id || activity.name} className="list-group-item">
              <strong>{activity.name}</strong>
              <div className="text-muted">{activity.duration} min</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
