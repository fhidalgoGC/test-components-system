import { useState } from "react";
import { GoogleMap } from "@/lib/ui-library/components/GoogleMap";
import { ConfigProvider, useConfig } from "@/lib/ui-library/providers";
import type {
  MapDataItem,
  MapCenter,
} from "@/lib/ui-library/components/GoogleMap/shared/types";
import styles from "../css/GoogleMapDemo.module.css";

import { environment } from "../../../../enviorments/enviroment";

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

const parentEnvironment = {
  GOOGLE_MAP_CONFIG: {
    GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  },
};

const DEMO_DATA: MapDataItem[] = [
  {
    id: "cp-1",
    position: { lat: 19.4326, lng: -99.1332 },
    labelI18n: { en: "Mexico City", es: "Ciudad de México", default: "CDMX" },
    metadata: { color: "#FF6600" },
  },
  {
    id: "cp-2",
    position: { lat: 19.4352, lng: -99.1412 },
    labelI18n: {
      en: "Reforma Avenue",
      es: "Paseo de la Reforma",
      default: "Reforma",
    },
    metadata: { color: "#9900CC" },
  },
];

function ConfigInfo() {
  const { config } = useConfig();
  const resolvedKey =
    (config as any)?.GOOGLE_MAP_CONFIG?.GOOGLE_MAPS_API_KEY || "";
  const masked = resolvedKey
    ? `${resolvedKey.slice(0, 10)}...${resolvedKey.slice(-4)}`
    : "(vacía)";

  return (
    <div
      className={styles.infoBox + " " + styles.infoBoxBlue}
      style={{ marginBottom: 12 }}
    >
      <strong>ConfigProvider</strong>
      <div style={{ fontSize: 12, marginTop: 4 }}>
        GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY: {masked}
      </div>
      <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>
        El GoogleMap toma la API key del ConfigProvider sin pasarla como prop
      </div>
    </div>
  );
}

function MapWithoutApiKey() {
  const [clickedItem, setClickedItem] = useState<MapDataItem | null>(null);

  return (
    <>
      <ConfigInfo />
      <div className={styles.mapContainer}>
        <GoogleMap
          center={DEFAULT_CENTER}
          zoom={14}
          data={DEMO_DATA}
          layout={{ widthMode: "full", heightMode: "fixed", height: 350 }}
          showZoomControl={true}
          onDataItemClick={(item) => setClickedItem(item)}
        />
      </div>
      {clickedItem && (
        <div
          className={styles.infoBox + " " + styles.infoBoxGreen}
          style={{ marginTop: 8 }}
        >
          <strong>Item seleccionado:</strong>{" "}
          {clickedItem.labelI18n?.es || clickedItem.labelI18n?.default}
        </div>
      )}

      <div className={styles.codeBlock} style={{ marginTop: 12 }}>
        {`<ConfigProvider parentConfig={parentEnv} priority="auto">
  <GoogleMap
    center={{ lat: 19.43, lng: -99.13 }}
    zoom={14}
    data={data}
    onDataItemClick={(item) => console.log(item)}
  />
</ConfigProvider>`}
      </div>
    </>
  );
}

export function ConfigProviderExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Sin prop apiKey (ConfigProvider)</h2>
      <p className={styles.sectionDescription}>
        El mapa NO recibe <code>apiKey</code> como prop. La resuelve
        automáticamente desde el
        <code> ConfigProvider</code> (o variable de entorno{" "}
        <code>VITE_GOOGLE_MAPS_API_KEY</code>).
      </p>

      <ConfigProvider parentConfig={parentEnvironment} priority="auto">
        <MapWithoutApiKey />
      </ConfigProvider>
    </div>
  );
}
