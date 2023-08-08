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
    // OG image code, will display one image even if there are multiple 
    // let placeholder = document.querySelector('#image-placeholder');
    // let imgElem = placeholder.querySelector('img'); // get image within placeholder

    // // If the image_url is not 'None', add or update the image
    // if (data.image_url !== 'None') {
    //     if (!imgElem) {
    //         // Create a new image element if it doesn't exist
    //         imgElem = document.createElement('img');
    //         imgElem.alt = "Specimen image";
    //         imgElem.height = "550";
    //         placeholder.appendChild(imgElem); // append it to placeholder
    //     }
    //     // Update the image source
    //     imgElem.src = data.image_url[0];
    // } else {
    //     // If there is no image for the specimen, remove the existing image if it exists
    //     if (imgElem) {
    //         imgElem.remove();
    //     }
    // }

    // attempt at displaying multiple images if there are multiple all at once, no carousel
    // let placeholder = document.querySelector('#image-placeholder');

    // // If the image_url is not 'None', add or update the image
    // if (data.image_url !== 'None') {
    //     // First, clear any previous images
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    //     // If data.image_url is an array
    //     if (Array.isArray(data.image_url)) {
    //         // Loop through each URL in the array
    //         for (let url of data.image_url) {
    //             // Create a new img element for each URL
    //             let imgElem = document.createElement('img');
    //             imgElem.alt = "Specimen image";
    //             imgElem.height = "550";
    //             imgElem.src = url; // Set the source of the image to the URL
    //             placeholder.appendChild(imgElem); // Append the img element to the placeholder
    //         }
    //     } else {
    //         // If data.image_url is a single string
    //         let imgElem = document.createElement('img');
    //         imgElem.alt = "Specimen image";
    //         imgElem.height = "550";
    //         imgElem.src = data.image_url; // Set the source of the image to the URL
    //         placeholder.appendChild(imgElem); // Append the img element to the placeholder
    //     }
    // } else {
    //     // If there is no image for the specimen, remove the existing image if it exists
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    // }
    
    let placeholder = document.querySelector('#image-placeholder');
    let carousel = document.querySelector('#carousel');
    let prevButton = document.querySelector('#prev');
    let nextButton = document.querySelector('#next');
    let carouselContainer = document.querySelector('#carousel-container');

    const SCROLL_AMOUNT = 550;

    // If the image_url is not 'None', add or update the image
    if (data.image_url !== 'None') {
        // First, clear any previous images
        while (placeholder.firstChild) {
            placeholder.firstChild.remove();
        }

        // Loop through each URL in the array
        for (let url of data.image_url) {
            let imgElem = document.createElement('img');
            imgElem.alt = "Specimen image";
            imgElem.height = "550";
            imgElem.src = url;
            placeholder.appendChild(imgElem);
        }

        // Only show buttons if there are multiple images
        if (data.image_url.length > 1) {
            prevButton.classList.remove('hide');
            nextButton.classList.remove('hide');
            carouselContainer.style.gap = "10px";

            prevButton.addEventListener('click', function() {
                carousel.scrollLeft -= SCROLL_AMOUNT;
            });

            nextButton.addEventListener('click', function() {
                carousel.scrollLeft += SCROLL_AMOUNT;
            });
        } else {
            prevButton.classList.add('hide');
            nextButton.classList.add('hide');
            carouselContainer.style.gap = "0";
        }
    } else {
        prevButton.classList.add('hide');
        nextButton.classList.add('hide');

        // If there is no image for the specimen, remove the existing image if it exists
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
