const form = document.querySelector(".create-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

form.addEventListener("submit", create);

function sanitizer(char) {
	if (char == "<" || 
        char == ">" || 
        char == "/" ||
        char == "\\" ||
        char == "\'" ||
        char == "\"") return true;
    else return false;
};

function create(e) {
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
        for (let i = 0; i < question.value.split("").length; i++) {
            if (sanitizer(question.value.split("")[i])) {
                alert("contains invalid security question input");
                error = 1;
            }
        }
        for (let i = 0; i < answer.value.split("").length; i++) {
            if (sanitizer(answer.value.split("")[i])) {
                alert("contains invalid answer input");
                error = 1;
            }
        }
        //check existance
        if (error == 0 && localStorage.getItem(username.value) !== null) {
            alert("already exist username, please change");
            error = 1;
        } else if (error == 0) {
            const content = [password.value, question.value, answer.value, 0]
            //here 0 represents number of wrong attemps
            localStorage.setItem(username.value, JSON.stringify(content));
            alert("successfully created an account");
        }
    }, 1000*time);
}