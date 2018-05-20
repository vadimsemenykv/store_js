export default function renderFullPage(dataModel, preloadedState) {
    let html = dataModel.html ? dataModel.html : '';
    let title = dataModel.title ? dataModel.title : '';
    let jsBottom = dataModel.jsBottom ? dataModel.jsBottom : [];

    return `
        <!doctype html>
        <html lang="en">
        <head>
            <title>${title}</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            ${jsBottom.join(' ')}
        </body>
        </html>
    `
}