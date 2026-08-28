import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projectsAPI } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.create(name, description);
      setName('');
      setDescription('');
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-[#001711]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#c2ebdc] mb-2">Projects</h1>
            <p className="text-[#86948a]">Manage your projects and track progress</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-emerald to-brand-seafoam text-[#001711] font-semibold hover:shadow-lg hover:shadow-brand-emerald/20 transition-all"
          >
            {showForm ? 'Cancel' : 'New Project'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-[#002018] border border-brand-emerald/10 rounded-2xl p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#86948a] mb-2">Project Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                placeholder="My Awesome Project"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#86948a] mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors resize-none"
                placeholder="Brief description..."
                rows="3"
              />
            </div>
            <button type="submit" className="px-6 py-3 rounded-lg bg-brand-emerald text-[#001711] font-semibold hover:bg-brand-seafoam transition-colors">
              Create Project
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-brand-emerald text-center py-12">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#86948a] text-lg mb-4">No projects yet</p>
            <button onClick={() => setShowForm(true)} className="text-brand-emerald hover:underline">Create your first project</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#002018] border border-brand-emerald/10 rounded-2xl p-6 hover:border-brand-emerald/30 transition-all group">
                <Link to={`/projects/${project.id}`}>
                  <h3 className="text-xl font-semibold text-[#c2ebdc] mb-2 group-hover:text-brand-emerald transition-colors">{project.name}</h3>
                  <p className="text-[#86948a] text-sm mb-4 line-clamp-2">{project.description || 'No description'}</p>
                  <div className="flex items-center gap-3 text-xs text-[#86948a]">
                    <span className="px-2 py-1 rounded-full bg-brand-forest/30 text-brand-seafoam">{project.status}</span>
                    <span>{project.task_count} tasks</span>
                  </div>
                </Link>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="mt-4 text-red-400 text-sm hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
