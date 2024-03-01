
const styles = `  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
  .submit {
    display:flex;
    align-items: center;
    width: 100%;
    height: 55px;
    background-color: #f7504d;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
    padding-left: 36px;
    padding-right: 36px;
    font-family: Suisseintl, sans-serif;
    font-size: 15px;
    font-weight: 700;
    transition: all .15s;
}

  .error {
    border: 1px solid red;
}
  .submit{
  
  }
  .success-msg{
    display:flex;
    padding:12px 20px;
    color: #155724;
    border-radius: 4px;
    border: 1px solid #C3E6CB;
    background: #D4EDDA;
  }
  .disable-btn{
    padding-top:5px;
    padding-left:8px;

    color:red;
    background-color:black;
  }
  .api-err{

    display: flex;
    padding:12px 20px;
    border-radius: 4px;
    border: 1px solid #F5C6CB;
    background: #F8D7DA;
    color:#721C24;
  }
  `;
let count = 1;
        let name = "";
        let email = "";
        let surname = "";
        let widgetInfo = {};
        let disabled =  false;
        if(window.location.search !== ''){
            localStorage.setItem('url',window.location.search);
        }

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

        function checkValidName(firstName, frmCount){
            console.log(firstName, 'firstName');
            let valid = false;
            
            if(firstName.value.trim() == ''){
                document.getElementsByClassName('button-text')[frmCount].style.paddingTop = '0px';
                document.getElementsByClassName('btn-sub')[frmCount].style.backgroundColor = '#f7504d';
                document.getElementsByClassName('btn-sub')[frmCount].style.paddingLeft = '36px';
                document.getElementsByClassName('spinner-border')[frmCount].style.display = 'none';
                showError(firstName);
            }else{
                showSuccess(firstName);
                valid = true;
            }
            return valid;
        }

        function checkEmail(email, frmCount){
            let valid = false;        
            
            if(email.value.trim() == ''){
                document.getElementsByClassName('button-text')[frmCount].style.paddingTop = '0px';
                document.getElementsByClassName('btn-sub')[frmCount].style.backgroundColor = '#f7504d';
                document.getElementsByClassName('btn-sub')[frmCount].style.paddingLeft = '36px';
                document.getElementsByClassName('spinner-border')[frmCount].style.display = 'none';
                showError(email);
            }else if(!isEmailValid(email.value.trim())){
                document.getElementsByClassName('button-text')[frmCount].style.paddingTop = '0px';
                document.getElementsByClassName('btn-sub')[frmCount].style.backgroundColor = '#f7504d';
                document.getElementsByClassName('btn-sub')[frmCount].style.paddingLeft = '36px';
                document.getElementsByClassName('spinner-border')[frmCount].style.display = 'none';
                showError(email);
            }else{
                showSuccess(email);
                valid = true;
            }
            return valid;
        }

        function sanitizeUrlPramas(url) {
            // expecting unwanted character at 1st position to removing
            return `&${url.substring(1, url.length)}`;
        }

        function getUtmSource(url) {
            return !(url.includes('utm_source')) ? `&utm_source='gmi'` : '';
        }

        function updateEmail(frmCount) {
        document.getElementsByClassName("first-modal")[frmCount].style.display = "block";
        document.getElementsByClassName("api-err")[frmCount].style.display = `none`;
        document.getElementsByClassName("second-modal")[frmCount].style.display = "none";
        }


        async function handleButton(nameOption, surnameOption, couponOption,frmCount, idOfWidget = "") { 
            document.getElementsByClassName('spinner-border')[frmCount].style.display = 'block';
            document.getElementsByClassName('api-err')[frmCount].style.display= 'none';
            document.getElementsByClassName('button-text')[frmCount].style.paddingTop = '5px';
            document.getElementsByClassName('btn-sub')[frmCount].style.paddingLeft = '8px';
            document.getElementsByClassName('btn-sub')[frmCount].style.backgroundColor = '#f4aeaa';
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

        let utmSource;

        const queryParams = {};
        let url = window.location.search || localStorage.getItem('url');
        let sanitizedUrl = '';

        if (url) {
            sanitizedUrl = sanitizeUrlPramas(url);
        }
            
        name = nameOption === 1 ? document.getElementsByClassName("input-name")[frmCount].value.trim() : '';
        email = document.getElementsByClassName("input-email")[frmCount].value.trim();
        
        surname = surnameOption === 1 ? document.getElementsByClassName("input-surname")[frmCount].value.trim() : '';
        console.log(document.getElementsByClassName("input-coupon"), 'document.getElementsByClassName("input-coupon")');
        const inputCoupons = document.getElementsByClassName("input-coupon");
        
        const filteredElements = Array.from(inputCoupons).filter(inputCoupon => {
            console.log(inputCoupon, 'input coupon ');
            const dataId = inputCoupon.getAttribute('data-id');
            const dataCount = inputCoupon.getAttribute('data-count');
            console.log(dataId, dataCount, widgetInfo.widgetID);
            return dataId === idOfWidget && dataCount === String(frmCount);
        });
        
        console.log(frmCount, 'frm cpount ');
        
        couponCode = couponOption === 1 ? filteredElements[0].value.trim() : '';

        let isFirstnameValid = checkValidName(document.getElementsByClassName("input-name")[frmCount], frmCount),
        isLastnameValid = checkValidName(document.getElementsByClassName("input-surname")[frmCount], frmCount),
        isEmailValid = checkEmail(document.getElementsByClassName("input-email")[frmCount], frmCount); 
        
        let isFormValid = false;
        if(couponOption){
            isCouponValid = checkValidName(filteredElements[0], frmCount);
            isFormValid = isFirstnameValid && isLastnameValid && isEmailValid && isCouponValid;
        }else{
            isFormValid = isFirstnameValid && isLastnameValid && isEmailValid;
        }        

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

            let authURL = `https://api.goodmorningitalia.it/auth?utm_referral=${widgetId}&utm_name=${nameOfHost}`;

            authURL += sanitizedUrl;
            utmSource = getUtmSource(sanitizedUrl);
            authURL += utmSource;
            console.log("==============>complete authURL", authURL);

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
                disabled = false;
                document.getElementsByClassName('button-text')[frmCount].style.paddingTop = '0px';
                document.getElementsByClassName('btn-sub')[frmCount].style.backgroundColor = '#f7504d';
                document.getElementsByClassName('btn-sub')[frmCount].style.paddingLeft = '36px';
                const hasKey = "msg" in result;
                if (hasKey) {
                    apiResp = result.msg;
                } else {
                    apiResp = result.message;
                }
                });
            if (apiResp && apiResp.toLowerCase() === "success") {
                localStorage.setItem('url', '');
                document.getElementsByClassName('spinner-border')[frmCount].style.display = 'none';
                document.getElementsByClassName("first-modal")[frmCount].style.display = "none";
                document.getElementsByClassName("second-modal")[frmCount].style.display = "block";
                document.getElementsByClassName("second-modal")[frmCount].innerHTML = `<h2>Controlla la tua email</h2>
                <p class='success-msg'><svg style="margin-right: 5px" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3136 3.31147C16.3631 3.36082 16.4024 3.41944 16.4291 3.48398C16.4559 3.54853 16.4697 3.61772 16.4697 3.6876C16.4697 3.75747 16.4559 3.82666 16.4291 3.89121C16.4024 3.95575 16.3631 4.01437 16.3136 4.06372L8.87612 11.5012C8.82678 11.5507 8.76815 11.5899 8.70361 11.6167C8.63907 11.6435 8.56988 11.6573 8.5 11.6573C8.43012 11.6573 8.36093 11.6435 8.29639 11.6167C8.23185 11.5899 8.17322 11.5507 8.12387 11.5012L4.93637 8.31372C4.88698 8.26433 4.8478 8.20569 4.82107 8.14115C4.79434 8.07662 4.78058 8.00745 4.78058 7.93759C4.78058 7.86774 4.79434 7.79857 4.82107 7.73404C4.8478 7.6695 4.88698 7.61086 4.93637 7.56147C4.98577 7.51208 5.04441 7.4729 5.10894 7.44616C5.17348 7.41943 5.24265 7.40567 5.3125 7.40567C5.38235 7.40567 5.45152 7.41943 5.51606 7.44616C5.58059 7.4729 5.63923 7.51208 5.68862 7.56147L8.5 10.3739L15.5614 3.31147C15.6107 3.262 15.6693 3.22274 15.7339 3.19596C15.7984 3.16918 15.8676 3.1554 15.9375 3.1554C16.0074 3.1554 16.0766 3.16918 16.1411 3.19596C16.2057 3.22274 16.2643 3.262 16.3136 3.31147Z" fill="#155724"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50001 3.15629C7.34423 3.15629 6.2144 3.49902 5.2534 4.14114C4.2924 4.78326 3.54339 5.69593 3.10109 6.76374C2.65879 7.83154 2.54306 9.00653 2.76855 10.1401C2.99403 11.2737 3.55059 12.3149 4.36785 13.1322C5.18512 13.9495 6.22637 14.506 7.35995 14.7315C8.49353 14.957 9.66851 14.8413 10.7363 14.399C11.8041 13.9567 12.7168 13.2077 13.3589 12.2467C14.001 11.2857 14.3438 10.1558 14.3438 9.00004C14.3438 8.85915 14.3997 8.72402 14.4994 8.62439C14.599 8.52476 14.7341 8.46879 14.875 8.46879C15.0159 8.46879 15.151 8.52476 15.2507 8.62439C15.3503 8.72402 15.4063 8.85915 15.4063 9.00004C15.4061 10.5203 14.9042 11.998 13.9786 13.204C13.053 14.41 11.7553 15.2769 10.2868 15.6703C8.81834 16.0636 7.26109 15.9614 5.85659 15.3795C4.4521 14.7976 3.27885 13.7685 2.5188 12.4519C1.75875 11.1353 1.45438 9.60463 1.65289 8.09738C1.85139 6.59013 2.54169 5.1905 3.61671 4.11554C4.69173 3.04059 6.09141 2.35038 7.59867 2.15197C9.10594 1.95356 10.6365 2.25804 11.9531 3.01817C12.0166 3.05138 12.0727 3.09709 12.1181 3.15255C12.1635 3.20801 12.1971 3.27207 12.2171 3.34088C12.2371 3.40969 12.2429 3.48183 12.2343 3.55296C12.2256 3.62409 12.2027 3.69273 12.1668 3.75476C12.131 3.81679 12.0829 3.87093 12.0256 3.91392C11.9683 3.9569 11.9029 3.98785 11.8333 4.0049C11.7637 4.02194 11.6914 4.02473 11.6207 4.01311C11.55 4.00148 11.4824 3.97567 11.4219 3.93723C10.5339 3.42371 9.52581 3.15428 8.50001 3.15629Z" fill="#155724"/>
                </svg>
                Successo! Controlla la tua email per il link di accesso.
                </p>
                <p>Completa la registrazione verificando il tuo profilo dalla email che ti abbiamo inviato a  <b>${email}</b>.</p>
                <p>Non hai ricevuto l’email? Inviala di nuovo o <a href="javascript:updateEmail(${frmCount});" ><b>Aggiorna il tuo indirizzo email</b></a></p>
                <p>Sei già registrato? <a href="https://app.goodmorningitalia.it/login"><b>Fai il login qui</b></a></p>
                </div>`;
            }
            if (apiResp.toLowerCase() === "undefined") {
                document.getElementsByClassName("api-err")[frmCount].innerHTML = ``;
            } else {
                document.getElementsByClassName('spinner-border')[frmCount].style.display = 'none';
                document.getElementsByClassName("api-err")[frmCount].style.display = 'flex';
                document.getElementsByClassName("api-err")[frmCount].innerHTML = `<svg style="margin-right: 5px" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Icons/Exclamation circle" clip-path="url(#clip0_7380_170)">
                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M8.5 16.4375C10.4725 16.4375 12.3643 15.6539 13.7591 14.2591C15.1539 12.8643 15.9375 10.9725 15.9375 9C15.9375 7.02745 15.1539 5.1357 13.7591 3.74089C12.3643 2.34609 10.4725 1.5625 8.5 1.5625C6.52745 1.5625 4.6357 2.34609 3.24089 3.74089C1.84609 5.1357 1.0625 7.02745 1.0625 9C1.0625 10.9725 1.84609 12.8643 3.24089 14.2591C4.6357 15.6539 6.52745 16.4375 8.5 16.4375V16.4375ZM8.5 17.5C10.7543 17.5 12.9163 16.6045 14.5104 15.0104C16.1045 13.4163 17 11.2543 17 9C17 6.74566 16.1045 4.58365 14.5104 2.98959C12.9163 1.39553 10.7543 0.5 8.5 0.5C6.24566 0.5 4.08365 1.39553 2.48959 2.98959C0.895533 4.58365 0 6.74566 0 9C0 11.2543 0.895533 13.4163 2.48959 15.0104C4.08365 16.6045 6.24566 17.5 8.5 17.5V17.5Z" fill="#721C24"/>
                <path id="Vector_2" d="M7.43964 12.1874C7.43964 12.0479 7.46712 11.9097 7.52051 11.7808C7.57391 11.6519 7.65217 11.5348 7.75084 11.4361C7.8495 11.3375 7.96663 11.2592 8.09554 11.2058C8.22444 11.1524 8.36261 11.1249 8.50214 11.1249C8.64167 11.1249 8.77983 11.1524 8.90874 11.2058C9.03765 11.2592 9.15477 11.3375 9.25344 11.4361C9.3521 11.5348 9.43036 11.6519 9.48376 11.7808C9.53715 11.9097 9.56464 12.0479 9.56464 12.1874C9.56464 12.4692 9.45269 12.7395 9.25344 12.9387C9.05418 13.138 8.78393 13.2499 8.50214 13.2499C8.22034 13.2499 7.95009 13.138 7.75084 12.9387C7.55158 12.7395 7.43964 12.4692 7.43964 12.1874V12.1874ZM7.54376 5.80713C7.52961 5.67308 7.5438 5.53756 7.58541 5.40936C7.62702 5.28115 7.69512 5.16313 7.78529 5.06294C7.87546 4.96275 7.98568 4.88264 8.10881 4.8278C8.23194 4.77297 8.36522 4.74463 8.50001 4.74463C8.6348 4.74463 8.76808 4.77297 8.89121 4.8278C9.01434 4.88264 9.12457 4.96275 9.21473 5.06294C9.3049 5.16313 9.373 5.28115 9.41461 5.40936C9.45622 5.53756 9.47041 5.67308 9.45626 5.80713L9.08439 9.53332C9.07189 9.6797 9.00491 9.81606 8.8967 9.91543C8.78849 10.0148 8.64693 10.0699 8.50001 10.0699C8.3531 10.0699 8.21153 10.0148 8.10332 9.91543C7.99511 9.81606 7.92813 9.6797 7.91564 9.53332L7.54376 5.80713Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_7380_170">
                <rect width="17" height="17" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
                </defs>
                </svg> ${apiResp}`;
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

        function handleChange (e) {
            const inputElement = event.target;
            const value = inputElement.value.trim();
            if (value) {
                inputElement.classList.remove('error');
            } else {
                inputElement.classList.add('error');
            }
        }
     
        function emailClickFunc() {
        document.getElementById("api-error-msg").innerHTML = ``;
        }

        window.onload = async (event) => {
            const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
        const window = event.target;        
        const elements = window.querySelectorAll('[data-widgetid]');
        for (const [i] of elements.entries()) {
            (async function (index) {
                const element = elements[index];
                const idOfWidget = elements[index].getAttribute('data-widgetid');
                const idOfForm = Number(elements[index].getAttribute('data-formid'));
                const statusObject = {
                    "active": 1,
                    "inactive": 0
                }
                console.log("Calling widget api for widget id " + idOfWidget);
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
                    console.log("Call to widget api for widget id " + idOfWidget + " called successfully!");
                    return result.data[0];
                });
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
        let formHtml = `<div id="first-modal" class="first-modal" style="display:block;"><div class="form-trial w-form">
        <form id="wf-form-Trial-form" name="wf-form-Trial-form" data-name="Trial form" method="post" class="formformform" aria-label="Trial form">
            <div class="grid-1-1 form">
                <input type="text" class="campo w-input input-name" maxlength="256" name="Name-form" data-name="Name form" placeholder="Nome..." id="name" onChange="handleChange(event)" required>                
                <input type="text" class="campo w-node-_6e48be95-97ba-b3f5-451e-82c491c607da-91c607d6 w-input input-surname" maxlength="256" name="Cognome-form" data-name="Cognome form"  onChange="handleChange(event)" placeholder="Cognome..." id="surname" required>
            </div>      
            `;


        let isCouponForm = couponOption ? `<div class="form">
                <input type="email" onChange="handleChange(event)" class="campo w-input input-email" maxlength="256" name="Mail-form" data-name="Mail form" placeholder="La tua email..." id="email" required>               
            </div>
            <div class="grid-2-1">
                <input type="text"  onChange="handleChange(event)" class="campo w-input input-coupon" maxlength="256" name="coupon" data-name="coupon" placeholder="Codice coupon" id="coupon" data-id="${idOfWidget}" data-count="${idOfForm}" required>
                <div id="w-node" class="submit-flex" onclick="handleButton(${nameOption}, ${surnameOption}, ${couponOption}, ${idOfForm}, '${idOfWidget}')">
                <button type='button' data-wait="Un istante..." id="free-trial" class="btn-sub submit test w-button">
                <div class="spinner-border" id="spinner" style="width: 24px; height: 24px; border-width: 0.2em; border-style: solid; border-color: currentColor; border-top-color: transparent; border-radius: 50%; margin-right: 0.5em; animation: spinner-border 0.6s linear infinite; display: none"></div>
                <span class="button-text">Provalo ora</span>
            </button>
                    <div class="postilla">Unisciti a migliaia di lettori soddisfatti</div></div>
                </div>
            </form>           
            <div id="api-error-msg" class="api-err" style="margin-bottom: 1em; display:none"></div>
            <p>Sei già registrato? <a href="https://app.goodmorningitalia.it/login"><b>Fai il login qui</b></a></p>
            </div>
            </div>
            <div id="second-modal" class="second-modal"></div>`:`<div class="grid-2-1">
                <input type="email" class="campo w-input input-email" maxlength="256" name="Mail-form" data-name="Mail form" placeholder="La tua email..." id="email" onChange="handleChange(event)" required>
                <div id="w-node" class="submit-flex" onclick="handleButton(${nameOption}, ${surnameOption}, ${couponOption}, ${idOfForm}, '${idOfWidget}')">
                    <button type='button' data-wait="Un istante..." id="free-trial" class="btn-sub submit test w-button">
                    <div class="spinner-border" id="spinner" style="width: 24px; height: 24px; border-width: 0.2em; border-style: solid; border-color: currentColor; border-top-color: transparent; border-radius: 50%; margin-right: 0.5em; animation: spinner-border 0.6s linear infinite; display: none"></div>
                    <span class="button-text">Provalo ora</span>
                </button>
                    <div class="postilla">Unisciti a migliaia di lettori soddisfatti</div></div>
                </div>
                </form>           
                <div id="api-error-msg" class="api-err" style="margin-bottom: 1em; display:none"></div>
                <p>Sei già registrato? <a href="https://app.goodmorningitalia.it/login"><b>Fai il login qui</b></a></p>
            </div>
            </div>
            <div id="second-modal" class="second-modal"></div>`;

        formHtml += isCouponForm;  

        element.innerHTML = statusOfWidget ? formHtml : '';        
            })(i);
        }
               
        };
