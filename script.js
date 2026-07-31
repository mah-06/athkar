/* =========================================================
   أذكار المسلم — التفاعلات
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- السنة في الفوتر -------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- ظل خفيف للهيدر عند التمرير -------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* -------- تنزيل ملف البطاقة -------- */
  const PASS_FILE = 'Pass.pkpass';
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function downloadPass() {
    const link = document.createElement('a');
    link.href = PASS_FILE;
    link.download = 'أذكار_المسلم.pkpass';
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast();
  }

  function showToast() {
    if (!toast) return;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  document.querySelectorAll('#addToWalletBtn, #addToWalletBtnBottom, #headerDownload')
    .forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadPass();
      });
    });

  /* -------- تحريك ظهور العناصر عند التمرير -------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* -------- إغلاق أسئلة FAQ الأخرى تلقائياً (اختياري لتجربة أهدأ) -------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

});
