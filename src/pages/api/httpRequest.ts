import { JobParamsType } from "@/models/job";
import { LoginParamsType } from "@/models/user";
import { AxiosResponse } from "axios";
import axiosInstance from "./axios";

// login request
export const login = async (data: LoginParamsType): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/auth/login`,
    method: "post",
    data,
  });
};


// get all job with pagination and filter by location and cloth type
export const getJobs = async (params: JobParamsType): Promise<AxiosResponse> => {
    return axiosInstance({
        url: `/jobs/search`,
        method: "get",
        params,
    });
}

// get all job locations
export const getJobLocations = async (): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/job-locations`,
    method: "get",
  });
};
