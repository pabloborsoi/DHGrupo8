const express = require('express');
const router = express.Router();

const controllerAdmin = require('../controllers/controllerAdmin');

router.get('/', controllerAdmin.index);

module.exports = router;