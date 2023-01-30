import {Service} from 'typedi';
import tools from '../model/tools.model';

const {programmingLanguagesModel} = tools

@Service()
export class ProgrammingLanguageService {

    async create(programmingLanguage) {
        try {
            const language = await programmingLanguagesModel.create(programmingLanguage);
            await language.save();
            console.log(language);
            return language
        } catch (error) {
            console.error('Error => ', error);
            throw error;
        }
    }


}