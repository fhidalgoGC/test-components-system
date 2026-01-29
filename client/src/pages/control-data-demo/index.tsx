import { ControlDataProvider } from '@/lib/ui-library/providers';
import type { ControlDataState, MapParamsAdapter } from '@/lib/ui-library/providers';
import { SearchFilter } from './components/SearchFilter';
import { DateRangeFilter } from './components/DateRangeFilter';
import { StatusFilter } from './components/StatusFilter';
import { DataTable } from './components/DataTable';
import { PaginationControls } from './components/PaginationControls';
import { StateDebugger } from './components/StateDebugger';

type FileItem = {
  id: number;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  status: string;
};

type ApiResponse = {
  items: FileItem[];
  total: number;
  page: number;
};

type ApiParams = {
  page_num: number;
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  sort_field?: string;
  sort_dir?: string;
};

const mockFiles: FileItem[] = [
  { id: 1, name: 'document.pdf', type: 'pdf', size: 1024, createdAt: '2026-01-15', status: 'active' },
  { id: 2, name: 'image.png', type: 'image', size: 2048, createdAt: '2026-01-16', status: 'active' },
  { id: 3, name: 'report.xlsx', type: 'excel', size: 512, createdAt: '2026-01-17', status: 'archived' },
  { id: 4, name: 'presentation.pptx', type: 'powerpoint', size: 4096, createdAt: '2026-01-18', status: 'active' },
  { id: 5, name: 'backup.zip', type: 'archive', size: 8192, createdAt: '2026-01-19', status: 'archived' },
  { id: 6, name: 'notes.txt', type: 'text', size: 128, createdAt: '2026-01-20', status: 'draft' },
  { id: 7, name: 'video.mp4', type: 'video', size: 16384, createdAt: '2026-01-21', status: 'active' },
  { id: 8, name: 'audio.mp3', type: 'audio', size: 3072, createdAt: '2026-01-22', status: 'draft' },
  { id: 9, name: 'database.sql', type: 'sql', size: 256, createdAt: '2026-01-23', status: 'active' },
  { id: 10, name: 'config.json', type: 'json', size: 64, createdAt: '2026-01-24', status: 'active' },
  { id: 11, name: 'styles.css', type: 'css', size: 512, createdAt: '2026-01-25', status: 'active' },
  { id: 12, name: 'script.js', type: 'javascript', size: 1024, createdAt: '2026-01-26', status: 'draft' },
];

const mockFetchFiles = async (params: ApiParams): Promise<ApiResponse> => {
  console.log('🔵 [API CALL] fetchFiles called with params:', params);
  
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredItems = [...mockFiles];

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchLower)
    );
    console.log(`🔍 [FILTER] Search "${params.search}" -> ${filteredItems.length} items`);
  }

  if (params.status) {
    filteredItems = filteredItems.filter((item) => item.status === params.status);
    console.log(`🏷️ [FILTER] Status "${params.status}" -> ${filteredItems.length} items`);
  }

  if (params.date_from) {
    filteredItems = filteredItems.filter((item) => item.createdAt >= params.date_from!);
    console.log(`📅 [FILTER] Date from "${params.date_from}" -> ${filteredItems.length} items`);
  }

  if (params.date_to) {
    filteredItems = filteredItems.filter((item) => item.createdAt <= params.date_to!);
    console.log(`📅 [FILTER] Date to "${params.date_to}" -> ${filteredItems.length} items`);
  }

  const pageSize = 5;
  const start = (params.page_num - 1) * pageSize;
  const paginatedItems = filteredItems.slice(start, start + pageSize);

  console.log(`✅ [API RESPONSE] Returning ${paginatedItems.length} items (page ${params.page_num}, total: ${filteredItems.length})`);

  return {
    items: paginatedItems,
    total: filteredItems.length,
    page: params.page_num,
  };
};

const filesAdapter: MapParamsAdapter<ApiParams> = (state: ControlDataState): ApiParams => {
  console.log('🟡 [ADAPTER] mapParams transforming state:', state);

  const params: ApiParams = {
    page_num: state.page,
    search: (state.filters.textSearch as string) || undefined,
    status: (state.filters.status as string) || undefined,
    date_from: (state.filters.dateRange as { start?: string; end?: string })?.start || undefined,
    date_to: (state.filters.dateRange as { start?: string; end?: string })?.end || undefined,
    sort_field: state.sort?.field || undefined,
    sort_dir: state.sort?.direction || undefined,
  };

  console.log('🟢 [ADAPTER] Transformed to API params:', params);
  return params;
};

export default function ControlDataDemo() {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>ControlData Provider Demo</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Abre la consola del navegador (F12) para ver los logs de cada operación
      </p>

      <ControlDataProvider<ApiParams, ApiResponse>
        fetchFn={mockFetchFiles}
        mapParams={filesAdapter}
        initialState={{ page: 1 }}
        debounceMs={400}
      >
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginBottom: '16px',
              flexWrap: 'wrap',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <SearchFilter />
              <StatusFilter />
              <DateRangeFilter />
            </div>

            <DataTable />
            <PaginationControls />
          </div>

          <StateDebugger />
        </div>
      </ControlDataProvider>
    </div>
  );
}
