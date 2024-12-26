
const obj = () => ({
    id: makeIntUp25(),
    url: makeUrl(),
    likes: makeIntUp200(),
    description: "Some description",
    comments: makeComments()
});

function makeIntUp25() {
    return Math.floor(Math.random() * 25) + 1;
};

function makeUrl() {
    return `photos/${Math.floor(Math.random() * 25) + 1}.jpg`;
};

function makeIntUp200() {
    return Math.floor(Math.random() * 186) + 15;
};

function makeAvatar() {
    return `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`;
};

function makeName() {
    const names = ['John', 'Bill', 'Jane', 'Alice', 'Steve', 'Lara'];
    return names[Math.floor(Math.random() * names.length)];
};

function makeComments() {
    return Array.from({length: Math.floor(Math.random() * 4) + 1}, () => ({
        id: makeIntUp200(),
        avatar: makeAvatar(),
        message: 'Загалом все непогано. Але не всі.',
        name: makeName()
    }));
};

const photos = Array.from({length: 25}, obj);

console.log(photos);