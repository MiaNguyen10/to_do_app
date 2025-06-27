import axiosInstance from "@/api/axiosInstance";

export type Status = {
  id: number;
  name: string;
};
export type StatusResponse = {
  message: string;
  statuses: Status[];
};

export const getStatuses = async () => {
  const response = await axiosInstance.get<StatusResponse>("/status/all_status");
  return response.data.statuses;
};