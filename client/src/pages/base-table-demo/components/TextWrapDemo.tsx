import { useState, useMemo } from "react";
import {
  BaseTable,
  useTableState,
  TextCell,
} from "@/lib/ui-library/components/BaseTable";
import type {
  ColumnConfig,
  MaxSize,
} from "@/lib/ui-library/components/BaseTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "../css/BaseTableDemo.module.scss";

interface ColumnSetting {
  id: string;
  label: string;
  maxWidth: MaxSize | undefined | "inherit";
}

const columnMaxWidthOptions: {
  value: MaxSize | undefined | "inherit";
  label: string;
}[] = [
  { value: "inherit", label: "heredar" },
  { value: undefined, label: "auto" },
  { value: 80, label: "80px" },
  { value: 120, label: "120px" },
  { value: 200, label: "200px" },
  { value: "stretch", label: "stretch" },
  { value: "container", label: "container" },
];

const globalMaxWidthOptions: { value: MaxSize | undefined; label: string }[] = [
  { value: 80, label: "80px" },
  { value: 100, label: "100px" },
  { value: 120, label: "120px" },
  { value: 200, label: "200px" },
  { value: "stretch", label: "stretch" },
  { value: "container", label: "container" },
];

const generateColumnSetting = (index: number): ColumnSetting => ({
  id: `col${index}`,
  label: `Col ${index}`,
  maxWidth: "inherit",
});

const generateWord = (length: number): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const generateCellContent = (lettersPerWord: number, wordCount: number): string => {
  return Array.from({ length: wordCount }, () => generateWord(lettersPerWord)).join(" ");
};

const generateRowData = (
  rowIndex: number,
  columnCount: number,
  lettersPerWord: number,
  wordCount: number
): Record<string, string | number> => {
  const row: Record<string, string | number> = {};
  for (let i = 1; i <= columnCount; i++) {
    row[`col${i}`] = generateCellContent(lettersPerWord, wordCount);
  }
  return row;
};

const generateTableData = (
  rowCount: number,
  columnCount: number,
  lettersPerWord: number,
  wordCount: number
) => {
  return Array.from({ length: rowCount }, (_, i) =>
    generateRowData(i + 1, columnCount, lettersPerWord, wordCount)
  );
};

