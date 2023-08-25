var caretItems = document.getElementsByClassName("caret");
var i;

for (i = 0; i < caretItems.length; i++) {
    caretItems[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}

var clickableItems = document.getElementsByClassName("clickable");

// Add a click event listener to each clickable element
for (i = 0; i < clickableItems.length; i++) {
    clickableItems[i].addEventListener("click", function() {
        var nodeName = this.textContent;

        fetch('/get_specimen_data', {
            method: 'POST',
            body: JSON.stringify({ node_name: nodeName }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => updateSpecimenData(data));
    });
};

// Function to update specimen data on the page
function updateSpecimenData(data) {
    // Add keys and values from data to the table
    for (let key in data) {
        var cells = document.querySelectorAll(`td[data-key="${key}"], strong[data-key="${key}"]`);
        cells.forEach(cell => {
            if (cell) {
                cell.textContent = data[key];
            }
        });
    }

    // the error image that displays if the path in LIMS is invalid
    const FALLBACK_IMAGE_URL = "/static/Images/ErrorImage.JPG";

    // alters the given image url with different zooms and then tests each one
    // to see which one is valid
    function handleImageErrorWithAlterations(imgElem, originalUrl) {
        let alteredUrls = generateAlteredUrls(originalUrl);
        tryNextUrl(imgElem, alteredUrls, originalUrl);
    }
    
    // alters the given image url with different zoom values 
    // starts at higher zoom
    // returns list of altered urls with zooms from 6-0 inclusive
    function generateAlteredUrls(originalUrl) {
        let alteredUrls = [];
        const charactersToTry = "6543210"; 
    
        for (let i = 0; i < charactersToTry.length; i++) {
            const alteredUrl = originalUrl.slice(0, -1) + charactersToTry[i];
            alteredUrls.push(alteredUrl);
        }
    
        return alteredUrls;
    }
    
    // tests the given image urls to see which ones are valid
    // will update the image url with the highest zoom that is valid
    function tryNextUrl(imgElem, urls, originalUrl) {
        if (urls.length === 0) {
            imgElem.src = FALLBACK_IMAGE_URL;
            return;
        }
    
        const nextUrl = urls.shift();
        imgElem.onerror = function() { tryNextUrl(imgElem, urls, originalUrl); };
        imgElem.src = nextUrl;
        imgElem.dataset.finalUrl = nextUrl; // Store the final used URL
        imgElem.dataset.originalUrl = originalUrl; // Store the original URL for reference
    
        const index = data.image_urls.indexOf(originalUrl);
        if (index !== -1) {
            data.image_urls[index] = nextUrl;
        }
    }
    
    // retrives the image placeholder in the html file
    // makes it so that we can render images for a specimen if they have them 
    // in the right place on the webpage
    let placeholder = document.querySelector('#image-placeholder');
    
    // initializes the image carousel
    // if the user clicks on the image the lightbox will open on that image
    function initCarousel() {
        $(placeholder).slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    
        $(placeholder).on('click', '.slick-slide', function(e) {
            e.preventDefault(); 
            const currentSlideIndex = $(this).data('slick-index');
            openLightboxAt(currentSlideIndex);
        });
    }
    
    function destroyCarousel() {
        if ($(placeholder).hasClass('slick-initialized')) {
            $(placeholder).slick('unslick');
        }
    }
    
    // opens the image lightbox on the current image in the carousel
    function openLightboxAt(index) {
        // Use the dataset finalUrl for the lightbox items
        let uniqueUrls = new Set();  // Use a Set to keep track of unique URLs
        let items = Array.from(placeholder.querySelectorAll('img'))
            .filter(img => {
                const isUnique = !uniqueUrls.has(img.dataset.finalUrl);
                uniqueUrls.add(img.dataset.finalUrl);
                return isUnique;
            })
            .map(img => {
                const image = img.dataset.finalUrl;
                let treatment = data.treatment[image] || "";  
                let title = '<a href="#" class="lightbox-download-btn">Download</a>';
                if (treatment && treatment !== "None") {
                    title = treatment + ' ' + title;
                }
                return {
                    src: image,
                    title: title
                };
            });
    
        $.magnificPopup.open({
            items: items,
            type: 'image',
            gallery: {
                enabled: true
            },
            callbacks: {
                open: function() {
                    $('.mfp-figure').on('click', function(e) {
                        if ($(e.target).closest('.mfp-close').length || $(e.target).closest('.lightbox-download-btn').length) {
                            return;
                        }
                        e.stopPropagation();
                        let imageUrl = $(this).find('img').attr('src');
                        window.open(imageUrl, '_blank');
                    });
                    
                    $('body').on('click', '.lightbox-download-btn', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        let imageUrl = $('.mfp-img').attr('src');
                        let activeSlideIndex = Array.from(placeholder.querySelectorAll('img')).findIndex(img => img.dataset.finalUrl === imageUrl || img.dataset.originalUrl === imageUrl); 
                        let filename = data.all_image_names[activeSlideIndex].replace('.aff', '') + ".jpg";
                        downloadImage(imageUrl, filename);
                    });
                },
                close: function() {
                    $('.mfp-figure').off('click');
                    $('body').off('click', '.lightbox-download-btn');
                }
            }
        }, index);
    }
    
    
    // download the current imager with the original filename intact 
    // will download the image as a jpg
    function downloadImage(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }
    
    // download the current imager with the original filename intact 
    // will download the image as a jpg
    function downloadCurrentImage() {
        let activeSlide = $(placeholder).slick('slickCurrentSlide');
        let currentImageUrl = Array.from(placeholder.querySelectorAll('img'))[activeSlide].dataset.finalUrl;
        let filename = data.all_image_names[activeSlide].replace('.aff', '') + ".jpg";
        downloadImage(currentImageUrl, filename);
    }
    
    // formats the images in the carousel to be the specified height of 550 px
    // adds the hover over stain images so can see the type of stain used
    const createImageContainer = (url, hoverText) => {
        let containerDiv = document.createElement('div');
        containerDiv.className = "image-container";
    
        let anchorElem = document.createElement('a');
        anchorElem.href = url;
        anchorElem.className = "image-popup";
        anchorElem.target = "_blank";
    
        anchorElem.addEventListener('click', function(e) {
            e.preventDefault();
            const index = Array.from(placeholder.querySelectorAll('img')).findIndex(img => img.dataset.finalUrl === url);
            openLightboxAt(index);
        });
    
        let imgElem = document.createElement('img');
        imgElem.alt = "Specimen image";
        imgElem.style.height = "550px";
        imgElem.src = url;
        imgElem.dataset.finalUrl = url; 
        imgElem.onerror = function() { handleImageErrorWithAlterations(imgElem, url); };
    
        anchorElem.appendChild(imgElem);
        containerDiv.appendChild(anchorElem);
    
        if (hoverText && hoverText !== "None") {  
            let overlayDiv = document.createElement('div');
            overlayDiv.className = "image-overlay";
            overlayDiv.innerHTML = hoverText;
    
            let overlayAnchor = document.createElement('a');
            overlayAnchor.href = url;
            overlayAnchor.className = 'image-popup';
            overlayAnchor.style.display = 'block';
            overlayAnchor.appendChild(overlayDiv);
    
            containerDiv.appendChild(overlayAnchor);
        }
    
        return containerDiv;
    };
    
    // takes care of image rendering as the user goes through the specimen dropdown 
    if (data.image_urls && data.image_urls !== 'None') {
        // destroys the current image carousel
        destroyCarousel();
    
        while (placeholder.firstChild) {
            placeholder.firstChild.remove();
        }
        
        // populates the image carousel with images
        for (let imageUrl of data.image_urls) {
            let hoverData = data.treatment[imageUrl] ? data.treatment[imageUrl] : "";
            placeholder.appendChild(createImageContainer(imageUrl, hoverData));
        }
        
        // takes care of multiple images
        if (data.image_urls.length > 1) {
            initCarousel();
    
            let downloadButton = document.createElement('a');
            downloadButton.href = "#";
            downloadButton.textContent = "Download";
            downloadButton.className = "btn";
            downloadButton.id = "download-button";
    
            downloadButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                downloadCurrentImage();
            });
    
            placeholder.appendChild(downloadButton);
    
        // case of only one image
    } else if (data.image_urls.length === 1) {
        $(placeholder).find('.image-popup').on('click', function(e) {
            e.preventDefault();
            openLightboxAt(0);
        });
    }
    
    // if a specimen doesn't have any images, it will destroy the existing carousel and clear the placeholder
    } else {
        destroyCarousel();
        while (placeholder.firstChild) {
            placeholder.firstChild.remove();
        }
    }
    
}

var toggleButton = document.getElementById("toggleDropdown");

toggleButton.addEventListener("click", function(){
    var anyOpen = Array.from(caretItems).some(function(caret) {
        return caret.classList.contains('caret-down');
    });

    if(anyOpen){
        // If any dropdowns are open, close them all
        for (i = 0; i < caretItems.length; i++) {
            if (caretItems[i].classList.contains('caret-down')) {
                caretItems[i].click();
            }
        }
        toggleButton.textContent = 'Expand All';
    } else {
        // If all dropdowns are closed, open them all
        for (i = 0; i < caretItems.length; i++) {
            if (!caretItems[i].classList.contains('caret-down')) {
                caretItems[i].click();
            }
        }
        toggleButton.textContent = 'Collapse All';
    }
});
