// var roles = jQuery_3_6_1("#role").text().trim();
// if (roles === '') {
//   window.addEventListener("load", function () {
//     const containss = document.querySelector(".containss");
//     containss.classList.add("show");
//   });
// }

const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
const inputField = document.getElementById("farm_key");
const checkbox = document.getElementById("new_key_check");

nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();
  if ((inputField.value.trim() === '' && !checkbox.checked) ||
    (inputField.value.trim() !== '' && checkbox.checked)) {
    alert('Please enter a value for either the input field or the checkbox, not both or neither.');
    event.preventDefault();
  }
  else if (
    (inputField.value.trim() === '' && checkbox.checked)) {
    slidePage.style.marginLeft = "-25%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;

  }
  else {
    var farms_list_str = jQuery_3_6_1("#farms_list").text().trim();
    // farms_list = JSON.parse(farms_list.replace(/'/g, "\""))
    farms_list_str = farms_list_str.replace(/'/g, "\""); // replace single quotes with double quotes
    var farms_list = JSON.parse(farms_list_str);

    console.log(farms_list); // output: ['first_farm']
    console.log(Array.isArray(farms_list)); // output: true
    // alert(farms_list[0])
    var found = false;
    var farm_key = jQuery_3_6_1("#farm_key").val();
    for (var i = 0; i < farms_list.length; i++) {
      if (farms_list[i] === farm_key) {
        found = true;
        M.toast({ html: `Farm Key Found`, classes: 'green rounded' });
        event.preventDefault();
        slidePage.style.marginLeft = "-50%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        bullet[current].classList.add("active");
        progressCheck[current].classList.add("active");
        progressText[current].classList.add("active");

        current += 2;
        break;
      }

    }
    if (!found) {
      M.toast({ html: `Farm Key Not Found`, classes: 'orange rounded' });
    }


  }

});
nextBtnSec.addEventListener("click", function (event) {
  var farm_name = jQuery_3_6_1('#farm_name').val();
  var farm_adddress = jQuery_3_6_1('#farm_adddress').val();
  var province = jQuery_3_6_1('#province').val();
  if (farm_name == '') {
    event.preventDefault();
    alert('Please enter Farm Name.');
     
  }
  else if (farm_adddress == '') {
    event.preventDefault();
    alert('Please enter Farm Address.');
     
  }
  else if (province == '') {
    event.preventDefault();
    alert('Please select Province.');
     
  }
  else{
    event.preventDefault();
      slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  }
  

});
nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
// submitBtn.addEventListener("click", function () {
//   bullet[current - 1].classList.add("active");
//   progressCheck[current - 1].classList.add("active");
//   progressText[current - 1].classList.add("active");
//   current += 1;
//   setTimeout(function () {
//     alert("Your Form Successfully Signed up");
//     location.reload();
//   }, 800);
// });

prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
  if (inputField.value.trim() !== '') {
    event.preventDefault();
    slidePage.style.marginLeft = "0%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    bullet[current - 3].classList.remove("active");
    progressCheck[current - 3].classList.remove("active");
    progressText[current - 3].classList.remove("active");
    current -= 2;
  }
  else {
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
  }

});
prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
