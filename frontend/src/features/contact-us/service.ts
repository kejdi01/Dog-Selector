import { axiosClient } from "../../api/axiosClient";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  ok: boolean;
  detail?: string;
};

export const submitContact = async (
  payload: ContactPayload,
): Promise<ContactResponse> => {
  const res = await axiosClient.post<ContactResponse>("/contact/", payload);
  return res.data;
};
