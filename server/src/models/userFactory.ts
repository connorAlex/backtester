import { getConnection } from '../loaders/mongoose';
import { User } from '../schemas/userSchema';

const findUser = async (userObject: rawUserData): Promise<Array<IUser>> => {
    const result: Array<IUser> = await User.find({name:userObject.name});
    return await result;
}

const doesUserExist = async (userObject: rawUserData): Promise<Boolean> => {
    return (await findUser(userObject)).length > 0;
}

const createUser = async (userObject: rawUserData): Promise<Boolean> => {
    if (await doesUserExist(userObject) === false){
        let user = new User(userObject);
        try {
            await user.save();
        } catch (e) {
            return false;
        }
    }
    return true;
};

const deleteUser = async (userObject: rawUserData): Promise<Boolean> => {
    if (await doesUserExist(userObject)) {
        await User.deleteOne(userObject);
        return true;
    }
    return false;
}

export {
    createUser,
    deleteUser,
    findUser,
    doesUserExist
};