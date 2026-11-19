import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';



/****************************************************** */

// Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().allow('').optional(),
  }),
};



// Схема для перевірки параметра noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "Title must be a string",
      "string.min": "Title should have at least {#limit} characters",
      "any.required": "Title is required",
    }),
    content: Joi.string().allow('').optional().messages({
      "string.base": "Content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "any.only": "Tag must be one of: {#valids}",
    }),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional().messages({
      "string.base": "Title must be a string",
      "string.min": "Title should have at least {#limit} characters",
    }),
    content: Joi.string().allow('').optional().messages({
      "string.base": "Content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "any.only": "Tag must be one of: {#valids}",
    }),
  })
  .min(1).messages({"object.min": "At least one field must be provided for update",}),
};





