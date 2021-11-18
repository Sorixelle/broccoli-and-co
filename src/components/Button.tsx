type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  submit?: boolean;
  children: string;
};

function Button({ onClick, disabled, submit, children }: Props) {
  return (
    <button
      className={`transition-colors p-3 font-mono border-4 ${
        disabled
          ? "border-gray-200 bg-gray-200"
          : "border-brand-light hover:bg-brand-light active:border-brand-dark active:bg-brand-dark"
      }`}
      disabled={disabled}
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick() {},
  disabled: false,
  submit: false,
};

export default Button;
