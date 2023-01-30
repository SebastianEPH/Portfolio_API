import {APIGatewayEvent} from 'aws-lambda';
import {Service} from 'typedi';
import {ToolInterface} from '../interfaces';
import {FrameworksService} from '../service/frameworks.service';

@Service()
export class FrameworksController {
    constructor(private frameworksService: FrameworksService) {
    }

    async create(event: APIGatewayEvent) {
        const framework: ToolInterface = JSON.parse(event.body)
        try {
            const response = await this.frameworksService.create(framework);
            return JSON.stringify({
                statusCode: 200,
                message: '',
                body: response,
            });
        } catch (e) {

        }
    }
}