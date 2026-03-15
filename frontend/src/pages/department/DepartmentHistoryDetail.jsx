import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ChatWindow from '../../components/ChatWindow';
import { getUploadUrl } from '../../utils/photoUrl';

export default function DepartmentHistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/issues/${id}`).then(({ data }) => setIssue(data.issue)).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  async function setFeedback(feedback) {
    try {
      await api.put(`/issues/${id}/feedback`, { feedback });
      setIssue((i) => ({ ...i, user_feedback: feedback }));
    } catch (e) {
      console.error(e);
    }
  }

  if (loading || !issue) return <div className="p-6">Loading...</div>;

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
          {issue.department_name} • {issue.created_at?.slice(0, 10)}
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
        {issue.material_requirements && getMaterialLabels(issue.material_requirements).length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Materials required</h3>
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
        {issue.needs_outsourcing && (
          <div className="mt-4 p-3 rounded border border-amber-300 bg-amber-50">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">Outsourcing</h3>
            <p className="text-sm text-amber-900 font-medium">IT support needs to purchase new material to fix this issue.</p>
            <p className="text-sm text-gray-800 mt-1">
              {issue.outsourcing_note || 'No additional details provided.'}
            </p>
          </div>
        )}
        <p className="mt-4"><span className="font-medium">Status:</span> <span className={`px-2 py-0.5 rounded text-sm ${issue.status === 'resolved' ? 'bg-green-100' : 'bg-yellow-100'}`}>{issue.status}</span></p>
        {issue.technician_name && <p className="mt-2"><span className="font-medium">Technician:</span> {issue.technician_name}</p>}
        {issue.resolution_note && <p className="mt-4 p-3 bg-gray-50 rounded"><span className="font-medium">Resolution:</span> {issue.resolution_note}</p>}
        {issue.status === 'resolved' && (
          <div className="mt-4">
            <p className="font-medium mb-2">
              {issue.user_feedback ? <>Your feedback: <span className={issue.user_feedback === 'fixed' ? 'text-green-700' : 'text-red-700'}>{issue.user_feedback === 'fixed' ? 'Fixed' : 'Not fixed'}</span>. You can change it below.</> : 'Was this issue fixed?'}
            </p>
            <div className="flex gap-4">
              <button onClick={() => setFeedback('fixed')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Fixed</button>
              <button onClick={() => setFeedback('not_fixed')} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Not Fixed</button>
            </div>
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
