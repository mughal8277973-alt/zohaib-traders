const API_URL = "http://127.0.0.1:5000"; // IP address use kiya hai taake masla na ho

document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log("Fetching images from server...");
        const res = await fetch(`${API_URL}/api/products`);
        
        if (!res.ok) throw new Error('Server response not ok');
        
        const images = await res.json();
        const list = document.getElementById('product-list');
        
        if (images.length === 0) {
            list.innerHTML = "<h2>Images folder khali hai! Apni photos 'images' folder mein dalein.</h2>";
            return;
        }

        list.innerHTML = '';
        images.forEach(img => {
            const name = img.split('.')[0].replace(/-/g, ' ');
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${API_URL}/images/${img}" alt="${name}" onerror="this.src='https://via.placeholder.com/200?text=Image+Not+Found'">
                <h3>${name}</h3>
                <button class="order-btn" onclick="orderNow('${name}')">Order Now</button>
            `;
            list.appendChild(card);
        });
        console.log("Images loaded successfully!");
    } catch (e) { 
        console.error("Error:", e);
        document.getElementById('product-list').innerHTML = "<h2>Images load nahi ho rahi. Check karein ke node server.js chal raha hai?</h2>";
    }
});

function orderNow(name) {
    const phone = "923026319078"; 
    const msg = `Assalam-o-Alaikum Zohaib Traders, mujhe ye product chahiye: ${name.toUpperCase()}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function searchProducts() {
    let filter = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(filter) ? "" : "none";
    });
}