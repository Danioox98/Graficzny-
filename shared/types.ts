// Wspólne typy dla frontendu i backendu

export interface Product {
  id: string;
  name: string;
  category: 'wizytowki' | 'banery';
  width: number;  // mm
  height: number; // mm
  price: number;  // PLN
  description?: string;
  thumbnail?: string;
}

export interface Template {
  id: string;
  name: string;
  productId: string;
  category: string;
  thumbnail: string;
  data: string; // JSON z Fabric.js canvas
  tags: string[];
}

export interface Project {
  id: string;
  userId?: string;
  name: string;
  productId: string;
  templateId?: string;
  canvasData: string; // JSON z Fabric.js canvas
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'draft' | 'pending' | 'processing' | 'completed' | 'cancelled';
  customerInfo: CustomerInfo;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  projectId: string;
  productId: string;
  quantity: number;
  price: number;
  pdfUrl?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
}

// Fabric.js object types
export interface CanvasObject {
  type: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  angle?: number;
  scaleX?: number;
  scaleY?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface TextObject extends CanvasObject {
  type: 'text' | 'i-text' | 'textbox';
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: string | number;
  fontStyle?: string;
  textAlign?: string;
}

export interface ImageObject extends CanvasObject {
  type: 'image';
  src: string;
}
