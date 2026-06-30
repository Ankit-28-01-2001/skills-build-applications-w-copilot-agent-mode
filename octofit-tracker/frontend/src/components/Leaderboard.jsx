import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p className="p-4">Loading leaderboard...</p>;
  if (error) return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Leaderboard</h3>
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li key={entry._id || entry.user} className="list-group-item d-flex justify-content-between">
              <span>{entry.user}</span>
              <strong>{entry.score}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
