import {APIGatewayEvent} from 'aws-lambda';
import {Service} from 'typedi';
import {ToolInterface} from '../interfaces';
import {ProgrammingLanguageService} from '../service/programmingLanguage.service';

@Service()
export class ProgrammingController {
    constructor(private programmingLanguageService: ProgrammingLanguageService) {
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
}