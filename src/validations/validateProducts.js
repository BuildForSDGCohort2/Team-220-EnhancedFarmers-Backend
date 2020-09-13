import Joi from "joi";

const ProductValidation = {
  validateProductInput(rowData) {
    const schema = Joi.object().keys({
      farmer_id: Joi.number().required(),
      project_id: Joi.number().required(),
      category: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
    });

    return schema.validate(rowData);
  },
};

export default ProductValidation;
