export * from '../../../shared/types';

// Frontend-specific types
export interface EditorState {
  canvas: fabric.Canvas | null;
  selectedObject: fabric.Object | null;
  zoom: number;
  history: string[];
  historyIndex: number;
}

export interface EditorTool {
  id: string;
  name: string;
  icon: string;
  action: () => void;
}
