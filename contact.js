import React from "react";
import { createRoot } from "react-dom/client";
import { Scheduler } from "@aldabil/react-scheduler";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(
    React.createElement(Scheduler, {
    view: "month",
    events: [
        {
            event_id: 1,
            title: "Event 1",
            start: new Date("2025-05-15T09:00:00"),
            end: new Date("2025-08-15T18:00:00"),
        }
    ],
})
);