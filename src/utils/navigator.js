export function getLocation(position) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position, showError, {
            maximumAge: 15000,
            timeout: 50000,
            enableHighAccuracy: false
        })
    } else {
        alert('Geolocation is Not Supported by this browser');
    }
}

function showError(coordsError) {
    switch (coordsError.code) {
        case coordsError.PERMISSION_DENIED: {
            alert('Enable the location permission for accurate result')
        } break;
        case coordsError.POSITION_UNAVAILABLE: {
            alert('Location information is unavailable')
        } break;
        case coordsError.TIMEOUT: {
            alert('The request timeout')
        } break;
        case coordsError.UNKNOWN_ERROR: {
            alert('Unknown error occurred')
        }
    }
}