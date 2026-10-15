function getText(message) {
    let value = prompt(message);

    while (value === null || value.trim() === "") {
        value = prompt("Помилка! Поле не може бути порожнім. " + message);
    }

    return value.trim();
}

function getWords(message) {
    let value = prompt(message);

    const validWords = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'.-]+( [a-zA-Zа-яА-ЯіІїЇєЄґҐ'.-]+)*$/;

    while (value === null || value.trim().length < 2 || !validWords.test(value.trim())) {
        value = prompt("Помилка! Тільки букви, крапка, апостроф і дефіс, без цифр, не менше 2 символів. " + message);
    }

    return value.trim();
}

function getYear(message) {
    const currentYear = new Date().getFullYear();
    let value = Number(prompt(message));

    while (isNaN(value) || !Number.isInteger(value) || value < 1000 || value > currentYear) {
        value = Number(prompt(`Помилка! Введіть ціле число від 1000 до ${currentYear}. ` + message));
    }

    return value;
}

function getPrice(message) {
    let value = Number(prompt(message));

    while (isNaN(value) || !Number.isInteger(value) || value <= 0) {
        value = Number(prompt("Помилка! Введіть ціле число більше 0. " + message));
    }

    return value;
}

function getNumberInRange(message, max) {
    let value = Number(prompt(message));

    while (isNaN(value) || !Number.isInteger(value) || value < 1 || value > max) {
        value = Number(prompt(`Помилка! Введіть ціле число від 1 до ${max}. ` + message));
    }

    return value;
}

function showLines(containerId, lines) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    lines.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        container.appendChild(p);
    });
}


function createBook(title, author, year, isRead) {
    return {
        title,
        author,
        year,
        isRead,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        },
        markAsRead() {
            this.isRead = true;
        }
    };
}

const book = createBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997, true);

function showBookInfo() {
    const info = book.bookInfo();
    console.log(info);
    showLines("out1", [info]);
}

function toggleBookRead() {
    book.isRead = !book.isRead;
    showBookInfo();
}


const library = [
    createBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997, true),
    createBook("The Hobbit", "J.R.R. Tolkien", 1937, false),
    createBook("1984", "George Orwell", 1949, true)
];

function displayLibrary(containerId) {
    const lines = library.map(item => item.bookInfo());
    lines.forEach(line => console.log(line));
    showLines(containerId, lines);
}

function addGatsbyBook() {
    const alreadyAdded = library.some(item => item.title === "The Great Gatsby");

    if (alreadyAdded) {
        showLines("out2", ["Книга «The Great Gatsby» уже є в бібліотеці"]);
        return;
    }

    library.push(createBook("The Great Gatsby", "F. Scott Fitzgerald", 1925, false));
    displayLibrary("out2");
}


function sortLibraryByYear() {
    library.sort((a, b) => a.year - b.year);
    console.log("Відсортовані книги за роком видання:", library);
    showLines("out3", library.map(item => item.bookInfo()));
}

function showUnreadBooks() {
    const unreadBooks = library.filter(item => !item.isRead);
    console.log("Непрочитані книги:", unreadBooks);

    if (unreadBooks.length === 0) {
        showLines("out3", ["Непрочитаних книг немає"]);
    } else {
        showLines("out3", unreadBooks.map(item => item.bookInfo()));
    }
}

function showTolkienBook() {
    const tolkienBook = library.find(item => item.author === "J.R.R. Tolkien");
    console.log("Книга Толкіна:", tolkienBook);

    if (!tolkienBook) {
        showLines("out3", ["Книгу Толкіна не знайдено"]);
    } else {
        showLines("out3", [tolkienBook.bookInfo()]);
    }
}


function addBookToLibrary() {
    const title = getText("Введіть назву книги:");
    const author = getWords("Введіть автора книги:");
    const year = getYear("Введіть рік видання книги:");
    const isRead = confirm("Чи прочитана книга?");

    library.push(createBook(title, author, year, isRead));
    displayLibrary("out4");
}


function markFirstUnreadBook() {
    const unread = library.find(item => !item.isRead);

    if (!unread) {
        showLines("out5", ["Усі книги вже прочитані"]);
        return;
    }

    unread.markAsRead();
    showLines("out5", [`Позначено прочитаною: ${unread.title}`].concat(library.map(item => item.bookInfo())));
}

function calculateAverageYear() {
    const totalYears = library.reduce((sum, item) => sum + item.year, 0);
    return totalYears / library.length;
}

