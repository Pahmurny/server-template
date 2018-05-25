import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import db from '../../db/models';

import { jwtSecret } from '../../config';

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err);
    } else if (err || !user) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, (error) => {
      if (error) return res.status(401).end();
      next();
    });
  })(req, res, next);

export const token = ({ required, role } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && role && role !== user.role)) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);

passport.use('password', new BasicStrategy((username, password, done) => {
  return db.User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      done(true);
      return null;
    }
    return user.authenticate(password).then((user) => {
      done(null, user);
      return null;
    }).catch(done);
  });
}));

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ]),
}, ({ id }, done) => {
  // User.findById(id).then((user) => {
  //   done(null, user);
  //   return null;
  // }).catch(done);
  done(null, { username: 'HARDCODE-token', id: `token-${id}` });
}));
