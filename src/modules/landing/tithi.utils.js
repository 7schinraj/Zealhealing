// ─── Tithi Calculation Utility ───────────────────────────────────────────────
// Uses simplified astronomical algorithm (Julian Day + approximate lunar elongation)
// Accuracy: ±1 tithi (sufficient for spiritual guidance context)

/**
 * Convert a Gregorian date to Julian Day Number
 */
function toJulianDay(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/**
 * Compute approximate Sun longitude (degrees) for a Julian Day
 */
function sunLongitude(jd) {
  const n = jd - 2451545.0; // days since J2000
  const L = (280.46 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * (Math.PI / 180);
  const lambda = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g);
  return ((lambda % 360) + 360) % 360;
}

/**
 * Compute approximate Moon longitude (degrees) for a Julian Day
 */
function moonLongitude(jd) {
  const n = jd - 2451545.0;
  const L = (218.316 + 13.176396 * n) % 360;
  const M = ((134.963 + 13.064993 * n) % 360) * (Math.PI / 180);
  const F = ((93.272 + 13.229350 * n) % 360) * (Math.PI / 180);
  const lambda =
    L +
    6.289 * Math.sin(M) -
    1.274 * Math.sin(2 * F - M) +
    0.658 * Math.sin(2 * F) -
    0.186 * Math.sin(M) * 0.5;
  return ((lambda % 360) + 360) % 360;
}

// ─── 30 Tithis Lookup Table ──────────────────────────────────────────────────
const TITHIS = [
  // Shukla Paksha (Bright Fortnight) — index 0–14
  {
    index: 0,
    name: 'Pratipada',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Agni (Fire God)',
    symbol: '🔥',
    luckyColor: '#FF6B35',
    luckyColorName: 'Saffron Orange',
    mantra: 'Om Agnaye Namaha',
    moonPhase: '🌒',
    significance:
      'The first day of the bright fortnight — a powerful day for new beginnings, starting ventures, and fresh intentions.',
    insight:
      'This tithi blesses you with the courage to begin. Like the first flicker of flame, your new starts today carry divine protection. Set your intentions clearly, speak them aloud, and trust the universe to kindle them into reality.',
    qualities: ['New Beginnings', 'Courage', 'Initiative'],
  },
  {
    index: 1,
    name: 'Dvitiya',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Brahma (Creator)',
    symbol: '🌱',
    luckyColor: '#4CAF50',
    luckyColorName: 'Vibrant Green',
    mantra: 'Om Brahmane Namaha',
    moonPhase: '🌒',
    significance:
      'Day of creation and nurturing. Excellent for planning, artistic work, and laying foundations.',
    insight:
      'Brahma\'s creative energy flows through you today. What you build now carries the seed of lasting success. Focus on nurturing your ideas with care and methodical thought.',
    qualities: ['Creativity', 'Planning', 'Foundation'],
  },
  {
    index: 2,
    name: 'Tritiya',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Gauri (Parvati)',
    symbol: '🌸',
    luckyColor: '#E91E63',
    luckyColorName: 'Rose Pink',
    mantra: 'Om Gauriye Namaha',
    moonPhase: '🌒',
    significance:
      'Blessed by Goddess Gauri — auspicious for beauty, relationships, and feminine energy.',
    insight:
      'Gauri\'s grace surrounds you. Today is ideal for beautifying your life, deepening relationships, and expressing your authentic self. Trust your feminine intuition.',
    qualities: ['Beauty', 'Grace', 'Relationships'],
  },
  {
    index: 3,
    name: 'Chaturthi',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Ganesha (Remover of Obstacles)',
    symbol: '🐘',
    luckyColor: '#FF9800',
    luckyColorName: 'Marigold Orange',
    mantra: 'Om Gam Ganapataye Namaha',
    moonPhase: '🌓',
    significance:
      'Vinayaka Chaturthi energy — powerful for removing obstacles and seeking divine blessings before challenges.',
    insight:
      'Ganesha clears your path today. If you have been stuck or facing blocks, this tithi provides the breakthrough energy you need. Offer your obstacles to the divine and move forward fearlessly.',
    qualities: ['Obstacle Removal', 'Wisdom', 'Success'],
  },
  {
    index: 4,
    name: 'Panchami',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Saraswati (Goddess of Knowledge)',
    symbol: '📚',
    luckyColor: '#FFEB3B',
    luckyColorName: 'Golden Yellow',
    mantra: 'Om Aim Saraswatyai Namaha',
    moonPhase: '🌓',
    significance:
      'Saraswati Panchami energy — supremely auspicious for learning, education, music, and arts.',
    insight:
      'The Goddess of wisdom shines through you today. Your mind is sharp, receptive, and creative. Begin a new course of study, pick up an instrument, or write that piece you have been postponing.',
    qualities: ['Knowledge', 'Creativity', 'Eloquence'],
  },
  {
    index: 5,
    name: 'Shashthi',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Kartikeya (God of War & Victory)',
    symbol: '⚡',
    luckyColor: '#F44336',
    luckyColorName: 'Victory Red',
    mantra: 'Om Saravanabhavaya Namaha',
    moonPhase: '🌓',
    significance:
      'Day of strength and victory. Blessed for competitions, leadership, and overcoming enemies (internal or external).',
    insight:
      'Kartikeya\'s warrior energy fuels you. Face your challenges head-on today — this is not a day to retreat. Your determination will be rewarded with victory in both material and spiritual battles.',
    qualities: ['Strength', 'Victory', 'Leadership'],
  },
  {
    index: 6,
    name: 'Saptami',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Surya (Sun God)',
    symbol: '☀️',
    luckyColor: '#FF5722',
    luckyColorName: 'Solar Orange',
    mantra: 'Om Suryaya Namaha',
    moonPhase: '🌔',
    significance:
      'Ruled by the Sun — excellent for health, vitality, authority, and father figures.',
    insight:
      'Solar energy radiates from your core today. Step into your authority, take charge of your health, and let your light shine without apology. Others are drawn to your warmth and clarity.',
    qualities: ['Vitality', 'Authority', 'Health'],
  },
  {
    index: 7,
    name: 'Ashtami',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Shiva (Lord of Transformation)',
    symbol: '🔱',
    luckyColor: '#607D8B',
    luckyColorName: 'Ash Blue',
    mantra: 'Om Namah Shivaya',
    moonPhase: '🌔',
    significance:
      'Shiva\'s transformative energy — powerful for spiritual practice, meditation, and letting go.',
    insight:
      'Shiva destroys what no longer serves you. If you feel endings or transitions, embrace them as divine transformation. Meditate today — the silence will speak volumes to your soul.',
    qualities: ['Transformation', 'Meditation', 'Release'],
  },
  {
    index: 8,
    name: 'Navami',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Durga (Mother Goddess)',
    symbol: '🦁',
    luckyColor: '#9C27B0',
    luckyColorName: 'Royal Purple',
    mantra: 'Om Dum Durgaye Namaha',
    moonPhase: '🌔',
    significance:
      'Durga Navami — supreme power day for courage, divine feminine strength, and protection.',
    insight:
      'The Goddess of supreme power activates your inner warrior. You are protected, guided, and unstoppable today. Trust your strength — it is divine in origin.',
    qualities: ['Power', 'Protection', 'Courage'],
  },
  {
    index: 9,
    name: 'Dashami',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Yama (God of Dharma)',
    symbol: '⚖️',
    luckyColor: '#795548',
    luckyColorName: 'Earth Brown',
    mantra: 'Om Yamaya Namaha',
    moonPhase: '🌔',
    significance:
      'Day of dharma and righteous action. Ideal for legal matters, justice, and fulfilling duties.',
    insight:
      'Walk your dharmic path with integrity today. Decisions made with righteousness carry long-lasting positive karma. Trust that the universe rewards those who act from truth.',
    qualities: ['Justice', 'Dharma', 'Integrity'],
  },
  {
    index: 10,
    name: 'Ekadashi',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Vishnu (Preserver)',
    symbol: '🌊',
    luckyColor: '#1976D2',
    luckyColorName: 'Cosmic Blue',
    mantra: 'Om Namo Narayanaya',
    moonPhase: '🌕',
    significance:
      'The most sacred tithi — Ekadashi fasting and prayer brings immense spiritual merit and divine grace.',
    insight:
      'Vishnu\'s preserving grace is at its peak. If you fast, even partially, today\'s spiritual merit is multiplied tenfold. Rest, reflect, read sacred texts, and let your soul breathe in divine nourishment.',
    qualities: ['Devotion', 'Spiritual Merit', 'Grace'],
  },
  {
    index: 11,
    name: 'Dvadashi',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Vishnu (Preserver)',
    symbol: '🪷',
    luckyColor: '#4DB6AC',
    luckyColorName: 'Lotus Teal',
    mantra: 'Om Vishnave Namaha',
    moonPhase: '🌕',
    significance:
      'Breaking the Ekadashi fast with gratitude — day of receiving divine blessings in all endeavors.',
    insight:
      'After deep spiritual cleansing comes the harvest of blessings. What you receive today is the fruit of your devotion. Share generously — abundance multiplies through giving.',
    qualities: ['Abundance', 'Gratitude', 'Generosity'],
  },
  {
    index: 12,
    name: 'Trayodashi',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Kamadeva (Love & Desire)',
    symbol: '💘',
    luckyColor: '#E91E63',
    luckyColorName: 'Passion Pink',
    mantra: 'Om Kamadevaaya Namaha',
    moonPhase: '🌕',
    significance:
      'Pradosh tithi — extremely auspicious for Shiva worship and fulfillment of desires.',
    insight:
      'Your heart\'s deepest desires are drawn toward you. Speak your wishes to the universe today with full feeling and conviction. Love, beauty, and joy are magnetized to you.',
    qualities: ['Love', 'Fulfillment', 'Attraction'],
  },
  {
    index: 13,
    name: 'Chaturdashi',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Shiva (Destroyer of Ego)',
    symbol: '🌙',
    luckyColor: '#37474F',
    luckyColorName: 'Midnight Slate',
    mantra: 'Om Namah Shivaya',
    moonPhase: '🌖',
    significance:
      'Maha Shivaratri energy — potent for deep spiritual work, tantra, and transcending limitations.',
    insight:
      'The veil between worlds grows thin today. Your spiritual perception is heightened. Do not ignore signs, dreams, or gut feelings — they carry divine messages just for you.',
    qualities: ['Intuition', 'Transcendence', 'Mystery'],
  },
  {
    index: 14,
    name: 'Purnima',
    paksha: 'Shukla',
    pakshaMeaning: 'Bright Fortnight',
    deity: 'Chandra (Moon God)',
    symbol: '🌕',
    luckyColor: '#FAFAFA',
    luckyColorName: 'Moonlight Silver',
    mantra: 'Om Chandraya Namaha',
    moonPhase: '🌕',
    significance:
      'Full Moon — the most luminous tithi. Peak energy for gratitude, completions, and emotional healing.',
    insight:
      'You stand at the fullness of a cosmic cycle. Release what has been heavy in your heart under the full moon\'s healing light. Gratitude spoken tonight echoes through the stars and returns tenfold.',
    qualities: ['Fullness', 'Gratitude', 'Completion'],
  },
  // Krishna Paksha (Dark Fortnight) — index 15–29
  {
    index: 15,
    name: 'Pratipada',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Agni (Fire God)',
    symbol: '🔥',
    luckyColor: '#BF360C',
    luckyColorName: 'Deep Ember',
    mantra: 'Om Agnaye Namaha',
    moonPhase: '🌖',
    significance:
      'First day of the waning moon — reflect on what to release and what to purify within.',
    insight:
      'The fire of Agni now burns for purification rather than ignition. Audit your life — what drains your energy? What habits no longer serve? Begin releasing with gratitude.',
    qualities: ['Purification', 'Reflection', 'Release'],
  },
  {
    index: 16,
    name: 'Dvitiya',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Brahma (Creator)',
    symbol: '🌱',
    luckyColor: '#33691E',
    luckyColorName: 'Forest Green',
    mantra: 'Om Brahmane Namaha',
    moonPhase: '🌖',
    significance:
      'Time for deep introspection, re-evaluating plans, and consolidating what you have built.',
    insight:
      'Creation now turns inward. Review the foundations you have built and strengthen what needs reinforcement. Quiet inner work now yields visible outer results soon.',
    qualities: ['Review', 'Consolidation', 'Depth'],
  },
  {
    index: 17,
    name: 'Tritiya',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Gauri (Parvati)',
    symbol: '🌸',
    luckyColor: '#AD1457',
    luckyColorName: 'Deep Rose',
    mantra: 'Om Gauriye Namaha',
    moonPhase: '🌗',
    significance:
      'Surrender ego-driven desires. Turn toward spiritual love and devotional practices.',
    insight:
      'In the waning light, Gauri calls you toward simplicity. Strip away vanity and comparison — your beauty lies in your authenticity. Love yourself without conditions today.',
    qualities: ['Simplicity', 'Authenticity', 'Inner Beauty'],
  },
  {
    index: 18,
    name: 'Chaturthi',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Ganesha (Remover of Obstacles)',
    symbol: '🐘',
    luckyColor: '#E65100',
    luckyColorName: 'Burnt Orange',
    mantra: 'Om Gam Ganapataye Namaha',
    moonPhase: '🌗',
    significance:
      'Sankashti Chaturthi — fasting for Ganesha yields powerful blessings and obstacle removal.',
    insight:
      'Hidden obstacles are being cleared from your path even now. Trust the divine intelligence working behind the scenes. What seems like delay is often divine redirection.',
    qualities: ['Hidden Blessings', 'Patience', 'Trust'],
  },
  {
    index: 19,
    name: 'Panchami',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Naga Devatas (Serpent Deities)',
    symbol: '🐍',
    luckyColor: '#1B5E20',
    luckyColorName: 'Deep Emerald',
    mantra: 'Om Namo Bhagavate Vasudeva',
    moonPhase: '🌗',
    significance:
      'Naga Panchami energy — potent for ancestral healing, Kundalini awakening, and hidden knowledge.',
    insight:
      'The serpent energy of wisdom stirs within you. Pay attention to dreams and synchronicities — ancestral wisdom is trying to reach you through the ethers. Honor your lineage.',
    qualities: ['Ancestral Healing', 'Kundalini', 'Hidden Wisdom'],
  },
  {
    index: 20,
    name: 'Shashthi',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Kartikeya (God of War & Victory)',
    symbol: '⚡',
    luckyColor: '#B71C1C',
    luckyColorName: 'Deep Red',
    mantra: 'Om Saravanabhavaya Namaha',
    moonPhase: '🌗',
    significance:
      'Inner battles come to the fore. Face fears and shadow aspects with courage.',
    insight:
      'The warrior now turns inward. What inner demon keeps you small? Today\'s energy supports radical honesty and the courage to face your shadows — that is where your gold is hidden.',
    qualities: ['Shadow Work', 'Inner Courage', 'Transformation'],
  },
  {
    index: 21,
    name: 'Saptami',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Surya (Sun God)',
    symbol: '☀️',
    luckyColor: '#FF8F00',
    luckyColorName: 'Amber Gold',
    mantra: 'Om Suryaya Namaha',
    moonPhase: '🌘',
    significance:
      'Recalibrate your energy and restore vitality through rest and solar practices.',
    insight:
      'Even the sun sets to rise again. Rest is not weakness — it is wisdom. Honor your body with nourishment, sleep, and gentle movement. Energy restored now powers future triumphs.',
    qualities: ['Rest', 'Restoration', 'Wisdom'],
  },
  {
    index: 22,
    name: 'Ashtami',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Shiva (Lord of Transformation)',
    symbol: '🔱',
    luckyColor: '#4527A0',
    luckyColorName: 'Deep Violet',
    mantra: 'Om Namah Shivaya',
    moonPhase: '🌘',
    significance:
      'Kalashtami \u2014 Shiva\'s fierce Bhairava aspect. Powerful for spiritual protection and removing fear.',
    insight:
      'Bhairava walks with you today — fierce protector, destroyer of all that harms you. Call upon this energy when fear grips you. You are more protected than you know.',
    qualities: ['Protection', 'Fearlessness', 'Divine Shield'],
  },
  {
    index: 23,
    name: 'Navami',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Durga (Mother Goddess)',
    symbol: '🦁',
    luckyColor: '#6A1B9A',
    luckyColorName: 'Deep Purple',
    mantra: 'Om Dum Durgaye Namaha',
    moonPhase: '🌘',
    significance:
      'Deep spiritual strength available. Ideal for fasting, prayer, and invoking divine protection.',
    insight:
      'In the deep dark, the Goddess is closest. When life feels heavy, remember — this is not abandonment, this is initiation. You are being prepared for the next level of your power.',
    qualities: ['Initiation', 'Deep Strength', 'Faith'],
  },
  {
    index: 24,
    name: 'Dashami',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Yama (God of Dharma)',
    symbol: '⚖️',
    luckyColor: '#4E342E',
    luckyColorName: 'Deep Earth',
    mantra: 'Om Yamaya Namaha',
    moonPhase: '🌘',
    significance:
      'Karmic debts and past actions come for resolution. Act with integrity in all dealings.',
    insight:
      'The scales of karma are balancing. If you have wronged anyone — consciously or not — this is the moment to make amends. Dharmic correction now prevents future suffering.',
    qualities: ['Karma', 'Resolution', 'Integrity'],
  },
  {
    index: 25,
    name: 'Ekadashi',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Vishnu (Preserver)',
    symbol: '🌊',
    luckyColor: '#0D47A1',
    luckyColorName: 'Deep Ocean Blue',
    mantra: 'Om Namo Narayanaya',
    moonPhase: '🌑',
    significance:
      'Krishna Paksha Ekadashi — fasting and silence brings deep inner cleansing and Vishnu\'s grace.',
    insight:
      'In the quiet darkness before the new moon, Vishnu preserves what is truly yours. Let go of what you\'ve been clinging to — the universe will return what belongs to you, purified.',
    qualities: ['Surrender', 'Deep Cleansing', 'Preservation'],
  },
  {
    index: 26,
    name: 'Dvadashi',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Vishnu (Preserver)',
    symbol: '🪷',
    luckyColor: '#00695C',
    luckyColorName: 'Deep Teal',
    mantra: 'Om Vishnave Namaha',
    moonPhase: '🌑',
    significance:
      'Day for offering charity and seva — service to others multiplies blessings tremendously.',
    insight:
      'Service is the highest form of worship today. Give your time, your kindness, your resources — even a small act of genuine generosity creates a ripple of divine grace in your life.',
    qualities: ['Service', 'Charity', 'Humility'],
  },
  {
    index: 27,
    name: 'Trayodashi',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Kamadeva (Love & Desire)',
    symbol: '💘',
    luckyColor: '#880E4F',
    luckyColorName: 'Deep Magenta',
    mantra: 'Om Kamadevaaya Namaha',
    moonPhase: '🌑',
    significance:
      'Examine your desires — distinguish pure from ego-driven. Purify your intentions.',
    insight:
      'Not all desires lead to fulfillment. Today asks you to distinguish soul-desires from ego-cravings. When you align your wants with your dharma, the universe rushes to meet you.',
    qualities: ['Purified Desire', 'Alignment', 'Clarity'],
  },
  {
    index: 28,
    name: 'Chaturdashi',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Shiva (Destroyer of Ego)',
    symbol: '🌙',
    luckyColor: '#212121',
    luckyColorName: 'Cosmic Black',
    mantra: 'Om Namah Shivaya',
    moonPhase: '🌑',
    significance:
      'Masik Shivaratri — extraordinary night for deep meditation, tantra, and ego dissolution.',
    insight:
      'The darkest night before the new moon is Shiva\'s sacred hour. Sit in meditation, even briefly. In the silence of self, you will hear the cosmic intelligence that has been guiding you all along.',
    qualities: ['Ego Dissolution', 'Deep Meditation', 'Cosmic Union'],
  },
  {
    index: 29,
    name: 'Amavasya',
    paksha: 'Krishna',
    pakshaMeaning: 'Dark Fortnight',
    deity: 'Pitru Devatas (Ancestral Spirits)',
    symbol: '🌑',
    luckyColor: '#455A64',
    luckyColorName: 'Mystic Grey',
    mantra: 'Om Pitru Devaya Namaha',
    moonPhase: '🌑',
    significance:
      'New Moon — honor ancestors, release the old cycle, and plant seeds for the next. Incredibly potent for manifestation rituals.',
    insight:
      'The void holds infinite potential. Amavasya is the cosmic reset — what you release now will not return, and what you seed in this sacred darkness will bloom with extraordinary power in the cycle ahead.',
    qualities: ['Ancestral Honor', 'Release', 'New Cycle'],
  },
];

// ─── Main Compute Function ───────────────────────────────────────────────────

/**
 * Compute Tithi for a given date string (YYYY-MM-DD)
 * @param {string} dateStr
 * @returns {object} tithi data
 */
export function computeTithi(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const jd = toJulianDay(year, month, day);
  const sunLon = sunLongitude(jd);
  const moonLon = moonLongitude(jd);
  let elongation = moonLon - sunLon;
  if (elongation < 0) elongation += 360;
  const tithiIndex = Math.floor(elongation / 12) % 30;
  return TITHIS[tithiIndex];
}

/**
 * Get a human-readable date label
 * @param {string} dateStr
 */
export function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
