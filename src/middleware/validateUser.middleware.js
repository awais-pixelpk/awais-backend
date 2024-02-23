import Joi from "joi";

// Joi schema for user validation
const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  // avatar: Joi.string().required(),
  //coverImage: Joi.string(),
  password: Joi.string().required(),
});

// Middleware function to validate user data
export const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
