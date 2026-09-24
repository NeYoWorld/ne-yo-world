"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Html,
  OrbitControls,
} from "@react-three/drei";

import { useRouter } from "next/navigation";

import * as THREE from "three";

import GeoJsonGeometry from "three-geojson-geometry";

import {
  geoEquirectangular,
  geoPath,
} from "d3-geo";

import {
  activeCountryDestinations,
  type CountryDestination,
} from "../data/countries";

import { useLanguage } from "../context/LanguageContext";


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const RADIUS = 2;

const globeLabels = {
  EN: { explore: "EXPLORE", loadError: "Unable to load world data" },
  PT: { explore: "EXPLORAR", loadError: "Não foi possível carregar os dados do mundo" },
  ES: { explore: "EXPLORAR", loadError: "No se pudieron cargar los datos del mundo" },
  FR: { explore: "EXPLORER", loadError: "Impossible de charger les données du monde" },
  DE: { explore: "ENTDECKEN", loadError: "Weltdaten konnten nicht geladen werden" },
  IT: { explore: "ESPLORA", loadError: "Impossibile caricare i dati del mondo" },
  JA: { explore: "探索", loadError: "世界データを読み込めませんでした" },
} as const;


/* =========================================================
   DESTINATIONS
========================================================= */

type Destination =
  CountryDestination;

type TravelOrigin = {
  name: string;
  lat: number;
  lon: number;
};

const DESTINATIONS =
  activeCountryDestinations;

const ATLANTA: TravelOrigin = {
  name: "Atlanta",
  lat: 33.749,
  lon: -84.388,
};

const LAST_DESTINATION_STORAGE_KEY =
  "neyo-world-last-destination";


/* =========================================================
   CACHE DO GEOJSON

   Se voltares à Home e o módulo continuar carregado,
   os dados não precisam de ser descarregados novamente.
========================================================= */

let cachedGeojson: any = null;

let geojsonPromise:
  Promise<any> | null = null;


/* =========================================================
   EXECUTAR TRABALHO PESADO QUANDO O BROWSER ESTIVER LIVRE
========================================================= */

function runWhenIdle(
  callback: () => void
) {
  if (
    typeof window === "undefined"
  ) {
    return () => {};
  }


  const browserWindow =
    window as typeof window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: {
          timeout?: number;
        }
      ) => number;

      cancelIdleCallback?: (
        id: number
      ) => void;
    };


  if (
    browserWindow.requestIdleCallback
  ) {
    const id =
      browserWindow.requestIdleCallback(
        callback,
        {
          timeout: 500,
        }
      );


    return () => {
      browserWindow
        .cancelIdleCallback?.(
          id
        );
    };
  }


  const timeoutId =
    window.setTimeout(
      callback,
      80
    );


  return () => {
    window.clearTimeout(
      timeoutId
    );
  };
}


/* =========================================================
   CARREGAR GEOJSON
========================================================= */

function loadGeojson() {
  if (cachedGeojson) {
    return Promise.resolve(
      cachedGeojson
    );
  }


  if (!geojsonPromise) {
    geojsonPromise =
      fetch(
        "/countries.geojson",
        {
          cache: "force-cache",
        }
      )
        .then(
          (response) => {
            if (
              !response.ok
            ) {
              throw new Error(
                "countries.geojson não encontrado"
              );
            }


            return response.json();
          }
        )
        .then(
          (data) => {
            cachedGeojson =
              data;

            return data;
          }
        )
        .catch(
          (error) => {
            /*
               Se falhar, permitimos uma nova tentativa
               numa próxima montagem.
            */

            geojsonPromise =
              null;

            throw error;
          }
        );
  }


  return geojsonPromise;
}


/* =========================================================
   LAT / LON -> POSIÇÃO 3D
========================================================= */

function latLonToVector3(
  lat: number,
  lon: number,
  radius: number
) {
  const phi =
    THREE.MathUtils.degToRad(
      lat
    );


  const theta =
    THREE.MathUtils.degToRad(
      lon
    );


  return new THREE.Vector3(
    radius *
      Math.cos(phi) *
      Math.sin(theta),

    radius *
      Math.sin(phi),

    radius *
      Math.cos(phi) *
      Math.cos(theta)
  );
}


/* =========================================================
   NOME DO PAÍS
========================================================= */


function readLastDestination() {
  if (typeof window === "undefined") {
    return ATLANTA;
  }

  try {
    const saved = window.sessionStorage.getItem(
      LAST_DESTINATION_STORAGE_KEY
    );

    if (!saved) {
      return ATLANTA;
    }

    const parsed = JSON.parse(saved);

    if (
      typeof parsed?.lat === "number" &&
      typeof parsed?.lon === "number" &&
      typeof parsed?.name === "string"
    ) {
      return parsed as TravelOrigin;
    }
  } catch {
    // Se houver dados inválidos, voltamos à origem inicial.
  }

  return ATLANTA;
}


