// Fetch the data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const familyTree = document.getElementById('familyTree');
    const popup = document.getElementById('popup');

    // Create a person container with avatar and name
    function createPersonContainer(person) {
      const container = document.createElement('div');
      container.className = 'person-container';

      const avatar = document.createElement('img');
      avatar.className = 'avatar';
      avatar.src = person.SEX === 'MALE' ? 'male_avatar.png' : 'female_avatar.png';
      avatar.alt = person.NAME;
      container.appendChild(avatar);

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = person.NAME;
      container.appendChild(name);

      container.addEventListener('click', () => {
        showPopup(person);
      });

      return container;
    }

    // Show popup window with person details
    function showPopup(person) {
      popup.innerHTML = ''; // Clear previous content

      const avatar = document.createElement('img');
      avatar.className = 'popup-avatar';
      avatar.src = person.SEX === 'MALE' ? 'male_avatar.png' : 'female_avatar.png';
      avatar.alt = person.NAME;
      popup.appendChild(avatar);

      const details = document.createElement('div');
      details.className = 'popup-details';

      for (const [key, value] of Object.entries(person)) {
        if (key !== 'SEX' && key !== 'CHILDREN' && value !== 'NA') {
          const row = document.createElement('div');
          row.className = 'popup-row';

          const label = document.createElement('div');
          label.className = 'popup-label';
          label.textContent = key;
          row.appendChild(label);

          const text = document.createElement('div');
          text.className = 'popup-text';
          text.textContent = value;
          row.appendChild(text);

          details.appendChild(row);
        }
      }

      popup.appendChild(details);
      popup.style.display = 'block';

      // Close popup when clicking outside the container or on another container
      document.addEventListener('click', closePopup);
    }

    // Close popup window
    function closePopup(event) {
      if (!event.target.closest('.person-container')) {
        popup.style.display = 'none';
        document.removeEventListener('click', closePopup);
      }
    }

    // Recursive function to build the family tree
    function buildFamilyTree(person) {
      const container = createPersonContainer(person);

      if (person.CHILDREN && person.CHILDREN.length > 0) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';

        for (const childName of person.CHILDREN) {
          const child = data.find(p => p.NAME === childName);
          if (child) {
            const childContainer = buildFamilyTree(child);
            childrenContainer.appendChild(childContainer);
          }
        }

        container.appendChild(childrenContainer);
      }

      return container;
    }

    // Find the root person (someone with no parents)
    const rootPerson = data.find(person => person.FATHER === 'NA' && person.MOTHER === 'NA');
    if (rootPerson) {
      const tree = buildFamilyTree(rootPerson);
      familyTree.appendChild(tree);
    }
  });
