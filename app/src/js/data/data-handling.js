import jQuery from 'jquery';

export const handleData = (
    method,
    url,
    successCallback = () => {},
    errorCallback = () => {}
) => {
    jQuery.ajax({
        method,
        url,
        success: successCallback,
        error: errorCallback
    })
}