import { useContext, useCallback } from "react";
import type { CSSProperties } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import type { GoogleMapProps, GoogleMapLayout } from "../../shared/types";
import { useGoogleMap } from "../../shared/hooks";
import { useI18nMerge } from "../../shared/hooks/useI18nMerge.hook";
import { ConfigContext } from "../../../../providers/AppEnviromentProvider/index.hook";
import { GOOGLE_MAP_CONFIG } from "../../shared/environment";
import styles from "../styles/GoogleMap.module.css";

const getLayoutStyles = (layout?: GoogleMapLayout): CSSProperties => {
  const style: CSSProperties = {};

  const wMode = layout?.widthMode || "full";
  const hMode = layout?.heightMode || "fixed";

  if (wMode === "full") style.width = "100%";
  else if (wMode === "auto") style.width = "auto";
  else if (wMode === "fixed" && layout?.width) style.width = layout.width;
  else if (wMode === "percentage" && layout?.width)
    style.width = `${layout.width}%`;

  if (layout?.minWidth) style.minWidth = layout.minWidth;

  if (hMode === "full") style.height = "100%";
  else if (hMode === "auto") style.height = "auto";
  else if (hMode === "fixed") style.height = layout?.height ?? 400;
  else if (hMode === "percentage" && layout?.height && layout.height !== "auto")
    style.height = `${layout.height}%`;

  if (layout?.minHeight) style.minHeight = layout.minHeight;

  const verticalMap = {
    top: "flex-start",
    middle: "center",
    bottom: "flex-end",
  } as const;
  const horizontalMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  } as const;

  const vertical = layout?.align?.vertical || "middle";
  const horizontal = layout?.align?.horizontal || "center";

  style.display = "flex";
  style.flexDirection = "column";
  style.justifyContent = verticalMap[vertical];
  style.alignItems = horizontalMap[horizontal];

  return style;
};

export const GoogleMapView = (props: GoogleMapProps) => {
  const { apiKey, layout, className, langOverride, i18nOrder, mapId } = props;

  const configContext = useContext(ConfigContext);
  const resolvedApiKey =
    apiKey ||
    configContext?.environment?.GOOGLE_MAP_CONFIG?.GOOGLE_MAPS_API_KEY ||
    GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY;

  const { t, lang } = useI18nMerge(langOverride, { order: i18nOrder });

  const {
    center,
    zoom,
    markers,
    mapOptions,
    handleMapClick,
    handleMarkerClick,
    handleMarkerDragEnd,
  } = useGoogleMap(props, lang);

  const containerStyle = getLayoutStyles(layout);

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      handleMapClick(e);
    },
    [handleMapClick],
  );

  if (!resolvedApiKey) {
    return (
      <div
        className={`${styles.container} ${className || ""}`}
        style={containerStyle}
        data-testid="googlemap"
      >
        <div
          className={styles.loading}
          style={{ width: "100%", height: "100%" }}
          data-testid="googlemap-no-key"
        >
          {t("errorApiKey")}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      style={containerStyle}
      data-testid="googlemap"
    >
      <APIProvider apiKey={resolvedApiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="cooperative"
          zoomControl={mapOptions.zoomControl}
          streetViewControl={mapOptions.streetViewControl}
          mapTypeControl={mapOptions.mapTypeControl}
          fullscreenControl={mapOptions.fullscreenControl}
          mapId={mapId || "DEFAULT_MAP_ID"}
          onClick={onMapClick}
        >
          {markers.map((marker) => (
            <AdvancedMarker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              draggable={marker.draggable}
              onClick={() => handleMarkerClick(marker)}
              onDragEnd={(e) => handleMarkerDragEnd(marker, e)}
            >
              <Pin />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};
