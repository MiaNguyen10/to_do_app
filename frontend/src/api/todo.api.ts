import axiosInstance from "@/api/axiosInstance";

export type ToDo = {
    id: string;
    title: string;
    status_id: number;
    priority_id: number;
    status: string;
    priority: string;
    description: string;
    due_date?: string;
}

export type ToDoCreate = {
    user_id: number;
    title: string;
    status_id: number;
    priority_id: number;
    description: string;
    due_date?: string;
}

export type ToDoUpdate = {
    task_id: number;
    title: string;
    status_id: number;
    priority_id: number;
    description?: string;
    due_date?: string;
}

export type ToDosResponse = {
    tasks: ToDo[];
    message: string;
}

export type ToDoResponse = {
    task: ToDo;
    message: string;
}

export type ToDoCreateResponse = {
    message: string;
    task_id: number;
}

export type ToDoUpdateResponse = {
    message: string;
    task: ToDo;
}

export const getToDos = async (user_id: number) => {
    const response = await axiosInstance.get<ToDosResponse>(`/tasks/${user_id}`);
    return response.data.tasks;
}

export const getToDoById = async (task_id: number) => {
    const response = await axiosInstance.get<ToDoResponse>(`/tasks/detail/${task_id}`);
    return response.data.task;
}

export const createToDo = async (todo: ToDoCreate) => {
    const response = await axiosInstance.post<ToDoCreateResponse>("/tasks/create", todo);
    return response.data;
}

export const updateToDo = async (todo: ToDoUpdate) => {
    const response = await axiosInstance.put<ToDoUpdateResponse>(`/tasks/update/${todo.task_id}`, todo);
    return response.data.task;
}

export const deleteToDo = async (task_id: number) => {
    const response = await axiosInstance.delete(`/tasks/delete/${task_id}`);
    return response.data;
}