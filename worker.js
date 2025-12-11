// =================================================================================
//  項目: multi-provider-image-generator
//  版本: 9.1.0 (生成計時器 + 完整歷史功能)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-12
//  新功能: 計時器 | 歷史記錄 | 4K支持 | 繁中文字渲染 | 專屬面板
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "multi-provider-image-generator",
  PROJECT_VERSION: "9.1.0",
  API_MASTER_KEY: "1",
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://image.pollinations.ai",
      type: "direct",
      auth_mode: "free",
      requires_key: false,
      enabled: true,
      default: true,
      description: "完全免費的 AI 圖像生成服務",
      features: {
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true,
        quality_modes: true,
        auto_translate: true,
        image_to_image: true,
        multi_image_fusion: true,
        chinese_text_render: true,
        ultra_hd_4k: true
      },
      models: [
        { id: "flux", name: "Flux", confirmed: true, category: "flux", description: "均衡速度與質量", max_size: 2048 },
        { id: "flux-realism", name: "Flux Realism", confirmed: true, category: "flux", description: "超寫實風格", max_size: 2048 },
        { id: "flux-anime", name: "Flux Anime", confirmed: true, category: "flux", description: "日系動漫風格", max_size: 2048 },
        { id: "flux-3d", name: "Flux 3D", confirmed: true, category: "flux", description: "3D 渲染風格", max_size: 2048 },
        { id: "flux-pro", name: "Flux Pro", confirmed: true, category: "flux", description: "專業版最高質量", max_size: 2048 },
        { id: "any-dark", name: "Any Dark", confirmed: true, category: "flux", description: "暗黑風格", max_size: 2048 },
        { id: "turbo", name: "Turbo", confirmed: true, category: "flux", description: "極速生成", max_size: 2048 },
        { id: "flux-1.1-pro", name: "Flux 1.1 Pro 🔥", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "最新 Flux 1.1", max_size: 2048 },
        { id: "flux-kontext", name: "Flux Kontext 🎨", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯標準版", max_size: 2048 },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro 💎", confirmed: false, fallback: ["flux-kontext", "flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯專業版", max_size: 2048 },
        { id: "nanobanana", name: "Nano Banana 🍌", confirmed: true, category: "gemini", description: "Google Gemini 2.5 Flash (快速 1-2K)", max_size: 2048, supports_chinese_text: true },
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌💎", confirmed: true, category: "gemini", description: "Gemini 3 Pro (4K+繁中文字+14圖融合)", max_size: 4096, supports_chinese_text: true, supports_multi_image: true, ultra_hd: true },
        { id: "sd3", name: "Stable Diffusion 3 ⚡", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "SD3 標準版", max_size: 2048 },
        { id: "sd3.5-large", name: "SD 3.5 Large 🔥", confirmed: false, fallback: ["sd3", "flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "SD 3.5 大模型", max_size: 2048 },
        { id: "sd3.5-turbo", name: "SD 3.5 Turbo ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SD 3.5 快速版", max_size: 2048 },
        { id: "sdxl", name: "SDXL 📐", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "經典 SDXL", max_size: 2048 },
        { id: "sdxl-lightning", name: "SDXL Lightning ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SDXL 極速版", max_size: 2048 }
      ],
      rate_limit: null,
      max_size: { width: 4096, height: 4096 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    "chinese-poster": { name: "中文海報 🎭", prompt: "Chinese poster design, bold Traditional Chinese characters, vibrant colors, modern layout, professional typography, high contrast, clean composition", negative: "blurry text, unreadable characters, poor typography, messy layout" },
    "chinese-calligraphy": { name: "中文書法 ✍️", prompt: "Traditional Chinese calligraphy, brush strokes, ink painting style, elegant characters, artistic composition, classical aesthetics, rice paper texture", negative: "digital font, printed text, western style" },
    "chinese-logo": { name: "中文Logo 🎨", prompt: "Professional Chinese logo design, clean Traditional Chinese characters, minimalist, modern branding, vector style, sharp edges, memorable design", negative: "complex, cluttered, low quality, blurry" },
    "japanese-manga": { name: "日本漫畫 🇯🇵", prompt: "Japanese manga style, manga art, black and white manga, detailed linework, screentone, manga panel", negative: "photograph, realistic, 3d render, western comic" },
    "anime": { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    "vector": { name: "矢量圖 📐", prompt: "vector art, flat design, clean lines, minimalist, geometric shapes, vector illustration", negative: "photograph, realistic, textured, noisy" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic", negative: "photograph, digital art, anime" },
    "watercolor": { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted", negative: "photograph, digital, sharp edges" },
    "pixel-art": { name: "像素藝術 👾", prompt: "pixel art, 8-bit style, retro pixel graphics, pixelated", negative: "high resolution, smooth, realistic" },
    "cyberpunk": { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life", negative: "natural, rustic, medieval" },
    "fantasy": { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration", negative: "modern, realistic, mundane" },
    "photorealistic": { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus", negative: "anime, cartoon, illustration, painting" },
    "studio-ghibli": { name: "吉卜力風格 🌿", prompt: "Studio Ghibli style, Ghibli art, Hayao Miyazaki style, whimsical, detailed background", negative: "dark, gritty, realistic" },
    "comic-book": { name: "美式漫畫 💥", prompt: "comic book style, American comic art, bold lines, vibrant colors, superhero comic", negative: "photograph, manga, realistic" },
    "sketch": { name: "素描 ✏️", prompt: "pencil sketch, hand-drawn, sketch art, graphite drawing, artistic sketch", negative: "colored, painted, digital" }
  },
  
  NANO_BANANA_PRESETS: {
    "chinese-festival-poster": {
      name: "中國節日海報 🧧",
      prompt: "Traditional Chinese festival poster design, bold red and gold colors, beautiful Traditional Chinese calligraphy displaying '新年快樂' or '恭喜發財', intricate patterns, festive atmosphere, professional graphic design, 4K ultra HD",
      negative: "blurry text, unreadable, poor quality, western style",
      recommended_size: "2048x2048"
    },
    "chinese-menu": {
      name: "中文菜單設計 🍜",
      prompt: "Elegant Chinese restaurant menu design, clear Traditional Chinese dish names, beautiful food photography, professional typography, modern layout, appetizing presentation, 4K quality",
      negative: "unclear text, messy layout, poor food presentation",
      recommended_size: "1536x2048"
    },
    "chinese-brand-logo": {
      name: "中文品牌Logo 🏮",
      prompt: "Modern Chinese brand logo, creative Traditional Chinese characters integration, minimalist design, memorable, professional branding, vector quality, clean composition",
      negative: "complex, cluttered, amateur, low resolution",
      recommended_size: "1024x1024"
    },
    "chinese-quote": {
      name: "中文名言金句 💬",
      prompt: "Inspirational Chinese quote design, elegant Traditional Chinese characters, artistic typography, beautiful background, motivational aesthetic, suitable for social media, 4K HD",
      negative: "hard to read, poor font choice, cluttered",
      recommended_size: "1536x1536"
    }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "turbo": { min: 4, optimal: 8, max: 12 },
      "sdxl-lightning": { min: 4, optimal: 6, max: 10 },
      "sd3.5-turbo": { min: 8, optimal: 12, max: 20 },
      "flux": { min: 15, optimal: 20, max: 30 },
      "flux-anime": { min: 15, optimal: 20, max: 30 },
      "flux-3d": { min: 15, optimal: 22, max: 35 },
      "sd3": { min: 18, optimal: 25, max: 35 },
      "sdxl": { min: 20, optimal: 28, max: 40 },
      "flux-realism": { min: 20, optimal: 28, max: 40 },
      "flux-pro": { min: 25, optimal: 32, max: 45 },
      "flux-1.1-pro": { min: 20, optimal: 28, max: 40 },
      "sd3.5-large": { min: 25, optimal: 35, max: 50 },
      "flux-kontext": { min: 22, optimal: 30, max: 40 },
      "flux-kontext-pro": { min: 25, optimal: 35, max: 45 },
      "any-dark": { min: 18, optimal: 24, max: 35 },
      "nanobanana": { min: 15, optimal: 22, max: 30 },
      "nanobanana-pro": { min: 25, optimal: 35, max: 50 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 },
      ultra_4k: { threshold: 4096 * 4096, multiplier: 1.5 }
    },
    STYLE_ADJUSTMENT: {
      "photorealistic": 1.1,
      "oil-painting": 1.05,
      "watercolor": 0.95,
      "pixel-art": 0.85,
      "sketch": 0.9,
      "vector": 0.85,
      "chinese-poster": 1.15,
      "chinese-calligraphy": 1.2,
      "chinese-logo": 1.1,
      "default": 1.0
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: {
        name: "經濟模式",
        description: "快速出圖,適合測試",
        min_resolution: 1024,
        max_resolution: 2048,
        steps_multiplier: 0.85,
        guidance_multiplier: 0.9,
        hd_level: "basic"
      },
      standard: {
        name: "標準模式",
        description: "平衡質量與速度",
        min_resolution: 1280,
        max_resolution: 2048,
        steps_multiplier: 1.0,
        guidance_multiplier: 1.0,
        hd_level: "enhanced"
      },
      ultra: {
        name: "超高清模式",
        description: "極致質量,耗時較長",
        min_resolution: 1536,
        max_resolution: 4096,
        steps_multiplier: 1.35,
        guidance_multiplier: 1.15,
        hd_level: "maximum",
        force_upscale: true
      },
      ultra_4k: {
        name: "4K超高清",
        description: "Nano Banana Pro 專屬",
        min_resolution: 2048,
        max_resolution: 4096,
        steps_multiplier: 1.5,
        guidance_multiplier: 1.2,
        hd_level: "ultra_4k",
        force_upscale: true,
        exclusive_models: ["nanobanana-pro"]
      }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, extremely detailed, sharp focus, crisp, clear, professional, 8k uhd, masterpiece, fine details",
      maximum: "ultra high quality, extremely detailed, razor sharp focus, crystal clear, professional grade, 8k uhd resolution, masterpiece quality, fine details, intricate details, perfect clarity",
      ultra_4k: "ultra high definition 4K quality, extreme detail precision, razor sharp text rendering, crystal clear Traditional Chinese characters, professional grade typography, pixel-perfect clarity, masterpiece quality, intricate fine details"
    },
    HD_NEGATIVE: "low quality, blurry, pixelated, low resolution, jpeg artifacts, compression artifacts, bad quality, distorted, noisy, grainy, poor details, soft focus, out of focus, unreadable text, fuzzy characters",
    CHINESE_TEXT_BOOST: "perfect Traditional Chinese character rendering, clear readable text, professional typography, high definition Chinese font, crisp character strokes, perfect text clarity",
    MODEL_QUALITY_PROFILES: {
      "flux-realism": { priority: "ultra_detail", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "flux-pro": { priority: "maximum_quality", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.3, guidance_boost: 1.2, recommended_quality: "ultra" },
      "flux-1.1-pro": { priority: "maximum_quality", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "sd3.5-large": { priority: "high_detail", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-anime": { priority: "clarity", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-3d": { priority: "detail", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "nanobanana": { priority: "balanced", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "standard", supports_chinese: true },
      "nanobanana-pro": { priority: "ultra_4k_detail", min_resolution: 2048, max_resolution: 4096, optimal_steps_boost: 1.5, guidance_boost: 1.25, recommended_quality: "ultra_4k", supports_chinese: true, supports_multi_image: true },
      "turbo": { priority: "speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.7, guidance_boost: 0.85, recommended_quality: "economy" },
      "sdxl-lightning": { priority: "speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.6, guidance_boost: 0.8, recommended_quality: "economy" },
      "sd3.5-turbo": { priority: "balanced_speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.8, guidance_boost: 0.9, recommended_quality: "economy" }
    },
    SIZE_RECOMMENDATION: {
      min_recommended: 1024,
      auto_upscale_threshold: 768,
      max_size: 4096,
      upscale_rules: {
        "512x512": { suggested: "1024x1024", multiplier: 2 },
        "768x768": { suggested: "1536x1536", multiplier: 2 },
        "640x640": { suggested: "1280x1280", multiplier: 2 },
        "512x768": { suggested: "1024x1536", multiplier: 2 },
        "768x512": { suggested: "1536x1024", multiplier: 2 },
        "1024x1024": { suggested: "2048x2048", multiplier: 2 },
        "1536x1536": { suggested: "3072x3072", multiplier: 2 },
        "2048x2048": { suggested: "4096x4096", multiplier: 2 }
      }
    }
  },
  
  FETCH_TIMEOUT: 90000,
  MAX_RETRIES: 3,
  
  PRESET_SIZES: {
    "square-1k": { width: 1024, height: 1024, name: "方形 1K" },
    "square-2k": { width: 2048, height: 2048, name: "方形 2K" },
    "square-4k": { width: 4096, height: 4096, name: "方形 4K 🍌", exclusive: ["nanobanana-pro"] },
    "portrait": { width: 768, height: 1344, name: "豎屏 9:16" },
    "portrait-2k": { width: 1536, height: 2688, name: "豎屏 2K" },
    "landscape": { width: 1344, height: 768, name: "橫屏 16:9" },
    "landscape-2k": { width: 2688, height: 1536, name: "橫屏 2K" },
    "standard-portrait": { width: 768, height: 1024, name: "標準豎屏 3:4" },
    "standard-landscape": { width: 1024, height: 768, name: "標準橫屏 4:3" },
    "poster-vertical": { width: 1536, height: 2048, name: "海報豎版 🍌" },
    "poster-horizontal": { width: 2048, height: 1536, name: "海報橫版 🍌" },
    "ultrawide": { width: 1536, height: 640, name: "超寬屏 21:9" },
    "ultrawide-portrait": { width: 640, height: 1536, name: "超豎屏 9:21" },
    "custom": { width: 1024, height: 1024, name: "自定義" }
  },
  
  HISTORY: {
    MAX_ITEMS: 100,
    STORAGE_KEY: "flux_ai_history"
  }
};

class Logger {
    constructor() { this.logs = []; }
    add(step, data) {
        const time = new Date().toISOString().split('T')[1].slice(0, -1);
        this.logs.push({ time, step, data });
        console.log(`[${step}]`, data);
    }
    get() { return this.logs; }
}

async function translateToEnglish(text, env) {
    try {
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        if (!hasChinese) {
            return { text: text, translated: false };
        }
        if (env?.AI) {
            const response = await env.AI.run("@cf/meta/m2m100-1.2b", {
                text: text,
                source_lang: "chinese",
                target_lang: "english"
            });
            return { 
                text: response.translated_text || text, 
                translated: true,
                original: text
            };
        }
        return { text: text, translated: false };
    } catch (e) {
        console.error("Translation error:", e);
        return { text: text, translated: false, error: e.message };
    }
}

class ChineseTextOptimizer {
    static optimize(prompt, model) {
        const modelConfig = CONFIG.PROVIDERS.pollinations.models.find(m => m.id === model);
        if (!modelConfig?.supports_chinese_text) {
            return { prompt: prompt, optimized: false };
        }
        
        const hasChinese = /[\u4e00-\u9fa5]/.test(prompt);
        if (!hasChinese) {
            return { prompt: prompt, optimized: false };
        }
        
        const chineseBoost = CONFIG.HD_OPTIMIZATION.CHINESE_TEXT_BOOST;
        const optimizedPrompt = `${prompt}, ${chineseBoost}`;
        
        return { 
            prompt: optimizedPrompt, 
            optimized: true,
            boost_applied: chineseBoost
        };
    }
}

class PromptAnalyzer {
    static analyzeComplexity(prompt) {
        const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd', 'calligraphy', 'typography', 'text', 'characters'];
        let score = 0;
        const lowerPrompt = prompt.toLowerCase();
        complexKeywords.forEach(keyword => { if (lowerPrompt.includes(keyword)) score += 0.1; });
        if (prompt.length > 100) score += 0.2;
        if (prompt.length > 200) score += 0.3;
        if (prompt.split(',').length > 5) score += 0.15;
        const hasChinese = /[\u4e00-\u9fa5]/.test(prompt);
        if (hasChinese) score += 0.2;
        return Math.min(score, 1.0);
    }
    static recommendQualityMode(prompt, model) {
        const complexity = this.analyzeComplexity(prompt);
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        
        if (model === 'nanobanana-pro') return 'ultra_4k';
        if (profile?.recommended_quality) return profile.recommended_quality;
        if (complexity > 0.7) return 'ultra';
        if (complexity > 0.4) return 'standard';
        return 'economy';
    }
}

class HDOptimizer {
    static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true, enableChineseBoost = false) {
        if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) {
            return { prompt: prompt, negativePrompt: negativePrompt, width: width, height: height, optimized: false };
        }
        const hdConfig = CONFIG.HD_OPTIMIZATION;
        const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
        const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
        const optimizations = [];
        
        const hdLevel = modeConfig.hd_level;
        let enhancedPrompt = prompt;
        
        if (hdConfig.HD_PROMPTS[hdLevel]) {
            const hdBoost = hdConfig.HD_PROMPTS[hdLevel];
            enhancedPrompt = `${prompt}, ${hdBoost}`;
            optimizations.push(`HD增強: ${hdLevel}`);
        }
        
        if (enableChineseBoost && profile?.supports_chinese) {
            const chineseOptimization = ChineseTextOptimizer.optimize(enhancedPrompt, model);
            if (chineseOptimization.optimized) {
                enhancedPrompt = chineseOptimization.prompt;
                optimizations.push(`中文渲染增強`);
            }
        }
        
        let enhancedNegative = negativePrompt || "";
        if (qualityMode !== 'economy') {
            enhancedNegative = enhancedNegative ? `${enhancedNegative}, ${hdConfig.HD_NEGATIVE}` : hdConfig.HD_NEGATIVE;
            optimizations.push(`負面提示詞: 高清過濾`);
        }
        
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
            optimizations.push(`尺寸優化: ${width}x${height} → ${finalWidth}x${finalHeight}`);
        }
        
        if (finalWidth > maxModelRes || finalHeight > maxModelRes) {
            const scale = maxModelRes / Math.max(finalWidth, finalHeight);
            finalWidth = Math.round(finalWidth * scale / 64) * 64;
            finalHeight = Math.round(finalHeight * scale / 64) * 64;
            optimizations.push(`模型限制: 調整至 ${finalWidth}x${finalHeight}`);
        }
        
        return { 
            prompt: enhancedPrompt, 
            negativePrompt: enhancedNegative, 
            width: finalWidth, 
            height: finalHeight, 
            optimized: true, 
            quality_mode: qualityMode, 
            hd_level: hdLevel, 
            optimizations: optimizations, 
            size_upscaled: sizeUpscaled,
            chinese_boost_applied: enableChineseBoost && profile?.supports_chinese
        };
    }
}

class ParameterOptimizer {
    static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
        if (userSteps !== null && userSteps !== -1) {
            const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode);
            return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true };
        }
        return this.calculateOptimalSteps(model, width, height, style, qualityMode);
    }
    
    static calculateOptimalSteps(model, width, height, style, qualityMode = 'standard') {
        const rules = CONFIG.OPTIMIZATION_RULES;
        const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseSteps = modelRule.optimal;
        const reasoning = [];
        reasoning.push(`${model}: ${baseSteps}步`);
        
        const totalPixels = width * height;
        let sizeMultiplier = 1.0;
        
        if (totalPixels >= rules.SIZE_MULTIPLIER.ultra_4k.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.ultra_4k.multiplier;
            reasoning.push(`4K超大 x${sizeMultiplier}`);
        } else if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier;
            reasoning.push(`超大 x${sizeMultiplier}`);
        } else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier;
            reasoning.push(`大尺寸 x${sizeMultiplier}`);
        } else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier;
        } else {
            sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier;
        }
        
        let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
        let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
        if (qualityMultiplier !== 1.0) reasoning.push(`${modeConfig.name} x${qualityMultiplier}`);
        
        let profileBoost = profile?.optimal_steps_boost || 1.0;
        if (profileBoost !== 1.0) reasoning.push(`模型配置 x${profileBoost}`);
        
        let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
        optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
        
        reasoning.push(`→ ${optimizedSteps}步`);
        return { 
            steps: optimizedSteps, 
            optimized: true, 
            base_steps: baseSteps, 
            size_multiplier: sizeMultiplier, 
            style_multiplier: styleMultiplier, 
            quality_multiplier: qualityMultiplier, 
            profile_boost: profileBoost, 
            min_steps: modelRule.min, 
            max_steps: modelRule.max, 
            reasoning: reasoning.join(' ') 
        };
    }
    
    static optimizeGuidance(model, style, qualityMode = 'standard') {
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseGuidance = 7.5;
        
        if (model.includes('turbo') || model.includes('lightning')) {
            baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
        } else if (style === 'photorealistic' || style.includes('chinese')) {
            baseGuidance = 8.5;
        } else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) {
            baseGuidance = 6.5;
        }
        
        let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
        let profileBoost = profile?.guidance_boost || 1.0;
        return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
    }
}

class StyleProcessor {
    static applyStyle(prompt, style, negativePrompt) {
        const styleConfig = CONFIG.STYLE_PRESETS[style] || CONFIG.NANO_BANANA_PRESETS[style];
        if (!styleConfig || style === 'none') {
            return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
        }
        let enhancedPrompt = prompt;
        if (styleConfig.prompt) enhancedPrompt = `${prompt}, ${styleConfig.prompt}`;
        
        let enhancedNegative = negativePrompt || "";
        if (styleConfig.negative) {
            enhancedNegative = enhancedNegative ? `${enhancedNegative}, ${styleConfig.negative}` : styleConfig.negative;
        }
        return { enhancedPrompt, enhancedNegative };
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
        if (error.name === 'AbortError') throw new Error(`Request timeout after ${timeout}ms`);
        throw error;
    }
}

class PollinationsProvider {
    constructor(config, env) {
        this.config = config;
        this.name = config.name;
        this.env = env;
    }
    
    async generate(prompt, options, logger) {
        const { 
            model = "flux", 
            width = 1024, 
            height = 1024, 
            seed = -1, 
            negativePrompt = "", 
            guidance = null, 
            steps = null, 
            enhance = false, 
            nologo = true, 
            privateMode = true, 
            style = "none", 
            autoOptimize = true, 
            autoHD = true, 
            qualityMode = 'standard',
            enableChineseBoost = false
        } = options;
        
        let hdOptimization = null;
        let finalPrompt = prompt;
        let finalNegativePrompt = negativePrompt;
        let finalWidth = width;
        let finalHeight = height;
        
        const modelConfig = this.config.models.find(m => m.id === model);
        const is4KModel = modelConfig?.max_size === 4096;
        const supportsChineseText = modelConfig?.supports_chinese_text || false;
        
        const promptComplexity = PromptAnalyzer.analyzeComplexity(prompt);
        const recommendedQuality = PromptAnalyzer.recommendQualityMode(prompt, model);
        logger.add("🧠 Prompt Analysis", { 
            complexity: (promptComplexity * 100).toFixed(1) + '%', 
            recommended_quality: recommendedQuality, 
            selected_quality: qualityMode,
            is_4k_model: is4KModel,
            supports_chinese: supportsChineseText
        });
        
        if (autoHD) {
            hdOptimization = HDOptimizer.optimize(
                prompt, 
                negativePrompt, 
                model, 
                width, 
                height, 
                qualityMode, 
                autoHD,
                enableChineseBoost && supportsChineseText
            );
            finalPrompt = hdOptimization.prompt;
            finalNegativePrompt = hdOptimization.negativePrompt;
            finalWidth = hdOptimization.width;
            finalHeight = hdOptimization.height;
            
            if (hdOptimization.optimized) {
                logger.add("🎨 HD Optimization", { 
                    mode: qualityMode, 
                    hd_level: hdOptimization.hd_level, 
                    original: `${width}x${height}`, 
                    optimized: `${finalWidth}x${finalHeight}`, 
                    upscaled: hdOptimization.size_upscaled, 
                    chinese_boost: hdOptimization.chinese_boost_applied,
                    details: hdOptimization.optimizations 
                });
            }
        }
        
        let finalSteps = steps;
        let finalGuidance = guidance;
        
        if (autoOptimize) {
            const stepsOptimization = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode, steps);
            finalSteps = stepsOptimization.steps;
            logger.add("🎯 Steps Optimization", { steps: stepsOptimization.steps, reasoning: stepsOptimization.reasoning });
            
            if (guidance === null) {
                finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
            } else {
                finalGuidance = guidance;
            }
        } else {
            finalSteps = steps || 20;
            finalGuidance = guidance || 7.5;
        }
        
        const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNegativePrompt);
        
        const translation = await translateToEnglish(enhancedPrompt, this.env);
        const finalPromptForAPI = translation.text;
        
        if (translation.translated) {
            logger.add("🌐 Auto Translation", { 
                original_zh: translation.original,
                translated_en: finalPromptForAPI,
                success: true
            });
        }
        
        const modelsToTry = [model];
        if (modelConfig?.experimental && modelConfig?.fallback) {
            modelsToTry.push(...modelConfig.fallback);
        }
        
        logger.add("🎨 Generation Config", { 
            provider: this.name, 
            model: model, 
            dimensions: `${finalWidth}x${finalHeight}`,
            is_4k: finalWidth >= 4096 || finalHeight >= 4096,
            quality_mode: qualityMode, 
            hd_optimized: autoHD && hdOptimization?.optimized, 
            auto_translated: translation.translated,
            chinese_boost: enableChineseBoost && supportsChineseText,
            steps: finalSteps, 
            guidance: finalGuidance 
        });
        
        const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
        let fullPrompt = finalPromptForAPI;
        if (enhancedNegative && enhancedNegative.trim()) {
            fullPrompt = `${finalPromptForAPI} [negative: ${enhancedNegative}]`;
        }
        
        const encodedPrompt = encodeURIComponent(fullPrompt);
        
        for (const tryModel of modelsToTry) {
            for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
                try {
                    let url = `${this.config.endpoint}/prompt/${encodedPrompt}`;
                    const params = new URLSearchParams();
                    params.append('model', tryModel);
                    params.append('width', finalWidth.toString());
                    params.append('height', finalHeight.toString());
                    params.append('seed', currentSeed.toString());
                    params.append('nologo', nologo.toString());
                    params.append('enhance', enhance.toString());
                    params.append('private', privateMode.toString());
                    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
                    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
                    url += '?' + params.toString();
                    
                    const response = await fetchWithTimeout(url, { 
                        method: 'GET', 
                        headers: { 
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
                            'Accept': 'image/*,*/*', 
                            'Accept-Encoding': 'gzip, deflate, br', 
                            'Connection': 'keep-alive', 
                            'Referer': 'https://pollinations.ai/' 
                        } 
                    }, 90000);
                    
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.startsWith('image/')) {
                            logger.add(`✅ Success`, { 
                                url: response.url, 
                                used_model: tryModel, 
                                final_size: `${finalWidth}x${finalHeight}`,
                                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                                quality_mode: qualityMode, 
                                hd_optimized: autoHD && hdOptimization?.optimized, 
                                auto_translated: translation.translated,
                                chinese_optimized: enableChineseBoost && supportsChineseText,
                                seed: currentSeed 
                            });
                            
                            return { 
                                url: response.url, 
                                provider: this.name, 
                                model: tryModel, 
                                requested_model: model, 
                                seed: currentSeed, 
                                style: style, 
                                steps: finalSteps, 
                                guidance: finalGuidance, 
                                width: finalWidth, 
                                height: finalHeight,
                                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                                quality_mode: qualityMode, 
                                prompt_complexity: promptComplexity, 
                                hd_optimized: autoHD && hdOptimization?.optimized, 
                                hd_details: hdOptimization, 
                                auto_translated: translation.translated,
                                chinese_text_optimized: enableChineseBoost && supportsChineseText,
                                cost: "FREE", 
                                fallback_used: tryModel !== model, 
                                auto_optimized: autoOptimize 
                            };
                        } else {
                            throw new Error(`Invalid content type: ${contentType}`);
                        }
                    } else {
                        throw new Error(`HTTP ${response.status}`);
                    }
                } catch (e) {
                    if (retry < CONFIG.MAX_RETRIES - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    }
                }
            }
        }
        throw new Error(`All models failed`);
    }
}

