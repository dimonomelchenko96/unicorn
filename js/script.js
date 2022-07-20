window.addEventListener("DOMContentLoaded", () => {

const parent = document.querySelector('.main__wrapper'),
      url = '../data.json',
      popup = document.querySelector('.overlay'),
      trigger = document.querySelector('.popup__close');

 // отримуємо дані з json      
const getResource = async (url) => {
    let res = await fetch(url);

    const response = await res.json();

    if (res.ok) {
        parent.innerHTML = ''
        createElements(response);
        // popup
        setTimeout(() => {
            popup.classList.add('active');
        }, 2000)
    } else {
        throw new Error (`Could not fetch ${url}, status ${res.status}`)
    }
};
// відмальовуємо отриманні дані

const createElements = (response) => {
    const {plans} = response;

    plans.forEach(({price, logo,type, subtitle, text, cashback}) => {
        let block = document.createElement('div');
        block.classList.add('main__item');

        let textArr = text.split('\n').map(item => `<li>${item}</li>`).join('');

        block.innerHTML = `
            <img src="./imgs/${logo}.png" alt="icon" class="main__item-img">
            <div class="main__item-price">${price}</div>
            <h2 class="main__item-title">${type}</h2>
            <h5 class="main__item-subtitle">${subtitle}</h5>
            <ul class="main__item-text">
                ${textArr}
            </ul>
            <div class="main__item-price bottom">${cashback}</div>
            <div class="main__item-cashback">Cash Back</div>
            <button class="main__item-button">Get started</button>
        `
        parent.append(block)
    });
}

const showPopup = (e) => {
    if (e.target === popup || e.target == trigger) {
        popup.classList.remove('active');
    }
}

popup.addEventListener('click', (e) => showPopup(e));

getResource(url);

// domcontent close
});



