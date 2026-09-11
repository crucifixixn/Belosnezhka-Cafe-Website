import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
// Фирменные соусы кафе «Белоснежка»
import sauceTartar from "@/imports/sauces/sauce_tartar.jpg";
import sauceBbq from "@/imports/sauces/sauce_bbq.jpg";
import sauceGarlic from "@/imports/sauces/sauce_garlic.jpg";
import sauceCheese from "@/imports/sauces/sauce_cheese.jpg";
import sauceTeriyaki from "@/imports/sauces/sauce_teriyaki.jpg";
import sauceMangoChili from "@/imports/sauces/sauce_mango_chili.jpg";
import sauceCaucasian from "@/imports/sauces/sauce_caucasian.jpg";
import saucePomegranate from "@/imports/sauces/sauce_pomegranate.jpg";
import sauceSoy from "@/imports/sauces/sauce_soy.jpg";
import sauceSweetSour from "@/imports/sauces/sauce_sweet_sour.jpg";
import sauceSweetChili from "@/imports/sauces/sauce_sweet_chili.jpg";
import foodCocktails5 from "@/imports/food/bar_cocktails_5.jpg";
import foodCocktails7 from "@/imports/food/bar_cocktails_7.jpg";
import foodBanquetTable from "@/imports/food/banquet_table_top.jpg";
import foodBanquetHall from "@/imports/food/banquet_hall_wide.jpg";

// Подлинные фотографии Большого зала кафе «Белоснежка»
import hallMainDancefloor from "@/imports/halls/hall_main_dancefloor.jpg";
import hallMainStage from "@/imports/halls/hall_main_stage.jpg";
import hallMainBar from "@/imports/halls/hall_main_bar.jpg";
import hallMainTables from "@/imports/halls/hall_main_tables.jpg";
import hallMainLounge from "@/imports/halls/hall_main_lounge.jpg";
import hallMainPanorama from "@/imports/halls/hall_main_panorama.jpg";

const BIG_HALL_PHOTOS = [
    {
        src: hallMainDancefloor,
        alt: "Большой банкетный зал: просторный танцпол и праздничная иллюминация",
        title: "Танцпол и панорама зала",
        desc: "Просторный танцпол с узорным центром и концертным светом для ярких торжеств",
    },
    {
        src: hallMainStage,
        alt: "Большой банкетный зал: профессиональная сцена для живой музыки",
        title: "Сцена и живой звук",
        desc: "Подиум с подсветкой, акустическое оборудование и барельеф «Белоснежка»",
    },
    {
        src: hallMainBar,
        alt: "Большой банкетный зал: фирменный бар «Белоснежка»",
        title: "Барная зона «Белоснежка»",
        desc: "Барная стойка со светящейся вывеской, напитками и подсветкой",
    },
    {
        src: hallMainTables,
        alt: "Большой банкетный зал: банкетная зона с диванами и художественным панно",
        title: "Банкетная зона и диваны",
        desc: "Комфортная посадка гостей, мягкие диваны и живописное настенное панно",
    },
    {
        src: hallMainLounge,
        alt: "Большой банкетный зал: уютная лаунж-зона с винной витриной",
        title: "Лаунж с винной витриной",
        desc: "Уютный мягкий уголок с диванами, телевизором и коллекционной витриной",
    },
    {
        src: hallMainPanorama,
        alt: "Большой банкетный зал: вид на зал и торжественную рассадку",
        title: "Торжественная рассадка",
        desc: "Вместимость до 150 гостей, колонны и сияющие звёзды под потолком",
    },
];

// Подлинные фотографии Малого зала кафе «Белоснежка»
import hallSmallOverview from "@/imports/halls/hall_small_overview.jpg";
import hallSmallBanquet from "@/imports/halls/hall_small_banquet.jpg";
import hallSmallMirror from "@/imports/halls/hall_small_mirror.jpg";
import hallSmallMuralStreet from "@/imports/halls/hall_small_mural_street.jpg";
import hallSmallMuralFeast from "@/imports/halls/hall_small_mural_feast.jpg";

const SMALL_HALL_PHOTOS = [
    {
        src: hallSmallOverview,
        alt: "Малый банкетный зал: общая панорама, хрустальная люстра и банкетный стол",
        title: "Панорама Малого зала",
        desc: "Уютный зал с хрустальной люстрой, художественными барельефами и праздничной сервировкой",
    },
    {
        src: hallSmallBanquet,
        alt: "Малый банкетный зал: сервировка банкетного стола и вид на панно",
        title: "Банкетная рассадка и декор",
        desc: "Столы для компании до 25 персон, кружевные портьеры, настенное панно и мягкий свет",
    },
    {
        src: hallSmallMirror,
        alt: "Малый банкетный зал: банкетный стол, панорамное зеркало с подсветкой и ТВ",
        title: "Лаунж с зеркалом и ТВ",
        desc: "Большое панорамное зеркало с подсветкой, экран для видеопоздравлений и приватная атмосфера",
    },
    {
        src: hallSmallMuralStreet,
        alt: "Малый банкетный зал: художественный барельеф итальянской улочки",
        title: "Барельеф «Итальянская улочка»",
        desc: "Объёмная художественная роспись ручной работы с фактурной каменной кладкой и цветами",
    },
    {
        src: hallSmallMuralFeast,
        alt: "Малый банкетный зал: барельеф торжественного застолья и скульптурный лев",
        title: "Панно «Королевский пир»",
        desc: "Фактурная картина торжественного застолья и скульптурные элементы в кирпичном обрамлении",
    },
];

const NAV_LINKS = [
    { label: "О нас", href: "#about" },
    { label: "Меню", href: "#menu" },
    { label: "Залы", href: "#halls" },
    { label: "Акции", href: "#promotions" },
    { label: "Галерея", href: "#gallery" },
    { label: "Контакты", href: "#contacts" },
];

const ENHANCE_WARM = "contrast(1.12) saturate(1.2) brightness(1.06)";
const ENHANCE_FOOD = "contrast(1.15) saturate(1.25) brightness(1.04)";
const ENHANCE_DARK = "contrast(1.08) saturate(1.1) brightness(1.1)";
const ENHANCE_EXTERN = "contrast(1.1) saturate(1.1) brightness(1.05)";

export type NutritionInfo = {
    calories: number;     // ккал на 100 г или 100 мл
    protein: number;      // белки, г
    fat: number;          // жиры, г
    carbs: number;        // углеводы, г
    isPer100Ml?: boolean; // true для напитков (на 100 мл), false для блюд (на 100 г)
};

type Dish = {
    name: string;
    weight?: string;
    price: string;
    note?: string;
    description?: string;
    img?: string;
    tag?: string;
    nutrition?: NutritionInfo;
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
        description: "Сочный шашлык из свинины, курицы или крыльев, люля-кебабы и стейки в мангале и на гриле.",
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
            { name: "Рыбная тарелка", weight: "250 г", price: "850 ₽", note: "горбуша холодного копчения, скумбрия холодного копчения, слабосолёная сёмга, лимон, оливки", img: foodFishPlate },
            { name: "Мясная тарелка", weight: "250 г", price: "800 ₽", note: "шейка свиная, карбонад (свинина), ветчина, язык говяжий, копченая колбаса", img: foodMeatPlate },
            { name: "Сырная тарелка", weight: "250 г", price: "700 ₽", note: "ассорти благородных сыров" },
            { name: "Сельдь с гарниром", weight: "500 г", price: "700 ₽", note: "филе сельди, отварной картофель, маринованный лук, корнишоны маринованные, помидоры черри, сухари, зелень" },
            { name: "Креветки в пикантном соусе", weight: "175 г", price: "750 ₽", note: "тигровые креветки, авторский пикантный соус, свежая зелень" },
            { name: "Цезарь-ролл запечённый", weight: "150 г", price: "450 ₽", note: "лаваш, куриное филе, листья салата, помидоры, сыр, соус цезарь", img: foodCaesarRoll },
            { name: "Закуска «Мексиканская»", weight: "190 г", price: "500 ₽" },
            { name: "Овощная тарелка", weight: "250 г", price: "400 ₽", note: "свежие огурцы, спелые помидоры, болгарский перец, морковча (морковь по-корейски), салат капустный, свежая зелень" },
            { name: "Фруктовая тарелка", weight: "250 г", price: "350 ₽", note: "яблоки, апельсины, киви, виноград" },
            { name: "Рулеты из баклажана", weight: "150 г", price: "350 ₽", note: "обжаренные баклажаны, сыр, орехи, чеснок, заправка из майонеза и сметаны" },
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
            { name: "Виски с колой", weight: "300 мл", price: "600 ₽", note: "виски, кола, лед", img: foodCocktails7 },
            { name: "Голубая лагуна", weight: "300 мл", price: "550 ₽", note: "водка, сироп блю кюрасао, спрайт, долька лимона, лед", img: foodCocktails5 },
            { name: "Шоты (Баунти / Баблгам / Энерджи)", weight: "50 мл", price: "250 ₽", note: "фирменные шоты от бармена", img: foodCocktails5 },
            { name: "Апельсиновый лимонад (б/а)", weight: "300 мл", price: "350 ₽", note: "апельсин, банановый сироп, содовая, лед", img: foodCocktails5 },
            { name: "Молочный коктейль в ассортименте", weight: "300 мл", price: "300 ₽", note: "молоко, мороженое пломбир, сироп на выбор", img: foodCocktails5 },
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
        id: "new",
        label: "Новинки",
        badge: "New",
        heroImg: foodPorkRibsVeg,
        tagline: "Свежие кулинарные премьеры кафе «Белоснежка»: авторские горячие блюда и сезонные новинки от нашего шеф-повара",
    },
    {
        id: "mangal",
        label: "Мангал и Стейки",
        badge: "Хит",
        heroImg: foodShashlikPork,
        tagline: "Сочные блюда в мангале, традиционный шашлык, люля-кебабы, стейки и садж на компанию из отборного мяса и рыбы",
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
        tagline: "Наваристые супы, сытная солянка, домашнее жаркое, сытные горячие блюда, аппетитные гарниры и свежая выпечка",
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
    {
        id: "wishes",
        label: "Карта пожеланий",
        badge: "Прейскурант & Правила",
        heroImg: imgWeddingHall,
        tagline: "Прейскурант возмещения инвентаря и правила комфортного отдыха в кафе «Белоснежка»",
    },
];

