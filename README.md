# Web Highlighter
**The simplest way to save ideas and quotes from any webpage, with your own notes. Free. Private. No login.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Mozilla Add-on](https://img.shields.io/badge/Firefox-v1.2.0-orange.svg)](https://addons.mozilla.org/en-US/firefox/addon/web-highlighter/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-v1.2.0-blue.svg)]([https://chrome.google.com/webstore/detail/your-extension-id](https://chromewebstore.google.com/detail/emiaeicgfomchcecbhdfnjjegkpbphjh?utm_source=item-share-cb))

A privacy-focused browser extension to highlight text on any webpage, add notes, and export your entire collection to clean, portable Markdown. Perfect for researchers, students, and anyone who uses note-taking apps like Obsidian, Logseq, or Joplin.

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/nextfiveinc/web_highlighter/blob/main/screenshots/01_select_text.png" alt="Screenshot of the highlighting and saving flow" width="500">
      <br>
      <em>Highlighting text to save a note.</em>
    </td>
    <td align="center">
      <img src="https://github.com/nextfiveinc/web_highlighter/blob/main/screenshots/02_view_export_notes.png" alt="Screenshot of your saved notes view" width="350">
      <br>
      <em>Viewing all saved highlights.</em>
    </td>
  </tr>
</table>


## Core Features

*   **Highlight & Save:** Simply select text on any webpage to instantly capture it.
*   **Annotate with Notes:** _[Optional]_ Add your own thoughts or comments to each highlight for extra context.
*   **Organized View:** All your highlights are saved locally and displayed in a clean, chronological view, grouped by the source page.
*   **Export to Markdown:** Export your entire collection with a single click into a beautifully formatted Markdown file, including source links and your personal notes.
*   **Privacy First:** No account needed. All your highlights and notes are stored securely in your browser's local storage and never sent outside your system.

## Installation

You can install Web Highlighter easily from your browser's official store.

### For Mozilla Firefox

1.  Visit the [**Web Highlighter page on the Firefox Add-on Store**](https://addons.mozilla.org/en-US/firefox/addon/web-highlighter/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search).
2.  Click "Add to Firefox".

### For Google Chrome (_coming soon_)

1.  Visit the [**Web Highlighter page on the Chrome Web Store**](https://chromewebstore.google.com/detail/emiaeicgfomchcecbhdfnjjegkpbphjh?utm_source=item-share-cb).
2.  Click "Add to Chrome".


### Install from Source (for Developers)

If you want to build the extension yourself:

1.  Clone the repository: `git clone https://github.com/nextfiveinc/web-highlighter.git`
2.  Navigate to the project directory: `cd web-highlighter`
3.  Install dependencies: `npm install`
4.  Build for your browser: `npm run build:chrome` or `npm run build:firefox`
5.  Load the unpacked extension from the `build/chrome` or `build/firefox` directory in your browser's extension management page.

## How to Use

1.  **Highlight:** Select any text on a webpage. A "Save Highlight" popup will appear.
2.  **Save:** Add an optional note in the text box and click "Save".
3.  **View & Export:** Click the Web Highlighter icon in your browser's toolbar to see all your saved notes. Click "Export All" to download your `highlights.md` file.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
