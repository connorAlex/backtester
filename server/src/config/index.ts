import dotenv from 'dotenv';

const env = dotenv.config();
if (env.error) {
    throw new Error(" Cannot find .env file ");
}


export default {
    db_url: process.env.DB_URL,
    db_users: process.env.DB_COLL,
    db_name: process.env.DB_NAME,
    auth_secret: process.env.AUTH_SECRET
}