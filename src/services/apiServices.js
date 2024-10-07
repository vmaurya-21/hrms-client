import axiosInstance, { axiosPrivate } from '../lib/axios';


export const getProfile = async () => {
  try {
      const response = await axiosPrivate.get('api/user/myDetails');
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
    throw error;
  }
};

export const getBirthday = async () => {
  try {
      const response = await axiosPrivate.get('api/user/birthdays');
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
    throw error;
  }
};

export const leaveDetails = async () => {
  try {
      const response = await axiosPrivate.get('api/leaves/details');
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
    throw error;
  }
};

export const expenseDetails = async () => {
  try {
      const response = await axiosPrivate.get('api/app/expenses');
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
    throw error;
  }
};

export const announcements = async () => {
  try {
      // const response = await axiosPrivate.get('');
      // console.log(response.data);
    // return response.data;
  } catch (error) {
    // console.error('Error fetching profile details:', error);
    // throw error;
  }
};

export const leaveType = async () => {
    try {
        const response = await axiosPrivate.get('api/leaves/leaveTypes');
        console.log(response.data); // Log the response data
        return response.data; // Ensure this returns an array of leave types
    } catch (error) {
        console.error('Error fetching leave types:', error);
        return []; // Return an empty array in case of error
    }
};




