import {Router} from "express";
import {projectController as project} from '../controllers';
import check from '../middleware/CheckField';

class ProjectRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        const {valide, projects_id} = check;

        this.router.get('/my/projects', project.queryGetAll, valide, project.getAll);
        this.router.post('/my/projects',  project.fieldsNew, valide, project.addNew); // project.fieldsNew, valide,
        this.router.get('/my/projects/:projects_id', projects_id, valide, project.getOne);
        this.router.put('/my/projects/:projects_id', projects_id, project.updatefrom, valide, project.updateOne);
        this.router.delete('/my/projects/:projects_id', projects_id, valide, project.remove);
    }
}

const projectRouter = new ProjectRouter()
export default projectRouter.router;