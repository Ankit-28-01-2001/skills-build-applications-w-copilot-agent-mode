import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p className="p-4">Loading teams...</p>;
  if (error) return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Teams</h3>
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li key={team._id || team.name} className="list-group-item">
              <strong>{team.name}</strong>
              <div className="text-muted">Members: {team.members?.join(', ') || 'None'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
