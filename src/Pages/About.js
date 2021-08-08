import React from "react";
import AboutUs from "../Components/AboutUs"

function About() {

  const users = ["yykoca", "ramazankarisan", "galip16", "ZeynepGultekin"]
  
  return (
    <div className="usersDiv" >
      {users.map(user => {
        return <AboutUs user={user}/>
      })}
    </div>
  );
}

export default About;
