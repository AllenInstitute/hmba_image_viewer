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

    // deployed app that i showed at poster presentation
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
    
    //     $(placeholder).on('click', '.slick-slide', function(e) {
    //         e.preventDefault(); 
    //         const currentSlideIndex = $(this).data('slick-index');
    //         openLightboxAt(currentSlideIndex);
    //     });
    // }
    
    // function destroyCarousel() {
    //     if ($(placeholder).hasClass('slick-initialized')) {
    //         $(placeholder).slick('unslick');
    //     }
    // }
    
    // function openLightboxAt(index) {
    //     $.magnificPopup.open({
    //         items: data.image_urls.map(image => {
    //             let treatment = data.treatment[image] || "";  
    //             let title = '<a href="#" class="lightbox-download-btn">Download</a>';
    //             if (treatment && treatment !== "None") {
    //                 title = treatment + ' ' + title;
    //             }
    //             return {
    //                 src: image,
    //                 title: title
    //             };
    //         }), 
    //         type: 'image',
    //         gallery: {
    //             enabled: true
    //         },
    //         callbacks: {
    //             open: function() {
    //                 $('.mfp-figure').on('click', function(e) {
    //                     if ($(e.target).closest('.mfp-close').length || $(e.target).closest('.lightbox-download-btn').length) {
    //                         return;
    //                     }
    //                     e.stopPropagation();
    //                     let imageUrl = $(this).find('img').attr('src');
    //                     window.open(imageUrl, '_blank');
    //                 });
    
    //                 // Delegate listener for download buttons
    //                 $('body').on('click', '.lightbox-download-btn', function(e) {
    //                     e.preventDefault();
    //                     e.stopPropagation();
    //                     let imageUrl = $('.mfp-img').attr('src');
    //                     let activeSlideIndex = data.image_urls.indexOf(imageUrl); 
    //                     let filename = data.all_image_names[activeSlideIndex].replace('.aff', '') + ".jpg";
    //                     downloadImage(imageUrl, filename);
    //                 });
    //             },
    //             close: function() {
    //                 $('.mfp-figure').off('click');
    //                 $('body').off('click', '.lightbox-download-btn'); // Unbind the download button delegate event
    //             }
    //         }
    //     }, index);
    // }
    
    // function downloadImage(url, filename) {
    //     fetch(url)
    //         .then(response => response.blob())
    //         .then(blob => {
    //             const link = document.createElement('a');
    //             link.href = URL.createObjectURL(blob);
    //             link.download = filename;
    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //         });
    // }
    
    // function downloadCurrentImage() {
    //     let activeSlide = $(placeholder).slick('slickCurrentSlide');
    //     let currentImageUrl = data.image_urls[activeSlide];
    
    //     let filename = data.all_image_names[activeSlide].replace('.aff', '') + ".jpg";
    
    //     downloadImage(currentImageUrl, filename);
    // }
    
    // const createImageContainer = (url, hoverText) => {
    //     let containerDiv = document.createElement('div');
    //     containerDiv.className = "image-container";
    
    //     let anchorElem = document.createElement('a');
    //     anchorElem.href = url;
    //     anchorElem.className = "image-popup";
    //     anchorElem.target = "_blank";
    
    //     anchorElem.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const index = data.image_urls.indexOf(url);
    //         openLightboxAt(index);
    //     });
    
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
    
    //     if (data.image_urls.length > 1) {
    //         initCarousel();
    
    //         let downloadButton = document.createElement('a');
    //         downloadButton.href = "#";
    //         downloadButton.textContent = "Download";
    //         downloadButton.className = "btn";
    //         downloadButton.id = "download-button";
    
    //         downloadButton.addEventListener('click', function(e) {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             downloadCurrentImage();
    //         });
    
    //         placeholder.appendChild(downloadButton);
    
    //     } else if (data.image_urls.length === 1) {
    //         $(placeholder).find('.image-popup').on('click', function(e) {
    //             e.preventDefault();
    //             openLightboxAt(0);
    //         });
    //     }
    
    // } else {
    //     destroyCarousel();
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    // }
    const FALLBACK_IMAGE_URL = "/static/Images/ErrorImage.JPG";

    function handleImageErrorWithAlterations(imgElem, originalUrl) {
        let alteredUrls = generateAlteredUrls(originalUrl);
        tryNextUrl(imgElem, alteredUrls, originalUrl);
    }
    
    function generateAlteredUrls(originalUrl) {
        let alteredUrls = [];
        const charactersToTry = "6543210"; // Starts at 6 and ends at 0
    
        for (let i = 0; i < charactersToTry.length; i++) {
            const alteredUrl = originalUrl.slice(0, -1) + charactersToTry[i];
            alteredUrls.push(alteredUrl);
        }
    
        return alteredUrls;
    }
    
    function tryNextUrl(imgElem, urls, originalUrl) {
        if (urls.length === 0) {
            // All URL alterations failed, use fallback
            imgElem.src = FALLBACK_IMAGE_URL;
            return;
        }
    
        const nextUrl = urls.shift();
        imgElem.onerror = function() { tryNextUrl(imgElem, urls, originalUrl); };
        imgElem.src = nextUrl;
    
        // Update data model
        const index = data.image_urls.indexOf(originalUrl);
        if (index !== -1) {
            data.image_urls[index] = nextUrl;
        }
    }
    
    let placeholder = document.querySelector('#image-placeholder');
    
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
        // Use direct mapping of data.image_urls for the lightbox items
        $.magnificPopup.open({
            items: data.image_urls.map(image => {
                let treatment = data.treatment[image] || "";  
                let title = '<a href="#" class="lightbox-download-btn">Download</a>';
                if (treatment && treatment !== "None") {
                    title = treatment + ' ' + title;
                }
                return {
                    src: image,
                    title: title
                };
            }),
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
                        let activeSlideIndex = data.image_urls.indexOf(imageUrl); 
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
    
    function downloadCurrentImage() {
        let activeSlide = $(placeholder).slick('slickCurrentSlide');
        let currentImageUrl = data.image_urls[activeSlide];
    
        let filename = data.all_image_names[activeSlide].replace('.aff', '') + ".jpg";
    
        downloadImage(currentImageUrl, filename);
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
