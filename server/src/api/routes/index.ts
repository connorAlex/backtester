import {Router, Request, Response} from "express";
import {createUser} from '../../models/userFactory'
export const router = Router();

//middleware funct - gets current time.
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

//home page
router.get('/', (req: Request, res: Response) => {
    res.send('Home page').status(200);
});

router.get('/login', (req: Request, res: Response) => {
    res.send('Login Page').status(200);
});

router.post('/login', async (req: Request, res: Response) => {
    
    const user = await createUser(req.body);
    if (user) {
        res.send('New User Added').status(200);
    } else {
        res.send('User Not Added').status(400);
    }
});
