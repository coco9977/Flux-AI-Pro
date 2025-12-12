# 🎨 Flux AI Pro

<div align="center">

![Version](https://img.shields.io/badge/version-9.3.0-orange?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/kinai9661/Flux-AI-Pro?style=for-the-badge)
![Forks](https://img.shields.io/github/forks/kinai9661/Flux-AI-Pro?style=for-the-badge)

**免費 AI 圖像生成 API · 支持批量生成 · Seed 控制 · 圖生圖 · 多圖融合 · 39 種風格**

[English](README.md) | [繁體中文](README_TW.md) | [简体中文](README_CN.md)

[🚀 立即部署](#-一鍵部署) · [📖 文檔](#-功能特性) · [💬 討論](https://github.com/kinai9661/Flux-AI-Pro/issues)

</div>

---

## ✨ 功能特性

### 🎯 核心功能

- ✅ **完全免費** - 基於 Pollinations.ai,無需 API Key
- 🎲 **Seed 控制** - 精確復現圖片,支持固定種子和隨機生成
- 📦 **批量生成** - 一次生成 1-4 張圖片,自動遞增 Seed
- 🖼️ **圖生圖** - 支持單張參考圖 (Kontext 系列)
- 🎨 **多圖融合** - 支持最多 4 張參考圖 (Nano Banana 系列)
- 🌐 **中文支持** - 自動翻譯中文提示詞 (Workers AI m2m100)
- 📜 **歷史記錄** - 本地保存生成記錄,支持一鍵復現
- 📤 **本地上傳** - 直接上傳圖片,自動托管到 Imgur/ImgBB

### 🎨 模型支持 (17 個)

#### ⚡ **Flux 系列 (7 個模型)**

| 模型 ID | 名稱 | 描述 | 最大尺寸 | 狀態 |
|---------|------|------|----------|------|
| `flux` | **Flux** | 均衡速度與質量,通用首選 | 2048px | ✅ 穩定 |
| `flux-realism` | **Flux Realism** | 超寫實照片風格,照片級質量 | 2048px | ✅ 穩定 |
| `flux-anime` | **Flux Anime** | 日系動漫風格,動漫專用 | 2048px | ✅ 穩定 |
| `flux-3d` | **Flux 3D** | 3D 渲染風格,立體感強 | 2048px | ✅ 穩定 |
| `flux-pro` | **Flux Pro** | 專業版最高質量,極致細節 | 2048px | ✅ 穩定 |
| `any-dark` | **Any Dark** | 暗黑風格,黑暗氛圍 | 2048px | ✅ 穩定 |
| `turbo` | **Turbo** | 極速生成,快速測試 | 2048px | ✅ 穩定 |

#### 🔥 **Flux 進階系列 (3 個模型)**

| 模型 ID | 名稱 | 描述 | 最大尺寸 | 狀態 |
|---------|------|------|----------|------|
| `flux-1.1-pro` | **Flux 1.1 Pro** 🔥 | 最新 Flux 1.1,更強細節 | 2048px | ⚠️ 實驗性 |
| `flux-kontext` | **Flux Kontext** 🎨 | 圖像編輯,1 張參考圖 | 2048px | ⚠️ 實驗性 |
| `flux-kontext-pro` | **Flux Kontext Pro** 💎 | 圖像編輯專業版,1 張參考圖 | 2048px | ⚠️ 實驗性 |

**圖生圖功能說明:**
- **Kontext 系列:** 支持 1 張參考圖
- **適用場景:** 圖像編輯、風格遷移、精準重繪
- **實驗性狀態:** 如失敗會自動回退到 Flux Pro/Realism

#### 🍌 **Nano Banana 系列 (2 個模型)**

| 模型 ID | 名稱 | 描述 | 參考圖 | 最大尺寸 | 狀態 |
|---------|------|------|--------|----------|------|
| `nanobanana` | **Nano Banana** 🍌 | Gemini 2.5 Flash,多圖融合 | 4 張 | 2048px | ✅ 穩定 |
| `nanobanana-pro` | **Nano Banana Pro** 🍌💎 | Gemini 3 Pro,4K 超清 | 4 張 | **4096px** | ✅ 穩定 |

**多圖融合功能說明:**
- **支持 1-4 張參考圖**
- **適用場景:** 多圖融合、圖像合成、4K 超清輸出
- **Nano Banana Pro:** 獨家支持 4K (4096×4096)

#### ⚡ **Stable Diffusion 系列 (5 個模型)**

| 模型 ID | 名稱 | 描述 | 最大尺寸 | 狀態 |
|---------|------|------|----------|------|
| `sd3` | **SD 3** ⚡ | Stable Diffusion 3 標準版 | 2048px | ⚠️ 實驗性 |
| `sd3.5-large` | **SD 3.5 Large** 🔥 | SD 3.5 大模型,高質量 | 2048px | ⚠️ 實驗性 |
| `sd3.5-turbo` | **SD 3.5 Turbo** ⚡ | SD 3.5 快速版 | 2048px | ⚠️ 實驗性 |
| `sdxl` | **SDXL** 📐 | 經典 SDXL 1.0 | 2048px | ⚠️ 實驗性 |
| `sdxl-lightning` | **SDXL Lightning** ⚡ | SDXL 極速版,超快生成 | 2048px | ⚠️ 實驗性 |

**實驗性模型說明:**
- ⚠️ 可能不穩定,失敗時自動回退到穩定模型
- **回退邏輯:** SD 系列 → Flux Realism → Flux
- **推薦:** 優先使用 Flux 系列獲得最佳體驗

---

### 📊 模型選擇建議

| 使用場景 | 推薦模型 | 理由 |
|----------|----------|------|
| **日常使用** | `flux` | 速度與質量平衡 |
| **寫實照片** | `flux-realism` | 照片級質量 |
| **動漫插畫** | `flux-anime` | 專為動漫優化 |
| **3D 渲染** | `flux-3d` | 立體感強 |
| **專業作品** | `flux-pro` | 極致細節 |
| **快速測試** | `turbo` | 極速生成 |
| **圖生圖** | `flux-kontext` | 單張參考圖編輯 |
| **多圖融合** | `nanobanana` | 4 張參考圖融合 |
| **4K 超清** | `nanobanana-pro` | 獨家 4K 支持 |

---

### 🎭 藝術風格 (39 種)

<details>
<summary>點擊查看完整風格列表</summary>

#### 🎌 **動漫系列** (6 種)
- `anime` - 動漫風格 ✨
- `anime-chibi` - Q版動漫 🎎
- `japanese-manga` - 日本漫畫 📚
- `shoujo-manga` - 少女漫畫 💕
- `seinen-manga` - 青年漫畫 🗡️
- `studio-ghibli` - 吉卜力風格 🍃

#### 📷 **寫實系列** (3 種)
- `photorealistic` - 寫實照片 📷
- `cinematic` - 電影級 🎬
- `portrait` - 人像攝影 👤

#### 🖌️ **傳統繪畫** (8 種)
- `oil-painting` - 油畫 🎨
- `watercolor` - 水彩畫 💧
- `chinese-painting` - 中國水墨畫 🖌️
- `ukiyo-e` - 浮世繪 🗾
- `sketch` - 素描 ✏️
- `charcoal` - 炭筆畫 🖍️
- `impressionism` - 印象派 🌅
- `surrealism` - 超現實主義 🌀

#### 💻 **數位藝術** (4 種)
- `digital-art` - 數位藝術 💻
- `pixel-art` - 像素藝術 🕹️
- `vector-art` - 向量藝術 📐
- `low-poly` - 低多邊形 🔷

#### 🌌 **幻想科幻** (7 種)
- `fantasy` - 奇幻風格 🐉
- `dark-fantasy` - 黑暗奇幻 🌑
- `fairy-tale` - 童話風格 🧚
- `cyberpunk` - 賽博朋克 🌃
- `sci-fi` - 科幻未來 🚀
- `steampunk` - 蒸汽朋克 ⚙️
- `vaporwave` - 蒸氣波 🌈

#### 🎬 **動畫影視** (2 種)
- `disney` - 迪士尼風格 🏰
- `comic-book` - 美式漫畫 💥

#### 🎭 **藝術流派** (6 種)
- `pop-art` - 普普藝術 🎭
- `art-deco` - 裝飾藝術 💎
- `art-nouveau` - 新藝術風格 🌺
- `abstract` - 抽象藝術 🎨
- `minimalist` - 極簡主義 ⬜

#### 🎨 **特殊風格** (3 種)
- `graffiti` - 塗鴉藝術 🎨
- `horror` - 恐怖風格 👻
- `kawaii` - 可愛風格 🌸

</details>

---

### 📐 尺寸預設 (33 種)

<details>
<summary>點擊查看完整尺寸列表</summary>

#### ⬜ **方形系列** (5 種)
| 預設 ID | 尺寸 | 說明 |
|---------|------|------|
| `square-512` | 512×512 | 快速測試 |
| `square-1k` | 1024×1024 | 標準方形 |
| `square-1.5k` | 1536×1536 | 高清方形 |
| `square-2k` | 2048×2048 | 超清方形 |
| `square-4k` | 4096×4096 | **4K 方形** 🍌 (僅 Nano Banana Pro) |

#### 📱 **豎屏系列** (6 種)
| 預設 ID | 尺寸 | 比例 | 說明 |
|---------|------|------|------|
| `portrait-9-16` | 768×1344 | 9:16 | TikTok/Story |
| `portrait-9-16-hd` | 1080×1920 | 9:16 | 1080p 豎屏 |
| `portrait-9-16-2k` | 1536×2688 | 9:16 | 2K 豎屏 |
| `portrait-3-4` | 768×1024 | 3:4 | Instagram 豎屏 |
| `portrait-3-4-hd` | 1152×1536 | 3:4 | HD 豎屏 |
| `portrait-2-3` | 1024×1536 | 2:3 | Pinterest |

#### 🖥️ **橫屏系列** (6 種)
| 預設 ID | 尺寸 | 比例 | 說明 |
|---------|------|------|------|
| `landscape-16-9` | 1344×768 | 16:9 | YouTube |
| `landscape-16-9-hd` | 1920×1080 | 16:9 | 1080p 橫屏 |
| `landscape-16-9-2k` | 2560×1440 | 16:9 | 2K 橫屏 |
| `landscape-16-9-4k` | 3840×2160 | 16:9 | **4K 橫屏** 🍌 (僅 Nano Banana Pro) |
| `landscape-4-3` | 1024×768 | 4:3 | 傳統橫屏 |
| `landscape-21-9` | 2560×1080 | 21:9 | 超寬螢幕 |

#### 📲 **社交媒體** (7 種)
| 預設 ID | 尺寸 | 平台 |
|---------|------|------|
| `instagram-square` | 1080×1080 | Instagram 方形貼文 |
| `instagram-portrait` | 1080×1350 | Instagram 豎屏貼文 (4:5) |
| `instagram-story` | 1080×1920 | Instagram Story/Reels |
| `facebook-cover` | 2048×1152 | Facebook 封面 |
| `twitter-header` | 1500×500 | Twitter/X 橫幅 |
| `youtube-thumbnail` | 1280×720 | YouTube 縮圖 |
| `linkedin-banner` | 1584×396 | LinkedIn 橫幅 |

#### 🖨️ **印刷/設計** (3 種)
| 預設 ID | 尺寸 | DPI | 說明 |
|---------|------|-----|------|
| `a4-portrait` | 2480×3508 | 300 | A4 豎屏 |
| `a4-landscape` | 3508×2480 | 300 | A4 橫屏 |
| `poster-24-36` | 2400×3600 | - | 海報 24×36 英吋 |

#### 🖼️ **桌布系列** (5 種)
| 預設 ID | 尺寸 | 說明 |
|---------|------|------|
| `wallpaper-fhd` | 1920×1080 | Full HD 桌布 |
| `wallpaper-2k` | 2560×1440 | 2K 桌布 |
| `wallpaper-4k` | 3840×2160 | **4K 桌布** 🍌 (僅 Nano Banana Pro) |
| `wallpaper-ultrawide` | 3440×1440 | Ultra-Wide 桌布 |
| `mobile-wallpaper` | 1242×2688 | iPhone 手機桌布 |

#### 🔧 **自定義**
| 預設 ID | 範圍 | 說明 |
|---------|------|------|
| `custom` | 256-4096px | 自定義任意尺寸 |

</details>

---

## 🚀 一鍵部署

### 部署到 Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kinai9661/Flux-AI-Pro)

#### 手動部署步驟:

```bash
# 1. 克隆倉庫
git clone https://github.com/kinai9661/Flux-AI-Pro.git
cd Flux-AI-Pro

# 2. 安裝 Wrangler (Cloudflare CLI)
npm install -g wrangler

# 3. 登錄 Cloudflare
wrangler login

# 4. 部署
wrangler deploy
```

#### 配置 Workers AI (可選 - 用於中文翻譯)

```bash
# 在 Cloudflare Dashboard 中:
# 1. 進入 Workers & Pages
# 2. 選擇你的 Worker
# 3. Settings → Bindings → Add binding
# 4. 選擇 "Workers AI" → 命名為 "AI"
```

---

## 📖 使用方法

### 🌐 Web UI

訪問你的部署地址,通過友好的 Web 界面生成圖片:

1. 輸入提示詞 (支持中文)
2. 選擇模型和風格
3. 設置尺寸和參數
4. **(可選)** 上傳參考圖
5. **(可選)** 設置 Seed
6. 點擊 "開始生成"

### 🔌 API 調用

#### 端點: `/v1/images/generations`

**基礎請求:**

```bash
curl -X POST https://your-worker.workers.dev/v1/images/generations \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a beautiful sunset over mountains",
    "model": "flux",
    "width": 1024,
    "height": 1024,
    "n": 1
  }'
```

**進階請求 (含 Seed + 風格):**

```bash
curl -X POST https://your-worker.workers.dev/v1/images/generations \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "一隻貓在太空中",
    "model": "flux-realism",
    "style": "cinematic",
    "width": 1920,
    "height": 1080,
    "quality_mode": "ultra",
    "seed": 12345,
    "n": 2,
    "negative_prompt": "low quality, blurry"
  }'
```

**圖生圖請求:**

```bash
curl -X POST https://your-worker.workers.dev/v1/images/generations \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "transform into oil painting",
    "model": "flux-kontext",
    "reference_images": [
      "https://example.com/image.jpg"
    ],
    "width": 1024,
    "height": 1024
  }'
```

**多圖融合請求:**

```bash
curl -X POST https://your-worker.workers.dev/v1/images/generations \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "merge these images into one artwork",
    "model": "nanobanana-pro",
    "reference_images": [
      "https://example.com/img1.jpg",
      "https://example.com/img2.jpg",
      "https://example.com/img3.jpg"
    ],
    "width": 2048,
    "height": 2048,
    "quality_mode": "ultra_4k"
  }'
```

#### 響應格式:

```json
{
  "created": 1702425600,
  "data": [
    {
      "url": "https://image.pollinations.ai/...",
      "provider": "Pollinations.ai",
      "model": "flux-realism",
      "seed": 12345,
      "width": 1920,
      "height": 1080,
      "style": "cinematic",
      "quality_mode": "ultra",
      "generation_mode": "文生圖",
      "reference_images_count": 0,
      "cost": "FREE"
    }
  ],
  "generation_time_ms": 3250
}
```

### 📋 其他 API 端點

```bash
# 獲取所有模型列表
GET /v1/models

# 獲取所有風格列表
GET /v1/styles

# 獲取服務商信息
GET /v1/providers

# 健康檢查
GET /health

# 性能統計
GET /stats
```

---

## 🎲 Seed 控制說明

### 什麼是 Seed?

Seed (隨機種子) 控制 AI 生成的隨機性。**相同的 prompt + seed = 完全相同的圖片**。

### 使用場景:

✅ **固定 Seed** (0-999999)
- 精確復現圖片
- 微調提示詞時保持構圖
- 批量生成變體

✅ **自動隨機** (-1 或留空)
- 探索不同可能性
- 每次生成全新圖片

### 批量生成 Seed 規則:

生成 3 張圖片,起始 Seed = 1000:
- 圖片 1: Seed 1000
- 圖片 2: Seed 1001
- 圖片 3: Seed 1002

---

## ⚙️ 高級配置

### 質量模式

| 模式 | 描述 | 適用場景 |
|------|------|----------|
| **economy** | 快速出圖 | 測試提示詞 |
| **standard** | 平衡質量與速度 | 日常使用 |
| **ultra** | 極致質量 | 重要作品 |
| **ultra_4k** | Nano Banana Pro 專屬 | 專業級輸出 |

### HD 優化

啟用 `auto_hd: true` 後,系統會:
- 自動增強提示詞 (添加高清關鍵詞)
- 智能調整生成步數
- 優化負面提示詞
- 根據質量模式上採樣尺寸

### 速率限制

- **每分鐘:** 10 次請求
- **每小時:** 100 次請求
- 超過限制將被暫時封禁 1 小時

---

## 🛠️ 技術棧

- **運行環境:** Cloudflare Workers
- **圖像生成:** Pollinations.ai API
- **翻譯服務:** Cloudflare Workers AI (m2m100)
- **圖片托管:** Imgur / ImgBB
- **本地存儲:** localStorage (歷史記錄)
- **前端:** 原生 JavaScript + CSS

---

## 📊 性能優化

- ✅ **響應緩存** (LRU Cache)
- ✅ **速率限制** (防濫用)
- ✅ **性能監控** (請求統計)
- ✅ **並發控制** (最多 3 個並行請求)
- ✅ **智能回退** (模型自動降級)

---

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request!

### 貢獻指南:

1. Fork 本倉庫
2. 創建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📜 更新日誌

### v9.3.0 (2025-12-13)
- ✨ 新增 Seed 控制系統
- ✨ 新增批量生成 (1-4 張)
- ✨ 新增圖生圖 + 多圖融合
- ✨ 新增本地上傳圖片
- ✨ 新增中文自動翻譯
- ✨ 新增歷史記錄功能
- ✨ 新增 39 種藝術風格
- ✨ 新增 33 種尺寸預設
- ✨ 支持 17 個 AI 模型
- 🔧 優化 HD 畫質系統
- 🔧 優化速率限制
- 🔧 優化性能監控

---

## 📄 許可證

本項目採用 [MIT License](LICENSE)。

---

## 🙏 致謝

- [Pollinations.ai](https://pollinations.ai/) - 提供免費 AI 圖像生成服務
- [Cloudflare Workers](https://workers.cloudflare.com/) - 強大的邊緣計算平台
- [Imgur](https://imgur.com/) & [ImgBB](https://imgbb.com/) - 圖片托管服務

---

## 📞 聯繫方式

- **GitHub Issues:** [提交問題](https://github.com/kinai9661/Flux-AI-Pro/issues)
- **GitHub Discussions:** [參與討論](https://github.com/kinai9661/Flux-AI-Pro/discussions)

---

<div align="center">

**如果這個項目對你有幫助,請給一個 ⭐ Star!**

Made with ❤️ by [kinai9661](https://github.com/kinai9661)

</div>