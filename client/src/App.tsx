import { useEffect } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { ProductSelector } from './components/ProductSelector';
import { EditorCanvas } from './editor/EditorCanvas';
import { useEditorStore, useUIStore } from './utils/store';

function App() {
  const { currentProduct } = useEditorStore();
  const { notification, hideNotification } = useUIStore();

  // Ukryj powiadomienia po 3 sekundach
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  // Jeśli nie wybrano produktu, pokaż selektor
  if (!currentProduct) {
    return <ProductSelector />;
  }

  return (
    <div className="editor-layout">
      <Header />
      <Toolbar />

      <div className="editor-canvas-area">
        <EditorCanvas width={currentProduct.width} height={currentProduct.height} />
      </div>

      <PropertiesPanel />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
