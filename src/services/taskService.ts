import { SaraminJobListResponse } from '../types/interfaces/apis/saramin/response/SaraminJobListResponse';
import axiosInstance from '../utils/axiosInstance';

export const getJobsListService = async (page: number): Promise<SaraminJobListResponse> => {
  const response = await axiosInstance.get<SaraminJobListResponse>(`/api/v1/jobs?page=${page}`);

  return response.data;
};
