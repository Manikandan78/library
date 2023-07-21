const searchInput = document.getElementById('searchInput');
const cardContainer = document.getElementById('cardcontainer');
const totalCardCountElement = document.getElementById('totalCardCount');
const matchingCardCountElement = document.getElementById('matchingCardCount');
const categoryContainers = document.querySelectorAll('.category');

function updateCardCounts(totalCount, matchingCount) {
    totalCardCountElement.textContent = totalCount;
    matchingCardCountElement.textContent = matchingCount;
}



function displayCards(filteredCards, category) {
    const categoryContainer = document.querySelector(`[data-category="${category}"] .row`);
    categoryContainer.innerHTML = '';

    filteredCards.forEach(card => {
        const cardElement = createCardElement(card);
        categoryContainer.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-sm-6', 'col-md-4', 'mb-3');

    const cardContent = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.content}</p>
            </div>
        </div>
    `;
    cardDiv.innerHTML = cardContent;

    return cardDiv;
}

function filterCards() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    categoryContainers.forEach(categoryContainer => {
        const category = categoryContainer.dataset.category;
        const cardsInCategory = categoryContainer.querySelectorAll('.card');

        cardsInCategory.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardContent = card.querySelector('.card-text').textContent.toLowerCase();

            const matchesSearchTerm = cardTitle.includes(searchTerm) || cardContent.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || selectedCategory === category;

            card.style.display = matchesSearchTerm && matchesCategory ? 'block' : 'none';
        });
    });
} 

function filterCards() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    let totalCount = 0;
    let matchingCount = 0;

    categoryContainers.forEach(categoryContainer => {
        const category = categoryContainer.dataset.category;
        const cardsInCategory = categoryContainer.querySelectorAll('.card');

        cardsInCategory.forEach(card => {
            totalCount++;

            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardContent = card.querySelector('.card-text').textContent.toLowerCase();

            const matchesSearchTerm = cardTitle.includes(searchTerm) || cardContent.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || selectedCategory === category;

            card.style.display = matchesSearchTerm && matchesCategory ? 'block' : 'none';

            if (matchesSearchTerm && matchesCategory) {
                matchingCount++;
            }
        });
    });

    updateCardCounts(totalCount, matchingCount);
}

searchInput.addEventListener('input', filterCards);
categorySelect.addEventListener('change', filterCards);

// Initial display of all cards
filterCards();



