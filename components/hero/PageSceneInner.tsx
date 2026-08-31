"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const FONT = "/fonts/helvetiker_regular.typeface.json";

/* Shared shiny material helpers */
function shiny(color = "#1a6fd4", intensity = 0.12) {
  return (
    <meshPhongMaterial
      color={color}
      shininess={200}
      specular="#ffffff"
      emissive={new THREE.Color(color)}
      emissiveIntensity={intensity}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Spinning gear (shared primitive used in several variants)         */
/* ---------------------------------------------------------------- */
function Gear({
  position,
  radius = 1,
  speed = 0.4,
  color = "#0047ab",
}: {
  position: [number, number, number];
  radius?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const teeth = 8;
    const inner = radius * 0.78;
    const outer = radius;
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const b = ((i + 0.5) / teeth) * Math.PI * 2;
      const c = ((i + 1) / teeth) * Math.PI * 2;
      shape.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
      shape.lineTo(Math.cos(b) * outer, Math.sin(b) * outer);
      shape.lineTo(Math.cos(c) * inner, Math.sin(c) * inner);
    }
    const g = new THREE.ShapeGeometry(shape, 12);
    g.center();
    return g;
  }, [radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, 0]}>
      <primitive object={geo} attach="geometry" />
      {shiny(color)}
    </mesh>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: gears (About)                                            */
/* ---------------------------------------------------------------- */
function Gears() {
  return (
    <>
      <Gear position={[-4.2, 1.2, -2]} radius={1.5} speed={0.35} color="#0047ab" />
      <Gear position={[-2.4, -1.4, -1.5]} radius={0.9} speed={-0.5} color="#f0a500" />
      <Gear position={[4.4, -0.6, -2]} radius={1.3} speed={-0.3} color="#0a55c7" />
      <Gear position={[2.6, 1.8, -1]} radius={0.7} speed={0.6} color="#3aa0ff" />
      <Float speed={1.6} floatIntensity={1.2}>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[-1, 0.6, 0.2]}>
          ESA
          {shiny("#f0a500")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: circuit / coordinates (Events)                           */
/* ---------------------------------------------------------------- */
function Circuit() {
  const lines = [
    [[-5, 2.4, -3], [5, 2.4, -3]],
    [[-5, -2.4, -3], [5, -2.4, -3]],
    [[-5, 1.6, -2], [5, 1.6, -2]],
    [[-5, -1.6, -2], [5, -1.6, -2]],
  ];
  return (
    <>
      {lines.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([...a, ...b]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={i % 2 ? "#f0a500" : "#3aa0ff"} transparent opacity={0.5} />
        </line>
      ))}
      {[[-3.5, 2.2, -1.5], [0.2, -2, -1], [3, 2, -2], [-1.8, 0.4, -1], [4, -1.5, -2]].map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.2} floatIntensity={1}>
          <mesh position={p as [number, number, number]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            {shiny(i % 2 ? "#f0a500" : "#1a6fd4")}
          </mesh>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.42} height={0.28} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-2.6, 0.4, 1.2]} rotation={[0, 0.3, 0]}>
          AGENDA
          {shiny("#3aa0ff")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: globe / network (Contact)                                */
/* ---------------------------------------------------------------- */
function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });
  const nodes = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 90; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2;
      arr.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return arr;
  }, []);
  return (
    <group position={[0, 0, -1.5]}>
      <group ref={ref} position={[0.9, 0, 0]}>
        <mesh>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshPhongMaterial color="#1a6fd4" wireframe shininess={120} specular="#ffffff" transparent opacity={0.5} />
        </mesh>
        {nodes.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.06, 8, 8]} />
            {shiny("#f0a500")}
          </mesh>
        ))}
      </group>
      <Float speed={1.4} floatIntensity={1.2}>
        <Text3D font={FONT} size={0.42} height={0.28} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-4.4, -0.6, 1.6]} rotation={[0, 0.4, 0]}>
          GET
          {shiny("#3aa0ff")}
        </Text3D>
        <Text3D font={FONT} size={0.38} height={0.26} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-4.2, -1.6, 1.2]} rotation={[0, 0.4, 0]}>
          IN TOUCH
          {shiny("#f0a500")}
        </Text3D>
      </Float>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: hearts / welfare (Welfare)                               */
