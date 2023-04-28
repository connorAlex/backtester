import {Router, Request, Response, ErrorRequestHandler} from "express";
import {createUser} from '../../models/userFactory'
import { buildAnalysis } from "../../backtst";
import { userAggregateSchema, joiValidate } from "../../schemas/joiSchema";
import { IAnalysis } from "grademark";
export const router = Router();

//home page
router.get('/', (req: Request, res: Response) => {
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    res.send("welcome to 8080").status(200)

});
router.post('/', async (req: Request, res: Response, next) => {
    let body = joiValidate(req.body, userAggregateSchema);
    if (body.error !== undefined) {
        res.status(400).send(`Error, invalid user input: \n${body.error}`);
    } else {
        let analysis = await buildAnalysis(body.value) 
        if (await analysis instanceof Error) {
            res.status(400).send(await analysis);
        }else {
            res.status(200).send(await analysis);
        }
    }
});

router.get('/profile', (req: Request, res: Response) => {
    //res.send(JSON.stringify(req.body));
});


// router.post('/signup', async (req: Request, res: Response) => {
    
//     const user = await createUser(req.body);
//     if (user) {
//         res.send('New User Added').status(200);
//     } else {
//         res.send('User Not Added').status(401);
//     }
// });
