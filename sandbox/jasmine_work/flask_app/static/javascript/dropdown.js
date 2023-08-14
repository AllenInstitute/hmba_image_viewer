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

    // lightbox where can click on images and will open in new tab and be zoomable
    // let placeholder = document.querySelector('#image-placeholder');

    // const FALLBACK_IMAGE_URL = "/static/Images/ErrorImage.JPG";

    // function handleImageError(imgElem) {
    //     imgElem.src = FALLBACK_IMAGE_URL;
    // }

    // function initCarousel() {
    //     $(placeholder).slick({
    //         dots: true,
    //         infinite: true,
    //         speed: 500,
    //         slidesToShow: 1,
    //         adaptiveHeight: true
    //     });
    
    //     $(placeholder).on('click', '.slick-slide', function() {
    //         const currentSlideIndex = $(this).data('slick-index');
    //         openLightboxAt(currentSlideIndex);
    //     });
    // }
    

    // function destroyCarousel() {
    //     if ($(placeholder).hasClass('slick-initialized')) {
    //         $(placeholder).slick('unslick');
    //     }
    // }

    // function initLightbox() {
    //     $('.image-popup').magnificPopup({
    //         items: data.image_urls.map(image => {
    //             let treatment = data.treatment[image] ? data.treatment[image] : "";  
    //             return {
    //                 src: image,
    //                 title: treatment
    //             };
    //         }), 
    //         type: 'image',
    //         gallery: {
    //             enabled: true
    //         },
    //         callbacks: {
    //             open: function() {
    //                 $('.mfp-figure').on('click', function(e) {
    //                     if ($(e.target).closest('.mfp-close').length) {
    //                         // If the click came from the close button, just return without doing anything
    //                         return;
    //                     }
    
    //                     e.stopPropagation();  // Prevent any other click handlers on this event
    //                     let imageUrl = $(this).find('img').attr('src');
    //                     window.open(imageUrl, '_blank');
    //                 });
    //             },
    //             close: function() {
    //                 $('.mfp-figure').off('click');
    //             }
    //         }
    //     });
    // }    
    
    // const createImageContainer = (url, hoverText) => {
    //     let containerDiv = document.createElement('div');
    //     containerDiv.className = "image-container";
    
    //     let anchorElem = document.createElement('a');
    //     anchorElem.href = url;
    //     anchorElem.className = "image-popup";
    //     anchorElem.target = "_blank";  // Open link in a new tab
    
    //     let imgElem = document.createElement('img');
    //     imgElem.alt = "Specimen image";
    //     imgElem.style.height = "550px"; 
    //     imgElem.src = url;
    //     imgElem.onerror = function() { handleImageError(imgElem); };
    
    //     anchorElem.appendChild(imgElem);
    //     containerDiv.appendChild(anchorElem);
    
    //     if (hoverText && hoverText !== "None") {  
    //         let overlayDiv = document.createElement('div');
    //         overlayDiv.className = "image-overlay";
    //         overlayDiv.innerHTML = hoverText;
    
    //         let overlayAnchor = document.createElement('a');
    //         overlayAnchor.href = url;
    //         overlayAnchor.className = 'image-popup';
    //         overlayAnchor.style.display = 'block';
    //         overlayAnchor.appendChild(overlayDiv);
    
    //         containerDiv.appendChild(overlayAnchor);
    //     }
    
    //     return containerDiv;
    // };
    

    // if (data.image_urls && data.image_urls !== 'None') {
    //     destroyCarousel();
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }

    //     for (let imageUrl of data.image_urls) {
    //         let hoverData = data.treatment[imageUrl] ? data.treatment[imageUrl] : "";
    //         placeholder.appendChild(createImageContainer(imageUrl, hoverData));
    //     }

    //     initLightbox();
    //     if (data.image_urls.length > 1) {
    //         initCarousel();
    //     }

    // } else {
    //     destroyCarousel();
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    // }

    let placeholder = document.querySelector('#image-placeholder');
    const FALLBACK_IMAGE_URL = "/static/Images/ErrorImage.JPG";
    
    function handleImageError(imgElem) {
        imgElem.src = FALLBACK_IMAGE_URL;
    }
    
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
    
    function openLightboxAt(index) {
        $.magnificPopup.open({
            items: data.image_urls.map(image => {
                let treatment = data.treatment[image] ? data.treatment[image] : "";  
                return {
                    src: image,
                    title: treatment
                };
            }), 
            type: 'image',
            gallery: {
                enabled: true
            },
            callbacks: {
                open: function() {
                    $('.mfp-figure').on('click', function(e) {
                        if ($(e.target).closest('.mfp-close').length) {
                            return;
                        }
    
                        e.stopPropagation();
                        let imageUrl = $(this).find('img').attr('src');
                        window.open(imageUrl, '_blank');
                    });
                },
                close: function() {
                    $('.mfp-figure').off('click');
                }
            }
        }, index);
    }
    
    const createImageContainer = (url, hoverText) => {
        let containerDiv = document.createElement('div');
        containerDiv.className = "image-container";
    
        let anchorElem = document.createElement('a');
        anchorElem.href = url;
        anchorElem.className = "image-popup";
        anchorElem.target = "_blank";
    
        anchorElem.addEventListener('click', function(e) {
            e.preventDefault();
            const index = data.image_urls.indexOf(url);
            openLightboxAt(index);
        });
    
        let imgElem = document.createElement('img');
        imgElem.alt = "Specimen image";
        imgElem.style.height = "550px"; 
        imgElem.src = url;
        imgElem.onerror = function() { handleImageError(imgElem); };
    
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
    
    if (data.image_urls && data.image_urls !== 'None') {
        destroyCarousel();
        while (placeholder.firstChild) {
            placeholder.firstChild.remove();
        }
    
        for (let imageUrl of data.image_urls) {
            let hoverData = data.treatment[imageUrl] ? data.treatment[imageUrl] : "";
            placeholder.appendChild(createImageContainer(imageUrl, hoverData));
        }
    
        if (data.image_urls.length > 1) {
            initCarousel();
        } else if (data.image_urls.length === 1) {
            $(placeholder).find('.image-popup').on('click', function(e) {
                e.preventDefault();
                openLightboxAt(0);
            });
        }
    
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
