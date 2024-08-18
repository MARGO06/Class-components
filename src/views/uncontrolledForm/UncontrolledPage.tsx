import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from 'src/views/uncontrolledForm/UncontrolledPage.module.scss';
import { validateFile } from 'src/utils/ValidateFile';
import { FormPart } from 'src/components/formPart/FormPart';
import { convertToBase64 } from 'src/utils/ConvertFile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { schema } from 'src/utils/Schema';
import * as yup from 'yup';
import { cartAdded } from 'src/store/reducers/ActiveCart.slice';

export const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries.activeCountries);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : 'No file selected');
  };

  const handleCountryChange = () => {
    const query = countryRef.current?.value || '';
    const filtered = countries.filter((country: string) =>
      country.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (country: string) => {
    countryRef.current!.value = country;
    setFilteredCountries([]);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let selectedGender = '';

    if (maleRef.current?.checked) {
      selectedGender = 'male';
    } else if (femaleRef.current?.checked) {
      selectedGender = 'female';
    }
    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: selectedGender,
      country: countryRef.current?.value || '',
      accept: acceptRef.current?.checked ? 'yes' : 'no',
      age: ageRef.current?.value ? Number(ageRef.current?.value) : undefined,
      img: '',
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      if (imgRef.current?.files?.[0]) {
        const file = imgRef.current.files[0];
        const isValid = validateFile(file, setFileError);
        if (!isValid) return;
        const base64 = await convertToBase64(file);
        if (typeof base64 === 'string') formData.img = base64;
      }
      dispatch(cartAdded(formData));
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
        <FormPart
          htmlFor="name"
          title="Name"
          className={style.input}
          id="name"
          name="name"
          ref={nameRef}
          placeholder="name"
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
        <FormPart
          htmlFor="age"
          title="Age"
          className={style.input}
          id="age"
          name="age"
          ref={ageRef}
          placeholder="age"
        />
        {errors.age && <p className={style.error}>{errors.age}</p>}
        <FormPart
          htmlFor="email"
          type="email"
          title="Email"
          className={style.input}
          id="email"
          name="email"
          ref={emailRef}
          placeholder="email"
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}
        <FormPart
          htmlFor="password"
          type="password"
          title="Password"
          className={style.input}
          id="password"
          name="password"
          ref={passwordRef}
          placeholder="password"
        />
        {errors.password && <p className={style.error}>{errors.password}</p>}
        <FormPart
          htmlFor="confirm_password"
          type="password"
          title="Confirm password"
          className={style.input}
          id="confirm_password"
          name="confirm_password"
          ref={confirmPasswordRef}
          placeholder="confirm password"
        />
        {errors.confirmPassword && <p className={style.error}>{errors.confirmPassword}</p>}
        <div className={style.gender}>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="male" ref={maleRef} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="female" ref={femaleRef} />
          {errors.gender && <p className={style.error}>{errors.gender}</p>}
        </div>
        <label htmlFor="country">Country</label>
        <input
          className={style.input}
          id="country"
          name="country"
          ref={countryRef}
          placeholder="Enter your country"
          onChange={handleCountryChange}
        />
        {filteredCountries.length > 0 && (
          <ul className={style.autocompleteList}>
            {filteredCountries.map((country) => (
              <li key={country} className={style.autocompleteItem}>
                <button
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCountrySelect(country);
                    }
                  }}
                  className={style.buttonItem}
                >
                  {country}
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.country && <p className={style.error}>{errors.country}</p>}
        <label htmlFor="upload">Upload Picture</label>
        <input
          type="file"
          id="upload"
          name="upload"
          ref={imgRef}
          accept=".png, .jpeg, .jpg"
          style={{ display: 'none' }}
          onChange={(e) => handleFileSelect(e)}
        />
        <button type="button" onClick={() => document.getElementById('upload')?.click()}>
          Choose File
        </button>
        <span>{fileName || 'No file selected'}</span>
        {fileError && <p className={style.error}>{fileError}</p>}
        <label htmlFor="accept">Do you agree to accept personal date</label>
        <input type="checkbox" id="accept" name="rules" value="yes" ref={acceptRef} />
        {errors.accept && <p className={style.error}>{errors.accept}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
