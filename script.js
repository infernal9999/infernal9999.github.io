// Fetch the data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the data to the console for verification
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

      if (person.WIFE !== 'NA') {
        const spouseContainer = document.createElement('div');
        spouseContainer.className = 'spouse-container';

        const spouseAvatar = document.createElement('img');
        spouseAvatar.className = 'avatar';
        spouseAvatar.src = person.SEX === 'MALE' ? 'female_avatar.png' : 'male_avatar.png';
        spouseAvatar.alt = person.WIFE;
        spouseContainer.appendChild(spouseAvatar);

        const spouseName = document.createElement('div');
        spouseName.className = 'name';
        spouseName.textContent = person.WIFE;
        spouseContainer.appendChild(spouseName);

        container.appendChild(spouseContainer);
      }

      container.addEventListener('click', () => {
        showPopup(person);
      });

      return container;
    }

    // Create popup content with person details in a table
    function createPopupContent(details, person) {
      const table = document.createElement('table');
      table.className = 'ui definition table';
    
      for (const [key, value] of Object.entries(person)) {
        if (
          key !== 'SEX' &&
          key !== 'FATHER' &&
          key !== 'MOTHER' &&
          key !== 'HUSBAND' &&
          key !== 'WIFE' &&
          key !== 'CHILDREN' &&
          value !== 'NA'
        ) {
          const row = document.createElement('tr');
    
          const labelCell = document.createElement('td');
          labelCell.textContent = key;
          row.appendChild(labelCell);
    
          const valueCell = document.createElement('td');
          valueCell.textContent = value;
          row.appendChild(valueCell);
    
          table.appendChild(row);
        }
      }
    
      details.appendChild(table);
    }
    
    // Show popup window with person details
    function showPopup(person) {
      const popupContent = document.getElementById('popupContent');
      popupContent.innerHTML = ''; // Clear previous content
    
      const avatar = document.createElement('img');
      avatar.className = 'popup-avatar';
      avatar.src = person.SEX === 'MALE' ? 'male_avatar.png' : 'female_avatar.png';
      avatar.alt = person.NAME;
      popupContent.appendChild(avatar);
    
      const details = document.createElement('div');
      details.className = 'popup-details';
    
      // Create the details table using createPopupContent function
      createPopupContent(details, person);
    
      popupContent.appendChild(details);
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
    
      const spousesContainer = document.createElement('div');
      spousesContainer.className = 'spouses-container';
    
      if (person.HUSBAND !== 'NA') {
        const husband = data.find(p => p.NAME === person.HUSBAND);
        if (husband) {
          const husbandContainer = document.createElement('div');
          husbandContainer.className = 'spouse-container';
          const husbandAvatar = document.createElement('img');
          husbandAvatar.className = 'avatar';
          husbandAvatar.src = 'male_avatar.png';
          husbandAvatar.alt = husband.NAME;
          husbandContainer.appendChild(husbandAvatar);
          const husbandName = document.createElement('div');
          husbandName.className = 'name';
          husbandName.textContent = husband.NAME;
          husbandContainer.appendChild(husbandName);
          spousesContainer.appendChild(husbandContainer);
        }
      }
    
      if (person.WIFE !== 'NA') {
        const wife = data.find(p => p.NAME === person.WIFE);
        if (wife) {
          const wifeContainer = document.createElement('div');
          wifeContainer.className = 'spouse-container';
          const wifeAvatar = document.createElement('img');
          wifeAvatar.className = 'avatar';
          wifeAvatar.src = 'female_avatar.png';
          wifeAvatar.alt = wife.NAME;
          wifeContainer.appendChild(wifeAvatar);
          const wifeName = document.createElement('div');
          wifeName.className = 'name';
          wifeName.textContent = wife.NAME;
          wifeContainer.appendChild(wifeName);
          spousesContainer.appendChild(wifeContainer);
        }
      }
    
      container.appendChild(spousesContainer);
    
      // Append the container to the family tree
      const familyTree = document.getElementById('familyTree');
      familyTree.appendChild(container);
    
      // Create a separate container for children
      const childrenContainer = document.createElement('div');
      childrenContainer.className = 'children-container';
    
      const children = person.CHILDREN.map(childName => data.find(child => child.NAME === childName));
    
      if (children.length > 0) {
        for (const child of children) {
          const childContainer = buildFamilyTree(child);
          childrenContainer.appendChild(childContainer);
        }
    
        // Create thread for each child
        const threadContainer = document.createElement('div');
        threadContainer.className = 'thread-container';
    
        for (let i = 0; i < children.length - 1; i++) {
          const thread = document.createElement('div');
          thread.className = 'thread';
          threadContainer.appendChild(thread);
        }
    
        familyTree.appendChild(childrenContainer);
        familyTree.appendChild(threadContainer);
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
