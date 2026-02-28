import { UploadedFile, FileType } from "../types";
// @ts-ignore
import mammoth from 'mammoth';

export const processFile = async (file: File): Promise<UploadedFile | null> => {
    if (!file) return null;

    // Check file type
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx');
    const isText = file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt');

    return new Promise((resolve, reject) => {
        if (isDocx) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                try {
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    resolve({
                        name: file.name,
                        type: FileType.TEXT, // Treat converted DOCX as text
                        content: result.value,
                        mimeType: 'text/plain'
                    });
                } catch (e) {
                    console.error("DOCX extraction error", e);
                    reject(new Error("Could not extract text from this Word document. Please try converting to PDF."));
                }
            };
            reader.readAsArrayBuffer(file);
        } else if (isImage || isPdf) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve({
                    name: file.name,
                    type: isPdf ? FileType.PDF : FileType.IMAGE,
                    content: base64String,
                    mimeType: file.type
                });
            };
            reader.readAsDataURL(file);
        } else if (isText) {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    name: file.name,
                    type: FileType.TEXT,
                    content: reader.result as string,
                    mimeType: 'text/plain'
                });
            };
            reader.readAsText(file);
        } else {
            console.warn("Unsupported file type:", file.type);
            resolve(null); // Or reject
        }
    });
};
