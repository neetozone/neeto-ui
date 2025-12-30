import React from "react";

import { colorPaletteList } from "../ColorPalette";

const BorderColorDisplay = ({ isDarkMode }) => {
  const theme = isDarkMode ? "dark" : "light";

  return (
    <div className="neeto-ui-bg-white neeto-ui-text-black box-border flex min-h-screen flex-col justify-center gap-12 p-16">
      <style>
        {`
          .story-demo-table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
            font-size: 16px;
            border: 1px solid rgb(var(--neeto-ui-gray-200));
            border-radius: 6px;
          }
          .story-demo-table thead tr {
            border-bottom: 1px solid rgb(var(--neeto-ui-gray-200));
          }
          .story-demo-table thead td,
          .story-demo-table thead th {
            padding: 12px 16px;
            font-weight: 600;
            text-align: left;
            color: rgb(var(--neeto-ui-black));
            border-right: 1px solid rgb(var(--neeto-ui-gray-200));
          }
          .story-demo-table tbody tr {
            background: transparent !important;
            border-bottom: 1px solid rgb(var(--neeto-ui-gray-200));
            transition: background-color 0.2s ease;
          }
          .story-demo-table tbody td {
            padding: 12px 16px;
            border-right: 1px solid rgb(var(--neeto-ui-gray-200));
            vertical-align: top;
          }
          .story-demo-table tbody td code {
            font-size: 12px;
            background-color: rgb(var(--neeto-ui-gray-100));
            color: rgb(var(--neeto-ui-black));
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
          }
        `}
      </style>
      <h1 className="neeto-ui-text-black">Border Color</h1>
      <table className="story-demo-table">
        <thead>
          <tr>
            <td />
            <td>RGB code</td>
            <td>Class</td>
          </tr>
        </thead>
        <tbody>
          {colorPaletteList(theme).map(color => (
            <tr key={color.name}>
              <td>
                <div
                  className={`h-12 w-12 border ${color.name.replace(
                    "--neeto-ui",
                    "neeto-ui-border"
                  )}`}
                />
              </td>
              <td>
                <code>{color.value}</code>
              </td>
              <td>
                <div className="flex justify-between">
                  <code>
                    {color.name.replace("--neeto-ui", "neeto-ui-border")}
                  </code>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorderColorDisplay;
