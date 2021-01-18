
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img,
// и указываться в href ссылки (это необходимо для доступности).
// /* <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li> */



import img_array  from './gallery-items.js';

const refs = {
   gallery:document.querySelector('ul.js-gallery'),
   galleryImage:document.querySelector('gallery__image'),
   modal: document.querySelector('.js-lightbox'),
   btn:document.querySelector('lightbox__button')
}
refs.gallery.addEventListener('click', onGalleryClick );

 const newItems = img_array.map(currentItem => {

    const galleryItem = document.createElement("li");
    galleryItem.classList.add('gallery__item');
    
    const galleryLink = document.createElement("a");
    galleryLink.classList.add('gallery__link');
    galleryLink.href = currentItem.original;
    galleryItem.appendChild(galleryLink);

    const galleryImg = document.createElement('img');
    galleryImg.classList.add('gallery__image');
    galleryImg.src =  currentItem.preview;
    galleryImg.setAttribute('data-source', currentItem.original);
    galleryImg.alt = currentItem.description;
    galleryLink.appendChild(galleryImg);

    return galleryItem;
 });

 refs.gallery.append(...newItems);  


function onGalleryClick(event){
   event.preventDefault();

   if(event.target.nodeName !== 'IMG') {
      return;
   }
  
   openModal();
   refs.modal.addEventListener("click", onModal);
   window.addEventListener("keydown", onModal);
   
}

function openModal() {
refs.modal.classList.add("is-open");
refs.modal.querySelector("img").setAttribute("src", event.target.dataset.source);
}



function onModal() {
   closeModal();
 }

 function closeModal() {
    if(
      event.target.dataset.action !== "close-lightbox" &&
      !event.target.classList.contains("lightbox__overlay") &&
      event.code !== "Escape"
    ) {
       return;
       }
    refs.modal.classList.remove("is-open");
    refs.modal.removeEventListener("click", onModal);
    window.removeEventListener("keydown", onModal);
    refs.modal.querySelector("img").removeAttribute("src");
   }
