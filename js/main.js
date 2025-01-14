
import {toggleClass, generateElement, generateComment} from "./functions.js";
import {photos} from "./variables.js";

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

function renderFullScreen(event) {
    const bigPicImg = document.querySelector('.big-picture__img img');
    const likes = document.querySelector('.likes-count');
    const comments = document.querySelector('.comments-count');
    const socialCaption = document.querySelector('.social__caption');
    photos.forEach((el) => {
        if(event.target.getAttribute('data-id') == el.id){
            bigPicImg.src = el.url;
            likes.textContent = el.likes;
            comments.textContent = el.comments.length;
            socialCaption.textContent = el.description;
            renderComments(el.comments);
        };
    });
};

function getFullScreen(event) {
    if(event.target.hasAttribute('data-id')){
        toggleClass();
        renderFullScreen(event);
    };
};

function closeFullScreen() {
    toggleClass();
};

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

// ======================   ВАЛИДАЦИЯ НА ПРОВЕРКУ (временно в main.js) ================================

const hashtagText = document.querySelector('.text__hashtags');
hashtagText.addEventListener('input', validateHashtag);

const commentText = document.querySelector('.text__description');
commentText.addEventListener('input', validateComment);

const uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', () => {
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    document.body.classList.toggle('modal-open');
    uploadOverlay.classList.toggle('hidden');
})

function validateHashtag() {
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

function validateComment() {
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