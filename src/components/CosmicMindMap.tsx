'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

// ----------------------------------------------------------------------
// THEORETICAL PHYSICS SETTINGS (SEMANTIC)
// Nhiệt màu khoa học: Core (Vàng), Social (Xanh lục/lam), Revolutionary (Đỏ cam), Abstract (Tím)
// Mass (Khối lượng) = Size = Lực hấp dẫn
// Speed = Động năng của khái niệm
// ----------------------------------------------------------------------
const THEME = {
  core: '#FDE047',      // Vàng sao lùn trắng (Level 0)
  social: '#38BDF8',    // Xanh lam sao khổng lồ xanh (Lực lượng xã hội)
  revolution: '#FB923C',// Cam đỏ của năng lượng bùng nổ (Lực lượng cách mạng)
  abstract: '#C084FC',  // Tím bước sóng ngắn (Trừu tượng, siêu hình)
  orbit: '#334155'      // Màu quỹ đạo tĩnh
};

// ==========================================
// 1. DYNAMIC GRAVITY FIELD (ĐƯỜNG CONG HẤP DẪN)
// ==========================================
const GravityCurve = ({ sourceRef, targetRef, color, tension = 5 }: any) => {
  const lineRef = useRef<THREE.Line>(null);
  
  // Tránh tạo object mới trong useFrame (Tối ưu Memory)
  const vStart = useMemo(() => new THREE.Vector3(), []);
  const vEnd = useMemo(() => new THREE.Vector3(), []);
  const vControl = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!sourceRef.current || !targetRef.current || !lineRef.current) return;
    
    // Lấy tọa độ thật trong không gian 3D
    sourceRef.current.getWorldPosition(vStart);
    targetRef.current.getWorldPosition(vEnd);
    
    // Thuật toán bẻ cong không gian: Tính điểm giữa và đẩy lên trục Y tạo độ võng (Tension)
    vControl.addVectors(vStart, vEnd).multiplyScalar(0.5);
    vControl.y += tension + Math.sin(Date.now() * 0.001) * 2; // Thêm nhiễu loạn lượng tử nhẹ

    const curve = new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
    lineRef.current.geometry.setFromPoints(curve.getPoints(20));
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
    </line>
  );
};

// ==========================================
// 2. ORBITAL SATELLITE (VỆ TINH LEVEL 2)
// ==========================================
const Satellite = ({ name, radius, speed, angle, size, color, parentRef }: any) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Orbital Mechanics: x = r*cos(t), z = r*sin(t)
    ref.current.position.x = Math.cos(t * speed + angle) * radius;
    ref.current.position.z = Math.sin(t * speed + angle) * radius;
    // Semantic Physics: Khái niệm trừu tượng (tím) sẽ dao động dọc (Tension) nhiều hơn
    ref.current.position.y = Math.sin(t * speed * 3 + angle) * (size * 0.5);
  });

  return (
    <group ref={ref}>
      <Sphere args={[size, 24, 24]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
      </Sphere>
      <Text position={[0, size + 1.2, 0]} fontSize={size * 1.2} color="#E2E8F0" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#000">
        {name}
      </Text>
    </group>
  );
};

// ==========================================
// 3. PLANETARY NODE (HÀNH TINH LEVEL 1)
// ==========================================
const PlanetNode = ({ name, radius, speed, angle, size, color, satellites, coreRef }: any) => {
  const groupRef = useRef<THREE.Group>(null); // Trục quay
  const planetRef = useRef<THREE.Group>(null); // Bản thân hành tinh

  useFrame(({ clock }) => {
    if (!groupRef.current || !planetRef.current) return;
    const t = clock.getElapsedTime();
    
    // Hành tinh quay quanh lõi
    groupRef.current.position.x = Math.cos(t * speed + angle) * radius;
    groupRef.current.position.z = Math.sin(t * speed + angle) * radius;
    groupRef.current.position.y = Math.sin(t * speed * 0.5 + angle) * 4; // Quỹ đạo hình sin nghiêng
  });

  return (
    <>
      {/* Vòng quỹ đạo tĩnh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.2, radius + 0.2, 128]} />
        <meshBasicMaterial color={THEME.orbit} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Trục quy chiếu của Hành tinh */}
      <group ref={groupRef}>
        {/* Bản thể Hành tinh */}
        <group ref={planetRef}>
          <Sphere args={[size, 32, 32]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} toneMapped={false} />
          </Sphere>
          
          <Text position={[0, size + 2, 0]} fontSize={size * 0.8} color="#FFF" letterSpacing={0.1} outlineWidth={0.05} outlineColor="#000">
            {name}
          </Text>

          {/* Các vệ tinh quay quanh hành tinh này */}
          {satellites.map((sat: any, i: number) => (
            <Satellite key={i} {...sat} parentRef={planetRef} />
          ))}
        </group>
      </group>

      {/* Trường hấp dẫn kéo từ Lõi đến Hành tinh */}
      <GravityCurve sourceRef={coreRef} targetRef={groupRef} color={color} tension={8} />
    </>
  );
};

