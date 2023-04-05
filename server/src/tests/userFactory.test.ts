import { describe, assert, expect, it, beforeAll, afterAll} from 'vitest';
import {findUser, createUser}  from '../models/userFactory';
import { getConnection } from '../loaders/mongoose';
import { User } from '../schemas/userSchema';

const testUser: rawUserData = {
    name: "test_name",
    email: "test_email.com",
    password: "password",
    createdDate: new Date("2023-04-05T12:00:00.000Z")
}
beforeAll(async () => {
   await getConnection();
});



describe('test suite', () => {
    it ("test if mongoose.find() works", async () => { 
        const docs = await User.find({});
        expect(docs.length).toBeGreaterThan(0);
    })

    it("find a user", async () => {
        const user = await findUser(testUser);
        expect(user).toHaveLength(1);
    })

    // it("create a user", () => {

    // })
});
