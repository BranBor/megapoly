# Megapoly

A 2-player, hot-seat browser board game inspired by Monopoly. Vanilla HTML/CSS/JS — fully static, no backend or database required.

![Board overview](assets/images/screenshots/board-overview.png)

## Features

- 56-cell board laid out as a ring of clickable tiles across four sides
- Two animated player tokens that move around the board
- Per-cell stats panel — solvency, logistics level, population, robbery risk, and skilled staff — generated client-side each time you load the page
- 9 purchasable business types (Warehouse, Retail Store, Metals Manufacturing Plant, Cafe, Jewelry Store, Electronics Store, Pharmacy, IT Company, Fabric Factory), each with its own cost and profit
- Two "warehouse" info panels, loaded as iframes, showing the selected cell's business image, name, cost, and profit
- Per-player summary panel with cash total and business count
- Dice-roll / set-business flow with a turn indicator

## Tech stack

- HTML5 + CSS3 (flexbox layouts, CSS custom properties for theming)
- Vanilla JavaScript (talks to same-origin iframes via `contentWindow.document`)
- Google Fonts (Comfortaa, Tenor Sans)

No server-side language, database, or build step — everything runs in the browser.

## Project structure

```
megapoly/
├── index.html                        # main board page
├── informpanel_2_warehouse.html      # right-hand business info panel (iframe)
├── informpanel_2_warehouse_left.html # left-hand business info panel (iframe)
├── assets/
│   ├── css/                          # stylesheets
│   ├── js/
│   │   └── monogomik.js              # game logic, incl. cell-stat generation
│   └── images/
│       ├── business/                 # business tile artwork
│       ├── players/                  # player token SVGs
│       └── screenshots/
├── .gitignore
├── .gitattributes
├── LICENSE
└── README.md
```

## Getting started

The game is fully static — no PHP, no database, no build step. That said, the two info panels are loaded as `<iframe>`s and the game script reaches into them via `contentWindow.document`, and several browsers (Chrome in particular) restrict that kind of cross-document access when a page is opened directly from disk (`file://`). So while you *can* just double-click `index.html`, if the info panels don't update on click, serve the folder over `http://` instead — no server-side language required, just a static file server.

### Option A: just open the file

1. Clone the repo:
   ```bash
   git clone https://github.com/<you>/megapoly.git
   ```
2. Double-click `index.html` (or open it with your browser's File → Open). This works fine in Firefox; if you're on Chrome/Edge and the info panels stay blank, use Option B below.

### Option B: serve it locally (recommended, still no PHP needed)

Any static file server works — pick whichever you already have installed:

- **Node.js**: `npx serve .` from the project root, then open the URL it prints.
- **Python 3**: `python3 -m http.server 8000` from the project root, then open `http://localhost:8000/index.html`.
- **VS Code**: install the "Live Server" extension, right-click `index.html`, and choose "Open with Live Server".
- **XAMPP** (or WAMP/MAMP): drop the folder into `htdocs` (e.g. `C:\xampp\htdocs\megapoly`), start Apache, and open `http://localhost/megapoly/index.html`. This works too, even though PHP/MySQL aren't actually used by the game.

## Known limitations

These are carried over from notes already in the code, not new issues:

- **Cell stats are random and not persisted.** Solvency/logistics/population/safety/staff are re-rolled with `Math.random()` in `assets/js/monogomik.js` on every page load — there's no backend or save file behind them.
- **Lap counting isn't fully separated per player** — flagged in a comment in `assets/js/monogomik.js`.
- **No game state persistence.** Refreshing the page resets progress; there's no save/load between sessions.

## License

MIT — see [LICENSE](LICENSE). It was added as a reasonable default since the project didn't specify one; swap it for whatever you'd prefer.