function saveLastDestination(
  destination: TravelOrigin
) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    LAST_DESTINATION_STORAGE_KEY,
    JSON.stringify(destination)
  );
}


function getCountryName(
  feature: any
) {
  const properties =
    feature?.properties ??
    {};


  return String(
    properties.ADMIN ??
      properties.admin ??
      properties.NAME ??
      properties.name ??
      properties.NAME_EN ??
      properties.NAME_LONG ??
      ""
  ).toLowerCase();
}


/* =========================================================
   CONTORNO EXTERIOR

   Retira buracos internos das geometrias para manter
   o aspeto que já tinhas.
========================================================= */

function exteriorOnlyGeometry(
  geometry: any
) {
  if (!geometry) {
    return null;
  }


  if (
    geometry.type ===
    "Polygon"
  ) {
    if (
      !geometry.coordinates?.[0]
    ) {
      return null;
    }


    return {
      type:
        "Polygon",

      coordinates: [
        geometry.coordinates[0],
      ],
    };
  }


  if (
    geometry.type ===
    "MultiPolygon"
  ) {
    return {
      type:
        "MultiPolygon",

      coordinates:
        geometry.coordinates
          .filter(
            (
              polygon: any
            ) =>
              polygon?.[0]
          )
          .map(
            (
              polygon: any
            ) => [
              polygon[0],
            ]
          ),
    };
  }


  return null;
}


/* =========================================================
   CORES DOS PAÍSES
========================================================= */

function getLandColor(
  feature: any
) {
  const name =
    getCountryName(
      feature
    );


  /* GELO */

  if (
    name.includes(
      "greenland"
    ) ||
    name.includes(
      "antarctica"
    )
  ) {
    return "#AAB6B2";
  }


  /* NORTE */

  if (
    name.includes(
      "russia"
    ) ||
    name.includes(
      "canada"
    )
  ) {
    return "#24392E";
  }


  /* DESERTOS */

  if (
    name.includes(
      "algeria"
    ) ||
    name.includes(
      "libya"
    ) ||
    name.includes(
      "egypt"
    ) ||
    name.includes(
      "saudi"
    ) ||
    name.includes(
      "mauritania"
    ) ||
    name.includes(
      "mali"
    ) ||
    name.includes(
      "niger"
    ) ||
    name.includes(
      "chad"
    ) ||
    name.includes(
      "sudan"
    ) ||
    name.includes(
      "mongolia"
    )
  ) {
    return "#403624";
  }


  /* RESTO */

  return "#1B3327";
}


/* =========================================================
   DESENHAR UM PAÍS NA TEXTURA
========================================================= */

function drawFeature(
  ctx: CanvasRenderingContext2D,
  feature: any,
  width: number,
  height: number
) {
  const geometry =
    exteriorOnlyGeometry(
      feature.geometry
    );


  if (!geometry) {
    return;
  }


  const cleanFeature = {
    type:
      "Feature",

    properties:
      feature.properties ??
      {},

    geometry,
  };


  const scale =
    width /
    (2 * Math.PI);


  /*
     Precisamos destes offsets para a textura
     não criar um corte vazio na junção do mapa.
  */

  const offsets = [
    width * 0.25,
    width * 1.25,
    width * -0.75,
  ];


  for (
    const offsetX of offsets
  ) {
    const projection =
      geoEquirectangular()
        .scale(scale)
        .translate([
          offsetX,
          height / 2,
        ])
        .precision(
          0.4
        );


    const path =
      geoPath(
        projection,
        ctx
      );


    ctx.beginPath();


    path(
      cleanFeature as any
    );


    ctx.fillStyle =
      getLandColor(
        feature
      );


    ctx.fill();
  }
}


/* =========================================================
   TEXTURA DO PLANETA

   O original tinha 2048 x 1024.
   Usamos 1024 x 512 para reduzir bastante o cálculo inicial.
========================================================= */

