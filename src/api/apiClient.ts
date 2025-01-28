import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

//admin login
export const login = async (data: any) => {
  const response: any = await api.post('/admin/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  console.log(response, 'response');
  return response?.data;
}

//admin profile
export const getProfile = async () => {
  const response = await api.get('/admin/auth/profile', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

//admin update profile
export const updateProfile = async (data: any) => {
  const response = await api.put('/admin/auth/update_profile', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type': 'multipart/form-data'
    },
  });
  return response.data;
}

// admin user listing
export const getUsers = async (page: any, limit: any, search_key: any) => {
  console.log(page, limit, search_key);
  const response = await api.get(`/admin/user/listing?page=${page}&limit=${limit}&search_key=${search_key}`);
  return response?.data?.data;
};

//get common data 
export const get_common_data = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/admin/common/privacy_terms_about_detail', { headers: { 'Authorization': `Bearer ${token}` } });
  return response?.data;
}

//update about us
export const update_about_us = async (data: any) => {
  const response = await api.put('/admin/common/privacy_terms_about', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

//home_conetnt_listing
export const get_home_content = async () => {
  const response = await api.get('/admin/home/home_detail', {
    headers:
      { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  return response?.data;
}

//update home content
export const update_home_content = async (data: any) => {
  const response = await api.put('/admin/home/create_home', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}




