# Markdown to PDF Extension

A Visual Studio Code extension that converts Markdown files to PDF with a single command.

## Features

- Convert any Markdown file to PDF
- Custom styled output with code highlighting
- Inline code with grey background and monospace font
- Code blocks with grey background and syntax highlighting
- Right-click context menu integration for Markdown files
- Command palette support
- Option to open the generated PDF or show it in file explorer
- Progress notification during conversion

## Usage

### Method 1: Command Palette
1. Open a Markdown file in VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the command palette
3. Type "Markdown to PDF: Convert to PDF" and press Enter
4. The PDF will be generated in the same directory as your Markdown file

### Method 2: Context Menu
1. Open a Markdown file in VS Code
2. Right-click anywhere in the editor
3. Select "Markdown to PDF: Convert to PDF" from the context menu

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
```bash
cd markdown-to-pdf-extension
npm install
npm run compile
```

### Running the Extension
1. Open the project in VS Code
2. Press `F5` to open a new Extension Development Host window
3. Create or open a Markdown file in the new window
4. Test the extension using either method described above

### Building for Production
```bash
npm run vscode:prepublish
```

### Installing Locally
To install the extension locally:
1. Install vsce: `npm install -g @vscode/vsce`
2. Package the extension: `vsce package`
3. Install the generated `.vsix` file: `code --install-extension markdown-to-pdf-0.0.1.vsix`

## Configuration

You can customize the PDF output by modifying the extension settings in VS Code.

### How to Configure

**Method 1: Settings UI**
1. Open VS Code Settings: `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
2. Search for "Markdown to PDF"
3. Adjust the settings as needed

**Method 2: settings.json**
1. Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Type "Preferences: Open User Settings (JSON)"
3. Add your configuration:

```json
{
  "markdownToPdf.fontSize": 11,
  "markdownToPdf.paperFormat": "A4",
  "markdownToPdf.paperOrientation": "portrait",
  "markdownToPdf.paperBorder": "2cm",
  "markdownToPdf.bodyPadding": 10,
  "markdownToPdf.lineHeight": 1.5
}
```

### Available Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `markdownToPdf.fontSize` | number | 11 | Font size in pixels (8-20) |
| `markdownToPdf.paperFormat` | string | "A4" | Paper format (A3, A4, A5, Legal, Letter, Tabloid) |
| `markdownToPdf.paperOrientation` | string | "portrait" | Paper orientation (portrait, landscape) |
| `markdownToPdf.paperBorder` | string | "2cm" | Page margins (e.g., "2cm", "1in", "10mm") |
| `markdownToPdf.bodyPadding` | number | 10 | Body padding in pixels (0-50) |
| `markdownToPdf.lineHeight` | number | 1.5 | Line height multiplier (1.0-2.5) |

### Examples

**Larger text with more spacing:**
```json
{
  "markdownToPdf.fontSize": 14,
  "markdownToPdf.bodyPadding": 20,
  "markdownToPdf.lineHeight": 1.8
}
```

**Letter size for US documents:**
```json
{
  "markdownToPdf.paperFormat": "Letter",
  "markdownToPdf.paperBorder": "1in"
}
```

**Compact layout:**
```json
{
  "markdownToPdf.fontSize": 10,
  "markdownToPdf.bodyPadding": 5,
  "markdownToPdf.lineHeight": 1.3,
  "markdownToPdf.paperBorder": "1.5cm"
}
```

### Custom Styling

The extension uses a custom CSS file (`styles/pdf-style.css`) that provides:
- Code syntax highlighting with grey backgrounds
- Monospace fonts for inline code (`` `code` ``)
- Styled code blocks (` ```code``` `)
- Clean typography for headings, lists, and tables
- GitHub-inspired styling

For advanced customization, you can edit `styles/pdf-style.css` in the extension directory.

## Dependencies

- `markdown-pdf`: Core library for converting Markdown to PDF
- Uses PhantomJS for rendering (bundled with markdown-pdf)

## License

MIT
