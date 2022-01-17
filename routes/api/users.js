const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'USERS ROUTE TEST SUCCESS'}));




module.exports = router;