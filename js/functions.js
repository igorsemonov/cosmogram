
import{names, messages} from "./variables.js"
import{hashtagText, commentText, uploadFile} from "./main.js";


export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function getUrl(idx) {
    return `photos/${idx+1}.jpg`;
};

export function getAvatar() {
    return `img/avatar-${getRandomInt(1, 6)}.svg`;
};

export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

export function getComments() {
    return Array.from({length: getRandomInt(1, 17)}, (_,index) => ({
        id: ++index,
        avatar: getAvatar(),
        message: getRandomElement(messages),
        name: getRandomElement(names)
    }));
};

export function toggleClass() {
    const bigImgEl = document.querySelector('.big-picture');
    const body = document.querySelector('body');
    bigImgEl.classList.toggle('hidden');
    body.classList.toggle('modal-open');
};

export function toggleClassForm() {
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    document.body.classList.toggle('modal-open');
    uploadOverlay.classList.toggle('hidden');
    hashtagText.value = '';
    commentText.value = '';
    uploadFile.value = '';
};

export function generateElement(el) {
    const template = document.querySelector('#picture');
    let clonedTemplate = template.content.cloneNode(true);
    clonedTemplate.querySelector('.picture__img').src = el.url;
    clonedTemplate.querySelector('.picture__likes').textContent = el.likes;
    clonedTemplate.querySelector('.picture__comments').textContent = el.comments.length;
    clonedTemplate.querySelector('.picture__img').dataset.id = el.id;
    return clonedTemplate;
};

export function generateComment(el) {
    const template = document.querySelector('#social__comment')
    let clonedCommentsSection = template.content.cloneNode(true);
    clonedCommentsSection.querySelector('.social__picture').src = el.avatar;
    clonedCommentsSection.querySelector('.social__picture').alt = el.name;
    clonedCommentsSection.querySelector('.social__text').textContent = el.message;
    return clonedCommentsSection;
};