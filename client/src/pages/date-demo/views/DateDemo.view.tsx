import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useAppLanguage, ConfigProvider, useConfig } from "@/lib/ui-library/providers";
import { useDateFormatter, useFormattedDate } from "@/lib/ui-library/utils/dates/dates.util";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/ui-library/utils";
import { environment } from "@/enviorments/enviroment";

function DateDemoContent() {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const app = useAppLanguage();
  const { config } = useConfig();
  const formatter = useDateFormatter();
  const formattedDate = useFormattedDate(date);

  // Log para ver la configuración de fechas
  console.log("📅 Date Config from merged:", {
    dateFormat: app?.dateFormat,
    twoDigits: app?.twoDigits,
    lang: app?.lang
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold mb-4" data-testid="text-page-title">
          Date Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Prueba el sistema de formateo de fechas usando <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">dates.util.ts</code>
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📊 Configuración de Fechas:
          </h3>
          <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <li>
              <strong>Idioma:</strong> {app?.lang}
            </li>
            <li>
              <strong>Formato:</strong> {app?.dateFormat}
            </li>
            <li>
              <strong>Dos dígitos:</strong> {app?.twoDigits ? "Sí" : "No"}
            </li>
            <li>
              <strong>Locale:</strong> {config?.LANGUAGE_CONFIG?.[app?.lang || 'en']?.locale}
            </li>
          </ul>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Cambia el idioma desde el header y observa cómo cambia el formato de la fecha.
        </p>
      </div>

      {/* Date Input with Calendar */}
      <div className="space-y-2">
        <Label htmlFor="contract-date" className="text-sm font-medium">
          Contract Date <span className="text-red-500">*</span>
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              data-testid="button-open-calendar"
            >
              <Input
                type="text"
                value={formattedDate}
                readOnly
                className="border-0 p-0 h-auto focus-visible:ring-0 cursor-pointer"
                placeholder="Selecciona una fecha"
                data-testid="input-date-display"
              />
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              data-testid="calendar-picker"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Display formatted date info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          📝 Fecha Formateada:
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Fecha seleccionada:</span>
            <span className="font-mono font-semibold" data-testid="text-formatted-date">
              {formattedDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Formato usado:</span>
            <span className="font-mono text-xs">{app?.dateFormat}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">ISO String:</span>
            <span className="font-mono text-xs text-gray-500">
              {date.toISOString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Locale String:</span>
            <span className="font-mono text-xs text-gray-500">
              {date.toLocaleDateString(config?.LANGUAGE_CONFIG?.[app?.lang || 'en']?.locale)}
            </span>
          </div>
        </div>
      </div>

      {/* Test different dates */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          🧪 Prueba otras fechas:
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDate(new Date())}
            data-testid="button-today"
          >
            Hoy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setDate(tomorrow);
            }}
            data-testid="button-tomorrow"
          >
            Mañana
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const nextMonth = new Date();
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              setDate(nextMonth);
            }}
            data-testid="button-next-month"
          >
            Próximo mes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const nextYear = new Date();
              nextYear.setFullYear(nextYear.getFullYear() + 1);
              setDate(nextYear);
            }}
            data-testid="button-next-year"
          >
            Próximo año
          </Button>
        </div>
      </div>

      {/* Info about the formatter */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          💡 Hooks usados:
        </h3>
        <ul className="text-sm space-y-1 text-green-800 dark:text-green-200">
          <li>
            <code className="text-xs bg-green-100 dark:bg-green-900 px-1 rounded">
              useDateFormatter()
            </code>{" "}
            - Retorna función para formatear fechas
          </li>
          <li>
            <code className="text-xs bg-green-100 dark:bg-green-900 px-1 rounded">
              useFormattedDate(date)
            </code>{" "}
            - Retorna string formateado directamente
          </li>
          <li className="text-xs mt-2">
            ✅ Ambos hooks respetan el idioma del AppLanguageProvider
          </li>
        </ul>
      </div>
    </div>
  );
}

export function DateDemoView() {
  // Wrap with ConfigProvider to test environment override
  return (
    <ConfigProvider parentConfig={environment} priority="auto">
      <DateDemoContent />
    </ConfigProvider>
  );
}
