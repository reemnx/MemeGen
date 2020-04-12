'usr strict'

var canvasTouchHandler = new Hammer(document.querySelector('#meme-editor-canvas'));
var editorTouchHandler = new Hammer(document.querySelector('.editor-wraper'));
var headerTouchHandler = new Hammer(document.querySelector('.header-container'));

canvasTouchHandler.on('panstart', function (e) {
    e.preventDefault();
    if (gCurrLine !== -1 || gCurrSticker !== -1) {
        gIsLinePressed = true;
        document.querySelector('body').style.touchAction = 'none' ;
    }
});
canvasTouchHandler.on('pan' , function (e) {
    e.preventDefault();
    document.querySelector('body').style.touchAction = 'none' ;
    
    if (!gIsLinePressed) return;

    if (gCurrLine !== -1) {
        gMeme.lines[gCurrLine].posX = e.changedPointers[0].offsetX
        gMeme.lines[gCurrLine].posY = e.changedPointers[0].offsetY + gMeme.lines[gCurrLine].lineHeight / 2;
        editorImgDrawer(gMeme.imgUrl);
    }
    else {
        gMeme.stickers[gCurrSticker].posX = e.changedPointers[0].offsetX - gMeme.stickers[gCurrSticker].width / 2;
        gMeme.stickers[gCurrSticker].posY = e.changedPointers[0].offsetY - gMeme.stickers[gCurrSticker].height / 2;
        editorImgDrawer(gMeme.imgUrl);
    }
});
canvasTouchHandler.on('panend', function (e) {
    e.preventDefault();
    gIsLinePressed = false;
});
editorTouchHandler.on('pan press tap swipe', function (e) {
    document.querySelector('body').style.touchAction = 'manipulation' ;
});
headerTouchHandler.on('pan press tap swipe', function (e) {
    document.querySelector('body').style.touchAction = 'manipulation' ;
});