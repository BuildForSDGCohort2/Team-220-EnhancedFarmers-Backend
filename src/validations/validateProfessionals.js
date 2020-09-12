import Joi from "joi";

const ValidateProfession = {
  validateSignup(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      contact: Joi.string().required(),
      residence: Joi.string().required(),
      profession: Joi.string().required(),
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
  validateGetId(rowData) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateProfession;
