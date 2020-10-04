document.addEventListener("DOMContentLoaded", () => {
    // Aktivasi sidebar nav
    const elements = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elements);
    loadNav();

    function loadNav() {
        // inisialisasi objek XHR
        const xhr = new XMLHttpRequest();
        const elementNavigation = document.querySelectorAll(
            ".topnav, .sidenav"
        );

        // siapkan xhr
        xhr.onreadystatechange = () => {
            // cek kesiapan xhr
            if (xhr.readyState == 4) {
                if (xhr.status != 200) return;

                // ambil daftar tautan menu dan muat
                elementNavigation.forEach((elements) => {
                    elements.innerHTML = xhr.responseText;
                });

                // daftarkan event listener
                elementNavigation.forEach((elements)=>{
                    elements.addEventListener("click",(event)=>{
                        // tutup navigasi
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        xhr.open("GET","nav.html",true);
        xhr.send();
    }

    // muat konten halaman
    let page= location.hash.substr(1);

    if(page=="") page = "home";
    loadPage(page);

    function loadPage(page){
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4){
                const content = document.querySelector("#body-content");

                if(xhr.status==200){
                    content.innerHTML = xhr.responseText;
                }else if(xhr.status==404){
                    content.innerHTML = `<p>Halaman tidak ada</p>`;
                }else{
                    content.innerHTML = `<p>Halaman tidak dapat diakses</p>`;
                }
            }
        };
        xhr.open("GET",`pages/${page}.html`,true);
        xhr.send();
    }
});
