export type Employee = {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  salary: number;
  startDate: string;
  status: 'activo' | 'vacaciones' | 'licencia' | 'inactivo';
  skills: string[];
};

export type EmployeeView = {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  salary: number;
  status: Employee['status'];
  skills: string[];
};

const departments = ['Ingeniería', 'Diseño', 'Marketing', 'Ventas', 'RRHH', 'Finanzas', 'Operaciones', 'Soporte'];
const roles = ['Junior', 'Semi-Senior', 'Senior', 'Lead', 'Manager', 'Director'];
const statuses: Employee['status'][] = ['activo', 'activo', 'activo', 'vacaciones', 'licencia', 'inactivo'];
const skillSets = [
  ['React', 'TypeScript', 'Node.js'],
  ['Figma', 'CSS', 'UX Research'],
  ['SEO', 'Analytics', 'Content'],
  ['CRM', 'Negociación', 'Leads'],
  ['Reclutamiento', 'Nómina', 'Cultura'],
  ['Excel', 'SAP', 'Reporting'],
  ['Logística', 'Lean', 'KPIs'],
  ['Zendesk', 'Comunicación', 'SLA'],
];

const firstNames = [
  'Carlos', 'Ana', 'Miguel', 'Laura', 'Pedro', 'María', 'José', 'Carmen',
  'Roberto', 'Elena', 'Fernando', 'Patricia', 'Andrés', 'Sofía', 'Diego',
  'Valentina', 'Javier', 'Camila', 'Ricardo', 'Isabella', 'Gustavo', 'Daniela',
  'Alejandro', 'Lucía', 'Sebastián', 'Gabriela', 'Tomás', 'Natalia', 'Martín', 'Paula',
  'Nicolás', 'Catalina', 'Emilio', 'Mariana', 'Raúl', 'Andrea', 'Héctor', 'Valeria',
  'Óscar', 'Jimena',
];

const lastNames = [
  'Méndez', 'García', 'Torres', 'Fernández', 'Ramírez', 'López', 'Martínez', 'Ruiz',
  'Díaz', 'Morales', 'Soto', 'Reyes', 'Vargas', 'Herrera', 'Castillo',
  'Rojas', 'Ortega', 'Silva', 'Paredes', 'Aguirre', 'Muñoz', 'Navarro',
  'Córdova', 'Ríos', 'Peña', 'Campos', 'Guerrero', 'Molina', 'Vega', 'Flores',
  'Cruz', 'Jiménez', 'Salazar', 'Guzmán', 'Romero', 'Acosta', 'Delgado', 'Medina',
  'Ponce', 'Ibarra',
];

export const employeesData: Employee[] = Array.from({ length: 40 }, (_, i) => ({
  id: `EMP-${String(i + 1).padStart(3, '0')}`,
  name: `${firstNames[i]} ${lastNames[i]}`,
  department: departments[i % departments.length],
  role: roles[i % roles.length],
  email: `${firstNames[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@empresa.com`,
  salary: Math.round((30000 + Math.random() * 70000) * 100) / 100,
  startDate: `${2020 + Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  status: statuses[i % statuses.length],
  skills: skillSets[i % skillSets.length],
}));

export const statusConfig: Record<Employee['status'], { bg: string; text: string; label: string }> = {
  activo: { bg: '#dcfce7', text: '#166534', label: 'Activo' },
  vacaciones: { bg: '#dbeafe', text: '#1e40af', label: 'Vacaciones' },
  licencia: { bg: '#fef3c7', text: '#92400e', label: 'Licencia' },
  inactivo: { bg: '#fee2e2', text: '#991b1b', label: 'Inactivo' },
};
