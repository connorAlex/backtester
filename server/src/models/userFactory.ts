import { getConnection } from '../loaders/mongoose';
import { User } from '../schemas/userSchema';

const findUser = async (userObject: rawUserData): Promise<Array<IUser>> => {
    const result: Array<IUser> = await User.find({name:userObject.name});

    return await result;
}

const createUser = async (userObject: rawUserData) => {
    if ( (await findUser(await userObject)).length >= 1 ){
        let user = new User(userObject);
        await user.save();
    }
    
};

const deleteUser = async (userObject: rawUserData) => {
    const result = findUser(userObject);
    if (result !== null) {
        User.deleteOne()
    }
}


export {
    createUser,
    deleteUser,
    findUser 
};