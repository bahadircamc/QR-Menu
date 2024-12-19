
import { renderCards } from "./scripts/ui.js";

//* dataya her yerde erisebilmek icin global degisken tanimlama
let data;

// *menu verilerini json dosyasindan ceken fonk.
async function fetchMenu() {
    // api den verileri al.
    const res = await fetch("./db.json");

    // json verilerini js formatina cevir
    data = await res.json();

}


// *sayfanin yuklenmesini izle 
window.addEventListener("DOMContentLoaded", () => {
    //verileri ceken fonksiyon calistir.
    fetchMenu()
    //basarili oldugu zaman kartlari ekrana bas
        .then(() => renderCards(data.menu));
});

//* buttons alanindaki inputlar cagir.
const inputs = document.querySelectorAll("#buttons input");


//* inputlar dizisini don:
inputs.forEach((input)=> {
    //herbir inputun secilme olayini izle.
    input.addEventListener('change', ()=> {
        //secilen kategori
        const selected = input.id;

        //eger all secili ise butun datayi ekrana bas
        if(selected === "all"){
            renderCards(data.menu);
        } else {

        //menu elemanlarindan secilen kategoriye ait olanlari filtrele.
        const filtred = data.menu.filter((i) => i.category === selected)

        //filtrenen datayi ekrana bas.
        renderCards(filtred);
        }

    });
    
});