let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const COLORS = { Food: "#f0b429", Cloths: "#a78bfa", Traveling: "#34d399", Other: "#60a5fa" };

function fmtDate(d) {
    const m = MONTHS[d.getMonth()], day = d.getDate(), y = d.getFullYear();
    return y === new Date().getFullYear() ? `${day} ${m}` : `${day} ${m} ${y}`;
}

function todayKey() {
    const d = new Date();
    return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function save() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function color(cat) {
    return COLORS[cat] || COLORS.Other;
}

function refresh() {
    const today = todayKey();
    const todayTotal = expenses.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0);
    const allTotal = expenses.reduce((s, e) => s + e.amount, 0);

    document.getElementById("todayTotal").textContent = `₹${todayTotal}`;
    document.getElementById("allTotal").textContent = `₹${allTotal}`;

    const cats = {};
    expenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + e.amount; });

    const bar = document.getElementById("summaryBar");
    const legend = document.getElementById("summaryLegend");
    bar.innerHTML = "";
    legend.innerHTML = "";

    if (allTotal > 0) {
        Object.entries(cats).forEach(([cat, amt]) => {
            const seg = document.createElement("div");
            seg.classList.add("bar-seg");
            seg.style.width = `${(amt / allTotal) * 100}%`;
            seg.style.background = color(cat);
            bar.appendChild(seg);

            const item = document.createElement("div");
            item.classList.add("legend-item");
            item.innerHTML = `<span class="legend-dot" style="background:${color(cat)}"></span>${cat} <strong>₹${amt}</strong>`;
            legend.appendChild(item);
        });
    }
}

function renderList() {
    const ul = document.getElementById("list");
    ul.innerHTML = "";
    [...expenses].reverse().forEach((e, ri) => {
        const i = expenses.length - 1 - ri;
        const li = document.createElement("li");

        const dot = document.createElement("span");
        dot.classList.add("li-dot");
        dot.style.background = color(e.category);

        const body = document.createElement("div");
        body.classList.add("li-body");
        body.innerHTML = `<div class="li-main">₹${e.amount} <span style="font-weight:400;color:var(--muted)">·</span> ${e.category}</div>
            <div class="li-sub">${e.note || "—"}</div>`;

        const date = document.createElement("span");
        date.classList.add("li-date");
        date.textContent = e.date;

        const del = document.createElement("button");
        del.classList.add("del");
        del.textContent = "×";
        del.addEventListener("click", () => {
            li.style.opacity = "0";
            li.style.transform = "translateX(14px)";
            setTimeout(() => {
                expenses.splice(i, 1);
                save();
                refresh();
                renderList();
            }, 180);
        });

        li.append(dot, body, date, del);
        ul.appendChild(li);
    });
}

document.getElementById("date").textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long"
});

function setAmount(val) {
    document.getElementById("amount").value = val;
    document.querySelectorAll(".qp-amount").forEach(b => b.classList.remove("qp-active"));
    document.querySelectorAll(".qp-amount").forEach(b => { if (Number(b.textContent) === val) b.classList.add("qp-active"); });
}

function setCat(val) {
    document.getElementById("category").value = val;
    document.querySelectorAll(".qp-cat").forEach(b => b.classList.remove("qp-active"));
    document.querySelectorAll(".qp-cat").forEach(b => { if (b.textContent === val) b.classList.add("qp-active"); });
}

document.getElementById("addBtn").addEventListener("click", () => {
    const amount   = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value.trim();
    const note     = document.getElementById("note").value;

    if (!amount || !category) {
        document.querySelector(".form-card").style.outline = "1px solid rgba(224,92,92,0.4)";
        setTimeout(() => document.querySelector(".form-card").style.outline = "", 700);
        return;
    }

    expenses.push({ category, amount, note, date: fmtDate(new Date()) });
    save();
    refresh();
    renderList();

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("note").value = "";
    document.querySelectorAll(".qp").forEach(b => b.classList.remove("qp-active"));
});

const fab = document.getElementById("fab");
const faqPanel = document.getElementById("faqPanel");

fab.addEventListener("click", () => faqPanel.classList.toggle("open"));
document.getElementById("faqClose").addEventListener("click", () => faqPanel.classList.remove("open"));

document.addEventListener("click", e => {
    if (!faqPanel.contains(e.target) && e.target !== fab) {
        faqPanel.classList.remove("open");
    }
});

refresh();
renderList();