import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import ActiveEvents from "./ActiveEvents";
import AllEvents from "./AllEvents";
import CreateEvent from "./CreateEvent";
import "../styles/MyEvents.css";

const MyEvents: React.FC = () => {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<"active" | "all" | "create">(
    "active"
  );

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="my-events-container-mine">
      <div className="sidebar">
        <button
          className={activeTab === "active" ? "active" : ""}
          onClick={() => setActiveTab("active")}
        >
          My Active Events
        </button>
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All of my Events
        </button>
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          Create New Event
        </button>
      </div>
      <div className="contentkk">
        {activeTab === "active" && <ActiveEvents />}
        {activeTab === "all" && <AllEvents />}
        {activeTab === "create" && <CreateEvent />}
      </div>
    </div>
  );
};

export default MyEvents;
// import React, { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Navigate } from "react-router-dom";
// import { auth } from "../services/firebase";
// import ActiveEvents from "./ActiveEvents";
// import AllEvents from "./AllEvents";
// import CreateEvent from "./CreateEvent";
// import "../styles/MyEvents.css";

// const MyEvents: React.FC = () => {
//   const [user] = useAuthState(auth);
//   const [activeTab, setActiveTab] = useState<"active" | "all" | "create">(
//     "active"
//   );
//   const [redirect, setRedirect] = useState<boolean>(false);

//   useEffect(() => {
//     if (!user) {
//       window.alert("You need to sign in to access this page.");
//       setRedirect(true);
//     }
//   }, [user]);

//   if (redirect) {
//     return <Navigate to="/signin" />;
//   }

//   return (
//     <div className="my-events-container-mine">
//       <div className="sidebar">
//         <button
//           className={activeTab === "active" ? "active" : ""}
//           onClick={() => setActiveTab("active")}
//         >
//           My Active Events
//         </button>
//         <button
//           className={activeTab === "all" ? "active" : ""}
//           onClick={() => setActiveTab("all")}
//         >
//           All of my Events
//         </button>
//         <button
//           className={activeTab === "create" ? "active" : ""}
//           onClick={() => setActiveTab("create")}
//         >
//           Create New Event
//         </button>
//       </div>
//       <div className="contentkk">
//         {activeTab === "active" && <ActiveEvents />}
//         {activeTab === "all" && <AllEvents />}
//         {activeTab === "create" && <CreateEvent />}
//       </div>
//     </div>
//   );
// };

// export default MyEvents;
