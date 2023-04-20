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
export const getJobs = async (
  params: JobParamsType
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/jobs/search`,
    method: "get",
    params,
  });
};

// get all job locations
export const getJobLocations = async (): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/job-locations`,
    method: "get",
  });
};

// get a job detail by job id
export const getJobDetail = async (jobId: string): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/jobs/${jobId}`,
    method: "get",
  });
};

// make a quotation
export const makeQuotation = async (
  jobId: string,
  data: any
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/quotation/job/${jobId}`,
    method: "post",
    data,
  });
};

// get all quotations by job id
export const getQuotations = async (jobId: string): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/quotation/all/${jobId}`,
    method: "get",
  });
};
