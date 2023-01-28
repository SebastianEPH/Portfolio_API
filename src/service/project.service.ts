import {Service} from 'typedi';
import {connectDatabase} from '../database/conecction_';
import projectModel from '../model/project.model';
import {MessageUtil} from '../utils/message';

@Service()
export class ProjectService {
    async create(projectCreate){
        try {
            // await connectDatabase();
            // console.log('project --- : ',projectCreate)
            const project = await projectModel.create(projectCreate);
            const result = await project.save();
            console.log(result);
            return project
        } catch (error) {
            console.error('Error => ', error);
            throw error;
        }
    }

    async getAll(): Promise<MessageUtil> {
        try {
            // return await ProjectModel.findAll();
            await connectDatabase();
            return await projectModel.find();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
