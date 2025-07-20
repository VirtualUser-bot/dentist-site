document.addEventListener('DOMContentLoaded', () => {
    const servicesList = document.getElementById('services-list');
    const bookingBtn = document.getElementById('booking-btn');
    
    // Дані послуг (можна винести в окремий файл або отримувати з Firestore)
    const servicesData = [
        {
            id: 'whitening',
            icon: '🦷',
            title: 'Відбілювання зубів',
            price: 'від 1500 грн',
            description: 'Професійне відбілювання системою Zoom',
            details: [
                'Ефект до 8 тонів світліше',
                'Безпечно для емалі',
                'Тривалість: 1-1.5 год'
            ]
        },
        {
            id: 'cleaning',
            icon: '🧼',
            title: 'Професійна чистка',
            price: 'від 800 грн',
            description: 'Комплексна гігієна порожнини рота',
            details: [
                'Видалення зубного каменю',
                'Полірування емалі',
                'Рекомендується раз на 6 місяців'
            ]
        },
        {
            id: 'implantation',
            icon: '🦷',
            title: 'Імплантація',
            price: 'від 10000 грн',
            description: 'Відновлення зубів преміум-імплантами',
            details: [
                'Гарантія до 10 років',
                'Безболісна процедура',
                'Індивідуальний підбір'
            ]
        }
    ];

    // Рендер послуг
    function renderServices() {
        servicesList.innerHTML = '';
        
        servicesData.forEach(service => {
            const serviceItem = document.createElement('li');
            serviceItem.className = 'service-item';
            serviceItem.innerHTML = `
                <div class="service-info">
                    <span class="service-icon">${service.icon}</span>
                    <div>
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                </div>
                <div class="service-price">${service.price}</div>
                <div class="service-details" id="details-${service.id}" hidden>
                    <ul>
                        ${service.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                    <button class="book-service" data-service="${service.id}">Записатися</button>
                </div>
            `;
            
            // Обробник кліку для розгортання деталей
            serviceItem.addEventListener('click', () => {
                const details = serviceItem.querySelector('.service-details');
                details.hidden = !details.hidden;
            });
            
            servicesList.appendChild(serviceItem);
        });
    }

    // Обробник запису на послугу
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-service')) {
            const serviceId = e.target.dataset.service;
            const service = servicesData.find(s => s.id === serviceId);
            alert(`Запис на ${service.title}. Ми зв'яжемося з вами!`);
            // Тут можна додати логіку запису через Firebase
        }
    });

    // Ініціалізація
    renderServices();
});
