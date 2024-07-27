const API_KEY = 'uQC8kdLMWGuUHpsD7CIORu97gO2XTFPGp-DYuaE6kng';
const endpoint = 'https://api.unsplash.com/photos';

async function fetchPhotos(page = 1, perPage = 100) {
    const response = await fetch(`${endpoint}?client_id=${API_KEY}&page=${page}&per_page=${perPage}`);
    const data = await response.json();
    return data;
}

async function displayPhotos() {
    const totalPhotos = 100;
    const perPage = 30;
    let currentPage = 1;
    let photos = [];

    while (photos.length < totalPhotos) {
        const data = await fetchPhotos(currentPage, perPage);
        photos = photos.concat(data);
        currentPage++;
        if (data.length < perPage) break;
    }

    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = '';

    photos.slice(0, totalPhotos).forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = `${photo.urls.raw}&w=1920&h=1080&fit=crop&q=80`;
        imgElement.alt = photo.alt_description;
        imgElement.loading = 'lazy';

        const photoLink = document.createElement('a');
        photoLink.href = photo.links.html;
        photoLink.target = '_blank';
        photoLink.classList.add('gallery-item');
        photoLink.appendChild(imgElement);

        galleryElement.appendChild(photoLink);
    });
}

window.onload = displayPhotos;