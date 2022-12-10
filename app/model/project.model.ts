import {IProject} from '../interfaces';
import {projectInstance as mongoose} from './mongoose.connection';


const MODEL_NAME = 'project';

const project = new mongoose.Schema({
    name: String,
    type: String, // is other  collection | Android | desktop |
    // difficulty_level: String,
    // features:[String], //  is object
    // languages: [String], // is reference object
    // frameworks: [String], // is object
    // libraries: [String],  //  is object
    // images: [String], // is object images | link_img
    // short_description: String,
    description: String,
    note: String,
    // url_repository: String,
    // url_documentation: String,
    // url_img: String,
    // url_web_deploy: String,
    // date_init: String,
    // date_finish: String,
    current_version: String,
    // architecture_support: String,
    // state: String,// terminate
    // size: String, // 50MB
    // platform:[String], // puede ser otra colección
    // licence: String, // mit
    // dev_tools: [String],

    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}

});
export const projectModel =
    mongoose.models[MODEL_NAME] ||
    mongoose.model<IProject>(MODEL_NAME, project, MODEL_NAME);

