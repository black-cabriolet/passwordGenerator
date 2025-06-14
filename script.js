//Get the input field wher the password will be displayed
const passWordBox = document.getElementById('password');
//Generator button
const generatorButton = document.getElementById('generator');
//Copy button
const copy = document.getElementById("copyIcon")
const body = document.body;
const toggleButton = document.getElementById('toggle');


function shuffle(str){
    return [...str].sort(()=> Math.random()-o.5).join('');
}
//Function to create a secure ,random password
/**
 * Function: createPassword
 * Purpose: Generate a secure password that contains a mix of:
 *   - at least one uppercase letter
 *   - at least one lowercase letter
 *   - at least one number
 *   - at least one symbol
 *   - fills the rest with random characters from all categories
 */
function createPassword(){
    const length = parseInt(document.getElementById("length").value) || 12;

    const includeUpper = document.getElementById('useUpper').checked;
    const includeLower = document.getElementById('useLower').checked;
    const includeNumbers = document.getElementById("useNumbers").checked;
    const includeSymbols = document.getElementById("useSymbols").checked;

    //Define character sets
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";


    let allChars = "";
    let password = "";
    //Ensure at least one of each selected type
    if (includeUpper){
        allChars += upperCase;
        password += upperCase[Math.floor(Math.random() * upperCase.length)];
    }
    if (includeLower) {
        allChars += lowerCase;
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    }

    if (includeNumbers) {
        allChars += numbers;
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }

    if (includeSymbols) {
        allChars += symbols;
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    if (allChars.length === 0) {
        alert("Please select at least one character type.");
        return;
    }


    // ✅ Fill the remaining characters with random picks from allChars
    while(password.length < length){
        password += allChars[Math.floor(Math.random()* allChars.length)];
    }
    // ✅ Set the generated password in the input box or display element
    passWordBox.value = shuffle(password);
}
generatorButton.addEventListener('click', createPassword);

function copyPassword(){
    passWordBox.select();
    document.execCommand("copy")
}
copy.addEventListener('click', copyPassword)

function themeToggle(){
    body.classList.toggle('light-mode')
    if(body.classList.contains('light-mode')){
        localStorage.setItem('theme', 'light')
        document.getElementById('icon').src='images/blackcopy.png';
    }else{
        localStorage.setItem('theme', 'dark')
        document.getElementById('icon').src='images/whitecopy.png';
    }
}
toggleButton.addEventListener("click", themeToggle);
function setThemeFromLocalStorage(){
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'light'){
        body.classList.add('light-mode')
    }else{
        body.classList.remove('light-mode')
    }
}
setThemeFromLocalStorage()
function applySystemThemePreference(){
    if(!localStorage.getItem('theme')){
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches){
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'dark');
        }else{
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark')
        }
    }
}
applySystemThemePreference()