// assets/js/loader.js

// استدعاء HTML في مكان محدد
async function loadHTML(targetId, filePath) {
    try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const html = await res.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (err) {
        console.error("Error loading:", filePath, err);
    }
}

// استدعاء pre-collections متعددة
async function loadPreCollections(targetId, ids) {
    try {
        let container = document.getElementById(targetId);
        if (!container) return;
        for (let id of ids) {
            const res = await fetch(`/pre-collections/pre-collection-${id}.html`);
            if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
            const html = await res.text();
            let div = document.createElement("div");
            div.innerHTML = html;
            container.appendChild(div);
        }
    } catch (err) {
        console.error("Error loading pre-collections:", err);
    }
}

// 📌 هنا كتدير الاستدعاءات
document.addEventListener("DOMContentLoaded", () => {
    // Includes
    loadHTML("desktop-header", "/includes/desktop-header.html");
    loadHTML("mobile-header", "/includes/mobile-header.html");
    loadHTML("desktop-footer", "/includes/desktop-footer.html");
    loadHTML("mobile-footer", "/includes/mobile-footer.html");
    loadHTML("cart-modal", "/includes/cart-modal.html");
    loadHTML("checkout-modal", "/includes/checkout-modal.html");
    loadHTML("desktop-menu", "/includes/desktop-menu.html");
    loadHTML("mobile-menu", "/includes/mobile-menu.html");

    // Components (الصفحة الرئيسية)
    loadHTML("hero", "/components/hero.html");
    loadHTML("features", "/components/features.html");
    loadHTML("categories", "/components/categories.html");
    loadHTML("best-sellers", "/components/best-sellers.html");
    loadHTML("flash-deals", "/components/flash-deals.html");
    loadHTML("newsletter", "/components/newsletter.html");
    loadHTML("testimonials", "/components/testimonials.html");

    // Pre-Collections (اختيارية، كتحط IDs ديال لي باغي)
    loadPreCollections("pre-collections", [1, 3, 4]); // مثال: استدعاء 1,3,4 فقط
});