function createEarthTexture(
  geojson: any
) {
  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }


  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    1024;

  canvas.height =
    512;


  const ctx =
    canvas.getContext(
      "2d"
    );


  if (!ctx) {
    return null;
  }


  /* =====================================================
     OCEANO
  ====================================================== */

  const ocean =
    ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height
    );


  ocean.addColorStop(
    0,
    "#061218"
  );


  ocean.addColorStop(
    0.3,
    "#081D25"
  );


  ocean.addColorStop(
    0.55,
    "#071820"
  );


  ocean.addColorStop(
    0.8,
    "#051218"
  );


  ocean.addColorStop(
    1,
    "#02070A"
  );


  ctx.fillStyle =
    ocean;


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /* =====================================================
     BRILHO AZUL SUAVE
  ====================================================== */

  const glow =
    ctx.createRadialGradient(
      canvas.width *
        0.46,

      canvas.height *
        0.42,

      0,

      canvas.width *
        0.46,

      canvas.height *
        0.42,

      canvas.width *
        0.7
    );


  glow.addColorStop(
    0,
    "rgba(20,70,80,0.09)"
  );


  glow.addColorStop(
    0.5,
    "rgba(10,40,48,0.03)"
  );


  glow.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );


  ctx.fillStyle =
    glow;


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /* =====================================================
     PAÍSES
  ====================================================== */

  if (
    geojson?.features
  ) {
    for (
      const feature of
      geojson.features
    ) {
      if (
        !feature?.geometry
      ) {
        continue;
      }


      drawFeature(
        ctx,
        feature,
        canvas.width,
        canvas.height
      );
    }
  }


  /* =====================================================
     SOMBRA
  ====================================================== */

  const shade =
    ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );


  shade.addColorStop(
    0,
    "rgba(255,255,255,0.01)"
  );


  shade.addColorStop(
    0.5,
    "rgba(0,0,0,0)"
  );


  shade.addColorStop(
    1,
    "rgba(0,0,0,0.18)"
  );


  ctx.fillStyle =
    shade;


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /* =====================================================
     THREE TEXTURE
  ====================================================== */

  const texture =
    new THREE.CanvasTexture(
      canvas
    );


  texture.colorSpace =
    THREE.SRGBColorSpace;


  texture.wrapS =
    THREE.RepeatWrapping;


  texture.wrapT =
    THREE.ClampToEdgeWrapping;


  texture.minFilter =
    THREE.LinearFilter;


  texture.magFilter =
    THREE.LinearFilter;


  /*
     Evita trabalho adicional da GPU.
  */

  texture.generateMipmaps =
    false;


  texture.needsUpdate =
    true;


  return texture;
}


/* =========================================================
   FRONTEIRAS
========================================================= */

function CountryBorders({
  geojson,
}: {
  geojson: any;
}) {
  const material =
    useMemo(
      () =>
        new THREE.LineBasicMaterial({
          color:
            "#C9A746",

          transparent:
            true,

          opacity:
            0.3,

          depthWrite:
            false,
        }),
      []
    );


  const group =
    useMemo(() => {
      const result =
        new THREE.Group();


      if (
        !geojson?.features
      ) {
        return result;
      }


      for (
        const feature of
        geojson.features
      ) {
        if (
          !feature?.geometry
        ) {
          continue;
        }


        try {
          const geometry =
            new GeoJsonGeometry(
              feature.geometry,
              RADIUS +
                0.018
            );


          const lines =
            new THREE.LineSegments(
              geometry,
              material
            );


          lines.frustumCulled =
            false;


          result.add(
            lines
          );
        } catch {
          /*
             Ignoramos geometrias inválidas sem criar
             centenas de warnings no terminal.
          */
        }
      }


      return result;
    }, [
      geojson,
      material,
    ]);


  useEffect(() => {
    return () => {
      group.traverse(
        (object) => {
          if (
            object instanceof
            THREE.LineSegments
          ) {
            object.geometry.dispose();
          }
        }
      );


      material.dispose();
    };
  }, [
    group,
    material,
  ]);


  return (
    <primitive
      object={group}
    />
  );
}


/* =========================================================
   GEOMETRIA DOS PONTOS NORMAIS
========================================================= */

