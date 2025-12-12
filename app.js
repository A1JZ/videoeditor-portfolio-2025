'use strict';

//Toggle Function

const elemToggleFunc = function(elem) { elem.classList.toggle('active'); }

// Header Sticky & Go-Top

const header = document.querySelector('[data-header]');
const goTopBtn = document.querySelector('[data-go-top]');
window.addEventListener('scroll', function(){ if(window.scrollY >= 10) { header.classList.add('active'); goTopBtn.classList.add('active'); }
                                                                else { header.classList.remove('active'); goTopBtn.classList.remove('active'); } });

// Mobile Menu

const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');
const navOverlay = document.querySelector('[data-nav-overlay]');
const navLinks = navbar ? navbar.querySelectorAll('.header-nav-link') : [];

const closeMobileMenu = () => {
    navToggleBtn.classList.remove('active');
    if (navbar) { navbar.classList.remove('active'); }
    document.body.classList.remove('active');
    if (navOverlay) { navOverlay.classList.remove('active'); }
};

navToggleBtn.addEventListener('click', function() {
    const isOpen = navToggleBtn.classList.toggle('active');

    if (navbar) { navbar.classList.toggle('active', isOpen); }
    document.body.classList.toggle('active', isOpen);
    if (navOverlay) { navOverlay.classList.toggle('active', isOpen); }
});

if (navLinks.length) {
    navLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && navToggleBtn.classList.contains('active')) {
        closeMobileMenu();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggleBtn.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Skills Toggling Button

const toggleBtnBox = document.querySelector('[data-toggle-box]');
const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
const skillsBox = document.querySelector('[data-skills-box]');

const updateToggleHighlight = () => {
    if (!toggleBtnBox || !toggleBtns.length) { return; }

    const activeBtn = toggleBtnBox.querySelector('.toggle-btn.active') || toggleBtns[0];

    if (!activeBtn) { return; }

    const boxRect = toggleBtnBox.getBoundingClientRect();
    const activeRect = activeBtn.getBoundingClientRect();
    const left = Math.max(0, activeRect.left - boxRect.left - 5);

    toggleBtnBox.style.setProperty('--toggle-active-left', `${left}px`);
    toggleBtnBox.style.setProperty('--toggle-active-width', `${activeRect.width}px`);
};

const setActiveToggle = (activeIndex) => {
    if (!toggleBtnBox || !toggleBtns.length) { return; }

    toggleBtns.forEach((btn, index) => {
        btn.classList.toggle('active', index === activeIndex);
    });

    if (skillsBox) {
        skillsBox.classList.toggle('active', activeIndex === 1);
    }

    window.requestAnimationFrame(updateToggleHighlight);
};

if (toggleBtns.length) {
    toggleBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(){
            if (btn.classList.contains('active')) { return; }

            setActiveToggle(index);
        });
    });

    const initialActiveIndex = Array.from(toggleBtns).findIndex((btn) => btn.classList.contains('active'));
    setActiveToggle(initialActiveIndex > -1 ? initialActiveIndex : 0);

    window.addEventListener('resize', () => window.requestAnimationFrame(updateToggleHighlight));
    window.addEventListener('load', () => window.requestAnimationFrame(updateToggleHighlight));
}


// Portfolio Filter

const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (filterBtns.length && filterItems.length) {
    const filterProjects = function(category) {
        filterItems.forEach(function(item) {
            const isMatch = category === 'all' || item.dataset.category === category;
            item.toggleAttribute('hidden', !isMatch);
        });
    };

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const selected = btn.dataset.filterBtn;

            filterBtns.forEach(function(button) {
                button.classList.toggle('active', button === btn);
            });

            filterProjects(selected);
        });
    });

    const activeFilterBtn = document.querySelector('[data-filter-btn].active') || filterBtns[0];

    if (activeFilterBtn) {
        filterProjects(activeFilterBtn.dataset.filterBtn);
    }
}

// Dark & Light Theme Toggle

const themeToggleBtn = document.querySelector('[data-theme-btn]');
const aboutBanner = document.querySelector('[data-about-banner]');
const aboutBannerImage = aboutBanner ? aboutBanner.querySelector('[data-about-banner-image]') : null;

