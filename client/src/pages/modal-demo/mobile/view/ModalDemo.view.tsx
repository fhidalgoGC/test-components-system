import { useState } from 'react';
import { Modal, useModalController } from '@/lib/ui-library/components/Modal';
import type { ModalState } from '@/lib/ui-library/components/Modal/types';

export const ModalDemoMobileView = () => {
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
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold" data-testid="text-page-title">Modal Demo</h1>
      <p className="text-sm text-gray-600" data-testid="text-page-description">
        Modal con control externo vía useModalController.
      </p>

      <section className="space-y-3 border rounded-lg p-3">
        <h2 className="text-base font-semibold" data-testid="text-section-basic">Basic Modal</h2>
        <p className="text-xs text-gray-500">Modal básico con header, body y footer.</p>
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
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
          layout={{ heightMode: 'auto' }}
          header={{
            render: <h3 className="text-base font-semibold">Título del Modal</h3>,
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div className="space-y-2">
                <p className="text-sm">Este es el contenido del cuerpo del modal.</p>
                <p className="text-gray-500 text-xs">
                  Puedes colocar cualquier componente React aquí.
                </p>
              </div>
            ),
          }}
          footer={{
            render: (
              <div className="flex gap-2 w-full">
                <button
                  className="flex-1 px-3 py-2 border rounded hover:bg-gray-50 transition text-sm"
                  onClick={basicModal.close}
                  data-testid="button-cancel-basic"
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  onClick={() => basicModal.close()}
                  data-testid="button-confirm-basic"
                >
                  Confirmar
                </button>
              </div>
            ),
          }}
          callbacks={{ onClose: basicModal.close }}
        />
      </section>

      <section className="space-y-3 border rounded-lg p-3">
        <h2 className="text-base font-semibold" data-testid="text-section-states">Modal con Estados</h2>
        <p className="text-xs text-gray-500">Cambia el estado del modal.</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('idle'); }}
            data-testid="button-open-idle"
          >
            Idle
          </button>
          <button
            className="px-3 py-2 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('loading'); }}
            data-testid="button-open-loading"
          >
            Loading
          </button>
          <button
            className="px-3 py-2 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('empty'); }}
            data-testid="button-open-empty"
          >
            Empty
          </button>
          <button
            className="px-3 py-2 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
            onClick={() => { statesModal.open(); handleStateChange('error'); }}
            data-testid="button-open-error"
          >
            Error
          </button>
        </div>

        <Modal
          isOpen={statesModal.isOpen}
          state={currentState}
          overlay={{ enabled: true, opacity: 0.4, blur: true, closeOnClick: true }}
          closeButton={{ visible: true, position: 'top-right' }}
          layout={{ heightMode: 'auto', minHeight: 180 }}
          header={{
            render: <h3 className="text-base font-semibold">Estado: {currentState}</h3>,
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div>
                <p className="text-sm">Contenido visible solo en estado <strong>idle</strong> o <strong>success</strong>.</p>
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

      <section className="space-y-3 border rounded-lg p-3">
        <h2 className="text-base font-semibold" data-testid="text-section-custom">Modal Personalizado</h2>
        <p className="text-xs text-gray-500">Overlay personalizado y close a la izquierda.</p>
        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm"
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
          layout={{ heightMode: 'auto' }}
          header={{
            render: (
              <div>
                <h3 className="text-base font-semibold text-purple-800">Configuración Avanzada</h3>
                <p className="text-xs text-purple-500">Overlay personalizado</p>
              </div>
            ),
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div className="space-y-2">
                <div className="bg-purple-50 p-2 rounded">
                  <p className="text-xs">Overlay: color púrpura, blur activado</p>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <p className="text-xs">Close button: posición top-left</p>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <p className="text-xs">No cierra al hacer click en overlay</p>
                </div>
              </div>
            ),
          }}
          footer={{
            render: (
              <div className="flex justify-center w-full">
                <button
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm"
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

      <section className="space-y-3 border rounded-lg p-3">
        <h2 className="text-base font-semibold" data-testid="text-section-no-overlay">Modal Sin Oscurecer</h2>
        <p className="text-xs text-gray-500">Modal sin oscurecer el fondo (overlay desactivado).</p>
        <button
          className="w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm"
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
          layout={{ heightMode: 'auto' }}
          header={{
            render: <h3 className="text-base font-semibold">Sin Oscurecer</h3>,
            horizontalAlign: 'left',
          }}
          body={{
            render: (
              <div className="space-y-2">
                <div className="bg-teal-50 p-2 rounded">
                  <p className="text-xs">Este modal se abre sin oscurecer el fondo.</p>
                </div>
                <div className="bg-teal-50 p-2 rounded">
                  <p className="text-xs">Configuración: overlay: {"{"} enabled: false {"}"}</p>
                </div>
              </div>
            ),
          }}
          footer={{
            render: (
              <div className="w-full">
                <button
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm"
                  onClick={noOverlayModal.close}
                  data-testid="button-close-no-overlay"
                >
                  Cerrar
                </button>
              </div>
            ),
          }}
          callbacks={{ onClose: noOverlayModal.close }}
        />
      </section>
    </div>
  );
};
