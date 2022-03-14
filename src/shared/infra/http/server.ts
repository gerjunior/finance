import express from 'express';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ${process.env.PORT}.`);
});
