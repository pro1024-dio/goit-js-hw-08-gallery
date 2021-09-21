const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const ISOPEN_CLASS_NAME = 'is-open';
const gallery = document.querySelector("ul.gallery.js-gallery");
const lightBox = document.querySelector("div.lightbox");
const lightBoxImg = lightBox.querySelector("img.lightbox__image");
// let currentImageNode;

//генеруємо шаблонний рядок для рендеру елементів галереї зображень
const createTamplate = () => galleryItems.map(elm => `<li class="gallery__item"><a class="gallery__link" href="${elm.original}"><img class="gallery__image" src="${elm.preview}" data-source="${elm.original}" alt="${elm.description}" /></a></li>`).join("");

function closeLightbox() {

  lightBox.classList.remove(ISOPEN_CLASS_NAME);
  lightBoxImg.src = "";
  lightBoxImg.alt = "";
  lightBox.removeEventListener('click', handleLightboxClick);
  document.removeEventListener('keyup', handleDocumentKeyup);
  // currentImageNode = null;
};

function showBigImage(index, offset = 0) {
  let calcIndex = index + offset;

  if (calcIndex < 0) calcIndex = galleryItems.length - 1;
  if (calcIndex === galleryItems.length) calcIndex = 0;
  lightBoxImg.src = galleryItems[calcIndex].original;
  lightBoxImg.alt = galleryItems[calcIndex].description;
};

const handleLightboxClick = (event) => {
  const elm = event.target;
  
  
  if (elm.nodeName === "BUTTON") {
    switch (elm.dataset.action) {
      case "close-lightbox":
        closeLightbox();
        break;
      case "left-lightbox":
        // currentImageNode = (currentImageNode.previousElementSibling !== null) ? currentImageNode.previousElementSibling : gallery.lastElementChild;
        // showBigImage(currentImageNode.querySelector("img.gallery__image"), lightBox.querySelector("img.lightbox__image"));
        showBigImage(galleryItems.findIndex(e => e.original === lightBoxImg.src), -1);
        break;
      case "right-lightbox":
        // currentImageNode = (currentImageNode.nextElementSibling !== null) ? currentImageNode.nextElementSibling : gallery.firstElementChild;
        // showBigImage(currentImageNode.querySelector("img.gallery__image"), lightbox.querySelector("img.lightbox__image"));
        showBigImage(galleryItems.findIndex(e => e.original === lightBoxImg.src), 1);
        break;
    };
  }
  else closeLightbox();
};

const handleDocumentKeyup = (event) => {
  
  if (event.code === 'Escape') closeLightbox();
    
};

const handleGalleryClick = (event) => {
  const elm = event.target;

  event.preventDefault();

  if (elm.nodeName === "IMG") {
  
    //відображаємо модальне вікно та ініціалізуємо його елементи
    lightBox.classList.add(ISOPEN_CLASS_NAME);
    lightBox.addEventListener('click', handleLightboxClick);
    document.addEventListener('keyup', handleDocumentKeyup);

    //відображаємо поточне зображення
    showBigImage(galleryItems.findIndex(e => e.original === elm.dataset.source));

    // //зберігаємо поточне відкрите зображення
    // currentImageNode = elm.parentElement.parentElement;
    
  };
};

//виконуємо рендер елементів галереї
gallery.insertAdjacentHTML('afterbegin', createTamplate());

//зпускаємо прослуховування подій кліку по зображенню
gallery.addEventListener('click', handleGalleryClick);


