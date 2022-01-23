import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface InputRadtioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  inputClass?: string;
  labelClass?: string;
}

const InputRadio: React.FC<InputRadtioProps> = ({ children, id, className, inputClass, labelClass, ...inputAttrs }) => {
  return (
    <div className={classNames("flex items-center cursor-pointer", className)}>
      <input
        {...inputAttrs}
        id={id}
        type="radio"
        className={classNames("focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 peer ", inputClass)}
      />
      <label htmlFor={id} className={classNames("pl-3 cursor-pointer block font-medium text-gray-700", labelClass)}>
        {children}
      </label>
    </div>
  );
};

export default InputRadio;
