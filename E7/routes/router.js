const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res, err) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

  }
})