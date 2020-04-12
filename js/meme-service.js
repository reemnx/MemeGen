'use strict';
const KEY = 'savedMemes';
var gMeme = {};
var gId = 100;
var gCurrLine = 0;
var gCurrSticker = 0;
var gSavedMemes = loadSavedMemes();
var gCurrInputVal = '' ;
var gCurrLineChange = 0;

var gImgs = [
    { id: 1, url: 'img/1.jpg', keyWords: ['Politics'] },
    { id: 2, url: 'img/2.jpg', keyWords: ['Puppy', 'Animals'] },
    { id: 3, url: 'img/3.jpg', keyWords: ['Puppy', 'Baby', 'Animals'] },
    { id: 4, url: 'img/4.jpg', keyWords: ['Animals'] },
    { id: 5, url: 'img/5.jpg', keyWords: ['Baby'] },
    { id: 6, url: 'img/6.jpg', keyWords: ['Funny'] },
    { id: 7, url: 'img/7.jpg', keyWords: ['Baby'] },
    { id: 8, url: 'img/8.jpg', keyWords: ['Funny'] },
    { id: 9, url: 'img/9.jpg', keyWords: ['Baby'] },
    { id: 10, url: 'img/10.jpg', keyWords: ['Politics'] },
    { id: 11, url: 'img/11.jpg', keyWords: ['Funny'] },
    { id: 12, url: 'img/12.jpg', keyWords: ['Funny'] },
    { id: 13, url: 'img/13.jpg', keyWords: ['Funny'] },
    { id: 14, url: 'img/14.jpg', keyWords: ['Funny'] },
    { id: 15, url: 'img/15.jpg', keyWords: ['Funny'] },
    { id: 16, url: 'img/16.jpg', keyWords: ['Funny'] },
    { id: 17, url: 'img/17.jpg', keyWords: ['Politics'] },
    { id: 18, url: 'img/18.jpg', keyWords: ['Funny'] },
]

var gStickers = [
    { url: 'img/sticker1.png', width: 50, height: 50 },
    { url: 'img/sticker2.png', width: 35, height: 60 },
    { url: 'img/sticker3.png', width: 40, height: 50 },
    { url: 'img/sticker4.png', width: 50, height: 35 },
    { url: 'img/sticker5.png', width: 50, height: 35 }
]

function setMeme(elImg, txtValue = 'Enter Text Here') {
    gMeme = {
        imgUrl: elImg.dataset.url,
        selectedLineIdx: 0,
        lines: [
            {
                txt: txtValue,
                size: 50,
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                posX: gPosX,
                posY: 60,
                font: 'Impact',
                lineWidth: 0,
                lineHeight: 0,
                id: gId++
            },
            {
                txt: txtValue,
                size: 50,
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                posX: gPosX,
                posY: gCanvas.height - 15,
                font: 'Impact',
                lineWidth: 0,
                lineHeight: 0,
                id: gId++
            }
        ],
        stickers: []
    }
    editorImgDrawer(gMeme.imgUrl);
}
function addSticker(url, idx) {
    var sticker = {
        url: url,
        posX: 10,
        posY: 10,
        width: gStickers[idx].width,
        height: gStickers[idx].height
    }
    gMeme.stickers.push(sticker);
    editorImgDrawer(gMeme.imgUrl);
}
function addLine() {
    var txtSize = 50;
    if (gIsMobile) txtSize = 40;
    gMeme.lines.push({
        txt: 'This is new line',
        size: txtSize,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        posX: gPosX,
        posY: 200,
        font: 'Impact',
        id: gId++
    })
    editorImgDrawer(gMeme.imgUrl);
    document.querySelector('.memeText').style.display = 'block';
}
function filterMemes(filter) {
    if (filter === 'All') {
        return gImgs;
    }
    else {
        var filteredMemes = gImgs.filter(img => img.keyWords.includes(filter));
        return filteredMemes;
    }
}

