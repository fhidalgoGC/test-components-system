import { MultiControlDataProvider } from '@/lib/ui-library/providers';
import type { ControlDataState, MapParamsAdapter, SourcesMap } from '@/lib/ui-library/providers';
import { SharedFilters } from './SharedFilters';
import { FilesPanel } from './FilesPanel';
import { UsersPanel } from './UsersPanel';
import { ActiveSourcePanel } from './ActiveSourcePanel';
import styles from '../css/MultiControlDataDemo.module.css';

type FileItem = {
  id: number;
  name: string;
  type: string;
  size: number;
  status: string;
};

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

type ApiResponse<T> = {
  items: T[];
  total: number;
  page: number;
};

type ApiParams = {
  page_num: number;
  search?: string;
  status?: string;
};

const mockFiles: FileItem[] = [
  { id: 1, name: 'document.pdf', type: 'pdf', size: 1024, status: 'active' },
  { id: 2, name: 'image.png', type: 'image', size: 2048, status: 'active' },
  { id: 3, name: 'report.xlsx', type: 'excel', size: 512, status: 'archived' },
  { id: 4, name: 'presentation.pptx', type: 'pptx', size: 4096, status: 'active' },
  { id: 5, name: 'backup.zip', type: 'archive', size: 8192, status: 'archived' },
  { id: 6, name: 'notes.txt', type: 'text', size: 128, status: 'inactive' },
  { id: 7, name: 'video.mp4', type: 'video', size: 16384, status: 'active' },
  { id: 8, name: 'audio.mp3', type: 'audio', size: 3072, status: 'inactive' },
  { id: 9, name: 'database.sql', type: 'sql', size: 256, status: 'active' },
  { id: 10, name: 'config.json', type: 'json', size: 64, status: 'active' },
];

const mockUsers: UserItem[] = [
  { id: 1, name: 'Ana Garcia', email: 'ana@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Carlos Lopez', email: 'carlos@example.com', role: 'editor', status: 'active' },
  { id: 3, name: 'Maria Torres', email: 'maria@example.com', role: 'viewer', status: 'inactive' },
  { id: 4, name: 'Pedro Ruiz', email: 'pedro@example.com', role: 'editor', status: 'active' },
  { id: 5, name: 'Laura Diaz', email: 'laura@example.com', role: 'admin', status: 'active' },
  { id: 6, name: 'Jose Martinez', email: 'jose@example.com', role: 'viewer', status: 'archived' },
  { id: 7, name: 'Sofia Hernandez', email: 'sofia@example.com', role: 'editor', status: 'active' },
  { id: 8, name: 'Diego Morales', email: 'diego@example.com', role: 'viewer', status: 'inactive' },
  { id: 9, name: 'Elena Castro', email: 'elena@example.com', role: 'admin', status: 'active' },
  { id: 10, name: 'Andres Vargas', email: 'andres@example.com', role: 'editor', status: 'archived' },
  { id: 11, name: 'Lucia Romero', email: 'lucia@example.com', role: 'viewer', status: 'active' },
  { id: 12, name: 'Fernando Gil', email: 'fernando@example.com', role: 'admin', status: 'inactive' },
];

function applyFilters<T extends { status: string }>(
  items: T[],
  params: ApiParams,
  searchField: (item: T) => string,
): ApiResponse<T> {
  let filtered = [...items];

  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter((item) => searchField(item).toLowerCase().includes(s));
  }

  if (params.status) {
    filtered = filtered.filter((item) => item.status === params.status);
  }

  const pageSize = 4;
  const start = (params.page_num - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return { items: paginated, total: filtered.length, page: params.page_num };
}

const fetchFiles = async (params: ApiParams): Promise<ApiResponse<FileItem>> => {
  await new Promise((r) => setTimeout(r, 400));
  return applyFilters(mockFiles, params, (f) => f.name);
};

const fetchUsers = async (params: ApiParams): Promise<ApiResponse<UserItem>> => {
  await new Promise((r) => setTimeout(r, 600));
  return applyFilters(mockUsers, params, (u) => u.name + ' ' + u.email);
};

const sharedAdapter: MapParamsAdapter<ApiParams> = (state: ControlDataState): ApiParams => ({
  page_num: (state.page as number) || 1,
  search: (state.textSearch as string) || undefined,
  status: (state.status as string) || undefined,
});

const sources: SourcesMap = {
  files: {
    fetchFn: fetchFiles,
    mapParams: sharedAdapter,
    defaultState: { page: 1 },
    debounceMs: 400,
  },
  users: {
    fetchFn: fetchUsers,
    mapParams: sharedAdapter,
    defaultState: { page: 1 },
    debounceMs: 400,
  },
};

export function MultiControlDataExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Dos servicios con filtros compartidos</h2>
      <p className={styles.sectionDesc}>
        Un unico MultiControlDataProvider orquesta dos sources independientes: <strong>files</strong> y <strong>users</strong>.
        Los filtros de busqueda y estado aplican a ambos sources simultaneamente.
        Cada panel tiene su propio paginador independiente.
      </p>

      <MultiControlDataProvider sources={sources}>
        <SharedFilters />
        <div className={styles.panelsRow}>
          <FilesPanel />
          <UsersPanel />
        </div>
        <ActiveSourcePanel />
      </MultiControlDataProvider>
    </div>
  );
}
