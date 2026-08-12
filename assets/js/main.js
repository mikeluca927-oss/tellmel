/* =========================================================
   Tell Mel - site scripts
   ========================================================= */

/* ---------------------------------------------------------
   1) WHERE FORMS ARE DELIVERED
   ---------------------------------------------------------
   Right now, when someone submits a form it opens the visitor's
   email app with everything filled in, addressed to Mel. That
   works with zero setup.

   To collect submissions automatically (recommended so nothing
   gets lost and referrals are tracked), create a FREE form at
   https://formspree.io , connect it to
   Happinessandclarity@tell-mel.com, and paste the endpoint it
   gives you below (looks like https://formspree.io/f/abcdwxyz).
--------------------------------------------------------- */
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxxx"
const CONTACT_EMAIL = "Happinessandclarity@tell-mel.com";

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupReveal();
  setupForms();
  setupShare();
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = "2026";
});

/* Mobile nav toggle */
function setupNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

/* Fade-in on scroll */
function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((e) => io.observe(e));
}

/* Forms: POST to Formspree if configured, otherwise mailto fallback */
function setupForms() {
  document.querySelectorAll("form[data-tellmel-form]").forEach((form) => {
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const btn = form.querySelector("[type=submit]");
      const success = form.parentNode.querySelector(".form-success");
      const data = new FormData(form);

      if (FORM_ENDPOINT) {
        try {
          if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
          const res = await fetch(FORM_ENDPOINT, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (res.ok) {
            showSuccess(form, success);
          } else {
            mailtoFallback(form, data);
          }
        } catch (_) {
          mailtoFallback(form, data);
        } finally {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send"; }
        }
      } else {
        mailtoFallback(form, data);
        showSuccess(form, success);
      }
    });
  });
}

function showSuccess(form, success) {
  if (success) {
    success.classList.add("show");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  form.reset();
}

function mailtoFallback(form, data) {
  const subject = form.dataset.subject || "New message from tell-mel.com";
  let body = "";
  for (const [k, v] of data.entries()) {
    if (!v) continue;
    const label = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    body += `${label}: ${v}\n`;
  }
  const href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

/* Share buttons + copy link */
function setupShare() {
  const shareData = {
    title: "Tell Mel Free Group Session",
    text: "Do not go alone, come find your people. I'm joining Mel's FREE group coaching session. Grab a seat with me.",
    url: (document.querySelector("[data-share-url]") || {}).dataset
      ? document.querySelector("[data-share-url]").dataset.shareUrl
      : window.location.href,
  };

  document.querySelectorAll("[data-share=native]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (_) {}
      } else {
        copyLink(shareData.url);
      }
    });
  });

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => copyLink(btn.dataset.copy || shareData.url, btn));
  });
}

function copyLink(url, btn) {
  navigator.clipboard?.writeText(url).then(() => {
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = "Copied!";
      setTimeout(() => (btn.innerHTML = original), 1800);
    }
  });
}
