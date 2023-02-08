const Joi = require('joi');

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
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

          const validationResult = schema.validate(req.body);
          if(validationResult.error) {
            res.status(400).json({ message: validationResult.error.details[0].message})
          }
          next();
    },

    
    putContactValidation: (req, res, next) => {
      const schema = Joi.object({
          name: Joi.string(),
          email: Joi.string()
            .email({
              minDomainSegments: 2,
              tlds: { allow: ["com", "net", "ua"] },
            }),
          phone: Joi.string(),
          favorite: Joi.bool()
        });

        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
          res.status(400).json({ message: validationResult.error.details[0].message})
        }
        next();
  }
}
