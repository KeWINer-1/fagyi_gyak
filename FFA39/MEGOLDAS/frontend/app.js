// EREDETI

const API_URL = "http://localhost:4000/api";

// ── DOM elemek ────────────────────────────────────────────────────────────────

const fagyiKartyaTarolo  = document.getElementById("fagyiKartyaTarolo");
const fagyiLekerdezoGomb = document.getElementById("fagyiLekerdezoGomb");
const fagyiNevKereso     = document.getElementById("fagyiNevKereso");
const tipusSzuro         = document.getElementById("tipusSzuro");
const elerhetosegSzuro   = document.getElementById("elerhetosegSzuro");
const rendezesValaszto   = document.getElementById("rendezesValaszto");
const fagyiMuveletUzenet = document.getElementById("fagyiMuveletUzenet");
const statisztikaValaszto  = document.getElementById("statisztikaValaszto");
const statisztikaFejlecSor = document.getElementById("statisztikaFejlecSor");
const statisztikaTorzs     = document.getElementById("statisztikaTorzs");
const statisztikaUzenet    = document.getElementById("statisztikaUzenet");
const fagyiUrlap = document.getElementById("fagyiUrlap");
const uzenet     = document.getElementById("uzenet");

let torlesAlattiId = null;

// ── Modal segéd ───────────────────────────────────────────────────────────────

const modalShow = id => bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).show();
const modalHide = id => bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).hide();

// ── Visszajelzés ──────────────────────────────────────────────────────────────

function uzenetMutat(cim, szoveg, tipus) {
    document.getElementById("visszajelzesCim").textContent = cim;

    const szovegElem = document.getElementById("visszajelzesUzenet");
    szovegElem.textContent = szoveg;

    if (tipus === "hiba") {
        szovegElem.className = "mb-0 fw-semibold text-center text-danger";
    } else {
        szovegElem.className = "mb-0 fw-semibold text-center text-success";
    }

    modalShow("visszajelzesModal");
}


// ── Típusok betöltése ─────────────────────────────────────────────────────────

function tipusokBetoltese(selectId) {
    const selectElem = document.getElementById(selectId);
    if (!selectElem) return;

    fetch(API_URL + "/tipusok")
        .then(r => r.json())
        .then(adatok => {
            adatok.forEach(t => {
                const opcio       = document.createElement("option");
                opcio.value       = t.tipus_kod;
                opcio.textContent = t.tipus_nev;
                selectElem.appendChild(opcio);
            });
        })
        .catch(() => {
            if (fagyiMuveletUzenet) {
                fagyiMuveletUzenet.textContent = "Nem sikerült betölteni a típusokat.";
                fagyiMuveletUzenet.className   = "text-danger text-center mb-4";
            }
        });
}


// ── Fagylalt kártya ───────────────────────────────────────────────────────────

const fagyiKartyaKeszites = fagyi => {
    const oszlop = document.createElement("div");
    oszlop.className = "col-12 col-md-6 col-xl-4";
    oszlop.innerHTML = `
        <div class="card shadow-sm h-100">
            <div class="card-body">
                <h5 class="card-title fw-bold">${fagyi.nev}</h5>
                <p class="mb-2"><strong>Típus:</strong> ${fagyi.tipus_nev}</p>
                <p class="mb-2"><strong>Ár:</strong> ${fagyi.ar} Ft</p>
                <p class="mb-2">${fagyi.leiras || "Nincs leírás."}</p>
                <p class="mb-1"><strong>Elérhetőség:</strong> ${fagyi.elerheto ? "Elérhető" : "Nem elérhető"}</p>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-sm btn-outline-primary"
                        data-id="${fagyi.fagylalt_id}"
                        data-nev="${fagyi.nev}"
                        data-ar="${fagyi.ar}"
                        data-leiras="${fagyi.leiras || ""}"
                        data-elerheto="${fagyi.elerheto}"
                        data-tipuskod="${fagyi.tipus_kod}"
                        onclick="szerkesztesModalMegnyit(this)">Szerkesztés</button>
                    <button class="btn btn-sm btn-outline-danger"
                        data-id="${fagyi.fagylalt_id}"
                        data-nev="${fagyi.nev}"
                        onclick="torlesModalMegnyit(this)">Törlés</button>
                </div>
            </div>
        </div>
    `;
    return oszlop;
};

// ── Fagylaltok lekérdezése ────────────────────────────────────────────────────

function fagyikLekerdezese() {
    fagyiMuveletUzenet.textContent = "Betöltés...";
    fagyiMuveletUzenet.className = "text-muted text-center mb-4";

    const url = API_URL + "/fagylaltok"
        + "?nev=" + fagyiNevKereso.value
        + "&tipus=" + tipusSzuro.value
        + "&elerheto=" + elerhetosegSzuro.value
        + "&rendezes=" + rendezesValaszto.value;

    fetch(url)
        .then(r => r.json())
        .then(adatok => {
            fagyiKartyaTarolo.innerHTML = "";

            if (adatok.length === 0) {
                fagyiKartyaTarolo.innerHTML = "<p class='text-center text-muted'>Nincs megjeleníthető fagylalt.</p>";
            }

            adatok.forEach(f => {
                const karta = fagyiKartyaKeszites(f);
                fagyiKartyaTarolo.appendChild(karta);
            });

            fagyiMuveletUzenet.textContent = "A lekérdezés sikeres.";
            fagyiMuveletUzenet.className = "text-success text-center mb-4";
        })
        .catch(() => {
            fagyiMuveletUzenet.textContent = "Hiba történt a lekérdezés közben.";
            fagyiMuveletUzenet.className = "text-danger text-center mb-4";
        });
}



