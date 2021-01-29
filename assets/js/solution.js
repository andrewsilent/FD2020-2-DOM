'use strict';

new URL('https://www.facebook.com/DwayneJohnson'); // {hostname}
new Map().set('www.facebook.com', 'src to fb icon'); // key - hostname
/**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {function} options.onClick
 * @param {HTMLElement[]} children
 */
function createElement(type, { classNames, textContent, src, href }, children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  if (textContent) {
    elem.append(document.createTextNode(textContent));
  }
  if (src) {
    elem.setAttribute('src', src);
  }
  if (href) {
    elem.setAttribute('href', href);
    console.log(href);
  }
  if (children) {
    elem.append(...children);
  }
  return elem;
}

const data = responseData;
const cards = document.querySelector('.cards');
data.map((element) => {
  console.log(element);
  cards.append(createElement('article', { classNames: ['card'] },
    [createElement('div', { classNames: ['cardImgWrapper'] },
      [createElement('img', { classNames: ['img'], src: element.profilePicture })]
    ),
    createElement('div', { classNames: ['cardDescription'] },
      [createElement('h3', { classNames: ['title'], textContent: getFullName(element) }),
      createElement('h4', { classNames: ['subtitle'], textContent: element.profession }),
      createElement('p', { classNames: ['desctription'], textContent: element.description })]
    ),
    createElement('div', { classNames: ['cardSocial'] },
      element.contacts.map((link) => {
        return createElement('a', { classNames: ['link'], href: link },
          [createElement('img', { classNames: ['icon'], src: "./assets/img/facebook.svg" })]
        )
      })
    )]
  ))
});

function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
