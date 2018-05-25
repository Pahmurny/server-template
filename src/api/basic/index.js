import { Router } from 'express';

const router = new Router();

/**
 TODO: add apidocs
 */
router.get('/', (req, res, next) => {
  res.status(200).json({ route: 'get-baisc' });
});

/**
 TODO: add apidocs
 */
router.post('/', (req, res, next) => {
  res.status(200).json({ route: 'post-baisc' });
});


/**
 TODO: add apidocs
 */
router.put('/', (req, res, next) => {
  res.status(200).json({ route: 'put-baisc' });
});


/**
 TODO: add apidocs
 */
router.delete('/', (req, res, next) => {
  res.status(200).json({ route: 'delete-baisc' });
});


export default router;
