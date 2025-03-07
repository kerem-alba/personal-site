/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  ("use strict");

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    const maxPreloaderTime = 2000;

    window.addEventListener("load", () => {
      preloader.remove();
    });

    setTimeout(() => {
      if (preloader) {
        preloader.remove();
      }
    }, maxPreloaderTime);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  document.querySelectorAll(".skills-icons").forEach((iconsContainer) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Fare basıldığında
    iconsContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      iconsContainer.classList.add("active");
      startX = e.pageX - iconsContainer.offsetLeft;
      scrollLeft = iconsContainer.scrollLeft;
    });

    // Fare bırakıldığında
    iconsContainer.addEventListener("mouseup", () => {
      isDown = false;
      iconsContainer.classList.remove("active");
    });

    // Fare dışarı çıktığında
    iconsContainer.addEventListener("mouseleave", () => {
      isDown = false;
      iconsContainer.classList.remove("active");
    });

    // Fare hareketi
    iconsContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - iconsContainer.offsetLeft;
      const walk = (x - startX) * 2; // Hız ayarı
      iconsContainer.scrollLeft = scrollLeft - walk;
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      console.log("imagesLoaded çalıştı:", isotopeItem);
      initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });
      console.log("Isotope oluşturuldu:", initIsotope);
    });

    isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filters) {
      filters.addEventListener(
        "click",
        function () {
          isotopeItem.querySelector(".isotope-filters .filter-active").classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          if (typeof aosInit === "function") {
            aosInit();
          }
        },
        false
      );
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  // JSON dosyasını fetch ile almak
  fetch("data/certificates.json")
    .then((response) => response.json())
    .then((certificates) => {
      const container = document.getElementById("testimonials-container");

      // Sertifikaları her bir slide olarak eklemek
      certificates.forEach((cert) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const testimonialItem = document.createElement("div");
        testimonialItem.classList.add("testimonial-item");

        const testimonialImg = document.createElement("img");
        testimonialImg.src = cert.img;
        testimonialImg.classList.add("testimonial-img");

        const testimonialName = document.createElement("h3");
        testimonialName.textContent = cert.isim;

        // Büyüteç simgesi eklemek
        const zoomIcon = document.createElement("a");
        zoomIcon.href = cert.img;
        zoomIcon.classList.add("preview-link");
        zoomIcon.innerHTML = '<i class="bi bi-zoom-in"></i>';

        // Lightbox'a tıklanınca gösterilecek resmi hazırlamak
        zoomIcon.addEventListener("click", function (e) {
          e.preventDefault(); // Linkin normal davranışını engelle
          const lightbox = document.getElementById("lightbox");
          const lightboxImg = document.getElementById("lightbox-img");

          lightboxImg.src = cert.img; // Lightbox'da gösterilecek resmi ayarlıyoruz
          lightbox.style.display = "flex"; // Lightbox'ı görünür yapıyoruz
        });

        testimonialItem.appendChild(testimonialImg);
        testimonialItem.appendChild(testimonialName);
        testimonialItem.appendChild(zoomIcon); // Büyüteç simgesini ekliyoruz
        slide.appendChild(testimonialItem);

        container.appendChild(slide);
      });

      // Swiper'ı yeniden başlatmak
      new Swiper(".init-swiper", JSON.parse(document.querySelector(".swiper-config").textContent));

      // Lightbox'ı kapatmak için
      const closeButton = document.getElementById("close-lightbox");
      closeButton.addEventListener("click", () => {
        const lightbox = document.getElementById("lightbox");
        lightbox.style.display = "none"; // Lightbox'ı gizle
      });
    })
    .catch((error) => {
      console.error("Error loading certificates:", error);
    });

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

document.querySelector("#btn-primary").addEventListener("click", () => {
  gtag("event", "download", {
    event_category: "Button",
    event_label: "CV Download",
  });
});