function alignLeft() {
    gMeme.lines[gCurrLine].align = 'left';
    gMeme.lines[gCurrLine].posX = 5;
    editorImgDrawer(gMeme.imgUrl);
}
function alignRight() {
    gMeme.lines[gCurrLine].align = 'right';
    gMeme.lines[gCurrLine].posX = gCanvas.width - 5;
    editorImgDrawer(gMeme.imgUrl);
}
function alignCenter() {
    gMeme.lines[gCurrLine].align = 'center';
    gMeme.lines[gCurrLine].posX = gPosX;
    editorImgDrawer(gMeme.imgUrl);
}
function deleteLine() {
    if (gCurrSticker !== -1) {
        gMeme.stickers.splice(gCurrSticker, 1);
        editorImgDrawer(gMeme.imgUrl);
    }
    else {
        gMeme.lines.splice(gCurrLine, 1);
        editorImgDrawer(gMeme.imgUrl);
        if (!gMeme.lines.length) {
            document.querySelector('.memeText').style.display = 'none';
        }
    }
}
function changeTopTxt(txtValue) {
    gMeme.lines[gCurrLine].txt = txtValue;
    editorImgDrawer(gMeme.imgUrl);
}
function increaseTxt() {
    if (gCurrSticker !== -1) {
        gMeme.stickers[gCurrSticker].width += 5;
        gMeme.stickers[gCurrSticker].height += 5;
        editorImgDrawer(gMeme.imgUrl);
    }
    gMeme.lines[gCurrLine].size += 5;
    editorImgDrawer(gMeme.imgUrl);
}
function decreaseTxt() {
    if (gCurrSticker !== -1) {
        gMeme.stickers[gCurrSticker].width -= 5;
        gMeme.stickers[gCurrSticker].height -= 5;
        editorImgDrawer(gMeme.imgUrl);
    }
    gMeme.lines[gCurrLine].size -= 5;
    editorImgDrawer(gMeme.imgUrl);
}
function txtUp() {
    if (gCurrSticker !== -1) {
        gMeme.stickers[gCurrSticker].posY -= 5;
        editorImgDrawer(gMeme.imgUrl);
    }
    gMeme.lines[gCurrLine].posY -= 5;
    editorImgDrawer(gMeme.imgUrl);
}
function txtDown() {
    if (gCurrSticker !== -1) {
        gMeme.stickers[gCurrSticker].posY += 5;
        editorImgDrawer(gMeme.imgUrl);
    }
    gMeme.lines[gCurrLine].posY += 5;
    editorImgDrawer(gMeme.imgUrl);
}
function switchLine() {
    if (gCurrLine === gMeme.lines.length - 1 || gCurrLine >= gMeme.lines.length) {
        gCurrLine = 0;
    }
    else {
        gCurrLine++;
    }
    markTextInput();

}
function fillColorChange(color) {
    gMeme.lines[gCurrLine].fillColor = color;
    editorImgDrawer(gMeme.imgUrl);
}
function strokeColorChange(color) {
    gMeme.lines[gCurrLine].strokeColor = color;
    editorImgDrawer(gMeme.imgUrl);
}
function fontChange(font) {
    gMeme.lines[gCurrLine].font = font;
    editorImgDrawer(gMeme.imgUrl);
}
function getMeme() {
    return gMeme.lines;
}
function getMemesImgs() {
    return gImgs;
}
function getSavedMemes() {
    return gSavedMemes;
}
function getStickers() {
    return gMeme.stickers;
}
function getStickersList() {
    return gStickers;
}
function getCurrLine() {
    return gCurrLine;
}
function getCurrSticker() {
    return gCurrLine;
}

function saveMeme() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    gSavedMemes.push({ url: imgContent });
    saveToStorage(KEY, gSavedMemes);
}
function loadSavedMemes() {
    if (loadFromStorage(KEY)) return loadFromStorage(KEY);
    else return [];
}
function onSavedMemeDelete(idx) {
    gSavedMemes.splice(idx, 1);
    saveToStorage(KEY, gSavedMemes);
    renderSavedMemes();
}
function setTxtSize() {
    if (gIsMobile) {
        gMeme.lines[0].size = 30;
        gMeme.lines[1].size = 30;
    }
}
function inlineEdit() {
    var currLine = gMeme.lines[gCurrLine];
    var inputWraper = document.querySelector('.inline-input');
    var input = document.querySelector('.inline-input input');
    inputWraper.style.left = `0px`;
    inputWraper.style.top = currLine.posY - currLine.lineHeight + `px`;
    inputWraper.style.height = currLine.lineHeight + `px`;
    input.style.fontSize = currLine.size + 'px';
    inputWraper.style.display = 'block';
    input.value = currLine.txt;
    gCurrInputVal = input.value ;
    gCurrLineChange = gCurrLine ;
    currLine.txt = '';
    input.focus();
    editorImgDrawer(gMeme.imgUrl);
}
function inLineChangedText(el , ev) {
    var currLine = gMeme.lines[gCurrLine];
    gCurrInputVal = el.value;
   
    if (ev.keyCode === 13) inLineChangeFinish();  
    
}
function inLineChangeFinish() {
    var inputWraper = document.querySelector('.inline-input');
    inputWraper.style.display = 'none';
    if(!gCurrInputVal){
        gCurrInputVal = 'Fill Some Text ;)';
        }
    gMeme.lines[gCurrLineChange].txt = gCurrInputVal ;
    editorImgDrawer(gMeme.imgUrl);
}