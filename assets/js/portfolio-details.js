fetch("data/portfolio-data.json")
  .then((response) => response.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const project = data.find((item) => item.id === id);

    // Dinamik İçeriği Yerleştir
    document.getElementById("project-title").innerText = project.title;
    document.getElementById("project-description").innerText = project.description;

    // Özellikleri Listeye Ekle
    const infoList = document.getElementById("project-info");
    project.features.forEach((feature) => {
      const listItem = document.createElement("li");
      listItem.innerText = feature;
      infoList.appendChild(listItem);
    });

    // Görselleri ve Metinleri Galeriye Ekle
    const gallery = document.getElementById("gallery");
    project.screens.forEach((screen, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      // Görsel ve Metin Ekle
      slide.innerHTML = `
        <img src="${screen}" alt="Project Image">
        <p>${project.screenTexts[index] || ""}</p>
      `;

      gallery.appendChild(slide);
    });

    // Teknoloji bilgilerini al
    const techTable = document.getElementById("project-technologies");
    const technologies = project.technologies; // JSON'dan technologies verisi

    // Her bir teknolojiyi tabloya ekle
    Object.entries(technologies).forEach(([key, value]) => {
      const row = document.createElement("tr");

      // Başlık hücresi
      const keyCell = document.createElement("td");
      keyCell.textContent = key;
      row.appendChild(keyCell);

      // Değer hücresi
      const valueCell = document.createElement("td");
      valueCell.textContent = value;
      row.appendChild(valueCell);

      techTable.appendChild(row);
    });

    swiper.on("slideChange", () => {
      swiper.pagination.update();
    });
  })
  .catch((error) => console.error("Error loading portfolio data:", error));

document.addEventListener("DOMContentLoaded", () => {
  const swiperConfigElement = document.querySelector(".swiper-config");

  try {
    let swiperConfig = JSON.parse(swiperConfigElement.textContent);

    const params = new URLSearchParams(window.location.search);
    const filterType = params.get("filter");

    if (filterType === "web") {
      swiperConfig.slidesPerView = 1;
      swiperConfig.slidesPerGroup = 1;
    }

    const swiper = new Swiper(".init-swiper", swiperConfig);

    swiper.on("slideChange", () => {
      console.log("Slide changed. Current index:", swiper.activeIndex);
    });

    swiper.on("touchStart", () => {
      if (swiper.autoplay) {
        swiper.autoplay.stop();
      }
    });
  } catch (error) {
    console.error("Error parsing or updating swiper config JSON:", error);
  }
});
