const { listController } = require('../controller/listController');
const { findAll, findById, create, update, deleteById, move, check } = listController;
const express = require('express');
const router = express.Router();

router.get('/', findAll);
router.get('/:uuid', findById);
router.post('/', create);
router.put('/:uuid', update);
router.delete('/:id', deleteById);
router.put('/:id/move', move);
router.put('/:id/check', check);


module.exports = router;
