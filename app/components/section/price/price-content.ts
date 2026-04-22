import type { PriceItemRow } from './item.vue';

export type PriceSectionItem = {
  title: string
  subtitle: string
  rows: PriceItemRow[]
  priceLabel: string
};

export const priceSectionHeaderTitleSegments = [
  { text: 'Наши ' },
  { text: 'тарифы и цены ', highlight: true },
  { text: 'на услуги' },
];

export const priceSectionItems: PriceSectionItem[] = [
  {
    title: 'Инвест',
    subtitle: 'Практичный пакет',
    rows: [
      { term: 'Полы:', definition: 'ламинат + керамика в ванной' },
      { term: 'Стены:', definition: 'декоративное покрытие' },
      { term: 'Санузел:', definition: 'базовая комплектация' },
      { term: 'Потолки:', definition: 'натяжные и свет' },
    ],
    priceLabel: '27 500 руб/м²',
  },
  {
    title: 'Мой дом',
    subtitle: 'Комфортный формат',
    rows: [
      { term: 'Полы:', definition: 'ламинат + керамика в ванной и лоджии' },
      { term: 'Стены:', definition: 'флизелиновые обои + акцентные стены' },
      { term: 'Санузел:', definition: 'ванна или душевая на выбор' },
      { term: 'Потолки:', definition: 'натяжные, скрытые карнизы и свет' },
    ],
    priceLabel: '33 000 руб/м²',
  },
  {
    title: 'Комфорт',
    subtitle: 'Функциональность и качество',
    rows: [
      { term: 'Полы:', definition: 'ламинат + теплый пол в ванной  и лоджии' },
      { term: 'Стены:', definition: 'обои под покраску + декоративные акценты' },
      { term: 'Санузел:', definition: 'гигиенический душ и расширенная комплектация' },
      { term: 'Потолки:', definition: 'натяжные, скрытые карнизы и свет' },
    ],
    priceLabel: '52 000 руб/м²',
  },
  {
    title: 'Прайм',
    subtitle: 'Премиальный уровень ',
    rows: [
      { term: 'Полы:', definition: 'кварцвинил + теплый пол везде' },
      { term: 'Стены:', definition: 'Q3 под покраску + акцентные стены' },
      { term: 'Санузел:', definition: 'керамогранит 1200×600 и подвесная мебель' },
      { term: 'Потолки:', definition: 'натяжные, теневой профиль и скрытый монтаж' },
    ],
    priceLabel: '60 000 руб/м²',
  },
];
