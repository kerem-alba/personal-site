document.addEventListener("DOMContentLoaded", () => {
  fetch("data/portfolio-data.json")
    .then((response) => response.json())
    .then((data) => {
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get("id"));
      const filterType = params.get("filter");

      const project = data.find((item) => item.id === id);

      // Başlık ve açıklama
      document.getElementById("project-title").innerText = project.title;
      document.getElementById("project-description").innerText = project.description;

      // Özellikler
      const infoList = document.getElementById("project-info");
      project.features.forEach((feature) => {
        const listItem = document.createElement("li");
        listItem.innerText = feature;
        infoList.appendChild(listItem);
      });

      // Galeri
      const gallery = document.getElementById("gallery");
      project.screens.forEach((screen, index) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
          <div class="position-relative">
            <img src="${screen}" alt="Project Image" class="img-fluid w-100">
            <a href="${screen}" class="glightbox preview-link position-absolute top-0 end-0 m-2" data-gallery="portfolio-details">
              <i class="bi bi-zoom-in fs-4 text-white bg-dark p-1 rounded-circle"></i>
            </a>
          </div>
          <p class="mt-2">${project.screenTexts[index] || ""}</p>
        `;

        gallery.appendChild(slide);
      });

      // Teknolojiler
      const techTable = document.getElementById("project-technologies");
      Object.entries(project.technologies).forEach(([key, value]) => {
        const row = document.createElement("tr");

        const keyCell = document.createElement("td");
        keyCell.textContent = key;
        row.appendChild(keyCell);

        const valueCell = document.createElement("td");
        valueCell.textContent = value;
        row.appendChild(valueCell);

        techTable.appendChild(row);
      });

      // Swiper config
      const swiperConfigElement = document.querySelector(".swiper-config");
      let swiperConfig = JSON.parse(swiperConfigElement.textContent);

      if (filterType === "web") {
        swiperConfig.slidesPerView = 1;
        swiperConfig.slidesPerGroup = 1;
      } else {
        swiperConfig.slidesPerView = 2;
        swiperConfig.slidesPerGroup = 2;
      }

      swiperConfig.autoplay = {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      };

      const swiper = new Swiper(".init-swiper", swiperConfig);

      swiper.on("slideChange", () => {
        swiper.pagination.update();
      });
    })
    .catch((error) => console.error("Error loading portfolio data:", error));
});
