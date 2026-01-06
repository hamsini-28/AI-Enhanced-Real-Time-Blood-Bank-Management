const { body } = require("express-validator")
const { query } = require("express-validator")

const userRegisterValidationRules = [
  body("fullname")
    .isString().withMessage("Name should be a string")
    .isLength({ min: 3 }).withMessage("Name should be more than 3 characters")
    .customSanitizer(value => {
      return value
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }),

  // Email
  body("email")
    .isEmail().withMessage("Enter a valid email")
    .isLength({ min: 8 }).withMessage("Email should be more than 8 characters")
    .normalizeEmail(),

  // Password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be more than 8 characters"),
]

const userLoginValidationRules = [
  body("email")
    .isEmail().withMessage("Enter a valid email")
    .isLength({ min: 6 }).withMessage("Email should be more than 8 characters")
    .normalizeEmail(),

  // Password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be more than 8 characters")
]

const userUpdateValidationRules = [
  body("fullname")
    .optional()
    .isString().withMessage("Name should be a string")
    .isLength({ min: 3 }).withMessage("Name should be more than 3 characters")
    .customSanitizer(value => {
      return value
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }),

  // Email
  body("email")
    .optional()
    .isEmail().withMessage("Enter a valid email")
    .isLength({ min: 8 }).withMessage("Email should be more than 8 characters")
    .normalizeEmail(),

];

const updatePasswordValidation = [
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be more than 8 characters"),

  body("newPassword")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be more than 8 characters"),
]

const autoSuggestionValidationRules = [
  query("input")
    .isString().withMessage("Input should be a string")
    .isLength({ min: 3 }).withMessage("Input should be at least 3 characters long")
];

const getDistanceTimeValidationRules = [
  query("origin")
    .isString().withMessage("Origin should be a string")
    .isLength({ min: 3 }).withMessage("Origin should be at least 3 characters long"),

  query("destination")
    .isString().withMessage("Destination should be a string")
    .isLength({ min: 3 }).withMessage("Destination should be at least 3 characters long")
];

const orgRegistrationValidationRules = [
  // orgName validation
  body('orgName')
    .notEmpty().withMessage('Organization name is required')
    .isLength({ min: 3 }).withMessage('Organization name should be more than 3 characters')
    .trim()
    .customSanitizer(value => {
      return value
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }),

  // email validation
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .isLength({ min: 8 }).withMessage('Email should be more than 8 characters')
    .normalizeEmail(),

  // password validation
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),

  // orgType validation
  body('orgType')
    .notEmpty().withMessage('Organization type is required')
    .isIn(['Bloodbank', 'Hospital', 'Ngo']).withMessage('Invalid organization type'),

  // timings validation
  body('timings')
    .optional()
    .isLength({ min: 5 }).withMessage('Timings should be more than 5 characters')
    .trim(),


  // contactNumber validation
  body('contactNumber')
    .optional()
    .isLength({ min: 10 }).withMessage('Contact number should be at least 10 digits')
    .matches(/^\+?[0-9]{10,15}$/).withMessage('Invalid phone number')
    .trim(),

  // registrationNumber validation (optional)
  body('registrationNumber')
    .optional()
    .trim(),

  // recievingBlood validation (optional, boolean)
  body('recievingBlood')
    .optional()
    .isBoolean().withMessage('recievingBlood must be a boolean'),

];

const orgSigninValidationRules = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .isLength({ min: 8 }).withMessage('Email should be more than 8 characters')
    .normalizeEmail(),

  // password validation
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),
]

const donationForm = [
  body('fullname')
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 3 }).withMessage('Full name should be more than 3 characters')
    .trim()
    .customSanitizer(value => {
      return value
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }),

  body('bloodType')
    .notEmpty().withMessage('Blood type is required')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Invalid blood type'),

  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10 }).withMessage('Phone number should be at least 10 digits')
    .matches(/^\+?[0-9]{10,15}$/).withMessage('Invalid phone number')
    .trim(),

  body('lastDonationDate')
    .optional({ checkFalsy: true }) // allow empty if user hasn’t donated
    .isISO8601().withMessage('Invalid date format') // ensure valid date
    .custom(value => {
      const inputDate = new Date(value);
      const today = new Date();

      if (inputDate > today) {
        throw new Error('Last donation date cannot be in the future');
      }
      return true;
    }),

  body('eventModel')
    .notEmpty().withMessage('Event Model is required')
];


module.exports = {
  userRegisterValidationRules,
  userLoginValidationRules,
  userUpdateValidationRules,
  autoSuggestionValidationRules,
  getDistanceTimeValidationRules,
  orgRegistrationValidationRules,
  orgSigninValidationRules,
  updatePasswordValidation,
  donationForm
};