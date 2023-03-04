import {APIGatewayEvent} from 'aws-lambda';
import {Service} from 'typedi';
import {ToolInterface} from '../interfaces';
import {LibrariesService} from '../service/libraries.service';

@Service()
export class LibrariesController {
    constructor(private librariesService: LibrariesService) {
    }

    async create(event: APIGatewayEvent) {
        const library: ToolInterface = JSON.parse(event.body)
        try {
            const response = await this.librariesService.create(library);
            return JSON.stringify({
                statusCode: 200,
                message: '',
                body: response,
            });
        } catch (e) {

        }
    }
    async get(event:APIGatewayEvent){
        return '';
    }
}