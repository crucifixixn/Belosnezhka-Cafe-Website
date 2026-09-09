import { useState, useEffect, useRef } from "react";
import Plyr from "plyr";

import imgHero from "@/imports/images_1.png";
import videoExterior from "@/imports/WhatsApp_Video_2026-08-11_at_18.10.31.mp4";
import imgHeroOld from "@/imports/images.jpg";
import imgAbout from "@/imports/78fbcdfe1f953147d3df00cc39271f49.jpeg.jpg";
import imgCocktailsWide from "@/imports/zUkhRB7wYUE.jpg";
import imgExterior from "@/imports/____________.jpg";
import imgWeddingHall from "@/imports/images__1_.jpg";
// меню — базовые фото
import imgMenuShashlik from "@/imports/images__3__1.png";
import imgMenuPlatter from "@/imports/images__2__1.png";
import imgMenuCocktails from "@/imports/zUkhRB7wYUE_1.png";
import imgMenuBanquet from "@/imports/78fbcdfe1f953147d3df00cc39271f49.jpeg_1.png";

// подлинные фотографии блюд кафе «Белоснежка»
import foodShashlikPork from "@/imports/food/shashlik_pork_platter.jpg";
import foodShashlikChicken from "@/imports/food/shashlik_chicken.jpg";
import foodShashlikChickenVeg from "@/imports/food/shashlik_chicken_veg.jpg";
import foodLyulyaBeef from "@/imports/food/lyulya_beef.jpg";
import foodLyulyaChicken from "@/imports/food/lyulya_chicken.jpg";
import foodLyulyaPromo from "@/imports/food/lyulya_promo.jpg";
import foodSteakSalmon from "@/imports/food/steak_salmon.jpg";
import foodSteakBeefPotato from "@/imports/food/steak_beef_potato.jpg";
import foodSteakBeefRibeye from "@/imports/food/steak_beef_ribeye.jpg";
import foodSteakPork from "@/imports/food/steak_pork.jpg";
import foodSteakPork2 from "@/imports/food/steak_pork_2.jpg";
import foodSadzhAssorti from "@/imports/food/sadzh_assorti.jpg";
import foodFishPlate from "@/imports/food/fish_plate.jpg";
import foodMeatPlate from "@/imports/food/meat_plate.jpg";
import foodCaesarRoll from "@/imports/food/caesar_roll_baked.jpg";
import foodDishDragon from "@/imports/food/dish_dragon.jpg";
import foodZharkoeArmenia from "@/imports/food/zharkoe_armenia.jpg";
import foodPorkRibsVeg from "@/imports/food/pork_ribs_veg.jpg";
import foodPorkMushroomSauce from "@/imports/food/pork_mushroom_sauce.jpg";
import foodChickenFestive from "@/imports/food/chicken_festive.jpg";
import foodPizzaGribnaya from "@/imports/food/pizza_gribnaya.jpg";
import foodPizzaGavayskaya from "@/imports/food/pizza_gavayskaya.jpg";
import foodPizzaMargarita from "@/imports/food/pizza_margarita.jpg";
import foodCocktails5 from "@/imports/food/bar_cocktails_5.jpg";
import foodCocktails7 from "@/imports/food/bar_cocktails_7.jpg";
import foodBanquetTable from "@/imports/food/banquet_table_top.jpg";
import foodBanquetHall from "@/imports/food/banquet_hall_wide.jpg";

const NAV_LINKS = [
    { label: "Меню", href: "#menu" },
    { label: "Акции", href: "#promotions" },
    { label: "О нас", href: "#about" },
    { label: "Галерея", href: "#gallery" },
    { label: "Контакты", href: "#contacts" },
];

const ENHANCE_WARM = "contrast(1.12) saturate(1.2) brightness(1.06)";
const ENHANCE_FOOD = "contrast(1.15) saturate(1.25) brightness(1.04)";
const ENHANCE_DARK = "contrast(1.08) saturate(1.1) brightness(1.1)";
const ENHANCE_EXTERN = "contrast(1.1) saturate(1.1) brightness(1.05)";

type Dish = {
    name: string;
    weight?: string;
    price: string;
    note?: string;
    description?: string;
    img?: string;
    tag?: string;
};

type MenuItem = {
    name: string;
    description: string;
    price: string;
    tag: string;
    img: string;
    filter: string;
    pos: string;
    dishes: Dish[];
};

// 4 карточки быстрого просмотра в шапке секции "Меню"
const FEATURED_MENU_CARDS: MenuItem[] = [
    {
        name: "Шашлык на мангале",
        description: "Сочный шашлык из свинины, курицы или крыльев, люля-кебабы и стейки на открытом огне.",
        price: "от 300 ₽",
        tag: "Хит",
        img: foodShashlikPork,
        filter: "contrast(1.08) saturate(1.18) brightness(1.0)",
        pos: "center 40%",
        dishes: [
            { name: "Шашлык свиной", weight: "100 г", price: "400 ₽", img: foodShashlikPork },
            { name: "Шашлык куриный", weight: "100 г", price: "350 ₽", img: foodShashlikChicken },
            { name: "Шашлык из курицы с овощами", weight: "100 г", price: "350 ₽", img: foodShashlikChickenVeg },
            { name: "Шашлык из крыльев", weight: "100 г", price: "300 ₽", img: foodShashlikChicken },
            { name: "Люля-кебаб с говядиной", weight: "100 г", price: "350 ₽", img: foodLyulyaBeef },
            { name: "Люля-кебаб куриный", weight: "100 г", price: "300 ₽", img: foodLyulyaChicken },
            { name: "Стейк из сёмги", weight: "100 г", price: "650 ₽", img: foodSteakSalmon },
            { name: "Стейк из говядины", weight: "100 г", price: "650 ₽", img: foodSteakBeefRibeye },
            { name: "Стейк из свинины", weight: "100 г", price: "450 ₽", img: foodSteakPork },
            { name: "Садж фирменный (на компанию)", weight: "1200 г", price: "3200 ₽", img: foodSadzhAssorti },
        ],
    },
    {
        name: "Холодные и горячие закуски",
        description: "Праздничные нарезки деликатесов, сырные и рыбные тарелки, креветки и рулетики из баклажана.",
        price: "от 200 ₽",
        tag: "Фирменное",
        img: foodMeatPlate,
        filter: "contrast(1.12) saturate(1.15) brightness(0.95)",
        pos: "center 45%",
        dishes: [
            { name: "Рыбная тарелка", weight: "250 г", price: "850 ₽", img: foodFishPlate },
            { name: "Мясная тарелка", weight: "250 г", price: "800 ₽", img: foodMeatPlate },
            { name: "Сырная тарелка", weight: "250 г", price: "700 ₽" },
            { name: "Сельдь с гарниром", weight: "500 г", price: "700 ₽" },
            { name: "Креветки в пикантном соусе", weight: "175 г", price: "750 ₽" },
            { name: "Цезарь-ролл запечённый", weight: "150 г", price: "450 ₽", img: foodCaesarRoll },
            { name: "Закуска «Мексиканская»", weight: "190 г", price: "500 ₽" },
            { name: "Овощная тарелка", weight: "250 г", price: "400 ₽" },
            { name: "Фруктовая тарелка", weight: "250 г", price: "350 ₽" },
            { name: "Рулеты из баклажана", weight: "150 г", price: "350 ₽" },
        ],
    },
    {
        name: "Бар и Коктейли",
        description: "Авторские коктейли, шоты, свежие лимонады, разливное и бутылочное пиво.",
        price: "от 250 ₽",
        tag: "Бар",
        img: foodCocktails7,
        filter: "contrast(1.08) saturate(1.12) brightness(0.96)",
        pos: "center 60%",
        dishes: [
            { name: "Лонг Айленд", weight: "300 мл", price: "700 ₽", note: "кола, сироп, джин, ром, текила, водка", img: foodCocktails5 },
            { name: "Текила Санрайз", weight: "300 мл", price: "600 ₽", note: "апельсиновый сок, гренадин, текила", img: foodCocktails7 },
            { name: "Джон Коллинз", weight: "300 мл", price: "600 ₽", note: "джин, сахарный сироп, содовая", img: foodCocktails5 },
            { name: "Мохито", weight: "300 мл", price: "600 ₽", note: "ром, содовая, сироп мохито, лайм, мята", img: foodCocktails7 },
            { name: "Виски с колой", weight: "300 мл", price: "600 ₽", img: foodCocktails7 },
            { name: "Голубая лагуна", weight: "300 мл", price: "550 ₽", img: foodCocktails5 },
            { name: "Шоты (Баунти / Баблгам / Энерджи)", weight: "50 мл", price: "250 ₽", img: foodCocktails5 },
            { name: "Апельсиновый лимонад (б/а)", weight: "300 мл", price: "350 ₽", img: foodCocktails5 },
            { name: "Молочный коктейль в ассортименте", weight: "300 мл", price: "300 ₽" },
        ],
    },
    {
        name: "Банкетный стол",
        description: "Сервировка любого торжества до 150 мест: юбилеи, свадьбы, дни рождения и поминальные обеды.",
        price: "от 2200 ₽/чел.",
        tag: "Торжества",
        img: foodBanquetHall,
        filter: "contrast(1.12) saturate(1.22) brightness(0.92)",
        pos: "center 55%",
        dishes: [
            { name: "Бизнес-ланч (пн–пт, 12:00–18:00)", price: "от 250 ₽/чел.", img: foodBanquetTable },
            { name: "Банкет", price: "от 2200 ₽/чел.", img: foodBanquetTable },
            { name: "Свадебный банкет", price: "от 3000 ₽/чел.", img: foodBanquetHall },
            { name: "Поминальный обед", price: "от 800 ₽/чел.", img: foodBanquetTable },
            { name: "Детский праздник", price: "от 900 ₽/чел.", img: foodBanquetTable },
        ],
    },
];

// ─── Полный каталог меню со столбцами и мобильным порядком ─────────────────

type MenuSection = {
    title: string;
    items: Dish[];
    col: 1 | 2;
    orderMobile?: number;
};

type MenuCategory = {
    id: string;
    title: string;
    sections: MenuSection[];
};

type CategoryMeta = {
    id: string;
    label: string;
    badge?: string;
    heroImg: string;
    tagline: string;
};

const MENU_CATEGORIES_META: CategoryMeta[] = [
    {
        id: "mangal",
        label: "Мангал и Стейки",
        badge: "Хит",
        heroImg: foodShashlikPork,
        tagline: "Сочные блюда на открытом огне, традиционный кавказский шашлык, люля-кебабы, стейки и садж на компанию из отборного мяса и рыбы",
    },
    {
        id: "salads",
        label: "Салаты",
        heroImg: imgHero,
        tagline: "Свежие фирменные и классические салаты со свежими овощами, птицей, морепродуктами и авторскими заправками",
    },
    {
        id: "starters",
        label: "Холодные и горячие закуски",
        heroImg: foodMeatPlate,
        tagline: "Холодные банкетные тарелки, нарезки мясных и рыбных деликатесов, сырные плато, горячие закуски, запечённые роллы и снеки",
    },
    {
        id: "hot",
        label: "Первые и Вторые блюда",
        heroImg: foodZharkoeArmenia,
        tagline: "Наваристые супы, сытная солянка, домашнее жаркое, вторые горячие блюда русской и армянской кухни, аппетитные гарниры и свежая выпечка",
    },
    {
        id: "pizza_sauces",
        label: "Пицца и Соусы",
        heroImg: foodPizzaGribnaya,
        tagline: "Горячая фирменная пицца на тонком тесте с хрустящим бортиком, тягучим сыром моцарелла и домашние соусы от шеф-повара",
    },
    {
        id: "tea_coffee",
        label: "Чай, Кофе и Мороженое",
        heroImg: imgHeroOld,
        tagline: "Традиционные чайные наборы с мёдом и сухофруктами, натуральный кофе, гляссе, горячий шоколад и освежающий пломбир",
    },
    {
        id: "bar",
        label: "Барная карта и Напитки",
        heroImg: foodCocktails7,
        tagline: "Авторские коктейли, шоты, богатый выбор благородных крепких напитков, вин, разливного пива, а также лимонады и соки",
    },
    {
        id: "banquet",
        label: "Банкеты и Торжества",
        badge: "до 150 мест",
        heroImg: foodBanquetHall,
        tagline: "Полная банкетная сервировка любого торжества до 150 посадочных мест: свадьбы, юбилеи, дни рождения и корпоративы",
    },
];

