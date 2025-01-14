
import { getUrl, getRandomInt, getRandomElement, getComments} from "./functions.js";

export const names = ['John', 'Bill', 'Jane', 'Alice', 'Steve', 'Lara'];

export const descriptions = ["Sun", "Beach", "Mountain", "River", "City", "Club", "Night", "Moon"];

export const messages = ['Все відмінно!',
    'Загалом все непогано. Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
    ];

export const obj = (idx) => ({
    id: idx+1,
    url: getUrl(idx),
    likes: getRandomInt(15, 200),
    description: getRandomElement(descriptions),
    comments: getComments()
});

export const photos = Array.from({length: 25}, (_,idx)=>obj(idx));