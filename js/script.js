document.addEventListener("DOMContentLoaded", init, false);

function init() {
  // let mybutton = document.getElementById("myBtn");  
  document.body.className = "loaded";
  new WOW().init();
  navBar();
  typeWriter();
  galery();
}

function typeWriter() {
  const element = document.getElementById("typeWriter");
  const toWrite = element.getAttribute("data-text");
  const period = element.getAttribute("data-period");
  if (toWrite) {
    let test = new TxtWrite(element, JSON.parse(toWrite), period);
    test.tick();
  }
}
class TxtWrite {
  constructor(el, toWrite, period) {
    this.el = el;
    this.toWrite = toWrite;
    this.period = parseInt(period, 10) || 2000;
    this.loopNum = 0;
    this.txt = '';
    this.isDeleting = false;
  }

  tick() {
    let i = this.loopNum % this.toWrite.length;
    let fullTxt = this.toWrite[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = this.txt;
    var delta = 300 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 400;
    }
    setTimeout(() => {
      this.tick();
    }, delta);
  };
}


function navBar() {
  const headerId = document.getElementById("navbar");
  if (document.documentElement.scrollTop > 28) {
    headerId.classList.add("lab-navbar");
  }
  document.addEventListener("scroll", navScroll, false);
}

function galery() {
  const listItems = document.querySelectorAll(".filter-buttons button");
  const allimages = document.querySelectorAll(".portfolio-img .img-item");

  function toggleActiveClass(active) {
    listItems.forEach((item) => {
      item.classList.remove("active");
    });
    active.classList.add("active");
  }

  function toggleimages(dataFilter) {
    if (dataFilter === "*") {
      for (let i = 0; i < allimages.length; i++) {
        allimages[i].style.display = "block";
      }
    } else {
      let categoryArray = [];
      for (let i = 0; i < allimages.length; i++) {
        categoryArray = allimages[i].dataset.category.split(" ");
        if (categoryArray.length > 1) {
          let existClass = false;
          for (let j = 0; j < categoryArray.length; j++) {
            if (categoryArray[j] === dataFilter) {
              existClass = !existClass;
              break;
            }
          }
          if (existClass) {
            allimages[i].style.display = "block";
            // allimages[i].style.animationName = "zoomIn";
          } else {
            allimages[i].style.display = "none";
          }
        } else {
          allimages[i].dataset.category === dataFilter ?
            (allimages[i].style.display = "block") :
            (allimages[i].style.display = "none");
        }
      }
    }
  }
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function () {
      toggleActiveClass(listItems[i]);
      toggleimages(listItems[i].dataset.filter);
    });
  }
}


function navScroll() {
  const headerId = document.getElementById("navbar");
  if (document.documentElement.scrollTop > 28) {
    headerId.classList.add("lab-navbar");
  } else {
    let existingIndex = headerId.className.indexOf("lab-navbar");
    if (existingIndex !== -1) headerId.classList.remove("lab-navbar");
  }
  // (document.documentElement.scrollTop > 500) ? btn.style.display = "none": btn.style.display = "block";
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}