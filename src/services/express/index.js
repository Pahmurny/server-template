import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { env } from '../../config';

export default (apiRoot, routes) => {
  const app = express();
  app.use(helmet());

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors());
    app.use(compression());
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      console.log('EROROR', err);
      res.status(err.code || 500)
        .json({
          status: 'error',
          message: err,
        });
    });
  }
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    console.log('EROROR', err);
    res.status(err.status || 500)
      .json({
        status: 'error',
        message: err.message,
      });
  });

  return app;
};
