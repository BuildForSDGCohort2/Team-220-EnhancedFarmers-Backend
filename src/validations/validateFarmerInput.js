import Joi from "joi";

const ValidateFarmer = {
  validateSignup(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      contact: Joi.number().required(),
      location: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(rowData);
  },

  validateLogin(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(rowData);
  },
  validateApproveFarmer(rowData) {
    const schema = Joi.object().keys({
      is_accepted: Joi.boolean().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateFarmer;
