
import {toggleClass, generateComment} from "./functions.js";
import {photos} from "./variables.js";

function renderFullScreen(event) {
    const bigPicImg = document.querySelector('.big-picture__img img');
    const likes = document.querySelector('.likes-count');
    const comments = document.querySelector('.comments-count');
    const socialCaption = document.querySelector('.social__caption');
    const uploadMoreBttn = document.querySelector('.comments-loader');

    photos.forEach((el) => {

        if(event.target.getAttribute('data-id') == el.id){
            bigPicImg.src = el.url;
            likes.textContent = el.likes;
            comments.textContent = el.comments.length;
            socialCaption.textContent = el.description;
            uploadMoreBttn.dataset.id = el.id;

            renderComments(el.comments);

            displayCounter = 5;
        };
    });
};

function renderComments(el, commentsLimit = 5) {
    const uploadCommentSection = document.querySelector('.social__comments');
    const commentsShown = document.querySelector('.comments-shown');
    const uploadMoreBttn = document.querySelector('.comments-loader');
    uploadCommentSection.innerHTML = '';
    commentsShown.textContent = commentsLimit;

    if(uploadMoreBttn.classList.contains('hidden')){
        uploadMoreBttn.classList.remove('hidden');
    }
    if(el.length < commentsLimit){
        commentsShown.textContent = el.length;
        uploadMoreBttn.classList.add('hidden');
    }
    el.slice(0, commentsLimit).forEach(elem => {
        uploadCommentSection.appendChild(generateComment(elem));
    });
};

export function getFullScreen(event) {
    if(event.target.hasAttribute('data-id')){
        toggleClass();
        renderFullScreen(event);
    };
};

export function closeFullScreen() {
    toggleClass();
};

let displayCounter = 5;

export function showMoreComments(evt) {
    photos.forEach((e) => {
        if(evt.target.getAttribute('data-id') == e.id){
            displayCounter += 5;
            renderComments(e.comments, displayCounter);
        }
    })
};