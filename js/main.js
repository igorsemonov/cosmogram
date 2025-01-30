
import {generateElement, toggleClassForm} from "./functions.js";
import {validateHashtag, validateComment} from "./validation.js";
import {getFullScreen, closeFullScreen, initScaleInput, setDefaultValue, setDefaultEffect} from "./modal_window.js";
import {photos} from "./variables.js";

const picSection = document.querySelector('.pictures');
const picCancelButt = document.querySelector('#picture-cancel');
export const hashtagText = document.querySelector('.text__hashtags');
export const commentText = document.querySelector('.text__description');
export const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');



function renderAllPhotos(arr) {
    const uploadSection = document.querySelector('.pictures');
    arr.forEach(element => { 
        uploadSection.appendChild(generateElement(element));
    });
};

renderAllPhotos(photos);


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



picSection.addEventListener('click', getFullScreen);

picCancelButt.addEventListener('click', closeFullScreen);

hashtagText.addEventListener('input', validateHashtag);

commentText.addEventListener('input', validateComment);

uploadFile.addEventListener('change', () => {
    const defaultScale = 100;
    initScaleInput(defaultScale);
    setDefaultValue();
    setDefaultEffect();
    toggleClassForm();
});

uploadCancel.addEventListener('click', toggleClassForm);

const slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [50, 50],
    behaviour: 'unconstrained',
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});