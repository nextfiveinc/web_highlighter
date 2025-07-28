// --- FINAL FIX: Manually define the browser API object ---
const api = globalThis.browser || globalThis.chrome;

document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const exportBtn = document.getElementById('export-btn');

    const trashIconSVG = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`;

    function displayNotes() {
        // Use callback syntax for universal compatibility
        api.storage.local.get({ notes: [] }, (result) => {
            notesContainer.innerHTML = '';
            const notes = result.notes;

            if (notes.length === 0) {
                notesContainer.innerHTML = '<div class="empty-state">No notes saved yet.</div>';
                exportBtn.style.display = 'none';
                return;
            }

            exportBtn.style.display = 'block';

            notes.forEach((note, index) => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note';
                const noteCommentHTML = note.comment ? `<div class="note-comment">${escapeHTML(note.comment)}</div>` : '';
                const formattedDate = new Date(note.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

                noteElement.innerHTML = `<button class="delete-btn" data-index="${index}" title="Delete Note">${trashIconSVG}</button><div class="note-text">"${escapeHTML(note.text)}"</div>${noteCommentHTML}<div class="note-meta"><span>${formattedDate}</span><a href="${note.url}" target="_blank" class="note-url" title="${note.url}">${new URL(note.url).hostname}</a></div>`;
                notesContainer.appendChild(noteElement);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const noteIndex = event.currentTarget.getAttribute('data-index');
                    deleteNote(parseInt(noteIndex, 10));
                });
            });
        });
    }

    function deleteNote(index) {
        api.storage.local.get({ notes: [] }, (result) => {
            let notes = result.notes;
            notes.splice(index, 1);
            api.storage.local.set({ notes: notes }, displayNotes);
        });
    }

    function exportNotesToMarkdown() {
        api.storage.local.get({ notes: [] }, (result) => {
            const notes = result.notes;
            if (notes.length === 0) return;

            // Create a reversed copy of the notes for export
            const notesInChronologicalOrder = [...result.notes].reverse();

            // Generate Markdown content using the newly sorted array
            let markdownContent = `# My Web Highlights\n\n`;
            notesInChronologicalOrder.forEach(note => { // Use the new variable here
                const formattedDate = new Date(note.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                markdownContent += `> ${note.text.replace(/\n/g, '\n> ')}\n\n`;
                if (note.comment) {
                    markdownContent += `${note.comment}\n\n`;
                }
                markdownContent += `[Source](${note.url}) - *Saved on ${formattedDate}*\n\n`;
                markdownContent += `---\n\n`;
            });

            const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            //a.download = `web-highlights_${new Date().toISOString().slice(0, 19)}.md`;

            const now = new Date();
            // Format it into a filename-safe string like '2025-07-26_10-30-55'
            const timestamp = now.toISOString().replace(/:/g, '-').replace('T', '_').slice(0, 19);
            // Replace colons with dashes, then Replace the 'T' separator with an underscore, then Slice to get YYYY-MM-DD_HH-MM-SS

            a.download = `web-highlights_${timestamp}.md`;
            // New Output: web-highlights_2025-07-26_10-30-55.md

            a.click();
            URL.revokeObjectURL(url);
        });
    }

    function escapeHTML(str) {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }

    exportBtn.addEventListener('click', exportNotesToMarkdown);
    displayNotes();
});
