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

    // attempt to have each image open into new tab when clicked 
    // let placeholder = document.querySelector('#image-placeholder');

    // // If the image_url is not 'None', add or update the image
    // if (data.image_urls !== 'None') {
    //     // First, clear any previous images
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    //     // If data.image_url is an array
    //     if (Array.isArray(data.image_urls)) {
    //         // Loop through each URL in the array
    //         for (let url of data.image_urls) {
    //             // Create a new anchor element
    //             let anchorElem = document.createElement('a');
    //             anchorElem.href = url; // Set the href of the anchor to the image URL
    //             anchorElem.target = "_blank"; // Open link in a new tab

    //             // Create a new img element for each URL
    //             let imgElem = document.createElement('img');
    //             imgElem.alt = "Specimen image";
    //             imgElem.height = "550";
    //             imgElem.src = url; // Set the source of the image to the URL

    //             // Append the img element to the anchor
    //             anchorElem.appendChild(imgElem);

    //             // Append the anchor element to the placeholder
    //             placeholder.appendChild(anchorElem);
    //         }
    //     } else {
    //         // If data.image_url is a single string
    //         let anchorElem = document.createElement('a');
    //         anchorElem.href = data.image_urls; // Set the href of the anchor to the image URL
    //         anchorElem.target = "_blank"; // Open link in a new tab

    //         // Create a new img element
    //         let imgElem = document.createElement('img');
    //         imgElem.alt = "Specimen image";
    //         imgElem.height = "550";
    //         imgElem.src = data.image_urls; // Set the source of the image to the URL

    //         // Append the img element to the anchor
    //         anchorElem.appendChild(imgElem);

    //         // Append the anchor element to the placeholder
    //         placeholder.appendChild(anchorElem);
    //     }
    // } else {
    //     // If there is no image for the specimen, remove the existing image if it exists
    //     while (placeholder.firstChild) {
    //         placeholder.firstChild.remove();
    //     }
    // }

    // attempt at carousel #2:
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

    if (data.image_urls !== 'None') {
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
                imgElem.style.height = "550px"; // Set height, width will be auto
                imgElem.src = url;

                anchorElem.appendChild(imgElem);
                placeholder.appendChild(anchorElem);
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

        initCarousel(); // Initialize the carousel after appending the images
    } else {
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
