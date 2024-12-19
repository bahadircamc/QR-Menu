
// arayuze etki edecek butun fonskiyonlar bu dosyada tutulacak.


//menu list div inin cagir
const menuList = document.getElementById("menu-list");

//menu elmanlarini parametre olarak alip dizikedi her bir eleman icin ekrana kart bas
export const renderCards = (data) => {
    //data dizisindeki herbir nesne icin kart html'i olustur.
    //join methodu ile diziyi string type a cevridik.
    const cardsHTML = data
    .map((item)=> `
    <a 
        href="/detail.html?id=${item.id}"
        id="card" 
        class="d-flex flex-column flex-md-row text-dark gap-3 text-decoration-none">
            <img 
            class="rounded shadow img-fluid" 
            src="${item.img}"
            >

            <div>
                <div class="d-flex justify-content-between text-capitalize">
                    <h5>${item.title}</h5>
                    <p class="text-success fw-bold">${(item.price *20).toFixed(2)}₺</p>
                </div>

                <p class="lead">
                    ${item.desc}
                </p>
            </div>
        </a>    
    `
)
.join("")

//olusturdugumuz kartlari #menuList divnin icine aktar.

menuList.innerHTML = cardsHTML;
};

