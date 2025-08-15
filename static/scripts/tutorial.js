  document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll('.scroll-dot');
    const sections = document.querySelectorAll('section');

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const sectionNumber = dot.getAttribute('data-section');
        const targetSection = document.getElementById(`section-${sectionNumber}`);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Atualiza a bolinha ativa com base na rolagem
    window.addEventListener('scroll', () => {
      let current = 0;
      sections.forEach((section, index) => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight / 2) {
          current = index;
        }
      });

      dots.forEach(dot => dot.classList.remove('active'));
      dots[current].classList.add('active');
    });
  });