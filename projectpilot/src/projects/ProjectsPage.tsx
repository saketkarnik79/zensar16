import MOCK_PROJECTS from "./MockProjects";
import ProjectList from "./ProjectList";
import Project from "./Project";

function ProjectsPage(){

    const handleSave = (project: Project) => {
        console.log("Saving project:", project);
        // Implement save logic here
    }

    return (
        <>
            <h1>Projects</h1>
            <hr/>
            {/* <pre>
                {JSON.stringify(MOCK_PROJECTS, null, 2)}
            </pre> */}
            <ProjectList projects={MOCK_PROJECTS} onSave={handleSave} />
        </>
    );
}

export default ProjectsPage;