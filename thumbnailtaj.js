function initThumbnailsForAllSlicks() {
  const slickSliders = document.querySelectorAll('.slick-slider');

  slickSliders.forEach((slider, sliderIndex) => {
    const slickTrack = slider.querySelector('.slick-track');
    if (!slickTrack) return;

    // get unique slides (skip cloned ones)
    const slides = slickTrack.querySelectorAll('.slick-slide[data-index]');
    const uniqueSlides = Array.from(slides).filter(slide => {
      return slide.dataset.index >= 0;
    });

    // if only one unique slide → skip
    if (uniqueSlides.length <= 1) return;

    // create thumbnail container
    let thumbContainer = slider.querySelector('.custom-thumbnails');
    if (!thumbContainer) {
      thumbContainer = document.createElement('div');
      thumbContainer.className = 'custom-thumbnails';
      thumbContainer.style.display = 'flex';
      thumbContainer.style.gap = '8px';
      thumbContainer.style.marginTop = '12px';
      thumbContainer.style.cursor = 'pointer';

      slider.appendChild(thumbContainer);
    }

    // clear if already exists
    thumbContainer.innerHTML = '';

    uniqueSlides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (!img) return;

      const thumb = document.createElement('img');
      thumb.src = img.src;
      thumb.alt = `thumb-${sliderIndex}-${index}`;
      thumb.style.width = '50px';
      thumb.style.height = '50px';
      thumb.style.objectFit = 'cover';
      thumb.style.border = '2px solid transparent';
      thumb.style.borderRadius = '4px';

      // highlight first
      if (index === 0) thumb.style.borderColor = '#333';

      thumb.addEventListener('click', () => {
        goToSlickIndex(slider, index);

        // update border highlight for this slider only
        thumbContainer.querySelectorAll('img').forEach(el => el.style.borderColor = 'transparent');
        thumb.style.borderColor = '#333';
      });

      thumbContainer.appendChild(thumb);
    });
  });
}

// helper → scroll to correct slide inside correct slider
function goToSlickIndex(slider, targetIndex) {
  const slickTrack = slider.querySelector('.slick-track');
  if (!slickTrack) return;

  const slides = slickTrack.querySelectorAll('.slick-slide[data-index]');
  const targetSlide = Array.from(slides).find(slide => parseInt(slide.dataset.index, 10) === targetIndex);

  if (targetSlide) {
    targetSlide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

// init all
initThumbnailsForAllSlicks();
