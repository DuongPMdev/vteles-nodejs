const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Import the database connection
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const e = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || 'c15afo';

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple API with JWT authentication',
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/get_telesale_statistic:
 *   get:
 *     summary: Protected route
 *     description: Returns a protected message if a valid JWT token is provided.
 *     parameters:
 *       - name: room
 *         in: query
 *         description: 3
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns a protected message
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
app.get('/api/get_telesale_statistic', (req, res) => {
  if (db.state === 'disconnected') {
    db.connect();
  }
  const { room } = req.query;
  db.query('SELECT telesale_statistic_api.*, account.account_id, account.display_name FROM vteles.telesale_statistic_api INNER JOIN vteles.account ON telesale_statistic_api.telesale = account.account_id WHERE telesale_statistic_api.room = ?', [room], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: 'CORS enabled', results : results});
  });
});

/**
 * @swagger
 * /api/post_telesale_statistic:
 *   post:
 *     summary:
 *     description:
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 telesale:
 *                   type: string
 *                 sale:
 *                   type: string
 *                 room:
 *                   type: number
 *                 work_shift:
 *                   type: number
 *                 care:
 *                   type: number
 *     responses:
 *       200:
 *         description:
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
app.post('/api/post_telesale_statistic', (req, res) => {
  if (db.state === 'disconnected') {
    db.connect();
  }
  var telesale = req.body.telesale;
  var sale = req.body.sale;
  var room = req.body.room;
  var work_shift = req.body.work_shift;
  var care = req.body.care;
  db.query('SELECT * FROM telesale_statistic_api WHERE telesale = ? AND work_shift = ?', [telesale, work_shift], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 1) {
      var result = results[0];
      result.number_call++;
      if (care > 0) {
        result.number_care++;
      }
      db.query('UPDATE telesale_statistic_api SET number_call = ?, number_care = ? WHERE telesale = ? AND work_shift = ?', [result.number_call, result.number_care, telesale, work_shift], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({});
      });
    }
    else {
      var number_care = care > 0 ? 1 : 0;
      db.query('INSERT INTO telesale_statistic_api(telesale, sale, room, work_shift, number_call, number_care) VALUE (?, ?, ?, ?, ?, ?)', [telesale, sale, room, work_shift, 1, number_care], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({});
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
