# 🎨 Flux AI Pro (v9.9.0)

<div align="center">

![Version](https://img.shields.io/badge/version-9.9.0--gpt-blue?style=for-the-badge&logo=github)
![Model](https://img.shields.io/badge/Model-GPT%20%7C%20Flux%20%7C%20Turbo-purple?style=for-the-badge&logo=openai)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange?style=for-the-badge&logo=cloudflare)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**🚀 全能型 AI 圖像生成平台 | GPT & Flux 雙引擎 | 雙語國際版**

基於 Cloudflare Workers 的高性能無伺服器架構  
**六大模型支援** · **智能參數優化** · **Google 免費翻譯** · **完整 Web UI**

[🎯 快速開始](#-3-分鐘快速部署) · [📸 在線演示](https://flux-ai-pro.workers.dev) · [⚖️ 方案選擇](#-方案選擇指南) · [📖 功能文檔](#-功能特性)

</div>

---

## ✨ v9.9.0 重大更新

<table>
<tr>
<td width="50%">

### 🤖 雙引擎架構 (GPT + Flux)
本版本引入了 **GPT-Image** 系列模型，與現有的 Flux 模型形成互補：
- **GPT-Image Large**：極致細節與藝術性，適合高品質創作。
- **GPT-Image**：通用型生成，指令依從性高，色彩豐富。

### 🌍 Google GTX 智能翻譯
- **完全免費**：整合 Google GTX API，不再消耗 Workers AI 額度。
- **無縫體驗**：輸入中文提示詞，自動轉譯為高品質英文 Prompt。

</td>
<td width="50%">

### 📊 六大模型矩陣
1. **GPT-Image** (通用)
2. **GPT-Image Large** (藝術)
3. **Flux Standard** (寫實)
4. **Flux Turbo** (極速)
5. **Z-Image** (預覽)
6. **Kontext** (圖生圖)

### 🎨 午夜藍調 UI
- 全新 **Midnight Blue** 深色主題。
- 響應式設計，完美支援手機與桌面操作。

</td>
</tr>
</table>

---

## ⚖️ 方案選擇指南

不知道該選哪個模型？請參考以下場景推薦：

### 1️⃣ 追求極致畫質 (藝術創作)
*   **推薦模型**: `GPT-Image Large` 🌟 或 `Flux Standard`
*   **推薦設定**: Quality: `Ultra HD`, Auto-Optimize: `ON`
*   **特點**: 細節最豐富，光影最自然，適合製作桌布、海報或藝術作品。

### 2️⃣ 追求生成速度 (快速迭代)
*   **推薦模型**: `Flux Turbo` ⚡ 或 `Z-Image`
*   **推薦設定**: Quality: `Economy`, Size: `1024x1024`
*   **特點**: 5秒內出圖，適合測試 Prompt 構圖、快速預覽或批量生成。

### 3️⃣ 需要修改現有圖片 (圖生圖)
*   **推薦模型**: `Kontext` 🎨
*   **推薦設定**: 填入 `Reference Image URL`
*   **特點**: 唯一支援「以圖生圖」的模型，可進行風格遷移（如：照片轉油畫）或細節重繪。

### 4️⃣ 通用日常使用
*   **推薦模型**: `GPT-Image` 🎨
*   **推薦設定**: Quality: `Standard`
*   **特點**: 色彩鮮豔，對指令理解力強，平衡了速度與質量，適合社群分享圖。

---

## 🚀 3 分鐘快速部署

本項目基於 Cloudflare Workers，**完全免費**且無需伺服器維護。

### 1. 前置準備
- [Cloudflare 帳號](https://dash.cloudflare.com/sign-up) (免費)
- [Pollinations.ai API Key](https://pollinations.ai) (註冊獲取免費 Key)
- Node.js 環境 (v16+)

### 2. 部署步驟

**第一步：克隆項目**
```bash
git clone https://github.com/kinai9661/Flux-AI-Pro.git
cd Flux-AI-Pro
