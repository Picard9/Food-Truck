(function() {
    "use strict";
  
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
  
    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  
    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);
  
    /**
     * Auto generate the carousel indicators
     */
    document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
      carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
        if (index === 0) {
          carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
        } else {
          carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
        }
      });
    });
  
    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Init isotope layout and filters
     */
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
  
      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
  
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
  
    });
  
    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
  
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  
    window.addEventListener("load", initSwiper);
  
    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });
  
    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.navmenu a');
  
    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
  
  })();



/**
* THIS IS FOR DYNAMICALY PULL THE MENU ITEMS
*/

//--  Menu list
const menuList = document.querySelector(".menu-items")

const getMenuItems = async () => {
	const response = await fetch('/api/v1/menu')
	return await response.json()
}

const displayMenuItems = menus => {
  menus?.forEach(({ id, name, description, price, image }) => {
    // Create the main container for each menu item
    const menuItems = document.createElement("div");
    menuItems.className = "col-lg-6 menu-item isotope-item filter-specialty"; 

    // Add the image directly to the menuItems container
    const menuImage = document.createElement("img");
    menuImage.src = image;
    menuImage.className = 'menu-img';
    menuImage.alt = name;
    menuItems.appendChild(menuImage); // Append the image to menuItems
    
    // Create the menu content container
    const menuContent = document.createElement("div");
    menuContent.className = "menu-content";
    menuContent.innerHTML = `
      <a href="#">${name}</a><span>$${price}</span>
    `;
    menuItems.appendChild(menuContent); // Append the content

    // Create the menu description container
    const menuDescription = document.createElement("div");
    menuDescription.className = "menu-description";
    menuDescription.innerHTML = `${description}`;
    menuItems.appendChild(menuDescription); // Append the menu description


    menuList.appendChild(menuItems); // Append the entire menu item
  });
};

;(async () => {
	const menus = await getMenuItems()
	displayMenuItems(menus)
})()


/**
* THIS IS FOR DYNAMICALLY PULLING THE EVENT ITEMS
*/

const container = document.querySelector('#events .container');


// Get event info
const getEvents = async () => {
	const response = await fetch('/api/v1/events')
	return await response.json()
}

const displayEvents = events => {
  events?.forEach(({ _id, name, date }) => {
    
    // Create the outer row div with classes
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row gy-4 event-item';

    // Create the column div for content with classes
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-6 pt-4 pt-lg-0 content';

    // Create the event name (h3)
    const eventName = document.createElement('h3');
    eventName.textContent = name

    // Create the price div (for date)
    const eventDateDiv = document.createElement('div');
    eventDateDiv.className = 'price';
    const eventDateText = document.createElement('p');
    const eventDateSpan = document.createElement('span');
    eventDateSpan.textContent = date;
    eventDateText.appendChild(eventDateSpan);
    eventDateDiv.appendChild(eventDateText);

    // Create the "See More Info" link
    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.className = 'price';
    const moreInfoLink = document.createElement('a');
    moreInfoLink.href = `/event/${_id}`;
    moreInfoLink.target = '_blank';
    const moreInfoText = document.createElement('p');
    const moreInfoSpan = document.createElement('span');
    moreInfoSpan.textContent = 'See More Info';
    moreInfoText.appendChild(moreInfoSpan);
    moreInfoLink.appendChild(moreInfoText);
    moreInfoDiv.appendChild(moreInfoLink);

    // Append the event name, date, and link to the column
    colDiv.appendChild(eventName);
    colDiv.appendChild(eventDateDiv);
    colDiv.appendChild(moreInfoDiv);

    // Append the column to the row
    rowDiv.appendChild(colDiv);

    // Append the row to the container
    container.appendChild(rowDiv);
  })
}

;(async () => {
	const events = await getEvents()
	displayEvents(events)
})()

  

