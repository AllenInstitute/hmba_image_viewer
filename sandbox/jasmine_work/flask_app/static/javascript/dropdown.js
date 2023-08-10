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

    let placeholder = document.querySelector('#image-placeholder');

    // Function to initialize the carousel
    function initCarousel() {
        $(placeholder).slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    }

    // Function to destroy the carousel if it exists
    function destroyCarousel() {
        if ($(placeholder).hasClass('slick-initialized')) {
            $(placeholder).slick('unslick');
        }
    }

    if (data.image_urls !== 'None') {
        destroyCarousel(); // Destroy any existing carousel
        while (placeholder.firstChild) {
            placeholder.firstChild.remove();
        }
        
        if (Array.isArray(data.image_urls)) {
            for (let url of data.image_urls) {
                let anchorElem = document.createElement('a');
                anchorElem.href = url;
                anchorElem.target = "_blank";
        
                let imgElem = document.createElement('img');
                imgElem.alt = "Specimen image";
                imgElem.style.height = "550px"; 
                imgElem.src = url;
        
                anchorElem.appendChild(imgElem);
                placeholder.appendChild(anchorElem);
            }
        
            // Only initialize the carousel if there's more than one image.
            if (data.image_urls.length > 1) {
                initCarousel();
            }
        } else {
            let anchorElem = document.createElement('a');
            anchorElem.href = data.image_urls;
            anchorElem.target = "_blank";
        
            let imgElem = document.createElement('img');
            imgElem.alt = "Specimen image";
            imgElem.style.height = "550px";
            imgElem.src = data.image_urls;
        
            anchorElem.appendChild(imgElem);
            placeholder.appendChild(anchorElem);
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
