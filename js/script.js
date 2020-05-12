document.addEventListener("DOMContentLoaded", init, false);
const scrollUp = document.getElementById("scrollUp");

function init() {
  document.body.className = "loaded";
  new WOW().init();
  navBar();
  typeWriter();
  galery();
  btnScrollUp();
  contactForm();
  copyrightYear();
}

function contactForm() {
  const btn = document.getElementById("send_email");
  btn.addEventListener("click", sendEmail, false);
}

function sendEmail() {
  const contactForm = document.getElementById("contact-form");
  contactForm.classList.add("was-validated");
  console.log(contactForm.firstName.value);
  if (contactForm.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    const firstName = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactTextarea").value;
    const btn = document.getElementById("send_email");
    const spinner = document.getElementById("spinner-form");
    btn.disabled = true;
    spinner.classList.toggle("spinner-show");

    Email.send({
      Host: "uk34.myserverhosts.com",
      Username: "test@prestigeconsultants.net",
      Password: "Nikolaus1",
      To: "test@prestigeconsultants.net",
      From: email,
      Subject: "Email from personal Wibesite",
      Body: `<html><h2>Email from ${firstName}</h2><p><strong>${message}</strong></p></html>`,
    }).then((res) => {
      res == "OK" ?
        alert("Your message was sent successfully! ") :
        alert("error");
      btn.disabled = false;
      spinner.classList.toggle("spinner-show");
      contactForm.firstName.value = "";
      contactForm.contactEmail.value = "";
      contactForm.contactText.value = "";
      contactForm.classList.remove("was-validated");
    });
  }
}

function btnScrollUp() {
  scrollUp.addEventListener("click", function () {
    scrollUp.style.visibility = "hidden";
    document.documentElement.scrollTop = 0;
  }, false);
}

function typeWriter() {
  const element = document.getElementById("typeWriter");
  const toWrite = element.getAttribute("data-text");
  const period = element.getAttribute("data-period");

  if (toWrite) {
    let test = new TxtWrite(element, toWrite.split(','), period);
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
          (existClass) ?
          (allimages[i].style.display = "block") :
          (allimages[i].style.display = "none");
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
    document.documentElement.scrollTop > screen.height ?
      (scrollUp.style.visibility = "visible") :
      (scrollUp.style.visibility = "hidden");
  } else {
    let existingIndex = headerId.className.indexOf("lab-navbar");
    if (existingIndex !== -1) headerId.classList.remove("lab-navbar");
  }
}

function copyrightYear() {
  const copyrightYear = document.getElementById("copyright-year");
  const date = new Date();
  copyrightYear.innerHTML = date.getFullYear();
}