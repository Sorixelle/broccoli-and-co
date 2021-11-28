import _axios from "axios";

import submitInvite, { InviteError } from "../service/submitInvite";

jest.mock("axios");
const axios = _axios as jest.Mocked<typeof _axios>;

const body = {
  name: "Test User",
  email: "test@example.com",
};

test("returns success on request success", async () => {
  axios.post.mockResolvedValueOnce({
    status: 200,
    data: "Test response",
  });

  const res = submitInvite(body);

  await expect(res).resolves.toBe("Test response");
});

test("returns failure with API message on 400", async () => {
  axios.isAxiosError.mockReturnValueOnce(true);
  axios.post.mockRejectedValueOnce({
    response: {
      status: 400,
      data: {
        errorMessage: "Test error message",
      },
    },
  });

  const res = submitInvite(body);

  await expect(res).rejects.toThrow(InviteError);
  await expect(res).rejects.toThrow("Test error message");
});

test("returns failure with fallback message on other failures", async () => {
  axios.isAxiosError.mockReturnValueOnce(true);
  axios.post.mockRejectedValueOnce({
    response: {
      status: 500,
      data: "Test server error",
    },
  });

  const res = submitInvite(body);

  await expect(res).rejects.toThrow(InviteError);
  await expect(res).rejects.toThrow(/unknown error/);
});
