import joi from "joi"

const userAggregateSchema = joi.object({
    stocksTicker: joi.string()
        .alphanum()
        .min(3)
        .max(5)
        .required(),
    
    multiplier: joi.number()
        .required(),
    
    timespan: joi.string().required(),
    from: joi.string().required(),
    to: joi.string().required(),
    adjusted: joi.boolean().required(),
    sort: joi.string().required(),
    limit: joi.number().required(),
    movingAverageDays: joi.number().min(1)

});

const joiValidate = (data: Object, schema:joi.ObjectSchema) => { 
    return schema.validate(data)
}


export {
    userAggregateSchema,
    joiValidate
}