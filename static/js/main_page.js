const parallax_el = document.querySelectorAll(".parallax");

let timeline = gsap.timeline();
Array.from(parallax_el)
.filter((el) => !el.classList.contains("text"))
.forEach((el) => {
    timeline.from(
        el,
        {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration:3.5,
            ease: "power3.out",
        },
        "1"
    );
});
timeline.from(
    ".text h1",
    {
        y:
          window.innerHeight -
          document.querySelector(".text h1").getBoundingClientRect().top +
          200,
        duration: 2,
    },
    "2.5"
)
.from(
    ".text h2",
    {
        y: -150,
        opacity: 0,
        duration: 1.5,
    },
    "3"
)
.from(
    ".text p",
    {
        y: -50,
        opacity: 0,
        duration: 1.5,
    },
    "4"
)
.from(".hide",{
    opacity: 0,
    duration: 1.5,
}, "3");