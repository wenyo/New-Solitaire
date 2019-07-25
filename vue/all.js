Array.prototype.shuffle = function(){
    let iSheets = this.length;
    while( iSheets-- ){
        let iChangeSheet = Math.floor(Math.random()*iSheets);
        [this[iChangeSheet], this[iSheets]] = [this[iSheets], this[iChangeSheet]] 
    }
    return this;
}
console.log([1,2,3,4,5].shuffle())

const wrap = new Vue({
    el: '.wrap',
    data: {
        // css
            // 進入頁面layer
            bWelcome: true,
            // 提示框變數
            iAlert: 0,
        // 牌組
            //suit花色: spades黑桃, hearts紅桃, clubs梅花, diamonds方塊
            cardSet: ['01','02','03','04','05','06','07','08','09','10','11','12','13']
            .flatMap(x => ['S','H','D','C'].map( y => y + x)),

    },
    created() {
        const that = this;
        window.setTimeout(
            function(){
                document.querySelector('.welcome').classList += ' noneShow';
            },800);
        window.setTimeout(function(){that.bWelcome = false},2000);
    },
});