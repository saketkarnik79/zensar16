import { useDispatch } from "react-redux";
import Project from "./Project";
import { type SyntheticEvent, useState } from "react";
import { saveProject } from "./state/projectActions";
import {type ThunkDispatch } from "redux-thunk";
import { type ProjectState } from "./state/projectTypes";
import { type AnyAction } from "redux";

interface ProjectFormProps {
    onCancel:() => void;
    //onSave: (project: Project) => void;
    project: Project;
}

//function ProjectForm() {
//function ProjectForm({onCancel}: ProjectFormProps) {
//function ProjectForm({onCancel, onSave}: ProjectFormProps) {
//function ProjectForm({onCancel, onSave, project: initialProject}: ProjectFormProps) {
function ProjectForm({onCancel, project: initialProject}: ProjectFormProps) {

    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({name: '', description: '', budget: ''});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    function validate(project: Project){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = {name: '', description: '', budget: ''};
        if(project.name.length === 0){
            errors.name = 'Name is required.'
        }
        if(project.name.length>0 && project.name.length < 3){
            errors.name = 'Nsme needs to be at least 3 characters.'
        }
        if(project.description.length === 0){
            errors.description='Description is required.'
        }
        if(project.budget === 0){
            errors.budget = 'Budget must be more than $0.'
        } 
        return errors;       
    }

    function isValid(){
        return(
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0 
        );
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        //onSave(new Project({name: 'Updated Project'}));
        // onSave(project);
        if(!isValid){
            return;
        }
      
        //onSave(project);
        dispatch(saveProject(project));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const {type, name, value, checked} = e.target;
        let updatedValue= (type==='checkbox') ? checked : value;
        if(type === 'number'){
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue
        };
        let updatedProject: Project;

        setProject((p) => {
            updatedProject =new Project({...p, ...change});
            return updatedProject;
        });

        setErrors(() => { 
            return validate(updatedProject);
        });
    }

    return (
        <>
            <form className="input-group vertical" onSubmit={handleSubmit}>
                <label htmlFor="name">Project Name</label>
                <input type="text" id="name" name="name" onChange={handleChange}
                    placeholder="Enter project name" value={project.name}/>
                {
                    errors.name.length > 0 && (
                        <div className="card error">
                            <p>{errors.name}</p>
                        </div>
                    )
                }
                <label htmlFor="description">Project Description</label>
                <textarea id="description" name="description" onChange={handleChange}
                    placeholder="Enter project description" value={project.description}></textarea>
                {
                    errors.description.length > 0 && (
                        <div className="card error">
                            <p>{errors.description}</p>
                        </div>
                    )
                }
                <label htmlFor="budget">Project Budget</label>
                <input type="number" id="budget" name="budget" onChange={handleChange}
                    placeholder="Enter project budget" value={project.budget} />
                {
                    errors.budget.length > 0 && (
                        <div className="card error">
                            <p>{errors.budget}</p>
                        </div>
                    )
                }
                <label htmlFor="isActive">Project Active?</label>
                <input type="checkbox" id="isActive" name="isActive" onChange={handleChange}
                    placeholder="Project Active?" checked={project.isActive} />
                <div className="input-group">
                    <button type="submit" className="primary bordered medium">Save Project</button>
                    <span/>
                    <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
                </div>                
            </form>
        </>
    );
}

export default ProjectForm;