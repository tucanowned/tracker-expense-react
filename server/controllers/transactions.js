const Transaction = require('../models/Transaction');

// @desc Get all transactions
// @route GET /api/v1/transactions
// @acess Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc Add transaction
// @route POST /api/v1/transactions
// @acess Public
exports.addTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(item => item.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
    
    console.log(err);
  }

}

// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id
// @acess Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc Get transaction
// @route GET /api/v1/transactions/:id
// @acess Public
exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }

    return res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc Update transaction
// @route UPDATE /api/v1/transactions/:id
// @acess Public
exports.updateTransaction = async (req, res, next) => {
  try {
    const {text, amount} = req.body;
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }
    transaction.text = text;
    transaction.amount = amount;

    transaction.save();

    return res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}