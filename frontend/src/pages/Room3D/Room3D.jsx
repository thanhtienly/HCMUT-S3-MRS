import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  ContactShadows,
  Text,
} from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import styles from "./Room3D.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
// function Walls() {
//   return (
//     <group>
//       {/* Tường phía sau */}
//       <mesh position={[0, 2.5, -4.5]} receiveShadow>
//         <boxGeometry args={[10, 5, 0.2]} />
//         <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
//       </mesh>

//       {/* Tường bên trái */}
//       <mesh
//         position={[-5, 2.5, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//         receiveShadow
//       >
//         <boxGeometry args={[10, 5, 0.2]} />
//         <meshStandardMaterial color="#eeeeee" />
//       </mesh>

//       {/* Tường bên phải */}
//       <mesh
//         position={[5, 2.5, 0]}
//         rotation={[0, -Math.PI / 2, 0]}
//         receiveShadow
//       >
//         <boxGeometry args={[10, 5, 0.2]} />
//         <meshStandardMaterial color="#eeeeee" />
//       </mesh>

//       {/* Cửa chính */}
//       <group position={[3, 1, -4.5]}>
//         <mesh rotation={[0, Math.PI / 2, 0]}>
//           <boxGeometry args={[2.2, 3, 0.1]} />
//           <meshStandardMaterial color="#795548" />
//         </mesh>

//         {/* Tay nắm cửa */}
//         <mesh position={[0.9, 1.2, 0.06]}>
//           <sphereGeometry args={[0.08]} />
//           <meshStandardMaterial color="#gold" metalness={0.8} />
//         </mesh>

//         <Text
//           position={[0, 2.3, 0.06]}
//           fontSize={0.3}
//           color="#333"
//           rotation={[0, -Math.PI / 2, 0]}
//         >
//           Exit
//         </Text>
//       </group>
//     </group>
//   );
// }
function Walls() {
  return (
    <group>
      {/* Tường phía sau */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>

      {/* Cửa sổ */}
      <mesh position={[0, 2.2, -4.99]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.8, 0.1]} />
        <meshStandardMaterial color="#64b5f6" transparent opacity={0.6} />
      </mesh>

      {/* Cửa chính */}
      <group position={[3.5, 1, -4.99]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2.2, 3, 0.1]} />
          <meshStandardMaterial color="#795548" />
        </mesh>

        {/* Tay nắm cửa */}
        <mesh position={[0.9, 1.2, 0.06]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#gold" metalness={0.8} />
        </mesh>

        <Text
          position={[0, 2.3, 0.06]}
          fontSize={0.3}
          color="#333"
          rotation={[0, -Math.PI / 2, 0]}
        >
          Exit
        </Text>
      </group>
    </group>
  );
}

// function Plant() {
//   return (
//     <group position={[-4, -0.5, -3]}>
//       {/* Chậu cây */}
//       <mesh position={[0, 0.5, 0]}>
//         <cylinderGeometry args={[0.4, 0.5, 1, 32]} />
//         <meshStandardMaterial color="#8d6e63" roughness={0.6} />
//       </mesh>

//       {/* Cây */}
//       <mesh position={[0, 1.2, 0]}>
//         <sphereGeometry args={[0.8, 32, 32]} />
//         <meshStandardMaterial color="#81c784" roughness={0.9} />
//       </mesh>

//       {/* Thân cây */}
//       <mesh position={[0, 0.8, 0]}>
//         <cylinderGeometry args={[0.1, 0.1, 0.8]} />
//         <meshStandardMaterial color="#6d4c41" />
//       </mesh>
//     </group>
//   );
// }

function Plant() {
  return (
    <group position={[-3.5, 0, 2]}>
      {/* Chậu cây */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 1, 32]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.6} />
      </mesh>

      {/* Cây */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#81c784" roughness={0.9} />
      </mesh>

      {/* Thân cây */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    // <group position={[0, 0, 2]}>
    //   {/* Mặt bàn */}
    //   <mesh receiveShadow castShadow position={[0, 0.7, 0]}>
    //     <boxGeometry args={[1.8, 0.05, 0.9]} />
    //     <meshStandardMaterial color="#5d4037" roughness={0.8} />
    //   </mesh>
    <group position={[0, 0, 0]}>
      {/* Mặt bàn */}
      <mesh receiveShadow castShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[1.8, 0.05, 0.9]} />
        <meshStandardMaterial color="#5d4037" roughness={0.8} />
      </mesh>

      {/* Chân bàn */}
      {[
        [-0.8, -0.4],
        [0.8, -0.4],
        [-0.8, 0.4],
        [0.8, 0.4],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.35, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.7]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>
      ))}
    </group>
  );
}

// function Chair() {
//   return (
//     <group position={[0, -1, -1]} rotation={[0, Math.PI, 0]}>
//       {/* Mặt ghế */}
//       <mesh receiveShadow castShadow position={[0, 0.3, 0]}>
//         <boxGeometry args={[0.6, 0.05, 0.6]} />
//         <meshStandardMaterial color="#37474f" />
//       </mesh>

