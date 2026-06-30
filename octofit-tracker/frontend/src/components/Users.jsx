import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Users</h3>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id || user.username} className="list-group-item">
              <strong>{user.username}</strong> <span className="text-muted">({user.role})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
