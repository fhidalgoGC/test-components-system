import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { GCModalProps } from './GCModalProps';
import './GCModal.scss';

/**
 * GCModal - Componente modal reutilizable
 * 
 * Auto-detección de estructura:
 * - Si detecta .gc-modal-title, .gc-modal-content, .gc-modal-actions
 *   → Reorganiza automáticamente en header fijo, body scrolleable, footer fijo
 * - Si NO detecta estas clases → Funciona como antes (backward compatible)
 * 
 * @param children - Contenido del modal
 * @param showCloseButton - Si se muestra el botón de cerrar (default: false)
 * @param closeOnBackdrop - Si se puede cerrar haciendo clic en el backdrop (default: false)
 * @param onClose - Función llamada cuando el modal se cierra
 * @param data-testid - Identificador para testing
 */
// Helper function to extract elements by className
const extractElementsByClass = (children: React.ReactNode, className: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  
  const traverse = (node: React.ReactNode) => {
    if (!node) return;
    
    if (typeof node === 'object' && 'props' in node) {
      const element = node as React.ReactElement;
      if (element.props?.className?.includes(className)) {
        elements.push(element);
        return;
      }
    }
    
    // Traverse children if it's an array
    if (Array.isArray(node)) {
      node.forEach(traverse);
    } else if (typeof node === 'object' && 'props' in node) {
      const element = node as React.ReactElement;
      if (element.props?.children) {
        if (Array.isArray(element.props.children)) {
          element.props.children.forEach(traverse);
        } else {
          traverse(element.props.children);
        }
      }
    }
  };
  
  if (Array.isArray(children)) {
    children.forEach(traverse);
  } else {
    traverse(children);
  }
  
  return elements;
};

// Helper function to remove elements with specific className from children
const removeElementsByClass = (children: React.ReactNode, className: string): React.ReactNode => {
  const filter = (node: React.ReactNode): React.ReactNode => {
    if (!node) return node;
    
    if (typeof node === 'object' && 'props' in node) {
      const element = node as React.ReactElement;
      if (element.props?.className?.includes(className)) {
        return null; // Remove this element
      }
      
      // Filter children recursively
      if (element.props?.children) {
        const filteredChildren = Array.isArray(element.props.children)
          ? element.props.children.map(filter).filter(Boolean)
          : filter(element.props.children);
        
        return { ...element, props: { ...element.props, children: filteredChildren } };
      }
    }
    
    return node;
  };
  
  if (Array.isArray(children)) {
    return children.map(filter).filter(Boolean);
  }
  
  return filter(children);
};

export const GCModal = ({
  children,
  showCloseButton = false,
  closeOnBackdrop = false,
  onClose,
  'data-testid': dataTestId,
}: GCModalProps) => {
  // Auto-detect structured content by CSS classes
  const structuredContent = useMemo(() => {
    const titleElements = extractElementsByClass(children, 'gc-modal-title');
    const actionsElements = extractElementsByClass(children, 'gc-modal-actions');
    
    // If we have title or actions, we use structured layout
    const hasStructure = titleElements.length > 0 || actionsElements.length > 0;
    
    if (!hasStructure) {
      return { hasStructure: false, children };
    }
    
    // Remove title and actions from the main content
    let contentChildren = children;
    contentChildren = removeElementsByClass(contentChildren, 'gc-modal-title');
    contentChildren = removeElementsByClass(contentChildren, 'gc-modal-actions');
    
    return {
      hasStructure: true,
      titleElements,
      contentChildren,
      actionsElements,
    };
  }, [children]);

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnBackdrop && onClose) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="gc-modal-backdrop" 
      onClick={handleBackdropClick}
      data-testid={dataTestId ? `${dataTestId}-backdrop` : 'modal-backdrop'}
    >
      <div 
        className={`gc-modal-container ${structuredContent.hasStructure ? 'gc-modal-container--structured' : ''}`}
        onClick={(e) => e.stopPropagation()}
        data-testid={dataTestId ? `${dataTestId}-container` : 'modal-container'}
      >
        {showCloseButton && (
          <button 
            className="gc-modal-close-button"
            onClick={handleCloseClick}
            data-testid={dataTestId ? `${dataTestId}-close-button` : 'modal-close-button'}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        )}
        
        {structuredContent.hasStructure ? (
          // Structured layout with fixed header/footer and scrollable body
          <>
            {/* Fixed Header */}
            {structuredContent.titleElements && structuredContent.titleElements.length > 0 && (
              <div 
                className="gc-modal-header"
                data-testid={dataTestId ? `${dataTestId}-header` : 'modal-header'}
              >
                {structuredContent.titleElements}
              </div>
            )}
            
            {/* Scrollable Body */}
            <div 
              className="gc-modal-body"
              data-testid={dataTestId ? `${dataTestId}-body` : 'modal-body'}
            >
              {structuredContent.contentChildren}
            </div>
            
            {/* Fixed Footer */}
            {structuredContent.actionsElements && structuredContent.actionsElements.length > 0 && (
              <div 
                className="gc-modal-footer"
                data-testid={dataTestId ? `${dataTestId}-footer` : 'modal-footer'}
              >
                {structuredContent.actionsElements}
              </div>
            )}
          </>
        ) : (
          // Legacy layout - backward compatible
          <div 
            className="gc-modal-content-wrapper"
            data-testid={dataTestId ? `${dataTestId}-content` : 'modal-content'}
          >
            {children}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};