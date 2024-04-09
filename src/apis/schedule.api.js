import apiClient from "../apiClient";


export const createSchedulePlan = async(data) => {
    try {
      const response = await apiClient.post(`/schedule/create-schedule`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };



export const updateSchedulePlan = async(data) => {
  try {
    const response = await apiClient.put(`/schedule/update-scheduel-details`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};


export const retrieveSchedulePlan = async(data) => {
  try {
    const response = await apiClient.post(`/schedule/retrieve-schedule-details`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const findRebaseHours = async(data) => {
  try {
    const response = await apiClient.post(`/schedule/find-rebase-hours`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};


export const rebaseSchedule = async(data) => {
  try {
    const response = await apiClient.post(`/schedule/rebase-schedule`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
