import Joi from "joi";

const ValidateCustomer = {
  validateInput(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
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

  validateChangePassword(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateCustomer;
