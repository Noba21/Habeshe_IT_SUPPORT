import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ChatWindow from '../../components/ChatWindow';
import { getUploadUrl } from '../../utils/photoUrl';

export default function TechnicianIssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [outsourcingNote, setOutsourcingNote] = useState('');
  const [outsourcingFile, setOutsourcingFile] = useState(null);
  const [uploadingOutsourcingShot, setUploadingOutsourcingShot] = useState(false);
  const [loading, setLoading] = useState(true);

  const MATERIALS = [
    { key: 'cable', label: 'Cable' },
    { key: 'hard_disk', label: 'Hard disk' },
    { key: 'ram', label: 'RAM' },
    { key: 'keyboard_mouse', label: 'Keyboard and mouse' },
    { key: 'toner', label: 'Toner' },
    { key: 'switch', label: 'Switch' },
  ];

  useEffect(() => {
    api.get(`/issues/${id}`).then(({ data }) => {
      setIssue(data.issue);
      setResolutionNote(data.issue?.resolution_note || '');
      setOutsourcingNote(data.issue?.outsourcing_note || '');
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

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

  function getMaterialSet(currentIssue) {
    if (!currentIssue?.material_requirements) return new Set();
    return new Set(
      String(currentIssue.material_requirements)
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
    );
  }

  async function toggleMaterial(key) {
    if (!issue) return;
    try {
      const set = getMaterialSet(issue);
      if (set.has(key)) {
        set.delete(key);
      } else {
        set.add(key);
      }
      const material_requirements = Array.from(set).join(',');
      await api.put(`/issues/${id}`, { material_requirements });
      setIssue((i) => (i ? { ...i, material_requirements } : i));
    } catch (e) {
      console.error(e);
    }
  }

  async function updateOutsourcingFlag(checked) {
    if (!issue) return;
    try {
      const needs_outsourcing = checked ? 1 : 0;
      await api.put(`/issues/${id}`, { needs_outsourcing, outsourcing_note: outsourcingNote });
      setIssue((i) => (i ? { ...i, needs_outsourcing } : i));
    } catch (e) {
      console.error(e);
    }
  }

  async function saveOutsourcingNote() {
    if (!issue) return;
    try {
      await api.put(`/issues/${id}`, {
        needs_outsourcing: issue.needs_outsourcing ?? 0,
        outsourcing_note: outsourcingNote,
      });
      setIssue((i) => (i ? { ...i, outsourcing_note: outsourcingNote } : i));
    } catch (e) {
      console.error(e);
    }
  }

  async function uploadOutsourcingScreenshot(files) {
    const list = Array.from(files || []).filter(Boolean);
    if (!issue || list.length === 0) return;
    try {
      setUploadingOutsourcingShot(true);
      for (const file of list) {
        const formData = new FormData();
        formData.append('outsourcing_screenshot', file);
        const { data } = await api.put(`/issues/${id}/outsourcing-screenshot`, formData);
        setIssue(data.issue);
      }
      setOutsourcingFile(null);
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingOutsourcingShot(false);
    }
  }

  if (loading || !issue) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">← Back</button>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold">{issue.title}</h1>
        <p className="text-gray-500 mt-1">
          {issue.department_name} • {issue.user_name} • {issue.user_email}
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
        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <select value={issue.status} onChange={(e) => updateStatus(e.target.value)} className="px-3 py-1 border rounded">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={issue.status === 'resolved'}
              onChange={(e) => updateStatus(e.target.checked ? 'resolved' : 'in_progress')}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm font-medium">Mark task as finished</span>
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Resolution note</label>
          <textarea value={resolutionNote} onChange={(e) => setResolutionNote(e.target.value)} rows={3} className="w-full px-4 py-2 border rounded" />
          <button onClick={saveResolution} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
        <div className="mt-6 border-t pt-4">
          <h2 className="text-sm font-semibold mb-2">Material requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MATERIALS.map((m) => {
              const set = getMaterialSet(issue);
              const checked = set.has(m.key);
              return (
                <label key={m.key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleMaterial(m.key)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{m.label}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="mt-6 border-t pt-4">
          <h2 className="text-sm font-semibold mb-2">Outsourcing</h2>
          <label className="flex items-center gap-2 text-sm cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={!!issue.needs_outsourcing}
              onChange={(e) => updateOutsourcingFlag(e.target.checked)}
              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <span>Needs new material purchase (outsourcing)</span>
          </label>
          <label className="block text-sm font-medium mb-1">Outsourcing note</label>
          <textarea
            value={outsourcingNote}
            onChange={(e) => setOutsourcingNote(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded"
            placeholder="Describe what needs to be purchased and why..."
          />
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">Outsourcing screenshot (optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setOutsourcingFile(files[0]);
                  uploadOutsourcingScreenshot(files);
                }
              }}
              className="w-full px-4 py-2 border rounded file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-amber-500 file:text-slate-900"
              disabled={uploadingOutsourcingShot}
            />
            {uploadingOutsourcingShot && (
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            )}
            {issue.outsourcing_screenshot && (
              <div className="mt-3 flex flex-wrap gap-3">
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
            )}
          </div>
          <button
            onClick={saveOutsourcingNote}
            className="mt-2 px-4 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 text-sm"
          >
            Save outsourcing info
          </button>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Chat</h2>
        <ChatWindow issueId={parseInt(id)} />
      </div>
    </div>
  );
}
