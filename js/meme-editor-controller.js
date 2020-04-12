'use strict';

function renderStickers() {
    var strHTML = '';
    var stickers = getStickersList()
    stickers.map((sticker, idx) => {
        strHTML += `<img onclick="onStickerClicked(this , ${idx})" src="${sticker.url}">`
    });
    document.querySelector('.stickers-container').innerHTML = strHTML;
}
function onSaveSuccess() {
    document.querySelector('.show-saved-memes-btn').style.backgroundColor = '#09ff0050';
    document.querySelector('.show-saved-memes-btn').style.height = '45px';
    setTimeout(() => {
        document.querySelector('.show-saved-memes-btn').style.backgroundColor = '#eb50ffa4';
        document.querySelector('.show-saved-memes-btn').style.height = '30px';
    }, 1200);
}
function onTopTxtChange(txtValue) {
    changeTopTxt(txtValue);
}
function onAddLine() {
    addLine();
}
function onDeleteLine() {
    deleteLine();
}
function onSwitchLine() {
    switchLine();
    markLine();
    editorImgDrawer(gMeme.imgUrl);
}
function onTxtIncrease() {
    increaseTxt();
}
function onTxtDecrease() {
    decreaseTxt();
}
function onTxtUp() {
    txtUp();
}
function onTxtDown() {
    txtDown();
}
function onSaveMeme() {
    saveMeme();
}
function onAlignLeft() {
    alignLeft();
}
function onAlignRight() {
    alignRight();
}
function onAlignCenter() {
    alignCenter();
}
function onFillColorClick(color) {
    fillColorChange(color);
}
function onStrokeColorClick(color) {
    strokeColorChange(color);
}
function onFontSelect(font) {
    fontChange(font);
}
function onUploadMeme() {
    document.querySelector('.share-container').classList.add('flex');
}
function onImgInput(ev) {
    loadImageFromInput(ev)
}
function loadImageFromInput(ev) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        gMeme.imgUrl = img.src;
        editorImgDrawer(gMeme.imgUrl); //render canvas

    }
    reader.readAsDataURL(ev.target.files[0]);
}
function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}
function markTextInput() {
    document.querySelector('.memeText').value = gMeme.lines[gCurrLine].txt;
    document.querySelector('.memeText').classList.add('border-focus');
    setTimeout(function () { document.querySelector('.memeText').classList.remove('border-focus'); }, 220);
}
function onStickerClicked(elSticker , idx) {
    addSticker(elSticker.src , idx);
}