import * as yup from 'yup';
import { addFirstLetterUpperCaseMethod } from 'src/utils/YupAddTestName';
import { addNumber } from 'src/utils/YupAddTestAge';
import { addPassword } from 'src/utils/YupAddTestPassword';

addFirstLetterUpperCaseMethod();
addNumber();
addPassword();

export const schema = yup.object().shape({
  name: yup.string().required().firstLetterUpperCase(),
  age: yup.number().required().addMinNumber(),
  email: yup.string().required().email('Please enter a valid email address'),
  password: yup.string().required().addRightPassword(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required().oneOf(['male', 'female'], 'Invalid gender selected'),
  accept: yup.string().required().oneOf(['yes'], 'You need to click this select'),
  country: yup.string().required(),
});
