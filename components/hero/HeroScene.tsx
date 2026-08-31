"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Float, Points, PointMaterial, useTexture } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT_FONT = "/fonts/helvetiker_regular.typeface.json";

/* ------------------------------------------------------------------ */
/* Shiny extruded 3D text                                              */
/* ------------------------------------------------------------------ */
function ShinyText({
  text,
  position,
  size = 1.2,
  color = "#1a6fd4",
  floatSpeed = 1.2,
}: {
  text: string;
  position: [number, number, number];
  size?: number;
  color?: string;
  floatSpeed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * floatSpeed;
    // gentle floating + rotation so the bevel edges catch the light
    group.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.03;
  });

  return (
    <group ref={group} position={position}>
      <Text3D
        font={TEXT_FONT}
        size={size}
        height={0.5}
        curveSegments={10}
        bevelEnabled
        bevelThickness={0.09}
        bevelSize={0.035}
        bevelOffset={0}
        bevelSegments={8}
      >
        {text}
        {/* shiny material: high specular so light reflects off edges */}
        <meshPhongMaterial
          color={color}
          shininess={220}
          specular="#ffffff"
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.12}
        />
      </Text3D>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering background image with wave displacement + parallax      */
/* ------------------------------------------------------------------ */
function ShaderImagePlane({
  url,
  position,
  scale = [6, 6, 1],
  depth = 0,
  speed = 1,
  index = 0,
  scrollRef,
}: {
  url: string;
  position: [number, number, number];
  scale?: [number, number, number];
  depth?: number;
  speed?: number;
  index?: number;
  scrollRef: React.MutableRefObject<number>;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(url) as THREE.Texture;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uAmp: { value: 0.045 },
      uScroll: { value: 0 },
      uDepth: { value: depth },
      uWarp: { value: index % 2 === 0 ? 1 : -1 },
    }),
    [texture, speed, depth, index]
  );

  useFrame((state) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = state.clock.elapsedTime;
      mat.current.uniforms.uScroll.value = scrollRef.current;
    }
  });

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[2, 2, 48, 48]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uSpeed;
          uniform float uAmp;
          uniform float uScroll;
          uniform float uDepth;
          uniform float uWarp;

          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;

            // wave displacement in Z (deep parallax feel)
            float wave = sin(pos.x * uWarp + uTime * uSpeed)
                       * cos(pos.y * 1.2 + uTime * uSpeed * 0.7);
            pos.z += wave * uAmp;

            // squeeze inward slightly as you scroll
            float squeeze = 1.0 + uScroll * 0.4;
            pos.x *= mix(1.0, squeeze, 0.4);

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            // deep parallax shift with scroll
            mvPosition.z += uScroll * uDepth * 0.8;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          varying vec2 vUv;

          void main() {
            vec4 tex = texture2D(uTexture, vUv);
            gl_FragColor = tex;
          }
        `}
        transparent={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Floating engineering chips                                          */
/* ------------------------------------------------------------------ */
function Chips({ mobile = false }: { mobile?: boolean }) {
  const items = mobile
    ? [
        { label: "INNOVATION", pos: [0, 2.4, -2.5] as [number, number, number] },
        { label: "LEADERSHIP", pos: [0, 1.2, -3] as [number, number, number] },
        { label: "WELFARE", pos: [0, -0.2, -2] as [number, number, number] },
        { label: "COMMUNITY", pos: [0, -1.8, -2.8] as [number, number, number] },
      ]
    : [
        { label: "INNOVATION", pos: [-5.5, 2.6, -2.5] as [number, number, number] },
        { label: "LEADERSHIP", pos: [5.6, 1.8, -3] as [number, number, number] },
        { label: "WELFARE", pos: [-5.2, -1.6, -2] as [number, number, number] },
        { label: "COMMUNITY", pos: [5.2, -2.2, -2.8] as [number, number, number] },
        { label: "CAREER", pos: [0.2, 3.8, -3.4] as [number, number, number] },
      ];
  return (
    <>
      {items.map((c, i) => (
        <Float key={c.label} speed={1.4 + i * 0.1} floatIntensity={1.6} rotationIntensity={0.2}>
          <mesh position={c.pos}>
            <boxGeometry args={[2.4, 0.55, 0.18]} />
            <meshPhongMaterial
              color="#eaf2ff"
              transparent
              opacity={0.85}
              shininess={150}
              specular="#ffffff"
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Background image stack (real campus photos)                         */
/* ------------------------------------------------------------------ */
function ImageStack({
  scrollRef,
  mobile,
}: {
  scrollRef: React.MutableRefObject<number>;
  mobile: boolean;
}) {
  const images = mobile
    ? [
        { url: "/images/bg/hero-1.jpg", pos: [0, 0.4, -3] as [number, number, number], scale: [4.6, 4.6, 1] as [number, number, number], depth: 0.8, speed: 0.5 },
        { url: "/images/bg/hero-2.jpg", pos: [0, -1.6, -2.4] as [number, number, number], scale: [4.2, 4.2, 1] as [number, number, number], depth: 0.6, speed: 0.6 },
      ]
    : [
        { url: "/images/bg/hero-1.jpg", pos: [4.9, 0.3, -3] as [number, number, number], scale: [2.6, 2.6, 1] as [number, number, number], depth: 0.8, speed: 0.5 },
        { url: "/images/bg/hero-2.jpg", pos: [-4.9, -0.2, -2.4] as [number, number, number], scale: [2.4, 2.4, 1] as [number, number, number], depth: 0.6, speed: 0.6 },
      ];
  return (
    <>
      {images.map((img, i) => (
        <ShaderImagePlane
          key={img.url}
          url={img.url}
          position={img.pos}
          scale={img.scale}
          depth={img.depth}
          speed={img.speed}
          index={i}
          scrollRef={scrollRef}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Real ESA team photos as floating cards                              */
/* ------------------------------------------------------------------ */
function TeamCard({
  url,
  position,
  s = 1,
  index = 0,
}: {
  url: string;
  position: [number, number, number];
  s?: number;
  index?: number;
}) {
  const tex = useTexture(url) as THREE.Texture;
  return (
    <Float
      key={url}
      speed={1.1 + index * 0.12}
      floatIntensity={1.4}
      rotationIntensity={0.15}
    >
      <mesh position={position}>
        <planeGeometry args={[1.3 * s, 1.5 * s, 1, 1]} />
        <meshBasicMaterial map={tex} transparent opacity={0.96} />
      </mesh>
      <mesh position={[position[0], position[1] - 0.02 * s, position[2] - 0.01]}>
        <planeGeometry args={[1.34 * s, 1.54 * s, 1, 1]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function TeamImages({ mobile = false }: { mobile?: boolean }) {
  const team = mobile
    ? [
        { url: "/images/leader-chairperson.jpg", pos: [-1.7, 1.6, -2.5] as [number, number, number], s: 0.7 },
        { url: "/images/leader-vice-chairperson.jpg", pos: [1.7, 0.2, -2.8] as [number, number, number], s: 0.66 },
        { url: "/images/leader-treasurer.jpg", pos: [-1.55, -1.7, -2.2] as [number, number, number], s: 0.6 },
        { url: "/images/leader-organising-secretary.jpg", pos: [1.6, -1.5, -2.6] as [number, number, number], s: 0.58 },
      ]
    : [
        { url: "/images/leader-chairperson.jpg", pos: [5.3, 2.2, -2.2] as [number, number, number], s: 1 },
        { url: "/images/leader-vice-chairperson.jpg", pos: [-5.4, 1.6, -2.6] as [number, number, number], s: 0.92 },
        { url: "/images/leader-treasurer.jpg", pos: [5.1, -1.4, -2.4] as [number, number, number], s: 0.85 },
        { url: "/images/leader-organising-secretary.jpg", pos: [-5.2, -2, -2.3] as [number, number, number], s: 0.82 },
      ];
  return (
    <>
      {team.map((t, i) => (
        <TeamCard key={t.url} url={t.url} position={t.pos} s={t.s} index={i} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Particle field                                                      */
/* ------------------------------------------------------------------ */
function Particles({ count = 500 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 26;
    }
    return arr;
  }, [count]);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3aa0ff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-reactive text rig (GSAP drives 3D transform)                 */
/* ------------------------------------------------------------------ */
function TextRig({ mobile }: { mobile: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const s = mobile ? 0.6 : 1;

  // GSAP ScrollTrigger -> glide the whole text rig through 3D space
  useEffect(() => {
    const el = rig.current;
    if (!el) return;

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#esa-hero-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // text glides toward the camera + rotates as you scroll
      tl.to(el.position, { z: 4.5, duration: 1, ease: "none" })
        .to(
          el.rotation,
          {
            x: 0.6,
            y: Math.PI * 0.55,
            duration: 1,
            ease: "none",
          },
          0
        )
        // slight scale growth
        .to(
          el.scale,
          {
            x: 1.25,
            y: 1.25,
            z: 1.25,
            duration: 1,
            ease: "none",
          },
          0
        );
    }, el);

    return () => gsapCtx.revert();
  }, []);

  return (
    <group ref={rig} scale={[s, s, s]}>
      <ShinyText text="ENGINEERING" position={[0, 1.25, 0.8]} size={0.95} color="#f0a500" floatSpeed={1.1} />
      <ShinyText text="STUDENTS" position={[0, 0.05, 0.4]} size={0.78} color="#1a6fd4" floatSpeed={0.9} />
      <ShinyText text="ASSOCIATION" position={[0, -1.15, -0.05]} size={0.5} color="#3aa0ff" floatSpeed={0.7} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Main scene                                                          */
/* ------------------------------------------------------------------ */
export default function HeroScene({ mobile = false }: { mobile?: boolean }) {
  const scrollRef = useRef(0);

  // Track scroll progress into a plain ref (used by image shaders)
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#esa-hero-scroll",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <Canvas
      dpr={[1, mobile ? 1.25 : 1.8]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-6, -4, 4]} intensity={0.6} color="#3aa0ff" />
      <pointLight position={[6, 4, 6]} intensity={0.9} color="#f0a500" />

      <ImageStack scrollRef={scrollRef} mobile={mobile} />
      <Particles count={mobile ? 250 : 500} />
      <Chips mobile={mobile} />
      <TeamImages mobile={mobile} />
      <TextRig mobile={mobile} />
    </Canvas>
  );
}
