# THPT A TRẦN HƯNG ĐẠO — Phòng Truyền Thông Số

## Project Architecture & Multi-Team Development Guide

**Status:** Architecture phase  
**Last Updated:** 2026-10-03  
**Purpose:** Establish modular multi-person development structure

---

## 1. CURRENT REPOSITORY ANALYSIS

### 1.1 Project Overview

```
THPT A TRẦN HƯNG ĐẠO — PHÒNG TRUYỀN THÔNG SỐ (Digital Communication Room)
Type: Interactive 3D Web Experience
Tech Stack: React 19 + TypeScript + Vite + Three.js + Tailwind CSS + Motion
Status: Lobby implemented and stable
Goal: Transform into modular multi-room digital museum
```

### 1.2 Current Structure

```
src/
├── App.tsx                          # Main application shell
├── main.tsx                         # React entry point
├── index.css                        # Global styles + Tailwind
├── components/
│   ├── LobbyCanvas.tsx             # ⭐ STABLE 3D Lobby scene (DO NOT MODIFY)
│   ├── TopNav.tsx                  # Global header navigation
│   ├── ViewpointControls.tsx       # Camera viewpoint selector
│   ├── EntranceSequence.tsx        # Intro ceremonial sequence
│   ├── DoorDetailModal.tsx         # Content detail viewer
│   ├── AboutModal.tsx              # About/Help modal
│   ├── SchoolLogo.tsx              # Logo component
│   └── [ROOM MODULES WILL GO HERE]
├── data/
│   └── doors.ts                    # 6 exploration doors config
├── types/
│   └── lobby.ts                    # Shared TypeScript interfaces
├── audio/
│   └── ambientAudio.ts             # Audio management
├── assets/
│   ├── images/                     # School photos, logo
│   └── [MEDIA WILL GO HERE]
├── package.json                    # Dependencies + scripts
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite build config
└── ...
```

### 1.3 Technology Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8.3
- **3D Rendering:** Three.js 0.186
- **Animation:** Motion/Framer Motion 12.23
- **Styling:** Tailwind CSS 4.3
- **Icons:** Lucide React 0.546
- **AI Integration:** Google Genai 2.4
- **Environment:** Node.js 18+, Bun or npm

---

## 2. SHARED CORE COMPONENTS (DO NOT MODIFY)

These components are the **foundation** of the entire application. They must remain **unchanged** by individual room developers.

### 2.1 Global Application Shell

| Component | File | Purpose | Status |
|-----------|------|---------|--------|
| **App.tsx** | `src/App.tsx` | Main state management, routing, modal system | ✅ Stable |
| **LobbyCanvas** | `src/components/LobbyCanvas.tsx` | 3D lobby scene, camera, door interaction | ✅ Stable |

### 2.2 Global Navigation & UI

| Component | File | Purpose |
|-----------|------|---------|
| **TopNav** | `src/components/TopNav.tsx` | Header, viewpoint selector, audio control |
| **ViewpointControls** | `src/components/ViewpointControls.tsx` | Camera/viewpoint buttons |
| **EntranceSequence** | `src/components/EntranceSequence.tsx` | Ceremonial intro, entry animation |
| **SchoolLogo** | `src/components/SchoolLogo.tsx` | School branding logo |

### 2.3 Modal System

| Component | File | Purpose |
|-----------|------|---------|
| **DoorDetailModal** | `src/components/DoorDetailModal.tsx` | Content viewer (currently for doors) |
| **AboutModal** | `src/components/AboutModal.tsx` | About/help information |

### 2.4 Audio System

| Module | File | Purpose |
|--------|------|---------|
| **Ambient Audio** | `src/audio/ambientAudio.ts` | Background music, chimes, sound effects |

### 2.5 Type Definitions (Shared)

| File | Exports | Purpose |
|------|---------|---------|
| `src/types/lobby.ts` | `ExplorationDoor`, `ViewpointConfig`, `ViewpointId` | Lobby domain types |

### 2.6 Data (Lobby Only)

| File | Purpose |
|------|---------|
| `src/data/doors.ts` | **Lobby-only** exploration door configuration |

### 2.7 Styling & Theme System

| File | Purpose |
|------|---------|
| `src/index.css` | Global Tailwind config, font definitions, color system |

