import mongoose from 'mongoose';

const toolsModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    file_extension: {
        type: String,
        required: false,
        trim: true
    },
    url_imagen: {
        type: String,
        required: false,
        trim: true
    }
});
export default {
    programmingLanguagesModel: mongoose.model('programmingLanguage', toolsModel),
    frameworksModel: mongoose.model('frameworks', toolsModel),
    librariesModel: mongoose.model('libraries', toolsModel)
}
