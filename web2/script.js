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

    const response = await fetch("https://callo-buddy-backend--ibnuhilmi.replit.app", {
    method: "POST",
    body: formData
    });

    const data = await response.json();

    if (!response.ok) {
    resultDiv.innerHTML = `<div class="card"><p>❌ ${data.error}</p></div>`;
    return;
    }

    resultDiv.innerHTML = `<div class="card"><p>${data.result}</p></div>`;
}