**CSS Variable System:**
```css
--font-serif: 'Playfair Display', serif
--font-heading: 'Cinzel', serif
--font-sans: 'Plus Jakarta Sans', sans-serif
```

**Color Palette (from Tailwind config):**
- **Dark Base:** `#0b0d11`, `#0c0e13`, `#141820`
- **Bright Gold Accent:** `#FFD75A` (primary branding)
- **Text:** `#e6e2d8`, `#f7f4ee`
- **Borders:** Stone-800, Stone-900

### 2.8 Assets (Shared School Identity)

| Asset | Location | Purpose | DO NOT MODIFY |
|-------|----------|---------|---------------|
| School Logo (SVG) | `public/logo_thpt_a_tran_hung_dao.svg` | Brand identity | ✅ |
| Archival Photo | `src/assets/images/archival_photo_1966_1790917981565.jpg` | Historical reference | ✅ |
| Modern Heritage Images | `src/assets/images/*.jpg` | School building, atrium | ✅ |

---

## 3. ROOM ARCHITECTURE (INDEPENDENT MODULES)

The digital museum will consist of **independent room modules**. Each room:

- Has its own component folder
- Has its own data/content configuration
- Has its own type definitions (if needed)
- Registers with a global **Room Registry**
- Uses shared navigation system
- Follows a common **Room Contract**

### 3.1 Recommended Rooms

| # | Room ID | Room Name (VI) | Room Name (EN) | Purpose | Developer |
|---|---------|---|---|---------|-----------|
| 1 | `lobby` | Sảnh Chờ | Lobby | Starting experience | ✅ Implemented |
| 2 | `history` | Lịch Sử & Truyền Thống | History | School founding, 1966 origins | TBD |
| 3 | `timeline` | Dòng Thời Gian | Timeline | 60 years milestone history | TBD |
| 4 | `artifacts` | Hiện Vật & Kỷ Vật | Artifacts | Physical/digital artifacts, museum | TBD |
| 5 | `achievements` | Thành Tích & Danh Hiệu | Achievements | Awards, honors, milestones | TBD |
| 6 | `student-work` | Sản Phẩm Học Tập | Student Work | Projects, STEM, art, research | TBD |
| 7 | `people` | Nhân Vật & Cống Hiến | People | Teachers, alumni, contributors | TBD |
| 8 | `memories` | Ký Ức & Lưu Bút | Memories | Student stories, testimonials | TBD |
| 9 | `news` | Tin Tức & Sự Kiện | News | Current events, announcements | TBD |
| 10 | `interaction` | Tương Tác Động | Interactive | Games, quizzes, AR/3D experiments | TBD |
| 11 | `future` | Tương Lai & Khát Vọng | Future | Vision, aspirations, next chapter | TBD |

### 3.2 Potential Consolidation

If scope is too large, consider:
- **history + timeline** → single "Heritage" module
- **achievements + people** → single "Legacy" module
- **memories + interaction** → single "Connection" module

**Recommended MVP:** 5-7 core rooms

---

## 4. ROOM CONTRACT (SPECIFICATION)

Every room developer **must** implement this contract:

```typescript
// src/rooms/[roomId]/types.ts
export interface RoomContract {
  // Identity
  roomId: string;                    // Unique identifier (e.g., 'artifacts')
  roomName: string;                  // Display name (Vietnamese)
  roomNameEn: string;                // Display name (English)
  
  // Navigation
  route: string;                     // URL path (e.g., '/rooms/artifacts')
  entryPoint: string;                // Entry component export name
  doorNumber?: string;               // If accessible from lobby door
  
  // Experience
  returnRoom: 'lobby' | string;      // Where to navigate back
  mainComponent: React.FC<RoomProps>;
  description: string;               // Short 1-2 line description
  
  // Assets
  requiredAssets: {
    images?: string[];
    audio?: string[];
    models?: string[];
  };
  
  // Integration
  specialDependencies?: string[];    // Beyond standard React/Three.js
  
  // Metadata
  createdBy?: string;                // Developer name
  version: string;                   // Room version
}

interface RoomProps {
  isActive: boolean;                 // Whether room is currently visible
  onNavigateToRoom: (roomId: string) => void;
  onReturnToLobby: () => void;
}
```

