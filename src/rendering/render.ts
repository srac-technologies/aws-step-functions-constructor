import * as path from "path";

export function getWebviewHtmlTemplate() {
  return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                html, body {
                  width: 100% !important;
                  height: 100% !important;
                  max-width: 100% !important;
                  max-height: 100% !important;
                  background-color: white !important;
                  margin: 0;
                  padding: 0;
                  border: none;
                }

                .svgWrapper {
                  width: 100%;
                  height: 100%;
                  box-sizing: border-box;
                }

                .clusters rect {
                  fill: white;
                  stroke: #999;
                  stroke-width: 1.5px;
                }

                text {
                  font-weight: 300;
                  font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
                  font-size: 14px;
                }

                .node rect {
                  stroke: #999;
                  fill: #fff;
                  stroke-width: 1.5px;
                }

                .edgePath path {
                  stroke: #333;
                  stroke-width: 1.5px;
                }

                .tooltip {
                  padding: 5px;
                  background-color: white;
                  border: 1px solid grey;
                  border-radius: 5px;
                  color: black;
                }
                table, td, tr {
                  border: none;
                  border-collapse: collapse;
                }
                td {
                  padding: 5px;
                }
                .tooltipTableRow:nth-child(odd) {
                  background-color: #DDD !important;
                }
            </style>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

        </head>
        <body id="body">
            <div class="svgWrapper">
              <svg width="100%" height="100%"><g/></svg>
            </div>
        </body>
    </html>`;
}


export function renderError(error: any) {
  return `
      <div>
        <div>Some error occured:</div>
        <div>${JSON.stringify(error)}</div>
      </div>
    `;
}
