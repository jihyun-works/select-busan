const body = document.body, menu = document.querySelector('.mobile-menu'), menuButton = document.querySelector('.menu-btn');
function setMenu(open) { menu.classList.toggle('open', open); body.classList.toggle('menu-open', open); menu.setAttribute('aria-hidden', String(!open)); menuButton.setAttribute('aria-expanded', String(open)) }
menuButton.addEventListener('click', () => setMenu(true)); document.querySelector('.menu-close').addEventListener('click', () => setMenu(false)); menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false) });

const collectorSlider = document.querySelector('.collector-grid'), sliderDots = [...document.querySelectorAll('.slider-dots button')];
if (collectorSlider && matchMedia('(max-width:600px)').matches) {
  const originalSlides = [...collectorSlider.children], firstClone = originalSlides[0].cloneNode(true), lastClone = originalSlides.at(-1).cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true'); lastClone.setAttribute('aria-hidden', 'true');
  collectorSlider.append(firstClone); collectorSlider.prepend(lastClone);
  const goTo = (index, behavior = 'smooth') => collectorSlider.scrollTo({ left: collectorSlider.clientWidth * index, behavior });
  requestAnimationFrame(() => goTo(1, 'auto'));
  let loopTimer;
  collectorSlider.addEventListener('scroll', () => {
    clearTimeout(loopTimer);
    const rawIndex = Math.round(collectorSlider.scrollLeft / collectorSlider.clientWidth);
    const dotIndex = (rawIndex - 1 + originalSlides.length) % originalSlides.length;
    sliderDots.forEach((dot, i) => dot.classList.toggle('active', i === dotIndex));
    loopTimer = setTimeout(() => {
      const index = Math.round(collectorSlider.scrollLeft / collectorSlider.clientWidth);
      if (index === 0) goTo(originalSlides.length, 'auto');
      if (index === originalSlides.length + 1) goTo(1, 'auto');
    }, 80)
  }, { passive: true });
  sliderDots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i + 1)))
}

const collectionSelect = document.querySelector('.area-select select');
if (collectionSelect) {
  const collectionAreas = {
    haeundae: {
      area: 'HAEUNDAE · GWANGALLI', character: 'MOMI', type: 'MOMENT COLLECTOR', color: '#f45f70', spots: [
        ['HAEUNDAE BEACH', 'assets/img/HAEUNDAE_BEACH.png'], ['DONGBAEKSEOM ISLAND', 'assets/img/DONGBAEKSEOM_ISLAND.png'], ['GWANGALLI BRIDGE', 'assets/img/GWANGALLI.png']]
    },
    ilgwang: {
      area: 'ILGWANG · SONGJEONG', character: 'WAY', type: 'ROUTE COLLECTOR', color: '#006fe8', spots: [
        ['HUINNYEOUL VILLAGE', 'assets/img/Huinnyeoul_Culture_Village.jpg'], ['TAEJONGDAE', 'assets/img/Taejongdae_Resort_Park.jpg'], ['SONGDO MARINE CABLE CAR', 'assets/img/Songdo_Marine_Cable_Car.jpg']]
    },
    songdo: {
      area: 'SONGDO · YEONGDO', character: 'TORI', type: 'STORY COLLECTOR', color: '#16a6a6', spots: [
        ['HAEDONG YONGGUNGSA', 'assets/img/Haedong_Yonggungsa_Temple.jpg'], ['SONGJEONG SURFING', 'assets/img/Songjeong_Surfing.jpg'], ['HAEUNDAE BLUELINE PARK', 'assets/img/Haeundae_Blueline_Park.jpg']]
    },
    dadaepo: {
      area: 'DADEPO · MOLUNDAE', character: 'LUMI', type: 'LIGHT COLLECTOR', color: '#e9ad00', spots: [
        ['MOLUNDAE', 'assets/img/Molundae.jpg'], ['JANGNIM PORT', 'assets/img/Jangnim_Port.jpg'], ['AMISAN OBSERVATORY', 'assets/img/Amisan_Observatory.jpg']]
    }
  };
  collectionSelect.addEventListener('change', () => {
    const selected = collectionAreas[collectionSelect.value];
    if (!selected) return;
    document.querySelector('.collection-area-name').textContent = selected.area;
    document.querySelector('.collection-character').textContent = selected.character;
    document.querySelector('.collection-character').style.color = selected.color;
    document.querySelector('.collection-type').textContent = selected.type;
    document.querySelectorAll('.collection-card').forEach((card, index) => {
      const [spotName, imageSrc] = selected.spots[index];
      card.querySelector('h3').textContent = spotName;
      const image = card.querySelector('.stamp-photo > img:first-child, :scope > img');
      image.src = imageSrc;
      image.alt = spotName
    });
  })
}

