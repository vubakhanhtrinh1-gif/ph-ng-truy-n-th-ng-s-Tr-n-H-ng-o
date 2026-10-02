import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LobbyCanvas } from './components/LobbyCanvas';
import { EntranceSequence } from './components/EntranceSequence';
import { TopNav } from './components/TopNav';
import { ViewpointControls } from './components/ViewpointControls';
import { DoorDetailModal } from './components/DoorDetailModal';
import { AboutModal } from './components/AboutModal';
import { ExplorationDoor, ViewpointId } from './types/lobby';
import { ambientSound } from './audio/ambientAudio';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentViewpoint, setCurrentViewpoint] = useState<ViewpointId>('hero');
  const [selectedDoor, setSelectedDoor] = useState<ExplorationDoor | null>(null);
  const [showArchivalModal, setShowArchivalModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [hoveredDoorId, setHoveredDoorId] = useState<string | null>(null);

  const handleToggleAudio = async () => {
    if (isAudioOn) {
      ambientSound.stop();
      setIsAudioOn(false);
    } else {
      const success = await ambientSound.start();
      if (success) {
        setIsAudioOn(true);
      }
    }
  };

  const handleEnterLobby = () => {
    setHasEntered(true);
    setCurrentViewpoint('hero');
  };

  const handleReplayIntro = () => {
    setSelectedDoor(null);
    setShowArchivalModal(false);
    setShowAboutModal(false);
    setHasEntered(false);
  };

  const handleSelectDoor = (door: ExplorationDoor) => {
    setSelectedDoor(door);
    // Optionally shift viewpoint subtly toward door wing
    if (door.theme === 'history' || door.theme === 'memories') {
      setCurrentViewpoint('heritage');
    } else if (door.theme === 'future') {
      setCurrentViewpoint('future');
    }
    ambientSound.playGentleChime();
  };

  const handleSelectArchival = () => {
    setShowArchivalModal(true);
    setCurrentViewpoint('archival');
    ambientSound.playGentleChime();
  };

  const handleCloseModals = () => {
    setSelectedDoor(null);
    setShowArchivalModal(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0e12] select-none">
      {/* 3D WebGL Architectural Space */}
      <div className="absolute inset-0 z-0">
        <LobbyCanvas
          currentViewpoint={currentViewpoint}
          onSelectDoor={handleSelectDoor}
          onSelectArchival={handleSelectArchival}
          hoveredDoorId={hoveredDoorId}
          setHoveredDoorId={setHoveredDoorId}
        />
      </div>

      {/* Main UI Overlays (Visible after entrance) */}
      {hasEntered && (
        <>
          <TopNav
            currentViewpoint={currentViewpoint}
            onSelectViewpoint={setCurrentViewpoint}
            isAudioOn={isAudioOn}
            onToggleAudio={handleToggleAudio}
            onOpenAbout={() => setShowAboutModal(true)}
            onReplayIntro={handleReplayIntro}
          />

          <ViewpointControls
            currentViewpoint={currentViewpoint}
            onSelectViewpoint={setCurrentViewpoint}
          />
        </>
      )}

      {/* Entrance Ceremonial Sequence (Step 1-7) */}
      <AnimatePresence>
        {!hasEntered && (
          <EntranceSequence
            onEnter={handleEnterLobby}
            isAudioOn={isAudioOn}
            onToggleAudio={handleToggleAudio}
          />
        )}
      </AnimatePresence>

      {/* Door and Archival Detail Modal */}
      <DoorDetailModal
        selectedDoor={selectedDoor}
        showArchivalModal={showArchivalModal}
        onClose={handleCloseModals}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  );
}
