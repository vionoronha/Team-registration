import viona from "./assets/viona.png";
import image from "./assets/image.png";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([
    {
      name: "Viona",
      email: "vionanoronha@gmail.com",
      image: viona,
      designation: "Leader",
    },
    { name: "Jex", email: "jex@gmail.com", image: image, designation: "User" },
    {
      name: "Derik",
      email: "derik@gmail.com",
      image: image,
      designation: "User",
    },
    {
      name: "Jojo",
      email: "jojo@gmail.com",
      image: image,
      designation: "User",
    },
    {
      name: "Charlie",
      email: "charlie@gmail.com",
      image: image,
      designation: "User",
    },
  ]);
  const [switchforms, setswitchforms] = useState(false);
  const [addedTeamMember, setAddedTeamMember] = useState([]);
  const [submissionSuc, setSubmissionSuc] = useState(false);

  function AddData(newdata) {
    setData((data) => [...data, newdata]);
  }

  return (
    <>
      <div className="main-page blur-pg">
        {submissionSuc ? (
          ""
        ) : (
          <>
            <RegestrationCommon
              AddData={AddData}
              switchforms={switchforms}
              setswitchforms={setswitchforms}
              addedTeamMember={addedTeamMember}
              setAddedTeamMember={setAddedTeamMember}
              SubmissionComplete={SubmissionComplete}
              setSubmissionSuc={setSubmissionSuc}
            />

            <MenueBar
              data={data}
              switchforms={switchforms}
              setAddedTeamMember={setAddedTeamMember}
              addedTeamMember={addedTeamMember}
            />
          </>
        )}
      </div>
      {submissionSuc ? <SubmissionComplete /> : ""}
    </>
  );
}

function RegestrationCommon({
  AddData,
  switchforms,
  setswitchforms,
  addedTeamMember,
  setAddedTeamMember,
  submissionSuc,
  setSubmissionSuc,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [leaderChecked, setLeaderChecked] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  function formHandle(e) {
    e.preventDefault();

    if (!username) return 0; // prevention clause

    //making a new object of the user
    const newData = {
      name: username,
      email: email,
      image: image,
      designation: `${leaderChecked ? "Leader" : "User"}`,
    };

    AddData(newData);

    // resetting the conditions after submission
    setUsername("");
    setEmail("");
    setLeaderChecked(false);
    setUserChecked(false);
  }

  function Switchform() {
    if (leaderChecked) {
      setswitchforms(!switchforms);
    }
  }

  function teamSubmit(e) {
    e.preventDefault();
    setSubmissionSuc(!submissionSuc);
  }

  if (switchforms) {
    return (
      <form className="form-bg form-team" onSubmit={teamSubmit}>
        <label for="team-name" class="text-2xl">
          Team Name?
        </label>
        <input type="text" id="team-name" />
        <div className="add-ppl">
          <MenueBar
            data={addedTeamMember}
            width={250}
            bgColour="white"
            height={210}
            border="none"
            margintp="0"
          />
        </div>
        <button class="bg-rose-600 hover:bg-rose-800 h-8 w-20 rounded-md text-white font-semibold mt-6">
          Submit
        </button>
      </form>
    );
  } else {
    return (
      <div className="form-ele">
        <form className="form-bg form-container" onSubmit={formHandle}>
          <div className="name-container">
            <label for="name" class="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="email-container">
            <label for="email" class="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="teamleader-chkbox">
            <label for="leader">Team Leader</label>
            <input
              type="checkbox"
              id="leader"
              checked={leaderChecked}
              onChange={(e) => setLeaderChecked(e.target.checked)}
            />
          </div>
          <div className="user-chkbox">
            <label for="user">User</label>
            <input
              type="checkbox"
              id="user"
              checked={userChecked}
              onChange={() => setUserChecked(!userChecked)}
            />
          </div>
          <button class="bg-rose-600 hover:bg-rose-800 h-10 w-20 rounded-lg text-white font-semibold">
            Submit
          </button>
        </form>

        <button
          class="bg-rose-600 hover:bg-rose-800 h-10 w-40 rounded-lg text-white font-semibold"
          onClick={Switchform}
        >
          {leaderChecked ? "Form a team" : "Join a team"}
        </button>
      </div>
    );
  }
}

function MenueBar({
  data,
  switchforms,
  width,
  bgColour,
  height,
  border,
  margintp,
  setAddedTeamMember,
  addedTeamMember,
}) {
  const [counter, setCounter] = useState(0);
  return (
    <div
      className="menue-bar"
      style={{
        width: `${width}px`,
        backgroundColor: `${bgColour}`,
        height: `${height}px`,
        border: `${border}`,
        marginTop: `${margintp}`,
      }}
    >
      <ul class="p-6 divide-y divide-slate-200">
        {data.map((personObj, ind) => (
          <PersonComponent
            personObj={personObj}
            key={ind}
            switchforms={switchforms}
            setAddedTeamMember={setAddedTeamMember}
            addedTeamMember={addedTeamMember}
            counter={counter}
            setCounter={setCounter}
          />
        ))}
      </ul>
    </div>
  );
}

function PersonComponent({
  personObj,
  ind,
  switchforms,
  setAddedTeamMember,
  addedTeamMember,
  counter,
  setCounter,
}) {
  function addPerson() {
    setAddedTeamMember([...addedTeamMember, personObj]);
    setCounter((c) => c + 1);
    console.log(counter);
  }

  return (
    <li class="flex py-4 first:pt-0 last:pb-0" value={ind}>
      <img class="h-10 w-10 rounded-full" src={personObj.image} alt="" />
      <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-slate-900">
          {personObj.name} | {personObj.designation}
        </p>
        <p class="text-sm text-slate-500 truncate">{personObj.email}</p>
      </div>
      <div className="plus-cont">
        {switchforms && counter < 4 ? (
          <button className="plus-btn" onClick={addPerson}>
            +
          </button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
}

function SubmissionComplete() {
  return (
    <div className="sub-card">
      <img src="src\assets\check.jpg" alt="check" />
      <p>Team Sucessfully Formed!!</p>
    </div>
  );
}

export default App;
