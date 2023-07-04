// Fetch the data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const familyTree = document.getElementById('familyTree');

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

            return container;
        }

        // Recursive function to build the family tree
        function buildFamilyTree(person) {
            const container = createPersonContainer(person);

            if (person.SPOUSE) {
                const spouseContainer = createPersonContainer(person.SPOUSE);
                spouseContainer.classList.add('spouse');
                container.appendChild(spouseContainer);

                const threadContainer = document.createElement('div');
                threadContainer.className = 'thread-container';
                container.appendChild(threadContainer);

                const thread = document.createElement('div');
                thread.className = 'thread';
                threadContainer.appendChild(thread);

                if (person.SEX === 'MALE') {
                    thread.classList.add('thread-right');
                } else {
                    thread.classList.add('thread-left');
                }
            }

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
