import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { ProductSelector } from './components/ProductSelector';
import { EditorCanvas } from './editor/EditorCanvas';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Toast } from './components/Toast';
import { HelpfulTips } from './components/HelpfulTips';
import { useEditorStore } from './utils/store';

function App() {
  const { currentProduct } = useEditorStore();
  const [showWelcome, setShowWelcome] = useState(false);

  // Sprawdź czy pokazać ekran powitalny
  useEffect(() => {
    if (currentProduct) {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowWelcome(true);
      }
    }
  }, [currentProduct]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
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
