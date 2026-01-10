// =================================================================================
//  項目: Flux AI Pro - NanoBanana Edition (Stable Release)
//  版本: 10.6.7 (Restored Full Art Styles)
//  更新: 恢復完整的藝術風格庫 (30+ 種風格)、修復 JSON 解析錯誤
//  說明: 請依序組合四個部分的代碼，這是第一部分
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "10.6.7",
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
      description: "官方 AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌", confirmed: true, category: "special", description: "Nano Banana Pro 風格模型 (每小時限額 5 張)", max_size: 2048, pricing: { image_price: 0, currency: "free" }, input_modalities: ["text"], output_modalities: ["image"] },
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
  
  // 🔥 完整風格列表回歸
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
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy", category: "scifi", icon: "🌃", description: "賽博朋克未來科幻" },
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
      "nanobanana-pro": { min: 15, optimal: 20, max: 30 },
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
      "nanobanana-pro": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
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

// ====== RateLimiter: FIX - 增強 KV 讀取穩定性 ======
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
    const windowSize = 3600 * 1000; // 1小時
    const maxRequests = 5; 
    try {
      const rawData = await this.KV.get(key);
      let timestamps = [];
      
      // 🔥 關鍵修復：防止 JSON.parse 對 null 或空字串報錯
      if (rawData && typeof rawData === 'string' && rawData.trim().length > 0) {
          try {
              timestamps = JSON.parse(rawData);
              if (!Array.isArray(timestamps)) timestamps = [];
          } catch (e) {
              console.warn("KV Data Corrupted, resetting:", e);
              timestamps = [];
          }
      }

      const now = Date.now();
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return { allowed: false, reason: `🍌 香蕉能量耗盡！限額已滿 (5張/小時)。請休息 ${waitMin} 分鐘後再來。`, remaining: 0 };
      }
      
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
      return { allowed: true, remaining: maxRequests - timestamps.length };
    } catch (err) {
      console.error("KV System Error:", err);
      return { allowed: true }; // 系統錯誤時寬容放行
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
    const response = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) throw new Error(`Google API HTTP ${response.status}`);
    const data = await response.json();
    let translatedText = "";
    if (data && data[0] && Array.isArray(data[0])) { data[0].forEach(segment => { if (segment && segment[0]) translatedText += segment[0]; }); }
    if (!translatedText) throw new Error("Empty translation result");
    return { text: translatedText.trim(), translated: true, original: text, model: "google-gtx-free" };
  } catch (error) {
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
    return Math.min(score, 1.0);
  }
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
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
      optimizations.push("尺寸優化");
    }
    return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, quality_mode: qualityMode, hd_level: hdLevel, optimizations, size_upscaled: sizeUpscaled };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) { return { steps: userSteps, optimized: false, user_override: true }; }
    let baseSteps = 20;
    if (model === 'nanobanana-pro') baseSteps = 25;
    return { steps: baseSteps, optimized: true };
  }
  static optimizeGuidance(model, style, qualityMode = 'standard') { return 7.5; }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || style === '') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
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
    } catch (error) { return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; }
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

    let apiModel = model; 
    let basePrompt = prompt;
    
    // 中文翻譯邏輯
    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        logger.add("✅ Translation", { translated: basePrompt });
      }
    }

    let optimizedPrompt = basePrompt;
    let finalNegative = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      const hdOpt = HDOptimizer.optimize(basePrompt, negativePrompt, model, width, height, qualityMode, autoHD);
      optimizedPrompt = hdOpt.prompt;
      finalNegative = hdOpt.negativePrompt;
      finalWidth = hdOpt.width;
      finalHeight = hdOpt.height;
    }

    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = enhancedPrompt;
    if (enhancedNegative && enhancedNegative.trim()) fullPrompt = enhancedPrompt + " [negative: " + enhancedNegative + "]";
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    params.append('model', apiModel); 
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', nologo.toString());
    params.append('enhance', enhance.toString());
    params.append('private', privateMode.toString());
    if (referenceImages && referenceImages.length > 0) {
      params.append('image', referenceImages.join(','));
    }
    
    const headers = { 
        'User-Agent': 'Mozilla/5.0 (Worker; FluxAI)', 
        'Accept': 'image/*', 
        'Referer': 'https://pollinations.ai/' 
    };
    
    const authConfig = CONFIG.POLLINATIONS_AUTH;
    if (authConfig.enabled && authConfig.token) {
      headers['Authorization'] = `Bearer ${authConfig.token}`;
    }
    
    const url = baseUrl + '?' + params.toString();
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, 120000);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            const imageBuffer = await response.arrayBuffer();
            return { imageData: imageBuffer, contentType: contentType, url: response.url, model: model, seed: currentSeed, width: finalWidth, height: finalHeight, authenticated: !!authConfig.token };
          }
        }
        if (response.status === 401 || response.status === 403) throw new Error("Authentication failed: Check POLLINATIONS_API_KEY");
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      } catch (e) {
        logger.add("❌ API Error", { msg: e.message, retry: retry });
        if (retry === CONFIG.MAX_RETRIES - 1) throw e;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    if(CONFIG.PROVIDERS.pollinations.enabled) this.providers['pollinations'] = new PollinationsProvider(CONFIG.PROVIDERS.pollinations, env);
  }
  async generate(prompt, options, logger) {
    const provider = this.providers['pollinations'];
    if(!provider) throw new Error("No provider available");
    return [await provider.generate(prompt, options, logger)];
  }
}
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (env.POLLINATIONS_API_KEY) { 
        CONFIG.POLLINATIONS_AUTH.enabled = true; 
        CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY; 
    } 
    
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    
    try {
      if (url.pathname === '/nano') return handleNanoPage(request);
      if (url.pathname === '/_internal/generate') return handleInternalGenerate(request, env, ctx);
      return handleUI(request);
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({'Content-Type': 'application/json'}) });
    }
  }
};

