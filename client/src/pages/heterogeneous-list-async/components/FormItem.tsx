interface FormItemProps {
  item: {
    id: string;
    kindComponent: string;
    title: string;
    description: string;
  };
}

export function FormItem({ item }: FormItemProps) {
  return (
    <div className="py-3" data-testid={`form-item-${item.id}`}>
      <div className="space-y-3">
        <div>
          <label htmlFor={`input-${item.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {item.title}
          </label>
          <input
            id={`input-${item.id}`}
            type="text"
            placeholder={item.description}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid={`input-${item.id}`}
          />
        </div>
      </div>
    </div>
  );
}
