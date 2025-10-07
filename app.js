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

navToggleBtn.addEventListener('click', function() { 
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
})

// Skills Toggling Button

const toggleBtnBox = document.querySelector('[data-toggle-box]');
const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
const skillsBox = document.querySelector('[data-skills-box]');

for(let i = 0; i < toggleBtns.length; i++){
    toggleBtns[i].addEventListener('click', function(){
        elemToggleFunc(toggleBtnBox);

        for(let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
        elemToggleFunc(skillsBox);
    });
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

themeToggleBtn.addEventListener('click', function(){
    elemToggleFunc(themeToggleBtn);

    if(themeToggleBtn.classList.contains('active')){
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');

        localStorage.setItem('theme', 'light-theme');
    }else{
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');

        localStorage.setItem('theme', 'dark-theme');
    }
})

//Applying Theme kept in Local Storage 

if(localStorage.getItem('theme') === 'light-theme'){
    themeToggleBtn.classList.add('active');
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
}else{
    themeToggleBtn.classList.remove('active');
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
}
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
    'projects.card.entertainmentVlog': 'Entertainment vlog',
    'projects.card.reel1': 'Reels from long video 1',
    'projects.card.reel2': 'Reels from long video 2',
    'projects.card.reel3': 'Reels from long video 3',
    'projects.card.reel4': 'Reels from long video 4',
    'projects.card.reel5': 'Reels from long video 5',
    'projects.card.reel6': 'Reels from long video 6',
    'dates.july2025': 'July 2025',
    'dates.december2024': 'December 2024',
    'dates.march2024': 'March 2024',
    'dates.june2024': 'June 2024',
    'dates.may2025': 'May 2025',
    'dates.june2025': 'June 2025',
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
    'video.fallback': 'Your browser does not support the video tag.'
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
    'projects.card.entertainmentVlog': 'Развлекательный влог',
    'projects.card.reel1': 'Рилс из длинного видео 1',
    'projects.card.reel2': 'Рилс из длинного видео 2',
    'projects.card.reel3': 'Рилс из длинного видео 3',
    'projects.card.reel4': 'Рилс из длинного видео 4',
    'projects.card.reel5': 'Рилс из длинного видео 5',
    'projects.card.reel6': 'Рилс из длинного видео 6',
    'dates.july2025': 'Июль 2025',
    'dates.december2024': 'Декабрь 2024',
    'dates.march2024': 'Март 2024',
    'dates.june2024': 'Июнь 2024',
    'dates.may2025': 'Май 2025',
    'dates.june2025': 'Июнь 2025',
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
    'video.fallback': 'Ваш браузер не поддерживает воспроизведение видео.'
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

  const videoCopy = dictionary['video.fallback'] ?? fallbackDictionary['video.fallback'];
  if (videoCopy) {
    document.querySelectorAll('video').forEach((video) => {
      video.textContent = videoCopy;
    });
  }
};

const storedLanguage = localStorage.getItem('language');
const initialLanguage = translations[storedLanguage] ? storedLanguage : fallbackLanguage;

applyTranslations(initialLanguage);

if (languageSelect) {
  languageSelect.value = initialLanguage;
  languageSelect.addEventListener('change', (event) => {
    const nextLanguage = translations[event.target.value] ? event.target.value : fallbackLanguage;
    applyTranslations(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  });
}
