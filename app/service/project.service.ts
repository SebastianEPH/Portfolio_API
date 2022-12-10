import {Service} from 'typedi';
import {ProjectCreateDTO} from '../model/dto';
import {projectModel} from '../model/project.model';
import {MessageUtil} from '../utils/message';

@Service()
export class ProjectService {
    async create(projectCreate: ProjectCreateDTO): Promise<MessageUtil> {
        try {
            console.log('CREATE', projectCreate);
            const project = new projectModel(projectCreate);
            const result = await project.save();
            console.log(result);
            return projectCreate;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // async getAll(projectGetAll: ProjectGetAllDTO): Promise<MessageUtil> {
    //     const {} = projectGetAll;
    //     try {
    //         console.log('GET ALL', projectGetAll);
    //         return await projectModel.find({});
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
}
