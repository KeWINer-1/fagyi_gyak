# Fagyi Gyak - feladatleiras (STUDENT)

## Cel
A `STUDENT` frontend vazat kell befejezni ugy, hogy viselkedesben es kinezetben a `MEGOLDAS` mappaban levo megoldast adja vissza.

## Fontos
- A backend es az SQL mar kesz, ezekhez most nem kell hozzanyulni.
- A feladat lenyege a frontend kitoltese: `index.html`, `add-fagyi.html`, `style.css`, `app.js`.
- A `link.md` fajlban levo hatterkep-linket fel kell hasznalni a hos szekcio hatterekehez.

## Feladatok fajlonkent

## 1) `frontend/index.html`
Toltsd ki az ures reszeket az alabbiak szerint:
- `<title>`: legyen ertelmes cim (a megoldasban fagyizos admin oldal).
- CSS/Bootstrap linkek: `style.css` es Bootstrap 5.3.3 CDN.
- Navigacio:
  - brand felirat
  - desktop es mobil menu
  - gombok: fooldal, lekerdezes, uj fagyi
- `#fooldal` hos szekcio:
  - hatter + sotet retegezett overlay
  - fo cim, rovid leiras, 2 CTA gomb
- `#lekerdezes` szekcio:
  - szurok a megfelelo ID-kkal:
    - `fagyiNevKereso`
    - `tipusSzuro`
    - `elerhetosegSzuro`
    - `rendezesValaszto`
  - lekerdezo gomb: `fagyiLekerdezoGomb`
  - uzenet kontener: `fagyiMuveletUzenet`
  - kartya kontener: `fagyiKartyaTarolo`
- Footer kitoltese.
- Modalok hozzaadasa a megfelelo ID-kkal:
  - `szerkesztesModal`
  - `torlesModal`
  - `visszajelzesModal`
- Script betoltes:
  - Bootstrap bundle
  - `app.js`

## 2) `frontend/add-fagyi.html`
Toltsd ki az oldalt:
- Head-ben a style es Bootstrap linkek.
- Ugyanaz a menu logika, mint az index oldalon.
- Fo tartalom:
  - kozepre rendezett kartya benne urlappal
  - form ID: `fagyiUrlap`
  - mezo ID-k:
    - `fagyiNev`
    - `fagyiTipus`
    - `fagyiAr`
    - `fagyiLeiras`
    - `fagyiElerheto`
  - visszajelzo kontener: `uzenet`
- Footer kitoltese.
- Script betoltes:
  - Bootstrap bundle
  - `app.js`

## 3) `frontend/style.css`
Egeszitsd ki a hianyzo blokkokat:
- `.hos-hatter`:
  - `position: absolute; inset: 0;`
  - `background-image` a `link.md` szerinti URL-lel
  - `background-position: center;`
  - `background-size: cover;`
  - `background-repeat: no-repeat;`
- `.szekcio-eltolas`:
  - `scroll-margin-top: 50px;`

## 4) `frontend/app.js`
A vazfuggvenyeket teljesen implementalni kell.

Kotelezo elemek:
- `API_URL` beallitasa: `http://localhost:4000/api`
- `uzenetMutat(cim, szoveg, tipus)`:
  - visszajelzes modal cime/uzenete
  - hibanal piros, sikernel zold stilus
- `tipusokBetoltese(selectId)`:
  - `GET /tipusok`
  - opciok feltoltese
- `fagyiKartyaKeszites(fagyi)`:
  - Bootstrap kartya generalasa
  - Szerkesztes es Torles gomb data attributumokkal
- `fagyikLekerdezese()`:
  - `GET /fagylaltok` query paramokkal:
    - `nev`, `tipus`, `elerheto`, `rendezes`
  - kartya lista rendereles
  - siker/hiba visszajelzes
- `szerkesztesModalMegnyit(gomb)` + submit kezeles:
  - modal feltoltese a kivalasztott adatokka
  - `PUT /fagylaltok/:id`
  - lista frissites siker utan
- `torlesModalMegnyit(gomb)` + megerosites:
  - `DELETE /fagylaltok/:id`
  - lista frissites siker utan
- `ujFagyiMentese(e)`:
  - `POST /fagylaltok`
  - sikeres mentes utan form reset + visszajelzes
- Inditasi resz:
  - csak akkor kot eventeket, ha az adott DOM elem letezik
  - tipusok betoltese a megfelelo selectekbe

## Ellenorzes (minimum)
1. Inditsd a backendet:
   - `cd backend`
   - `npm install`
   - `npm start`
2. Nyisd meg a `frontend/index.html` oldalt.
3. Ellenorizd:
   - lekerdezes mukodik
   - tipus es tobbi szures mukodik
   - szerkesztes modal ment
   - torles modal torol
4. Nyisd meg a `frontend/add-fagyi.html` oldalt.
5. Ellenorizd:
   - uj fagyi hozzaadasa sikeres
   - visszajelzes megjelenik

## Ertekelesi szempont
A megoldas akkor jo, ha a `STUDENT/frontend` oldalak funkcionalisan es UI-ban a `MEGOLDAS/frontend` viselkedest hozzak.
