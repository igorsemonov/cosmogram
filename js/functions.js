
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
    return Array.from({length: getRandomInt(1, 5)}, (_,index) => ({
        id: ++index,
        avatar: getAvatar(),
        message: getRandomElement(messages),
        name: getRandomElement(names)
    }));
};

export function toggleClass() {
    const bigImgEl = document.querySelector('.big-picture');
    const body = document.querySelector('body');
    const commentCount = document.querySelector('.social__comment-count');
    bigImgEl.classList.toggle('hidden');
    body.classList.toggle('modal-open');
    commentCount.classList.toggle('hidden');
};

export function toggleClassForm() {
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    document.body.classList.toggle('modal-open');
    uploadOverlay.classList.toggle('hidden');
    hashtagText.value = '';
    commentText.value = '';
    uploadFile.value = '';
}

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

export function validateHashtag() {
    const maxLength = 20;
    const maxHashTags = 5;
    let inputValue = hashtagText.value.trim().split(' ');
    const uniqueTags = new Set(inputValue);

    if(uniqueTags.size !== inputValue.length){
        hashtagText.setCustomValidity('tags are similar');
        return
    }

    for (let el of inputValue){
        if(!/^#[a-z0-9]+$/i.test(el)){
            hashtagText.setCustomValidity('incorrect tag');
            return
        }
        else if(inputValue.length > maxHashTags){
            hashtagText.setCustomValidity(`tags limit is ${maxHashTags}`);
            return
        }
        else if(el.length > maxLength){
            hashtagText.setCustomValidity(`max chars in tag is ${maxLength}`);
            return
        }
        else{
            hashtagText.setCustomValidity('');
        }
    }
};

export function validateComment() {
    const maxLength = 140;
    let commentValue = commentText.value.trim();
    if(commentValue.length > maxLength){
        commentText.setCustomValidity(`comment limit is ${maxLength} characters`);
        commentText.reportValidity();
    }
    else{
        commentText.setCustomValidity('');
    }
};