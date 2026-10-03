# THPT A Trần Hưng Đạo — Sảnh Chờ Số

<p align="center">
  <strong>🇻🇳 Tiếng Việt</strong> ·
  <a href="#-english">🇬🇧 English</a>
</p>

---

## 🇻🇳 Tiếng Việt

### 🌟 Giới thiệu

**THPT A Trần Hưng Đạo — Sảnh Chờ Số** là một trải nghiệm web tương tác lấy cảm hứng từ một **sảnh chờ kỹ thuật số**, được xây dựng nhằm kỷ niệm **60 năm thành lập THPT A Trần Hưng Đạo (1966–2026)**.

Dự án tái hiện một không gian sảnh chờ 3D, nơi người tham quan có thể khám phá các cánh cửa chủ đề đại diện cho:

* Lịch sử và truyền thống
* Thành tích và dấu ấn
* Tin tức và sự kiện
* Sản phẩm học tập
* Ký ức các thế hệ
* Tầm nhìn và tương lai

Mỗi cánh cửa mở ra một khu vực nội dung riêng, kết hợp giữa **thiết kế 3D, chuyển động điện ảnh và kể chuyện kỹ thuật số**.

---

## ✨ Tính năng

* 🏛️ Không gian sảnh 3D tương tác
* 🚪 Sáu cánh cửa khám phá theo chủ đề
* 🎬 Hiệu ứng mở đầu / nghi thức bước vào sảnh
* 📖 Modal hiển thị nội dung chi tiết
* 🎥 Chuyển đổi nhiều góc nhìn camera
* 🔊 Điều khiển âm thanh nền
* ✨ Hiệu ứng chuyển động và cinematic presentation
* 📱 Giao diện responsive
* 🎓 Thiết kế dành cho triển lãm và truyền thông giáo dục
* 🤖 Hỗ trợ tích hợp Google AI Studio / Gemini

---

## 🚪 Các khu vực khám phá

| Cánh cửa                      | Nội dung                                                          |
| ----------------------------- | ----------------------------------------------------------------- |
| 🏫 **Lịch sử & truyền thống** | Hành trình hình thành và phát triển của nhà trường                |
| 🏆 **Thành tích & dấu ấn**    | Những thành tựu và dấu ấn nổi bật                                 |
| 📰 **Tin tức & sự kiện**      | Hoạt động, sự kiện và những khoảnh khắc đáng nhớ                  |
| 📚 **Sản phẩm học tập**       | Các sản phẩm, dự án và thành quả học tập                          |
| 💭 **Ký ức các thế hệ**       | Những câu chuyện và ký ức của học sinh, giáo viên và cựu học sinh |
| 🚀 **Cánh cửa tương lai**     | Tầm nhìn, khát vọng và định hướng tương lai                       |

---

## 🛠️ Công nghệ sử dụng

* **React**
* **TypeScript**
* **Vite**
* **Three.js**
* **Framer Motion / Motion**
* **Tailwind CSS**
* **Google AI Studio / Gemini**

---

## 📁 Cấu trúc dự án

```text
.
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── bun.lock
├── public/
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── audio/
│   ├── components/
│   ├── data/
│   └── types/
├── tsconfig.json
├── vite.config.ts
├── README.md
└── ...
```

---

## 🔑 Các file chính

### `src/App.tsx`

Quản lý trạng thái chính của ứng dụng và luồng điều hướng giữa các màn hình.

### `src/components/LobbyCanvas.tsx`

Chứa không gian 3D của sảnh chờ, camera và logic tương tác với các cánh cửa.

### `src/data/doors.ts`

Chứa thông tin của các cánh cửa, nội dung và cấu hình góc nhìn.

### `src/components/EntranceSequence.tsx`

Điều khiển sequence mở đầu và hiệu ứng bước vào sảnh.

### `src/components/DoorDetailModal.tsx`

Hiển thị nội dung chi tiết khi người dùng lựa chọn một cánh cửa.

### `src/components/AboutModal.tsx`

Hiển thị thông tin giới thiệu về dự án và nhà trường.

### `.env.example`

Mẫu cấu hình các biến môi trường cần thiết.

---

## 💻 Yêu cầu

Trước khi chạy dự án, hãy đảm bảo máy đã cài:

* **Node.js 18+**
* **npm** hoặc **Bun**
* Trình duyệt hiện đại hỗ trợ **WebGL**

---

## 📦 Cài đặt

### Sử dụng npm

```bash
npm install
```

### Sử dụng Bun

```bash
bun install
```

---

## ▶️ Chạy dự án

### npm

```bash
npm run dev
```

### Bun

```bash
bun run dev
```

Ứng dụng được cấu hình để chạy trên:

```text
http://localhost:3000
```

---

## 🏗️ Build production

### npm

```bash
npm run build
```

### Bun

```bash
bun run build
```

---

## 🔍 Kiểm tra / Lint

```bash
npm run lint
```

---

## 🔐 Biến môi trường

Dự án cung cấp file `.env.example`:

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

### `GEMINI_API_KEY`

Được sử dụng cho các tính năng tích hợp **Gemini AI**.

### `APP_URL`

Được sử dụng cho các tham chiếu đến ứng dụng và một số cấu hình liên quan đến deployment.

> ⚠️ Không commit API key thật vào repository. Hãy sử dụng file `.env` và đảm bảo file này nằm trong `.gitignore`.

---

## 🎓 Mục đích dự án

Dự án được xây dựng như một **không gian kể chuyện và lưu giữ ký ức số**, kết hợp giữa:

