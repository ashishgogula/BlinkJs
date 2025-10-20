require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs" },
});

require(["vs/editor/editor.main"], function () {
    monaco.editor.defineTheme("blinkjs-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "", foreground: "e0e0e0", background: "0a0a0a" },
            {
                token: "keyword",
                foreground: "22c55e",
                fontStyle: "bold italic",
            },
            {
                token: "keyword.control",
                foreground: "22c55e",
                fontStyle: "bold italic",
            },
            { token: "number", foreground: "86efac", fontStyle: "italic" },
            { token: "string", foreground: "4ade80", fontStyle: "italic" },
            { token: "comment", foreground: "6b7280", fontStyle: "italic" },
            { token: "type", foreground: "86efac", fontStyle: "italic" },
            { token: "variable", foreground: "e0e0e0", fontStyle: "italic" },
            { token: "function", foreground: "86efac", fontStyle: "italic" },
            { token: "operator", foreground: "22c55e", fontStyle: "italic" },
        ],
        colors: {
            "editor.background": "#0a0a0a",
            "editorLineNumber.foreground": "#4b5563",
            "editorCursor.foreground": "#22c55e",
            "editor.selectionBackground": "#22c55e33",
            "editor.lineHighlightBackground": "#1a1a1a",
        },
    });

    window.editor = monaco.editor.create(document.getElementById("editor"), {
        value: `// Welcome to JS Playground
console.log('Hello World');

// Try editing me
for (let i = 0; i < 3; i++) {
  console.log(\`Count: \${i}\`);
}`,
        language: "javascript",
        theme: "blinkjs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        roundedSelection: true,
        padding: { top: 10 },
        fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
        fontSize: 14,
        fontLigatures: true,
        smoothScrolling: true,
        cursorBlinking: "smooth",
    });

    window.editor.onDidChangeModelContent(debounce(runCode, 300));
    setTimeout(runCode, 500);
});
const consoleOutput = document.getElementById("consoleOutput");
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", () => {
    window.location.href = "/index.html";
});

function clearConsole() {
    consoleOutput.textContent = "";
}

console.log = (...args) => {
    const formattedArgs = args.map((arg) => {
        if (typeof arg === "object") {
            return JSON.stringify(arg, null, 2);
        }
        return String(arg);
    });

    const output = formattedArgs.join(" ");
    const span = document.createElement("span");
    span.classList.add("success");
    span.textContent = output + "\n";
    span.style.fontFamily =
        "'JetBrains Mono', Consolas, 'Courier New', monospace";

    consoleOutput.appendChild(span);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;

    span.animate(
        [
            { opacity: 0, transform: "translateX(-5px)" },
            { opacity: 1, transform: "translateX(0)" },
        ],
        {
            duration: 200,
            easing: "ease-out",
        }
    );
};

console.error = (...args) => {
    const formattedArgs = args.map((arg) => {
        if (typeof arg === "object" && arg instanceof Error) {
            return arg.message;
        }
        if (typeof arg === "object") {
            return JSON.stringify(arg, null, 2);
        }
        return String(arg);
    });

    const output = "Error: " + formattedArgs.join(" ");
    const span = document.createElement("span");
    span.classList.add("error");
    span.textContent = output + "\n";
    span.style.fontFamily =
        "'JetBrains Mono', Consolas, 'Courier New', monospace";

    consoleOutput.appendChild(span);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;

    span.animate(
        [
            { opacity: 0, transform: "translateX(-5px)" },
            { opacity: 1, transform: "translateX(0)" },
        ],
        {
            duration: 300,
            easing: "ease-out",
        }
    );
};

function runCode() {
    clearConsole();
    const code = window.editor.getValue();
    try {
        new Function(code)();
    } catch (err) {
        console.error(err);
    }
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

const clearConsoleBtn = document.getElementById("clearConsoleBtn");

window.addEventListener("load", () => {
    if (window.editor) {
        window.editor.layout();
    }
});

if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener("click", function () {
        clearConsole();
        this.classList.add("bg-blue-700");
        setTimeout(() => {
            this.classList.remove("bg-blue-700");
        }, 200);
    });
}

