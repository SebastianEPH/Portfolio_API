import {DocumentType, getModelForClass, prop, Ref} from "@typegoose/typegoose";
// import bcrypt from "bcryptjs";
// import { Role } from "./Role";

class User {
    @prop({ required: false }) // mongoose
    name: string; // ts

    @prop({ required: false })
    lastname: string;

    @prop({ required: true })
    username: string;

    @prop({ required: true })
    public password: string;

    @prop({ required: true })
    email: string;

    // @prop({ ref: () => Role })
    // role: Ref<Role>[];
    //
    // public async encryptPassword(this: DocumentType<User>, password: string) {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}

const UserModel = getModelForClass(User);
export default UserModel;