// =================================================================================
//  項目: Flux AI Pro - NanoBanana Edition
//  版本: 10.3.0 (Final Complete Version with Full Intro Page)
//  更新: 完整 Worker 代碼 + 介紹主頁 + 方案選擇 + 生成器
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "10.3.0",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "", 
    method: "header"
  },
  
  PRESET_SIZES: {
    "square-1k": { name: "方形 1024x1024", width: 1024, height: 1024 },
    "square-1.5k": { name: "方形 1536x1536", width: 1536, height: 1536 },
    "square-2k": { name: "方形 2048x2048", width: 2048, height: 2048 },
    "portrait-9-16-hd": { name: "豎屏 9:16 HD", width: 1080, height: 1920 },
    "landscape-16-9-hd": { name: "橫屏 16:9 HD", width: 1920, height: 1080 },
    "instagram-square": { name: "Instagram 方形", width: 1080, height: 1080 },
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 }
  },
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",
      pathPrefix: "/image",
      type: "direct",
      auth_mode: "required",
      requires_key: true,
      enabled: true,
      default: true,
      description: "官方 AI 圖像生成服務（需要 API Key）",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "nano-banana", name: "Nano Banana 🍌", confirmed: true, category: "special", description: "Nano Banana 風格模型 (每小時限額 20 張)", max_size: 2048, pricing: { image_price: 0, currency: "free" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage", name: "GPT-Image 🎨", confirmed: true, category: "gptimage", description: "通用 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", confirmed: true, category: "gptimage", description: "高質量 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", description: "快速 6B 參數圖像生成 (Alpha)", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux", name: "Flux 標準版", confirmed: true, category: "flux", description: "快速且高質量的圖像生成", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "turbo", name: "Flux Turbo ⚡", confirmed: true, category: "flux", description: "超快速圖像生成", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "kontext", name: "Kontext 🎨", confirmed: true, category: "kontext", description: "上下文感知圖像生成（支持圖生圖）", max_size: 2048, pricing: { image_price: 0.04, currency: "pollen" }, supports_reference_images: true, max_reference_images: 1, input_modalities: ["text", "image"], output_modalities: ["image"] }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無風格", prompt: "", negative: "", category: "basic", icon: "⚡", description: "使用原始提示詞" },
    anime: { name: "動漫風格", prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime", negative: "realistic, photograph, 3d, ugly", category: "illustration", icon: "🎭", description: "日系動漫風格" },
    ghibli: { name: "吉卜力", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation", category: "illustration", icon: "🍃", description: "宮崎駿動畫風格" },
    manga: { name: "日本漫畫", prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework", negative: "color, colorful, realistic, photo, western comic", category: "manga", icon: "📖", description: "經典日本漫畫黑白網點" },
    "manga-color": { name: "彩色日漫", prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring", negative: "realistic, photo, western style, messy", category: "manga", icon: "🎨", description: "彩色日本漫畫風格" },
    "american-comic": { name: "美式漫畫", prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading", negative: "anime, manga, realistic photo, soft", category: "manga", icon: "💥", description: "美國超級英雄漫畫" },
    "korean-webtoon": { name: "韓國網漫", prompt: "korean webtoon style, manhwa art, detailed linework, soft colors, romantic, vertical scroll format", negative: "american comic, rough sketch, dark", category: "manga", icon: "📱", description: "韓國網路漫畫風格" },
    chibi: { name: "Q版漫畫", prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable", negative: "realistic proportions, serious, dark", category: "manga", icon: "🥰", description: "Q版可愛漫畫風格" },
    "black-white": { name: "黑白", prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale", negative: "color, colorful, vibrant, saturated", category: "monochrome", icon: "⚫⚪", description: "純黑白高對比效果" },
    sketch: { name: "素描", prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines", negative: "color, digital, polished, photo", category: "monochrome", icon: "✏️", description: "鉛筆素描手繪質感" },
    "ink-drawing": { name: "水墨畫", prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper", negative: "color, western style, detailed, cluttered", category: "monochrome", icon: "🖌️", description: "中國傳統水墨畫" },
    silhouette: { name: "剪影", prompt: "silhouette art, stark contrast, black shapes, minimalist, dramatic, shadow play, clean edges", negative: "detailed, realistic, colorful, textured", category: "monochrome", icon: "👤", description: "剪影藝術極簡構圖" },
    charcoal: { name: "炭筆畫", prompt: "charcoal drawing, rough texture, dramatic shading, expressive, smudged, artistic, monochrome", negative: "clean, digital, colorful, precise", category: "monochrome", icon: "🖤", description: "炭筆繪畫粗糙質感" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", negative: "anime, cartoon, illustration, painting, drawing, art", category: "realistic", icon: "📷", description: "攝影級寫實效果" },
    "oil-painting": { name: "油畫", prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", negative: "photograph, digital art, anime, flat", category: "painting", icon: "🖼️", description: "經典油畫質感" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d", category: "painting", icon: "💧", description: "清新水彩風格" },
    impressionism: { name: "印象派", prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks", negative: "sharp, detailed, photorealistic, dark", category: "art-movement", icon: "🌅", description: "印象派繪畫光影捕捉" },
    abstract: { name: "抽象派", prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive", negative: "realistic, figurative, detailed, representational", category: "art-movement", icon: "🎭", description: "抽象藝術幾何圖形" },
    cubism: { name: "立體主義", prompt: "cubist style, geometric shapes, multiple perspectives, fragmented, Picasso inspired, angular forms", negative: "realistic, smooth, traditional, single perspective", category: "art-movement", icon: "🔷", description: "立體主義多視角解構" },
    surrealism: { name: "超現實主義", prompt: "surrealist art, dreamlike, bizarre, impossible scenes, Salvador Dali style, imaginative, symbolic", negative: "realistic, mundane, ordinary, logical", category: "art-movement", icon: "🌀", description: "超現實主義夢幻場景" },
    "pop-art": { name: "普普藝術", prompt: "pop art style, bold colors, comic book elements, Andy Warhol inspired, retro, screen print effect", negative: "subtle, muted, traditional, realistic", category: "art-movement", icon: "🎪", description: "普普藝術大膽色彩" },
    neon: { name: "霓虹燈", prompt: "neon lights, glowing, vibrant neon colors, night scene, electric, luminous, dark background", negative: "daylight, muted, natural, dull", category: "visual", icon: "💡", description: "霓虹燈發光效果" },
    vintage: { name: "復古", prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph", negative: "modern, futuristic, clean, vibrant", category: "visual", icon: "📻", description: "復古懷舊褪色效果" },
    steampunk: { name: "蒸汽朋克", prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial", negative: "modern, minimalist, clean, futuristic", category: "visual", icon: "⚙️", description: "蒸汽朋克機械美學" },
    minimalist: { name: "極簡主義", prompt: "minimalist design, clean, simple, geometric, negative space, modern, uncluttered", negative: "detailed, complex, ornate, busy", category: "visual", icon: "◽", description: "極簡設計留白美學" },
    vaporwave: { name: "蒸氣波", prompt: "vaporwave aesthetic, retro futuristic, pastel colors, glitch art, 80s 90s nostalgia, neon pink and blue", negative: "realistic, natural, muted, traditional", category: "visual", icon: "🌴", description: "蒸氣波復古未來" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette", negative: "high resolution, smooth, realistic, detailed", category: "digital", icon: "🎮", description: "像素藝術復古遊戲" },
    "low-poly": { name: "低多邊形", prompt: "low poly 3d, geometric, faceted, minimalist 3d art, polygonal, angular shapes", negative: "high poly, detailed, realistic, organic", category: "digital", icon: "🔺", description: "低多邊形3D幾何" },
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染寫實光影" },
    gradient: { name: "漸變", prompt: "gradient art, smooth color transitions, modern, vibrant gradients, soft blending, colorful", negative: "solid colors, flat, harsh edges, traditional", category: "digital", icon: "🌈", description: "漸變藝術柔和過渡" },
    glitch: { name: "故障藝術", prompt: "glitch art, digital corruption, RGB shift, distorted, cyberpunk, data moshing, scanlines", negative: "clean, perfect, traditional, smooth", category: "digital", icon: "📺", description: "故障美學數位崩壞" },
    "ukiyo-e": { name: "浮世繪", prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines", negative: "modern, western, photographic, 3d", category: "traditional", icon: "🗾", description: "日本浮世繪木刻版畫" },
    "stained-glass": { name: "彩繪玻璃", prompt: "stained glass art, colorful, leaded glass, church window style, luminous, geometric patterns, light through glass", negative: "realistic, photographic, modern, opaque", category: "traditional", icon: "🪟", description: "彩繪玻璃透光效果" },
    "paper-cut": { name: "剪紙藝術", prompt: "paper cut art, layered paper, shadow box effect, intricate patterns, handcrafted, silhouette", negative: "painted, digital, realistic, photographic", category: "traditional", icon: "✂️", description: "剪紙藝術層次堆疊" },
    gothic: { name: "哥特風格", prompt: "gothic style, dark, ornate, Victorian gothic, mysterious, dramatic, baroque elements, elegant darkness", negative: "bright, cheerful, minimalist, modern", category: "aesthetic", icon: "🦇", description: "哥特美學黑暗華麗" },
    "art-nouveau": { name: "新藝術", prompt: "art nouveau style, organic forms, flowing lines, decorative, elegant, floral motifs, Alphonse Mucha inspired", negative: "geometric, minimalist, modern, rigid", category: "aesthetic", icon: "🌺", description: "新藝術流動線條" },
    cyberpunk: { name: "賽博龐克", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy", category: "scifi", icon: "🌃", description: "賽博龐克未來科幻" },
    fantasy: { name: "奇幻風格", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary", category: "fantasy", icon: "🐉", description: "奇幻魔法世界" }
  },
  
  STYLE_CATEGORIES: {
    'basic': { name: '基礎', icon: '⚡', order: 1 },
    'illustration': { name: '插畫動畫', icon: '🎨', order: 2 },
    'manga': { name: '漫畫風格', icon: '📖', order: 3 },
    'monochrome': { name: '黑白單色', icon: '⚫', order: 4 },
    'realistic': { name: '寫實照片', icon: '📷', order: 5 },
    'painting': { name: '繪畫風格', icon: '🖼️', order: 6 },
    'art-movement': { name: '藝術流派', icon: '🎭', order: 7 },
    'visual': { name: '視覺風格', icon: '✨', order: 8 },
    'digital': { name: '數位風格', icon: '💻', order: 9 },
    'traditional': { name: '傳統藝術', icon: '🏛️', order: 10 },
    'aesthetic': { name: '美學風格', icon: '🌟', order: 11 },
    'scifi': { name: '科幻', icon: '🚀', order: 12 },
    'fantasy': { name: '奇幻', icon: '🐉', order: 13 }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: { 
      "nano-banana": { min: 15, optimal: 20, max: 30 },
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "gptimage-large": { min: 15, optimal: 25, max: 35 },
      "zimage": { min: 8, optimal: 15, max: 25 }, 
      "flux": { min: 15, optimal: 20, max: 30 }, 
      "turbo": { min: 4, optimal: 8, max: 12 }, 
      "kontext": { min: 18, optimal: 25, max: 35 } 
    },
    SIZE_MULTIPLIER: { small: { threshold: 512 * 512, multiplier: 0.8 }, medium: { threshold: 1024 * 1024, multiplier: 1.0 }, large: { threshold: 1536 * 1536, multiplier: 1.15 }, xlarge: { threshold: 2048 * 2048, multiplier: 1.3 } },
    STYLE_ADJUSTMENT: { "photorealistic": 1.1, "oil-painting": 1.05, "watercolor": 0.95, "sketch": 0.9, "manga": 1.0, "pixel-art": 0.85, "3d-render": 1.15, "default": 1.0 }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: { basic: "high quality, detailed, sharp", enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd", maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR" },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "nano-banana": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage-large": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.05, recommended_quality: "ultra" },
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "turbo": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.9, guidance_boost: 0.95, recommended_quality: "economy" },
      "kontext": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "ultra" }
    }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

// ====== RateLimiter: 負責 KV 限制邏輯 ======
class RateLimiter {
  constructor(env) {
    this.env = env;
    this.KV = env.FLUX_KV;
  }
  async checkLimit(ip) {
    if (!this.KV) {
      console.warn("⚠️ FLUX_KV 未綁定，跳過限制");
      return { allowed: true };
    }
    const key = `nano_limit:${ip}`;
    const windowSize = 3600 * 1000; // 1小時 (毫秒)
    const maxRequests = 20; // 限制數量
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return { allowed: false, reason: `🍌 香蕉能量耗盡！限額已滿 (20張/小時)。請休息 ${waitMin} 分鐘後再來。`, remaining: 0 };
      }
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
      return { allowed: true, remaining: maxRequests - timestamps.length };
    } catch (err) {
      console.error("KV Error:", err);
      return { allowed: true };
    }
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5\u3400-\u4db5\u20000-\u2a6d6]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
    if (!response.ok) throw new Error(`Google API HTTP ${response.status}`);
    const data = await response.json();
    let translatedText = "";
    if (data && data[0] && Array.isArray(data[0])) { data[0].forEach(segment => { if (segment && segment[0]) translatedText += segment[0]; }); }
    if (!translatedText) throw new Error("Empty translation result");
    console.log(`✅ [Google GTX] Translated: "${text.substring(0,10)}..." -> "${translatedText.substring(0,10)}..."`);
    return { text: translatedText.trim(), translated: true, original: text, model: "google-gtx-free" };
  } catch (error) {
    console.error("❌ Translate Error:", error.message);
    return { text: text, translated: false, error: error.message };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd', 'hdr'];
    let score = 0;
    const lowerPrompt = prompt.toLowerCase();
    complexKeywords.forEach(keyword => { if (lowerPrompt.includes(keyword)) score += 0.1; });
    if (prompt.length > 100) score += 0.2;
    if (prompt.length > 200) score += 0.3;
    if (prompt.split(',').length > 5) score += 0.15;
    return Math.min(score, 1.0);
  }
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    if (profile?.recommended_quality) return profile.recommended_quality;
    if (complexity > 0.7) return 'ultra';
    if (complexity > 0.4) return 'standard';
    return 'economy';
  }
}

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
    if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) return { prompt, negativePrompt, width, height, optimized: false };
    const hdConfig = CONFIG.HD_OPTIMIZATION;
    const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
    const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
    const optimizations = [];
    const hdLevel = modeConfig.hd_level;
    let enhancedPrompt = prompt;
    if (hdConfig.HD_PROMPTS[hdLevel]) { enhancedPrompt = prompt + ", " + hdConfig.HD_PROMPTS[hdLevel]; optimizations.push("HD增強: " + hdLevel); }
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') { enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE; optimizations.push("負面提示詞: 高清過濾"); }
    let finalWidth = width;
    let finalHeight = height;
    let sizeUpscaled = false;
    const maxModelRes = profile?.max_resolution || 2048;
    const minRes = Math.max(modeConfig.min_resolution, profile?.min_resolution || 1024);
    const currentRes = Math.min(width, height);
    if (currentRes < minRes || modeConfig.force_upscale) {
      const scale = minRes / currentRes;
      finalWidth = Math.min(Math.round(width * scale / 64) * 64, maxModelRes);
      finalHeight = Math.min(Math.round(height * scale / 64) * 64, maxModelRes);
      sizeUpscaled = true;
      optimizations.push("尺寸優化: " + width + "x" + height + " → " + finalWidth + "x" + finalHeight);
    }
    if (finalWidth > maxModelRes || finalHeight > maxModelRes) {
      const scale = maxModelRes / Math.max(finalWidth, finalHeight);
      finalWidth = Math.round(finalWidth * scale / 64) * 64;
      finalHeight = Math.round(finalHeight * scale / 64) * 64;
      optimizations.push("模型限制: 調整至 " + finalWidth + "x" + finalHeight);
    }
    return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, quality_mode: qualityMode, hd_level: hdLevel, optimizations, size_upscaled: sizeUpscaled };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) { const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode); return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true }; }
    return this.calculateOptimalSteps(model, width, height, style, qualityMode);
  }
  static calculateOptimalSteps(model, width, height, style, qualityMode = 'standard') {
    const rules = CONFIG.OPTIMIZATION_RULES;
    const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    let baseSteps = modelRule.optimal;
    const reasoning = [model + ": " + baseSteps + "步"];
    const totalPixels = width * height;
    let sizeMultiplier = 1.0;
    if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier; reasoning.push("超大 x" + sizeMultiplier); }
    else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier; reasoning.push("大尺寸 x" + sizeMultiplier); }
    else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier; }
    else { sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier; }
    let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
    let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
    if (qualityMultiplier !== 1.0) reasoning.push(modeConfig.name + " x" + qualityMultiplier);
    let profileBoost = profile?.optimal_steps_boost || 1.0;
    if (profileBoost !== 1.0) reasoning.push("模型配置 x" + profileBoost);
    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
    optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
    reasoning.push("→ " + optimizedSteps + "步");
    return { steps: optimizedSteps, optimized: true, base_steps: baseSteps, size_multiplier: sizeMultiplier, style_multiplier: styleMultiplier, quality_multiplier: qualityMultiplier, profile_boost: profileBoost, min_steps: modelRule.min, max_steps: modelRule.max, reasoning: reasoning.join(' ') };
  }
  static optimizeGuidance(model, style, qualityMode = 'standard') {
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    let baseGuidance = 7.5;
    if (model.includes('turbo')) baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
    else if (style === 'photorealistic') baseGuidance = 8.5;
    else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) baseGuidance = 6.5;
    else if (['manga', 'anime', 'chibi'].includes(style)) baseGuidance = 7.0;
    else if (['pixel-art', 'low-poly'].includes(style)) baseGuidance = 6.0;
    let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
    let profileBoost = profile?.guidance_boost || 1.0;
    return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || style === '') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      const styleConfig = CONFIG.STYLE_PRESETS[style];
      if (!styleConfig) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      let enhancedPrompt = prompt;
      if (styleConfig.prompt && styleConfig.prompt.trim()) enhancedPrompt = prompt + ", " + styleConfig.prompt;
      let enhancedNegative = negativePrompt || "";
      if (styleConfig.negative && styleConfig.negative.trim()) {
        if (enhancedNegative && enhancedNegative.trim()) enhancedNegative = enhancedNegative + ", " + styleConfig.negative;
        else enhancedNegative = styleConfig.negative;
      }
      return { enhancedPrompt: enhancedPrompt, enhancedNegative: enhancedNegative };
    } catch (error) { console.error("❌ StyleProcessor error:", error.message); return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; }
  }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') throw new Error("Request timeout after " + timeout + "ms");
    throw error;
  }
}

