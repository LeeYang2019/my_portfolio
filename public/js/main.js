const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

//open panel
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

//close panel with each selection on panel
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

//get view resume button
const resumeBtn = document.getElementById('resume_btn');
resumeBtn.addEventListener('click', () => {
  //open resume
  window.location.href = 'viewPDF.html'
});
