const nameRegex = /[a-zA-Z\- ]+/;
const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
const dateTimeRegex =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4}) ([01][0-9]|2[0-3]):([0-5][0-9])$/;

export const showErrorAlert = (message = "") => {
    Swal?.fire({
        title: "Error!",
        text: message,
        icon: "error",
    });
};

export const showSuccessAlert = (message = "") => {
    Swal?.fire({
        title: "Success!",
        text: message,
        icon: "success",
    });
};

export const nameValid = (name = "") => nameRegex.test(name);
export const emailValid = (email = "") => emailRegex.test(email);
export const dateTimeValid = (dateTime = "") => dateTimeRegex.test(dateTime);
