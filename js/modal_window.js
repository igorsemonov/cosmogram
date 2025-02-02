
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

            let displayLimit = 5;

            uploadMoreBttn.addEventListener('click', () => {
                displayLimit += 5;
                renderComments(el.comments.slice(0,displayLimit));
                showHideUploadMoreBttn(el.comments, displayLimit)
            });
            
            renderComments(el.comments.slice(0,displayLimit));
            showHideUploadMoreBttn(el.comments, displayLimit);
        };
    });
};

function renderComments(el) {
    const uploadCommentSection = document.querySelector('.social__comments');
    const commentsShown = document.querySelector('.comments-shown');
    uploadCommentSection.innerHTML = '';
    commentsShown.textContent = el.length;
    el.forEach(elem => {
        uploadCommentSection.appendChild(generateComment(elem));
    });
};

function showHideUploadMoreBttn(elem, counter) {
    const uploadMoreBttn = document.querySelector('.comments-loader');
    if(elem.length <= counter){
        uploadMoreBttn.classList.add('hidden');
    }else{
        uploadMoreBttn.classList.remove('hidden');
    }
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

const smallerBttn = document.querySelector('.scale__control--smaller');
const biggerBttn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');


let initValue = 100;
const step = 25
const maxValue = 100;
const minValue = 25;

export function setDefaultValue() {
    initValue = 100;
}

export function initScaleInput(value) {
    scaleInput.setAttribute('value', `${value}%`);
    imgPreview.style.transform = `scale(${value/100})`;
};

smallerBttn.addEventListener('click', () => {
    if(initValue > minValue){
        initValue -= step;
        initScaleInput(initValue);
    }
});
biggerBttn.addEventListener('click', () => {
    if(initValue < maxValue){
        initValue += step;
        initScaleInput(initValue);
    }
});

const radioBttnDefault = document.querySelector('#effect-none');
const effectsList = document.querySelector('.effects__list');
effectsList.addEventListener('change', useEffect);

export function useEffect(evt) {
    imgPreview.className = `effects__preview--${evt.target.value}`;
};

export function setDefaultEffect() {
    radioBttnDefault.checked = true;
    imgPreview.className = '';
};