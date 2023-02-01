let imageSize = '';
let img = '';
const imageDisplay = document.querySelector('#imageDisplay')
const errorText = document.createElement('h1');
document.querySelector('button').addEventListener('click', getUserInput);


function getUserInput(event) {
    event.preventDefault();
    const searchText = document.querySelector('.search').value;
    const imageAmount = document.querySelector('.amount').value;
    imageSize = document.querySelector('.size').value;
    if (searchText === '') {
        imageDisplay.innerHTML = '';
        errorText.innerText = 'Please enter search query';
        imageDisplay.append(errorText);

    } else {
        getSearch(searchText, imageAmount);
    }
}

function getSearch(searchText, imgAmount) {  
    const urlRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dc40569eb859dcd965787523c7360c5a&text=${searchText}&per_page=${imgAmount}&format=json&nojsoncallback=1`;

    fetch(urlRequest)
         .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            throw 'Something went wrong.';
        }
    })

    .then(showImages)
    
    .catch(error => {
        console.log(error)
        errorText.innerText = 'Something went wrong.';
        imageDisplay.append(errorText);
    });
}
    
function showImages(imgInfo) {
 
    imageDisplay.innerHTML = '';

   
    if (imgInfo.photos.photo.length === 0) {
        errorText.innerText = 'No images were found.';
        imageDisplay.append(errorText);

    } else {
  
        imgInfo.photos.photo.forEach(imgElements => {
            const server = imgElements.server;
            const id = imgElements.id;
            const secret = imgElements.secret;
            
            const imgUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_${imageSize}.jpg`;

            img = document.createElement('img');
            img.src = imgUrl;
            imageDisplay.append(img);
        });

    }

}