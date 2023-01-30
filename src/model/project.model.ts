import mongoose from 'mongoose';
import tools from './tools.model';

const {programmingLanguagesModel, frameworksModel, librariesModel} = tools
const MODEL_NAME = 'project';

const projectSchema = new mongoose.Schema({
    // phone: {
    //     type: String,
    //     validate: {
    //         validator: function(v) {
    //             return /\d{3}-\d{3}-\d{4}/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid phone number!`
    //     },
    //     required: [true, 'User phone number required']
    // },
    name: {
        type: String,
        required: true,
        trim: true,
        // minLength: [10, 'Phone number should contain at least ten digits!'],
        // enum: {
        //     values: ['Coffee', 'Tea'],
        //     message: '{VALUE} is not supported'
        // },
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    difficulty_level: {
        type: String,
        required: false,
        trim: true
    },
    features: {
        type: String,
        required: false
    },
    programming_languages: [
        {
            type: mongoose.Types.ObjectId,
            ref: programmingLanguagesModel,
            required: false,
            trim: true
        }
    ],
    frameworks: [
        {
            type: mongoose.Types.ObjectId,
            ref: frameworksModel,
            required: false,
            trim: true
        }
    ],
    libraries: [
        {
            type: mongoose.Types.ObjectId,
            ref: librariesModel,
            required: false,
            trim: true
        }
    ],
    images: {
        type: [String],
        required: false,
        trim: true
    },
    short_description: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    note: {
        type: String,
        required: false,
        trim: true
    },
    url_repository: {
        type: String,
        required: false,
        trim: true
    },
    url_documentation: {
        type: String,
        required: false,
        trim: true
    },
    url_img: {
        type: String,
        required: false,
        trim: true
    },
    url_web_deploy: {
        type: String,
        required: false,
        trim: true
    },
    date_init: {
        type: Date,
        required: false,
        trim: true
    },
    date_finish: {
        type: Date,
        required: false,
        trim: true
    },
    current_version: {
        type: String,
        required: false,
        trim: true
    },
    architecture_support: {
        type: [String],
        required: false,
        trim: true
    },
    dev_state: {
        type: String,
        required: false,
        trim: true
    },
    size: {
        type: String,
        required: false,
        trim: true
    },
    platform: {
        type: [String],
        required: false,
        trim: true
    },
    licence: {
        type: String,
        required: false,
        trim: true
    },
    dev_tools: {
        type: [String],
        required: false,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model(MODEL_NAME, projectSchema);
