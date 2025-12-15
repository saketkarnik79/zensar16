//import MOCK_PROJECTS from "./MockProjects";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { useState, useEffect } from "react";
import { projectAPI } from "./services/projectAPI";

function ProjectsPage(){
    //const [projects, setProjects]=useState<Project[]>(MOCK_PROJECTS);
    const [projects, setProjects]=useState<Project[]>([]);
    const [loading, setLoading]=useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try{
                //const data= await projectAPI.get(1, 9);
                const data= await projectAPI.get(currentPage, 9);
                setError('');
                //setProjects(data);
                if(currentPage === 1){
                    setProjects(data);
                }
                else{
                    setProjects((projects) => [...projects, ...data])
                }
            }
            catch(err){
                if(err instanceof Error){
                    setError(err.message);
                }
            }
            finally{
                setLoading(false);
            }
        };
        loadProjects();
    //}, []);
    }, [currentPage]);

    const handleMoreClick = () => {

        setCurrentPage((currentPage)=> currentPage + 1);
    };

    const handleSave = (project: Project) => {
          console.log(project);
        //console.log("Saving project:", project);
        // Implement save logic here
        // const updatedProjects = projects.map((p: Project) => {
        //     return p.id === project.id ? project : p;
        // });
        // setProjects(updatedProjects);
        projectAPI.put(project)
            .then((updatedProject) => {
                    const updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? new Project(updatedProject) : p;
                });
                setProjects(updatedProjects);
            })
            .catch((err) => {
                if(err instanceof Error){
                    setError(err.message);
                }
            });
    }

    return (
        <>
            <h1>Projects</h1>
            <hr/>
            {/* <pre>
                {JSON.stringify(MOCK_PROJECTS, null, 2)}
            </pre> */}

            {
                error && (
                    <div className="row">
                        <div className="card large error">
                            <section>
                                <p>
                                    <span className="icon-alert inverse">
                                        {error}
                                    </span>
                                </p>
                            </section>
                        </div>
                    </div>
                )
            }

            {/* <ProjectList projects={MOCK_PROJECTS} onSave={handleSave} /> */}
            <ProjectList projects={projects} onSave={handleSave} />
            {
                !loading && !error && (
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="button-group fluid">
                                <button className="button default" onClick={handleMoreClick}>
                                    More Projects...
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                loading && (
                    <div className="center-page">
                        <span className="spinner primary"></span>
                        <p>Loading...</p>
                    </div>
                )
            }
        </>
    );
}

export default ProjectsPage;