* Kiến trúc 3D
* Thiết kế giao diện
* Công nghệ web hiện đại
* Giáo dục
* Truyền thông
* Lưu giữ lịch sử
* Trải nghiệm triển lãm kỹ thuật số

Mục tiêu là tạo ra một cách tiếp cận mới để giới thiệu lịch sử, thành tựu, con người và những ký ức của **THPT A Trần Hưng Đạo**.

---

## 🎉 60 năm — 1966–2026

> **Sáu thập kỷ — Một hành trình — Một mái trường — Những thế hệ tiếp nối.**

Dự án được thực hiện với tinh thần hướng về dấu mốc **60 năm thành lập THPT A Trần Hưng Đạo**.

---

## 📄 License

Repository hiện **chưa có file license chính thức**.

Vui lòng kiểm tra quyền sử dụng trước khi sử dụng dự án cho mục đích thương mại hoặc phân phối lại, đặc biệt đối với:

* Tài liệu của nhà trường
* Logo và thương hiệu
* Hình ảnh
* Âm thanh
* Nội dung lịch sử
* Các tài nguyên truyền thông

---

# 🇬🇧 English

## 🌟 Overview

**THPT A Trần Hưng Đạo — Digital Waiting Hall** is an interactive web experience inspired by a **digital school lobby**, created to celebrate the **60th anniversary of THPT A Trần Hưng Đạo (1966–2026)**.

The project presents an immersive **3D virtual waiting hall** where visitors can explore themed doors representing different aspects of the school's journey:

* History and traditions
* Achievements and milestones
* News and events
* Learning products
* Memories across generations
* Future vision

Each door leads to a dedicated content area, combining **3D design, cinematic motion, and digital storytelling**.

---

## ✨ Features

* 🏛️ Interactive 3D lobby
* 🚪 Six themed exploration doors
* 🎬 Intro / ceremonial entrance sequence
* 📖 Detailed content modals
* 🎥 Switchable camera viewpoints
* 🔊 Ambient audio controls
* ✨ Cinematic transitions and motion effects
* 📱 Responsive interface
* 🎓 Designed for educational storytelling and digital exhibitions
* 🤖 Google AI Studio / Gemini integration support

---

## 🚪 Exploration Areas

| Door                               | Content                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| 🏫 **History & Traditions**        | The school's history, origins, and development           |
| 🏆 **Achievements & Milestones**   | Major achievements and memorable milestones              |
| 📰 **News & Events**               | Activities, events, and memorable moments                |
| 📚 **Learning Products**           | Student projects, creations, and learning outcomes       |
| 💭 **Memories Across Generations** | Stories and memories from students, teachers, and alumni |
| 🚀 **The Future Door**             | Vision, aspirations, and the school's future direction   |

---

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Three.js**
* **Framer Motion / Motion**
* **Tailwind CSS**
* **Google AI Studio / Gemini**

---

## 📁 Project Structure

```text
.
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── bun.lock
├── public/
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── audio/
│   ├── components/
│   ├── data/
│   └── types/
├── tsconfig.json
├── vite.config.ts
├── README.md
└── ...
```

---

## 🔑 Key Files

### `src/App.tsx`

Handles the main application state and page flow.

### `src/components/LobbyCanvas.tsx`

Contains the 3D lobby scene, camera system, and door interaction logic.

### `src/data/doors.ts`

Stores door metadata, content, and viewpoint configuration.

### `src/components/EntranceSequence.tsx`

Controls the introductory and ceremonial entrance sequence.

### `src/components/DoorDetailModal.tsx`

Displays detailed information for each exploration area.

### `src/components/AboutModal.tsx`

Provides information about the project and the school.

### `.env.example`

Provides a template for required environment variables.

---

## 💻 Requirements

Make sure your system has:

* **Node.js 18+**
* **npm** or **Bun**
* A modern browser with **WebGL support**

---

## 📦 Installation

### Using npm

```bash
npm install
```

### Using Bun

```bash
bun install
```

---

## ▶️ Running the App

### npm

```bash
npm run dev
```

### Bun

```bash
bun run dev
```

The application is configured to run on:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

### npm

```bash
npm run build
```

### Bun

```bash
bun run build
```

---

## 🔍 Lint / Type Check

```bash
npm run lint
```

---

## 🔐 Environment Variables

The project includes an `.env.example` file:

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

### `GEMINI_API_KEY`

Used for **Gemini AI** integration features.

### `APP_URL`

Used for application self-references and deployment-related configuration.

> ⚠️ Never commit your real API key to the repository. Store it in `.env` and make sure `.env` is included in `.gitignore`.

---

## 🎓 Project Purpose

This project was designed as a **digital storytelling and memory space**, bringing together:

* 3D architecture
* Modern web design
* Interactive technology
* Education
* Communication
* Historical preservation
* Digital exhibition

The goal is to provide a new way to present the school's **history, achievements, people, and memories** through an immersive digital experience.

---

## 🎉 60 Years — 1966–2026

> **Six decades — One school — Generations connected by the same journey.**

This project celebrates the **60th anniversary of THPT A Trần Hưng Đạo**, honoring its history while looking toward the future.

---

## 📄 License

This repository currently **does not include an official license file**.

Please verify usage rights before using the project commercially or redistributing it, especially for:

* School materials
* Logos and branding
* Images
* Audio
* Historical content
* Media assets

---

## ❤️ Acknowledgements

Built as a digital commemorative experience for:

**THPT A Trần Hưng Đạo**

**1966 — 2026**

---

<p align="center">
  🇻🇳 <strong>THPT A Trần Hưng Đạo — Sảnh Chờ Số</strong><br>
  <em>60 years of history. One shared journey. A future ahead.</em>
</p>
