const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const header = $('.header')
const audio = $('.audio')
const playList = $('.song__list')
const media = $('.media')
const controlPlay = $('.control__play')
const songList = $('.song__list')
const playBtn = $('.control__btn-play')
const pauseBtn = $('.control__btn-pause')
const prevBtn = $('.control__btn-prev')
const nextBtn = $('.control__btn-next')
const randomBtn = $('.control__btn-random')
const undoBtn = $('.control__btn-undo')
const progress = $('.progress-time__range')
const duration = $('.duration')
const currentTime = $('.current-time')
const volume =$('.volume-range')
const boxVolume = $('.player-control__right-volume')

var locationSlider = 0;//dùng biến toàn cục để thây đổi vị tri
const app = {
    locationPlayList: 0,
    currentIndex: 0,
    isPlay:false,
    isHaveVolume: true,
    thumbAnimation:null,
    nameAnimation:null,
    nodeSongFisrt:null,
    nodeSongSecond:null,
    nodeSongThird:null,
    nodeSongFour:null,
    isUndo:false,
    isRandom:false,
    songs : JSON.parse(localStorage.getItem('VIK_MUSIC')),
    scrollContainer:function(){
        container.onscroll = function(){
            header.style.backgroundColor = 'var(--sidebar-color)'
            if(container.scrollTop === 0){
                header.style.backgroundColor = 'transparent'
            }
        }
    },
    renderSlider:function () {
        const htmls = this.songs[this.locationPlayList].map(function (img) {
            return `<div class="slider__item front">
                        <img src="${img.image}" alt="" class="slider__item-img">
                    </div>`
        }).join('')
        $('.sider__list').innerHTML = htmls
    },
    renderSongPlay:function () {
        var _this =this
        const songList = this.songs[this.locationPlayList]
        const htmls = songList.map(function (song,index){
            return `<div class="song__item ${index === _this.currentIndex ? _this.isPlay === true ? 'active' : 'active-pause' : ''} flex-center" data-index="${index}">
                        <div class="song__item-left flex-center">
                            <div class="song__item-avatar">
                                <img src="${song.image}" alt="" class="song__item-img">
                                <img src="./assets/img/SongActiveAnimation/icon-playing.gif" class="song__item-img-background"></img>
                                <div class="song__item-play flex-center">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="song__item-info">
                                <h3 class="song__item-name">${song.name}</h3>
                                <div class="song__item-author">
                                    ${song.singer.map(function (author){
                                        return `
                                               <a href="#" class="song__item-author-link">${author}</a>
                                               ,
                                               `

                                    }).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="song__item-time"></div>
                        <div class="song__item-right flex-center">
                            <div class="song__item-like song__item-click">
                                <i class="song__item-like-like ${song.like} fas fa-heart"></i>
                                <i class="song__item-like-nolike far fa-heart"></i>
                            </div>
                            <div class="song__item-setting song__item-click">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    </div>`
                }).join('')
                $('.song__list').innerHTML = htmls
    },
    nextSlider:function(slider,i,z = i) {
        slider[i].classList.add('first')
        slider[i].classList.remove('front')
        
        if(z === '0'){ 
            slider[i+1].classList.add('second')
            slider[i+1].classList.remove('front')
            slider[0].classList.add('third')
            slider[0].classList.remove('front')
            locationSlider++
        }
        else if(z === '1'){
            slider[0].classList.add('second')
            slider[0].classList.remove('front')
            slider[1].classList.add('third')
            slider[1].classList.remove('front')
            locationSlider = 0;
        }
        else if(z === i){
            slider[i+1].classList.add('second')
            slider[i+1].classList.remove('front')
            slider[i+2].classList.add('third')
            slider[i+2].classList.remove('front')
            locationSlider++
        }
    },
    removeSlider:function(slider,i,z = i) {
            
        if(z === '1'){
            slider[i-1].classList.remove('first')
            slider[i-1].classList.add('front')
            slider[i].classList.remove('second')
            slider[i].classList.add('front')
            slider[0].classList.remove('third')
            slider[0].classList.add('front')
        }
        else if(z === '0'){
            slider[slider.length-1].classList.remove('first')
            slider[slider.length-1].classList.add('front')
            slider[i].classList.remove('second')
            slider[i].classList.add('front')
            slider[i+1].classList.remove('third')
            slider[i+1].classList.add('front')
        }
        else if(z === i){
            slider[i-1].classList.remove('first')
            slider[i-1].classList.add('front')
            slider[i].classList.remove('second')
            slider[i].classList.add('front')
            slider[i+1].classList.remove('third')
            slider[i+1].classList.add('front')
        }
    },
    playSilder:function () {
        var _this = this;
        const sliderItems = [...$$('.slider__item')]
        _this.nextSlider(sliderItems,locationSlider)
        setInterval(()=>{
            if((locationSlider+2) <= sliderItems.length-1 && locationSlider != 0){
                _this.removeSlider(sliderItems,locationSlider)
                _this.nextSlider(sliderItems,locationSlider)
            }
            else if(locationSlider === 0){
                _this.removeSlider(sliderItems,locationSlider,'0')
                _this.nextSlider(sliderItems,locationSlider)
            }
            else if( locationSlider+1 > sliderItems.length - 1 && locationSlider != 0){
                _this.removeSlider(sliderItems,locationSlider,'1')
                _this.nextSlider(sliderItems,locationSlider,'1')
            }
            else if((locationSlider+2) > sliderItems.length-1 && locationSlider != 0){
                _this.removeSlider(sliderItems,locationSlider)
                _this.nextSlider(sliderItems,locationSlider,'0')
            }
        },1000)
    },
    defineProperties:function(){
        Object.defineProperty(this, 'currentsong',{
            get: function(){
                return this.songs[this.locationPlayList][this.currentIndex]
            }
        })
    },
    loadCurrentSong:function(){
        media.innerHTML = `
        <div class="media__left">
            <div class="thubnail-wrapper">
                <img src="${this.currentsong.image}" alt="" class="thubnail-wrapper__img">
                <i class="thubnail-wrapper__icon-1 fas fa-music"></i>
                <i class="thubnail-wrapper__icon-2 fas fa-guitar"></i>
                <i class="thubnail-wrapper__icon-3 fas fa-music"></i>
                <i class="thubnail-wrapper__icon-4 fas fa-guitar"></i>
            </div>
            </div>
            <div class="media__content">
                <div class="media__content-info">
                    <div class="media__content-name-animation">
                        <div class="name-run">
                            <div class="media__content-name">
                                ${this.currentsong.name}
                            </div>
                            <div class="media__content-name">
                                ${this.currentsong.name}
                            </div>
                        </div>
                    </div>
                    <div class="media__content-author">
                        ${this.currentsong.singer.map(function(author){
                            return `
                            <a href="#" class="song__item-author-link">${author}</a>
                            `
                        })}
                    </div>
                </div>
            </div>
            <div class="media__right flex-center">
                <div class="song__item-like song__item-click">
                    <i class="song__item-like-like ${this.currentsong.like} fas fa-heart"></i>
                    <i class="song__item-like-nolike far fa-heart"></i>
                </div>
                <div class="song__item-setting song__item-click">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        
            this.thumbAnimation = $('.thubnail-wrapper__img').animate([
                {transform:'rotate(360deg)'}
            ],{
                duration:10000,
                iterations:Infinity
            })
            this.thumbAnimation.pause()

            this.nameAnimation = $('.name-run').animate([
                {transform:'translateX(-140px)'}
            ],{
                duration:5000,
                iterations:Infinity
            })
            this.nameAnimation.pause()

            this.nodeSongFisrt = $('.thubnail-wrapper__icon-1').animate([
                {transform:'rotate(90deg) translate(40px) rotate(-90deg)',opacity:0},
                {transform:'rotate(180deg) translate(55px) rotate(-180deg) scale(1.3)',opacity:1},
                {transform:'rotate(260deg) translate(70px) rotate(-260deg) scale(1.5) rotate(45deg) rotate(50deg)',opacity:0}
            ],{
                duration:5000,
                iterations:Infinity
            })
            this.nodeSongFisrt.pause()

            this.nodeSongSecond = $('.thubnail-wrapper__icon-2').animate([
                {transform:'rotate(90deg) translate(40px) rotate(-90deg)',opacity:0},
                {transform:'rotate(175deg) translate(57.5px) rotate(-175deg) scale(1.3) rotate(-50deg)',opacity:1},
                {transform:'rotate(260deg) translate(75px) rotate(-260deg) scale(1.5) rotate(45deg) rotate(-50deg)',opacity:0}
            ],{
                duration:5000,
                iterations:Infinity,
                delay: 1000
            })
            this.nodeSongSecond.pause()

            this.nodeSongThird = $('.thubnail-wrapper__icon-3').animate([
                {transform:'rotate(90deg) translate(40px) rotate(-90deg)',opacity:0},
                {transform:'rotate(180deg) translate(55px) rotate(-180deg) scale(1.3)',opacity:1},
                {transform:'rotate(260deg) translate(70px) rotate(-260deg) scale(1.5) rotate(45deg) rotate(50deg)',opacity:0}
            ],{
                duration:5000,
                iterations:Infinity, 
                delay: 2500
            })
            this.nodeSongThird.pause()

            this.nodeSongFour = $('.thubnail-wrapper__icon-4').animate([
                {transform:'rotate(90deg) translate(40px) rotate(-90deg)',opacity:0},
                {transform:'rotate(175deg) translate(57.5px) rotate(-175deg) scale(1.3) rotate(-50deg)',opacity:1},
                {transform:'rotate(260deg) translate(75px) rotate(-260deg) scale(1.5) rotate(45deg) rotate(-50deg)',opacity:0}
            ],{
                duration:5000,
                iterations:Infinity,
                delay: 3500
            })
            this.nodeSongFour.pause()

        audio.src = this.currentsong.path
    },
    loadDuration:function(){
        audio.onloadedmetadata = ()=>{
        duration.innerHTML = `${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60)}`
        }
    },
    loadLikeCurrentSong:function(){
        $('.media__right').innerHTML = `<div class="song__item-like song__item-click">
                                            <i class="song__item-like-like ${this.currentsong.like} fas fa-heart"></i>
                                            <i class="song__item-like-nolike far fa-heart"></i>
                                        </div>
                                        <div class="song__item-setting song__item-click">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </div>`
    },
    loadTime:function(){
        audio.ontimeupdate = function(){
            currentTime.innerHTML = `${Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)}`
            var valueRange = Math.floor(audio.currentTime / audio.duration * 100)
            if(valueRange)
            {
                $('.progress-time__range').style.background = `linear-gradient(to right,#fff ${valueRange + 0.5}%,rgba(255, 255, 255,0.4) 0)`
                progress.value = `${valueRange}`
            }
            else{
                progress.value = 0
            }
        }
    },
    rewindMusic:function(){
        progress.onclick =function(e){
            audio.currentTime = Math.floor(progress.value * audio.duration / 100)
        }
        progress.onmousemove = (e) =>{
            $('.progress-time__range').style.background = `linear-gradient(to right,#fff ${progress.value}%,#fff ${0.5}%,rgba(255, 255, 255,0.4) 0)`
        }
    },
    eventVolume:function(){
        const _this =this
        // load volume
        audio.onloadeddata = ()=>{
            volume.value = audio.volume * 100
            volume.style.background = `linear-gradient(to right,#fff ${volume.value}%,#fff ${0.5}%,rgba(255, 255, 255,0.4) 0)`
        }

        volume.onmousemove = ()=>{
            volume.style.background = `linear-gradient(to right,#fff ${volume.value}%,#fff ${0.5}%,rgba(255, 255, 255,0.4) 0)`
            audio.volume = volume.value / 100
            if(audio.volume === 0){
                boxVolume.classList.add('active')
                _this.isHaveVolume = false
            }
            else{
                _this.isHaveVolume = true
                boxVolume.classList.remove('active')
            }
        }

        // click tắt âm
        boxVolume.addEventListener('click',()=>{
            boxVolume.classList.toggle('active',_this.isHaveVolume)
            _this.isHaveVolume = !_this.isHaveVolume
        })
    },
    like:function(){
        var _this = this
        const likes = [...$$('.song__item-like')]
        const nolike = [...$$('.song__item-like-like')]
        likes.forEach(function(like,index){
            like.onclick = function(){
                console.log(123)
                if(index < likes.length - 1)
                {
                    if(!_this.songs[_this.locationPlayList][index].like){
                        _this.songs[_this.locationPlayList][index].like = true
                        nolike[index].classList.add('true')
                        nolike[index].classList.remove('false')
                    }
                    else{
                        _this.songs[_this.locationPlayList][index].like = false
                        nolike[index].classList.add('false')
                        nolike[index].classList.remove('true')
                    }
                }
                if(index === _this.currentIndex){
                    _this.loadLikeCurrentSong()
                }
                
            }
        })
    },
    handleEvent:function(){
        var _this = this;
        const lengthSongList = _this.songs[_this.locationPlayList].length - 1
        function animationPlaySong(){
            _this.thumbAnimation.play()
            _this.nameAnimation.play()
            _this.nodeSongFisrt.play()
            _this.nodeSongSecond.play()
            _this.nodeSongThird.play()
            _this.nodeSongFour.play()
        }

        function animationPauseSong(){
            _this.thumbAnimation.pause()
            _this.nameAnimation.pause()
            _this.nodeSongFisrt.pause()
            _this.nodeSongSecond.pause()
            _this.nodeSongThird.pause()
            _this.nodeSongFour.pause()
        }
        
        function loadSongClick(){
            _this.loadCurrentSong()
            _this.renderSongPlay()
            playBtn.click()
            audio.play()
        }
        // play song
        $('.control__play').onclick = function(){
            if (_this.isPlay) {
                audio.pause();
              } else {
                audio.play();
              }
        }


        audio.onplay = function () {
            _this.isPlay = true
            controlPlay.classList.add('active')
            _this.renderSongPlay()
            animationPlaySong()
          };

        audio.onpause = function () {
            _this.isPlay = false
            controlPlay.classList.remove('active')
            _this.renderSongPlay()
            animationPauseSong()
        };

        // next song
        nextBtn.onclick = function(){
            if(!_this.isRandom){
                if(_this.currentIndex < lengthSongList)
                {
                    _this.currentIndex++
                    loadSongClick()
                }
                else{
                    _this.currentIndex = 0
                    loadSongClick()
                }
            }
            else{
                    _this.currentIndex = Math.floor(Math.random() * lengthSongList)
                    loadSongClick()
            }
        }
        // prev song
        prevBtn.onclick = function(){
            if(!_this.isRandom){
                if(_this.currentIndex != 0)
                { 
                    _this.currentIndex--
                    loadSongClick()
                }
                else{
                    _this.currentIndex = lengthSongList
                    loadSongClick()
                }
            }
            else{
                do{
                    var random = _this.currentIndex = Math.floor(Math.random() * lengthSongList)
                }while(random === _this.currentIndex)
                loadSongClick()
            }
        }
        // random song
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
        }
        // undo song
        undoBtn.onclick = function(){
            _this.isUndo = !_this.isUndo
            undoBtn.classList.toggle('active',_this.isUndo)
        }
        // end song
        audio.onended = function(){
            if(_this.isUndo){
                audio.currentTime = 0
                loadSongClick()
            }
            else{
                nextBtn.click()
            }
        }
        // click song on songlist
        songList.onclick = function(e){
            const songNode = e.target.closest('.song__item')
            if(songNode){
                const index = Number(songNode.dataset.index)
                if(e.target.closest('.song__item-avatar')){
                    if(e.target.closest('.song__item-play')){
                        if(_this.currentIndex != index)
                        {
                            _this.currentIndex = index
                            _this.renderSongPlay()
                            _this.loadCurrentSong()
                            playBtn.click()
                            audio.play()
                        }
                        else{
                            playBtn.click()
                        }
                    }
                    else{
                        pauseBtn.click()
                        _this.isPlay = false
                    }
                }
                else if(e.target.closest('.song__item-like')){
                    _this.like()
                    localStorage.removeItem('VIK_MUSIC')
                    localStorage.setItem('VIK_MUSIC', JSON.stringify(_this.songs));
                }
            }
        }
    },
    start:function () {
        this.defineProperties()
        this.renderSlider()
        this.renderSongPlay()

        // song time
        this.loadTime()
        this.rewindMusic()
        this.loadDuration()

        // volume
        this.eventVolume()

        this.playSilder()
        this.scrollContainer()
        this.loadCurrentSong()
        this.handleEvent()
    }
}

app.start()