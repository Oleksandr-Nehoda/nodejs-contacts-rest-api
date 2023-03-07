const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = mongoose.Schema;
const contactSchema = new Schema (
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
          unique: true,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        // owner: {
        //   type: SchemaTypes.ObjectId,
        //   ref: 'users',
        // }
      }, {
timestamps: true,
versionKey: false
      }
)

const joiSchemaAddContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] }
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool()
});

const joiSchemaPutContact = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    }),
  phone: Joi.string(),
  favorite: Joi.bool()
});

const joiSchemaFavorite = Joi.object({
  favorite: Joi.bool().required()
})

const Contact = mongoose.model('contact', contactSchema);


module.exports = {
    Contact,
    joiSchemaAddContact,
    joiSchemaPutContact,
    joiSchemaFavorite
}