
import{hashtagText, commentText, uploadFile} from "./main.js";

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

const errorDiv = document.createElement('div');
document.body.append(errorDiv);
errorDiv.classList.add('error-window');
errorDiv.style.position = 'fixed';
errorDiv.style.top = '50%';
errorDiv.style.left = '50%';
errorDiv.style.transform = 'translate(-50%, -50%)';
errorDiv.style.border = 'solid 2px red';
errorDiv.style.background = 'black';
errorDiv.style.padding = '15px';
errorDiv.style.fontSize = '27px';
errorDiv.style.opacity = 0;
errorDiv.style.transition = 'opacity 0.5s ease-in-out';

export function showError(msg) {
    errorDiv.textContent = msg;
    setTimeout(() => {
        errorDiv.style.opacity = 1;
    }, 10);
    setTimeout(() => {
        errorDiv.style.opacity = 0;
    }, 4000);
}