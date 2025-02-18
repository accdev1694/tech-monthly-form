document.addEventListener("DOMContentLoaded", () => {
  const childrenContainer = document.querySelector(".children-container");
  const kidsCountInput = document.getElementById("kids-count");
  const curriculumContainer = document.querySelector(".curriculum-download");
  const chatroomContainer = document.querySelector(".chatroom-links");
  const totalAmountSpan = document.getElementById("total-amount");
  const promoMessage = document.querySelector(".promo-message");

  // Updated course data with age-specific courses
  const courses = {
    scratch: {
      name: "Scratch Stars (7-11 years)",
      curriculum: "scratch-stars.pdf",
      chatroom: "https://chat.techmonthly/scratch-stars",
    },
    python: {
      name: "Python Pirates (12-18 years)",
      curriculum: "python-pirates.pdf",
      chatroom: "https://chat.techmonthly/python-pirates",
    },
  };

  // Updated child template with age field and course validation
  const childTemplate = document.createElement("template");
  childTemplate.innerHTML = `
      <div class="child-section">
        <h4>Child #<span class="child-number"></span></h4>
        <section>
          <label class="label">Child's Full Name:</label>
          <input class="input" type="text" required>
        </section>
        <section>
          <label class="label">Child's Age:</label>
          <input class="input" type="number" min="7" max="18" required>
        </section>
        <section>
          <label class="label">Select Course:</label>
          <select class="input course-select" required>
            <option value="">Course</option>
            ${Object.entries(courses)
              .map(
                ([key, course]) =>
                  `<option value="${key}">${course.name}</option>`
              )
              .join("")}
          </select>
        </section>        
        <section class="downloads">
          <button type="button" class="download-btn">Curriculum</button>
          <a href="#" class="chatroom-btn" target="_blank">Class Chat</a>
        </section>
          
      </div>
    `;

  function updateChildSections() {
    const childCount = parseInt(kidsCountInput.value);
    childrenContainer.innerHTML = "";

    for (let i = 0; i < childCount; i++) {
      const clone = childTemplate.content.cloneNode(true);
      clone.querySelector(".child-number").textContent = i + 1;
      const courseSelect = clone.querySelector(".course-select");
      const downloadBtn = clone.querySelector(".download-btn");
      const chatroomBtn = clone.querySelector(".chatroom-btn");
      const ageInput = clone.querySelector('input[type="number"]');

      courseSelect.addEventListener("change", (e) => {
        const courseKey = e.target.value;
        const course = courses[courseKey];

        // Update age constraints based on course selection
        if (courseKey === "scratch") {
          ageInput.min = 7;
          ageInput.max = 11;
          ageInput.placeholder = "7-11 years";
        } else if (courseKey === "python") {
          ageInput.min = 12;
          ageInput.max = 18;
          ageInput.placeholder = "12-18 years";
        }

        // Update curriculum and chatroom links
        downloadBtn.dataset.curriculum = course.curriculum;
        chatroomBtn.href = course.chatroom;
      });

      downloadBtn.addEventListener("click", () => {
        const curriculum = downloadBtn.dataset.curriculum;
        if (curriculum) {
          window.open(`./curriculums/${curriculum}`, "_blank");
        } else {
          alert("Please select a course first");
        }
      });

      childrenContainer.appendChild(clone);
    }

    updatePricing();
  }

  function updatePricing() {
    const childCount = parseInt(kidsCountInput.value);
    let pricePerChild = childCount > 1 ? 50 : 65;
    const total = childCount * pricePerChild;

    totalAmountSpan.textContent = total;

    // Update promotional messages
    if (childCount > 2) {
      promoMessage.textContent =
        "🎉 Congratulations! You qualify for a free mini laptop for your best performing child!";
    } else {
      promoMessage.textContent = "";
    }
  }

  // Event Listeners
  kidsCountInput.addEventListener("input", () => {
    updateChildSections();
  });

  // Form submission handler
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation check
    const isValid = Array.from(
      document.querySelectorAll("input, select")
    ).every((field) => field.reportValidity());

    if (isValid) {
      // Here you would typically send data to a server
      alert(
        "Registration successful! Check your email for payment instructions."
      );
    }
  });

  // Initial setup
  updateChildSections();
});
