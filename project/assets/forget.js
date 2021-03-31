const form = document.querySelector(".forget-form");
const username = document.querySelector("#username");
const answer = document.querySelector("#answer");
const password = document.querySelector("#password");
const msg = document.querySelector(".msg");

form.addEventListener("submit", reset);

function sanitizer(char) {
	if (char == "<" || 
        char == ">" || 
        char == "/" ||
        char == "\\" ||
        char == "\'" ||
        char == "\"") return true;
    else return false;
};

function reset(e) {
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
        for (let i = 0; i < answer.value.split("").length; i++) {
            if (sanitizer(answer.value.split("")[i])) {
                alert("contains invalid answer input");
                error = 1;
            }
        }
        for (let i = 0; i < password.value.split("").length; i++) {
            if (sanitizer(password.value.split("")[i])) {
                alert("contains invalid password input");
                error = 1;
            }
        }
        //check if the user exist, if the user forget the question, we print the security question of the username
        if (error == 0 && localStorage.getItem(username.value) === null) {
            alert("This user does not exist");
            error = 1;
        } else if (error == 0 && answer.value === "") {
            msg.innerHTML = "";
            msg.innerHTML = "The security question for the account is \"" + JSON.parse(localStorage.getItem(username.value))[1] + "\"";
            error = 1;
        } else if (error == 0 && answer.value !== JSON.parse(localStorage.getItem(username.value))[2]) {
            alert("incorrect answer for security questions");
            error = 1;
        } else if (error == 0 && answer.value == JSON.parse(localStorage.getItem(username.value))[2]) {
            const content = [password.value, JSON.parse(localStorage.getItem(username.value))[1], answer.value, 0]
            localStorage.setItem(username.value, JSON.stringify(content));
            alert("successfully changed the account password");
        }
    }, 1000*time);
}