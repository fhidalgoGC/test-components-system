import { useState, useMemo } from 'react';
import type { ComponentType } from 'react';
import { AcordionList, useAcordionListController } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps } from '@/lib/ui-library/components/AcordionList';
import { employeesData, statusConfig } from './shared-data';
import type { Employee, EmployeeView } from './shared-data';

const EmployeeHeader: ComponentType<AcordionListItemDataProps<EmployeeView>> = ({ itemData }) => {
  const colors = statusConfig[itemData.status];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '2px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 700, fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }} data-testid={`text-emp-id-${itemData.id}`}>
          {itemData.id}
        </span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#1f2937' }} data-testid={`text-emp-name-${itemData.id}`}>
          {itemData.name}
        </span>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          {itemData.department}
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
        }} data-testid={`status-emp-${itemData.id}`}>
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
  <div style={{ padding: '8px 0', fontSize: '13px', color: '#374151' }} data-testid={`body-emp-${itemData.id}`}>
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

const recordOptions = [5, 10, 15, 20, 40];

export function ExampleVisibleRecords() {
  const [visibleCount, setVisibleCount] = useState(5);
  const controller = useAcordionListController();

  const visibleData = useMemo(() => {
    return employeesData.slice(0, visibleCount);
  }, [visibleCount]);

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>5. Selector de registros visibles</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Hay <strong>40 empleados</strong> en total. Seleccionas cuántos quieres ver a la vez.
        El <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>data</code> se corta con <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>slice(0, visibleCount)</code> y
        el componente re-renderiza solo los visibles.
      </p>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>Mostrar:</label>
          <select
            value={visibleCount}
            onChange={(e) => {
              setVisibleCount(Number(e.target.value));
              controller.closeAll();
            }}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              background: '#fff',
            }}
            data-testid="select-visible-count"
          >
            {recordOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} registros
              </option>
            ))}
          </select>
        </div>

        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          Mostrando <strong>{visibleData.length}</strong> de <strong>{employeesData.length}</strong>
        </span>

        <button
          onClick={() => controller.closeAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-close-all-visible"
        >
          Cerrar todos
        </button>
      </div>

      <AcordionList<Employee, EmployeeView>
        id="visible-records-demo"
        data={visibleData}
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
          heightMode: 'fixed',
          height: 400,
          gap: 4,
        }}
        behaviors={{
          mode: 'multiple',
        }}
        callbacks={{
          onToggle: (id, isOpen) => {
            console.log(`[VisibleRecords] ${id} toggled: ${isOpen}`);
          },
        }}
      />
    </div>
  );
}