// 🔥 FIX: 強健的 Request Body 解析，防止 400 錯誤
async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  
  try {
    let body;
    try {
        // 🔥 關鍵修復：安全地讀取 Body，先轉 text 再 parse，避免請求體為空時崩潰
        const textBody = await request.text();
        if (!textBody || textBody.trim() === "") throw new Error("Empty request body");
        body = JSON.parse(textBody);
    } catch (e) {
        throw new Error("Invalid JSON body: " + e.message);
    }

    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt is required");

    // Nano Banana Pro 限流檢查
    if (body.model === 'nanobanana-pro') {
        const source = request.headers.get('X-Source');
        // 簡單的安全檢查，防止外部濫用 API
        if (source !== 'nano-page') {
             return new Response(JSON.stringify({ 
                error: { message: "🍌 Access Denied", type: 'access_denied' } 
            }), { status: 403, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
        
        if (body.n && body.n > 1) { body.n = 1; }

        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        
        if (!check.allowed) {
            return new Response(JSON.stringify({ 
                error: { message: check.reason, type: 'rate_limit_exceeded' } 
            }), { status: 429, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
    }
    
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
    
    const options = { 
      provider: body.provider || null, 
      model: body.model || "gptimage", 
      width: Math.min(Math.max(width, 256), 2048), 
      height: Math.min(Math.max(height, 256), 2048), 
      numOutputs: 1, 
      seed: seedValue, 
      negativePrompt: body.negative_prompt || "", 
      guidance: null, 
      steps: null, 
      enhance: body.enhance === true, 
      nologo: body.nologo !== false, 
      privateMode: body.private !== false, 
      style: body.style || "none", 
      autoOptimize: body.auto_optimize !== false, 
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
        headers: { 'Content-Type': result.contentType || 'image/png', 'X-Seed': result.seed.toString(), ...corsHeaders() }
      });
    }
    
    return new Response(JSON.stringify({ error: "No image data returned" }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });

  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get() } }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}
// 🔥 Nano Page UI - Cyberpunk Yellow/Black
function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🍌 NanoBanana Pro - 控制台</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
:root { --primary: #FACC15; --bg-dark: #0f0f11; --panel-bg: rgba(30, 30, 35, 0.7); --border: rgba(255, 255, 255, 0.1); --text: #ffffff; --glass: blur(20px) saturate(180%); }
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: var(--bg-dark); color: var(--text); height: 100vh; overflow: hidden; display: flex; }
.app-container { display: flex; width: 100%; height: 100%; }
.sidebar { width: 380px; background: var(--panel-bg); backdrop-filter: var(--glass); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 24px; overflow-y: auto; z-index: 10; }
.main-stage { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #1a1a1d 0%, #000 100%); overflow: hidden; }
.logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
.logo-icon { font-size: 28px; animation: float 3s ease-in-out infinite; }
.logo-text h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
.logo-text .badge { background: var(--primary); color: #000; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 6px; vertical-align: top; }
.control-group { margin-bottom: 24px; }
label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; display:block; margin-bottom:8px; }
textarea, input[type="text"], select { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 14px; color: #fff; font-size: 14px; outline:none; font-family:inherit; }
textarea:focus, input:focus { border-color: var(--primary); background: rgba(0,0,0,0.5); }
.ratio-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.ratio-item { background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
.ratio-item.active { border-color: var(--primary); background: rgba(250, 204, 21, 0.1); color: var(--primary); }
.gen-btn { width: 100%; background: var(--primary); color: #000; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.3s; margin-top:10px; }
.gen-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(250, 204, 21, 0.4); }
.gen-btn:disabled { opacity: 0.7; cursor: not-allowed; filter: grayscale(1); }
.quota-box { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border); }
.quota-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-top:8px; }
.quota-fill { height: 100%; background: var(--primary); width: 100%; transition: width 0.5s ease; }
#resultImg { max-width: 90%; max-height: 85%; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); display: none; object-fit: contain; cursor: zoom-in; }
.placeholder-text { color: rgba(255,255,255,0.1); font-size: 80px; font-weight: 900; user-select: none; }
.loading-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 50; }
.banana-loader { font-size: 60px; animation: spin-bounce 1.5s infinite; margin-bottom: 20px; }
@keyframes spin-bounce { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); } }
@media (max-width: 900px) { body { flex-direction: column; overflow-y: auto; height: auto; } .sidebar { width: 100%; height: auto; border-right: none; } .main-stage { height: 50vh; order: -1; border-bottom: 1px solid var(--border); } }
</style>
</head>
<body>
    <div class="app-container">
        <div class="sidebar">
            <div class="logo-area"><div class="logo-icon">🍌</div><div class="logo-text"><h1>Nano Pro <span class="badge">PRO</span></h1><p style="color:#666; font-size:12px">Flux Engine • Direct API</p></div></div>
            <div class="control-group"><label>Prompt</label><textarea id="prompt" rows="4" placeholder="描述你想像中的畫面..."></textarea></div>
            <div class="control-group"><label>畫布比例</label>
                <div class="ratio-grid">
                    <div class="ratio-item active" data-w="1024" data-h="1024">1:1</div>
                    <div class="ratio-item" data-w="1080" data-h="1920">9:16</div>
                    <div class="ratio-item" data-w="1920" data-h="1080">16:9</div>
                    <div class="ratio-item" data-w="1080" data-h="1350">4:5</div>
                </div>
                <input type="hidden" id="width" value="1024"><input type="hidden" id="height" value="1024">
            </div>
            <div class="control-group"><label>風格</label>
                <select id="style">
                    <option value="none">✨ 智能無風格</option>
                    <option value="photorealistic">📷 寫實照片</option>
                    <option value="anime">🌸 日系動漫</option>
                    <option value="ghibli">🍃 吉卜力風格</option>
                    <option value="ink-drawing">🖌️ 水墨畫</option>
                    <option value="manga">📖 黑白漫畫</option>
                    <option value="cyberpunk">🌃 賽博龐克</option>
                    <option value="3d-render">🧊 3D 渲染</option>
                    <option value="oil-painting">🖼️ 油畫</option>
                    <option value="pixel-art">🎮 像素藝術</option>
                    <option value="watercolor">💧 水彩畫</option>
                    <option value="vintage">📻 復古懷舊</option>
                    <option value="ukiyo-e">🗾 浮世繪</option>
                </select>
            </div>
            <button id="genBtn" class="gen-btn">生成圖像 🍌</button>
            <div class="quota-box"><div style="display:flex;justify-content:space-between;font-size:12px;color:#999"><span>每小時能量</span><span id="quotaText">5 / 5</span></div><div class="quota-bar"><div id="quotaFill" class="quota-fill"></div></div></div>
        </div>
        <div class="main-stage">
            <div class="placeholder-text">NANO</div>
            <img id="resultImg" alt="Generated Image" onclick="window.open(this.src)">
            <div class="loading-overlay"><div class="banana-loader">🍌</div><div style="color:#FACC15;font-weight:bold">正在注入 AI 能量...</div></div>
        </div>
    </div>