export function TextWrapDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [columnCount, setColumnCount] = useState<number>(3);
  const [rowCount, setRowCount] = useState<number>(4);
  const [columnSettings, setColumnSettings] = useState<ColumnSetting[]>(() =>
    Array.from({ length: 3 }, (_, i) => generateColumnSetting(i + 1))
  );
  const [globalMinWidth, setGlobalMinWidth] = useState<number | undefined>(
    undefined,
  );
  const [globalMaxWidth, setGlobalMaxWidth] = useState<MaxSize | undefined>(
    undefined,
  );
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [verticalScrollEnabled, setVerticalScrollEnabled] = useState<boolean>(false);
  const [textCellWidth, setTextCellWidth] = useState<number | "auto">(80);
  const [lettersPerWord, setLettersPerWord] = useState<number>(5);
  const [wordCount, setWordCount] = useState<number>(1);
  const [dataKey, setDataKey] = useState<number>(0);

  const tableData = useMemo(
    () => generateTableData(rowCount, columnSettings.length, lettersPerWord, wordCount),
    [rowCount, columnSettings.length, lettersPerWord, wordCount, dataKey]
  );

  const updateColumnMaxWidth = (
    columnId: string,
    newMaxWidth: MaxSize | undefined | "inherit",
  ) => {
    setColumnSettings((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, maxWidth: newMaxWidth } : col,
      ),
    );
  };

  const setColumnCountAndUpdate = (newCount: number) => {
    if (newCount < 1) newCount = 1;
    if (newCount > 50) newCount = 50;
    setColumnCount(newCount);
    
    if (newCount > columnSettings.length) {
      const newColumns = Array.from(
        { length: newCount - columnSettings.length },
        (_, i) => generateColumnSetting(columnSettings.length + i + 1)
      );
      setColumnSettings((prev) => [...prev, ...newColumns]);
    } else if (newCount < columnSettings.length) {
      setColumnSettings((prev) => prev.slice(0, newCount));
    }
  };

  const addColumn = () => {
    setColumnCountAndUpdate(columnSettings.length + 1);
  };

  const removeColumn = (columnId: string) => {
    if (columnSettings.length > 1) {
      setColumnSettings((prev) => prev.filter((c) => c.id !== columnId));
      setColumnCount((prev) => Math.max(1, prev - 1));
    }
  };

  const resetColumns = () => {
    setColumnCount(3);
    setColumnSettings(Array.from({ length: 3 }, (_, i) => generateColumnSetting(i + 1)));
  };

  const columns: ColumnConfig[] = columnSettings.map((col, index) => ({
    metadata: { columnId: col.id, order: index },
    header: { cell: { render: <TextCell text={col.label} /> } },
    maxWidth: col.maxWidth === "inherit" ? undefined : col.maxWidth,
  }));

  const getMaxWidthDisplay = (maxWidth: MaxSize | undefined | "inherit") => {
    if (maxWidth === "inherit") return "heredar";
    if (maxWidth === undefined) return "auto";
    if (typeof maxWidth === "number") return `${maxWidth}px`;
    return maxWidth;
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>TextWrapDemo.tsx</div>
      <h2 className={styles.section__title}>
        7. Configuracion de Anchos por Columna
      </h2>
      <p className={styles.section__description}>
        Prueba diferentes configuraciones de ancho por columna. Agrega/quita
        columnas y cambia el maxWidth de cada una.
      </p>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Columnas:</div>
        <div className={styles.controls}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setColumnCountAndUpdate(columnSettings.length - 1)}
            disabled={columnSettings.length <= 1}
            data-testid="btn-remove-column"
          >
            -
          </Button>
          <Input
            type="number"
            min={1}
            max={50}
            value={columnCount}
            onChange={(e) => setColumnCountAndUpdate(parseInt(e.target.value) || 1)}
            style={{ width: 60, textAlign: "center" }}
            data-testid="input-column-count"
          />
          <Button
            variant="default"
            size="sm"
            onClick={addColumn}
            disabled={columnSettings.length >= 50}
            data-testid="btn-add-column"
          >
            +
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetColumns}
            data-testid="btn-reset-columns"
          >
            Reset
          </Button>
          <span style={{ fontSize: 12, color: "#666" }}>
            ({columnSettings.length} columnas, max 50)
          </span>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Filas:</div>
        <div className={styles.controls}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRowCount((prev) => Math.max(1, prev - 1))}
            disabled={rowCount <= 1}
            data-testid="btn-remove-row"
          >
            -
          </Button>
          <Input
            type="number"
            min={1}
            max={100}
            value={rowCount}
            onChange={(e) => setRowCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 60, textAlign: "center" }}
            data-testid="input-row-count"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => setRowCount((prev) => Math.min(100, prev + 1))}
            disabled={rowCount >= 100}
            data-testid="btn-add-row"
          >
            +
          </Button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Letras/Palabra:</div>
        <div className={styles.controls}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setLettersPerWord((prev) => Math.max(1, prev - 1)); setDataKey((k) => k + 1); }}
            disabled={lettersPerWord <= 1}
            data-testid="btn-letters-minus"
          >
            -
          </Button>
          <Input
            type="number"
            min={1}
            max={50}
            value={lettersPerWord}
            onChange={(e) => { setLettersPerWord(Math.min(50, Math.max(1, parseInt(e.target.value) || 1))); setDataKey((k) => k + 1); }}
            style={{ width: 60, textAlign: "center" }}
            data-testid="input-letters-per-word"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => { setLettersPerWord((prev) => Math.min(50, prev + 1)); setDataKey((k) => k + 1); }}
            disabled={lettersPerWord >= 50}
            data-testid="btn-letters-plus"
          >
            +
          </Button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Palabras/Celda:</div>
        <div className={styles.controls}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setWordCount((prev) => Math.max(1, prev - 1)); setDataKey((k) => k + 1); }}
            disabled={wordCount <= 1}
            data-testid="btn-words-minus"
          >
            -
          </Button>
          <Input
            type="number"
            min={1}
            max={20}
            value={wordCount}
            onChange={(e) => { setWordCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1))); setDataKey((k) => k + 1); }}
            style={{ width: 60, textAlign: "center" }}
            data-testid="input-word-count"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => { setWordCount((prev) => Math.min(20, prev + 1)); setDataKey((k) => k + 1); }}
            disabled={wordCount >= 20}
            data-testid="btn-words-plus"
          >
            +
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDataKey((k) => k + 1)}
            data-testid="btn-regenerate"
          >
            Regenerar
          </Button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>MinWidth Default:</div>
        <div className={styles.controls}>
          {[undefined, 50, 80, 100].map((value) => (
            <Button
              key={String(value)}
              variant={globalMinWidth === value ? "default" : "outline"}
              size="sm"
              onClick={() => setGlobalMinWidth(value)}
              data-testid={`btn-minwidth-${value}`}
            >
              {value === undefined ? "ninguno" : `${value}px`}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>MaxWidth Default:</div>
        <div className={styles.controls}>
          {globalMaxWidthOptions.map((option) => (
            <Button
              key={String(option.value)}
              variant={globalMaxWidth === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setGlobalMaxWidth(option.value)}
              data-testid={`btn-maxwidth-default-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>TextCell Width:</div>
        <div className={styles.controls}>
          {["auto" as const, 40, 60, 80, 100, 120, 150].map((value) => (
            <Button
              key={String(value)}
              variant={textCellWidth === value ? "default" : "outline"}
              size="sm"
              onClick={() => setTextCellWidth(value)}
              data-testid={`btn-textcell-width-${value}`}
            >
              {value === "auto" ? "auto" : `${value}px`}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Scroll Horizontal:</div>
        <div className={styles.controls}>
          <Button
            variant={scrollEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setScrollEnabled(true)}
            data-testid="btn-scroll-true"
          >
            true
          </Button>
          <Button
            variant={!scrollEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setScrollEnabled(false)}
            data-testid="btn-scroll-false"
          >
            false
          </Button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Scroll Vertical (600px):</div>
        <div className={styles.controls}>
          <Button
            variant={verticalScrollEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setVerticalScrollEnabled(true)}
            data-testid="btn-vscroll-true"
          >
            true
          </Button>
          <Button
            variant={!verticalScrollEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setVerticalScrollEnabled(false)}
            data-testid="btn-vscroll-false"
          >
            false
          </Button>
        </div>
      </div>

      <div className={styles.infoBox} style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>MaxWidth por Columna:</strong>
        </div>
        {columnSettings.map((col) => (
          <div
            key={col.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
            }}
          >
            <span style={{ minWidth: 100, fontWeight: 500 }}>{col.label}:</span>
            {columnMaxWidthOptions.map((option) => (
              <Button
                key={`${col.id}-${String(option.value)}`}
                variant={col.maxWidth === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateColumnMaxWidth(col.id, option.value)}
                data-testid={`btn-${col.id}-${option.value}`}
                style={{ fontSize: 11, padding: "2px 8px", height: 24 }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div>
          <strong>Resumen:</strong>
        </div>
        <div>
          Columnas:{" "}
          {columnSettings
            .map((c) => `${c.label}(${getMaxWidthDisplay(c.maxWidth)})`)
            .join(" | ")}
        </div>
        <div>
          MinWidth Default: {globalMinWidth ?? "ninguno"} | MaxWidth Default:{" "}
          {getMaxWidthDisplay(globalMaxWidth)} | Scroll H:{" "}
          {scrollEnabled ? "si" : "no"} | Scroll V:{" "}
          {verticalScrollEnabled ? "600px" : "no"} | TextCell: {textCellWidth === "auto" ? "auto" : `${textCellWidth}px`}
        </div>
        <div>
          Contenido: {lettersPerWord} letras/palabra x {wordCount} palabra(s) = ~{lettersPerWord * wordCount + (wordCount - 1)} caracteres
        </div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Nota: Los defaults aplican cuando la columna no tiene valor propio
        </div>
      </div>

      <div className={styles.demoBox} data-testid="demo-textwrap">
        <BaseTable
          key={JSON.stringify(columnSettings) + globalMinWidth + scrollEnabled + textCellWidth + verticalScrollEnabled}
          data={tableData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: verticalScrollEnabled ? "fixed" : "auto",
              height: verticalScrollEnabled ? 600 : undefined,
            },
            columnsDefault: {
              minWidth: globalMinWidth,
              maxWidth: globalMaxWidth,
              scroll: scrollEnabled,
            },
            headersDefault: {
              cell: {
                horizontalAlign: "center",
              },
            },
            cellsDefault: {
              horizontalAlign: "left",
              verticalAlign: "middle",
              render: (value) => <TextCell text={value} width={textCellWidth} />,
            },
            rowsDefault: {
              hoverable: true,
            },
          }}
        />
      </div>
    </section>
  );
}
