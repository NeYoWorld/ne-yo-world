"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import type { Language } from "../context/LanguageContext";
import { concertMapTranslations } from "./ConcertMapTranslations";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";




type Concert = {
  id: string;
  event_date: string;
  city: string;
  region: string | null;
  venue: string | null;
  tour_name: string | null;
  event_name: string | null;
  event_type: string;
  latitude: number | null;
  longitude: number | null;

  source_url: string | null;



  countries?: {
    name?: string;
    slug?: string;
    code?: string;
  } | null;
};


type ConcertMapClientProps = {
  concerts: Concert[];
  language: Language;
};


/* ============================================================
   WORLD LIMITS
============================================================ */

const WORLD_BOUNDS = L.latLngBounds(
  L.latLng(-85, -180),
  L.latLng(85, 180)
);




/* ============================================================
   MAP COVERAGE COPY
============================================================ */

const mapCoverageCopy: Record<
  Language,
  { mapped: string; noMapped: string }
> = {
  EN: {
    mapped: "mapped",
    noMapped: "No mapped performances for these filters",
  },
  PT: {
    mapped: "localizadas no mapa",
    noMapped: "Não há atuações localizadas no mapa para estes filtros",
  },
  ES: {
    mapped: "ubicadas en el mapa",
    noMapped: "No hay actuaciones ubicadas en el mapa para estos filtros",
  },
  FR: {
    mapped: "localisées sur la carte",
    noMapped: "Aucune prestation localisée sur la carte pour ces filtres",
  },
  DE: {
    mapped: "auf der Karte verortet",
    noMapped: "Für diese Filter sind keine Auftritte auf der Karte verortet",
  },
  IT: {
    mapped: "localizzate sulla mappa",
    noMapped: "Nessuna esibizione localizzata sulla mappa per questi filtri",
  },
  JA: {
    mapped: "地図上に表示",
    noMapped: "このフィルター条件で地図上に表示できる公演はありません",
  },
};

/* ============================================================
   EVENT TYPE LABELS
============================================================ */

function formatEventType(type: string, labels: Record<string, string>) {
  return labels[type] ?? type.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}


/* ============================================================
   DATE
============================================================ */

function formatDate(dateString: string, locale: string) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}


/* ============================================================
   MARKER COLORS
============================================================ */

function markerPalette(eventType: string) {
  const palettes: Record<
    string,
    {
      fill: string;
      ring: string;
    }
  > = {
    tour: {
      fill: "#D4AF37",
      ring: "#FFF1A8",
    },

    festival: {
      fill: "#D51C24",
      ring: "#D4AF37",
    },

    awards: {
      fill: "#D4AF37",
      ring: "#D51C24",
    },

    tv: {
      fill: "#FFFFFF",
      ring: "#D4AF37",
    },

    residency: {
      fill: "#D51C24",
      ring: "#FFFFFF",
    },

    special_event: {
      fill: "#FFFFFF",
      ring: "#D51C24",
    },

    other: {
      fill: "#8C8C8C",
      ring: "#D4AF37",
    },
  };

  return palettes[eventType] ?? palettes.other;
}


/* ============================================================
   CUSTOM MARKER
============================================================ */

function createMarkerIcon(eventType: string) {
  const palette = markerPalette(eventType);

  return L.divIcon({
    className: "",

    html: `
      <div
        style="
          position: relative;
          width: 26px;
          height: 26px;
        "
      >
        <div
          style="
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: rgba(212,175,55,0.08);
            box-shadow:
              0 0 0 3px rgba(212,175,55,0.05),
              0 0 14px rgba(213,28,36,0.18);
          "
        ></div>



        <div
          style="
            position: absolute;
            left: 4px;
            top: 4px;
            width: 18px;
            height: 18px;
            border-radius: 9999px;
            background: ${palette.fill};
            border: 3px solid ${palette.ring};
            box-shadow:
              0 0 0 2px rgba(0,0,0,0.70);
          "
        ></div>
      </div>
    `,

    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -15],
  });
}


/* ============================================================
   LEGEND MARKER
============================================================ */

function LegendMarker({
  eventType,
}: {
  eventType: string;
}) {
  const palette = markerPalette(eventType);

  return (
    <span
      style={{
        width: "11px",
        height: "11px",
        display: "inline-block",
        flexShrink: 0,
        borderRadius: "9999px",
        background: palette.fill,
        border: `2px solid ${palette.ring}`,
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.65)",
      }}
    />
  );
}


/* ============================================================
   AUTO VIEWPORT
============================================================ */

