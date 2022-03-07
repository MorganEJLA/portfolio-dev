const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})


    // Getter
var topButton = document.getElementById("topBtn");
    //shows up after 20px of scrolling down
    window.onscroll = function() {scrollFunction()};
    function scrollFunction(){
      if(document.body.scrollTop > 2400 || document.documentElement.scrollTop>2400){
          topButton.style.display = "block";

      }
      else{
          topButton.style.display = "none";
      }
    }

    //When user clicks on button, scroll to top
    function topFunction(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    }