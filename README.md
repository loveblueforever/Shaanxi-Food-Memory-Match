# Shaanxi Food Memory Match · 陕西美食记忆翻牌

A pure front-end memory matching game about Shaanxi food. Flip two cards — if they show the same dish, you get a match and its introduction card pops up. Match all the pairs to win, and browse every dish anytime in the **Food Codex**. English is the primary language, with Chinese as the secondary language throughout the UI.

一款纯前端的「陕西美食」记忆翻牌小游戏：翻开两张卡牌，是同一道美食就配对成功并弹出介绍卡，全部配对完成即通关。**美食图鉴**中可随时查看全部美食，点击名字即可打开介绍卡。界面以**英文为主、中文为辅**的双语形式呈现。

Tech stack / 技术栈：`HTML + CSS + Vanilla JavaScript` — **no dependencies, no CDN, no build tools**. Just double-click `index.html`.
无任何外部依赖、无 CDN、无构建工具，双击 `index.html` 即可运行。

---

## 1. Project Structure · 目录结构

```
index.html          Page structure / 页面结构（Start / Game / Pause overlay / Intro card / Codex）
style.css           All styles / 全部样式（theme colors, 3D card flip, responsive）
game.js             All logic / 全部逻辑（data, state machine, flip & match, timer, codex）
assets/             ← Put food images here / 请放入美食 JPG 图片（卡面与介绍卡共用同一张）
README.md           This file / 本说明文件
```

---

## 2. How to Run · 如何运行

1. Copy the whole project folder anywhere on your computer. / 把项目文件夹复制到本地任意位置。
2. (Optional but recommended) Drop the images listed below into `assets/`. / （可选但推荐）按下表把图片放进 `assets/` 目录。
3. **Double-click `index.html`** and it runs in your browser. / **双击 `index.html`**，用浏览器打开即可开始游戏。
   - You can also right-click → "Open in browser", or use Live Server in VS Code. / 也可以右键「在浏览器中打开」，或用 VS Code 的 Live Server。
   - No Node.js and no internet connection required. / 不需要安装 Node.js，不需要联网。

> The game works without any images: a missing image falls back to a grey placeholder with the dish name, and the layout stays intact.
> 没有图片也能正常玩：图片缺失时会自动显示灰底 + 美食名字，布局不会错乱。

---

## 3. Images You Need to Add · 请自行放入的图片清单

### Naming rules · 命名规则

- Image / 图片：`assets/<pinyin>.jpg` — one image is used for both the card front and the intro card. The **file name must match exactly (case-sensitive) and the extension must be `.jpg`**.
  一张图同时用于卡面与介绍卡，**文件名必须完全一致（区分大小写），扩展名必须是 `.jpg`**。
- Suggested size / 建议尺寸：800×600 or square; keep each file under 200 KB. / 800×600 或方图，单张控制在 200KB 以内。
- Card backs are drawn with CSS (gradient + 「陕」 + "SHAANXI"), **no image file needed**. / 卡牌背面为 CSS 绘制（渐变 + 「陕」 + "SHAANXI"），无需图片。

### Files to add (10 in total) · 需要放入的文件（共 10 个）

| Dish · 美食 | Image file · 图片文件名 |
| --- | --- |
| Roujiamo · 肉夹馍 | `roujiamo.jpg` |
| Liangpi · 凉皮 | `liangpi.jpg` |
| Yangrou Paomo · 羊肉泡馍 | `yangroupaomo.jpg` |
| Biangbiang Mian · biangbiang 面 | `biangbiangmian.jpg` |
| Saozi Mian · 臊子面 | `saozimian.jpg` |
| Niangpi · 酿皮 | `niangpi.jpg` |
| Zenggao · 甑糕 | `zenggao.jpg` |
| Guokui · 锅盔 | `guokui.jpg` |
| Youpo Mian · 油泼面 | `youpomian.jpg` |
| Lumo · 炉馍 | `lumo.jpg` |

- Put each file once in the `assets/` folder, e.g. `assets/roujiamo.jpg`.
  每个图片只需在 `assets/` 目录放一份，例如 `assets/roujiamo.jpg`。
