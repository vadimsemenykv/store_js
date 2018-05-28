export default function renderFullPage(dataModel, preloadedState = {}) {
    let html = dataModel.html ? dataModel.html : '';
    let title = dataModel.title ? dataModel.title : '';
    let jsBottom = dataModel.jsBottom ? dataModel.jsBottom : [];
    let cssTop = dataModel.cssTop ? dataModel.cssTop : [];

    return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>${title}</title>
            ${cssTop.join(' ')}
        </head>
        <body>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
            </script>
            <div id="root">${html}</div>
            ${jsBottom.join(' ')}
        </body>
        </html>
    `
}