const FULL_CATALOG: MenuCategory[] = [
    {
        id: "new",
        title: "Новинки меню",
        sections: [
            {
                title: "Фирменные новинки сезона",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Свинина с овощами", weight: "150 г", price: "650 ₽", note: "баклажаны, помидоры, свинина", img: foodPorkRibsVeg, tag: "Новинка" },
                    { name: "Китайские пельмени Цзяоцзы", weight: "150 г", price: "300 ₽", note: "домашние китайские пельмени цзяоцзы с сочной говяжьей начинкой", tag: "Новинка" },
                ],
            },
        ],
    },
    {
        id: "mangal",
        title: "Мангал и Стейки",
        sections: [
            {
                title: "Шашлыки на мангале",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Шашлык свиной", weight: "100 г", price: "400 ₽", note: "свиная шейка, маринованный лук", img: foodShashlikPork },
                    { name: "Шашлык куриный", weight: "100 г", price: "350 ₽", note: "куриное филе, фирменный маринад", img: foodShashlikChicken },
                    { name: "Шашлык из курицы с овощами", weight: "100 г", price: "350 ₽", note: "куриное филе, перец болгарский, лук", img: foodShashlikChickenVeg },
                    { name: "Шашлык из крыльев", weight: "100 г", price: "300 ₽", note: "куриные крылышки, пикантный маринад", img: foodShashlikChicken },
                    { name: "Люля кебаб с говядиной", weight: "100 г", price: "350 ₽", note: "рубленая говядина, свежая зелень, лук, пряности", img: foodLyulyaBeef },
                    { name: "Люля кебаб куриный", weight: "100 г", price: "300 ₽", note: "рубленое куриное филе, ароматные пряности", img: foodLyulyaChicken },
                ],
            },
            {
                title: "Стейки и Садж",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Сёмга", weight: "100 г", price: "650 ₽", note: "филе атлантической сёмги, лимон, свежая зелень", img: foodSteakSalmon },
                    { name: "Говядина", weight: "100 г", price: "650 ₽", note: "отборная говядина, розмарин, пряности", img: foodSteakBeefRibeye },
                    { name: "Свинина", weight: "100 г", price: "450 ₽", note: "свиная шейка, специи", img: foodSteakPork },
                    { name: "Садж", weight: "1200 г", price: "3200 ₽", note: "ассорти мяса, картофель, грибы, кабачки, болгарский перец, маринованный лук", img: foodSadzhAssorti },
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
                    { name: "Белоснежка", weight: "150 г", price: "400 ₽", note: "куриное филе, грибы, свежие огурцы, отварной картофель, отварная морковь, варёное яйцо, майонез" },
                    { name: "Цезарь с курицей", weight: "150 г", price: "450 ₽", note: "куриное филе, листья салата, помидоры, сыр, сухари, соус цезарь" },
                    { name: "Греческий", weight: "150 г", price: "500 ₽", note: "помидоры, свежие огурцы, перец болгарский, сыр фета, маслины, оливковое масло" },
                    { name: "С хрустящим баклажаном", weight: "150 г", price: "500 ₽", note: "хрустящие баклажаны, помидоры, сыр фета, зелень, кисло-сладкая заправка" },
                    { name: "Оригинальный", weight: "150 г", price: "500 ₽", note: "сочная курица, язык говяжий, помидоры, грибы маринованные" },
                    { name: "Версаль", weight: "150 г", price: "500 ₽", note: "курица, язык говяжий, сочные овощи, пикантный соус" },
                    { name: "Римский", weight: "150 г", price: "400 ₽", note: "листья салата, куриная грудка, помидоры, перец болгарский, медовая заправка" },
                    { name: "Матадор", weight: "150 г", price: "500 ₽", note: "говядина, свежие овощи, зелень, пряная заправка" },
                    { name: "Салат Легкий", weight: "150 г", price: "550 ₽", note: "креветки, свежие овощи, оливки, листья салата, медово-горчичная заправка (французская горчица), растительное масло" },
                ],
            },
            {
                title: "Рыбные и Деликатесные",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Цезарь с креветками", weight: "150 г", price: "550 ₽", note: "креветки, салатные листья, помидоры, сыр голландский, сухари, соус цезарь" },
                    { name: "Цезарь с сёмгой", weight: "150 г", price: "500 ₽", note: "слабосолёная сёмга, салатные листья, помидоры, сыр, сухари, соус цезарь" },
                    { name: "Парус", weight: "150 г", price: "500 ₽", note: "морковча, жареные грибы, обжаренное филе курицы, сыр, дольки куриного яйца, сметана" },
                    { name: "Царский", weight: "150 г", price: "500 ₽", note: "морковча, говядина обжаренная, перец, огурцы, заправка фирменная" },
                    { name: "Лагуна", weight: "150 г", price: "500 ₽", note: "креветки, свежие огурцы, помидоры, изысканная заправка" },
                    { name: "Престиж", weight: "150 г", price: "450 ₽", note: "отборное мясное филе, свежие овощи, маслины, фирменная заправка" },
                    { name: "Салат Каприз", weight: "150 г", price: "450 ₽", note: "куриная печень, листья салата, помидоры, апельсин, медово-горчичная заправка, кунжут" },
                    { name: "Салат Микс", weight: "150 г", price: "500 ₽", note: "отварная свёкла, листья салата, сёмга, апельсин, брынза, медово-горчичная заправка" },
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
                    { name: "Закуска Мексиканская", weight: "190 г", price: "500 ₽", note: "морковча, ветчина, язык говяжий, маринованные огурцы, болгарский перец, заправка: растительное масло" },
                ],
            },
            {
                title: "Горячие закуски и снеки",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Креветки в пикантном соусе", weight: "175 г", price: "750 ₽" },
                    { name: "Цезарь-ролл запечённый", weight: "150 г", price: "450 ₽", img: foodCaesarRoll },
                    { name: "Конвертики с курицей", weight: "170 г", price: "400 ₽", note: "тонкий лаваш, куриное филе, болгарский перец, сыр, специи" },
                    { name: "Конвертики с грибами", weight: "170 г", price: "350 ₽", note: "лаваш, грибы, сыр" },
                    { name: "Сырные палочки", weight: "100 г", price: "250 ₽" },
                    { name: "Наггетсы", weight: "100 г", price: "200 ₽" },
                    { name: "Луковые кольца", weight: "100 г", price: "200 ₽", note: "репчатый лук, яйцо, панировочные сухари, специи" },
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
                    { name: "Солянка сборная", weight: "250 г", price: "320 ₽" },
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
                    { name: "Жаркое по-армянски", weight: "250 г", price: "650 ₽", note: "говядина, картофель, болгарский перец, лук, томаты, кавказские специи, зелень", img: foodZharkoeArmenia },
                    { name: "Свинина с овощами", weight: "150 г", price: "650 ₽", note: "баклажаны, помидоры, свинина", img: foodPorkRibsVeg, tag: "Новинка" },
                    { name: "Свинина в соусе с грибами", weight: "150 г", price: "630 ₽", img: foodPorkMushroomSauce },
                    { name: "Печень по-татарски", weight: "150 г", price: "600 ₽", note: "говяжья печень, лук репчатый, маринованные огурцы, томатный соус, зелень", img: foodSteakPork2 },
                    { name: "Куриная грудка с овощами", weight: "200 г", price: "550 ₽", note: "куриное филе, сочные овощи, яйцо и сыр перемешиваются и запекаются вместе с блюдом", img: foodShashlikChickenVeg },
                    { name: "Рагу овощное с курицей", weight: "250 г", price: "550 ₽" },
                    { name: "Китайский дракон", weight: "170 г", price: "500 ₽", note: "куриное филе, лук репчатый, перец болгарский, маринованные огурцы, зелень, кунжут", img: foodDishDragon },
                    { name: "Курица по-гавайски", weight: "150 г", price: "500 ₽", img: foodChickenFestive },
                    { name: "Курица по-французски", weight: "150 г", price: "450 ₽", img: foodChickenFestive },
                    { name: "Дорадо", weight: "100 г", price: "450 ₽" },
                    { name: "Горбуша под овощами", weight: "150 г", price: "400 ₽" },
                    { name: "Удон с креветками", weight: "150 г", price: "400 ₽" },
                    { name: "Удон с курицей", weight: "150 г", price: "350 ₽", note: "лапша удон ручной работы собственного приготовления, куриное филе, овощи, соус терияки" },
                    { name: "Удон с грибами", weight: "150 г", price: "350 ₽" },
                    { name: "Китайские пельмени Цзяоцзы", weight: "150 г", price: "300 ₽", note: "домашние китайские пельмени цзяоцзы с сочной говяжьей начинкой" },
                    { name: "Жареные пельмени с курицей", weight: "150 г", price: "280 ₽" },
                ],
            },
            {
                title: "Гарниры",
                col: 1,
                orderMobile: 3,
                items: [
                    { name: "Булгур с овощами", weight: "200 г", price: "300 ₽", note: "рассыпчатый булгур, пассерованные овощи, зелень" },
                    { name: "Овощи запечённые", weight: "100 г", price: "250 ₽" },
                    { name: "Картофель с чесноком", weight: "150 г", price: "220 ₽", img: foodSteakBeefPotato },
                    { name: "Запечённый картофель", weight: "150 г", price: "200 ₽", note: "картофель, ароматные специи, растительное масло", img: foodSteakBeefPotato },
                    { name: "Фасоль стручковая", weight: "150 г", price: "200 ₽" },
                    { name: "Картофель фри", weight: "100 г", price: "170 ₽", img: foodLyulyaChicken },
                ],
            },
            {
                title: "Хлеб",
                col: 1,
                orderMobile: 4,
                items: [
                    { name: "Лаваш", weight: "100 г", price: "100 ₽" },
                    { name: "Булочка", weight: "60 г", price: "30 ₽", note: "свежая мягкая булочка из собственной выпечки кафе" },
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
                    { name: "Пепперони", price: "550 ₽", img: foodPizzaMargarita },
                    { name: "Грибная поляна", price: "550 ₽", note: "шампиньоны, сырный соус, майонез, сыр моцарелла, зелень", img: foodPizzaGribnaya },
                    { name: "Гавайская", price: "550 ₽", note: "куриное филе, сочные ананасы, соус цезарь, сыр моцарелла", img: foodPizzaGavayskaya },
                    { name: "Сырная", price: "550 ₽", img: foodPizzaMargarita },
                    { name: "Маргарита", price: "500 ₽", img: foodPizzaMargarita },
                ],
            },
            {
                title: "Фирменные соусы",
                col: 2,
                orderMobile: 2,
                items: [
                    { name: "Тар-тар", weight: "30 г", price: "70 ₽", img: sauceTartar },
                    { name: "Барбекю", weight: "30 г", price: "70 ₽", img: sauceBbq },
                    { name: "Чесночный", weight: "30 г", price: "70 ₽", img: sauceGarlic },
                    { name: "Сырный", weight: "30 г", price: "70 ₽", img: sauceCheese },
                    { name: "Терияки", weight: "30 г", price: "70 ₽", img: sauceTeriyaki },
                    { name: "Манго-чили", weight: "30 г", price: "70 ₽", img: sauceMangoChili },
                    { name: "Кавказский", weight: "30 г", price: "70 ₽", img: sauceCaucasian },
                    { name: "Гранатовый", weight: "30 г", price: "70 ₽", img: saucePomegranate },
                    { name: "Соевый", weight: "30 г", price: "70 ₽", img: sauceSoy },
                    { name: "Кисло-сладкий", weight: "30 г", price: "70 ₽", img: sauceSweetSour },
                    { name: "Сладкий чили", weight: "30 г", price: "70 ₽", img: sauceSweetChili },
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
                    { name: "Чай в чайнике фруктово-ягодный", weight: "1500 мл", price: "400 ₽" },
                    { name: "Чай в чайнике фруктово-ягодный", weight: "500 мл", price: "220 ₽" },
                    { name: "Чай в чайнике с чабрецом", weight: "1500 мл", price: "250 ₽" },
                    { name: "Чай в чайнике с чабрецом", weight: "500 мл", price: "170 ₽" },
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
                    { name: "Шоколад", weight: "100 г", price: "190 ₽" },
                    { name: "Кофе натуральный «Гляссе»", weight: "50/100 г", price: "180 ₽" },
                    { name: "Кофе быстрорастворимый «КАПУЧИНО» с корицей", weight: "150 г", price: "150 ₽" },
                    { name: "Кофе быстрорастворимый «Гляссе»", weight: "150/50 г", price: "150 ₽" },
                    { name: "Кофе быстрорастворимый «Капучино»", weight: "150 г", price: "130 ₽" },
                    { name: "Кофе по турецки (натуральный)", weight: "50 г", price: "100 ₽" },
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
                    { name: "Пломбир", weight: "100 г", price: "100 ₽" },
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
                    { name: "Виски «William Lawsons»", weight: "0,5 л", price: "4000 ₽" },
                    { name: "Виски «Bells»", weight: "0,5 л", price: "3900 ₽" },
                    { name: "Виски «Fox&Dog's»", weight: "0,7 л", price: "2940 ₽" },
                    { name: "Виски «Fox&Dog's»", weight: "0,5 л", price: "2100 ₽" },
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
                    { name: "Пиво «Бад 0»", weight: "бут.", price: "250 ₽" },
                    { name: "Пиво «Балтика 0»", weight: "бут.", price: "250 ₽" },
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
                title: "Безалкогольные коктейли",
                col: 2,
                orderMobile: 8,
                items: [
                    { name: "Апельсиновый лимонад", weight: "300 мл", price: "350 ₽", note: "апельсин, сироп банана, содовая", img: foodCocktails5 },
                    { name: "Голубая лагуна", weight: "300 мл", price: "250 ₽", note: "сироп блю кюрасао, спрайт", img: foodCocktails5 },
                    { name: "Молочный коктейль (в ас-те)", weight: "300 мл", price: "300 ₽" },
                    { name: "Соки (в ассортименте)", weight: "1 л", price: "300 ₽" },
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
    {
        id: "wishes",
        title: "Карта пожеланий",
        sections: [
            {
                title: "Посуда и Стекло",
                col: 1,
                orderMobile: 1,
                items: [
                    { name: "Стакан", price: "100 ₽" },
                    { name: "Рюмки", price: "100 ₽" },
                    { name: "Фужеры", price: "200 ₽" },
                    { name: "Пивные кружки", price: "300 ₽" },
                    { name: "Графины под сок", price: "300 ₽" },
                    { name: "Графины под водку", price: "300 ₽" },
                    { name: "Кофейная пара", price: "300 ₽" },
                    { name: "Чайная пара", price: "300 ₽" },
                    { name: "Чайник заварочный М.", price: "350 ₽" },
                    { name: "Чайник заварочный Б.", price: "700 ₽" },
                    { name: "Подставки для чайника", price: "300 ₽" },
                    { name: "Молочник", price: "100 ₽" },
                ],
            },
            {
                title: "Столовые приборы и Сервировка",
                col: 1,
                orderMobile: 2,
                items: [
                    { name: "Ложки", price: "100 ₽" },
                    { name: "Ложки чайные", price: "100 ₽" },
                    { name: "Вилки", price: "100 ₽" },
                    { name: "Ножи", price: "100 ₽" },
                    { name: "Набор соль+перец", price: "300 ₽" },
                    { name: "Сахарница с дозатором", price: "200 ₽" },
                    { name: "Сахарница с крышкой для меда", price: "500 ₽" },
                    { name: "Хлебница", price: "150 ₽" },
                    { name: "Розетки", price: "100 ₽" },
                ],
            },
            {
                title: "Тарелки и Блюда",
                col: 2,
                orderMobile: 3,
                items: [
                    { name: "Тарелки под второе", price: "300 ₽" },
                    { name: "Суповые тарелки", price: "300 ₽" },
                    { name: "Квадратные тарелки", price: "300 ₽" },
                    { name: "Сервировочные тарелки", price: "300 ₽" },
                    { name: "Овальные, квадратные, круглые блюда", price: "300 ₽" },
                    { name: "Салатница", price: "300 ₽" },
                    { name: "Селедочница", price: "300 ₽" },
                    { name: "Фруктовница", price: "700 ₽" },
                    { name: "Креманка", price: "200 ₽" },
                    { name: "Жульенница", price: "100 ₽" },
                ],
            },
            {
                title: "Инвентарь и Сервисные правила",
                col: 2,
                orderMobile: 4,
                items: [
                    { name: "Папка для чеков", price: "300 ₽" },
                    { name: "Меню", price: "500 ₽" },
                    { name: "Утеря гардеробного номерка (штраф)", price: "250 ₽" },
                    { name: "Внос и распитие своего алкоголя / напитков (штраф)", price: "1000 ₽" },
                ],
            },
        ],
    },
];

const GALLERY_IMGS = [
    { src: hallMainStage, alt: "Большой зал — сцена для живой музыки и танцпол", span: "col-span-2 row-span-2", pos: "center center", filter: ENHANCE_WARM, title: "Сцена и живой звук", subtitle: "Большой зал" },
    { src: hallMainBar, alt: "Барная зона кафе «Белоснежка» с авторской подсветкой", span: "col-span-1 row-span-1", pos: "center center", filter: ENHANCE_DARK, title: "Барная зона", subtitle: "Коктейли и напитки" },
    { src: hallSmallMirror, alt: "Малый зал — зеркальная галерея и уютная обстановка", span: "col-span-1 row-span-1", pos: "center center", filter: ENHANCE_WARM, title: "Малый зал", subtitle: "Уютная атмосфера" },
    { src: hallSmallMuralFeast, alt: "Малый зал — настенные фрески и банкетный стол", span: "col-span-1 row-span-1", pos: "center center", filter: ENHANCE_WARM, title: "Художественные фрески", subtitle: "Авторский декор" },
    { src: hallMainDancefloor, alt: "Танцпол и иллюминация для вечерних программ", span: "col-span-1 row-span-1", pos: "center center", filter: ENHANCE_WARM, title: "Танцпол и свет", subtitle: "Вечерние шоу" },
    { src: hallMainTables, alt: "Большой банкетный зал — рассадка до 150 персон", span: "col-span-1 row-span-1", pos: "center center", filter: ENHANCE_WARM, title: "Банкетный зал", subtitle: "Рассадка до 150 гостей" },
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
        badge: "-5% наличными",
        title: "Скидка на День Рождения",
        subtitle: "Отпразднуйте с выгодой и размахом",
        description: "Дарим скидку 5% на всё меню кухни в ваш день рождения, а также 3 дня до и 3 дня после праздника. Скидка 5% действует строго при оплате наличными. Живая музыка и поздравление от кафе.",
        bonus: "Скидка 5% предоставляется исключительно при оплате наличными",
        actionLabel: "Забронировать",
        actionType: "table",
    },
    {
        id: "banquet",
        category: "banquet",
        tag: "Банкеты",
        badge: "Свои напитки и фрукты",
        title: "Заказ банкета «Под ключ»",
        subtitle: "Юбилеи, праздники и памятные даты",
        description: "Индивидуальный расчет меню от 2200 ₽/чел. Вместительные залы до 150 и до 25 персон с профессиональным световым и звуковым оборудованием, сценой и танцполом. Разрешены свои напитки и фрукты.",
        bonus: "Свои напитки и фрукты без пробкового сбора",
        actionLabel: "Забронировать",
        actionType: "event",
    },
    {
        id: "wedding",
        category: "wedding",
        tag: "Свадьба",
        badge: "-5% наличными",
        title: "Свадебное торжество",
        subtitle: "Главный день в красивом банкетном зале",
        description: "Торжественный банкет в просторном зале до 150 посадочных мест со сценой и танцполом. Скидка 5% на свадебное банкетное меню предоставляется только при оплате наличными.",
        bonus: "Скидка 5% только при оплате наличными",
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

// ─── Менеджер блокировки скролла (исключение layout shift и залипания) ─────────

let scrollLockCount = 0;
let originalBodyOverflow = "";
let originalBodyPaddingRight = "";

function lockScroll() {
    if (typeof document === "undefined") return;
    if (scrollLockCount === 0) {
        originalBodyOverflow = document.body.style.overflow;
        // Проверяем поддержку scrollbar-gutter: stable для точной компенсации в старых браузерах
        const supportsGutter = window.CSS && CSS.supports && CSS.supports("scrollbar-gutter", "stable");
        if (!supportsGutter) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                originalBodyPaddingRight = document.body.style.paddingRight;
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
        document.body.style.overflow = "hidden";
    }
    scrollLockCount++;
}

function unlockScroll() {
    if (typeof document === "undefined") return;
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
        document.body.style.overflow = originalBodyOverflow;
        if (originalBodyPaddingRight) {
            document.body.style.paddingRight = originalBodyPaddingRight;
        } else {
            document.body.style.removeProperty("padding-right");
        }
        originalBodyOverflow = "";
        originalBodyPaddingRight = "";
    }
}

function useScrollLock(active: boolean = true) {
    useEffect(() => {
        if (!active) return;
        lockScroll();
        return () => {
            unlockScroll();
        };
    }, [active]);
}

// ─── Лайтбокс ───────────────────────────────────────────────────────────────

type LightboxItem =
    | { kind: "image"; src: string; alt: string; filter?: string }
    | { kind: "video"; src: string };

function Lightbox({ items, index, onClose }: { items: LightboxItem[]; index: number; onClose: () => void }) {
    const [current, setCurrent] = useState(index);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const isMouseDown = useRef(false);
    const startX = useRef(0);
    const startY = useRef(0);
    const currentX = useRef(0);
    const currentY = useRef(0);
    const isHorizontal = useRef<boolean | null>(null);
    const hasMoved = useRef(false);
    const wheelLock = useRef(false);

    useScrollLock();

    const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
    const next = () => setCurrent((c) => (c + 1) % items.length);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [items.length, onClose]);

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            startX.current = e.touches[0].clientX;
            startY.current = e.touches[0].clientY;
            currentX.current = e.touches[0].clientX;
            currentY.current = e.touches[0].clientY;
            isHorizontal.current = null;
            hasMoved.current = false;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;
        const cx = e.touches[0].clientX;
        const cy = e.touches[0].clientY;
        currentX.current = cx;
        currentY.current = cy;
        const dx = cx - startX.current;
        const dy = cy - startY.current;

        if (isHorizontal.current === null) {
            if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
                isHorizontal.current = Math.abs(dx) > Math.abs(dy);
                if (isHorizontal.current) {
                    setIsDragging(true);
                }
            }
        }

        if (isHorizontal.current === true) {
            let offset = dx;
            if ((current === 0 && dx > 0) || (current === items.length - 1 && dx < 0)) {
                offset = dx * 0.35;
            }
            setDragOffset(offset);
            if (Math.abs(dx) > 10) {
                hasMoved.current = true;
            }
        }
    };

    const handleTouchEnd = () => {
        const dx = currentX.current - startX.current;
        const dy = currentY.current - startY.current;

        // Свайп вниз — закрыть окно
        if (isHorizontal.current === false && dy > 60 && Math.abs(dy) > Math.abs(dx) * 1.2) {
            onClose();
            return;
        }

        setIsDragging(false);
        setDragOffset(0);
        const wasHorizontal = isHorizontal.current;
        isHorizontal.current = null;

        if (wasHorizontal && Math.abs(dx) > 40) {
            if (dx < 0 && current < items.length - 1) {
                setCurrent((c) => c + 1);
            } else if (dx > 0 && current > 0) {
                setCurrent((c) => c - 1);
            }
        }
    };

    const handleTouchCancel = () => {
        setIsDragging(false);
        setDragOffset(0);
        isHorizontal.current = null;
    };

    // Мышиные обработчики для плавного скролла/перетаскивания на десктопе
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        isMouseDown.current = true;
        startX.current = e.clientX;
        startY.current = e.clientY;
        currentX.current = e.clientX;
        currentY.current = e.clientY;
        hasMoved.current = false;
        isHorizontal.current = null;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current) return;
        const cx = e.clientX;
        currentX.current = cx;
        const dx = cx - startX.current;
        if (Math.abs(dx) > 5) {
            setIsDragging(true);
            hasMoved.current = true;
            let offset = dx;
            if ((current === 0 && dx > 0) || (current === items.length - 1 && dx < 0)) {
                offset = dx * 0.35;
            }
            setDragOffset(offset);
        }
    };

    const handleMouseUp = () => {
        if (!isMouseDown.current) return;
        isMouseDown.current = false;
        setIsDragging(false);
        setDragOffset(0);
        const dx = currentX.current - startX.current;
        if (Math.abs(dx) > 40) {
            if (dx < 0 && current < items.length - 1) {
                setCurrent((c) => c + 1);
            } else if (dx > 0 && current > 0) {
                setCurrent((c) => c - 1);
            }
        }
        setTimeout(() => {
            hasMoved.current = false;
        }, 50);
    };

    // Горизонтальный скролл колесиком / трекпадом
    const handleWheel = (e: React.WheelEvent) => {
        if (wheelLock.current) return;
        if (Math.abs(e.deltaX) > 25 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            if (e.deltaX > 25 && current < items.length - 1) {
                wheelLock.current = true;
                setCurrent((c) => c + 1);
                setTimeout(() => { wheelLock.current = false; }, 400);
            } else if (e.deltaX < -25 && current > 0) {
                wheelLock.current = true;
                setCurrent((c) => c - 1);
                setTimeout(() => { wheelLock.current = false; }, 400);
            }
        }
    };

    return (
        <div
            role="presentation"
            className="fixed inset-0 z-50 flex flex-col justify-between select-none touch-none"
            style={{ background: "rgba(10,7,2,0.96)", backdropFilter: "blur(8px)", overscrollBehavior: "contain" }}
            onClick={(e) => {
                if (!hasMoved.current && (e.target === e.currentTarget)) {
                    onClose();
                }
            }}
            onWheel={handleWheel}
        >
            {/* Верхняя панель: закрытие и счетчик */}
            <div className="relative w-full h-14 shrink-0 flex items-center justify-between px-5 md:px-8 z-30 pointer-events-auto">
                {/* Мобильная ручка-подсказка для свайпа вниз */}
                <div className="w-12 h-1.5 rounded-full bg-[#c8853a55] md:hidden pointer-events-none absolute top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />

                <div className="text-sm sm:text-base tracking-widest uppercase font-medium" style={{ color: "#c8853a" }}>
                    {items.length > 1 ? `${current + 1} / ${items.length}` : ""}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть"
                    className="text-3xl leading-none opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-[#f5ead8] p-2 -mr-2"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    ×
                </button>
            </div>

            {/* Основная зона: плавно скроллящаяся лента с фотографиями и видео */}
            <div
                className="flex-1 w-full overflow-hidden relative flex items-center justify-center cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={(e) => {
                    if (e.target === e.currentTarget && !hasMoved.current) {
                        onClose();
                    }
                }}
            >
                <div
                    className="flex h-full w-full items-center"
                    style={{
                        transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
                        transition: isDragging ? "none" : "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
                        willChange: "transform",
                    }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-full h-full shrink-0 flex items-center justify-center p-3 md:p-6"
                            onClick={(e) => {
                                if (e.target === e.currentTarget && !hasMoved.current) {
                                    onClose();
                                }
                            }}
                        >
                            {item.kind === "image" ? (
                                <div
                                    className="relative rounded-2xl overflow-hidden outline outline-1 -outline-offset-1 outline-white/15 max-h-[72vh] md:max-h-[78vh] flex items-center justify-center pointer-events-none select-none"
                                    style={{ borderRadius: "1rem" }}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        draggable={false}
                                        className="rounded-2xl object-contain max-h-[72vh] md:max-h-[78vh] max-w-[min(92vw,1200px)] w-auto h-auto block select-none pointer-events-none"
                                        style={{ filter: item.filter, borderRadius: "1rem" }}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-[min(90vw,1200px)] rounded-2xl overflow-hidden outline outline-1 -outline-offset-1 outline-white/15 max-h-[72vh] md:max-h-[78vh]"
                                    style={{ borderRadius: "1rem" }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {idx === current ? (
                                        <PlyrVideo src={item.src} />
                                    ) : (
                                        <div className="w-full aspect-video bg-black/60 flex items-center justify-center text-[#c8853a]">
                                            <span className="text-3xl">▶</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Стрелки пролистывания на десктопе (как в карточках блюд меню) */}
            {items.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="Предыдущее фото"
                        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none z-40"
                        style={{ background: "rgba(26,18,8,0.85)", color: "#f5ead8", border: "1px solid #c8853a55" }}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="Следующее фото"
                        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none z-40"
                        style={{ background: "rgba(26,18,8,0.85)", color: "#f5ead8", border: "1px solid #c8853a55" }}
                    >
                        ›
                    </button>
                </>
            )}

            {/* Нижняя панель: Page Controls под открытыми фотографиями и видео — скрыта на десктопе, активна на мобильных */}
            <div className="md:hidden shrink-0 flex flex-col items-center justify-center pb-5 pt-2 px-4 z-30 pointer-events-auto">
                {items.length > 1 && (
                    <div
                        className="flex items-center justify-center gap-2 max-w-[92vw] overflow-x-auto py-1 px-3 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.map((it, idx) => {
                            const isActive = idx === current;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrent(idx)}
                                    aria-label={`Перейти к ${it.kind === "video" ? "видео" : "фото"} ${idx + 1}`}
                                    className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                                        isActive
                                            ? "w-7 sm:w-8 h-2.5 bg-[#c8853a]"
                                            : "w-2.5 h-2.5 bg-[#f5ead8]/35 hover:bg-[#f5ead8]/70 hover:scale-125"
                                    }`}
                                    title={`${it.kind === "video" ? "Видео" : "Фото"} ${idx + 1} из ${items.length}`}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Вспомогательные функции для оформления меню и фото ───────────────────────

function formatPrice(priceStr: string): string {
    if (!priceStr) return "";
    return priceStr
        .replace(/^от\s*/i, "от\u00A0")
        .replace(/\s*₽/g, "\u00A0₽");
}

function getDishImage(dish: Dish, categoryId?: string): string {
    if (dish.img) return dish.img;
    const nameLower = dish.name.toLowerCase();
    if (nameLower.includes("шашлык") || nameLower.includes("люля") || nameLower.includes("стейк") || nameLower.includes("садж")) {
        return imgMenuShashlik;
    }
    if (nameLower.includes("тарелка") || nameLower.includes("закуск") || nameLower.includes("сельдь") || nameLower.includes("рулет") || nameLower.includes("креветк") || nameLower.includes("палочки") || nameLower.includes("гренки") || nameLower.includes("наггетс") || nameLower.includes("кольца")) {
        return imgMenuPlatter;
    }
    if (nameLower.includes("коктейль") || nameLower.includes("мохито") || nameLower.includes("шот") || nameLower.includes("лимонад") || nameLower.includes("санрайз") || nameLower.includes("айленд") || nameLower.includes("лагуна") || nameLower.includes("кола") || nameLower.includes("сок")) {
        return imgMenuCocktails;
    }
    if (nameLower.includes("банкет") || nameLower.includes("праздник") || nameLower.includes("свадебн") || nameLower.includes("обед")) {
        return imgMenuBanquet;
    }
    if (nameLower.includes("пиво") || nameLower.includes("водка") || nameLower.includes("коньяк") || nameLower.includes("виски") || nameLower.includes("вино") || nameLower.includes("бар")) {
        return imgCocktailsWide;
    }
    if (nameLower.includes("салат")) {
        return imgHero;
    }
    if (nameLower.includes("тар-тар") || nameLower.includes("тартар")) return sauceTartar;
    if (nameLower.includes("барбекю") || nameLower.includes("bbq")) return sauceBbq;
    if (nameLower.includes("чесночный") && (categoryId === "pizza_sauces" || dish.weight === "30 г")) return sauceGarlic;
    if (nameLower.includes("сырный") && (categoryId === "pizza_sauces" || dish.weight === "30 г")) return sauceCheese;
    if (nameLower.includes("терияки")) return sauceTeriyaki;
    if (nameLower.includes("манго-чили")) return sauceMangoChili;
    if (nameLower.includes("кавказский")) return sauceCaucasian;
    if (nameLower.includes("гранатовый")) return saucePomegranate;
    if (nameLower.includes("соевый")) return sauceSoy;
    if (nameLower.includes("кисло-сладкий")) return sauceSweetSour;
    if (nameLower.includes("сладкий чили")) return sauceSweetChili;
    if (nameLower.includes("пицца") || nameLower.includes("соус")) {
        return foodPizzaMargarita;
    }
    if (nameLower.includes("чай") || nameLower.includes("кофе") || nameLower.includes("мороженое") || nameLower.includes("пломбир") || nameLower.includes("шоколад")) {
        return imgHeroOld;
    }
    if (categoryId === "mangal") return imgMenuShashlik;
    if (categoryId === "starters") return imgMenuPlatter;
    if (categoryId === "bar") return imgMenuCocktails;
    if (categoryId === "banquet") return imgMenuBanquet;
    if (categoryId === "wishes") return imgWeddingHall;
    if (categoryId === "salads") return imgHero;
    return imgHero;
}

function getDishDescription(dish: Dish, categoryId?: string): string {
    if (dish.description) return dish.description;
    const nameLower = dish.name.toLowerCase();

    // Специальные барные напитки
    if (nameLower.includes("голубая лагуна")) {
        return nameLower.includes("б/а")
            ? "Освежающий безалкогольный коктейль со вкусом Блю Кюрасао, искрящимся спрайтом, цитрусовыми и кубиками льда."
            : "Популярный авторский коктейль бирюзового цвета на основе водки, ликёра Блю Кюрасао, спрайта и цитрусовых со льдом.";
    }

    // ── 1. Категория "Мангал и Стейки" ──
    if (categoryId === "mangal" || nameLower.includes("шашлык") || nameLower.includes("люля-кебаб") || nameLower.includes("садж") || (nameLower.includes("стейк") && !nameLower.includes("удон"))) {
        if (nameLower.includes("шашлык свиной")) {
            return "Сочный шашлык из отборной свиной шейки, маринованный по традиционному рецепту и приготовленный в мангале. Подаётся с маринованным луком.";
        }
        if (nameLower.includes("шашлык из курицы с овощами")) {
            return "Аппетитный шашлык из нежного куриного филе с болгарским перцем и репчатым луком, приготовленный в мангале.";
        }
        if (nameLower.includes("шашлык куриный")) {
            return "Нежное куриное филе в авторском маринаде, приготовленное в мангале до сочной румяной корочки.";
        }
        if (nameLower.includes("шашлык из крыльев")) {
            return "Хрустящие куриные крылышки в пикантном маринаде, приготовленные в мангале до золотистого цвета.";
        }
        if (nameLower.includes("люля-кебаб с говядиной")) {
            return "Классический сочный кебаб из рубленой говядины со свежей зеленью, луком и восточными пряностями, приготовленный в мангале.";
        }
        if (nameLower.includes("люля-кебаб куриный")) {
            return "Нежный кебаб из рубленого куриного филе с ароматными пряностями, приготовленный в мангале.";
        }
        if (nameLower.includes("садж")) {
            return "Праздничное блюдо на компанию: сочное ассорти мяса, запечённый картофель, грибы, кабачки, болгарский перец и маринованный лук.";
        }
        if (nameLower.includes("стейк из сёмги") || nameLower.includes("стейк из семги")) {
            return "Филе атлантической сёмги на гриле с золотистой корочкой, долькой лимона и свежей зеленью.";
        }
        if (nameLower.includes("стейк из говядины")) {
            return "Сочный стейк из отборной говядины с пряным розмарином и идеальной прожаркой.";
        }
        if (nameLower.includes("стейк из свинины")) {
            return "Аппетитный стейк из свиной шейки на гриле с сочной золотистой корочкой.";
        }
    }

    // ── 2. Категория "Салаты" ──
    if (
        categoryId === "salads" ||
        nameLower.includes("салат") ||
        nameLower.includes("цезарь") ||
        nameLower.includes("греческий") ||
        nameLower.includes("белоснежка") ||
        nameLower.includes("оригинальный") ||
        nameLower.includes("версаль") ||
        nameLower.includes("римский") ||
        nameLower.includes("легкий") ||
        nameLower.includes("лёгкий") ||
        nameLower.includes("парус") ||
        nameLower.includes("царский") ||
        ((categoryId === "salads" || nameLower.includes("салат")) && nameLower.includes("лагуна")) ||
        nameLower.includes("каприз") ||
        nameLower.includes("микс") ||
        nameLower.includes("баклажан") ||
        nameLower.includes("матадор") ||
        nameLower.includes("престиж")
    ) {
        if (nameLower.includes("белоснежка")) {
            return "Фирменный салат кафе: нежное куриное филе, обжаренные грибы, свежие огурцы, отварной картофель, морковь и варёное яйцо под классической майонезной заправкой.";
        }
        if (nameLower.includes("цезарь с креветками")) {
            return "Аппетитный салат с обжаренными креветками, свежими листьями салата, спелыми помидорами, голландским сыром и хрустящими сухарями под соусом цезарь.";
        }
        if (nameLower.includes("цезарь с сёмгой") || nameLower.includes("цезарь с семгой")) {
            return "Изысканный салат со слабосолёной сёмгой, хрустящими листьями салата, спелыми помидорами, тёртым сыром и золотистыми сухарями под соусом Цезарь.";
        }
        if (nameLower.includes("цезарь с курицей") || (nameLower.includes("цезарь") && !nameLower.includes("кревет") && !nameLower.includes("семг") && !nameLower.includes("сёмг") && !nameLower.includes("ролл"))) {
            return "Классический салат с сочным куриным филе, свежими листьями салата, спелыми помидорами, тёртым сыром и хрустящими сухарями под соусом Цезарь.";
        }
        if (nameLower.includes("греческий")) {
            return "Традиционный средиземноморский салат из спелых помидоров, хрустящих свежих огурцов, сладкого болгарского перца, сыра фета и отборных маслин с натуральным оливковым маслом.";
        }
        if (nameLower.includes("оригинальный")) {
            return "Изысканный салат из отборного говяжьего языка, сочной курицы, спелых помидоров и маринованных грибов.";
        }
        if (nameLower.includes("версаль")) {
            return "Нежный праздничный салат с отборными мясными деликатесами (курица и говяжий язык), сочными овощами и пикантным соусом.";
        }
        if (nameLower.includes("римский")) {
            return "Нежный салат из сочной куриной грудки, свежих листьев салата, спелых помидоров и сладкого болгарского перца под ароматной медовой заправкой.";
        }
        if (nameLower.includes("легкий") || nameLower.includes("лёгкий")) {
            return "Освежающий лёгкий салат с нежными креветками, свежими овощами, оливками и хрустящими листьями салата под медово-горчичной заправкой с французской горчицей и растительным маслом.";
        }
        if (nameLower.includes("парус")) {
            return "Праздничный салат из обжаренного куриного филе, пикантной морковчи, жареных грибов, тёртого сыра и долек куриного яйца под сметанной заправкой.";
        }
        if (nameLower.includes("царский")) {
            return "Сытный пикантный салат с сочной обжаренной говядиной, острой морковчой, свежими огурцами и болгарским перцем под фирменной заправкой.";
        }
        if (nameLower.includes("лагуна")) {
            return "Изысканный морской салат с нежными креветками, свежими огурцами и спелыми помидорами под изысканной заправкой.";
        }
        if (nameLower.includes("каприз")) {
            return "Тёплый салат с нежной куриной печенью, хрустящими листьями салата, сочными помидорами и дольками апельсина под медово-горчичной заправкой с обжаренным кунжутом.";
        }
        if (nameLower.includes("микс")) {
            return "Яркий авторский салат со слабосолёной сёмгой, нежной брынзой, отварной свёклой, сочным апельсином и свежими листьями салата под медово-горчичной заправкой.";
        }
        if (nameLower.includes("баклажан")) {
            return "Аппетитный салат с хрустящими обжаренными баклажанами, сочными помидорами, сыром фета, свежей зеленью и пикантной кисло-сладкой заправкой.";
        }
        if (nameLower.includes("матадор")) {
            return "Сытный салат с отборной говядиной, свежими овощами, душистой зеленью и фирменной пряной заправкой.";
        }
        if (nameLower.includes("престиж")) {
            return "Сытный деликатесный салат из отборного мясного филе, свежих овощей и маслин под фирменной заправкой от шеф-повара.";
        }
        return "Аппетитный салат из свежих ингредиентов с авторской заправкой от нашего шеф-повара.";
    }

    // ── 3. Категория "Холодные и горячие закуски" ──
    if (categoryId === "starters") {
        if (nameLower.includes("рыбная тарелка")) {
            return "Праздничное рыбное плато: горбуша холодного копчения, скумбрия холодного копчения, нежная слабосолёная сёмга, ломтики лимона и оливки.";
        }
        if (nameLower.includes("мясная тарелка")) {
            return "Ассорти отборных мясных деликатесов: сочная шейка свиная, карбонад (свинина), нежная ветчина, говяжий язык и копченая колбаса.";
        }
        if (nameLower.includes("сырная тарелка")) {
            return "Изысканное сырное плато из благородных сыров, гармонично подобранных для идеального праздничного стола.";
        }
        if (nameLower.includes("сельдь с гарниром")) {
            return "Традиционная русская закуска: нежное филе сельди с отварным картофелем, маринованным луком, хрустящими корнишонами, томатами черри и сухарями.";
        }
        if (nameLower.includes("овощная тарелка")) {
            return "Свежая овощная нарезка: хрустящие огурцы, спелые томаты, болгарский перец, пряная морковча (морковь по-корейски), салат капустный и свежая зелень.";
        }
        if (nameLower.includes("фруктовая тарелка")) {
            return "Сезонное ассорти свежих фруктов: сочные яблоки, апельсины, спелый киви и виноград.";
        }
        if (nameLower.includes("рулеты из баклажана")) {
            return "Нежные рулетики из обжаренных баклажанов с сыром, орехами и чесноком под заправкой из майонеза и сметаны.";
        }
        if (nameLower.includes("мексиканская")) {
            return "Пикантная закуска: острая морковча, нежная ветчина, говяжий язык, маринованные огурцы и болгарский перец под растительным маслом.";
        }
        if (nameLower.includes("креветки")) {
            return "Тигровые креветки, обжаренные в авторском пикантном соусе от шеф-повара со свежей зеленью.";
        }
        if (nameLower.includes("цезарь-ролл")) {
            return "Горячий запечённый в тонком лаваше ролл с нежным куриным филе, свежими листьями салата, сочными томатами, сыром и фирменным соусом цезарь.";
        }
        if (nameLower.includes("конвертики с курицей")) {
            return "Хрустящие горячие конвертики из тонкого лаваша с начинкой из куриного филе, сладкого болгарского перца и расплавленного сыра.";
        }
        if (nameLower.includes("конвертики с грибами")) {
            return "Аппетитные хрустящие конвертики из лаваша с ароматными жареными грибами и расплавленным сыром.";
        }
        if (nameLower.includes("сырные палочки")) {
            return "Золотистые хрустящие палочки из тягучего сыра в аппетитной сухарной панировке.";
        }
        if (nameLower.includes("наггетсы")) {
            return "Хрустящие кусочки нежного куриного филе в золотистой панировке.";
        }
        if (nameLower.includes("луковые кольца")) {
            return "Золотистые хрустящие луковые кольца, обваленные в панировочных сухарях и яйце, обжаренные до аппетитного хруста.";
        }
        if (nameLower.includes("гренки")) {
            return "Ароматные поджаристые гренки из бородинского хлеба с чесноком и солью к пенным напиткам.";
        }
    }

    // ── 4. Категория "Первые и Вторые блюда, гарниры, хлеб" ──
    if (categoryId === "hot") {
        if (nameLower.includes("солянка")) {
            return "Наваристый густой суп из нескольких видов мясных деликатесов с солеными огурчиками, маслинами, лимоном и зеленью.";
        }
        if (nameLower.includes("пельмени с бульоном")) {
            return "Домашние пельмени из тонкого теста с сочной мясной начинкой в горячем наваристом бульоне со свежей зеленью.";
        }
        if (nameLower.includes("бульон с фрикадельками")) {
            return "Легкий прозрачный бульон с нежными мясными фрикадельками и рубленой зеленью.";
        }
        if (nameLower.includes("лапша домашняя")) {
            return "Традиционный суп на прозрачном курином бульоне с нежным куриным филе и домашней яичной лапшой.";
        }
        if (nameLower.includes("чанахи")) {
            return "Кавказское блюдо в горшочке: кусочки отборной говядины, томленые с картофелем, баклажанами, томатами и восточными пряностями.";
        }
        if (nameLower.includes("жаркое по-армянски")) {
            return "Традиционное ароматное жаркое: томлёная говядина с картофелем, болгарским перцем, репчатым луком, помидорами и кавказскими пряностями.";
        }
        if (nameLower.includes("свинина с овощами")) {
            return "Новинка нашего меню: нежная обжаренная свинина с баклажанами и спелыми томатами.";
        }
        if (nameLower.includes("свинина в соусе с грибами")) {
            return "Сочные кусочки свинины, обжаренные до золотистого цвета и томленые в густом ароматном сливочно-грибном соусе.";
        }
        if (nameLower.includes("печень по-татарски")) {
            return "Нежная говяжья печень, обжаренная с репчатым луком, маринованными огурчиками и восточными специями в томатном соусе.";
        }
        if (nameLower.includes("куриная грудка с овощами")) {
            return "Диетическое куриное филе со свежими овощами: яйцо и нежный сыр перемешиваются и запекаются вместе с блюдом до аппетитной золотистой корочки.";
        }
        if (nameLower.includes("рагу овощное")) {
            return "Сытное рагу из кусочков куриного филе с картофелем, кабачками, сладким перцем и томатами.";
        }
        if (nameLower.includes("китайский дракон")) {
            return "Нежное тушёное куриное филе в пикантном кисло-сладком соусе с репчатым луком, болгарским перцем, маринованными огурцами, зеленью и кунжутом.";
        }
        if (nameLower.includes("курица по-гавайски")) {
            return "Нежное куриное филе, запечённое с ломтиками сладкого ананаса под золотистой сырной корочкой.";
        }
        if (nameLower.includes("курица по-французски")) {
            return "Сочное куриное филе, запечённое со свежими томатами под аппетитной сырной корочкой.";
        }
        if (nameLower.includes("дорадо")) {
            return "Целая запечённая рыба дорадо с золотистой корочкой, долькой лимона и прованскими травами.";
        }
        if (nameLower.includes("горбуша")) {
            return "Нежное филе горбуши, запечённое под слоем сладких овощей и сыра.";
        }
        if (nameLower.includes("удон с креветками")) {
            return "Японская пшеничная лапша удон с тигровыми креветками в пряном соусе с овощами и кунжутом.";
        }
        if (nameLower.includes("удон с курицей")) {
            return "Пшеничная лапша удон ручной работы собственного приготовления кафе с кусочками нежного куриного филе, сочными овощами и фирменным соусом терияки.";
        }
        if (nameLower.includes("удон с грибами")) {
            return "Пшеничная лапша удон со свежими шампиньонами и овощами в ароматном соусе.";
        }
        if (nameLower.includes("цзяоцзы") || nameLower.includes("жареные пельмени с говядиной")) {
            return "Домашние китайские пельмени Цзяоцзы с начинкой из сочной говядины со специями, обжаренные на сковороде до аппетитной хрустящей корочки.";
        }
        if (nameLower.includes("жареные пельмени с курицей")) {
            return "Нежные домашние пельмени с куриным фаршем, обжаренные до хруста на сковороде.";
        }
        if (nameLower.includes("картофель фри")) {
            return "Хрустящий картофель фри золотистой обжарки с солью.";
        }
        if (nameLower.includes("картофель с чесноком")) {
            return "Аппетитные дольки картофеля, запечённые до румяной корочки с чесноком и пряными травами.";
        }
        if (nameLower.includes("запечённый картофель") || nameLower.includes("запеченный картофель")) {
            return "Аппетитные дольки картофеля, запечённые до золотистой корочки с ароматными специями.";
        }
        if (nameLower.includes("овощи запечённые") || nameLower.includes("овощи на огне")) {
            return "Свежие сезонные овощи (болгарский перец, томаты, баклажаны), обжаренные в мангале.";
        }
        if (nameLower.includes("булгур")) {
            return "Рассыпчатый булгур с пассерованными сезонными овощами и свежей зеленью.";
        }
        if (nameLower.includes("фасоль")) {
            return "Нежная стручковая фасоль, припущенная со сливочным маслом и специями.";
        }
        if (nameLower.includes("лаваш")) {
            return "Свежий тонкий кавказский лаваш — классическое дополнение к шашлыку и горячим блюдам.";
        }
        if (nameLower.includes("булочка")) {
            return "Свежая мягкая булочка из собственной выпечки кафе.";
        }
    }

    // ── 5. Категория "Пицца и Соусы" ──
    if (categoryId === "pizza_sauces" || nameLower.includes("пицца") || nameLower.startsWith("соус")) {
        if (nameLower.includes("пепперони")) {
            return "Фирменная пицца на тонком тесте с пикантной колбасой пепперони, томатным соусом и тягучим сыром моцарелла.";
        }
        if (nameLower.includes("грибная")) {
            return "Горячая пицца на тонком тесте со свежими шампиньонами, сырным соусом, майонезом и тягучей моцареллой.";
        }
        if (nameLower.includes("гавайская")) {
            return "Классическая пицца с сочным куриным филе, кусочками ананаса, соусом цезарь и тягучей моцареллой.";
        }
        if (nameLower.includes("сырная")) {
            return "Аппетитная пицца с богатой сырной начинкой из моцареллы и благородных сыров на тонком хрустящем тесте.";
        }
        if (nameLower.includes("маргарита") || nameLower.includes("пицца")) {
            return "Классическая пицца со спелыми томатами, ароматным орегано, базиликом и сыром моцарелла.";
        }
        if (nameLower.includes("тар-тар")) {
            return "Классический сливочно-майонезный соус с маринованными огурчиками и свежей зеленью.";
        }
        if (nameLower.includes("барбекю")) {
            return "Пряный дымный соус с насыщенным томатно-карамельным вкусом к мясу и шашлыку.";
        }
        if (nameLower.includes("чесночный")) {
            return "Густой пикантный чесночный соус со свежей зеленью и специями.";
        }
        if (nameLower.includes("сырный")) {
            return "Нежный сливочно-сырный соус с насыщенным сырным ароматом.";
        }
        if (nameLower.includes("терияки")) {
            return "Традиционный японский густой соус с балансом сладости и соевых ноток.";
        }
        if (nameLower.includes("манго-чили")) {
            return "Яркий экзотический кисло-сладкий соус со спелым манго и легкой остротой перца чили.";
        }
        if (nameLower.includes("кавказский")) {
            return "Традиционный острый томатный соус с кинзой, чесноком и кавказскими пряностями.";
        }
        if (nameLower.includes("гранатовый")) {
            return "Натуральный густой гранатовый соус «Наршараб» с приятной терпкой кислинкой к шашлыку.";
        }
        if (nameLower.includes("соевый")) {
            return "Классический соевый соус естественного брожения.";
        }
        if (nameLower.includes("кисло-сладкий")) {
            return "Сбалансированный кисло-сладкий соус, идеально подходящий к закускам и снекам.";
        }
        if (nameLower.includes("сладкий чили")) {
            return "Ароматный тайский соус с легкой перчинкой и приятной сладкой ноткой.";
        }
        if (nameLower.startsWith("соус")) {
            return "Фирменный соус от шеф-повара, идеально подчеркивающий вкус блюд.";
        }
    }

    // ── 6. Категория "Чай, Кофе и Мороженое" ──
    if (categoryId === "tea_coffee" || nameLower.includes("чай") || nameLower.includes("кофе") || nameLower.includes("пломбир") || nameLower.includes("горячий шоколад")) {
        if (nameLower.includes("чайный набор")) {
            return "Традиционный чайный набор в чайнике: подаётся с натуральным мёдом, лимоном, курагой, изюмом и черносливом для душевного чаепития.";
        }
        if (nameLower.includes("чай фруктово-ягодный")) {
            return "Насыщенный ягодный чай в чайнике с ярким ароматом спелых лесных ягод и фруктов.";
        }
        if (nameLower.includes("чай с чабрецом")) {
            return "Душистый чай с горным чабрецом в чайнике, обладающий согревающим вкусом и мягким ароматом.";
        }
        if (nameLower.includes("чай в чайнике")) {
            return "Классический листовой чай высокого качества, бережно заваренный в чайнике.";
        }
        if (nameLower.includes("чай с лимоном") || nameLower.includes("чай со сливками") || nameLower.includes("чай с сахаром")) {
            return "Свежезаваренный ароматный чай в чашке к десерту или обеду.";
        }
        if (nameLower.includes("горячий шоколад")) {
            return "Густой согревающий горячий шоколад с насыщенным бархатистым сливочно-какао вкусом.";
        }
        if (nameLower.includes("гляссе")) {
            return "Ароматный кофе с шариком нежного сливочного мороженого и мягким вкусом.";
        }
        if (nameLower.includes("капучино")) {
            return "Свежеприготовленный горячий кофе с пышной молочной пенкой и щепоткой корицы.";
        }
        if (nameLower.includes("по-турецки")) {
            return "Традиционный натуральный кофе мелкого помола с густой бархатистой пенкой и насыщенным вкусом.";
        }
        if (nameLower.includes("кофе 3в1") || nameLower.includes("нескафе")) {
            return "Быстрорастворимый горячий кофе для быстрого заряда бодрости.";
        }
        if (nameLower.includes("пломбир с шоколадом")) {
            return "Натуральный сливочный пломбир с тертым шоколадом и шоколадным топпингом.";
        }
        if (nameLower.includes("пломбир с грецким орехом")) {
            return "Натуральный сливочный пломбир с дробленым грецким орехом.";
        }
        if (nameLower.includes("пломбир")) {
            return "Классическое натуральное сливочное мороженое с нежной кремовой текстурой.";
        }
    }

    // ── 7. Категория "Барная карта и Напитки" ──
    if (categoryId === "bar" || nameLower.includes("пиво") || nameLower.includes("водка") || nameLower.includes("коньяк") || nameLower.includes("виски") || nameLower.includes("вино") || nameLower.includes("коктейль") || nameLower.includes("шот")) {
        // Коктейль Виски с колой
        if (nameLower.includes("виски с колой")) {
            return "Классический освежающий микс выдержанного виски и прохладительной колы со льдом.";
        }
        // Пиво безалкогольное
        if (nameLower.includes("бад 0") || nameLower.includes("балтика 0") || (nameLower.includes("пиво") && nameLower.includes("безалкогольн"))) {
            return "Освежающее безалкогольное пиво с классическим мягким вкусом. Подаётся охлаждённым в бутылке.";
        }
        // Пшеничное пиво
        if (nameLower.includes("хугарден") || nameLower.includes("бланш")) {
            return "Освежающее пшеничное нефильтрованное пиво с мягким пряным ароматом и цитрусовыми нотками. Подаётся охлаждённым в бутылке.";
        }
        // Фруктовое пиво
        if (nameLower.includes("эсса")) {
            return "Яркий освежающий фруктово-ягодный пивной напиток. Подаётся охлаждённым.";
        }
        // Козел
        if (nameLower.includes("козел")) {
            return "Популярное европейское пиво с мягким сбалансированным вкусом и приятным послевкусием. Подаётся охлаждённым.";
        }
        // Светлое пиво
        if (nameLower.includes("стелла") || nameLower.includes("бад") || nameLower.includes("эфес") || nameLower.includes("туборг") || nameLower.includes("жатецкий") || nameLower.includes("мельник") || nameLower.includes("кулер") || nameLower.includes("7-ка") || nameLower.includes("гарред")) {
            return "Классическое освежающее светлое пиво с чистым солодовым вкусом и лёгкой хмелевой горчинкой. Подаётся охлаждённым в бутылке.";
        }
        if (nameLower.includes("пиво")) {
            return "Освежающее бутылочное пиво от проверенных пивоварен. Подаётся охлаждённым.";
        }

        // Коктейли и шоты с составом
        if (dish.note) {
            if (nameLower.includes("шот")) {
                return `Эффектный клубный шот от нашего бармена. Состав: ${dish.note}.`;
            }
            if (nameLower.includes("коктейль") || nameLower.includes("айленд") || nameLower.includes("санрайз") || nameLower.includes("коллинз") || nameLower.includes("мохито") || nameLower.includes("лагуна")) {
                return `Освежающий авторский коктейль нашего бара. Состав: ${dish.note}.`;
            }
            if (nameLower.includes("лимонад")) {
                return `Освежающий авторский напиток со льдом и сиропами. Состав: ${dish.note}.`;
            }
            return `Состав и ингредиенты: ${dish.note}.`;
        }

        // Безалкогольные напитки бара
        if (nameLower.includes("апельсиновый лимонад")) {
            return "Освежающий авторский прохладительный лимонад с цитрусовым соком, банановым сиропом и содовой со льдом.";
        }
        if (nameLower.includes("голубая лагуна")) {
            return "Освежающий авторский коктейль со вкусом блю кюрасао со льдом.";
        }
        if (nameLower.includes("молочный коктейль")) {
            return "Нежный густой молочный коктейль со сливочным мороженым и аппетитной пенкой.";
        }
        if (nameLower.includes("соки") || nameLower.includes("сок")) {
            return "Освежающий натуральный сок в ассортименте.";
        }
        if (nameLower === "кола" || nameLower.includes("кола")) {
            return "Классический прохладительный газированный напиток.";
        }

        // Водка
        if (nameLower.includes("белуга")) {
            return "Премиальная благородная водка с мягким бархатистым вкусом и кристальной чистотой. Подаётся охлаждённой в бутылке.";
        }
        if (nameLower.includes("водка")) {
            return "Классическая русская водка высокого качества с традиционным мягким вкусом. Подаётся охлаждённой в бутылке.";
        }

        // Коньяк
        if (nameLower.includes("арарат")) {
            return "Легендарный армянский коньяк с благородными нотками сухофруктов, ванили и выдержанной дубовой бочки. Подаётся в бутылке.";
        }
        if (nameLower.includes("армянский")) {
            return "Традиционный армянский коньяк глубокого янтарного оттенка с богатым дубовым букетом. Подаётся в бутылке.";
        }
        if (nameLower.includes("французский стандарт")) {
            return "Выдержанный коньяк с гармоничным вкусом и долгим согревающим послевкусием. Подаётся в бутылке.";
        }
        if (nameLower.includes("коньяк")) {
            return "Благородный выдержанный коньяк с богатым дубовым букетом и долгим мягким послевкусием.";
        }

        // Виски
        if (nameLower.includes("jameson")) {
            return "Ирландский виски тройной дистилляции с исключительно мягким и округлым вкусом.";
        }
        if (nameLower.includes("william lawson") || nameLower.includes("bell") || nameLower.includes("fox")) {
            return "Классический купажированный шотландский виски с нотками дубовой бочки, пряностей и солода.";
        }
        if (nameLower.includes("виски")) {
            return "Классический купажированный виски с округлым пряным вкусом и нотками дубовой бочки.";
        }

        // Вино (строго исключаем "свин" и проверяем точные признаки вина!)
        if (!nameLower.includes("свин") && (nameLower.startsWith("вино") || nameLower.includes(" вино") || nameLower.includes("шампанск") || nameLower.includes("игрист") || nameLower.includes("дербент") || nameLower.includes("санто милано"))) {
            return "Бутылочное вино с гармоничным вкусом и приятным фруктово-ягодным букетом, прекрасно дополняющее банкетный стол.";
        }
    }

    // ── 8. Категория "Банкеты и Торжества" ──
    if (categoryId === "banquet" || nameLower.includes("банкет") || nameLower.includes("бизнес-ланч") || nameLower.includes("праздник") || nameLower.includes("поминальн")) {
        if (nameLower.includes("бизнес-ланч")) {
            return "Сытный комплексный обед из первого блюда, горячего с гарниром, салата и напитка. По будням с 12:00 до 18:00.";
        }
        if (nameLower.includes("свадебный банкет")) {
            return "Индивидуальное банкетное меню для свадьбы: торжественная сервировка стола, праздничные блюда, шашлык в мангале и обслуживание в зале до 150 мест.";
        }
        if (nameLower.includes("банкет")) {
            return "Полная банкетная сервировка любого торжества: холодные и горячие закуски, салаты, блюда на мангале и напитки для ваших гостей.";
        }
        if (nameLower.includes("детский праздник")) {
            return "Праздничное меню для детских дней рождения: любимая пицца, аппетитные закуски, снеки, десерты и освежающие напитки.";
        }
        if (nameLower.includes("поминальный обед")) {
            return "Традиционное поминальное меню с внимательным обслуживанием и соблюдением обычаев в спокойной обстановке.";
        }
    }

    // ── 9. Категория "Карта пожеланий" ──
    if (categoryId === "wishes") {
        if (nameLower.includes("штраф") || nameLower.includes("алкогол") || nameLower.includes("номерк")) {
            return "Правило внутреннего распорядка заведения. Пожалуйста, соблюдайте правила для комфортного отдыха всех гостей кафе «Белоснежка».";
        }
        return "Стоимость возмещения ущерба при бое или утрате инвентаря / посуды заведения согласно утверждённому прейскуранту кафе «Белоснежка».";
    }

    return "Популярная позиция меню кафе «Белоснежка», приготовленная по проверенным рецептам.";
}

function getDishTag(dish: Dish): string | undefined {
    if (dish.tag) return dish.tag;
    const nameLower = dish.name.toLowerCase();
    if (nameLower.includes("свинина с овощами")) return "Новинка";
    if (nameLower.includes("цзяоцзы")) return "Новинка";
    if (nameLower.includes("садж") || nameLower.includes("белоснежка") || nameLower.includes("фирменн")) return "Фирменное";
    if (nameLower.includes("шашлык свиной") || nameLower.includes("люля-кебаб") || nameLower.includes("цезарь с креветками") || nameLower.includes("банкет") || nameLower.includes("пепперони") || nameLower.includes("лонг айленд")) return "Хит";
    if (nameLower.includes("сёмги") || nameLower.includes("рыбная") || nameLower.includes("стейк из говядины") || nameLower.includes("мохито")) return "Популярное";
    return undefined;
}

function getDishNote(dish: Dish, categoryId?: string): string | undefined {
    if (dish.note) return dish.note;
    const nameLower = dish.name.toLowerCase();

    // Салаты
    if (nameLower.includes("белоснежка")) {
        return "куриное филе, грибы, свежие огурцы, отварной картофель, отварная морковь, варёное яйцо, майонез";
    }
    if (nameLower.includes("цезарь с креветками")) {
        return "креветки, салатные листья, помидоры, сыр голландский, сухари, соус цезарь";
    }
    if (nameLower.includes("цезарь с сёмгой") || nameLower.includes("цезарь с семгой")) {
        return "слабосолёная сёмга, салатные листья, помидоры, сыр, сухари, соус цезарь";
    }
    if (nameLower.includes("цезарь")) {
        return "куриное филе, салатные листья, помидоры, сыр, сухари, соус цезарь";
    }
    if (nameLower.includes("греческий")) {
        return "помидоры, свежие огурцы, перец болгарский, сыр фета, маслины, оливковое масло";
    }
    if (nameLower.includes("оригинальный")) {
        return "сочная курица, язык говяжий, помидоры, грибы маринованные";
    }
    if (nameLower.includes("версаль")) {
        return "курица, язык говяжий, сочные овощи, пикантный соус";
    }
    if (nameLower.includes("римский")) {
        return "листья салата, куриная грудка, помидоры, перец болгарский, медовая заправка";
    }
    if (nameLower.includes("легкий") || nameLower.includes("лёгкий")) {
        return "креветки, свежие овощи, оливки, листья салата, медово-горчичная заправка (французская горчица), растительное масло";
    }
    if (nameLower.includes("парус")) {
        return "морковча, жареные грибы, обжаренное филе курицы, сыр, дольки куриного яйца, сметана";
    }
    if (nameLower.includes("царский")) {
        return "морковча, говядина обжаренная, перец, огурцы, заправка фирменная";
    }
    if (nameLower.includes("голубая лагуна")) {
        return nameLower.includes("б/а")
            ? "сироп блю кюрасао, спрайт, долька лимона, лед"
            : "водка, сироп блю кюрасао, спрайт, долька лимона, лед";
    }
    if (nameLower.includes("лагуна") && (categoryId === "salads" || nameLower.includes("салат") || !nameLower.includes("голуб"))) {
        return "креветки, свежие огурцы, помидоры, изысканная заправка";
    }
    if (nameLower.includes("каприз")) {
        return "куриная печень, листья салата, помидоры, апельсин, медово-горчичная заправка, кунжут";
    }
    if (nameLower.includes("микс")) {
        return "отварная свёкла, листья салата, сёмга, апельсин, брынза, медово-горчичная заправка";
    }
    if (nameLower.includes("баклажан")) {
        return "хрустящие баклажаны, помидоры, сыр фета, зелень, кисло-сладкая заправка";
    }
    if (nameLower.includes("матадор")) {
        return "говядина, свежие овощи, зелень, пряная заправка";
    }
    if (nameLower.includes("престиж")) {
        return "отборное мясное филе, свежие овощи, маслины, фирменная заправка";
    }

    // Мангал и стейки
    if (nameLower.includes("шашлык свиной")) {
        return "свиная шейка, маринованный лук";
    }
    if (nameLower.includes("шашлык из курицы с овощами")) {
        return "куриное филе, перец болгарский, лук репчатый";
    }
    if (nameLower.includes("шашлык куриный")) {
        return "куриное филе, фирменный маринад";
    }
    if (nameLower.includes("шашлык из крыльев")) {
        return "куриные крылышки, пикантный маринад";
    }
    if (nameLower.includes("люля-кебаб с говядиной")) {
        return "рубленая говядина, свежая зелень, лук, восточные пряности";
    }
    if (nameLower.includes("люля-кебаб куриный")) {
        return "рубленое куриное филе, ароматные пряности";
    }
    if (nameLower.includes("садж")) {
        return "ассорти мяса, картофель, грибы, кабачки, болгарский перец, маринованный лук";
    }
    if (nameLower.includes("стейк из сёмги") || nameLower.includes("стейк из семги")) {
        return "филе атлантической сёмги, лимон, свежая зелень";
    }
    if (nameLower.includes("стейк из говядины")) {
        return "отборная говядина, розмарин, пряности";
    }
    if (nameLower.includes("стейк из свинины")) {
        return "свиная шейка, специи";
    }

    // Бар и напитки
    if (nameLower.includes("молочный коктейль")) {
        return "молоко, мороженое пломбир, топпинг на выбор (клубничный, шоколадный, ванильный)";
    }
    if (nameLower.includes("апельсиновый лимонад")) {
        return "свежий апельсин, банановый сироп, содовая, лед";
    }
    if (nameLower.includes("виски с колой")) {
        return "виски, кола, долька лимона, лед";
    }
    if (nameLower.includes("соки") || nameLower.includes("сок")) {
        return "яблочный, апельсиновый, вишневый, томатный";
    }
    if (nameLower === "кола" || nameLower.includes("кола")) {
        return "классический газированный напиток";
    }
    if (nameLower.includes("балтика 0")) {
        return "светлое безалкогольное пиво";
    }
    if (nameLower.includes("пиво")) {
        return "освежающее светлое пиво";
    }

    return undefined;
}

// ─── Модальное окно детального просмотра блюда с фото ───────────────────────

type DishModalData = {
    dish: Dish;
    categoryTitle: string;
    categoryId: string;
    sectionTitle?: string;
    allDishes: Dish[];
    currentIndex: number;
};

function fallbackCopy(text: string) {
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    } catch (_) {}
}

function renderRefinedPrice(priceStr: string) {
    const formatted = formatPrice(priceStr);
    const match = formatted.match(/^(от\u00A0)?(.*?)((\/чел\.?)|\/.*)?$/i);
    if (!match) {
        return (
            <span
                className="text-2xl sm:text-3xl font-semibold tracking-wide"
                style={{
                    color: "#c8853a",
                    fontFamily: "var(--font-body)",
                    fontVariantNumeric: "tabular-nums lining-nums",
                }}
            >
                {formatted}
            </span>
        );
    }
    const hasFrom = !!match[1];
    const amount = match[2];
    const unit = match[3];

    return (
        <div className="inline-flex items-baseline justify-end select-none">
            {hasFrom && (
                <span
                    className="text-sm uppercase tracking-widest mr-1.5"
                    style={{
                        color: "#b8a98e",
                        fontFamily: "var(--font-body)",
                        letterSpacing: "0.14em",
                    }}
                >
                    от
                </span>
            )}
            <span
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{
                    color: "#c8853a",
                    fontFamily: "var(--font-body)",
                    fontVariantNumeric: "tabular-nums lining-nums",
                }}
            >
                {amount}
            </span>
            {unit && (
                <span
                    className="text-sm tracking-wider ml-1"
                    style={{
                        color: "#b8a98e",
                        fontFamily: "var(--font-body)",
                    }}
                >
                    {unit}
                </span>
            )}
        </div>
    );
}

function getDishNutrition(dish: Dish, categoryId?: string): NutritionInfo | undefined {
    if (dish.nutrition) return dish.nutrition;
    const cat = categoryId || "";
    const nameLower = dish.name.toLowerCase();

    // Категория «Карта пожеланий» (посуда, бой, инвентарь, правила и штрафы) — пищевой ценности нет
    if (
        cat === "wishes" ||
        nameLower.includes("штраф") ||
        nameLower.includes("номерк") ||
        nameLower.includes("папка") ||
        nameLower.includes("стакан") ||
        nameLower.includes("рюмк") ||
        nameLower.includes("фужер") ||
        nameLower.includes("кружк") ||
        nameLower.includes("графин") ||
        nameLower.includes("чайник заварочный") ||
        nameLower.includes("подставк") ||
        nameLower.includes("молочник") ||
        nameLower.includes("ложк") ||
        nameLower.includes("вилк") ||
        nameLower.includes("нож") ||
        nameLower.includes("набор соль") ||
        nameLower.includes("сахарниц") ||
        nameLower.includes("хлебниц") ||
        nameLower.includes("розетк") ||
        (nameLower.includes("тарелк") && !nameLower.includes("рыбн") && !nameLower.includes("мясн") && !nameLower.includes("сырн") && !nameLower.includes("овощн") && !nameLower.includes("фрукт")) ||
        nameLower.includes("селедочниц") ||
        nameLower.includes("фруктовниц") ||
        nameLower.includes("креманк") ||
        nameLower.includes("жульенниц") ||
        nameLower === "меню"
    ) {
        return undefined;
    }

    // ── 1. Мангал и стейки (на 100 г) ──
    if (cat === "mangal" || nameLower.includes("шашлык") || nameLower.includes("люля") || nameLower.includes("садж") || nameLower.includes("стейк")) {
        if (nameLower.includes("свиной")) return { calories: 285, protein: 16.5, fat: 24.5, carbs: 1.2, isPer100Ml: false };
        if (nameLower.includes("курицы с овощами")) return { calories: 145, protein: 19.2, fat: 6.4, carbs: 2.8, isPer100Ml: false };
        if (nameLower.includes("куриный")) return { calories: 165, protein: 23.8, fat: 7.2, carbs: 1.5, isPer100Ml: false };
        if (nameLower.includes("крыльев")) return { calories: 245, protein: 18.2, fat: 19.0, carbs: 0.8, isPer100Ml: false };
        if (nameLower.includes("люля") && nameLower.includes("говядин")) return { calories: 235, protein: 17.5, fat: 18.0, carbs: 2.1, isPer100Ml: false };
        if (nameLower.includes("люля") && nameLower.includes("курин")) return { calories: 180, protein: 18.8, fat: 11.2, carbs: 1.8, isPer100Ml: false };
        if (nameLower.includes("сёмг") || nameLower.includes("семг")) return { calories: 215, protein: 20.5, fat: 14.8, carbs: 0.2, isPer100Ml: false };
        if (nameLower.includes("говядин")) return { calories: 220, protein: 22.0, fat: 14.5, carbs: 0.0, isPer100Ml: false };
        if (nameLower.includes("свинин")) return { calories: 265, protein: 18.2, fat: 21.4, carbs: 0.0, isPer100Ml: false };
        if (nameLower.includes("садж")) return { calories: 195, protein: 12.5, fat: 13.0, carbs: 7.2, isPer100Ml: false };
    }

    // ── 2. Салаты (на 100 г) ──
    if (cat === "salads" || nameLower.includes("салат") || nameLower.includes("цезарь") || nameLower.includes("греческий")) {
        if (nameLower.includes("белоснежка")) return { calories: 175, protein: 8.5, fat: 13.2, carbs: 6.1, isPer100Ml: false };
        if (nameLower.includes("цезарь с кревет")) return { calories: 165, protein: 11.2, fat: 10.8, carbs: 6.0, isPer100Ml: false };
        if (nameLower.includes("цезарь с сёмг") || nameLower.includes("цезарь с семг")) return { calories: 192, protein: 13.0, fat: 13.5, carbs: 5.2, isPer100Ml: false };
        if (nameLower.includes("цезарь")) return { calories: 185, protein: 12.8, fat: 12.5, carbs: 5.5, isPer100Ml: false };
        if (nameLower.includes("греческий")) return { calories: 135, protein: 3.8, fat: 11.8, carbs: 4.2, isPer100Ml: false };
        if (nameLower.includes("баклажан")) return { calories: 128, protein: 2.2, fat: 8.5, carbs: 11.2, isPer100Ml: false };
        if (nameLower.includes("оригинальный")) return { calories: 162, protein: 13.5, fat: 10.8, carbs: 3.2, isPer100Ml: false };
        if (nameLower.includes("версаль")) return { calories: 178, protein: 10.2, fat: 14.0, carbs: 3.5, isPer100Ml: false };
        if (nameLower.includes("римский")) return { calories: 148, protein: 11.5, fat: 8.2, carbs: 7.4, isPer100Ml: false };
        if (nameLower.includes("матадор")) return { calories: 155, protein: 12.2, fat: 10.5, carbs: 3.8, isPer100Ml: false };
        if (nameLower.includes("легкий") || nameLower.includes("лёгкий")) return { calories: 112, protein: 8.4, fat: 6.5, carbs: 5.2, isPer100Ml: false };
        if (nameLower.includes("парус")) return { calories: 195, protein: 11.8, fat: 14.6, carbs: 4.5, isPer100Ml: false };
        if (nameLower.includes("царский")) return { calories: 158, protein: 11.4, fat: 10.2, carbs: 5.6, isPer100Ml: false };
        if (nameLower.includes("лагуна")) return { calories: 142, protein: 12.8, fat: 8.6, carbs: 3.5, isPer100Ml: false };
        if (nameLower.includes("престиж")) return { calories: 170, protein: 11.0, fat: 12.8, carbs: 3.2, isPer100Ml: false };
        if (nameLower.includes("каприз")) return { calories: 152, protein: 10.5, fat: 9.2, carbs: 7.0, isPer100Ml: false };
        if (nameLower.includes("микс")) return { calories: 160, protein: 9.8, fat: 10.5, carbs: 7.2, isPer100Ml: false };
    }

    // ── 3. Закуски (на 100 г) ──
    if (cat === "starters" || nameLower.includes("тарелка") || nameLower.includes("наггетс") || nameLower.includes("кольца") || nameLower.includes("гренки") || nameLower.includes("палочки") || nameLower.includes("конвертик")) {
        if (nameLower.includes("рыбная тарелка")) return { calories: 185, protein: 17.5, fat: 12.4, carbs: 0.8, isPer100Ml: false };
        if (nameLower.includes("мясная тарелка")) return { calories: 265, protein: 18.0, fat: 21.0, carbs: 1.0, isPer100Ml: false };
        if (nameLower.includes("сырная тарелка")) return { calories: 335, protein: 19.5, fat: 26.8, carbs: 5.2, isPer100Ml: false };
        if (nameLower.includes("сельдь")) return { calories: 165, protein: 11.2, fat: 10.5, carbs: 6.8, isPer100Ml: false };
        if (nameLower.includes("овощная тарелка")) return { calories: 22, protein: 1.1, fat: 0.2, carbs: 4.2, isPer100Ml: false };
        if (nameLower.includes("фруктовая тарелка")) return { calories: 48, protein: 0.6, fat: 0.2, carbs: 11.5, isPer100Ml: false };
        if (nameLower.includes("рулеты из баклажана")) return { calories: 185, protein: 5.8, fat: 15.2, carbs: 6.5, isPer100Ml: false };
        if (nameLower.includes("мексиканская")) return { calories: 165, protein: 7.2, fat: 9.5, carbs: 13.0, isPer100Ml: false };
        if (nameLower.includes("креветки в пикантном")) return { calories: 138, protein: 14.5, fat: 7.8, carbs: 2.5, isPer100Ml: false };
        if (nameLower.includes("цезарь-ролл")) return { calories: 225, protein: 11.5, fat: 12.0, carbs: 18.2, isPer100Ml: false };
        if (nameLower.includes("конвертики с курицей")) return { calories: 235, protein: 13.2, fat: 12.5, carbs: 17.8, isPer100Ml: false };
        if (nameLower.includes("конвертики с грибами")) return { calories: 210, protein: 6.8, fat: 11.8, carbs: 19.5, isPer100Ml: false };
        if (nameLower.includes("сырные палочки")) return { calories: 295, protein: 14.2, fat: 18.5, carbs: 18.0, isPer100Ml: false };
        if (nameLower.includes("наггетсы")) return { calories: 260, protein: 16.0, fat: 14.2, carbs: 17.5, isPer100Ml: false };
        if (nameLower.includes("луковые кольца")) return { calories: 245, protein: 3.5, fat: 13.2, carbs: 28.5, isPer100Ml: false };
        if (nameLower.includes("гренки")) return { calories: 310, protein: 7.8, fat: 14.5, carbs: 38.0, isPer100Ml: false };
    }

    // ── 4. Первые и Вторые блюда, гарниры, хлеб (на 100 г) ──
    if (cat === "hot" || nameLower.includes("солянк") || nameLower.includes("бульон") || nameLower.includes("лапша") || nameLower.includes("жарко") || nameLower.includes("удон") || nameLower.includes("пельмен") || nameLower.includes("картофел") || nameLower.includes("булочк") || nameLower.includes("лаваш")) {
        if (nameLower.includes("солянка")) return { calories: 78, protein: 4.8, fat: 5.2, carbs: 3.1, isPer100Ml: false };
        if (nameLower.includes("пельмени с бульоном")) return { calories: 145, protein: 7.2, fat: 6.5, carbs: 14.5, isPer100Ml: false };
        if (nameLower.includes("бульон с фрикадельками")) return { calories: 58, protein: 4.5, fat: 3.2, carbs: 2.8, isPer100Ml: false };
        if (nameLower.includes("лапша домашняя")) return { calories: 65, protein: 4.8, fat: 2.8, carbs: 5.2, isPer100Ml: false };
        if (nameLower.includes("чанахи")) return { calories: 135, protein: 8.5, fat: 7.8, carbs: 8.2, isPer100Ml: false };
        if (nameLower.includes("жаркое по-армянски")) return { calories: 148, protein: 9.2, fat: 8.8, carbs: 8.5, isPer100Ml: false };
        if (nameLower.includes("свинина с овощами")) return { calories: 175, protein: 11.8, fat: 12.5, carbs: 4.2, isPer100Ml: false };
        if (nameLower.includes("свинина в соусе с грибами")) return { calories: 205, protein: 12.5, fat: 15.8, carbs: 3.5, isPer100Ml: false };
        if (nameLower.includes("печень по-татарски")) return { calories: 165, protein: 15.2, fat: 9.5, carbs: 4.8, isPer100Ml: false };
        if (nameLower.includes("куриная грудка с овощами")) return { calories: 115, protein: 16.2, fat: 3.8, carbs: 4.2, isPer100Ml: false };
        if (nameLower.includes("рагу овощное")) return { calories: 122, protein: 8.8, fat: 5.8, carbs: 9.0, isPer100Ml: false };
        if (nameLower.includes("китайский дракон")) return { calories: 178, protein: 14.5, fat: 7.8, carbs: 12.5, isPer100Ml: false };
        if (nameLower.includes("курица по-гавайски")) return { calories: 168, protein: 14.8, fat: 8.2, carbs: 9.0, isPer100Ml: false };
        if (nameLower.includes("курица по-французски")) return { calories: 195, protein: 16.5, fat: 12.8, carbs: 3.5, isPer100Ml: false };
        if (nameLower.includes("дорадо")) return { calories: 115, protein: 18.2, fat: 4.6, carbs: 0.2, isPer100Ml: false };
        if (nameLower.includes("горбуша")) return { calories: 138, protein: 15.5, fat: 7.2, carbs: 3.0, isPer100Ml: false };
        if (nameLower.includes("удон с креветками")) return { calories: 142, protein: 7.5, fat: 4.2, carbs: 19.0, isPer100Ml: false };
        if (nameLower.includes("удон с курицей")) return { calories: 158, protein: 9.8, fat: 5.2, carbs: 18.5, isPer100Ml: false };
        if (nameLower.includes("удон с грибами")) return { calories: 128, protein: 4.5, fat: 3.8, carbs: 19.5, isPer100Ml: false };
        if (nameLower.includes("цзяоцзы") || nameLower.includes("жареные пельмени с говядиной")) return { calories: 275, protein: 11.2, fat: 14.5, carbs: 25.8, isPer100Ml: false };
        if (nameLower.includes("жареные пельмени с курицей")) return { calories: 240, protein: 12.5, fat: 11.2, carbs: 23.5, isPer100Ml: false };
        if (nameLower.includes("булгур")) return { calories: 125, protein: 3.8, fat: 3.5, carbs: 20.2, isPer100Ml: false };
        if (nameLower.includes("овощи запечённые")) return { calories: 68, protein: 1.8, fat: 3.2, carbs: 8.5, isPer100Ml: false };
        if (nameLower.includes("картофель с чесноком")) return { calories: 122, protein: 2.4, fat: 4.8, carbs: 18.0, isPer100Ml: false };
        if (nameLower.includes("запечённый картофель")) return { calories: 105, protein: 2.2, fat: 3.0, carbs: 17.5, isPer100Ml: false };
        if (nameLower.includes("фасоль стручковая")) return { calories: 48, protein: 2.5, fat: 1.8, carbs: 5.8, isPer100Ml: false };
        if (nameLower.includes("картофель фри")) return { calories: 280, protein: 3.8, fat: 15.0, carbs: 33.0, isPer100Ml: false };
        if (nameLower.includes("лаваш")) return { calories: 240, protein: 7.9, fat: 1.2, carbs: 48.0, isPer100Ml: false };
        if (nameLower.includes("булочка")) return { calories: 265, protein: 8.2, fat: 3.5, carbs: 50.5, isPer100Ml: false };
    }

    // ── 5. Пицца и Соусы (на 100 г) ──
    if (cat === "pizza_sauces" || nameLower.includes("пицца") || nameLower.includes("пепперони") || nameLower.includes("маргарита") || nameLower.includes("соус") || nameLower.includes("чили") || nameLower.includes("тар-тар")) {
        if (nameLower.includes("пепперони")) return { calories: 268, protein: 11.8, fat: 12.5, carbs: 27.5, isPer100Ml: false };
        if (nameLower.includes("грибная поляна")) return { calories: 225, protein: 9.5, fat: 9.8, carbs: 25.2, isPer100Ml: false };
        if (nameLower.includes("гавайская")) return { calories: 235, protein: 11.0, fat: 8.5, carbs: 28.5, isPer100Ml: false };
        if (nameLower.includes("сырная")) return { calories: 285, protein: 13.5, fat: 14.2, carbs: 26.5, isPer100Ml: false };
        if (nameLower.includes("маргарита")) return { calories: 215, protein: 9.2, fat: 8.0, carbs: 27.0, isPer100Ml: false };
        if (nameLower.includes("тар-тар")) return { calories: 345, protein: 1.5, fat: 35.0, carbs: 6.2, isPer100Ml: false };
        if (nameLower.includes("барбекю")) return { calories: 135, protein: 1.2, fat: 0.5, carbs: 31.5, isPer100Ml: false };
        if (nameLower.includes("чесночный")) return { calories: 365, protein: 1.8, fat: 37.5, carbs: 5.5, isPer100Ml: false };
        if (nameLower.includes("сырный")) return { calories: 310, protein: 2.2, fat: 31.0, carbs: 6.5, isPer100Ml: false };
        if (nameLower.includes("терияки")) return { calories: 125, protein: 2.8, fat: 0.2, carbs: 28.0, isPer100Ml: false };
        if (nameLower.includes("манго-чили")) return { calories: 140, protein: 0.8, fat: 0.3, carbs: 34.0, isPer100Ml: false };
        if (nameLower.includes("кавказский")) return { calories: 62, protein: 1.8, fat: 0.4, carbs: 13.5, isPer100Ml: false };
        if (nameLower.includes("гранатовый")) return { calories: 210, protein: 0.5, fat: 0.1, carbs: 52.0, isPer100Ml: false };
        if (nameLower.includes("соевый")) return { calories: 55, protein: 6.0, fat: 0.1, carbs: 7.5, isPer100Ml: false };
        if (nameLower.includes("кисло-сладкий")) return { calories: 145, protein: 0.6, fat: 0.2, carbs: 35.5, isPer100Ml: false };
        if (nameLower.includes("сладкий чили")) return { calories: 160, protein: 0.8, fat: 0.2, carbs: 38.5, isPer100Ml: false };
    }

    // ── 6. Чай, Кофе и Мороженое ──
    if (cat === "tea_coffee" || nameLower.includes("чай") || nameLower.includes("кофе") || nameLower.includes("пломбир") || nameLower.includes("шоколад")) {
        if (nameLower.includes("чайный набор")) return { calories: 24, protein: 0.2, fat: 0.0, carbs: 5.8, isPer100Ml: true };
        if (nameLower.includes("чай") && nameLower.includes("фруктово-ягодный")) return { calories: 12, protein: 0.1, fat: 0.0, carbs: 2.9, isPer100Ml: true };
        if (nameLower.includes("чай") && nameLower.includes("чабрец")) return { calories: 2, protein: 0.1, fat: 0.0, carbs: 0.3, isPer100Ml: true };
        if (nameLower.includes("чай с лимоном")) return { calories: 16, protein: 0.1, fat: 0.0, carbs: 3.9, isPer100Ml: true };
        if (nameLower.includes("чай со сливками")) return { calories: 28, protein: 0.8, fat: 2.0, carbs: 1.8, isPer100Ml: true };
        if (nameLower.includes("чай с сахаром")) return { calories: 22, protein: 0.1, fat: 0.0, carbs: 5.4, isPer100Ml: true };
        if (nameLower.includes("чай")) return { calories: 1, protein: 0.1, fat: 0.0, carbs: 0.2, isPer100Ml: true };
        if (nameLower.includes("шоколад")) return { calories: 195, protein: 3.8, fat: 11.2, carbs: 21.0, isPer100Ml: false };
        if (nameLower.includes("гляссе")) return { calories: 65, protein: 1.5, fat: 3.2, carbs: 7.8, isPer100Ml: true };
        if (nameLower.includes("капучино")) return { calories: 54, protein: 1.8, fat: 2.2, carbs: 7.0, isPer100Ml: true };
        if (nameLower.includes("по турецки") || nameLower.includes("по-турецки")) return { calories: 2, protein: 0.2, fat: 0.1, carbs: 0.3, isPer100Ml: true };
        if (nameLower.includes("3в1")) return { calories: 48, protein: 0.9, fat: 1.6, carbs: 7.8, isPer100Ml: true };
        if (nameLower.includes("нескафе")) return { calories: 2, protein: 0.2, fat: 0.1, carbs: 0.3, isPer100Ml: true };
        if (nameLower.includes("пломбир с шоколадом")) return { calories: 245, protein: 3.8, fat: 14.5, carbs: 25.0, isPer100Ml: false };
        if (nameLower.includes("пломбир с грецким орехом")) return { calories: 255, protein: 4.6, fat: 16.8, carbs: 22.5, isPer100Ml: false };
        if (nameLower.includes("пломбир")) return { calories: 227, protein: 3.7, fat: 15.0, carbs: 20.4, isPer100Ml: false };
    }

    // ── 7. Барная карта и Напитки (на 100 мл) ──
    if (cat === "bar" || nameLower.includes("водка") || nameLower.includes("коньяк") || nameLower.includes("виски") || nameLower.includes("вино") || nameLower.includes("пиво") || nameLower.includes("коктейль") || nameLower.includes("шот") || nameLower.includes("лимонад") || nameLower.includes("кола") || nameLower.includes("сок")) {
        if (nameLower.includes("водка")) return { calories: 235, protein: 0.0, fat: 0.0, carbs: 0.1, isPer100Ml: true };
        if (nameLower.includes("коньяк")) return { calories: 239, protein: 0.0, fat: 0.0, carbs: 0.5, isPer100Ml: true };
        if (nameLower.includes("виски")) return { calories: 235, protein: 0.0, fat: 0.0, carbs: 0.1, isPer100Ml: true };
        if (!nameLower.includes("свин") && (nameLower.includes("вино") || nameLower.includes("дербент") || nameLower.includes("санто милано"))) {
            return { calories: 72, protein: 0.2, fat: 0.0, carbs: 2.8, isPer100Ml: true };
        }
        if (nameLower.includes("бад 0") || nameLower.includes("балтика 0")) return { calories: 24, protein: 0.3, fat: 0.0, carbs: 4.8, isPer100Ml: true };
        if (nameLower.includes("хугарден") || nameLower.includes("бланш")) return { calories: 46, protein: 0.7, fat: 0.0, carbs: 4.2, isPer100Ml: true };
        if (nameLower.includes("эсса")) return { calories: 58, protein: 0.3, fat: 0.0, carbs: 6.8, isPer100Ml: true };
        if (nameLower.includes("пиво")) return { calories: 42, protein: 0.5, fat: 0.0, carbs: 3.8, isPer100Ml: true };
        if (nameLower.includes("лонг айленд")) return { calories: 175, protein: 0.1, fat: 0.0, carbs: 11.2, isPer100Ml: true };
        if (nameLower.includes("текила санрайз")) return { calories: 110, protein: 0.4, fat: 0.1, carbs: 14.5, isPer100Ml: true };
        if (nameLower.includes("джон коллинз")) return { calories: 95, protein: 0.1, fat: 0.0, carbs: 8.5, isPer100Ml: true };
        if (nameLower.includes("мохито")) return { calories: 85, protein: 0.2, fat: 0.0, carbs: 9.8, isPer100Ml: true };
        if (nameLower.includes("виски с колой")) return { calories: 105, protein: 0.1, fat: 0.0, carbs: 8.2, isPer100Ml: true };
        if (nameLower.includes("голубая лагуна")) {
            if (dish.price === "250 ₽" || nameLower.includes("б/а") || (dish.note && !dish.note.includes("водка"))) {
                return { calories: 38, protein: 0.1, fat: 0.0, carbs: 9.4, isPer100Ml: true };
            }
            return { calories: 98, protein: 0.1, fat: 0.0, carbs: 10.5, isPer100Ml: true };
        }
        if (nameLower.includes("баунти")) return { calories: 185, protein: 0.3, fat: 1.2, carbs: 16.5, isPer100Ml: true };
        if (nameLower.includes("баблгам")) return { calories: 195, protein: 0.1, fat: 0.0, carbs: 18.2, isPer100Ml: true };
        if (nameLower.includes("энерджи")) return { calories: 165, protein: 0.2, fat: 0.0, carbs: 13.5, isPer100Ml: true };
        if (nameLower.includes("апельсиновый лимонад")) return { calories: 42, protein: 0.3, fat: 0.1, carbs: 10.2, isPer100Ml: true };
        if (nameLower.includes("молочный коктейль")) return { calories: 88, protein: 2.8, fat: 3.2, carbs: 12.5, isPer100Ml: true };
        if (nameLower.includes("сок")) return { calories: 45, protein: 0.5, fat: 0.1, carbs: 11.0, isPer100Ml: true };
        if (nameLower.includes("кола")) return { calories: 42, protein: 0.0, fat: 0.0, carbs: 10.6, isPer100Ml: true };
    }

    // ── 8. Банкеты и Торжества (на 100 г) ──
    if (cat === "banquet" || nameLower.includes("банкет") || nameLower.includes("ланч") || nameLower.includes("праздник") || nameLower.includes("поминальн")) {
        if (nameLower.includes("бизнес-ланч")) return { calories: 135, protein: 7.5, fat: 5.8, carbs: 13.2, isPer100Ml: false };
        return { calories: 180, protein: 11.2, fat: 11.5, carbs: 8.5, isPer100Ml: false };
    }

    // Общий fallback для любых блюд кухни
    return { calories: 160, protein: 10.0, fat: 10.0, carbs: 8.0, isPer100Ml: false };
}

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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { dish, categoryTitle, categoryId, allDishes, currentIndex } = data;
    const currentDish = allDishes[currentIndex] || dish;
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [dishAnim, setDishAnim] = useState<"enter" | "idle">("idle");

    const handleClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    const handleBookTable = (dishName: string) => {
        if (isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            onBookTable(dishName);
        }, 180);
    };

    useEffect(() => {
        setDishAnim("enter");
        const t = setTimeout(() => setDishAnim("idle"), 220);
        return () => clearTimeout(t);
    }, [currentIndex]);

    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const touchDeltaX = useRef<number>(0);
    const touchDeltaY = useRef<number>(0);

    const handlePhoneClick = (e: React.MouseEvent) => {
        try {
            window.location.href = "tel:+79378435505";
        } catch (_) {}

        const phoneNumber = "+7 (937) 843-55-05";
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(phoneNumber).catch(() => {
                fallbackCopy(phoneNumber);
            });
        } else {
            fallbackCopy(phoneNumber);
        }
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 3000);
    };

    useScrollLock();


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

    useEffect(() => {
        ref.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft" && allDishes.length > 1) {
                prevDish();
            }
            if (e.key === "ArrowRight" && allDishes.length > 1) {
                nextDish();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [handleClose, currentIndex, allDishes.length, onChangeDish]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
            touchDeltaX.current = 0;
            touchDeltaY.current = 0;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
            touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
        }
    };

    const handleTouchEnd = () => {
        const dx = touchDeltaX.current;
        const dy = touchDeltaY.current;

        // Свайп влево/вправо для переключения блюд
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2 && allDishes.length > 1) {
            if (dx > 0) {
                prevDish();
            } else {
                nextDish();
            }
        }
    };

    const dishImg = getDishImage(currentDish, categoryId);
    const dishDesc = getDishDescription(currentDish, categoryId);
    const dishTag = getDishTag(currentDish);
    const dishNote = currentDish.note || getDishNote(currentDish, categoryId);
    const currentNutrition = currentDish.nutrition || getDishNutrition(currentDish, categoryId);

    const isBeer = Boolean(
        (data.sectionTitle && data.sectionTitle.toLowerCase().includes("пиво")) ||
        currentDish.name.toLowerCase().includes("пиво")
    );

    const isWishes = Boolean(
        categoryId === "wishes" ||
        categoryTitle.toLowerCase().includes("пожеланий") ||
        categoryTitle.toLowerCase().includes("желаний")
    );

    const isExclusionTipDisabled = Boolean(
        categoryId === "bar" ||
        categoryId === "banquet" ||
        categoryId === "wishes" ||
        categoryTitle.toLowerCase().includes("бар") ||
        categoryTitle.toLowerCase().includes("банкет") ||
        categoryTitle.toLowerCase().includes("пожеланий") ||
        categoryTitle.toLowerCase().includes("желаний") ||
        isBeer
    );

    const hasMultipleIngredients = Boolean(
        !isWishes && (
            (dishNote && (dishNote.includes(",") || dishNote.includes(" и "))) ||
            (dishDesc && (dishDesc.includes(",") || dishDesc.includes("заправка") || dishDesc.includes("состав") || dishDesc.includes("сыр") || dishDesc.includes("огурц") || dishDesc.includes("томат") || dishDesc.includes("перец") || dishDesc.includes("филе") || dishDesc.includes("мясо") || dishDesc.includes("грибы")))
        )
    );

    // В подкатегории «Пиво» и в «Карте пожеланий» блок «Состав / ингредиенты» не отображается
    const shouldShowIngredients = Boolean(dishNote && !isBeer && !isWishes);

    // Подсказка об исключении ингредиентов жестко скрыта для бара, банкетов, пива и карты пожеланий
    const shouldShowExclusionTip = Boolean(hasMultipleIngredients && !isExclusionTipDisabled);

    const portionLabel = useMemo(() => {
        if (!currentDish.weight) return "Порция:";
        const w = currentDish.weight.toLowerCase();
        if (w.includes("мл") || w.includes(" л")) return "Объём:";
        if (w.includes("бут")) return "Формат:";
        if (w.includes("чел")) return "Расчёт:";
        return "Вес / порция:";
    }, [currentDish.weight]);

    return (
        <div
            role="presentation"
            className={`dish-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${isClosing ? "closing" : ""}`}
            style={{ background: "rgba(10,7,2,0.92)", backdropFilter: "blur(10px)", overscrollBehavior: "contain" }}
            onClick={handleClose}
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Обертка с позиционированием кнопок навигации снаружи карточки на десктопе */}
            <div className="relative w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                {/* Внешние кнопки навигации на десктопе (как в блоке "Внутри Белоснежки") */}
                {allDishes.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); prevDish(); }}
                            aria-label="Предыдущее блюдо"
                            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none z-30"
                            style={{ background: "rgba(26,18,8,0.85)", color: "#f5ead8", border: "1px solid #c8853a55" }}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); nextDish(); }}
                            aria-label="Следующее блюдо"
                            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none z-30"
                            style={{ background: "rgba(26,18,8,0.85)", color: "#f5ead8", border: "1px solid #c8853a55" }}
                        >
                            ›
                        </button>
                    </>
                )}

                <div
                    ref={ref}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="dish-modal-title"
                    tabIndex={-1}
                    className={`dish-modal-card relative w-full rounded-2xl overflow-hidden outline-none flex flex-col ${isClosing ? "closing" : ""}`}
                    style={{ background: "#1f1406", border: "1px solid #c8853a33", maxHeight: "92vh" }}
                >
                    {/* Фотография блюда — увеличенное пространство без затемнения снизу */}
                    <div className="relative shrink-0 select-none overflow-hidden h-64 sm:h-80 md:h-96" style={{ background: "#2c1f0e" }}>
                        <img
                            src={dishImg}
                            alt={currentDish.name}
                            className={`w-full h-full object-cover pointer-events-none transition-all duration-300 ${
                                dishAnim === "enter" ? "opacity-80 scale-[1.02]" : "opacity-100 scale-100"
                            }`}
                            style={{ filter: "contrast(1.08) saturate(1.15) brightness(1.0)" }}
                        />
                        {/* Только тонкий верхний полупрозрачный градиент для контраста кнопки закрытия и бейджей */}
                        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,7,2,0.4) 0%, transparent 100%)" }} />

                        {/* Бейджи на фото */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
                            {dishTag && (
                                <span className="px-3 py-1 rounded-full text-sm font-semibold tracking-wide" style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}>
                                    {dishTag}
                                </span>
                            )}
                            <span className="px-2.5 py-0.5 rounded-full text-xs sm:text-sm backdrop-blur-md" style={{ background: "rgba(26,18,8,0.75)", color: "#d9c9b0", border: "1px solid #c8853a33" }}>
                                {categoryTitle}
                            </span>
                        </div>

                        {/* Кнопка закрытия */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10"
                            style={{ background: "rgba(26,18,8,0.8)", color: "#f5ead8", border: "1px solid #c8853a44" }}
                            aria-label="Закрыть"
                        >
                            ✕
                        </button>

                        {/* Стрелки перелистывания на мобильных устройствах */}
                        {allDishes.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevDish}
                                    aria-label="Предыдущее блюдо"
                                    className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer z-10"
                                    style={{ background: "rgba(26,18,8,0.8)", color: "#f5ead8", border: "1px solid #c8853a44" }}
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={nextDish}
                                    aria-label="Следующее блюдо"
                                    className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer z-10"
                                    style={{ background: "rgba(26,18,8,0.8)", color: "#f5ead8", border: "1px solid #c8853a44" }}
                                >
                                    ›
                                </button>
                                <div className="absolute bottom-3 right-4 px-2.5 py-0.5 rounded text-xs backdrop-blur-sm" style={{ background: "rgba(26,18,8,0.7)", color: "#d9c9b0" }}>
                                    {currentIndex + 1} из {allDishes.length}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Текстовая информация о блюде */}
                    <div
                        ref={scrollContainerRef}
                        className={`p-6 overflow-y-auto flex flex-col gap-4 transition-opacity duration-200 ${
                            dishAnim === "enter" ? "opacity-85" : "opacity-100"
                        }`}
                        style={{ overscrollBehavior: "contain" }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b" style={{ borderColor: "#c8853a22" }}>
                            <div className="flex-1 min-w-0 pr-3">
                                <h3 id="dish-modal-title" className="text-2xl sm:text-3xl md:text-4xl leading-snug font-normal" style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}>
                                    {currentDish.name}
                                </h3>
                                {currentDish.weight && (
                                    <p className="mt-1.5 text-sm tracking-wider" style={{ color: "#b8a98e", fontFamily: "var(--font-body)" }}>
                                        <span style={{ color: "#c8853a99" }}>{portionLabel} </span>
                                        <span style={{ color: "#e4a55a", fontVariantNumeric: "tabular-nums" }}>{currentDish.weight}</span>
                                    </p>
                                )}
                            </div>
                            <div className="sm:text-right shrink-0 self-start sm:self-center select-none">
                                {renderRefinedPrice(currentDish.price)}
                            </div>
                        </div>

                        <div className="text-base leading-relaxed" style={{ color: "#d9c9b0" }}>
                            <p>{dishDesc}</p>
                        </div>

                        {/* Пищевая ценность (КБЖУ) на 100 г / 100 мл */}
                        {currentNutrition && (
                            <div className="p-3.5 rounded-xl border" style={{ background: "rgba(35, 24, 8, 0.6)", borderColor: "#c8853a26" }}>
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                    <span className="text-xs tracking-wider uppercase font-semibold" style={{ color: "#c8853a", fontFamily: "var(--font-body)" }}>
                                        Пищевая ценность
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ background: "rgba(200, 133, 58, 0.15)", color: "#e4a55a" }}>
                                        на 100 {currentNutrition.isPer100Ml ? "мл" : "г"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    <div className="dish-nutrition-cell p-2 rounded-lg cursor-default select-none" style={{ background: "rgba(26, 18, 8, 0.5)", border: "1px solid #c8853a18" }}>
                                        <div className="text-base sm:text-lg font-bold" style={{ color: "#f5ead8", fontVariantNumeric: "tabular-nums" }}>
                                            {currentNutrition.calories}
                                        </div>
                                        <div className="text-[11px] leading-tight mt-0.5" style={{ color: "#b8a98e" }}>
                                            ккал
                                        </div>
                                    </div>
                                    <div className="dish-nutrition-cell p-2 rounded-lg cursor-default select-none" style={{ background: "rgba(26, 18, 8, 0.5)", border: "1px solid #c8853a18" }}>
                                        <div className="text-base sm:text-lg font-bold" style={{ color: "#f5ead8", fontVariantNumeric: "tabular-nums" }}>
                                            {currentNutrition.protein}
                                        </div>
                                        <div className="text-[11px] leading-tight mt-0.5" style={{ color: "#b8a98e" }}>
                                            белки, г
                                        </div>
                                    </div>
                                    <div className="dish-nutrition-cell p-2 rounded-lg cursor-default select-none" style={{ background: "rgba(26, 18, 8, 0.5)", border: "1px solid #c8853a18" }}>
                                        <div className="text-base sm:text-lg font-bold" style={{ color: "#f5ead8", fontVariantNumeric: "tabular-nums" }}>
                                            {currentNutrition.fat}
                                        </div>
                                        <div className="text-[11px] leading-tight mt-0.5" style={{ color: "#b8a98e" }}>
                                            жиры, г
                                        </div>
                                    </div>
                                    <div className="dish-nutrition-cell p-2 rounded-lg cursor-default select-none" style={{ background: "rgba(26, 18, 8, 0.5)", border: "1px solid #c8853a18" }}>
                                        <div className="text-base sm:text-lg font-bold" style={{ color: "#f5ead8", fontVariantNumeric: "tabular-nums" }}>
                                            {currentNutrition.carbs}
                                        </div>
                                        <div className="text-[11px] leading-tight mt-0.5" style={{ color: "#b8a98e" }}>
                                            углеводы, г
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {shouldShowIngredients && (
                            <div className="p-3.5 rounded-xl text-sm leading-relaxed border" style={{ background: "rgba(35, 24, 8, 0.6)", borderColor: "#c8853a26", color: "#d9c9b0" }}>
                                <span className="font-medium" style={{ color: "#c8853a" }}>Состав / ингредиенты: </span>
                                {dishNote}
                            </div>
                        )}

                        {/* Подсказка о возможности исключить ингредиенты из состава */}
                        {shouldShowExclusionTip && (
                            <div
                                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm leading-relaxed"
                                style={{ background: "rgba(200, 133, 58, 0.09)", borderColor: "#c8853a33", color: "#e4a55a" }}
                            >
                                <span className="text-base shrink-0">💡</span>
                                <span>По желанию можно что-то исключить из состава</span>
                            </div>
                        )}

                        {/* Кнопки действий */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <button
                                type="button"
                                onClick={() => handleBookTable(currentDish.name)}
                                className="booking-btn flex-1 py-3.5 px-5 rounded-xl text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 text-center cursor-pointer"
                                style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}
                            >
                                <span>Забронировать</span>
                            </button>
                            <a
                                href="tel:+79378435505"
                                onClick={handlePhoneClick}
                                className="py-3.5 px-5 rounded-xl text-sm uppercase tracking-wider font-semibold transition-all duration-200 hover:bg-[#3a2e1e] active:scale-[0.98] flex items-center justify-center gap-2 border text-center cursor-pointer select-none shrink-0"
                                style={{
                                    borderColor: copiedPhone ? "#c8853a" : "#c8853a44",
                                    background: copiedPhone ? "rgba(200, 133, 58, 0.18)" : "transparent",
                                    color: copiedPhone ? "#e4a55a" : "#f5ead8",
                                    fontFamily: "var(--font-body)",
                                    letterSpacing: "0.06em",
                                }}
                                title="Позвонить или скопировать номер"
                            >
                                {copiedPhone ? (
                                    <>
                                        <span className="text-base leading-none" style={{ color: "#c8853a" }}>✓</span>
                                        <span>Номер скопирован!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 shrink-0" style={{ color: "#c8853a" }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                        <span style={{ fontVariantNumeric: "tabular-nums" }}>+7 (937) 843-55-05</span>
                                    </>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Политика конфиденциальности ────────────────────────────────────────────

function PrivacyModal({ onClose }: { onClose: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClose = useCallback(() => {
        if (isClosing) return;
        setIsClosing(true);
        closeTimer.current = setTimeout(() => {
            onClose();
        }, 220);
    }, [isClosing, onClose]);

    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
        };
    }, []);

    useScrollLock();


    useEffect(() => {
        ref.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [handleClose]);

    return (
        <div
            role="presentation"
            className={`booking-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer ${isClosing ? "closing" : ""}`}
            style={{ overscrollBehavior: "contain" }}
            onClick={handleClose}
            onWheel={(e) => e.stopPropagation()}
        >
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby="privacy-title"
                tabIndex={-1}
                className={`booking-modal-panel relative w-full max-w-2xl rounded-2xl p-8 overflow-y-auto cursor-default ${isClosing ? "closing" : ""}`}
                style={{
                    background: "#231808",
                    border: "1px solid #c8853a33",
                    maxHeight: "80vh",
                    overscrollBehavior: "contain",
                    boxShadow: "none",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1.5 rounded-full bg-[#c8853a44] mx-auto -mt-3 mb-4 md:hidden pointer-events-none" aria-hidden="true" />
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-2xl leading-none opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ color: "#f5ead8", fontFamily: "var(--font-display)" }}
                    aria-label="Закрыть"
                >×</button>

                <h2 id="privacy-title" className="text-2xl sm:text-3xl mb-4" style={{ fontFamily: "var(--font-display)", color: "#c8853a" }}>
                    Политика конфиденциальности и обработки персональных данных
                </h2>

                <div className="text-base leading-relaxed flex flex-col gap-4" style={{ color: "#d9c9b0" }}>
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
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 rounded-full text-base font-bold active:scale-[0.96] transition-transform cursor-pointer"
                    style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700, boxShadow: "none" }}
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
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <p id="cookie-notice" className="text-sm leading-relaxed" style={{ color: "#b8a98e" }}>
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
                    className="shrink-0 px-5 py-2.5 rounded-full text-sm tracking-wide font-bold transition-[filter,transform] hover:brightness-110 active:scale-[0.96]"
                    style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700, whiteSpace: "nowrap", boxShadow: "none" }}
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
    id, onClose, triggerRef, children, externalClosing = false,
}: {
    id: string;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLButtonElement | null>;
    children: React.ReactNode;
    externalClosing?: boolean;
}) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isActuallyClosing = isClosing || externalClosing;

    const handleClose = useCallback(() => {
        if (isActuallyClosing) return;
        setIsClosing(true);
        closeTimer.current = setTimeout(() => {
            onClose();
        }, 220);
    }, [isActuallyClosing, onClose]);

    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
        };
    }, []);

    useScrollLock();


    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;
        const sel = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
        const get = () => Array.from(modal.querySelectorAll<HTMLElement>(sel)).filter(el => !el.hasAttribute("disabled"));
        get()[0]?.focus();
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") { handleClose(); return; }
            if (e.key !== "Tab") return;
            const f = get();
            if (e.shiftKey) { if (document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1]?.focus(); } }
            else { if (document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0]?.focus(); } }
        }
        document.addEventListener("keydown", onKey);
        return () => { document.removeEventListener("keydown", onKey); triggerRef?.current?.focus(); };
    }, [handleClose, triggerRef]);

    return (
        <div
            role="presentation"
            className={`booking-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer ${isActuallyClosing ? "closing" : ""}`}
            style={{ overscrollBehavior: "contain" }}
            onClick={handleClose}
            onWheel={(e) => e.stopPropagation()}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={id}
                className={`booking-modal-panel relative w-full max-w-lg rounded-2xl p-6 sm:p-7 md:p-8 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-default ${isActuallyClosing ? "closing" : ""}`}
                style={{ background: "#231808", border: "1px solid #c8853a33", maxHeight: "92vh", overscrollBehavior: "contain", boxShadow: "none", scrollbarWidth: "none", msOverflowStyle: "none" }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    aria-label="Закрыть"
                    className="absolute top-4 right-4 text-2xl leading-none opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ color: "#f5ead8", fontFamily: "var(--font-display)" }}
                >×</button>
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
            <span className="text-sm leading-relaxed" style={{ color: "#b8a98e" }}>
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
            <h3 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "#c8853a" }}>Ждём вас!</h3>
            <p className="text-base sm:text-lg" style={{ color: "#d9c9b0", lineHeight: "1.7" }}>{text}</p>
            <button onClick={onClose} className="mt-6 px-6 py-3 rounded-full text-base font-bold active:scale-[0.96] transition-transform"
                style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700, boxShadow: "none" }}>
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
    onChooseEvent: (hall: "big" | "small") => void;
}) {
    const [isExiting, setIsExiting] = useState(false);
    const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (exitTimer.current) clearTimeout(exitTimer.current);
        };
    }, []);

    const handleSelectOption = (action: () => void) => {
        if (isExiting) return;
        setIsExiting(true);
        exitTimer.current = setTimeout(() => {
            action();
        }, 220);
    };

    return (
        <ModalShell id="choice-title" onClose={onClose} triggerRef={triggerRef} externalClosing={isExiting}>
            <div className="booking-choice-item" style={{ animationDelay: "30ms" }}>
                <h3 id="choice-title" className="text-2xl sm:text-3xl md:text-4xl mb-2" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>
                    Забронировать
                </h3>
                <p className="mb-4 text-base" style={{ color: "#d9c9b0" }}>Кафе «Белоснежка» · г. Октябрьский, Башкортостан</p>
            </div>

            <div
                className="booking-choice-item mb-4 px-3.5 py-2.5 rounded-xl text-sm leading-relaxed"
                style={{
                    animationDelay: "80ms",
                    background: "rgba(200, 133, 58, 0.1)",
                    border: "1px solid #c8853a33",
                    color: "#e4a55a",
                }}
            >
                ✦ В пятницу, субботу и праздничные дни вход — 250 ₽.
            </div>

            <div className="flex flex-col gap-3.5">
                <div className="booking-choice-item" style={{ animationDelay: "130ms" }}>
                    <button
                        type="button"
                        onClick={() => handleSelectOption(onChooseTable)}
                        className="booking-choice-card w-full group relative rounded-xl p-5 text-left cursor-pointer"
                        style={{ background: "#2c1f0e", border: "1px solid #c8853a33" }}
                    >
                        <div className="pr-8">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>Забронировать столик</span>
                            </div>
                            <p className="text-sm sm:text-base" style={{ color: "#b8a98e" }}>Выбрать дату, время и количество гостей для обычного визита</p>
                        </div>
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition-transform group-hover:translate-x-1" style={{ color: "#c8853a" }}>→</span>
                    </button>
                </div>

                <div className="booking-choice-item" style={{ animationDelay: "180ms" }}>
                    <button
                        type="button"
                        onClick={() => handleSelectOption(() => onChooseEvent("big"))}
                        className="booking-choice-card w-full group relative rounded-xl p-5 text-left cursor-pointer"
                        style={{ background: "#2c1f0e", border: "1px solid #c8853a33" }}
                    >
                        <div className="pr-8">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>Большой банкетный зал</span>
                                <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#c8853a", color: "#1a1208" }}>до 150 человек</span>
                            </div>
                            <p className="text-sm sm:text-base" style={{ color: "#b8a98e" }}>Свадьбы, масштабные юбилеи, корпоративы: сцена, танцпол и профессиональный звук</p>
                        </div>
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition-transform group-hover:translate-x-1" style={{ color: "#c8853a" }}>→</span>
                    </button>
                </div>

                <div className="booking-choice-item" style={{ animationDelay: "230ms" }}>
                    <button
                        type="button"
                        onClick={() => handleSelectOption(() => onChooseEvent("small"))}
                        className="booking-choice-card w-full group relative rounded-xl p-5 text-left cursor-pointer"
                        style={{ background: "#2c1f0e", border: "1px solid #c8853a33" }}
                    >
                        <div className="pr-8">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>Малый банкетный зал</span>
                                <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#c8853a", color: "#1a1208" }}>до 25 человек</span>
                            </div>
                            <p className="text-sm sm:text-base" style={{ color: "#b8a98e" }}>Камерные праздники, дни рождения, ужины в приватной обстановке с ТВ и барельефами</p>
                        </div>
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition-transform group-hover:translate-x-1" style={{ color: "#c8853a" }}>→</span>
                    </button>
                </div>
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

function BookingFormModal({
    initialTab = "table",
    onClose,
    onBack,
    onShowPrivacy,
}: {
    initialTab?: "table" | "big" | "small";
    onClose: () => void;
    onBack: () => void;
    onShowPrivacy: () => void;
}) {
    const [currentTab, setCurrentTab] = useState<"table" | "big" | "small">(initialTab);
    const [fadeState, setFadeState] = useState<"idle" | "fading-out" | "fading-in">("idle");
    const [isBackExiting, setIsBackExiting] = useState(false);
    const backTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isSwitchingRef = useRef(false);

    useEffect(() => {
        return () => {
            if (backTimer.current) clearTimeout(backTimer.current);
        };
    }, []);

    const handleBack = () => {
        if (isBackExiting) return;
        setIsBackExiting(true);
        backTimer.current = setTimeout(() => {
            onBack();
        }, 220);
    };

    // Common form fields
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [consent, setConsent] = useState(false);

    // Table form fields
    const [tableTime, setTableTime] = useState("");
    const [tableGuests, setTableGuests] = useState("2");
    const [tableTimeDropdownOpen, setTableTimeDropdownOpen] = useState(false);

    // Event form fields
    const [eventType, setEventType] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [eventGuests, setEventGuests] = useState("");
    const [eventTypeOpen, setEventTypeOpen] = useState(false);
    const [timeFromOpen, setTimeFromOpen] = useState(false);
    const [timeToOpen, setTimeToOpen] = useState(false);

    // Calendar state
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());

    // Status
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [sentMessage, setSentMessage] = useState("");

    const dayOfWeek = date ? new Date(date + "T00:00:00").getDay() : null;
    const isMonOrTue = dayOfWeek === 1 || dayOfWeek === 2;
    const availableTimes = isMonOrTue ? TABLE_TIMES_MON_TUE : TABLE_TIMES_OTHER;

    const availableEventHours =
        dayOfWeek === 5
            ? EVENT_HOURS_FRI
            : dayOfWeek === 6
                ? EVENT_HOURS_SAT
                : dayOfWeek === 0
                    ? EVENT_HOURS_SUN
                    : EVENT_HOURS_MON_THU;

    useEffect(() => {
        if (tableTime && !availableTimes.includes(tableTime)) {
            setTableTime("");
        }
    }, [date, availableTimes, tableTime]);

    useEffect(() => {
        if (timeTo && !availableEventHours.includes(timeTo)) {
            setTimeTo("");
        }
        if (timeFrom && !availableEventHours.includes(timeFrom)) {
            setTimeFrom("");
        }
    }, [date, availableEventHours, timeTo, timeFrom]);

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

    const closeAllDropdowns = () => {
        setDatePickerOpen(false);
        setTableTimeDropdownOpen(false);
        setEventTypeOpen(false);
        setTimeFromOpen(false);
        setTimeToOpen(false);
    };

    const handleTabSwitch = (newTab: "table" | "big" | "small") => {
        if (newTab === currentTab || isSwitchingRef.current) return;
        isSwitchingRef.current = true;
        closeAllDropdowns();

        if (newTab === "small" && Number(eventGuests) > 25) {
            setEventGuests("25");
        }

        const container = containerRef.current;
        if (container) {
            const curH = container.offsetHeight;
            container.style.height = `${curH}px`;
        }

        setFadeState("fading-out");

        setTimeout(() => {
            setCurrentTab(newTab);
            requestAnimationFrame(() => {
                if (containerRef.current && contentRef.current) {
                    const newH = contentRef.current.offsetHeight;
                    containerRef.current.style.height = `${newH}px`;
                }
                setFadeState("fading-in");

                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.height = "";
                    }
                    setFadeState("idle");
                    isSwitchingRef.current = false;
                }, 260);
            });
        }, 140);
    };

    const handleTableSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent || loading || !tableTime || !date) return;
        setLoading(true);

        try {
            await fetch("/send.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    phone,
                    date,
                    time: tableTime,
                    guests: tableGuests,
                    comment: note ? `Столик: ${note}` : "Бронь столика",
                }),
            });
        } catch (err) {
            console.error("Ошибка при отправке в VK:", err);
        } finally {
            setLoading(false);
            setSentMessage("Ваша заявка принята. Администратор подтвердит бронь по телефону в рабочее время в течение 30 минут.");
            setSent(true);
        }
    };

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent || loading || !date || !eventType) return;
        setLoading(true);

        const isBig = currentTab === "big";
        const hallTitle = isBig ? "Большой зал (до 150 человек)" : "Малый зал (до 25 человек)";
        try {
            await fetch("/send.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    phone,
                    date,
                    time: `${timeFrom || "—"} – ${timeTo || "—"}`,
                    guests: eventGuests,
                    comment: `Бронирование зала: ${hallTitle}. Мероприятие: ${eventType}. ${note ? `Пожелания: ${note}` : ""}`.trim(),
                }),
            });
        } catch (err) {
            console.error("Ошибка при отправке в VK:", err);
        } finally {
            setLoading(false);
            setSentMessage(`Ваша заявка на ${isBig ? "Большой зал" : "Малый зал"} принята. Администратор подтвердит бронь по телефону в рабочее время в течение 30 минут.`);
            setSent(true);
        }
    };

    const renderDatePicker = () => (
        <div className="flex flex-col gap-1.5 relative">
            <span className="text-sm tracking-widest uppercase" style={labelCap}>Дата</span>
            <button
                type="button"
                onClick={() => {
                    const next = !datePickerOpen;
                    closeAllDropdowns();
                    setDatePickerOpen(next);
                }}
                className="rounded-lg px-3 py-3 text-base transition-[border-color] flex items-center justify-between text-left truncate cursor-pointer"
                style={{ ...inputStyle, color: date ? "#f5ead8" : "#d9c9b088" }}
            >
                <span className="truncate" style={{ fontFamily: "var(--font-body)" }}>
                    {formatDisplayDate(date)}
                </span>
                <svg
                    className="w-4 h-4 shrink-0 ml-1.5 transition-opacity"
                    style={{ color: "#c8853a", opacity: date ? 1 : 0.7 }}
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
                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-500/20 text-sm transition-colors cursor-pointer"
                                style={{ color: "#c8853a" }}
                            >
                                ‹
                            </button>
                            <span className="text-base font-medium tracking-wide flex items-center gap-1.5" style={{ color: "#f5ead8" }}>
                                <span style={{ fontFamily: "var(--font-display)" }}>{MONTH_NAMES_RU[viewMonth]}</span>
                                <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "lining-nums" }}>{viewYear}</span>
                            </span>
                            <button
                                type="button"
                                onClick={nextMonth}
                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-500/20 text-sm transition-colors cursor-pointer"
                                style={{ color: "#c8853a" }}
                            >
                                ›
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                            {WEEK_DAYS_SHORT.map((wd) => (
                                <span key={wd} className="text-xs font-medium" style={{ color: "#c8853a99", fontFamily: "var(--font-body)" }}>
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
                                const isSelected = date === fullIso;

                                return (
                                    <button
                                        key={d}
                                        type="button"
                                        disabled={isPast}
                                        onClick={() => {
                                            setDate(fullIso);
                                            setDatePickerOpen(false);
                                        }}
                                        className="h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
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
    );

    const currentBadge =
        currentTab === "table"
            ? "до 8 гостей"
            : currentTab === "big"
                ? "до 150 человек"
                : "до 25 человек";

    return (
        <ModalShell id="booking-modal-title" onClose={onClose} externalClosing={isBackExiting}>
            {sent ? (
                <SuccessScreen onClose={onClose} text={sentMessage} />
            ) : (
                <>
                    {/* Верхняя навигационная строка */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center gap-1.5 text-sm transition-colors hover:text-amber-300 cursor-pointer"
                            style={{ color: "#c8853a88" }}
                        >
                            ← Назад к выбору
                        </button>
                        <span
                            className="text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-200"
                            style={{ background: "#c8853a26", color: "#e4a55a", border: "1px solid #c8853a44" }}
                        >
                            {currentBadge}
                        </span>
                    </div>

                    {/* Подвкладки бронирования: Столик, Большой зал, Малый зал */}
                    <div
                        className="grid grid-cols-3 gap-1.5 p-1 rounded-xl mb-5 select-none"
                        style={{ background: "#1c1206", border: "1px solid #c8853a33" }}
                        role="tablist"
                        aria-label="Выбор типа бронирования"
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-selected={currentTab === "table"}
                            onClick={() => handleTabSwitch("table")}
                            className={`booking-subtab-btn py-2 px-1 sm:px-2 rounded-lg text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none transition-all duration-200 ${
                                currentTab === "table" ? "is-active" : ""
                            }`}
                            style={{
                                background: currentTab === "table" ? "#c8853a" : "transparent",
                                color: currentTab === "table" ? "#1a1208" : "#d9c9b0",
                            }}
                        >
                            <span className="font-bold text-xs sm:text-sm whitespace-nowrap">Столик</span>
                            <span className="text-[10px] sm:text-xs opacity-80 whitespace-nowrap">до 8 гостей</span>
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={currentTab === "big"}
                            onClick={() => handleTabSwitch("big")}
                            className={`booking-subtab-btn py-2 px-1 sm:px-2 rounded-lg text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none transition-all duration-200 ${
                                currentTab === "big" ? "is-active" : ""
                            }`}
                            style={{
                                background: currentTab === "big" ? "#c8853a" : "transparent",
                                color: currentTab === "big" ? "#1a1208" : "#d9c9b0",
                            }}
                        >
                            <span className="font-bold text-xs sm:text-sm whitespace-nowrap">Большой зал</span>
                            <span className="text-[10px] sm:text-xs opacity-80 whitespace-nowrap">до 150 чел.</span>
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={currentTab === "small"}
                            onClick={() => handleTabSwitch("small")}
                            className={`booking-subtab-btn py-2 px-1 sm:px-2 rounded-lg text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none transition-all duration-200 ${
                                currentTab === "small" ? "is-active" : ""
                            }`}
                            style={{
                                background: currentTab === "small" ? "#c8853a" : "transparent",
                                color: currentTab === "small" ? "#1a1208" : "#d9c9b0",
                            }}
                        >
                            <span className="font-bold text-xs sm:text-sm whitespace-nowrap">Малый зал</span>
                            <span className="text-[10px] sm:text-xs opacity-80 whitespace-nowrap">до 25 чел.</span>
                        </button>
                    </div>

                    {/* Контейнер с плавной анимацией высоты и переключения контента */}
                    <div
                        ref={containerRef}
                        className="booking-form-transition-container"
                        style={{ overflow: "visible" }}
                    >
                        <div
                            ref={contentRef}
                            className="booking-form-content"
                            style={{
                                opacity: fadeState === "fading-out" ? 0 : 1,
                                transform: fadeState === "fading-out" ? "translateY(6px) scale(0.995)" : "translateY(0) scale(1)",
                            }}
                        >
                            {/* Заголовок и пояснение вкладки */}
                            <h3 id="booking-modal-title" className="text-2xl sm:text-3xl md:text-4xl mb-2" style={{ fontFamily: "var(--font-display)", color: "#f5ead8" }}>
                                {currentTab === "table"
                                    ? "Забронировать столик"
                                    : currentTab === "big"
                                        ? "Бронирование Большого зала"
                                        : "Бронирование Малого зала"}
                            </h3>
                            <p className="mb-4 text-sm sm:text-base" style={{ color: "#d9c9b0" }}>
                                {currentTab === "table"
                                    ? "Кафе «Белоснежка» · г. Октябрьский, Башкортостан"
                                    : currentTab === "big"
                                        ? "Торжественный банкетный зал со сценой, большим танцполом и барной зоной"
                                        : "Уютный приватный зал с панорамным зеркалом, ТВ-экраном и барельефами"}
                            </p>

                            <div className="mb-5 px-3.5 py-2.5 rounded-xl text-sm leading-relaxed" style={{ background: "rgba(200, 133, 58, 0.1)", border: "1px solid #c8853a33", color: "#e4a55a" }}>
                                {currentTab === "table"
                                    ? "✦ В пятницу, субботу и праздничные дни вход — 250 ₽."
                                    : currentTab === "big"
                                        ? "✦ Вместимость Большого зала — до 150 человек. Разрешены свои фрукты и напитки."
                                        : "✦ Вместимость Малого зала — до 25 человек. Спокойный приватный отдых без посторонних."}
                            </div>

                            {/* Форма для текущей вкладки */}
                            {currentTab === "table" ? (
                                <form onSubmit={handleTableSubmit} className="flex flex-col gap-4">
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Ваше имя</span>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Анастасия Королева"
                                            value={name}
                                            onChange={e => setName(formatName(e.target.value))}
                                            className="rounded-lg px-4 py-3 text-base transition-[border-color]"
                                            style={inputStyle}
                                        />
                                    </label>

                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Телефон</span>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+7 (937) 000-00-00"
                                            value={phone}
                                            onChange={e => setPhone(formatPhone(e.target.value))}
                                            className="rounded-lg px-4 py-3 text-base transition-[border-color]"
                                            style={inputStyle}
                                        />
                                    </label>

                                    <div className="grid grid-cols-2 gap-3">
                                        {renderDatePicker()}

                                        <div className="flex flex-col gap-1.5 relative">
                                            <span className="text-sm tracking-widest uppercase" style={labelCap}>Время</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setTableTimeDropdownOpen(!tableTimeDropdownOpen);
                                                    setDatePickerOpen(false);
                                                }}
                                                className="rounded-lg px-4 py-3 text-base transition-[border-color] flex items-center justify-between text-left cursor-pointer"
                                                style={{ ...inputStyle, color: tableTime ? "#f5ead8" : "#d9c9b088" }}
                                            >
                                                <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                                    {tableTime || "Выберите"}
                                                </span>
                                                <span
                                                    className="text-xs transition-transform duration-200"
                                                    style={{
                                                        transform: tableTimeDropdownOpen ? "rotate(180deg)" : "none",
                                                        color: "#c8853a",
                                                    }}
                                                >
                                                    ▼
                                                </span>
                                            </button>

                                            {tableTimeDropdownOpen && (
                                                <>
                                                    <div className="fixed inset-0 z-20" onClick={() => setTableTimeDropdownOpen(false)} />
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
                                                                    setTableTime(t);
                                                                    setTableTimeDropdownOpen(false);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-base transition-colors flex items-center justify-between cursor-pointer"
                                                                style={{
                                                                    color: tableTime === t ? "#c8853a" : "#f5ead8",
                                                                    background: tableTime === t ? "#2c1f0e" : "transparent",
                                                                    fontFamily: "var(--font-body)",
                                                                    boxShadow: "none",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    if (tableTime !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (tableTime !== t) e.currentTarget.style.background = "transparent";
                                                                }}
                                                            >
                                                                <span>{t}</span>
                                                                {tableTime === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <fieldset>
                                        <legend className="text-sm tracking-widest uppercase mb-2" style={labelCap}>Гостей</legend>
                                        <div className="flex gap-2 flex-wrap">
                                            {["1", "2", "3", "4", "5", "6+"].map(g => (
                                                <button key={g} type="button" onClick={() => setTableGuests(g)} aria-pressed={tableGuests === g}
                                                    className="px-4 py-2.5 rounded-lg text-base transition-[background-color,color,border-color] active:scale-[0.96] cursor-pointer"
                                                    style={{
                                                        background: tableGuests === g ? "#c8853a" : "#2c1f0e", color: tableGuests === g ? "#1a1208" : "#d9c9b0",
                                                        border: `1px solid ${tableGuests === g ? "#c8853a" : "#c8853a44"}`, fontFamily: "var(--font-body)",
                                                        fontWeight: tableGuests === g ? 700 : 500,
                                                        boxShadow: "none"
                                                    }}>
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Пожелания</span>
                                        <textarea rows={2} placeholder="Столик у окна, день рождения..." value={note}
                                            onChange={e => setNote(e.target.value)}
                                            className="rounded-lg px-4 py-2.5 text-base resize-none transition-[border-color]" style={inputStyle} />
                                    </label>

                                    <ConsentCheckbox checked={consent} onChange={setConsent} onShowPrivacy={onShowPrivacy} />

                                    <button type="submit" disabled={!consent || loading || !tableTime || !date}
                                        className="booking-btn mt-2 rounded-lg py-3.5 text-base tracking-widest uppercase font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                        style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", letterSpacing: "0.12em", fontWeight: 700 }}>
                                        {loading ? "Отправка..." : "Подтвердить"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleEventSubmit} className="flex flex-col gap-4">
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Контактное лицо</span>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Анастасия Королева"
                                            value={name}
                                            onChange={e => setName(formatName(e.target.value))}
                                            className="rounded-lg px-4 py-3 text-base transition-[border-color]"
                                            style={inputStyle}
                                        />
                                    </label>

                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Телефон</span>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+7 (937) 000-00-00"
                                            value={phone}
                                            onChange={e => setPhone(formatPhone(e.target.value))}
                                            className="rounded-lg px-4 py-3 text-base transition-[border-color]"
                                            style={inputStyle}
                                        />
                                    </label>

                                    <div className="flex flex-col gap-1.5 relative">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Тип мероприятия</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const next = !eventTypeOpen;
                                                closeAllDropdowns();
                                                setEventTypeOpen(next);
                                            }}
                                            className="rounded-lg px-4 py-3 text-base transition-[border-color] flex items-center justify-between text-left cursor-pointer"
                                            style={{ ...inputStyle, color: eventType ? "#f5ead8" : "#d9c9b088" }}
                                        >
                                            <span>{eventType || "Выберите"}</span>
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
                                                                setEventType(t);
                                                                setEventTypeOpen(false);
                                                            }}
                                                            className="w-full px-4 py-2.5 text-left text-base transition-colors flex items-center justify-between cursor-pointer"
                                                            style={{
                                                                color: eventType === t ? "#c8853a" : "#f5ead8",
                                                                background: eventType === t ? "#2c1f0e" : "transparent",
                                                                fontFamily: "var(--font-body)",
                                                                boxShadow: "none",
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                if (eventType !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (eventType !== t) e.currentTarget.style.background = "transparent";
                                                            }}
                                                        >
                                                            <span>{t}</span>
                                                            {eventType === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {renderDatePicker()}

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1.5 relative">
                                            <span className="text-sm tracking-widest uppercase" style={labelCap}>Время с</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = !timeFromOpen;
                                                    closeAllDropdowns();
                                                    setTimeFromOpen(next);
                                                }}
                                                className="rounded-lg px-4 py-3 text-base transition-[border-color] flex items-center justify-between text-left cursor-pointer"
                                                style={{ ...inputStyle, color: timeFrom ? "#f5ead8" : "#d9c9b088" }}
                                            >
                                                <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                                    {timeFrom || "Выберите"}
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
                                                                    setTimeFrom(t);
                                                                    setTimeFromOpen(false);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-base transition-colors flex items-center justify-between cursor-pointer"
                                                                style={{
                                                                    color: timeFrom === t ? "#c8853a" : "#f5ead8",
                                                                    background: timeFrom === t ? "#2c1f0e" : "transparent",
                                                                    fontFamily: "var(--font-body)",
                                                                    boxShadow: "none",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    if (timeFrom !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (timeFrom !== t) e.currentTarget.style.background = "transparent";
                                                                }}
                                                            >
                                                                <span>{t}</span>
                                                                {timeFrom === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1.5 relative">
                                            <span className="text-sm tracking-widest uppercase" style={labelCap}>Время до</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = !timeToOpen;
                                                    closeAllDropdowns();
                                                    setTimeToOpen(next);
                                                }}
                                                className="rounded-lg px-4 py-3 text-base transition-[border-color] flex items-center justify-between text-left cursor-pointer"
                                                style={{ ...inputStyle, color: timeTo ? "#f5ead8" : "#d9c9b088" }}
                                            >
                                                <span style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                                    {timeTo || "Выберите"}
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
                                                                    setTimeTo(t);
                                                                    setTimeToOpen(false);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-base transition-colors flex items-center justify-between cursor-pointer"
                                                                style={{
                                                                    color: timeTo === t ? "#c8853a" : "#f5ead8",
                                                                    background: timeTo === t ? "#2c1f0e" : "transparent",
                                                                    fontFamily: "var(--font-body)",
                                                                    boxShadow: "none",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    if (timeTo !== t) e.currentTarget.style.background = "#2c1f0e88";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (timeTo !== t) e.currentTarget.style.background = "transparent";
                                                                }}
                                                            >
                                                                <span>{t}</span>
                                                                {timeTo === t && <span style={{ color: "#c8853a" }}>✓</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Примерное количество гостей</span>
                                        <input
                                            type="number"
                                            min="1"
                                            max={currentTab === "big" ? 150 : 25}
                                            placeholder={currentTab === "big" ? "до 150" : "до 25"}
                                            value={eventGuests}
                                            onChange={e => {
                                                const val = e.target.value;
                                                const limit = currentTab === "big" ? 150 : 25;
                                                if (!val || (Number(val) >= 1 && Number(val) <= limit)) {
                                                    setEventGuests(val);
                                                }
                                            }}
                                            className="rounded-lg px-4 py-3 text-base transition-[border-color]"
                                            style={{
                                                ...inputStyle,
                                                fontVariantNumeric: "tabular-nums",
                                            }}
                                        />
                                        <span className="text-xs" style={{ color: "#b8a98e" }}>
                                            {currentTab === "big"
                                                ? "Вместимость Большого зала — до 150 человек"
                                                : "Вместимость Малого зала — до 25 человек"}
                                        </span>
                                    </label>

                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm tracking-widest uppercase" style={labelCap}>Пожелания</span>
                                        <textarea
                                            rows={2}
                                            placeholder={currentTab === "big" ? "Рассадка гостей, сцена, живая музыка, меню..." : "Рассадка гостей, ТВ-экран, сервировка, меню..."}
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                            className="rounded-lg px-4 py-2.5 text-base resize-none transition-[border-color]"
                                            style={inputStyle}
                                        />
                                    </label>

                                    <ConsentCheckbox checked={consent} onChange={setConsent} onShowPrivacy={onShowPrivacy} />

                                    <button
                                        type="submit"
                                        disabled={!consent || loading || !date || !eventType}
                                        className="booking-btn mt-2 rounded-lg py-3.5 text-base tracking-widest uppercase font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                        style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", letterSpacing: "0.12em", fontWeight: 700 }}>
                                        {loading ? "Отправка..." : `Забронировать ${currentTab === "big" ? "Большой зал" : "Малый зал"}`}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}
        </ModalShell>
    );
}

function BookingTableModal({
    onClose, onBack, onShowPrivacy,
}: {
    onClose: () => void;
    onBack: () => void;
    onShowPrivacy: () => void;
}) {
    return (
        <BookingFormModal
            initialTab="table"
            onClose={onClose}
            onBack={onBack}
            onShowPrivacy={onShowPrivacy}
        />
    );
}

function BookingEventModal({
    onClose, onBack, onShowPrivacy, initialHall = "big",
}: {
    onClose: () => void;
    onBack: () => void;
    onShowPrivacy: () => void;
    initialHall?: "big" | "small";
}) {
    return (
        <BookingFormModal
            initialTab={initialHall}
            onClose={onClose}
            onBack={onBack}
            onShowPrivacy={onShowPrivacy}
        />
    );
}

// ─── Компонент слайдера фотографий банкетного зала с поддержкой плавного свайпа ─────────────

type HallPhotoItem = {
    src: string;
    alt: string;
    title: string;
    desc: string;
};

function HallPhotoSlider({
    photos,
    photoIndex,
    setPhotoIndex,
    capacityBadge,
    typeBadge,
    onOpenLightbox,
}: {
    photos: HallPhotoItem[];
    photoIndex: number;
    setPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
    capacityBadge: string;
    typeBadge: string;
    onOpenLightbox: (index: number) => void;
}) {
    const count = photos.length;
    // Клонированные слайды: [последний, ...photos, первый] для бесшовного зацикленного скролла
    const extendedPhotos = useMemo(() => {
        if (!photos || photos.length === 0) return [];
        const first = photos[0];
        const last = photos[photos.length - 1];
        return [
            { ...last, keyId: `clone-last-${last.src}` },
            ...photos.map((p, i) => ({ ...p, keyId: `real-${i}-${p.src}` })),
            { ...first, keyId: `clone-first-${first.src}` },
        ];
    }, [photos]);

    // virtualIndex: от 1 до count — настоящие слайды; 0 — клон последнего; count + 1 — клон первого
    const [virtualIndex, setVirtualIndex] = useState(photoIndex + 1);
    const [withTransition, setWithTransition] = useState(true);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const isAnimatingRef = useRef(false);
    const isMouseDown = useRef(false);
    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const touchCurrentX = useRef<number>(0);
    const isHorizontal = useRef<boolean | null>(null);
    const hasMoved = useRef<boolean>(false);

    // Синхронизация при внешнем изменении (например, клик по миниатюре)
    useEffect(() => {
        const currentReal = (virtualIndex - 1 + count) % count;
        if (photoIndex !== currentReal && !isAnimatingRef.current) {
            setWithTransition(true);
            setVirtualIndex(photoIndex + 1);
        }
    }, [photoIndex, count, virtualIndex]);

    const goNext = () => {
        if (count <= 1 || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        setWithTransition(true);
        setVirtualIndex((prev) => {
            const next = prev + 1;
            const nextReal = (next - 1 + count) % count;
            setPhotoIndex(nextReal);
            return next;
        });
    };

    const goPrev = () => {
        if (count <= 1 || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        setWithTransition(true);
        setVirtualIndex((prev) => {
            const next = prev - 1;
            const nextReal = (next - 1 + count) % count;
            setPhotoIndex(nextReal);
            return next;
        });
    };

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        isAnimatingRef.current = false;

        if (virtualIndex >= count + 1) {
            // Достигнут клон первого слайда — мгновенно переключаем на реальный первый слайд
            setWithTransition(false);
            setVirtualIndex(1);
        } else if (virtualIndex <= 0) {
            // Достигнут клон последнего слайда — мгновенно переключаем на реальный последний слайд
            setWithTransition(false);
            setVirtualIndex(count);
        }
    };

    // Восстановление плавного transition после мгновенного сброса
    useEffect(() => {
        if (!withTransition) {
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setWithTransition(true);
                });
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [withTransition]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isAnimatingRef.current || e.touches.length !== 1) return;
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchCurrentX.current = e.touches[0].clientX;
        isHorizontal.current = null;
        hasMoved.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isAnimatingRef.current || e.touches.length !== 1) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        touchCurrentX.current = currentX;
        const dx = currentX - touchStartX.current;
        const dy = currentY - touchStartY.current;

        if (isHorizontal.current === null) {
            if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
                isHorizontal.current = Math.abs(dx) > Math.abs(dy);
                if (isHorizontal.current) {
                    setIsDragging(true);
                }
            }
        }

        if (isHorizontal.current === true) {
            setDragOffset(dx);
            if (Math.abs(dx) > 10) {
                hasMoved.current = true;
            }
        }
    };

    const handleTouchEnd = () => {
        if (!isHorizontal.current && !isDragging) return;
        const dx = touchCurrentX.current - touchStartX.current;
        setIsDragging(false);
        setDragOffset(0);
        const wasHorizontal = isHorizontal.current;
        isHorizontal.current = null;

        if (wasHorizontal && Math.abs(dx) > 40) {
            if (dx < 0) {
                goNext();
            } else {
                goPrev();
            }
        }
    };

    const handleTouchCancel = () => {
        setIsDragging(false);
        setDragOffset(0);
        isHorizontal.current = null;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0 || isAnimatingRef.current) return;
        isMouseDown.current = true;
        touchStartX.current = e.clientX;
        touchStartY.current = e.clientY;
        touchCurrentX.current = e.clientX;
        hasMoved.current = false;
        isHorizontal.current = null;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current || isAnimatingRef.current) return;
        const dx = e.clientX - touchStartX.current;
        touchCurrentX.current = e.clientX;
        if (Math.abs(dx) > 5) {
            setIsDragging(true);
            hasMoved.current = true;
            setDragOffset(dx);
        }
    };

    const handleMouseUp = () => {
        if (!isMouseDown.current) return;
        isMouseDown.current = false;
        setIsDragging(false);
        setDragOffset(0);
        const dx = touchCurrentX.current - touchStartX.current;
        if (Math.abs(dx) > 40) {
            if (dx < 0) {
                goNext();
            } else {
                goPrev();
            }
        }
        setTimeout(() => {
            hasMoved.current = false;
        }, 50);
    };

    const currentRealIndex = (virtualIndex - 1 + count) % count;
    const currentPhoto = photos[currentRealIndex] || photos[0];

    const handleClick = () => {
        if (hasMoved.current) {
            hasMoved.current = false;
            return;
        }
        onOpenLightbox(currentRealIndex);
    };

    return (
        <div>
            <div
                className="relative aspect-[16/10] overflow-hidden bg-[#2c1f0e] select-none cursor-grab active:cursor-grabbing"
                style={{ touchAction: "pan-y" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleClick}
                title="Нажмите для полноэкранного просмотра галереи"
            >
                {/* Анимированная горизонтальная лента слайдов с transform и transition 400ms ease */}
                <div
                    onTransitionEnd={handleTransitionEnd}
                    className="flex h-full w-full"
                    style={{
                        transform: `translateX(calc(-${virtualIndex * 100}% + ${dragOffset}px))`,
                        transition: isDragging ? "none" : (withTransition ? "transform 400ms ease" : "none"),
                        willChange: "transform",
                    }}
                >
                    {extendedPhotos.map((photo, idx) => (
                        <div key={photo.keyId || idx} className="w-full h-full shrink-0 relative overflow-hidden">
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 outline outline-1 -outline-offset-1 outline-white/10 pointer-events-none select-none"
                                style={{ filter: "contrast(1.08) saturate(1.15) brightness(1.0)" }}
                                loading={idx <= 2 ? "eager" : "lazy"}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Бейджи */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
                    <span
                        className="text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)" }}
                    >
                        {capacityBadge}
                    </span>
                    <span
                        className="text-sm px-3 py-1 rounded-full backdrop-blur-md"
                        style={{ background: "rgba(26,18,8,0.8)", color: "#f5ead8", border: "1px solid #c8853a33" }}
                    >
                        {typeBadge}
                    </span>
                </div>

                {/* Иконка открытия полноэкранного просмотра */}
                <span
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                    style={{ background: "rgba(26,18,8,0.7)", color: "#f5ead8", fontSize: 16 }}
                    aria-hidden="true"
                >
                    ⤢
                </span>

                {/* Стрелки переключения фото: левая = предыдущий, правая = следующий */}
                {photos.length > 1 && (
                    <>
                        <button
                            type="button"
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchEnd={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            aria-label="Предыдущее фото зала"
                            className="flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-xl sm:text-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none z-20"
                            style={{ background: "rgba(26,18,8,0.85)", color: "#f5ead8", border: "1px solid #c8853a55" }}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchEnd={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            aria-label="Следующее фото зала"
                            className="flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-xl sm:text-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none z-20"
                            style={{ background: "rgba(26,18,8,0.85)", color: "#f5ead8", border: "1px solid #c8853a55" }}
                        >
                            ›
                        </button>
                    </>
                )}

                {/* Подпись текущей фотографии и индикаторы для мобильных */}
                <div className="absolute bottom-0 inset-x-0 p-3 pt-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between pointer-events-none z-10">
                    <div className="min-w-0 pr-2">
                        <p className="text-sm font-bold text-[#f5ead8] flex items-center gap-1.5">
                            <span className="text-[#c8853a]">✦</span>
                            <span className="truncate">{currentPhoto.title}</span>
                        </p>
                        <p className="text-xs text-[#d9c9b0]/80 line-clamp-1">
                            {currentPhoto.desc}
                        </p>
                    </div>

                    {/* Точки-индикаторы (Page Controls) для плавной навигации на мобильных */}
                    <div className="flex md:hidden items-center gap-1.5 shrink-0 pb-1 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                        {photos.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isAnimatingRef.current) return;
                                    setWithTransition(true);
                                    setVirtualIndex(idx + 1);
                                    setPhotoIndex(idx);
                                }}
                                aria-label={`Перейти к фото ${idx + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    idx === currentRealIndex
                                        ? "w-6 bg-[#c8853a]"
                                        : "w-2 bg-white/40 hover:bg-white/80 hover:scale-125"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Лента миниатюр — отображается на десктопе */}
            <div className="hidden md:flex p-2.5 bg-[#170e04] border-b border-[#c8853a22] items-center gap-2 overflow-x-auto select-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {photos.map((photo, idx) => {
                    const isActive = idx === currentRealIndex;
                    return (
                        <button
                            key={photo.title}
                            type="button"
                            onClick={() => {
                                if (isAnimatingRef.current) return;
                                setWithTransition(true);
                                setVirtualIndex(idx + 1);
                                setPhotoIndex(idx);
                            }}
                            className={`relative flex-1 min-w-[50px] max-w-[80px] aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                isActive
                                    ? "border-[#c8853a] ring-2 ring-[#c8853a]/60 scale-[1.03]"
                                    : "border-white/10 opacity-55 hover:opacity-100 hover:border-[#c8853a]/60"
                            }`}
                            title={photo.title}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Приложение ─────────────────────────────────────────────────────────────

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<"choice" | "table" | "event" | null>(null);
    const [selectedBookingHall, setSelectedBookingHall] = useState<"big" | "small">("big");
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [lightbox, setLightbox] = useState<{ items?: LightboxItem[]; index: number } | null>(null);
    const [bigHallPhotoIndex, setBigHallPhotoIndex] = useState(0);
    const [smallHallPhotoIndex, setSmallHallPhotoIndex] = useState(0);

    const [activePromoTab, setActivePromoTab] = useState<"all" | "birthday" | "banquet" | "wedding">("all");
    const [activeMenuCategory, setActiveMenuCategory] = useState<string>("mangal");
    const [selectedTabId, setSelectedTabId] = useState<string>("mangal");
    const [mobileContainerHeight, setMobileContainerHeight] = useState<number | null>(null);
    const [mobileFadeState, setMobileFadeState] = useState<"visible" | "fading-out" | "fading-in">("visible");
    const mobileMenuContainerRef = useRef<HTMLDivElement>(null);
    const mobileMenuInnerRef = useRef<HTMLDivElement>(null);
    const mobileAnimTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeDishModal, setActiveDishModal] = useState<DishModalData | null>(null);
    const [cookieOk, setCookieOk] = useState(() => {
        try { return localStorage.getItem("cookie_consent") === "1"; } catch { return false; }
    });
    const [scrolled, setScrolled] = useState(false);
    const bookingTriggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setMobileContainerHeight(null);
            setMobileFadeState("visible");
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (mobileAnimTimerRef.current) clearTimeout(mobileAnimTimerRef.current);
        };
    }, []);

    const handleMenuCategoryChange = (newCatId: string) => {
        if (newCatId === selectedTabId && newCatId === activeMenuCategory) return;

        // Если экран десктопный — мгновенное переключение без мобильных задержек
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setSelectedTabId(newCatId);
            setActiveMenuCategory(newCatId);
            return;
        }

        // Мгновенная тактильная подсветка активной подвкладки
        setSelectedTabId(newCatId);

        if (mobileAnimTimerRef.current) {
            clearTimeout(mobileAnimTimerRef.current);
        }

        // Замеряем текущую высоту мобильного контейнера
        const currentH = mobileMenuInnerRef.current?.offsetHeight || mobileMenuContainerRef.current?.offsetHeight;
        if (currentH) {
            setMobileContainerHeight(currentH);
        }
        setMobileFadeState("fading-out");

        // Плавный переход: смена раздела строго после завершения fade-out (150 мс)
        mobileAnimTimerRef.current = setTimeout(() => {
            setActiveMenuCategory(newCatId);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const newH = mobileMenuInnerRef.current?.scrollHeight || mobileMenuInnerRef.current?.offsetHeight;
                    if (newH) {
                        setMobileContainerHeight(newH);
                    }
                    setMobileFadeState("fading-in");

                    mobileAnimTimerRef.current = setTimeout(() => {
                        setMobileContainerHeight(null);
                        setMobileFadeState("visible");
                    }, 300);
                });
            });
        }, 150);
    };

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

    useScrollLock(menuOpen);

    useEffect(() => {
        if (!menuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        };
    }, [menuOpen]);

    function acceptCookie() {
        try { localStorage.setItem("cookie_consent", "1"); } catch { }
        setCookieOk(true);
    }

    function openBooking() { setBookingStep("choice"); }
    function openEventBooking(hall: "big" | "small" = "big") {
        setSelectedBookingHall(hall);
        setBookingStep("event");
    }

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMenuOpen(false);
        if (href === "#" || !href.startsWith("#")) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 64;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: "smooth"
            });
            window.history.pushState(null, "", href);
        }
    };

    const filteredPromotions = activePromoTab === "all"
        ? PROMOTIONS
        : PROMOTIONS.filter(p => p.category === activePromoTab);

    const currentCatalog = FULL_CATALOG.find((cat) => cat.id === activeMenuCategory) || FULL_CATALOG[0];
    const currentCatMeta = MENU_CATEGORIES_META.find((c) => c.id === activeMenuCategory) || MENU_CATEGORIES_META[0];
    const allCategoryDishes = currentCatalog.sections.flatMap((s) => s.items);

    const openDishDetails = (dish: Dish, section?: MenuSection, dishIndexInCat?: number) => {
        const idx =
            dishIndexInCat !== undefined && dishIndexInCat >= 0
                ? dishIndexInCat
                : allCategoryDishes.findIndex((d) => d.name === dish.name);
        const resolvedSection = section || currentCatalog.sections.find((s) => s.items.some((item) => item.name === dish.name));
        setActiveDishModal({
            dish,
            categoryTitle: currentCatalog.title,
            categoryId: currentCatalog.id,
            sectionTitle: resolvedSection?.title,
            allDishes: allCategoryDishes,
            currentIndex: idx >= 0 ? idx : 0,
        });
    };

    const handleChangeDishInModal = (nextIdx: number) => {
        if (!activeDishModal) return;
        const targetDish = activeDishModal.allDishes[nextIdx];
        if (!targetDish) return;
        const resolvedSection = currentCatalog.sections.find((s) => s.items.some((item) => item.name === targetDish.name));
        setActiveDishModal({
            ...activeDishModal,
            dish: targetDish,
            sectionTitle: resolvedSection?.title,
            currentIndex: nextIdx,
        });
    };

    const renderSectionBlock = (section: MenuSection, idx: number) => (
        <div key={idx} className="flex flex-col">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b" style={{ borderColor: "#c8853a33" }}>
                <h4 className="text-xl md:text-2xl font-medium tracking-wide" style={{ fontFamily: "var(--font-display)", color: "#c8853a", fontStyle: "italic" }}>
                    {section.title}
                </h4>
                <span className="text-sm" style={{ color: "#b8a98e88" }}>
                    {section.items.length} поз.
                </span>
            </div>

            <div className="flex flex-col">
                {section.items.map((dish, i) => {
                    const isLast = i === section.items.length - 1;
                    const dishTag = getDishTag(dish);
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => openDishDetails(dish, section)}
                            className={`dish-card-btn group flex items-baseline justify-between gap-4 py-3 px-3 -mx-3 rounded-xl text-left cursor-pointer ${isLast ? "" : "border-b"}`}
                            style={{ borderColor: "#c8853a11" }}
                            title="Нажмите, чтобы посмотреть фото и описание блюда"
                        >
                            <div className="flex flex-col gap-1 min-w-0 pr-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="dish-name text-base sm:text-lg leading-snug font-medium transition-colors" style={{ color: "#f5ead8" }}>
                                        {dish.name}
                                    </span>
                                    {dishTag && (
                                        <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "#c8853a22", color: "#c8853a", border: "1px solid #c8853a44" }}>
                                            {dishTag}
                                        </span>
                                    )}
                                </div>
                                {dish.weight && (
                                    <div className="flex gap-2 items-center flex-wrap">
                                        <span className="text-sm" style={{ color: "#c8853a99", fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>
                                            {dish.weight}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div
                                className="dish-price shrink-0 flex items-baseline justify-end font-semibold select-none transition-colors"
                                style={{
                                    color: "#c8853a",
                                    minWidth: "125px",
                                    fontFamily: "var(--font-body)",
                                    fontVariantNumeric: "tabular-nums lining-nums",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <span className="text-base sm:text-lg">{formatPrice(dish.price)}</span>
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
                className="fixed top-0 left-0 right-0 z-40"
                style={{
                    background: (scrolled || menuOpen) ? "rgba(26, 18, 8, 0.92)" : "transparent",
                    backdropFilter: (scrolled || menuOpen) ? "blur(16px)" : "none",
                    WebkitBackdropFilter: (scrolled || menuOpen) ? "blur(16px)" : "none",
                    borderBottom: (scrolled || menuOpen) ? "1px solid rgba(200, 133, 58, 0.2)" : "1px solid transparent",
                    boxShadow: (scrolled || menuOpen) ? "0 10px 30px -10px rgba(0, 0, 0, 0.5)" : "none",
                    transition: "background 350ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 350ms cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 350ms cubic-bezier(0.16, 1, 0.3, 1), border-color 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a
                        href="#"
                        onClick={(e) => scrollToSection(e, "#")}
                        className="flex flex-col leading-none cursor-pointer"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        <span className="text-2xl font-semibold tracking-wide" style={{ color: "#f5ead8" }}>Белоснежка</span>
                        <span className="text-sm tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.14em" }}>Кафе · Октябрьский</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => scrollToSection(e, href)}
                                className="text-base font-medium transition-colors hover:text-amber-400 cursor-pointer"
                                style={{ color: "#d9c9b0", letterSpacing: "0.04em" }}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            ref={bookingTriggerRef}
                            onClick={openBooking}
                            className="booking-btn hidden md:block px-5 py-2 rounded-full text-base tracking-wide font-bold cursor-pointer"
                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}
                        >
                            Забронировать
                        </button>
                        <button
                            className="md:hidden min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1.5 p-3 cursor-pointer select-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                            aria-expanded={menuOpen}
                        >
                            <span
                                className={`block w-5 h-[1.5px] rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                                    menuOpen ? "rotate-45 translate-y-[7.5px] bg-[#c8853a]" : "bg-[#f5ead8]"
                                }`}
                            />
                            <span
                                className={`block w-3.5 h-[1.5px] rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    menuOpen ? "opacity-0 scale-x-0" : "opacity-100 bg-[#c8853a]"
                                }`}
                            />
                            <span
                                className={`block w-5 h-[1.5px] rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                                    menuOpen ? "-rotate-45 -translate-y-[7.5px] bg-[#c8853a]" : "bg-[#f5ead8]"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Выпадающая панель навигации с синхронной анимацией и единым размытием */}
                <div
                    id="mobile-nav-panel"
                    className={`md:hidden overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        menuOpen
                            ? "max-h-[85vh] opacity-100 pointer-events-auto"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                    style={{
                        transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
                        transitionProperty: "max-height, opacity, transform",
                    }}
                >
                    <div className="border-t border-[#c8853a22] px-6 pb-6 pt-3 flex flex-col gap-3.5">
                        {NAV_LINKS.map(({ label, href }, index) => (
                            <a
                                key={href}
                                href={href}
                                className={`text-lg py-1.5 transition-all duration-300 ease-out cursor-pointer hover:text-amber-400 ${
                                    menuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                                }`}
                                style={{
                                    color: "#d9c9b0",
                                    fontFamily: "var(--font-body)",
                                    transitionDelay: menuOpen ? `${40 + index * 25}ms` : "0ms",
                                }}
                                onClick={(e) => scrollToSection(e, href)}
                            >
                                {label}
                            </a>
                        ))}
                        <div
                            className={`pt-2 transition-all duration-300 ease-out ${
                                menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                            }`}
                            style={{
                                transitionDelay: menuOpen ? `${40 + NAV_LINKS.length * 25}ms` : "0ms",
                            }}
                        >
                            <button
                                onClick={() => { openBooking(); setMenuOpen(false); }}
                                className="booking-btn w-full px-5 py-3 rounded-full text-base tracking-wide font-bold cursor-pointer"
                                style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}
                            >
                                Забронировать
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Затемнение фона при открытом мобильном меню */}
            <div
                className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] md:hidden transition-opacity duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            {/* ── HERO ── */}
            <section className="relative min-h-screen min-h-[100dvh] flex items-start pt-[clamp(5rem,24vh,38vh)] md:pt-[42vh] lg:pt-[44vh] pb-16 md:pb-24">
                <div className="absolute inset-0 bg-stone-900 overflow-hidden">
                    <img
                        src={imgHero}
                        alt="Банкетный зал кафе «Белоснежка» — торжественное убранство"
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.4, filter: ENHANCE_WARM, objectPosition: "center 30%" }}
                    />
                </div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,18,8,0.72) 0%, rgba(26,18,8,0.55) 30%, rgba(26,18,8,0.35) 55%, rgba(26,18,8,0.7) 80%, #1a1208 100%)" }} />

                <div className="relative max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-2xl">
                        <p className="mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide uppercase" style={{ color: "#c8853a", letterSpacing: "0.14em" }}>
                            ✦ &nbsp; Октябрьский · Республика Башкортостан
                        </p>
                        <h1
                            className="mb-5 sm:mb-6 leading-[1.08]"
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.3rem, 6.2vw, 5.8rem)", color: "#f5ead8", fontStyle: "italic", fontWeight: 400, padding: 0 }}
                        >
                            Там, где вечер
                            <br /><span className="inline-block whitespace-nowrap" style={{ color: "#c8853a", whiteSpace: "nowrap" }}>длится&nbsp;дольше.</span>
                        </h1>
                        <p className="mb-6 sm:mb-8 text-lg sm:text-xl leading-relaxed max-w-lg" style={{ color: "#d9c9b0" }}>
                            Кафе с душой — разнообразная домашняя и банкетная кухня, блюда в мангале, живая музыка и тёплая атмосфера
                            в самом сердце Октябрьского с 2003 года.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                onClick={openBooking}
                                className="booking-btn px-8 py-3.5 rounded-full text-base tracking-wider uppercase font-bold cursor-pointer"
                                style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", letterSpacing: "0.1em", fontWeight: 700 }}
                            >
                                Забронировать
                            </button>
                            <a
                                href="#menu"
                                onClick={(e) => scrollToSection(e, "#menu")}
                                className="text-base underline underline-offset-4 transition-colors hover:text-amber-300 cursor-pointer"
                                style={{ color: "#d9c9b0", letterSpacing: "0.04em" }}
                            >
                                Смотреть меню →
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2" style={{ color: "#c8853a88" }} aria-hidden="true">
                    <span className="text-sm tracking-wider uppercase" style={{ writingMode: "vertical-rl" }}>прокрутите</span>
                    <div className="h-12 w-px" style={{ background: "linear-gradient(to bottom, #c8853a88, transparent)" }} />
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section id="about" className="scroll-mt-20 py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div>
                        <p className="mb-3 text-sm tracking-wide uppercase" style={{ color: "#c8853a", letterSpacing: "0.14em" }}>Наша история</p>
                        <h2 className="mb-6 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#f5ead8", fontStyle: "italic" }}>
                            Место, где всегда<br />рады гостям.
                        </h2>
                        <p className="mb-4 leading-relaxed text-base md:text-lg" style={{ color: "#d9c9b0" }}>
                            Кафе «Белоснежка» открылось в Октябрьском в 2003 году и стало
                            одним из самых любимых заведений города. За эти годы мы приняли
                            тысячи гостей — на семейных ужинах, банкетах, праздниках
                            и просто в будничный обеденный перерыв.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg" style={{ color: "#d9c9b0" }}>
                            Наша кухня — разнообразная и душевная, по-домашнему вкусная: сочный шашлык
                            в мангале, первые и вторые горячие блюда, салаты и банкетные деликатесы.
                            Вместительные залы до 150 и до 25 мест, живая музыка и танцпол
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
                            <p className="text-xs md:text-sm tracking-wider uppercase mb-0.5" style={{ letterSpacing: "0.14em", fontFamily: "var(--font-body)" }}>
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
            <section id="menu" className="scroll-mt-20 py-20 md:py-28" style={{ background: "#150e04" }}>
                <div className="max-w-7xl mx-auto px-6">
                    {/* Заголовок секции меню */}
                    <div className="mb-8">
                        <p className="mb-2 text-sm tracking-wide uppercase flex items-center gap-2" style={{ color: "#c8853a", letterSpacing: "0.14em" }}>
                            <span>✦</span>
                            <span>Гастрономия & Бар</span>
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.2vw, 4rem)", color: "#f5ead8", fontStyle: "italic" }}>
                                    Кухня и бар
                                </h2>
                                <p className="mt-2 text-base max-w-2xl leading-relaxed" style={{ color: "#d9c9b0" }}>
                                    Богатое меню на любой вкус: фирменные блюда в мангале, сытные горячие сковороды, деликатесные банкетные закуски, свежие салаты и авторский бар. Нажмите на любое блюдо в прейскуранте, чтобы открыть фото и состав.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Вкладки разделов меню в соответствии с дизайн-системой сайта */}
                    <div className="flex gap-2 flex-wrap mb-10">
                        {MENU_CATEGORIES_META.map((cat) => {
                            const isActive = (selectedTabId || activeMenuCategory) === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => handleMenuCategoryChange(cat.id)}
                                    className={`menu-subtab-btn px-6 py-2.5 text-sm sm:text-base ${isActive ? "is-active" : ""}`}
                                    style={{
                                        background: isActive ? "#c8853a" : "#231808",
                                        color: isActive ? "#1a1208" : "#d9c9b0",
                                        borderColor: isActive ? "#c8853a" : "rgba(200, 133, 58, 0.2)",
                                        boxShadow: isActive ? "0 4px 14px -2px rgba(200, 133, 58, 0.35)" : "none",
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
                            background: "#181005",
                        }}
                    >
                        {/* Фоновое фото — натуральное, без искусственного глобального затемнения */}
                        <img
                            src={currentCatMeta.heroImg}
                            alt={currentCatMeta.label}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none ${
                                mobileFadeState === "fading-out" ? "opacity-30 md:opacity-100" : "opacity-100"
                            }`}
                            style={{
                                filter: "contrast(1.05) saturate(1.1)",
                                transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms ease",
                            }}
                        />

                        {/* Составной градиент: глубокое нижнее затемнение + горизонтальный подстилающий градиент слева под типографику */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(14, 9, 3, 0.98) 0%, rgba(14, 9, 3, 0.88) 45%, rgba(14, 9, 3, 0.35) 75%, transparent 100%), linear-gradient(to right, rgba(14, 9, 3, 0.92) 0%, rgba(14, 9, 3, 0.65) 55%, transparent 100%)",
                            }}
                        />

                        {/* Контент карточки — безопасные отступы, никогда не вылезает за пределы */}
                        <div
                            className={`relative z-10 min-h-[330px] sm:min-h-[290px] p-5 sm:p-8 flex flex-col justify-between ${
                                mobileFadeState === "fading-out" ? "opacity-0 -translate-y-1 md:opacity-100 md:translate-y-0" : "opacity-100 translate-y-0"
                            }`}
                            style={{
                                transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1), transform 150ms cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            {/* Верхняя строка с бейджами — прижата к верхнему краю с внутренним отступом */}
                            <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {currentCatMeta.badge && (
                                        <span
                                            className="text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1 rounded-full backdrop-blur-md font-bold"
                                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}
                                        >
                                            {currentCatMeta.badge}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className="text-sm px-3 py-1 rounded-full font-mono shrink-0 backdrop-blur-md font-medium"
                                    style={{ background: "rgba(26,18,8,0.85)", color: "#e4a55a", border: "1px solid #c8853a33" }}
                                >
                                    {allCategoryDishes.length} поз.
                                </span>
                            </div>

                            {/* Нижняя часть: заголовок, описание и подсказка */}
                            <div className="mt-auto">
                                <h3
                                    className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-2"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "#f5ead8",
                                        fontStyle: "italic",
                                        textShadow: "0 2px 4px rgba(0,0,0,0.98), 0 4px 12px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.85)",
                                    }}
                                >
                                    {currentCatMeta.label}
                                </h3>
                                <p
                                    className="text-sm sm:text-base max-w-2xl leading-relaxed mb-3"
                                    style={{
                                        color: "#f0e4d0",
                                        textShadow: "0 1px 4px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)",
                                    }}
                                >
                                    {currentCatMeta.tagline}
                                </p>
                                <div
                                    className="inline-flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg backdrop-blur-md"
                                    style={{
                                        background: "rgba(26, 18, 8, 0.7)",
                                        border: "1px solid #c8853a44",
                                        color: "#e4a55a",
                                    }}
                                >
                                    <span className="text-amber-400 shrink-0">✦</span>
                                    <span className="leading-snug">
                                        {activeMenuCategory === "wishes"
                                            ? "Нажмите на любую позицию ниже для просмотра подробной информации"
                                            : "Нажмите на любую позицию ниже для просмотра фото и состава"}
                                    </span>
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

                        {/* Мобильный вид: строго упорядоченная последовательность с плавной анимацией */}
                        <div
                            ref={mobileMenuContainerRef}
                            className="md:hidden overflow-hidden"
                            style={{
                                height: mobileContainerHeight !== null ? `${mobileContainerHeight}px` : "auto",
                                transition: mobileContainerHeight !== null ? "height 300ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                                willChange: mobileContainerHeight !== null ? "height" : "auto",
                            }}
                        >
                            <div
                                ref={mobileMenuInnerRef}
                                className="flex flex-col gap-8"
                                style={{
                                    opacity: mobileFadeState === "fading-out" ? 0 : 1,
                                    transform: mobileFadeState === "fading-out" ? "translateY(-4px)" : "translateY(0)",
                                    transition: mobileFadeState === "fading-out"
                                        ? "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1), transform 150ms cubic-bezier(0.16, 1, 0.3, 1)"
                                        : "opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                            >
                                {[...currentCatalog.sections]
                                    .sort((a, b) => (a.orderMobile ?? 0) - (b.orderMobile ?? 0))
                                    .map(renderSectionBlock)}
                            </div>
                        </div>
                    </div>

                    {/* Блок правил комфортного отдыха в кафе «Белоснежка» — отображается постоянно */}
                    <div
                        className="mt-8 p-6 md:p-8 rounded-2xl border flex flex-col gap-4"
                        style={{ background: "rgba(200, 133, 58, 0.08)", borderColor: "#c8853a44" }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📋</span>
                            <h4 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}>
                                Правила комфортного отдыха в кафе «Белоснежка»
                            </h4>
                        </div>
                        <ul className="flex flex-col gap-2.5 text-sm md:text-base leading-relaxed pl-1" style={{ color: "#e4a55a" }}>
                            <li className="flex items-start gap-2.5">
                                <span className="shrink-0 mt-1 text-xs">✦</span>
                                <span>За внос и распитие принесенных с собой спиртных и безалкогольных напитков — <strong>штраф 1 000 руб.</strong></span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="shrink-0 mt-1 text-xs">✦</span>
                                <span>За утерю гардеробного номерка — <strong>штраф 250 руб.</strong></span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="shrink-0 mt-1 text-xs">✦</span>
                                <span>За оставленные вещи, в том числе документы и сотовые телефоны, администрация ответственности не несет.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Нижняя сервисная плашка с бронированием столика */}
                    <div
                        className="mt-10 p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                        style={{ background: "#231808", border: "1px solid #c8853a26" }}
                    >
                        <div>
                            <p className="text-base md:text-lg font-medium" style={{ fontFamily: "var(--font-body)", color: "#f5ead8" }}>
                                Желаете забронировать столик или согласовать праздничное банкетное меню?
                            </p>
                            <p className="mt-1 text-sm" style={{ color: "#b8a98e88" }}>
                                ✦ Все блюда готовятся свежими из отборных продуктов. Ждём вас ежедневно в кафе «Белоснежка»!
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center shrink-0">
                            <button
                                type="button"
                                onClick={openBooking}
                                className="booking-btn px-6 py-3.5 rounded-full text-sm sm:text-base tracking-wide uppercase font-bold cursor-pointer"
                                style={{
                                    background: "#c8853a",
                                    color: "#1a1208",
                                    fontFamily: "var(--font-body)",
                                    letterSpacing: "0.06em",
                                    fontWeight: 700,
                                }}
                            >
                                Забронировать столик
                            </button>
                            <a
                                href="tel:+79378435505"
                                className="px-5 py-3.5 rounded-full text-sm sm:text-base tracking-wide uppercase font-semibold transition-colors hover:bg-amber-500/10 border text-center"
                                style={{
                                    borderColor: "#c8853a44",
                                    color: "#f5ead8",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                +7 (937) 843-55-05
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BANQUET HALLS SECTION ── */}
            <section id="halls" className="scroll-mt-20 py-24 md:py-32" style={{ background: "#181005" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
                        <div>
                            <p className="mb-2 text-sm tracking-wide uppercase flex items-center gap-2" style={{ color: "#c8853a", letterSpacing: "0.14em" }}>
                                <span>✦</span>
                                <span>Пространства для ваших событий</span>
                            </p>
                            <h2 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.2vw, 4rem)", color: "#f5ead8", fontStyle: "italic" }}>
                                Банкетные залы
                            </h2>
                        </div>
                        <p className="text-base max-w-md leading-relaxed" style={{ color: "#b8a98e" }}>
                            Два зала для событий любого масштаба — от пышных свадеб и грандиозных юбилеев до камерных семейных праздников в узком кругу.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Большой зал */}
                        <div
                            className="rounded-2xl overflow-hidden flex flex-col justify-between border transition-all duration-300 hover:border-[#c8853a66] group"
                            style={{ background: "#211607", borderColor: "#c8853a26" }}
                        >
                            <HallPhotoSlider
                                photos={BIG_HALL_PHOTOS}
                                photoIndex={bigHallPhotoIndex}
                                setPhotoIndex={setBigHallPhotoIndex}
                                capacityBadge="до 150 человек"
                                typeBadge="Главный зал"
                                onOpenLightbox={(idx) => setLightbox({
                                    items: BIG_HALL_PHOTOS.map((p) => ({ kind: "image" as const, src: p.src, alt: p.alt })),
                                    index: idx,
                                })}
                            />

                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3
                                        className="text-3xl md:text-4xl font-semibold mb-3 leading-snug"
                                        style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}
                                    >
                                        Большой зал
                                    </h3>
                                    <p className="text-base leading-relaxed mb-6" style={{ color: "#d9c9b0" }}>
                                        Величественный зал с высокими сводчатыми потолками, колоннами и торжественным убранством. Оснащен сценой, большим танцполом, профессиональным световым и акустическим оборудованием. Идеально подходит для проведения свадеб, масштабных юбилеев, выпускных и новогодних корпоративов.
                                    </p>

                                    <div className="space-y-3 mb-8 text-sm md:text-base" style={{ color: "#c8853a" }}>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#e4a55a" }}>Вместимость: до 150 посадочных мест</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#d9c9b0" }}>Сцена, танцпол и профессиональный звук</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#d9c9b0" }}>Возможность индивидуальной рассадки гостей</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#d9c9b0" }}>Просторная зона для фотосессии и первого танца</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => openEventBooking("big")}
                                    className="booking-btn w-full py-3.5 px-6 rounded-xl text-sm sm:text-base uppercase tracking-wider font-bold cursor-pointer text-center"
                                    style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}
                                >
                                    Забронировать Большой зал
                                </button>
                            </div>
                        </div>

                        {/* Малый зал */}
                        <div
                            className="rounded-2xl overflow-hidden flex flex-col justify-between border transition-all duration-300 hover:border-[#c8853a66] group"
                            style={{ background: "#211607", borderColor: "#c8853a26" }}
                        >
                            <HallPhotoSlider
                                photos={SMALL_HALL_PHOTOS}
                                photoIndex={smallHallPhotoIndex}
                                setPhotoIndex={setSmallHallPhotoIndex}
                                capacityBadge="до 25 человек"
                                typeBadge="Камерный зал"
                                onOpenLightbox={(idx) => setLightbox({
                                    items: SMALL_HALL_PHOTOS.map((p) => ({ kind: "image" as const, src: p.src, alt: p.alt })),
                                    index: idx,
                                })}
                            />

                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3
                                        className="text-3xl md:text-4xl font-semibold mb-3 leading-snug"
                                        style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}
                                    >
                                        Малый зал
                                    </h3>
                                    <p className="text-base leading-relaxed mb-6" style={{ color: "#d9c9b0" }}>
                                        Уютное и уединенное пространство для душевных праздников в кругу самых близких. Прекрасно подходит для небольших дней рождения, семейных юбилеев, камерных корпоративов, деловых ужинов и поминальных трапез в спокойной приватной атмосфере без посторонних.
                                    </p>

                                    <div className="space-y-3 mb-8 text-sm md:text-base" style={{ color: "#c8853a" }}>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#e4a55a" }}>Вместимость: до 25 человек</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#d9c9b0" }}>Приватная и теплая камерная атмосфера</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#d9c9b0" }}>Персональный сервис и внимание к деталям</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span>✦</span>
                                            <span style={{ color: "#d9c9b0" }}>Индивидуальный расчет банкетного меню</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => openEventBooking("small")}
                                    className="booking-btn w-full py-3.5 px-6 rounded-xl text-sm sm:text-base uppercase tracking-wider font-bold cursor-pointer text-center"
                                    style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)", fontWeight: 700 }}
                                >
                                    Забронировать Малый зал
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROMOTIONS & EVENTS ── */}
            <section id="promotions" className="scroll-mt-20 py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
                        <div>
                            <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>
                                Специальные условия
                            </p>
                            <h2 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#f5ead8", fontStyle: "italic" }}>
                                Акции и праздники
                            </h2>
                        </div>
                        <p className="text-base max-w-md leading-relaxed" style={{ color: "#b8a98e" }}>
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
                                    className="px-6 py-2.5 rounded-full text-sm sm:text-base tracking-wide uppercase font-bold transition-[background-color,color,border-color,transform] active:scale-[0.96] cursor-pointer"
                                    style={{
                                        background: isActive ? "#c8853a" : "#231808",
                                        color: isActive ? "#1a1208" : "#d9c9b0",
                                        border: `1px solid ${isActive ? "#c8853a" : "#c8853a33"}`,
                                        fontFamily: "var(--font-body)",
                                        fontWeight: isActive ? 700 : 500,
                                        letterSpacing: "0.06em",
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
                                            className="px-3 py-1 rounded-full text-sm font-semibold tracking-wide"
                                            style={{ background: "#c8853a22", color: "#c8853a", border: "1px solid #c8853a44", fontFamily: "var(--font-body)" }}
                                        >
                                            {promo.tag}
                                        </span>
                                        <span
                                            className="px-3 py-1 rounded-full text-sm font-bold"
                                            style={{ background: "#c8853a", color: "#1a1208", fontFamily: "var(--font-body)" }}
                                        >
                                            {promo.badge}
                                        </span>
                                    </div>

                                    <h3
                                        className="text-2xl md:text-3xl mb-1.5 leading-snug"
                                        style={{ fontFamily: "var(--font-display)", color: "#f5ead8", fontStyle: "italic" }}
                                    >
                                        {promo.title}
                                    </h3>
                                    <p className="text-sm uppercase tracking-wider mb-4" style={{ color: "#c8853a", letterSpacing: "0.1em" }}>
                                        {promo.subtitle}
                                    </p>
                                    <p className="text-base leading-relaxed mb-6" style={{ color: "#b8a98e" }}>
                                        {promo.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t" style={{ borderColor: "#c8853a22" }}>
                                    <div className="flex items-start gap-2 mb-6">
                                        <span style={{ color: "#c8853a" }} className="text-base leading-none">✦</span>
                                        <p className="text-sm leading-relaxed" style={{ color: "#d9c9b0" }}>
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
                                        className="booking-btn w-full py-3.5 rounded-xl text-sm sm:text-base tracking-widest uppercase font-bold flex items-center justify-center gap-2 cursor-pointer"
                                        style={{
                                            background: "#c8853a",
                                            color: "#1a1208",
                                            fontFamily: "var(--font-body)",
                                            letterSpacing: "0.12em",
                                            fontWeight: 700,
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
                    <section id="gallery" className="scroll-mt-20 py-24 md:py-32" style={{ background: "#150e04" }}>
                        <div className="max-w-7xl mx-auto px-6">
                            <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Атмосфера</p>
                            <h2 className="mb-12 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#f5ead8", fontStyle: "italic" }}>
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
                                    <span className="absolute bottom-4 left-5 text-sm tracking-widest uppercase" style={{ color: "#c8853a88", letterSpacing: "0.18em", fontFamily: "var(--font-body)" }}>Вид снаружи · нажмите для просмотра</span>
                                </button>

                                <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-4" style={{ height: "clamp(420px, 60vw, 680px)" }}>
                                    {GALLERY_IMGS.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            aria-label={`Открыть: ${img.alt}`}
                                            onClick={() => setLightbox({ index: i + 1 })}
                                            className={`${img.span} rounded-xl overflow-hidden relative group text-left`}
                                            style={{ background: "#2c1f0e", cursor: "pointer", boxShadow: "none" }}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 outline outline-1 -outline-offset-1 outline-white/10"
                                                style={{ opacity: 0.9, filter: img.filter, objectPosition: img.pos }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4 pointer-events-none">
                                                <p className="text-sm sm:text-base font-semibold text-[#f5ead8]" style={{ fontFamily: "var(--font-display)" }}>
                                                    {img.title}
                                                </p>
                                                <p className="text-xs sm:text-sm text-[#c8853a]">
                                                    {img.subtitle}
                                                </p>
                                            </div>
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
                    items={lightbox.items || [
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
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h2 className="mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5.5vw, 4rem)", color: "#1a1208", fontStyle: "italic" }}>
                        Забронируйте стол.<br />Сделайте вечер особенным.
                    </h2>
                    <p className="mb-8 text-lg leading-relaxed mx-auto max-w-xl" style={{ color: "#2c1f0ecc" }}>
                        Мы проводим частные ужины, дни рождения, банкеты и поминальные обеды.
                        Зал вмещает до 150 гостей. Живая музыка и танцпол — по пятницам и субботам (в пятницу, субботу и праздничные дни вход — 250 ₽).
                    </p>
                    <button
                        onClick={openBooking}
                        className="booking-btn-dark px-10 py-4 rounded-full text-base tracking-widest uppercase font-bold cursor-pointer"
                        style={{ background: "#1a1208", color: "#c8853a", fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.14em" }}
                    >
                        Забронировать
                    </button>
                </div>
            </section>

            {/* ── CONTACTS ── */}
            <section id="contacts" className="scroll-mt-20 pt-24 md:pt-32 pb-0" style={{ background: "#150e04" }}>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Адрес</p>
                        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#d9c9b0" }}>
                            просп. Ленина, 57<br />
                            г. Октябрьский, Республика Башкортостан<br />
                            452614, Россия
                        </p>
                    </div>
                    <div>
                        <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Часы работы</p>
                        <div className="flex flex-col gap-1.5 text-base sm:text-lg" style={{ color: "#d9c9b0" }}>
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
                                            minWidth: "125px",
                                            fontVariantNumeric: "tabular-nums"
                                        }}
                                    >
                                        {time}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3.5 pt-3 border-t max-w-xs text-sm leading-relaxed" style={{ borderColor: "#c8853a22", color: "#e4a55a" }}>
                            <span className="font-semibold text-[#f5ead8]">✦ Мероприятия и шоу: </span>
                            в пятницу, субботу и праздничные дни вход — 250 ₽.
                        </div>
                    </div>
                    <div>
                        <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: "#c8853a", letterSpacing: "0.2em" }}>Связаться с нами</p>
                        <div className="flex flex-col gap-2.5 text-base sm:text-lg" style={{ color: "#d9c9b0" }}>
                            <a href="tel:+73476735505" className="hover:text-amber-300 transition-colors">+7 (34767) 3-55-05</a>
                            <a href="tel:+79378435505" className="hover:text-amber-300 transition-colors">+7 (937) 843-55-05</a>
                            <div className="flex gap-4 mt-3">
                                <a
                                    href="https://vk.ru/belka_kafe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm tracking-widest uppercase underline underline-offset-4 hover:text-amber-300 transition-colors"
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
                <div className="max-w-7xl mx-auto px-6">
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
                            <span className="text-sm tracking-wider uppercase font-medium" style={{ color: "#f5ead8", fontFamily: "var(--font-body)" }}>
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
                <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <span className="text-xl" style={{ fontFamily: "var(--font-display)", color: "#c8853a", fontStyle: "italic" }}>Белоснежка</span>
                        <p className="text-sm text-center" style={{ color: "#d9c9b055" }}>
                            © {new Date().getFullYear()} Кафе «Белоснежка» · г. Октябрьский, Республика Башкортостан
                        </p>
                        <button
                            onClick={openBooking}
                            className="booking-btn-text text-sm tracking-widest uppercase underline underline-offset-4 cursor-pointer"
                            style={{ color: "#c8853a", letterSpacing: "0.12em" }}
                        >
                            Забронировать
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-2 border-t" style={{ borderColor: "#c8853a11" }}>
                        <p className="text-sm text-center" style={{ color: "#d9c9b044" }}>
                            ООО «ЭМИ» · ИНН&nbsp;0265028241 · ОГРН&nbsp;1060265016349 · 452616, г. Октябрьский, просп. Ленина, д.&nbsp;57
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <p className="text-sm text-center" style={{ color: "#d9c9b033" }}>
                                Сайт обрабатывает персональные данные в соответствии с&nbsp;ФЗ&nbsp;№&nbsp;152-ФЗ.
                                Использование сайта означает согласие с&nbsp;использованием файлов cookie (ФЗ&nbsp;№&nbsp;149-ФЗ).
                            </p>
                            <button
                                onClick={() => setPrivacyOpen(true)}
                                className="text-sm tracking-wide underline underline-offset-2 hover:text-amber-300 transition-colors shrink-0"
                                style={{ color: "#c8853a66", letterSpacing: "0.04em" }}
                            >
                                Политика конфиденциальности
                            </button>
                        </div>
                    </div>

                    <p className="text-center pt-3" style={{ fontSize: "14px", color: "#d9c9b055", letterSpacing: "0.02em" }}>
                        Дизайн и разработка сайта —{" "}
                        <a
                            href="https://vk.ru/atomadesign"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-amber-300 font-medium"
                            style={{ color: "#c8853a88" }}
                        >
                            студия ATOMA
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
                    onChooseEvent={(hall: "big" | "small") => {
                        setSelectedBookingHall(hall);
                        setBookingStep("event");
                    }}
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
                    initialHall={selectedBookingHall}
                />
            )}
            {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
            {!cookieOk && <CookieBanner onAccept={acceptCookie} onShowPrivacy={() => setPrivacyOpen(true)} />}
        </div>
    );
}