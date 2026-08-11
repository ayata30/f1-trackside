import { useState, useEffect } from "react";


function RaceSelector(){

    // meeting is the entire race weekend 

  //  const [selectedRace, setSelectedRace] = useState("");
    const [meetings, setMeetings] = useState([]);
    // race week user picks
    const [meetingKey, setMeetingKey] = useState("");
   // const [selectedMeeting, setSelectedMeeting] = useState("");

   // sessions bleong to delcted race week
    const [sessions, setSessions] = useState([]);
   // const [sessionsKey, setSessionsKey] = useState("");

   
    useEffect(() => {
        if (!meetingKey) return;

        fetch(`https://api.open.f1.org/v1/sessions?meeting_key=${meetingKey}`

        )
        .then((res) => res.json())
        .then((data) => {
            setSessions(data);
        
        });
    }, [meetingKey]);

    return(
        <select 
            value={meetingKey}
            onChange={(e) => setMeetingKey(e.target.value)}
            >
                {meetings.map((meeting) => (
                    <option
                    key={meeting.meeting_key}
                    value={meeting.meeting_key}
                    >
                        {meeting.meeting_name}
                    </option>
                ))}
                
            </select>
    ); }


            /*)
        <section >

  
        <div>
            <h2>Select Race</h2>

            <select className="select-btn">
                <option>Belgian Grand Prix</option>
                <option>British Grand Prix</option>
                <option>Monaco Grand Prix</option>
            </select>

        </div>

        
              </section>

              <section>
                <div>

                </div>
              </section>
    )
}
*/
export default RaceSelector;