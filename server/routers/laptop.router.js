const express = require('express');
const { getLaptops, addLaptop, getLaptop, deleteLaptop, updateLaptop } = require('../controllers/laptop.controller');
const upload = require('../config/uploadImage');
const protect = require('../middlewares/auth.middleware');
const allowedTo = require('../middlewares/roles.middlewars');

const laptopRouter = express.Router();

laptopRouter.route('/').get(getLaptops).post(protect, allowedTo('admin', 'moderator'), upload.array('images', 4), addLaptop);
laptopRouter.route('/:id').get(getLaptop).delete(protect, allowedTo('admin', 'moderator'), deleteLaptop).patch(protect, allowedTo('admin', 'moderator'), upload.array('images', 4), updateLaptop);

module.exports = laptopRouter;