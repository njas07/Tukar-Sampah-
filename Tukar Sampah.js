const judul = document.getElementById("judul");

if (judul) {

    const parameter = new URLSearchParams(window.location.search);
    const jenis = parameter.get("jenis");
    const penjelasan = document.getElementById("penjelasan");
    const card = document.getElementById("contoh-card");

    if(jenis == "organik"){
        // isi organik
    }

    if(jenis == "anorganik"){
        // isi anorganik
    }

    if(jenis == "b3"){
        // isi b3
    }

}

if(jenis == "organik"){
judul.innerHTML="Sampah Organik";
penjelasan.innerHTML="Sampah organik berasal dari makhluk hidup dan mudah terurai.";
card.innerHTML=`

<div class="card">
<img src="img/sisa-makanan.png">
<h3>Sisa Makanan</h3>
</div>

<div class="card">
<img src="img/daun-kering.png">
<h3>Daun Kering</h3>
</div>

<div class="card">
<img src="img/kulit-buah.png">
<h3>Kulit Buah</h3>
</div>
`;
}

if(jenis == "anorganik"){
judul.innerHTML="Sampah Anorganik";
penjelasan.innerHTML="Sampah yang sulit terurai namun dapat didaur ulang.";
card.innerHTML=`

<div class="card">
<img src="img/botol-plastik.png">
<h3>Botol Plastik</h3>
</div>

<div class="card">
<img src="img/kaleng.png">
<h3>Kaleng</h3>
</div>

<div class="card">
<img src="img/kertas.png">
<h3>Kertas</h3>
</div>
`;
}

if(jenis == "b3"){
judul.innerHTML="Sampah B3";
penjelasan.innerHTML="Sampah yang mengandung bahan berbahaya dan beracun.";
card.innerHTML=`

<div class="card">
<img src="img/baterai.png">
<h3>Baterai Bekas</h3>
</div>

<div class="card">
<img src="img/lampu.png">
<h3>Lampu Bekas</h3>
</div>

<div class="card">
<img src="img/oli.png">
<h3>Oli Bekas</h3>
</div>
`;
}