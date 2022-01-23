import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

interface InputRangeProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const InputRange: React.FC<InputRangeProps> & { Item: typeof Item } = ({ children, label, className, ...attrs }) => {
  return (
    <div className={classNames("flex flex-col space-y-2 p-2 w-full", className)}>
      <label htmlFor={attrs.id}>{label}</label>
      <input type="range" className="w-full" {...attrs} />
      <ul className="flex justify-between w-full px-2">
        {React.Children.map(children, (child) => React.isValidElement(child) && React.cloneElement(child))}
      </ul>
    </div>
  );
};

const Item: React.FC = ({ children }) => {
  return (
    <li className="flex justify-center relative">
      <span className="absolute">{children}</span>
    </li>
  );
};

InputRange.Item = Item;
export default InputRange;
