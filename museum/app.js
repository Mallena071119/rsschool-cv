// Section Welcome

document.addEventListener("DOMContentLoaded", () => {
  const splideAll = new Splide(".splide", {
    type: "loop",
    perPage: 1,
    focus: "center",
    pagination: false,
    arrows: false,
    drag: true,
    speed: 600,
  });

  const pageNumberElement = document.querySelector(".page-number");
  const controls = document.querySelectorAll(".controls span");
  let totalSlides = 0;

  // Функция обновления активного элемента пагинации
  const updateActivePagination = (index) => {
    controls.forEach((control, i) => {
      if (i === index) {
        control.classList.add("active");
      } else {
        control.classList.remove("active");
      }
    });
  };

  // Обновление номера страницы
  const updatePageNumber = (index) => {
    pageNumberElement.textContent = `${index + 1} | ${totalSlides}`;
  };

  // Инициализация после монтирования
  splideAll.on("mounted", () => {
    totalSlides = splideAll.Components.Slides.getLength() - 4;
    updatePageNumber(splideAll.index);
    updateActivePagination(splideAll.index);
  });

  // Обработчик смены слайда
  splideAll.on("move", (newIndex) => {
    updatePageNumber(newIndex);
    updateActivePagination(newIndex);
  });

  // Обработчики для элементов пагинации
  controls.forEach((label, index) => {
    label.addEventListener("click", () => {
      splideAll.go(index);
    });
  });

  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");

  arrowLeft.addEventListener("click", () => {
    splideAll.go("<");
  });

  arrowRight.addEventListener("click", () => {
    splideAll.go(">");
  });

  splideAll.mount();
});

// Section Explore

/* Slider for explore*/
const container = document.querySelector(".container-slider");
document.querySelector(".slider").addEventListener("input", (e) => {
  container.style.setProperty("--position", `${e.target.value}%`);
});

// Section Video

/*Turn on video*/

