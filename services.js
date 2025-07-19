function renderServices() {
    db.collection("services").orderBy("name").onSnapshot(snapshot => {
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';
        
        snapshot.forEach(doc => {
            const service = doc.data();
            const li = document.createElement('li');
            li.className = 'service-item';
            li.innerHTML = `
                <span class="service-name">${service.name}</span>
                <span class="service-price">${service.price} грн</span>
            `;
            servicesList.appendChild(li);
        });
    });
}

document.addEventListener('DOMContentLoaded', renderServices);