const FULL_CATALOG: MenuCategory[] = [
    {
        id: "mangal",
        title: "Мангал и Стейки",
        sections: [
            {
                title: "Шашлыки на мангале",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Шашлык свиной", weight: "100 г", price: "400 ₽", img: foodShashlikPork },
                    { name: "Шашлык куриный", weight: "100 г", price: "350 ₽", img: foodShashlikChicken },
                    { name: "Шашлык из курицы с овощами", weight: "100 г", price: "350 ₽", img: foodShashlikChickenVeg },
                    { name: "Шашлык из крыльев", weight: "100 г", price: "300 ₽", img: foodShashlikChicken },
                    { name: "Люля-кебаб с говядиной", weight: "100 г", price: "350 ₽", img: foodLyulyaBeef },
                    { name: "Люля-кебаб куриный", weight: "100 г", price: "300 ₽", img: foodLyulyaChicken },
                ],
            },
            {
                title: "Стейки и Садж",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Стейк из сёмги", weight: "100 г", price: "650 ₽", img: foodSteakSalmon },
                    { name: "Стейк из говядины", weight: "100 г", price: "650 ₽", img: foodSteakBeefRibeye },
                    { name: "Стейк из свинины", weight: "100 г", price: "450 ₽", img: foodSteakPork },
                    { name: "Садж фирменный на компанию", weight: "1200 г", price: "3200 ₽", img: foodSadzhAssorti },
                ],
            },
        ],
    },
    {
        id: "salads",
        title: "Салаты",
        sections: [
            {
                title: "Мясные и Овощные",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Салат «Белоснежка» (фирменный)", weight: "150 г", price: "400 ₽" },
                    { name: "Цезарь с курицей", weight: "150 г", price: "450 ₽" },
                    { name: "Греческий", weight: "150 г", price: "500 ₽" },
                    { name: "С хрустящим баклажаном", weight: "150 г", price: "500 ₽" },
                    { name: "Оригинальный", weight: "150 г", price: "500 ₽" },
                    { name: "Версаль", weight: "150 г", price: "500 ₽" },
                    { name: "Римский", weight: "150 г", price: "400 ₽" },
                    { name: "Матадор", weight: "150 г", price: "500 ₽" },
                    { name: "Салат «Легкий»", weight: "150 г", price: "550 ₽" },
                ],
            },
            {
                title: "Рыбные и Деликатесные",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Цезарь с креветками", weight: "150 г", price: "550 ₽" },
                    { name: "Цезарь с сёмгой", weight: "150 г", price: "500 ₽" },
                    { name: "Парус", weight: "150 г", price: "500 ₽" },
                    { name: "Царский", weight: "150 г", price: "500 ₽" },
                    { name: "Лагуна", weight: "150 г", price: "500 ₽" },
                    { name: "Престиж", weight: "150 г", price: "450 ₽" },
                    { name: "Салат «Каприз»", weight: "150 г", price: "450 ₽" },
                    { name: "Салат «Микс»", weight: "150 г", price: "500 ₽" },
                ],
            },
        ],
    },
    {
        id: "starters",
        title: "Холодные и горячие закуски",
        sections: [
            {
                title: "Холодные закуски и тарелки",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Рыбная тарелка", weight: "250 г", price: "850 ₽", img: foodFishPlate },
                    { name: "Мясная тарелка", weight: "250 г", price: "800 ₽", img: foodMeatPlate },
                    { name: "Сырная тарелка", weight: "250 г", price: "700 ₽" },
                    { name: "Сельдь с гарниром", weight: "500 г", price: "700 ₽" },
                    { name: "Овощная тарелка", weight: "250 г", price: "400 ₽" },
                    { name: "Фруктовая тарелка", weight: "250 г", price: "350 ₽" },
                    { name: "Рулеты из баклажана", weight: "150 г", price: "350 ₽" },
                    { name: "Закуска «Мексиканская»", weight: "190 г", price: "500 ₽" },
                ],
            },
            {
                title: "Горячие закуски и снеки",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Креветки в пикантном соусе", weight: "175 г", price: "750 ₽" },
                    { name: "Цезарь-ролл запечённый", weight: "150 г", price: "450 ₽", img: foodCaesarRoll },
                    { name: "Конвертики с курицей", weight: "170 г", price: "400 ₽" },
                    { name: "Конвертики с грибами", weight: "170 г", price: "350 ₽" },
                    { name: "Сырные палочки", weight: "100 г", price: "250 ₽" },
                    { name: "Наггетсы куриные", weight: "100 г", price: "200 ₽" },
                    { name: "Луковые кольца", weight: "100 г", price: "200 ₽" },
                    { name: "Гренки с чесноком", weight: "100 г", price: "200 ₽" },
                ],
            },
        ],
    },
    {
        id: "hot",
        title: "Первые и Вторые блюда",
        sections: [
            {
                title: "Первые блюда",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Солянка сборная мясная", weight: "250 г", price: "320 ₽" },
                    { name: "Пельмени с бульоном", weight: "200 г", price: "300 ₽" },
                    { name: "Бульон с фрикадельками", weight: "200 г", price: "300 ₽" },
                    { name: "Лапша домашняя с курицей", weight: "200/50 г", price: "250 ₽" },
                ],
            },
            {
                title: "Вторые блюда",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Чанахи с говядиной", weight: "250 г", price: "750 ₽", img: foodZharkoeArmenia },
                    { name: "Жаркое по-армянски", weight: "250 г", price: "650 ₽", img: foodZharkoeArmenia },
                    { name: "Свинина с овощами", weight: "150 г", price: "650 ₽", img: foodPorkRibsVeg },
                    { name: "Свинина в соусе с грибами", weight: "150 г", price: "630 ₽", img: foodPorkMushroomSauce },
                    { name: "Печень по-татарски", weight: "150 г", price: "600 ₽", img: foodSteakPork2 },
                    { name: "Куриная грудка с овощами", weight: "200 г", price: "550 ₽", img: foodShashlikChickenVeg },
                    { name: "Рагу овощное с курицей", weight: "250 г", price: "550 ₽" },
                    { name: "Китайский дракон", weight: "170 г", price: "500 ₽", img: foodDishDragon },
                    { name: "Курица по-гавайски", weight: "150 г", price: "500 ₽", img: foodChickenFestive },
                    { name: "Курица по-французски", weight: "150 г", price: "450 ₽", img: foodChickenFestive },
                    { name: "Дорадо запечённая", weight: "100 г", price: "450 ₽" },
                    { name: "Горбуша под овощами", weight: "150 г", price: "400 ₽" },
                    { name: "Удон с креветками", weight: "150 г", price: "400 ₽" },
                    { name: "Удон с курицей", weight: "150 г", price: "350 ₽" },
                    { name: "Удон с грибами", weight: "150 г", price: "350 ₽" },
                    { name: "Жареные пельмени с говядиной", weight: "150 г", price: "300 ₽" },
                    { name: "Жареные пельмени с курицей", weight: "150 г", price: "280 ₽" },
                ],
            },
            {
                title: "Гарниры",
                col: 1,
                orderMobile: 3,
                items: [
                    { name: "Булгур с овощами", weight: "200 г", price: "300 ₽" },
                    { name: "Овощи запечённые на огне", weight: "100 г", price: "250 ₽" },
                    { name: "Картофель с чесноком", weight: "150 г", price: "220 ₽", img: foodSteakBeefPotato },
                    { name: "Запечённый картофель", weight: "150 г", price: "200 ₽", img: foodSteakBeefPotato },
                    { name: "Фасоль стручковая", weight: "150 г", price: "200 ₽" },
                    { name: "Картофель фри", weight: "100 г", price: "170 ₽", img: foodLyulyaChicken },
                ],
            },
            {
                title: "Хлеб",
                col: 1,
                orderMobile: 4,
                items: [
                    { name: "Лаваш кавказский", weight: "100 г", price: "100 ₽" },
                    { name: "Булочка фирменная", weight: "60 г", price: "70 ₽" },
                    { name: "Булочка к супу", weight: "60 г", price: "20 ₽" },
                ],
            },
        ],
    },
    {
        id: "pizza_sauces",
        title: "Пицца и Соусы",
        sections: [
            {
                title: "Пицца",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Пицца «Пепперони»", weight: "фирменная", price: "550 ₽", img: foodPizzaMargarita },
                    { name: "Пицца «Грибная поляна»", weight: "фирменная", price: "550 ₽", img: foodPizzaGribnaya },
                    { name: "Пицца «Гавайская»", weight: "фирменная", price: "550 ₽", img: foodPizzaGavayskaya },
                    { name: "Пицца «Сырная»", weight: "фирменная", price: "550 ₽", img: foodPizzaMargarita },
                    { name: "Пицца «Маргарита»", weight: "фирменная", price: "500 ₽", img: foodPizzaMargarita },
                ],
            },
            {
                title: "Фирменные соусы",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Соус «Тар-тар»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Барбекю»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Чесночный»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Сырный»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Терияки»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Манго-чили»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Кавказский»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Гранатовый»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Соевый»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Кисло-сладкий»", weight: "30 г", price: "70 ₽" },
                    { name: "Соус «Сладкий чили»", weight: "30 г", price: "70 ₽" },
                ],
            },
        ],
    },
    {
        id: "tea_coffee",
        title: "Чай, Кофе и Мороженое",
        sections: [
            {
                title: "Чай и чайные наборы",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Чайный набор №2 (мед, изюм, лимон, курага, чернослив, сахар)", weight: "1500 мл", price: "850 ₽" },
                    { name: "Чайный набор №1 (мед, изюм, лимон, курага, чернослив, сахар)", weight: "500 мл", price: "350 ₽" },
                    { name: "Чай фруктово-ягодный в чайнике", weight: "1500 мл", price: "400 ₽" },
                    { name: "Чай фруктово-ягодный в чайнике", weight: "500 мл", price: "220 ₽" },
                    { name: "Чай с чабрецом в чайнике", weight: "1500 мл", price: "250 ₽" },
                    { name: "Чай с чабрецом в чайнике", weight: "500 мл", price: "170 ₽" },
                    { name: "Чай в чайнике", weight: "1500 мл", price: "250 ₽" },
                    { name: "Чай в чайнике", weight: "500 мл", price: "150 ₽" },
                    { name: "Чай с лимоном", weight: "150 мл", price: "70 ₽" },
                    { name: "Чай со сливками", weight: "150 мл", price: "70 ₽" },
                    { name: "Чай с сахаром", weight: "150 мл", price: "70 ₽" },
                ],
            },
            {
                title: "Кофе и горячие напитки",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Горячий шоколад", weight: "100 г", price: "190 ₽" },
                    { name: "Кофе натуральный «Гляссе»", weight: "50/100 г", price: "180 ₽" },
                    { name: "Кофе «Капучино» с корицей", weight: "150 г", price: "150 ₽" },
                    { name: "Кофе быстрорастворимый «Гляссе»", weight: "150/50 г", price: "150 ₽" },
                    { name: "Кофе быстрорастворимый «Капучино»", weight: "150 г", price: "130 ₽" },
                    { name: "Кофе по-турецки (натуральный)", weight: "50 г", price: "100 ₽" },
                    { name: "Кофе 3в1 «Нескафе»", weight: "150 г", price: "100 ₽" },
                    { name: "Кофе быстрорастворимый «Нескафе»", weight: "150 г", price: "90 ₽" },
                ],
            },
            {
                title: "Мороженое",
                col: 2,
                orderMobile: 3,
                items: [
                    { name: "Пломбир с шоколадом", weight: "100 г", price: "120 ₽" },
                    { name: "Пломбир с грецким орехом", weight: "100 г", price: "120 ₽" },
                    { name: "Пломбир классический", weight: "100 г", price: "100 ₽" },
                ],
            },
        ],
    },
    {
        id: "bar",
        title: "Барная карта и Напитки",
        sections: [
            {
                title: "Водка",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Водка «Белуга»", weight: "бут.", price: "2400 ₽" },
                    { name: "Водка «Русский стандарт»", weight: "бут.", price: "1600 ₽" },
                    { name: "Водка «Парламент»", weight: "бут.", price: "1400 ₽" },
                    { name: "Водка «AMG» (в ассортименте)", weight: "бут.", price: "1200 ₽" },
                    { name: "Водка «Хаски»", weight: "бут.", price: "1200 ₽" },
                    { name: "Водка «Зелёная марка»", weight: "бут.", price: "1200 ₽" },
                    { name: "Водка «Мягков» (в ассортименте)", weight: "бут.", price: "1100 ₽" },
                    { name: "Водка «Пять озёр»", weight: "бут.", price: "1100 ₽" },
                    { name: "Водка «Беленькая»", weight: "бут.", price: "1100 ₽" },
                    { name: "Водка «Нектар»", weight: "бут.", price: "1000 ₽" },
                    { name: "Водка «Золото Башкирии»", weight: "бут.", price: "1000 ₽" },
                ],
            },
            {
                title: "Коньяки",
                col: 1,
                orderMobile: 2,
                items: [
                    { name: "Коньяк «Арарат» 5*", weight: "бут.", price: "3600 ₽" },
                    { name: "Коньяк «Арарат» 3*", weight: "бут.", price: "3100 ₽" },
                    { name: "Коньяк «Армянский» 5*", weight: "бут.", price: "2500 ₽" },
                    { name: "Коньяк «Армянский» 3*", weight: "бут.", price: "2200 ₽" },
                    { name: "Коньяк «Французский стандарт» 5*", weight: "бут.", price: "1900 ₽" },
                    { name: "Коньяк «Французский стандарт» 3*", weight: "бут.", price: "1800 ₽" },
                ],
            },
            {
                title: "Виски",
                col: 1,
                orderMobile: 3,
                items: [
                    { name: "Виски «Jameson»", weight: "0,5 л", price: "6500 ₽" },
                    { name: "Виски «William Lawson's»", weight: "0,5 л", price: "4000 ₽" },
                    { name: "Виски «Bell's»", weight: "0,5 л", price: "3900 ₽" },
                    { name: "Виски «Fox & Dog's»", weight: "0,7 л", price: "2940 ₽" },
                    { name: "Виски «Fox & Dog's»", weight: "0,5 л", price: "2100 ₽" },
                ],
            },
            {
                title: "Вино, Игристые, Шампанское",
                col: 1,
                orderMobile: 4,
                items: [
                    { name: "Вино в ассортименте", weight: "бут.", price: "1000 ₽" },
                    { name: "Вино «Дербент»", weight: "бут.", price: "950 ₽" },
                    { name: "Вино «Санто Милано» в ассортименте", weight: "бут.", price: "950 ₽" },
                ],
            },
            {
                title: "Пиво",
                col: 2,
                orderMobile: 5,
                items: [
                    { name: "Пиво «Стелла артуа»", weight: "бут.", price: "350 ₽" },
                    { name: "Пиво «Хугарден»", weight: "бут.", price: "350 ₽" },
                    { name: "Пиво «Бланш»", weight: "бут.", price: "350 ₽" },
                    { name: "Пиво «Бад»", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Эфес»", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Козел» светлое / темное", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Эсса» в ассортименте", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Туборг»", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Кулер»", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «7-ка» в ассортименте", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Гарред» в ассортименте", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Жатецкий гусь»", weight: "бут.", price: "300 ₽" },
                    { name: "Пиво «Старый мельник»", weight: "бут.", price: "250 ₽" },
                    { name: "Пиво «Бад 0» безалкогольное", weight: "бут.", price: "250 ₽" },
                    { name: "Пиво «Балтика 0» безалкогольное", weight: "бут.", price: "250 ₽" },
                ],
            },
            {
                title: "Коктейли",
                col: 2,
                orderMobile: 6,
                items: [
                    { name: "Коктейль «Лонг Айленд»", weight: "300 мл", price: "700 ₽", note: "кола, сахарный сироп, джин, ром, текила, водка", img: foodCocktails5 },
                    { name: "Коктейль «Текила Санрайз»", weight: "300 мл", price: "600 ₽", note: "апельсиновый сок, гренадин, текила", img: foodCocktails7 },
                    { name: "Коктейль «Джон Коллинз»", weight: "300 мл", price: "600 ₽", note: "джин, сахарный сироп, содовая", img: foodCocktails5 },
                    { name: "Коктейль «Мохито»", weight: "300 мл", price: "600 ₽", note: "ром, содовая, сироп мохито, лайм, мята", img: foodCocktails7 },
                    { name: "Коктейль «Виски с колой»", weight: "300 мл", price: "600 ₽", note: "виски, кола", img: foodCocktails7 },
                    { name: "Коктейль «Голубая лагуна»", weight: "300 мл", price: "550 ₽", note: "водка, блю курасао, содовая", img: foodCocktails5 },
                ],
            },
            {
                title: "Шоты",
                col: 2,
                orderMobile: 7,
                items: [
                    { name: "Шот «Баунти»", weight: "50 мл", price: "250 ₽", note: "водка, ананасовый сок, кокосовый сироп", img: foodCocktails5 },
                    { name: "Шот «Баблгам»", weight: "50 мл", price: "250 ₽", note: "водка, клубника, вишневый сироп", img: foodCocktails5 },
                    { name: "Шот «Энерджи»", weight: "50 мл", price: "250 ₽", note: "водка, энергетик", img: foodCocktails5 },
                ],
            },
            {
                title: "Безалкогольные коктейли и напитки",
                col: 2,
                orderMobile: 8,
                items: [
                    { name: "Апельсиновый лимонад", weight: "300 мл", price: "350 ₽", note: "апельсин, сироп банана, содовая", img: foodCocktails5 },
                    { name: "Голубая лагуна (б/а)", weight: "300 мл", price: "250 ₽", note: "сироп блю кюрасао, спрайт", img: foodCocktails5 },
                    { name: "Молочный коктейль в ассортименте", weight: "300 мл", price: "300 ₽" },
                    { name: "Соки в ассортименте", weight: "1 л", price: "300 ₽" },
                    { name: "Кола", weight: "1 л", price: "250 ₽" },
                ],
            },
        ],
    },
    {
        id: "banquet",
        title: "Банкеты и Торжества",
        sections: [
            {
                title: "Обеды и Банкеты",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Бизнес-ланч (пн–пт, 12:00–18:00)", price: "от 250 ₽/чел.", img: foodBanquetTable },
                    { name: "Банкет", price: "от 2200 ₽/чел.", img: foodBanquetTable },
                ],
            },
            {
                title: "Торжественные события",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Свадебный банкет", price: "от 3000 ₽/чел.", img: foodBanquetHall },
                    { name: "Детский праздник", price: "от 900 ₽/чел.", img: foodBanquetTable },
                    { name: "Поминальный обед", price: "от 800 ₽/чел.", img: foodBanquetTable },
                ],
            },
        ],
    },
];

