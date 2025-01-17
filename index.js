import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cities from './db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', async (req, res) => {
  const data = await cities.find({});
  res.status(200).json({
    data,
  });
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const city = await cities.findOne({ _id: id });
    if (city) {
      res.status(200).json({
        msg: 'city fetched successfully.',
        data: city,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: 'somethig went wrong while fetchng city by id',
      error: error.message,
    });
  }
});

app.post('/', async (req, res) => {
  const obj = req.body;
  console.log(obj);
  try {
    const data = await cities.create(obj);
    res.status(200).json({
      msg: 'cities created successfully',
      data,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'something went wrong while creating city',
      error: error.message,
    });
  }
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await cities.deleteOne({ _id: id });
    console.log(response);
    if (response.deletedCount !== 0) {
      return res.status(200).json({
        msg: 'todo deleted successfully',
      });
    } else {
      return res.status(400).json({
        msg: 'todo not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: 'somethig went wrong while deleting city',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