const applyTheme = (theme) => {
    const isLight = theme === 'light-theme';

    document.body.classList.toggle('light-theme', isLight);
    document.body.classList.toggle('dark-theme', !isLight);

    if (themeToggleBtn) {
        themeToggleBtn.classList.toggle('active', isLight);
    }

    if (aboutBanner) {
        aboutBanner.classList.remove('about-banner-glow-dark', 'about-banner-glow-white');
        aboutBanner.classList.add(isLight ? 'about-banner-glow-white' : 'about-banner-glow-dark');

        if (aboutBannerImage) {
            const nextSrc = isLight
                ? './images/about-banner-glow-white.png'
                : './images/about-banner-glow-dark.png';

            if (aboutBannerImage.getAttribute('src') !== nextSrc) {
                aboutBannerImage.setAttribute('src', nextSrc);
            }
        }
    }

    localStorage.setItem('theme', theme);
};

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        applyTheme(nextTheme);
    });
}

const storedTheme = localStorage.getItem('theme');
applyTheme(storedTheme === 'light-theme' ? 'light-theme' : 'dark-theme');
const safeCreateUrl = (input) => {
  if (!input) { return null; }

  try {
    return new URL(input);
  } catch {
    try {
      return new URL(`https://${input}`);
    } catch {
      return null;
    }
  }
};

const parseYouTubeTimestamp = (value) => {
  if (!value) { return 0; }
  if (/^\d+$/.test(value)) {
    return Number(value);
  }

  const match = value.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i);
  if (!match) { return 0; }

  const [, hours, minutes, seconds] = match;
  const h = Number(hours ?? 0);
  const m = Number(minutes ?? 0);
  const s = Number(seconds ?? 0);

  return (h * 3600) + (m * 60) + s;
};

const extractYouTubeId = (input) => {
  if (!input) { return ''; }

  const candidate = input.trim();
  if (!candidate) { return ''; }

  if (/^[A-Za-z0-9_-]{11}$/.test(candidate)) {
    return candidate;
  }

  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/live\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/.*?[?&]v=([A-Za-z0-9_-]{11})/i
  ];

  for (const pattern of patterns) {
    const match = candidate.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
};

