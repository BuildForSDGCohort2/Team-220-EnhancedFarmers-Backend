import Joi from "joi";

const InvestorValidation = {
  validateInvestorInput(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      company_name: Joi.string().required(),
      contact: Joi.string().required(),
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
};

export default InvestorValidation;