// ==================== SWITCH POSITION SVGS ====================

const upDownArrow = `<img src='assets/upDownArrow.svg' alt="Switch Positions"/>`;

const leftRightArrow = `<img src='assets/leftRightArrow.svg' alt="Switch Positions"/>`;

// ==================== ELEMENT REFERENCES ====================

const dragHandle = document.getElementById("dragHandle");
const editorContainer = document.getElementById("editorContainer");
const consoleContainer = document.getElementById("consoleContainer");
const mainContainer = document.getElementById("mainContainer");
const switchPositionBtn = document.getElementById("switchPositionBtn");
const switchOrientationBtn = document.getElementById("switchOrientationBtn");

// ==================== SWITCH POSITION ====================

let isEditorFirst = true;

if (localStorage.getItem("position") !== null)
    isEditorFirst = localStorage.getItem("position") === "true";

function editorFirstPosition() {
    if (mainContainer) {
        mainContainer.innerHTML = "";

        mainContainer.appendChild(editorContainer);
        mainContainer.appendChild(dragHandle);
        mainContainer.appendChild(consoleContainer);
    }
}

function consoleFirstPosition() {
    if (mainContainer) {
        mainContainer.innerHTML = "";

        mainContainer.appendChild(consoleContainer);
        mainContainer.appendChild(dragHandle);
        mainContainer.appendChild(editorContainer);
    }
}

function togglePosition() {
    if (isEditorFirst) editorFirstPosition();
    else consoleFirstPosition();

    resetPartition();
}

if (switchPositionBtn) {
    switchPositionBtn.addEventListener("click", () => {
        isEditorFirst = !isEditorFirst;

        togglePosition();
        localStorage.setItem("position", isEditorFirst.toString());
    });
}

// ==================== SWITCH ORIENTATION ====================
let isVertical = true;

if (localStorage.getItem("orientation") !== null)
    isVertical = localStorage.getItem("orientation") === "true";

function applyOrientation() {
    if (switchPositionBtn)
        switchPositionBtn.innerHTML = isVertical ? upDownArrow : leftRightArrow;

    handlingClasses();

    resetPartition();
}

function handlingClasses() {
    if (isVertical) {
        mainContainer.classList.add("flex-col");
        mainContainer.classList.remove("flex-row");
        
        dragHandle.classList.add("cursor-ns-resize");
        dragHandle.classList.remove("cursor-ew-resize");
        
        dragHandle.classList.add("h-1");
        dragHandle.classList.add("w-full");
        dragHandle.classList.remove("w-1");
        dragHandle.classList.remove("h-full");
        
        dragHandle.classList.add("bg-gradient-to-r");
        dragHandle.classList.remove("bg-gradient-to-b");
        
        dragHandle.style.margin = "8px 0";

    } else {
        mainContainer.classList.remove("flex-col");
        mainContainer.classList.add("flex-row");

        dragHandle.classList.remove("cursor-ns-resize");
        dragHandle.classList.add("cursor-ew-resize");
        
        dragHandle.classList.remove("h-1");
        dragHandle.classList.remove("w-full");
        dragHandle.classList.add("w-1");
        dragHandle.classList.add("h-full");
        
        dragHandle.classList.remove("bg-gradient-to-r");
        dragHandle.classList.add("bg-gradient-to-b");
        
        dragHandle.style.margin = "0 8px";
    }
}

if (switchOrientationBtn) {
    switchOrientationBtn.addEventListener("click", () => {
        isVertical = !isVertical;

        localStorage.setItem("orientation", isVertical.toString());
        
        // Use setTimeout to ensure DOM updates before layout calculations
        setTimeout(() => {
            applyOrientation();
        }, 50);
    });
}

// ==================== SMOOTH DRAGGING ====================

let isResizing = false;
let startY = 0;
let startX = 0;

