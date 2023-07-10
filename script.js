// script.js
document.addEventListener("DOMContentLoaded", function() {
  let familyData = []; // Declare familyData variable inside the event listener

  const familyTreeContainer = document.getElementById("familyTree");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");
  const popupImage = document.getElementById("popupImage");
  const popupDetails = document.getElementById("popupDetails");
  const closeButton = document.getElementById("closeButton");

  // Fetch data from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      familyData = data; // Assign fetched data to familyData
      const familyTree = createFamilyTree(data);
      familyTreeContainer.appendChild(familyTree);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const createFamilyTree = (members) => {
    const treeWrapper = document.createElement("div");
    treeWrapper.className = "family-tree";

    const levels = [[]];
    let currentLevel = 0;

    members.forEach((member) => {
      const memberContainer = createMemberContainer(member);
      levels[currentLevel].push(memberContainer);

      if (member.WIFE || member.SIBLINGS) {
        const spouseAndSiblingsContainer = document.createElement("div");
        spouseAndSiblingsContainer.className = "level-0";
        spouseAndSiblingsContainer.appendChild(memberContainer);

        if (member.WIFE) {
          const spouseContainer = createSpouseContainer(member.WIFE);
          spouseAndSiblingsContainer.appendChild(spouseContainer);
        }

        if (member.SIBLINGS && member.SIBLINGS.length > 0) {
          const siblingsContainer = createSiblingsContainer(member.SIBLINGS);
          spouseAndSiblingsContainer.appendChild(siblingsContainer);
        }

        treeWrapper.appendChild(spouseAndSiblingsContainer);
      } else {
        treeWrapper.appendChild(memberContainer);
      }

      if (member.CHILDREN && member.CHILDREN.length > 0) {
        const childrenContainer = createChildrenContainer(member.CHILDREN);
        levels[currentLevel + 1] = levels[currentLevel + 1] || [];
        levels[currentLevel + 1].push(childrenContainer);
      }
    });

    for (let i = 0; i < levels.length; i++) {
      const levelContainer = document.createElement("div");
      levelContainer.className = `level-${i}`;

      levels[i].forEach((container) => {
        levelContainer.appendChild(container);
      });

      treeWrapper.appendChild(levelContainer);
    }

    return treeWrapper;
  };

  const createMemberContainer = (member) => {
    const container = document.createElement("div");
    container.className = "container";

    if (member.SEX === "MALE") {
      container.classList.add("husband");
    } else {
      container.classList.add("wife");
    }

    // Check if the person has a partner
    const partner = familyData.find(
      (p) =>
        (member.SEX === "MALE" && p.NAME === member.WIFE) ||
        (member.SEX === "FEMALE" && p.NAME === member.HUSBAND)
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

    const imageSrc = `images/${member.NAME.replace(/\s+/g, "").toLowerCase()}.png`;
    const fallbackImageSrc =
      member.SEX === "MALE" ? "images/male_avatar.png" : "images/female_avatar.png";

    const image = document.createElement("img");
    image.src = imageSrc;
    image.onerror = () => {
      image.src = fallbackImageSrc;
    };

    image.addEventListener("click", () => {
      popupImage.src = image.src;
      popupDetails.innerHTML = `<p>Name: ${member.NAME}</p>` +
                                `<p>Sex: ${member.SEX}</p>` +
                                `<p>Father: ${member.FATHER}</p>` +
                                `<p>Mother: ${member.MOTHER}</p>` +
                                `<p>Date of Birth: ${member.DOB}</p>` +
                                (member.SEX === "MALE"
                                  ? `<p>Wife: ${member.WIFE}</p>`
                                  : `<p>Husband: ${member.HUSBAND}</p>`) +
                                `<p>Children: ${member.CHILDREN.join(", ")}</p>`;
      popup.style.display = "block";
    });

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = member.NAME;

    container.appendChild(image);
    container.appendChild(name);

    return container;
  };

  const createSpouseContainer = (spouse) => {
    const container = document.createElement("div");
    container.className = "container spouse";

    const imageSrc = `images/${spouse.replace(/\s+/g, "").toLowerCase()}.png`;
    const fallbackImageSrc = "images/female_avatar.png";

    const image = document.createElement("img");
    image.src = imageSrc;
    image.onerror = () => {
      image.src = fallbackImageSrc;
    };

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = spouse;

    container.appendChild(image);
    container.appendChild(name);

    return container;
  };

  const createSiblingsContainer = (siblings) => {
    const container = document.createElement("div");
    container.className = "container siblings";

    siblings.forEach((sibling) => {
      const siblingContainer = document.createElement("div");
      siblingContainer.className = "container sibling";

      const imageSrc = `images/${sibling.replace(/\s+/g, "").toLowerCase()}.png`;
      const fallbackImageSrc = "images/male_avatar.png";

      const image = document.createElement("img");
      image.src = imageSrc;
      image.onerror = () => {
        image.src = fallbackImageSrc;
      };

      const name = document.createElement("div");
      name.className = "name";
      name.textContent = sibling;

      siblingContainer.appendChild(image);
      siblingContainer.appendChild(name);

      container.appendChild(siblingContainer);
    });

    return container;
  };

  const createChildrenContainer = (children) => {
    const container = document.createElement("div");
    container.className = "container children";

    children.forEach((child) => {
      const childContainer = document.createElement("div");
      childContainer.className = "container child";

      const imageSrc = `images/${child.replace(/\s+/g, "").toLowerCase()}.png`;
      const fallbackImageSrc = "images/male_avatar.png";

      const image = document.createElement("img");
      image.src = imageSrc;
      image.onerror = () => {
        image.src = fallbackImageSrc;
      };

      const name = document.createElement("div");
      name.className = "name";
      name.textContent = child;

      childContainer.appendChild(image);
      childContainer.appendChild(name);

      container.appendChild(childContainer);
    });

    return container;
  };

  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