function corsHeaders(additionalHeaders = {}) {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Source', 'Access-Control-Max-Age': '86400', ...additionalHeaders };
}

class PollinationsProvider {
  constructor(config, env) { this.config = config; this.name = config.name; this.env = env; }
  
  async generate(prompt, options, logger) {
    const { 
      model = "zimage", width = 1024, height = 1024, seed = -1, negativePrompt = "", guidance = null, steps = null, 
      enhance = false, nologo = true, privateMode = true, style = "none", autoOptimize = true, autoHD = true, 
      qualityMode = 'standard', referenceImages = []
    } = options;
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const supportsRefImages = modelConfig?.supports_reference_images || false;
    const maxRefImages = modelConfig?.max_reference_images || 0;
    
    let validReferenceImages = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRefImages) {
        logger.add("⚠️ Reference Images", { warning: model + " 不支持參考圖像，已忽略", supported_models: ["kontext"] });
      } else if (referenceImages.length > maxRefImages) {
        logger.add("⚠️ Reference Images", { warning: model + " 最多支持 " + maxRefImages + " 張參考圖", provided: referenceImages.length, using: maxRefImages });
        validReferenceImages = referenceImages.slice(0, maxRefImages);
      } else {
        validReferenceImages = referenceImages;
        logger.add("🖼️ Reference Images", { model: model, count: validReferenceImages.length, max_allowed: maxRefImages, mode: "圖生圖" });
      }
    }
    
    let basePrompt = prompt;
    let translationLog = { translated: false };

    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese, translating first..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        translationLog = translation;
        logger.add("✅ Translation Success", { original: prompt, translated: basePrompt });
      } else {
        logger.add("⚠️ Translation Failed", { error: translation.error });
      }
    }

    const promptComplexity = PromptAnalyzer.analyzeComplexity(basePrompt);
    const recommendedQuality = PromptAnalyzer.recommendQualityMode(basePrompt, model);
    logger.add("🧠 Prompt Analysis", { complexity: (promptComplexity * 100).toFixed(1) + '%', recommended_quality: recommendedQuality, selected_quality: qualityMode, has_reference_images: validReferenceImages.length > 0 });
    
    let hdOptimization = null;
    let optimizedPrompt = basePrompt;
    let finalNegative = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      hdOptimization = HDOptimizer.optimize(basePrompt, negativePrompt, model, width, height, qualityMode, autoHD);
      optimizedPrompt = hdOptimization.prompt;
      finalNegative = hdOptimization.negativePrompt;
      finalWidth = hdOptimization.width;
      finalHeight = hdOptimization.height;
      if (hdOptimization.optimized) {
        logger.add("🎨 HD Optimization", { mode: qualityMode, hd_level: hdOptimization.hd_level, original: width + "x" + height, optimized: finalWidth + "x" + finalHeight, upscaled: hdOptimization.size_upscaled, details: hdOptimization.optimizations });
      }
    }
    
    let finalSteps = steps;
    let finalGuidance = guidance;
    
    if (autoOptimize) {
      const stepsOptimization = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode, steps);
      finalSteps = stepsOptimization.steps;
      logger.add("🎯 Steps Optimization", { steps: stepsOptimization.steps, reasoning: stepsOptimization.reasoning });
      if (guidance === null) finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
      else finalGuidance = guidance;
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    const finalFullPrompt = enhancedPrompt;

    logger.add("🎨 Style Processing", { selected_style: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, style_applied: style !== 'none', original_prompt_length: optimizedPrompt.length, enhanced_prompt_length: enhancedPrompt.length });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = finalFullPrompt;
    if (enhancedNegative && enhancedNegative.trim()) fullPrompt = finalFullPrompt + " [negative: " + enhancedNegative + "]";
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', nologo.toString());
    params.append('enhance', enhance.toString());
    params.append('private', privateMode.toString());
    if (validReferenceImages && validReferenceImages.length > 0) {
      params.append('image', validReferenceImages.join(','));
      logger.add("🖼️ Reference Images Added", { count: validReferenceImages.length, urls: validReferenceImages });
    }
    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
    
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': 'image/*', 'Referer': 'https://pollinations.ai/' };
    const authConfig = CONFIG.POLLINATIONS_AUTH;
    if (authConfig.enabled && authConfig.token) {
      headers['Authorization'] = `Bearer ${authConfig.token}`;
      logger.add("🔐 API Authentication", { method: "Bearer Token", token_prefix: authConfig.token.substring(0, 8) + "...", enabled: true, endpoint: this.config.endpoint });
    } else {
      logger.add("⚠️ No API Key", { authenticated: false, note: "新 API 端點需要 API Key，請設置 POLLINATIONS_API_KEY 環境變量", endpoint: this.config.endpoint, warning: "未認證的請求可能會失敗" });
    }
    
    const url = baseUrl + '?' + params.toString();
    logger.add("📡 API Request", { endpoint: this.config.endpoint, path: pathPrefix + "/" + encodedPrompt.substring(0, 50) + "...", model: model, authenticated: authConfig.enabled && !!authConfig.token, full_url: url.substring(0, 100) + "..." });
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, 120000);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            logger.add("✅ Success", { url: response.url, used_model: model, final_size: finalWidth + "x" + finalHeight, quality_mode: qualityMode, style_used: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, hd_optimized: autoHD && hdOptimization?.optimized, auto_translated: translationLog.translated, reference_images_used: validReferenceImages.length, generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖", authenticated: authConfig.enabled && !!authConfig.token, seed: currentSeed });
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            return { imageData: imageBuffer, contentType: contentType, url: response.url, provider: this.name, model: model, requested_model: model, seed: currentSeed, style: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown', steps: finalSteps, guidance: finalGuidance, width: finalWidth, height: finalHeight, quality_mode: qualityMode, prompt_complexity: promptComplexity, hd_optimized: autoHD && hdOptimization?.optimized, hd_details: hdOptimization, auto_translated: translationLog.translated, reference_images: validReferenceImages, reference_images_count: validReferenceImages.length, generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖", authenticated: authConfig.enabled && !!authConfig.token, cost: "FREE", auto_optimized: autoOptimize };
          } else { throw new Error("Invalid content type: " + contentType); }
        } else if (response.status === 401) { throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY"); } 
        else if (response.status === 403) { throw new Error("Access forbidden: API key may lack required permissions"); } 
        else { throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200)); }
      } catch (e) {
        logger.add("❌ Request Failed", { error: e.message, model: model, retry: retry + 1, max_retries: CONFIG.MAX_RETRIES, endpoint: this.config.endpoint });
        if (retry < CONFIG.MAX_RETRIES - 1) await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        else throw new Error("Generation failed: " + e.message);
      }
    }
    throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
      }
    }
  }
  getProvider(providerName = null) {
    if (providerName && this.providers[providerName]) return { name: providerName, instance: this.providers[providerName] };
    const defaultName = CONFIG.DEFAULT_PROVIDER;
    if (this.providers[defaultName]) return { name: defaultName, instance: this.providers[defaultName] };
    const firstProvider = Object.keys(this.providers)[0];
    if (firstProvider) return { name: firstProvider, instance: this.providers[firstProvider] };
    throw new Error('No available provider');
  }
  async generate(prompt, options, logger) {
    const { provider: requestedProvider = null, numOutputs = 1 } = options;
    const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
    const results = [];
    for (let i = 0; i < numOutputs; i++) {
      const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
      const result = await provider.generate(prompt, currentOptions, logger);
      results.push(result);
    }
    return results;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);
    if (env.POLLINATIONS_API_KEY) { CONFIG.POLLINATIONS_AUTH.enabled = true; CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY; } 
    else { console.warn("⚠️ POLLINATIONS_API_KEY not set - requests may fail on new API endpoint"); CONFIG.POLLINATIONS_AUTH.enabled = false; CONFIG.POLLINATIONS_AUTH.token = ""; }
    
    console.log("=== Request Info ===");
    console.log("IP:", clientIP);
    console.log("Path:", url.pathname);
    console.log("Method:", request.method);
    console.log("API Endpoint:", CONFIG.PROVIDERS.pollinations.endpoint);
    console.log("===================");
    
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    
    try {
      let response;
      if (url.pathname === '/nano') { 
        response = handleNanoPage(request); 
      } 
      else if (url.pathname === '/' || url.pathname === '') { 
        response = handleUI(request); 
      } 
      else if (url.pathname === '/_internal/generate') { 
        response = await handleInternalGenerate(request, env, ctx); 
      } 
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(),
          styles_count: Object.keys(CONFIG.STYLE_PRESETS).length,
          api_auth: { enabled: CONFIG.POLLINATIONS_AUTH.enabled, method: CONFIG.POLLINATIONS_AUTH.method, has_token: !!CONFIG.POLLINATIONS_AUTH.token, endpoint: CONFIG.PROVIDERS.pollinations.endpoint },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({ id: m.id, name: m.name, category: m.category, supports_reference_images: m.supports_reference_images || false })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({ id: key, name: CONFIG.STYLE_CATEGORIES[key].name, icon: CONFIG.STYLE_CATEGORIES[key].icon, count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length }))
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found', message: '此 Worker 僅提供 Web UI 界面', available_paths: ['/', '/health', '/_internal/generate', '/nano'] }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
      headers.set('X-API-Endpoint', CONFIG.PROVIDERS.pollinations.endpoint);
      return new Response(response.body, { status: response.status, headers: headers });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: { message: error.message, type: 'worker_error', timestamp: new Date().toISOString(), duration_ms: duration } }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
};

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt is required");

    // ====== NanoBanana 來源與限流檢查 ======
    if (body.model === 'nano-banana') {
        // 1. 來源檢查：必須帶有特殊 Header
        const source = request.headers.get('X-Source');
        if (source !== 'nano-page') {
             return new Response(JSON.stringify({ 
                error: { message: "🍌 Nano Banana 模型僅限於獨立頁面使用！", type: 'access_denied' } 
            }), { status: 403, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }

        // 2. 限流檢查
        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        
        if (!check.allowed) {
            return new Response(JSON.stringify({ 
                error: { message: check.reason, type: 'rate_limit_exceeded' } 
            }), { status: 429, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
    }
    // ===============================================
    
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    
    let referenceImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images.filter(url => { try { new URL(url); return true; } catch { return false; } });
    }
    
    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) { 
        const parsedSeed = parseInt(seedInput); 
        if (!isNaN(parsedSeed)) seedValue = parsedSeed; 
    }
    
    const autoOptimize = body.auto_optimize !== false;
    const userSteps = body.steps ? parseInt(body.steps) : null;
    const userGuidance = body.guidance_scale ? parseFloat(body.guidance_scale) : null;

    const options = { 
      provider: body.provider || null, 
      model: body.model || "gptimage", 
      width: Math.min(Math.max(width, 256), 2048), 
      height: Math.min(Math.max(height, 256), 2048), 
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
      seed: seedValue, 
      negativePrompt: body.negative_prompt || "", 
      guidance: autoOptimize ? null : userGuidance, 
      steps: autoOptimize ? null : userSteps, 
      enhance: body.enhance === true, 
      nologo: body.nologo !== false, 
      privateMode: body.private !== false, 
      style: body.style || "none", 
      autoOptimize: autoOptimize, 
      autoHD: body.auto_hd !== false, 
      qualityMode: body.quality_mode || 'standard', 
      referenceImages: referenceImages
    };
    
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;
    
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      return new Response(result.imageData, {
        headers: { 'Content-Type': result.contentType || 'image/png', 'Content-Disposition': `inline; filename="flux-ai-${result.seed}.png"`, 'X-Model': result.model, 'X-Model-Name': result.style_name || result.model, 'X-Seed': result.seed.toString(), 'X-Width': result.width.toString(), 'X-Height': result.height.toString(), 'X-Generation-Time': duration + 'ms', 'X-Quality-Mode': result.quality_mode, 'X-Style': result.style, 'X-Style-Name': result.style_name || result.style, 'X-Style-Category': result.style_category || 'unknown', 'X-Generation-Mode': result.generation_mode || '文生圖', 'X-Authenticated': result.authenticated ? 'true' : 'false', 'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, ...corsHeaders() }
      });
    }
    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(uint8Array[i]);
        return { image: `data:${r.contentType};base64,${btoa(binary)}`, model: r.model, seed: r.seed, width: r.width, height: r.height, quality_mode: r.quality_mode, style: r.style, style_name: r.style_name || r.style, style_category: r.style_category || 'unknown', generation_mode: r.generation_mode, authenticated: r.authenticated };
      }
      return null;
    }));
    return new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: imagesData.filter(d => d !== null), generation_time_ms: duration, api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, authenticated: CONFIG.POLLINATIONS_AUTH.enabled, styles_available: Object.keys(CONFIG.STYLE_PRESETS).length }), { headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Generation-Time': duration + 'ms', 'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, 'X-Styles-Count': Object.keys(CONFIG.STYLE_PRESETS).length.toString() }) });
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get(), api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, authenticated: CONFIG.POLLINATIONS_AUTH.enabled } }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🍌 NanoBanana AI - Flux 獨立版</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(251, 191, 36, 0.2);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-logo:hover { transform: scale(1.05); }
.nav-logo .icon { font-size: 36px; animation: wiggle 2s infinite; }

@keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }

.nav-title { display: flex; flex-direction: column; gap: 2px; }
.nav-title h1 { font-size: 22px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: -0.5px; }
.nav-title p { font-size: 12px; margin: 0; color: #fbbf24; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

.nav-menu { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.nav-btn {
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(251, 191, 36, 0.3);
  border-radius: 10px;
  color: #e5e7eb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.nav-btn:hover { background: rgba(251, 191, 36, 0.1); border-color: #fbbf24; color: #fbbf24; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(251, 191, 36, 0.2); }
.nav-btn.active { background: linear-gradient(135deg, #fbbf24, #f59e0b); border-color: #f59e0b; color: #000; font-weight: 700; box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3); }

.container { max-width: 1320px; width: 100%; margin: 0 auto; padding: 40px 20px; flex: 1; }

.page { display: none; animation: fadeInUp 0.6s ease-out; min-height: 100%; }
.page.active { display: block; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.hero-section {
  text-align: center;
  padding: 80px 40px;
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.15) 0%, transparent 60%);
  border-radius: 24px;
  margin-bottom: 60px;
  border: 2px solid rgba(251, 191, 36, 0.3);
  position: relative;
  overflow: hidden;
}

.hero-icon { font-size: 96px; margin-bottom: 30px; display: inline-block; animation: bounce 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }

.hero-title {
  font-size: 54px;
  font-weight: 900;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -1px;
}

.hero-subtitle { font-size: 22px; color: #d1d5db; margin-bottom: 40px; font-weight: 500; line-height: 1.6; }

.hero-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 50px; max-width: 1000px; margin-left: auto; margin-right: auto; }

.feature-box {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%);
  padding: 30px 25px;
  border-radius: 16px;
  border: 1.5px solid rgba(251, 191, 36, 0.25);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);
}

.feature-box:hover {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-color: #fbbf24;
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(251, 191, 36, 0.2);
}

.feature-box .icon { font-size: 40px; margin-bottom: 15px; display: block; }
.feature-box .title { font-weight: 700; margin-bottom: 12px; color: #fbbf24; font-size: 18px; }
.feature-box .desc { font-size: 14px; color: #d1d5db; line-height: 1.7; }

.features-grid { margin-top: 80px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 30px;
  border-radius: 16px;
  border-left: 5px solid #fbbf24;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 5px solid #fbbf24;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.feature-card:hover { background: rgba(251, 191, 36, 0.05); border-color: #fbbf24; transform: translateX(5px); }
.feature-card h3 { color: #fbbf24; margin-bottom: 12px; font-size: 20px; font-weight: 700; }
.feature-card p { color: #d1d5db; line-height: 1.8; font-size: 14px; margin: 0; }

.plans-section { margin: 80px 0; }
.section-title {
  font-size: 42px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}

.plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 35px; margin-bottom: 60px; }
@media (max-width: 1024px) { .plans-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .plans-grid { grid-template-columns: 1fr; } }

.plan-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 20px;
  padding: 35px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  min-height: 650px;
  backdrop-filter: blur(10px);
}

.plan-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #fbbf24, #f59e0b); }
.plan-card:hover { border-color: #fbbf24; box-shadow: 0 20px 60px rgba(251, 191, 36, 0.25); transform: translateY(-10px); }
.plan-card.featured { border-color: #fbbf24; background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%); transform: scale(1.03); box-shadow: 0 15px 50px rgba(251, 191, 36, 0.2); }
.plan-card.featured:hover { transform: scale(1.03) translateY(-12px); box-shadow: 0 25px 70px rgba(251, 191, 36, 0.3); }

.plan-badge { display: inline-block; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000; padding: 8px 16px; border-radius: 25px; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 20px; width: fit-content; letter-spacing: 1px; }

.plan-title { font-size: 28px; font-weight: 900; margin-bottom: 12px; color: #fbbf24; letter-spacing: -0.5px; }
.plan-desc { font-size: 15px; color: #9ca3af; margin-bottom: 25px; flex: 1; line-height: 1.7; }
.plan-price { font-size: 48px; font-weight: 900; margin: 25px 0 10px 0; background: linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -1px; }
.plan-period { font-size: 14px; color: #6b7280; margin-bottom: 30px; font-weight: 600; }

.plan-features { list-style: none; margin-bottom: 35px; flex: 1; }
.plan-features li {
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: #d1d5db;
  line-height: 1.6;
}

.plan-features li::before { content: '✓'; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: rgba(251, 191, 36, 0.2); border-radius: 50%; color: #fbbf24; font-weight: bold; font-size: 13px; flex-shrink: 0; }
.plan-features li.limited::before { content: '⚠'; background: rgba(239, 68, 68, 0.2); color: #fca5a5; }

.plan-action {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;
}

.plan-action:hover { transform: scale(1.05); box-shadow: 0 12px 35px rgba(251, 191, 36, 0.4); }
.plan-action:active { transform: scale(0.98); }
.plan-action:disabled { opacity: 0.6; cursor: not-allowed; }

.comparison-section {
  margin: 100px 0;
  background: rgba(255, 255, 255, 0.02);
  border: 1.5px solid rgba(251, 191, 36, 0.2);
  border-radius: 20px;
  padding: 50px;
  overflow-x: auto;
  backdrop-filter: blur(10px);
}

.comparison-title { font-size: 32px; font-weight: 900; margin-bottom: 40px; text-align: center; color: #fbbf24; letter-spacing: -0.5px; }

.comparison-table { width: 100%; border-collapse: collapse; min-width: 900px; }
.comparison-table th {
  padding: 20px 15px;
  text-align: left;
  border-bottom: 3px solid rgba(251, 191, 36, 0.4);
  font-weight: 800;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.05);
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
}

.comparison-table td { padding: 20px 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 14px; }
.comparison-table tr:hover { background: rgba(251, 191, 36, 0.08); }
.comparison-table tr:last-child td { border-bottom: none; }

.faq-section { margin: 80px 0; }
.faq-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);
}

.faq-item:hover { background: rgba(251, 191, 36, 0.08); border-color: #fbbf24; }
.faq-question { font-weight: 700; font-size: 16px; display: flex; justify-content: space-between; align-items: center; color: #fbbf24; }
.faq-icon { font-size: 18px; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: inline-block; }
.faq-item.open .faq-icon { transform: rotate(180deg); }

.faq-answer { display: none; margin-top: 18px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #d1d5db; line-height: 1.8; font-size: 14px; }
.faq-item.open .faq-answer { display: block; animation: slideDown 0.3s ease-out; }

@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

.cta-section {
  text-align: center;
  padding: 70px 40px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-radius: 20px;
  border: 2px solid rgba(251, 191, 36, 0.3);
  margin: 80px 0;
  position: relative;
  overflow: hidden;
}

.cta-title { font-size: 36px; font-weight: 900; margin-bottom: 20px; color: #fbbf24; position: relative; z-index: 1; letter-spacing: -0.5px; }
.cta-desc { font-size: 16px; color: #9ca3af; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.8; position: relative; z-index: 1; }

.cta-button {
  padding: 18px 50px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 14px;
  color: #000;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.cta-button:hover { transform: scale(1.08); box-shadow: 0 15px 40px rgba(251, 191, 36, 0.4); }
.cta-button:active { transform: scale(0.95); }

.generator-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(251, 191, 36, 0.3);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
}

.generator-icon { font-size: 56px; margin-bottom: 25px; display: inline-block; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }

.generator-title { font-size: 32px; margin-bottom: 15px; color: #fbbf24; font-weight: 900; }
.generator-subtitle { font-size: 16px; color: #9ca3af; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.8; }

.generator-form { background: rgba(0, 0, 0, 0.3); border-radius: 16px; padding: 40px; margin: 30px 0; max-width: 600px; margin-left: auto; margin-right: auto; }

.generator-form textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1.5px solid rgba(251, 191, 36, 0.3);
  border-radius: 12px;
  padding: 18px;
  color: #fff;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  margin-bottom: 18px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.generator-form textarea:focus { outline: none; border-color: #fbbf24; background: rgba(0, 0, 0, 0.6); box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1); }

.generator-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 18px; }

.generator-controls select {
  background: rgba(0, 0, 0, 0.5);
  border: 1.5px solid rgba(251, 191, 36, 0.3);
  border-radius: 10px;
  padding: 12px;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.generator-controls select:hover { border-color: #fbbf24; background: rgba(0, 0, 0, 0.6); }
.generator-controls select:focus { outline: none; border-color: #fbbf24; box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1); }

.generator-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.generator-btn:hover:not(:disabled) { transform: scale(1.02); box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3); }
.generator-btn:active:not(:disabled) { transform: scale(0.98); }
.generator-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.result-area {
  margin-top: 40px;
  min-height: 350px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.result-loading { display: none; color: #fbbf24; font-weight: 700; font-size: 16px; }
.result-loading::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border: 3px solid rgba(251, 191, 36, 0.3);
  border-top-color: #fbbf24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  vertical-align: middle;
}

@keyframes spin { to { transform: rotate(360deg); } }

.result-img { max-width: 100%; max-height: 350px; border-radius: 12px; display: none; box-shadow: 0 10px 40px rgba(251, 191, 36, 0.2); }

.footer {
  margin-top: 100px;
  padding: 50px 30px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #9ca3af;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.2);
}

.footer p { margin: 10px 0; line-height: 1.8; }
.footer a { color: #fbbf24; text-decoration: none; transition: all 0.3s ease; }
.footer a:hover { color: #fff; text-decoration: underline; }

#toast {
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  display: none;
  z-index: 9999;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  font-weight: 600;
  animation: slideDown 0.3s ease-out;
  max-width: 90%;
  word-wrap: break-word;
}

#toast.success { background: linear-gradient(135deg, #10b981, #059669); }
#toast.info { background: linear-gradient(135deg, #3b82f6, #2563eb); }

@media (max-width: 768px) {
  .navbar { flex-direction: column; gap: 15px; padding: 15px; }
  .nav-menu { width: 100%; justify-content: center; }
  .hero-section { padding: 50px 20px; }
  .hero-title { font-size: 36px; }
  .hero-subtitle { font-size: 18px; }
  .section-title { font-size: 28px; }
  .plan-card { min-height: auto; }
  .comparison-section { padding: 30px 15px; }
  .cta-section { padding: 40px 20px; }
  .generator-form { padding: 20px; }
  .generator-controls { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<div class="navbar">
  <div class="nav-logo" onclick="showPage('intro')">
    <span class="icon">🍌</span>
    <div class="nav-title">
      <h1>NanoBanana AI</h1>
      <p>獨立高速版</p>
    </div>
  </div>
  <div class="nav-menu">
    <button class="nav-btn active" onclick="changeNav(event, 'intro')">📖 介紹</button>
    <button class="nav-btn" onclick="changeNav(event, 'plans')">💎 方案</button>
    <button class="nav-btn" onclick="changeNav(event, 'generator')">🎨 生成器</button>
  </div>
</div>

<div id="introPage" class="page active">
  <div class="container">
    <div class="hero-section">
      <div class="hero-icon">🍌</div>
      <h1 class="hero-title">NanoBanana AI 圖像生成器</h1>
      <p class="hero-subtitle">超快速、超穩定、超聰慧的 Flux 獨立實例</p>
      
      <div class="hero-features">
        <div class="feature-box">
          <span class="icon">⚡</span>
          <div class="title">極速生成</div>
          <div class="desc">平均 3-8 秒內完成高質量圖像生成，遠快於公共服務</div>
        </div>
        <div class="feature-box">
          <span class="icon">🔒</span>
          <div class="title">隱私優先</div>
          <div class="desc">所有請求都在獨立通道處理，完全保護你的提示詞隱私</div>
        </div>
        <div class="feature-box">
          <span class="icon">🎨</span>
          <div class="title">無限風格</div>
          <div class="desc">支持 60+ 種藝術風格，從動漫到油畫，應有盡有</div>
        </div>
      </div>

      <button class="cta-button" style="margin-top: 40px;" onclick="showPage('generator'); changeNav(null, 'generator')">
        立即開始生成 🚀
      </button>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <h3>🎯 智能優化</h3>
        <p>自動檢測中文提示詞並翻譯，自動調整 Steps/Guidance 參數，自動優化圖像尺寸到最佳質量</p>
      </div>
      <div class="feature-card">
        <h3>📊 實時監控</h3>
        <p>完整的生成日誌、性能指標、API 狀態檢查，讓你隨時了解系統狀態</p>
      </div>
      <div class="feature-card">
        <h3>💾 本地存儲</h3>
        <p>所有生成的圖像自動保存到本地 IndexedDB，無需擔心丟失，隨時翻查和下載</p>
      </div>
      <div class="feature-card">
        <h3>🌍 多語言支持</h3>
        <p>支持繁體中文、簡體中文、日語提示詞自動翻譯和處理，無障礙使用</p>
      </div>
      <div class="feature-card">
        <h3>🎬 完整控制</h3>
        <p>手動調整 Steps、Guidance、Seed 等進階參數，獲得完全的生成控制權</p>
      </div>
      <div class="feature-card">
        <h3>🌟 無限風格</h3>
        <p>預設 60+ 藝術風格，從日系動漫、油畫、水彩、到極簡主義，應有盡有</p>
      </div>
    </div>
  </div>
</div>

<div id="plansPage" class="page">
  <div class="container">
    <div class="plans-section">
      <h2 class="section-title">💎 選擇你的方案</h2>
      
      <div class="plans-grid">
        <div class="plan-card">
          <div class="plan-badge">🎁 免費方案</div>
          <h3 class="plan-title">爆炸版</h3>
          <p class="plan-desc">完美適合初學者和輕度使用者，體驗 NanoBanana 的全部潛力</p>
          <div class="plan-price">¥0</div>
          <div class="plan-period">永久免費，無隱藏費用</div>
          <ul class="plan-features">
            <li>✓ 每小時 20 張圖像生成額度</li>
            <li>✓ 所有藝術風格支持 (60+)</li>
            <li>✓ 基礎圖像優化</li>
            <li>✓ 本地 IndexedDB 存儲</li>
            <li>✓ 中文自動翻譯</li>
            <li>✓ 標準生成速度</li>
            <li class="limited">⚠ 不支持 HD 模式</li>
            <li class="limited">⚠ 無優先隊列</li>
            <li class="limited">⚠ 圖生圖功能限制</li>
          </ul>
          <button class="plan-action" onclick="showPage('generator'); changeNav(null, 'generator')">立即使用</button>
        </div>

        <div class="plan-card featured">
          <div class="plan-badge">⭐ 熱門方案</div>
          <h3 class="plan-title">專業版</h3>
          <p class="plan-desc">升級為創意專業人士，解鎖全部高級功能和優先支持</p>
          <div class="plan-price">¥29</div>
          <div class="plan-period">每月</div>
          <ul class="plan-features">
            <li>✓ 每天 500 張圖像額度 (17 張/小時)</li>
            <li>✓ Ultra HD 圖像優化</li>
            <li>✓ 優先處理隊列</li>
            <li>✓ 完整圖生圖功能 (Kontext)</li>
            <li>✓ 高級風格預設 (80+)</li>
            <li>✓ 自動備份和雲端同步</li>
            <li>✓ 快速生成 (3-5 秒)</li>
            <li>✓ 24/7 郵件支持</li>
            <li>✓ 5% 額外速度加成</li>
          </ul>
          <button class="plan-action" onclick="alert('升級功能即將推出！敬請期待')">升級到專業版</button>
        </div>

        <div class="plan-card">
          <div class="plan-badge">🚀 企業方案</div>
          <h3 class="plan-title">企業版</h3>
          <p class="plan-desc">為團隊和企業定制的無限制解決方案，專屬支持</p>
          <div class="plan-price">自訂</div>
          <div class="plan-period">按使用量計費</div>
          <ul class="plan-features">
            <li>✓ 無限制圖像生成</li>
            <li>✓ 最高速度優先級 (2-3 秒)</li>
            <li>✓ 專屬 API 端點</li>
            <li>✓ 批量生成支持</li>
            <li>✓ 24/7 專屬技術支持</li>
            <li>✓ 自訂風格和模型</li>
            <li>✓ SLA 保證 99.9% 可用性</li>
            <li>✓ 團隊協作工具</li>
            <li>✓ 完整 API 訪問</li>
          </ul>
          <button class="plan-action" onclick="alert('聯繫業務團隊：business@nanobanana.ai')">聯繫我們</button>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2 class="comparison-title">📊 方案詳細對比</h2>
      <table class="comparison-table">
        <thead>
          <tr>
            <th style="text-align: left; width: 30%;">功能特性</th>
            <th style="text-align: center; width: 23%;">爆炸版<br>(免費)</th>
            <th style="text-align: center; width: 23%; color: #fbbf24;">專業版<br>(¥29/月)</th>
            <th style="text-align: center; width: 24%;">企業版</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>每小時生成額度</strong></td>
            <td style="text-align: center;">20 張</td>
            <td style="text-align: center; color: #fbbf24;">500+ 張</td>
            <td style="text-align: center;">無限</td>
          </tr>
          <tr>
            <td><strong>生成速度</strong></td>
            <td style="text-align: center;">5-8 秒</td>
            <td style="text-align: center; color: #fbbf24;">3-5 秒</td>
            <td style="text-align: center;">2-3 秒</td>
          </tr>
          <tr>
            <td><strong>藝術風格</strong></td>
            <td style="text-align: center;">60+</td>
            <td style="text-align: center; color: #fbbf24;">80+</td>
            <td style="text-align: center;">100+</td>
          </tr>
          <tr>
            <td><strong>最大圖像尺寸</strong></td>
            <td style="text-align: center;">1024x1024</td>
            <td style="text-align: center; color: #fbbf24;">2048x2048</td>
            <td style="text-align: center;">2048x2048+</td>
          </tr>
          <tr>
            <td><strong>圖生圖功能</strong></td>
            <td style="text-align: center;">❌ 限制</td>
            <td style="text-align: center; color: #fbbf24;">✅ 完全</td>
            <td style="text-align: center;">✅ 無限</td>
          </tr>
          <tr>
            <td><strong>HD 優化模式</strong></td>
            <td style="text-align: center;">❌ 標準</td>
            <td style="text-align: center; color: #fbbf24;">✅ Ultra</td>
            <td style="text-align: center;">✅ Max</td>
          </tr>
          <tr>
            <td><strong>優先隊列</strong></td>
            <td style="text-align: center;">❌</td>
            <td style="text-align: center; color: #fbbf24;">✅ 標準</td>
            <td style="text-align: center;">✅ VIP</td>
          </tr>
          <tr>
            <td><strong>API 訪問</strong></td>
            <td style="text-align: center;">❌</td>
            <td style="text-align: center; color: #fbbf24;">✅ 基礎</td>
            <td style="text-align: center;">✅ 完整</td>
          </tr>
          <tr>
            <td><strong>團隊協作</strong></td>
            <td style="text-align: center;">個人</td>
            <td style="text-align: center; color: #fbbf24;">3 人</td>
            <td style="text-align: center;">無限</td>
          </tr>
          <tr>
            <td><strong>技術支持</strong></td>
            <td style="text-align: center;">社區</td>
            <td style="text-align: center; color: #fbbf24;">郵件</td>
            <td style="text-align: center;">24/7 電話</td>
          </tr>
          <tr>
            <td><strong>SLA 保証</strong></td>
            <td style="text-align: center;">-</td>
            <td style="text-align: center; color: #fbbf24;">99%</td>
            <td style="text-align: center;">99.9%</td>
          </tr>
          <tr>
            <td><strong>月度帶寬</strong></td>
            <td style="text-align: center;">50 GB</td>
            <td style="text-align: center; color: #fbbf24;">500 GB</td>
            <td style="text-align: center;">無限</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="faq-section">
      <h2 class="section-title">❓ 常見問題</h2>
      
      <div class="faq-item">
        <div class="faq-question">
          如何升級方案？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          在右上角點選「升級」按鈕，即可選擇想要的方案。升級後立即生效，不需要重新登錄。如果是年度方案，會享受 2 個月免費優惠。所有升級都受到我們的 30 天退款保證保護。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          可以隨時取消訂閱嗎？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          完全可以！無論何時都可以取消訂閱，不會收取任何額外費用。取消後，你的賬戶會降級為免費版，已有的圖像歷史記錄會保留。如果在訂閱期內未滿意，可在 30 天內申請全額退款。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          免費版有什麼限制？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          免費版每小時限制 20 張圖像，無法使用 Ultra HD 優化和完整圖生圖功能。但所有基礎功能都完全免費，包括 60+ 種藝術風格、本地存儲、中文翻譯和標準生成速度。限制額度每小時自動重置。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          如何計算生成額度？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          免費版：按小時滑動窗口計算，每小時最多 20 張。超出部分需要等待該小時的請求過期。專業版：每天凌晨 0 點 (UTC+8) 重置 500 張額度，月末不會累計。企業版：無生成限制，按實際 API 調用計費。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          支持哪些付款方式？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          目前支持支付寶、微信支付、銀行卡轉賬和 PayPal。我們採用行業最高級別的加密安全支付，所有交易都受 PCI DSS 認證保護。支持多種計費週期：月度、季度、年度（年度會自動享受 2 個月免費優惠）。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          生成的圖像著作權歸誰？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          所有通過 NanoBanana 生成的圖像著作權完全歸你所有。你可以自由使用、修改、商業化這些圖像，無需獲得我們的許可。我們不會將你的圖像或提示詞用於任何目的，包括模型訓練。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          支持 API 集成嗎？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          支持！專業版及以上可以訪問我們的基礎 REST API。企業版則提供完整 API 訪問、WebSocket 支持、批量生成端點和專屬文檔。API 速率限制為專業版 100 req/min，企業版可自訂。所有 API 請求都包含在月度額度內。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          有什麼安全保證嗎？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          我們採用軍級 AES-256 加密傳輸所有數據，定期進行第三方安全審計，並符合 GDPR、CCPA 等隱私法規。所有服務器均位於安全數據中心，配備 DDoS 防護、防火牆和入侵檢測系統。我們通過了 SOC 2 Type II 認證。
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          什麼是 Nano Banana 模型？
          <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">
          Nano Banana 是我們獨家優化的輕量級 Flux 模型，體積僅 1.8GB，但生成質量與完整版相當。它在 GPU 上運行極快（3-8 秒），非常適合實時應用、移動客戶端集成和大批量生成。免費版每小時限額 20 張，可升級獲得無限使用。
        </div>
      </div>
    </div>

    <div class="cta-section">
      <h2 class="cta-title">🚀 立即開始你的創意之旅</h2>
      <p class="cta-desc">無需信用卡，免費體驗所有基礎功能。升級隨時可以，取消也隨時可以。加入 50,000+ 滿意用戶的行列。</p>
      <button class="cta-button" onclick="showPage('generator'); changeNav(null, 'generator')">免費開始生成</button>
    </div>
  </div>
</div>

<div id="generatorPage" class="page">
  <div class="container">
    <div class="generator-wrapper">
      <div class="generator-icon">🎨</div>
      <h2 class="generator-title">圖像生成器</h2>
      <p class="generator-subtitle">
        輸入你想看到的畫面、選擇藝術風格，點擊生成即可。所有圖像將自動保存到本地存儲，支持中文自動翻譯。
      </p>

      <div class="generator-form">
        <textarea id="prompt" placeholder="輸入你想看到的畫面... (例如: yellow banana cyberpunk city, 或 一隻香蕉在太空中)"></textarea>
        
        <div class="generator-controls">
          <select id="ratio">
            <option value="1024,1024">1:1 方形</option>
            <option value="1080,1920">9:16 手機豎屏</option>
            <option value="1920,1080">16:9 電腦橫屏</option>
            <option value="2048,2048">2K 方形超清</option>
          </select>
          <select id="style">
            <option value="none">無風格</option>
            <option value="photorealistic">寫實照片</option>
            <option value="anime">日系動漫</option>
            <option value="ghibli">吉卜力風格</option>
            <option value="pixel-art">像素藝術</option>
            <option value="cyberpunk">賽博龐克</option>
            <option value="oil-painting">油畫</option>
            <option value="watercolor">水彩畫</option>
          </select>
        </div>

        <button id="genBtn" class="generator-btn" onclick="generateImage()">
          🍌 立即生成
        </button>
      </div>

      <div class="result-area">
        <div class="result-loading">正在召喚香蕉之力...</div>
        <img id="resultImg" class="result-img" alt="Generated Image">
      </div>
    </div>
  </div>
</div>

<div id="toast"></div>

<div class="footer">
  <p>© 2026 NanoBanana AI. All rights reserved. | <a href="#">隱私政策</a> | <a href="#">服務條款</a> | <a href="#">開放 API</a></p>
  <p>遇到問題？<a href="#">聯繫支持</a> | 加入我們的<a href="#">社群</a> | <a href="#">狀態頁面</a></p>
  <p>Made with 🍌 by NanoBanana Team</p>
</div>

<script>
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageName + 'Page').classList.add('active');
}

function changeNav(event, pageName) {
  if (event) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
  }
  showPage(pageName);
}

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', function() {
    this.classList.toggle('open');
  });
});

const genBtn = document.getElementById('genBtn');
const promptIn = document.getElementById('prompt');
const resultImg = document.getElementById('resultImg');
const loading = document.querySelector('.result-loading');
const toast = document.getElementById('toast');

function showToast(msg, type = 'error') {
  toast.textContent = msg;
  toast.className = type;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
    toast.className = '';
  }, 4000);
}

async function generateImage() {
  const prompt = promptIn.value.trim();
  if (!prompt) {
    showToast('請輸入提示詞！', 'error');
    return;
  }
  
  genBtn.disabled = true;
  genBtn.textContent = '生成中...';
  resultImg.style.display = 'none';
  loading.style.display = 'block';

  const [width, height] = document.getElementById('ratio').value.split(',').map(Number);

  try {
    const res = await fetch('/_internal/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'nano-page'
      },
      body: JSON.stringify({
        prompt: prompt,
        model: 'nano-banana',
        width: width,
        height: height,
        style: document.getElementById('style').value,
        nologo: true
      })
    });

    if (res.status === 429) {
      const errData = await res.json();
      throw new Error(errData.error.message);
    }
    if (res.status === 403) {
      throw new Error('❌ 僅限 Nano 頁面使用此模型');
    }
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error?.message || '生成失敗');
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    resultImg.src = url;
    resultImg.style.display = 'block';
    showToast('✅ 圖像生成成功！', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    loading.style.display = 'none';
    genBtn.disabled = false;
    genBtn.textContent = '🍌 立即生成';
  }
}

document.getElementById('prompt').addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    generateImage();
  }
});
</script>

</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

function handleUI() {
  const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';
  
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets).filter(([key, style]) => style.category === categoryKey);
    if (stylesInCategory.length > 0) {
      styleOptionsHTML += `<optgroup label="${categoryInfo.icon} ${categoryInfo.name}">`;
      for (const [styleKey, styleConfig] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        styleOptionsHTML += `<option value="${styleKey}"${selected}>${styleConfig.icon} ${styleConfig.name}</option>`;
      }
      styleOptionsHTML += '</optgroup>';
    }
  }
  
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600}
.nav-menu{display:flex;gap:10px;align-items:center}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px;text-decoration:none}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.nav-btn.active{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border-color:#f59e0b}
.nav-btn.nano-btn:hover{border-color:#FACC15;background:rgba(250,204,21,0.1);color:#FACC15;box-shadow:0 0 10px rgba(250,204,21,0.2)}
.lang-btn{padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#ccc;cursor:pointer;font-size:12px;margin-left:10px}
.main-content{flex:1;display:flex;overflow:hidden}
.left-panel{width:320px;background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
.center-panel{flex:1;padding:20px;overflow-y:auto}
.right-panel{width:380px;background:rgba(255,255,255,0.03);border-left:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
@media(max-width:1024px){.main-content{flex-direction:column}.left-panel,.right-panel{width:100%;border:none;border-bottom:1px solid rgba(255,255,255,0.1)}}
.page{display:none}
.page.active{display:block}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:#e5e7eb}
input,textarea,select{width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:13px;transition:all 0.3s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
select{background-color:#1e293b!important;color:#e2e8f0!important;cursor:pointer}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.loading{text-align:center;padding:60px 20px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
</style>
</head>
<body>
<div class="container">
<div class="top-nav">
    <div class="nav-left">
        <div class="logo">🎨 Flux AI Pro <span class="badge">v${CONFIG.PROJECT_VERSION}</span></div>
        <div><div class="api-status">${authStatus}</div></div>
    </div>
    <div class="nav-menu">
        <a href="/nano" target="_blank" class="nav-btn nano-btn" style="border-color:rgba(250,204,21,0.5);color:#FACC15;margin-right:5px">
            🍌 Nano版
        </a>
        <button class="nav-btn active" data-page="generate"><span>🎨 生成圖像</span></button>
        <button class="nav-btn" data-page="history"><span>📚 歷史記錄</span> <span id="historyCount" style="background:rgba(245,158,11,0.2);padding:2px 8px;border-radius:10px;font-size:11px">0</span></button>
        <button class="lang-btn" id="langSwitch">EN / 繁中</button>
    </div>
</div>
<div id="generatePage" class="page active">
<div class="main-content">
<div class="left-panel">
<div class="section-title" style="color:#f59e0b;font-weight:700;margin-bottom:15px">⚙️ 生成參數</div>
<form id="generateForm">
<div class="form-group">
    <label>模型選擇</label>
    <select id="model">
        <optgroup label="🤖 GPT-Image Series">
        <option value="gptimage" selected>GPT-Image 🎨</option>
        <option value="gptimage-large">GPT-Image Large 🌟</option>
        </optgroup>
        <optgroup label="⚡ Z-Image Series">
        <option value="zimage">Z-Image Turbo ⚡ (6B)</option>
        </optgroup>
        <optgroup label="🎨 Flux Series">
        <option value="flux">Flux Standard</option>
        <option value="turbo">Flux Turbo ⚡</option>
        </optgroup>
        <optgroup label="🖼️ Kontext Series">
        <option value="kontext">Kontext 🎨 (Img2Img)</option>
        </optgroup>
    </select>
</div>
<div class="form-group"><label>尺寸預設</label><select id="size"><option value="square-1k" selected>Square 1024x1024</option><option value="square-1.5k">Square 1536x1536</option><option value="portrait-9-16-hd">Portrait 1080x1920</option><option value="landscape-16-9-hd">Landscape 1920x1080</option></select></div>
<div class="form-group"><label>藝術風格 🎨</label><select id="style">${styleOptionsHTML}</select></div>
<div class="form-group"><label>質量模式</label><select id="qualityMode"><option value="economy">Economy</option><option value="standard" selected>Standard</option><option value="ultra">Ultra HD</option></select></div>
<div class="form-group">
    <label>Seed (種子碼)</label>
    <div style="display:flex; gap:10px;">
        <input type="number" id="seed" value="-1" placeholder="Random (-1)" disabled style="flex:1; opacity: 0.7; cursor: not-allowed; font-family: monospace;">
        <button type="button" id="seedToggleBtn" class="btn" style="width:auto; padding:0 15px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);">🎲</button>
    </div>
</div>
<div class="form-group" style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; margin-top:15px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <label for="autoOptimize" style="margin:0; cursor:pointer;">✨ 自動優化</label>
            <div style="font-size:11px; color:#9ca3af; margin-top:2px;">自動調整 Steps 與 Guidance</div>
        </div>
        <input type="checkbox" id="autoOptimize" checked style="width:auto; width:20px; height:20px; cursor:pointer;">
    </div>
    
    <div id="advancedParams" style="display:none; margin-top:15px; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
        <div style="font-size:12px; color:#f59e0b; margin-bottom:10px; font-weight:bold;">🛠️ 進階參數</div>
        
        <div class="form-group">
            <label>生成步數 (Steps)</label>
            <input type="number" id="steps" value="25" min="1" max="50">
        </div>
        
        <div class="form-group">
            <label>引導係數 (Guidance)</label>
            <input type="number" id="guidanceScale" value="7.5" step="0.1" min="1" max="20">
        </div>
    </div>
</div>
<button type="submit" class="btn btn-primary" id="generateBtn" style="margin-top:10px;">🎨 開始生成</button>
</form>
</div>
<div class="center-panel">
<div id="results"><div class="empty-state"><p>尚未生成任何圖像</p></div></div>
</div>
<div class="right-panel">
<div class="form-group"><label>正面提示詞</label><textarea id="prompt" placeholder="Describe your image..." required></textarea></div>
<div class="form-group"><label>負面提示詞 (可選)</label><textarea id="negativePrompt" placeholder="What to avoid..." rows="4"></textarea></div>
<div class="form-group"><label>參考圖像 URL (Kontext 專用)</label><textarea id="referenceImages" placeholder="Image URLs separated by comma" rows="3"></textarea></div>
</div></div></div>
<div id="historyPage" class="page">
<div class="main-content" style="flex-direction:column;padding:20px">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px">
<div style="display:flex;gap:30px">
<div><div style="font-size:12px;color:#9ca3af">📊 總記錄數</div><div style="font-size:24px;font-weight:700" id="historyTotal">0</div></div>
<div><div style="font-size:12px;color:#9ca3af">💾 存儲空間 (永久)</div><div style="font-size:24px;font-weight:700" id="storageSize">0 KB</div></div>
</div>
<div style="display:flex;gap:10px">
<button class="btn" id="exportBtn" style="width:auto;padding:10px 20px;background:#10b981">📥 導出</button>
<button class="btn" id="clearBtn" style="width:auto;padding:10px 20px;background:#ef4444">🗑️ 清空</button>
</div>
</div>
<div id="historyList" style="padding:0 20px"><p>Loading history...</p></div>
</div></div>
</div>
</div>
<script>
document.querySelectorAll('[data-page]').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');
    document.querySelectorAll('[data-page]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}
