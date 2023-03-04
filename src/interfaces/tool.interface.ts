import {Document} from 'mongoose';

export interface ToolInterface {
    _id?: string;
    name: string;
    description?: string;
    file_extension?: string;
    url_image?: [string];
    __v?: string;
}

export interface ToolFiltersInterface extends Document {
    id?: string;
    name?: string;
    extension?: string;
}