// ==========================================
// 4. CORE GALAXY (MẶT TRỜI TRUNG TÂM - LEVEL 0)
// ==========================================
const PhilosophicalUniverse = () => {
  const coreRef = useRef<THREE.Group>(null);

  // DATA MAP: Hierarchy + Semantic Physics
  const systems = [
    {
      name: "CÁ NHÂN", radius: 35, speed: 0.15, angle: 0, size: 2.5, color: THEME.social,
      satellites: [
        { name: "Bản chất loài", radius: 8, speed: 0.8, angle: 0, size: 0.8, color: THEME.abstract },
        { name: "Tính cá thể", radius: 8, speed: 0.8, angle: Math.PI, size: 0.8, color: THEME.abstract }
      ]
    },
    {
      name: "XÃ HỘI", radius: 55, speed: 0.1, angle: Math.PI, size: 3.5, color: THEME.social,
      satellites: [
        { name: "Giai cấp", radius: 10, speed: 0.6, angle: 0, size: 1.2, color: THEME.abstract },
        { name: "Nhà nước", radius: 10, speed: 0.6, angle: Math.PI, size: 1.2, color: THEME.abstract }
      ]
    },
    {
      name: "LÃNH TỤ", radius: 25, speed: 0.25, angle: Math.PI / 2, size: 2.0, color: THEME.revolution,
      satellites: [
        { name: "Định hướng", radius: 6, speed: 1.2, angle: 0, size: 0.7, color: THEME.abstract },
        { name: "Tổ chức", radius: 6, speed: 1.2, angle: Math.PI, size: 0.7, color: THEME.abstract }
      ]
    },
    {
      name: "QUẦN CHÚNG", radius: 45, speed: 0.12, angle: -Math.PI / 2, size: 3.0, color: THEME.revolution,
      satellites: [
        { name: "Lực lượng SX", radius: 9, speed: 0.7, angle: 0, size: 1.0, color: THEME.abstract },
        { name: "CM Xã hội", radius: 9, speed: 0.7, angle: Math.PI, size: 1.0, color: THEME.abstract }
      ]
    }
  ];

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 2; // Lõi thở nhẹ
    }
  });

  return (
    <>
      <group ref={coreRef}>
        <Sphere args={[4, 64, 64]}>
          <meshStandardMaterial color={THEME.core} emissive={THEME.core} emissiveIntensity={2.5} toneMapped={false} />
        </Sphere>
        {/* Core Corona (Hào quang) */}
        <Sphere args={[4.5, 32, 32]}>
          <meshBasicMaterial color={THEME.core} transparent opacity={0.2} blending={THREE.AdditiveBlending} wireframe />
        </Sphere>
        <Text position={[0, 6, 0]} fontSize={2.5} fontWeight="bold" color="#FFF" letterSpacing={0.2} outlineWidth={0.1} outlineColor="#000">
          CON NGƯỜI
        </Text>
      </group>

      {systems.map((sys, idx) => (
        <PlanetNode key={idx} {...sys} coreRef={coreRef} />
      ))}
    </>
  );
};

// ==========================================
// SCENE CONTAINER
// ==========================================
export default function SpaceMindMap() {
  return (
    <div className="w-full h-screen bg-[#030712] relative overflow-hidden font-sans">
      
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#64FFDA] drop-shadow-[0_0_8px_rgba(100,255,218,0.5)]">
          Simulation · Version 3.0
        </p>
        <h2 className="font-serif text-3xl text-white mt-2 drop-shadow-lg">Cognitive Universe</h2>
        <p className="text-white/50 text-sm mt-2 max-w-sm">
          Scroll to zoom. Drag to orbit. <br/>
          Observe the semantic physics and gravity fields.
        </p>
      </div>

      <Canvas 
        camera={{ position: [0, 40, 80], fov: 45 }}
        // Giới hạn Pixel Ratio tối đa là 2 để cứu GPU điện thoại
        dpr={[1, 2]} 
        // Bật antialias để khử răng cưa nhẹ
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        
        {/* LIGHTING & PHYSICAL FOG */}
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 40, 150]} /> {/* 5. DEPTH FOG: Càng xa càng mờ mịt */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={100} distance={100} color={THEME.core} />

        {/* 6. STARFIELD */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        {/* MÔ PHỎNG TRIẾT HỌC */}
        <PhilosophicalUniverse />

        {/* 8. DYNAMIC CAMERA: Tự động trôi mượt mà */}
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.3} 
          enableDamping 
          dampingFactor={0.05}
          maxDistance={120}
          minDistance={20}
          maxPolarAngle={Math.PI / 2 + 0.2} // Cho phép nhìn hơi hắt từ dưới lên
        />

        
        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>

      </Canvas>
    </div>
  );
}