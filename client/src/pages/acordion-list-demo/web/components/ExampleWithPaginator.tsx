import { useState, useMemo } from 'react';
import type { ComponentType } from 'react';
import { AcordionList, useAcordionListController } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps } from '@/lib/ui-library/components/AcordionList';
import { Paginator } from '@/lib/ui-library/components/Paginator';
import { employeesData, statusConfig } from './shared-data';
import type { Employee, EmployeeView } from './shared-data';

const EmployeeHeader: ComponentType<AcordionListItemDataProps<EmployeeView>> = ({ itemData }) => {
  const colors = statusConfig[itemData.status];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '2px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 700, fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }} data-testid={`text-pag-emp-id-${itemData.id}`}>
          {itemData.id}
        </span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#1f2937' }} data-testid={`text-pag-emp-name-${itemData.id}`}>
          {itemData.name}
        </span>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          {itemData.department} · {itemData.role}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{
          background: colors.bg,
          color: colors.text,
          fontSize: '11px',
          fontWeight: 600,
          padding: '2px 10px',
          borderRadius: '12px',
        }} data-testid={`status-pag-emp-${itemData.id}`}>
          {colors.label}
        </span>
        <span style={{ fontWeight: 600, color: '#1d4ed8', fontSize: '13px', minWidth: '80px', textAlign: 'right' }}>
          ${itemData.salary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

const EmployeeBody: ComponentType<AcordionListItemDataProps<EmployeeView>> = ({ itemData }) => (
  <div style={{ padding: '8px 0', fontSize: '13px', color: '#374151' }} data-testid={`body-pag-emp-${itemData.id}`}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
      <div><span style={{ color: '#6b7280' }}>Email:</span> {itemData.email}</div>
      <div><span style={{ color: '#6b7280' }}>Rol:</span> {itemData.role}</div>
      <div><span style={{ color: '#6b7280' }}>Departamento:</span> {itemData.department}</div>
      <div><span style={{ color: '#6b7280' }}>Salario:</span> ${itemData.salary.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
    </div>
    <div>
      <span style={{ color: '#6b7280' }}>Skills: </span>
      {itemData.skills.map((skill, i) => (
        <span key={i} style={{
          background: '#f1f5f9',
          color: '#475569',
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '10px',
          marginRight: '4px',
          display: 'inline-block',
          marginBottom: '2px',
        }}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export function ExampleWithPaginator() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const controller = useAcordionListController();

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return employeesData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    controller.closeAll();
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
    controller.closeAll();
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>6. AcordionList con Paginator</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Se combinan <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>AcordionList</code> y{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>Paginator</code> como componentes independientes.
        El estado de la página se maneja externamente con <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>useState</code>.
        Al cambiar de página se cierran los acordeones abiertos.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          Página <strong>{currentPage}</strong> · Mostrando <strong>{paginatedData.length}</strong> de <strong>{employeesData.length}</strong> empleados
        </span>
        <button
          onClick={() => controller.closeAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-close-all-paginated"
        >
          Cerrar todos
        </button>
      </div>

      <AcordionList<Employee, EmployeeView>
        id="paginated-demo"
        data={paginatedData}
        getItemId={(item) => item.id}
        getItemData={(item) => ({
          id: item.id,
          name: item.name,
          department: item.department,
          role: item.role,
          email: item.email,
          salary: item.salary,
          status: item.status,
          skills: item.skills,
        })}
        controller={controller}
        itemHeader={{
          renderType: 'component',
          render: EmployeeHeader,
          arrowPosition: 'right',
        }}
        itemBody={{
          renderType: 'component',
          render: EmployeeBody,
          behaviors: { renderComponentStrategy: 'once' },
        }}
        layout={{
          widthMode: 'full',
          gap: 4,
        }}
        behaviors={{
          mode: 'multiple',
        }}
        callbacks={{
          onToggle: (id, isOpen) => {
            console.log(`[Paginated] ${id} toggled: ${isOpen}`);
          },
        }}
      />

      <div style={{ marginTop: '16px' }}>
        <Paginator
          totalItems={employeesData.length}
          initialCurrentPage={1}
          initialItemsPerPage={5}
          itemsPerPageOptions={[5, 10, 15, 20]}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          showItemsPerPage={true}
          showPageNumbers={true}
          maxVisiblePages={5}
        />
      </div>
    </div>
  );
}
