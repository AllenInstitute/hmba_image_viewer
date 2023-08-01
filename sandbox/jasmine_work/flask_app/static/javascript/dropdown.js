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

    // If the image_url is not 'None', add or update the image
    if (data.image_url !== 'None') {
        let imgElem = document.querySelector('img[data-key="image_url"]');
        let placeholder = document.querySelector('#image-placeholder');
        if (!imgElem) {
            // Create a new image element if it doesn't exist
            imgElem = document.createElement('img');
            imgElem.dataset.key = "image_url";
            imgElem.alt = "Specimen image";
            imgElem.height = "550";
        }
        // Update the image source
        imgElem.src = data.image_url;

        // Append the image to the placeholder div
        placeholder.appendChild(imgElem);
    } else {
        // If there is no image for the specimen, remove the existing image if it exists
        if (imgElem) {
            imgElem.remove();
        }
    }

}


