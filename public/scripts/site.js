(function() {
    // "use strict";
  
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


//--------- We've started our codes from here---------------//

/**
* THIS IS FOR DYNAMICALY PULL THE MENU ITEMS
*/

//--  Menu list
const menuList = document.querySelector(".menu-items")

//Fetching Menu Items
const getMenuItems = async () => {
	const response = await fetch('/api/v1/menu')
	return await response.json()
}


//Creating Elements and Displaying the Menu Items

const displayMenuItems = menus => {
  menus.forEach(({ _id, name, description, price, image }) => {
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

//Loading and Displaying Data
;(async () => {
	const menus = await getMenuItems()
	displayMenuItems(menus)
})()


/**
* THIS IS FOR DYNAMICALLY PULLING THE EVENT ITEMS
*/

//Get All the Events
const getEvents = async () => {
	const response = await fetch('/api/v1/events')
	return await response.json()
}


// Function to generate event slides dynamically
const generateEvents= async () => {
  const events = await getEvents();  // Fetch the event data
  const swiperContainer = document.querySelector('.swiper-wrapper'); 

  // Clear the container before adding slides
  swiperContainer.innerHTML = '';

  events.forEach(event => {

    // Destructure the event data
    const { _id, name, date } = event; 
    

    // Create the outer div for the swiper slide
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    // Create the row with event item content
    const SliderContentZOne = document.createElement('div');
    SliderContentZOne.classList.add('row', 'gy-4', 'event-item');


    // Create the second column with event details
    const colContent = document.createElement('div');
    colContent.classList.add('col-lg-6', 'pt-4', 'pt-lg-0', 'content');
    const h3 = document.createElement('h3');
    h3.textContent = name 
    
    // Create the date paragraph
    const priceDate = document.createElement('div');
    priceDate.classList.add('price'); //I kept the same class, so I don't need to modify the CSS
    const dateP = document.createElement('p');
    const spanDate = document.createElement('span');
    spanDate.textContent = date
    dateP.appendChild(spanDate);
    priceDate.appendChild(dateP);

    // Create the link for more info
    const linkToMore = document.createElement('div');
    linkToMore.classList.add('price');
    const link = document.createElement('a');
    link.href = `event.html?id=${_id}`;  //THIS IS WHERE EACH ID IS PASSED / GO ALSO IN rout/api/v1/event file there is an UPDATE
    
    // link.target = '_blank';  // I WOULD LET THIS COMMENTED/ BUT YOUR CHOICE IF YOU PREFER IT UNCOMMENTED

    const moreInfoP = document.createElement('p');
    const moreInfoSpan = document.createElement('span');
    moreInfoSpan.textContent = 'See More Info';
    moreInfoP.appendChild(moreInfoSpan);
    link.appendChild(moreInfoP);
    linkToMore.appendChild(link);

    // Append everything to the content column
    colContent.appendChild(h3);
    colContent.appendChild(priceDate);
    colContent.appendChild(linkToMore);

    // Append the columns to the SliderContentZOne
    SliderContentZOne.appendChild(colContent);

    // Append the row to the swiper slide
    swiperSlide.appendChild(SliderContentZOne);

    // Append the swiper slide to the swiper container
    swiperContainer.appendChild(swiperSlide);
  });
};

// Call the function to generate event slides
generateEvents();


