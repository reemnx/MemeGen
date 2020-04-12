'use strict';
var gCanvas;
var gCtx;
var gPosX = 0;
var gPosY = 0;
var gIsLinePressed = false;

function initCanvas() {
    gCanvas = document.querySelector('#meme-editor-canvas');
    gCtx = gCanvas.getContext('2d');
    gPosX = gCanvas.width / 2;
    gPosY = gCanvas.height / 2;
}

// Canvas Listeners

document.querySelector('#meme-editor-canvas').addEventListener('mousedown', e => {
    if (gCurrLine !== -1 || gCurrSticker !== -1) {
        gIsLinePressed = true;
        console.log(gIsLinePressed);
    }
});

document.querySelector('#meme-editor-canvas').addEventListener('mousemove', e => {
    if (!gIsLinePressed) return;

    if (gCurrLine !== -1) {
        gMeme.lines[gCurrLine].posX = e.offsetX
        gMeme.lines[gCurrLine].posY = e.offsetY + gMeme.lines[gCurrLine].lineHeight / 2;
        editorImgDrawer(gMeme.imgUrl);
    }
    else {
        gMeme.stickers[gCurrSticker].posX = e.offsetX - gMeme.stickers[gCurrSticker].width / 2;
        gMeme.stickers[gCurrSticker].posY = e.offsetY - gMeme.stickers[gCurrSticker].height / 2;
        editorImgDrawer(gMeme.imgUrl);
    }

});
document.querySelector('#meme-editor-canvas').addEventListener('mouseup', e => {
    gIsLinePressed = false;
});

//   Render canvas

function editorImgDrawer(imgUrl, x = 0, y = 0) {
    // console.log('renderIsOn');

    var img = new Image()
    img.src = `${imgUrl}`;
    img.onload = () => {
        gCtx.drawImage(img, x, y, gCanvas.width, gCanvas.height);
        var lines = getMeme();
        var stickers = getStickers();
        lines.map((el, idx) => {
            drawText(el.txt, el.size, el.align, el.posX, el.posY, el.fillColor, el.strokeColor, el.font, idx);
        });

        if (stickers.length) {
            stickers.map((el, idx) => {
                var img = new Image()
                img.src = `${el.url}`;
                img.onload = () => {
                    gCtx.drawImage(img, el.posX, el.posY, el.width, el.height);
                }
            });
        }
        markLine();
    }
}

function drawText(text, size, align, x, y, fillColor, strokeColor, font, idx) {
    gCtx.lineWidth = '1.6'
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    var width = gCtx.measureText(text).width
    gMeme.lines[idx].lineWidth = width;
    var height = gCtx.measureText(text).actualBoundingBoxAscent
    gMeme.lines[idx].lineHeight = height;
}

function onCanvasClicked(ev) {
    var lines = getMeme();
    var stickers = getStickers();
    var offsetX = ev.offsetX
    var offsetY = ev.offsetY

    var lineIdx = lines.findIndex(line => {
        if (line.align === 'center') {
            return offsetX > line.posX - (line.lineWidth / 2)
                && offsetX < line.posX + (line.lineWidth / 2)
                && offsetY < line.posY
                && offsetY > line.posY - line.lineHeight
        }

    })
    var stickerIdx = stickers.findIndex(sticker => {
        return offsetX > sticker.posX
            && offsetX < sticker.posX + sticker.width
            && offsetY > sticker.posY
            && offsetY < sticker.posY + sticker.height
    })
    gCurrSticker = stickerIdx;
    gCurrLine = lineIdx;
    markLine();
    editorImgDrawer(gMeme.imgUrl);
}
function markLine() {
    if (gCurrLine === -1 && gCurrSticker === -1) return
    gCtx.beginPath();
    if (gCurrLine !== -1) {
        gCtx.rect(gMeme.lines[gCurrLine].posX - (gMeme.lines[gCurrLine].lineWidth / 2) - 10, gMeme.lines[gCurrLine].posY - gMeme.lines[gCurrLine].lineHeight - 10, gMeme.lines[gCurrLine].lineWidth + 20, gMeme.lines[gCurrLine].lineHeight + 20)
        gCtx.strokeStyle = '#e91e63';
        gCtx.fillStyle = '#70707030';
        gCtx.fill();
    }
    else {
        gCtx.rect(gMeme.stickers[gCurrSticker].posX - 10, gMeme.stickers[gCurrSticker].posY - 10, gMeme.stickers[gCurrSticker].width + 20, gMeme.stickers[gCurrSticker].height + 20)
        gCtx.strokeStyle = '#0000ff';
    }
    gCtx.stroke();
}
function clearLineBorder() {
    gCurrLine = -1;
    gCurrSticker = -1;
    editorImgDrawer(gMeme.imgUrl)
}
function resizeCanvas() {
    gCanvas.width = 390;
    gCanvas.height = 390;
    gPosX = gCanvas.width / 2;
    gPosY = gCanvas.height / 2;
}
function onInlineEdit(){
    inlineEdit();
}
function onInlineChangeText(el, ev){
    inLineChangedText(el , ev);
}
function onInlineChangeFinish(){
    inLineChangeFinish();
}