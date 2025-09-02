let loggedIn = false;

export default {

    login(email, password) {

        return new Promise((resolve, reject) => {
            //if (email === "siabdel@gmail.com" && password === "grutil001") {
            if (email === "siabdel@gmail.com" && password === "grutil001") {
                loggedIn = true;
                resolve();

            } else {
                reject();
            }
        });
    },
    
    
    logout() {
        loggedIn = false;
    },
    
    isAuthenticated() {
        return loggedIn;
    }

}