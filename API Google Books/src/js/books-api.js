const apiKey = "AIzaSyAi59JgPZaZa2aSlLxtECrrcUjHGBjqYdI";
const booksContainer = document.getElementById("main__books-cards__wrap");
let queryNow = '';

function loadBooks(query) {
    let queryToFetch = query;
    switch (query) {
        case 'Art & Fashion':
            queryToFetch = 'Art';
            break;
        case 'Biography':
            queryToFetch = 'Biography & Autobiography';
            break;
        case 'Food & Drink':
            queryToFetch = 'Cooking';
            break;
        case 'Health & Wellbeing':
            queryToFetch = 'Health & Fitness';
            break
    }
    queryNow = query;
    const maxResults = "maxResults=6";
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryToFetch}&${maxResults}&key=${apiKey}`).then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`)
        }
        return response.json()
    }).then(data => {
        displayBooks(data.items)
    }).catch(error => {
        console.error("Ошибка:", error)
    })
}

function getRating(rating) {
    let ceilRating = Math.ceil(rating);
    let htmlRating = '';
    for (let i = ceilRating; i != 0; i--) {
        htmlRating += `<img src="img/Star.svg" alt="Звезда">`
    }
    for (let i = 5 - ceilRating; i != 0; i--) {
        htmlRating += `<img src="img/Star-nonGold.svg" alt="Звезда">`
    }
    return htmlRating
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function displayBooks(books) {
    booksContainer.innerHTML = "";
    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.className = "main__books-cards__wrap__book";
        console.log(book);
        const thumbnailUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "../img/placeholder.png";
        bookElement.innerHTML = `
    <div class="book__img"><img src="${thumbnailUrl}" alt="${book.volumeInfo.title}"></div>
    <div class="book__info-wrap">
        <div class="book__info">
            <div class="book__info_author">${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Не указано"}</div>
            <div class="book__info_title">${book.volumeInfo.title}</div>
            <div class="book__info_rating">${getRating(book.volumeInfo.averageRating ? book.volumeInfo.averageRating : getRandomInt(5))} ${book.volumeInfo.ratingsCount ? book.volumeInfo.ratingsCount : getRandomInt(100)} review</div>
            <div class="book__info_desc">${book.volumeInfo.description || "Описание отсутствует"}</div>
            <div class="book__info_price">${book?.saleInfo?.retailPrice?.amount || "Нет цены"} ${book?.saleInfo?.retailPrice?.currencyCode || ""}</div>
            <div class="book__info_buy">buy now</div>
            <div class="book__info_book-id">${book.id}</div>
        </div>
    </div>
    `;
        booksContainer.appendChild(bookElement)
    })
}
window.addEventListener("load", loadBooks("Architecture"));
const listItems = document.querySelectorAll('.main__categories__list ul li');
let selectedItem = document.getElementById('selected-categorie');
listItems.forEach(item => {
    item.addEventListener('click', function() {
        if (selectedItem) {
            selectedItem.removeAttribute('id', 'selected-categorie')
        }
        selectedItem = this;
        selectedItem.setAttribute('id', 'selected-categorie');
        const query = selectedItem.textContent;
        loadBooks(query)
    })
});

function loadBooksMore(query, startIndex) {
    const maxResults = "maxResults=6";
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&${maxResults}&startIndex=${startIndex}&key=${apiKey}`).then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`)
        }
        return response.json()
    }).then(data => {
        displayBooksMore(data.items)
    }).catch(error => {
        console.error("Ошибка:", error)
    })
}

function displayBooksMore(books) {
    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.className = "main__books-cards__wrap__book";
        console.log(book);
        const thumbnailUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "../img/placeholder.png";
        bookElement.innerHTML = `
    <div class="book__img"><img src="${thumbnailUrl}" alt="${book.volumeInfo.title}"></div>
    <div class="book__info-wrap">
        <div class="book__info">
            <div class="book__info_author">${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Не указано"}</div>
            <div class="book__info_title">${book.volumeInfo.title}</div>
            <div class="book__info_rating">${getRating(book.volumeInfo.averageRating ? book.volumeInfo.averageRating : getRandomInt(5))} ${book.volumeInfo.ratingsCount ? book.volumeInfo.ratingsCount : getRandomInt(100)} review</div>
            <div class="book__info_desc">${book.volumeInfo.description || "Описание отсутствует"}</div>
            <div class="book__info_price">${book?.saleInfo?.retailPrice?.amount || "Нет цены"} ${book?.saleInfo?.retailPrice?.currencyCode || ""}</div>
            <div class="book__info_buy">buy now</div>
            <div class="book__info_book-id">${book.id}</div>
        </div>
    </div>
    `;
        booksContainer.appendChild(bookElement)
    })
}
const loadMoreSelector = document.querySelector('.main__books-cards__load-more');
let startIndex2 = 6;
loadMoreSelector.addEventListener('click', () => {
    loadBooksMore(queryNow, startIndex2)
    startIndex2 = startIndex2 + 6
});
document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('book__info_buy')) {
        inTheCard = event.target;
        let bookId = event.target.parentElement.querySelector('.book__info_book-id').textContent;
        let bookName = event.target.parentElement.querySelector('.book__info_title').textContent;
        if (event.target.textContent === 'in the card') {
            inTheCard.innerHTML = 'buy now';
            inTheCard.removeAttribute('id', 'in-the-card');
            localStorage.removeItem(bookName, bookId);
            document.querySelector('.header__menu__icons_basket_text').innerHTML = localStorage.length;
            if (localStorage.length === 0) {
                document.querySelector('.header__menu__icons_basket').style.display = 'none'
            }
        } else {
            inTheCard.innerHTML = 'in the card';
            inTheCard.setAttribute('id', 'in-the-card');
            localStorage.setItem(bookName, bookId);
            document.querySelector('.header__menu__icons_basket').style.display = 'flex';
            document.querySelector('.header__menu__icons_basket_text').innerHTML = localStorage.length
        }
    }
});
if (localStorage.length != 0) {
    document.querySelector('.header__menu__icons_basket').style.display = 'flex';
    document.querySelector('.header__menu__icons_basket_text').innerHTML = localStorage.length
}
