function addBundleToCart(ids) {
  const opener = document.querySelector('#bundle-submit');

  opener.setAttribute('aria-disabled', true);
  opener.classList.add('loading');
  opener.querySelector('.loading__spinner').classList.remove('hidden');

  if (ids) {
    let formData = {
      items: [],
      sections: 'cart-notification-button,cart-notification-product,cart-icon-bubble',
    };

    formData.items = ids.map((id) => ({
      id: id,
      quantity: 1,
    }));

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        openBundleNotification(data);
      })
      .catch((error) => {
        console.log('error: ', error);
      })
      .finally(() => {
        opener.removeAttribute('aria-disabled');
        opener.classList.remove('loading');
        opener.querySelector('.loading__spinner').classList.add('hidden');
      });
  }
}

function openBundleNotification(data) {
  const cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
  if (cartNotification) {
    cartNotification.querySelector('.cart-notification-product').innerHTML = data.sections['cart-notification-product'];
    cartNotification.querySelector('#cart-notification-button').innerHTML = data.sections['cart-notification-button'];
    document.querySelector('#cart-icon-bubble').innerHTML = data.sections['cart-icon-bubble'];
    cartNotification.open();
  }
}
