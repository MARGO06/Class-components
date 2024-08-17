import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from 'src/views/uncontrolledForm/UncontrolledPage.module.scss';
import { addFirstLetterUpperCaseMethod } from 'src/utils/YupAddTestName';
import { addNumber } from 'src/utils/YupAddTestAge';
import { addPassword } from 'src/utils/YupAddTestPassword';
import * as yup from 'yup';

addFirstLetterUpperCaseMethod();
addNumber();
addPassword();

export const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Value is required and must be a string')
      .firstLetterUpperCase('First letter must be uppercase'),
    age: yup
      .number()
      .required('You need to write down age')
      .addMinNumber('Age will be 0 or more than 0'),
    email: yup.string().required().email('Please enter a valid email address'),
    password: yup.string().required().addRightPassword(),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup
      .string()
      .required('Please select your gender')
      .oneOf(['male', 'female'], 'Invalid gender selected'),
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current?.value) : undefined,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      // eslint-disable-next-line no-console
      console.log(
        `${formData.name},${formData.age},${formData.email},${formData.password},${formData.confirmPassword},${formData.gender}`,
      );
      navigate('/RS-School_React');
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  }
  return (
    <div className={style.wrapper} data-testid="wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className={style.input}
          defaultValue=""
          id="name"
          name="name"
          ref={nameRef}
          placeholder="Enter your name"
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
        <label htmlFor="age">Age</label>
        <input
          className={style.input}
          defaultValue=""
          id="age"
          name="age"
          ref={ageRef}
          placeholder="Enter your age"
        />
        {errors.age && <p className={style.error}>{errors.age}</p>}
        <label htmlFor="email">Email</label>
        <input
          className={style.input}
          defaultValue=""
          id="email"
          name="email"
          ref={emailRef}
          placeholder="Enter your email"
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          className={style.input}
          defaultValue=""
          id="password"
          name="password"
          ref={passwordRef}
          placeholder="Enter your password"
        />
        {errors.password && <p className={style.error}>{errors.password}</p>}
        <label htmlFor="confirm_password">Password</label>
        <input
          className={style.input}
          defaultValue=""
          id="confirm_password"
          name="confirm_password"
          ref={confirmPasswordRef}
          placeholder="Enter your password"
        />
        {errors.confirmPassword && <p className={style.error}>{errors.confirmPassword}</p>}
        <label htmlFor="male">Male</label>
        <input type="radio" id="male" name="gender" value="male" ref={genderRef} />
        <label htmlFor="female">Female</label>
        <input type="radio" id="female" name="gender" value="female" ref={genderRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
