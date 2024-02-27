// -------------------- Players Carousel -----------------------

const playersLeftBtn = document.getElementById("playersLeftBtn");
const playersRightBtn = document.getElementById("playersRightBtn");
const fotoNum = document.querySelector(".carousel__foto-num");
const playersSlider = document.querySelector(".players-list");
const playersCard = document.querySelectorAll(".player-card");

let counter = 1;
const maxSlides = playersCard.length;

playersCard.forEach((card, index) => {
  card.style.order = index;
});

function prevPlayer() {
  counter -= 1;
  if (counter === 0) counter = maxSlides;
  fotoNum.textContent = `${counter}/${maxSlides}`;
  playersCard.forEach((card) => {
    card.classList.add("player-card__animated")
    setTimeout(() => {
      card.classList.remove("player-card__animated")
    }, 300)

    card.style.order === "5"
      ? (card.style.order = "0")
      : (card.style.order = card.style.order * 1 + 1);
  });
}

function nextPlayer() {
  counter += 1;
  if (counter === maxSlides + 1) counter = 1;
  fotoNum.textContent = `${counter}/${maxSlides}`;
  playersCard.forEach((card) => {
    card.classList.add("player-card__animated")
    setTimeout(() => {
      card.classList.remove("player-card__animated")
    }, 300)

    card.style.order === "0"
      ? (card.style.order = `${maxSlides - 1}`)
      : (card.style.order -= 1);
  });
}

playersLeftBtn.addEventListener("click", prevPlayer);
playersRightBtn.addEventListener("click", nextPlayer);
setInterval(nextPlayer, 4000);


// -------------------- Stages Carousel -----------------------

const stagesLeftBtn = document.getElementById("stagesLeftBtn");
const stagesRigthBtn = document.getElementById("stagesRigthBtn");
const stagesItems = document.querySelectorAll(".stages-points_block");
const dots = document.querySelector(".dot-container");

function createDots() {
  stagesItems.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<div class="dot" data-slide="${i}"></div>`
    );
  });
}
createDots();

window.addEventListener("resize", () => {
  if (window.innerWidth <= 426) {
    let currentStage = 0;
    const maxStages = stagesItems.length;

    function disableBtns() {
      if (currentStage === 0) stagesLeftBtn.disabled = true;
      if (currentStage > 0) stagesLeftBtn.disabled = false;
      if (currentStage === maxStages - 1) stagesRigthBtn.disabled = true;
      if (currentStage < maxStages - 1) stagesRigthBtn.disabled = false;
    }

    function goToStage(val) {
      disableBtns();
      stagesItems.forEach((stage, i) => {
        stage.style.transform = `translateX(${100 * (i - val)}%)`;
      });
    }
    goToStage(0);

    function activateDots(stage) {
      document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('dot-active')
      })
      document.querySelector(`.dot[data-slide="${stage}"]`).classList.add('dot-active')
    }
    activateDots(0)

    function prevStage() {
      if (currentStage > 0) {
        currentStage--;
        goToStage(currentStage);
        activateDots(currentStage)
      }
    }

    function nextStage() {
      if (currentStage < maxStages - 1) {
        currentStage++;
        goToStage(currentStage);
        activateDots(currentStage)
      }
    }

    stagesLeftBtn.addEventListener("click", prevStage);
    stagesRigthBtn.addEventListener("click", nextStage);
  }

  if (window.innerWidth > 426) {
    stagesItems.forEach((stage) => {
      stage.style.transform = `none`;
    });
  }
});