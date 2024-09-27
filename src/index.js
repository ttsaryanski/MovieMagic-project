import express from 'express';
import expressInit from './config/expressInit.js';
import handlebarsInit from './config/handlebarsInit.js';
import mongooseInit from './config/mongooseInit.js';


import routes from './routes.js';

const app = express();
const port = 5050;

mongooseInit();
handlebarsInit(app);
expressInit(app);


app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));