function togglePlay(videoId, playButton) {
  const video = document.getElementById(videoId);
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

// Функция для переключения полноэкранного режима
function toggleFullscreen(videoId) {
  const videoElement = document.getElementById(videoId);
  if (!document.fullscreenElement) {
    videoElement.requestFullscreen().catch((err) => {
      console.error("Ошибка при попытке перехода в полноэкранный режим:", err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Функция для переключения звука
function toggleMute(videoId, muteButton) {
  const video = document.getElementById(videoId);
  const svgIcon = document.getElementById("muteIcon");
  video.muted = !video.muted;

  // Обновите состояние кнопки
  if (video.muted) {
    muteButton.classList.add("video-hud__mute_true");
    muteButton.classList.remove("video-hud__mute_false");
    // Меняем иконку на выключенный звук
    svgIcon.innerHTML = `<svg
        width="36"
        height="30"
        viewBox="0 0 36 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_19)">
          <path
            d="M32.2053 15L35.6703 11.535C35.8901 11.3152 36 11.0474 36 10.7337C36 10.4199 35.8901 10.1522 35.6703 9.93234L34.0677 8.32972C33.8478 8.10991 33.5801 8 33.2663 8C32.9526 8 32.6848 8.10991 32.465 8.32972L29 11.7947L25.535 8.32972C25.3152 8.10991 25.0474 8 24.7337 8C24.4199 8 24.1522 8.10991 23.9323 8.32972L22.3297 9.93234C22.1099 10.1522 22 10.4199 22 10.7337C22 11.0474 22.1099 11.3152 22.3297 11.535L25.7947 15L22.3297 18.465C22.1099 18.6848 22 18.9526 22 19.2663C22 19.5801 22.1099 19.8478 22.3297 20.0677L23.9323 21.6703C24.1522 21.8901 24.4199 22 24.7337 22C25.0474 22 25.3152 21.8901 25.535 21.6703L29 18.2053L32.465 21.6703C32.6848 21.8901 32.9516 22 33.2663 22C33.5811 22 33.8478 21.8901 34.0677 21.6703L35.6703 20.0677C35.8901 19.8478 36 19.5801 36 19.2663C36 18.9526 35.8901 18.6848 35.6703 18.465L32.2053 15Z"
            fill="#B3B3B3"
          />
          <path
            d="M18.3326 0C17.8816 0 17.4905 0.156374 17.1604 0.469123L8.48928 8.68426H1.66737C1.21531 8.68426 0.825273 8.84064 0.495164 9.15339C0.165055 9.46614 0 9.83665 0 10.2639V19.7361C0 20.1633 0.165055 20.5339 0.495164 20.8466C0.825273 21.1594 1.21636 21.3157 1.66737 21.3157H8.48928L17.1604 29.5309C17.4905 29.8436 17.8806 30 18.3326 30C18.7847 30 19.1747 29.8436 19.5048 29.5309C19.8349 29.2181 20 28.8486 20 28.4203V1.57968C20 1.15239 19.8349 0.781873 19.5059 0.469123C19.1768 0.156374 18.7857 0 18.3337 0H18.3326Z"
            fill="#B3B3B3"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_19">
            <rect width="36" height="30" fill="white" />
          </clipPath>
        </defs>
      </svg>`;
  } else {
    muteButton.classList.remove("video-hud__mute_true");
    muteButton.classList.add("video-hud__mute_false");
    // Меняем иконку на включенный звук
    svgIcon.innerHTML = `<svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_25_108)">
      <path d="M19.3511 0C18.875 0 18.4622 0.161587 18.1138 0.484761L8.9609 8.97374H1.76C1.28282 8.97374 0.871122 9.13533 0.522673 9.4585C0.174224 9.78167 0 10.1645 0 10.6061V20.3939C0 20.8355 0.174224 21.2183 0.522673 21.5415C0.871122 21.8647 1.28393 22.0263 1.76 22.0263H8.9609L18.1138 30.5152C18.4622 30.8384 18.8739 31 19.3511 31C19.8283 31 20.24 30.8384 20.5884 30.5152C20.9369 30.1921 21.1111 29.8102 21.1111 29.3677V1.63234C21.1111 1.1908 20.9369 0.807935 20.5895 0.484761C20.2422 0.161587 19.8294 0 19.3522 0H19.3511Z" fill="#B3B3B3"/>
      <path d="M29.5979 19.1322C30.3389 18.0151 30.7094 16.8082 30.7094 15.5103C30.7094 14.2125 30.3389 13.0014 29.5979 11.8751C28.8569 10.7487 27.8774 9.95512 26.6561 9.49425C26.4819 9.40952 26.2634 9.36612 26.0027 9.36612C25.5499 9.36612 25.1572 9.52422 24.8258 9.83939C24.4943 10.1566 24.3286 10.5431 24.3286 11.004C24.3286 11.3625 24.4331 11.6653 24.6432 11.9123C24.8532 12.1592 25.1044 12.3731 25.4011 12.5519C25.6966 12.7307 25.9932 12.927 26.2898 13.1409C26.5864 13.3548 26.8387 13.6565 27.0477 14.0492C27.2567 14.4419 27.3612 14.9286 27.3612 15.5083C27.3612 16.088 27.2567 16.5747 27.0477 16.9673C26.8387 17.36 26.5864 17.6628 26.2898 17.8756C25.9932 18.0885 25.6966 18.2859 25.4011 18.4646C25.1044 18.6434 24.8522 18.8573 24.6432 19.1043C24.4342 19.3512 24.3286 19.655 24.3286 20.0126C24.3286 20.4734 24.4954 20.8609 24.8258 21.1771C25.1572 21.4913 25.5488 21.6514 26.0027 21.6514C26.2634 21.6514 26.4819 21.6091 26.6561 21.5233C27.8763 21.0449 28.8569 20.2471 29.5979 19.1291V19.1322Z" fill="#B3B3B3"/>
      <path d="M35.7563 22.8582C37.252 20.6112 37.9999 18.1571 37.9999 15.499C37.9999 12.8419 37.252 10.3899 35.7563 8.13971C34.2605 5.89271 32.2811 4.25452 29.819 3.23039C29.591 3.14417 29.362 3.10001 29.1329 3.10001C28.6759 3.10001 28.2796 3.26509 27.9451 3.59525C27.6105 3.92541 27.4443 4.31551 27.4443 4.76764C27.4443 5.44479 27.7874 5.95685 28.4735 6.30489C29.4579 6.80855 30.1269 7.19023 30.4785 7.45099C31.7803 8.38891 32.7967 9.56445 33.5265 10.9797C34.2562 12.395 34.6216 13.9007 34.6216 15.5C34.6216 17.0972 34.2562 18.6039 33.5265 20.0203C32.7967 21.4356 31.7803 22.6111 30.4785 23.549C30.1269 23.8098 29.4579 24.1915 28.4735 24.6951C27.7874 25.0432 27.4443 25.5542 27.4443 26.2324C27.4443 26.6835 27.6116 27.0746 27.9451 27.4048C28.2785 27.7349 28.6833 27.9 29.1585 27.9C29.3694 27.9 29.59 27.8558 29.818 27.7696C32.28 26.7444 34.2605 25.1084 35.7552 22.8593L35.7563 22.8582Z" fill="#B3B3B3"/>
      </g>
      <defs>
      <clipPath id="clip0_25_108">
      <rect width="38" height="31" fill="white"/>
      </clipPath>
      </defs>
      </svg>`;
  }
}

// Функция для изменения громкости
function changeVolume(videoId, volume) {
  const video = document.getElementById(videoId);
  const muteButton = document.getElementById("video-hud__mute");
  const svgIcon = document.getElementById("muteIcon");
  video.volume = volume / 100;

  // Обновляем состояние кнопки mute в зависимости от громкости
  if (volume == 0) {
    muteButton.classList.add("video-hud__mute_true");
    muteButton.classList.remove("video-hud__mute_false");
    svgIcon.innerHTML = `<svg
        width="36"
        height="30"
        viewBox="0 0 36 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_19)">
          <path
            d="M32.2053 15L35.6703 11.535C35.8901 11.3152 36 11.0474 36 10.7337C36 10.4199 35.8901 10.1522 35.6703 9.93234L34.0677 8.32972C33.8478 8.10991 33.5801 8 33.2663 8C32.9526 8 32.6848 8.10991 32.465 8.32972L29 11.7947L25.535 8.32972C25.3152 8.10991 25.0474 8 24.7337 8C24.4199 8 24.1522 8.10991 23.9323 8.32972L22.3297 9.93234C22.1099 10.1522 22 10.4199 22 10.7337C22 11.0474 22.1099 11.3152 22.3297 11.535L25.7947 15L22.3297 18.465C22.1099 18.6848 22 18.9526 22 19.2663C22 19.5801 22.1099 19.8478 22.3297 20.0677L23.9323 21.6703C24.1522 21.8901 24.4199 22 24.7337 22C25.0474 22 25.3152 21.8901 25.535 21.6703L29 18.2053L32.465 21.6703C32.6848 21.8901 32.9516 22 33.2663 22C33.5811 22 33.8478 21.8901 34.0677 21.6703L35.6703 20.0677C35.8901 19.8478 36 19.5801 36 19.2663C36 18.9526 35.8901 18.6848 35.6703 18.465L32.2053 15Z"
            fill="#B3B3B3"
          />
          <path
            d="M18.3326 0C17.8816 0 17.4905 0.156374 17.1604 0.469123L8.48928 8.68426H1.66737C1.21531 8.68426 0.825273 8.84064 0.495164 9.15339C0.165055 9.46614 0 9.83665 0 10.2639V19.7361C0 20.1633 0.165055 20.5339 0.495164 20.8466C0.825273 21.1594 1.21636 21.3157 1.66737 21.3157H8.48928L17.1604 29.5309C17.4905 29.8436 17.8806 30 18.3326 30C18.7847 30 19.1747 29.8436 19.5048 29.5309C19.8349 29.2181 20 28.8486 20 28.4203V1.57968C20 1.15239 19.8349 0.781873 19.5059 0.469123C19.1768 0.156374 18.7857 0 18.3337 0H18.3326Z"
            fill="#B3B3B3"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_19">
            <rect width="36" height="30" fill="white" />
          </clipPath>
        </defs>
      </svg>`;
  } else {
    muteButton.classList.remove("video-hud__mute_true");
    muteButton.classList.add("video-hud__mute_false");
    svgIcon.innerHTML = `<svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_25_108)">
      <path d="M19.3511 0C18.875 0 18.4622 0.161587 18.1138 0.484761L8.9609 8.97374H1.76C1.28282 8.97374 0.871122 9.13533 0.522673 9.4585C0.174224 9.78167 0 10.1645 0 10.6061V20.3939C0 20.8355 0.174224 21.2183 0.522673 21.5415C0.871122 21.8647 1.28393 22.0263 1.76 22.0263H8.9609L18.1138 30.5152C18.4622 30.8384 18.8739 31 19.3511 31C19.8283 31 20.24 30.8384 20.5884 30.5152C20.9369 30.1921 21.1111 29.8102 21.1111 29.3677V1.63234C21.1111 1.1908 20.9369 0.807935 20.5895 0.484761C20.2422 0.161587 19.8294 0 19.3522 0H19.3511Z" fill="#B3B3B3"/>
      <path d="M29.5979 19.1322C30.3389 18.0151 30.7094 16.8082 30.7094 15.5103C30.7094 14.2125 30.3389 13.0014 29.5979 11.8751C28.8569 10.7487 27.8774 9.95512 26.6561 9.49425C26.4819 9.40952 26.2634 9.36612 26.0027 9.36612C25.5499 9.36612 25.1572 9.52422 24.8258 9.83939C24.4943 10.1566 24.3286 10.5431 24.3286 11.004C24.3286 11.3625 24.4331 11.6653 24.6432 11.9123C24.8532 12.1592 25.1044 12.3731 25.4011 12.5519C25.6966 12.7307 25.9932 12.927 26.2898 13.1409C26.5864 13.3548 26.8387 13.6565 27.0477 14.0492C27.2567 14.4419 27.3612 14.9286 27.3612 15.5083C27.3612 16.088 27.2567 16.5747 27.0477 16.9673C26.8387 17.36 26.5864 17.6628 26.2898 17.8756C25.9932 18.0885 25.6966 18.2859 25.4011 18.4646C25.1044 18.6434 24.8522 18.8573 24.6432 19.1043C24.4342 19.3512 24.3286 19.655 24.3286 20.0126C24.3286 20.4734 24.4954 20.8609 24.8258 21.1771C25.1572 21.4913 25.5488 21.6514 26.0027 21.6514C26.2634 21.6514 26.4819 21.6091 26.6561 21.5233C27.8763 21.0449 28.8569 20.2471 29.5979 19.1291V19.1322Z" fill="#B3B3B3"/>
      <path d="M35.7563 22.8582C37.252 20.6112 37.9999 18.1571 37.9999 15.499C37.9999 12.8419 37.252 10.3899 35.7563 8.13971C34.2605 5.89271 32.2811 4.25452 29.819 3.23039C29.591 3.14417 29.362 3.10001 29.1329 3.10001C28.6759 3.10001 28.2796 3.26509 27.9451 3.59525C27.6105 3.92541 27.4443 4.31551 27.4443 4.76764C27.4443 5.44479 27.7874 5.95685 28.4735 6.30489C29.4579 6.80855 30.1269 7.19023 30.4785 7.45099C31.7803 8.38891 32.7967 9.56445 33.5265 10.9797C34.2562 12.395 34.6216 13.9007 34.6216 15.5C34.6216 17.0972 34.2562 18.6039 33.5265 20.0203C32.7967 21.4356 31.7803 22.6111 30.4785 23.549C30.1269 23.8098 29.4579 24.1915 28.4735 24.6951C27.7874 25.0432 27.4443 25.5542 27.4443 26.2324C27.4443 26.6835 27.6116 27.0746 27.9451 27.4048C28.2785 27.7349 28.6833 27.9 29.1585 27.9C29.3694 27.9 29.59 27.8558 29.818 27.7696C32.28 26.7444 34.2605 25.1084 35.7552 22.8593L35.7563 22.8582Z" fill="#B3B3B3"/>
      </g>
      <defs>
      <clipPath id="clip0_25_108">
      <rect width="38" height="31" fill="white"/>
      </clipPath>
      </defs>
      </svg>`;
  }
}

// Добавляем обработчики для видео и кнопок
const videos = document.querySelectorAll("#myVideo0");
videos.forEach((video) => {
  const playButton = video.nextElementSibling;
  const hudPlayButton = document.getElementById("video-hud__action"); // Маленькая кнопка

  // Обработчик для большой кнопки
  playButton.addEventListener("click", () => {
    togglePlay(video.id, playButton);
  });

  // Обработчик для маленькой кнопки
  if (hudPlayButton) {
    hudPlayButton.addEventListener("click", () => {
      togglePlay(video.id, playButton);
    });
  }

  video.addEventListener("play", () => {
    if (playButton && playButton.classList.contains("play-button-video")) {
      playButton.style.display = "none";
    }
    // Меняем иконку маленькой кнопки на паузу
    if (hudPlayButton) {
      hudPlayButton.innerHTML = `<svg width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="7" height="31" fill="#B3B3B3"/>
        <rect x="16" y="0" width="7" height="31" fill="#B3B3B3"/>
      </svg>`;
    }
  });

  video.addEventListener("pause", () => {
    if (playButton && playButton.classList.contains("play-button-video")) {
      playButton.style.display = "block";
    }
    // Меняем иконку маленькой кнопки на play
    if (hudPlayButton) {
      hudPlayButton.innerHTML = `<svg width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 15.5053L0 0C0 23.3683 0 11.8996 0 31L23 15.5053Z" fill="#B3B3B3"/>
      </svg>`;
    }
  });

  video.addEventListener("ended", () => {
    if (playButton && playButton.classList.contains("play-button-video")) {
      playButton.style.display = "block";
    }
    // Меняем иконку маленькой кнопки на play
    if (hudPlayButton) {
      hudPlayButton.innerHTML = `<svg width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 15.5053L0 0C0 23.3683 0 11.8996 0 31L23 15.5053Z" fill="#B3B3B3"/>
      </svg>`;
    }
  });
});
// Section ticket
