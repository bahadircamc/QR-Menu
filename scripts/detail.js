
/*
*URL'deki arama parametreline(search-param) eris
*JS'de tarayici ile alakali olan verilere erismek istiyorsak window nesnesi kullaniriz.

* JS'de URL'deki arama parametrelerini yonetmeye yarayan yerlesik bir class vardir. URLSearchParams.
*/

const params = new URLSearchParams(window.location.search);

//yukaridaki classtan elde ettigimiz nesne sayesinde urld'deki parametrelerini guncellemeye / erismeye / silmeye  yarayan methodlari kullanabiliyoruz bizde get methodu ile id parametresine eristik.
const id = params.get('id');

// sayfanin yuklenme load olayini izle 
document.addEventListener("DOMContentLoaded", async () => {

    // api'den verileri al.
    try {
        const res = await fetch("../db.jsonsadasd");
        const data = await res.json();

        // veriler arasindan url'deki id'ye denk gelen urunu bul.
        const product = data.menu.find((item) => item.id == id)

        if(!product){
            //urun bunmazsa: 404 sayfasinin renderla
            renderNotFound();
        }else{
            //urun bulunursa: sayfa icerigini api'den aldigimiz urune gore renderla
            renderPage(product);
        }
    } catch (error) {
        //api isteginde hata olurse:
        renderNotFound();
        return alert("Üzgünüz bir hata oluştu :(");

    }
});

//icerisine sayfa icerigini basicagimiz divi cagirdik
const outlet = document.getElementById("outlet");


//sayfa icerigini aldigi parametreye(product) gore dinamik olarak ekrana basan fonks.
function renderPage(product) {
    outlet.innerHTML = `
    <div class="d-flex justify-content-between fs-5">
            <a href="/">
                <img width="35px" src="/images/home.png" alt="">
            </a>


            <p> anasayfa / ${product.category} / ${product.title.toLowerCase()} </p>
        </div>

        <h1 class="text-center my-3">${product.title}</h1>

        <img 
            src="${product.img}"
            style="max-height: 400px;"
            class="rounded object-fit-cover shadow" >

        <h4 class="mt-4">
            <span>Ürünün Kategorisi: </span>
            <span class="text-success">${product.category}</span>
        </h4>

        <h4 class="mt-4">
            <span>Ürünün Fiyatı: </span>
            <span class="text-success">${(product.price * 20).toFixed(2)} ₺</span> 
        </h4>

        <p class="lead">
            ${product.desc}
        </p>
    `;
}

// 404 sayfa icerigini ekrana basan fonk.

function renderNotFound (){
    outlet.innerHTML = `
   <div style="height:90vh" class="d-flex justify-content-center align-items-center"> 
   <div class="d-flex flex-column align-items-center gap-3">
    <h1 class="text-center">Aradığınız ürün mevcut değil.</h1>

    <a href="/">Anasayfaya Dönün</a>
    </div>
   </div>
    `
}