function showAverageYear() {
    const average = calculateAverageYear();
    showLines("out5", [`Середній рік видання: ${Math.round(average)}`]);
}


function createMagazine(name, topic, frequency, price, isActive) {
    return {
        name,
        topic,
        frequency,
        price,
        isActive,
        magazineInfo() {
            return `Назва: ${this.name}, Тематика: ${this.topic}, Періодичність: ${this.frequency}, Ціна підписки: ${this.price} грн, Підписка активна: ${this.isActive ? "Так" : "Ні"}`;
        },
        markAsActive() {
            this.isActive = true;
        }
    };
}

const modernMagazines = [
    createMagazine("Wired", "Технології", "щомісяця", 1100, true),
    createMagazine("Forbes", "Бізнес", "щомісяця", 1250, true),
    createMagazine("National Geographic", "Наука і подорожі", "щомісяця", 980, false),
    createMagazine("The Economist", "Економіка", "щотижня", 2400, true),
    createMagazine("Vogue", "Мода", "щомісяця", 1350, false)
];

function showMagazineInfo() {
    const lines = modernMagazines.map((item, index) => `${index + 1}. ${item.magazineInfo()}`);
    lines.forEach(line => console.log(line));
    showLines("mout1", lines);
}

function toggleMagazineActive() {
    const number = getNumberInRange(`Введіть номер журналу (1–${modernMagazines.length}):`, modernMagazines.length);
    const selected = modernMagazines[number - 1];

    selected.isActive = !selected.isActive;
    showMagazineInfo();
}


const magazines = [
    createMagazine("Світ науки", "Наука", "щомісяця", 780, true),
    createMagazine("Мода і стиль", "Мода", "щомісяця", 950, false),
    createMagazine("Подорожі та пригоди", "Туризм", "раз на два місяці", 600, true)
];

function displayMagazines(containerId) {
    const lines = magazines.map(item => item.magazineInfo());
    lines.forEach(line => console.log(line));
    showLines(containerId, lines);
}

function addSportMagazine() {
    const alreadyAdded = magazines.some(item => item.name === "Спорт і здоров'я");

    if (alreadyAdded) {
        showLines("mout2", ["Журнал «Спорт і здоров'я» уже є в списку"]);
        return;
    }

    magazines.push(createMagazine("Спорт і здоров'я", "Здоров'я", "щомісяця", 540, false));
    displayMagazines("mout2");
}


function sortMagazinesByPrice() {
    magazines.sort((a, b) => a.price - b.price);
    console.log("Журнали, відсортовані за ціною підписки:", magazines);
    showLines("mout3", magazines.map(item => item.magazineInfo()));
}

function showInactiveMagazines() {
    const inactiveMagazines = magazines.filter(item => !item.isActive);
    console.log("Журнали з неактивною підпискою:", inactiveMagazines);

    if (inactiveMagazines.length === 0) {
        showLines("mout3", ["Усі підписки активні"]);
    } else {
        showLines("mout3", inactiveMagazines.map(item => item.magazineInfo()));
    }
}

function showFashionMagazine() {
    const fashionMagazine = magazines.find(item => item.topic === "Мода");
    console.log("Журнал про моду:", fashionMagazine);

    if (!fashionMagazine) {
        showLines("mout3", ["Журнал про моду не знайдено"]);
    } else {
        showLines("mout3", [fashionMagazine.magazineInfo()]);
    }
}


function addMagazineToList() {
    const name = getText("Введіть назву журналу:");
    const topic = getWords("Введіть тематику журналу:");
    const frequency = getWords("Введіть періодичність виходу (наприклад, щомісяця):");
    const price = getPrice("Введіть ціну підписки (грн):");
    const isActive = confirm("Чи активна підписка?");

    magazines.push(createMagazine(name, topic, frequency, price, isActive));
    displayMagazines("mout4");
}


function activateFirstInactiveMagazine() {
    const inactive = magazines.find(item => !item.isActive);

    if (!inactive) {
        showLines("mout5", ["Усі підписки вже активні"]);
        return;
    }

    inactive.markAsActive();
    showLines("mout5", [`Підписку активовано: ${inactive.name}`].concat(magazines.map(item => item.magazineInfo())));
}

function calculateAveragePrice() {
    const totalPrice = magazines.reduce((sum, item) => sum + item.price, 0);
    return totalPrice / magazines.length;
}

function showAveragePrice() {
    const average = calculateAveragePrice();
    showLines("mout5", [`Середня ціна підписки: ${average.toFixed(2)} грн`]);
}