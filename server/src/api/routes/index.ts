import {Router, Request, Response} from "express";
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

router.post('/login', (req: Request, res: Response) => {
    
});
