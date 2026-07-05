// HeroSection component with Three.js cosmic background + GSAP scroll animations
'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// Cycling labels shown in section 0 (auto-rotated on timer)
const cyclingLabels = [
  { title: 'S.M.IRFAN',   sub1: 'Front-End Developer · Python Programmer', sub2: 'Building responsive, user-centric web applications' },
  { title: 'DEVELOPER',   sub1: 'React · Next.js · Node.js · TypeScript',   sub2: 'Turning ideas into fast, scalable web experiences'  },
  { title: 'DESIGNER',    sub1: 'UI/UX · Figma · Motion Design',             sub2: 'Pixel-perfect interfaces that feel premium'           },
  { title: 'AI / ML',     sub1: 'Python · TensorFlow · Data Science',        sub2: 'Building intelligent systems that learn & adapt'      },
  { title: 'CREATOR',     sub1: 'Open-Source · Side Projects · Content',     sub2: 'Bringing bold ideas to life through code'             },
  { title: 'INNOVATOR',   sub1: 'Problem Solver \u00b7 Fast Learner \u00b7 Builder',   sub2: 'Engineering tomorrow\u2019s solutions today'              },
];

const sectionData = [
  {
    title: 'S.M.IRFAN',
    sub1: 'Front-End Developer | Python Programmer',
    sub2: 'Building responsive, user-centric web applications'
  },
  {
    title: 'FRONT-END DEV',
    sub1: 'React.js · Next.js · TypeScript · Tailwind CSS',
    sub2: 'Designing stunning, pixel-perfect user interfaces'
  },
  {
    title: 'AI / ML',
    sub1: 'Python · TensorFlow · NLP · Deep Learning',
    sub2: 'Building intelligent systems that learn & adapt'
  },
  {
    title: 'FULL-STACK DEV',
    sub1: 'Node.js · Supabase · PostgreSQL · Git & GitHub',
    sub2: 'Connecting secure databases with modern client interfaces'
  }
];