function createCountryPointGeometry(
  geojson: any
) {
  const positions:
    number[] = [];


  if (
    !geojson?.features
  ) {
    return new THREE
      .BufferGeometry();
  }


  for (
    const feature of
    geojson.features
  ) {
    const countryName =
      getCountryName(
        feature
      );


    /*
       Países que fazem parte de DESTINATIONS têm marcador
       interativo próprio e não precisam do ponto normal.
    */

    const hasInteractiveMarker =
      DESTINATIONS.some(
        (destination) =>
          countryName.includes(
            destination.name
              .toLowerCase()
          )
      );

    if (hasInteractiveMarker) {
      continue;
    }


    const geo =
      feature?.geometry;


    if (!geo) {
      continue;
    }


    const polygons =
      geo.type ===
      "Polygon"

        ? [
            geo.coordinates,
          ]

        : geo.type ===
          "MultiPolygon"

        ? geo.coordinates

        : [];


    if (
      !polygons.length
    ) {
      continue;
    }


    let ring:
      any = null;


    for (
      const polygon of
      polygons
    ) {
      if (
        polygon?.[0]?.length >
        (
          ring?.length ??
          0
        )
      ) {
        ring =
          polygon[0];
      }
    }


    if (!ring) {
      continue;
    }


    let minLon =
      Infinity;

    let maxLon =
      -Infinity;

    let minLat =
      Infinity;

    let maxLat =
      -Infinity;


    for (
      const point of ring
    ) {
      if (
        !Array.isArray(
          point
        ) ||
        typeof point[0] !==
          "number" ||
        typeof point[1] !==
          "number"
      ) {
        continue;
      }


      minLon =
        Math.min(
          minLon,
          point[0]
        );


      maxLon =
        Math.max(
          maxLon,
          point[0]
        );


      minLat =
        Math.min(
          minLat,
          point[1]
        );


      maxLat =
        Math.max(
          maxLat,
          point[1]
        );
    }


    if (
      !Number.isFinite(
        minLon
      ) ||
      !Number.isFinite(
        maxLon
      ) ||
      !Number.isFinite(
        minLat
      ) ||
      !Number.isFinite(
        maxLat
      )
    ) {
      continue;
    }


    const lat =
      (
        minLat +
        maxLat
      ) /
      2;


    const lon =
      (
        minLon +
        maxLon
      ) /
      2;


    const point =
      latLonToVector3(
        lat,
        lon,
        RADIUS +
          0.04
      );


    positions.push(
      point.x,
      point.y,
      point.z
    );
  }


  const result =
    new THREE.BufferGeometry();


  result.setAttribute(
    "position",

    new THREE
      .Float32BufferAttribute(
        positions,
        3
      )
  );


  return result;
}


/* =========================================================
   PONTOS
========================================================= */

function CountryPoints({
  geojson,
}: {
  geojson: any;
}) {
  const geometry =
    useMemo(
      () =>
        createCountryPointGeometry(
          geojson
        ),
      [geojson]
    );


  const glowMaterial =
    useMemo(
      () =>
        new THREE.PointsMaterial({
          color:
            "#D8A830",

          size:
            0.09,

          sizeAttenuation:
            true,

          transparent:
            true,

          opacity:
            0.1,

          depthWrite:
            false,

          blending:
            THREE.AdditiveBlending,
        }),
      []
    );


  const middleMaterial =
    useMemo(
      () =>
        new THREE.PointsMaterial({
          color:
            "#F0C34E",

          size:
            0.055,

          sizeAttenuation:
            true,

          transparent:
            true,

          opacity:
            0.32,

          depthWrite:
            false,

          blending:
            THREE.AdditiveBlending,
        }),
      []
    );


  const coreMaterial =
    useMemo(
      () =>
        new THREE.PointsMaterial({
          color:
            "#FFF1A8",

          size:
            0.024,

          sizeAttenuation:
            true,

          transparent:
            true,

          opacity:
            0.95,

          depthWrite:
            false,

          blending:
            THREE.AdditiveBlending,
        }),
      []
    );


  const glowRef =
    useRef<
      THREE.PointsMaterial
    >(null);


  const middleRef =
    useRef<
      THREE.PointsMaterial
    >(null);


  useFrame(
    ({
      clock,
    }) => {
      const time =
        clock.getElapsedTime();


      if (
        glowRef.current
      ) {
        glowRef.current.opacity =
          0.09 +
          Math.sin(
            time *
              1.3
          ) *
            0.02;
      }


      if (
        middleRef.current
      ) {
        middleRef.current.opacity =
          0.29 +
          Math.sin(
            time *
              1.5
          ) *
            0.04;
      }
    }
  );


  useEffect(() => {
    return () => {
      geometry.dispose();

      glowMaterial.dispose();

      middleMaterial.dispose();

      coreMaterial.dispose();
    };
  }, [
    geometry,
    glowMaterial,
    middleMaterial,
    coreMaterial,
  ]);


  return (
    <group>

      <points
        geometry={geometry}
      >

        <primitive
          ref={glowRef}
          object={
            glowMaterial
          }
          attach="material"
        />

      </points>


      <points
        geometry={geometry}
      >

        <primitive
          ref={middleRef}
          object={
            middleMaterial
          }
          attach="material"
        />

      </points>


      <points
        geometry={geometry}
        material={
          coreMaterial
        }
      />

    </group>
  );
}


/* =========================================================
   PORTUGAL · MARCADOR
========================================================= */

