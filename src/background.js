// --- FINAL FIX: Manually define the browser API object ---
const api = globalThis.browser || globalThis.chrome;

api.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveNote') {
        // Use callback syntax for universal compatibility
        api.storage.local.get({ notes: [] }, (result) => {
            const notes = result.notes;
            notes.unshift(request.data);
            api.storage.local.set({ notes: notes }, () => {
                console.log('Note saved successfully!');
            });
        });
        // Return true to indicate you wish to send a response asynchronously
        return true; 
    }
});