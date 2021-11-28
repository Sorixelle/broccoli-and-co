import { useField } from "formik";

type Props = {
  autocomplete?: string;
  name: string;
  label: string;
};

function FormInput({ name, label, autocomplete }: Props) {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <input
          id={name}
          autoComplete={autocomplete}
          type="text"
          className={`p-2 w-full border-2 self-stretch font-mono focus:outline-none focus:border-brand ${
            meta.error && meta.touched ? "border-red-500" : "border-grey-400"
          }`}
          aria-errormessage={`${name}-error`}
          aria-required
          aria-invalid={Boolean(meta.error && meta.touched)}
          {...field}
        />
      </label>
      {meta.error && meta.touched && (
        <p id={`${name}-error`} className="text-red-500">
          {meta.error}
        </p>
      )}
    </div>
  );
}

FormInput.defaultProps = {
  autocomplete: "on",
};

export default FormInput;
