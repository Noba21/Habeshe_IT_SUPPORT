import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ChatWindow from '../../components/ChatWindow';
import { getUploadUrl } from '../../utils/photoUrl';

export default function AdminIssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [resolutionNote, setResolutionNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/issues/${id}`).then(({ data }) => {
      setIssue(data.issue);
      setResolutionNote(data.issue?.resolution_note || '');
    }).catch(console.error).finally(() => setLoading(false));
    api.get('/users/technicians').then(({ data }) => setTechnicians(data.users || []));
  }, [id]);

  async function assignTech(techId) {
    try {
      await api.put(`/issues/${id}`, { technician_id: techId || null, status: techId ? 'in_progress' : 'pending' });
      setIssue((i) => ({ ...i, technician_id: techId, technician_name: technicians.find((t) => t.id == techId)?.full_name, status: techId ? 'in_progress' : 'pending' }));
    } catch (e) { console.error(e); }
  }

  async function updateStatus(status) {
    try {
      await api.put(`/issues/${id}`, { status });
      setIssue((i) => ({ ...i, status }));
    } catch (e) { console.error(e); }
  }

  async function saveResolution() {
    try {
      await api.put(`/issues/${id}`, { resolution_note: resolutionNote });
      setIssue((i) => ({ ...i, resolution_note: resolutionNote }));
    } catch (e) { console.error(e); }
  }

  if (loading || !issue) return <div className="p-6">Loading...</div>;

  function formatLocation(location) {
    if (location === 'hq') return 'HQ';
    if (location === 'factory') return 'Factory';
    return location ? location : '-';
  }

  const MATERIALS = [
    { key: 'cable', label: 'Cable' },
    { key: 'hard_disk', label: 'Hard disk' },
    { key: 'ram', label: 'RAM' },
    { key: 'keyboard_mouse', label: 'Keyboard and mouse' },
    { key: 'toner', label: 'Toner' },
    { key: 'switch', label: 'Switch' },
  ];

  function getMaterialLabels(material_requirements) {
    if (!material_requirements) return [];
    const set = new Set(
      String(material_requirements)
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
    );
    return MATERIALS.filter((m) => set.has(m.key));
  }

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">← Back</button>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold">{issue.title}</h1>
        <p className="text-gray-500 mt-1">
          {issue.department_name}
          {' • '}
          {formatLocation(issue.user_location_type)}
          {' • '}
          {issue.user_name}
          {' • '}
          {issue.created_at?.slice(0, 10)}
          {issue.problem_type && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 capitalize">
              {issue.problem_type}
            </span>
          )}
        </p>
        <p className="mt-4">{issue.description}</p>
        {issue.screenshot && (
          <img
            src={getUploadUrl(issue.screenshot)}
            alt="Screenshot"
            className="mt-4 max-w-md rounded"
          />
        )}
        {issue.outsourcing_screenshot && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Outsourcing screenshots</h3>
            <div className="flex flex-wrap gap-3">
              {String(issue.outsourcing_screenshot)
                .split(',')
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p) => (
                  <img
                    key={p}
                    src={getUploadUrl(p)}
                    alt="Outsourcing screenshot"
                    className="max-w-[180px] rounded border"
                  />
                ))}
            </div>
          </div>
        )}
        {issue.material_requirements && getMaterialLabels(issue.material_requirements).length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Material requirements</h3>
            <div className="flex flex-wrap gap-2">
              {getMaterialLabels(issue.material_requirements).map((m) => (
                <span
                  key={m.key}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800"
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        )}
        {issue.needs_outsourcing ? (
          <div className="mt-4 p-3 rounded border border-amber-300 bg-amber-50">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">Outsourcing</h3>
            <p className="text-sm text-amber-900 font-medium">Outsourcing required (new material purchase).</p>
            <p className="text-sm text-gray-800 mt-1">
              {issue.outsourcing_note || 'No note provided.'}
            </p>
          </div>
        ) : (
          issue.outsourcing_note && (
            <div className="mt-4 p-3 rounded border border-slate-200 bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Outsourcing note</h3>
              <p className="text-sm text-gray-800">{issue.outsourcing_note}</p>
            </div>
          )
        )}
        <div className="mt-4 flex gap-4 flex-wrap">
          <select value={issue.technician_id || ''} onChange={(e) => assignTech(e.target.value || null)} className="px-3 py-1 border rounded">
            <option value="">Assign technician</option>
            {technicians.map((t) => <option key={t.id} value={t.id}>{t.full_name}</option>)}
          </select>
          <select value={issue.status} onChange={(e) => updateStatus(e.target.value)} className="px-3 py-1 border rounded">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Resolution note</label>
          <textarea value={resolutionNote} onChange={(e) => setResolutionNote(e.target.value)} rows={3} className="w-full px-4 py-2 border rounded" />
          <button onClick={saveResolution} className="mt-2 px-4 py-1 bg-slate-700 text-white rounded hover:bg-slate-600">Save</button>
        </div>
        {issue.status === 'resolved' && (
          <div className="mt-4 p-4 rounded border-2 border-amber-200 bg-amber-50">
            <h3 className="font-semibold text-gray-800 mb-1">Client feedback</h3>
            {issue.user_feedback ? (
              <p className={issue.user_feedback === 'fixed' ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                {issue.user_feedback === 'fixed' ? 'Fixed — client confirmed the issue is resolved.' : 'Not fixed — client says the issue is not resolved.'}
              </p>
            ) : (
              <p className="text-gray-600">No feedback yet. The client can mark this as Fixed or Not fixed from their History page.</p>
            )}
          </div>
        )}
      </div>
      <div>
        <h2 className="font-semibold mb-2">Chat</h2>
        <ChatWindow issueId={parseInt(id)} />
      </div>
    </div>
  );
}
