import Project from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { useState } from "react";

interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

//function ProjectList({ projects }: ProjectListProps) {
function ProjectList({ projects, onSave }: ProjectListProps) {

    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        //console.log("Edit project:", project);
        setProjectBeingEdited(project);
    };

    const cancelEditing = () => {
        setProjectBeingEdited({});
    }

    return(
        <>  
            {/* <pre>
                {JSON.stringify(projects, null, 2)}
            </pre> */}

            {/* <ul className="row">
                { projects.map((project) => (
                    <li key={project.id} className="col-md-4 mb-3">
                        {project.name}
                    </li>
                )) }
            </ul> */}

            <div className="row">
                { projects.map((project) => (
                    <div key={project.id} className="cols-sm">
                        {/* <div className="card">
                            <img 
                                src={project.imageUrl} 
                                className="card-img-top"
                                alt={project.name} 
                            />
                            <section className="section dark">
                                <h5 className="strong">
                                    <strong>{project.name}</strong>
                                </h5>
                                <p>{project.description}</p>
                                <p>Budget: {project.budget.toLocaleString()}</p>
                            </section>
                        </div> */}
                        {/* <ProjectCard project={project} onEdit={handleEdit} />
                        <ProjectForm /> */}
                        {
                            project === projectBeingEdited 
                            ? (<ProjectForm onCancel={cancelEditing} onSave={onSave} />)
                            : (<ProjectCard project={project} onEdit={handleEdit} />)
                        }
                    </div>
                )) }
            </div>
        </>
    )
}

export default ProjectList;