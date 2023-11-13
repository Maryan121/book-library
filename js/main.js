
const input = document.querySelector('input');
const btn = document.querySelector('button');
const descrip = document.querySelector('p');
const bookImage = document.getElementById('bookImage');

function search(e) {
    e.preventDefault();

    if (input.value === '') {
        descrip.innerHTML = 'Please enter a book name';
        setTimeout(() => {
            descrip.innerHTML = '';
        }, 3000);
        return;
    }

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(input.value)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.totalItems > 0) {
                bookImage.style.display = 'block';
                const bookInfo = data.items[0].volumeInfo;
                const title = bookInfo.title || 'Unknown Title';
                const author = bookInfo.authors ? bookInfo.authors[0] : 'Unknown Author';
                const year = bookInfo.publishedDate ? new Date(bookInfo.publishedDate).getFullYear() : 'Unknown Year';
                const imageLink = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : null;

                descrip.innerHTML = `'${title}' by ${author} was released in the year ${year}`;
                if (imageLink) {
                    bookImage.src = imageLink;
                } else {
                    bookImage.src = ''; // Clear the image if not available
                }
            } else {
                descrip.innerHTML = `Sorry! We don't have that book yet`;
                bookImage.src = ''; // Clear the image if not available
            }
        })
        .catch(error => {
            console.error('Error fetching book information:', error);
            descrip.innerHTML = 'An error occurred while fetching book information';
            bookImage.src = ''; // Clear the image if an error occurs
        });
}

btn.addEventListener('click', search);

const ToDarkThemeBtn = document.querySelector('#toDarkThemeBtn')
const toLightThemeBtn = document.querySelector('#toLightThemeBtn')

const toDarkTheme = () => {
    document.querySelector('body').style.backgroundColor = ' rgb(4, 4, 15)'
    document.querySelector('.container').style.color = '#fff'
    toLightThemeBtn.style.display = 'block'            
    ToDarkThemeBtn.style.display = 'none'

}

ToDarkThemeBtn.addEventListener('click',toDarkTheme)

const toLightTheme = () => {
    document.querySelector('body').style.backgroundColor = 'white'
    document.querySelector('.container').style.color = '#000'
    ToDarkThemeBtn.style.display = 'block'
    toLightThemeBtn.style.display = 'none'
}

toLightThemeBtn.addEventListener('click',toLightTheme)

 
