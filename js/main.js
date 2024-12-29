
const names = ['John', 'Bill', 'Jane', 'Alice', 'Steve', 'Lara'];

const descriptions = ["Sun", "Beach", "Mountain", "River", "City", "Club", "Night", "Moon"];

const messages = ['Все відмінно!',
    'Загалом все непогано. Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
    ];

const obj = (idx) => ({
    id: idx+1,
    url: getUrl(idx),
    likes: getRandomInt(15, 200),
    description: getRandomElement(descriptions),
    comments: getComments()
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getUrl(idx) {
    return `photos/${idx+1}.jpg`;
};

function getAvatar() {
    return `img/avatar-${getRandomInt(1, 6)}.svg`;
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function getComments() {
    return Array.from({length: getRandomInt(1, 5)}, (_,index) => ({
        id: ++index,
        avatar: getAvatar(),
        message: getRandomElement(messages),
        name: getRandomElement(names)
    }));
};

const photos = Array.from({length: 25}, (_,idx)=>obj(idx));
console.log(photos)

// ====================================================================================================

function renderAllPhotos(arr) {

    const template = document.querySelector('#picture');
    const uploadSection = document.querySelector('.pictures');

    arr.forEach(elem => {   
        let clonedTemplate = template.content.cloneNode(true);
        clonedTemplate.querySelector('.picture__img').src = elem.url;
        clonedTemplate.querySelector('.picture__likes').textContent = elem.likes;
        clonedTemplate.querySelector('.picture__comments').textContent = elem.comments.length;
        uploadSection.appendChild(clonedTemplate);
});
};
renderAllPhotos(photos);
