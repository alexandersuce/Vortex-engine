document.addEventListener("DOMContentLoaded", function () {
    let isHTML = true;
    let htmlCode = "";
    let cssCode = "";
    const htmlButton = document.getElementById("html-btn");
    const cssButton = document.getElementById("css-btn");
    const codeTextarea = document.getElementById("code");
    const scene = document.getElementById("scene");
    const drawButton = document.getElementById("draw-btn");
    const codeBtn = document.getElementById("code-btn");
    const colorPicker = document.getElementById("color-picker");
    const strokeSize = document.getElementById("stroke-size");
    
    
    // Set default to HTML
    htmlButton.classList.add("active");

    // Toggle HTML/CSS editor
    htmlButton.addEventListener("click", function () {
        isHTML = true;
        htmlButton.classList.add("active");
        cssButton.classList.remove("active");
        codeTextarea.value = htmlCode;
        codeTextarea.placeholder = "Code HTML ici...";
    });

    cssButton.addEventListener("click", function () {
        isHTML = false;
        cssButton.classList.add("active");
        htmlButton.classList.remove("active");
        codeTextarea.value = cssCode;
        codeTextarea.placeholder = "Code CSS ici...";
    });

    // Update the scene in real-time as the user types
    codeTextarea.addEventListener("input", function () {
        if (isHTML) {
            htmlCode = codeTextarea.value;
            scene.innerHTML = htmlCode;
        } else {
            cssCode = codeTextarea.value;
            const styleElement = document.querySelector("#dynamic-css") || document.createElement("style");
            styleElement.id = "dynamic-css";
            styleElement.textContent = cssCode;
            document.head.appendChild(styleElement);
        }
    });

    // Drawing functionality
    let drawing = false;
    let lastX = 0;
    let lastY = 0;
    let ctx;

    drawButton.addEventListener("click", function () {
        drawing = !drawing;
        drawButton.classList.toggle("active");
        colorPicker.style.display = drawing ? "block" : "none";
        strokeSize.style.display = drawing ? "block" : "none";

        if (drawing) {
            ctx = initializeCanvas();
        } else {
            clearCanvas();
        }
    });

    function startDrawing(e) {
        if (!drawing) return;
        drawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    }

    function stopDrawing() {
        drawing = false;
    }

    function draw(e) {
        if (!drawing) return;

        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = strokeSize.value;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }

    function initializeCanvas() {
        const canvas = document.createElement("canvas");
        canvas.width = scene.clientWidth;
        canvas.height = scene.clientHeight;
        canvas.classList.add("canvas");
        scene.appendChild(canvas);
        const context = canvas.getContext("2d");
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);
        return context;
    }

    function clearCanvas() {
        scene.innerHTML = ""; // Clear the scene
    }
});
