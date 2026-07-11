/* =====================================================
   TUKAR SAMPAH JAVASCRIPT
===================================================== */


/* =====================================================
   CONTOH JENIS SAMPAH
===================================================== */

const judul = document.getElementById("judul");
const penjelasan = document.getElementById("penjelasan");
const card = document.getElementById("contoh-card");

if (judul && penjelasan && card) {

    const parameter = new URLSearchParams(window.location.search);
    const jenis = parameter.get("jenis");

    const dataSampah = {

        organik: {
            judul: "Sampah Organik",
            deskripsi: "Sampah organik berasal dari makhluk hidup dan mudah terurai.",
            contoh: [
                ["img/sisa-makanan.png", "Sisa Makanan"],
                ["img/daun-kering.png", "Daun Kering"],
                ["img/kulit-buah.png", "Kulit Buah"]
            ]
        },

        anorganik: {
            judul: "Sampah Anorganik",
            deskripsi: "Sampah yang sulit terurai namun masih dapat didaur ulang.",
            contoh: [
                ["img/botol-plastik.png", "Botol Plastik"],
                ["img/kaleng.png", "Kaleng"],
                ["img/kertas.png", "Kertas"]
            ]
        },

        b3: {
            judul: "Sampah B3",
            deskripsi: "Sampah yang mengandung bahan berbahaya dan beracun.",
            contoh: [
                ["img/baterai.png", "Baterai Bekas"],
                ["img/lampu.png", "Lampu Bekas"],
                ["img/oli.png", "Oli Bekas"]
            ]
        }

    };

    if (dataSampah[jenis]) {

        const data = dataSampah[jenis];

        judul.innerHTML = data.judul;
        penjelasan.innerHTML = data.deskripsi;

        card.innerHTML = "";

        data.contoh.forEach(item => {

            card.innerHTML += `

            <div class="card">

                <img src="${item[0]}" alt="${item[1]}">

                <h3>${item[1]}</h3>

            </div>

            `;

        });

    }

}


/* =====================================================
   NAVBAR SCROLL
===================================================== */

const navbar = document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        navbar.classList.toggle("scrolled", window.scrollY > 30);

    });

}


/* =====================================================
   COUNTER STATISTIK
===================================================== */

const statistikSection = document.querySelector("#statistik");

if (statistikSection) {

    const counters = document.querySelectorAll(".counter");

    let sudahJalan = false;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !sudahJalan) {

                counters.forEach(counter => {

                    const target = Number(counter.dataset.target);

                    let current = 0;

                    const increment = target / 290;

                    function updateCounter() {

                        current += increment;

                        if (current < target) {

                            counter.innerHTML =
                                Math.ceil(current).toLocaleString("id-ID");

                            requestAnimationFrame(updateCounter);

                        } else {

                            counter.innerHTML =
                                target.toLocaleString("id-ID");

                        }

                    }

                    updateCounter();

                });

                sudahJalan = true;

            }

        });

    }, {

        threshold: 0.5

    });

    observer.observe(statistikSection);

}

/* =====================================================
   LOKASI PENGGUNA & NAVIGASI BANK SAMPAH
===================================================== */

const btnLokasi = document.getElementById("btnLokasi");

if (btnLokasi) {

    let userLat = null;
    let userLng = null;

    btnLokasi.addEventListener("click", ambilLokasi);

    function ambilLokasi() {

        const status = document.getElementById("statusLokasi");
        const koordinat = document.getElementById("koordinat");

        if (!navigator.geolocation) {

            status.innerHTML = "❌ Browser tidak mendukung Geolocation.";
            return;

        }

        status.innerHTML = "📍 Mengambil lokasi Anda...";

        navigator.geolocation.getCurrentPosition(

            function(position){

                userLat = position.coords.latitude;
                userLng = position.coords.longitude;

                status.innerHTML = "✅ Lokasi berhasil ditemukan";

                koordinat.innerHTML =
                `
                Latitude : ${userLat.toFixed(6)}
                <br>
                Longitude : ${userLng.toFixed(6)}
                `;

                hitungSemuaJarak();

            },

            function(){

                status.innerHTML =
                "❌ Izin lokasi ditolak atau lokasi tidak tersedia.";

            }

        );

    }

/* ===========================
   HITUNG SEMUA CARD
=========================== */

function hitungSemuaJarak(){

    const cards = document.querySelectorAll(".lokasi-card");
    const container = document.querySelector(".lokasi-container");

    const daftar = [];

    cards.forEach(card=>{

        const lat = Number(card.dataset.lat);
        const lng = Number(card.dataset.lng);

        const jarak = hitungJarak(userLat,userLng,lat,lng);

        // Update teks jarak
        card.querySelector(".jarak").innerHTML =
        ` ${jarak.toFixed(2)} km`;

        // Tombol navigasi
        const tombol = card.querySelector(".btn-navigasi");

        tombol.onclick = function(){

            const url =
            `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`;

            window.open(url,"_blank");

        };

        // Simpan data untuk diurutkan
        daftar.push({

            element: card,
            jarak: jarak

        });

    });

    /* ===========================
       URUTKAN BERDASARKAN JARAK
    =========================== */

    daftar.sort((a,b)=>a.jarak-b.jarak);

    /* ===========================
       PINDAHKAN CARD
    =========================== */

    daftar.forEach(item=>{

        container.appendChild(item.element);

    });

    /* ===========================
       HAPUS BADGE LAMA
    =========================== */

    document.querySelectorAll(".terdekat").forEach(badge=>{

        badge.remove();

    });

    /* ===========================
       TAMBAH BADGE BARU
    =========================== */

    const info =
    daftar[0].element.querySelector(".lokasi-info");

    const badge =
    document.createElement("div");

    badge.className = "terdekat";

    badge.innerHTML = "⭐ Bank Sampah Terdekat";

    info.appendChild(badge);

}

        }

        function hitungJarak(lat1, lon1, lat2, lon2){

    const R = 6371;

    const dLat = (lat2-lat1) * Math.PI / 180;
    const dLon = (lon2-lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLon/2) *
        Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    return R*c;

}