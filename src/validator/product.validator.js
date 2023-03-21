import Joi from "joi";
import withJoi from "next-joi";
import validator from './default.validator';

const create = validator ({
    body:Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
    })
})

const ProductValidator = {
    create
}

export {ProductValidator}