import React from "react";

const getCookie = (name) => {
    const cookieValue = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(`${name}=`));

    if (cookieValue) {
        return decodeURIComponent(cookieValue.split('=')[1]);
    }
    return null;
};

export default getCookie;

// const token = getCookie('jwt'); // Get the 'jwt' token from the cookie
// if (token) {
//     // You have the token, you can use it for your purposes
//     console.log('Token:', token);
// } else {
//     console.log('Token not found.');
// }
