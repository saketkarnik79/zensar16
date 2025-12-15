import Project from "./Project";
import { projectAPI } from "./services/projectAPI";
import ProjectDetail from "./ProjectDetail";
import {useState, useEffect} from 'react';
import { useParams } from 'react-router';

function ProjectPage(){
    const [project, setProject] = useState<Project | null> (null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null> (null);

    const params = useParams();
    const id = Number(params.id);
    
    useEffect(() => {
        setLoading(true);
        projectAPI.find(id)
        .then((data) => setProject(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }, [id]);

    return(
        <>
            <div>
                <h1>Project Detail</h1>
                {
                    loading && (
                        <div className="center-page">
                            <span className="spinner primary"></span>
                            <p>Loading...</p>
                        </div>
                    )
                }

                <div className="row">
                    {
                        error && (
                            <div className="card large error">
                                <section>
                                    <p>
                                        <span className="icon-alert inverse"></span>
                                        {error}
                                    </p>
                                </section>
                            </div>
                        )
                    }
                </div>
                {
                    project && (
                        <ProjectDetail project={project} />
                    )
                }
            </div>
        </>
    );
}

export default ProjectPage;