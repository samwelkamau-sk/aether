import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projectsAPI, tasksAPI, aiAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, tasks: 0, pending: 0, completed: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [aiTip, setAiTip] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, tasksRes, tipsRes] = await Promise.all([
          projectsAPI.getAll(),
          tasksAPI.getAll(),
          aiAPI.getTips(),
        ]);
        
        const projects = projectsRes.data.projects || [];
        const tasks = tasksRes.data.tasks || [];
        
        setStats({
          projects: projects.length,
          tasks: tasks.length,
          pending: tasks.filter(t => t.status === 'pending').length,
          completed: tasks.filter(t => t.status === 'completed').length,
        });
        
        setRecentProjects(projects.slice(0, 3));
        setRecentTasks(tasks.slice(0, 5));
        setAiTip(tipsRes.data.tips || '');
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001711] flex items-center justify-center">
        <div className="text-brand-emerald text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001711]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#c2ebdc] mb-4">
            Welcome back, {user?.username}
          </h1>
          <p className="text-[#86948a] text-lg">Here's what's happening with your projects today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Projects', value: stats.projects, color: 'text-brand-emerald' },
            { label: 'Total Tasks', value: stats.tasks, color: 'text-brand-seafoam' },
            { label: 'Pending', value: stats.pending, color: 'text-brand-gold' },
            { label: 'Completed', value: stats.completed, color: 'text-brand-emerald' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#002018] border border-brand-emerald/10 rounded-2xl p-6">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-[#86948a] text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* AI Tip */}
        {aiTip && (
          <div className="bg-brand-forest/20 border border-brand-emerald/20 rounded-2xl p-6 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-emerald/20 flex items-center justify-center text-brand-emerald flex-shrink-0">
                ✦
              </div>
              <div>
                <h3 className="text-brand-seafoam font-semibold mb-1">AI Productivity Insight</h3>
                <p className="text-[#86948a] whitespace-pre-line">{aiTip}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#c2ebdc]">Recent Projects</h2>
              <Link to="/projects" className="text-brand-emerald text-sm hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {recentProjects.length === 0 ? (
                <p className="text-[#86948a] py-8 text-center">No projects yet. Create your first project!</p>
              ) : (
                recentProjects.map((project) => (
                  <Link key={project.id} to={`/projects/${project.id}`} className="block bg-[#002018] border border-brand-emerald/10 rounded-xl p-5 hover:border-brand-emerald/30 transition-all">
                    <h3 className="text-[#c2ebdc] font-semibold mb-1">{project.name}</h3>
                    <p className="text-[#86948a] text-sm line-clamp-1">{project.description || 'No description'}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-[#86948a]">
                      <span className="px-2 py-1 rounded-full bg-brand-forest/30 text-brand-seafoam">{project.status}</span>
                      <span>{project.task_count} tasks</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent Tasks */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#c2ebdc]">Recent Tasks</h2>
              <Link to="/tasks" className="text-brand-emerald text-sm hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {recentTasks.length === 0 ? (
                <p className="text-[#86948a] py-8 text-center">No tasks yet. Create your first task!</p>
              ) : (
                recentTasks.map((task) => (
                  <div key={task.id} className="bg-[#002018] border border-brand-emerald/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-[#c2ebdc] font-medium">{task.title}</h4>
                      <p className="text-[#86948a] text-xs mt-1">Project #{task.project_id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' ? 'bg-brand-emerald/20 text-brand-seafoam' :
                      task.status === 'in_progress' ? 'bg-brand-gold/20 text-brand-gold' :
                      'bg-brand-forest/30 text-[#86948a]'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
