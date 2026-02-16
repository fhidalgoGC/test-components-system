import type { ComponentType } from 'react';
import { AcordionList } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps } from '@/lib/ui-library/components/AcordionList';

type ApiUser = {
  userId: number;
  fullName: string;
  email: string;
  department: string;
  role: string;
  joinDate: string;
  isActive: boolean;
};

type UserSummary = {
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
};

const usersData: ApiUser[] = [
  { userId: 1, fullName: 'María López', email: 'maria@empresa.com', department: 'Ingeniería', role: 'Tech Lead', joinDate: '2023-03-15', isActive: true },
  { userId: 2, fullName: 'Pedro Ramírez', email: 'pedro@empresa.com', department: 'Diseño', role: 'UX Designer', joinDate: '2024-01-10', isActive: true },
  { userId: 3, fullName: 'Laura Fernández', email: 'laura@empresa.com', department: 'Marketing', role: 'Manager', joinDate: '2022-08-20', isActive: false },
];

const UserHeader: ComponentType<AcordionListItemDataProps<UserSummary>> = ({ itemData }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <div>
      <span style={{ fontWeight: 600, fontSize: '15px', color: '#1f2937' }} data-testid={`text-user-name-${itemData.displayName}`}>
        {itemData.displayName}
      </span>
      <span style={{ fontSize: '13px', color: '#6b7280', marginLeft: '8px' }}>
        {itemData.role}
      </span>
    </div>
    <span style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: itemData.isActive ? '#22c55e' : '#ef4444',
      display: 'inline-block',
    }} data-testid={`status-user-${itemData.displayName}`} />
  </div>
);

const UserBody: ComponentType<AcordionListItemDataProps<UserSummary>> = ({ itemData }) => (
  <div style={{ padding: '8px 0', fontSize: '14px' }} data-testid={`text-user-detail-${itemData.displayName}`}>
    <p style={{ color: '#374151' }}>Email: {itemData.email}</p>
    <p style={{ color: '#374151' }}>Rol: {itemData.role}</p>
    <p style={{ color: itemData.isActive ? '#059669' : '#dc2626' }}>
      Estado: {itemData.isActive ? 'Activo' : 'Inactivo'}
    </p>
  </div>
);

export function ExampleGetItemData() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>3. getItemData — Transformación de datos</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>getItemData</code> transforma cada item del array original
        (<code>ApiUser</code>) en otro tipo (<code>UserSummary</code>) antes de pasarlo al header y body.
        Así los componentes internos reciben solo lo que necesitan.
      </p>

      <AcordionList<ApiUser, UserSummary>
        id="get-item-data-demo"
        data={usersData}
        getItemId={(item) => String(item.userId)}
        getItemData={(item) => ({
          displayName: item.fullName,
          email: item.email,
          role: item.role,
          isActive: item.isActive,
        })}
        itemHeader={{
          renderType: 'component',
          render: UserHeader,
          arrowPosition: 'right',
        }}
        itemBody={{
          renderType: 'component',
          render: UserBody,
        }}
        layout={{
          widthMode: 'full',
          gap: 4,
        }}
        behaviors={{
          mode: 'single',
        }}
      />
    </div>
  );
}
