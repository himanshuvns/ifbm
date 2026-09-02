'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Hero3DCanvas.module.css';

export default function Hero3DCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Texture loading
    const textureLoader = new THREE.TextureLoader();
    const ballTexture = textureLoader.load('/images/real-football.png');

    // 3. 3D Football Mesh
    const geometry = new THREE.SphereGeometry(1.8, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: ballTexture,
      roughness: 0.35,
      metalness: 0.1,
    });
    const footballMesh = new THREE.Mesh(geometry, material);
    scene.add(footballMesh);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Saffron Key Light
    const saffronLight = new THREE.DirectionalLight(0xd46726, 2.5);
    saffronLight.position.set(5, 5, 5);
    scene.add(saffronLight);

    // Pitch Green Fill Light
    const greenLight = new THREE.PointLight(0x1b7340, 2.0, 10);
    greenLight.position.set(-5, -3, 3);
    scene.add(greenLight);

    // Studio Rim Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // 5. Interactive Mouse Rotation & Drag Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        targetRotationY += deltaMove.x * 0.008;
        targetRotationX += deltaMove.y * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 6. Animation Loop
    let reqId;
    const animate = () => {
      // Natural idle spin + mouse parallax
      footballMesh.rotation.y += 0.005;
      footballMesh.rotation.x += 0.002;

      // Inertia lerp towards target drag rotation or mouse position
      footballMesh.rotation.y += (targetRotationY + mouseX * 0.4 - footballMesh.rotation.y) * 0.05;
      footballMesh.rotation.x += (targetRotationX + mouseY * 0.3 - footballMesh.rotation.x) * 0.05;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      <div className={styles.interactiveHint}>
        <span>3D INTERACTIVE — CLICK & DRAG TO SPIN</span>
      </div>
    </div>
  );
}
