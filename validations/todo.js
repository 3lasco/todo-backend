import { body } from 'express-validator'

export const userValidationRules = () =>
  [
    body('title', 'Please provide a valid email.')
      .not().isEmpty()
      .trim().escape(),
    body('description', 'must be at least 5 charachters long')
      .isLength({ min: 5 })
  ]

export const passwordValidation = () => [
  body('email', 'please provide a valid email')
    .not().isEmpty()
    .isEmail().normalizeEmail(),
  body('password', 'password is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  body('confirmPassword', 'Passwords do not match')
    .custom((value, { req }) => (value === req.body.password)) //when error, res.json sends the value i dont want 

]