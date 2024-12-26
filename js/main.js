
const obj = () => ({
    id: getRandomInt(1, 25),
    url: getUrl(),
    likes: getRandomInt(15, 200),
    description: getDescription(),
    comments: getComments()
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getUrl() {
    return `photos/${getRandomInt(1, 6)}.jpg`;
};

function getAvatar() {
    return `img/avatar-${getRandomInt(1, 6)}.svg`;
};

function getName() {
    const names = ['John', 'Bill', 'Jane', 'Alice', 'Steve', 'Lara'];
    return names[Math.floor(Math.random() * names.length)];
};

function getDescription() {
    const descriptions = ["Sun", "Beach", "Mountain", "River", "City", "Club", "Night", "Moon"];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
};

function getMessage() {
    const messages = ['Все відмінно!',
        'Загалом все непогано. Але не всі.',
        'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
        'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
        'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
        'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
        ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function getComments() {
    return Array.from({length: getRandomInt(1, 5)}, () => ({
        id: getRandomInt(1, 200),
        avatar: getAvatar(),
        message: getMessage(),
        name: getName()
    }));
};

const photos = Array.from({length: 25}, obj);

console.log(photos);