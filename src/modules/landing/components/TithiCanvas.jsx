import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TithiCanvas = ({ submitted }) => {
  const mountRef = useRef(null);
  const stateRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    stars: null,
    mandala: null,
    animId: null,
    warpProgress: 0,
    isWarping: false,
    warpDir: 1,
  });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const s = stateRef.current;
    const W = el.clientWidth;
    const H = el.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    s.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    s.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    s.renderer.setSize(W, H);
    s.renderer.setClearColor(0x000000, 0);
    el.appendChild(s.renderer.domElement);

    // ── Scene + Camera ─────────────────────────────────────────────────────
    s.scene = new THREE.Scene();
    s.camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    s.camera.position.z = 5;

    // ── Star Particles ─────────────────────────────────────────────────────
    const count = W < 640 ? 400 : 800;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc8a96e,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    s.stars = new THREE.Points(starGeo, starMat);
    s.scene.add(s.stars);

    // ── Mandala (TorusKnot wireframe) ──────────────────────────────────────
    if (W >= 640) {
      const geo = new THREE.TorusKnotGeometry(1.4, 0.35, 120, 16, 3, 5);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xc8a96e,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      s.mandala = new THREE.Mesh(geo, mat);
      s.mandala.position.set(2.5, 0, -2);
      s.scene.add(s.mandala);
    }

    // ── Resize handler ─────────────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      s.renderer.setSize(w, h);
      s.camera.aspect = w / h;
      s.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ─────────────────────────────────────────────────────
    const animate = () => {
      s.animId = requestAnimationFrame(animate);
      const pos = s.stars.geometry.attributes.position.array;

      if (s.isWarping) {
        // Stars converge toward center then explode out
        s.warpProgress += 0.025 * s.warpDir;
        if (s.warpProgress >= 1) { s.warpDir = -1; s.warpProgress = 1; }
        if (s.warpProgress <= 0) { s.isWarping = false; s.warpDir = 1; s.warpProgress = 0; }
        for (let i = 0; i < count; i++) {
          const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
          const t = s.warpProgress < 0.5 ? s.warpProgress * 2 : (1 - s.warpProgress) * 2;
          pos[ix] += (-pos[ix] * 0.04 + velocities[ix]) * t + velocities[ix] * (1 - t);
          pos[iy] += (-pos[iy] * 0.04 + velocities[iy]) * t + velocities[iy] * (1 - t);
          pos[iz] += (-pos[iz] * 0.04 + velocities[iz]) * t + velocities[iz] * (1 - t);
        }
      } else {
        // Normal gentle drift
        for (let i = 0; i < count; i++) {
          const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
          pos[ix] += velocities[ix];
          pos[iy] += velocities[iy];
          pos[iz] += velocities[iz];
          // Wrap around bounds
          if (pos[ix] > 10) pos[ix] = -10;
          if (pos[ix] < -10) pos[ix] = 10;
          if (pos[iy] > 10) pos[iy] = -10;
          if (pos[iy] < -10) pos[iy] = 10;
          if (pos[iz] > 10) pos[iz] = -10;
          if (pos[iz] < -10) pos[iz] = 10;
        }
      }

      s.stars.geometry.attributes.position.needsUpdate = true;
      s.stars.rotation.y += 0.0004;

      if (s.mandala) {
        s.mandala.rotation.y += 0.003;
        s.mandala.rotation.x += 0.001;
      }

      s.renderer.render(s.scene, s.camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener('resize', onResize);
      starGeo.dispose();
      starMat.dispose();
      if (s.mandala) {
        s.mandala.geometry.dispose();
        s.mandala.material.dispose();
      }
      s.renderer.dispose();
      if (el.contains(s.renderer.domElement)) el.removeChild(s.renderer.domElement);
    };
  }, []);

  // Trigger warp when submitted changes to true
  useEffect(() => {
    if (submitted) {
      stateRef.current.isWarping = true;
      stateRef.current.warpDir = 1;
      stateRef.current.warpProgress = 0;
    }
  }, [submitted]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        borderRadius: 'inherit',
      }}
    />
  );
};

export default TithiCanvas;
