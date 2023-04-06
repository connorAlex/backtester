import config from '../../config/index';

export const authConfig =  {
    authRequired: false,
    auth0Logout: true,
    secret: config.auth_secret,
    baseURL: 'http://localhost:8080',
    clientID: 'nZ2qeCDfyGjj2xHtnqni3mkv3MdH7bPf',
    issuerBaseURL: 'https://dev-qrgij8v8365i5ipr.us.auth0.com'
};