import { getConnection } from '../loaders/mongoose';
import { User } from '../schemas/userSchema';

const findUser = async (userObject: rawUserData): Promise<Array<IUser>> => {
    const result: Array<IUser> = await User.find({name:userObject.name});

    return await result;
}

const createUser = async (userObject: rawUserData): Promise<Boolean> => {
    let queryResults = await findUser(userObject);

    if ( queryResults.length === 0 ){
        let user = new User(userObject);

        try {
            await user.save();
        } catch (e) {
            return false;
        }

        return true;
    }

    return false;
    
};

const deleteUser = async (userObject: rawUserData): Promise<Boolean> => {
    const result = findUser(userObject);
    if ((await result).length > 0) {
        await User.deleteOne(userObject);
        return true;
    }
    return false;
}


export {
    createUser,
    deleteUser,
    findUser 
};