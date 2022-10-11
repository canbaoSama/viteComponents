export function downloadFile(url, name) {
    const el = document.createElement('a');
    if (!name) name = url.slice(url.lastIndexOf('/') + 1);
    el.download = name;
    el.href = url;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

export function downloadText(text, name, type = 'text/plain') {
    const blob = new Blob([text], { type });
    if (URL && URL.createObjectURL) {
        const src = URL.createObjectURL(blob);
        downloadFile(src, name);
        URL.revokeObjectURL(src);
    } else {
        console.warn('URL.createObjectURL unsuported！');
    }
}
