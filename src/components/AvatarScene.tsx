import { useEffect, useRef, useState } from 'react';
import { Hand } from 'lucide-react';
import * as THREE from 'three';

const AVATAR_SRC = `${import.meta.env.BASE_URL}images/team/boss-avatar.jpg`;

export default function AvatarScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let texture: THREE.Texture | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.MeshBasicMaterial | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 3;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.className = 'absolute inset-0 h-full w-full';
      host.appendChild(renderer.domElement);

      const portrait = new THREE.Group();
      scene.add(portrait);

      const pointer = new THREE.Vector2();
      const target = new THREE.Vector2();
      const clock = new THREE.Clock();

      const resize = () => {
        if (!renderer) return;
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        const aspect = width / height;
        const viewHeight = 2.08;
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.left = -(viewHeight * aspect) / 2;
        camera.right = (viewHeight * aspect) / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const onPointerMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      const onPointerLeave = () => target.set(0, 0);
      host.addEventListener('pointermove', onPointerMove);
      host.addEventListener('pointerleave', onPointerLeave);

      new THREE.TextureLoader().load(
        AVATAR_SRC,
        (loadedTexture) => {
          texture = loadedTexture;
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(renderer?.capabilities.getMaxAnisotropy() ?? 1, 8);
          geometry = new THREE.PlaneGeometry(2, 2, 12, 12);
          material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.setScalar(1.035);
          portrait.add(mesh);
          setReady(true);
        },
        undefined,
        () => setReady(false),
      );

      const animate = () => {
        frame = window.requestAnimationFrame(animate);
        pointer.lerp(target, 0.055);
        const elapsed = clock.getElapsedTime();
        portrait.rotation.y = pointer.x * 0.09;
        portrait.rotation.x = -pointer.y * 0.065;
        portrait.rotation.z = Math.sin(elapsed * 0.55) * 0.004;
        portrait.position.y = Math.sin(elapsed * 0.8) * 0.018;
        const breath = 1 + Math.sin(elapsed * 1.1) * 0.0025;
        portrait.scale.setScalar(breath);
        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        window.cancelAnimationFrame(frame);
        observer.disconnect();
        host.removeEventListener('pointermove', onPointerMove);
        host.removeEventListener('pointerleave', onPointerLeave);
        geometry?.dispose();
        material?.dispose();
        texture?.dispose();
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    } catch {
      setReady(false);
      return undefined;
    }
  }, []);

  return (
    <figure className="group relative mx-auto w-full max-w-[460px] lg:mx-0">
      <div className="absolute -inset-3 rounded-[30px] bg-brand-orange/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
      <div
        ref={hostRef}
        className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/15 bg-[#f6ead7] shadow-2xl shadow-black/25"
        aria-label="Jayakirana team representative"
      >
        <img
          src={AVATAR_SRC}
          alt="Jayakirana team representative"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-white/10" />
        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
        <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-brand-dark/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-200 backdrop-blur">
          <Hand size={12} className="text-brand-orange" /> Welcome
        </span>
      </div>
      <figcaption className="absolute -bottom-4 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-white/10 bg-brand-dark/95 px-4 py-3 text-white shadow-xl backdrop-blur">
        <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-200">
          A word from the owner
        </span>
        <span className="mt-1 block text-xs font-bold leading-snug">
          “Welcome to Jayakirana — happy to help you find the right thing.”
        </span>
      </figcaption>
    </figure>
  );
}
