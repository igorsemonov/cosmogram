
import {hashtagText, commentText} from "./main.js";

export function validateHashtag(evt) {
    const maxLength = 20;
    const maxHashTags = 5;
    let inputValue = evt.target.value.trim().toLowerCase().split(' ');
    const uniqueTags = new Set(inputValue);

    if(!evt.target.value){
        hashtagText.setCustomValidity('');
        return
    }
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