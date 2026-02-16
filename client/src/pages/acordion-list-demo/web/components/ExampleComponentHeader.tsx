import type { ComponentType } from 'react';
import { AcordionList, useAcordionListController } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps } from '@/lib/ui-library/components/AcordionList';

type ProductData = {
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
};

const productsData: ProductData[] = [
  { sku: 'SKU-001', name: 'Laptop Pro 15"', category: 'Electrónica', price: 1299.99, stock: 45, description: 'Laptop profesional con procesador de última generación, 16GB RAM, 512GB SSD.' },
  { sku: 'SKU-002', name: 'Mouse Ergonómico', category: 'Accesorios', price: 49.99, stock: 200, description: 'Mouse inalámbrico con diseño ergonómico, sensor de alta precisión y batería recargable.' },
  { sku: 'SKU-003', name: 'Monitor 4K 27"', category: 'Electrónica', price: 599.99, stock: 30, description: 'Monitor IPS 4K con HDR, cobertura 99% sRGB, soporte ajustable incluido.' },
  { sku: 'SKU-004', name: 'Teclado Mecánico', category: 'Accesorios', price: 89.99, stock: 150, description: 'Teclado mecánico con switches azules, retroiluminación RGB, layout en español.' },
];

const ProductHeader: ComponentType<AcordionListItemDataProps<ProductData>> = ({ itemData }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '4px 0' }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: '15px', color: '#1f2937' }} data-testid={`text-product-name-${itemData.sku}`}>
        {itemData.name}
      </div>
      <div style={{ fontSize: '13px', color: '#6b7280' }}>
        {itemData.category} · {itemData.sku}
      </div>
    </div>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span style={{
        background: itemData.stock > 50 ? '#dcfce7' : '#fef3c7',
        color: itemData.stock > 50 ? '#166534' : '#92400e',
        fontSize: '12px',
        fontWeight: 600,
        padding: '2px 10px',
        borderRadius: '12px',
      }} data-testid={`text-product-stock-${itemData.sku}`}>
        {itemData.stock} uds
      </span>
      <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '14px' }} data-testid={`text-product-price-${itemData.sku}`}>
        ${itemData.price.toFixed(2)}
      </span>
    </div>
  </div>
);

const ProductBody: ComponentType<AcordionListItemDataProps<ProductData>> = ({ itemData }) => (
  <div style={{ padding: '12px 0', fontSize: '14px', color: '#374151', lineHeight: '1.6' }} data-testid={`text-product-description-${itemData.sku}`}>
    <p>{itemData.description}</p>
    <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
      <span>Categoría: <strong>{itemData.category}</strong></span>
      <span>Stock: <strong>{itemData.stock}</strong></span>
      <span>Precio: <strong>${itemData.price.toFixed(2)}</strong></span>
    </div>
  </div>
);

export function ExampleComponentHeader() {
  const controller = useAcordionListController();

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>2. Header Component + mode multiple</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        El header usa <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>renderType: 'component'</code> con un
        componente custom que recibe <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>itemData</code>.
        En modo <strong>multiple</strong>: se pueden abrir varios a la vez.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => controller.closeAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-close-all-component"
        >
          Cerrar todos
        </button>
        <button
          onClick={() => controller.refreshAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-refresh-all-component"
        >
          Refrescar todos
        </button>
      </div>

      <AcordionList
        id="component-header-demo"
        data={productsData}
        getItemId={(item) => item.sku}
        getItemData={(item) => item}
        controller={controller}
        itemHeader={{
          renderType: 'component',
          render: ProductHeader,
          arrowPosition: 'left',
        }}
        itemBody={{
          renderType: 'component',
          render: ProductBody,
          behaviors: { renderComponentStrategy: 'once' },
        }}
        layout={{
          widthMode: 'full',
          gap: 4,
        }}
        behaviors={{
          mode: 'multiple',
          defaultOpenIds: ['SKU-001'],
        }}
        callbacks={{
          onToggle: (id, isOpen) => {
            console.log(`[ComponentHeader] ${id} toggled: ${isOpen}`);
          },
          onOpenChange: (openIds) => {
            console.log(`[ComponentHeader] Open IDs:`, openIds);
          },
        }}
      />
    </div>
  );
}
