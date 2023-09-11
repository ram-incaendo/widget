console.log("Widget loaded..");
let count = 1;
let name = "";
let email = "";
let surname = "";
let widgetInfo = {};

const showError = (input) => {        
    const formField = input;
    formField.classList.remove('success');
    formField.classList.add('error');
};

const showSuccess = (input) => {            
    const formField = input;
    
    formField.classList.remove('error');
    formField.classList.add('success');       
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(re);
};

function checkFirstName(firstName){
    let valid = false;
    
    if(firstName.value.trim() == ''){
        showError(firstName);
    }else{
        showSuccess(firstName);
        valid = true;
    }
    return valid;
}

function checkLastName(lastName){
    let valid = false;
    
    if(lastName.value.trim() == ''){
        showError(lastName);
    }else{
        showSuccess(lastName);
        valid = true;
    }
    return valid;
}

function checkEmail(email){
    let valid = false;        
    
    if(email.value.trim() == ''){
        showError(email);
    }else if(!isEmailValid(email.value.trim())){
        showError(email);
    }else{
        showSuccess(email);
        valid = true;
    }
    return valid;
}

function updateEmail(frmCount) {
document.getElementsByClassName("first-modal")[frmCount].style.display = "block";
document.getElementsByClassName("api-err")[frmCount].innerHTML = ``;
document.getElementsByClassName("second-modal")[frmCount].style.display = "none";
}
function couponFunction() {
count++;
if (count % 2 === 0) {
    document.getElementById(
    "couponFunc-icon"
    ).innerHTML = `<svg id="couponFunc-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H9C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5H3Z" fill="black"/>
    </svg>
    `;
    document.getElementById("coupon-tab").style.display = "block";
    document.getElementById("coupon-tab").style.marginBottom = "14px";
} else {
    document.getElementById(
    "couponFunc-icon"
    ).innerHTML = `<svg id="couponFunc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="16" height="16" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_1502_59653" transform="scale(0.0111111)"/>
    </pattern>
    <image id="image0_1502_59653" width="90" height="90" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEo0lEQVR4nO2dz29VRRTHP9BqnylBDC6gNQFEyw4JWzGSAm7FBZgI7ERN0Kgx4NbEjYkb0oS/wD/ARBcYCbpwgTEYqGyABRjDD5UfrQqxD/taF+dhzPNePPP73ul8kpOXNHPfnPlm3tyZc2amUCgUCoVCoVAoFAoNZVlqByoYArYCm4FNwATwJDAKPNb/BLgLzPQ/LwEXgIvANHAG6EX1uiU8AbwDfA78Biw62izwGfA2MB6xHY3kEeAAcALpfa7i1tk88CWwH+hEaVlDWIH0tKuEE7fOfgU+AB4N3sqEPAQcBm4RX+BBuwW81/cpK54DzpFe4EE7D+wM2O5odIBjwALpRa2zBWAKGAmkQXDWA9+SXkitfQ88FUSJgOzEzzQtts0CkwH0CMJLwJ+kF83WusDL3lXxzGuEnRPHsh5w0LM23tiNLA5Si+RT7L1eFfLAJDBHenF8Wxd4waNOTjxNO198WpsFNnpTy5IRZFqUWozQdprE8+xjFU6Fsi6yhF/btyP9v8Wqf8qTZsY8T9wV35EKH96PWP8CsM1aLUuGkQB7rEYuIr14kDWRfThH5EDU4QCN+D+rI7Yf7xqrZckK4GaEBjVV6Jt9DYxYbvoAcAhYbfFcLqwGXg9dSQe4Rvxe1KQevQhcR1Jxakx79F6qX0pLjTVI8EyNqdAHDMvnTDAtxkkbNKojlT89DLYymPToPcjmloKwHIPhw0ToHea+ZI86G6PdEjaEzB9XWbnjhzpfHzSshGYWeBzF9jNtj95KWpGbyipgi6agVuhn7H3Jns2aQlqhJxwcyR2VNlqhNzk4kjsqbbRCr3dwJHc2aApphV7p4Mg9JGg/hswcbK0Ol+8cQ5IH9xza53VnqktYtCoz0jRcMjU3fDrikptrQxDKJVMzp6nAJh5tShPPyQwSPLSgFfoPhzraEPFz8dFFm/9wGfufVhcZA8d8OuSJ+y9Dl6Hxkk+HYme8q6yO1H6d0QioHTp+VJZbilzWFNIKfcHBkdxRaVOEdser0D84OJI7Km1K4N8N74H/HvCNi0eZ8jXKw/0mK8OTdr5kjVoTk+XxGPAT6TLhTRs6esitDD9rCpv06GvAVzYeZcoJlCKDeVDpE8PyORNUiw5prn9o2hI8+CbHOeCo4TM58jFyOjgoo0hWYan26Ggb0e8CH1k8lwsfAndiVTYMnCVuT6qKZ49H9sH6sJBtKmseeIsH/6R9U5UFiZm9WQTeAP6KWOc/TBGvN/07U+MjM2JqSScBI8jx3Zg/3xT2HfCwJ82s2YhEsVKLEcpmUO5GisF22n3rTJ11gV0edfLCi+R3Mcoerwp55CB5XPUzD7zqWRvv7Kbdw8gcDbzip45J2vmCnEHeN61iHXCK9OJp7TQNuNLHlhFkUdP0KzOP0oB5sg+20YxtZYM2DTwbsN1JGEYuFUkRYh20G8gd1sNBW5yYUaSRV4gv8C/IRd0uR0VaRwfYB3xB2IXOPHAceIUldvV8FWuBN4FPgdu4i3u7/12HkGMTyWnisYch5KTuFuSw5AQS1FmJbEm7n0a6g8zVf0e2zl5ENhxO9638e5BCoVAoFAqFQqFQ0PA32oAL4Nvgw4gAAAAASUVORK5CYII="/>
    </defs>
    </svg>`;
    document.getElementById("coupon-tab").style.display = "none";
    document.getElementById("coupon-tab").style.marginBottom = "0px";
}
}
async function handleButton(nameOption, surnameOption, couponOption, frmCount, idOfWidget = "") {  
let campaign = "";
const widgetId = widgetInfo.widgetID;
const nameOfHost = widgetInfo.hostName;
const params = window.location.search.substr(1).split("&");
for (const param of params) {
    const splitParam = param.split("=");
    if (
    typeof splitParam[0] !== "undefined" &&
    splitParam[0] === "utm_campaign" &&
    typeof splitParam[1] !== "undefined"
    ) {
    campaign = splitParam[1];
    }
}

let utmSource, utmMedium, utmCampaign, utmContent, utmTerm;

const queryParams = {};
const url = window.location.search;
const searchParams = new URLSearchParams(url);
searchParams.forEach((value, key) => {
    queryParams[key] = value;
});

let utmURL = '';

if (typeof queryParams.utm_medium !== 'undefined') {
    utmMedium = queryParams.utm_medium;
    utmURL += '&utmMedium='+utmMedium;
}
if (typeof queryParams.utm_content !== 'undefined') {
    utmContent = queryParams.utm_content;
    utmURL += '&utmContent='+utmContent;
}
if (typeof queryParams.utm_term !== 'undefined') {
    utmTerm = queryParams.utm_term;
    utmURL += '&utmTerm='+utmTerm;
}
if (typeof queryParams.utm_campaign !== 'undefined') {
    utmTerm = queryParams.utm_campaign;
    utmURL += '&utmCampaign='+utmTerm;
}    
    
name = nameOption === 1 ? document.getElementsByClassName("input-name")[frmCount].value.trim() : '';
email = document.getElementsByClassName("input-email")[frmCount].value.trim();
surname = surnameOption === 1 ? document.getElementsByClassName("input-surname")[frmCount].value.trim() : '';
couponCode = couponOption === 1 ? document.getElementById("coupon").value.trim() : '';

let isFirstnameValid = checkFirstName(document.getElementsByClassName("input-name")[frmCount]),
isLastnameValid = checkLastName(document.getElementsByClassName("input-surname")[frmCount]),
isEmailValid = checkEmail(document.getElementsByClassName("input-email")[frmCount]);

let isFormValid = isFirstnameValid &&
isLastnameValid &&
isEmailValid;

if(isFormValid){
    let apiResp;
    const userData = {
        action: "signup",
        email: email,
        nicename: name,
        surName: surname,
        campaign: campaign,
    };

    if (couponCode !== '') userData.couponCode = couponCode;
    
    let authURL = `https://api.goodmorningitalia.it/auth?utm_referral=${widgetId}&utm_source=gmi&utm_campaign=${campaign}&utm_name=${nameOfHost}`;

    if(utmURL !== ''){
        authURL += utmURL;
    }
        
    const response = await fetch(
        authURL,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        }
    )
        .then((res) => res.json())
        .then((result) => {
        const hasKey = "msg" in result;
        if (hasKey) {
            apiResp = result.msg;
        } else {
            apiResp = result.message;
        }
        });
    if (apiResp && apiResp.toLowerCase() === "success") {
        document.getElementsByClassName("first-modal")[frmCount].style.display = "none";
        document.getElementsByClassName("second-modal")[frmCount].style.display = "block";
        document.getElementsByClassName("second-modal")[frmCount].innerHTML = `<h2>Controlla la tua email</h2>
        <p>Completa la registrazione verificando il tuo profilo dalla email che ti abbiamo inviato a  <b>${email}</b>.</p>
        <p>Non hai ricevuto l’email? Inviala di nuovo o <a href="javascript:updateEmail(${frmCount});" ><b>Aggiorna il tuo indirizzo email</b></a></p>
        <p>Sei già registrato? <a href="https://app.goodmorningitalia.it/login"><b>Fai il login qui</b></a></p>
        </div>`;
    }
    if (apiResp.toLowerCase() === "undefined") {
        document.getElementsByClassName("api-err")[frmCount].innerHTML = ``;
    } else {
        document.getElementsByClassName("api-err")[frmCount].innerHTML = `* ${apiResp}`;
    }
}

}
function ValidateEmail(input) {
var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

if (input.match(validRegex)) {
    return true;
} else {
    return false;
}
}
function emailFunc(nameOption, surnameOption, couponOption) {
const name = nameOption === 1 ? document.getElementById("name").value : '';
const inputEmail = document.getElementById("email").value;
const email = ValidateEmail(inputEmail);
if (inputEmail === "") {
    document.getElementById("hiding-email-msg").style.display = "block";
}
if (inputEmail.length) {
    document.getElementById("hiding-email-msg").style.display = "none";
}
if (inputEmail.length && !email) {
    document.getElementById(
    "hiding-email-msg"
    ).innerHTML = `* please enter valid email address`;
    document.getElementById("hiding-email-msg").style.display = "block";
}
if (email) {
    document.getElementById("hiding-email-msg").style.display = "none";
}
if ((nameOption && name === "") || inputEmail === "") {
    document.getElementById("free-trial").style.backgroundColor =
    "rgba(0, 0, 0, 0.2)";
}
if (nameOption && name.length && inputEmail.length && email) {
    const elem = document.getElementById("free-trial");
    document.getElementById("free-trial").style.backgroundColor = "black";
}
if (!nameOption && inputEmail.length && email) {
    const elem = document.getElementById("free-trial");
    document.getElementById("free-trial").style.backgroundColor = "black";
}
}
function myFunc(nameOption, surnameOption, couponOption) {
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
if (name.length & email.length) {
    const elem = document.getElementById("free-trial");
    document.getElementById("free-trial").style.backgroundColor = "black";
}
if (name === "") {
    document.getElementById("hiding-name-msg").style.display = "block";
}
if (name.length) {
    document.getElementById("hiding-name-msg").style.display = "none";
}
if (name === "" || email === "") {
    document.getElementById("free-trial").style.backgroundColor =
    "rgba(0, 0, 0, 0.2)";
}
}
const couponDetails = async () => {
const couponCode = document.getElementById("coupon").value;
const response = await fetch("http://api.goodmorningitalia.it/coupon-types?$limit=50");
const myJson = await response.json();
const coupon = myJson.data;
const couponPrefix = couponCode.substring(0, 4);
let couponType = coupon.find(
    (coupon) => coupon.prefix.toLowerCase() === couponPrefix.toLowerCase()
);
const imageUrl = couponType.metadata.logo_uri;
if (couponCode.length !== 0) {
    document.getElementById("coupon-tab").innerHTML = `<div class="coupon-tab1">
<span class="icon select-business-icon" style="background-image: url(${imageUrl});">&nbsp;&nbsp;&nbsp;&nbsp;</span> 
            <input type='text' name='coupon' id='coupon' value=${couponCode} onKeyup=couponCodeFunc()>
        <div class="coupon-tab2" onClick="couponDetails()"><button id='add-button1'>ADD</button></div></div><div id='coupon-resp' style="color:black; display:block"></div>`;
    document.getElementById(
    "coupon-resp"
    ).innerHTML = `<div id='close-tab' style="display:flex;justify-content: space-between;">
<div style="padding-top:1em;"><b>${couponType.short_description}</b></div>
<div id='close-icon' onClick='closeFunc()'><?xml version="1.0" ?><svg height="48" viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg></div>
</div>`;
}
};
function emailClickFunc() {
document.getElementById("api-error-msg").innerHTML = ``;
}
const closeFunc = () => {
const couponCode = document.getElementById("coupon").value;
document.getElementById("close-tab").style.display = "none";
if (couponCode !== "") {
    document.getElementById("coupon-resp").style.display = "none";
}
};
function couponFunction1() {
const couponLength = document.getElementById("coupon").value;
if (couponLength !== "") {
    document.getElementById("add-button");
}
}
function couponCodeFunc() {
const couponCodeValue = document.getElementById("coupon").value;
if (couponCodeValue.length === 0) {
    document.getElementById("default-coupon").innerHTML = ` 
    <span class="icon select-business-icon" style="background-image: url("./assets/square.png");">&nbsp;</span> 
    
`;
    document.getElementById("coupon-resp").style.display = "none";
} else {
    document.getElementById("add-button1").style.backgroundColor = "black";
}
}
function myFunc1() {
const data1 = document.getElementById("coupon-button");
data1.innerHTML = `<button style="background-color:black;">ADD</button>`;
}
window.onload = async (event) => {
console.log("Window onload event called..");
const window = event.target;        
const elements = window.querySelectorAll('[data-widgetid]');

await elements.forEach(async (element) => {           
    const idOfWidget = element.getAttribute('data-widgetid');
    const idOfForm = parseInt(element.getAttribute('data-formid'));
    console.log("Loading form for widget id "+idOfWidget+" and form "+idOfForm);    
    
const statusObject = {
    "active": 1,
    "inactive": 0
}
console.log("Calling widget api for widget id "+idOfWidget);
const widgetData = await fetch(
    `https://api.goodmorningitalia.it/widget?widget_id=${idOfWidget}`,

    {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        cert: 'admin',
        platform: 'ops'
    },
    }
).then(res => res.json()).then(result => {
    console.log("Call to widget api for widget id "+idOfWidget+" called successfully!");
    return result.data[0];
})
const widgetMeta = JSON.parse(widgetData.widget_meta);
const statusOfWidget = statusObject[widgetData.status];
const nameOption = statusObject[widgetMeta.should_name_mount];
const surnameOption = statusObject[widgetMeta.should_surname_mount];
const couponOption = statusObject[widgetMeta.should_coupon_mount];
const hostName = widgetData.host_name;
widgetInfo = {
    widgetID: idOfWidget,
    hostName,
}
element.innerHTML = statusOfWidget ? `<div id="first-modal" class="first-modal" style="display:block;"><div class="form-trial w-form">
<form id="wf-form-Trial-form" name="wf-form-Trial-form" data-name="Trial form" method="post" class="formformform" aria-label="Trial form">
    <div class="grid-1-1 form">
        <input type="text" class="campo w-input input-name" maxlength="256" name="Name-form" data-name="Name form" placeholder="Nome..." id="name" required>                
        <input type="text" class="campo w-node-_6e48be95-97ba-b3f5-451e-82c491c607da-91c607d6 w-input input-surname" maxlength="256" name="Cognome-form" data-name="Cognome form" placeholder="Cognome..." id="surname" required>
    </div>
    <div class="grid-2-1">
        <input type="email" class="campo w-input input-email" maxlength="256" name="Mail-form" data-name="Mail form" placeholder="La tua email..." id="email" required>
        <div id="w-node" class="submit-flex" onclick="handleButton(1, 1, 0, ${idOfForm})">
            <input type="button" id="free-trial" value="Provalo ora" data-wait="Un istante..." class="submit test w-button">
            <div class="postilla">Unisciti a migliaia di lettori soddisfatti</div></div>
        </div>
    </form>
    <div id="api-error-msg" class="api-err" style="color: red; margin-bottom: 1em;font-size:13px;"></div>
    <div class="successo w-form-done" tabindex="-1" role="region" aria-label="Trial form success">
    <div class="testo16">Grazie! La prova gratuita è stata avviata con successo.</div>
</div>
<div class="errore w-form-fail" tabindex="-1" role="region" aria-label="Trial form failure"><div>Qualcosa non ha funzionato.<br>Riprova, oppure contattaci a support@goodmorningitalia.it</div></div></div></div><div id="second-modal" class="second-modal"></div>`:'';        
});                
};
