import {IFeatures} from './index'

export interface IProject {
    name: string;
    type?: string; // is other  collection | Android | desktop |
    difficulty_level?: string;
    features?: [IFeatures]; //  is object
    languages?: [string]; // is reference object
    frameworks?: [string]; // is object
    libraries?: [string];  //  is object
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
    state?: string;// terminate
    size?: string; // 50MB
    platform?: [string]; // puede ser otra colección
    licence?: string; // mit
    dev_tools?: [string];
}
