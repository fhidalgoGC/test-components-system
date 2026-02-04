import { BasicListDemo } from './components/BasicListDemo';
import { InfiniteScrollDemo } from './components/InfiniteScrollDemo';
import { RenderStatesDemo } from './components/RenderStatesDemo';
import { CustomLoadingDemo } from './components/CustomLoadingDemo';

const ListDemo = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">List Component</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Componente agnóstico con control externo del ciclo de render mediante useListController.
          El List no interpreta ni obtiene data - solo renderiza lo que recibe.
        </p>
      </div>

      <BasicListDemo />
      <InfiniteScrollDemo />
      <RenderStatesDemo />
      <CustomLoadingDemo />
    </div>
  );
};

export default ListDemo;
