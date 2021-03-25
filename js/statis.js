document.addEventListener("DOMContentLoaded", init, false);


function init() {
    setTimeout(function () {
        document.body.className = "loaded";
      }, 500);
    feedbackForm();
}

function feedbackForm() {
  const btn = document.getElementById("sendFeedback");
  btn.addEventListener("click", sendEmail, false);
}

function sendEmail() {  
  const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    const estimateRadio = feedbackForm.estimateRadio.value;
    const noLike = feedbackForm.noLike.value;
    const like = feedbackForm.like.value;
    const likeReceive = feedbackForm.likeReceive.value;
    const notReceive = feedbackForm.notReceive.value;
    const guarantees = feedbackForm.guarantees.value;
    const chooseUs = feedbackForm.chooseUs.value;
    const recommend = feedbackForm.recommend.value;
    const email = feedbackForm.contactEmail.value;
    const btn = document.getElementById("sendFeedback");
    const loaderWrapper = document.getElementById("loader-wrapper");
    const loader = document.getElementById("loader");
    btn.disabled = true;
    loaderWrapper.style.visibility = "visible";
    loader.style.opacity = "1";

    Email.send({
      Host: "mail.ceciltan.com",
      Username: "admin@ceciltan.com",
      Password: "Nimenisinimic1!",
      To: "admin@ceciltan.com",
      From: email,
      Subject: "Email from Feedback",
      Body: `<html><h2>Nota de<br> ${estimateRadio}</h2><h2>NU nea placut in conlucrare <br> ${noLike}</h2><h2>Nea PLACUT<br> ${like}</h2><h2>Ce ati dori sa primiti<br> ${likeReceive}</h2><h2>Ce NU ati primit<br> ${notReceive}</h2><h2>Ce garantii<br> ${guarantees}</h2><h2>De ce neati ales pe noi<br> ${chooseUs}</h2><h2>Ati recomanda<br> ${recommend}</h2></html>`,
    }).then((res) => {
      if (res == "OK") {
        const emailConfirmWindow = document.createElement("div");
        emailConfirmWindow.className =
          "alert alert-success alert-dismissible fade show modal-window";
        emailConfirmWindow.setAttribute("role", "alert");
        emailConfirmWindow.innerHTML =
          "Your message was successfully sent, we'll revert to you in maximum 1-2 hours.";
        const btnModal = document.createElement("button");
        btnModal.className = "close";
        btnModal.setAttribute("data-dismiss", "alert");
        const span = document.createElement("span");
        span.setAttribute("aria-hidden", "true");
        span.innerHTML = "&times;";
        btnModal.appendChild(span);
        emailConfirmWindow.appendChild(btnModal);
        feedbackForm.appendChild(emailConfirmWindow);
        setTimeout(function () {
          $(".alert").alert("close");
        }, 3000);
        window.location.replace("https://www.ceciltan.com/");
      } else {
        const emailConfirmWindow = document.createElement("div");
        emailConfirmWindow.className =
          "alert alert-danger alert-dismissible fade show modal-window";
        emailConfirmWindow.setAttribute("role", "alert");
        emailConfirmWindow.innerHTML =
          "Sending failed, server Error. Please, contact me on my profile on Facebook or LinkedIn, or try again later!";
        feedbackForm.appendChild(emailConfirmWindow);
        setTimeout(function () {
          $(".alert").alert("close");
        }, 5000);
      }
      btn.disabled = false;
      loaderWrapper.style.visibility = "hidden";
      loader.style.opacity = "0";
    feedbackForm.estimateRadio.value = "";
    feedbackForm.noLike.value = "";
    feedbackForm.like.value = "";
    feedbackForm.likeReceive.value = "";
    feedbackForm.notReceive.value = "";
    feedbackForm.guarantees.value = "";
    feedbackForm.chooseUs.value = "";
    feedbackForm.recommend.value = "";
    feedbackForm.contactEmail.value = "";
    feedbackForm.checkInputForm.checked = false;
    feedbackForm.classList.remove("was-validated");
    });
  }
feedbackForm.classList.add("was-validated");

}