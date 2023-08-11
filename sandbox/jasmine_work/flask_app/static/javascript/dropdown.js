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
    // hover is skewed for nissl treatment images that come after blockface images bc shown in order
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
    // }
    
    // const createImageContainer = (url, hoverText) => {
    //     let containerDiv = document.createElement('div');
    //     containerDiv.className = "image-container";
    
    //     let anchorElem = document.createElement('a');
    //     anchorElem.href = url;
    //     anchorElem.target = "_blank";
    
    //     let imgElem = document.createElement('img');
    //     imgElem.alt = "Specimen image";
    //     imgElem.style.height = "550px"; 
    //     imgElem.src = url;
    //     imgElem.onerror = function() { handleImageError(imgElem); };
    
    //     anchorElem.appendChild(imgElem);
    //     containerDiv.appendChild(anchorElem);
    
    //     if (hoverText) {  // Only append the overlay if there's hover text
    //         let overlayDiv = document.createElement('div');
    //         overlayDiv.className = "image-overlay";
    //         overlayDiv.innerHTML = hoverText;
    //         containerDiv.appendChild(overlayDiv);
    //     }
    
    //     return containerDiv;
    // };
    
    // if (data.image_urls !== 'None') {
    //     destroyCarousel(); // Destroy any existing carousel
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    
    //     if (Array.isArray(data.image_urls)) {
    //         for (let i = 0; i < data.image_urls.length; i++) {
    //             let hoverData = data.treatment[i] && data.treatment[i] !== "None" ? data.treatment[i] : ""; 
    //             placeholder.appendChild(createImageContainer(data.image_urls[i], hoverData));
    //         }
    
    //         // Only initialize the carousel if there's more than one image.
    //         if (data.image_urls.length > 1) {
    //             initCarousel();
    //         }
    //     } else {
    //         // For the single image case, check the first treatment if it exists
    //         let hoverData = data.treatment && data.treatment[0] !== "None" ? data.treatment[0] : ""; 
    //         placeholder.appendChild(createImageContainer(data.image_urls, hoverData));
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
    }
    
    function destroyCarousel() {
        if ($(placeholder).hasClass('slick-initialized')) {
            $(placeholder).slick('unslick');
        }
    }
    
    const createImageContainer = (url, hoverText) => {
        let containerDiv = document.createElement('div');
        containerDiv.className = "image-container";
    
        let anchorElem = document.createElement('a');
        anchorElem.href = url;
        anchorElem.target = "_blank";
    
        let imgElem = document.createElement('img');
        imgElem.alt = "Specimen image";
        imgElem.style.height = "550px"; 
        imgElem.src = url;
        imgElem.onerror = function() { handleImageError(imgElem); };
    
        anchorElem.appendChild(imgElem);
        containerDiv.appendChild(anchorElem);
    
        if (hoverText && hoverText !== "None") {  // Only append the overlay if there's hover text and it's not "None"
            let overlayDiv = document.createElement('div');
            overlayDiv.className = "image-overlay";
            overlayDiv.innerHTML = hoverText;
            containerDiv.appendChild(overlayDiv);
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
    
        // Only initialize the carousel if there's more than one image.
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
