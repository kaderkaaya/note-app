const joi = require('joi');

const validateSchemaBody =  (schema) => {
        return async (req, res, next) => {
                try {
                        const validate = await schema.validateAsync(req.body);
                        req.body = validate;
                        next();
                } catch (error) {
                        console.log('error',error);
                        
                        res.status(400).json({ errors: error.details });
                }
        }
};
const validateSchemaQuery =  (schema) => async (req, res, next) => {
        try {
                const validate = await schema.validateAsync(req.query);
                req.query = validate;
                next();
        } catch (error) {
                res.status(400).json({ errors: error.details });
        }
};

module.exports = {
        validateSchemaBody,
        validateSchemaQuery
}