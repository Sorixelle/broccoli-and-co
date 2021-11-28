import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import Button from "./Button";
import submitInvite, {
  InviteParams,
  InviteError,
} from "../service/submitInvite";

type FormValues = InviteParams & {
  emailConfirm: string;
};

const initialFormValues: FormValues = {
  name: "",
  email: "",
  emailConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  email: Yup.string().email("Must be a valid email").required("Required"),
  emailConfirm: Yup.string()
    .oneOf([Yup.ref("email"), null], "Email does not match")
    .required("Required"),
});

type Props = {
  onSuccess(): void;
};

function SignupForm({ onSuccess }: Props) {
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={async ({ name, email }, utils) => {
        utils.setStatus(undefined);
        try {
          const response = await submitInvite({ name, email });
          if (response === "Registered") {
            onSuccess();
          } else {
            utils.setStatus(response);
          }
        } catch (e) {
          if (e instanceof InviteError) {
            utils.setStatus(e.errorMessage);
          } else {
            utils.setStatus("An unknown error occured.");
          }
        }
      }}
    >
      {({ isSubmitting, isValid, status }) => (
        <Form className="flex flex-col gap-4 w-full">
          <FormInput name="name" autocomplete="name" label="Full Name" />
          <FormInput name="email" autocomplete="email" label="Email" />
          <FormInput
            name="emailConfirm"
            autocomplete="email"
            label="Confirm Email"
          />
          <Button disabled={isSubmitting || !isValid} submit>
            {isSubmitting ? "Sending invite..." : "Send"}
          </Button>
          {status && <p className="self-center text-red-500">{status}</p>}
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
