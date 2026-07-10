/* =========================================
   HALAMAN CONTOH JENIS SAMPAH
========================================= */

const judul = document.getElementById("judul");
const penjelasan = document.getElementById("penjelasan");
const card = document.getElementById("contoh-card");

const parameter = new URLSearchParams(window.location.search);
const jenis = parameter.get("jenis");

if (judul && penjelasan && card) {

    if (jenis == "organik") {

        judul.innerHTML = "Sampah Organik";

        penjelasan.innerHTML =
            "Sampah organik berasal dari makhluk hidup dan mudah terurai.";

        card.innerHTML = `
            <div class="card">
                <img src="img/sisa-makanan.png" alt="">
                <h3>Sisa Makanan</h3>
            </div>

            <div class="card">
                <img src="img/daun-kering.png" alt="">
                <h3>Daun Kering</h3>
            </div>

            <div class="card">
                <img src="img/kulit-buah.png" alt="">
                <h3>Kulit Buah</h3>
            </div>
        `;
    }

    else if (jenis == "anorganik") {

        judul.innerHTML = "Sampah Anorganik";

        penjelasan.innerHTML =
            "Sampah yang sulit terurai namun masih dapat didaur ulang.";

        card.innerHTML = `
            <div class="card">
                <img src="img/botol-plastik.png" alt="">
                <h3>Botol Plastik</h3>
            </div>

            <div class="card">
                <img src="img/kaleng.png" alt="">
                <h3>Kaleng</h3>
            </div>

            <div class="card">
                <img src="img/kertas.png" alt="">
                <h3>Kertas</h3>
            </div>
        `;
    }

    else if (jenis == "b3") {

        judul.innerHTML = "Sampah B3";

        penjelasan.innerHTML =
            "Sampah yang mengandung bahan berbahaya dan beracun.";

        card.innerHTML = `
            <div class="card">
                <img src="img/baterai.png" alt="">
                <h3>Baterai Bekas</h3>
            </div>

            <div class="card">
                <img src="img/lampu.png" alt="">
                <h3>Lampu Bekas</h3>
            </div>

            <div class="card">
                <img src="img/oli.png" alt="">
                <h3>Oli Bekas</h3>
            </div>
        `;
    }

}

/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}

/* =========================================
   COUNTER SECTION 
========================================= */

const statistikSection = document.querySelector("#statistik");
const counters = document.querySelectorAll(".counter");

let sudahJalan = false;

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting && !sudahJalan){

            counters.forEach(counter => {

                const target = Number(counter.dataset.target);
                let current = 0;

               const increment = target / 290;

                function updateCounter(){

                    current += increment;

                    if(current < target){

                        counter.innerText =
                        Math.ceil(current).toLocaleString("id-ID");

                        requestAnimationFrame(updateCounter);

                    }else{

                        counter.innerText =
                        target.toLocaleString("id-ID");

                    }

                }

                updateCounter();

            });

            sudahJalan = true;

        }

    });

},{
    threshold:0.5
});

observer.observe(statistikSection);
