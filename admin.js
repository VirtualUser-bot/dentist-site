auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('admin-panel').style.display = 'block';
        renderAdminServices();
    }
});

function renderAdminServices() {
    db.collection("services").orderBy("name").onSnapshot(snapshot => {
        const adminList = document.getElementById('admin-services-list');
        adminList.innerHTML = '';
        
        snapshot.forEach(doc => {
            const service = doc.data();
            const div = document.createElement('div');
            div.className = 'admin-service-item';
            div.innerHTML = `
                <span>${service.name} - ${service.price} грн</span>
                <button onclick="deleteService('${doc.id}')">Видалити</button>
            `;
            adminList.appendChild(div);
        });
    });
}

document.getElementById('add-service-btn').addEventListener('click', () => {
    const name = document.getElementById('service-name').value;
    const price = document.getElementById('service-price').value;
    
    if (name && price) {
        db.collection("services").add({
            name: name,
            price: Number(price)
        });
        
        document.getElementById('service-name').value = '';
        document.getElementById('service-price').value = '';
    } else {
        alert("Заповніть всі поля!");
    }
});

function deleteService(id) {
    if (confirm("Видалити послугу?")) {
        db.collection("services").doc(id).delete();
    }
}
