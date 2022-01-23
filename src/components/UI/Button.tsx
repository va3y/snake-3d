import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import classnames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = forwardRef(({ onClick, children, className, ...nativeAttrs }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={classnames(
        "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",
        className
      )}
      {...nativeAttrs}
    >
      {children}
    </button>
  );
});

export default Button;