- To add or remove dishes, edit the `FOODS` array at the top of `game.js` and add the matching images.
  想增删美食：编辑 `game.js` 顶部的 `FOODS` 数组，并补上对应图片。
- To change image paths or format, edit the `image` field in `FOODS`.
  想改图片路径或格式：在 `FOODS` 里修改 `image` 字段即可（卡面与介绍卡会一起生效）。

---

## 4. How to Play · 玩法说明

| Feature · 功能 | Description · 说明 |
| --- | --- |
| Difficulty · 难度 | Easy 4×3 (6 pairs) / Normal 4×4 (8 pairs) / Hard 4×5 (10 pairs) · 简单 6 对 / 普通 8 对 / 困难 10 对 |
| Flipping · 翻牌 | At most 2 cards open at a time; already open cards can't be clicked again. · 同时最多翻开 2 张，已翻开不可再点 |
| Match · 配对成功 | Cards stay face up and an intro card pops up; you can't flip again until it's closed. · 保持正面并弹出介绍卡，关闭后才能继续翻牌 |
| Mismatch · 配对失败 | Cards flip back automatically after about 0.8 s. · 约 0.8 秒后自动翻回 |
| Score · 计分 | Live "Matched / Total", "Flips", "Time". · 实时显示已配对/总对数、翻牌次数、用时 |
| Pause · 暂停 | Stops the timer and shows an overlay: Resume or End Game. · 停止计时并显示遮罩，可选继续或结束 |
| Food Codex · 美食图鉴 | Enter from the top right; every dish is open from the start — click any name to open its intro card; "← Back to Game" returns to the previous state. · 右上角进入，全部美食开放显示，点击任意名字打开介绍卡，左上角返回进入前的状态 |
| Win · 通关 | All pairs matched → result popup: Play Again or Back to Start. · 全部配对完成弹出结算，可选再玩一次或返回开始界面 |

---

## 5. State Machine · 状态机（`game.js`）

```
START ──Start Game──▶ PLAYING ──Pause──▶ PAUSED ──Resume──▶ PLAYING
                       │  ▲                                  │
                       │  └──────────── End Game ────────────┘
                       │
        all pairs matched ▼
                     FINISHED ──Play Again──▶ PLAYING
                              ──Back to Start──▶ START

PLAYING / PAUSED ──Food Codex──▶ CODEX ──Back to Game──▶ back to the state before entering
PLAYING / PAUSED ──美食图鉴──▶ CODEX ──返回游戏──▶ 回到进入前的状态（PLAYING 或 PAUSED）
```

- Entering the codex while playing pauses the game automatically (timer stops, cards locked).
  进入图鉴前若正在游戏，会自动暂停（停表、禁用翻牌）。
- Returning from the codex restores the previous state: PLAYING resumes the timer, PAUSED shows the pause overlay again.
  从图鉴返回时恢复进入前的状态：进去前是 PLAYING 则继续计时，是 PAUSED 则重新显示暂停遮罩。
- Switching to another browser tab pauses the game automatically so the timer stays accurate.
  页面切到后台时会自动暂停，避免计时不准。

---

## 6. Main Functions · 主要函数一览

| Function | Responsibility · 职责 |
| --- | --- |
| `initGame(diff)` | Initialize the game with a difficulty · 按难度初始化游戏 |
| `buildDeck(pairs)` / `shuffle(arr)` | Build and shuffle the deck · 生成并打乱牌组 |
| `renderBoard()` | Render the card grid · 渲染卡牌网格 |
| `flipCard(card)` | Handle flipping one card · 处理单张卡牌翻开 |
| `checkMatch()` | Decide whether two cards match · 判定两张卡是否配对 |
| `startTimer()` / `stopTimer()` / `updateStats()` | Timer and score display · 计时与计分显示 |
| `pauseGame(showOverlay)` / `resumeGame()` / `endGame()` / `finishGame()` | Pause, resume, end, and win handling · 暂停、继续、结束、通关结算 |
| `openIntro(foodId)` / `closeIntro()` | Open / close the food intro card · 打开 / 关闭美食介绍卡 |
| `openCodex()` / `closeCodex()` / `renderCodex()` | Open / close / render the Food Codex · 打开 / 关闭 / 渲染美食图鉴 |
