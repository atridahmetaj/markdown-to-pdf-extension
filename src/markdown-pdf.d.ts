declare module 'markdown-pdf' {
    interface Options {
        cssPath?: string;
        paperFormat?: string;
        paperOrientation?: string;
        paperBorder?: string;
    }

    interface MarkdownPdf {
        from(path: string): MarkdownPdf;
        to(path: string, callback: (err: Error | null) => void): void;
    }

    function markdownpdf(options?: Options): MarkdownPdf;

    export = markdownpdf;
}