class MultiProviderRouter {
    constructor(apiKeys = {}, env = null) {
        this.providers = {};
        this.apiKeys = apiKeys;
        this.env = env;
        for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
            if (config.enabled) {
                if (key === 'pollinations') {
                    this.providers[key] = new PollinationsProvider(config, env);
                }
            }
        }
    }
    
    getProvider(providerName = null) {
        if (providerName && this.providers[providerName]) {
            return { name: providerName, instance: this.providers[providerName] };
        }
        const defaultName = CONFIG.DEFAULT_PROVIDER;
        if (this.providers[defaultName]) {
            return { name: defaultName, instance: this.providers[defaultName] };
        }
        const firstProvider = Object.keys(this.providers)[0];
        if (firstProvider) {
            return { name: firstProvider, instance: this.providers[firstProvider] };
        }
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

function corsHeaders(additionalHeaders = {}) {
    return { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 
        'Access-Control-Max-Age': '86400', 
        ...additionalHeaders 
    };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    try {
      if (url.pathname === '/') {
        return handleUI(request);
      } else if (url.pathname === '/v1/chat/completions') {
        return handleChatCompletions(request, env);
      } else if (url.pathname === '/v1/images/generations') {
        return handleImageGenerations(request, env);
      } else if (url.pathname === '/v1/models') {
        return handleModelsRequest();
      } else if (url.pathname === '/v1/providers') {
        return handleProvidersRequest();
      } else if (url.pathname === '/v1/styles') {
        return handleStylesRequest();
      } else if (url.pathname === '/health') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          version: CONFIG.PROJECT_VERSION, 
          timestamp: new Date().toISOString(),
          features: [
            '4K Ultra HD Support',
            'Chinese Text Rendering',
            'Generation Timer',
            'Full History',
            '19 Models',
            '15+ Styles',
            'Nano Banana Enhanced'
          ]
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        return new Response(JSON.stringify({ 
          project: CONFIG.PROJECT_NAME, 
          version: CONFIG.PROJECT_VERSION, 
          features: [
            '19 Models', 
            '15+ Styles', 
            '4 Quality Modes', 
            'Smart Analysis', 
            'Auto HD', 
            '4K Support 🍌', 
            'Chinese Text Optimization 🍌',
            'Generation Timer ⏱️',
            'Full History 📜',
            'Auto Translation'
          ], 
          endpoints: [
            '/v1/images/generations', 
            '/v1/chat/completions', 
            '/v1/models', 
            '/v1/providers', 
            '/v1/styles', 
            '/health'
          ] 
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: { 
          message: error.message, 
          type: 'worker_error' 
        } 
      }), { 
        status: 500, 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }
  }
};

async function handleChatCompletions(request, env) {
    const logger = new Logger();
    try {
        const body = await request.json();
        const isWebUI = body.is_web_ui === true;
        const messages = body.messages || [];
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg) throw new Error("No messages found");
        
        let prompt = "";
        if (typeof lastMsg.content === 'string') {
            prompt = lastMsg.content;
        } else if (Array.isArray(lastMsg.content)) {
            for (const part of lastMsg.content) {
                if (part.type === 'text') prompt += part.text + " ";
            }
        }
        prompt = prompt.trim();
        if (!prompt) throw new Error("Empty prompt");
        
        const options = { 
            provider: body.provider || null, 
            model: body.model || "flux", 
            width: body.width || 1024, 
            height: body.height || 1024, 
            numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
            seed: body.seed !== undefined ? body.seed : -1, 
            negativePrompt: body.negative_prompt || "", 
            guidance: body.guidance_scale || null, 
            steps: body.steps || null, 
            enhance: body.enhance === true, 
            nologo: body.nologo !== false, 
            privateMode: body.private !== false, 
            style: body.style || "none", 
            autoOptimize: body.auto_optimize !== false, 
            autoHD: body.auto_hd !== false, 
            qualityMode: body.quality_mode || 'standard',
            enableChineseBoost: body.enable_chinese_boost === true
        };
        
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        
        let respContent = "";
        results.forEach((result, index) => { 
            respContent += `![Generated Image ${index + 1}](${result.url})\n`; 
        });
        
        const respId = `chatcmpl-${crypto.randomUUID()}`;
        
        if (body.stream) {
            const { readable, writable } = new TransformStream();
            const writer = writable.getWriter();
            const encoder = new TextEncoder();
            (async () => {
                try {
                    if (isWebUI) await writer.write(encoder.encode(`data: ${JSON.stringify({ debug: logger.get() })}\n\n`));
                    const chunk = { 
                        id: respId, 
                        object: 'chat.completion.chunk', 
                        created: Math.floor(Date.now()/1000), 
                        model: options.model, 
                        choices: [{ index: 0, delta: { content: respContent }, finish_reason: null }] 
                    };
                    await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    const endChunk = { 
                        id: respId, 
                        object: 'chat.completion.chunk', 
                        created: Math.floor(Date.now()/1000), 
                        model: options.model, 
                        choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] 
                    };
                    await writer.write(encoder.encode(`data: ${JSON.stringify(endChunk)}\n\n`));
                    await writer.write(encoder.encode('data: [DONE]\n\n'));
                } finally {
                    await writer.close();
                }
            })();
            return new Response(readable, { headers: corsHeaders({ 'Content-Type': 'text/event-stream' }) });
        } else {
            return new Response(JSON.stringify({ 
                id: respId, 
                object: "chat.completion", 
                created: Math.floor(Date.now() / 1000), 
                model: options.model, 
                choices: [{ 
                    index: 0, 
                    message: { role: "assistant", content: respContent }, 
                    finish_reason: "stop" 
                }] 
            }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 500, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}

async function handleImageGenerations(request, env) {
    const logger = new Logger();
    try {
        const body = await request.json();
        const prompt = body.prompt;
        if (!prompt || !prompt.trim()) throw new Error("Prompt is required");
        
        let width = 1024, height = 1024;
        if (body.size) {
            const [w, h] = body.size.split('x').map(Number);
            if (w && h) { width = w; height = h; }
        }
        if (body.width) width = body.width;
        if (body.height) height = body.height;
        
        const options = { 
            provider: body.provider || null, 
            model: body.model || "flux", 
            width: Math.min(Math.max(width, 256), 4096), 
            height: Math.min(Math.max(height, 256), 4096), 
            numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
            seed: body.seed !== undefined ? body.seed : -1, 
            negativePrompt: body.negative_prompt || "", 
            guidance: body.guidance_scale || null, 
            steps: body.steps || null, 
            enhance: body.enhance === true, 
            nologo: body.nologo !== false, 
            privateMode: body.private !== false, 
            style: body.style || "none", 
            autoOptimize: body.auto_optimize !== false, 
            autoHD: body.auto_hd !== false, 
            qualityMode: body.quality_mode || 'standard',
            enableChineseBoost: body.enable_chinese_boost === true
        };
        
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        
        return new Response(JSON.stringify({ 
            created: Math.floor(Date.now() / 1000), 
            data: results.map(r => ({ 
                url: r.url, 
                provider: r.provider, 
                model: r.model, 
                seed: r.seed, 
                width: r.width, 
                height: r.height,
                is_4k: r.is_4k,
                style: r.style, 
                quality_mode: r.quality_mode, 
                prompt_complexity: r.prompt_complexity, 
                steps: r.steps, 
                guidance: r.guidance, 
                auto_optimized: r.auto_optimized, 
                hd_optimized: r.hd_optimized, 
                auto_translated: r.auto_translated,
                chinese_text_optimized: r.chinese_text_optimized,
                cost: r.cost 
            })) 
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 500, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}

function handleModelsRequest() {
    const models = [];
    for (const [providerKey, providerConfig] of Object.entries(CONFIG.PROVIDERS)) {
        if (providerConfig.enabled && providerConfig.models) {
            for (const model of providerConfig.models) {
                models.push({ 
                    id: model.id, 
                    object: 'model', 
                    name: model.name, 
                    provider: providerKey, 
                    category: model.category, 
                    confirmed: model.confirmed || false, 
                    experimental: model.experimental || false, 
                    description: model.description,
                    max_size: model.max_size || 2048,
                    supports_chinese_text: model.supports_chinese_text || false,
                    supports_multi_image: model.supports_multi_image || false,
                    ultra_hd: model.ultra_hd || false
                });
            }
        }
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: models, 
        total: models.length 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleProvidersRequest() {
    const providers = {};
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
        providers[key] = { 
            name: config.name, 
            endpoint: config.endpoint, 
            auth_mode: config.auth_mode, 
            enabled: config.enabled, 
            features: config.features 
        };
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: providers 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleStylesRequest() {
    const styles = [
        ...Object.entries(CONFIG.STYLE_PRESETS).map(([key, value]) => ({ 
            id: key, 
            name: value.name, 
            prompt_addition: value.prompt, 
            negative_addition: value.negative,
            category: 'general'
        })),
        ...Object.entries(CONFIG.NANO_BANANA_PRESETS).map(([key, value]) => ({
            id: key,
            name: value.name,
            prompt_addition: value.prompt,
            negative_addition: value.negative,
            recommended_size: value.recommended_size,
            category: 'nano_banana_exclusive'
        }))
    ];
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: styles 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;padding:20px;min-height:100vh}.container{max-width:1400px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:15px}
.header-left{flex:1}
h1{color:#f59e0b;margin:0;font-size:36px;font-weight:800;text-shadow:0 0 30px rgba(245,158,11,0.6)}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:6px 14px;border-radius:20px;font-size:14px;margin-left:10px}
.badge-4k{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;margin-left:8px}
.subtitle{color:#9ca3af;margin-top:8px;font-size:15px}
.mode-toggle{display:flex;gap:10px;margin-bottom:20px}
.mode-btn{padding:10px 20px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);color:#9ca3af;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s}
.mode-btn:hover{background:rgba(255,255,255,0.08);border-color:rgba(245,158,11,0.5)}
.mode-btn.active{background:linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%);border-color:#f59e0b;color:#000}
.history-btn{background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);color:#fff;border:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.3s;position:relative}
.history-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(139,92,246,0.4)}
.history-badge{position:absolute;top:-8px;right:-8px;background:#ef4444;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}@media (max-width:768px){.grid{grid-template-columns:1fr}}
.box{background:rgba(26,26,26,0.95);padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,0.1)}h3{color:#f59e0b;margin-bottom:18px;font-size:18px;font-weight:700}label{display:block;margin:16px 0 8px 0;color:#e5e7eb;font-weight:600;font-size:13px}
.banana-panel{border:2px solid #f59e0b;background:rgba(245,158,11,0.05);display:none}
.banana-panel h3{color:#fbbf24}
.checkbox-group{display:flex;align-items:center;gap:10px;margin:12px 0}.checkbox-group input[type="checkbox"]{width:auto;margin:0}
select,textarea,input{width:100%;padding:12px;margin:0;background:#2a2a2a;border:1px solid #444;color:#fff;border-radius:10px;font-size:14px;font-family:inherit;transition:all 0.3s}select:focus,textarea:focus,input:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.15)}textarea{resize:vertical;min-height:90px}
button{width:100%;padding:16px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-top:20px;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,158,11,0.4)}button:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.6)}button:disabled{background:#555;cursor:not-allowed;transform:none;box-shadow:none}
.result-meta{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);padding:8px 12px;border-radius:8px;margin-top:8px;font-size:12px;color:#10b981}
.tag-4k{display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;margin-left:6px}
.timer{color:#10b981;font-weight:700;margin-left:8px}
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.8);overflow:auto}
.modal-content{background:#1a1a2e;margin:5% auto;padding:30px;border-radius:16px;max-width:900px;border:2px solid #f59e0b}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.close{color:#9ca3af;font-size:32px;font-weight:700;cursor:pointer;transition:all 0.3s}
.close:hover{color:#f59e0b}
.history-item{background:rgba(255,255,255,0.05);padding:15px;border-radius:10px;margin-bottom:15px;border:1px solid rgba(255,255,255,0.1);transition:all 0.3s}
.history-item:hover{background:rgba(255,255,255,0.08);border-color:rgba(245,158,11,0.3)}
.history-img{width:100px;height:100px;object-fit:cover;border-radius:8px;cursor:pointer}
.history-info{color:#9ca3af;font-size:12px;margin-top:5px}
.history-actions{display:flex;gap:10px;margin-top:10px}
.history-actions button{padding:8px 16px;font-size:12px;margin:0}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="header-left">
<h1>🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span><span class="badge-4k">4K 🍌</span></h1>
<p class="subtitle">計時器 · 歷史記錄 · 4K超清 · 繁中文字 · 智能優化</p>
</div>
<button onclick="toggleHistory()" class="history-btn">📜 歷史<span id="historyBadge" class="history-badge" style="display:none">0</span></button>
</div>

<div class="mode-toggle">
<button class="mode-btn all active" onclick="switchMode('all')">🎨 全部模型</button>
<button class="mode-btn banana" onclick="switchMode('banana')">🍌 Nano Banana Pro</button>
</div>

<div class="grid">
<div class="box">
<h3>📝 生成設置</h3>
<label>提示詞 *</label>
<textarea id="prompt" placeholder="描述你想要的圖片..."></textarea>
<label>負面提示詞</label>
<textarea id="negativePrompt" placeholder="low quality, blurry"></textarea>
<label>AI 模型</label>
<select id="model">
<optgroup label="⚡ Flux 系列">
<option value="flux">Flux (均衡)</option>
<option value="flux-realism">Flux Realism (超寫實)</option>
<option value="flux-anime">Flux Anime (動漫)</option>
<option value="flux-pro">Flux Pro (專業版)</option>
<option value="turbo">Turbo (極速)</option>
</optgroup>
<optgroup label="🍌 Nano Banana">
<option value="nanobanana">Nano Banana 🍌</option>
<option value="nanobanana-pro">Nano Banana Pro 🍌💎 (4K)</option>
</optgroup>
</select>
<label>藝術風格</label>
<select id="style">
<option value="none">無</option>
${Object.entries(CONFIG.STYLE_PRESETS).map(([k,v])=>'<option value="'+k+'">'+v.name+'</option>').join('')}
</select>
<div class="checkbox-group">
<input type="checkbox" id="enableChineseBoost">
<label for="enableChineseBoost" style="margin:0">🍌 繁體中文文字優化</label>
</div>
</div>

<div class="box" id="bananaPanel" style="display:none">
<h3>🍌 Nano Banana 專屬預設</h3>
<label>快速模板</label>
<select id="bananaPreset" onchange="applyBananaPreset()">
<option value="">選擇模板...</option>
${Object.entries(CONFIG.NANO_BANANA_PRESETS).map(([k,v])=>'<option value="'+k+'">'+v.name+'</option>').join('')}
</select>
</div>

<div class="box">
<h3>🎨 圖像參數</h3>
<label>尺寸預設</label>
<select id="sizePreset" onchange="applySizePreset()">
${Object.entries(CONFIG.PRESET_SIZES).map(([k,v])=>'<option value="'+k+'">'+v.name+(v.exclusive?' 🍌':'')+'</option>').join('')}
</select>
<label>寬度: <span id="widthValue">1024</span>px</label>
<input type="range" id="width" min="256" max="4096" step="64" value="1024">
<label>高度: <span id="heightValue">1024</span>px</label>
<input type="range" id="height" min="256" max="4096" step="64" value="1024">
<label>質量模式</label>
<select id="qualityMode">
<option value="economy">⚡ 經濟</option>
<option value="standard" selected>⭐ 標準</option>
<option value="ultra">💎 超高清</option>
<option value="ultra_4k">🍌 4K超高清</option>
</select>
<button onclick="generate()">🚀 開始生成</button>
</div>
</div>

<div id="result"></div>
</div>

<div id="historyModal" class="modal">
<div class="modal-content">
<div class="modal-header">
<h2>📜 生成歷史</h2>
<span class="close" onclick="closeHistory()">&times;</span>
</div>
<div style="display:flex;justify-content:space-between;margin-bottom:20px">
<button onclick="clearHistory()" style="width:auto;background:#ef4444">🗑️ 清空歷史</button>
</div>
<div id="historyList"></div>
</div>
</div>

<script>
const PRESETS=${JSON.stringify(CONFIG.PRESET_SIZES)};
const BANANA_PRESETS=${JSON.stringify(CONFIG.NANO_BANANA_PRESETS)};
let currentMode='all';
let generationHistory=[];

function loadHistory(){
try{
const saved=localStorage.getItem('flux_ai_history');
if(saved){
generationHistory=JSON.parse(saved);
updateHistoryBadge();
}
}catch(e){console.error('Load history error:',e);}
}

function saveHistory(){
try{
localStorage.setItem('flux_ai_history',JSON.stringify(generationHistory.slice(0,100)));
}catch(e){console.error('Save history error:',e);}
}

function addToHistory(item){
generationHistory.unshift({...item,timestamp:new Date().toISOString()});
if(generationHistory.length>100)generationHistory=generationHistory.slice(0,100);
saveHistory();
updateHistoryBadge();
}

function updateHistoryBadge(){
const badge=document.getElementById('historyBadge');
if(generationHistory.length>0){
badge.textContent=generationHistory.length;
badge.style.display='flex';
}else{
badge.style.display='none';
}
}

function toggleHistory(){
const modal=document.getElementById('historyModal');
modal.style.display='block';
renderHistory();
}

function closeHistory(){
document.getElementById('historyModal').style.display='none';
}

function renderHistory(){
const list=document.getElementById('historyList');
if(generationHistory.length===0){
list.innerHTML='<p style="text-align:center;color:#9ca3af">暫無歷史記錄</p>';
return;
}
list.innerHTML='';
generationHistory.forEach((item,index)=>{
const div=document.createElement('div');
div.className='history-item';
div.innerHTML='<div style="display:flex;gap:15px"><img src="'+item.url+'" class="history-img" onclick="window.open(\\''+item.url+'\\')"><div style="flex:1"><p style="color:#f59e0b;font-weight:600">'+item.prompt.substring(0,50)+'...</p><div class="history-info">'+item.model+' | '+item.width+'x'+item.height+' | '+(item.duration||'N/A')+'</div><div class="history-info">'+new Date(item.timestamp).toLocaleString('zh-TW')+'</div><div class="history-actions"><button onclick="regenFromHistory('+index+')">🔄 重新生成</button><button onclick="deleteHistory('+index+')" style="background:#ef4444">🗑️ 刪除</button></div></div></div>';
list.appendChild(div);
});
}

function regenFromHistory(index){
const item=generationHistory[index];
document.getElementById('prompt').value=item.prompt;
document.getElementById('model').value=item.model;
document.getElementById('width').value=item.width;
document.getElementById('height').value=item.height;
document.getElementById('widthValue').textContent=item.width;
document.getElementById('heightValue').textContent=item.height;
if(item.negative_prompt)document.getElementById('negativePrompt').value=item.negative_prompt;
if(item.style)document.getElementById('style').value=item.style;
if(item.quality_mode)document.getElementById('qualityMode').value=item.quality_mode;
closeHistory();
alert('已載入歷史配置,點擊生成按鈕即可!');
}

function deleteHistory(index){
if(confirm('確定刪除此記錄?')){
generationHistory.splice(index,1);
saveHistory();
updateHistoryBadge();
renderHistory();
}
}

function clearHistory(){
if(confirm('確定清空所有歷史記錄?')){
generationHistory=[];
saveHistory();
updateHistoryBadge();
renderHistory();
}
}

function switchMode(mode){
currentMode=mode;
const modelSelect=document.getElementById('model');
const bananaPanel=document.getElementById('bananaPanel');
if(mode==='banana'){
modelSelect.value='nanobanana-pro';
bananaPanel.style.display='block';
document.getElementById('qualityMode').value='ultra_4k';
document.getElementById('enableChineseBoost').checked=true;
}else{
bananaPanel.style.display='none';
}
}

function applySizePreset(){
const preset=PRESETS[document.getElementById('sizePreset').value];
if(preset){
document.getElementById('width').value=preset.width;
document.getElementById('height').value=preset.height;
document.getElementById('widthValue').textContent=preset.width;
document.getElementById('heightValue').textContent=preset.height;
}
}

function applyBananaPreset(){
const presetKey=document.getElementById('bananaPreset').value;
if(!presetKey)return;
const preset=BANANA_PRESETS[presetKey];
if(preset){
document.getElementById('prompt').value=preset.prompt;
if(preset.recommended_size){
const sizes=preset.recommended_size.split('x');
const w=parseInt(sizes[0]);
const h=parseInt(sizes[1]);
document.getElementById('width').value=w;
document.getElementById('height').value=h;
document.getElementById('widthValue').textContent=w;
document.getElementById('heightValue').textContent=h;
}
}
}

document.getElementById('width').oninput=function(){document.getElementById('widthValue').textContent=this.value;};
document.getElementById('height').oninput=function(){document.getElementById('heightValue').textContent=this.value;};

window.onclick=function(event){
const modal=document.getElementById('historyModal');
if(event.target===modal)modal.style.display='none';
};

async function generate(){
const prompt=document.getElementById('prompt').value.trim();
if(!prompt){alert('請輸入提示詞');return;}

const params={
prompt:prompt,
negative_prompt:document.getElementById('negativePrompt').value,
model:document.getElementById('model').value,
style:document.getElementById('style').value,
width:parseInt(document.getElementById('width').value),
height:parseInt(document.getElementById('height').value),
quality_mode:document.getElementById('qualityMode').value,
enable_chinese_boost:document.getElementById('enableChineseBoost').checked,
auto_optimize:true,
auto_hd:true
};

const resultDiv=document.getElementById('result');
const button=document.querySelector('button[onclick="generate()"]');
button.disabled=true;

const startTime=Date.now();
let timerInterval;
button.textContent='生成中 ⏱️ 0.0s';
timerInterval=setInterval(()=>{
const elapsed=((Date.now()-startTime)/1000).toFixed(1);
button.textContent='生成中 ⏱️ '+elapsed+'s';
},100);

try{
const response=await fetch('/v1/images/generations',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(params)
});
const data=await response.json();
if(!response.ok)throw new Error(data.error?.message||'生成失敗');

const duration=((Date.now()-startTime)/1000).toFixed(1)+'s';
clearInterval(timerInterval);

resultDiv.innerHTML='<div style="background:rgba(16,185,129,0.15);border:1px solid #10b981;padding:16px;border-radius:12px;color:#10b981"><strong>✅ 生成成功!</strong><span class="timer">⏱️ '+duration+'</span></div>';
data.data.forEach(function(item,index){
const is4K=item.is_4k?'<span class="tag-4k">4K</span>':'';
const chineseOpt=item.chinese_text_optimized?' | 🍌 繁中優化':'';
const imgDiv=document.createElement('div');
imgDiv.style.marginTop='20px';
imgDiv.innerHTML='<img src="'+item.url+'" style="width:100%;border-radius:12px;cursor:pointer"><div class="result-meta">'+item.model+' | '+item.width+'x'+item.height+is4K+' | '+item.quality_mode+chineseOpt+' | <span class="timer">⏱️ '+duration+'</span></div>';
imgDiv.querySelector('img').onclick=function(){window.open(item.url);};
resultDiv.appendChild(imgDiv);

addToHistory({
url:item.url,
prompt:params.prompt,
negative_prompt:params.negative_prompt,
model:item.model,
width:item.width,
height:item.height,
style:params.style,
quality_mode:params.quality_mode,
duration:duration
});
});
}catch(error){
clearInterval(timerInterval);
resultDiv.innerHTML='<div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:16px;border-radius:12px;color:#ef4444"><strong>❌ 錯誤:</strong> '+error.message+'</div>';
}finally{
button.disabled=false;
button.textContent='🚀 開始生成';
}
}

loadHistory();
</script>
</body>
</html>`;
  return new Response(html, { headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' }) });
}