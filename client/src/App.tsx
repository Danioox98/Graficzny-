import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { ProductSelector } from './components/ProductSelector';
import { TemplateSelector } from './components/TemplateSelector';
import { EditorCanvas } from './editor/EditorCanvas';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Toast } from './components/Toast';
import { HelpfulTips } from './components/HelpfulTips';
import { useEditorStore } from './utils/store';

function App() {
  const { currentProduct } = useEditorStore();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Pokaż selektor szablonów po wyborze produktu
  useEffect(() => {
    if (currentProduct && !showTemplateSelector) {
      setShowTemplateSelector(true);
    }
  }, [currentProduct]);

  // Sprawdź czy pokazać ekran powitalny
  useEffect(() => {
    if (currentProduct && !showTemplateSelector) {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowWelcome(true);
      }
    }
  }, [currentProduct, showTemplateSelector]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleCloseTemplateSelector = () => {
    setShowTemplateSelector(false);
  };

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

      {/* Template Selector */}
      {showTemplateSelector && (
        <TemplateSelector product={currentProduct} onClose={handleCloseTemplateSelector} />
      )}

      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen onClose={handleCloseWelcome} />}

      {/* Toast Notifications */}
      <Toast />

      {/* Helpful Tips */}
      <HelpfulTips />
    </div>
  );
}

export default App;
