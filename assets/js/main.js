// Fontana & Souza Advocacia - Main Script

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header Scroll Effect
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-[#0B1F3A]/95', 'shadow-xl', 'backdrop-blur-md', 'border-b', 'border-[#C5A04F]/20');
      header.classList.remove('bg-[#0B1F3A]/80');
    } else {
      header.classList.remove('bg-[#0B1F3A]/95', 'shadow-xl', 'border-[#C5A04F]/20');
      header.classList.add('bg-[#0B1F3A]/80');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ScrollSpy for Active Links
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-[#C5A04F]', 'font-semibold');
            link.classList.remove('text-gray-300');
          } else {
            link.classList.remove('text-[#C5A04F]', 'font-semibold');
            link.classList.add('text-gray-300');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Contact Form Submission Handler (Email CTA)
  const contactForm = document.getElementById('email-contact-form');
  if (contactForm) {
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formFeedback = document.getElementById('form-feedback');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal || !emailRegex.test(emailVal)) {
        emailInput.classList.add('border-red-500', 'ring-1', 'ring-red-500');
        emailInput.classList.remove('border-gray-600', 'border-[#C5A04F]/40');
        if (emailError) emailError.classList.remove('hidden');
        isValid = false;
      } else {
        emailInput.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
        emailInput.classList.add('border-[#C5A04F]/40');
        if (emailError) emailError.classList.add('hidden');
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal || messageVal.length < 5) {
        messageInput.classList.add('border-red-500', 'ring-1', 'ring-red-500');
        messageInput.classList.remove('border-gray-600', 'border-[#C5A04F]/40');
        if (messageError) messageError.classList.remove('hidden');
        isValid = false;
      } else {
        messageInput.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
        messageInput.classList.add('border-[#C5A04F]/40');
        if (messageError) messageError.classList.add('hidden');
      }

      if (!isValid) {
        if (formFeedback) formFeedback.classList.add('hidden');
        return;
      }

      // Real email transmission via mailto protocol
      const targetEmail = "fontanaamd@gmail.com";
      const subject = encodeURIComponent("Contato pelo Site — Fontana & Souza Advocacia");
      const body = encodeURIComponent(
        `Olá, Fontana & Souza Advocacia.\n\n` +
        `E-mail de retorno: ${emailVal}\n\n` +
        `Mensagem:\n${messageVal}\n\n` +
        `---\nMensagem enviada através do site oficial.`
      );

      const mailtoUri = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      // Open email application
      window.location.href = mailtoUri;

      // Display transparent feedback to the visitor
      if (formFeedback) {
        formFeedback.classList.remove('hidden');
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Real-time error clearance on input
    emailInput.addEventListener('input', () => {
      if (emailInput.value.trim() && emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
        emailInput.classList.add('border-[#C5A04F]/40');
        if (emailError) emailError.classList.add('hidden');
      }
    });

    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 5) {
        messageInput.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
        messageInput.classList.add('border-[#C5A04F]/40');
        if (messageError) messageError.classList.add('hidden');
      }
    });
  }
});