function MapViewportController({
  concerts,
}: {
  concerts: Concert[];
}) {
  const map = useMap();

  const validPositions = useMemo(
    () =>
      concerts
        .filter(
          (concert) =>
            typeof concert.latitude ===
              "number" &&
            typeof concert.longitude ===
              "number"
        )
        .map(
          (concert) =>
            [
              concert.latitude as number,
              concert.longitude as number,
            ] as [number, number]
        ),
    [concerts]
  );

  useEffect(() => {
    let cancelled = false;
    let frameId: number | null = null;

    const updateViewport = () => {
      frameId = window.requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }

        const container = map.getContainer();

        if (!container || !container.isConnected) {
          return;
        }

        map.invalidateSize({ animate: false });

        if (validPositions.length === 0) {
          map.setView([20, 0], 2, {
            animate: false,
          });

          return;
        }

        if (validPositions.length === 1) {
          map.setView(validPositions[0], 7, {
            animate: false,
          });

          return;
        }

        const bounds =
          L.latLngBounds(validPositions);

        map.fitBounds(bounds, {
          padding: [60, 60],
          maxZoom: 7,
          animate: false,
        });
      });
    };

    map.whenReady(updateViewport);

    return () => {
      cancelled = true;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [map, validPositions]);

  return null;
}


/* ============================================================
   COMPONENT
============================================================ */

