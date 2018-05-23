export default function renderFullPage(dataModel, preloadedState) {
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
            <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">-->
            <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">-->
            <!--<link rel="stylesheet" href="/assets/theme.css"/>-->
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