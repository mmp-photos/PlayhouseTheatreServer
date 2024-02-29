export const classRegistration = (registration) => {
    const registration_status = 0;
    if(registration === "true"){ 
        registration_status = 1
        return registration_status;
    }
    return registration_status;
};