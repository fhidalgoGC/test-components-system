import { useState } from 'react';
import { Modal, useModalController } from '@/lib/ui-library/components/Modal';
import type { ModalState } from '@/lib/ui-library/components/Modal/types';

export const ModalDemoWebView = () => {
  const basicModal = useModalController();
  const statesModal = useModalController();
  const customModal = useModalController();
  const noOverlayModal = useModalController();
  const [currentState, setCurrentState] = useState<ModalState>('idle');

  const handleStateChange = (state: ModalState) => {
    setCurrentState(state);
    statesModal.setState(state);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Modal Component Demo</h1>
      <p className="text-gray-600" data-testid="text-page-description">
        Componente Modal agnóstico con control 100% externo vía useModalController.
      </p>

      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-lg font-semibold" data-testid="text-section-basic">Basic Modal</h2>
        <p className="text-sm text-gray-500">Modal básico con header, body y footer.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={basicModal.open}
          data-testid="button-open-basic"
        >
          Abrir Modal Básico
        </button>

        <Modal
          isOpen={basicModal.isOpen}
          state={basicModal.state}
          overlay={{ enabled: true, opacity: 0.5, closeOnClick: true }}
          closeButton={{ visible: true, position: 'top-right' }}
          layout={{ widthMode: 'fixed', width: 480, heightMode: 'auto' }}
          header={{
            render: <h3 className="text-lg font-semibold">Título del Modal</h3>,
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div className="space-y-3">
                <p>Este es el contenido del cuerpo del modal.</p>
                <p className="text-gray-500 text-sm">
                  Puedes colocar cualquier componente React aquí.
                </p>
              </div>
            ),
          }}
          footer={{
            render: (
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border rounded hover:bg-gray-50 transition"
                  onClick={basicModal.close}
                  data-testid="button-cancel-basic"
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => basicModal.close()}
                  data-testid="button-confirm-basic"
                >
                  Confirmar
                </button>
              </div>
            ),
            horizontalAlign: 'right',
          }}
          callbacks={{ onClose: basicModal.close }}
        />
      </section>

      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-lg font-semibold" data-testid="text-section-states">Modal con Estados</h2>
        <p className="text-sm text-gray-500">Cambia el estado del modal para ver cómo se renderiza.</p>
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('idle'); }}
            data-testid="button-open-idle"
          >
            Abrir (idle)
          </button>
          <button
            className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('loading'); }}
            data-testid="button-open-loading"
          >
            Abrir (loading)
          </button>
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('empty'); }}
            data-testid="button-open-empty"
          >
            Abrir (empty)
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('error'); }}
            data-testid="button-open-error"
          >
            Abrir (error)
          </button>
        </div>

        <Modal
          isOpen={statesModal.isOpen}
          state={currentState}
          overlay={{ enabled: true, opacity: 0.4, blur: true, closeOnClick: true }}
          closeButton={{ visible: true, position: 'top-right' }}
          layout={{ widthMode: 'fixed', width: 400, heightMode: 'auto', minHeight: 200 }}
          header={{
            render: <h3 className="text-lg font-semibold">Estado: {currentState}</h3>,
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div>
                <p>Este contenido solo se ve en estado <strong>idle</strong> o <strong>success</strong>.</p>
              </div>
            ),
          }}
          statesComponents={{
            loading: { renderType: 'self' },
            empty: { renderType: 'self' },
            error: { renderType: 'self' },
          }}
          callbacks={{ onClose: statesModal.close }}
        />
      </section>

      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-lg font-semibold" data-testid="text-section-custom">Modal Personalizado</h2>
        <p className="text-sm text-gray-500">Modal con overlay personalizado, close button a la izquierda, y layout fijo.</p>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          onClick={customModal.open}
          data-testid="button-open-custom"
        >
          Abrir Modal Personalizado
        </button>

        <Modal
          isOpen={customModal.isOpen}
          state={customModal.state}
          overlay={{ enabled: true, color: 'rgba(88, 28, 135, 0.6)', blur: true, closeOnClick: false }}
          closeButton={{ visible: true, position: 'top-left' }}
          layout={{ widthMode: 'fixed', width: 560, heightMode: 'fixed', height: 350 }}
          header={{
            render: (
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Configuración Avanzada</h3>
                <p className="text-xs text-purple-500">Overlay personalizado y close a la izquierda</p>
              </div>
            ),
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm">Overlay: color púrpura, blur activado, no cierra al hacer click</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm">Botón cerrar: posición top-left</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm">Layout: ancho fijo 560px, alto fijo 350px</p>
                </div>
              </div>
            ),
          }}
          footer={{
            render: (
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  onClick={customModal.close}
                  data-testid="button-close-custom"
                >
                  Cerrar
                </button>
              </div>
            ),
            horizontalAlign: 'center',
          }}
          callbacks={{ onClose: customModal.close }}
        />
      </section>

      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-lg font-semibold" data-testid="text-section-no-overlay">Modal Sin Oscurecer</h2>
        <p className="text-sm text-gray-500">Modal que se abre sin oscurecer el fondo (overlay desactivado).</p>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          onClick={noOverlayModal.open}
          data-testid="button-open-no-overlay"
        >
          Abrir Modal Sin Overlay
        </button>

        <Modal
          isOpen={noOverlayModal.isOpen}
          state={noOverlayModal.state}
          overlay={{ enabled: false }}
          closeButton={{ visible: true, position: 'top-right' }}
          layout={{ widthMode: 'fixed', width: 450, heightMode: 'auto' }}
          header={{
            render: <h3 className="text-lg font-semibold">Sin Oscurecer</h3>,
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div className="space-y-3">
                <div className="bg-teal-50 p-3 rounded">
                  <p className="text-sm">Este modal se abre sin oscurecer el fondo.</p>
                </div>
                <div className="bg-teal-50 p-3 rounded">
                  <p className="text-sm">Configuración: <code className="bg-gray-100 px-1 rounded">overlay: {"{"} enabled: false {"}"}</code></p>
                </div>
                <p className="text-sm text-gray-500">Puedes seguir viendo e interactuando con el contenido detrás del modal.</p>
              </div>
            ),
          }}
          footer={{
            render: (
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                  onClick={noOverlayModal.close}
                  data-testid="button-close-no-overlay"
                >
                  Cerrar
                </button>
              </div>
            ),
            horizontalAlign: 'right',
          }}
          callbacks={{ onClose: noOverlayModal.close }}
        />
      </section>
    </div>
  );
};
