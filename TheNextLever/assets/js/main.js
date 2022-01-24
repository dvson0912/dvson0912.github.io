const sliderPrev = $('.slider-prev')
const sliderNext = $('.slider-next')
const sliderMain = $('.slider-main')
const sliderCategory = $(".slider-category__list")
const sliderproduct = $(".products-list")
const productSale = $(".products-list-sale")
const productWibu =$(".products-wibu")
const tabList = [...document.querySelectorAll(".tab-item__link")]
const tabProductd = [...document.querySelectorAll(".tab-product")]
const subnav = [...document.querySelectorAll(".modal-nav__menu-item")]


const app = {
    sliderBanner: function(){
        $(document).ready(function(){
            sliderMain.slick({
                // dots: true,
                arrows: true,
                prevArrow:`<button type='button' class='slick-prev pull-left margin-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`,
                nextArrow:`<button type='button' class='slick-next pull-right margin-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                autoplay: true,
                autoplaySpeed: 2000,
                dots:true,
                responsive:[
                    {
                        breakpoint: 741,
                        settings:
                        {
                            arrows:false,
                            dots: false,
                        }
                    }
                ]
            });
        });
    },
    sliderCategory: function(){
        $(document).ready(function(){
            sliderCategory.slick({
                infinite: false,
                arrows: false,
                slidesToShow: 8,
                responsive:[
                    {
                        breakpoint: 1025,
                        settings:
                        {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            arrows: true,
                            nextArrow:`<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                            prevArrow:`<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`,  
                        }
                    },
                    {
                        breakpoint: 740,
                        settings:
                        {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: true,
                            nextArrow:`<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                            prevArrow:`<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`,  
                        }
                    }
                ]
            })
        })
    },

    productList:function(){
        $(document).ready(function(){
            sliderproduct.slick({
                slidesToShow: 4,
                infinite:false,
                slidesToScroll: 4,
                arrows: true,
                nextArrow:`<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                prevArrow:`<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`, 
                responsive:[
                    {
                        breakpoint: 1025,
                        settings:
                        {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 740,
                        settings:
                        {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    }
                ]
            })
        })
    },

    productSale:function(){
        $(document).ready(function(){
            productSale.slick({
                slidesToShow:5,
                infinite:false,         
                arrows:true,   
                nextArrow:`<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                prevArrow:`<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`, 
           
                responsive:[
                    {
                        breakpoint:1025,
                        settings:{
                            slidesToShow:3,
                            slidesToScroll:3,
                        }
                    },
                    {
                        breakpoint:741,
                        settings:{
                            slidesToShow:2,
                            slidesToScroll:2,
                            arrows:true,            
                            nextArrow:`<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                            prevArrow:`<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`, 
                       }
                    }
                ]
            })
        })
    },
    productWibu:function(){
        $(document).ready(function(){
            productWibu.slick({
                slidesToShow:3,
                slidesToScroll:3,
                infinite:false,         
                arrows:true,   
                nextArrow:`<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
                prevArrow:`<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`, 

            })
        })
    },
    tabProducts:function(){
        tabList.forEach(function(item,index){
            item.onclick = function(e){
                tabList.forEach(function(item,index){
                    item.classList.remove('active')
                    tabProductd[index].classList.remove('active')
                })
                item.classList.add('active')
                tabProductd[index].classList.add('active')
            }
        })
    },
    clickMenu:function(){
        document.querySelector(".icon-menu").addEventListener("click", function() {
            document.querySelector(".popupCartModal").classList.add('active')
            document.querySelector(".modal-nav").style.transform = 'translateX(0)' 
          });
    },
    closeMenu:function(){
        document.querySelector(".popupCartModal").addEventListener("click", function() {
            document.querySelector(".popupCartModal").classList.remove('active')
            document.querySelector(".modal-nav").style.transform = 'translateX(-100%)' 
          });
    },

    showSubnav:function(){
        subnav.forEach(function(item){
            item.onclick = function(){
                item.classList.toggle('active')
            }
        })
    },

    start: function(){
        // slider 
        this.sliderBanner()
        this.sliderCategory()
        this.productList()
        this.productSale()
        this.productWibu()

        this.tabProducts()

        this.clickMenu()
        this.closeMenu()
        this.showSubnav()
    }
}

app.start()