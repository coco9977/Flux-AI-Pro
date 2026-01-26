// =================================================================================
//  多語言翻譯檔案 (i18n Translations)
//  支援語言：繁體中文 (zh)、英文 (en)、日文 (ja)、韓文 (ko)、阿拉伯語 (ar - RTL)
// =================================================================================

export const TRANSLATIONS = {
  // ====== 繁體中文 (zh) ======
  zh: {
    // 導航選項
    nav_gen: "🎨 生成圖像",
    nav_his: "📚 歷史記錄",
    nav_nano: "🍌 Nano版",
    
    // 設定標籤
    settings_title: "⚙️ 生成參數",
    provider_label: "API 供應商",
    model_label: "模型選擇",
    size_label: "尺寸預設",
    style_label: "藝術風格 🎨",
    quality_label: "質量模式",
    seed_label: "Seed (種子碼)",
    seed_random: "🎲 隨機",
    seed_lock: "🔒 鎖定",
    auto_opt_label: "✨ 自動優化",
    auto_opt_desc: "自動調整 Steps 與 Guidance",
    adv_settings: "🛠️ 進階參數",
    steps_label: "生成步數 (Steps)",
    guidance_label: "引導係數 (Guidance)",
    
    // 按鈕
    gen_btn: "🎨 開始生成",
    btn_export: "📥 導出",
    btn_clear: "🗑️ 清空",
    btn_reuse: "🔄 重用",
    btn_dl: "💾 下載",
    
    // 提示詞相關
    pos_prompt: "正面提示詞",
    neg_prompt: "負面提示詞 (可選)",
    ref_img: "參考圖像 (Img2Img) 📸",
    
    // 狀態訊息
    empty_title: "尚未生成任何圖像",
    no_history: "暫無歷史記錄",
    cooldown_msg: "⏳ 請等待冷卻時間...",
    generating: "生成中...",
    
    // 統計
    stat_total: "📊 總記錄數",
    stat_storage: "💾 存儲空間 (永久)",
    
    // Nano 版專用
    nano_title: "🍌 NanoBanana Pro - 控制台",
    nano_prompt: "Prompt",
    nano_canvas_ratio: "畫布比例",
    nano_style_settings: "風格與設定",
    nano_exclude: "排除",
    nano_energy_per_hour: "每小時能量",
    nano_consume_energy: "消耗 1 香蕉能量",
    nano_energy_recharging: "能量回充中",
    nano_injecting_energy: "正在注入 AI 能量",
    nano_generating: "生成中",
    nano_uploading_image: "上傳圖片",
    nano_energy_depleted: "本小時能量已耗盡",
    nano_come_back_later: "請稍後再來",
    nano_dice: "🎲 靈感骰子",
    
    // 提示詞生成器
    prompt_generator_title: "專業提示詞生成器",
    prompt_generator_upload_ref: "上傳參考圖片 (可選)",
    prompt_generator_select_image: "選擇圖片",
    prompt_generator_simple_desc: "簡單描述你想要的畫面",
    prompt_generator_generate: "生成專業提示詞",
    prompt_generator_apply: "應用到提示詞",
    prompt_generator_generated: "生成的專業提示詞",
    prompt_generator_tip: "💡 小提示：選擇左側的「藝術風格」後，生成器會自動融合該風格（如：賽博龐克、水墨畫等）到提示詞中，讓畫面更具藝術感！",
    
    // 質量模式
    quality_economy: "Economy",
    quality_standard: "Standard",
    quality_ultra: "Ultra HD",
    quality_economy_desc: "快速出圖",
    quality_standard_desc: "平衡質量與速度",
    quality_ultra_desc: "極致質量",
    
    // 供應商
    provider_pollinations: "Pollinations.ai (Free)",
    provider_infip: "Ghostbot (Infip) 🌟",
    
    // API Key
    api_key_label: "API Key",
    api_key_desc: "Stored locally",
    api_key_placeholder: "Paste your API Key here",
    api_key_get_key: "Get free key from",
    
    // NSFW
    nsfw_label: "🔞 解除成人內容限制 (NSFW)",
    nsfw_desc: "啟用此選項將允許生成成人內容 (僅 Infip)",
    
    // 批量生成
    batch_label: "🖼️ 批量生成",
    batch_size_label: "生成數量 (Batch Size)",
    
    // 錯誤訊息
    error_no_prompt: "⚠️ 請輸入提示詞",
    error_energy_depleted: "🚫 本小時能量已耗盡，請稍後再來！",
    error_image_too_large: "圖片太大！最大 5MB",
    error_invalid_file: "請選擇圖片文件",
    error_upload_failed: "上傳失敗",
    
    // 語言切換
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어"
  },
  
  // ====== 英文 (en) ======
  en: {
    // Navigation
    nav_gen: "🎨 Generate Image",
    nav_his: "📚 History",
    nav_nano: "🍌 Nano",
    
    // Settings
    settings_title: "⚙️ Generation Settings",
    provider_label: "API Provider",
    model_label: "Model Selection",
    size_label: "Image Size",
    style_label: "Art Style 🎨",
    quality_label: "Quality Mode",
    seed_label: "Seed Value",
    seed_random: "🎲 Random",
    seed_lock: "🔒 Lock",
    auto_opt_label: "✨ Auto Optimize",
    auto_opt_desc: "Automatically adjust Steps & Guidance",
    adv_settings: "🛠️ Advanced Settings",
    steps_label: "Generation Steps",
    guidance_label: "Guidance Scale",
    
    // Buttons
    gen_btn: "🎨 Start Generation",
    btn_export: "📥 Export",
    btn_clear: "🗑️ Clear All",
    btn_reuse: "🔄 Reuse Settings",
    btn_dl: "💾 Download",
    
    // Prompts
    pos_prompt: "Positive Prompt",
    neg_prompt: "Negative Prompt (Optional)",
    ref_img: "Reference Image (Img2Img) 📸",
    
    // Status Messages
    empty_title: "No images generated yet",
    no_history: "No history records found",
    cooldown_msg: "⏳ Please wait for cooldown...",
    generating: "Generating...",
    
    // Statistics
    stat_total: "📊 Total Records",
    stat_storage: "💾 Storage Space (Permanent)",
    
    // Nano Version
    nano_title: "🍌 NanoBanana Pro - Console",
    nano_prompt: "Prompt",
    nano_canvas_ratio: "Canvas Ratio",
    nano_style_settings: "Style & Settings",
    nano_exclude: "Exclude",
    nano_energy_per_hour: "Energy per Hour",
    nano_consume_energy: "Consume 1 Banana Energy",
    nano_energy_recharging: "Energy Recharging",
    nano_injecting_energy: "Injecting AI Energy...",
    nano_generating: "Generating",
    nano_uploading_image: "Uploading Image",
    nano_energy_depleted: "Energy Depleted This Hour",
    nano_come_back_later: "Please come back later",
    nano_dice: "🎲 Inspiration Dice",
    
    // Prompt Generator
    prompt_generator_title: "Professional Prompt Generator",
    prompt_generator_upload_ref: "Upload Reference Image (Optional)",
    prompt_generator_select_image: "Select Image",
    prompt_generator_simple_desc: "Simply describe the image you want",
    prompt_generator_generate: "Generate Professional Prompt",
    prompt_generator_apply: "Apply to Prompt",
    prompt_generator_generated: "Generated Professional Prompt",
    prompt_generator_tip: "💡 Tip: After selecting an 'Art Style' on the left, the generator will automatically blend that style (e.g., Cyberpunk, Ink Wash) into your prompt for more artistic results!",
    
    // Quality Modes
    quality_economy: "Economy",
    quality_standard: "Standard",
    quality_ultra: "Ultra HD",
    quality_economy_desc: "Fast generation",
    quality_standard_desc: "Balanced quality & speed",
    quality_ultra_desc: "Maximum quality",
    
    // Providers
    provider_pollinations: "Pollinations.ai (Free)",
    provider_infip: "Ghostbot (Infip) 🌟",
    
    // API Key
    api_key_label: "API Key",
    api_key_desc: "Stored locally",
    api_key_placeholder: "Paste your API Key here",
    api_key_get_key: "Get free key from",
    
    // NSFW
    nsfw_label: "🔞 Disable NSFW Filter",
    nsfw_desc: "Enable this option to allow adult content generation (Infip only)",
    
    // Batch Generation
    batch_label: "🖼️ Batch Generation",
    batch_size_label: "Batch Size",
    
    // Error Messages
    error_no_prompt: "⚠️ Please enter a prompt",
    error_energy_depleted: "🚫 Energy depleted this hour, please come back later!",
    error_image_too_large: "Image too large! Max size is 5MB",
    error_invalid_file: "Please select an image file",
    error_upload_failed: "Upload failed",
    
    // Language Switch
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어"
  },
  
  // ====== 日文 (ja) ======
  ja: {
    // ナビゲーション
    nav_gen: "🎨 画像生成",
    nav_his: "📚 履歴",
    nav_nano: "🍌 Nano版",
    
    // 設定
    settings_title: "⚙️ 生成設定",
    provider_label: "API プロバイダー",
    model_label: "モデル選択",
    size_label: "画像サイズ",
    style_label: "アートスタイル 🎨",
    quality_label: "品質モード",
    seed_label: "シード値",
    seed_random: "🎲 ランダム",
    seed_lock: "🔒 固定",
    auto_opt_label: "✨ 自動最適化",
    auto_opt_desc: "ステップ数とガイダンスを自動調整",
    adv_settings: "🛠️ 詳細設定",
    steps_label: "生成ステップ数",
    guidance_label: "ガイダンススケール",
    
    // ボタン
    gen_btn: "🎨 生成開始",
    btn_export: "📥 エクスポート",
    btn_clear: "🗑️ 全削除",
    btn_reuse: "🔄 再利用",
    btn_dl: "💾 ダウンロード",
    
    // プロンプト
    pos_prompt: "ポジティブプロンプト",
    neg_prompt: "ネガティブプロンプト（任意）",
    ref_img: "参照画像 (Img2Img) 📸",
    
    // ステータスメッセージ
    empty_title: "まだ画像が生成されていません",
    no_history: "履歴がありません",
    cooldown_msg: "⏳ クールダウンをお待ちください...",
    generating: "生成中...",
    
    // 統計
    stat_total: "📊 総記録数",
    stat_storage: "💾 ストレージ（永続）",
    
    // Nano版
    nano_title: "🍌 NanoBanana Pro - コンソール",
    nano_prompt: "プロンプト",
    nano_canvas_ratio: "キャンバス比率",
    nano_style_settings: "スタイルと設定",
    nano_exclude: "除外",
    nano_energy_per_hour: "1時間あたりのエネルギー",
    nano_consume_energy: "バナナエネルギー1消費",
    nano_energy_recharging: "エネルギー充電中",
    nano_injecting_energy: "AIエネルギー注入中...",
    nano_generating: "生成中",
    nano_uploading_image: "画像アップロード中",
    nano_energy_depleted: "今時間のエネルギーが枯渇しました",
    nano_come_back_later: "後でもう一度お越しください",
    nano_dice: "🎲 インスピレーションダイス",
    
    // プロンプトジェネレーター
    prompt_generator_title: "プロフェッショナルプロンプトジェネレーター",
    prompt_generator_upload_ref: "参照画像をアップロード（任意）",
    prompt_generator_select_image: "画像を選択",
    prompt_generator_simple_desc: "作成したい画像を簡単に説明",
    prompt_generator_generate: "プロフェッショナルプロンプトを生成",
    prompt_generator_apply: "プロンプトに適用",
    prompt_generator_generated: "生成されたプロフェッショナルプロンプト",
    prompt_generator_tip: "💡 ヒント：左側の「アートスタイル」を選択すると、ジェネレーターがそのスタイル（サイバーパンク、水墨画など）を自動的にプロンプトにブレンドし、より芸術的な結果が得られます！",
    
    // 品質モード
    quality_economy: "エコノミー",
    quality_standard: "スタンダード",
    quality_ultra: "ウルトラHD",
    quality_economy_desc: "高速生成",
    quality_standard_desc: "品質と速度のバランス",
    quality_ultra_desc: "最高品質",
    
    // プロバイダー
    provider_pollinations: "Pollinations.ai (無料)",
    provider_infip: "Ghostbot (Infip) 🌟",
    
    // API Key
    api_key_label: "APIキー",
    api_key_desc: "ローカルに保存",
    api_key_placeholder: "ここにAPIキーを貼り付け",
    api_key_get_key: "無料キーを取得",
    
    // NSFW
    nsfw_label: "🔞 NSFWフィルターを無効化",
    nsfw_desc: "このオプションを有効にすると、成人向けコンテンツの生成が可能になります（Infipのみ）",
    
    // バッチ生成
    batch_label: "🖼️ バッチ生成",
    batch_size_label: "バッチサイズ",
    
    // エラーメッセージ
    error_no_prompt: "⚠️ プロンプトを入力してください",
    error_energy_depleted: "🚫 今時間のエネルギーが枯渇しました。後でもう一度お越しください！",
    error_image_too_large: "画像が大きすぎます！最大サイズは5MBです",
    error_invalid_file: "画像ファイルを選択してください",
    error_upload_failed: "アップロードに失敗しました",
    
    // 言語切り替え
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어"
  },
  
  // ====== 韓文 (ko) ======
  ko: {
    // 네비게이션
    nav_gen: "🎨 이미지 생성",
    nav_his: "📚 기록",
    nav_nano: "🍌 Nano",
    
    // 설정
    settings_title: "⚙️ 생성 설정",
    provider_label: "API 공급자",
    model_label: "모델 선택",
    size_label: "이미지 크기",
    style_label: "아트 스타일 🎨",
    quality_label: "품질 모드",
    seed_label: "시드 값",
    seed_random: "🎲 랜덤",
    seed_lock: "🔒 잠금",
    auto_opt_label: "✨ 자동 최적화",
    auto_opt_desc: "스텝 및 가이던스 자동 조정",
    adv_settings: "🛠️ 고급 설정",
    steps_label: "생성 스텝",
    guidance_label: "가이던스 스케일",
    
    // 버튼
    gen_btn: "🎨 생성 시작",
    btn_export: "📥 내보내기",
    btn_clear: "🗑️ 전체 삭제",
    btn_reuse: "🔄 설정 재사용",
    btn_dl: "💾 다운로드",
    
    // 프롬프트
    pos_prompt: "긍정적 프롬프트",
    neg_prompt: "부정적 프롬프트 (선택 사항)",
    ref_img: "참조 이미지 (Img2Img) 📸",
    
    // 상태 메시지
    empty_title: "아직 생성된 이미지가 없습니다",
    no_history: "기록이 없습니다",
    cooldown_msg: "⏳ 쿨다운을 기다려주세요...",
    generating: "생성 중...",
    
    // 통계
    stat_total: "📊 총 기록 수",
    stat_storage: "💾 저장 공간 (영구)",
    
    // Nano 버전
    nano_title: "🍌 NanoBanana Pro - 콘솔",
    nano_prompt: "프롬프트",
    nano_canvas_ratio: "캔버스 비율",
    nano_style_settings: "스타일 및 설정",
    nano_exclude: "제외",
    nano_energy_per_hour: "시간당 에너지",
    nano_consume_energy: "바나나 에너지 1 소모",
    nano_energy_recharging: "에너지 충전 중",
    nano_injecting_energy: "AI 에너지 주입 중...",
    nano_generating: "생성 중",
    nano_uploading_image: "이미지 업로드 중",
    nano_energy_depleted: "이번 시간 에너지가 소진되었습니다",
    nano_come_back_later: "나중에 다시 방문해주세요",
    nano_dice: "🎲 영감 주사위",
    
    // 프롬프트 생성기
    prompt_generator_title: "전문 프롬프트 생성기",
    prompt_generator_upload_ref: "참조 이미지 업로드 (선택 사항)",
    prompt_generator_select_image: "이미지 선택",
    prompt_generator_simple_desc: "원하는 이미지를 간단히 설명",
    prompt_generator_generate: "전문 프롬프트 생성",
    prompt_generator_apply: "프롬프트에 적용",
    prompt_generator_generated: "생성된 전문 프롬프트",
    prompt_generator_tip: "💡 팁: 왼쪽의 '아트 스타일'을 선택하면 생성기가 해당 스타일(사이버펑크, 수묵화 등)을 자동으로 프롬프트에 혼합하여 더 예술적인 결과를 얻을 수 있습니다!",
    
    // 품질 모드
    quality_economy: "이코노미",
    quality_standard: "스탠다드",
    quality_ultra: "울트라 HD",
    quality_economy_desc: "빠른 생성",
    quality_standard_desc: "품질과 속도의 균형",
    quality_ultra_desc: "최고 품질",
    
    // 공급자
    provider_pollinations: "Pollinations.ai (무료)",
    provider_infip: "Ghostbot (Infip) 🌟",
    
    // API Key
    api_key_label: "API 키",
    api_key_desc: "로컬에 저장",
    api_key_placeholder: "여기에 API 키를 붙여넣으세요",
    api_key_get_key: "무료 키 받기",
    
    // NSFW
    nsfw_label: "🔞 NSFW 필터 비활성화",
    nsfw_desc: "이 옵션을 활성화하면 성인 콘텐츠 생성이 허용됩니다 (Infip만 해당)",
    
    // 배치 생성
    batch_label: "🖼️ 배치 생성",
    batch_size_label: "배치 크기",
    
    // 오류 메시지
    error_no_prompt: "⚠️ 프롬프트를 입력하세요",
    error_energy_depleted: "🚫 이번 시간 에너지가 소진되었습니다. 나중에 다시 방문해주세요!",
    error_image_too_large: "이미지가 너무 큽니다! 최대 크기는 5MB입니다",
    error_invalid_file: "이미지 파일을 선택하세요",
    error_upload_failed: "업로드 실패",
    
    // 언어 전환
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어"
  },
  
  // ====== 阿拉伯語 (ar) - RTL ======
  ar: {
    // التنقل
    nav_gen: "🎨 إنشاء صورة",
    nav_his: "📚 السجل",
    nav_nano: "🍌 Nano",
    
    // الإعدادات
    settings_title: "⚙️ إعدادات الإنشاء",
    provider_label: "مزود API",
    model_label: "اختيار النموذج",
    size_label: "حجم الصورة",
    style_label: "النمط الفني 🎨",
    quality_label: "وضع الجودة",
    seed_label: "قيمة البذرة",
    seed_random: "🎲 عشوائي",
    seed_lock: "🔒 قفل",
    auto_opt_label: "✨ تحسين تلقائي",
    auto_opt_desc: "ضبط الخطوات والتوجيه تلقائيًا",
    adv_settings: "🛠️ إعدادات متقدمة",
    steps_label: "خطوات الإنشاء",
    guidance_label: "مقياس التوجيه",
    
    // الأزرار
    gen_btn: "🎨 بدء الإنشاء",
    btn_export: "📥 تصدير",
    btn_clear: "🗑️ مسح الكل",
    btn_reuse: "🔄 إعادة الاستخدام",
    btn_dl: "💾 تنزيل",
    
    // المطالبات
    pos_prompt: "موجه إيجابي",
    neg_prompt: "موجه سلبي (اختياري)",
    ref_img: "صورة مرجعية (Img2Img) 📸",
    
    // رسائل الحالة
    empty_title: "لم يتم إنشاء أي صور بعد",
    no_history: "لا توجد سجلات",
    cooldown_msg: "⏳ يرجى الانتظار...",
    generating: "جاري الإنشاء...",
    
    // الإحصائيات
    stat_total: "📊 إجمالي السجلات",
    stat_storage: "💾 مساحة التخزين (دائمة)",
    
    // إصدار Nano
    nano_title: "🍌 NanoBanana Pro - وحدة التحكم",
    nano_prompt: "موجه",
    nano_canvas_ratio: "نسبة اللوحة",
    nano_style_settings: "النمط والإعدادات",
    nano_exclude: "استبعاد",
    nano_energy_per_hour: "الطاقة لكل ساعة",
    nano_consume_energy: "استهلاك 1 طاقة موز",
    nano_energy_recharging: "إعادة شحن الطاقة",
    nano_injecting_energy: "حقن طاقة AI...",
    nano_generating: "جاري الإنشاء",
    nano_uploading_image: "رفع الصورة",
    nano_energy_depleted: "نفدت الطاقة لهذه الساعة",
    nano_come_back_later: "يرجى العودة لاحقًا",
    nano_dice: "🎲 نرد الإلهام",
    
    // مولد المطالبات
    prompt_generator_title: "مولد المطالبات الاحترافي",
    prompt_generator_upload_ref: "رفع صورة مرجعية (اختياري)",
    prompt_generator_select_image: "اختر صورة",
    prompt_generator_simple_desc: "صف الصورة التي تريدها ببساطة",
    prompt_generator_generate: "إنشاء موجه احترافي",
    prompt_generator_apply: "تطبيق على الموجه",
    prompt_generator_generated: "الموجه الاحترافي المُنشأ",
    prompt_generator_tip: "💡 نصيحة: بعد تحديد 'نمط فني' على اليسار، سيقوم المولد بدمج هذا النمط (مثل السايبربانك، الرسم بالحبر) تلقائيًا في موجهك للحصول على نتائج أكثر فنية!",
    
    // أوضاع الجودة
    quality_economy: "اقتصادي",
    quality_standard: "قياسي",
    quality_ultra: "فائق الدقة",
    quality_economy_desc: "إنشاء سريع",
    quality_standard_desc: "توازن الجودة والسرعة",
    quality_ultra_desc: "أقصى جودة",
    
    // المزودون
    provider_pollinations: "Pollinations.ai (مجاني)",
    provider_infip: "Ghostbot (Infip) 🌟",
    
    // مفتاح API
    api_key_label: "مفتاح API",
    api_key_desc: "مخزن محليًا",
    api_key_placeholder: "الصق مفتاح API هنا",
    api_key_get_key: "احصل على مفتاح مجاني من",
    
    // NSFW
    nsfw_label: "🔞 تعطيل فلتر NSFW",
    nsfw_desc: "تمكين هذا الخيار للسماح بإنشاء محتوى للبالغين (Infip فقط)",
    
    // الإنشاء المجموع
    batch_label: "🖼️ إنشاء مجموع",
    batch_size_label: "حجم المجموعة",
    
    // رسائل الخطأ
    error_no_prompt: "⚠️ يرجى إدخال موجه",
    error_energy_depleted: "🚫 نفدت الطاقة لهذه الساعة، يرجى العودة لاحقًا!",
    error_image_too_large: "الصورة كبيرة جدًا! الحد الأقصى 5 ميجابايت",
    error_invalid_file: "يرجى اختيار ملف صورة",
    error_upload_failed: "فشل الرفع",
    
    // تبديل اللغة
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  }
};

// ====== 語言配置 ======
export const LANGUAGE_CONFIG = {
  zh: {
    name: "繁體中文",
    nativeName: "繁體中文",
    flag: "🇹🇼",
    direction: "ltr",
    dateFormat: "zh-TW"
  },
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
    dateFormat: "en-US"
  },
  ja: {
    name: "日本語",
    nativeName: "日本語",
    flag: "🇯🇵",
    direction: "ltr",
    dateFormat: "ja-JP"
  },
  ko: {
    name: "한국어",
    nativeName: "한국어",
    flag: "🇰🇷",
    direction: "ltr",
    dateFormat: "ko-KR"
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
    dateFormat: "ar-SA"
  }
};

// ====== 支援的語言列表 ======
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CONFIG);

// ====== 預設語言 ======
export const DEFAULT_LANGUAGE = 'zh';

// ====== 獲取翻譯 ======
export function getTranslation(lang, key) {
  const translations = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
  return translations[key] || key;
}

// ====== 獲取所有翻譯 ======
export function getTranslations(lang) {
  return TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
}

// ====== 檢查語言是否支援 ======
export function isLanguageSupported(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

// ====== 獲取語言配置 ======
export function getLanguageConfig(lang) {
  return LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
}
