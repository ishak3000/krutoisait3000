document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const responseDiv = document.getElementById('formResponse');

    if (!form) return;

    form.addEventListener('submit', async function(e) { 
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !message) {
            responseDiv.innerHTML = '<p class="error-msg">Заполните все поля формы.</p>';
            return;
        }

        if (!emailRegex.test(email)) {
            responseDiv.innerHTML = '<p class="error-msg">Неверно введен email.</p>';
            return;
        }

        try {
            const response = await fetch('http://158.160.142.81:8083/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    comment: message
                })
            });

            if (response.ok) {
                const successHtml = `
                    <div class="success-msg">
                        <h3>Запрос отправлен!</h3>
                        <p>Привет, <strong>${name}</strong>!</p>
                        <p>Мы ответим на почту ${email} скоро.</p>
                    </div>
                `;
                responseDiv.innerHTML = successHtml;
                form.reset();
            } else {
                responseDiv.innerHTML = '<p class="error-msg">Ошибка сервера. Попробуйте позже.</p>';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            responseDiv.innerHTML = '<p class="error-msg">Не удалось соединиться с сервером.</p>';
        }
    });
});
