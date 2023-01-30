import {Service} from 'typedi';
import tools from '../model/tools.model';

const {librariesModel} = tools

@Service()
export class LibrariesService {

    async create(libraryObject) {
        try {
            const library = await librariesModel.create(libraryObject);
            const result = await library.save();
            console.log(result);
            return library
        } catch (error) {
            console.error('Error => ', error);
            throw error;
        }
    }
}