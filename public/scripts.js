
//--------------------------------------------------------------------------------------//
//                           Section4: Slideshow Presentation                           //
//--------------------------------------------------------------------------------------//
let slideIndex = 0;
showSlides();

function showSlides() { 
    let i;   // declare variable
    let slides = document.getElementsByClassName("slide");  // get all slides
    for (i = 0; i < slides.length; i++) {   // hide all slides
        slides[i].style.display = "none";
    }
    slideIndex++; // increment slide index
    if (slideIndex > slides.length) {slideIndex = 1} // reset to first slide
    slides[slideIndex-1].style.display = "block"; // display current slide
    setTimeout(showSlides, 3000); // change slide every 3 seconds
}
