import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";

// @modelOptions({
//     schemaOptions:{
//         timestamps:true,
//             _id:false
    // }
// })
class Project{
    @prop({ required: true })
    public name:string;

    // @prop({ required: false, trim:true })
    // public range:string;

    // @prop({ required: false, trim:true })
    // public type:string;

    @prop({ required: false, trim:true, lowercase:true})
    public url_deploy:string;

    @prop({ required: false, trim:true, lowercase:true })
    public url_repository:string;

    @prop({ required: false, trim:true, lowercase:true })
    public url_documentation:string;

    @prop({ required: false, trim:true })
    public description:string;

    @prop({ required: false, trim:true})
    public description_short:string;

    @prop({ required: false, trim:true })
    public note:string;

    @prop({ type:Date, required: false })
    public date_start:Date;

    @prop({ type:Date, required: false})
    public date_finish:Date;

    @prop({ required: false, trim:true, lowercase:true })
    public url_img:string;

    @prop({ required: false, trim:true })
    public current_version:string;

    @prop({ required: false, trim:true })
    public architecture:string;

    @prop({ required: false, trim:true })
    public current_state:string;

    @prop({ required: false, trim:true })
    public size:string;

    @prop({ required: false, trim:true })
    public platform:string;

    @prop({ required: false, trim:true, default:"Sin permiso"})
    public licence:string;

    @prop({ required: false, trim:true })
    public software_editor:string;

}
const projectModel =  getModelForClass(Project)
export default projectModel;