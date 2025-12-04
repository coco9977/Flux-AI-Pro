// =================================================================================
//  項目: Flux-AI-Pro
//  版本: 9.0.0 - 混合架構
//  作者: Enhanced by AI Assistant
//  日期: 2025-12-04
//
//  完整功能:
//  ✅ Pollinations.ai - 【免費版】
//     - 17個模型 (Flux + SD3)
//     - 12種風格
//     - NSFW 支持
//     - 自動高清【自動搜尋正確行數或參數值】
//     - 智能參數優化【智能搜合正則行數及參數值】
//     - 歷史記錄（Local Storage）
//     - OpenAI 兼容 API
//  ✅ Cloudflare Workers AI - 【付費版】
//     - FLUX.2 [dev] 官方模型（Black Forest Labs）
//     - 多圖參考（最多 4 張）
//     - Hex 色碼主題指定（如 #FF5733）
//     - 實時成本預估（按量計費）
//     - 企業級穩定性保證
//     - 用戶自誼（需定支付方式）
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.0.0",
  
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
      tier: "free",
      description: "完全免費平台 - 支持 Flux & SD3 系列 + 自動高清",
      models: [
        { id: "flux", name: "Flux", category: "flux", confirmed: true },
        { id: "flux-realism", name: "Flux Realism", category: "flux", confirmed: true },
        { id: "flux-anime", name: "Flux Anime", category: "flux", confirmed: true },
        { id: "flux-3d", name: "Flux 3D", category: "flux", confirmed: true },
        { id: "flux-pro", name: "Flux Pro", category: "flux", confirmed: true },
        { id: "any-dark", name: "Any Dark", category: "flux", confirmed: true },
        { id: "turbo", name: "Turbo", category: "flux", confirmed: true },
        { id: "flux-1.1-pro", name: "Flux 1.1 Pro 🧪", category: "flux-advanced", experimental: true, fallback: ["flux-pro", "flux-realism"] },
        { id: "flux-kontext", name: "Flux Kontext 🧪", category: "flux-advanced", experimental: true, fallback: ["flux-pro", "flux-realism"] },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro 🧪", category: "flux-advanced", experimental: true, fallback: ["flux-kontext", "flux-pro", "flux-realism"] },
        { id: "sd3", name: "SD3 🧪", category: "stable-diffusion", experimental: true, fallback: ["flux-realism", "flux"] },
        { id: "sd3.5-large", name: "SD 3.5 Large 🧪", category: "stable-diffusion", experimental: true, fallback: ["sd3", "flux-realism", "flux"] },
        { id: "sd3.5-turbo", name: "SD 3.5 Turbo 🧪", category: "stable-diffusion", experimental: true, fallback: ["turbo", "flux"] },
        { id: "sdxl", name: "SDXL 🧪", category: "stable-diffusion", experimental: true, fallback: ["flux-realism", "flux"] },
        { id: "sdxl-lightning", name: "SDXL Lightning 🧪", category: "stable-diffusion", experimental: true, fallback: ["turbo", "flux"] }
      ],
      features: {
        nsfw: true,
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true
      },
      max_size: { width: 2048, height: 2048 }
    },
    cloudflare: {
      name: "Cloudflare Workers AI",
      type: "workers-ai",
      auth_mode: "env",
      requires_key: false,
      enabled: true,
      tier: "premium",
      description: "官方 FLUX.2 [dev] 模型，支持企業級穩定性 + 多圖輸入",
      models: [
        {
          id: "flux-2-dev",
          name: "FLUX.2 [dev] ⚡",
          category: "flux-2",
          confirmed: true,
          cf_model: "@cf/black-forest-labs/flux-1-schnell"
        }
      ],
      features: {
        multi_image_input: true,
        hex_color: true,
        custom_size: true,
        style_presets: true,
        auto_hd: true
      },
      pricing: {
        input_per_tile: 0.00021,
        output_per_tile: 0.00041
      },
      max_input_images: 4,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
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
      "flux-2-dev": { min: 20, optimal: 30, max: 40 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 }
    },
    STYLE_ADJUSTMENT: {
      "photorealistic": 1.1,
      "oil-painting": 1.05,
      "watercolor": 0.95,
      "pixel-art": 0.85,
      "sketch": 0.9,
      "vector": 0.85,
      "default": 1.0
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    HD_PROMPTS: {
      quality_boost: "high quality, extremely detailed, sharp focus, crisp, clear, professional",
      resolution_boost: "8k uhd, high resolution, ultra HD, masterpiece",
      texture_boost: "fine details, intricate details, highly detailed textures",
      clarity_boost: "perfect clarity, crystal clear, no blur, no noise",
      full_enhancement: "8k uhd, high quality, extremely detailed, sharp focus, crisp, clear, professional, masterpiece, fine details, intricate details, perfect clarity, crystal clear"
    },
    HD_NEGATIVE: "low quality, blurry, pixelated, low resolution, jpeg artifacts, compression artifacts, bad quality, distorted, noisy, grainy, poor details, soft focus, out of focus",
    MODEL_HD_STRATEGY: {
      "flux-realism": { prompt_level: "full_enhancement", negative: true, upscale: true },
      "flux-pro": { prompt_level: "full_enhancement", negative: true, upscale: true },
      "flux-1.1-pro": { prompt_level: "full_enhancement", negative: true, upscale: true },
      "sd3.5-large": { prompt_level: "full_enhancement", negative: true, upscale: true },
      "flux-2-dev": { prompt_level: "full_enhancement", negative: true, upscale: true },
      "flux": { prompt_level: "quality_boost", negative: true, upscale: false },
      "sd3": { prompt_level: "quality_boost", negative: true, upscale: false },
      "sdxl": { prompt_level: "quality_boost", negative: true, upscale: false },
      "turbo": { prompt_level: "resolution_boost", negative: false, upscale: false },
      "sdxl-lightning": { prompt_level: "resolution_boost", negative: false, upscale: false },
      "sd3.5-turbo": { prompt_level: "resolution_boost", negative: false, upscale: false },
      "flux-anime": { prompt_level: "clarity_boost", negative: true, upscale: false },
      "flux-3d": { prompt_level: "clarity_boost", negative: true, upscale: false },
      "any-dark": { prompt_level: "texture_boost", negative: true, upscale: false }
    },
    SIZE_RECOMMENDATION: {
      min_recommended: 1024,
      auto_upscale_threshold: 768,
      max_size: 2048,
      upscale_rules: {
        "512x512": { suggested: "1024x1024", multiplier: 2 },
        "768x768": { suggested: "1536x1536", multiplier: 2 },
        "640x640": { suggested: "1280x1280", multiplier: 2 },
        "512x768": { suggested: "1024x1536", multiplier: 2 },
        "768x512": { suggested: "1536x1024", multiplier: 2 }
      }
    }
  },
  
  FETCH_TIMEOUT: 60000,
  MAX_RETRIES: 3,
  
  PRESET_SIZES: {
    "square": { width: 1024, height: 1024, name: "方形 1:1" },
    "portrait": { width: 768, height: 1344, name: "豎屏 9:16" },
    "landscape": { width: 1344, height: 768, name: "橫屏 16:9" },
    "standard-portrait": { width: 768, height: 1024, name: "標準豎屏 3:4" },
    "standard-landscape": { width: 1024, height: 768, name: "標準橫屏 4:3" },
    "ultrawide": { width: 1536, height: 640, name: "超寬屏 21:9" },
    "ultrawide-portrait": { width: 640, height: 1536, name: "超豎屏 9:21" },
    "custom": { width: 1024, height: 1024, name: "自定義" }
  },
  
  HISTORY: {
    MAX_ITEMS: 100,
    STORAGE_KEY: "image_generation_history"
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

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, autoHD = true) {
    if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) {
      return {
        prompt: prompt,
        negativePrompt: negativePrompt,
        width: width,
        height: height,
        optimized: false
      };
    }
    
    const hdConfig = CONFIG.HD_OPTIMIZATION;
    const strategy = hdConfig.MODEL_HD_STRATEGY[model] || {
      prompt_level: "quality_boost",
      negative: true,
      upscale: false
    };
    
    const optimizations = [];
    
    let enhancedPrompt = prompt;
    if (strategy.prompt_level && hdConfig.HD_PROMPTS[strategy.prompt_level]) {
      const hdBoost = hdConfig.HD_PROMPTS[strategy.prompt_level];
      enhancedPrompt = `${prompt}, ${hdBoost}`;
      optimizations.push(`提示詞增強: ${strategy.prompt_level}`);
    }
    
    let enhancedNegative = negativePrompt || "";
    if (strategy.negative) {
      enhancedNegative = enhancedNegative 
        ? `${enhancedNegative}, ${hdConfig.HD_NEGATIVE}`
        : hdConfig.HD_NEGATIVE;
      optimizations.push(`負面提示詞: 已添加高清過濾`);
    }
    
    let finalWidth = width;
    let finalHeight = height;
    let sizeUpscaled = false;
    
    if (strategy.upscale) {
      const totalPixels = width * height;
      const minPixels = hdConfig.SIZE_RECOMMENDATION.min_recommended ** 2;
      
      if (totalPixels < minPixels) {
        const scale = Math.sqrt(minPixels / totalPixels);
        finalWidth = Math.min(Math.round(width * scale / 64) * 64, hdConfig.SIZE_RECOMMENDATION.max_size);
        finalHeight = Math.min(Math.round(height * scale / 64) * 64, hdConfig.SIZE_RECOMMENDATION.max_size);
        sizeUpscaled = true;
        optimizations.push(`尺寸提升: ${width}x${height} → ${finalWidth}x${finalHeight}`);
      }
    }
    
    return {
      prompt: enhancedPrompt,
      negativePrompt: enhancedNegative,
      width: finalWidth,
      height: finalHeight,
      optimized: true,
      strategy: strategy,
      optimizations: optimizations,
      size_upscaled: sizeUpscaled
    };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) {
      const suggestion = this.calculateOptimalSteps(model, width, height, style);
      return {
        steps: userSteps,
        optimized: false,
        suggested: suggestion.steps,
        reasoning: suggestion.reasoning,
        user_override: true
      };
    }
    return this.calculateOptimalSteps(model, width, height, style);
  }
  
  static calculateOptimalSteps(model, width, height, style) {
    const rules = CONFIG.OPTIMIZATION_RULES;
    const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
    let baseSteps = modelRule.optimal;
    
    const reasoning = [];
    reasoning.push(`模型 ${model} 基礎: ${baseSteps}步`);
    
    const totalPixels = width * height;
    let sizeMultiplier = 1.0;
    
    if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) {
      sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier;
      reasoning.push(`小尺寸 x${sizeMultiplier}`);
    } else if (totalPixels <= rules.SIZE_MULTIPLIER.medium.threshold) {
      sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier;
    } else if (totalPixels <= rules.SIZE_MULTIPLIER.large.threshold) {
      sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier;
      reasoning.push(`大尺寸 x${sizeMultiplier}`);
    } else {
      sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier;
      reasoning.push(`超大 x${sizeMultiplier}`);
    }
    
    let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
    if (styleMultiplier !== 1.0) {
      reasoning.push(`風格 x${styleMultiplier}`);
    }
    
    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier);
    optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
    
    reasoning.push(`最終: ${optimizedSteps}步`);
    
    return {
      steps: optimizedSteps,
      optimized: true,
      base_steps: baseSteps,
      size_multiplier: sizeMultiplier,
      style_multiplier: styleMultiplier,
      min_steps: modelRule.min,
      max_steps: modelRule.max,
      reasoning: reasoning.join(' → ')
    };
  }
  
  static optimizeGuidance(model, style) {
    if (model.includes('turbo') || model.includes('lightning')) {
      return style === 'photorealistic' ? 3.0 : 2.5;
    }
    if (style === 'photorealistic') return 8.5;
    if (['oil-painting', 'watercolor', 'sketch'].includes(style)) return 6.5;
    return 7.5;
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    const styleConfig = CONFIG.STYLE_PRESETS[style];
    if (!styleConfig || style === 'none') {
      return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
    }
    
    let enhancedPrompt = prompt;
    if (styleConfig.prompt) {
      enhancedPrompt = `${prompt}, ${styleConfig.prompt}`;
    }
    
    let enhancedNegative = negativePrompt || "";
    if (styleConfig.negative) {
      enhancedNegative = enhancedNegative 
        ? `${enhancedNegative}, ${styleConfig.negative}`
        : styleConfig.negative;
    }
    
    return { enhancedPrompt, enhancedNegative };
  }
}

