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
import { KeyboardShortcutsPanel } from './components/KeyboardShortcutsPanel';
import { useEditorStore } from './utils/store';

function App() {
  const { currentProduct } = useEditorStore();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

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

  // Keyboard shortcut dla pomocy (?)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.altKey) {
        // Ignore if typing in input
        if (document.activeElement?.tagName !== 'INPUT' &&
            document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowKeyboardShortcuts(true);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

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

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
}

export default App;
