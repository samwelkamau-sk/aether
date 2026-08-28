import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { tasksAPI, projectsAPI } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        tasksAPI.getAll(),
        projectsAPI.getAll(),
      ]);
      setTasks(tasksRes.data.tasks || []);
      setProjects(projectsRes.data.projects || []);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.create(title, projectId, description, status, priority);
      setTitle('');
      setDescription('');
      setProjectId('');
      setStatus('pending');
      setPriority('medium');
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create task');
    }
  };

  const handleUpdate = async (taskId, data) => {
    try {
      await tasksAPI.update(taskId, data);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksAPI.delete(taskId);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete task');
    }
  };

  const filteredTasks = selectedProject 
    ? tasks.filter(t => t.project_id === parseInt(selectedProject))
    : tasks;

  return (
    <div className="min-h-screen bg-[#001711]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#c2ebdc] mb-2">Tasks</h1>
            <p className="text-[#86948a]">Manage and track all your tasks</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-emerald to-brand-seafoam text-[#001711] font-semibold hover:shadow-lg hover:shadow-brand-emerald/20 transition-all"
          >
            {showForm ? 'Cancel' : 'New Task'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-[#002018] border border-brand-emerald/10 rounded-2xl p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#86948a] mb-2">Task Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                placeholder="Task title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#86948a] mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors resize-none"
                placeholder="Task details..."
                rows="3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#86948a] mb-2">Project</label>
                <select 
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#86948a] mb-2">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#86948a] mb-2">Priority</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <button type="submit" className="px-6 py-3 rounded-lg bg-brand-emerald text-[#001711] font-semibold hover:bg-brand-seafoam transition-colors">
              Create Task
            </button>
          </form>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#86948a] mb-2">Filter by Project</label>
          <select 
            value={selectedProject} 
            onChange={(e) => setSelectedProject(e.target.value)}
            className="bg-[#002018] border border-brand-emerald/20 rounded-lg px-4 py-2 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald"
          >
            <option value="">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-brand-emerald text-center py-12">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <p className="text-[#86948a] py-8 text-center">No tasks found</p>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-[#002018] border border-brand-emerald/10 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <Link to={`/projects/${task.project_id}`} className="text-brand-seafoam text-xs hover:underline">
                    {projects.find(p => p.id === task.project_id)?.name || 'Unknown Project'}
                  </Link>
                  <h4 className="text-[#c2ebdc] font-medium mt-1">{task.title}</h4>
                  <p className="text-[#86948a] text-sm mt-1">{task.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#86948a]">
                    <span className={`px-2 py-1 rounded-full ${
                      task.status === 'completed' ? 'bg-brand-emerald/20 text-brand-seafoam' :
                      task.status === 'in_progress' ? 'bg-brand-gold/20 text-brand-gold' :
                      'bg-brand-forest/30 text-[#86948a]'
                    }`}>{task.status}</span>
                    <span className="px-2 py-1 rounded-full bg-brand-forest/30 text-[#86948a]">{task.priority}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={task.status} 
                    onChange={(e) => handleUpdate(task.id, { status: e.target.value })}
                    className="bg-[#001711] border border-brand-emerald/20 rounded-lg px-3 py-2 text-xs text-[#c2ebdc] focus:outline-none focus:border-brand-emerald"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => handleDelete(task.id)} className="text-red-400 text-sm hover:text-red-300 px-3 py-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
