const root = ReactDOM.createRoot(document.getElementById("root"));
const { Scheduler } = window["@aldabil/react-scheduler"];

root.render(
  <Scheduler
    view="month"
    events={[
      {
        event_id: 1,
        title: "Lectures",
        start: new Date("2025-05-15T09:00:00"),
        end: new Date("2025-06-15T18:00:00"),
      },
    ]}
    />
  );