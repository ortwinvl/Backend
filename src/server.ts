import 'reflect-metadata';
import App from './app';
import { cleanEnv, port, str } from 'envalid';
import { OrganisationRoute, MembersRoute, BackOfficeRoute } from './routes';
import db from './db';
import { initModels } from './models';
import { initDI } from 'DI.Container';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

validateEnv();

initDI();

initModels(db);

const app = App.getInstance([
    new OrganisationRoute(), 
    new MembersRoute(),
    new BackOfficeRoute(),
    ], db
);

app.listen();