
import {generateElement, toggleClassForm, showError, showNotification, hideNotification} from "./functions.js";
import {validateHashtag, validateComment} from "./validation.js";
import {getFullScreen, closeFullScreen, initScaleInput, setDefaultValue, downloadPreviewImg} from "./modal_window.js";

const picSection = document.querySelector('.pictures');
const picCancelButt = document.querySelector('#picture-cancel');
export const hashtagText = document.querySelector('.text__hashtags');
export const commentText = document.querySelector('.text__description');
export const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('#upload-select-image');
export const imgPreview = document.querySelector('.img-upload__preview img');
const errorBttn = document.querySelector('.error__button');
const successBttn = document.querySelector('.success__button');
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

imgFilters.classList.add('img-filters--inactive');

export let photos = []; 

    fetch('http://localhost:3000/photos')
    .then(response => response.json())
    .then(data => {
        photos = data;
        renderAllPhotos(photos);
        imgFilters.classList.remove('img-filters--inactive')
    })
    .catch(() => {
        showError('Failed to download files...');
    });

function renderAllPhotos(arr) {
    const uploadSection = document.querySelector('.pictures');
    uploadSection.querySelectorAll('.picture').forEach(elem => elem.remove());
    arr.forEach(element => { 
        uploadSection.appendChild(generateElement(element));
    });
};

function renderFilteredPhotos(filter) {
if (filter.id === 'filter-default'){
    renderAllPhotos(photos);
}
else if(filter.id === 'filter-random'){
    const photosLimit = 10;
    const uniquePhotos = new Set();
    while(uniquePhotos.size < photosLimit){
        uniquePhotos.add(photos[Math.floor(Math.random() * photos.length)]);
    };
    renderAllPhotos(Array.from(uniquePhotos));
}
else if(filter.id === 'filter-discussed'){
    const sortedPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
    renderAllPhotos(sortedPhotos);
}
};

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }
};

imgFiltersForm.addEventListener('click', debounce((e) => renderFilteredPhotos(e.target), 500));

document.addEventListener('keydown', e => {
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    const bigImgEl = document.querySelector('.big-picture');
    const successEl = document.querySelector('.success');
    const errorEl = document.querySelector('.error');
    if(e.key === 'Escape' && e.target.classList.contains('text__hashtags') || e.target.classList.contains('text__description')){
        return;
    }
    if(e.key === 'Escape' && !bigImgEl.classList.contains('hidden')){
        closeFullScreen();
    }
    if(e.key === 'Escape' && !uploadOverlay.classList.contains('hidden')){
        toggleClassForm();
    }
    if(e.key === 'Escape' && successEl.classList.contains('visible')){
        hideNotification('success');
    }
    if(e.key === 'Escape' && errorEl.classList.contains('visible')){
        hideNotification('error');
    }
});

document.addEventListener('click', e => {
    if(!e.target.closest('.success__inner')) hideNotification('success');
    if(!e.target.closest('.error__inner')) hideNotification('error');
});

picSection.addEventListener('click', getFullScreen);

picCancelButt.addEventListener('click', closeFullScreen);

hashtagText.addEventListener('input', validateHashtag);

commentText.addEventListener('input', validateComment);

uploadFile.addEventListener('change', (evt) => {
    const defaultScale = 100;
    downloadPreviewImg(evt);
    initScaleInput(defaultScale);
    setDefaultValue();
    setDefaultEffect();
    toggleClassForm();
});
 
uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPhoto = {
        url: imgPreview.src,
        likes: null,
        description: formData.get('description'),
        comments: []
    };

    fetch('http://localhost:3000/photos',{
        method: 'POST',
        body: JSON.stringify(newPhoto)
    })
    .then(response => response.json())
    .then(data => {
        photos.push(data);
        uploadFile.value = '';
        showNotification('success');
    })
    .catch(() => {
        uploadFile.value = '';
        showNotification('error');
    });

    toggleClassForm();
});

successBttn.addEventListener('click', () => hideNotification('success'));
errorBttn.addEventListener('click', () => hideNotification('error')); 

uploadCancel.addEventListener('click', toggleClassForm);

const slider = document.getElementById('slider');
const effectLevel = document.querySelector('.effect-level__value');
const radioBttnDefault = document.querySelector('#effect-none');
const effectsList = document.querySelector('.effects__list');
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

let selectedEffect;

slider.noUiSlider.on('update', function(values){
    effectLevel.setAttribute('value', `${values[1]}`);
    useScale(values[1]);
});

effectsList.addEventListener('change', useEffect);

function setFilterValue(value) {
    imgPreview.style.filter = value;
};

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