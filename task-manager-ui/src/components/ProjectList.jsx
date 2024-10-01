import React, {useState , useEffect} from 'react'
import ProjectForm from './ProjectFrom';
function ProjectList() {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
          const response = await fetch("http://localhost:5000/projects");
          const data = await response.json();
          setProjects(data);
        };
        fetchProjects();
      }, []);
  return (
    <div className="section projects-section">
        <div className="section2">
        <button
          className={`toggle-button ${showProjectForm ? "close" : null}`}
          onClick={() => setShowProjectForm(!showProjectForm)}
        >
          {showProjectForm ? "Close Form" : "Add Project"}
        </button>
        {showProjectForm && <ProjectForm setProjects={setProjects} />}
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              {project.name}
              <span className="project-description">{project.description}</span>
            </li>
          ))}
        </ul>
        </div>
       </div>
  )
}

export default ProjectList
