function showMenu() {
    document.getElementById("menuSection").classList.add("active");
    document.getElementById("scanSection").classList.remove("active");
}

function showScan() {
    document.getElementById("scanSection").classList.add("active");
    document.getElementById("menuSection").classList.remove("active");
}

async function scanFood() {
    const input = document.getElementById("imageInput");
    const resultDiv = document.getElementById("result");

    if (!input.files.length) {
        alert("Pilih gambar dulu!");
        return;
    }

    const formData = new FormData();
    formData.append("image", input.files[0]);

    resultDiv.innerHTML = "⏳ Sedang memproses...";

    const response = await fetch("/scan", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    resultDiv.innerHTML = `<div class="card"><p>${data.result}</p></div>`;
}