const GALLERY_IMGS = [
    { src: foodBanquetHall, alt: "Банкетный зал «Белоснежки» в праздничном убранстве", span: "col-span-2 row-span-2", pos: "center center", filter: ENHANCE_WARM },
    { src: foodCocktails7, alt: "Бар кафе — коктейли на стойке, зал с фресками на фоне", span: "col-span-1 row-span-1", pos: "center", filter: ENHANCE_DARK },
    { src: foodMeatPlate, alt: "Праздничная нарезка из рыбы и мясных деликатесов", span: "col-span-1 row-span-1", pos: "center 45%", filter: "contrast(1.12) saturate(1.15) brightness(0.95)" },
    { src: imgExterior, alt: "Фасад кафе «Белоснежка» в г. Октябрьский", span: "col-span-1 row-span-2", pos: "center", filter: ENHANCE_EXTERN },
    { src: foodShashlikPork, alt: "Сочный шашлык на углях от шеф-повара", span: "col-span-1 row-span-1", pos: "center center", filter: ENHANCE_FOOD },
];

// ─── Акции и спецпредложения ───────────────────────────────────────────────

type PromoItem = {
    id: string;
    category: "birthday" | "banquet" | "wedding";
    tag: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    bonus: string;
    actionLabel: string;
    actionType: "table" | "event";
};

const PROMOTIONS: PromoItem[] = [
    {
        id: "birthday",
        category: "birthday",
        tag: "Именинникам",
        badge: "-5%",
        title: "Скидка на День Рождения",
        subtitle: "Отпразднуйте с выгодой и размахом",
        description: "Дарим скидку 5% на всё меню кухни в ваш день рождения, а также 3 дня до и 3 дня после праздника. Живая музыка и поздравление от кафе.",
        bonus: "Праздничный фирменный десерт в комплемент каждому имениннику",
        actionLabel: "Забронировать",
        actionType: "table",
    },
    {
        id: "banquet",
        category: "banquet",
        tag: "Банкеты",
        badge: "до 150 мест",
        title: "Заказ банкета «Под ключ»",
        subtitle: "Юбилеи, праздники и памятные даты",
        description: "Индивидуальный расчет меню от 2200 ₽/чел. Вместительный зал с профессиональным световым и звуковым оборудованием, сценой и танцполом.",
        bonus: "Свои напитки и фрукты без пробкового сбора при заказе банкета",
        actionLabel: "Забронировать",
        actionType: "event",
    },
    {
        id: "wedding",
        category: "wedding",
        tag: "Свадьба",
        badge: "Подарок",
        title: "Свадебное торжество",
        subtitle: "Главный день в красивом банкетном зале",
        description: "Полная торжественная сервировка на 150 посадочных мест, декор цветами и текстилем, удобное зонирование для фотосессии и первого танца.",
        bonus: "Праздничный свадебный каравай и горка шампанского в подарок",
        actionLabel: "Забронировать",
        actionType: "event",
    },
];

// ─── Фоновое видео без звука ─────────────────────────────────────────────────

function SilentVideo({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.muted = true;
        el.volume = 0;
        const onVolumeChange = () => { el.muted = true; el.volume = 0; };
        el.addEventListener("volumechange", onVolumeChange);
        return () => el.removeEventListener("volumechange", onVolumeChange);
    }, []);
    return (
        <video ref={ref} src={src} autoPlay loop playsInline muted className={className} style={style} />
    );
}

// ─── Plyr-видеоплеер ────────────────────────────────────────────────────────

