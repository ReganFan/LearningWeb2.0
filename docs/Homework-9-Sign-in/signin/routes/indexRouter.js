var controller = require('../controllers/mainController');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', controller.index, controller.access);
router.get('/login', controller.loginPage);
router.post('/login', controller.login);
router.get('/regist', controller.registPage);
router.post('/regist', controller.regist);
router.get('/logout', controller.logout);

module.exports = router;