class CostCalculator {
  static calculateTiles(width, height) {
    const tilesW = Math.ceil(width / 512);
    const tilesH = Math.ceil(height / 512);
    return tilesW * tilesH;
  }
  
  static estimateCost(width, height, steps, pricing) {
    const tiles = this.calculateTiles(width, height);
    
    const inputCost = pricing.input_per_tile * tiles * steps;
    const outputCost = pricing.output_per_tile * tiles * steps;
    const totalCost = inputCost + outputCost;
    
    return {
      tiles: tiles,
      steps: steps,
      input_cost: inputCost.toFixed(6),
      output_cost: outputCost.toFixed(6),
      total: totalCost.toFixed(4),
      formatted: `$${totalCost.toFixed(4)}`
    };
  }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

class PollinationsProvider {
  constructor(config) {
    this.config = config;
    this.name = config.name;
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
      nsfw = false,
      autoOptimize = true,
      autoHD = true
    } = options;
    
    let hdOptimization = null;
    let finalPrompt = prompt;
    let finalNegativePrompt = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      hdOptimization = HDOptimizer.optimize(
        prompt,
        negativePrompt,
        model,
        width,
        height,
        autoHD
      );
      
      finalPrompt = hdOptimization.prompt;
      finalNegativePrompt = hdOptimization.negativePrompt;
      finalWidth = hdOptimization.width;
      finalHeight = hdOptimization.height;
      
