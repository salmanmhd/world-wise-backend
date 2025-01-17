import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const positionSchema = new Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});
const citySchema = new Schema({
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  emoji: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String, required: true },
  position: { type: positionSchema, required: true },
});
const citiesSchema = {
  cities: { type: [citySchema], required: true },
};

const cities = mongoose.model('cities', citiesSchema);

export default cities;