if (dragHandle && editorContainer && consoleContainer) {
    dragHandle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isResizing = true;
        startY = e.clientY;
        startX = e.clientX;
        dragHandle.style.backgroundColor = "#60a5fa";
        document.body.style.cursor = isVertical ? "ns-resize" : "ew-resize";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;

        if (isVertical) {
            const deltaY = e.clientY - startY;

            const newEditorHeight =
                editorContainer.offsetHeight +
                (isEditorFirst ? deltaY : -deltaY);
            const newConsoleHeight =
                consoleContainer.offsetHeight +
                (isEditorFirst ? -deltaY : deltaY);

            // Min height constraint: 100px
            if (newEditorHeight > 100 && newConsoleHeight > 100) {
                editorContainer.style.flex = `0 0 ${newEditorHeight}px`;
                consoleContainer.style.flex = `0 0 ${newConsoleHeight}px`;
                startY = e.clientY;
                if (window.editor) {
                    window.editor.layout();
                }
            }
        } else {
            const deltaX = e.clientX - startX;

            const newEditorWidth =
                editorContainer.offsetWidth +
                (isEditorFirst ? deltaX : -deltaX);
            const newConsoleWidth =
                consoleContainer.offsetWidth +
                (isEditorFirst ? -deltaX : deltaX);

            if (newEditorWidth > 100 && newConsoleWidth > 100) {
                editorContainer.style.flex = `0 0 ${newEditorWidth}px`;
                consoleContainer.style.flex = `0 0 ${newConsoleWidth}px`;

                startX = e.clientX;

                if (window.editor) {
                    window.editor.layout();
                }
            }
        }
    });

    document.addEventListener("mouseup", () => {
        if (isResizing) {
            isResizing = false;
            dragHandle.style.backgroundColor = "";
            document.body.style.cursor = "default";
            document.body.style.userSelect = "auto";

            if (window.editor) {
                window.editor.layout();
            }
        }
    });
}

function resetPartition() {
    if (isVertical) {
        const totalHeight = mainContainer.offsetHeight - 16;
        const halfHeight = totalHeight / 2;
        editorContainer.style.flex = `0 0 ${halfHeight}px`;
        consoleContainer.style.flex = `0 0 ${halfHeight}px`;
    } else {
        const totalWidth = mainContainer.offsetWidth - 16;
        const halfWidth = totalWidth / 2;
        editorContainer.style.flex = `0 0 ${halfWidth}px`;
        consoleContainer.style.flex = `0 0 ${halfWidth}px`;
    }

    // Force layout recalculation
    mainContainer.offsetHeight;
    
    if (window.editor) {
        window.editor.layout();
    }
}

// Double-click to reset to 50/50
dragHandle.addEventListener("dblclick", resetPartition);

window.addEventListener("load", function () {
    // Set correct positions
    if (isEditorFirst) {
        editorFirstPosition();
    } else {
        consoleFirstPosition();
    }

    // Apply the correct orientation with delay to ensure DOM is ready
    setTimeout(() => {
        applyOrientation();
        // Set proper sizing
        setTimeout(resetPartition, 100);
    }, 50);
});

window.addEventListener(
    "resize",
    debounce(() => {
        resetPartition();
    }, 200)
);

// ==================== CONSOLE ANIMATIONS ====================
const errorBg = "rgba(239, 68, 68, 0.2)";
const successBg = "rgba(16, 185, 129, 0.1)";

const observer = new MutationObserver(() => {
    if (consoleOutput.textContent.includes("Error:")) {
        consoleContainer.style.backgroundColor = errorBg;

        consoleContainer.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-3px)" },
                { transform: "translateX(3px)" },
                { transform: "translateX(-2px)" },
                { transform: "translateX(0)" },
            ],
            {
                duration: 400,
                easing: "ease-in-out",
            }
        );

        setTimeout(() => {
            consoleContainer.style.backgroundColor = "";
        }, 1000);
    } else if (consoleOutput.textContent.trim() !== "") {
        consoleContainer.style.backgroundColor = successBg;
        setTimeout(() => {
            consoleContainer.style.backgroundColor = "";
        }, 500);
    }
});

observer.observe(consoleOutput, { childList: true, subtree: true });