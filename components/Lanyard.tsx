/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

// ── Asset paths ───────────────────────────────────────────────────────────────
const cardGLB    = '/card.glb';
const lanyardPNG = '/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1×1 transparent pixel — lets useTexture be called unconditionally
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// UV rects for the card atlas (front = left half, back = right half)
const FRONT_UV_RECT = { x: 0,   y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT  = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

// ── Types ─────────────────────────────────────────────────────────────────────
interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardFaceURI?: string;
  onPreview?: () => void;
}

// ── Root component ────────────────────────────────────────────────────────────
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  // Generate card face URI here so both Band and the preview modal can use it
  const cardFaceURI = useMemo(() => {
    if (typeof document === 'undefined') return BLANK_PIXEL;
    const W = 600, H = 900;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d')!;
    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };
    rr(0, 0, W, H, 36); ctx.fillStyle = '#2348c8'; ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    for (let row = 0; row < 3; row++) for (let col = 0; col < 5; col++) { ctx.beginPath(); ctx.arc(52 + col * 20, 52 + row * 20, 3, 0, Math.PI * 2); ctx.fill(); }
    ctx.beginPath(); ctx.arc(W - 40, 70, 90, 0, Math.PI * 2); ctx.fillStyle = 'rgba(100,130,255,0.35)'; ctx.fill();
    const cx = W / 2, cy = 195, cr = 88;
    ctx.beginPath(); ctx.arc(cx, cy, cr + 6, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fillStyle = '#e03030'; ctx.fill();
    ctx.font = 'bold 58px Arial,sans-serif'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('SMI', cx, cy + 4);
    ctx.font = 'bold 42px Arial,sans-serif'; ctx.fillStyle = '#fff'; ctx.textBaseline = 'alphabetic'; ctx.fillText('Shaik Mohammad Irfan', cx, 350);
    const bW = 310, bH = 46, bX = (W - bW) / 2, bY = 368;
    rr(bX, bY, bW, bH, 23); ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.font = 'bold 16px monospace'; ctx.fillStyle = '#a5c4ff'; ctx.textAlign = 'left'; ctx.fillText('</>', bX + 22, bY + 30);
    ctx.font = 'bold 15px Arial,sans-serif'; ctx.fillStyle = '#fff'; ctx.letterSpacing = '2px'; ctx.textAlign = 'center'; ctx.fillText('SOFTWARE DEVELOPER', cx + 16, bY + 30); ctx.letterSpacing = '0px';
    const boxY = 430, boxH = 88;
    rr(40, boxY, W - 80, boxH, 18); ctx.fillStyle = 'rgba(220,228,255,0.18)'; ctx.fill();
    rr(62, boxY + 18, 52, 52, 14); ctx.fillStyle = 'rgba(180,200,255,0.25)'; ctx.fill();
    ctx.font = '28px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🚀', 88, boxY + 44);
    ctx.font = '18px Arial,sans-serif'; ctx.fillStyle = '#e8eeff'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('Building my own startup.', 130, boxY + 36);
    ctx.fillStyle = '#c8d4ff'; ctx.fillText('Currently working on ', 130, boxY + 62);
    ctx.fillStyle = '#7eb3ff'; ctx.font = 'bold 18px Arial,sans-serif'; ctx.fillText('Vibexpert', 130 + 196, boxY + 62);
    ctx.fillStyle = '#c8d4ff'; ctx.font = '18px Arial,sans-serif'; ctx.fillText(' as ', 130 + 196 + 82, boxY + 62);
    ctx.fillStyle = '#7eb3ff'; ctx.font = 'bold 18px Arial,sans-serif'; ctx.fillText('Head.', 130 + 196 + 82 + 36, boxY + 62);
    ctx.beginPath(); ctx.moveTo(0, 536); ctx.bezierCurveTo(150, 510, 450, 560, W, 530); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fillStyle = '#eef1f8'; ctx.fill();
    const r1 = 600;
    rr(40, r1, 70, 70, 16); ctx.fillStyle = 'rgba(35,72,200,0.1)'; ctx.fill();
    ctx.font = 'bold 26px monospace'; ctx.fillStyle = '#2348c8'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('</>', 75, r1 + 35);
    ctx.font = 'bold 13px Arial,sans-serif'; ctx.fillStyle = '#2348c8'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('DEGREE', 130, r1 + 24);
    ctx.font = 'bold 24px Arial,sans-serif'; ctx.fillStyle = '#111827'; ctx.fillText('B.Tech — Computer Science', 130, r1 + 56);
    ctx.strokeStyle = 'rgba(35,72,200,0.12)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, r1 + 82); ctx.lineTo(W - 40, r1 + 82); ctx.stroke();
    const r2 = 710;
    rr(40, r2, 70, 70, 16); ctx.fillStyle = 'rgba(35,72,200,0.1)'; ctx.fill();
    ctx.strokeStyle = '#2348c8'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(54, r2 + 18, 42, 32, 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(54, r2 + 18); ctx.lineTo(75, r2 + 36); ctx.lineTo(96, r2 + 18); ctx.stroke();
    ctx.font = 'bold 13px Arial,sans-serif'; ctx.fillStyle = '#2348c8'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('EMAIL', 130, r2 + 24);
    ctx.font = 'bold 23px Arial,sans-serif'; ctx.fillStyle = '#111827'; ctx.fillText('smirfan9247@gmail.com', 130, r2 + 56);
    ctx.strokeStyle = 'rgba(35,72,200,0.12)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, r2 + 82); ctx.lineTo(W - 40, r2 + 82); ctx.stroke();
    const qY = 820;
    ctx.font = 'bold 40px Georgia,serif'; ctx.fillStyle = '#2348c8'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('\u201C\u201C', 44, qY);
    ctx.fillStyle = '#2348c8'; ctx.fillRect(100, qY - 26, 4, 54);
    ctx.font = '19px Arial,sans-serif'; ctx.fillStyle = '#374151'; ctx.fillText('Code. Build. Solve.', 116, qY - 8); ctx.fillText('Turning ideas into real impact.', 116, qY + 22);
    return c.toDataURL('image/png');
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPreviewOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewOpen]);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            cardFaceURI={cardFaceURI}
            onPreview={() => setPreviewOpen(true)}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2}  color="white" position={[0,  -1,  5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3}  color="white" position={[-1, -1,  1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3}  color="white" position={[1,   1,  1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>

      {/* ── Long-press full-screen preview modal ── */}
      {previewOpen && (
        <div
          className="card-preview-overlay"
          onClick={() => setPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Card preview"
        >
          <div className="card-preview-inner" onClick={e => e.stopPropagation()}>
            <button
              className="card-preview-close"
              onClick={() => setPreviewOpen(false)}
              aria-label="Close preview"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cardFaceURI}
              alt="Shaik Mohammad Irfan — Software Developer card"
              className="card-preview-img"
            />
            <p className="card-preview-hint">Tap outside or press Esc to close</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Band (physics rope + card) ────────────────────────────────────────────────
function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  cardFaceURI = BLANK_PIXEL,
  onPreview,
}: BandProps) {
  const band  = useRef<THREE.Mesh>(null!);
  const fixed = useRef(null!);
  const j1    = useRef(null!);
  const j2    = useRef(null!);
  const j3    = useRef(null!);
  const card  = useRef(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as unknown as undefined,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB as string);

  // Generate SMI band texture client-side — no external file required
  const smiBandURI = useMemo(() => {
    if (typeof document === 'undefined') return lanyardPNG;
    const W = 64, H = 256;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, W, H);
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#a5b4fc';
    const step = 56;
    for (let y = step / 2; y < H + step; y += step) ctx.fillText('SMI', W / 2, y);
    ctx.strokeStyle = 'rgba(99,102,241,0.3)';
    ctx.lineWidth = 1;
    for (let y = step; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(8, y); ctx.lineTo(W - 8, y); ctx.stroke();
    }
    return canvas.toDataURL('image/png');
  }, []);

  // Use the canvas-generated card face passed from parent
  const resolvedFrontImage = frontImage || cardFaceURI;

  const texture   = useTexture((lanyardImage || smiBandURI) as string);
  const frontTex  = useTexture(resolvedFrontImage);
  const backTex   = useTexture(backImage || BLANK_PIXEL);

  // Composite front/back images into the card atlas
  const cardMap = useMemo(() => {
    const baseMap = (materials as Record<string, THREE.MeshStandardMaterial>).base?.map;
    if (!baseMap) return null;

    const baseImg = baseMap.image as HTMLImageElement | HTMLCanvasElement;
    const W = (baseImg as HTMLCanvasElement).width  ?? 1024;
    const H = (baseImg as HTMLCanvasElement).height ?? 1024;

    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (
      img: HTMLImageElement | HTMLCanvasElement,
      rect: { x: number; y: number; w: number; h: number },
    ) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / (img as HTMLImageElement).width, rh / (img as HTMLImageElement).height);
      const dw = (img as HTMLImageElement).width  * scale;
      const dh = (img as HTMLImageElement).height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontTex.image) drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace  = THREE.SRGBColorSpace;
    composite.flipY       = baseMap.flipY;
    composite.anisotropy  = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, cardFaceURI, backImage, imageFit, frontTex, backTex, materials]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2,    [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3,    [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(r => (r.current as any)?.wakeUp());
      (card.current as any)?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        const r = ref.current as any;
        if (!r.lerped) r.lerped = new THREE.Vector3().copy(r.translation());
        const dist = Math.max(0.1, Math.min(1, r.lerped.distanceTo(r.translation())));
        r.lerped.lerp(r.translation(), delta * (minSpeed + dist * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy((j3.current    as any).translation());
      curve.points[1].copy((j2.current    as any).lerped);
      curve.points[2].copy((j1.current    as any).lerped);
      curve.points[3].copy((fixed.current as any).translation());

      (band.current.geometry as any).setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy((card.current as any).angvel());
      rot.copy((card.current as any).rotation());
      (card.current as any).setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const cardNodes  = nodes as Record<string, THREE.Mesh>;
  const cardMats   = materials as Record<string, THREE.Material>;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              // Cancel long-press if released early
              if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
              drag(false);
            }}
            onPointerDown={e => {
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy((card.current as any).translation())),
              );
              // Start long-press timer (500 ms)
              longPressTimer.current = setTimeout(() => {
                longPressTimer.current = null;
                drag(false);
                onPreview?.();
              }, 500);
            }}
          >
            <mesh geometry={cardNodes.card?.geometry}>
              <meshPhysicalMaterial
                map={cardMap ?? undefined}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={cardNodes.clip?.geometry}  material={cardMats.metal} material-roughness={0.3} />
            <mesh geometry={cardNodes.clamp?.geometry} material={cardMats.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        {/* @ts-expect-error: custom extended elements */}
        <meshLineGeometry />
        {/* @ts-expect-error: custom extended elements */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
