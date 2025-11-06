import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import markdownpdf from 'markdown-pdf';

export function activate(context: vscode.ExtensionContext) {
    console.log('Markdown to PDF extension is now active');

    let disposable = vscode.commands.registerCommand('markdown-to-pdf.convertToPDF', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        const document = editor.document;

        // Check if the current file is a Markdown file
        if (document.languageId !== 'markdown') {
            vscode.window.showErrorMessage('Current file is not a Markdown file');
            return;
        }

        const markdownPath = document.uri.fsPath;
        const outputPath = markdownPath.replace(/\.md$/i, '.pdf');

        // Get configuration values
        const config = vscode.workspace.getConfiguration('markdownToPdf');
        const paperFormat = config.get<string>('paperFormat', 'A4');
        const paperOrientation = config.get<string>('paperOrientation', 'portrait');
        const paperBorder = config.get<string>('paperBorder', '2cm');

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Converting Markdown to PDF...",
                cancellable: false
            }, async (progress) => {
                return new Promise<void>((resolve, reject) => {
                    markdownpdf({
                        cssPath: getCssPath(context),
                        paperFormat: paperFormat,
                        paperOrientation: paperOrientation,
                        paperBorder: paperBorder
                    })
                    .from(markdownPath)
                    .to(outputPath, (err: Error | null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            vscode.window.showInformationMessage(`PDF created successfully: ${path.basename(outputPath)}`);

            // Ask user if they want to open the PDF
            const openPdf = await vscode.window.showInformationMessage(
                'PDF created successfully!',
                'Open PDF',
                'Show in Folder'
            );

            if (openPdf === 'Open PDF') {
                vscode.env.openExternal(vscode.Uri.file(outputPath));
            } else if (openPdf === 'Show in Folder') {
                vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(outputPath));
            }

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to convert Markdown to PDF: ${error}`);
            console.error('Conversion error:', error);
        }
    });

    context.subscriptions.push(disposable);
}

function getCssPath(context: vscode.ExtensionContext): string {
    // Get user configuration
    const config = vscode.workspace.getConfiguration('markdownToPdf');
    const fontSize = config.get<number>('fontSize', 11);
    const bodyPadding = config.get<number>('bodyPadding', 10);
    const lineHeight = config.get<number>('lineHeight', 1.5);

    // Read the base CSS template
    const baseCssPath = path.join(context.extensionPath, 'styles', 'pdf-style.css');

    if (!fs.existsSync(baseCssPath)) {
        console.warn('Base CSS file not found, using default styles');
        return '';
    }

    try {
        // Read the base CSS
        let cssContent = fs.readFileSync(baseCssPath, 'utf8');

        // Replace configurable values
        cssContent = cssContent.replace(/font-size:\s*\d+px;/g, `font-size: ${fontSize}px;`);
        cssContent = cssContent.replace(/padding:\s*\d+px;/g, `padding: ${bodyPadding}px;`);
        cssContent = cssContent.replace(/line-height:\s*[\d.]+;/g, `line-height: ${lineHeight};`);

        // Create a temporary CSS file with user settings
        const tempCssPath = path.join(os.tmpdir(), `markdown-pdf-${Date.now()}.css`);
        fs.writeFileSync(tempCssPath, cssContent, 'utf8');

        return tempCssPath;
    } catch (error) {
        console.error('Error generating custom CSS:', error);
        return baseCssPath;
    }
}

export function deactivate() {}
