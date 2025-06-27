import axiosInstance from "@/api/axiosInstance";

export type Priority = {
    id: number;
    name: string;
};

export type PriorityResponse = {
    message: string;
    priorities: Priority[];
};

export const getPriorities = async () => {
    const response = await axiosInstance.get<PriorityResponse>("/priority/all_priority");
    return response.data.priorities;
};