const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransactions,
  deleteTransactions,
  getTransaction,
  updateTransaction
} = require('../controllers/transactions');

router
  .route('/')
  .get(getTransactions)
  .post(addTransactions);

router
  .route('/:id')
  .delete(deleteTransactions)
  .get(getTransaction)
  .put(updateTransaction);

module.exports = router;