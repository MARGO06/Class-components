import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    addRightPassword(message?: string): this;
  }
}

export const addPassword = () => {
  yup.addMethod(yup.string, 'addRightPassword', function handleMessage(message) {
    return this.test('addRightPassword', message, function checkValue(value) {
      const { path, createError } = this;
      if (!value) {
        return createError({ path, message: message || 'Password is required' });
      }

      const minLength = 4;
      const hasLowercase = value.split('').some((char) => char >= 'a' && char <= 'z');
      const hasUppercase = value.split('').some((char) => char >= 'A' && char <= 'Z');
      const hasDigit = value.split('').some((char) => char >= '0' && char <= '9');
      const specialCharacters = '@$!%*?&#';
      const hasSpecialChar = value.split('').some((char) => specialCharacters.includes(char));
      // eslint-disable-next-line no-console
      console.log({
        hasLowercase,
        hasUppercase,
        hasDigit,
        hasSpecialChar,
        isCorrectLength: value.length === minLength,
      });

      if (
        value.length !== minLength ||
        !hasLowercase ||
        !hasUppercase ||
        !hasDigit ||
        !hasSpecialChar
      ) {
        return createError({
          path,
          message:
            message ||
            'Password must be exactly 4 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        });
      }

      return true;
    });
  });
};
