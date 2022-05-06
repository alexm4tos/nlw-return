import express from 'express';
import cors from 'cors';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const APP_PORT = process.env.PORT || 3333;

app.listen(APP_PORT, () => {
	console.log(`Server started on port ${APP_PORT}`);
});
