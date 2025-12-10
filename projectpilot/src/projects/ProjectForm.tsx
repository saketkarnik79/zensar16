import Project from "./Project";
import { type SyntheticEvent } from "react";

interface ProjectFormProps {
    onCancel:() => void;
    onSave: (project: Project) => void;
}

//function ProjectForm() {
//function ProjectForm({onCancel}: ProjectFormProps) {
function ProjectForm({onCancel, onSave}: ProjectFormProps) {

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        onSave(new Project({name: 'Updated Project'}));
    }

    return (
        <>
            <form className="input-group vertical" onSubmit={handleSubmit}>
                <label htmlFor="name">Project Name</label>
                <input type="text" id="name" name="name" placeholder="Enter project name" />
                <label htmlFor="description">Project Description</label>
                <textarea id="description" name="description" placeholder="Enter project description"></textarea>
                <label htmlFor="budget">Project Budget</label>
                <input type="number" id="budget" name="budget" placeholder="Enter project budget" />
                <label htmlFor="isActive">Project Active?</label>
                <input type="checked" id="isActive" name="isActive" placeholder="Project Active?" />
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