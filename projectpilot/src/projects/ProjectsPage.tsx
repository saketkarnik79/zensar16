import MOCK_PROJECTS from "./MockProjects";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { useState } from "react";

function ProjectsPage(){
    const [projects, setProjects]=useState<Project[]>(MOCK_PROJECTS);

    const handleSave = (project: Project) => {
        //console.log("Saving project:", project);
        // Implement save logic here
        const updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    }

    return (
        <>
            <h1>Projects</h1>
            <hr/>
            {/* <pre>
                {JSON.stringify(MOCK_PROJECTS, null, 2)}
            </pre> */}
            {/* <ProjectList projects={MOCK_PROJECTS} onSave={handleSave} /> */}
            <ProjectList projects={projects} onSave={handleSave} />
        </>
    );
}

export default ProjectsPage;