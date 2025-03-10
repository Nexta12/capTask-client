import { AxiosError } from "axios";

export const ErrorFormatter = (error) => {
  const axiosError = error instanceof AxiosError ? error : null;

  const errorMessage =
    axiosError && typeof axiosError.response?.data?.message === "string"
      ? axiosError.response.data.message
      : "Internal Server Error";

  return errorMessage;
};
