// --- FIX: The critical manual polyfill for Chrome/Firefox compatibility ---
const api = globalThis.browser || globalThis.chrome;

let shadowHost = null;
let currentSelection = null;

// --- Main logic handler for when a text selection is finalized ---
function handleTextSelection(clientX, clientY) {
    setTimeout(() => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        if (selectedText.length > 0) {
            currentSelection = selection;
            dismissDialog(); // Close any existing dialog
            createDialog(clientX, clientY);
        }
    }, 100);
}

// --- Event Listeners for both Mouse and Touch ---
document.addEventListener('mouseup', (event) => {
    if (shadowHost && event.composedPath().includes(shadowHost)) return;
    handleTextSelection(event.clientX, event.clientY);
});

document.addEventListener('touchend', (event) => {
    if (shadowHost && event.composedPath().includes(shadowHost)) return;
    const touch = event.changedTouches[0];
    if (touch) {
        handleTextSelection(touch.clientX, touch.clientY);
    }
});

// --- Other Listeners ---
document.addEventListener('mousedown', (event) => {
    if (shadowHost && !event.composedPath().includes(shadowHost)) dismissDialog();
});

document.addEventListener('keydown', (event) => {
    if (shadowHost) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
            dismissDialog();
        }
        if (event.key === 'Escape') {
            dismissDialog();
        }
    }
});

// --- Core Functions (dismissDialog, createDialog, etc.) ---
function dismissDialog() {
    if (shadowHost) {
        shadowHost.remove();
        shadowHost = null;
    }
}

function createDialog(x, y) {
    shadowHost = document.createElement('div');
    shadowHost.style.position = 'absolute';
    shadowHost.style.left = `${window.pageXOffset + x}px`;
    shadowHost.style.top = `${window.pageYOffset + y + 15}px`;
    shadowHost.style.zIndex = '2147483647';
    document.body.appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    const selectedText = currentSelection.toString();

    shadowRoot.innerHTML = `<style>.dialog-container{padding:15px;background-color:white;border:1px solid #ccc;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.2);width:300px;color:#333;font-family:Arial,sans-serif;font-size:14px;}.highlight-text{background-color:#f5f5f5;padding:10px;border-radius:4px;margin-bottom:10px;max-height:100px;overflow-y:auto;}textarea{width:95%;min-height:60px;border:1px solid #ccc;border-radius:4px;padding:5px;margin-bottom:10px;}.button-container{text-align:right;}button{padding:8px 12px;border:none;border-radius:4px;cursor:pointer;margin-left:8px;}button[data-action="cancel"]{border:1px solid #ccc;background-color:#f0f0f0;}button[data-action="copy"]{background-color:#e0e0e0;color:#333;}button[data-action="save"]{background-color:#007bff;color:white;}</style><div class="dialog-container"><div style="font-weight:bold;margin-bottom:10px;">Save Highlight</div><div class="highlight-text"><em>"${escapeHTML(selectedText)}"</em></div><textarea placeholder="Add your own note (optional)..."></textarea><div class="button-container"><button data-action="cancel">Cancel</button><button data-action="copy">Copy</button><button data-action="save">Save</button></div></div>`;
    
    shadowRoot.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const action = button.dataset.action;
        const comment = shadowRoot.querySelector('textarea').value;
        const customEvent = new CustomEvent('dialogAction', { bubbles: true, composed: true, detail: { action, comment } });
        shadowHost.dispatchEvent(customEvent);
    });

    shadowHost.addEventListener('dialogAction', (event) => {
        const { action, comment } = event.detail;
        switch (action) {
            case 'save':
                // This call now works because 'api' is defined at the top of the file
                api.runtime.sendMessage({ action: 'saveNote', data: { text: selectedText, comment: comment, url: window.location.href, timestamp: new Date().toISOString() } });
                window.getSelection().removeAllRanges();
                dismissDialog();
                break;
            case 'copy':
                navigator.clipboard.writeText(selectedText).then(dismissDialog);
                break;
            case 'cancel':
                dismissDialog();
                break;
        }
    });
}

function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}