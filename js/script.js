var feedbackButton = document.querySelector(".feedback-button");
var feedbackPopup = document.querySelector(".feedback-popup");
var closeFeedbackPopupButton = document.querySelector(".feedback-popup .close-popup-button");
var feedbackInputs = document.querySelectorAll(".feedback-popup .feedback-input");
var sendFeedbackButton = document.querySelector(".feedback-popup button[type=submit]");

var mapButton = document.querySelector(".map-link");
var mapPopup = document.querySelector(".map-popup");
var closeMapPopupButton = document.querySelector(".map-popup .close-popup-button");

var addButton = document.querySelectorAll(".catalog-item .buy-link");
var addPopup = document.querySelector(".item-add-popup");
var closeAddPopupButton = document.querySelector(".item-add-popup .close-popup-button");
var orderPopupButton = document.querySelector(".item-add-popup .button-order");
var continuePopupButton = document.querySelector(".item-add-popup .button-continue");

var bannerButtons = document.querySelectorAll(".banner-button");
var bannerDots = document.querySelectorAll(".banner-toggle-dot");
var bannerSlides = document.querySelectorAll(".banner-slide");

var sliderButtons = document.querySelectorAll(".toggle-labels input");
var sliderSlides = document.querySelectorAll(".slide-container .content-slide");

var isStorageSupport = true;

// открыть поп-ап с обратной связью
if (feedbackButton) {
    feedbackButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    feedbackPopup.classList.add("show-popup");
    feedbackInputs[0].focus();
    try {
      feedbackInputs[0].value = localStorage.getItem("feedbackName");
    } catch (err) {
      isStorageSupport = false;
    }

    if (isStorageSupport) {
      feedbackInputs[1].value = localStorage.getItem("feedbackEmail");
    }

    feedbackInputs[2].value = "";
  });
}

// закрыть поп-ап с обратной связью
if (closeFeedbackPopupButton) {
  closeFeedbackPopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    feedbackPopup.classList.remove("show-popup");

    for (var i = 0; i < feedbackInputs.length; i++) {
      feedbackInputs[i].classList.remove("incorrect-input");
    }
  });
}

// обработка нажатия клавиши Отправить на поп-апе обратной связи
if (sendFeedbackButton) {
  sendFeedbackButton.addEventListener("click", function (evt) {

    var hasIncorrectInput=false;

    for (var i = 0; i < feedbackInputs.length; i++) {
      if (!feedbackInputs[i].value) {
        feedbackInputs[i].classList.remove("incorrect-input");
        feedbackInputs[i].offsetWidth = feedbackInputs[i].offsetWidth;
        feedbackInputs[i].classList.add("incorrect-input");
        hasIncorrectInput = true;
      }
    }

    if (hasIncorrectInput) {
      evt.preventDefault();
    } else {

        if (isStorageSupport) {
          localStorage.setItem("feedbackName", feedbackInputs[0].value);
          localStorage.setItem("feedbackEmail", feedbackInputs[1].value);
        }

        feedbackPopup.classList.remove("show-popup");
        for (var i = 0; i < feedbackInputs.length; i++) {
          feedbackInputs[i].classList.remove("incorrect-input");
        }
    }
  });
}

// убрать красную тень при заполнении поля
if (feedbackInputs[0]) {

  var addFeedbackInputHandler = function (inputIndex) {

    feedbackInputs[inputIndex].addEventListener("input", function () {
      feedbackInputs[inputIndex].classList.remove("incorrect-input");
    });
  };

  for (var i = 0; i < feedbackInputs.length; i++) {
    addFeedbackInputHandler(i);
  }
}

//открыть поп-ап с картой
if (mapButton) {
  mapButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("show-popup");
  });
}

// закрыть поп-ап с картой
if (closeMapPopupButton) {
  closeMapPopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("show-popup");
  });
}

// открыть поп-ап с подтверждением заказа
if (addButton[0] && addPopup) {
  for (var i = 0; i< addButton.length; i++) {
    addButton[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      addPopup.classList.add("show-popup");
      orderPopupButton.focus();
    });
  }
}

// закрыть поп-ап с подтверждением заказа по крестику
if (closeAddPopupButton) {
  closeAddPopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    addPopup.classList.remove("show-popup");
  });
}

