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
    { id: 6, title: 'Fight Club', year: 1999, rating: 8.8, genre: 'Drama' },
    { id: 7, title: 'Forrest Gump', year: 1994, rating: 8.8, genre: 'Drama' },
    { id: 8, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, genre: 'Drama' },
    { id: 9, title: 'The Godfather', year: 1972, rating: 9.2, genre: 'Crime' },
    { id: 10, title: 'Parasite', year: 2019, rating: 8.5, genre: 'Thriller' },
    { id: 11, title: 'Gladiator', year: 2000, rating: 8.5, genre: 'Action' },
    { id: 12, title: 'The Prestige', year: 2006, rating: 8.5, genre: 'Mystery' },
    { id: 13, title: 'Memento', year: 2000, rating: 8.4, genre: 'Mystery' },
    { id: 14, title: 'The Departed', year: 2006, rating: 8.5, genre: 'Crime' },
    { id: 15, title: 'Whiplash', year: 2014, rating: 8.5, genre: 'Drama' },
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
    <div data-testid="renderitem-mode-page">
      <HeterogeneousList
        mode="renderItem"
        items={movies}
        renderItem={renderMovie}
        dividerVariant="none"
        gap={12}
        data-testid="renderitem-list"
      />
    </div>
  );
}
