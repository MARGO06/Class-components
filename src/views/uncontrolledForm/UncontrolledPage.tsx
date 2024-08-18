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
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit}>
        <FormPart
          labelName={style.label}
          htmlFor="name"
          title="Name"
          className={style.input}
          id="name"
          name="name"
          ref={nameRef}
          placeholder="name"
        />
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.name || ''}
        </p>
        <FormPart
          labelName={style.label}
          htmlFor="age"
          title="Age"
          className={style.input}
          id="age"
          name="age"
          ref={ageRef}
          placeholder="age"
        />
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.age || ''}
        </p>
        <FormPart
          labelName={style.label}
          htmlFor="email"
          type="email"
          title="Email"
          className={style.input}
          id="email"
          name="email"
          ref={emailRef}
          placeholder="email"
        />
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.email || ''}
        </p>
        <FormPart
          labelName={style.label}
          htmlFor="password"
          type="password"
          title="Password"
          className={style.input}
          id="password"
          name="password"
          ref={passwordRef}
          placeholder="password"
        />
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.password || ''}
        </p>
        <FormPart
          labelName={style.label}
          htmlFor="confirm_password"
          type="password"
          title="Confirm password"
          className={style.input}
          id="confirm_password"
          name="confirm_password"
          ref={confirmPasswordRef}
          placeholder="confirm password"
        />
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.confirmPassword || ''}
        </p>
        <div className={style.gender}>
          <p className={style.genderLabel}>Gender</p>
          <div className={style.options}>
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" ref={maleRef} />
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" ref={femaleRef} />
          </div>
          <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
            {errors.gender || ''}
          </p>
        </div>
        <label htmlFor="country" className={style.label}>
          Country
        </label>
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
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.country || ''}
        </p>
        <label htmlFor="upload" className={style.upload}>
          Upload Picture
          <div>
            <input
              type="file"
              id="upload"
              name="upload"
              ref={imgRef}
              accept=".png, .jpeg, .jpg"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e)}
            />
            <button
              type="button"
              className={style.button_select}
              onClick={() => document.getElementById('upload')?.click()}
            >
              Select File
            </button>
            <span>{fileName || 'No file selected'}</span>
          </div>
        </label>
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {fileError || ''}
        </p>
        <label htmlFor="accept" className={style.accept}>
          Do you agree to accept personal date
          <input type="checkbox" id="accept" name="rules" value="yes" ref={acceptRef} />
        </label>
        <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
          {errors.accept || ''}
        </p>
        <button type="submit" className={style.submit}>
          Submit
        </button>
      </form>
    </div>
  );
};