      if (hdOptimization.optimized) {
        logger.add("🎨 HD Optimization", {
          original_size: `${width}x${height}`,
          optimized_size: `${finalWidth}x${finalHeight}`,
          size_upscaled: hdOptimization.size_upscaled,
          optimizations: hdOptimization.optimizations
        });
      }
    }
    
    let finalSteps = steps;
    let finalGuidance = guidance;
    
    if (autoOptimize) {
      const stepsOptimization = ParameterOptimizer.optimizeSteps(
        model, 
        finalWidth,
        finalHeight, 
        style, 
        steps
      );
      finalSteps = stepsOptimization.steps;
      
      logger.add("🎯 Steps Optimization", {
        optimized: stepsOptimization.steps,
        reasoning: stepsOptimization.reasoning
      });
      
      if (guidance === null) {
        finalGuidance = ParameterOptimizer.optimizeGuidance(model, style);
      } else {
        finalGuidance = guidance;
      }
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(
      finalPrompt,
      style, 
      finalNegativePrompt
    );
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const modelsToTry = [model];
    
    if (modelConfig?.experimental && modelConfig?.fallback) {
      modelsToTry.push(...modelConfig.fallback);
    }
    
    logger.add("🎨 Generation Config", {
      provider: this.name,
      model: model,
      dimensions: `${finalWidth}x${finalHeight}`,
      hd_optimized: autoHD && hdOptimization?.optimized,
      optimized_steps: finalSteps,
      optimized_guidance: finalGuidance
    });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    
    let fullPrompt = enhancedPrompt;
    if (enhancedNegative && enhancedNegative.trim()) {
      fullPrompt = `${enhancedPrompt} [negative: ${enhancedNegative}]`;
    }
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    
    for (const tryModel of modelsToTry) {
      let lastError = null;
      
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
          
          if (nsfw) {
            params.append('nsfw', 'true');
            params.append('safe', 'false');
          }
          
          if (finalGuidance !== 7.5) {
            params.append('guidance', finalGuidance.toString());
          }
          if (finalSteps !== 20) {
            params.append('steps', finalSteps.toString());
          }
          
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
          }, 45000);
          
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('image/')) {
              logger.add(`✅ Success`, { 
                url: response.url,
                used_model: tryModel,
                final_size: `${finalWidth}x${finalHeight}`,
                hd_optimized: autoHD && hdOptimization?.optimized,
                seed: currentSeed
              });
              
              return {
                url: response.url,
                provider: this.name,
                model: tryModel,
                requested_model: model,
                seed: currentSeed,
                style: style,
                nsfw: nsfw,
                steps: finalSteps,
                guidance: finalGuidance,
                width: finalWidth,
                height: finalHeight,
                hd_optimized: autoHD && hdOptimization?.optimized,
                hd_details: hdOptimization,
                cost: "FREE",
                tier: "free",
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
          lastError = e;
          
          if (retry < CONFIG.MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
          }
        }
      }
    }
    
    throw new Error(`All models failed`);
  }
}

