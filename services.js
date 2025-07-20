document.addEventListener('DOMContentLoaded', () => {
    const servicesList = document.getElementById('services-list');

    // Повний перелік послуг
    const servicesData = [
        // Терапевтична стоматологія
        {
            id: 'caries-treatment',
            icon: '🦷',
            title: 'Лікування карієсу',
            price: 'від 1200 грн',
            description: 'Безболісне пломбування сучасними матеріалами',
            details: [
                'Використання фотополімерів',
                'Гарантія на пломби до 5 років',
                'Тривалість: 30-60 хв'
            ]
        },
        {
            id: 'endodontics',
            icon: '🧬',
            title: 'Ендодонтичне лікування',
            price: 'від 2500 грн',
            description: 'Лікування кореневих каналів',
            details: [
                'Мікроскопне лікування',
                'Безболісна анестезія',
                'Гарантія якості'
            ]
        },

        // Хірургічна стоматологія
        {
            id: 'tooth-extraction',
            icon: '⚔️',
            title: 'Видалення зуба',
            price: 'від 1500 грн',
            description: 'Атравматичне видалення',
            details: [
                'Складні випадки (ретиновані зуби)',
                'Швидке загоєння',
                'Консультація включена'
            ]
        },
        {
            id: 'implantation',
            icon: '🦴',
            title: 'Імплантація',
            price: 'від 10000 грн',
            description: 'Преміум-імпланти з гарантією',
            details: [
                'Швейцарські та корейські системи',
                'Одноетапна процедура',
                'Гарантія до 10 років'
            ]
        },

        // Відбілювання та гігієна
        {
            id: 'whitening',
            icon: '✨',
            title: 'Відбілювання Zoom',
            price: 'від 1500 грн',
            description: 'Професійне відбілювання за 1 візит',
            details: [
                'Ефект до 8 тонів світліше',
                'Безпечно для емалі',
                'Результат тримається 1-2 роки'
            ]
        },
        {
            id: 'cleaning',
            icon: '🧼',
            title: 'Професійна чистка',
            price: 'від 800 грн',
            description: 'Комплексна гігієна порожнини рота',
            details: [
                'Ultrasonic + AirFlow',
                'Полірування пастами',
                'Рекомендується раз на 6 місяців'
            ]
        },

        // Ортодонтія
        {
            id: 'braces',
            icon: '🔗',
            title: 'Брекет-системи',
            price: 'від 20000 грн',
            description: 'Вирівнювання зубного ряду',
            details: [
                'Металічні/керамічні брекети',
                'Індивідуальний план лікування',
                'Безкоштовні корекції'
            ]
        },
        {
            id: 'aligners',
            icon: '👄',
            title: 'Елайнери Invisalign',
            price: 'від 35000 грн',
            description: 'Незримі каппи для вирівнювання',
            details: [
                'Знімні конструкції',
                'Комфортніше за брекети',
                'Термін лікування: 6-18 місяців'
            ]
        },

        // Дитяча стоматологія
        {
            id: 'kids-dentistry',
            icon: '👶',
            title: 'Лікування дітей',
            price: 'від 900 грн',
            description: 'Безстресовий підхід',
            details: [
                'Ігрова форма лікування',
                'Кольорові пломби',
                'Седація для тривожних дітей'
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
            serviceItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('book-service')) {
                    const details = serviceItem.querySelector('.service-details');
                    details.hidden = !details.hidden;
                }
            });

            servicesList.appendChild(serviceItem);
        });
    }

    // Обробник запису на послугу
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-service')) {
            const serviceId = e.target.dataset.service;
            const service = servicesData.find(s => s.id === serviceId);
            alert(`Запис на ${service.title}. Очікуйте дзвінка для підтвердження!`);
            // Тут можна додати логіку запису через Firebase/API
        }
    });

    // Ініціалізація
    renderServices();
});
