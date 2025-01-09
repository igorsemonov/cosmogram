
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

function generateElement(el) {
    const template = document.querySelector('#picture');
    let clonedTemplate = template.content.cloneNode(true);
    clonedTemplate.querySelector('.picture__img').src = el.url;
    clonedTemplate.querySelector('.picture__likes').textContent = el.likes;
    clonedTemplate.querySelector('.picture__comments').textContent = el.comments.length;
    clonedTemplate.querySelector('.picture__img').dataset.img = el.id;
    return clonedTemplate;
};

function generateComment(el) {
    const template = document.querySelector('#social__comment')
    let clonedCommentsSection = template.content.cloneNode(true);
    clonedCommentsSection.querySelector('.social__picture').src = el.avatar;
    clonedCommentsSection.querySelector('.social__picture').alt = el.name;
    clonedCommentsSection.querySelector('.social__text').textContent = el.message;
    return clonedCommentsSection;
};


function renderAllPhotos(arr) {
    const uploadSection = document.querySelector('.pictures');
    arr.forEach(element => { 
        uploadSection.appendChild(generateElement(element));
    });
};

function renderComments(el) {
    const uploadCommentSection = document.querySelector('.social__comments');
    uploadCommentSection.innerHTML = '';
    el.forEach(elem => {
        uploadCommentSection.appendChild(generateComment(elem));
    });
};

renderAllPhotos(photos);

// ====================================================================================================

function toggleClass() {
    const bigImgEl = document.querySelector('.big-picture');
    const body = document.querySelector('body');
    const commentCount = document.querySelector('.social__comment-count');
    bigImgEl.classList.toggle('hidden');
    body.classList.toggle('modal-open');
    commentCount.classList.toggle('hidden');
};

function renderFullScreen(event) {
    const bigPicImg = document.querySelector('.big-picture__img img');
    const likes = document.querySelector('.likes-count');
    const comments = document.querySelector('.comments-count');
    const socialCaption = document.querySelector('.social__caption');
    photos.forEach((el) => {
        if(event.target.getAttribute('data-img') == el.id){
            bigPicImg.src = el.url;
            likes.textContent = el.likes;
            comments.textContent = el.comments.length;
            socialCaption.textContent = el.description;
            renderComments(el.comments);
        };
    });
};

function getFullScreen(event) {
    if(event.target.hasAttribute('data-img')){
        toggleClass();
        renderFullScreen(event);
    };
};

function closeFullScreen() {
    toggleClass();
}

document.addEventListener('keydown', e => {
    const bigImgEl = document.querySelector('.big-picture');
    if(e.key === 'Escape' && !bigImgEl.classList.contains('hidden')){
        closeFullScreen();
    }
})

const picSection = document.querySelector('.pictures');
picSection.addEventListener('click', getFullScreen);

const picCancelButt = document.querySelector('#picture-cancel');
picCancelButt.addEventListener('click', closeFullScreen);