function DestinationMarker({
  destination,
  onSelect,
  disabled = false,
}: {
  destination: Destination;
  onSelect: (
    destination: Destination
  ) => void;
  disabled?: boolean;
}) {
  const { language } = useLanguage();
  const labels = globeLabels[language] ?? globeLabels.EN;

  const [
    hovered,
    setHovered,
  ] =
    useState(false);

  const pulseRef =
    useRef<
      THREE.Mesh
    >(null);

  const position =
    useMemo(
      () =>
        latLonToVector3(
          destination.lat,
          destination.lon,
          RADIUS +
            0.055
        ),
      [
        destination.lat,
        destination.lon,
      ]
    );

  const quaternion =
    useMemo(() => {
      const normal =
        position
          .clone()
          .normalize();

      const forward =
        new THREE.Vector3(
          0,
          0,
          1
        );

      return new THREE
        .Quaternion()
        .setFromUnitVectors(
          forward,
          normal
        );
    }, [position]);

  useFrame(
    ({
      clock,
    }) => {
      if (
        !pulseRef.current
      ) {
        return;
      }

      const time =
        clock.getElapsedTime();

      const scale =
        1 +
        Math.sin(
          time *
            2.2
        ) *
          0.16;

      pulseRef.current
        .scale
        .set(
          scale,
          scale,
          scale
        );
    }
  );

  return (
    <group
      position={position}
      quaternion={
        quaternion
      }
    >
      {/* HALO */}

      <mesh
        ref={pulseRef}
        position={[
          0,
          0,
          0.008,
        ]}
      >
        <ringGeometry
          args={[
            0.055,
            0.095,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#D51C24"
          transparent
          opacity={0.22}
          side={
            THREE.DoubleSide
          }
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={
            false
          }
        />
      </mesh>

      {/* RING DOURADO */}

      <mesh
        position={[
          0,
          0,
          0.012,
        ]}
      >
        <ringGeometry
          args={[
            0.036,
            0.052,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.9}
          side={
            THREE.DoubleSide
          }
          depthWrite={
            false
          }
        />
      </mesh>

      {/* ÁREA CLICÁVEL */}

      <mesh
        position={[
          0,
          0,
          0.018,
        ]}
        onPointerOver={(
          event
        ) => {
          event.stopPropagation();

          if (!disabled) {
            setHovered(
              true
            );

            document.body
              .style
              .cursor =
              "pointer";
          }
        }}
        onPointerOut={() => {
          setHovered(
            false
          );

          document.body
            .style
            .cursor =
            "default";
        }}
        onClick={(
          event
        ) => {
          event.stopPropagation();

          if (!disabled) {
            onSelect(
              destination
            );
          }
        }}
      >
        <circleGeometry
          args={[
            0.031,
            32,
          ]}
        />

        <meshBasicMaterial
          color={
            hovered
              ? "#FF3038"
              : "#D51C24"
          }
          side={
            THREE.DoubleSide
          }
          depthWrite={
            false
          }
        />
      </mesh>

      {/* CENTRO */}

      <mesh
        position={[
          0,
          0,
          0.021,
        ]}
      >
        <circleGeometry
          args={[
            0.011,
            24,
          ]}
        />

        <meshBasicMaterial
          color="#FFF4C2"
          transparent
          opacity={1}
          side={
            THREE.DoubleSide
          }
          depthWrite={
            false
          }
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* LABEL */}

      {hovered && (

        <Html
          center
          distanceFactor={6}
          position={[
            0,
            0.18,
            0.05,
          ]}
          style={{
            pointerEvents:
              "none",
          }}
        >
          <div
            style={{
              whiteSpace:
                "nowrap",

              transform:
                "translateY(-8px)",

              border:
                "1px solid rgba(212,175,55,0.65)",

              borderRadius:
                "999px",

              background:
                "rgba(3,5,6,0.92)",

              padding:
                "8px 13px",

              boxShadow:
                "0 0 20px rgba(213,28,36,0.18), 0 0 18px rgba(212,175,55,0.12)",

              backdropFilter:
                "blur(8px)",
            }}
          >
            <span
              style={{
                color:
                  "#D4AF37",

                fontSize:
                  "9px",

                fontWeight:
                  700,

                letterSpacing:
                  "0.16em",
              }}
            >
              {labels.explore}
            </span>

            <span
              style={{
                color:
                  "rgba(255,255,255,0.85)",

                fontSize:
                  "9px",

                fontWeight:
                  600,

                letterSpacing:
                  "0.12em",

                marginLeft:
                  "7px",
              }}
            >
              {destination.name.toUpperCase()}
            </span>
          </div>
        </Html>

      )}
    </group>
  );
}


/* =========================================================
   CENA DO GLOBO
========================================================= */

function FlightAnimation({
  progress,
  origin,
  destination,
}: {
  progress: number;
  origin: TravelOrigin;
  destination: Destination;
}) {
  const start = useMemo(
    () =>
      latLonToVector3(
        origin.lat,
        origin.lon,
        RADIUS + 0.13
      ),
    [
      origin.lat,
      origin.lon,
    ]
  );

  const end = useMemo(
    () =>
      latLonToVector3(
        destination.lat,
        destination.lon,
        RADIUS + 0.13
      ),
    [
      destination.lat,
      destination.lon,
    ]
  );

  const points = useMemo(() => {
    const startUnit = start.clone().normalize();
    const endUnit = end.clone().normalize();
    const dot = THREE.MathUtils.clamp(
      startUnit.dot(endUnit),
      -1,
      1
    );
    const angle = Math.acos(dot);
    const sinAngle = Math.sin(angle);
    const result: THREE.Vector3[] = [];

    for (let i = 0; i <= 120; i += 1) {
      const t = i / 120;
      let direction: THREE.Vector3;

      if (Math.abs(sinAngle) < 0.0001) {
        direction = startUnit
          .clone()
          .lerp(endUnit, t)
          .normalize();
      } else {
        const a = Math.sin((1 - t) * angle) / sinAngle;
        const b = Math.sin(t * angle) / sinAngle;

        direction = startUnit
          .clone()
          .multiplyScalar(a)
          .add(endUnit.clone().multiplyScalar(b))
          .normalize();
      }

      const altitude =
        RADIUS +
        0.13 +
        Math.sin(Math.PI * t) * 0.38;

      result.push(
        direction.multiplyScalar(altitude)
      );
    }

    return result;
  }, [start, end]);

  const geometry = useMemo(() => {
    const result =
      new THREE.BufferGeometry().setFromPoints(points);

    /* Necessário para o material tracejado. */
    const distances: number[] = [0];
    let totalDistance = 0;

    for (let i = 1; i < points.length; i += 1) {
      totalDistance += points[i].distanceTo(points[i - 1]);
      distances.push(totalDistance);
    }

    result.setAttribute(
      "lineDistance",
      new THREE.Float32BufferAttribute(distances, 1)
    );

    result.setDrawRange(0, 2);
    return result;
  }, [points]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  const clampedProgress =
    THREE.MathUtils.clamp(progress, 0, 1);

  const visiblePoints = Math.max(
    2,
    Math.min(
      points.length,
      Math.ceil(
        clampedProgress * (points.length - 1)
      ) + 1
    )
  );

  geometry.setDrawRange(0, visiblePoints);

  /*
     Interpolação contínua: o avião deixa de saltar entre pontos
     e percorre mesmo a rota até Portugal.
  */
  const exactIndex =
    clampedProgress * (points.length - 1);
  const indexA = Math.floor(exactIndex);
  const indexB = Math.min(
    points.length - 1,
    indexA + 1
  );
  const localProgress = exactIndex - indexA;

  const planePosition =
    points[indexA]
      .clone()
      .lerp(points[indexB], localProgress);

  /* Direção do avião acompanhando a curva. */
  const nextIndex = Math.min(
    points.length - 1,
    indexB + 1
  );
  const direction =
    points[nextIndex]
      .clone()
      .sub(points[indexA])
      .normalize();

  const planeAngle =
    THREE.MathUtils.radToDeg(
      Math.atan2(direction.y, direction.x)
    );

  const routeLine = useMemo(
    () => new THREE.Line(geometry),
    [geometry]
  );

  return (
    <>
      {/* ROTA VERMELHA TRACEJADA */}
      <primitive object={routeLine}>
        <lineDashedMaterial
          color="#E3262E"
          transparent
          opacity={0.95}
          dashSize={0.075}
          gapSize={0.055}
          depthWrite={false}
          depthTest={false}
        />
      </primitive>

      {/* AVIÃO */}
      <Html
        center
        position={[
          planePosition.x,
          planePosition.y,
          planePosition.z,
        ]}
        distanceFactor={5.2}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            color: "#F5D06F",
            fontSize: "25px",
            lineHeight: 1,
            transform: `rotate(${planeAngle + 15}deg)`,
            transformOrigin: "center",
            filter:
              "drop-shadow(0 0 5px rgba(245,208,111,0.95)) drop-shadow(0 0 10px rgba(227,38,46,0.28))",
          }}
        >
          ✈
        </div>
      </Html>
    </>
  );
}

function GlobeScene({
  geojson,
}: {
  geojson: any;
}) {
  const router = useRouter();
  const { camera } = useThree();

  const globe =
    useRef<
      THREE.Group
    >(null);

  const [
    earthTexture,
    setEarthTexture,
  ] =
    useState<
      THREE.Texture | null
    >(null);

  const [
    showDetails,
    setShowDetails,
  ] =
    useState(false);

  const [
    travelling,
    setTravelling,
  ] =
    useState(false);

  const [
    flightOrigin,
    setFlightOrigin,
  ] =
    useState<TravelOrigin>(
      () =>
        readLastDestination()
    );

  const [
    selectedDestination,
    setSelectedDestination,
  ] =
    useState<
      Destination | null
    >(null);

  const travelProgress =
    useRef(0);

  const [
    renderedProgress,
    setRenderedProgress,
  ] =
    useState(0);

  const navigationDone =
    useRef(false);

  /*
     Mantemos o globo sempre direito.

     Antes usávamos quaternions para apontar a latitude/longitude
     diretamente para a câmara. Isso fazia o planeta inclinar-se
     de lado durante a viagem.

     Agora só rodamos no eixo Y (longitude), como um globo real
     apoiado verticalmente.
  */

  const journeyTargetYaw =
    useRef(0);

  const initialYaw =
    useMemo(() => {
      const origin =
        readLastDestination();

      return -THREE.MathUtils.degToRad(
        origin.lon
      );
    }, []);

  const journeyStartYaw =
    useRef(initialYaw);

  const initialOrientationApplied =
    useRef(false);

  useEffect(() => {
    if (!geojson) {
      return;
    }

    let active = true;
    let createdTexture:
      THREE.Texture | null = null;
    let detailsTimeout:
      number | null = null;

    const cancelIdle =
      runWhenIdle(
        () => {
          if (!active) {
            return;
          }

          createdTexture =
            createEarthTexture(
              geojson
            );

          if (
            active &&
            createdTexture
          ) {
            setEarthTexture(
              createdTexture
            );
          }

          detailsTimeout =
            window.setTimeout(
              () => {
                if (active) {
                  setShowDetails(
                    true
                  );
                }
              },
              50
            );
        }
      );

    return () => {
      active = false;
      cancelIdle();

      if (
        detailsTimeout !==
        null
      ) {
        window.clearTimeout(
          detailsTimeout
        );
      }

      createdTexture
        ?.dispose();
    };
  }, [geojson]);

  function beginJourney(
    destination: Destination
  ) {
    if (travelling) {
      return;
    }

    const origin =
      readLastDestination();

    setFlightOrigin(origin);

    setSelectedDestination(
      destination
    );

    journeyTargetYaw.current =
      -THREE.MathUtils.degToRad(
        destination.lon
      );

    if (globe.current) {
      /*
         A viagem começa exatamente na rotação atual do globo,
         evitando saltos quando o utilizador escolhe um país.
      */
      journeyStartYaw.current =
        globe.current.rotation.y;
    }

    travelProgress.current = 0;
    navigationDone.current = false;
    setRenderedProgress(0);
    setTravelling(true);
  }

  useFrame((_, delta) => {
    if (!globe.current) {
      return;
    }

    if (
      !initialOrientationApplied.current
    ) {
      /*
         O eixo X e o eixo Z ficam sempre a zero.
         Só alteramos a longitude através do eixo Y.
      */
      globe.current.rotation.set(
        0,
        initialYaw,
        0
      );

      journeyStartYaw.current =
        initialYaw;

      initialOrientationApplied.current =
        true;
    }

    if (!travelling) {
      /*
         Rotação automática normal, sempre na horizontal.
      */
      globe.current.rotation.x = 0;
      globe.current.rotation.z = 0;
      globe.current.rotation.y +=
        0.0007;

      return;
    }

    const nextProgress =
      Math.min(
        1,
        travelProgress.current +
          delta / 2.15
      );

    travelProgress.current =
      nextProgress;

    const eased =
      nextProgress < 0.5
        ? 4 * nextProgress * nextProgress * nextProgress
        : 1 -
          Math.pow(
            -2 * nextProgress + 2,
            3
          ) /
            2;

    /*
       Rotação da viagem apenas no eixo Y.
       Isto evita que o globo tombe ou fique de lado.

       Calculamos o caminho angular mais curto até Portugal.
    */
    const startYaw =
      journeyStartYaw.current;

    let yawDifference =
      journeyTargetYaw.current -
      startYaw;

    yawDifference =
      THREE.MathUtils.euclideanModulo(
        yawDifference + Math.PI,
        Math.PI * 2
      ) - Math.PI;

    globe.current.rotation.x = 0;
    globe.current.rotation.z = 0;

    globe.current.rotation.y =
      startYaw +
      yawDifference * eased;

    camera.position.z =
      THREE.MathUtils.lerp(
        camera.position.z,
        4.85,
        Math.min(
          1,
          delta * 2.3
        )
      );

    camera.lookAt(0, 0, 0);

    setRenderedProgress(eased);

    if (
      nextProgress >= 1 &&
      !navigationDone.current
    ) {
      navigationDone.current = true;

      if (
        selectedDestination
      ) {
        saveLastDestination(
          selectedDestination
        );

        router.push(
          selectedDestination.href
        );
      }
    }
  });

  return (
    <>
      <ambientLight
        intensity={0.4}
      />

      <directionalLight
        position={[
          5,
          4,
          6,
        ]}
        intensity={0.9}
        color="#F7E8C4"
      />

      <pointLight
        position={[
          -4,
          1,
          1,
        ]}
        intensity={0.3}
        color="#17515D"
      />

      <pointLight
        position={[
          3,
          -2,
          3,
        ]}
        intensity={0.2}
        color="#C8A348"
      />

      <group
        ref={globe}
      >
        <mesh>
          <sphereGeometry
            args={[
              RADIUS,
              48,
              48,
            ]}
          />

          <meshStandardMaterial
            color="#071820"
            roughness={0.95}
            metalness={0}
          />
        </mesh>

        {earthTexture && (
          <mesh>
            <sphereGeometry
              args={[
                RADIUS +
                  0.003,
                48,
                48,
              ]}
            />

            <meshStandardMaterial
              map={
                earthTexture
              }
              color="#FFFFFF"
              roughness={0.92}
              metalness={0.01}
            />
          </mesh>
        )}

        <mesh>
          <sphereGeometry
            args={[
              RADIUS +
                0.038,
              40,
              40,
            ]}
          />

          <meshBasicMaterial
            color="#24616A"
            transparent
            opacity={0.018}
            side={
              THREE.BackSide
            }
            depthWrite={
              false
            }
          />
        </mesh>

        <mesh>
          <sphereGeometry
            args={[
              RADIUS +
                0.052,
              40,
              40,
            ]}
          />

          <meshBasicMaterial
            color="#D8A830"
            transparent
            opacity={0.012}
            side={
              THREE.BackSide
            }
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={
              false
            }
          />
        </mesh>

        {showDetails &&
          geojson && (
            <>
              <CountryBorders
                geojson={
                  geojson
                }
              />

              <CountryPoints
                geojson={
                  geojson
                }
              />
            </>
          )}

        {DESTINATIONS.map(
          (destination) => (
            <DestinationMarker
              key={
                destination.href
              }
              destination={
                destination
              }
              onSelect={
                beginJourney
              }
              disabled={
                travelling
              }
            />
          )
        )}

        {travelling &&
          selectedDestination && (
            <FlightAnimation
              progress={
                renderedProgress
              }
              origin={
                flightOrigin
              }
              destination={
                selectedDestination
              }
            />
          )}
      </group>
    </>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export function Globe() {
  const { language } = useLanguage();
  const labels = globeLabels[language] ?? globeLabels.EN;

  const [
    geojson,
    setGeojson,
  ] =
    useState<any>(
      cachedGeojson
    );


  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);


  /* =====================================================
     GEOJSON CARREGA SEM BLOQUEAR O CANVAS
  ====================================================== */

  useEffect(() => {
    let active =
      true;


    loadGeojson()
      .then(
        (data) => {
          if (active) {
            setGeojson(
              data
            );
          }
        }
      )
      .catch(
        () => {
          if (active) {
            setError(
              "Erro ao carregar countries.geojson"
            );
          }
        }
      );


    return () => {
      active =
        false;
    };
  }, []);


  /* =====================================================
     CANVAS

     Agora aparece imediatamente.
  ====================================================== */

  return (
    <div className="relative h-[400px] w-full sm:h-[500px]">

      <Canvas
        style={{
          touchAction: "pan-y",
        }}
        dpr={1}
        camera={{
          position: [
            0,
            0,
            6,
          ],

          fov:
            45,
        }}
        gl={{
          antialias:
            true,

          alpha:
            true,

          powerPreference:
            "high-performance",
        }}
      >

        <GlobeScene
          geojson={
            geojson
          }
        />


        <OrbitControls
          enableZoom={
            false
          }
          enablePan={
            false
          }
          minPolarAngle={
            0.05
          }
          maxPolarAngle={
            Math.PI -
            0.05
          }
        />

      </Canvas>


      {/* ERRO DISCRETO */}

      {error && (

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-red-400/60">
          {labels.loadError}
        </div>

      )}

    </div>
  );
}

export default Globe;