<script>
    const els={prompt:document.getElementById('prompt'),width:document.getElementById('width'),height:document.getElementById('height'),style:document.getElementById('style'),genBtn:document.getElementById('genBtn'),img:document.getElementById('resultImg'),loader:document.querySelector('.loading-overlay'),quotaText:document.getElementById('quotaText'),quotaFill:document.getElementById('quotaFill')};
    let currentQuota=5,maxQuota=5;
    const now=new Date(),currentHourStr=now.toDateString()+'-'+now.getHours(),stored=localStorage.getItem('nano_quota_hourly_v3');
    if(stored){const data=JSON.parse(stored);if(data.hour===currentHourStr)currentQuota=data.val;else{localStorage.setItem('nano_quota_hourly_v3',JSON.stringify({hour:currentHourStr,val:maxQuota}));currentQuota=maxQuota;}}else{localStorage.setItem('nano_quota_hourly_v3',JSON.stringify({hour:currentHourStr,val:maxQuota}));}
    function updateQuotaUI(){els.quotaText.textContent=\`\${currentQuota} / \${maxQuota}\`;els.quotaFill.style.width=(currentQuota/maxQuota)*100+'%';if(currentQuota<=0){els.genBtn.disabled=true;els.genBtn.textContent='能量耗盡 (請稍後)';}}
    updateQuotaUI();
    document.querySelectorAll('.ratio-item').forEach(r=>{r.onclick=()=>{document.querySelectorAll('.ratio-item').forEach(i=>i.classList.remove('active'));r.classList.add('active');els.width.value=r.dataset.w;els.height.value=r.dataset.h;}});
    els.genBtn.onclick=async()=>{
        const p=els.prompt.value.trim();if(!p)return alert("請輸入提示詞");if(currentQuota<=0)return;
        els.genBtn.disabled=true;els.loader.style.display='flex';els.img.style.display='none';
        try{
            const res=await fetch('/_internal/generate',{method:'POST',headers:{'Content-Type':'application/json','X-Source':'nano-page'},body:JSON.stringify({prompt:p,model:'nanobanana-pro',width:parseInt(els.width.value),height:parseInt(els.height.value),style:els.style.value,n:1,nologo:true})});
            if(res.status===429){currentQuota=0;localStorage.setItem('nano_quota_hourly_v3',JSON.stringify({hour:currentHourStr,val:0}));updateQuotaUI();throw new Error("限額已滿");}
            if(!res.ok) throw new Error((await res.json()).error?.message||"生成失敗");
            els.img.src=URL.createObjectURL(await res.blob());els.img.style.display='block';document.querySelector('.placeholder-text').style.display='none';
            if(currentQuota>0){currentQuota--;localStorage.setItem('nano_quota_hourly_v3',JSON.stringify({hour:currentHourStr,val:currentQuota}));updateQuotaUI();}
        }catch(e){alert("Error: "+e.message);}finally{if(currentQuota>0)els.genBtn.disabled=false;els.loader.style.display='none';}
    };
</script></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

// 🔥 Main UI (Standard Dashboard)
function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro Dashboard</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f172a;color:#fff;margin:0;padding:20px;display:flex;flex-direction:column;align-items:center;min-height:100vh}
.container{width:100%;max-width:600px;background:#1e293b;padding:20px;border-radius:16px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
h1{color:#38bdf8;text-align:center;margin-bottom:20px}
.btn{display:block;width:100%;padding:15px;margin:10px 0;background:#3b82f6;color:white;text-align:center;text-decoration:none;border-radius:8px;font-weight:bold;transition:0.2s}
.btn:hover{background:#2563eb}
.btn-nano{background:#FACC15;color:black}
.btn-nano:hover{background:#EAB308}
</style>
</head>
<body>
<div class="container">
    <h1>🎨 Flux AI Pro</h1>
    <p style="text-align:center;color:#94a3b8;margin-bottom:30px">Professional AI Image Generation Gateway</p>
    <a href="/nano" class="btn btn-nano">🍌 Go to Nano Banana Pro</a>
    <div style="margin-top:20px;padding:15px;background:#334155;border-radius:8px">
        <h3 style="margin-top:0">System Status</h3>
        <div style="font-size:14px;color:#cbd5e1">
            <p>✅ Worker Version: ${CONFIG.PROJECT_VERSION}</p>
            <p>✅ API Endpoint: gen.pollinations.ai</p>
            <p>✅ KV Connection: Active</p>
        </div>
    </div>
</div>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}
