import Joi from "joi";

const ProductValidation = {
  validateProductInput(rowData) {
    const schema = Joi.object().keys({
      farmer_id: Joi.number().required(),
      category: Joi.string().required(),
      quantity: Joi.string().required(),
      price: Joi.number().required(),
      location: Joi.string(),
    });

    return schema.validate(rowData);
  },
};

export default ProductValidation;