export default function ConcertMapClient({
  concerts,
  language,
}: ConcertMapClientProps) {
  const t = concertMapTranslations[language];
  const validConcerts = useMemo(
    () =>
      concerts.filter(
        (concert) =>
          typeof concert.latitude ===
            "number" &&
          typeof concert.longitude ===
            "number"
      ),
    [concerts]
  );

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#D4AF37]/20 bg-[#08090A]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-[#D4AF37]/10 bg-[#08090A] px-5 py-4">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              {t.archive}
            </p>

            <p className="mt-1 text-xs text-white/35">
              {concerts.length}{" "}
              {concerts.length === 1 ? t.one : t.many}
              {" · "}
              {validConcerts.length}{" "}
              {mapCoverageCopy[language].mapped}
            </p>
          </div>


          {/* =================================================
              COLOR LEGEND
          ================================================= */}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

            <span className="mr-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/25">
              {t.eventType}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.10em] text-white/45">
              <LegendMarker eventType="tour" />
              {t.types.tour}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.10em] text-white/45">
              <LegendMarker eventType="festival" />
              {t.types.festival}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.10em] text-white/45">
              <LegendMarker eventType="awards" />
              {t.types.awards}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.10em] text-white/45">
              <LegendMarker eventType="tv" />
              {t.types.tv}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.10em] text-white/45">
              <LegendMarker eventType="residency" />
              {t.types.residency}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.10em] text-white/45">
              <LegendMarker eventType="special_event" />
              {t.types.special_event}
            </span>


          </div>
        </div>


        <p className="mt-3 max-w-3xl text-[9px] leading-relaxed text-white/25">
          {t.legend}
        </p>

      </div>


      {/* =====================================================
          MAP
      ====================================================== */}

      <div className="relative h-[680px] w-full">

        {validConcerts.length === 0 && (
          <div className="pointer-events-none absolute inset-x-0 top-6 z-[500] flex justify-center px-6">

            <div className="rounded-full border border-[#D4AF37]/20 bg-black/80 px-5 py-2 text-[10px] uppercase tracking-[0.14em] text-white/50 backdrop-blur">
              {mapCoverageCopy[language].noMapped}
            </div>

          </div>
        )}


        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={18}
          maxBounds={WORLD_BOUNDS}
          maxBoundsViscosity={1}
          worldCopyJump={false}
          zoomControl={false}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{
            background: "#050607",
          }}
        >

          <MapViewportController
            concerts={validConcerts}
          />


          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={true}
          />


          <ZoomControl position="bottomright" />


          {validConcerts.map((concert) => {
            const markerIcon =
              createMarkerIcon(concert.event_type);

            const eventTitle =
              concert.event_name ??
              concert.tour_name ??
              "Ne-Yo Live";

            const countryName =
              concert.countries?.name;

            const countryCode =
              concert.countries?.code;

            return (
              <Marker
                key={concert.id}
                position={[
                  concert.latitude as number,
                  concert.longitude as number,
                ]}
                icon={markerIcon}
              >

                <Popup
                  maxWidth={360}
                  minWidth={285}
                  className="neyo-concert-popup"
                >

                  <div
                    style={{
                      minWidth: "245px",
                      color: "#F5F5F5",
                      background: "#08090A",
                      borderRadius: "14px",
                      padding: "2px",
                      lineHeight: 1.55,
                    }}
                  >

                    {/* =========================================
                        TYPE
                    ========================================= */}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "space-between",
                        gap: "12px",
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                        }}
                      >
                        <LegendMarker
                          eventType={
                            concert.event_type
                          }
                        />

                        <p
                          style={{
                            margin: 0,
                            fontSize: "9px",
                            textTransform:
                              "uppercase",
                            letterSpacing:
                              "0.14em",
                            fontWeight: 800,
                            color: "#D4AF37",
                          }}
                        >
                          {formatEventType(
                            concert.event_type,
                            t.types
                          )}
                        </p>
                      </div>




                    </div>


                    {/* =========================================
                        TITLE
                    ========================================= */}

                    <h3
                      style={{
                        margin: "10px 0 0",
                        fontSize: "19px",
                        lineHeight: 1.25,
                        fontWeight: 850,
                        color: "#FFFFFF",
                      }}
                    >
                      {eventTitle}
                    </h3>


                    {/* =========================================
                        DATE
                    ========================================= */}

                    <p
                      style={{
                        margin: "9px 0 0",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#D4AF37",
                      }}
                    >
                      {formatDate(
                        concert.event_date,
                        t.locale
                      )}
                    </p>


                    {/* =========================================
                        LOCATION
                    ========================================= */}

                    <div
                      style={{
                        marginTop: "14px",
                        borderTop:
                          "1px solid rgba(212,175,55,0.13)",
                        paddingTop: "12px",
                      }}
                    >

                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          fontWeight: 750,
                          color: "#FFFFFF",
                        }}
                      >
                        {concert.city}

                        {concert.region
                          ? `, ${concert.region}`
                          : ""}
                      </p>


                      {countryName && (
                        <p
                          style={{
                            margin:
                              "3px 0 0",
                            fontSize: "11px",
                            color:
                              "rgba(255,255,255,0.55)",
                          }}
                        >
                          {countryCode
                            ? `${countryCode} · `
                            : ""}

                          {countryName}
                        </p>
                      )}

                    </div>


                    {/* =========================================
                        VENUE
                    ========================================= */}

                    {concert.venue && (
                      <div
                        style={{
                          marginTop: "13px",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: "9px",
                            textTransform:
                              "uppercase",
                            letterSpacing:
                              "0.14em",
                            color:
                              "rgba(255,255,255,0.35)",
                          }}
                        >
                          {t.venue}
                        </p>

                        <p
                          style={{
                            margin:
                              "4px 0 0",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                          }}
                        >
                          {concert.venue}
                        </p>
                      </div>
                    )}


                    {/* =========================================
                        TOUR / SHOW
                    ========================================= */}

                    {concert.tour_name &&
                      concert.tour_name !==
                        concert.event_name && (
                        <div
                          style={{
                            marginTop: "12px",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontSize: "9px",
                              textTransform:
                                "uppercase",
                              letterSpacing:
                                "0.14em",
                              color:
                                "rgba(255,255,255,0.35)",
                            }}
                          >
                            {t.tourShow}
                          </p>

                          <p
                            style={{
                              margin:
                                "4px 0 0",
                              fontSize: "12px",
                              color:
                                "rgba(255,255,255,0.72)",
                            }}
                          >
                            {concert.tour_name}
                          </p>
                        </div>
                      )}



                  </div>

                </Popup>

              </Marker>
            );
          })}

        </MapContainer>

      </div>


      {/* =====================================================
          ARCHIVE NOTE
      ====================================================== */}

      <div className="border-t border-[#D4AF37]/10 bg-[#08090A] px-5 py-3">

        <p className="text-[8px] leading-relaxed tracking-[0.08em] text-white/20">
          {t.bottom}
        </p>

      </div>


      {/* =====================================================
          LEAFLET STYLES
      ====================================================== */}

      <style jsx global>{`

        .neyo-concert-popup .leaflet-popup-content-wrapper {
          background: #08090a;
          border: 1px solid rgba(212, 175, 55, 0.22);
          border-radius: 18px;
          box-shadow:
            0 18px 60px rgba(0, 0, 0, 0.55),
            0 0 30px rgba(213, 28, 36, 0.08);
        }

        .neyo-concert-popup .leaflet-popup-content {
          margin: 16px;
        }

        .neyo-concert-popup .leaflet-popup-tip {
          background: #08090a;
          border: 1px solid rgba(212, 175, 55, 0.12);
        }

        .neyo-concert-popup .leaflet-popup-close-button {
          color: rgba(255, 255, 255, 0.6) !important;
          font-size: 20px !important;
          right: 8px !important;
          top: 6px !important;
        }

        .neyo-concert-popup .leaflet-popup-close-button:hover {
          color: #d4af37 !important;
        }

        .leaflet-control-zoom a {
          background: #08090a !important;
          color: #d4af37 !important;
          border-color: rgba(212, 175, 55, 0.2) !important;
        }

        .leaflet-control-zoom a:hover {
          background: #111214 !important;
          color: #ffffff !important;
        }

        .leaflet-control-attribution {
          background: rgba(5, 6, 7, 0.78) !important;
          color: rgba(255, 255, 255, 0.45) !important;
        }

        .leaflet-control-attribution a {
          color: rgba(212, 175, 55, 0.7) !important;
        }

      `}</style>

    </div>
  );
}