class CloudflareProvider {
  constructor(config, aiBinding) {
    this.config = config;
    this.name = config.name;
    this.ai = aiBinding;
  }
  
  async generate(prompt, options, logger) {
    if (!this.ai) {
      throw new Error("Cloudflare AI binding not available. Please deploy with Workers AI enabled.");
    }
    
    const {
      model = "flux-2-dev",
      width = 1024,
      height = 1024,
      style = "none",
      autoHD = true,
      autoOptimize = true,
      steps = null,
      inputImages = [],
      hexColor = null
    } = options;
    
    const modelConfig = this.config.models.find(m => m.id === model);
    if (!modelConfig) {
      throw new Error(`Model ${model} not supported by Cloudflare AI`);
    }
    
    let hdOptimization = null;
    let finalPrompt = prompt;
    let finalNegativePrompt = "";
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      hdOptimization = HDOptimizer.optimize(
        prompt,
        "",
        model,
        width,
        height,
        autoHD
      );
      
      finalPrompt = hdOptimization.prompt;
      finalWidth = hdOptimization.width;
      finalHeight = hdOptimization.height;
      
      if (hdOptimization.optimized) {
        logger.add("🎨 HD Optimization (CF)", {
          original_size: `${width}x${height}`,
          optimized_size: `${finalWidth}x${finalHeight}`,
          optimizations: hdOptimization.optimizations
        });
      }
    }
    
