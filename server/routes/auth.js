const router = require("express").Router();
const { User } = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require("joi");

router.post("/", async (req, res) => {

const { email, password } = req.body;

  try {
	const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(isMatch)
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
      
    const payload = {
      user: {
        id: user.id,
      },
    };
	console.log(payload)
	const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
	console.log(token)
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use an environment variable
      { expiresIn: 360000 },
      (err, token) => {
		console.log(token)
        if (err) throw err;
        res.json({user, token });
      }
    );

	// const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
	// console.log(token)
    // res.json({ token });

  }catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
	console.log(req.body)
	
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
