Array.prototype.shuffle = function(){
    let iSheets = this.length;
    while( iSheets-- ){
        let iChangeSheet = Math.floor(Math.random()*iSheets);
        [this[iChangeSheet], this[iSheets]] = [this[iSheets], this[iChangeSheet]];
    }
    return this;
}

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
            cards: ['01','02','03','04','05','06','07','08','09','10','11','12','13']
            .flatMap(x=>['S','H','D','C'].map( y => y + x))
            .reduce((acc,cur,i)=>{
              acc[cur]={suit:cur[cur.length-3],
                        txt:cur.substr(1,cur.length-1),
                        num:Math.floor(i/4),
                        url:'./img/card/card-'+cur+".svg",
                        cardRef: cur};
              return acc},{}), 
        // 下方牌組位置
            // 一排的數量
            cardNum: [7,7,7,7,6,6,6,6],
            below: {b0:{},b1:{},b2:{},b3:{},b4:{},b5:{},b6:{},b7:{}},
        // 左方暫存區
            left: {l0:{},l1:{},l2:{},l3:{}},
        // 右方區
            left: {r0:{},r1:{},r2:{},r3:{}},
        // 紀錄滑鼠事件
            mouseEvent: {}

    },
    methods: {
        newGame: function(){
            this.shuffleCard();
            const that = this;
            setTimeout(function(){
                that.cardPosition();
            },2000)
        },
        shuffleCard: function(){
            // 洗牌的牌組
            let cardArr = this.cardNum.reduce((acc,cur)=>({
                cum: acc.cum+cur,
                arr: [...acc.arr,acc.res.slice(acc.cum,acc.cum+cur)],
                res: acc.res
              }),{cum:0,arr:[],res:this.cardSet.slice().shuffle()}).arr;

              cardArr.map((slot,i)=>{
                let slotRef = 'b'+i
                slot.map(cardRef=>{
                  this.cards[cardRef].slot = slotRef;
                  this.below[slotRef][cardRef] = this.cards[cardRef]
                })
              })
              console.log(this.cards)
              console.log(this.below)
            // console.log(cardArr)
            // console.log(this.cardSet)
        },
        cardPosition: function(){
            for(let slots of [this.below]){ //來自各邊的插槽
                Object.keys(slots).map(slotRef=>{ 
                  Object.keys(slots[slotRef]).map((cardRef,ci)=>{
                      ci = slotRef[0]=='b'?ci:0
                      this.$refs[cardRef][0].style.top = ci*30+'px'
                      this.$refs[cardRef][0].style.zIndex = ci;
                  })
                })
            }
        },
        mouseInfo: function(e){
            console.log(e)
        }
    },
    mounted(){
        const that = this;
        window.setTimeout(
            function(){
                that.$refs.welcome.classList += ' noneShow';
            },800);
        window.setTimeout(function(){that.bWelcome = false},2000);
        this.newGame()
    }
});