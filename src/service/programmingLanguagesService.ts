import {Service} from 'typedi';
import validator from 'validator';
import {helpers} from '../helpers/util.helper';
import {ToolInterface} from '../interfaces';
import {ToolFiltersInterface} from '../interfaces/tool.interface';
import tools from '../model/tools.model';

const {programmingLanguagesModel} = tools

@Service()
export class ProgrammingLanguagesService {

    async create(programmingLanguage): Promise<ToolInterface> {
        try {
            const language = await programmingLanguagesModel.create(programmingLanguage);
            await language.save();
            return {...language.toObject(), __v: undefined}; // _id:undefined

        } catch (error) {
            console.error('Error => ', error);
            throw error;
        }
    }

    async getAll(): Promise<ToolInterface[]> {
        try {
            return await programmingLanguagesModel.find({}, {__v: 0}) // _id: 0
        } catch (e) {
            console.log('error pex: ', e)
            throw e;
        }
    }

    async getFilters({id, name, extension}: ToolFiltersInterface): Promise<ToolInterface[]> { // debe retornar todo
        const tool: ToolInterface[] = []
        try {
            if (validator.isMongoId(id || '')) {
                const toolId: ToolInterface = await this.getById(id)
                toolId && tool.push(toolId)
            }
            if (name) {
                const toolName: ToolInterface[] = await programmingLanguagesModel.find({name}, {__v: 0})
                toolName && tool.push.apply(tool,toolName)
            }
            if (extension) {
                const toolExt: ToolInterface[] = await programmingLanguagesModel.find({file_extension: extension}, {__v: 0})
                toolExt && tool.push.apply(tool,toolExt)
            }
            return helpers.removeRepeatedById(tool)
        } catch (e) {
            console.log('error pex: ', e)
            throw e;
        }
    }

    async getById(id): Promise<ToolInterface> {
        try {
            console.log('id: ======>>>>  ', id)
            // const languages = await programmingLanguagesModel.findOne(id)
            return await programmingLanguagesModel.findById(id, {__v: 0})
            //     .select('-__v').exec()
            // return languages// .toObject()
        } catch (e) {
            console.log('error pex: ', e)
            throw e;
        }
    }

    async getOne(word): Promise<ToolInterface> {
        try {

            return await programmingLanguagesModel.findOne({name: word})
            // return await programmingLanguagesModel.findById(word, {__v:0})
            //     .select('-__v').exec()
            // return languages// .toObject()
        } catch (e) {
            console.log('error pex: ', e)
            throw e;
        }
    }


}