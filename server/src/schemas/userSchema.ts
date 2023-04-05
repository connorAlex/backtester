import { Schema, model} from "mongoose";

/** 
 * User Schema
 */
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    createdDate: Date,
}, {collection: 'users'});

const User = model<IUser>("User", userSchema);


export {User};

