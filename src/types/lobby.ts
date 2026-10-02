export interface ExplorationDoor {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  theme: 'history' | 'achievements' | 'news' | 'student' | 'memories' | 'future';
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  description: string;
  futurePhaseNote: string;
}

export type ViewpointId = 'hero' | 'identity' | 'heritage' | 'future' | 'archival';

export interface ViewpointConfig {
  id: ViewpointId;
  name: string;
  cameraPosition: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}