/* ---------------------------------------------------------------- */
function Hearts() {
  const shapes = useMemo(() => {
    const heart = (scale: number) => {
      const s = new THREE.Shape();
      const x = 0, y = 0;
      s.moveTo(x, y + 0.5 * scale);
      s.bezierCurveTo(x + 0.5 * scale, y + 0.5 * scale, x + 0.6 * scale, y - 0.3 * scale, x + 0.1 * scale, y - 0.3 * scale);
      s.bezierCurveTo(x - 0.1 * scale, y - 0.3 * scale, x - 0.6 * scale, y - 0.3 * scale, x - 0.5 * scale, y + 0.5 * scale);
      s.bezierCurveTo(x - 0.35 * scale, y + 0.8 * scale, x, y + 0.7 * scale, x, y + 0.5 * scale);
      return s;
    };
    return [heart(1), heart(0.65), heart(0.45)];
  }, []);
  const items = [
    { pos: [-4.4, 1.2, -2] as [number, number, number], idx: 0, color: "#e63946" },
    { pos: [4.4, -0.8, -2] as [number, number, number], idx: 1, color: "#f0a500" },
    { pos: [3.4, 1.8, -1.5] as [number, number, number], idx: 2, color: "#3aa0ff" },
    { pos: [-3.4, -1.8, -1.5] as [number, number, number], idx: 1, color: "#1a6fd4" },
  ];
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={1.3 + i * 0.2} floatIntensity={1.6} rotationIntensity={0.5}>
          <mesh position={it.pos} rotation={[0, 0, 0]}>
            <extrudeGeometry args={[shapes[it.idx], { depth: 0.25, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 6 }]} />
            {shiny(it.color, 0.2)}
          </mesh>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[-1.6, 0.4, 1.4]} rotation={[0, 0.25, 0]}>
          STAND
          {shiny("#e63946")}
        </Text3D>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[-1.7, -0.9, 1]} rotation={[0, 0.25, 0]}>
          WITH US
          {shiny("#f0a500")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: store / gift boxes (Store)                               */
/* ---------------------------------------------------------------- */
function StoreBoxes() {
  const boxes = [
    { pos: [-4.3, 1, -2] as [number, number, number], s: 0.9, color: "#0047ab", ry: 0.4 },
    { pos: [4.4, 0.6, -2.2] as [number, number, number], s: 1.1, color: "#f0a500", ry: -0.4 },
    { pos: [3.2, -1.6, -1.4] as [number, number, number], s: 0.7, color: "#3aa0ff", ry: 0.2 },
    { pos: [-3, -1.8, -1.6] as [number, number, number], s: 0.8, color: "#1a6fd4", ry: 0 },
  ];
  return (
    <>
      {boxes.map((b, i) => (
        <Float key={i} speed={1.4 + i * 0.15} floatIntensity={1.3} rotationIntensity={0.4}>
          <group position={b.pos} rotation={[0, b.ry, 0]}>
            <mesh>
              <boxGeometry args={[b.s, b.s, b.s]} />
              {shiny(b.color)}
            </mesh>
            <mesh position={[0, b.s * 0.55, 0]}>
              <boxGeometry args={[b.s * 0.9, b.s * 0.18, b.s * 0.9]} />
              {shiny("#ffffff", 0.1)}
            </mesh>
          </group>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[-1.5, 0.5, 1.5]} rotation={[0, 0.25, 0]}>
          ESA
          {shiny("#f0a500")}
        </Text3D>
        <Text3D font={FONT} size={0.42} height={0.26} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-1.3, -0.6, 1]} rotation={[0, 0.25, 0]}>
          STORE
          {shiny("#0047ab")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: monitors / screens (Training)                            */
/* ---------------------------------------------------------------- */
function Monitors() {
  const screens = [
    { pos: [-4.4, 1.2, -2] as [number, number, number], ry: 0.4, color: "#1a6fd4" },
    { pos: [4.5, -0.4, -2.2] as [number, number, number], ry: -0.5, color: "#f0a500" },
    { pos: [3.3, 1.9, -1.6] as [number, number, number], ry: 0.2, color: "#3aa0ff" },
  ];
  return (
    <>
      {screens.map((m, i) => (
        <Float key={i} speed={1.4 + i * 0.15} floatIntensity={1.3} rotationIntensity={0.3}>
          <group position={m.pos} rotation={[0, m.ry, 0]}>
            <mesh>
              <boxGeometry args={[1.6, 1, 0.12]} />
              {shiny(m.color, 0.05)}
            </mesh>
            <mesh position={[0, 0, 0.1]} rotation={[0, -0.3, 0]}>
              <boxGeometry args={[1.36, 0.78, 0.06]} />
              <meshPhongMaterial color="#002f6e" emissive="#3aa0ff" emissiveIntensity={0.6} shininess={120} specular="#ffffff" />
            </mesh>
            <mesh position={[0, -0.75, 0.05]}>
              <boxGeometry args={[0.12, 0.5, 0.08]} />
              {shiny("#0047ab")}
            </mesh>
          </group>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[-1.6, 0.4, 1.4]} rotation={[0, 0.25, 0]}>
          LEARN
          {shiny("#3aa0ff")}
        </Text3D>
        <Text3D font={FONT} size={0.42} height={0.26} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-1.5, -0.7, 1]} rotation={[0, 0.25, 0]}>
          BUILD
          {shiny("#f0a500")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: trips / road markers                                     */
/* ---------------------------------------------------------------- */
function Trips() {
  const cones = [
    { pos: [-4.6, 0.8, -1.8] as [number, number, number], color: "#f0a500" },
    { pos: [4.5, 0.3, -2] as [number, number, number], color: "#3aa0ff" },
    { pos: [3.4, -1.4, -1.4] as [number, number, number], color: "#1a6fd4" },
  ];
  return (
    <>
      {cones.map((c, i) => (
        <Float key={i} speed={1.3 + i * 0.2} floatIntensity={1.5} rotationIntensity={0.4}>
          <group position={c.pos}>
            <mesh>
              <coneGeometry args={[0.5, 1.2, 20]} />
              {shiny(c.color)}
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.1, 20]} />
              {shiny("#00223f")}
            </mesh>
          </group>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.2}>
        <Text3D font={FONT} size={0.46} height={0.28} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-1.4, 0.5, 1.4]} rotation={[0, 0.25, 0]}>
          EXPLORE
          {shiny("#3aa0ff")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: leadership / avatar spheres                              */
/* ---------------------------------------------------------------- */
function Leadership() {
  const avatars = [
    { pos: [-4.4, 1.2, -2] as [number, number, number], color: "#0047ab" },
    { pos: [4.4, -0.6, -2.2] as [number, number, number], color: "#f0a500" },
    { pos: [3.2, 1.8, -1.4] as [number, number, number], color: "#1a6fd4" },
    { pos: [-3.2, -1.7, -1.5] as [number, number, number], color: "#3aa0ff" },
  ];
  return (
    <>
      {avatars.map((a, i) => (
        <Float key={i} speed={1.4 + i * 0.15} floatIntensity={1.4} rotationIntensity={0.4}>
          <group position={a.pos}>
            <mesh>
              <sphereGeometry args={[0.6, 32, 32]} />
              {shiny(a.color)}
            </mesh>
            <mesh position={[0, -0.9, 0]}>
              <sphereGeometry args={[0.32, 24, 24]} />
              {shiny("#00223f")}
            </mesh>
          </group>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.46} height={0.28} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-1.6, 0.4, 1.4]} rotation={[0, 0.25, 0]}>
          TEAM
          {shiny("#f0a500")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: members / ID cards                                       */
/* ---------------------------------------------------------------- */
function MemberCards() {
  const cards = [
    { pos: [-4.3, 0.8, -2] as [number, number, number], ry: 0.5, color: "#0047ab" },
    { pos: [4.4, 0.4, -2.2] as [number, number, number], ry: -0.5, color: "#3aa0ff" },
    { pos: [3.3, -1.7, -1.4] as [number, number, number], ry: 0.2, color: "#1a6fd4" },
  ];
  return (
    <>
      {cards.map((c, i) => (
        <Float key={i} speed={1.4 + i * 0.15} floatIntensity={1.3} rotationIntensity={0.4}>
          <group position={c.pos} rotation={[0, c.ry, 0]}>
            <mesh>
              <boxGeometry args={[1.6, 1, 0.1]} />
              {shiny(c.color, 0.06)}
            </mesh>
            <mesh position={[0, 0.25, 0.06]}>
              <planeGeometry args={[0.6, 0.6]} />
              {shiny("#eaf2ff", 0.02)}
            </mesh>
            <mesh position={[0, -0.35, 0.06]}>
              <planeGeometry args={[0.9, 0.12]} />
              {shiny("#f0a500")}
            </mesh>
          </group>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.2}>
        <Text3D font={FONT} size={0.46} height={0.28} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[-1.5, 0.5, 1.4]} rotation={[0, 0.25, 0]}>
          FAMILY
          {shiny("#3aa0ff")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: register / rising cubes                                 */
/* ---------------------------------------------------------------- */
function Register() {
  const rows = [
    { pos: [-4.4, -1.6, -2] as [number, number, number], n: 0 },
    { pos: [-3, -2, -1.8] as [number, number, number], n: 1 },
    { pos: [-1.6, -2.2, -1.6] as [number, number, number], n: 2 },
    { pos: [-0.2, -2.4, -1.4] as [number, number, number], n: 3 },
  ];
  return (
    <>
      {rows.map((r, i) => (
        <Float key={i} speed={1.3 + i * 0.15} floatIntensity={1.4}>
          <group position={r.pos}>
            {Array.from({ length: r.n + 1 }).map((_, j) => (
              <mesh key={j} position={[0, j * 0.45, 0]}>
                <boxGeometry args={[0.6, 0.4, 0.6]} />
                {shiny(i % 2 ? "#f0a500" : "#1a6fd4")}
              </mesh>
            ))}
          </group>
        </Float>
      ))}
      <Float speed={1.5} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[1.6, 0.8, 1]} rotation={[0, 0.2, 0]}>
          JOIN
          {shiny("#f0a500")}
        </Text3D>
        <Text3D font={FONT} size={0.46} height={0.28} bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelSegments={5} position={[1.4, -0.2, 0.6]} rotation={[0, 0.2, 0]}>
          THE FAMILY
          {shiny("#3aa0ff")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: event (detail) - calendar blocks                         */
/* ---------------------------------------------------------------- */
function EventBlocks() {
  const blocks = [
    { pos: [-4.4, 1, -2] as [number, number, number], color: "#f0a500" },
    { pos: [4.4, 0.4, -2.2] as [number, number, number], color: "#3aa0ff" },
    { pos: [3, -1.6, -1.5] as [number, number, number], color: "#1a6fd4" },
    { pos: [-3, -1.8, -1.6] as [number, number, number], color: "#0047ab" },
  ];
  return (
    <>
      {blocks.map((b, i) => (
        <Float key={i} speed={1.4 + i * 0.15} floatIntensity={1.4} rotationIntensity={0.5}>
          <group position={b.pos}>
            <mesh>
              <boxGeometry args={[0.8, 0.95, 0.14]} />
              {shiny(b.color)}
            </mesh>
            <mesh position={[0, -0.25, 0.1]}>
              <boxGeometry args={[0.6, 0.35, 0.1]} />
              {shiny("#ffffff", 0.08)}
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: cart / shopping elements                                 */
/* ---------------------------------------------------------------- */
function Cart() {
  return (
    <>
      <Float speed={1.4} floatIntensity={1.4} rotationIntensity={0.5}>
        <group position={[-4, 1, -2]}>
          <mesh>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            {shiny("#f0a500")}
          </mesh>
        </group>
      </Float>
      <Float speed={1.6} floatIntensity={1.4} rotationIntensity={0.5}>
        <group position={[4.4, 0.3, -2]}>
          <mesh>
            <boxGeometry args={[1.2, 1.2, 0.9]} />
            {shiny("#1a6fd4")}
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[0.6, 0.25, 0.6]} />
            {shiny("#ffffff", 0.05)}
          </mesh>
        </group>
      </Float>
      <Float speed={1.3} floatIntensity={1.3}>
        <Text3D font={FONT} size={0.5} height={0.3} bevelEnabled bevelThickness={0.06} bevelSize={0.02} bevelSegments={5} position={[-1, 0.6, 1.4]} rotation={[0, 0.2, 0]}>
          CART
          {shiny("#f0a500")}
        </Text3D>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: single product (store detail)                            */
/* ---------------------------------------------------------------- */
function Product() {
  return (
    <>
      <Float speed={1.5} floatIntensity={1.5} rotationIntensity={0.6}>
        <mesh position={[-3.6, 1, -2]}>
          <boxGeometry args={[1.4, 1, 0.4]} />
          {shiny("#0047ab")}
        </mesh>
      </Float>
      <Float speed={1.7} floatIntensity={1.5} rotationIntensity={0.6}>
        <mesh position={[3.8, 0, -2.2]}>
          <boxGeometry args={[1, 1.3, 0.5]} />
          {shiny("#f0a500")}
        </mesh>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variant: single training                                          */
/* ---------------------------------------------------------------- */
function TrainingDetail() {
  return (
    <>
      <Float speed={1.5} floatIntensity={1.4} rotationIntensity={0.5}>
        <mesh position={[-3.8, 0.8, -2]}>
          <boxGeometry args={[1.5, 1, 0.15]} />
          {shiny("#3aa0ff", 0.05)}
        </mesh>
      </Float>
      <Float speed={1.7} floatIntensity={1.4} rotationIntensity={0.5}>
        <group position={[3.8, 0, -2.2]}>
          <mesh>
            <coneGeometry args={[0.6, 1.2, 20]} />
            {shiny("#f0a500")}
          </mesh>
          <mesh>
            <boxGeometry args={[1.2, 0.15, 0.6]} />
            {shiny("#0047ab")}
          </mesh>
        </group>
      </Float>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Root renderer                                                     */
/* ---------------------------------------------------------------- */
export default function PageSceneInner({ variant }: { variant: PageSceneVariant }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-5, -4, 4]} intensity={0.5} color="#3aa0ff" />
      <pointLight position={[4, 3, 6]} intensity={0.7} color="#f0a500" />

      {variant === "gears" && <Gears />}
      {variant === "circuit" && <Circuit />}
      {variant === "globe" && <Globe />}
      {variant === "heart" && <Hearts />}
      {variant === "store" && <StoreBoxes />}
      {variant === "monitor" && <Monitors />}
      {variant === "trips" && <Trips />}
      {variant === "leadership" && <Leadership />}
      {variant === "members" && <MemberCards />}
      {variant === "register" && <Register />}
      {variant === "member" && <MemberCards />}
      {variant === "cart" && <Cart />}
      {variant === "event" && <EventBlocks />}
      {variant === "product" && <Product />}
      {variant === "training" && <TrainingDetail />}
    </Canvas>
  );
}

import type { PageSceneVariant } from "./PageScene3D";
