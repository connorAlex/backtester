import {Router, Request, Response} from "express";
import {createUser} from '../../models/userFactory'
import { requiresAuth } from "express-openid-connect";
export const router = Router();

//home page
router.get('/', (req: Request, res: Response) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get('/profile', requiresAuth(), (req: Request, res: Response) => {
    res.send(JSON.stringify(req.oidc.user));
});

router.get('/login', (req: Request, res: Response) => {
    res.send('Login Page').status(200);
});

router.post('/login', (req: Request, res: Response) => {
    // user submits their username and password.
    // return boolean?
})

router.post('/signup', async (req: Request, res: Response) => {
    
    const user = await createUser(req.body);
    if (user) {
        res.send('New User Added').status(200);
    } else {
        res.send('User Not Added').status(401);
    }
});