const revealTargets = document.querySelectorAll('.section-heading,.steps>li,.area-grid>article,.collection-card,.collection-guide,.reward-hero,.receive,.exchange-strip,.reward-help,.collector-grid>a,.footer-title,.footer-characters,.footer-row');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  revealTargets.forEach((element, index) => { element.classList.add('scroll-reveal'); element.style.setProperty('--reveal-delay', `${(index % 5) * 55}ms`) });
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .12, rootMargin: '0px 0px -45px' });
  revealTargets.forEach(element => revealObserver.observe(element))
}

const topButton = document.querySelector('.top-button');
const toggleTopButton = () => topButton.classList.toggle('show', scrollY > 500);
addEventListener('scroll', toggleTopButton, { passive: true });
toggleTopButton();
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
(() => {
  const areaCards = [...document.querySelectorAll('.area-grid .area-card')];
  const areaSelect = document.querySelector('.area-select select');
  const rewardName = document.querySelector('.reward-title > span');
  const rewardCards = [...document.querySelectorAll('.completed-cards img')];

  const areas = {
    ilgwang: {
      name: 'ILGWANG · SONGJEONG',
      keyring: {
        src: 'assets/img/way_keyring.png',
        alt: 'WAY 키링과 패키지'
      },
      images: [
        ['assets/img/way_collection1.jpg', 'HUINNYEOUL VILLAGE'],
        ['assets/img/way_collection2.jpg', 'TAEJONGDAE'],
        ['assets/img/way_collection3.jpg', 'SONGDO MARINE CABLE CAR']
      ]
    },
    haeundae: {
      name: 'HAEUNDAE · GWANGALLI',
      keyring: {
        src: 'assets/img/momi_keyring.png',
        alt: 'MOMI 키링과 패키지'
      },
      images: [
        ['assets/img/momi_collection1.jpg', 'HAEUNDAE BEACH'],
        ['assets/img/momi_collection2.jpg', 'DONGBAEKSEOM ISLAND'],
        ['assets/img/momi_collection3.jpg', 'GWANGALLI BRIDGE']
      ]
    },
    songdo: {
      name: 'SONGDO · YEONGDO',
      keyring: {
        src: 'assets/img/tori_keyring.png',
        alt: 'TORI 키링과 패키지'
      },
      images: [
        ['assets/img/tori_collection1.jpg', 'HAEDONG YONGGUNGSA'],
        ['assets/img/tori_collection2.jpg', 'SONGJEONG SURFING'],
        ['assets/img/tori_collection3.jpg', 'HAEUNDAE BLUELINE PARK']
      ]
    },
    dadaepo: {
      name: 'DADEPO · MOLUNDAE',
      keyring: {
        src: 'assets/img/lumi_keyring.png',
        alt: 'LUMI 키링과 패키지'
      },
      images: [
        ['assets/img/lumi_collection1.jpg', 'MOLUNDAE'],
        ['assets/img/lumi_collection2.jpg', 'JANGNIM PORT'],
        ['assets/img/lumi_collection3.jpg', 'AMISAN OBSERVATORY']
      ]
    }
  };

  function selectArea(areaId) {
    const area = areas[areaId];
    if (!area) return;
    const keyringImage = document.querySelector('.reward .keyring');

    if (keyringImage && area.keyring) {
      keyringImage.src = area.keyring.src;
      keyringImage.alt = area.keyring.alt;
    }
    // 선택 카드의 체크와 테두리
    areaCards.forEach(card => {
      const selected = card.dataset.area === areaId;
      card.parentElement.classList.toggle('selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.collector-grid a[data-area]').forEach(card => {
      card.classList.toggle('active', card.dataset.area === areaId);
    });

    // 아래 지역 선택 메뉴
    if (areaSelect && areaSelect.value !== areaId) {
      areaSelect.value = areaId;
      areaSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // COLLECTION COMPLETE 권역명과 사진 3장
    if (rewardName) rewardName.textContent = area.name;

    rewardCards.forEach((img, index) => {
      img.src = area.images[index][0];
      img.alt = area.images[index][1];
    });
  }

  areaCards.forEach(card => {
    card.addEventListener('click', () => selectArea(card.dataset.area));
  });

  areaSelect?.addEventListener('change', () => {
    selectArea(areaSelect.value);
  });
})();
