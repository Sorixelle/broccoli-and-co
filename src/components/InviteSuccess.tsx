import Button from "./Button";

type Props = {
  onConfirm(): void;
};

function InviteSuccess({ onConfirm }: Props) {
  return (
    <>
      <p className="text-center pb-4">
        You will be one of the first to experience Broccoli & Co when we launch.
      </p>
      <Button onClick={onConfirm}>OK</Button>
    </>
  );
}

export default InviteSuccess;
