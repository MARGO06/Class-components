import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';

type FormPartProps = LabelHTMLAttributes<HTMLLabelElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    title: string;
    type?: string;
  };

export const FormPart = forwardRef<HTMLInputElement, FormPartProps>(
  ({ htmlFor, className, type, defaultValue = '', id, name, title, placeholder }, ref) => {
    return (
      <>
        <label htmlFor={htmlFor}>{title}</label>
        <input
          className={className}
          defaultValue={defaultValue}
          id={id}
          type={type}
          name={name}
          ref={ref}
          placeholder={`Enter your ${placeholder}`}
        />
      </>
    );
  },
);
