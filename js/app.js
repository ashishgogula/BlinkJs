require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  monaco.editor.defineTheme('blinkjs-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'e0e0e0', background: '0a0a0a' },
      { token: 'keyword', foreground: '22c55e', fontStyle: 'bold italic' },
      { token: 'keyword.control', foreground: '22c55e', fontStyle: 'bold italic' },
      { token: 'number', foreground: '86efac', fontStyle: 'italic' },
      { token: 'string', foreground: '4ade80', fontStyle: 'italic' },
      { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
      { token: 'type', foreground: '86efac', fontStyle: 'italic' },
      { token: 'variable', foreground: 'e0e0e0', fontStyle: 'italic' },
      { token: 'function', foreground: '86efac', fontStyle: 'italic' },
      { token: 'operator', foreground: '22c55e', fontStyle: 'italic' }
    ],
    colors: {
      'editor.background': '#0a0a0a',
      'editorLineNumber.foreground': '#4b5563',
      'editorCursor.foreground': '#22c55e',
      'editor.selectionBackground': '#22c55e33',
      'editor.lineHighlightBackground': '#1a1a1a'
    }
  });

  window.editor = monaco.editor.create(document.getElementById('editor'), {
    value: `// Welcome to JS Playground
console.log('Hello World');

// Try editing me
for (let i = 0; i < 3; i++) {
  console.log(\`Count: \${i}\`);
}`,
    language: 'javascript',
    theme: 'blinkjs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    roundedSelection: true,
    padding: { top: 10 },
    fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
    fontSize: 14,
    fontLigatures: true,
    smoothScrolling: true,
    cursorBlinking: 'smooth'
  });

  window.editor.onDidChangeModelContent(debounce(runCode, 300));
  setTimeout(runCode, 500);
});
const consoleOutput = document.getElementById('consoleOutput');
const homeBtn = document.getElementById('homeBtn');

homeBtn.addEventListener('click', () => {
  window.location.href = '/index.html';
});

function clearConsole() {
  consoleOutput.textContent = '';
}

console.log = (...args) => {
  const formattedArgs = args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, 2);
    }
    return String(arg);
  });

  const output = formattedArgs.join(' ');
  const span = document.createElement('span');
  span.classList.add('success');
  span.textContent = output + '\n';
  span.style.fontFamily = "'JetBrains Mono', Consolas, 'Courier New', monospace";

  consoleOutput.appendChild(span);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;

  span.animate([
    { opacity: 0, transform: 'translateX(-5px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ], {
    duration: 200,
    easing: 'ease-out'
  });
};

console.error = (...args) => {
  const formattedArgs = args.map(arg => {
    if (typeof arg === 'object' && arg instanceof Error) {
      return arg.message;
    }
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, 2);
    }
    return String(arg);
  });

  const output = 'Error: ' + formattedArgs.join(' ');
  const span = document.createElement('span');
  span.classList.add('error');
  span.textContent = output + '\n';
  span.style.fontFamily = "'JetBrains Mono', Consolas, 'Courier New', monospace";

  consoleOutput.appendChild(span);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;

  span.animate([
    { opacity: 0, transform: 'translateX(-5px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ], {
    duration: 300,
    easing: 'ease-out'
  });
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
  }
}

const clearConsoleBtn = document.getElementById('clearConsoleBtn');

window.addEventListener('load', () => {
  if (window.editor) {
    window.editor.layout();
  }
});

if (clearConsoleBtn) {
  clearConsoleBtn.addEventListener('click', function () {
    clearConsole();
    this.classList.add('bg-blue-700');
    setTimeout(() => {
      this.classList.remove('bg-blue-700');
    }, 200);
  });
}

// ==================== CONSTANTS ====================

const dragHandle = document.getElementById('dragHandle');
const editorContainer = document.getElementById('editorContainer');
const consoleContainer = document.getElementById('consoleContainer');
const mainContainer = document.getElementById('mainContainer');
const switchOrientationBtn = document.getElementById('switchOrientation');
const switchLayoutBtn = document.getElementById('switchLayout');

const upDownArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="white" ><path d="M9 17.586V3H7v14.586l-2.293-2.293-1.414 1.414L8 21.414l4.707-4.707-1.414-1.414L9 17.586zM20.707 7.293 16 2.586l-4.707 4.707 1.414 1.414L15 6.414V21h2V6.414l2.293 2.293 1.414-1.414z"/></svg>`

const leftRightArrow = `<svg width="20" height="20" viewBox="0 -1 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-420.000000, -6640.000000)" fill="#FFFFFF">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M369.152,6496.32302 L367.74,6494.843 C367.438,6494.52378 367.664,6494.00943 368.103,6494.00943 L383,6494.00943 C383.552,6494.00943 384,6493.55012 384,6492.99774 L384,6493.00374 C384,6492.45036 383.552,6492.00806 383,6492.00806 L368.118,6492.00806 C367.677,6492.00806 367.452,6491.46669 367.758,6491.14947 L369.162,6489.68947 C369.542,6489.2902 369.525,6488.65476 369.122,6488.27851 L369.12,6488.2745 C368.722,6487.90125 368.098,6487.92026 367.723,6488.31753 L364.546,6491.65782 C363.815,6492.43135 363.819,6493.64218 364.553,6494.41271 L367.702,6497.69296 C368.076,6498.08523 368.695,6498.10424 369.092,6497.73499 L369.102,6497.72498 C369.504,6497.35172 369.526,6496.72329 369.152,6496.32302 M378.898,6480.27502 L378.908,6480.26501 C379.305,6479.89576 379.924,6479.91477 380.298,6480.30704 L383.447,6483.58729 C384.182,6484.35782 384.185,6485.56865 383.455,6486.34318 L380.277,6489.68347 C379.903,6490.07974 379.279,6490.09975 378.881,6489.7275 L378.878,6489.7245 C378.475,6489.34824 378.458,6488.7148 378.839,6488.31653 L380.242,6486.85753 C380.548,6486.53931 380.323,6486.00395 379.882,6486.00395 L365,6486.00395 C364.448,6486.00395 364,6485.56164 364,6485.00826 L364,6485.00626 C364,6484.45389 364.448,6484.00258 365,6484.00258 L379.897,6484.00258 C380.336,6484.00258 380.562,6483.48222 380.26,6483.163 L378.848,6481.67398 C378.474,6481.27371 378.496,6480.64828 378.898,6480.27502" id="arrow_right_left-[#343]">

</path>
            </g>
        </g>
    </g>
</svg>`

// ==================== ORIENTATION SWITCHING ====================

let isVertical = true;
switchLayoutBtn.innerHTML = upDownArrow;

switchOrientationBtn.addEventListener('click', () => {
  isVertical = !isVertical;
  if (isVertical) {
    switchLayoutBtn.innerHTML = upDownArrow;
    mainContainer.classList.remove('flex-row');
    mainContainer.classList.add('flex-col');

    dragHandle.classList.remove('cursor-ew-resize')
    dragHandle.classList.add('cursor-ns-resize')

    dragHandle.classList.remove('w-1');
    dragHandle.classList.remove('h-full');
    dragHandle.classList.add('h-1');
    dragHandle.classList.add('w-full');

    dragHandle.classList.remove('bg-gradient-to-b');
    dragHandle.classList.add('bg-gradient-to-r');

    dragHandle.style.margin = '8px 0';
  }else {
    switchLayoutBtn.innerHTML = leftRightArrow;
    mainContainer.classList.remove('flex-col');
    mainContainer.classList.add('flex-row');

    dragHandle.classList.remove('cursor-ns-resize')
    dragHandle.classList.add('cursor-ew-resize')

    dragHandle.classList.remove('h-1');
    dragHandle.classList.remove('w-full');
    dragHandle.classList.add('w-1');
    dragHandle.classList.add('h-full');

    dragHandle.classList.remove('bg-gradient-to-r');
    dragHandle.classList.add('bg-gradient-to-b');

    dragHandle.style.margin = '0 8px';
  }

  resetPosition();
});


// ==================== LAYOUT SWITCHING ====================

let isDefaultLayout = true;

switchLayoutBtn.addEventListener('click', () => {

  isDefaultLayout = !isDefaultLayout;

  mainContainer.innerHTML = '';
  
  if (isDefaultLayout) {
    // Default layout: Editor first, then drag handle, then console
    mainContainer.appendChild(editorContainer);
    mainContainer.appendChild(dragHandle);
    mainContainer.appendChild(consoleContainer);
  } else {
    // Swapped layout: Console first, then drag handle, then editor
    mainContainer.appendChild(consoleContainer);
    mainContainer.appendChild(dragHandle);
    mainContainer.appendChild(editorContainer);
  }
  
  // Recalculate sizes to maintain proportions
  resetPosition();
  
  // Refresh the editor layout
  if (window.editor) {
    window.editor.layout();
  }

})

// ==================== SMOOTH DRAGGING ====================

let isResizing = false;
let startY = 0;
let startX = 0;

dragHandle.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isResizing = true;
  startY = e.clientY;
  startX = e.clientX;

  dragHandle.style.backgroundColor = '#60a5fa';
  document.body.style.cursor = isVertical?'ew-resize':'ns-resize';
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const deltaY = e.clientY - startY;
  const newEditorHeight = editorContainer.offsetHeight + (isDefaultLayout? deltaY : (-deltaY));
  const newConsoleHeight = consoleContainer.offsetHeight + (isDefaultLayout? (-deltaY) : deltaY);
  
  const deltaX = e.clientX - startX;
  const newEditorWidth = editorContainer.offsetWidth + (isDefaultLayout? deltaX : (-deltaX));
  const newConsoleWidth = consoleContainer.offsetWidth + (isDefaultLayout? (-deltaX) : deltaX);

  // Min height constraint: 100px
  if(!isVertical){

    if (newEditorWidth > 100 && newConsoleWidth > 100) {

      editorContainer.style.flex = `0 0 ${newEditorWidth}px`;
      consoleContainer.style.flex = `0 0 ${newConsoleWidth}px`;
      startX = e.clientX;

    }

  }else{

    if (newEditorHeight > 100 && newConsoleHeight > 100) {
      editorContainer.style.flex = `0 0 ${newEditorHeight}px`;
      consoleContainer.style.flex = `0 0 ${newConsoleHeight}px`;
      
      startY = e.clientY;
    }
  }
      
  if (window.editor) {
    window.editor.layout();
  }
  
});

document.addEventListener('mouseup', () => {
  if (isResizing) {

    isResizing = false;
    dragHandle.style.backgroundColor = '';
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';

    if (window.editor) {
      window.editor.layout();
    }
  }
});

// Double-click to reset to 50/50

const resetPosition = () => {
  const totalHeight = mainContainer.offsetHeight - 16;
  const halfHeight = totalHeight / 2;

  const totalWidth = mainContainer.offsetWidth - 16;
  const halfWidth = totalWidth / 2;

  if(!isVertical){
    editorContainer.style.flex = `0 0 ${halfWidth}px`;
    consoleContainer.style.flex = `0 0 ${halfWidth}px`;
  }else {  
    editorContainer.style.flex = `0 0 ${halfHeight}px`;
    consoleContainer.style.flex = `0 0 ${halfHeight}px`;
  }

  if (window.editor) {
    window.editor.layout();
  }
}

dragHandle.addEventListener('dblclick', resetPosition);

// ==================== CONSOLE ANIMATIONS ====================
const errorBg = 'rgba(239, 68, 68, 0.2)';
const successBg = 'rgba(16, 185, 129, 0.1)';

const observer = new MutationObserver(() => {
  if (consoleOutput.textContent.includes('Error:')) {
    consoleContainer.style.backgroundColor = errorBg;

    consoleContainer.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-3px)' },
      { transform: 'translateX(3px)' },
      { transform: 'translateX(-2px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 400,
      easing: 'ease-in-out'
    });

    setTimeout(() => {
      consoleContainer.style.backgroundColor = '';
    }, 1000);
  } else if (consoleOutput.textContent.trim() !== '') {
    consoleContainer.style.backgroundColor = successBg;
    setTimeout(() => {
      consoleContainer.style.backgroundColor = '';
    }, 500);
  }
});

observer.observe(consoleOutput, { childList: true, subtree: true });

