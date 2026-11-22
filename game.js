/* ============================================================
   陕西美食记忆翻牌 —— 游戏逻辑
   纯原生 JS，无任何依赖，双击 index.html 即可运行
   结构：① 数据  ② 元素引用  ③ 状态机  ④ 游戏流程  ⑤ 图鉴  ⑥ 事件绑定
   ============================================================ */

/* ============================================================
   ① 数据区 / DATA
   ------------------------------------------------------------
   FOODS：陕西美食列表（英文为主，中文为辅）
   - name / nameZh：英文名 / 中文名
   - image：图片路径 assets/食物拼音.jpg（卡面与介绍卡共用同一张图，请用户自行放入同名 jpg）
   - desc / descZh：英文简介 / 中文简介
   注意：代码中不生成、不内联任何图片数据，只写相对路径。
   困难难度（4×5 = 10 对）需要 10 种美食，故这里准备 10 条数据。
   ============================================================ */
const FOODS = [
  {
    id: 'roujiamo',
    name: 'Roujiamo',
    nameZh: '肉夹馍',
    image: 'assets/roujiamo.jpg',
    desc: 'Shaanxi\'s signature street snack: shredded braised pork stuffed into a freshly baked white ji-mo bun. The bun is crisp, the meat is tender and juicy — locals call it the Chinese hamburger.',
    descZh: '陕西的招牌小吃，腊汁肉剁碎夹进刚出炉的白吉馍，馍酥肉烂、汁香四溢。当地人叫它“中式汉堡”，咬一口热气腾腾，最是解馋。'
  },
  {
    id: 'liangpi',
    name: 'Liangpi',
    nameZh: '凉皮',
    image: 'assets/liangpi.jpg',
    desc: 'Cold skin noodles made from wheat starch, cut into strips and dressed with vinegar, garlic water and chili oil. Springy, tangy and refreshing — a Shaanxi summer favorite.',
    descZh: '用小麦面粉洗出面筋后蒸成的皮子，切成细条，浇上醋、蒜水与油泼辣子。口感筋道爽滑，酸辣开胃，夏天吃上一碗浑身舒坦。'
  },
  {
    id: 'yangroupaomo',
    name: 'Yangrou Paomo',
    nameZh: '羊肉泡馍',
    image: 'assets/yangroupaomo.jpg',
    desc: 'Xi\'an\'s most ceremonial bowl of food: you tear the flat mo bread into tiny pieces yourself, then the cook simmers them in rich mutton broth. Served with sweet pickled garlic and chili sauce.',
    descZh: '西安最有仪式感的一碗饭，讲究自己把坨坨馍掰成黄豆大小，再交给师傅加羊肉汤煮。汤浓肉烂、馍筋入味，配糖蒜与辣酱更地道。'
  },
  {
    id: 'biangbiangmian',
    name: 'Biangbiang Mian',
    nameZh: 'biangbiang 面',
    image: 'assets/biangbiangmian.jpg',
    desc: 'Noodles as wide as a belt, slapped on the counter with a loud "biang biang" sound — that is how they got the name. Topped with chili flakes and finished with a splash of sizzling hot oil.',
    descZh: '面条宽如裤带，在案板上摔打时发出“biáng biáng”声响，因此得名。热油一泼，辣子香立刻窜起来，一根面就能吃个半饱。'
  },
  {
    id: 'saozimian',
    name: 'Saozi Mian',
    nameZh: '臊子面',
    image: 'assets/saozimian.jpg',
    desc: 'A festive noodle from the Guanzhong plain: thin noodles in a sour-spicy broth with diced tofu, wood ear and daylily. Locals say it should be thin, springy, glossy and piping hot.',
    descZh: '关中人逢年过节必吃的面，细长面条浇上酸辣鲜香的臊子汤，配以豆腐丁、木耳、黄花菜。讲究“薄筋光、煎稀汪”，一碗面汤也能喝光。'
  },
  {
    id: 'niangpi',
    name: 'Niangpi',
    nameZh: '酿皮',
    image: 'assets/niangpi.jpg',
    desc: 'A Shaanxi cold noodle skin that is even thinner than liangpi, cut into fine strips and served with cilantro and slivers of lamb liver, dressed with vinegar, garlic water and chili oil.',
    descZh: '比凉皮更薄的冷食面皮，切成细条，配上香菜和羊肝片，再浇上醋、蒜水与辣椒油。'
  },
  {
    id: 'zenggao',
    name: 'Zenggao',
    nameZh: '甑糕',
    image: 'assets/zenggao.jpg',
    desc: 'A sweet steamed cake of glutinous rice and red dates, layered and cooked for hours in an old zeng steamer. Sticky, soft and full of date fragrance — a classic Xi\'an breakfast.',
    descZh: '糯米与红枣一层层码进老甑里蒸成的甜糕，枣香渗进米中，甜糯黏软。西安街头常见一层层刮下来卖，是许多人记忆里的早点。'
  },
  {
    id: 'guokui',
    name: 'Guokui',
    nameZh: '锅盔',
    image: 'assets/guokui.jpg',
    desc: 'A thick baked flatbread as big as a pot lid, golden and crisp outside, soft and layered inside. Once the traveler\'s ration because it keeps well, best eaten with a bowl of soup.',
    descZh: '像锅盖一样大的厚实烙饼，外皮金黄酥脆，内里层层柔软。以前是赶路人的干粮，耐放顶饱，配一碗汤面最是相宜。'
  },
  {
    id: 'youpomian',
    name: 'Youpo Mian',
    nameZh: '油泼面',
    image: 'assets/youpomian.jpg',
    desc: 'Wide handmade noodles topped with chili flakes and scallions, then hit with a ladle of smoking hot oil. The simplest recipe and one of the most aromatic bowls in Shaanxi.',
    descZh: '宽面条上撒辣椒面与葱花，一勺滚油“刺啦”泼下，香气瞬间炸开。做法极简却极香，是陕西面食里最直击味蕾的一碗。'
  },
  {
    id: 'lumo',
    name: 'Lumo',
    nameZh: '炉馍',
    image: 'assets/lumo.jpg',
    desc: 'A traditional Shaanxi bun baked in a clay oven: golden and crisp on the outside, soft and layered inside, with a light aroma of oil and salt. Eaten with soup or porridge.',
    descZh: '陕西传统的炉烤面食，外皮金黄酥脆、内里层层松软，带着一点油盐香。多配汤粥食用，过去也是出门赶路时的干粮。'
  }
];

