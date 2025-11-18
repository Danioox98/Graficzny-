import { create } from 'zustand';
import { fabric } from 'fabric';
import { Product, Project, Order, OrderItem } from '@/types';

interface EditorStore {
  // Canvas
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas | null) => void;

  // Aktualny produkt
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;

  // Aktualny projekt
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;

  // Wybrane obiekty
  selectedObjects: fabric.Object[];
  setSelectedObjects: (objects: fabric.Object[]) => void;

  // Zoom
  zoom: number;
  setZoom: (zoom: number) => void;

  // Historia (undo/redo)
  history: string[];
  historyIndex: number;
  addToHistory: (state: string) => void;
  undo: () => void;
  redo: () => void;

  // Grid
  showGrid: boolean;
  toggleGrid: () => void;

  // Rulers
  showRulers: boolean;
  toggleRulers: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),

  currentProduct: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),

  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),

  selectedObjects: [],
  setSelectedObjects: (objects) => set({ selectedObjects: objects }),

  zoom: 1,
  setZoom: (zoom) => {
    const canvas = get().canvas;
    if (canvas) {
      canvas.setZoom(zoom);
      canvas.renderAll();
    }
    set({ zoom });
  },

  history: [],
  historyIndex: -1,
  addToHistory: (state) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { canvas, history, historyIndex } = get();
    if (canvas && historyIndex > 0) {
      const newIndex = historyIndex - 1;
      canvas.loadFromJSON(history[newIndex], () => {
        canvas.renderAll();
        set({ historyIndex: newIndex });
      });
    }
  },

  redo: () => {
    const { canvas, history, historyIndex } = get();
    if (canvas && historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      canvas.loadFromJSON(history[newIndex], () => {
        canvas.renderAll();
        set({ historyIndex: newIndex });
      });
    }
  },

  showGrid: false,
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

  showRulers: false,
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),
}));

interface CartStore {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (projectId: string) => void;
  updateQuantity: (projectId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.projectId === item.projectId);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.projectId === item.projectId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    });
  },

  removeItem: (projectId) => {
    set((state) => ({
      items: state.items.filter((i) => i.projectId !== projectId),
    }));
  },

  updateQuantity: (projectId, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.projectId === projectId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  propertiesPanelOpen: boolean;
  togglePropertiesPanel: () => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  notification: string | null;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  propertiesPanelOpen: true,
  togglePropertiesPanel: () =>
    set((state) => ({ propertiesPanelOpen: !state.propertiesPanelOpen })),

  loading: false,
  setLoading: (loading) => set({ loading }),

  notification: null,
  showNotification: (message) => set({ notification: message }),
  hideNotification: () => set({ notification: null }),
}));
