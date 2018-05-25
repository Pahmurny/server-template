// import { success, notFound } from '../../services/response/';
import { sign } from '../../services/jwt';
import db from '../../db/models';

export const showMe = ({ user }, res) => {
  // let userInfo = user.view(true);
  // if (userInfo.role !== 'admin') userInfo = {...userInfo, role: undefined};
  return res.status(200).json(user);
};

export const create = ({ body }, res, next) => {
  console.log('Creating user', body);
  let user;
  db.User.create({ username: body.username, password: body.password, type: 'user' })
    .then((userData) => {
      console.log(userData);
      user = userData;
      return sign(user.id);
    })
    .then((token) => {
      res.status(201).json({ token: token, user: user.view(false) });
    })
    // .then(token => ({ token: token, user: user.view(false) }))
    // .then(success(res, 201))
    .catch(error => next(error));
};

export default {
  showMe,
  create,
};
