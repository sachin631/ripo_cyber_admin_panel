import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


// admin user listing
export const getUsers = async (page: any, limit: any, search_key: any) => {
  console.log(page, limit, search_key);
  const response = await api.get(`/admin/user/listing?page=${page}&limit=${limit}&search_key=${search_key}`);
  return response?.data?.data;
};

//update about us
export const update_about_us = async (data: any) => {
  const response = await api.put('/admin/common/privacy_terms_about', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response?.data?.data
}

//create user
export const createUserr = async (data: any) => {
  const response = await api.post('user/auth/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',  // Set the correct content type for file upload
    },
  });
  return response?.data?.data
}




