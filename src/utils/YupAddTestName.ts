import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    firstLetterUpperCase(message?: string): this;
  }
}

export const addFirstLetterUpperCaseMethod = () => {
  yup.addMethod(yup.string, 'firstLetterUpperCase', function handleMessage(message) {
    return this.test('firstLetterUpperCase', message, function checkValue(value) {
      const { path, createError } = this;
      if (typeof value !== 'string') {
        return createError({ path, message: message || 'Value is required and must be a string' });
      }
      return (
        /^[A-Z]/.test(value) ||
        createError({ path, message: message || 'First letter must be uppercase' })
      );
    });
  });
};