/* ============================================================
   ② 元素引用
   ============================================================ */
const el = {
  // 屏幕
  screenStart: document.getElementById('screen-start'),
  screenGame: document.getElementById('screen-game'),
  screenCodex: document.getElementById('screen-codex'),
  // 开始界面
  diffOptions: document.getElementById('diff-options'),
  btnStart: document.getElementById('btn-start'),
  // 游戏界面
  btnPause: document.getElementById('btn-pause'),
  btnCodex: document.getElementById('btn-codex'),
  statPairs: document.getElementById('stat-pairs'),
  statPairsTotal: document.getElementById('stat-pairs-total'),
  statFlips: document.getElementById('stat-flips'),
  statTime: document.getElementById('stat-time'),
  board: document.getElementById('board'),
  // 暂停遮罩
  overlayPause: document.getElementById('overlay-pause'),
  btnResume: document.getElementById('btn-resume'),
  btnEnd: document.getElementById('btn-end'),
  // 介绍卡弹窗
  modalIntro: document.getElementById('modal-intro'),
  introImg: document.getElementById('intro-img'),
  introImgBox: document.querySelector('.intro-img-box'),
  introName: document.getElementById('intro-name'),
  introNameZh: document.getElementById('intro-name-zh'),
  introDesc: document.getElementById('intro-desc'),
  introDescZh: document.getElementById('intro-desc-zh'),
  btnIntroClose: document.getElementById('btn-intro-close'),
  // 结算弹窗
  modalResult: document.getElementById('modal-result'),
  resultText: document.getElementById('result-text'),
  btnReplay: document.getElementById('btn-replay'),
  btnBackStart: document.getElementById('btn-back-start'),
  // 图鉴
  btnCodexBack: document.getElementById('btn-codex-back'),
  codexList: document.getElementById('codex-list'),
  codexProgress: document.getElementById('codex-progress')
};

/* ============================================================
   ③ 状态机与全局变量
   ------------------------------------------------------------
   状态：START → PLAYING ⇄ PAUSED → START
         PLAYING/PAUSED → CODEX → 回到进入前的状态
         PLAYING → FINISHED（全部配对完成）
   ============================================================ */
