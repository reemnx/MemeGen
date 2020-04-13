'use strict';

var gFilter = 'All';
var gEditor = document.querySelector('.meme-editor-container');
var gIsMobile = false;
var gIsModalShown = false;

function onInit() {
    gEditor.style.display = 'none';
    renderMemeGallery();
    initCanvas();
    initIntroModal();
}
function initIntroModal() {
    if(gIsModalShown) return
    setTimeout(function () {
        document.querySelector('.intro-modal').classList.add('flex');
    }, 1500);
}
function onCloseIntroModal() {
    document.querySelector('.intro-modal').style.display = 'none';
    document.querySelector('.meme-otd-left-card').style.display = 'none';
    gIsModalShown = true;
}

// Gallery fn's

function renderMemeGallery() {
    if (gFilter === 'All') {
        memes = getMemesImgs();
    }
    else {
        var memes = gImgs.filter(img => img.keyWords.includes(gFilter));
    }
    var gallery = document.querySelector('.meme-images');
    var strHTML = '';
    memes.map((meme, idx) => {
        strHTML += `<img data-url="${meme.url}" src="img/${meme.id}.jpg" onclick="onImgClicked(this)">`
    })
    gallery.innerHTML = strHTML;
}
function onImgClicked(elImg) {
    checkScreenSize();
    setMeme(elImg);
    setTxtSize();
    document.querySelector('main').style.height = '100vh';
    var gallery = document.querySelector('.meme-gallery-container');
    document.querySelector('.gallery-bread').classList.remove('focus-breadcrumb');
    document.querySelector('.editor-bread').classList.add('focus-breadcrumb');
    gallery.style.display = 'none';
    gEditor.style.display = 'flex';
    document.querySelector('.saved-memes').style.display = 'none';
    renderStickers();
    gCurrLine = 0;
}
function onbreadGalleryClick() {
    gEditor.style.display = 'none';
    document.querySelector('main').style.height = 'fit-content';
    document.querySelector('.meme-gallery-container').style.display = 'block';
    document.querySelector('.saved-memes').style.display = 'none';
    document.querySelector('.gallery-bread').classList.add('focus-breadcrumb');
    document.querySelector('.editor-bread').classList.remove('focus-breadcrumb');
    document.querySelector('.saved-bread').classList.remove('focus-breadcrumb');
}
function onbreadSavedClick() {
    document.querySelector('.saved-bread').classList.add('focus-breadcrumb');
    document.querySelector('.editor-bread').classList.remove('focus-breadcrumb');
    document.querySelector('.gallery-bread').classList.remove('focus-breadcrumb');
    var gallery = document.querySelector('.meme-gallery-container');
    gallery.style.display = 'none';
    gEditor.style.display = 'none';
    document.querySelector('.saved-memes').style.display = 'flex';
    document.querySelector('main').style.height = '100vh';
    renderSavedMemes();
}
function renderSavedMemes() {
    var savedMemes = getSavedMemes();
    var emptyHTML = ` 
    <div class="meme-card flex column space-between align-center">
    <img src="img/7.jpg">
    <h2 > There is no saved memes </h2>
  </div>
  `
    var strHTML = '';
    var elSavedMemesContainer = document.querySelector('.saved-memes');
    savedMemes.map((meme, idx) => {
        strHTML += `
        <div class="meme-card flex column space-between align-center">
          <img src="${meme.url}">
          <button onClick="onSavedMemeDelete(${idx})"> Delete Meme </button>
          <button> <a href="#" onclick="downloadImg(this)" download="my-img.jpg">Download Meme</a> </button>
        </div>
        `
    });
    if (savedMemes.length <= 0) {
        elSavedMemesContainer.innerHTML = emptyHTML;
    }
    else {
        elSavedMemesContainer.innerHTML = strHTML;
    }
}
function onSavedMemeDelete(idx) {
    onSavedMemeDelete(idx);
}
function onFilterChange(filter) {
    gFilter = filter;
    renderMemeGallery();
}
function checkScreenSize() {
    var w = window.outerWidth;
    if (w < 660) {
        gIsMobile = true;
        resizeCanvas();
    }
}