// ── Szerkesztés modal ─────────────────────────────────────────────────────────

const szerkesztesModalMegnyit = gomb => {
    document.getElementById("szerkesztesId").value       = gomb.dataset.id;
    document.getElementById("szerkesztesNev").value      = gomb.dataset.nev;
    document.getElementById("szerkesztesAr").value       = gomb.dataset.ar;
    document.getElementById("szerkesztesLeiras").value   = gomb.dataset.leiras;
    document.getElementById("szerkesztesElerheto").value = gomb.dataset.elerheto === "1" ? "igen" : "nem";

    const tipusSelect = document.getElementById("szerkestesTipus");
    tipusSelect.innerHTML = "";

    fetch(API_URL + "/tipusok")
        .then(r => r.json())
        .then(tipusok => {
            tipusok.forEach(t => {
                const opcio = document.createElement("option");
                opcio.value       = t.tipus_kod;
                opcio.textContent = t.tipus_nev;
                if (t.tipus_kod === gomb.dataset.tipuskod) opcio.selected = true;
                tipusSelect.appendChild(opcio);
            });
            modalShow("szerkesztesModal");
        });
};

document.getElementById("szerkesztesUrlap")?.addEventListener("submit", e => {
    e.preventDefault();

    const adat = {
        fagyiNev:      document.getElementById("szerkesztesNev").value,
        fagyiTipus:    document.getElementById("szerkestesTipus").value,
        fagyiAr:       document.getElementById("szerkesztesAr").value,
        fagyiLeiras:   document.getElementById("szerkesztesLeiras").value,
        fagyiElerheto: document.getElementById("szerkesztesElerheto").value
    };

    fetch(API_URL + "/fagylaltok/" + document.getElementById("szerkesztesId").value, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adat)
    })
        .then(r => r.json())
        .then(valasz => {
            modalHide("szerkesztesModal");
            uzenetMutat("Sikeres módosítás", valasz.uzenet, "siker");
            fagyikLekerdezese();
        })
        .catch(() => uzenetMutat("Hiba", "Hiba történt a módosítás során.", "hiba"));
});

// ── Törlés modal ──────────────────────────────────────────────────────────────

const torlesModalMegnyit = gomb => {
    torlesAlattiId = gomb.dataset.id;
    document.getElementById("torlesNev").textContent = gomb.dataset.nev;
    modalShow("torlesModal");
};

document.getElementById("torlesMegerosites")?.addEventListener("click", () => {
    if (!torlesAlattiId) return;

    fetch(API_URL + "/fagylaltok/" + torlesAlattiId, { method: "DELETE" })
        .then(r => r.json())
        .then(valasz => {
            modalHide("torlesModal");
            torlesAlattiId = null;
            uzenetMutat("Sikeres törlés", valasz.uzenet, "siker");
            fagyikLekerdezese();
        })
        .catch(() => {
            modalHide("torlesModal");
            uzenetMutat("Hiba", "Hiba történt a törlés során.", "hiba");
        });
});


// ── Új fagyi mentése ──────────────────────────────────────────────────────────


const ujFagyiMentese = e => {
    e.preventDefault();

    const adat = {
        fagyiNev: document.getElementById("fagyiNev").value,
        fagyiTipus: document.getElementById("fagyiTipus").value,
        fagyiAr: document.getElementById("fagyiAr").value,
        fagyiLeiras: document.getElementById("fagyiLeiras").value,
        fagyiElerheto: document.getElementById("fagyiElerheto").value
    };

    fetch(API_URL + "/fagylaltok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adat)
    })
        .then(r => r.json())
        .then(valasz => {
            uzenetMutat("Sikeres mentés", valasz.uzenet, "siker");
            fagyiUrlap.reset();
            fagyikLekerdezese(); // opcionális, hogy frissüljön a lista
        })
        .catch(() => {
            uzenetMutat("Hiba", "Hiba történt a mentés során.", "hiba");
        });
};


// ── Indítás ───────────────────────────────────────────────────────────────────

if (fagyiLekerdezoGomb) {
    tipusokBetoltese("tipusSzuro");
    fagyiLekerdezoGomb.addEventListener("click", fagyikLekerdezese);
}

statisztikaValaszto?.addEventListener("change", statisztikaLekerdezese);

if (fagyiUrlap) {
    tipusokBetoltese("fagyiTipus");
    fagyiUrlap.addEventListener("submit", ujFagyiMentese);
}
