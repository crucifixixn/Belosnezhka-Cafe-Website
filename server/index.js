require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const VK_TOKEN = process.env.VK_ACCESS_TOKEN;
const VK_USER_ID = process.env.VK_USER_ID;

console.log('====================================');
console.log('СТАТУС НАСТРОЕК ВКОНТАКТЕ:');
console.log('VK Token:   ', VK_TOKEN ? 'Загружен' : 'ОШИБКА: НЕ НАЙДЕН');
console.log('VK User ID: ', VK_USER_ID ? VK_USER_ID : 'ОШИБКА: НЕ НАЙДЕН');
console.log('====================================\n');

app.post('/api/bookings', async (req, res) => {
    console.log('>>> [1] Получен запрос с сайта!');
    console.log('Данные формы:', req.body);

    const { name, phone, date, time, guests, comment } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ error: 'Укажите имя и телефон.' });
    }

    if (!VK_TOKEN || !VK_USER_ID) {
        console.log('>>> [ОШИБКА] Токен или ID пользователя VK не заданы в .env!');
        return res.status(500).json({ error: 'Сервер не настроен для работы с ВК.' });
    }

    const messageText = `
🍽 Новая заявка на бронь!

👤 Имя: ${name}
📞 Телефон: ${phone}
📅 Дата: ${date || 'Не указана'}
⏰ Время: ${time || 'Не указано'}
👥 Гостей: ${guests || 'Не указано'}
💬 Комментарий: ${comment || '—'}
  `.trim();

    try {
        console.log('>>> [2] Отправка сообщения в VK API...');

        // Используем официальный метод messages.send от имени сообщества
        const vkUrl = `https://api.vk.com/method/messages.send`;
        const params = new URLSearchParams({
            access_token: VK_TOKEN,
            user_id: VK_USER_ID,
            message: messageText,
            random_id: Math.floor(Math.random() * 1000000000),
            v: '5.131' // Актуальная версия API VK
        });

        const vkRes = await fetch(vkUrl, {
            method: 'POST',
            body: params
        });

        const data = await vkRes.json();

        if (data.error) {
            console.log('>>> [ОШИБКА ОТ VK API]:', data.error);
            return res.status(500).json({ error: data.error.error_msg });
        }

        console.log('>>> [3] УСПЕХ! Сообщение отправлено в личные сообщения ВКонтакте.\n');
        return res.json({ success: true });
    } catch (err) {
        console.log('>>> [ОШИБКА СЕТИ]:', err.message);
        return res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер слушает: http://localhost:${PORT}`);
});