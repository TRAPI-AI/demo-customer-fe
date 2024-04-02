import React from "react";

 function App() {
   return (
    
     <div
       style={{
         display: "flex", // Enable Flexbox
         flexDirection: "column", // Stack children vertically
         alignItems: "center", // Center items horizontally
         justifyContent: "center", // Center items vertically
         backgroundPosition: "center", // Center the background image
         padding: "20px",
         minHeight: "100vh", // Full height
         backgroundColor: 'gray'
       }}
     >
       <input
         style={{
           padding: "20px",
           margin: "10px 0",
           borderRadius: "5px",
           border: "1px solid #ccc",
           width: "50%",
           backgroundColor: "rgba(255, 255, 255, 1)", // Make input slightly transparent
         }}
         placeholder="Type here..."
       />
       <button
         style={{
           padding: "10px 20px",
           backgroundColor: "#007bff", // Bootstrap primary color
           color: "white",
           border: "none",
           borderRadius: "5px",
           cursor: "pointer",
           marginLeft: "10px",
         }}
       >
         Click Me
       </button>
       <ul
         style={{ listStyleType: "none", padding: 0, width: "33%", margin: 0 }}
       >
         {/* Example list items */}
         <li
           style={{
             margin: "10px 0",
             backgroundColor: "rgba(255, 255, 255, 0.8)", // Make list items slightly transparent
             padding: "10px",
             borderRadius: "5px",
             border: "1px solid black",
           }}
         >
           Item 1
         </li>
         <li
           style={{
             margin: "10px 0",
             backgroundColor: "rgba(255, 255, 255, 0.8)", // Make list items slightly transparent
             padding: "10px",
             borderRadius: "5px",
             border: "1px solid black",
           }}
         >
           Item 2
         </li>
         <li
           style={{
             margin: "10px 0",
             backgroundColor: "rgba(255, 255, 255, 0.8)", // Make list items slightly transparent
             padding: "10px",
             borderRadius: "5px",
             border: "1px solid black",
           }}
         >
           Item 3
         </li>
       </ul>
     </div>
   );
 }

 export default App;