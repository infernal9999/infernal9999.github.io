document.addEventListener("DOMContentLoaded", function() {
  const familyTreeContainer = document.getElementById("familyTree");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");
  const popupImage = document.getElementById("popupImage");
  const popupDetails = document.getElementById("popupDetails");
  const closeButton = document.getElementById("closeButton");

  // Fetch data from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((familyData) => {
      familyData.forEach((person) => {
        createPersonContainer(person);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const createPersonContainer = (person) => {
    const container = document.createElement("div");
    container.className = "container";

    if (person.SEX === "MALE") {
      container.classList.add("husband");
    } else {
      container.classList.add("wife");
    }

    // Check if the person has a partner
    const partner = familyData.find(
      (p) =>
        (person.SEX === "MALE" && p.NAME === person.WIFE) ||
        (person.SEX === "FEMALE" && p.NAME === person.HUSBAND)
    );

    if (partner) {
      container.style.backgroundColor = "orangered";

      container.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "indianred";
      });

      container.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "orangered"; // Reset the background color
      });
    }

    const imageSrc = `images/${person.NAME.replace(/\s+/g, "").toLowerCase()}.png`;
    const fallbackImageSrc = person.SEX === "MALE" ? "images/male_avatar.png" : "images/female_avatar.png";

    const image = document.createElement("img");
    image.src = imageSrc;
    image.onerror = () => {
      image.src = fallbackImageSrc;
    };

    image.addEventListener("click", () => {
      popupImage.src = image.src;
      popupDetails.innerHTML = `<p>Name: ${person.NAME}</p>` +
                                `<p>Sex: ${person.SEX}</p>` +
                                `<p>Father: ${person.FATHER}</p>` +
                                `<p>Mother: ${person.MOTHER}</p>` +
                                `<p>Date of Birth: ${person.DOB}</p>` +
                                `<p>Wife: ${person.WIFE}</p>` +
                                `<p>Children: ${person.CHILDREN.join(", ")}</p>`;
      popup.style.display = "block";
    });

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = person.NAME;

    container.appendChild(image);
    container.appendChild(name);
    familyTreeContainer.appendChild(container);
  };

  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