const buildYouTubeEmbedUrl = (input) => {
  const videoId = extractYouTubeId(input);
  if (!videoId) {
    return '';
  }

  const params = new URLSearchParams({ rel: '0', modestbranding: '1' });
  const url = safeCreateUrl(input);
  const startValue = url ? parseYouTubeTimestamp(url.searchParams.get('start') ?? url.searchParams.get('t')) : 0;

  if (startValue > 0) {
    params.set('start', String(startValue));
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

const getVideoFrameTitle = (frame) => {
  if (!frame) { return 'YouTube video player'; }

  const explicit = frame.dataset.videoTitle?.trim();
  if (explicit) { return explicit; }

  const titleElement = frame.closest('.project-card')?.querySelector('.card-title');
  const fallbackTitle = titleElement?.textContent?.trim();

  return fallbackTitle || 'YouTube video player';
};

const updateVideoFramePlaceholderState = (frame) => {
  const placeholder = frame?.querySelector('.video-frame-placeholder');
  if (!placeholder) { return; }

  placeholder.hidden = frame.dataset.ready === 'true';
};

const setupVideoFrame = (frame) => {
  if (!frame) { return; }

  const poster = frame.dataset.poster?.trim();
  if (poster) {
    frame.style.setProperty('--video-poster', `url("${poster}")`);
  } else {
    frame.style.removeProperty('--video-poster');
  }

  const rawUrl = frame.dataset.videoUrl?.trim() ?? '';
  const existingIframe = frame.querySelector('iframe');

  if (!rawUrl) {
    if (existingIframe) {
      existingIframe.remove();
    }
    frame.dataset.ready = 'false';
    updateVideoFramePlaceholderState(frame);
    return;
  }

  const embedUrl = buildYouTubeEmbedUrl(rawUrl);
  if (!embedUrl) {
    if (existingIframe) {
      existingIframe.remove();
    }
    frame.dataset.ready = 'invalid';
    updateVideoFramePlaceholderState(frame);
    return;
  }

  let iframe = existingIframe;
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.className = 'video-frame-embed';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.appendChild(iframe);
  }

  iframe.src = embedUrl;
  iframe.title = getVideoFrameTitle(frame);

  frame.dataset.ready = 'true';
  updateVideoFramePlaceholderState(frame);
};

const refreshVideoFrameTitles = () => {
  document.querySelectorAll('.video-frame iframe').forEach((iframe) => {
    const frame = iframe.closest('.video-frame');
    if (!frame) { return; }

    iframe.title = getVideoFrameTitle(frame);
  });
};

const initVideoFrames = () => {
  const frames = document.querySelectorAll('.video-frame');
  if (!frames.length) { return; }

  frames.forEach(setupVideoFrame);
  refreshVideoFrameTitles();
};

// Language Switcher
const translations = {
  en: {
    'meta.title': 'Alexey - Video Editor Portfolio',
    'nav.toggle': 'Toggle Menu',
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.skills': 'Skills',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'lang.en': 'English',
    'lang.ru': 'Russian',
    'theme.toggle': 'Change Theme',
    'hero.title': 'Creating Awesome &<br>Viral Videos',
    'hero.cta': 'Contact Me',
    'hero.scroll': 'Scroll',
    'stats.experience': '3<strong>Years of Experience</strong>',
    'stats.videos': '100+<strong>Completed Videos</strong>',
    'stats.clients': '10+<strong>Happy Clients</strong>',
    'about.subtitle': 'About Me',
    'about.title': 'Do You Need a Viral and Creative Video?<br>Get in Touch!',
    'about.text': `Hi! I'm Alexey. I edit videos, create motion graphics, and explore web development. I love turning ideas into visuals that are not only creative and beautiful, but also bring real value - attracting audiences, building trust, and driving results. With experience in blogs, ads, and short-form promos, as well as teamwork on larger projects, I've developed strong skills in communication, project management, and delivering on time. Always improving in color, sound, and design, my goal is simple: to create content that looks stunning and makes an impact.`,
    'about.cta': 'Hire me',
    'skills.subtitle': 'My Skills',
    'skills.title': 'What are my video editing skills?',
    'skills.text': `I currently make creative videos in DaVinci Resolve, but before that I worked a lot in Adobe Premiere Pro and a bit in Adobe After Effects. I mostly create motion graphics in DaVinci Resolve Fusion, while some things I do in After Effects. For websites, I'm currently coding only in HTML, CSS, and JS`,
    'skills.tabSkills': 'Skills',
    'skills.tabTools': 'Tools',
    'projects.subtitle': 'My Works',
    'projects.title': 'Some of My Recent Projects',
    'projects.text': 'From short promo videos to large-scale brand stories - I create videos that make you stand out from the competition.',
    'projects.filter.short': 'Short-form',
    'projects.filter.long': 'Long-form',
    'projects.filter.web': 'Websites',
    'projects.card.talking1': 'Talking Head #1',
    'projects.card.talking2': 'Talking Head #2 - Spain',
    'projects.card.talking3': 'Talking Head #3',
    'projects.card.talking4': 'Talking Head #4',
    'projects.card.vlogSpain': 'Vlog Spain',
    'projects.card.podcastTeaser': 'Podcast Teaser',
    'projects.card.firstShowreel': 'First Showreel',
    'projects.card.reel1': 'Reels from long video 1',
    'projects.card.reel2': 'Reels from long video 2',
    'projects.card.reel3': 'Reels from long video 3',
    'projects.card.reel4': 'Reels from long video 4',
    'projects.card.reel5': 'Reels from long video 5',
    'projects.card.reel6': 'Reels from long video 6',
    'projects.card.promoShort1': 'Promo Short 1',
    'projects.card.promoShort2': 'Promo Short 2',
    'projects.card.promoShort3': 'Promo Short 3',
    'projects.card.shortClip1': 'Short Clip 1',
    'projects.card.shortClip2': 'Short Clip 2',
    'projects.card.shortClip3': 'Short Clip 3',
    'projects.card.shortClip4': 'Short Clip 4',
    'projects.card.shortClip5': 'Short Clip 5',
    'projects.card.shortClip6': 'Short Clip 6',
    'dates.july2025': 'July 2025',
    'dates.december2024': 'December 2024',
    'dates.march2024': 'March 2024',
    'dates.june2024': 'June 2024',
    'dates.may2025': 'May 2025',
    'dates.june2025': 'June 2025',
    'dates.december2025': 'December 2025',
    'dates.october2025': 'October 2025',
    'dates.september2025': 'September 2025',
    'dates.august2025': 'August 2025',
    'contact.subtitle': 'Get in Touch',
    'contact.title': 'Have you any project?<br>Drop a message!',
    'contact.text': 'Contact me and let me know if I can help! Message me on social media or email me, and I\'ll get back to you as soon as possible.',
    'contact.phone': 'Phone:',
    'contact.email': 'Email:',
    'testimonials.1.name': 'Alexey Shulepov',
    'testimonials.1.quote': 'Video edit by script with selected footage delivered per the brief, revisions applied. Thanks for the excellent work!',
    'testimonials.2.name': 'teslaclub',
    'testimonials.2.quote': 'Reliable partner. He dives into the task and delivers 100%.',
    'testimonials.3.name': 'Ruslana Sofronova',
    'testimonials.3.quote': 'Wow, the edit is fire! Captured the mood perfectly.',
    'footer.copyright': '&copy; 2025 All rights reserved',
    'footer.goTop': 'Go to Top',
    'video.fallback': 'Add your YouTube link to the data-video-url attribute to display the video.'
  },
  ru: {
    'meta.title': 'Алексей — портфолио видеомонтажёра',
    'nav.toggle': 'Открыть меню',
    'nav.home': 'Главная',
    'nav.about': 'Обо мне',
    'nav.skills': 'Навыки',
    'nav.portfolio': 'Портфолио',
    'nav.contact': 'Контакты',
    'lang.en': 'Английский',
    'lang.ru': 'Русский',
    'theme.toggle': 'Сменить тему',
    'hero.title': 'Создаю яркие<br>и вирусные ролики',
    'hero.cta': 'Связаться',
    'hero.scroll': 'Вниз',
    'stats.experience': '3<strong>года в профессии</strong>',
    'stats.videos': '100+<strong>готовых видеопроектов</strong>',
    'stats.clients': '10+<strong>довольных клиентов</strong>',
    'about.subtitle': 'Обо мне',
    'about.title': 'Нужен яркий и вирусный ролик?<br>Напишите мне!',
    'about.text': 'Привет! Я Алексей — занимаюсь монтажом, делаю motion-дизайн и изучаю веб-разработку. Люблю превращать идеи в визуал, который не просто красивый, а ещё и работает: притягивает аудиторию, повышает доверие и приносит результат. Опыт с блогами, рекламой, короткими промо и командными проектами помог прокачать коммуникацию, управление задачами и умение сдавать вовремя. Постоянно развиваюсь в цвете, звуке и дизайне, чтобы создавать ролики, которые цепляют взгляд и остаются в памяти.',
    'about.cta': 'Нанять меня',
    'skills.subtitle': 'Мои навыки',
    'skills.title': 'Какие у меня навыки монтажа?',
    'skills.text': 'Сейчас я собираю креативные ролики в DaVinci Resolve, раньше много работал в Adobe Premiere Pro и немного в After Effects. Motion-графику в основном делаю в DaVinci Resolve Fusion, некоторые задачи — в After Effects. Сайты пока пишу на HTML, CSS и JavaScript.',
    'skills.tabSkills': 'Навыки',
    'skills.tabTools': 'Инструменты',
    'projects.subtitle': 'Мои работы',
    'projects.title': 'Недавние проекты',
    'projects.text': 'От коротких промо до больших брендовых историй — помогаю вам выделиться на фоне конкурентов.',
    'projects.card.talking1': 'Интервью #1',
    'projects.card.talking2': 'Интервью #2 — Испания',
    'projects.card.talking3': 'Интервью #3',
    'projects.card.talking4': 'Интервью #4',
    'projects.card.vlogSpain': 'Влог: Испания',
    'projects.card.podcastTeaser': 'Тизер к подкасту',
    'projects.card.firstShowreel': 'Первый шоу-рил',
    'projects.card.reel1': 'Рилс из длинного видео 1',
    'projects.card.reel2': 'Рилс из длинного видео 2',
    'projects.card.reel3': 'Рилс из длинного видео 3',
    'projects.card.reel4': 'Рилс из длинного видео 4',
    'projects.card.reel5': 'Рилс из длинного видео 5',
    'projects.card.reel6': 'Рилс из длинного видео 6',
    'projects.card.promoShort1': 'Рекламный шортс 1',
    'projects.card.promoShort2': 'Рекламный шортс 2',
    'projects.card.promoShort3': 'Рекламный шортс 3',
    'projects.card.shortClip1': 'Шорт-клип 1',
    'projects.card.shortClip2': 'Шорт-клип 2',
    'projects.card.shortClip3': 'Шорт-клип 3',
    'projects.card.shortClip4': 'Шорт-клип 4',
    'projects.card.shortClip5': 'Шорт-клип 5',
    'projects.card.shortClip6': 'Шорт-клип 6',
    'dates.july2025': 'Июль 2025',
    'dates.december2024': 'Декабрь 2024',
    'dates.march2024': 'Март 2024',
    'dates.june2024': 'Июнь 2024',
    'dates.may2025': 'Май 2025',
    'dates.june2025': 'Июнь 2025',
    'dates.december2025': 'Декабрь 2025',
    'dates.october2025': 'Октябрь 2025',
    'dates.september2025': 'Сентябрь 2025',
    'dates.august2025': 'Август 2025',
    'contact.subtitle': 'Свяжитесь',
    'contact.title': 'Есть проект?<br>Напишите мне!',
    'contact.text': 'Напишите, если я могу помочь! Свяжитесь в соцсетях или отправьте письмо — отвечу как можно быстрее.',
    'contact.phone': 'Телефон:',
    'contact.email': 'Почта:',
    'testimonials.1.name': 'Алексей Шулепов',
    'testimonials.1.quote': 'Монтаж видео по сценарию с подбором материалов выполнен по ТЗ, правки внесены. Благодарю за работу!',
    'testimonials.2.name': 'teslaclub',
    'testimonials.2.quote': 'Быстро и качественно. Монтажёр справился с моей задачи на 100%',
    'testimonials.3.name': 'Анна Петрова',
    'testimonials.3.quote': 'Вау, это очень классно! У нас поднялись просмотры и вовлечённость.',
    'footer.copyright': '&copy; 2025 Все права защищены',
    'footer.goTop': 'Наверх',
    'video.fallback': '�������� ������ �� YouTube � ������� data-video-url, ����� �������� �����.'
  }
};

const fallbackLanguage = 'en';
const languageSelect = document.getElementById('lang');

const applyTranslations = (lang) => {
  const dictionary = translations[lang] || translations[fallbackLanguage];
  const fallbackDictionary = translations[fallbackLanguage];

  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = dictionary[key] ?? fallbackDictionary[key];

    if (!value) {
      return;
    }

    if (!('i18nNoText' in element.dataset)) {
      element.innerHTML = value;
    }

    const attrList = element.dataset.i18nAttr;
    if (attrList) {
      attrList.split(',').forEach((attr) => {
        const trimmed = attr.trim();
        if (trimmed) {
          element.setAttribute(trimmed, value);
        }
      });
    }
  });

  refreshVideoFrameTitles();
  document.querySelectorAll('.video-frame').forEach(updateVideoFramePlaceholderState);

  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(updateToggleHighlight);
  } else {
    updateToggleHighlight();
  }
};

const storedLanguage = localStorage.getItem('language');
const initialLanguage = translations[storedLanguage] ? storedLanguage : fallbackLanguage;

initVideoFrames();
applyTranslations(initialLanguage);

if (languageSelect) {
  languageSelect.value = initialLanguage;
  languageSelect.addEventListener('change', (event) => {
    const nextLanguage = translations[event.target.value] ? event.target.value : fallbackLanguage;
    applyTranslations(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  });
}
