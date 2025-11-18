import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export API
export const exportAPI = {
  // Export to PDF and save on server
  exportToPDF: async (data: {
    projectId?: string;
    canvasData: string;
    width: number;
    height: number;
    bleed?: number;
    dpi?: number;
    colorMode?: 'RGB' | 'CMYK';
    title?: string;
  }) => {
    const response = await api.post('/export/pdf', data);
    return response.data;
  },

  // Download PDF directly
  downloadPDF: async (data: {
    canvasData: string;
    width: number;
    height: number;
    bleed?: number;
    dpi?: number;
    colorMode?: 'RGB' | 'CMYK';
    title?: string;
  }) => {
    const response = await api.post('/export/pdf/download', data, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Generate preview
  generatePreview: async (data: {
    canvasData: string;
    width: number;
    height: number;
    dpi?: number;
  }) => {
    const response = await api.post('/export/preview', data);
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data: {
    name: string;
    productId: string;
    templateId?: string;
    canvasData: string;
  }) => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  update: async (id: string, data: {
    name?: string;
    canvasData?: string;
    thumbnail?: string;
  }) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Upload API
export const uploadAPI = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/upload');
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  create: async (data: {
    items: Array<{
      projectId: string;
      productId: string;
      quantity: number;
      price: number;
      pdfUrl?: string;
    }>;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      address?: string;
      notes?: string;
    };
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default api;
