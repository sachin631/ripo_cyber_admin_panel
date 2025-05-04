import axios from 'axios';

// Configure axios instance with your production backend URL
const api = axios.create({
  baseURL: 'https://ripo-cyber-backend-n4zi.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Admin User Listing
export const getUsers = async (page: number, limit: number, search_key: string) => {
  try {
    const response = await api.get(
      `/admin/user/listing?page=${page}&limit=${limit}&search_key=${search_key}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get Common Data (Privacy/Terms/About)
export const get_common_data = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/admin/common/privacy_terms_about_detail', { 
      headers: { 
        'Authorization': `Bearer ${token}` 
      } 
    });
    return response?.data?.data;
  } catch (error) {
    console.error('Error fetching common data:', error);
    throw error;
  }
}

// Update About Us
export const update_about_us = async (data: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put('/admin/common/privacy_terms_about', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response?.data?.data;
  } catch (error) {
    console.error('Error updating about us:', error);
    throw error;
  }
}

// Create User (Admin Functionality)
export const createUser = async (data: FormData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/admin/user/create', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export default api;
