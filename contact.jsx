import React from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import { Scheduler } from "https://esm.sh/@aldabil/react-scheduler";

const root = createRoot(document.getElementById("root"));

root.render(
  React.createElement(Scheduler, {
    view: "month",
    events: [{
      event_id: 1,
      title: "Event 1",
      start: new Date("2025-05-15T09:00:00"),
      end:   new Date("2025-08-15T18:00:00"),
    }],
  })
);