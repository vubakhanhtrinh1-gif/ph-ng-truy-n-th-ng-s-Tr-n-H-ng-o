import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EXPLORATION_DOORS, VIEWPOINTS } from '../data/doors';
import { ExplorationDoor, ViewpointId } from '../types/lobby';
import archivalPhotoPath from '../assets/images/archival_photo_1966_1790917981565.jpg';
import officialLogoSvg from '../assets/images/logo_thpt_a_tran_hung_dao.svg';

interface LobbyCanvasProps {
  currentViewpoint: ViewpointId;
  onSelectDoor: (door: ExplorationDoor) => void;
  onSelectArchival: () => void;
  hoveredDoorId: string | null;
  setHoveredDoorId: (id: string | null) => void;
}

export const LobbyCanvas: React.FC<LobbyCanvasProps> = ({
  currentViewpoint,
  onSelectDoor,
  onSelectArchival,
  hoveredDoorId,
  setHoveredDoorId,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction & camera targets
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.2, 10.5));
  const currentCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.2, 10.5));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.6, -8));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.6, -8));

  // User manual pan/rotation offset
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const panEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const targetPanEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  // Raycasting references
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const interactiveObjects = useRef<{ mesh: THREE.Object3D; type: 'door' | 'archival'; data?: ExplorationDoor }[]>([]);

  // Update camera target when viewpoint prop changes
  useEffect(() => {
    const vp = VIEWPOINTS.find((v) => v.id === currentViewpoint) || VIEWPOINTS[0];
    targetCamPos.current.set(...vp.cameraPosition);
    targetLookAt.current.set(...vp.lookAt);

    // Reset manual pan smoothly when changing viewpoint
    targetPanEuler.current.set(0, 0, 0);

    if (cameraRef.current) {
      cameraRef.current.fov = vp.fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [currentViewpoint]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c0e13);
    scene.fog = new THREE.FogExp2(0x0c0e13, 0.02);

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.copy(targetCamPos.current);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    interactiveObjects.current = [];

    // --- PROCEDURAL TEXTURES FOR REFINED REALISM ---
    const createFloorTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Neutral warm limestone base
      ctx.fillStyle = '#1e222a';
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle limestone tile grid (128x128 tiles)
      ctx.strokeStyle = '#15181f';
      ctx.lineWidth = 2;
      for (let x = 0; x <= 1024; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 0; y <= 1024; y += 128) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // Delicate stone mottling
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let i = 0; i < 3000; i++) {
        const px = Math.random() * 1024;
        const py = Math.random() * 1024;
        const pr = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 6);
      return tex;
    };

    // BRIGHTER WARM CLEAN GOLD INLAY (#FFD75A / #F4C542)
    const createBrassFloorLineTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, 512, 2048);

      // Inlaid polished bright gold line in center (#FFD75A)
      ctx.fillStyle = '#FFD75A';
      ctx.fillRect(251, 0, 10, 2048);

      // Accent tick marks and bright golden lettering along floor
      ctx.fillStyle = '#FFD75A';
      ctx.font = 'bold 22px Cinzel, serif';
      ctx.textAlign = 'center';

      // 1966 marker near bottom (entrance)
      ctx.fillText('1966 · CỘI NGUỒN', 256, 1850);
      ctx.fillRect(236, 1865, 40, 2.5);

      // 2026 marker in middle
      ctx.fillText('2026 · 60 NĂM', 256, 1024);
      ctx.fillRect(236, 1040, 40, 2.5);

      // Future arrow near top
      ctx.fillText('HÀNH TRÌNH TƯƠNG LAI ►', 256, 200);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    const floorTex = createFloorTexture();
    const brassFloorTex = createBrassFloorLineTexture();

    // 4. Floor (Polished limestone)
    const floorGeo = new THREE.PlaneGeometry(36, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.26,
      metalness: 0.14,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Brass floor axis strip with brighter warm gold
    const brassLineGeo = new THREE.PlaneGeometry(4, 30);
    const brassLineMat = new THREE.MeshStandardMaterial({
      map: brassFloorTex,
      transparent: true,
      roughness: 0.15,
      metalness: 0.9,
      emissive: 0xffd75a,
      emissiveIntensity: 0.22,
    });
    const brassLineMesh = new THREE.Mesh(brassLineGeo, brassLineMat);
    brassLineMesh.rotation.x = -Math.PI / 2;
    brassLineMesh.position.set(0, 0.015, -2);
    scene.add(brassLineMesh);

    // 5. Ceiling with Coffered Skylight
    const ceilingGeo = new THREE.PlaneGeometry(36, 40);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x14171e,
      roughness: 0.8,
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = 8.5;
    scene.add(ceilingMesh);

    // Geometric Skylight cutout
    const skylightGeo = new THREE.PlaneGeometry(8, 22);
    const skylightMat = new THREE.MeshBasicMaterial({
      color: 0xeef5fc,
      transparent: true,
      opacity: 0.85,
    });
    const skylightMesh = new THREE.Mesh(skylightGeo, skylightMat);
    skylightMesh.rotation.x = Math.PI / 2;
    skylightMesh.position.set(0, 8.48, -2);
    scene.add(skylightMesh);

    // Architectural wooden rafters / beams across skylight
    for (let b = -12; b <= 8; b += 2.5) {
      const beamGeo = new THREE.BoxGeometry(8.4, 0.45, 0.18);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x241e17, roughness: 0.65 });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.set(0, 8.2, b);
      scene.add(beamMesh);
    }

    // 6. Perimeter Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x181c24,
      roughness: 0.7,
    });

    // North wall (Back monumental wall)
    const northWallGeo = new THREE.BoxGeometry(36, 8.5, 0.6);
    const northWall = new THREE.Mesh(northWallGeo, wallMat);
    northWall.position.set(0, 4.25, -16);
    northWall.receiveShadow = true;
    scene.add(northWall);

    // South wall (Behind entrance)
    const southWall = new THREE.Mesh(northWallGeo, wallMat);
    southWall.position.set(0, 4.25, 16);
    scene.add(southWall);

    // West wall (Heritage wing)
    const sideWallGeo = new THREE.BoxGeometry(0.6, 8.5, 32);
    const westWall = new THREE.Mesh(sideWallGeo, wallMat);
    westWall.position.set(-16, 4.25, 0);
    westWall.receiveShadow = true;
    scene.add(westWall);

    // East wall (Contemporary & Future wing)
    const eastWall = new THREE.Mesh(sideWallGeo, wallMat);
    eastWall.position.set(16, 4.25, 0);
    eastWall.receiveShadow = true;
    scene.add(eastWall);

    // Acoustic vertical timber slat feature panels on flanks
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.6 });
    for (let x = -14.5; x <= -6.5; x += 0.45) {
      const slatGeo = new THREE.BoxGeometry(0.18, 7.5, 0.12);
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(x, 3.8, -15.6);
      scene.add(slat);
    }
    for (let x = 6.5; x <= 14.5; x += 0.45) {
      const slatGeo = new THREE.BoxGeometry(0.18, 7.5, 0.12);
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(x, 3.8, -15.6);
      scene.add(slat);
    }

    // --- 60TH ANNIVERSARY CEREMONIAL COMMEMORATIVE BANNER ---
    // Repositioned cleanly on the central back wall, directly ABOVE the central doorway
    // Completely unoccluded, 100% visible from default camera, ratio ~ 4.6:1
    const createAnniversaryBannerTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 480; // High resolution, clean 4.26:1 ratio
      const ctx = canvas.getContext('2d')!;

      // Deep ceremonial burgundy/garnet background (#3d0c14)
      ctx.fillStyle = '#3d0c14';
      ctx.fillRect(0, 0, 2048, 480);

      // Subtle rich fabric gradient texture
      const grad = ctx.createLinearGradient(0, 0, 0, 480);
      grad.addColorStop(0, 'rgba(255, 215, 90, 0.08)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 2048, 480);

      // Outer bright warm gold border (#FFD75A)
      ctx.strokeStyle = '#FFD75A';
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, 2048 - 40, 480 - 40);

      // Inner hairline gold accent line
      ctx.strokeStyle = 'rgba(255, 215, 90, 0.55)';
      ctx.lineWidth = 2;
      ctx.strokeRect(32, 32, 2048 - 64, 480 - 64);

      // Corner ornamental corner blocks
      const drawCorner = (cx: number, cy: number) => {
        ctx.fillStyle = '#FFD75A';
        ctx.fillRect(cx - 8, cy - 8, 16, 16);
      };
      drawCorner(32, 32);
      drawCorner(2048 - 32, 32);
      drawCorner(32, 480 - 32);
      drawCorner(2048 - 32, 480 - 32);

      // Line 1: Small supporting identity (Top)
      ctx.fillStyle = '#FFD75A';
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('TRƯỜNG THPT A TRẦN HƯNG ĐẠO', 1024, 96);

      // Line 2: Main ceremonial headline (Large, bold, crisp white with golden glow)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 64px Cinzel, serif';
      ctx.letterSpacing = '3px';
      ctx.shadowColor = 'rgba(255, 215, 90, 0.7)';
      ctx.shadowBlur = 24;
      ctx.fillText('KỶ NIỆM 60 NĂM THÀNH LẬP TRƯỜNG', 1024, 215);
      ctx.shadowBlur = 0;

      // Delicate gold divider line
      ctx.strokeStyle = 'rgba(255, 215, 90, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(680, 260);
      ctx.lineTo(1368, 260);
      ctx.stroke();

      // Line 3: Secondary commemorative milestone (Bright warm gold)
      ctx.fillStyle = '#FFD75A';
      ctx.font = 'bold 44px Cinzel, serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('★   1966 — 2026   ★', 1024, 345);

      // Subtle commemorative subtitle
      ctx.fillStyle = 'rgba(235, 230, 220, 0.85)';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('60 NĂM XÂY DỰNG VÀ PHÁT TRIỂN', 1024, 405);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    const bannerTex = createAnniversaryBannerTexture();
    const bannerGroup = new THREE.Group();
    // Mounted physically on the central wall plane directly above the central doorway
    // Y = 6.75 (bottom at 6.05m, leaving 0.7m clearance above doorway lintel at 5.35m, top at 7.45m with 1.05m clearance to ceiling)
    // Z = -13.44 (forward of the wall, zero occlusion by doorway structure)
    bannerGroup.position.set(0, 6.75, -13.44);

    // Banner physical board
    const bannerGeo = new THREE.BoxGeometry(6.6, 1.45, 0.08);
    const bannerMat = new THREE.MeshStandardMaterial({
      map: bannerTex,
      roughness: 0.32,
      metalness: 0.2,
      emissive: 0x3d0c14,
      emissiveIntensity: 0.3,
    });
    const bannerMesh = new THREE.Mesh(bannerGeo, bannerMat);
    bannerGroup.add(bannerMesh);

    // Thin brushed bright warm gold frame around the physical banner
    const bannerFrameGeo = new THREE.BoxGeometry(6.68, 1.53, 0.04);
    const bannerFrameMat = new THREE.MeshStandardMaterial({
      color: 0xffd75a,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xffd75a,
      emissiveIntensity: 0.35,
    });
    const bannerFrame = new THREE.Mesh(bannerFrameGeo, bannerFrameMat);
    bannerFrame.position.z = -0.02;
    bannerGroup.add(bannerFrame);

    // Physical mounting standoffs attaching banner securely to the wall behind
    const mountPositions = [-3.0, -1.0, 1.0, 3.0];
    mountPositions.forEach((x) => {
      const bracketGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.16, 16);
      const bracketMat = new THREE.MeshStandardMaterial({ color: 0xffd75a, metalness: 0.9, roughness: 0.2 });
      const bracket = new THREE.Mesh(bracketGeo, bracketMat);
      bracket.rotation.x = Math.PI / 2;
      bracket.position.set(x, 0, -0.08);
      bannerGroup.add(bracket);
    });

    // Dedicated soft warm spotlight focused directly on the banner
    const bannerSpotlight = new THREE.SpotLight(0xfff6dd, 3.2, 22, Math.PI / 3.5, 0.35, 1.2);
    bannerSpotlight.position.set(0, 8.2, -6.5);
    bannerSpotlight.target = bannerMesh;
    scene.add(bannerSpotlight);

    scene.add(bannerGroup);

    // --- 7. CENTRAL IDENTITY WALL WITH BRIGHT WARM GOLD ACCENTS ---
    const createIdentityCanvasTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Neutral textured architectural stone background
      ctx.fillStyle = '#141820';
      ctx.fillRect(0, 0, 2048, 1024);

      // Subtle border framing with brighter warm gold
      ctx.strokeStyle = 'rgba(255, 215, 90, 0.55)';
      ctx.lineWidth = 4;
      ctx.strokeRect(32, 32, 2048 - 64, 1024 - 64);

      // School Emblem Seal (Center top)
      ctx.save();
      ctx.translate(1024, 210);

      // Outer bright gold circle (#FFD75A)
      ctx.strokeStyle = '#FFD75A';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 95, 0, Math.PI * 2);
      ctx.stroke();

      // Inner decorative ring
      ctx.strokeStyle = 'rgba(255, 215, 90, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 85, 0, Math.PI * 2);
      ctx.stroke();

      // Torch and Book icon inside seal
      ctx.fillStyle = '#FFD75A';
      ctx.beginPath();
      ctx.arc(0, -25, 12, 0, Math.PI * 2);
      ctx.fill();

      // Book geometry
      ctx.strokeStyle = '#FFD75A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-45, 20);
      ctx.quadraticCurveTo(0, 5, 45, 20);
      ctx.lineTo(45, 45);
      ctx.quadraticCurveTo(0, 30, -45, 45);
      ctx.closePath();
      ctx.stroke();

      ctx.font = 'bold 22px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.fillText('1966', 0, 75);
      ctx.restore();

      // SCHOOL NAME: TRƯỜNG THPT A TRẦN HƯNG ĐẠO
      ctx.fillStyle = '#FFD75A';
      ctx.font = 'bold 36px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('TRƯỜNG TRUNG HỌC PHỔ THÔNG', 1024, 400);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 76px Cinzel, serif';
      ctx.letterSpacing = '8px';
      ctx.shadowColor = 'rgba(255, 215, 90, 0.65)';
      ctx.shadowBlur = 30;
      ctx.fillText('A TRẦN HƯNG ĐẠO', 1024, 485);
      ctx.shadowBlur = 0;

      // 60 NĂM · 1966 — 2026 (Brighter warm gold)
      ctx.fillStyle = '#FFD75A';
      ctx.font = 'bold 46px Cinzel, serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('60 NĂM  ·  1966 — 2026', 1024, 575);

      // Line divider
      ctx.strokeStyle = 'rgba(255, 215, 90, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(700, 615);
      ctx.lineTo(1348, 615);
      ctx.stroke();

      // CORE EMOTIONAL MESSAGE
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 58px "Playfair Display", Georgia, serif';
      ctx.fillText('“Chào mừng bạn trở về.”', 1024, 715);

      // Secondary storytelling line
      ctx.fillStyle = 'rgba(235, 230, 220, 0.9)';
      ctx.font = '32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Nơi mỗi thế hệ để lại một câu chuyện.', 1024, 785);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    const identityTex = createIdentityCanvasTexture();
    const identityGeo = new THREE.PlaneGeometry(11, 5.5);
    const identityMat = new THREE.MeshStandardMaterial({
      map: identityTex,
      roughness: 0.3,
      metalness: 0.25,
      emissive: 0x1b202c,
      emissiveIntensity: 0.35,
    });
    const identityMesh = new THREE.Mesh(identityGeo, identityMat);
    identityMesh.position.set(0, 4.4, -15.4);
    scene.add(identityMesh);

    // Radiant halo ring around the 60-year milestone (#FFD75A)
    const ringGeo = new THREE.TorusGeometry(1.3, 0.045, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd75a,
      emissive: 0xffd75a,
      emissiveIntensity: 1.25,
      roughness: 0.15,
      metalness: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 5.5, -15.35);
    scene.add(ringMesh);

    // Official school logo medallion mounted physically inside the luminous halo ring
    const logoTextureLoader = new THREE.TextureLoader();
    logoTextureLoader.load(officialLogoSvg, (logoTex) => {
      const logoDiscGeo = new THREE.CircleGeometry(1.18, 64);
      const logoDiscMat = new THREE.MeshBasicMaterial({
        map: logoTex,
        transparent: true,
      });
      const logoDiscMesh = new THREE.Mesh(logoDiscGeo, logoDiscMat);
      logoDiscMesh.position.set(0, 5.5, -15.33);
      scene.add(logoDiscMesh);
    });

    // Soft architectural spotlight focused on the identity wall
    const identitySpotlight = new THREE.SpotLight(0xfff9e6, 3.8, 30, Math.PI / 4, 0.4, 1.2);
    identitySpotlight.position.set(0, 7.8, -6);
    identitySpotlight.target = identityMesh;
    identitySpotlight.castShadow = true;
    scene.add(identitySpotlight);

    // --- 8. ARCHITECTURAL EXPLORATION DOORS ---
    EXPLORATION_DOORS.forEach((door) => {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(...door.position);
      doorGroup.rotation.set(...door.rotation);

      const isFuture = door.theme === 'future';

      // Outer Portal Frame (Stone / Bronze / Teakwood depending on theme)
      let frameColor = 0x2c251e; // warm teakwood for history
      let frameMetalness = 0.2;
      let frameRoughness = 0.6;

      if (door.theme === 'achievements') {
        frameColor = 0x6e5229;
        frameMetalness = 0.8;
        frameRoughness = 0.3;
      } else if (door.theme === 'news' || door.theme === 'student') {
        frameColor = 0x1f2530;
        frameMetalness = 0.4;
      } else if (isFuture) {
        frameColor = 0xffd75a;
        frameMetalness = 0.9;
        frameRoughness = 0.15;
      }

      const frameMat = new THREE.MeshStandardMaterial({
        color: frameColor,
        metalness: frameMetalness,
        roughness: frameRoughness,
      });

      // Frame pillars & lintel
      const postGeo = new THREE.BoxGeometry(0.3, door.height, 0.4);
      const leftPost = new THREE.Mesh(postGeo, frameMat);
      leftPost.position.set(-door.width / 2, 0, 0);
      doorGroup.add(leftPost);

      const rightPost = new THREE.Mesh(postGeo, frameMat);
      rightPost.position.set(door.width / 2, 0, 0);
      doorGroup.add(rightPost);

      const lintelGeo = new THREE.BoxGeometry(door.width + 0.6, 0.4, 0.45);
      const lintel = new THREE.Mesh(lintelGeo, frameMat);
      lintel.position.set(0, door.height / 2 + 0.15, 0);
      doorGroup.add(lintel);

      // Glass / Infill Portal Membrane
      const glassGeo = new THREE.PlaneGeometry(door.width, door.height);
      const glassMat = new THREE.MeshStandardMaterial({
        color: isFuture ? 0xedf7ff : 0x161b24,
        emissive: isFuture ? 0x4aa3df : 0x0f141c,
        emissiveIntensity: isFuture ? 0.5 : 0.12,
        transparent: true,
        opacity: isFuture ? 0.9 : 0.82,
        roughness: isFuture ? 0.1 : 0.4,
        metalness: isFuture ? 0.3 : 0.1,
      });
      const glassDoor = new THREE.Mesh(glassGeo, glassMat);
      glassDoor.position.set(0, 0, 0.02);
      doorGroup.add(glassDoor);

      // Door Transom Title Plaque (Canvas Texture) with brighter gold (#FFD75A)
      const createDoorHeaderCanvas = () => {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 360;
        const cx = c.getContext('2d')!;

        cx.fillStyle = isFuture ? 'rgba(18, 28, 44, 0.95)' : 'rgba(15, 17, 22, 0.92)';
        cx.fillRect(0, 0, 1024, 360);

        cx.strokeStyle = '#FFD75A';
        cx.lineWidth = 4;
        cx.strokeRect(12, 12, 1000, 336);

        // Number
        cx.fillStyle = '#FFD75A';
        cx.font = 'bold 38px Cinzel, serif';
        cx.textAlign = 'center';
        cx.fillText(door.number, 512, 80);

        // Title
        cx.fillStyle = '#f5f2ea';
        cx.font = 'bold 50px Cinzel, serif';
        cx.letterSpacing = '2px';
        cx.fillText(door.title, 512, 170);

        // Subtitle
        cx.fillStyle = '#FFD75A';
        cx.font = '30px "Plus Jakarta Sans", sans-serif';
        cx.fillText(door.subtitle, 512, 245);

        // Status indicator
        cx.fillStyle = 'rgba(215, 220, 230, 0.85)';
        cx.font = '22px "Plus Jakarta Sans", sans-serif';
        cx.fillText('● CHẠM ĐỂ TÌM HIỂU', 512, 305);

        const tex = new THREE.CanvasTexture(c);
        return tex;
      };

      const plaqueTex = createDoorHeaderCanvas();
      const plaqueGeo = new THREE.PlaneGeometry(door.width * 0.92, 1.25);
      const plaqueMat = new THREE.MeshBasicMaterial({ map: plaqueTex });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, door.height * 0.28, 0.06);
      doorGroup.add(plaqueMesh);

      // Door floor glow with brighter clean gold
      const doorLight = new THREE.PointLight(
        isFuture ? 0x9ed8ff : 0xffd75a,
        isFuture ? 2.4 : 1.1,
        8.0,
        1.8
      );
      doorLight.position.set(0, 1.0, 0.8);
      doorGroup.add(doorLight);

      // Register for raycasting & clicks
      interactiveObjects.current.push({
        mesh: glassDoor,
        type: 'door',
        data: door,
      });

      scene.add(doorGroup);
    });

    // --- 9. SINGLE ARCHIVAL PEDESTAL: "LƯU GIỮ TỪ 1966" ---
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(-7.2, 0, -0.6);

    // Marble Base
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.15, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1f232d,
      roughness: 0.3,
      metalness: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 1.15 / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    pedestalGroup.add(baseMesh);

    // Bright gold collar ring (#FFD75A)
    const collarGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.08, 32);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xffd75a,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0xffd75a,
      emissiveIntensity: 0.3,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = 1.15;
    pedestalGroup.add(collarMesh);

    // Archival Framed Image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(archivalPhotoPath, (tex) => {
      const photoFrameGeo = new THREE.BoxGeometry(0.9, 0.68, 0.06);
      const photoFrameMat = new THREE.MeshStandardMaterial({
        color: 0x241d15,
        roughness: 0.4,
      });
      const photoFrame = new THREE.Mesh(photoFrameGeo, photoFrameMat);
      photoFrame.position.set(0, 1.62, 0);
      photoFrame.rotation.y = Math.PI / 4;

      const photoGeo = new THREE.PlaneGeometry(0.8, 0.58);
      const photoMat = new THREE.MeshBasicMaterial({ map: tex });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.set(0, 0, 0.035);
      photoFrame.add(photoMesh);

      // Gold label plaque beneath photo (#FFD75A)
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512;
      labelCanvas.height = 160;
      const lcx = labelCanvas.getContext('2d')!;
      lcx.fillStyle = '#FFD75A';
      lcx.fillRect(0, 0, 512, 160);
      lcx.fillStyle = '#0f1117';
      lcx.font = 'bold 26px Cinzel, serif';
      lcx.textAlign = 'center';
      lcx.fillText('LƯU GIỮ TỪ 1966', 256, 65);
      lcx.font = '20px "Plus Jakarta Sans", sans-serif';
      lcx.fillText('Dấu ấn từ những năm đầu', 256, 115);

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      const labelGeo = new THREE.PlaneGeometry(0.48, 0.15);
      const labelMat = new THREE.MeshBasicMaterial({ map: labelTex });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.set(0, -0.42, 0.035);
      photoFrame.add(labelMesh);

      pedestalGroup.add(photoFrame);

      interactiveObjects.current.push({
        mesh: photoFrame,
        type: 'archival',
      });
    });

    // Soft spotlight on archival pedestal
    const archivalSpotlight = new THREE.SpotLight(0xfff3dc, 2.3, 9, Math.PI / 5, 0.3, 1.2);
    archivalSpotlight.position.set(-7.2, 5.0, 1.5);
    archivalSpotlight.target = pedestalGroup;
    scene.add(archivalSpotlight);

    scene.add(pedestalGroup);

    // --- 10. BIOPHILIC COURTYARD ACCENTS & BENCHES ---
    const createCourtyardPlanter = (x: number, z: number) => {
      const planterGroup = new THREE.Group();
      planterGroup.position.set(x, 0, z);

      const boxGeo = new THREE.BoxGeometry(3.6, 0.65, 1.2);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x1c2028, roughness: 0.6 });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      boxMesh.position.y = 0.325;
      boxMesh.castShadow = true;
      planterGroup.add(boxMesh);

      const soilGeo = new THREE.PlaneGeometry(3.4, 1.0);
      const soilMat = new THREE.MeshStandardMaterial({ color: 0x12100d, roughness: 0.9 });
      const soilMesh = new THREE.Mesh(soilGeo, soilMat);
      soilMesh.rotation.x = -Math.PI / 2;
      soilMesh.position.y = 0.66;
      planterGroup.add(soilMesh);

      for (let i = -1.3; i <= 1.3; i += 0.5) {
        const stalkGeo = new THREE.CylinderGeometry(0.025, 0.035, 1.8, 8);
        const stalkMat = new THREE.MeshStandardMaterial({ color: 0x2a3e28, roughness: 0.5 });
        const stalk = new THREE.Mesh(stalkGeo, stalkMat);
        stalk.position.set(i + (Math.random() - 0.5) * 0.15, 1.5, (Math.random() - 0.5) * 0.2);
        stalk.rotation.z = (Math.random() - 0.5) * 0.2;
        planterGroup.add(stalk);

        const foliageGeo = new THREE.SphereGeometry(0.35, 8, 8);
        foliageGeo.scale(1.2, 0.8, 1.0);
        const foliageMat = new THREE.MeshStandardMaterial({
          color: 0x224226,
          roughness: 0.7,
        });
        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.set(stalk.position.x, 2.1, stalk.position.z);
        planterGroup.add(foliage);
      }

      scene.add(planterGroup);
    };

    createCourtyardPlanter(-7.5, 4.5);
    createCourtyardPlanter(7.5, 4.5);

    // Architectural oak benches
    const createBench = (x: number, z: number, rotY: number) => {
      const benchGroup = new THREE.Group();
      benchGroup.position.set(x, 0, z);
      benchGroup.rotation.y = rotY;

      const topGeo = new THREE.BoxGeometry(2.4, 0.12, 0.65);
      const topMat = new THREE.MeshStandardMaterial({ color: 0x3e2c1e, roughness: 0.5 });
      const top = new THREE.Mesh(topGeo, topMat);
      top.position.y = 0.45;
      benchGroup.add(top);

      const legGeo = new THREE.BoxGeometry(0.12, 0.45, 0.6);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x141820, roughness: 0.3 });
      const leg1 = new THREE.Mesh(legGeo, legMat);
      leg1.position.set(-0.95, 0.225, 0);
      const leg2 = new THREE.Mesh(legGeo, legMat);
      leg2.position.set(0.95, 0.225, 0);
      benchGroup.add(leg1);
      benchGroup.add(leg2);

      scene.add(benchGroup);
    };

    createBench(-4.2, 7.5, 0);
    createBench(4.2, 7.5, 0);

    // --- 11. AMBIENT & LIGHTING COMPOSITION ---
    const hemiLight = new THREE.HemisphereLight(0xedf4fc, 0x101318, 0.75);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff6e8, 1.4);
    sunLight.position.set(4, 12, 2);
    sunLight.target.position.set(0, 0, -2);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    scene.add(sunLight.target);

    // Warm bright gold ambient accent for visitors' feet and floor reflections (#FFD75A)
    const warmFloorLight = new THREE.PointLight(0xffd75a, 1.35, 20, 1.4);
    warmFloorLight.position.set(0, 2.5, 2);
    scene.add(warmFloorLight);

    // --- 12. INTERACTION EVENT LISTENERS ---
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointer.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging.current) {
        const deltaX = clientX - prevPointer.current.x;
        const deltaY = clientY - prevPointer.current.y;
        prevPointer.current = { x: clientX, y: clientY };

        targetPanEuler.current.y -= deltaX * 0.0022;
        targetPanEuler.current.x = Math.max(
          -0.25,
          Math.min(0.25, targetPanEuler.current.x - deltaY * 0.0018)
        );
      } else {
        raycaster.current.setFromCamera(mouse.current, camera);
        const meshes = interactiveObjects.current.map((o) => o.mesh);
        const intersects = raycaster.current.intersectObjects(meshes, true);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const found = interactiveObjects.current.find(
            (o) => o.mesh === hit || o.mesh.children.includes(hit)
          );
          if (found && found.type === 'door' && found.data) {
            setHoveredDoorId(found.data.id);
            container.style.cursor = 'pointer';
          } else if (found && found.type === 'archival') {
            setHoveredDoorId('archival-pedestal');
            container.style.cursor = 'pointer';
          } else {
            setHoveredDoorId(null);
            container.style.cursor = 'grab';
          }
        } else {
          setHoveredDoorId(null);
          container.style.cursor = isDragging.current ? 'grabbing' : 'grab';
        }
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.style.cursor = 'grab';

      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
      const rect = container.getBoundingClientRect();

      mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const meshes = interactiveObjects.current.map((o) => o.mesh);
      const intersects = raycaster.current.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const found = interactiveObjects.current.find(
          (o) => o.mesh === hit || o.mesh.children.includes(hit)
        );
        if (found) {
          if (found.type === 'door' && found.data) {
            onSelectDoor(found.data);
          } else if (found.type === 'archival') {
            onSelectArchival();
          }
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- 13. RENDER LOOP WITH CAMERA INTERPOLATION ---
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      currentCamPos.current.lerp(targetCamPos.current, 4.0 * delta);
      currentLookAt.current.lerp(targetLookAt.current, 4.0 * delta);

      panEuler.current.x += (targetPanEuler.current.x - panEuler.current.x) * 6.0 * delta;
      panEuler.current.y += (targetPanEuler.current.y - panEuler.current.y) * 6.0 * delta;

      camera.position.copy(currentCamPos.current);

      const baseLook = currentLookAt.current.clone();
      const panOffset = new THREE.Vector3(
        Math.sin(panEuler.current.y) * 10,
        Math.tan(panEuler.current.x) * 10,
        -Math.cos(panEuler.current.y) * 10
      );
      camera.lookAt(baseLook.add(panOffset));

      // Luminous breathing for the 60-year ring
      ringMesh.rotation.z += 0.25 * delta;
      ringMat.emissiveIntensity = 1.15 + Math.sin(clock.getElapsedTime() * 1.6) * 0.25;

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectArchival, onSelectDoor, setHoveredDoorId]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle indicator toast when hovering over an interactive door/element */}
      {hoveredDoorId && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="px-4 py-2 rounded-full bg-[#12151c]/95 border border-[#FFD75A]/60 shadow-[0_0_20px_rgba(255,215,90,0.25)] backdrop-blur-md flex items-center gap-2 text-xs font-sans-ui text-[#f5f2ea] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#FFD75A] animate-pulse" />
            <span>
              {hoveredDoorId === 'archival-pedestal'
                ? 'Kỷ vật: Dấu ấn lưu giữ từ năm 1966'
                : `Cánh cửa: ${
                    EXPLORATION_DOORS.find((d) => d.id === hoveredDoorId)?.title ||
                    'Khu vực khám phá'
                  }`}
            </span>
            <span className="text-stone-300 text-[11px] font-medium">(Nhấn để tương tác)</span>
          </div>
        </div>
      )}
    </div>
  );
};
