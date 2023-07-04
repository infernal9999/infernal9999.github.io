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
    
      // Create the details table using createPopupContent function
      createPopupContent(details, person);
    
      popup.appendChild(details);
      popup.style.display = 'block';
    
      // Close popup when clicking outside the container or on another container
      document.addEventListener('click', closePopup);
    }

    // Create popup content with person details in a table
    function createPopupContent(details, person) {
      const table = document.createElement('table');
      table.className = 'ui definition table';
    
      for (const [key, value] of Object.entries(person)) {
        if (key !== 'SEX' && key !== 'CHILDREN' && value !== 'NA') {
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
    
        const threadContainer = document.createElement('div');
        threadContainer.className = 'thread-container';
    
        for (const childName of person.CHILDREN) {
          const child = data.find(p => p.NAME === childName);
          if (child) {
            const childContainer = buildFamilyTree(child);
            childrenContainer.appendChild(childContainer);
    
            // Create thread for each child
            const thread = document.createElement('div');
            thread.className = 'thread';
            threadContainer.appendChild(thread);
          }
        }
    
        container.appendChild(childrenContainer);
        container.appendChild(threadContainer);
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
