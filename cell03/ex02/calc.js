function calculate() {
    const left = document.getElementById("left").value;
    const right = document.getElementById("right").value;
    const op = document.getElementById("operator").value;

    const num1 = parseInt(left, 10);
    const num2 = parseInt(right, 10);

    // ตรวจสอบว่าเป็นจำนวนเต็มบวก
    if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) {
        alert("Error :(");
        return false;
    }

    // ตรวจสอบหารด้วยศูนย์
    if ((op === "/" || op === "%") && num2 === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return false;
    }

    let result;
    switch (op) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": result = num1 / num2; break;
        case "%": result = num1 % num2; break;
    }

    alert(result);
    console.log(result);
    return false; // ป้องกัน reload
}

// alert ทุก 30 วินาที
setInterval(() => {
    alert("Please, use me...");
}, 30000);
