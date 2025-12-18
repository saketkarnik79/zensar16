import Project from "../Project";

const baseUrl = 'http://localhost:9090/projects';

function translateStatusToErrorMessage(status: number): string{
    switch(status){
        case 401: return 'Please login again.';
        case 403: return 'You do not have permission to view the project(s).'
        default: return 'There was an error retrieving the project(s). Please try again.';
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkStatus(response: any){
    if(response.ok){
        return response;
    }
    else{
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        };
        console.log(`Log server http error: ${JSON.stringify(httpErrorInfo)}`);

        const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response){
    return response.json();
}

// function delay(ms: number){
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return function(x: any): Promise<any> {
//         return new Promise((resolve) => setTimeout(() => resolve(x), ms));
//     };
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToProjectModel(item: any): Project {
    return new Project(item);
}

function convertToProjectModels(res: { data: unknown[] }): Project[]{
    const projects: Project[] = (res.data as unknown[]).map(convertToProjectModel);
    return projects;
}

const projectAPI = {
    get(page = 1, limit = 20){
        return fetch(`${baseUrl}?_page=${page}&_per_page=${limit}`)
            // .then(delay(1000))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                console.log(`Log client error: ${error}`);
                throw new Error('There was an error retrieving the projects. Please try again.');
            });
    },
    put(project: Project){
         return fetch(`${baseUrl}/${project.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
         })
            // .then(delay(1000))
            .then(checkStatus)
            .then(parseJSON)
            .catch((error: TypeError) => {
                console.log(`Log client error: ${error}`);
                throw new Error('There was an error updating the project. Please try again.');
            });
    },
    find(id: number){
         return fetch(`${baseUrl}/${id}`)
            // .then(delay(1000))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModel)
            .catch((error: TypeError) => {
                console.log(`Log client error: ${error}`);
                throw new Error('There was an error retrieving the project. Please try again.');
            });
    }
};
export {projectAPI};