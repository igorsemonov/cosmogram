
import {generateElement, toggleClassForm} from "./functions.js";
import {validateHashtag, validateComment} from "./validation.js";
import {getFullScreen, closeFullScreen, initScaleInput, setDefaultValue} from "./modal_window.js";
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

// ====================================== SLIDER ================================================

const slider = document.getElementById('slider');
const effectLevel = document.querySelector('.effect-level__value');
const radioBttnDefault = document.querySelector('#effect-none');
const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.img-upload__preview img');
const imgUploadSlider = document.querySelector('.img-upload__effect-level');

noUiSlider.create(slider, {
    start: [50, 50],
    behaviour: 'unconstrained',
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});

slider.noUiSlider.on('update', function(values){
    effectLevel.setAttribute('value', `${values[1]}`);
    effectLevel.dispatchEvent(new Event('input'));
});

let selectedEffect;

effectsList.addEventListener('change', useEffect);

effectLevel.addEventListener('input', function() {
    useScale(this.value)
});

function setFilterValue(value) {
    imgPreview.style.filter = value;
}

function useScale(value) {
    switch(selectedEffect) {
        case 'chrome':
            setFilterValue(`grayscale(${(value/100).toFixed(1)})`);
            break;
        case 'sepia':
            setFilterValue(`sepia(${(value/100).toFixed(1)})`);
            break;
        case 'marvin':
            setFilterValue(`invert(${Math.trunc(value)}%)`);
            break;
        case 'phobos':
            setFilterValue(`blur(${(value/100*3).toFixed(1)}px)`);
            break;
        case 'heat':
            setFilterValue(`brightness(${(1+(value/100)*2).toFixed(1)})`);
            break;
        default:
            setFilterValue('none');
    };
};

function setDefaultAttr() {
    imgPreview.className = 'effects__preview--none';
    imgUploadSlider.style.display = 'none';
    imgPreview.style.filter = 'none';
};

function useEffect(evt) {
    if(evt.target.value === 'none'){
        setDefaultAttr();
        return;
    };
    imgUploadSlider.style.display = 'block';
    selectedEffect = evt.target.value;
    imgPreview.className = `effects__preview--${evt.target.value}`;
    slider.noUiSlider.set([0, 100]);
};

function setDefaultEffect() {
    radioBttnDefault.checked = true;
    setDefaultAttr();
};