const pictureInnerContainer = document.querySelector(".arts");
const aphrodite = `<img src="./img/gallery/galery2.jpg" alt="Aphrodite" width="456" height="570" class="gallery-img">`;
const venus = `<img src="./img/gallery/galery9.jpg" alt="Venus" width="456" height="570" class="gallery-img">`;
const nika = `<img src="./img/gallery/galery4.jpg" alt="Nika" width="456" height="456" class="gallery-img">`;
const madonna = `<img src="./img/gallery/galery6.jpg" alt="Madonna" width="456" height="570" class="gallery-img">`;
const amur = `<img src="./img/gallery/galery1.jpg" alt="Amur" width="456" height="456" class="gallery-img">`;
const hall = `<img src="./img/gallery/galery8.jpg" alt="Hall" width="456" height="570" class="gallery-img">`;
const michelangelo = `<img src="./img/gallery/galery3.jpg" alt="Michelangelo" width="456" height="570" class="gallery-img">`;
const venera = `<img src="./img/gallery/galery5.jpg" alt="Venera" width="456" height="456" class="gallery-img">`;
const monaLisa = `<img src="./img/gallery/galery7.jpg" alt="Mona Lisa" width="456" height="570" class="gallery-img">`;
const palace = `<img src="./img/gallery/galery10.jpg" alt="Palace" width="456" height="456" class="gallery-img">`;
const louvre = `<img src="./img/gallery/galery15.jpg" alt="Louvre" width="456" height="456" class="gallery-img">`;
const roden = `<img src="./img/gallery/galery12.jpg" alt="Roden" width="456" height="456" class="gallery-img">`;

const containerArts = [
  aphrodite,
  venus,
  nika,
  madonna,
  amur,
  hall,
  michelangelo,
  venera,
  monaLisa,
  palace,
  louvre,
  roden,
];

function shuffle(art) {
  let newArt = [...art];
  for (let i = newArt.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArt[i], newArt[j]] = [newArt[j], newArt[i]];
  }
  return newArt;
}

const newContainerArts = shuffle(containerArts);

pictureInnerContainer.innerHTML = newContainerArts.join(" ");

const galleryItems = document.querySelectorAll(".gallery-img");
const gallerySection = document.querySelector(".arts"); // исправлена выборка по классу

function checkPosition() {
  const sectionTop = gallerySection.getBoundingClientRect().top;
  const sectionBottom = gallerySection.getBoundingClientRect().bottom;
  const viewportHeight = window.innerHeight;

  galleryItems.forEach((item) => {
    if (sectionTop < viewportHeight && sectionBottom > 0) {
      // Проверяем, находится ли элемент в области видимости
      const itemTop = item.getBoundingClientRect().top;
      const itemBottom = item.getBoundingClientRect().bottom;

      if (
        itemTop < viewportHeight &&
        itemBottom > 0 &&
        !item.classList.contains("active")
      ) {
        item.classList.add("active");
      }
    } else {
      // Если элемент не в области видимости, можем удалить класс 'active' если хотите
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", checkPosition);

window.addEventListener("load", () => {
  checkPosition();
});

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY || window.pageYOffset;
  if (scrollPosition < lastScrollPosition) {
    checkPosition();
  }
  lastScrollPosition = scrollPosition;
});

let lastScrollPosition = 0;
