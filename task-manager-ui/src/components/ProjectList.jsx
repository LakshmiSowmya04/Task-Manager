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
          setProjects(data.data || []);
        };
        fetchProjects();
      }, []);
  return (
    <div className="section projects-section">
      <div className="section2">
        <button
          className={`p-3 px-10 border text-white mt-10 w-full md:w-96 mb-0 ml-0 md:ml-10 rounded-lg font-semibold text-xl ${
            showProjectForm
              ? "bg-red-400 border-red-900"
              : "bg-blue-500 border-green-500"
          } ${showProjectForm ? " close" : ""} transition-all duration-300`}
          onClick={() => setShowProjectForm(!showProjectForm)}
        >
          {showProjectForm ? (
            <div className="flex">
              {/* Random icon for time being . Change later */}
              <img className="h-5 mt-[5px] mr-3" src="/images/closeicon.png" />
              Close Form
            </div>
          ) : (
            <div className="flex">
              {/* Random icon for time being . Change later */}
              <img className="h-8 mr-3" src="/images/plusIcon.png" /> Add New
              Project
            </div>
          )}
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
  );
}

export default ProjectList;
