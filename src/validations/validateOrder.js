import Joi from "joi";

const OrderValidation = {
  validateOrder(rowData) {
    const schema = Joi.object().keys({
      product_id: Joi.number().required(),
      offered_price: Joi.number().required(),
    });

    return schema.validate(rowData);
  },

  validateStatus(rowData) {
    const schema = Joi.object().keys({
      status: Joi.valid("rejected", "approved").required(),
    });
    return schema.validate(rowData);
  },
};

export default OrderValidation;
