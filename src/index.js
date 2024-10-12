import express from 'express';

import { PORT } from './config/constans.js';

import expressInit from './config/expressInit.js';
import handlebarsInit from './config/handlebarsInit.js';
import mongooseInit from './config/mongooseInit.js';

import routes from './routes.js';

const app = express();

mongooseInit();
handlebarsInit(app);
expressInit(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));