import Joi from "joi";

const ValidateProject = {
  validateProjectCreation: (rowData) => {
    const schema = Joi.object().keys({
      farmer_id: Joi.number().required(),
      profesional_id: Joi.number().required(),
      investor_id: Joi.number().required(),
      product_category: Joi.string().required(),
      amount: Joi.number().required(),
      max_amount: Joi.number().required(),
      end_time: Joi.date(),
      description: Joi.string(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateProject;