const STATE = {
  START: 'START',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
  CODEX: 'CODEX'
};

// 三档难度：cols 列数 / rows 行数 / pairs 对数
const DIFFICULTIES = {
  easy: { cols: 4, rows: 3, pairs: 6 },
  normal: { cols: 4, rows: 4, pairs: 8 },
  hard: { cols: 4, rows: 5, pairs: 10 }
};

let state = STATE.START;          // 当前状态
let stateBeforeCodex = STATE.PLAYING; // 进入图鉴前的状态，用于返回
let difficulty = DIFFICULTIES.easy;   // 当前难度

let deck = [];                    // 当前牌组（已打乱）
let matchedCount = 0;             // 已配对对数
let flipCount = 0;                // 翻牌次数
let seconds = 0;                  // 已用时（秒）
let timerId = null;               // 计时器句柄

let firstCard = null;             // 第一张翻开的卡
let secondCard = null;            // 第二张翻开的卡
let lockBoard = true;             // true 时禁止翻牌（翻牌动画/弹窗期间）
let introOpen = false;            // 介绍卡弹窗是否打开

/* ============================================================
   ④ 游戏流程
   ============================================================ */

/**
 * 初始化游戏：按难度生成牌组、清空计分、渲染棋盘、进入 PLAYING
 */
function initGame(diff) {
  difficulty = diff || difficulty;

  // 重置计数与牌面状态
  matchedCount = 0;
  flipCount = 0;
  seconds = 0;
  firstCard = null;
  secondCard = null;
  introOpen = false;

  deck = buildDeck(difficulty.pairs);
  renderBoard();
  updateStats();

  state = STATE.PLAYING;
  lockBoard = false;
  stopTimer();
  startTimer();
  showScreen('screen-game');
  el.overlayPause.classList.add('hidden');
  el.modalResult.classList.add('hidden');
  updatePauseButton();
}

/**
 * 生成牌组：随机抽 pairs 种美食，每种两张（共 pairs*2 张）后打乱
 */
function buildDeck(pairs) {
  const picked = shuffle(FOODS.slice()).slice(0, pairs);
  const cards = [];
  picked.forEach((food, index) => {
    // pid 是配对标识：同一种美食的两张卡 pid 相同
    cards.push({ pid: index, food: food });
    cards.push({ pid: index, food: food });
  });
  return shuffle(cards);
}

/** 洗牌（Fisher-Yates） */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 渲染棋盘：按难度设置列数，逐张生成卡牌 DOM
 */
function renderBoard() {
  el.board.innerHTML = '';
  el.board.style.setProperty('--cols', difficulty.cols);

  deck.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.pid = item.pid;      // 配对标识
    card.dataset.fid = item.food.id;  // 美食 id（用于打开介绍卡）
    card.innerHTML =
      '<div class="card-inner">' +
      '  <div class="card-front">' +
      '    <img src="' + item.food.image + '" alt="' + item.food.name + '">' +
      '    <span class="food-name"><b>' + item.food.name + '</b><em>' + item.food.nameZh + '</em></span>' +
      '  </div>' +
      '  <div class="card-back"></div>' +
      '</div>';

    // 图片缺失时显示灰底 + 名字占位，不破坏布局
    const img = card.querySelector('img');
    img.addEventListener('error', () => {
      card.classList.add('no-img');
    });

    card.addEventListener('click', () => flipCard(card));
    el.board.appendChild(card);
  });
}

/**
 * 翻牌：处理点击某张卡牌的逻辑
 * 只有 PLAYING 状态、未锁定、未被翻开/配对的卡才能翻
 */
function flipCard(card) {
  if (state !== STATE.PLAYING) return;                 // 非游戏中不可翻
  if (lockBoard || introOpen) return;                  // 正在翻回/弹窗期间不可翻
  if (card.classList.contains('flipped')) return;      // 已翻开
  if (card.classList.contains('matched')) return;      // 已配对

  card.classList.add('flipped');
  flipCount++;
  updateStats();

  if (!firstCard) {
    firstCard = card;         // 第一张
    return;
  }

  secondCard = card;          // 第二张
  checkMatch();
}

/**
 * 判定两张牌是否配对
 */