// закрыть поп-ап с подтверждением заказа по кнопке Продолжить покупки
if (continuePopupButton) {
  continuePopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    addPopup.classList.remove("show-popup");
  });
}

// закрытие поп-апов по Esc
document.addEventListener("keydown", function (evt) {

  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (mapPopup && mapPopup.classList.contains("show-popup")) {
      mapPopup.classList.remove("show-popup");
    }
      else if (feedbackPopup && feedbackPopup.classList.contains("show-popup")) {
        feedbackPopup.classList.remove("show-popup");

        for (var i = 0; i < feedbackInputs.length; i++) {
          feedbackInputs[i].classList.remove("incorrect-input");
        }
    }
      else if (addPopup && addPopup.classList.contains("show-popup")) {
        addPopup.classList.remove("show-popup");
    }
  }

});

// переключение баннеров и точек по стрелкам влево-вправо
if (bannerButtons[0] && bannerSlides[0] && bannerDots[0]) {
  var bannerButtonBackward = bannerButtons[0];
  var bannerButtonForward = bannerButtons[1];
  var currentSlideIndex = 0;
  var newSlideIndex = 0;

  //переключение слайдов и точек по стрелке влево
  bannerButtonBackward.addEventListener("click", function (evt) {
    evt.preventDefault();
    for (var i = 0; i < bannerSlides.length; i++) {
      if (!bannerSlides[i].classList.contains("visually-hidden")) {
        currentSlideIndex = i;
      }
    }

    bannerSlides[currentSlideIndex].classList.add("visually-hidden");

    if (currentSlideIndex === 0) {
      newSlideIndex = bannerSlides.length - 1;
    } else {
      newSlideIndex = currentSlideIndex - 1;
    }

    bannerSlides[newSlideIndex].classList.remove("visually-hidden");
    bannerDots[newSlideIndex].checked = true;
  });

  //переключение слайдов и точек по стрелке вправо
  bannerButtonForward.addEventListener("click", function (evt) {
    evt.preventDefault();
    for (var i = 0; i < bannerSlides.length; i++) {
      if (!bannerSlides[i].classList.contains("visually-hidden")) {
        currentSlideIndex = i;
      }
    }

    bannerSlides[currentSlideIndex].classList.add("visually-hidden");

    if (currentSlideIndex === (bannerSlides.length - 1)) {
      newSlideIndex = 0;
    } else {
      newSlideIndex = currentSlideIndex + 1;
    }

    bannerSlides[newSlideIndex].classList.remove("visually-hidden");
    bannerDots[newSlideIndex].checked = true;
  });
}

// переключение баннеров по нажатию на точки
if (bannerDots[0] && bannerSlides[0]) {

  var addDotClickHandler = function (dotIndex) {

    bannerDots[dotIndex].addEventListener("click", function () {
      var currentSlideIndex = 0;
      for (var j = 0; j < bannerSlides.length; j++) {
        if (!bannerSlides[j].classList.contains("visually-hidden")) {
          currentSlideIndex = j;
        }
      }
      if (dotIndex != currentSlideIndex) {
        bannerSlides[dotIndex].classList.remove("visually-hidden");
        bannerSlides[currentSlideIndex].classList.add("visually-hidden");
      }
    });
  };

  for (var i = 0; i < bannerDots.length; i++) {
    addDotClickHandler(i);
  }

}

//переключение слайдов в слайдере по нажатию на лейблы
if (sliderButtons[0] && sliderSlides[0]) {

  var addSliderButtonClickHandler = function (buttonIndex) {

    sliderButtons[buttonIndex].addEventListener("click", function () {
      var currentSlideIndex = 0;
      for (var j = 0; j < sliderSlides.length; j++) {
        if (!sliderSlides[j].classList.contains("visually-hidden")) {
          currentSlideIndex = j;
        }
      }
      if (buttonIndex != currentSlideIndex) {
        sliderSlides[buttonIndex].classList.remove("visually-hidden");
        sliderSlides[currentSlideIndex].classList.add("visually-hidden");
      }
    });
  };

  for (var i = 0; i < sliderButtons.length; i++) {
    addSliderButtonClickHandler(i);
  }
}
