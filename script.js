function getPin() {
    const random = Math.random() * 10000;
    const pin = (random.toString()).split('.')[0];
    if (pin.length == 4) {
        return pin;
    } else {
        return getPin(pin);
    }
}

//display generated pin
function generatePin() {
    const pinInput = document.getElementById('generated-pin');
    pinInput.value = getPin();
}


//click event listener
function deleteOne(displayInputElement) {
    let number = displayInputElement.value;
    number = number.substring(0, number.length - 1);
    displayInputElement.value = number;
}

function verifyPin(generatedPinInputElement, typedPinInputElement, submitBtn) {
    const pinInput = generatedPinInputElement.value;
    const displayInput = typedPinInputElement.value;
    
    let messageList = document.querySelectorAll('.notify');

    if (pinInput === displayInput && pinInput !== "") {
        messageList[0].style.display = "none";
        messageList[1].style.display = 'block';
    } else {
        messageList[0].style.display = 'block';
        messageList[1].style.display = 'none';
        tryCount--;
        if (tryCount == 0) {
            submitBtn.disabled = true;
        }
        let messageDisplay = document.getElementsByClassName('action-left')[0];
        messageDisplay.innerHTML = tryCount + " try left";
    }
}

let tryCount = 3;
let number = document.getElementById('numbers-id');
number.addEventListener('click', function (event) {
    let clickedDigit = event.target.innerHTML;
    let typedPinInputElement = document.getElementById('display-input');
    let submitBtn = document.getElementById('submit-btn');
    const generatedPinInputElement = document.getElementById('generated-pin');

    if (!isNaN(clickedDigit)) {
        typedPinInputElement.value = typedPinInputElement.value + clickedDigit;
    } else if (clickedDigit === "Clear") {
        typedPinInputElement.value = "";
    } else if (clickedDigit === "Delete") {
        deleteOne(typedPinInputElement);
    } else if (clickedDigit === submitBtn.innerHTML) {
        verifyPin(generatedPinInputElement, typedPinInputElement, submitBtn);
    }
});