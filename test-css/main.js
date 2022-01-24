const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slider = $('.image-slider')

const app = {
    imgs:[
        {
            id:1,
            img:'./assets/img/anh-dep-lol-shen_030637940.jpg'
        },
        {
            id:2,
            img:'./assets/img/project-vayne.png'
        },
        {
            id:3,
            img:'./assets/img/Jhin-Vu-Tru-Hac-Am.jpg'
        },
        {
            id:4,
            img:'./assets/img/imager_1221.jpg'
        },
        {
            id:5,
            img:'./assets/img/project-vayne.png'
        },
        {
            id:6,
            img:'./assets/img/Jhin-Vu-Tru-Hac-Am.jpg'
        },
    ],
    render:function(){
        const htmls = this.imgs.map(function(img){
            return `<div class="img-container front" data-id="${img.id}">
                        <img src="${img.img}" alt="">
                    </div>`
        }).join('')
        slider.innerHTML = htmls;


    },

    sliderplay:function(){
        const sliderimg = [...$$('.img-container')]
        sliderimg[0].classList.add('first')
        sliderimg[0].classList.remove('front')
        sliderimg[1].classList.add('second')
        sliderimg[1].classList.remove('front')
        sliderimg[2].classList.add('third')
        sliderimg[2].classList.remove('front')
        var i = 1;
        setInterval(() => {
            if((i+2) <= sliderimg.length - 1 && i != 0)
            {
                sliderimg[i-1].classList.remove('first')
                sliderimg[i-1].classList.add('front')
                
                sliderimg[i+1].classList.remove('third')
                sliderimg[i+1].classList.add('front')

                sliderimg[i].classList.add('front')
                sliderimg[i].classList.remove('second')


                sliderimg[i].classList.add('first')
                sliderimg[i].classList.remove('front')
                sliderimg[i+1].classList.add('second')
                sliderimg[i+1].classList.remove('front')
                sliderimg[i+2].classList.add('third')
                sliderimg[i+2].classList.remove('front')
                i++
            }
            else if(i == 0){
                sliderimg[sliderimg.length - 1].classList.remove('first')
                sliderimg[sliderimg.length - 1].classList.add('front')
                
                sliderimg[i+1].classList.remove('third')
                sliderimg[i+1].classList.add('front')

                sliderimg[i].classList.add('front')
                sliderimg[i].classList.remove('second')


                sliderimg[i].classList.add('first')
                sliderimg[i].classList.remove('front')
                sliderimg[i+1].classList.add('second')
                sliderimg[i+1].classList.remove('front')
                sliderimg[i+2].classList.add('third')
                sliderimg[i+2].classList.remove('front')
                i++
            }
            else if(i+1 > sliderimg.length - 1){
                sliderimg[i-1].classList.remove('first')
                sliderimg[i-1].classList.add('front')
                
                sliderimg[0].classList.remove('third')
                sliderimg[0].classList.add('front')

                sliderimg[i].classList.add('front')
                sliderimg[i].classList.remove('second')


                sliderimg[i].classList.add('first')
                sliderimg[i].classList.remove('front')
                i=0;
                sliderimg[i].classList.add('second')
                sliderimg[i].classList.remove('front')
                sliderimg[i+1].classList.add('third')
                sliderimg[i+1].classList.remove('front')
            }
            else if((i+2) > sliderimg.length - 1){
                sliderimg[i-1].classList.remove('first')
                sliderimg[i-1].classList.add('front')
                
                sliderimg[i+1].classList.remove('third')
                sliderimg[i+1].classList.add('front')

                sliderimg[i].classList.add('front')
                sliderimg[i].classList.remove('second')


                sliderimg[i].classList.add('first')
                sliderimg[i].classList.remove('front')

                sliderimg[i+1].classList.add('second')
                sliderimg[i+1].classList.remove('front')

                sliderimg[0].classList.add('third')
                sliderimg[0].classList.remove('front')
                i++
            }
        }, 1000);
    },

    strat:function(){
        this.render()
        this.sliderplay()
    }
}


setInterval(() => {

},1000)

app.strat()