const splitTitleHTML = (text: string) =>
  text.split('').map((char) => {
    if (char === ' ') return `<span class="title-char">&nbsp;</span>`;
    return `<span class="title-char">${char}</span>`;
  }).join('');

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const cameraVelocity = useRef({ x: 0, y: 0, z: 0 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [cyclingLabelIndex, setCyclingLabelIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const totalSections = 3; // 4 snap steps: 0=hero(cycling), 1=FRONT-END DEV, 2=AI/ML, 3=FULL-STACK DEV

  // Wheel-snap state
  const wheelCooldown = useRef(false);
  const heroExited = useRef(false);

  // Cycling label state for section 0
  const cyclingIndexRef = useRef(0);
  const cyclingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const threeRefs = useRef<any>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: [],
    targetCameraX: undefined,
    targetCameraY: undefined,
    targetCameraZ: undefined,
    lastIndex: 0,
  });

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;

      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      createMoon();
      getLocation();
      animate();

      setIsReady(true);
      (window as any).__three = refs;
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 5000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments = 50;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index, hidden: false };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      const geometry = new THREE.SphereGeometry(1500, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
      refs.atmosphere = atmosphere;
    };

    const createMoon = () => {
      const { current: refs } = threeRefs;

      // 1. Moon Core Sphere
      const moonGeo = new THREE.SphereGeometry(30, 32, 32);
      const moonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        fog: false,
      });
      const moon = new THREE.Mesh(moonGeo, moonMat);
      moon.position.set(130, 95, -850);
      refs.scene.add(moon);
      refs.moon = moon;

      // 2. Dynamic Canvas for smooth radial glow texture (white & silver-blue only, no purple)
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(220, 235, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(140, 180, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const glowTexture = new THREE.CanvasTexture(canvas);
      refs.moonGlowTexture = glowTexture;

      // 3. Moon Glow Sprite
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        fog: false,
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.position.set(130, 95, -849);
      glowSprite.scale.set(140, 140, 1);
      refs.scene.add(glowSprite);
      refs.moonGlow = glowSprite;
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((sf: any) => {
        if (sf.material.uniforms) sf.material.uniforms.time.value = time;
      });

      if (refs.nebula?.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const sf = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * sf;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * sf;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * sf;

        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((mountain: any, i: number) => {
        const pf = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * pf;
        
        // Smoothly slide down to Y: -1200 if hidden (to avoid pixel clipping on deep zooms), 
        // otherwise stay at floating Y: 50.
        const targetY = mountain.userData.hidden ? -1200 : 50;
        mountain.position.y += (targetY + Math.cos(time * 0.15) * 1 * pf - mountain.position.y) * 0.08;
      });

      if (refs.composer) refs.composer.render();
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      const { current: refs } = threeRefs;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach((sf: any) => { sf.geometry.dispose(); sf.material.dispose(); });
      refs.mountains.forEach((m: any) => { m.geometry.dispose(); m.material.dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); refs.nebula.material.dispose(); }
      if (refs.moon) { refs.moon.geometry.dispose(); refs.moon.material.dispose(); }
      if (refs.moonGlow) refs.moonGlow.material.dispose();
      if (refs.moonGlowTexture) refs.moonGlowTexture.dispose();
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    refs.mountains.forEach((mountain: any, i: number) => {
      refs.locations[i] = mountain.position.z;
    });
  };

  // GSAP entrance animations
  useEffect(() => {
    if (!isReady) return;
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], {
      visibility: 'visible',
    });
    const tl = gsap.timeline();
    if (menuRef.current) tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.title-char');
      tl.from(chars, { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out' }, '-=0.5');
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(lines, { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    }
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5');
    }
    return () => { tl.kill(); };
  }, [isReady]);

  // Helper: smoothly swap title + subtitle content with GSAP
  const swapHeroText = (data: { title: string; sub1: string; sub2: string }) => {
    if (!titleRef.current || !subtitleRef.current) return;
    const tl = gsap.timeline();
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: -18,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        if (!titleRef.current || !subtitleRef.current) return;
        titleRef.current.innerHTML = splitTitleHTML(data.title);
        const chars = titleRef.current.querySelectorAll('.title-char');
        subtitleRef.current.innerHTML = `
          <p class="subtitle-line">${data.sub1}</p>
          <p class="subtitle-line">${data.sub2}</p>
        `;
        const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
        gsap.set(titleRef.current, { opacity: 1, y: 0 });
        gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
        gsap.set(chars, { y: 40, opacity: 0 });
        gsap.set(lines, { y: 15, opacity: 0 });
        gsap.timeline()
          .to(chars, { y: 0, opacity: 1, duration: 0.48, stagger: 0.022, ease: 'power3.out' })
          .to(lines, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.32');
      }
    });
  };

  // Listen to activeIndex changes and perform a smooth fade-out / update / fade-in animation
  useEffect(() => {
    if (!isReady) return;

    // Skip the very first run since we already animated the initial text on mount
    if (threeRefs.current.isFirstAnimationRun === undefined) {
      threeRefs.current.isFirstAnimationRun = false;
      return;
    }

    if (activeIndex === 0) {
      // Section 0: let the cycling interval handle the text
      return;
    }

    // Stop cycling when user scrolls past section 0
    if (cyclingIntervalRef.current) {
      clearInterval(cyclingIntervalRef.current);
      cyclingIntervalRef.current = null;
    }

    swapHeroText(sectionData[activeIndex] || sectionData[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isReady]);

  // Auto-cycling effect for section 0
  useEffect(() => {
    if (!isReady) return;

    const startCycling = () => {
      if (cyclingIntervalRef.current) clearInterval(cyclingIntervalRef.current);
      cyclingIntervalRef.current = setInterval(() => {
        // Only cycle when we're on section 0
        if (threeRefs.current.lastIndex !== 0) return;
        cyclingIndexRef.current = (cyclingIndexRef.current + 1) % cyclingLabels.length;
        setCyclingLabelIndex(cyclingIndexRef.current);
        swapHeroText(cyclingLabels[cyclingIndexRef.current]);
      }, 2200);
    };

    startCycling();

    return () => {
      if (cyclingIntervalRef.current) clearInterval(cyclingIntervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  // When user scrolls BACK to section 0, resume cycling
  useEffect(() => {
    if (!isReady) return;
    if (activeIndex === 0) {
      cyclingIndexRef.current = 0;
      setCyclingLabelIndex(0);
      swapHeroText(cyclingLabels[0]);
      if (cyclingIntervalRef.current) clearInterval(cyclingIntervalRef.current);
      cyclingIntervalRef.current = setInterval(() => {
        if (threeRefs.current.lastIndex !== 0) return;
        cyclingIndexRef.current = (cyclingIndexRef.current + 1) % cyclingLabels.length;
        setCyclingLabelIndex(cyclingIndexRef.current);
        swapHeroText(cyclingLabels[cyclingIndexRef.current]);
      }, 2200);
    }
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Wheel-snap scroll handler + scroll-back re-entry
  useEffect(() => {
    if (!isReady) return;

    const TOTAL_STEPS = totalSections;

    const cameraPositions = [
      { x: 0, y: 30, z: 300 },
      { x: 0, y: 35, z: 100 },
      { x: 0, y: 40, z: -100 },
      { x: 0, y: 50, z: -700 },
    ];

    const applyCamera = (index: number) => {
      const { current: refs } = threeRefs;
      const pos = cameraPositions[Math.min(index, cameraPositions.length - 1)];
      refs.targetCameraX = pos.x;
      refs.targetCameraY = pos.y;
      refs.targetCameraZ = pos.z;
    };

    const applyMountains = (index: number) => {
      const { current: refs } = threeRefs;
      refs.mountains.forEach((mountain: any) => {
        mountain.userData.hidden = index >= 2;
      });
      if (refs.nebula) {
        refs.nebula.visible = index < 2;
      }
      if (refs.atmosphere) {
        refs.atmosphere.visible = index < 2;
      }
    };

    const goToSection = (newIndex: number) => {
      const { current: refs } = threeRefs;
      refs.lastIndex = newIndex;
      setActiveIndex(newIndex);
      setScrollProgress(newIndex / TOTAL_STEPS);
      applyCamera(newIndex);
      applyMountains(newIndex);
    };

    // Fade the hero overlay IN smoothly using GSAP
    const fadeHeroIn = (startIndex = 0) => {
      heroExited.current = false;
      // Set a longer cooldown on re-entry to absorb remaining scroll momentum
      wheelCooldown.current = true;
      setTimeout(() => { wheelCooldown.current = false; }, 950);
      const heroContentEl = titleRef.current?.closest('.hero-content') as HTMLElement;
      if (heroContentEl) {
        gsap.to(heroContentEl, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform',
          onStart: () => {
            heroContentEl.style.transform = 'translate(-50%, -50%)';
          }
        });
      }
      if (menuRef.current) gsap.to(menuRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      if (scrollProgressRef.current) gsap.to(scrollProgressRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      // Reset back to specified starting index
      goToSection(startIndex);
    };

    // Fade the hero overlay OUT and scroll into portfolio
    const exitHero = () => {
      heroExited.current = true;
      const heroContentEl = titleRef.current?.closest('.hero-content') as HTMLElement;
      if (heroContentEl) {
        gsap.to(heroContentEl, {
          opacity: 0,
          y: -60,
          duration: 0.5,
          ease: 'power2.in',
        });
      }
      if (menuRef.current) gsap.to(menuRef.current, { opacity: 0, duration: 0.4 });
      if (scrollProgressRef.current) gsap.to(scrollProgressRef.current, { opacity: 0, duration: 0.4 });
      setTimeout(() => {
        const portfolioEl = document.getElementById('portfolio-content');
        if (portfolioEl) portfolioEl.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    };

    const handleWheel = (e: WheelEvent) => {
      if (heroExited.current) return; // let native scroll work in portfolio

      const { current: refs } = threeRefs;
      const currentIdx = refs.lastIndex ?? 0;

      if (e.deltaY > 0) {
        // Scrolling DOWN
        e.preventDefault();
        if (wheelCooldown.current) return;
        wheelCooldown.current = true;
        setTimeout(() => { wheelCooldown.current = false; }, 650);

        if (currentIdx < TOTAL_STEPS) {
          goToSection(currentIdx + 1);
        } else {
          exitHero();
        }
      } else if (e.deltaY < 0) {
        // Scrolling UP inside hero
        if (heroExited.current) return;
        e.preventDefault();
        if (wheelCooldown.current) return;
        wheelCooldown.current = true;
        setTimeout(() => { wheelCooldown.current = false; }, 650);

        if (currentIdx > 0) goToSection(currentIdx - 1);
      }
    };

    // Watch native scroll: when user scrolls back to very top, re-enter hero
    const handleScrollBack = () => {
      if (heroExited.current && window.scrollY === 0) {
        fadeHeroIn(TOTAL_STEPS);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScrollBack, { passive: true });
    applyCamera(0);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScrollBack);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <div ref={containerRef} className="hero-container cosmos-style">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Side menu */}
      <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text">SPACE</div>
      </div>

      {/* Main fixed hero content */}
      <div className="hero-content cosmos-content">
        <div className="hero-name-wrapper">
          <h1
            ref={titleRef}
            className="hero-title"
            style={{ visibility: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: splitTitleHTML(sectionData[0].title) }}
          />
        </div>
        <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle" style={{ visibility: 'hidden' }}>
          <p className="subtitle-line">{sectionData[0].sub1}</p>
          <p className="subtitle-line">{sectionData[0].sub2}</p>
        </div>
        {/* Cycling dot indicator – only visible on section 0 */}
        {activeIndex === 0 && (
          <div className="cycling-dots">
            {cyclingLabels.map((_, i) => (
              <span
                key={i}
                className={`cycling-dot${i === cyclingLabelIndex ? ' active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll progress */}
      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="section-counter">
          {String(activeIndex + 1).padStart(2, '0')} / {String(totalSections + 1).padStart(2, '0')}
        </div>
      </div>

      {/* No scroll spacers needed – wheel events handle section stepping */}
    </div>
  );
};
