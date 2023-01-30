import {Service} from 'typedi';
import tools from '../model/tools.model';

const {frameworksModel} = tools

@Service()
export class FrameworksService {

    async create(frameworkObject) {
        try {
            const framework = await frameworksModel.create(frameworkObject);
            await framework.save();
            console.log(framework,'------------------------- Esto es framwrok \n\n\n\n\\n---------------------');
            return framework.toObject();
        } catch (error) {
            console.error('Error => ', error);
            throw error;
        }
    }
}