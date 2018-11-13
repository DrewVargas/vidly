const { genreSchema } = require('./genre');
const mongoose = require('mongoose');
const Joi = require('joi');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 50,
      required: true,
      default: 0
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 50,
      required: true,
      default: 0
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(50)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(50)
      .required()
  };
  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
