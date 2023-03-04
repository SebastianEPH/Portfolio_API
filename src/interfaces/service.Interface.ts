import {ToolInterface} from './tool.interface';

export interface ResponseServiceInterface {
    codeStatus: string,
    message?: string,
    data: ToolInterface,
}
