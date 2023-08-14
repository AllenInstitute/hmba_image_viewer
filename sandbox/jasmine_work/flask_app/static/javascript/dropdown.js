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

    // working lightbox but hover images click into different tab and then 
    // non-hover images click into lightbox and never can click into different tab
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
    // }
    
    // function destroyCarousel() {
    //     if ($(placeholder).hasClass('slick-initialized')) {
    //         $(placeholder).slick('unslick');
    //     }
    
    //     // Remove the "Expand" button if it exists
    //     let expandButton = document.querySelector('.expand-carousel');
    //     if (expandButton) {
    //         expandButton.remove();
    //     }
    // }
    
    // function initLightbox() {
    //     $('.image-popup').magnificPopup({
    //         items: data.image_urls.map(image => ({ src: image })),  // Explicitly set the gallery items
    //         type: 'image',
    //         gallery: {
    //             enabled: true
    //         }
    //     });
    // }
    
    // const createImageContainer = (url, hoverText) => {
    //     let containerDiv = document.createElement('div');
    //     containerDiv.className = "image-container";
    
    //     let anchorElem = document.createElement('a');
    //     anchorElem.href = url;
    //     anchorElem.className = "image-popup";
    
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
    //         overlayAnchor.target = "_blank";
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
    
    //     if (data.image_urls.length > 1) {
    //         initCarousel();
    //         initLightbox();
    //     }
    
    //     // Add the expand button after the carousel images are loaded
    //     let expandButton = document.createElement('button');
    //     expandButton.textContent = "Expand";
    //     expandButton.className = "expand-carousel";
    //     expandButton.onclick = function() {
    //         $.magnificPopup.open({
    //             items: data.image_urls.map(image => ({ src: image })),
    //             type: 'image',
    //             gallery: { enabled: true }
    //         });
    //     };
    //     placeholder.parentNode.insertBefore(expandButton, placeholder.nextSibling);
    
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
    }

    function destroyCarousel() {
        if ($(placeholder).hasClass('slick-initialized')) {
            $(placeholder).slick('unslick');
        }
    }

    function initLightbox() {
        $('.image-popup').magnificPopup({
            items: data.image_urls.map(image => {
                let treatment = data.treatment[image] ? data.treatment[image] : "";  // Fetch associated treatment
                return {
                    src: image,
                    title: treatment  // Pass the treatment as the title for the lightbox
                };
            }), 
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    const createImageContainer = (url, hoverText) => {
        let containerDiv = document.createElement('div');
        containerDiv.className = "image-container";

        let anchorElem = document.createElement('a');
        anchorElem.href = url;
        anchorElem.className = "image-popup";

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
            overlayAnchor.className = 'image-popup';  // Add this class to ensure it opens in lightbox
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

        initLightbox();
        if (data.image_urls.length > 1) {
            initCarousel();
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
