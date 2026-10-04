/* =====================================================================
   網站內容設定檔  ——  以後更新網站，只需要改這一個檔案
   ---------------------------------------------------------------------
   三個規則：
   1. 文字要用 "雙引號" 包起來
   2. 每一筆資料的結尾都要有逗號 ,
   3. 改完存檔，重新整理網頁就會看到

   改壞了也不用怕：網頁會直接顯示「第幾行有問題」。
   詳細教學請看同資料夾的 README.md
   ===================================================================== */

const SITE = {

  /* ───────────── 基本資料 ───────────── */
  name: "ZY WANG",
  nameZh: "王子陽",
  brand: "ZYWANG.Filmmaking",
  tagline: "用鏡頭記錄故事，讓故事充實生命",
  intro: "深耕影音創作領域，涵蓋劇情、廣告與 MV。擅長從零開始構思劇本，並透過鏡頭、精細的剪輯與調光，為品牌打造專屬的視覺風格，將抽象的品牌精神轉換為過目不忘的視覺饗宴。",

  // 首頁最上面的滿版大圖
  heroImage: "images/photos/bts-08.jpg",

  // 首頁的精華影片（Showreel），貼上 YouTube 網址；不想放就留空 ""
  showreel: "https://youtu.be/Wo32pRO8Idk",

  // 首頁「關於」區塊的兩張照片
  introPhotos: [
    "https://framerusercontent.com/images/hj6ZfatYgsb5Q7PidC38GNXWig.jpg",
    "images/photos/intro-02.jpg",
  ],

  /* ───────────── 聯絡方式 ─────────────
     不想顯示的項目，把引號裡面清空就好，例如 phone: "",           */
  contact: {
    phone: "",
    email: "wang11290413@gmail.com",
    instagram: "zy.secret_1224",   // IG 帳號，不用加 @
    youtube: "",                   // YouTube 頻道網址，沒有就留空
  },

  // 選單上「影片需求調查單」的連結
  requestForm: "https://docs.google.com/forms/d/e/1FAIpQLSdLjztRxINK7nSaRzHIykhJu-f2zA6wsfwoZPW0T3by4eeAgw/viewform",


  /* ───────────── 工作類型（首頁的分區） ─────────────
     id      ：分類名稱，作品裡的 categories 要寫一樣的字
     en / zh ：英文 / 中文標題
     desc    ：分類底下的小字
     cover   ：首頁卡片的圖
     banner  ：點進分類後，最上面的大圖
     showreel：（選填）放在分類頁最上面的精華影片                     */
  categories: [
    {
      id: "編導",
      en: "Director",
      zh: "編劇／導演",
      desc: "劇情片／廣告／短影音",
      cover: "images/works/fathers-debt.jpg",
      banner: "https://framerusercontent.com/images/XEi2tIYn0RIEPQiCdQOyDuRIEdI.png",
    },
    {
      id: "動態攝影",
      en: "Videography",
      zh: "動態攝影",
      desc: "劇情片／廣告／紀錄片／短影音／活動紀錄",
      cover: "images/works/passenger.jpg",
      banner: "https://framerusercontent.com/images/kAejbDvSsoybzbdUrZFWFWiWDVg.png",
    },
    {
      id: "剪輯調光",
      en: "Edit / Colorist",
      zh: "剪輯／調光",
      desc: "劇情片／廣告／紀錄片／活動紀錄／短影音",
      cover: "images/works/ask-me.jpg",
      banner: "https://framerusercontent.com/images/TTtBaG8iRNOya9qsa0Tr7nH5j4.png",
    },
    {
      id: "動畫特效",
      en: "Animation / VFX",
      zh: "動畫／合成",
      desc: "劇情片／廣告／紀錄片／活動紀錄／短影音",
      cover: "images/works/passenger-teaser.jpg",
      banner: "https://framerusercontent.com/images/zGZo10TQdIZoRh8Idkus5tGglU.png",
      showreel: "https://youtu.be/Wo32pRO8Idk",
    },
    {
      id: "人像攝影",
      en: "Portrait Photoshoot",
      zh: "人像攝影",
      desc: "",
      cover: "https://framerusercontent.com/images/oCooB1F6lru1KQVUOJFHTILlXH8.jpg",
      banner: "https://framerusercontent.com/images/KD0cTC8hWGVstcaCtUk2Sp6QBE.png",
      albums: true,   // 這個分類顯示下面的「人像相簿」，不是影片
    },
  ],


  /* ───────────── 作品 ─────────────
     ★ 新增作品：複製下面這個範本，貼在 works: [ 的下一行（最上面＝最新）

    {
      title: "作品名稱",
      year: 2026,
      type: "劇情短片",                   // 片種：劇情短片、紀錄片、形象廣告、音樂影像…
      roles: "編導／攝影／剪輯／調光",     // 你的職位，用／隔開；跟別人合作寫成 剪輯（與某某）
      categories: ["編導", "剪輯調光"],   // 要出現在哪些分類（名稱要跟上面的 id 一樣）
      youtube: "貼上 YouTube 網址",
      cover: "",                          // 封面圖；留空會自動用 YouTube 縮圖
      awards: ["2026 某某影展 首獎"],      // 得獎，沒有就寫 []
      note: "",                           // 補充說明，例如「畢業製作」
    },

     說明：
     - 有 youtube 的作品會有自己的作品頁，並出現在 categories 寫的分類裡
     - 只填 title / year / roles 的作品，只會出現在「經歷」的年表
     - 有 year 的作品會自動排進年表；awards 會自動出現在獎項列表
     - 排列順序就是這裡的順序                                       */
  works: [

    /* ── 2026 ── */
    {
      title: "喜邁高",
      year: 2026,
      type: "形象廣告",
      roles: "剪輯／調光／動畫",
      categories: ["剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/LpFyRYJH1vk",
      cover: "images/works/smaryall.jpg",
      awards: [],
      note: "",
    },

    /* ── 2025 ── */
    {
      title: "載客途中",
      year: 2025,
      type: "劇情短片",
      roles: "攝影／剪輯／調光",
      categories: ["動態攝影", "剪輯調光"],
      youtube: "https://youtu.be/qJtKxqmxhYM",
      cover: "images/works/passenger.jpg",
      awards: [],
      note: "朝陽科技大學 畢業製作",
    },
    {
      title: "《載客途中》前導片",
      year: "",
      type: "概念片",
      roles: "編導／剪輯／調光／合成",
      categories: ["編導", "動畫特效"],
      youtube: "https://youtu.be/r7GCwnMxCic",
      cover: "images/works/passenger-teaser.jpg",
      awards: [],
      note: "",
    },
    {
      title: "獻給七秒後的妳",
      year: 2025,
      type: "劇情短片",
      roles: "攝影二助／剪輯協力／動畫／合成",
      categories: ["剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/qCsKhDkFMpk",
      cover: "images/works/seven-seconds.jpg",
      awards: [],
      note: "朝陽科技大學 畢業製作",
    },
    {
      title: "Dr.Eighteen",
      year: 2025,
      type: "劇情短片",
      roles: "編導／攝影／剪輯／調光／合成",
      categories: ["編導", "動態攝影", "剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/QIIZNRdlzWs",
      cover: "",
      awards: ["2025 Feeling巧克力競賽 最佳人氣獎"],
      note: "",
    },
    { title: "Watch out怎麼卡在廁所", year: 2025, roles: "剪輯協力／視效合成" },
    {
      title: "妳，我，他",
      year: 2025,
      type: "紀錄片",
      roles: "調光",
      categories: ["剪輯調光"],
      youtube: "https://youtu.be/toz2zXQ-Gvk",
      cover: "images/works/you-me-him.jpg",
      awards: ["2025神腦原鄉踏查紀錄片 大專學生組佳作"],
      note: "朝陽科技大學 畢業製作",
    },
    { title: "臨時牌", year: 2025, roles: "DIT", note: "公視學生劇展" },
    {
      title: "True love style花絮",
      year: 2025,
      type: "幕後花絮",
      roles: "攝影／剪輯／調光／動畫",
      categories: ["動態攝影", "剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/z7P_TbWq5hE",
      cover: "images/works/true-love-bts.jpg",
      awards: [],
      note: "",
    },
    {
      title: "問我，乾五想你",
      year: 2025,
      type: "音樂影像",
      roles: "調光",
      categories: ["剪輯調光"],
      youtube: "https://youtu.be/NOUhpo9c3hU",
      cover: "images/works/ask-me.jpg",
      awards: [],
      note: "",
    },
    { title: "大卡司巴掌篇", year: 2025, type: "短影音", roles: "腳本／攝影／剪輯／調光／動畫" },
    { title: "大卡司回憶篇", year: 2025, type: "短影音", roles: "腳本／攝影／剪輯／調光／動畫" },
    { title: "大卡司",       year: 2025, type: "短影音", roles: "腳本／攝影／剪輯／調光／動畫" },

    /* ── 2024 ── */
    {
      title: "冥界駕訓班",
      year: 2024,
      type: "劇情短片",
      roles: "編導／攝影／剪輯／調光／合成",
      categories: ["編導", "動態攝影", "剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/ksVBFrpNIrw",
      cover: "images/works/hell-driving-school.jpg",
      awards: ["2024和潤企業機車道安影片徵選賽 亞軍"],
      note: "",
    },
    {
      title: "聲林露營區",
      year: 2024,
      type: "節目製作",
      roles: "剪輯／調光／動畫",
      categories: ["剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/UpwwY_00zVQ",
      cover: "images/works/voice-camp.jpg",
      awards: [],
      note: "",
    },
    { title: "風揚吉他社", year: 2024, type: "直播", roles: "製作人" },

    /* ── 2023 ── */
    {
      title: "家有父債",
      year: 2023,
      type: "劇情短片",
      roles: "編導／剪輯／合成／2D動畫",
      categories: ["編導", "剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/k70ljU7YRFQ",
      cover: "images/works/fathers-debt.jpg",
      awards: ["青春有影 百大精選獎"],
      note: "",
    },
    {
      title: "偷車賊",
      year: 2023,
      type: "劇情短片",
      roles: "編導／剪輯／調光",
      categories: ["編導", "剪輯調光"],
      youtube: "https://youtu.be/G8k4vtxIcv4",
      cover: "images/works/car-thief.jpg",
      awards: ["2023遠雄人壽第五屆金險獎 入圍"],
      note: "",
    },
    {
      title: "黑狼機",
      year: 2023,
      type: "產品廣告",
      roles: "燈光／調光／合成",
      categories: ["剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/yurL6XWyh9s",
      cover: "images/works/black-wolf.jpg",
      awards: [],
      note: "",
    },
    {
      title: "面對面－19",
      year: 2023,
      type: "劇情短片",
      roles: "攝影／剪輯／調光／動畫／合成",
      categories: ["動態攝影", "剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/RHDbRpHp5Js",
      cover: "images/works/face-to-face.jpg",
      awards: [],
      note: "",
    },
    {
      title: "芒草裡的貓",
      year: 2023,
      type: "劇情短片",
      roles: "編導／剪輯／調光",
      categories: ["編導", "剪輯調光"],
      youtube: "https://youtu.be/mbW-2H7-A30",
      cover: "images/works/cat-in-the-grass.jpg",
      awards: [],
      note: "",
    },
    {
      title: "星雪",
      year: 2023,
      type: "紀錄片",
      roles: "攝影／調光",
      categories: ["動態攝影", "剪輯調光"],
      youtube: "https://youtu.be/eXOX89spMaI",
      cover: "images/works/star-snow.jpg",
      awards: [],
      note: "",
    },
    { title: "遲暮",     year: 2023, roles: "錄音助理" },
    { title: "蛤",       year: 2023, roles: "燈光／調光" },
    { title: "直髮大學", year: 2023, roles: "燈光／調光" },

    /* ── 2022 ── */
    {
      title: "G小調",
      year: 2022,
      type: "劇情短片",
      roles: "編導／剪輯（與薛瑋宜）／調光",
      categories: ["編導", "剪輯調光"],
      youtube: "https://youtu.be/i6lay97yNRk",
      cover: "images/works/g-minor.jpg",
      awards: ["教育部我的未來我做主第五屆 反毒影像競賽大專組 亞軍"],
      note: "",
    },
    {
      title: "想實現那諾大的夢想",
      year: 2022,
      type: "劇情短片",
      roles: "編導／攝影／剪輯／調光",
      categories: ["編導", "動態攝影", "剪輯調光", "動畫特效"],
      youtube: "https://youtu.be/e3qPIHcgwtw",
      cover: "",
      awards: [],
      note: "",
    },
    {
      title: "在槍聲響前起跑",
      year: 2022,
      type: "劇情短片",
      roles: "編導／剪輯（與薛瑋宜）／調光",
      categories: ["編導", "剪輯調光"],
      youtube: "https://youtu.be/uaH6iK0028g",
      cover: "",
      awards: ["2022青春影展 百大精選獎"],
      note: "",
    },
    { title: "電蠹", year: 2022, roles: "剪輯／調光／合成" },
    { title: "回",   year: 2022, roles: "攝影／剪輯／調光" },

    /* ── 2021 ── */
    { title: "洄居", year: 2021, roles: "編劇／導演／攝影／剪輯／調光" },

    /* ── 2020 ── */
    { title: "麥緣",             year: 2020, roles: "攝影／剪輯／調光" },
    { title: "TLHC DANCER 2021", year: 2020, roles: "導演／攝影／剪輯／調光／特效" },

    /* ── 年份未填（不會出現在年表，填上 year 就會自動加進去）── */
    {
      title: "MV募資影片",
      year: "",
      type: "募資影片",
      roles: "攝影／剪輯／調光",
      categories: ["動態攝影", "剪輯調光"],
      youtube: "https://youtu.be/73WW_8tg2Co",
      cover: "images/works/mv-crowdfunding.jpg",
      awards: [],
      note: "",
    },
    {
      title: "九份",
      year: "",
      type: "旅拍",
      roles: "攝影／剪輯／調光",
      categories: ["動態攝影", "剪輯調光"],
      youtube: "https://youtu.be/VAGs--DF5_0",
      cover: "images/works/jiufen.jpg",
      awards: [],
      note: "",
    },
    {
      title: "午後閒談",
      year: "",
      type: "劇情短片",
      roles: "攝影（與陳彥安、兔子、吳宥萱）／剪輯／調光",
      categories: ["動態攝影", "剪輯調光"],
      youtube: "https://youtu.be/rfzMes3vYeY",
      cover: "images/works/afternoon-chat.jpg",
      awards: [],
      note: "",
    },
    {
      title: "臻品植萃",
      year: "",
      type: "形象廣告",
      roles: "剪輯／調光",
      categories: ["剪輯調光"],
      youtube: "https://youtu.be/pjcZkyU1Buc",
      cover: "images/works/fine-herbs.jpg",
      awards: [],
      note: "",
    },
    {
      title: "浮生若夢前導片",
      year: "",
      type: "影展前導片",
      roles: "調光",
      categories: ["剪輯調光"],
      youtube: "https://youtu.be/AAS-pE3o1fY",
      cover: "images/works/floating-life-teaser.jpg",
      awards: [],
      note: "",
    },
    {
      title: "回到原點片頭",
      year: "",
      type: "動畫片",
      roles: "2D動畫（與譚湘瑾）",
      categories: ["動畫特效"],
      youtube: "https://youtu.be/6jCXiAz6DUI",
      cover: "images/works/back-to-start.jpg",
      awards: [],
      note: "",
    },
    {
      title: "喵新聞動畫",
      year: "",
      type: "動畫片",
      roles: "3D動畫",
      categories: ["動畫特效"],
      youtube: "https://youtu.be/tM3AINNtskY",
      cover: "images/works/meow-news.jpg",
      awards: [],
      note: "",
    },
  ],


  /* ───────────── 人像相簿 ─────────────
     id    ：網址用的名字（英文或數字，不要重複）
     cover ：在「人像攝影」分類頁顯示的封面
     photos：相簿裡的所有照片，一行一張                              */
  albums: [
    {
      id: "cheryl",
      title: "日系外拍",
      model: "Cheryl",
      cover: "https://framerusercontent.com/images/Wh1wxHE2qudnglz5HlOqak.png",
      photos: [
        "https://framerusercontent.com/images/ybtbDxgqeWUBOxL2lmvGRiJE.png",
        "https://framerusercontent.com/images/BEwbUw8wyYS6UOo1mhniyWVcg0.png",
        "https://framerusercontent.com/images/6osqNZFKfUeDkkO6fYIGnczeqzs.png",
        "https://framerusercontent.com/images/PO7ULCaYC0UJzAJI8tg1UeViM.png",
        "https://framerusercontent.com/images/guU1UGpmAYL2lwf4p4LwsxhNdI.png",
        "https://framerusercontent.com/images/D4HryEDEEJgKpMLlDYDfg3mqnOA.png",
        "https://framerusercontent.com/images/GQ54ATSjMjYN4XTenSNTulJG9lQ.png",
        "https://framerusercontent.com/images/UhCKrpS8BtzFfI3x0PZnAkWUmA.png",
        "https://framerusercontent.com/images/fmf7JIPcr7AiXhCjUHWgIHGE.png",
        "https://framerusercontent.com/images/hrCYD4d9GNVzcWN0NN3oPX0l8o.png",
        "https://framerusercontent.com/images/wMTqGQ8jzCPPDdz8rM2FKZSJ9A.png",
        "https://framerusercontent.com/images/Jhu22ozYnn6d6zBna1kS2zDkr3I.png",
        "https://framerusercontent.com/images/aSOWgPvJBhKcYHKJ4qeAGFv8.png",
        "https://framerusercontent.com/images/cupHesSBcMW1HIjZ0zPf4dYY.png",
        "https://framerusercontent.com/images/2mmW11zXnn4Q2nhrZfIlK2L9qPg.png",
        "https://framerusercontent.com/images/wg3Zez9djTqueQeql1Oe8O6CYuA.png",
        "https://framerusercontent.com/images/Rp8CUoXCtKzSgRlzdY4l3t7HouI.png",
        "https://framerusercontent.com/images/161zlCnavi8XO31YJyC2EG6Sdlc.png",
        "https://framerusercontent.com/images/PyLIHPfCleq01zrl8CkbdgTKNw.png",
        "https://framerusercontent.com/images/7YNa6yX0NS8Gz5whTPf2C5j0Q.png",
        "https://framerusercontent.com/images/UJ6nJTXQgYS7weJe54sXsoFqfA.png",
        "https://framerusercontent.com/images/XjEJaaIETDshNoiZTTJzSOGmdJM.png",
      ],
    },
    {
      id: "kira-2",
      title: "日系外拍",
      model: "Kira",
      cover: "https://framerusercontent.com/images/oCooB1F6lru1KQVUOJFHTILlXH8.jpg",
      photos: [
        "https://framerusercontent.com/images/KD0cTC8hWGVstcaCtUk2Sp6QBE.png",
        "https://framerusercontent.com/images/oCooB1F6lru1KQVUOJFHTILlXH8.jpg",
        "https://framerusercontent.com/images/XqLaI3tOPMMGm0ZFYW6UuhXM98A.jpg",
        "https://framerusercontent.com/images/4wvkm88L6bUpDaBf0Gziizt3ogo.jpg",
        "https://framerusercontent.com/images/OWp58x9jfPquP3dvexvS4iRmYng.png",
        "https://framerusercontent.com/images/CjpTqzTf3RUpnE1YqMhLiVBNg.jpg",
      ],
    },
    {
      id: "sunny",
      title: "日系外拍",
      model: "Sunny",
      cover: "https://framerusercontent.com/images/VF3q5xSmWH2sLIzoETHb3wgxI.png",
      photos: [
        "https://framerusercontent.com/images/GpQJZ8FNCdVTbFj3UXUmVAHmcto.png",
        "https://framerusercontent.com/images/VF3q5xSmWH2sLIzoETHb3wgxI.png",
        "https://framerusercontent.com/images/UOusSL6lLJ9Dbo0g1pP5G2LyE.png",
        "https://framerusercontent.com/images/FNzsUZaedpuLQlOWhUVu31ZITs.png",
        "https://framerusercontent.com/images/JEnst6Em4roXhCL9MsxSFPM4sCI.png",
        "https://framerusercontent.com/images/hFuYO7iShANNP833xAcEAuX96o.png",
        "https://framerusercontent.com/images/HlZx5FPryvx2gTE5rXJ5Pr5iAE.png",
        "https://framerusercontent.com/images/AdFItZXLldbV8hDbvf8LN4N5s.png",
        "https://framerusercontent.com/images/vQwUTFFek6rEs0TV1P8e8h8.png",
        "https://framerusercontent.com/images/Faz3s3qGC0CTFi0aMOQ1q4jzl0.png",
        "https://framerusercontent.com/images/vbRrGzkXkj164eyZHQnvbklvUI.png",
        "https://framerusercontent.com/images/DIFBUZNP0oPLXsrorA0KYlWUEw.png",
        "https://framerusercontent.com/images/sudFunGent11aV4ljNq0Rvss.png",
      ],
    },
    {
      id: "yun",
      title: "日系外拍",
      model: "妘",
      cover: "https://framerusercontent.com/images/AmGSR5rbaBJd1NPJQU8PpM9E6Q.jpg",
      photos: [
        "https://framerusercontent.com/images/Jy23Sl135RJe601up2i3RntdYuA.png",
        "https://framerusercontent.com/images/AmGSR5rbaBJd1NPJQU8PpM9E6Q.jpg",
        "https://framerusercontent.com/images/mIITlAMqmPTztPb3gg4mx3iiBWY.jpg",
        "https://framerusercontent.com/images/XT2ZzV1Chf5IJOhYjrxDND9A.jpg",
        "https://framerusercontent.com/images/LNkqnQxaE6mhAokGJHKmRRQEN9U.jpg",
        "https://framerusercontent.com/images/z5Yp9HK1bSC8kj95M5ShYDLPT4.jpg",
        "https://framerusercontent.com/images/WfE28816EnW2q3waTGbxk0cj5s.jpg",
        "https://framerusercontent.com/images/SNaD3PCHePKZxMlwvgC3R7StwzY.jpg",
        "https://framerusercontent.com/images/DElJFrfSwsZxzObDSRp4lzkLqk.jpg",
        "https://framerusercontent.com/images/ZRl85EDyo2iv5581aX3CMjDeToM.jpg",
        "https://framerusercontent.com/images/s272bH714mEFCtc38aLcSzLD8g4.jpg",
        "https://framerusercontent.com/images/U7K7M9Uj2UIjrOoUOU235PeAn4.jpg",
        "https://framerusercontent.com/images/36L97w4OUkvkthWnrMq6saiCaI.jpg",
      ],
    },
    {
      id: "kira-1",
      title: "日系外拍",
      model: "Kira",
      cover: "https://framerusercontent.com/images/dg74snEkeM4B42F6pgEHQ1FpNDY.png",
      photos: [
        "https://framerusercontent.com/images/SFAuOamPCWkDx6dx7GvErhgVk0.png",
        "https://framerusercontent.com/images/dg74snEkeM4B42F6pgEHQ1FpNDY.png",
        "https://framerusercontent.com/images/1cROw2juq8xzzdUQjAgDWnsZZU0.png",
        "https://framerusercontent.com/images/CRwmLMcLwQMZ8aVTbv51x8bdo.png",
        "https://framerusercontent.com/images/JHJgamyHRRMjJZQJ7oC6ES2cS8.png",
        "https://framerusercontent.com/images/yivjjqmJiljXfpUxczdBwBTH4oc.png",
        "https://framerusercontent.com/images/jhMmTqmW0Ly0Fu7N0ZkNrEZsU.png",
      ],
    },
  ],


  /* ───────────── 關於我 ─────────────
     bio 裡：一般文字是段落；寫成 { quote: "..." } 會變成大字引言       */
  about: {
    photo: "https://framerusercontent.com/images/4bYnHePAvKiPhWhfw7cU3D7s2a4.jpg",
    school: "就讀於朝陽科技大學 傳播藝術系",
    position: "Screenwriter／Director／Cinematographer／Editor／Colorist／Compositing",
    skills: "DaVinci Resolve／Premiere Pro／After Effects／Cinema 4D／Photoshop／Illustrator／CLIP STUDIO PAINT",
    bio: [
      "嗨！我是子陽，我的整個學生時期是一條一直發生180度轉變的道路，從國中三年都在籃球隊，國三志願轉向繪畫，而高中唸平面設計的我，高二開始又因課程接觸了影像，對影像產生極大興趣，決定將自身大學四年奉獻給影像。",
      { quote: "過去累積的經驗將是成就未來的基石" },
      "在大學四年期間我將國中練球的態度，套用到對於影像敘事的訓練，高中剛畢業我就開始規劃軟體自學長期計劃，相較於一時的投入，漸進式長久的練習才能熟練，這讓我對後期軟體有一定程度的認知；而當我煩惱剪片調光無素材練習時，沒有就只好自己創造，開始自學編劇及導演還有拍攝，大一到大四我每學期都會尋找同儕拍攝競賽短片，這在過程中也讓我學到劇組運作，及如何說故事。",
      { quote: "反覆思考經驗並運用" },
      "在大三暑假期間，我曾到台北光孚後期公司實習，在那邊學習到最多的並不是軟體操作，而是如何當一位稱職的後期人員，影視作品最終服務的是觀眾及客戶，在影視製作當中嚴謹時時刻刻為客戶著想，光孚空間教會我如何在前期讓客戶對畫面有想像、如何讓客戶有選擇、節省雙方時間等等，這讓我在日後能更專業面對客戶。",
    ],
  },


  /* ───────────── 經歷頁的照片 ───────────── */
  experiencePhotos: [
    "images/photos/bts-01.jpg",
    "images/photos/bts-02.jpg",
    "images/photos/bts-03.jpg",
    "images/photos/bts-04.jpg",
    "images/photos/bts-05.jpg",
    "images/photos/bts-06.jpg",
    "images/photos/bts-07.jpg",
    "images/photos/bts-08.jpg",
    "images/photos/bts-09.jpg",
    "https://framerusercontent.com/images/nmixA8auQ7v0h4GuQcRWNmshXog.jpg",
    "images/photos/bts-10.jpg",
    "images/photos/bts-11.jpg",
    "images/photos/bts-12.jpg",
    "images/photos/bts-13.jpg",
    "images/photos/bts-14.jpg",
    "images/photos/bts-15.jpg",
    "images/photos/bts-16.jpg",
    "images/photos/bts-17.jpg",
    "images/photos/bts-18.jpg",
  ],

  /* ───────────── 獎項區的照片 ───────────── */
  awardPhotos: [
    "images/awards/award-01.jpg",
    "images/awards/award-02.jpg",
    "images/awards/award-03.jpg",
    "images/awards/award-04.jpg",
    "images/awards/award-05.jpg",
    "images/awards/award-06.jpg",
  ],
};
