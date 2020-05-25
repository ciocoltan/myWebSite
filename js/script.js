document.addEventListener("DOMContentLoaded", init, false);
const scrollUp = document.getElementById("scrollUp");

function init() {
  setTimeout(function () {
    document.body.className = "loaded";
  }, 1000);
  new WOW().init();
  navBar();
  typeWriter();
  portfolio();
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
  if (contactForm.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    const firstName = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactTextarea").value;
    const btn = document.getElementById("send_email");
    const loaderWrapper = document.getElementById("loader-wrapper");
    const loader = document.getElementById("loader");
    btn.disabled = true;    
    loaderWrapper.style.visibility = "visible";
    loader.style.opacity = "1";

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
      loaderWrapper.style.visibility = "hidden";
      loader.style.opacity = "0";
      contactForm.firstName.value = "";
      contactForm.contactEmail.value = "";
      contactForm.contactText.value = "";
      contactForm.classList.remove("was-validated");
    });
  }
}

function btnScrollUp() {
  scrollUp.addEventListener(
    "click",
    function () {
      scrollUp.style.visibility = "hidden";
      document.documentElement.scrollTop = 0;
    },
    false
  );
}

function typeWriter() {
  const element = document.getElementById("typeWriter");
  const toWrite = element.getAttribute("data-text");
  const period = element.getAttribute("data-period");

  if (toWrite) {
    let test = new TxtWrite(element, toWrite.split(","), period);
    test.tick();
  }
}

function portfolio() {
  const portfolioContent = document.getElementById("portfolio-content");
  const portfolioBtn = document.getElementById("see-more");
  let count = 0;

  let portfolioDb = [
    new newSite("http://www.prestigeconsultants.net", "prestigeconsultants", "Универсальная страница для бизнеса", "Простой пример лендинга. Блок услуг  с фотографиями, колонки со списком преимуществ, форма для связи"),
    new newSite("http://www.topcuratenie.md", "topcurat", "Универсальная страница для бизнеса", "Простой пример лендинга. Блок услуг  с фотографиями, колонки со списком преимуществ, форма для связи")

  ];
  let n = portfolioDb.length;
  if (portfolioDb.length > 3) {
    portfolioBtn.addEventListener("click", show, false);
    n = 3;
  } else {
    portfolioBtn.style.display = "none";
  }


  for (let i = 0; i < n; i++) {
    portfolioContent.appendChild(portfolioDb[i].portofolioDOM());
  }

  function show() {
    count++
    for (let i = count * 3; i < (count * 3) + 3; i++) {
      if (i == portfolioDb.length) {
        portfolioBtn.style.display = "none";
        break;
      }
      portfolioContent.appendChild(portfolioDb[i].portofolioDOM());
    }
  }
}


function navBar() {
  const headerId = document.getElementById("navbar");
  if (document.documentElement.scrollTop > 28) {
    headerId.classList.add("lab-navbar");
  }
  document.addEventListener("scroll", navScroll, false);
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
class newSite {
  constructor(link, className, title, description) {
    this.link = link;
    this.saitClassName = className;
    this.title = title;
    this.description = description;
  }

  portofolioDOM() {
    let wrapper = document.createElement("div");
    wrapper.className = "col-lg-6 col-xl-4";
    let portItem = document.createElement("div");
    portItem.className = "portfolio-item";
    let link = document.createElement("a");
    link.setAttribute("href", this.link);
    link.setAttribute("rel", "noopener");
    link.setAttribute('target', '_blank');
    let portfolioImg = document.createElement("div");
    portfolioImg.className = "portfolio-img";
    portfolioImg.classList.add(this.saitClassName);
    let imgEye = document.createElement("div");
    imgEye.className = "img-eye";
    let eyeImg = document.createElement("img");
    eyeImg.src = "img/portofoliu/eye.png";
    eyeImg.setAttribute("alt", "portofolio eye");
    imgEye.appendChild(eyeImg);
    portfolioImg.appendChild(imgEye);
    link.appendChild(portfolioImg);
    let portfolioText = document.createElement("div");
    portfolioText.className = "portfolio-text";
    let portfolioTitle = document.createElement("h4");
    portfolioTitle.className = "portfolio-title";
    portfolioTitle.innerHTML = this.title;
    portfolioText.appendChild(portfolioTitle);
    let description = document.createElement("p");
    description.innerHTML = this.description;
    portfolioText.appendChild(description);
    let siteShowBtn = document.createElement("button");
    siteShowBtn.className = " btn btn-sm";
    siteShowBtn.innerHTML = "Look";
    portfolioText.appendChild(siteShowBtn);
    link.appendChild(portfolioText);
    portItem.appendChild(link);
    wrapper.appendChild(portItem);
    return wrapper;
  }
}
class TxtWrite {
  constructor(el, toWrite, period) {
    this.el = el;
    this.toWrite = toWrite;
    this.period = parseInt(period, 10) || 2000;
    this.loopNum = 0;
    this.txt = "";
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
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 400;
    }
    setTimeout(() => {
      this.tick();
    }, delta);
  }
}