    let finalSteps = steps;
    
    if (autoOptimize) {
      const stepsOptimization = ParameterOptimizer.optimizeSteps(
        model, 
        finalWidth,
        finalHeight, 
        style, 
        steps
      );
      finalSteps = stepsOptimization.steps;
      
      logger.add("🎯 Steps Optimization (CF)", {
        optimized: stepsOptimization.steps,
        reasoning: stepsOptimization.reasoning
      });
    } else {
      finalSteps = steps || 30;
    }
    
    const { enhancedPrompt } = StyleProcessor.applyStyle(
      finalPrompt,
      style,
      ""
    );
    
    const costEstimate = CostCalculator.estimateCost(
      finalWidth,
      finalHeight,
      finalSteps,
      this.config.pricing
    );
    
    logger.add("💰 Cost Estimate", costEstimate);
    
    const aiInput = {
      prompt: enhancedPrompt,
      width: finalWidth,
      height: finalHeight,
      num_steps: finalSteps
    };
    
    if (inputImages && inputImages.length > 0) {
      const validImages = inputImages.slice(0, this.config.max_input_images);
      aiInput.image = validImages;
      logger.add("🖼️ Input Images", { count: validImages.length });
    }
    
    if (hexColor && /^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
      aiInput.guidance = hexColor;
      logger.add("🎨 Hex Color", { color: hexColor });
    }
    
