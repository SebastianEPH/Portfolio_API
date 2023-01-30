import {Document} from 'mongoose';
import {ToolInterface} from './index'

export interface ProjectI extends Document {
    name: string;
    type?: string; // is other  collection | Android | desktop |
    difficulty_level?: string;
    features?: any; //  is object
    programming_languages?: [ToolInterface['_id']];
    frameworks?: [ToolInterface['_id']];
    libraries?: [ToolInterface['_id']];
    images?: [string]; // is object images | link_img
    short_description?: string;
    description?: string;
    note?: string;
    url_repository?: string;
    url_documentation?: string;
    url_img?: string;
    url_web_deploy?: string;
    date_init?: Date;
    date_finish?: Date;
    current_version?: string;
    architecture_support?: [string];
    dev_state?: string;// terminate
    size?: string; // 50MB
    platform?: [string]; // puede ser otra colección
    licence?: string; // mit
    dev_tools?: [string];
}
