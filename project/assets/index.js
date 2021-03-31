const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");


form.addEventListener("submit", login);

function sanitizer(char) {
	if (char == "<" || 
        char == ">" || 
        char == "/" ||
        char == "\\" ||
        char == "\'" ||
        char == "\"") return true;
    else return false;
};

function login(e) {
    e.preventDefault();
    //avoid timing attacks => wait for a short but random time
    let time = Math.random();
    setTimeout(() => {
        //sanitization
        let error = 0;
        for (let i = 0; i < username.value.split("").length; i++) {
            if (sanitizer(username.value.split("")[i])) {
                alert("contains invalid username input");
                error = 1;
            }
        }
        for (let i = 0; i < password.value.split("").length; i++) {
            if (sanitizer(password.value.split("")[i])) {
                alert("contains invalid password input");
                error = 1;
            }
        }
        //check attemps && if it exists
        if (error == 0 && localStorage.getItem(username.value) === null) {
            alert("This user does not exist or the password is incorrect");
            error = 1;
        } else if (error == 0 && JSON.parse(localStorage.getItem(username.value))[3] >= 10) {
            alert("exceeding maximum attemps, please use forget to reset the password")
            error = 1;
        } else if (error == 0 && JSON.parse(localStorage.getItem(username.value))[0] != password.value) {
            alert("This user does not exist or the password is incorrect");
            //update attemps
            const content = [JSON.parse(localStorage.getItem(username.value))[0], JSON.parse(localStorage.getItem(username.value))[1],JSON.parse(localStorage.getItem(username.value))[2], JSON.parse(localStorage.getItem(username.value))[3]+1]
            localStorage.setItem(username.value, JSON.stringify(content));
            error = 1;
        } else if (error == 0) {
            //reset attemps
            const content = [JSON.parse(localStorage.getItem(username.value))[0], JSON.parse(localStorage.getItem(username.value))[1],JSON.parse(localStorage.getItem(username.value))[2], 0]
            localStorage.setItem(username.value, JSON.stringify(content));
            alert("successfully logged in");
        }
    }, 1000*time);
}
