import {APIGatewayEvent} from 'aws-lambda';
import {Service} from 'typedi';
import {ToolInterface} from '../interfaces';
import {ProgrammingLanguagesService} from '../service/programmingLanguagesService';

@Service()
export class ProgrammingLanguageController {
    constructor(private programmingLanguageService: ProgrammingLanguagesService) {
    }

    async create(event: APIGatewayEvent) {
        const programmingLanguage: ToolInterface = JSON.parse(event.body)
        try {
            const response = await this.programmingLanguageService.create(programmingLanguage);
            return JSON.stringify({
                statusCode: 200,
                message: '',
                body: response,
            });
        } catch (e) {

        }
    }
    async getAllFilters(event:APIGatewayEvent){
        console.log(event.queryStringParameters)
        return JSON.stringify({
            statusCode: 200,
            message: 'get All',
            body: event.queryStringParameters?
                await this.programmingLanguageService.getFilters(event.queryStringParameters)
                :
                await this.programmingLanguageService.getAll()
        });
    }
    async getById(event:APIGatewayEvent){
        if(event.pathParameters){
            if(event.pathParameters.id){
                return JSON.stringify({
                    statusCode: 200,
                    message: 'get one ',
                    body: await this.programmingLanguageService.getById(event.pathParameters.id)
                });
                // return  JSON.stringify(await this.programmingLanguageService.getOne(event.pathParameters.id))
            }
        }
        return JSON.stringify({error:'Esto jamas debería ejecutarse | only '})
    }


}