import { attachControllers } from '@decorators/express';
import { HealthcheckController } from './src/controllers/healthcheck.controller';
import { OAuthController } from './src/controllers/oauth.controller';
import { UserController } from './src/controllers/user.controller';
import { NotificationController } from './src/controllers/notification.controller';
import * as BodyParser from 'body-parser';
import dotenv from 'dotenv';
import { TemplateController } from './src/controllers/template.controller';
import { ALLOWED_METHOD_VERBS, CORS_ORIGIN_URL } from './src/utils/costants';

const express = require('express');
const app = express();
const config = dotenv.config();
const cors = require('cors');
const port: number = (process.env.SERVER_PORT || 8080) as number;


app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json());
app.use(cors({
  origin: CORS_ORIGIN_URL,
  methods: [...ALLOWED_METHOD_VERBS],
}));

attachControllers(app, [
  HealthcheckController, 
  OAuthController, 
  UserController,
  NotificationController,
  TemplateController
]);

app.listen(port, () => {
  console.log(`Service restapi is running on port ${port}.`);
});