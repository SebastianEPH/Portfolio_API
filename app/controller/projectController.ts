import {APIGatewayEvent} from 'aws-lambda';
import {validate} from 'class-validator';
import {Service} from 'typedi';
import {IProject} from '../interfaces';
import {ProjectCreateDTO} from '../model/dto';
import {ProjectService} from '../service/project.service';
import {MessageUtil, parseValidationErrors} from '../utils/message';

@Service()
export class ProjectController {

    constructor(private service: ProjectService) {
    }

    // async getAll(event: APIGatewayEvent): Promise<MessageUtil> {
    //     const {} = event.queryStringParameters;
    //     try {
    //         const projectGetAllDTO = new ProjectGetAllDTO({});
    //         const dtoValidation = await validate(projectGetAllDTO);
    //         if (dtoValidation && dtoValidation.length > 0) {
    //             const errors = parseValidationErrors(dtoValidation);
    //             return MessageUtil.error(404, errors);
    //         }
    //         const response = await this.service.getAll(projectGetAllDTO);
    //         return MessageUtil.success(response);
    //     } catch (error) {
    //         console.error(error);
    //         return MessageUtil.error(error.code, error.message);
    //     }
    // }

    async getOne(event: APIGatewayEvent) {
        return event;
    }

    async create(event: APIGatewayEvent): Promise<MessageUtil> {

        const project: IProject = JSON.parse(event.body);
        try {
            const projectCreateDto = new ProjectCreateDTO(project);
            const dtoValidation = await validate(projectCreateDto);
            if (dtoValidation && dtoValidation.length > 0) {
                const errors = parseValidationErrors(dtoValidation);
                return MessageUtil.error(404, errors);
            }
            const response = await this.service.create(projectCreateDto);
            return MessageUtil.success(response);
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