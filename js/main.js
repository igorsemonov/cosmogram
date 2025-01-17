
import {toggleClass,
        toggleClassForm,
        generateElement,
        generateComment,
        validateComment,
        validateHashtag} from "./functions.js";

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
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    const bigImgEl = document.querySelector('.big-picture');
    if(e.key === 'Escape' && e.target.classList.contains('text__hashtags') || e.target.classList.contains('text__description')){
        return;
    }
    if(e.key === 'Escape' && !bigImgEl.classList.contains('hidden')){
        closeFullScreen();
    }
    if(e.key === 'Escape' && !uploadOverlay.classList.contains('hidden')){
        toggleClassForm();
    }
});

const picSection = document.querySelector('.pictures');
picSection.addEventListener('click', getFullScreen);

const picCancelButt = document.querySelector('#picture-cancel');
picCancelButt.addEventListener('click', closeFullScreen);

export const hashtagText = document.querySelector('.text__hashtags');
hashtagText.addEventListener('input', validateHashtag);

export const commentText = document.querySelector('.text__description');
commentText.addEventListener('input', validateComment);

export const uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', toggleClassForm);

const uploadCancel = document.querySelector('#upload-cancel');
uploadCancel.addEventListener('click', toggleClassForm);