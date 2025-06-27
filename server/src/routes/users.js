const express = require("express");
const express_validator = require("express-validator");
const {createUserValidationSchema} = require("../utils/schemas/UserValidationSchema.js");
const bcrypt = require("bcrypt");
const User = require("../utils/models/UserModel.js");

const router = express.Router();
router.get("/users", (request, response) => {
    return response.status(200).send("Works");
})

router.post("/users/create-local-account", 
    express_validator.checkSchema(createUserValidationSchema),
    async (request, response) => {
        const validation_errors = express_validator.validationResult(request);
        if(!validation_errors.isEmpty()) return response.status(400).send(validation_errors.array());
        const data = express_validator.matchedData(request);
        const saltRounds = 10;
        const hashedData = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedData;
        const newUser = new User(data);
        try{
            const savedUser = await newUser.save();
            return response.status(201).send(savedUser);
        }catch(error){
            return response.status(400).send(error);
        }

})


module.exports = router
