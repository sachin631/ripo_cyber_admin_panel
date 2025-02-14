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

// *********************************************** internship section *************************************************************************
export const add_internship = async (data: any) => {
  const response = await api.post('/admin/internship/category/create_internship_category', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

//internship listing
export const get_internship_listing = async (page: number, limit: number, search_key: string) => {
  console.log(page, limit, search_key, 'page');
  const response = await api.get(`/admin/internship/category/internship_category_listing/?page=${page}&limit=${limit}&search_key=${search_key}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response?.data;
}

//update internship

export const update_internship = async (data: any) => {
  const response = await api.put('/admin/internship/category/update_internship_category', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

//delete internship

export const delete_internship = async (id: number) => {
  const response = await api.delete(`/admin/internship/category/delete_category?internship_category_id=${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const get_internship_details = async (id: any) => {
  console.log(id, 'idddd');
  const response = await api.get(`/admin/internship/category/get_internship_details?internship_category_id=${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const update_internship_details = async (data: any) => {
  console.log(data, 'dataaaaaa');
  const response = await api.put('/admin/internship/category/update_internship_details', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}


// *********************************************** our services,usecaes,whyUs  section *************************************************************************

export const create_our_services = async (data: any) => {
  const response = await api.post('/admin/useCase/create_usecase', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type': 'multipart/form-data'
    }
  });
  return response?.data;
}

export const get_our_services_listing = async (page: number, limit: number, search_key: string, data_type: number) => {
  console.log(page, limit, search_key, 'page');
  const response = await api.get(`/admin/useCase/usecase_listing?page=${page}&limit=${limit}&search_key=${search_key}&data_type=${data_type}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const update_our_services = async (data: any) => {
  const response = await api.put('/admin/useCase/update_usecase', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    }
  });
  return response?.data;
}

export const delete_our_services = async (id: number, data_type: number) => {
  const response = await api.delete(`/admin/useCase/delete_usecase?usecase_id=${id}&data_type=${data_type}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const edit_work_together = async (data: any) => {
  console.log(data, 'in client')
  const response = await api.put('/admin/common/edit_work_together', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  console.log(response, 'response')
  return response?.data;
}

export const get_work_together = async () => {
  const response = await api.get('/admin/common/work_together_detail', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const edit_your_career = async (data: any) => {
  const response = await api.put('/admin/youCareer/create_career', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const your_career_details = async () => {
  const response = await api.get('/admin/youCareer/career_detail', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

// user listing

export const user_listing = async (page: any, limit: any, search_key: any) => {
  console.log(page, limit, search_key);
  const response = await api.get(`/admin/user/listing?page=${page}&limit=${limit}&search_key=${search_key}`);
  return response?.data?.data;
};

export const delete_user = async (id: any) => {
  const response = await api.delete(`admin/user/delete?user_id=${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const create_faq = async (data: any) => {
  const response = await api.post('/admin/common/create_faq', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const faq_listing = async () => {
  const response = await api.get(`/admin/common/faq_listing`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data?.data;
}

export const update_faq = async (data: any) => {
  const response = await api.put('/admin/common/update_faq', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const delete_faq = async (data: any) => {
  console.log(data, 'data');
  const response = await api.delete(`/admin/common/delete_faq/?question_id=${data}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const privacy_details = async () => {
  const response = await api.get('/admin/common/privacy_terms_about_detail', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const update_privacy_details = async (data: any) => {
  const response = await api.put('/admin/common/privacy_terms_about', data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const internship_applied_listing = async () => {
  const response = await api.get(`/admin/common/internship_applied_listing`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}

export const contact_listing = async () => {
  const response = await api.get(`/admin/contactUs/contactUs_listing`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response?.data;
}




