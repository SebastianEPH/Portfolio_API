import {Service} from 'typedi';
import projectModel from '../model/project.model';
import {MessageUtil} from '../utils/message';

@Service()
export class ProjectService {
    async create(projectCreate) {
        try {
            // await connectDatabase();
            // console.log('project --- : ',projectCreate)
            const project = await projectModel.create(projectCreate);
            await project.save();
            console.log(project);
            return project
        } catch (error) {
            console.error('Error => ', error);
            throw error;
        }
    }

    async getAll(): Promise<MessageUtil> {
        try {
            // return await ProjectModel.findAll();
            return await projectModel.find()
                .populate([
                    {
                        path: 'programming_languages',
                        select: '-_id -__v'
                    }, {
                        path: 'frameworks',
                        select: '-_id -__v'
                    }, {
                        path: 'libraries',
                        select: '-_id -__v'
                    }]
                )
                .exec()
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
