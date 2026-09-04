(() => {
  const C = window.RACKDOTCO_CONFIG;
  const P = window.PRODUCTS || [];

  const grid = document.querySelector('#grid');
  const modal = document.querySelector('#modal');
  const close = document.querySelector('#close');
  const hamb = document.querySelector('#hamb');
  const links = document.querySelector('#links');

  const mImg = document.querySelector('#mImg');
  const mThumbs = document.querySelector('#mThumbs');
  const actions = document.querySelector('.actions');
  const soldMessage = document.querySelector('#mSold');


  // WhatsApp link
  function wa() {
    return `https://wa.me/${C.whatsapp.number}?text=${encodeURIComponent(C.whatsapp.message)}`;
  }


  // Social links
  document.querySelectorAll('[data-social="instagram"]').forEach(a => {
    a.href = C.instagram.url;
  });

  document.querySelectorAll('[data-social="whatsapp"]').forEach(a => {
    a.href = wa();
  });


  // Basic HTML escaping
  function esc(v) {
    return String(v)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }


  // Render products
  function render(filter = 'ALL') {

    const list = P.filter(
      x => filter === 'ALL' ||
      x.category.toUpperCase() === filter
    );

    grid.innerHTML = list.map(x => {

      const firstImage = x.image[0];

      return `
        <article
          class="card ${x.status === 'SOLD' ? 'sold' : ''}"
          data-id="${x.id}"
          tabindex="0"
          role="button"
        >

          <div class="photo">

            <img
              src="${esc(firstImage)}"
              alt="${esc(x.name)}"
              loading="lazy"
            >

            <span class="badge ${x.status === 'AVAILABLE' ? 'available' : ''}">
              ${x.status}
            </span>

          </div>

          <div class="info">

            <h3 class="name">
              ${esc(x.name)}
            </h3>

            <p class="meta">
              ${esc(x.category)} · ${esc(x.size)}
            </p>

            <div class="bottom">

              <span class="condition">
                Condition: ${esc(x.condition)}
              </span>

              <strong class="price">
                RM${Number(x.price).toLocaleString('en-MY')}
              </strong>

            </div>

          </div>

        </article>
      `;

    }).join('');


    // Open product modal
    grid.querySelectorAll('.card').forEach(card => {

      card.onclick = () => {
        open(Number(card.dataset.id));
      };

      card.onkeydown = e => {

        if (e.key === 'Enter' || e.key === ' ') {

          e.preventDefault();

          open(Number(card.dataset.id));

        }

      };

    });

  }


  // Open modal
  function open(id) {

    const x = P.find(p => p.id === id);

    if (!x) return;


    // Main image
    mImg.src = x.image[0];
    mImg.alt = x.name;


    // Create thumbnails
    mThumbs.innerHTML = x.image.map((img, i) => {

      return `
        <button
          class="thumb ${i === 0 ? 'active' : ''}"
          type="button"
          aria-label="View image ${i + 1}"
        >

          <img
            src="${esc(img)}"
            alt=""
          >

        </button>
      `;

    }).join('');


    // Thumbnail click
    mThumbs.querySelectorAll('.thumb').forEach((thumb, i) => {

      thumb.onclick = () => {

        mImg.src = x.image[i];

        mThumbs
          .querySelectorAll('.thumb')
          .forEach(t => t.classList.remove('active'));

        thumb.classList.add('active');

      };

    });


    // Product information
    document.querySelector('#mCat').textContent =
      `${x.category} / ${x.status}`;

    document.querySelector('#mName').textContent =
      x.name;

    document.querySelector('#mPrice').textContent =
      `RM${Number(x.price).toLocaleString('en-MY')}`;

    document.querySelector('#mSize').textContent =
      x.size;

    document.querySelector('#mCondition').textContent =
      x.condition;

    document.querySelector('#mStatus').textContent =
      x.status;

    document.querySelector('#mDesc').textContent =
      x.description;


    // AVAILABLE vs SOLD
    if (x.status === 'SOLD') {

      actions.hidden = true;
      soldMessage.hidden = false;

    } else {

      actions.hidden = false;
      soldMessage.hidden = true;

    }


    // Show modal
    modal.classList.add('open');

    modal.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.classList.add('lock');

    close.focus();

  }


  // Close modal
  function shut() {

    modal.classList.remove('open');

    modal.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.classList.remove('lock');

  }


  // Filters
  document.querySelectorAll('#filters button').forEach(button => {

    button.onclick = () => {

      document
        .querySelectorAll('#filters button')
        .forEach(x => x.classList.remove('active'));

      button.classList.add('active');

      render(button.dataset.filter);

    };

  });


  // Close button
  close.onclick = shut;


  // Click outside modal
  document
    .querySelector('[data-close]')
    .onclick = shut;


  // ESC key
  document.onkeydown = e => {

    if (e.key === 'Escape') {
      shut();
    }

  };


  // Mobile menu
  hamb.onclick = () => {

    const open = links.classList.toggle('open');

    hamb.setAttribute(
      'aria-expanded',
      open
    );

  };


  links.querySelectorAll('a').forEach(a => {

    a.onclick = () => {
      links.classList.remove('open');
    };

  });


  // Scroll reveal
  const io = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('show');

          io.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  document
    .querySelectorAll('.reveal')
    .forEach(e => io.observe(e));


  // Initial render
  render();

})();