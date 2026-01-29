import { useState } from 'react';
import { useControlDataContext } from '@/lib/ui-library/providers';
import type { FilterTransformer } from '@/lib/ui-library/providers';

type DateRange = { start: string; end: string };

const dateRangeTransformer: FilterTransformer<DateRange> = (value) => {
  console.log('🔵 [TRANSFORMER] DateRangeFilter transforming:', value);
  return { 
    dateRange: {
      start: value.start || undefined,
      end: value.end || undefined,
    }
  };
};

export function DateRangeFilter() {
  const { applyFilter } = useControlDataContext();
  const [dates, setDates] = useState<DateRange>({ start: '', end: '' });

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDates = { ...dates, start: e.target.value };
    setDates(newDates);
    console.log('📅 [UI EVENT] DateRange start changed:', newDates);
    applyFilter(dateRangeTransformer, newDates);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDates = { ...dates, end: e.target.value };
    setDates(newDates);
    console.log('📅 [UI EVENT] DateRange end changed:', newDates);
    applyFilter(dateRangeTransformer, newDates);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px', color: '#666' }}>Desde</label>
        <input
          type="date"
          value={dates.start}
          onChange={handleStartChange}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
          data-testid="date-filter-start"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px', color: '#666' }}>Hasta</label>
        <input
          type="date"
          value={dates.end}
          onChange={handleEndChange}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
          data-testid="date-filter-end"
        />
      </div>
    </div>
  );
}
