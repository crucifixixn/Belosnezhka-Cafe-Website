import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        comment: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Отправляем запрос на локальный PHP-обработчик на Руцентре
            const response = await fetch('/send.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || 'Ошибка при отправке');
            }

            setSubmitStatus('success');
            setTimeout(() => {
                onClose();
                setSubmitStatus('idle');
                setFormData({
                    name: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: 2,
                    comment: '',
                });
            }, 2000);
        } catch (error) {
            console.error('Booking error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'guests' ? parseInt(value, 10) : value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Заголовок */}
                <div className="bg-gradient-to-r from-amber-700 to-amber-900 px-6 py-5 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-serif font-bold">Бронирование столика</h3>
                        <p className="text-amber-100 text-sm mt-0.5">Кафе «Белоснежка»</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    {submitStatus === 'success' && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3">
                            <CheckCircle className="text-emerald-600 flex-shrink-0" size={24} />
                            <div>
                                <p className="font-medium">Заявка успешно отправлена!</p>
                                <p className="text-sm text-emerald-600">Мы свяжемся с вами для подтверждения брони.</p>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3">
                            <AlertCircle className="text-rose-600 flex-shrink-0" size={24} />
                            <div>
                                <p className="font-medium">Не удалось отправить заявку</p>
                                <p className="text-sm text-rose-600">Пожалуйста, попробуйте еще раз или позвоните нам.</p>
                            </div>
                        </div>
                    )}

                    {/* Имя */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Ваше имя *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Как к вам обращаться?"
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Телефон */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Номер телефона *
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+7 (___) ___-__-__"
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Дата и Время */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                Дата *
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                Время *
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                <input
                                    type="time"
                                    name="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Количество гостей */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Количество гостей
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                            <select
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all text-sm appearance-none"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                                    </option>
                                ))}
                                <option value={9}>9+ гостей (банкет)</option>
                            </select>
                        </div>
                    </div>

                    {/* Комментарий */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Пожелания или комментарий
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3.5 top-3 text-stone-400" size={18} />
                            <textarea
                                name="comment"
                                rows={2}
                                value={formData.comment}
                                onChange={handleChange}
                                placeholder="Столик у окна, детский стульчик и др."
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all text-sm resize-none"
                            />
                        </div>
                    </div>

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Отправка...' : 'Забронировать столик'}
                    </button>
                </form>
            </div>
        </div>
    );
};