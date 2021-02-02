'use strict';

window.onload = renderHTML;

function renderHTML() {
  const cards = document.querySelector('.cards');
  responseData
    .sort((prev, next) => prev.id - next.id)
    .map((element) => {
      cards.append(createElement('article', { classNames: ['card'] },
        [createElement('div', { classNames: ['cardImgWrapper'] },
          [imgErrorHandler(createElement('img', { classNames: ['img'], attributes: { 'src': element.profilePicture, 'alt': getFullName(element) } }))]
        ),
        createElement('div', { classNames: ['cardDescription'] },
          [createElement('h3', { classNames: ['title'], textContent: getFullName(element) }),
          createElement('h4', { classNames: ['subtitle'], textContent: element.profession }),
          createElement('p', { classNames: ['desctription'], textContent: element.description })]
        ),
        createElement('div', { classNames: ['cardSocial'] },
          element.contacts
            .map((link) => linkToUrl(link))
            .sort()
            .map((url) => {
              return createElement('a', { classNames: ['link'], attributes: { 'href': url.href } },
                [createElement('img', { classNames: ['icon'], attributes: { 'src': getSocialIcon(url.hostname), 'alt': url.href } })]
              )
            })
        )]
      ))
    });
  document.querySelectorAll('.card').forEach(item => item.addEventListener('click', cardSelect));

}

function createElement(type, { classNames, attributes, textContent }, children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  if (attributes) {
    for (const [attrName, attrValue] of Object.entries(attributes)) {
      elem.setAttribute(attrName, attrValue);
    }
  }
  if (textContent) {
    elem.append(textContent);
  }
  if (children) {
    elem.append(...children);
  }
  return elem;
}

function imgErrorHandler(object) {
  object.onerror = () => {
    object.remove();
    throw new Error('Image download fail => image has been deleted from HTML');
  }
  return object;
}

function getFullName({ firstName, lastName }) {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return 'No name';
  }
}

function linkToUrl(link) {
  const url = new URL(link);
  url.hostname.startsWith('www.')
    ? url.hostname
    : url.hostname = 'www.' + url.hostname;
  return url;
}

function getSocialIcon(hostname) {
  switch (hostname) {
    case 'www.facebook.com':
      return './assets/img/facebook.svg';
    case 'www.instagram.com':
      return './assets/img/instagram.svg';
    case 'www.twitter.com':
      return './assets/img/twitter.svg';
  }
}

function cardSelect(event) {
  event.target.classList.toggle('selected');
  cardsUnselect(event.target);
}

function cardsUnselect(element) {
  [...document.querySelectorAll('.card')].filter(e=>e!=element).forEach(card=>card.classList.remove('selected'));
}