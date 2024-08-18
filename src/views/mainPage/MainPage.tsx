import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import style from 'src/views/mainPage/MainPage.module.scss';

const MainPage: React.FC = () => {
  const activeCardDetails = useSelector((state: RootState) => state.states.activeCardDetails);
  return (
    <>
      {activeCardDetails.map((person) => (
        <div className="cart" key={person.email}>
          <p>Name:{person.name}</p>
          <p>Age:{person.age}</p>
          <p>Email:{person.email}</p>
          <p>Password:{person.password}</p>
          <p>Confirm password:{person.confirmPassword}</p>
          <p>Gender:{person.gender}</p>
          <p>Country:{person.country}</p>
          <img src={person.img} alt="ph" className={style.photo} />
          <p>Accept:{person.accept}</p>
        </div>
      ))}
    </>
  );
};

export default MainPage;