function checkMatch() {
  const a = firstCard;
  const b = secondCard;
  lockBoard = true; // 判定期间先锁住，避免连点翻开第三张

  if (a.dataset.pid === b.dataset.pid) {
    // —— 配对成功 ——
    a.classList.add('matched');
    b.classList.add('matched');
    matchedCount++;
    updateStats();

    const foodId = a.dataset.fid;
    firstCard = null;
    secondCard = null;

    // 等翻转动画结束再弹出介绍卡；弹窗关闭前不响应新的翻牌
    setTimeout(() => openIntro(foodId), 420);
  } else {
    // —— 配对失败：延时约 800ms 翻回 ——
    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 800);
  }
}

/* ---------- 计时 ---------- */

function startTimer() {
  if (timerId !== null) return;
  timerId = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

/** 刷新计时显示（mm:ss） */
function updateTimerDisplay() {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  el.statTime.textContent = m + ':' + s;
}

/** 刷新计分区（配对对数、翻牌次数、总对数） */
function updateStats() {
  el.statPairs.textContent = matchedCount;
  el.statPairsTotal.textContent = difficulty.pairs;
  el.statFlips.textContent = flipCount;
  updateTimerDisplay();
}

/* ---------- 暂停 / 继续 / 结束 ---------- */

/**
 * 暂停游戏
 * @param {boolean} showOverlay 是否显示暂停遮罩（进图鉴时传 false）
 */
function pauseGame(showOverlay) {
  if (state !== STATE.PLAYING) return;
  state = STATE.PAUSED;
  stopTimer();
  lockBoard = true;
  if (showOverlay !== false) el.overlayPause.classList.remove('hidden');
  updatePauseButton();
}

/** 继续游戏 */
function resumeGame() {
  if (state !== STATE.PAUSED) return;
  state = STATE.PLAYING;
  lockBoard = false;
  startTimer();
  el.overlayPause.classList.add('hidden');
  updatePauseButton();
}

/** 结束游戏：重置棋盘与计时，回到开始界面 */
function endGame() {
  stopTimer();
  state = STATE.START;
  lockBoard = true;
  firstCard = null;
  secondCard = null;
  introOpen = false;
  seconds = 0;
  flipCount = 0;
  matchedCount = 0;
  deck = [];
  el.board.innerHTML = '';
  el.overlayPause.classList.add('hidden');
  el.modalIntro.classList.add('hidden');
  el.modalResult.classList.add('hidden');
  updatePauseButton();
  showScreen('screen-start');
}

/** 全部配对完成：进入 FINISHED 并弹出结算 */
function finishGame() {
  state = STATE.FINISHED;
  lockBoard = true;
  stopTimer();
  updatePauseButton();

  el.resultText.innerHTML =
    'All ' + difficulty.pairs + ' pairs matched · Flips: ' + flipCount + ' · Time: ' + el.statTime.textContent +
    '<br>共 ' + difficulty.pairs + ' 对美食，翻牌 ' + flipCount + ' 次，用时 ' + el.statTime.textContent + '。';
  el.modalResult.classList.remove('hidden');
}

/** 暂停按钮：只有在 PLAYING / PAUSED 才可用 */
function updatePauseButton() {
  el.btnPause.disabled = !(state === STATE.PLAYING || state === STATE.PAUSED);
}

/* ---------- 视图切换 ---------- */

function showScreen(id) {
  el.screenStart.classList.toggle('active', id === 'screen-start');
  el.screenGame.classList.toggle('active', id === 'screen-game');
  el.screenCodex.classList.toggle('active', id === 'screen-codex');
}

/* ============================================================
   ⑤ 美食介绍卡 + 美食图鉴
   ============================================================ */

/**
 * 打开美食介绍卡弹窗
 * @param {string} foodId 美食 id
 */
function openIntro(foodId) {
  const food = FOODS.find(f => f.id === foodId);
  if (!food) return;

  el.introName.textContent = food.name;
  el.introNameZh.textContent = food.nameZh;
  el.introDesc.textContent = food.desc;
  el.introDescZh.textContent = food.descZh;

  // 图片位置留空由用户放入；加载失败时显示文字占位
  el.introImgBox.classList.remove('img-error');
  el.introImg.onerror = () => el.introImgBox.classList.add('img-error');
  el.introImg.src = food.image;
  el.introImg.alt = food.name;

  el.modalIntro.classList.remove('hidden');
  introOpen = true;
}

/** 关闭介绍卡弹窗；若此时已全部配对完成则进入结算 */
function closeIntro() {
  el.modalIntro.classList.add('hidden');
  introOpen = false;

  if (matchedCount === difficulty.pairs && state === STATE.PLAYING) {
    finishGame();
  } else if (state === STATE.PLAYING) {
    lockBoard = false; // 恢复翻牌
  }
}

/**
 * 打开美食图鉴：若正在游戏中则先暂停（不显示暂停遮罩），返回时恢复原状态
 */
function openCodex() {
  if (state === STATE.CODEX) return;

  if (state === STATE.PLAYING) {
    pauseGame(false);        // 先暂停：停表、禁点
    stateBeforeCodex = STATE.PLAYING;
  } else if (state === STATE.PAUSED) {
    el.overlayPause.classList.add('hidden');
    stateBeforeCodex = STATE.PAUSED;
  } else {
    // START / FINISHED 状态下不允许进图鉴
    return;
  }

  state = STATE.CODEX;
  el.modalIntro.classList.add('hidden');
  introOpen = false;
  renderCodex();
  showScreen('screen-codex');
}

/** 关闭图鉴，回到进入前的状态 */
function closeCodex() {
  if (state !== STATE.CODEX) return;

  if (stateBeforeCodex === STATE.PAUSED) {
    state = STATE.PAUSED;
    lockBoard = true;
    el.overlayPause.classList.remove('hidden'); // 恢复暂停遮罩
  } else {
    state = STATE.PLAYING;
    lockBoard = false;
    startTimer();                              // 恢复计时
  }

  updatePauseButton();
  showScreen('screen-game');
}

/**
 * 渲染图鉴列表：全部美食开放显示（缩略图 + 英文名 + 中文名）
 * 点击任意美食名字 → 打开介绍卡
 */
function renderCodex() {
  el.codexList.innerHTML = '';

  FOODS.forEach(food => {
    const item = document.createElement('div');
    item.className = 'codex-item';
    item.innerHTML =
      '<div class="codex-thumb">' +
      '<img src="' + food.image + '" alt="' + food.name + '">' +
      '</div>' +
      '<button class="codex-name" type="button">' +
      '<span class="nm-en">' + food.name + '</span><span class="nm-zh">' + food.nameZh + '</span>' +
      '</button>';

    // 缩略图缺失时保持灰底，不影响布局
    const img = item.querySelector('img');
    img.addEventListener('error', () => { img.remove(); });

    item.querySelector('.codex-name').addEventListener('click', () => openIntro(food.id));

    el.codexList.appendChild(item);
  });

  el.codexProgress.textContent =
    FOODS.length + ' dishes · 共 ' + FOODS.length + ' 道美食';
}

/* ============================================================
   ⑥ 事件绑定
   ============================================================ */

// 开始界面：难度选择
el.diffOptions.addEventListener('click', e => {
  const btn = e.target.closest('.diff-btn');
  if (!btn) return;
  el.diffOptions.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  difficulty = DIFFICULTIES[btn.dataset.diff];
  el.statPairsTotal.textContent = difficulty.pairs;
});

// 开始游戏
el.btnStart.addEventListener('click', () => initGame(difficulty));

// 暂停 / 继续 / 结束
el.btnPause.addEventListener('click', () => pauseGame(true));
el.btnResume.addEventListener('click', () => resumeGame());
el.btnEnd.addEventListener('click', () => endGame());

// 图鉴入口与返回
el.btnCodex.addEventListener('click', () => openCodex());
el.btnCodexBack.addEventListener('click', () => closeCodex());

// 介绍卡关闭
el.btnIntroClose.addEventListener('click', () => closeIntro());

// 结算：再玩一次 / 返回开始界面
el.btnReplay.addEventListener('click', () => initGame(difficulty));
el.btnBackStart.addEventListener('click', () => endGame());

// 点击遮罩空白处关闭介绍卡（暂停遮罩与结算弹窗需点按钮，避免误触）
el.modalIntro.addEventListener('click', e => {
  if (e.target === el.modalIntro) closeIntro();
});

// 页面被切到后台时自动暂停，避免计时不准
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state === STATE.PLAYING) pauseGame(true);
});

// 初始化：刷新计分显示与按钮状态
updateStats();
updatePauseButton();
