import React, {useState , useEffect} from 'react'
import ProjectForm from './ProjectFrom';
import { backendApi } from "../config";

function ProjectList() {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
          const response = await fetch(backendApi + "/api/v1/projects");
          const data = await response.json();
          setProjects(data.data);
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