### 4.1 Room Component Template

Every room must export:

```typescript
// src/rooms/[roomId]/[RoomName].tsx
export const [RoomName]: React.FC<RoomProps> = ({
  isActive,
  onNavigateToRoom,
  onReturnToLobby,
}) => {
  // Your room implementation
};

export const roomContract: RoomContract = {
  roomId: '[roomId]',
  roomName: '...',
  // ... other properties
};
```

---

## 5. SHARED ROOM TRANSITION SYSTEM

All room navigation goes through **one unified system** managed by `App.tsx`.

### 5.1 Navigation API

```typescript
// In App.tsx, expose:
const navigateToRoom = (roomId: string) => {
  // 1. Validate room exists in registry
  // 2. Play exit animation (fade/camera transition)
  // 3. Load destination room component
  // 4. Play entry animation
  // 5. Update URL history
};

const returnToLobby = () => {
  // 1. Play room exit animation
  // 2. Restore lobby camera
  // 3. Update URL
};
```

### 5.2 Room Registry

Create a **global room registry** in `src/config/roomRegistry.ts`:

```typescript
export interface RoomConfig {
  id: string;
  contract: RoomContract;
  component: React.LazyComponent;
  order: number;
}

export const ROOM_REGISTRY: Record<string, RoomConfig> = {
  lobby: { id: 'lobby', contract: lobbyContract, ... },
  history: { id: 'history', contract: historyContract, ... },
  // ... other rooms
};
```

### 5.3 Transition Animation

Use `Motion/Framer Motion` for smooth transitions:
- **Exit:** Fade out current room (200ms)
- **Load:** Preload destination room (no loading bar needed)
- **Enter:** Fade in with camera animation (300ms)

---

## 6. SHARED DESIGN SYSTEM

All rooms must follow **ONE consistent visual language**.

### 6.1 Visual Direction

The entire museum exists in **ONE unified virtual building**:

| Aspect | Direction |
|--------|-----------|
| **Aesthetic** | Modern Heritage + Educational Museum |
| **Material Language** | Stone, brass, wood, glass |
| **Lighting** | Warm architectural + golden accents |
| **Animation Style** | Cinematic, smooth, dignified |
| **Color Palette** | Dark neutrals + `#FFD75A` gold accents |
| **Typography** | Cinzel (headings), Plus Jakarta Sans (UI), Playfair Display (editorial) |
| **Mood** | Reverent, nostalgic, forward-looking |

### 6.2 Common Components Library

Rooms should **reuse** these components:

```typescript
// Buttons
<GoldButton>        // Primary CTA with gold styling
<OutlineButton>     // Secondary action
<SmallIconButton>   // Icon-only small buttons

// Typography
<Heading1>          // Major sections
<Heading2>          // Room subsections
<Body>              // Regular text
<Caption>           // Small auxiliary text
<Serif>             // Editorial quotes

// Layout
<RoomContainer>     // Standard room padding/spacing
<ModalOverlay>      // Content modals
<TransitionWrapper> // Animation wrapper

// Input
<GoldInput>         // Text fields
<GoldTextarea>      // Text areas
<SearchField>       // Search with gold accent
```

### 6.3 Reserved Gold Accent Color

**Primary Brand Color:** `#FFD75A`

This color is **reserved for primary CTAs, highlights, and school identity**. Use conservatively:
- Primary buttons
- Door highlights
- Important accents
- Logo/brand elements
- Section dividers

**Do NOT:** Use gold for all interactive elements or secondary content.

### 6.4 Animation Principles

- **Duration:** 200-300ms for UI, 400-600ms for scene transitions
- **Easing:** `ease-in-out` for natural motion
- **Stagger:** Cascade animations for multi-element transitions
- **Restraint:** Avoid constant motion; let content breathe

---

## 7. DATA AUTHENTICITY RULES

**This is a real school's heritage project.**

### 7.1 Historical Content Verification

Every historical item must include:

