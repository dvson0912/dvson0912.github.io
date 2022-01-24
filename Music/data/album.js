var album = [
    {
        name:'Golden Hour',
        img:'./assets/img/albums/albums1.jpg'
    },
    {
        name:'Boycold (Mini Album)',
        img:'./assets/img/albums/albums2.jpg'
    },
    {
        name:'Red',
        img:'./assets/img/albums/albums3.jpg'
    },
    {
        name:'Người Yêu Cũ (Gửi Cho Anh 2) (Mini Album)',
        img:'./assets/img/albums/albums4.jpg'
    },
    {
        name:'Querencia (Mini Album)',
        img:'./assets/img/albums/albums5.jpg'
    },
    {
        name:'Justice (Mini Album)',
        img:'./assets/img/albums/albums6.jpg'
    },
    {
        name:'Teenage Dream',
        img:'./assets/img/albums/albums7.jpg'
    },
    {
        name:'The Off Season',
        img:'./assets/img/albums/albums8.jpg'
    },
    {
        name:'The Album',
        img:'./assets/img/albums/albums9.jpg'
    },
    {
        name:'Random Access Memories',
        img:'./assets/img/albums/albums10.jpg'
    },
    {
        name:'Map of the Soul: 7',
        img:'./assets/img/albums/albums11.jpg'
    },
    {
        name:'Chromatica',
        img:'./assets/img/albums/albums12.png'
    },
    {
        name:'My Turn',
        img:'./assets/img/albums/albums13.jpg'
    },
    {
        name:'Meet the Woo 2',
        img:'./assets/img/albums/albums14.jpg'
    },
    {
        name:'Lemonade',
        img:'./assets/img/albums/albums15.jpg'
    },
]

const ALBUM_STORAGE_KEY = 'ALBUM'

localStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(album))