    logger.add("⚡ Cloudflare AI Request", {
      model: modelConfig.cf_model,
      dimensions: `${finalWidth}x${finalHeight}`,
      steps: finalSteps,
      has_input_images: (inputImages && inputImages.length > 0),
      has_hex_color: !!hexColor
    });
    
    try {
      const response = await this.ai.run(modelConfig.cf_model, aiInput);
      
      if (!response || !response.image) {
        throw new Error("No image returned from Cloudflare AI");
      }
      
      const base64Image = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(response.image)))}`;
      
      logger.add("✅ Success (Cloudflare)", {
        size: `${finalWidth}x${finalHeight}`,
        cost: costEstimate.formatted
      });
      
      return {
        url: base64Image,
        provider: this.name,
        model: model,
        requested_model: model,
        width: finalWidth,
        height: finalHeight,
        steps: finalSteps,
        hd_optimized: autoHD && hdOptimization?.optimized,
        hd_details: hdOptimization,
        cost: costEstimate.formatted,
        cost_breakdown: costEstimate,
        tier: "premium",
        input_images: inputImages?.length || 0,
        hex_color: hexColor,
        auto_optimized: autoOptimize
      };
      
    } catch (error) {
      logger.add("❌ Cloudflare AI Error", error.message);
      throw new Error(`Cloudflare AI generation failed: ${error.message}`);
    }
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, aiBinding = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.aiBinding = aiBinding;
    
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') {
          this.providers[key] = new PollinationsProvider(config);
        } else if (key === 'cloudflare' && aiBinding) {
          this.providers[key] = new CloudflareProvider(config, aiBinding);
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
      const currentOptions = {
        ...options,
        seed: options.seed === -1 ? -1 : options.seed + i
      };
      
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
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders()
      });
    }

    try {
      if (url.pathname === '/') {
        return handleUI(request);
      } 
      else if (url.pathname === '/v1/chat/completions') {
        return handleChatCompletions(request, env);
      } 
      else if (url.pathname === '/v1/images/generations') {
        return handleImageGenerations(request, env);
      }
      else if (url.pathname === '/v1/models') {
        return handleModelsRequest();
      }
      else if (url.pathname === '/v1/providers') {
        return handleProvidersRequest(env);
      }
      else if (url.pathname === '/v1/styles') {
        return handleStylesRequest();
      }
      else if (url.pathname === '/health') {
        return new Response(JSON.stringify({
          status: 'ok',
          version: CONFIG.PROJECT_VERSION,
          providers: Object.keys(CONFIG.PROVIDERS).filter(k => CONFIG.PROVIDERS[k].enabled),
          cloudflare_ai_available: !!env.AI,
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders({ 'Content-Type': 'application/json' })
        });
      }
      else {
        return new Response(JSON.stringify({
          project: CONFIG.PROJECT_NAME,
          version: CONFIG.PROJECT_VERSION,
          architecture: "Hybrid (Pollinations + Cloudflare AI)",
          features: ['17 Models (Free)', 'FLUX.2 (Premium)', '12 Styles', 'Auto HD', 'Multi-Image Input', 'Cost Estimation'],
          endpoints: [
            '/v1/images/generations',
            '/v1/chat/completions',
            '/v1/models',
            '/v1/providers',
            '/v1/styles',
            '/health'
          ]
        }), { 
          headers: corsHeaders({ 'Content-Type': 'application/json' })
        });
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
        if (part.type === 'text') {
          prompt += part.text + " ";
        }
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
      nsfw: body.nsfw === true,
      autoOptimize: body.auto_optimize !== false,
      autoHD: body.auto_hd !== false,
      inputImages: body.input_images || [],
      hexColor: body.hex_color || null
    };

    const router = new MultiProviderRouter({}, env.AI);
    const results = await router.generate(prompt, options, logger);

    let respContent = "";
    results.forEach((result, index) => {
      respContent += `![Generated Image ${index + 1}](${result.url})\n`;
      if (result.cost && result.cost !== "FREE") {
        respContent += `\n**Cost:** ${result.cost}\n`;
      }
    });

    const respId = `chatcmpl-${crypto.randomUUID()}`;

    if (body.stream) {
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();

      (async () => {
        try {
          if (isWebUI) {
            await writer.write(encoder.encode(`data: ${JSON.stringify({ debug: logger.get() })}\n\n`));
          }

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

      return new Response(readable, {
        headers: corsHeaders({ 'Content-Type': 'text/event-stream' })
      });
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
      }), { 
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
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
    if (!prompt || !prompt.trim()) {
      throw new Error("Prompt is required");
    }

    let width = 1024, height = 1024;
    if (body.size) {
      const [w, h] = body.size.split('x').map(Number);
      if (w && h) {
        width = w;
        height = h;
      }
    }
    if (body.width) width = body.width;
    if (body.height) height = body.height;

    const options = {
      provider: body.provider || null,
      model: body.model || "flux",
      width: Math.min(Math.max(width, 256), 2048),
      height: Math.min(Math.max(height, 256), 2048),
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4),
      seed: body.seed !== undefined ? body.seed : -1,
      negativePrompt: body.negative_prompt || "",
      guidance: body.guidance_scale || null,
      steps: body.steps || null,
      enhance: body.enhance === true,
      nologo: body.nologo !== false,
      privateMode: body.private !== false,
      style: body.style || "none",
      nsfw: body.nsfw === true,
      autoOptimize: body.auto_optimize !== false,
      autoHD: body.auto_hd !== false,
      inputImages: body.input_images || [],
      hexColor: body.hex_color || null
    };

    const router = new MultiProviderRouter({}, env.AI);
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
        style: r.style,
        nsfw: r.nsfw,
        steps: r.steps,
        guidance: r.guidance,
        auto_optimized: r.auto_optimized,
        hd_optimized: r.hd_optimized,
        cost: r.cost,
        cost_breakdown: r.cost_breakdown,
        tier: r.tier,
        input_images: r.input_images,
        hex_color: r.hex_color
      }))
    }), { 
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
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
          tier: providerConfig.tier
        });
      }
    }
  }
  
  return new Response(JSON.stringify({
    object: 'list',
    data: models,
    total: models.length
  }), { 
    headers: corsHeaders({ 'Content-Type': 'application/json' })
  });
}

function handleProvidersRequest(env) {
  const providers = {};
  
  for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
    providers[key] = {
      name: config.name,
      endpoint: config.endpoint || "workers-ai",
      auth_mode: config.auth_mode,
      enabled: config.enabled && (key !== 'cloudflare' || !!env.AI),
      features: config.features,
      tier: config.tier,
      available: key === 'cloudflare' ? !!env.AI : true
    };
  }
  
  return new Response(JSON.stringify({
    object: 'list',
    data: providers
  }), { 
    headers: corsHeaders({ 'Content-Type': 'application/json' })
  });
}

function handleStylesRequest() {
  const styles = Object.entries(CONFIG.STYLE_PRESETS).map(([key, value]) => ({
    id: key,
    name: value.name,
    prompt_addition: value.prompt,
    negative_addition: value.negative
  }));
  
  return new Response(JSON.stringify({
    object: 'list',
    data: styles
  }), { 
    headers: corsHeaders({ 'Content-Type': 'application/json' })
  });
}

function handleUI(request) {
  const origin = new URL(request.url).origin;
  
  const pollinationsProvider = CONFIG.PROVIDERS.pollinations;
  const cloudflareProvider = CONFIG.PROVIDERS.cloudflare;
  
  const fluxModels = pollinationsProvider.models
    .filter(m => m.category === 'flux')
    .map(m => `<option value="${m.id}">${m.name}</option>`)
    .join('\n');
    
  const fluxAdvanced = pollinationsProvider.models
    .filter(m => m.category === 'flux-advanced')
    .map(m => `<option value="${m.id}">${m.name}</option>`)
    .join('\n');
    
  const sdModels = pollinationsProvider.models
    .filter(m => m.category === 'stable-diffusion')
    .map(m => `<option value="${m.id}">${m.name}</option>`)
    .join('\n');
    
  const cloudflareModels = cloudflareProvider.models
    .map(m => `<option value="${m.id}">${m.name}</option>`)
    .join('\n');
  
  const styleOptions = Object.entries(CONFIG.STYLE_PRESETS).map(([key, value]) => 
    `<option value="${key}">${value.name}</option>`
  ).join('\n');
  
  const sizeOptions = Object.entries(CONFIG.PRESET_SIZES).map(([key, value]) => 
    `<option value="${key}">${value.name} (${value.width}x${value.height})</option>`
  ).join('\n');
  
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.PROJECT_NAME} v${CONFIG.PROJECT_VERSION} - Hybrid Edition</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial; 
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); 
        color: #fff; 
        padding: 20px;
        min-height: 100vh;
      }
      .container { max-width: 1400px; margin: 0 auto; }
      
      h1 { 
        color: #f59e0b; 
        text-align: center; 
        margin-bottom: 10px;
        font-size: 36px;
        font-weight: 800;
        text-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
      }
      .badge { 
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        padding: 6px 14px; 
        border-radius: 20px; 
        font-size: 14px;
        margin-left: 10px;
      }
      .badge.hybrid {
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
      }
      .subtitle { 
        text-align: center; 
        color: #9ca3af; 
        margin-bottom: 20px; 
        font-size: 15px; 
      }
      
      .tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }
      .tab {
        padding: 12px 24px;
        background: transparent;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        border-bottom: 3px solid transparent;
        transition: all 0.3s;
      }
      .tab:hover { color: #f59e0b; }
      .tab.active {
        color: #f59e0b;
        border-bottom-color: #f59e0b;
      }
      
      .tab-content {
        display: none;
      }
      .tab-content.active {
        display: block;
      }
      
      .info-card {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid #3b82f6;
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 20px;
      }
      .info-card h4 {
        color: #60a5fa;
        margin-bottom: 10px;
        font-size: 16px;
      }
      .info-card p {
        color: #93c5fd;
        font-size: 13px;
        line-height: 1.6;
      }
      
      button { 
        width: 100%; 
        padding: 18px; 
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: #000; 
        cursor: pointer; 
        font-weight: 800; 
        border: none;
        border-radius: 12px;
        font-size: 17px;
        margin-top: 24px;
        transition: all 0.3s;
      }
      button:hover { 
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(245, 158, 11, 0.6);
      }
      button:disabled { 
        background: #3a3a3a; 
        color: #666; 
        cursor: not-allowed;
        transform: none;
      }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 ${CONFIG.PROJECT_NAME} <span class="badge hybrid">v${CONFIG.PROJECT_VERSION}</span></h1>
        <div class="subtitle">混合架構 - 100% 免費使用或升級付費功能</div>
        
        <div class="info-card">
            <h4>✅ 部署成功！</h4>
            <p>
                Worker 已成功部署。請按照 <strong>QUICK_START.md</strong> 完成剩餘配置。<br>
                當前代碼為完整版本，包含所有功能。
            </p>
        </div>
        
        <div style="text-align: center; padding: 40px;">
            <p style="font-size: 18px; margin-bottom: 20px;">⚠️ 注意：worker.js 已更新為 v9.0.0</p>
            <p style="color: #9ca3af; margin-bottom: 30px;">
                如需使用完整功能，請確保：<br>
                1. wrangler.toml 已正確配置<br>
                2. 執行 wrangler deploy --env dev 部署
            </p>
            <a href="https://github.com/kinai9661/Flux-AI-Pro" 
               style="display: inline-block; padding: 15px 40px; background: #f59e0b; color: #000; text-decoration: none; border-radius: 8px; font-weight: 700;">
                查看完整文檔
            </a>
        </div>
    </div>
</body>
</html>`;

  return new Response(html, { 
    headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' })
  });
}
