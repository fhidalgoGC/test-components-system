import type { ComponentType } from 'react';
import { AcordionList, useAcordionListController } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps } from '@/lib/ui-library/components/AcordionList';

type Order = {
  orderId: string;
  customer: string;
  date: string;
  total: number;
  status: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
  items: { name: string; qty: number; price: number }[];
};

type OrderView = {
  orderId: string;
  customer: string;
  date: string;
  total: number;
  status: Order['status'];
  items: Order['items'];
};

const statusColors: Record<Order['status'], { bg: string; text: string }> = {
  pendiente: { bg: '#fef3c7', text: '#92400e' },
  enviado: { bg: '#dbeafe', text: '#1e40af' },
  entregado: { bg: '#dcfce7', text: '#166534' },
  cancelado: { bg: '#fee2e2', text: '#991b1b' },
};

const ordersData: Order[] = Array.from({ length: 15 }, (_, i) => ({
  orderId: `ORD-${String(i + 1).padStart(4, '0')}`,
  customer: [
    'Carlos Méndez', 'Ana García', 'Miguel Torres', 'Laura Fernández',
    'Pedro Ramírez', 'María López', 'José Martínez', 'Carmen Ruiz',
    'Roberto Díaz', 'Elena Morales', 'Fernando Soto', 'Patricia Reyes',
    'Andrés Vargas', 'Sofía Herrera', 'Diego Castillo',
  ][i],
  date: `2025-${String(Math.floor(i / 4) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  total: Math.round((Math.random() * 500 + 50) * 100) / 100,
  status: (['pendiente', 'enviado', 'entregado', 'cancelado'] as const)[i % 4],
  items: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
    name: ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Auriculares', 'Cable USB', 'Webcam'][Math.floor(Math.random() * 7)],
    qty: Math.floor(Math.random() * 3) + 1,
    price: Math.round((Math.random() * 200 + 10) * 100) / 100,
  })),
}));

const OrderHeader: ComponentType<AcordionListItemDataProps<OrderView>> = ({ itemData }) => {
  const colors = statusColors[itemData.status];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '2px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 700, fontSize: '14px', color: '#1f2937', fontFamily: 'monospace' }} data-testid={`text-order-id-${itemData.orderId}`}>
          {itemData.orderId}
        </span>
        <span style={{ fontSize: '14px', color: '#374151' }} data-testid={`text-order-customer-${itemData.orderId}`}>
          {itemData.customer}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{itemData.date}</span>
        <span style={{
          background: colors.bg,
          color: colors.text,
          fontSize: '11px',
          fontWeight: 600,
          padding: '2px 10px',
          borderRadius: '12px',
          textTransform: 'capitalize',
        }} data-testid={`status-order-${itemData.orderId}`}>
          {itemData.status}
        </span>
        <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '14px', minWidth: '70px', textAlign: 'right' }} data-testid={`text-order-total-${itemData.orderId}`}>
          ${itemData.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

const OrderBody: ComponentType<AcordionListItemDataProps<OrderView>> = ({ itemData }) => (
  <div style={{ padding: '8px 0' }} data-testid={`body-order-${itemData.orderId}`}>
    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
      Items del pedido:
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
          <th style={{ textAlign: 'left', padding: '4px 8px', color: '#6b7280', fontWeight: 500 }}>Producto</th>
          <th style={{ textAlign: 'center', padding: '4px 8px', color: '#6b7280', fontWeight: 500 }}>Cant.</th>
          <th style={{ textAlign: 'right', padding: '4px 8px', color: '#6b7280', fontWeight: 500 }}>Precio</th>
          <th style={{ textAlign: 'right', padding: '4px 8px', color: '#6b7280', fontWeight: 500 }}>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {itemData.items.map((item, idx) => (
          <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '4px 8px', color: '#374151' }}>{item.name}</td>
            <td style={{ padding: '4px 8px', color: '#374151', textAlign: 'center' }}>{item.qty}</td>
            <td style={{ padding: '4px 8px', color: '#374151', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
            <td style={{ padding: '4px 8px', color: '#059669', fontWeight: 600, textAlign: 'right' }}>${(item.qty * item.price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ marginTop: '8px', textAlign: 'right', fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>
      Total: ${itemData.total.toFixed(2)}
    </div>
  </div>
);

export function ExampleFixedHeight() {
  const controller = useAcordionListController();

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>4. Altura fija + muchos items + controller</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        El contenedor tiene <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>heightMode: 'fixed'</code> con{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>height: 450</code> y <strong>15 items</strong>.
        El contenido hace scroll dentro del contenedor. Se usa{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>getItemData</code> para transformar{' '}
        <code>Order → OrderView</code> antes de pasarlo a header y body.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => controller.openAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-open-all-fixed"
        >
          Abrir todos
        </button>
        <button
          onClick={() => controller.closeAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-close-all-fixed"
        >
          Cerrar todos
        </button>
      </div>

      <AcordionList<Order, OrderView>
        id="fixed-height-demo"
        data={ordersData}
        getItemId={(item) => item.orderId}
        getItemData={(item) => ({
          orderId: item.orderId,
          customer: item.customer,
          date: item.date,
          total: item.total,
          status: item.status,
          items: item.items,
        })}
        controller={controller}
        itemHeader={{
          renderType: 'component',
          render: OrderHeader,
          arrowPosition: 'right',
        }}
        itemBody={{
          renderType: 'component',
          render: OrderBody,
          behaviors: { renderComponentStrategy: 'once' },
        }}
        layout={{
          widthMode: 'full',
          heightMode: 'fixed',
          height: 450,
          gap: 4,
        }}
        behaviors={{
          mode: 'multiple',
        }}
        callbacks={{
          onToggle: (id, isOpen) => {
            console.log(`[FixedHeight] ${id} toggled: ${isOpen}`);
          },
          onOpenChange: (openIds) => {
            console.log(`[FixedHeight] Open IDs:`, openIds);
          },
        }}
      />
    </div>
  );
}