function PlyrVideo({ src }: { src: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Plyr | null>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const videoEl = wrapper.querySelector("video");
        if (!videoEl) return;

        playerRef.current = new Plyr(videoEl, {
            controls: ["play", "progress", "current-time", "fullscreen"],
            muted: true,
            volume: 0,
            resetOnEnd: false,
            invertTime: false,
        });
        videoEl.muted = true;
        videoEl.volume = 0;

        return () => {
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, []);

    useEffect(() => {
        const p = playerRef.current;
        if (!p) return;
        p.source = {
            type: "video",
            sources: [{ src, type: "video/mp4" }],
        };
    }, [src]);

    return (
        <div ref={wrapperRef} className="rounded-xl overflow-hidden w-full" style={{ maxHeight: "85vh", boxShadow: "none" }}>
            <video controls playsInline muted className="w-full" style={{ maxHeight: "85vh" }}>
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
}

// ─── Лайтбокс ───────────────────────────────────────────────────────────────

type LightboxItem =
    | { kind: "image"; src: string; alt: string; filter?: string }
    | { kind: "video"; src: string };

function Lightbox({ items, index, onClose }: { items: LightboxItem[]; index: number; onClose: () => void }) {
    const [current, setCurrent] = useState(index);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
    const next = () => setCurrent((c) => (c + 1) % items.length);

    useEffect(() => {
        ref.current?.focus();
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    const item = items[current];

    return (
        <div
            role="presentation"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10,7,2,0.96)", backdropFilter: "blur(8px)", overscrollBehavior: "contain" }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                aria-label="Закрыть"
                className="absolute top-4 right-5 text-3xl leading-none opacity-40 hover:opacity-90 transition-opacity"
                style={{ color: "#f5ead8", fontFamily: "var(--font-display)" }}
            >×</button>

            {items.length > 1 && (
                <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs tracking-widest" style={{ color: "#c8853a88" }}>
                    {current + 1} / {items.length}
                </span>
            )}

            <div
                ref={ref}
                tabIndex={-1}
                className="relative flex items-center justify-center outline-none"
                style={{ width: "min(90vw, 1200px)", maxHeight: "85vh", boxShadow: "none" }}
                onClick={(e) => e.stopPropagation()}
            >
                {item.kind === "image" ? (
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="rounded-xl object-contain w-full h-full"
                        style={{ maxHeight: "85vh", filter: item.filter, boxShadow: "none" }}
                    />
                ) : (
                    <PlyrVideo src={item.src} />
                )}
            </div>

            {items.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="Предыдущее"
                        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-[background-color,opacity] hover:opacity-100 opacity-50"
                        style={{ background: "#c8853a22", color: "#f5ead8", fontSize: 22 }}
                    >‹</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="Следующее"
                        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-[background-color,opacity] hover:opacity-100 opacity-50"
                        style={{ background: "#c8853a22", color: "#f5ead8", fontSize: 22 }}
                    >›</button>
                </>
            )}
        </div>
    );
}

// ─── Вспомогательные функции для оформления меню и фото ───────────────────────

function getDishImage(dish: Dish, categoryId?: string): string {
    if (dish.img) return dish.img;
    const nameLower = dish.name.toLowerCase();
    // Мангал и мясо
    if (nameLower.includes("шашлык свиной") || (nameLower.includes("шашлык") && !nameLower.includes("куриц") && !nameLower.includes("курин") && !nameLower.includes("крыл"))) return foodShashlikPork;
    if (nameLower.includes("шашлык из курицы с овощами")) return foodShashlikChickenVeg;
    if (nameLower.includes("шашлык куриный") || nameLower.includes("крыл")) return foodShashlikChicken;
    if (nameLower.includes("люля-кебаб куриный")) return foodLyulyaChicken;
    if (nameLower.includes("люля-кебаб")) return foodLyulyaBeef;
    if (nameLower.includes("садж")) return foodSadzhAssorti;
    if (nameLower.includes("сёмг") || nameLower.includes("семг")) return foodSteakSalmon;
    if (nameLower.includes("стейк из говядины")) return foodSteakBeefRibeye;
    if (nameLower.includes("стейк из свинины")) return foodSteakPork;
    // Закуски
    if (nameLower.includes("рыбная тарелка")) return foodFishPlate;
    if (nameLower.includes("мясная тарелка")) return foodMeatPlate;
    if (nameLower.includes("цезарь-ролл")) return foodCaesarRoll;
    // Горячие вторые блюда
    if (nameLower.includes("жаркое по-армянски") || nameLower.includes("чанахи")) return foodZharkoeArmenia;
    if (nameLower.includes("свинина в соусе с грибами")) return foodPorkMushroomSauce;
    if (nameLower.includes("свинина с овощами")) return foodPorkRibsVeg;
    if (nameLower.includes("дракон")) return foodDishDragon;
    if (nameLower.includes("курица по-гавайски") || nameLower.includes("курица по-французски")) return foodChickenFestive;
    if (nameLower.includes("куриная грудка с овощами")) return foodShashlikChickenVeg;
    if (nameLower.includes("печень")) return foodSteakPork2;
    // Гарниры
    if (nameLower.includes("картофель фри")) return foodLyulyaChicken;
    if (nameLower.includes("картофель")) return foodSteakBeefPotato;
    // Пицца
    if (nameLower.includes("грибная поляна")) return foodPizzaGribnaya;
    if (nameLower.includes("гавайская")) return foodPizzaGavayskaya;
    if (nameLower.includes("маргарита") || nameLower.includes("пицца")) return foodPizzaMargarita;
    // Напитки и бар
    if (nameLower.includes("санрайз") || nameLower.includes("мохито") || nameLower.includes("виски")) return foodCocktails7;
    if (nameLower.includes("коктейль") || nameLower.includes("айленд") || nameLower.includes("коллинз") || nameLower.includes("лагуна") || nameLower.includes("шот") || nameLower.includes("лимонад")) return foodCocktails5;
    // Банкеты
    if (nameLower.includes("свадебный банкет")) return foodBanquetHall;
    if (nameLower.includes("банкет") || nameLower.includes("ланч") || nameLower.includes("обед") || nameLower.includes("праздник")) return foodBanquetTable;

    // Фоллбэки по категориям
    if (nameLower.includes("тарелка") || nameLower.includes("закуск") || nameLower.includes("сельдь") || nameLower.includes("рулет") || nameLower.includes("креветк") || nameLower.includes("палочки") || nameLower.includes("гренки") || nameLower.includes("наггетс") || nameLower.includes("кольца")) {
        return foodMeatPlate;
    }
    if (nameLower.includes("пиво") || nameLower.includes("водка") || nameLower.includes("коньяк") || nameLower.includes("виски") || nameLower.includes("вино") || nameLower.includes("бар")) {
        return foodCocktails7;
    }
    if (nameLower.includes("салат")) {
        return imgHero;
    }
    if (nameLower.includes("соус")) {
        return imgHero;
    }
    if (nameLower.includes("чай") || nameLower.includes("кофе") || nameLower.includes("мороженое") || nameLower.includes("пломбир") || nameLower.includes("шоколад")) {
        return imgHeroOld;
    }
    if (categoryId === "mangal") return foodShashlikPork;
    if (categoryId === "starters") return foodMeatPlate;
    if (categoryId === "hot") return foodZharkoeArmenia;
    if (categoryId === "pizza_sauces") return foodPizzaMargarita;
    if (categoryId === "bar") return foodCocktails7;
    if (categoryId === "banquet") return foodBanquetHall;
    if (categoryId === "salads") return imgHero;
    return imgHero;
}

function getDishDescription(dish: Dish): string {
    if (dish.description) return dish.description;
    if (dish.note) return `Особенности / состав: ${dish.note}`;
    const nameLower = dish.name.toLowerCase();
    if (nameLower.includes("шашлык свиной")) return "Сочный шашлык из отборной свиной шейки, маринованный по традиционному кавказскому рецепту и обжаренный на древесных углях с маринованным луком и лавашом.";
    if (nameLower.includes("шашлык из курицы с овощами")) return "Аппетитный шашлык из сочного куриного филе с болгарским перцем, томатами и репчатым луком на мангале.";
    if (nameLower.includes("шашлык куриный")) return "Нежное куриное филе в авторском маринаде со свежими пряностями, приготовленное на открытом огне до румяной корочки.";
    if (nameLower.includes("шашлык из крыльев")) return "Хрустящие куриные крылышки в пикантном маринаде, обжаренные на мангале до золотистого цвета.";
    if (nameLower.includes("люля-кебаб с говядиной")) return "Классический сочный кебаб из рубленой говядины со свежей кинзой, луком и восточными специями на шампуре.";
    if (nameLower.includes("люля-кебаб куриный")) return "Нежный кебаб из рубленого куриного филе со специями, подается с хрустящим картофелем фри, зеленью и лавашом.";
    if (nameLower.includes("садж")) return "Праздничное кавказское блюдо на компанию: сочное ассорти мяса, запечённый картофель, грибы, баклажаны и перцы на подогреваемой сковороде.";
    if (nameLower.includes("стейк из сёмги")) return "Филе атлантической сёмги на гриле с золотистой корочкой, долькой лимона, маслинами и свежей зеленью.";
    if (nameLower.includes("стейк из говядины")) return "Сочный стейк из мраморной говядины с пряным розмарином, идеальной прожаркой и нежным запечённым картофелем.";
    if (nameLower.includes("стейк из свинины")) return "Стейк из свиной корейки на гриле с ароматом дымка, подается со свежими овощами и фирменным соусом.";
    if (nameLower.includes("рыбная тарелка")) return "Изысканное деликатесное ассорти благородной рыбы: слабосолёная сёмга, масляная рыба, лимон, свежая зелень и оливки.";
    if (nameLower.includes("мясная тарелка")) return "Торжественная нарезка мясных деликатесов: ароматная буженина, бастурма, сыровяленая колбаса и острый перчик.";
    if (nameLower.includes("сырная тарелка")) return "Ассорти традиционных и европейских сыров с грецкими орехами, мёдом и свежим виноградом.";
    if (nameLower.includes("цезарь-ролл запечённый")) return "Горячий запечённый ролл с хрустящей аппетитной корочкой, начинкой из нежного филе цыпленка, томатов и фирменного сырного соуса.";
    if (nameLower.includes("жаркое по-армянски")) return "Традиционное ароматное жаркое из отборного мяса, томленого с картофелем, томатами, сладким перцем и кавказскими травами.";
    if (nameLower.includes("свинина в соусе с грибами")) return "Сочные кусочки свинины, обжаренные до золотистого цвета и томленые в густом ароматном сливочно-грибном соусе.";
    if (nameLower.includes("свинина с овощами")) return "Ароматная свинина, приготовленная со сладким болгарским перцем, луком и восточными пряностями.";
    if (nameLower.includes("китайский дракон")) return "Хрустящие кусочки нежного филе в пряном кисло-сладком соусе со свежей зеленью и обжаренным кунжутом.";
    if (nameLower.includes("курица по-гавайски")) return "Нежное куриное филе, запечённое с ломтиками сладкого ананаса под золотистой сырной корочкой.";
    if (nameLower.includes("пицца «грибная поляна»")) return "Пышная горячая пицца на тонком тесте со свежими лесными шампиньонами, сливочным соусом и сыром моцарелла.";
    if (nameLower.includes("пицца «гавайская»")) return "Любимая классика: сочное куриное филе, кусочки спелого ананаса, томатный соус и тягучий сыр моцарелла.";
    if (nameLower.includes("пицца «маргарита»")) return "Традиционная итальянская пицца со спелыми томатами, ароматным орегано, свежим базиликом и сыром моцарелла.";
    if (nameLower.includes("салат «белоснежка»")) return "Фирменный салат кафе из нежного филе, свежих овощей, отборного сыра и авторской заправки от шеф-повара.";
    if (nameLower.includes("цезарь с креветками")) return "Хрустящие листья салата, обжаренные тигровые креветки, томаты черри, перепелиные яйца, пармезан и соус «Цезарь».";
    if (nameLower.includes("цезарь с курицей")) return "Классический салат с нежным филе цыпленка на гриле, листьями романо, чесночными крутонами и пармезаном.";
    if (nameLower.includes("банкет")) return "Полная сервировка торжественного стола: холодные и горячие закуски, салаты, шашлык на углях и напитки для ваших гостей.";
    if (nameLower.includes("пицца")) return "Ароматная пицца на тонком тесте с хрустящим бортиком, тягучим сыром моцарелла и свежими ингредиентами.";
    return "Приготовлено из отборных свежих продуктов по традиционным фирменным рецептам кафе «Белоснежка».";
}

function getDishTag(dish: Dish): string | undefined {
    if (dish.tag) return dish.tag;
    const nameLower = dish.name.toLowerCase();
    if (nameLower.includes("садж") || nameLower.includes("белоснежка") || nameLower.includes("фирменн")) return "Фирменное";
    if (nameLower.includes("шашлык свиной") || nameLower.includes("люля-кебаб") || nameLower.includes("цезарь с креветками") || nameLower.includes("банкет") || nameLower.includes("пепперони") || nameLower.includes("лонг айленд")) return "Хит";
    if (nameLower.includes("сёмги") || nameLower.includes("рыбная") || nameLower.includes("стейк из говядины") || nameLower.includes("мохито")) return "Популярное";
    return undefined;
}

// ─── Модальное окно детального просмотра блюда с фото ───────────────────────

type DishModalData = {
    dish: Dish;
    categoryTitle: string;
    categoryId: string;
    allDishes: Dish[];
    currentIndex: number;
};

function DishPhotoModal({
    data,
    onClose,
    onBookTable,
    onChangeDish,
}: {
    data: DishModalData;
    onClose: () => void;
    onBookTable: (dishName: string) => void;
    onChangeDish: (index: number) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { dish, categoryTitle, categoryId, allDishes, currentIndex } = data;
    const currentDish = allDishes[currentIndex] || dish;

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        ref.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && allDishes.length > 1) {
                onChangeDish((currentIndex - 1 + allDishes.length) % allDishes.length);
            }
            if (e.key === "ArrowRight" && allDishes.length > 1) {
                onChangeDish((currentIndex + 1) % allDishes.length);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose, currentIndex, allDishes.length, onChangeDish]);

    const dishImg = getDishImage(currentDish, categoryId);
    const dishDesc = getDishDescription(currentDish);
    const dishTag = getDishTag(currentDish);

    const prevDish = () => {
        if (allDishes.length > 1) {
            onChangeDish((currentIndex - 1 + allDishes.length) % allDishes.length);
        }
    };
    const nextDish = () => {
        if (allDishes.length > 1) {
            onChangeDish((currentIndex + 1) % allDishes.length);
        }
    };

    return (
        <div
            role="presentation"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(10,7,2,0.92)", backdropFilter: "blur(10px)", overscrollBehavior: "contain" }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
        >
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dish-modal-title"
                tabIndex={-1}
                className="relative w-full max-w-lg rounded-2xl overflow-hidden outline-none flex flex-col transition-all duration-300 shadow-2xl"
                style={{ background: "#1f1406", border: "1px solid #c8853a33", maxHeight: "92vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Фотография блюда */}
                <div className="relative shrink-0 select-none overflow-hidden" style={{ height: "260px", background: "#2c1f0e" }}>
                    <img
                        src={dishImg}
                        alt={currentDish.name}
                        className="w-full h-full object-cover pointer-events-none transition-all duration-500"
                        style={{ filter: "contrast(1.08) saturate(1.15) brightness(0.98)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1f1406 0%, transparent 60%), linear-gradient(to bottom, rgba(10,7,2,0.4) 0%, transparent 40%)" }} />

                    {/* Бейджи на фото */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
                        {dishTag && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md" style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)" }}>
                                {dishTag}
                            </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] backdrop-blur-md" style={{ background: "rgba(26,18,8,0.75)", color: "#d9c9b0", border: "1px solid #c8853a33" }}>
                            {categoryTitle}
                        </span>
                    </div>

                    {/* Кнопка закрытия */}
                    <button
                        onClick={onClose}
                        aria-label="Закрыть"
                        className="absolute top-3 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 active:scale-95"
                        style={{ background: "rgba(26,18,8,0.75)", color: "#f5ead8", border: "1px solid #c8853a33" }}
                    >
                        ×
                    </button>

                    {/* Стрелки перелистывания на фото */}
                    {allDishes.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={prevDish}
                                aria-label="Предыдущее блюдо"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-90 shadow-lg"
                                style={{ background: "rgba(26,18,8,0.8)", color: "#f5ead8", border: "1px solid #c8853a44" }}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={nextDish}
                                aria-label="Следующее блюдо"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-90 shadow-lg"
                                style={{ background: "rgba(26,18,8,0.8)", color: "#f5ead8", border: "1px solid #c8853a44" }}
                            >
                                ›
                            </button>
                            <div className="absolute bottom-3 right-4 px-2 py-0.5 rounded text-[11px] backdrop-blur-sm" style={{ background: "rgba(26,18,8,0.7)", color: "#d9c9b0" }}>
                                {currentIndex + 1} из {allDishes.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Текстовая информация о блюде */}
                <div className="p-6 overflow-y-auto flex flex-col gap-4" style={{ overscrollBehavior: "contain" }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b" style={{ borderColor: "#c8853a22" }}>
                        <div>
                            <h3 id="dish-modal-title" className="text-2xl sm:text-3xl leading-snug" style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}>
                                {currentDish.name}
                            </h3>
                            {currentDish.weight && (
                                <span className="inline-block mt-1 text-xs font-mono font-medium px-2 py-0.5 rounded" style={{ background: "#2c1f0e", color: "#c8853a" }}>
                                    Порция: {currentDish.weight}
                                </span>
                            )}
                        </div>
                        <div className="sm:text-right shrink-0">
                            <span className="text-2xl sm:text-3xl font-normal" style={{ color: "#c8853a", fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                {currentDish.price}
                            </span>
                        </div>
                    </div>

                    <div className="text-sm leading-relaxed" style={{ color: "#d9c9b0" }}>
                        <p>{dishDesc}</p>
                    </div>

                    {currentDish.note && (
                        <div className="p-3.5 rounded-xl text-xs leading-relaxed" style={{ background: "#271a09", border: "1px solid #c8853a22", color: "#e8d8c3" }}>
                            <span className="font-semibold text-[#c8853a]">Состав / Ингредиенты: </span>
                            {currentDish.note}
                        </div>
                    )}

                    {/* Кнопки действий */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            type="button"
                            onClick={() => onBookTable(currentDish.name)}
                            className="flex-1 py-3 px-5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer"
                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)" }}
                        >
                            <span>Забронировать столик</span>
                        </button>
                        <a
                            href="tel:+79184350245"
                            className="py-3 px-5 rounded-xl text-xs uppercase tracking-wider font-medium transition-colors hover:bg-[#3a2e1e] flex items-center justify-center gap-2 border text-center"
                            style={{ borderColor: "#c8853a44", color: "#f5ead8" }}
                        >
                            <span>+7 (918) 435-02-45</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Политика конфиденциальности ────────────────────────────────────────────

function PrivacyModal({ onClose }: { onClose: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        ref.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            role="presentation"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,7,2,0.92)", backdropFilter: "blur(6px)", overscrollBehavior: "contain" }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
        >
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby="privacy-title"
                tabIndex={-1}
                className="relative w-full max-w-2xl rounded-2xl p-8 overflow-y-auto"
                style={{
                    background: "#231808",
                    border: "1px solid #c8853a33",
                    maxHeight: "80vh",
                    overscrollBehavior: "contain",
                    boxShadow: "none",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl leading-none opacity-40 hover:opacity-80 transition-opacity"
                    style={{ color: "#f5ead8", fontFamily: "var(--font-display)" }}
                    aria-label="Закрыть"
                >×</button>

                <h2 id="privacy-title" className="text-xl mb-4" style={{ fontFamily: "var(--font-display)", color: "#c8853a" }}>
                    Политика конфиденциальности и обработки персональных данных
                </h2>

                <div className="text-sm leading-relaxed flex flex-col gap-4" style={{ color: "#d9c9b0" }}>
                    <p><strong style={{ color: "#f5ead8" }}>1. Оператор персональных данных</strong><br />
                        ООО «ЭМИ», ИНН 0265028241, ОГРН 1060265016349.<br />
                        Юридический адрес: 452616, Республика Башкортостан, г. Октябрьский, просп. Ленина, д. 57, помещ. 1.<br />
                        Тел.: +7 (34767) 3-55-05.</p>

                    <p><strong style={{ color: "#f5ead8" }}>2. Цели обработки персональных данных</strong><br />
                        Персональные данные (имя, номер телефона, дата и время посещения, пожелания) обрабатываются исключительно для подтверждения и обслуживания бронирований столиков. Данные не передаются третьим лицам, не используются в маркетинговых целях без отдельного согласия.</p>

                    <p><strong style={{ color: "#f5ead8" }}>3. Правовое основание</strong><br />
                        Обработка персональных данных осуществляется на основании Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» с согласия субъекта персональных данных.</p>

                    <p><strong style={{ color: "#f5ead8" }}>4. Состав обрабатываемых данных</strong><br />
                        Имя и фамилия; номер телефона; дата и время бронирования; количество гостей; дополнительные пожелания (при наличии).</p>

                    <p><strong style={{ color: "#f5ead8" }}>5. Срок хранения</strong><br />
                        Персональные данные хранятся не более 1 (одного) года с момента бронирования, после чего уничтожаются.</p>

                    <p><strong style={{ color: "#f5ead8" }}>6. Права субъекта персональных данных</strong><br />
                        Вы вправе в любое время отозвать согласие, запросить доступ к своим данным, потребовать их уточнения или уничтожения, направив письменное обращение по адресу заведения или по телефону +7 (34767) 3-55-05.</p>

                    <p><strong style={{ color: "#f5ead8" }}>7. Файлы cookie</strong><br />
                        Сайт использует технические файлы cookie, необходимые для работы. Продолжая использование сайта, вы соглашаетесь с их применением в соответствии с Федеральным законом № 149-ФЗ «Об информации».</p>

                    <p><strong style={{ color: "#f5ead8" }}>8. Контактные данные</strong><br />
                        По вопросам обработки персональных данных обращайтесь: г. Октябрьский, просп. Ленина, 57 · +7 (34767) 3-55-05.</p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 rounded-full text-sm active:scale-[0.96] transition-transform"
                    style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", fontWeight: 600, boxShadow: "none" }}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}

// ─── Cookie-баннер ──────────────────────────────────────────────────────────

function CookieBanner({ onAccept, onShowPrivacy }: { onAccept: () => void; onShowPrivacy: () => void }) {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 px-4 py-4 md:px-8 md:py-5"
            style={{ background: "#1e150a", borderTop: "1px solid #c8853a22", boxShadow: "none" }}
            role="alertdialog"
            aria-labelledby="cookie-notice"
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <p id="cookie-notice" className="text-xs leading-relaxed" style={{ color: "#b8a98e" }}>
                    Сайт использует файлы cookie для корректной работы. Продолжая использование сайта,
                    вы соглашаетесь с{" "}
                    <button
                        type="button"
                        onClick={onShowPrivacy}
                        className="underline underline-offset-2 hover:text-amber-300 transition-colors"
                        style={{ color: "#c8853a" }}
                    >
                        Политикой конфиденциальности
                    </button>.
                </p>
                <button
                    onClick={onAccept}
                    className="shrink-0 px-5 py-2 rounded-full text-xs tracking-wide font-semibold transition-[filter,transform] hover:brightness-110 active:scale-[0.96]"
                    style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", whiteSpace: "nowrap", boxShadow: "none" }}
                >
                    Принять и продолжить
                </button>
            </div>
        </div>
    );
}

// ─── Модалки бронирования ───────────────────────────────────────────────────

const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Yekaterinburg" });

const inputStyle: React.CSSProperties = {
    background: "#2c1f0e", border: "1px solid #c8853a44", color: "#f5ead8", fontFamily: "var(--font-body)", boxShadow: "none",
};
const labelCap = { color: "#c8853a" } as React.CSSProperties;

function ModalShell({
    id, onClose, triggerRef, children,
}: {
    id: string;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLButtonElement | null>;
    children: React.ReactNode;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;
        const sel = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
        const get = () => Array.from(modal.querySelectorAll<HTMLElement>(sel)).filter(el => !el.hasAttribute("disabled"));
        get()[0]?.focus();
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") { onClose(); return; }
            if (e.key !== "Tab") return;
            const f = get();
            if (e.shiftKey) { if (document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1]?.focus(); } }
            else { if (document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0]?.focus(); } }
        }
        document.addEventListener("keydown", onKey);
        return () => { document.removeEventListener("keydown", onKey); triggerRef?.current?.focus(); };
    }, [onClose, triggerRef]);

    return (
        <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,7,2,0.88)", backdropFilter: "blur(6px)", overscrollBehavior: "contain" }} onClick={onClose} onWheel={(e) => e.stopPropagation()}>
            <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby={id}
                className="relative w-full max-w-lg rounded-2xl p-8 md:p-10 overflow-y-auto"
                style={{ background: "#231808", border: "1px solid #c8853a33", maxHeight: "90vh", overscrollBehavior: "contain", boxShadow: "none" }}
                onClick={e => e.stopPropagation()}>
                <button onClick={onClose} aria-label="Закрыть"
                    className="absolute top-4 right-4 text-2xl leading-none opacity-40 hover:opacity-80 transition-opacity"
                    style={{ color: "#f5ead8", fontFamily: "var(--font-display)" }}>×</button>
                {children}
            </div>
        </div>
    );
}

function ConsentCheckbox({ checked, onChange, onShowPrivacy }: {
    checked: boolean; onChange: (v: boolean) => void; onShowPrivacy: () => void;
}) {
    return (
        <label className="flex gap-3 items-start cursor-pointer">
            <input type="checkbox" required checked={checked} onChange={e => onChange(e.target.checked)}
                className="mt-0.5 shrink-0 rounded" style={{ accentColor: "#c8853a", width: 16, height: 16 }} />
            <span className="text-xs leading-relaxed" style={{ color: "#b8a98e" }}>
                Я даю согласие на обработку персональных данных в соответствии с{" "}
                <button type="button" onClick={onShowPrivacy}
                    className="underline underline-offset-2 hover:text-amber-300 transition-colors" style={{ color: "#c8853a" }}>
                    Политикой конфиденциальности
                </button>{" "}
                согласно ФЗ № 152-ФЗ.
            </span>
        </label>
    );
}

function SuccessScreen({ onClose, text }: { onClose: () => void; text: string }) {
    return (
        <div className="text-center py-8">
            <div className="text-5xl mb-4" aria-hidden="true">✦</div>
            <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-display)", color: "#c8853a" }}>Ждём вас!</h3>
            <p style={{ color: "#d9c9b0", lineHeight: "1.7" }}>{text}</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-full text-sm active:scale-[0.96] transition-transform"
                style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", fontWeight: 600, boxShadow: "none" }}>
                Закрыть
            </button>
        </div>
    );
}

function BookingChoiceModal({
    onClose, triggerRef, onChooseTable, onChooseEvent,
}: {
    onClose: () => void;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    onChooseTable: () => void;
    onChooseEvent: () => void;
}) {
    return (
        <ModalShell id="choice-title" onClose={onClose} triggerRef={triggerRef}>
            <h3 id="choice-title" className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>
                Забронировать
            </h3>
            <p className="mb-8 text-sm" style={{ color: "#d9c9b0" }}>Кафе «Белоснежка» · г. Октябрьский, Башкортостан</p>

            <div className="flex flex-col gap-4">
                <button type="button" onClick={onChooseTable}
                    className="group relative rounded-xl p-6 text-left transition-[border-color,background-color] hover:border-amber-500 active:scale-[0.98]"
                    style={{ background: "#2c1f0e", border: "1px solid #c8853a33", boxShadow: "none" }}>
                    <div className="pr-8">
                        <p className="text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>Столик</p>
                        <p className="text-sm" style={{ color: "#b8a98e" }}>Выбрать дату, время и количество гостей для обычного визита</p>
                    </div>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition-transform group-hover:translate-x-1"
                        style={{ color: "#c8853a" }}>→</span>
                </button>

                <button type="button" onClick={onChooseEvent}
                    className="group relative rounded-xl p-6 text-left transition-[border-color,background-color] hover:border-amber-500 active:scale-[0.98]"
                    style={{ background: "#2c1f0e", border: "1px solid #c8853a33", boxShadow: "none" }}>
                    <div className="pr-8">
                        <p className="text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>Банкет / мероприятие</p>
                        <p className="text-sm" style={{ color: "#b8a98e" }}>День рождения, свадьба, поминальный обед — аренда зала</p>
                    </div>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition-transform group-hover:translate-x-1"
                        style={{ color: "#c8853a" }}>→</span>
                </button>
            </div>
        </ModalShell>
    );
}

const MONTH_NAMES_RU = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const WEEK_DAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function formatName(raw: string): string {
    const lettersOnly = raw.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
    return lettersOnly.replace(/(^|[\s-])([a-zA-Zа-яА-ЯёЁ])/g, (match, sep, char) => sep + char.toUpperCase());
}

function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    let clean = digits;
    if (clean[0] === "8" || clean[0] === "7") clean = clean.substring(1);

    let res = "+7";
    if (clean.length > 0) res += " (" + clean.substring(0, 3);
    if (clean.length >= 4) res += ") " + clean.substring(3, 6);
    if (clean.length >= 7) res += "-" + clean.substring(6, 8);
    if (clean.length >= 9) res += "-" + clean.substring(8, 10);
    return res;
}

const TABLE_TIMES_MON_TUE = [
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "18:30", "19:00"
];

const TABLE_TIMES_OTHER = [
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "00:00"
];

function BookingTableModal({
    onClose, onBack, onShowPrivacy,
}: {
    onClose: () => void;
    onBack: () => void;
    onShowPrivacy: () => void;
}) {
    const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2", note: "" });
    const [consent, setConsent] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());

    const dayOfWeek = form.date ? new Date(form.date + "T00:00:00").getDay() : null;
    const isMonOrTue = dayOfWeek === 1 || dayOfWeek === 2;
    const availableTimes = isMonOrTue ? TABLE_TIMES_MON_TUE : TABLE_TIMES_OTHER;

    useEffect(() => {
        if (form.time && !availableTimes.includes(form.time)) {
            setForm(prev => ({ ...prev, time: "" }));
        }
    }, [form.date, availableTimes, form.time]);

    const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const todayStr = TODAY;

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const formatDisplayDate = (iso: string) => {
        if (!iso) return "Выберите дату";
        const parts = iso.split("-");
        if (parts.length !== 3) return iso;
        const d = parseInt(parts[2], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parts[0];
        const monthGenitive = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ][m];
        return `${d} ${monthGenitive} ${y}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent || loading || !form.time || !form.date) return;
        setLoading(true);

        try {
            await fetch("/send.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    date: form.date,
                    time: form.time,
                    guests: form.guests,
                    comment: form.note ? `Столик: ${form.note}` : "Бронь столика",
                }),
            });
        } catch (err) {
            console.error("Ошибка при отправке в VK:", err);
        } finally {
            setLoading(false);
            setSent(true);
        }
    };

    return (
        <ModalShell id="table-title" onClose={onClose}>
            {sent ? <SuccessScreen onClose={onClose} text="Ваша заявка принята. Администратор подтвердит бронь по телефону в рабочее время в течение 30 минут." /> : (
                <>
                    <button onClick={onBack} className="flex items-center gap-1.5 mb-5 text-xs transition-colors hover:text-amber-300"
                        style={{ color: "#c8853a88" }}>
                        ← Назад
                    </button>
                    <h3 id="table-title" className="text-2xl mb-6" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>
                        Забронировать столик
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Ваше имя</span>
                            <input
                                type="text"
                                required
                                placeholder="Анастасия Королева"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: formatName(e.target.value) })}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color]"
                                style={inputStyle}
                            />
                        </label>

                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Телефон</span>
                            <input
                                type="tel"
                                required
                                placeholder="+7 (937) 000-00-00"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: formatPhone(e.target.value) })}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color]"
                                style={inputStyle}
                            />
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 relative">
                                <span className="text-xs tracking-widest uppercase" style={labelCap}>Дата</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDatePickerOpen(!datePickerOpen);
                                        setTimeDropdownOpen(false);
                                    }}
                                    className="rounded-lg px-3 py-2.5 text-sm transition-[border-color] flex items-center justify-between text-left truncate"
                                    style={{ ...inputStyle, color: form.date ? "#f5ead8" : "#d9c9b088" }}
                                >
                                    <span className="truncate" style={{ fontFamily: "var(--font-body)" }}>
                                        {formatDisplayDate(form.date)}
                                    </span>
                                    <svg
                                        className="w-4 h-4 shrink-0 ml-1.5 transition-opacity"
                                        style={{ color: "#c8853a", opacity: form.date ? 1 : 0.7 }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                        <circle cx="8" cy="14" r="0.8" fill="currentColor" />
                                        <circle cx="12" cy="14" r="0.8" fill="currentColor" />
                                        <circle cx="16" cy="14" r="0.8" fill="currentColor" />
                                        <circle cx="8" cy="18" r="0.8" fill="currentColor" />
                                        <circle cx="12" cy="18" r="0.8" fill="currentColor" />
                                    </svg>
                                </button>

                                {datePickerOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setDatePickerOpen(false)} />
                                        <div
                                            className="absolute left-0 top-full mt-1.5 z-30 rounded-xl p-3.5 w-[260px] sm:w-[280px]"
                                            style={{
                                                background: "#231808",
                                                border: "1px solid #c8853a55",
                                                overscrollBehavior: "contain",
                                                boxShadow: "none",
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <button
                                                    type="button"
                                                    onClick={prevMonth}
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-500/20 text-sm transition-colors"
                                                    style={{ color: "#c8853a" }}
                                                >
                                                    ‹
                                                </button>
                                                <span className="text-sm font-medium tracking-wide flex items-center gap-1.5" style={{ color: "#f5ead8" }}>
                                                    <span style={{ fontFamily: "var(--font-display)" }}>{MONTH_NAMES_RU[viewMonth]}</span>
                                                    <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "lining-nums" }}>{viewYear}</span>
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={nextMonth}
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-500/20 text-sm transition-colors"
                                                    style={{ color: "#c8853a" }}
                                                >
                                                    ›
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                                                {WEEK_DAYS_SHORT.map((wd) => (
                                                    <span key={wd} className="text-[11px] font-medium" style={{ color: "#c8853a99", fontFamily: "var(--font-body)" }}>
                                                        {wd}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-center">
                                                {Array.from({ length: firstDayIndex }).map((_, i) => (
                                                    <span key={`empty-${i}`} />
                                                ))}

                                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                                    const d = i + 1;
                                                    const dStr = d < 10 ? `0${d}` : `${d}`;
                                                    const mStr = viewMonth + 1 < 10 ? `0${viewMonth + 1}` : `${viewMonth + 1}`;
                                                    const fullIso = `${viewYear}-${mStr}-${dStr}`;

                                                    const isPast = fullIso < todayStr;
                                                    const isSelected = form.date === fullIso;

                                                    return (
                                                        <button
                                                            key={d}
                                                            type="button"
                                                            disabled={isPast}
                                                            onClick={() => {
                                                                setForm({ ...form, date: fullIso });
                                                                setDatePickerOpen(false);
                                                            }}
                                                            className="h-8 rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                                                            style={{
                                                                background: isSelected ? "#c8853a" : "transparent",
                                                                color: isSelected ? "#1a1208" : isPast ? "#d9c9b033" : "#f5ead8",
                                                                cursor: isPast ? "not-allowed" : "pointer",
                                                                fontFamily: "var(--font-body)",
                                                                fontVariantNumeric: "tabular-nums lining-nums",
                                                                boxShadow: "none",
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                if (!isSelected && !isPast) e.currentTarget.style.background = "#2c1f0e";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (!isSelected && !isPast) e.currentTarget.style.background = "transparent";
                                                            }}
                                                        >
                                                            {d}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 relative">
                                <span className="text-xs tracking-widest uppercase" style={labelCap}>Время</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTimeDropdownOpen(!timeDropdownOpen);
                                        setDatePickerOpen(false);
                                    }}
                                    className="rounded-lg px-4 py-2.5 text-sm transition-[border-color] flex items-center justify-between text-left"
                                    style={{ ...inputStyle, color: form.time ? "#f5ead8" : "#d9c9b088" }}
                                >
                                    <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                        {form.time || "Выберите"}
                                    </span>
                                    <span
                                        className="text-xs transition-transform duration-200"
                                        style={{
                                            transform: timeDropdownOpen ? "rotate(180deg)" : "none",
                                            color: "#c8853a",
                                        }}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {timeDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setTimeDropdownOpen(false)} />
                                        <div
                                            className="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-lg overflow-y-auto py-1"
                                            style={{
                                                background: "#231808",
                                                border: "1px solid #c8853a55",
                                                maxHeight: "180px",
                                                overscrollBehavior: "contain",
                                                boxShadow: "none",
                                            }}
                                        >
                                            {availableTimes.map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => {
                                                        setForm({ ...form, time: t });
                                                        setTimeDropdownOpen(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between"
                                                    style={{
                                                        color: form.time === t ? "#c8853a" : "#f5ead8",
                                                        background: form.time === t ? "#2c1f0e" : "transparent",
                                                        fontFamily: "var(--font-body)",
                                                        boxShadow: "none",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (form.time !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (form.time !== t) e.currentTarget.style.background = "transparent";
                                                    }}
                                                >
                                                    <span>{t}</span>
                                                    {form.time === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <fieldset>
                            <legend className="text-xs tracking-widest uppercase mb-2" style={labelCap}>Гостей</legend>
                            <div className="flex gap-2 flex-wrap">
                                {["1", "2", "3", "4", "5", "6+"].map(g => (
                                    <button key={g} type="button" onClick={() => setForm({ ...form, guests: g })} aria-pressed={form.guests === g}
                                        className="px-4 py-2 rounded-lg text-sm transition-[background-color,color,border-color] active:scale-[0.96]"
                                        style={{
                                            background: form.guests === g ? "#c8853a" : "#2c1f0e", color: form.guests === g ? "#1a1208" : "#d9c9b0",
                                            border: `1px solid ${form.guests === g ? "#c8853a" : "#c8853a44"}`, fontFamily: "var(--font-body)",
                                            boxShadow: "none"
                                        }}>
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Пожелания</span>
                            <textarea rows={2} placeholder="Столик у окна, день рождения..." value={form.note}
                                onChange={e => setForm({ ...form, note: e.target.value })}
                                className="rounded-lg px-4 py-2.5 text-sm resize-none transition-[border-color]" style={inputStyle} />
                        </label>

                        <ConsentCheckbox checked={consent} onChange={setConsent} onShowPrivacy={onShowPrivacy} />

                        <button type="submit" disabled={!consent || loading || !form.time || !form.date}
                            className="mt-2 rounded-lg py-3 text-sm tracking-widest uppercase font-medium transition-[filter,transform,opacity] hover:brightness-110 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", letterSpacing: "0.12em", boxShadow: "none" }}>
                            {loading ? "Отправка..." : "Подтвердить"}
                        </button>
                    </form>
                </>
            )}
        </ModalShell>
    );
}

const EVENT_TYPES = ["День рождения", "Свадьба", "Юбилей", "Поминальный обед", "Детский праздник", "Другое"];

const EVENT_HOURS_MON_THU = [
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00"
];

const EVENT_HOURS_FRI = [
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00",
    "04:00", "05:00"
];

const EVENT_HOURS_SAT = [
    "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00",
    "04:00", "05:00"
];

const EVENT_HOURS_SUN = [
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00"
];

function BookingEventModal({
    onClose, onBack, onShowPrivacy,
}: {
    onClose: () => void;
    onBack: () => void;
    onShowPrivacy: () => void;
}) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        guests: "",
        eventType: "",
        note: ""
    });
    const [consent, setConsent] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [eventTypeOpen, setEventTypeOpen] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [timeFromOpen, setTimeFromOpen] = useState(false);
    const [timeToOpen, setTimeToOpen] = useState(false);

    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());

    const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const todayStr = TODAY;

    const dayOfWeek = form.date ? new Date(form.date + "T00:00:00").getDay() : null;
    const availableEventHours =
        dayOfWeek === 5
            ? EVENT_HOURS_FRI
            : dayOfWeek === 6
                ? EVENT_HOURS_SAT
                : dayOfWeek === 0
                    ? EVENT_HOURS_SUN
                    : EVENT_HOURS_MON_THU;

    useEffect(() => {
        if (form.timeTo && !availableEventHours.includes(form.timeTo)) {
            setForm(prev => ({ ...prev, timeTo: "" }));
        }
        if (form.timeFrom && !availableEventHours.includes(form.timeFrom)) {
            setForm(prev => ({ ...prev, timeFrom: "" }));
        }
    }, [form.date, availableEventHours, form.timeTo, form.timeFrom]);

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const formatDisplayDate = (iso: string) => {
        if (!iso) return "Выберите дату";
        const parts = iso.split("-");
        if (parts.length !== 3) return iso;
        const d = parseInt(parts[2], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parts[0];
        const monthGenitive = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ][m];
        return `${d} ${monthGenitive} ${y}`;
    };

    const closeAllDropdowns = () => {
        setEventTypeOpen(false);
        setDatePickerOpen(false);
        setTimeFromOpen(false);
        setTimeToOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent || loading || !form.date || !form.eventType) return;
        setLoading(true);

        try {
            await fetch("/send.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    date: form.date,
                    time: `${form.timeFrom || "—"} – ${form.timeTo || "—"}`,
                    guests: form.guests,
                    comment: `Банкет: ${form.eventType}. ${form.note ? `Пожелания: ${form.note}` : ""}`.trim(),
                }),
            });
        } catch (err) {
            console.error("Ошибка при отправке в VK:", err);
        } finally {
            setLoading(false);
            setSent(true);
        }
    };

    return (
        <ModalShell id="event-title" onClose={onClose}>
            {sent ? <SuccessScreen onClose={onClose} text="Ваша заявка принята. Администратор подтвердит бронь по телефону в рабочее время в течение 30 минут." /> : (
                <>
                    <button onClick={onBack} className="flex items-center gap-1.5 mb-5 text-xs transition-colors hover:text-amber-300"
                        style={{ color: "#c8853a88" }}>
                        ← Назад
                    </button>
                    <h3 id="event-title" className="text-2xl mb-6" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>
                        Банкет / мероприятие
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Контактное лицо</span>
                            <input
                                type="text"
                                required
                                placeholder="Анастасия Королева"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: formatName(e.target.value) })}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color]"
                                style={inputStyle}
                            />
                        </label>

                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Телефон</span>
                            <input
                                type="tel"
                                required
                                placeholder="+7 (937) 000-00-00"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: formatPhone(e.target.value) })}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color]"
                                style={inputStyle}
                            />
                        </label>

                        <div className="flex flex-col gap-1 relative">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Тип мероприятия</span>
                            <button
                                type="button"
                                onClick={() => {
                                    const next = !eventTypeOpen;
                                    closeAllDropdowns();
                                    setEventTypeOpen(next);
                                }}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color] flex items-center justify-between text-left"
                                style={{ ...inputStyle, color: form.eventType ? "#f5ead8" : "#d9c9b088" }}
                            >
                                <span>{form.eventType || "Выберите"}</span>
                                <span
                                    className="text-xs transition-transform duration-200"
                                    style={{
                                        transform: eventTypeOpen ? "rotate(180deg)" : "none",
                                        color: "#c8853a",
                                    }}
                                >
                                    ▼
                                </span>
                            </button>

                            {eventTypeOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setEventTypeOpen(false)} />
                                    <div
                                        className="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-lg overflow-y-auto py-1"
                                        style={{
                                            background: "#231808",
                                            border: "1px solid #c8853a55",
                                            maxHeight: "190px",
                                            overscrollBehavior: "contain",
                                            boxShadow: "none",
                                        }}
                                    >
                                        {EVENT_TYPES.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => {
                                                    setForm({ ...form, eventType: t });
                                                    setEventTypeOpen(false);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between"
                                                style={{
                                                    color: form.eventType === t ? "#c8853a" : "#f5ead8",
                                                    background: form.eventType === t ? "#2c1f0e" : "transparent",
                                                    fontFamily: "var(--font-body)",
                                                    boxShadow: "none",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (form.eventType !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (form.eventType !== t) e.currentTarget.style.background = "transparent";
                                                }}
                                            >
                                                <span>{t}</span>
                                                {form.eventType === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 relative">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Дата</span>
                            <button
                                type="button"
                                onClick={() => {
                                    const next = !datePickerOpen;
                                    closeAllDropdowns();
                                    setDatePickerOpen(next);
                                }}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color] flex items-center justify-between text-left truncate"
                                style={{ ...inputStyle, color: form.date ? "#f5ead8" : "#d9c9b088" }}
                            >
                                <span className="truncate" style={{ fontFamily: "var(--font-body)" }}>
                                    {formatDisplayDate(form.date)}
                                </span>
                                <svg
                                    className="w-4 h-4 shrink-0 ml-1.5 transition-opacity"
                                    style={{ color: "#c8853a", opacity: form.date ? 1 : 0.7 }}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                    <circle cx="8" cy="14" r="0.8" fill="currentColor" />
                                    <circle cx="12" cy="14" r="0.8" fill="currentColor" />
                                    <circle cx="16" cy="14" r="0.8" fill="currentColor" />
                                    <circle cx="8" cy="18" r="0.8" fill="currentColor" />
                                    <circle cx="12" cy="18" r="0.8" fill="currentColor" />
                                </svg>
                            </button>

                            {datePickerOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setDatePickerOpen(false)} />
                                    <div
                                        className="absolute left-0 top-full mt-1.5 z-30 rounded-xl p-3.5 w-[260px] sm:w-[280px]"
                                        style={{
                                            background: "#231808",
                                            border: "1px solid #c8853a55",
                                            overscrollBehavior: "contain",
                                            boxShadow: "none",
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <button
                                                type="button"
                                                onClick={prevMonth}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-500/20 text-sm transition-colors"
                                                style={{ color: "#c8853a" }}
                                            >
                                                ‹
                                            </button>
                                            <span className="text-sm font-medium tracking-wide flex items-center gap-1.5" style={{ color: "#f5ead8" }}>
                                                <span style={{ fontFamily: "var(--font-display)" }}>{MONTH_NAMES_RU[viewMonth]}</span>
                                                <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "lining-nums" }}>{viewYear}</span>
                                            </span>
                                            <button
                                                type="button"
                                                onClick={nextMonth}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-500/20 text-sm transition-colors"
                                                style={{ color: "#c8853a" }}
                                            >
                                                ›
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                                            {WEEK_DAYS_SHORT.map((wd) => (
                                                <span key={wd} className="text-[11px] font-medium" style={{ color: "#c8853a99", fontFamily: "var(--font-body)" }}>
                                                    {wd}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center">
                                            {Array.from({ length: firstDayIndex }).map((_, i) => (
                                                <span key={`empty-${i}`} />
                                            ))}

                                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                                const d = i + 1;
                                                const dStr = d < 10 ? `0${d}` : `${d}`;
                                                const mStr = viewMonth + 1 < 10 ? `0${viewMonth + 1}` : `${viewMonth + 1}`;
                                                const fullIso = `${viewYear}-${mStr}-${dStr}`;

                                                const isPast = fullIso < todayStr;
                                                const isSelected = form.date === fullIso;

                                                return (
                                                    <button
                                                        key={d}
                                                        type="button"
                                                        disabled={isPast}
                                                        onClick={() => {
                                                            setForm({ ...form, date: fullIso });
                                                            setDatePickerOpen(false);
                                                        }}
                                                        className="h-8 rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                                                        style={{
                                                            background: isSelected ? "#c8853a" : "transparent",
                                                            color: isSelected ? "#1a1208" : isPast ? "#d9c9b033" : "#f5ead8",
                                                            cursor: isPast ? "not-allowed" : "pointer",
                                                            fontFamily: "var(--font-body)",
                                                            fontVariantNumeric: "tabular-nums lining-nums",
                                                            boxShadow: "none",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isSelected && !isPast) e.currentTarget.style.background = "#2c1f0e";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isSelected && !isPast) e.currentTarget.style.background = "transparent";
                                                        }}
                                                    >
                                                        {d}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 relative">
                                <span className="text-xs tracking-widest uppercase" style={labelCap}>Начало</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = !timeFromOpen;
                                        closeAllDropdowns();
                                        setTimeFromOpen(next);
                                    }}
                                    className="rounded-lg px-4 py-2.5 text-sm transition-[border-color] flex items-center justify-between text-left"
                                    style={{ ...inputStyle, color: form.timeFrom ? "#f5ead8" : "#d9c9b088" }}
                                >
                                    <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                        {form.timeFrom || "—"}
                                    </span>
                                    <span
                                        className="text-xs transition-transform duration-200"
                                        style={{
                                            transform: timeFromOpen ? "rotate(180deg)" : "none",
                                            color: "#c8853a",
                                        }}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {timeFromOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setTimeFromOpen(false)} />
                                        <div
                                            className="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-lg overflow-y-auto py-1"
                                            style={{
                                                background: "#231808",
                                                border: "1px solid #c8853a55",
                                                maxHeight: "180px",
                                                overscrollBehavior: "contain",
                                                boxShadow: "none",
                                            }}
                                        >
                                            {availableEventHours.map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => {
                                                        setForm({ ...form, timeFrom: t });
                                                        setTimeFromOpen(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between"
                                                    style={{
                                                        color: form.timeFrom === t ? "#c8853a" : "#f5ead8",
                                                        background: form.timeFrom === t ? "#2c1f0e" : "transparent",
                                                        fontFamily: "var(--font-body)",
                                                        boxShadow: "none",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (form.timeFrom !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (form.timeFrom !== t) e.currentTarget.style.background = "transparent";
                                                    }}
                                                >
                                                    <span>{t}</span>
                                                    {form.timeFrom === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 relative">
                                <span className="text-xs tracking-widest uppercase" style={labelCap}>Окончание</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = !timeToOpen;
                                        closeAllDropdowns();
                                        setTimeToOpen(next);
                                    }}
                                    className="rounded-lg px-4 py-2.5 text-sm transition-[border-color] flex items-center justify-between text-left"
                                    style={{ ...inputStyle, color: form.timeTo ? "#f5ead8" : "#d9c9b088" }}
                                >
                                    <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                        {form.timeTo || "—"}
                                    </span>
                                    <span
                                        className="text-xs transition-transform duration-200"
                                        style={{
                                            transform: timeToOpen ? "rotate(180deg)" : "none",
                                            color: "#c8853a",
                                        }}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {timeToOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setTimeToOpen(false)} />
                                        <div
                                            className="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-lg overflow-y-auto py-1"
                                            style={{
                                                background: "#231808",
                                                border: "1px solid #c8853a55",
                                                maxHeight: "180px",
                                                overscrollBehavior: "contain",
                                                boxShadow: "none",
                                            }}
                                        >
                                            {availableEventHours.map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => {
                                                        setForm({ ...form, timeTo: t });
                                                        setTimeToOpen(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between"
                                                    style={{
                                                        color: form.timeTo === t ? "#c8853a" : "#f5ead8",
                                                        background: form.timeTo === t ? "#2c1f0e" : "transparent",
                                                        fontFamily: "var(--font-body)",
                                                        boxShadow: "none",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (form.timeTo !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (form.timeTo !== t) e.currentTarget.style.background = "transparent";
                                                    }}
                                                >
                                                    <span>{t}</span>
                                                    {form.timeTo === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Количество гостей</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                required
                                placeholder="Например: 50"
                                value={form.guests}
                                onChange={e => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    if (val === "" || (Number(val) >= 1 && Number(val) <= 150)) {
                                        setForm({ ...form, guests: val });
                                    }
                                }}
                                className="rounded-lg px-4 py-2.5 text-sm transition-[border-color]"
                                style={{
                                    ...inputStyle,
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            />
                        </label>

                        <label className="flex flex-col gap-1">
                            <span className="text-xs tracking-widest uppercase" style={labelCap}>Пожелания</span>
                            <textarea
                                rows={2}
                                placeholder="Украшение зала, живая музыка, меню..."
                                value={form.note}
                                onChange={e => setForm({ ...form, note: e.target.value })}
                                className="rounded-lg px-4 py-2.5 text-sm resize-none transition-[border-color]"
                                style={inputStyle}
                            />
                        </label>

                        <ConsentCheckbox checked={consent} onChange={setConsent} onShowPrivacy={onShowPrivacy} />

                        <button
                            type="submit"
                            disabled={!consent || loading || !form.date || !form.eventType}
                            className="mt-2 rounded-lg py-3 text-sm tracking-widest uppercase font-medium transition-[filter,transform,opacity] hover:brightness-110 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", letterSpacing: "0.12em", boxShadow: "none" }}>
                            {loading ? "Отправка..." : "Отправить заявку"}
                        </button>
                    </form>
                </>
            )}
        </ModalShell>
    );
}

// ─── Приложение ─────────────────────────────────────────────────────────────

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<"choice" | "table" | "event" | null>(null);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [lightbox, setLightbox] = useState<{ index: number } | null>(null);
    const [activePromoTab, setActivePromoTab] = useState<"all" | "birthday" | "banquet" | "wedding">("all");
    const [activeMenuCategory, setActiveMenuCategory] = useState<string>("mangal");
    const [activeDishModal, setActiveDishModal] = useState<DishModalData | null>(null);
    const [cookieOk, setCookieOk] = useState(() => {
        try { return localStorage.getItem("cookie_consent") === "1"; } catch { return false; }
    });
    const [scrolled, setScrolled] = useState(false);
    const bookingTriggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function silenceEl(el: HTMLMediaElement) {
            el.muted = true;
            el.volume = 0;
            el.addEventListener("volumechange", () => { el.muted = true; el.volume = 0; });
        }
        document.querySelectorAll<HTMLMediaElement>("video, audio").forEach(silenceEl);
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (node instanceof HTMLMediaElement) silenceEl(node);
                    if (node instanceof Element) {
                        node.querySelectorAll<HTMLMediaElement>("video, audio").forEach(silenceEl);
                    }
                });
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function acceptCookie() {
        try { localStorage.setItem("cookie_consent", "1"); } catch { }
        setCookieOk(true);
    }

    function openBooking() { setBookingStep("choice"); }

    const filteredPromotions = activePromoTab === "all"
        ? PROMOTIONS
        : PROMOTIONS.filter(p => p.category === activePromoTab);

    const currentCatalog = FULL_CATALOG.find((cat) => cat.id === activeMenuCategory) || FULL_CATALOG[0];
    const currentCatMeta = MENU_CATEGORIES_META.find((c) => c.id === activeMenuCategory) || MENU_CATEGORIES_META[0];
    const allCategoryDishes = currentCatalog.sections.flatMap((s) => s.items);

    const openDishDetails = (dish: Dish, dishIndexInCat?: number) => {
        const idx =
            dishIndexInCat !== undefined && dishIndexInCat >= 0
                ? dishIndexInCat
                : allCategoryDishes.findIndex((d) => d.name === dish.name);
        setActiveDishModal({
            dish,
            categoryTitle: currentCatalog.title,
            categoryId: currentCatalog.id,
            allDishes: allCategoryDishes,
            currentIndex: idx >= 0 ? idx : 0,
        });
    };

    const handleChangeDishInModal = (nextIdx: number) => {
        if (!activeDishModal) return;
        const targetDish = activeDishModal.allDishes[nextIdx];
        if (!targetDish) return;
        setActiveDishModal({
            ...activeDishModal,
            dish: targetDish,
            currentIndex: nextIdx,
        });
    };

    const parsePrice = (priceStr: string) => {
        const hasFrom = priceStr.startsWith("от ");
        const amount = hasFrom ? priceStr.replace(/^от\s+/, "") : priceStr;
        return { hasFrom, amount };
    };

    const renderSectionBlock = (section: MenuSection, idx: number) => (
        <div key={idx} className="flex flex-col">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b" style={{ borderColor: "#c8853a33" }}>
                <h4 className="text-base md:text-lg font-medium tracking-wide" style={{ fontFamily: "var(--font-display)", color: "#c8853a", fontStyle: "italic" }}>
                    {section.title}
                </h4>
                <span className="text-xs" style={{ color: "#b8a98e66" }}>
                    {section.items.length} поз.
                </span>
            </div>

            <div className="flex flex-col">
                {section.items.map((dish, i) => {
                    const { hasFrom, amount } = parsePrice(dish.price);
                    const isLast = i === section.items.length - 1;
                    const dishTag = getDishTag(dish);
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => openDishDetails(dish)}
                            className={`group flex items-baseline justify-between gap-4 py-2.5 px-3 -mx-3 rounded-lg text-left transition-[background-color,color] hover:bg-[#2c1f0e]/70 active:scale-[0.99] cursor-pointer ${isLast ? "" : "border-b"}`}
                            style={{ borderColor: "#c8853a11" }}
                            title="Нажмите, чтобы посмотреть фото и описание блюда"
                        >
                            <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm leading-snug group-hover:text-amber-300 transition-colors" style={{ color: "#f5ead8" }}>
                                        {dish.name}
                                    </span>
                                    {dishTag && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded font-medium" style={{ background: "#c8853a22", color: "#c8853a", border: "1px solid #c8853a44" }}>
                                            {dishTag}
                                        </span>
                                    )}
                                    <span
                                        className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded opacity-40 group-hover:opacity-100 transition-opacity font-medium"
                                        style={{ border: "1px solid #c8853a33", color: "#c8853a" }}
                                    >
                                        фото
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center flex-wrap">
                                    {dish.weight && (
                                        <span className="text-xs" style={{ color: "#c8853a99", fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                            {dish.weight}
                                        </span>
                                    )}
                                    {dish.note && (
                                        <span className="text-[11px] italic" style={{ color: "#b8a98e66" }}>
                                            {dish.note}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div
                                className="shrink-0 flex items-baseline justify-end font-medium select-none"
                                style={{
                                    color: "#c8853a",
                                    width: "125px",
                                    fontFamily: "var(--font-body)",
                                    fontVariantNumeric: "tabular-nums lining-nums",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <span className="text-sm">{hasFrom ? "от " : ""}</span>
                                <span className="text-sm">{amount}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div style={{ fontFamily: "var(--font-body)", background: "#1a1208", color: "#f5ead8" }}>

            {/* ── HEADER ── */}
            <header
                className="fixed top-0 left-0 right-0 z-40 transition-[background,backdrop-filter,border-color] duration-500"
                style={{
                    background: scrolled ? "rgba(26,18,8,0.95)" : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled ? "1px solid #c8853a22" : "1px solid transparent",
                    boxShadow: "none",
                }}
            >
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="flex flex-col leading-none" style={{ fontFamily: "var(--font-display)" }}>
                        <span className="text-xl font-semibold tracking-wide" style={{ color: "#f5ead8" }}>Белоснежка</span>
                        <span className="text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.18em" }}>Кафе · Октябрьский</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(({ label, href }) => (
                            <a key={href} href={href} className="text-sm transition-colors hover:text-amber-400" style={{ color: "#d9c9b0", letterSpacing: "0.04em" }}>
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            ref={bookingTriggerRef}
                            onClick={openBooking}
                            className="hidden md:block px-5 py-2 rounded-full text-sm tracking-wide transition-[filter,transform] hover:brightness-110 active:scale-[0.96]"
                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", fontWeight: 600, boxShadow: "none" }}
                        >
                            Забронировать
                        </button>
                        <button
                            className="md:hidden min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1.5 p-3"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                            aria-expanded={menuOpen}
                        >
                            <span className="block w-5 h-px" style={{ background: "#f5ead8" }}></span>
                            <span className="block w-3.5 h-px" style={{ background: "#c8853a" }}></span>
                            <span className="block w-5 h-px" style={{ background: "#f5ead8" }}></span>
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ background: "rgba(26,18,8,0.97)", boxShadow: "none" }}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <a key={href} href={href} className="text-base py-1" style={{ color: "#d9c9b0", fontFamily: "var(--font-display)" }} onClick={() => setMenuOpen(false)}>
                                {label}
                            </a>
                        ))}
                        <button
                            onClick={() => { openBooking(); setMenuOpen(false); }}
                            className="mt-2 px-5 py-3 rounded-full text-sm tracking-wide transition-[filter,transform] hover:brightness-110 active:scale-[0.96]"
                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", fontWeight: 600, boxShadow: "none" }}
                        >
                            Забронировать
                        </button>
                    </div>
                )}
            </header>

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-end" style={{ paddingBottom: "10vh" }}>
                <div className="absolute inset-0 bg-stone-900 overflow-hidden">
                    <img
                        src={imgHero}
                        alt="Банкетный зал кафе «Белоснежка» — торжественное убранство"
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.4, filter: ENHANCE_WARM, objectPosition: "center 30%" }}
                    />
                </div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,18,8,0.72) 0%, rgba(26,18,8,0.55) 30%, rgba(26,18,8,0.35) 55%, rgba(26,18,8,0.7) 80%, #1a1208 100%)" }} />

                <div className="relative max-w-6xl mx-auto px-6 w-full">
                    <div className="max-w-2xl">
                        <p className="mb-4 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.22em" }}>
                            ✦ &nbsp; Октябрьский · Республика Башкортостан
                        </p>
                        <h1
                            className="mb-6 leading-none"
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#f5ead8", fontStyle: "italic", fontWeight: 400, padding: 0 }}
                        >
                            Там, где вечер
                            <br /><span style={{ color: "#c8853a" }}>длится дольше.</span>
                        </h1>
                        <p className="mb-8 text-lg leading-relaxed max-w-md" style={{ color: "#d9c9b0" }}>
                            Кафе с душой — русская и армянская кухня, живая музыка и тёплая атмосфера
                            в самом сердце Октябрьского с 2003 года.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                onClick={openBooking}
                                className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-semibold transition-[filter,transform] hover:brightness-110 active:scale-[0.96]"
                                style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)", letterSpacing: "0.12em", boxShadow: "none" }}
                            >
                                Забронировать
                            </button>
                            <a href="#menu" className="text-sm underline underline-offset-4 transition-colors hover:text-amber-300" style={{ color: "#d9c9b0", letterSpacing: "0.04em" }}>
                                Смотреть меню →
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2" style={{ color: "#c8853a88" }} aria-hidden="true">
                    <span className="text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>прокрутите</span>
                    <div className="h-12 w-px" style={{ background: "linear-gradient(to bottom, #c8853a88, transparent)" }} />
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section id="about" className="py-20 md:py-32">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div>
                        <p className="mb-3 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Наша история</p>
                        <h2 className="mb-6 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5ead8", fontStyle: "italic" }}>
                            Место, где всегда<br />рады гостям.
                        </h2>
                        <p className="mb-4 leading-relaxed text-sm md:text-base" style={{ color: "#d9c9b0" }}>
                            Кафе «Белоснежка» открылось в Октябрьском в 2003 году и стало
                            одним из самых любимых заведений города. За эти годы мы приняли
                            тысячи гостей — на семейных ужинах, банкетах, праздниках
                            и просто в будничный обеденный перерыв.
                        </p>
                        <p className="leading-relaxed text-sm md:text-base" style={{ color: "#d9c9b0" }}>
                            Наша кухня — русская и армянская, домашняя по духу: сочный шашлык
                            на мангале, первые и вторые блюда, салаты и деликатесы.
                            Вместительный зал на 150 мест, живая музыка и танцпол
                            создают атмосферу настоящего праздника.
                        </p>
                    </div>

                    <div className="relative pb-6 md:pb-0">
                        <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5", background: "#2c1f0e", boxShadow: "none" }}>
                            <img
                                src={imgAbout}
                                alt="Праздничный банкетный стол в кафе «Белоснежка»"
                                className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
                                style={{ opacity: 0.9, filter: ENHANCE_WARM, objectPosition: "center 20%" }}
                            />
                        </div>

                        <div
                            className="absolute bottom-9 left-3 sm:left-4 md:-bottom-6 md:-left-6 px-4 py-2.5 md:px-6 md:py-4 rounded-xl z-10"
                            style={{ background: "#c8853a", color: "#1a1208", boxShadow: "none" }}
                        >
                            <p className="text-[10px] md:text-xs tracking-widest uppercase mb-0.5" style={{ letterSpacing: "0.18em", fontFamily: "var(--font-body)" }}>
                                Работаем с
                            </p>
                            <p className="text-xl md:text-3xl font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>
                                2003
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── UNIFIED MENU SECTION ── */}
            <section id="menu" className="py-20 md:py-28" style={{ background: "#150e04" }}>
                <div className="max-w-6xl mx-auto px-6">
                    {/* Заголовок секции меню */}
                    <div className="mb-8">
                        <p className="mb-2 text-xs tracking-widest uppercase flex items-center gap-2" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>
                            <span>✦</span>
                            <span>Гастрономия & Бар</span>
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "#f5ead8", fontStyle: "italic" }}>
                                    Кухня и бар
                                </h2>
                                <p className="mt-2 text-sm max-w-2xl leading-relaxed" style={{ color: "#d9c9b0" }}>
                                    Традиционная русская и армянская кухня, сочные блюда на углях, деликатесные банкетные закуски и авторский бар. Нажмите на любое блюдо в прейскуранте, чтобы открыть фото и состав.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Вкладки разделов меню в соответствии с дизайн-системой сайта */}
                    <div className="flex gap-2 flex-wrap mb-10">
                        {MENU_CATEGORIES_META.map((cat) => {
                            const isActive = activeMenuCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setActiveMenuCategory(cat.id)}
                                    className="px-5 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-[background-color,color,border-color,transform] active:scale-[0.96] cursor-pointer"
                                    style={{
                                        background: isActive ? "#c8853a" : "#231808",
                                        color: isActive ? "#1a1208" : "#d9c9b0",
                                        border: `1px solid ${isActive ? "#c8853a" : "#c8853a33"}`,
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "0.08em",
                                        boxShadow: "none",
                                    }}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Главное фото активного раздела */}
                    <div
                        className="relative rounded-2xl overflow-hidden mb-8 group"
                        style={{
                            border: "1px solid #c8853a33",
                            background: "#231808",
                        }}
                    >
                        <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden">
                            <img
                                src={currentCatMeta.heroImg}
                                alt={currentCatMeta.label}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ filter: "contrast(1.08) saturate(1.18) brightness(0.92)" }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(to top, rgba(21, 14, 4, 0.95) 0%, rgba(21, 14, 4, 0.45) 50%, rgba(21, 14, 4, 0.2) 100%)",
                                }}
                            />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span
                                        className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
                                        style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)" }}
                                    >
                                        Раздел
                                    </span>
                                    {currentCatMeta.badge && (
                                        <span
                                            className="text-[11px] px-2.5 py-1 rounded-full backdrop-blur-md"
                                            style={{ background: "rgba(26,18,8,0.75)", color: "#f5ead8", border: "1px solid #c8853a44" }}
                                        >
                                            {currentCatMeta.badge}
                                        </span>
                                    )}
                                    <span
                                        className="text-xs px-2.5 py-1 rounded-full font-mono ml-auto backdrop-blur-md"
                                        style={{ background: "rgba(26,18,8,0.75)", color: "#c8853a", border: "1px solid #c8853a33" }}
                                    >
                                        {allCategoryDishes.length} поз.
                                    </span>
                                </div>
                                <h3
                                    className="text-2xl sm:text-4xl font-semibold leading-tight mb-2"
                                    style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}
                                >
                                    {currentCatMeta.label}
                                </h3>
                                <p className="text-xs sm:text-sm max-w-2xl leading-relaxed" style={{ color: "#d9c9b0" }}>
                                    {currentCatMeta.tagline}
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: "#c8853a" }}>
                                    <span>✦</span>
                                    <span>Нажмите на любую позицию в прейскуранте ниже, чтобы посмотреть детальное фото и состав</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Единый классический прейскурант раздела */}
                    <div
                        className="rounded-2xl p-6 md:p-8"
                        style={{
                            background: "#231808",
                            border: "1px solid #c8853a26",
                            boxShadow: "none",
                        }}
                    >
                        {/* Десктопная сетка: строго 2 параллельные колонки */}
                        <div className="hidden md:grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
                            <div className="flex flex-col gap-8">
                                {currentCatalog.sections.filter(s => s.col === 1).map(renderSectionBlock)}
                            </div>
                            <div className="flex flex-col gap-8">
                                {currentCatalog.sections.filter(s => s.col === 2).map(renderSectionBlock)}
                            </div>
                        </div>

                        {/* Мобильный вид: строго упорядоченная последовательность */}
                        <div className="flex flex-col md:hidden gap-8">
                            {[...currentCatalog.sections]
                                .sort((a, b) => (a.orderMobile ?? 0) - (b.orderMobile ?? 0))
                                .map(renderSectionBlock)}
                        </div>
                    </div>

                    {/* Нижняя сервисная плашка с бронированием столика */}
                    <div
                        className="mt-10 p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                        style={{ background: "#231808", border: "1px solid #c8853a26" }}
                    >
                        <div>
                            <p className="text-sm md:text-base font-medium" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>
                                Желаете забронировать столик или согласовать праздничное банкетное меню?
                            </p>
                            <p className="mt-1 text-xs" style={{ color: "#b8a98e88" }}>
                                ✦ Все блюда готовятся свежими из отборных продуктов. Ждём вас ежедневно в кафе «Белоснежка»!
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center shrink-0">
                            <button
                                type="button"
                                onClick={openBooking}
                                className="px-6 py-3 rounded-full text-xs tracking-wider uppercase font-semibold transition-[filter,transform] hover:brightness-110 active:scale-[0.96] cursor-pointer"
                                style={{
                                    background: "#c8853a",
                                    color: "#1a1208",
                                    fontFamily: "var(--font-display)",
                                    letterSpacing: "0.1em",
                                    boxShadow: "none",
                                }}
                            >
                                Забронировать столик
                            </button>
                            <a
                                href="tel:+79184350245"
                                className="px-5 py-3 rounded-full text-xs tracking-wider uppercase font-medium transition-colors hover:bg-amber-500/10 border text-center"
                                style={{
                                    borderColor: "#c8853a44",
                                    color: "#f5ead8",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                +7 (918) 435-02-45
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROMOTIONS & EVENTS ── */}
            <section id="promotions" className="py-24 md:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
                        <div>
                            <p className="mb-3 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>
                                Специальные условия
                            </p>
                            <h2 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5ead8", fontStyle: "italic" }}>
                                Акции и праздники
                            </h2>
                        </div>
                        <p className="text-sm max-w-md leading-relaxed" style={{ color: "#b8a98e" }}>
                            Индивидуальный подход к каждому мероприятию. Подарки именинникам, аренда банкетного зала до 150 человек и лучшие условия в Октябрьском.
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-10">
                        {[
                            { id: "all", label: "Все акции" },
                            { id: "birthday", label: "День рождения" },
                            { id: "banquet", label: "Заказ банкета" },
                            { id: "wedding", label: "Свадьба" },
                        ].map((tab) => {
                            const isActive = activePromoTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActivePromoTab(tab.id as any)}
                                    className="px-5 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-[background-color,color,border-color,transform] active:scale-[0.96]"
                                    style={{
                                        background: isActive ? "#c8853a" : "#231808",
                                        color: isActive ? "#1a1208" : "#d9c9b0",
                                        border: `1px solid ${isActive ? "#c8853a" : "#c8853a33"}`,
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "0.08em",
                                        boxShadow: "none",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredPromotions.map((promo) => (
                            <div
                                key={promo.id}
                                className="group rounded-2xl p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
                                style={{
                                    background: "#231808",
                                    border: "1px solid #c8853a26",
                                    boxShadow: "none",
                                }}
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-5">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                                            style={{ background: "#c8853a22", color: "#c8853a", border: "1px solid #c8853a44", fontFamily: "var(--font-display)" }}
                                        >
                                            {promo.tag}
                                        </span>
                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-display)" }}
                                        >
                                            {promo.badge}
                                        </span>
                                    </div>

                                    <h3
                                        className="text-2xl mb-1.5 leading-snug"
                                        style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}
                                    >
                                        {promo.title}
                                    </h3>
                                    <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "#c8853a", letterSpacing: "0.1em" }}>
                                        {promo.subtitle}
                                    </p>
                                    <p className="text-sm leading-relaxed mb-6" style={{ color: "#b8a98e" }}>
                                        {promo.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t" style={{ borderColor: "#c8853a22" }}>
                                    <div className="flex items-start gap-2 mb-6">
                                        <span style={{ color: "#c8853a" }} className="text-base leading-none">✦</span>
                                        <p className="text-xs leading-relaxed" style={{ color: "#d9c9b0" }}>
                                            <strong className="text-amber-300/90 font-medium">Бонус:</strong> {promo.bonus}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (promo.actionType === "table") {
                                                setBookingStep("table");
                                            } else {
                                                setBookingStep("event");
                                            }
                                        }}
                                        className="w-full py-3 rounded-xl text-xs tracking-widest uppercase font-semibold transition-[filter,transform] hover:brightness-110 active:scale-[0.96] flex items-center justify-center gap-2"
                                        style={{
                                            background: "#c8853a",
                                            color: "#1a1208",
                                            fontFamily: "var(--font-display)",
                                            letterSpacing: "0.12em",
                                            boxShadow: "none",
                                        }}
                                    >
                                        <span>{promo.actionLabel}</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            {(() => {
                const lightboxItems: LightboxItem[] = [
                    { kind: "video", src: videoExterior },
                    ...GALLERY_IMGS.map((img) => ({ kind: "image" as const, src: img.src, alt: img.alt, filter: img.filter })),
                ];
                return (
                    <section id="gallery" className="py-24 md:py-32" style={{ background: "#150e04" }}>
                        <div className="max-w-6xl mx-auto px-6">
                            <p className="mb-3 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Атмосфера</p>
                            <h2 className="mb-12 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5ead8", fontStyle: "italic" }}>
                                Внутри «Белоснежки»
                            </h2>

                            <div>
                                <button
                                    type="button"
                                    aria-label="Открыть видео — вид снаружи"
                                    onClick={() => setLightbox({ index: 0 })}
                                    className="mb-4 w-full rounded-2xl overflow-hidden relative group block text-left"
                                    style={{ background: "#2c1f0e", aspectRatio: "16/7", cursor: "pointer", boxShadow: "none" }}
                                >
                                    <SilentVideo
                                        src={videoExterior}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                        style={{ opacity: 0.92 }}
                                    />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,18,8,0.55) 0%, transparent 40%)" }} />
                                    <span className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(26,18,8,0.7)", color: "#f5ead8", fontSize: 16 }} aria-hidden="true">⤢</span>
                                    <span className="absolute bottom-4 left-5 text-xs tracking-widest uppercase" style={{ color: "#c8853a88", letterSpacing: "0.18em", fontFamily: "var(--font-display)" }}>Вид снаружи · нажмите для просмотра</span>
                                </button>

                                <div className="grid grid-cols-3 grid-rows-3 gap-4" style={{ height: "clamp(420px, 60vw, 680px)" }}>
                                    {GALLERY_IMGS.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            aria-label={`Открыть: ${img.alt}`}
                                            onClick={() => setLightbox({ index: i + 1 })}
                                            className={`${img.span} rounded-xl overflow-hidden relative group`}
                                            style={{ background: "#2c1f0e", cursor: "pointer", boxShadow: "none" }}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 outline outline-1 -outline-offset-1 outline-white/10"
                                                style={{ opacity: 0.88, filter: img.filter, objectPosition: img.pos }}
                                            />
                                            <span className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(26,18,8,0.7)", color: "#f5ead8", fontSize: 14 }} aria-hidden="true">⤢</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </section>
                );
            })()}

            {lightbox && (
                <Lightbox
                    items={[
                        { kind: "video", src: videoExterior },
                        ...GALLERY_IMGS.map((img) => ({ kind: "image" as const, src: img.src, alt: img.alt, filter: img.filter })),
                    ]}
                    index={lightbox.index}
                    onClose={() => setLightbox(null)}
                />
            )}

            {/* ── BOOK CTA ── */}
            <section className="py-24 relative overflow-hidden" style={{ background: "#c8853a" }}>
                <div className="absolute inset-0 opacity-10" aria-hidden="true" style={{ backgroundImage: "repeating-linear-gradient(45deg, #1a1208 0, #1a1208 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <h2 className="mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1a1208", fontStyle: "italic" }}>
                        Забронируйте стол.<br />Сделайте вечер особенным.
                    </h2>
                    <p className="mb-8 text-base leading-relaxed mx-auto max-w-md" style={{ color: "#2c1f0ecc" }}>
                        Мы проводим частные ужины, дни рождения, банкеты и поминальные обеды.
                        Зал вмещает до 150 гостей. Живая музыка и танцпол — по пятницам и субботам.
                    </p>
                    <button
                        onClick={openBooking}
                        className="px-10 py-4 rounded-full text-sm tracking-widest uppercase font-semibold transition-[background-color,transform] hover:brightness-110 active:scale-[0.96]"
                        style={{ background: "#1a1208", color: "#c8853a", fontFamily: "var(--font-display)", letterSpacing: "0.14em", boxShadow: "none" }}
                    >
                        Забронировать
                    </button>
                </div>
            </section>

            {/* ── CONTACTS ── */}
            <section id="contacts" className="pt-24 md:pt-32 pb-0" style={{ background: "#150e04" }}>
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <p className="mb-3 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Адрес</p>
                        <p className="leading-relaxed" style={{ color: "#d9c9b0" }}>
                            просп. Ленина, 57<br />
                            г. Октябрьский, Республика Башкортостан<br />
                            452614, Россия
                        </p>
                    </div>
                    <div>
                        <p className="mb-3 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Часы работы</p>
                        <div className="flex flex-col gap-1" style={{ color: "#d9c9b0" }}>
                            {[
                                { day: "Пн — Вт", time: "12:00 – 19:00" },
                                { day: "Ср — Чт", time: "12:00 – 03:00" },
                                { day: "Пятница", time: "12:00 – 05:00" },
                                { day: "Суббота", time: "15:00 – 05:00" },
                                { day: "Воскресенье", time: "14:00 – 03:00" },
                            ].map(({ day, time }) => (
                                <div key={day} className="flex justify-between items-baseline max-w-xs">
                                    <span>{day}</span>
                                    <span
                                        className="text-right shrink-0 font-variant-numeric-tabular"
                                        style={{
                                            color: "#c8853a",
                                            minWidth: "115px",
                                            fontVariantNumeric: "tabular-nums"
                                        }}
                                    >
                                        {time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mb-3 text-xs tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Связаться с нами</p>
                        <div className="flex flex-col gap-2" style={{ color: "#d9c9b0" }}>
                            <a href="tel:+73476735505" className="hover:text-amber-300 transition-colors">+7 (34767) 3-55-05</a>
                            <a href="tel:+79378435505" className="hover:text-amber-300 transition-colors">+7 (937) 843-55-05</a>
                            <div className="flex gap-4 mt-3">
                                <a
                                    href="https://vk.ru/belka_kafe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs tracking-widest uppercase underline underline-offset-4 hover:text-amber-300 transition-colors"
                                    style={{ color: "#c8853a", letterSpacing: "0.12em" }}
                                >
                                    ВКонтакте
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAP SECTION ── */}
            <section id="map" className="py-16 md:py-20" style={{ background: "#150e04" }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div
                        className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-[460px] rounded-xl overflow-hidden"
                        style={{ background: "#231808", boxShadow: "none" }}
                    >
                        <div
                            className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full pointer-events-none"
                            style={{
                                background: "rgba(35,24,8,0.85)",
                                border: "1px solid rgba(200,133,58,0.3)",
                                backdropFilter: "blur(8px)",
                                boxShadow: "none",
                            }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#c8853a" }} />
                            <span className="text-xs tracking-wider uppercase" style={{ color: "#f5ead8", fontFamily: "var(--font-display)" }}>
                                Мы на карте
                            </span>
                        </div>

                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7d0d08fe356de3891af271cb4048d440fbf4a9a90979b3c44dba9be142a1c5a2&amp;source=constructor"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            title="Расположение кафе Белоснежка"
                            style={{
                                border: 0,
                                display: "block",
                                width: "100%",
                                height: "100%",
                                filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(115%)"
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-8 border-t" style={{ borderColor: "#c8853a18", background: "#1a1208" }}>
                <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <span style={{ fontFamily: "var(--font-display)", color: "#c8853a", fontStyle: "italic" }}>Белоснежка</span>
                        <p className="text-xs text-center" style={{ color: "#d9c9b055" }}>
                            © {new Date().getFullYear()} Кафе «Белоснежка» · г. Октябрьский, Республика Башкортостан
                        </p>
                        <button
                            onClick={openBooking}
                            className="text-xs tracking-widest uppercase underline underline-offset-4 hover:text-amber-300 transition-colors"
                            style={{ color: "#c8853a", letterSpacing: "0.12em" }}
                        >
                            Забронировать
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-2 border-t" style={{ borderColor: "#c8853a11" }}>
                        <p className="text-xs text-center" style={{ color: "#d9c9b033" }}>
                            ООО «ЭМИ» · ИНН&nbsp;0265028241 · ОГРН&nbsp;1060265016349 · 452616, г. Октябрьский, просп. Ленина, д.&nbsp;57
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <p className="text-xs text-center" style={{ color: "#d9c9b022" }}>
                                Сайт обрабатывает персональные данные в соответствии с&nbsp;ФЗ&nbsp;№&nbsp;152-ФЗ.
                                Использование сайта означает согласие с&nbsp;использованием файлов cookie (ФЗ&nbsp;№&nbsp;149-ФЗ).
                            </p>
                            <button
                                onClick={() => setPrivacyOpen(true)}
                                className="text-xs tracking-wide underline underline-offset-2 hover:text-amber-300 transition-colors shrink-0"
                                style={{ color: "#c8853a55", letterSpacing: "0.04em" }}
                            >
                                Политика конфиденциальности
                            </button>
                        </div>
                    </div>

                    <p className="text-center pt-3" style={{ fontSize: "11px", color: "#d9c9b033" }}>
                        Сайт разработан студией{" "}
                        <a
                            href="https://vk.ru/atomadesign"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-amber-400"
                            style={{ color: "#c8853a55", textDecoration: "underline", textUnderlineOffset: 3 }}
                        >
                            PROJECT: ATOMA
                        </a>
                    </p>
                </div>
            </footer>

            {/* ── МОДАЛИ ── */}
            {activeDishModal && (
                <DishPhotoModal
                    data={activeDishModal}
                    onClose={() => setActiveDishModal(null)}
                    onBookTable={() => {
                        setActiveDishModal(null);
                        openBooking();
                    }}
                    onChangeDish={handleChangeDishInModal}
                />
            )}

            {bookingStep === "choice" && (
                <BookingChoiceModal
                    onClose={() => setBookingStep(null)}
                    triggerRef={bookingTriggerRef}
                    onChooseTable={() => setBookingStep("table")}
                    onChooseEvent={() => setBookingStep("event")}
                />
            )}
            {bookingStep === "table" && (
                <BookingTableModal
                    onClose={() => setBookingStep(null)}
                    onBack={() => setBookingStep("choice")}
                    onShowPrivacy={() => setPrivacyOpen(true)}
                />
            )}
            {bookingStep === "event" && (
                <BookingEventModal
                    onClose={() => setBookingStep(null)}
                    onBack={() => setBookingStep("choice")}
                    onShowPrivacy={() => setPrivacyOpen(true)}
                />
            )}
            {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
            {!cookieOk && <CookieBanner onAccept={acceptCookie} onShowPrivacy={() => setPrivacyOpen(true)} />}
        </div>
    );
}