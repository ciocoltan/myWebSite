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
      if (res == "OK") {
        const emailConfirmWindow = document.createElement("div");
        emailConfirmWindow.className = "alert alert-success alert-dismissible fade show modal-window";
        emailConfirmWindow.setAttribute("role", "alert");
        emailConfirmWindow.innerHTML = "Your message was successfully sent, we'll revert to you in maximum 1-2 hours.";
        const btn = document.createElement("button");
        btn.className = "close";
        btn.setAttribute("data-dismiss", "alert");
        const span = document.createElement("span");
        span.setAttribute("aria-hidden", "true");
        span.innerHTML = "&times;";
        btn.appendChild(span);
        emailConfirmWindow.appendChild(btn);
        contactForm.appendChild(emailConfirmWindow);
        setTimeout(function () {
          $('.alert').alert('close');
        }, 3000);
      } else {
        const emailConfirmWindow = document.createElement("div");
        emailConfirmWindow.className = "alert alert-danger alert-dismissible fade show modal-window";
        emailConfirmWindow.setAttribute("role", "alert");
        emailConfirmWindow.innerHTML = "Sending failed, server Error. Please, contact me on my profile on Facebook or LinkedIn, or try again later!";
        contactForm.appendChild(emailConfirmWindow);
        setTimeout(function () {
          $('.alert').alert('close');
        }, 5000);
      }
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
    new newSite("#home", "personal", "Personal Web Site", "This site is designed to present my portfolio as web developer. It embodies perfectly self description and professional experience and gives to visitors an introduction about me and my work. It’s goal is to create a deeper emotional relationship with visitors, potential clients.", ["js","bootstrap"]),
    new newSite("http://admin-panel.prestigeconsultants.net/", "admin-panel", "Admin Panel", "Admin Panel designated especially for users with no proficiency having the opportunity to modify, adjust, add information or any other changes to the website. It is an amazing tool easy to use and very helpful that guarantees excellent user experience.", ["angular","js","bootstrap"]),
    new newSite("http://www.prestigeconsultants.net", "prestigeconsultants", "Prestige Business Consultants", "Website built from scratch and developed for a consulting company based in Cyprus. Fully responsive website, conceptualized in close collaboration with the management team to promote consulting services and necessary assistance to clients. Designed for easy and at the same time fast access for different categories of users/clients.", ["js","bootstrap"]),
    new newSite("http://www.topcuratenie.md", "topcurat", "Top Curatenie", "A project designed and developed for small business - cleaning company from Republic of Moldova. The website constantly updated with new information like offers, promotions, hacks for housekeepers. Design adapted to the client's needs, providing the full range of services that the company offers.", ["css3","html5"])
  ];
  let n = portfolioDb.length;
  if (portfolioDb.length > 3) {
    portfolioBtn.addEventListener("click", btnshow, false);
    n = 3;
  } else {
    portfolioBtn.style.display = "none";
  }
  for (let i = 0; i < n; i++) {
    portfolioContent.appendChild(portfolioDb[i].portofolioDOM());
  }

  function btnshow() {
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
  constructor(link, className, title, description, language) {
    this.link = link;
    this.saitClassName = className;
    this.title = title;
    this.description = description;
    this.language = language;
  }

  portofolioDOM() {
    const wrapper = document.createElement("div");
    wrapper.className = "col-md-6 col-xl-4";
    const portItem = document.createElement("div");
    portItem.className = "portfolio-item";
    const link = document.createElement("a");
    link.setAttribute("href", this.link);
    link.setAttribute("rel", "noopener");
    link.setAttribute('target', '_blank');
    const portfolioImg = document.createElement("div");
    portfolioImg.className = "portfolio-img";
    portfolioImg.classList.add(this.saitClassName);
    const imgEye = document.createElement("div");
    imgEye.className = "img-eye";
    const eyeImg = document.createElement("img");
    eyeImg.src = "img/portofoliu/eye.png";
    eyeImg.setAttribute("alt", "portofolio eye");
    imgEye.appendChild(eyeImg);
    portfolioImg.appendChild(imgEye);
    link.appendChild(portfolioImg);
    const portfolioText = document.createElement("div");
    portfolioText.className = "portfolio-text";
    const portfolioTitle = document.createElement("h4");
    portfolioTitle.className = "portfolio-title";
    portfolioTitle.innerHTML = this.title;
    portfolioText.appendChild(portfolioTitle);
    const description = document.createElement("p");
    description.innerHTML = this.description;
    portfolioText.appendChild(description);
    const portfolioFooter = document.createElement("div");
    portfolioFooter.className = "portfolio-footer";
    const siteShowBtn = document.createElement("button");
    siteShowBtn.className = " btn btn-sm";
    siteShowBtn.innerHTML = "Visit";
    const iconContainer = document.createElement("div");
    iconContainer.className = "row";
    for (let i = 0; i < this.language.length; i++) {
      const div = document.createElement("div");
      div.className = "icon " + this.language[i];
      iconContainer.appendChild(div);      
    }
    portfolioFooter.appendChild(siteShowBtn);
    portfolioFooter.appendChild(iconContainer);    
    portfolioText.appendChild(portfolioFooter);
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