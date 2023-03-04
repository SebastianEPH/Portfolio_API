import {APIGatewayEvent} from 'aws-lambda';
import {Service} from 'typedi';
import {ProjectInterface} from '../interfaces';
import {ProjectService} from '../service/project.service';
import {MessageUtil} from '../utils/message';

@Service()
export class ProjectController {

    constructor(private projectService: ProjectService) {
    }

    async getAll(event: APIGatewayEvent): Promise<MessageUtil> {
        // const {} = event.queryStringParameters;
        try {
            const response = await this.projectService.getAll();
            console.log('El response GET ALL Projects fue: ', response)
            // return response //MessageUtil.success(response);

            return JSON.stringify({
                statusCode: 200,
                message: 'get All ',
                body: response,
            });


        } catch (error) {
            console.error(error);
            return MessageUtil.error(error.code, error.message);
        }
    }

    async getOne(event: APIGatewayEvent) {
        return event;
    }

    async create(event: APIGatewayEvent) {

        const project: ProjectInterface = JSON.parse(event.body);
        try {
            // const projectCreateDto = new ProjectCreateDTO(project);
            // const dtoValidation = await validate(projectCreateDto);
            // if (dtoValidation && dtoValidation.length > 0) {
            //     const errors = parseValidationErrors(dtoValidation);
            //     return MessageUtil.error(404, errors);
            // }
            const response = await this.projectService.create(project);
            // return MessageUtil.success(response);


            return JSON.stringify({
                statusCode: 200,
                message: 'Card Credit was added successfully',
                body: response,
            });

        } catch (error) {
            console.error(error);
            return MessageUtil.error(error.code, error.message);
        }
    }

    async update(event: APIGatewayEvent) {
        return event;
    }

    async remove(event: APIGatewayEvent) {
        return event;
    }
}