//       {/* Chân ghế */}
//       <mesh position={[0, 0.15, 0]}>
//         <cylinderGeometry args={[0.08, 0.08, 0.3]} />
//         <meshStandardMaterial color="#455a64" />
//       </mesh>

//       {/* Lưng ghế */}
//       <mesh position={[0, 0.6, -0.3]} rotation={[0.3, 0, 0]}>
//         <boxGeometry args={[0.6, 0.8, 0.05]} />
//         <meshStandardMaterial color="#546e7a" />
//       </mesh>
//     </group>
//   );
// }
function Chair() {
  return (
    <group position={[0.8, 0, -1.2]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Mặt ghế */}
      <mesh receiveShadow castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.6]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>

      {/* Chân ghế */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3]} />
        <meshStandardMaterial color="#455a64" />
      </mesh>

      {/* Lưng ghế */}
      <mesh position={[0, 0.6, -0.3]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
    </group>
  );
}

function Fan({ on }) {
  const bladesRef = useRef();

  useFrame((_, delta) => {
    if (on) bladesRef.current.rotation.y += delta * 10;
  });

  return (
    <group position={[0, 3.5, 0]}>
      {/* Động cơ */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#616161" metalness={0.5} />
      </mesh>

      {/* Cánh quạt */}
      <group ref={bladesRef}>
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
          <mesh key={angle} rotation={[0, angle, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.3]} />
            <meshStandardMaterial color="#757575" />
          </mesh>
        ))}
      </group>

      {/* Hộp điều khiển */}
      <Html distanceFactor={10}>
        <div className={cx("control")}>
          <div>FAN: {on ? "ON" : "OFF"}</div>
        </div>
      </Html>
    </group>
  );
}

function Lamp({ on }) {
  return (
    <group position={[0.5, 1.2, 0.2]}>
      {/* Chân đèn */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.4]} />
        <meshStandardMaterial color="#fdd835" />
      </mesh>

      {/* Bóng đèn */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={on ? "#fff3e0" : "#616161"}
          emissive={on ? "#fff3e0" : "#000"}
          emissiveIntensity={1}
        />
      </mesh>

      {/* Ánh sáng */}
      {on && (
        <pointLight
          intensity={1.5}
          distance={6}
          color="#ffe08c"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      )}
    </group>
  );
}

// function Books() {
//   return (
//     <group position={[-0.6, 0.76, 0]}>
//       {[0, 0.06, 0.12].map((y, i) => (
//         <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 16]}>
//           <boxGeometry args={[0.25, 0.05, 0.35]} />
//           <meshStandardMaterial color={i === 2 ? "#1976d2" : "#d32f2f"} />
//         </mesh>
//       ))}
//     </group>
//   );
// }
function Books() {
  return (
    <group position={[-0.4, 0.76, 0.2]}>
      {[0, 0.06, 0.12].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 16]}>
          <boxGeometry args={[0.25, 0.05, 0.35]} />
          <meshStandardMaterial color={i === 2 ? "#1976d2" : "#d32f2f"} />
        </mesh>
      ))}
    </group>
  );
}

function Room() {
  const [lampOn, setLampOn] = useState(true);
  const [fanOn, setFanOn] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);

  // Khai báo các ref
  const doorRef = useRef();
  const plantRef = useRef();

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        doorOpen ? -Math.PI / 2 : 0,
        0.1
      );
    }
  });

  useFrame(({ clock }) => {
    if (plantRef.current) {
      plantRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });
  return (
    // <group>
    //   {/* Sàn nhà */}
    //   <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    //     <planeGeometry args={[20, 20]} />
    //     <meshStandardMaterial color="#eeeeee" roughness={0.8} />
    //   </mesh>

    //   <Desk />
    //   <Chair />
    //   <Books />

    // <group>
    //   {/* Sàn nhà */}
    //   <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    //     <planeGeometry args={[20, 20]} />
    //     <meshStandardMaterial color="#eeeeee" roughness={0.8} />
    //   </mesh>
    <group>
      {/* Sàn nhà */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} />
      </mesh>

      <Walls />
      <Plant />
      <Desk />
      <Chair />
      <Books />
      <group ref={doorRef} onClick={() => setDoorOpen(!doorOpen)}>
        <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#64b5f6" transparent opacity={0.7} />
        </mesh>
      </group>
      {/* Đèn bàn */}
      <group
        position={[0.5, 0.8, 0.2]}
        onClick={(e) => {
          e.stopPropagation();
          setLampOn(!lampOn);
        }}
      >
        <Lamp on={lampOn} />
      </group>

      {/* Quạt trần */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          setFanOn(!fanOn);
        }}
      >
        <Fan on={fanOn} />
      </group>

      <ContactShadows
        frames={1}
        position={[0, -0.99, 0]}
        scale={15}
        blur={5}
        opacity={0.6}
        far={1}
      />
    </group>
  );
}

export default function Room3D() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={2} />

      <Suspense fallback={null}>
        <Environment preset="dawn" />
        <Room />

        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} />
        </EffectComposer>
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
      />
    </Canvas>
  );
}
