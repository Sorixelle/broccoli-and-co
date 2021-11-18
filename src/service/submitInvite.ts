import axios from "axios";

export type InviteParams = {
  name: string;
  email: string;
};

export class InviteError extends Error {
  errorMessage: string;

  constructor(msg: string) {
    super(msg);
    this.errorMessage = msg;
  }
}

export default async function submitInvite(
  body: InviteParams
): Promise<string> {
  try {
    const response = await axios.post<string>(
      `${import.meta.env.VITE_API_BASE_URL}/fake-auth`,
      body
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 400) {
      throw new InviteError(e.response.data.errorMessage);
    } else {
      throw new InviteError("An unknown error occured.");
    }
  }
}