```typescript
interface HistoricalContent {
  id: string;
  title: string;
  year: number;
  description: string;
  
  // Verification metadata
  verificationStatus: 'VERIFIED' | 'NEEDS_VERIFICATION' | 'UNCERTAIN';
  source?: string;                   // e.g., "School Archives", "Interview with Founder"
  verificationDate?: string;         // ISO 8601
  contentOwner?: string;             // Teacher, alumni, etc.
  
  // Media
  image?: string;
  audio?: string;
  note?: string;                     // Any caveats
}
```

### 7.2 Rules

- ✅ **VERIFIED:** Sourced from official records
- ⚠️ **NEEDS_VERIFICATION:** Submitted by students/teachers but not confirmed
- ❌ **UNCERTAIN:** Unknown origin or disputed
- **DO NOT:** Fabricate or guess historical information
- **DO NOT:** Silently fill missing data with AI
- **DO:** Mark uncertain items clearly in UI

### 7.3 Content Submission

For contributions:
1. Identify source (official record, personal memory, photo, etc.)
2. Mark verification status
3. Add contributor name/date
4. Store in version control with full metadata

---

## 8. ARTIFACT CONTENT MODEL

Rooms can display artifacts/items. Each artifact should follow:

```typescript
interface Artifact {
  // Identity
  id: string;
  name: string;
  category: 'photo' | 'document' | '3d-model' | 'audio' | 'artwork' | 'other';
  
  // Temporal
  year?: number;
  yearRange?: [number, number];
  era?: string;  // e.g., "1966-1976", "Early Years"
  
  // Content
  description: string;
  story?: string;                    // Longer narrative
  meaning?: string;                  // Why it matters
  
  // Media (only include what you have)
  image?: string;                    // Primary image required
  audio?: string;                    // Optional narration
  model3d?: string;                  // Optional 3D model
  video?: string;                    // Optional short video
  
  // Verification
  verificationStatus: 'VERIFIED' | 'NEEDS_VERIFICATION' | 'UNCERTAIN';
  source: string;                    // Archive, donation, etc.
  
  // Attribution
  contributor?: string;
  curatedBy?: string;
}
```

**Note:** Only `image` is required. 3D models and audio are enhancements, not requirements.

---

## 9. DEVELOPMENT BRANCHES & WORKFLOW

### 9.1 Branch Strategy

```
main (production)
├── feature/room-history
├── feature/room-artifacts
├── feature/room-achievements
├── feature/room-student-work
├── feature/room-people
├── feature/room-memories
├── feature/room-news
├── feature/room-interaction
├── feature/room-future
├── docs/architecture        # Documentation updates
└── infra/ci-cd              # Deployment config
```

### 9.2 Workflow for Each Room Developer

1. **Create branch:** `git checkout -b feature/room-[roomId]`
2. **Work independently** on room folder
3. **Test against main lobby**
4. **Create Pull Request** with room description + screenshots
5. **Code review** by tech lead
6. **Merge** when approved

### 9.3 Protected Branch Rules (main)

- ✅ Require pull request reviews
- ✅ Require status checks to pass (lint, build, type check)
- ✅ Dismiss stale PR approvals
- ✅ Require branches to be up to date before merging
- ✅ Require code owner review (for shared core)

---

## 10. COPILOT INSTRUCTIONS

See `.github/copilot-instructions.md` for detailed AI-assisted development guidelines.

**Key principles:**
- Never modify shared core without explicit request
- Follow room contract exactly
- Maintain historical accuracy
- Use consistent design language
- Test against main lobby
- Leave clear commit messages

---

## 11. FILE MODIFICATION RULES

### DO NOT MODIFY (Shared Core)

```
src/App.tsx
src/main.tsx
src/index.css
src/components/LobbyCanvas.tsx
src/components/TopNav.tsx
src/components/ViewpointControls.tsx
src/components/EntranceSequence.tsx
src/components/SchoolLogo.tsx
src/components/AboutModal.tsx
src/audio/ambientAudio.ts
src/types/lobby.ts
src/data/doors.ts
public/
package.json (unless adding dependencies + tech lead approval)
tsconfig.json (unless needed)
vite.config.ts (unless needed)
```

### ONLY MODIFY (Room Developer)

```
src/rooms/[roomId]/        ← Your entire room folder
src/types/rooms.ts         ← Add room type definitions
src/config/roomRegistry.ts ← Register your room
```

### ASK TECH LEAD (Dependencies)

