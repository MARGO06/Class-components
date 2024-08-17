import * as yup from 'yup';

declare module 'yup' {
  interface NumberSchema {
    addMinNumber(message?: string): this;
  }
}

export const addNumber = () => {
  yup.addMethod(yup.number, 'addMinNumber', function handleMessage(message) {
    return this.test('addMinNumber', message, function checkValue(value) {
      const { path, createError } = this;
      if (typeof value !== 'number') {
        return createError({ path, message: message || 'Value is required and must be a number' });
      }
      if (value < 0) {
        return createError({ path, message: message || 'Age will be 0 or more than 0' });
      }
      return true;
    });
  });
};
