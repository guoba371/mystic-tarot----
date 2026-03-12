export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  value: string;
  meaningUpright: string;
  meaningReversed: string;
  description: string;
  image: string;
}

export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardsCount: number;
  positions: {
    name: string;
    description: string;
    x: number; // percentage from left
    y: number; // percentage from top
  }[];
}

export const TAROT_CARDS: TarotCard[] = [
  // Major Arcana
  {
    id: '0',
    name: '愚者',
    nameEn: 'The Fool',
    arcana: 'Major',
    value: '0',
    meaningUpright: '开始、自由、纯真、冒险',
    meaningReversed: '鲁莽、疏忽、犹豫、愚蠢',
    description: '愚者代表着新的开始，充满好奇心和勇气，但也可能暗示缺乏经验。',
    image: 'https://picsum.photos/seed/tarot-fool/400/600'
  },
  {
    id: '1',
    name: '魔术师',
    nameEn: 'The Magician',
    arcana: 'Major',
    value: '1',
    meaningUpright: '创造力、行动、意志力、潜能',
    meaningReversed: '操纵、计划不周、未开发的才能',
    description: '魔术师拥有将想法转化为现实的能力，象征着意志与行动的统一。',
    image: 'https://picsum.photos/seed/tarot-magician/400/600'
  },
  {
    id: '2',
    name: '女祭司',
    nameEn: 'The High Priestess',
    arcana: 'Major',
    value: '2',
    meaningUpright: '直觉、潜意识、神秘、智慧',
    meaningReversed: '秘密揭开、忽视直觉、肤浅',
    description: '女祭司代表着内在的智慧和直觉，是连接现实与神秘世界的桥梁。',
    image: 'https://picsum.photos/seed/tarot-priestess/400/600'
  },
  {
    id: '3',
    name: '皇后',
    nameEn: 'The Empress',
    arcana: 'Major',
    value: '3',
    meaningUpright: '丰饶、母性、自然、感官',
    meaningReversed: '创造力受阻、过度依赖、贫瘠',
    description: '皇后象征着大地的母亲，代表着生命力、创造力和物质的丰盈。',
    image: 'https://picsum.photos/seed/tarot-empress/400/600'
  },
  {
    id: '4',
    name: '皇帝',
    nameEn: 'The Emperor',
    arcana: 'Major',
    value: '4',
    meaningUpright: '权威、结构、稳定、领导力',
    meaningReversed: '专制、缺乏纪律、僵化',
    description: '皇帝代表着秩序和法律，是父亲的形象，象征着理性和控制。',
    image: 'https://picsum.photos/seed/tarot-emperor/400/600'
  },
  {
    id: '5',
    name: '教皇',
    nameEn: 'The Hierophant',
    arcana: 'Major',
    value: '5',
    meaningUpright: '传统、信仰、体制、教导',
    meaningReversed: '叛逆、打破常规、新观念',
    description: '教皇代表着传统的价值观和信仰体系，是精神导师的象征。',
    image: 'https://picsum.photos/seed/tarot-hierophant/400/600'
  },
  {
    id: '6',
    name: '恋人',
    nameEn: 'The Lovers',
    arcana: 'Major',
    value: '6',
    meaningUpright: '爱、和谐、关系、选择',
    meaningReversed: '失衡、不和、逃避责任',
    description: '恋人不仅代表爱情，更代表着生命中的重大选择和价值观的对齐。',
    image: 'https://picsum.photos/seed/tarot-lovers/400/600'
  },
  {
    id: '7',
    name: '战车',
    nameEn: 'The Chariot',
    arcana: 'Major',
    value: '7',
    meaningUpright: '胜利、意志、控制、成功',
    meaningReversed: '失控、方向不明、侵略性',
    description: '战车象征着通过坚强的意志力克服困难，最终获得胜利。',
    image: 'https://picsum.photos/seed/tarot-chariot/400/600'
  },
  {
    id: '8',
    name: '力量',
    nameEn: 'Strength',
    arcana: 'Major',
    value: '8',
    meaningUpright: '勇气、耐心、内在力量、温柔',
    meaningReversed: '自我怀疑、软弱、缺乏自律',
    description: '力量牌强调的是内在的柔性力量，而非单纯的体力或暴力。',
    image: 'https://picsum.photos/seed/tarot-strength/400/600'
  },
  {
    id: '9',
    name: '隐士',
    nameEn: 'The Hermit',
    arcana: 'Major',
    value: '9',
    meaningUpright: '内省、孤独、寻求真理、指引',
    meaningReversed: '孤立、偏执、退缩',
    description: '隐士代表着向内探索，通过孤独和沉思来寻找智慧之光。',
    image: 'https://picsum.photos/seed/tarot-hermit/400/600'
  },
  {
    id: '10',
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    arcana: 'Major',
    value: '10',
    meaningUpright: '好运、转机、周期、命运',
    meaningReversed: '坏运气、阻碍、无法控制的变化',
    description: '命运之轮提醒我们生命是不断循环的，变化是唯一的永恒。',
    image: 'https://picsum.photos/seed/tarot-wheel/400/600'
  }
];

export const TAROT_SPREADS: TarotSpread[] = [
  {
    id: 'single',
    name: '单牌占卜',
    description: '最简单的占卜方式，适用于快速获取建议或每日运势。',
    cardsCount: 1,
    positions: [
      { name: '核心建议', description: '针对你所提问题的核心启示或行动建议。', x: 50, y: 50 }
    ]
  },
  {
    id: 'three-card',
    name: '圣三角牌阵',
    description: '经典的牌阵，用于分析问题的过去、现在和未来。',
    cardsCount: 3,
    positions: [
      { name: '过去', description: '导致现状的原因或背景。', x: 20, y: 50 },
      { name: '现在', description: '你目前所处的真实状态。', x: 50, y: 50 },
      { name: '未来', description: '事情可能的发展方向。', x: 80, y: 50 }
    ]
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字',
    description: '最全面、最深入的牌阵，适用于复杂问题的深度剖析。',
    cardsCount: 10,
    positions: [
      { name: '现状', description: '问题的核心。', x: 35, y: 50 },
      { name: '挑战', description: '横在面前的阻碍。', x: 35, y: 50 }, // Overlapping or crossed
      { name: '潜意识', description: '根源与基础。', x: 35, y: 80 },
      { name: '过去', description: '正在离去的影响。', x: 15, y: 50 },
      { name: '目标', description: '意识层面的想法。', x: 35, y: 20 },
      { name: '未来', description: '即将到来的影响。', x: 55, y: 50 },
      { name: '自我', description: '你的态度与立场。', x: 85, y: 80 },
      { name: '环境', description: '他人的看法与外部影响。', x: 85, y: 60 },
      { name: '希望/恐惧', description: '内在的期待或担忧。', x: 85, y: 40 },
      { name: '最终结果', description: '长期的发展趋势。', x: 85, y: 20 }
    ]
  }
];