If you need new npm packages:
1. Create an issue describing why
2. Get approval before adding to package.json
3. Include version constraints

---

## 12. TESTING REQUIREMENTS

Each room must include:

### 12.1 Unit Tests

```typescript
// src/rooms/[roomId]/[RoomName].test.tsx
describe('[RoomName]', () => {
  it('renders when active', () => { /* ... */ });
  it('calls onNavigateToRoom with correct roomId', () => { /* ... */ });
  it('calls onReturnToLobby', () => { /* ... */ });
  it('loads content correctly', () => { /* ... */ });
});
```

### 12.2 Integration Tests

- Room transitions from lobby → room → lobby
- Navigation links work
- Content loads without errors
- Audio/video doesn't auto-play unexpectedly

### 12.3 Visual Regression

- Compare screenshots against design system
- Ensure typography, spacing, colors match
- Test responsive breakpoints (mobile, tablet, desktop)

---

## 13. DEPLOYMENT & CI/CD

### 13.1 Build Pipeline

```bash
npm run lint              # TypeScript + ESLint
npm run type-check       # Type safety
npm run build            # Production build
npm run preview          # Local preview
```

### 13.2 Deployment Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] Lighthouse score > 90
- [ ] Mobile responsive
- [ ] Accessibility audit passed
- [ ] No console errors
- [ ] Historical data verified
- [ ] Room contract fulfilled

---

## 14. FINAL ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                   SHARED CORE (main)                        │
│                   Do NOT Modify                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   App.tsx    │  │  LobbyCanvas │  │   TopNav     │        │
│  │  (Router)    │  │  (3D Scene)  │  │ (Header)     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Modal System │  │Audio System  │  │Shared Types  │        │
│  │  (Dialogs)   │  │ (Ambient)    │  │ (lobby.ts)   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │          Global Design System                       │     │
│  │  Colors, Typography, Tailwind, Animation           │     │
│  └───────────────────────────────────────────────────��─┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼─────┐     ┌────▼─────┐    ┌────▼─────┐
    │  Lobby   │     │ Room A   │    │ Room B   │  ...
    │ (✅ Done)│     │ (TBD)    │    │ (TBD)    │
    └──────────┘     └──────────┘    └──────────┘
       ↓                  ↓               ↓
    Shared        Independent      Independent
    Stable        Module A         Module B

     RoomRegistry (router)
     Transition System (navigator)
```

---

## 15. SUMMARY FOR TEAM LEADS & DEVELOPERS

### For Tech Lead / Architect:

1. **Main Responsibility:** Manage shared core, review PRs, approve merges
2. **Critical Files:** App.tsx, LobbyCanvas, types, design system
3. **Do:** Enforce room contract, design system consistency, historical accuracy
4. **Don't:** Allow core modifications without documented reasoning

### For Room Developers:

1. **Main Responsibility:** Implement single room module end-to-end
2. **Do:**
   - Work only in `src/rooms/[roomId]/` folder
   - Follow room contract exactly
   - Use shared components & styling
   - Verify historical data
   - Test transitions
   - Write clear commit messages
3. **Don't:**
   - Modify App.tsx, LobbyCanvas, or shared components
   - Invent historical information
   - Change global colors/fonts
   - Add dependencies without approval
   - Break the main branch

### For Copilot / AI Agents:

1. **Always:** Read `.github/copilot-instructions.md` first
2. **Respect:** Room boundaries and shared core
3. **Maintain:** Design consistency and historical accuracy
4. **Support:** Individual room developers with clear guidance
5. **Test:** Every room integration thoroughly

---

## 16. NEXT STEPS

1. ✅ **Review this architecture document** (you are here)
2. 📋 **Create GitHub Issues** for each room (see ISSUES_TEMPLATE.md)
3. 🌳 **Establish branch strategy** in team repo settings
4. 📝 **Create copilot-instructions.md** with detailed AI guidelines
5. 🎯 **Assign room developers** and create rooms
6. ✨ **Start development** on feature branches
7. 🔄 **Review & merge** as rooms complete
8. 🚀 **Deploy** to production when ready

---

**Status:** Ready for team implementation  
**Questions?** Raise an issue in the repository  
**Architecture Version:** 1.0
