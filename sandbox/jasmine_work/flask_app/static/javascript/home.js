function redirectToDonorPage(donorName) {
    var url = "/specimens/" + encodeURIComponent(donorName);
    window.location.href = url;
}
