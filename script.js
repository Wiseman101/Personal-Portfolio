
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const navItems = document.querySelectorAll(".nav-item")
const sections = document.querySelectorAll(".section")
const contactForm = document.getElementById("contactForm")


hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active")

  
  const lines = document.querySelectorAll(".hamburger .line")
  lines[0].classList.toggle("active")
  lines[1].classList.toggle("active")
  lines[2].classList.toggle("active")
})


navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      })
    }
  })
})


const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")

      
      const id = entry.target.getAttribute("id")
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${id}`) {
          item.classList.add("active")
        }
      })
    }
  })
}, observerOptions)

sections.forEach((section) => {
  sectionObserver.observe(section)
})


if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    //  form validation
    const fullname = document.getElementById("fullname").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    if (!fullname || !email || !message) {
      alert("Please fill in all fields")
      return
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    const submitBtn = this.querySelector('button[type="submit"]')
    submitBtn.disabled = true
    submitBtn.textContent = "Sending..."

    
    setTimeout(() => {
      alert("Thank you for your message! I will get back to you soon.")
      this.reset()
      submitBtn.disabled = false
      submitBtn.textContent = "Send Message 📤"
    }, 1500)
  })
}


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Add active class to hamburger on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("nav-bar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})


document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        #nav-bar.scrolled {
            background-color: rgba(17, 34, 64, 0.98);
            padding: 10px 20px;
        }
        
        .hamburger .line.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger .line.active:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger .line.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .nav-item.active {
            color: var(--primary-color) !important;
            background-color: var(--light-navy);
        }
    </style>
`,
)


window.addEventListener("DOMContentLoaded", () => {
  
  document.querySelector("#home").classList.add("active")

  
  const currentSection = window.location.hash || "#home"
  document.querySelector(`a[href="${currentSection}"]`)?.classList.add("active")
})

