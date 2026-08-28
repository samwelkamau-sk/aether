import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projectsAPI, tasksAPI, aiAPI } from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        projectsAPI.getOne(id),
        projectsAPI.getTasks(id),
      ]);
      setProject(projectRes.data.project);
      setTasks(tasksRes.data.tasks || []);
    } catch (err) {
      console.error('Failed to fetch project', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.create(taskTitle, id, taskDescription, taskStatus, taskPriority);
      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('pending');
      setTaskPriority('medium');
      setShowTaskForm(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, data) => {
    try {
      await tasksAPI.update(taskId, data);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksAPI.delete(taskId);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete task');
    }
  };

  const handleAISuggest = async () => {
    try {
      const res = await aiAPI.suggestPriority(taskTitle, taskDescription);
      setAiSuggestion(res.data.suggestion);
    } catch (err) {
      alert('AI suggestion failed');
    }
  };

  const handleEnhanceTask = async () => {
    try {
      const res = await aiAPI.enhanceTask(taskTitle, taskDescription);
      const data = JSON.parse(res.data.enhancement);
      setTaskTitle(data.enhanced_title);
      setTaskDescription(data.enhanced_description);
    } catch (err) {
      alert('AI enhancement failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001711] flex items-center justify-center">
        <div className="text-brand-emerald text-xl">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#001711] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#86948a] mb-4">Project not found</p>
          <Link to="/projects" className="text-brand-emerald hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001711]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/projects" className="text-brand-emerald text-sm hover:underline mb-4 inline-block">← Back to Projects</Link>
          <h1 className="text-4xl font-bold text-[#c2ebdc] mb-2">{project.name}</h1>
          <p className="text-[#86948a]">{project.description || 'No description'}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#c2ebdc]">Tasks</h2>
          <button 
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-emerald to-brand-seafoam text-[#001711] font-semibold hover:shadow-lg hover:shadow-brand-emerald/20 transition-all"
          >
            {showTaskForm ? 'Cancel' : 'New Task'}
          </button>
        </div>

        {showTaskForm && (
          <form onSubmit={handleCreateTask} className="bg-[#002018] border border-brand-emerald/10 rounded-2xl p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#86948a] mb-2">Task Title</label>
              <input 
                type="text" 
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                placeholder="Task title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#86948a] mb-2">Description</label>
              <textarea 
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors resize-none"
                placeholder="Task details..."
                rows="3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#86948a] mb-2">Status</label>
                <select 
                  value={taskStatus} 
                  onChange={(e) => setTaskStatus(e.target.value)}
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
                  value={taskPriority} 
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="w-full bg-[#001711] border border-brand-emerald/20 rounded-lg px-4 py-3 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-3 rounded-lg bg-brand-emerald text-[#001711] font-semibold hover:bg-brand-seafoam transition-colors">
                Create Task
              </button>
              <button type="button" onClick={handleAISuggest} className="px-6 py-3 rounded-lg bg-brand-forest/30 text-brand-seafoam font-medium hover:bg-brand-forest/50 transition-colors">
                AI Suggest Priority
              </button>
              <button type="button" onClick={handleEnhanceTask} className="px-6 py-3 rounded-lg bg-brand-forest/30 text-brand-seafoam font-medium hover:bg-brand-forest/50 transition-colors">
                AI Enhance
              </button>
            </div>
            {aiSuggestion && (
              <div className="bg-brand-emerald/10 border border-brand-emerald/20 rounded-lg p-4 text-sm text-brand-seafoam">
                <strong>AI Suggestion:</strong> {aiSuggestion}
              </div>
            )}
          </form>
        )}

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-[#86948a] py-8 text-center">No tasks yet. Create your first task!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="bg-[#002018] border border-brand-emerald/10 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-[#c2ebdc] font-medium">{task.title}</h4>
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
                    onChange={(e) => handleUpdateTask(task.id, { status: e.target.value })}
                    className="bg-[#001711] border border-brand-emerald/20 rounded-lg px-3 py-2 text-xs text-[#c2ebdc] focus:outline-none focus:border-brand-emerald"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => handleDeleteTask(task.id)} className="text-red-400 text-sm hover:text-red-300 px-3 py-2">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
