import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface MovieItem {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
}

export function RenderItemModeView() {
  const movies: MovieItem[] = [
    { id: 1, title: 'The Matrix', year: 1999, rating: 8.7, genre: 'Sci-Fi' },
    { id: 2, title: 'Inception', year: 2010, rating: 8.8, genre: 'Thriller' },
    { id: 3, title: 'Interstellar', year: 2014, rating: 8.6, genre: 'Sci-Fi' },
    { id: 4, title: 'The Dark Knight', year: 2008, rating: 9.0, genre: 'Action' },
    { id: 5, title: 'Pulp Fiction', year: 1994, rating: 8.9, genre: 'Crime' },
  ];

  const renderMovie = (movie: MovieItem, index: number) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{movie.title}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-normal">{movie.rating}</span>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Badge variant="outline">{movie.genre}</Badge>
          <span>{movie.year}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto" data-testid="renderitem-mode-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">RenderItem Mode</h1>
        <p className="text-gray-600 dark:text-gray-400">
          El modo RenderItem usa una función personalizada para renderizar cada item.
          Tienes control total sobre cómo se muestra cada elemento de la lista.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ejemplo de Código</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{`const renderMovie = (movie, index) => (
  <Card>
    <CardHeader>
      <CardTitle>{movie.title}</CardTitle>
      <CardDescription>
        {movie.genre} • {movie.year}
      </CardDescription>
    </CardHeader>
  </Card>
);

<HeterogeneousList
  mode="renderItem"
  items={movies}
  renderItem={renderMovie}
  dividerVariant="none"
  gap={12}
/>`}</code>
          </pre>
        </CardContent>
      </Card>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Demo en vivo</h2>
        <HeterogeneousList
          mode="renderItem"
          items={movies}
          renderItem={renderMovie}
          dividerVariant="none"
          gap={12}
          data-testid="renderitem-list"
        />
      </div>
    </div>
  );
}
