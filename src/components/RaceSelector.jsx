import { useState, useEffect } from "react";


function RaceSelector({meetingKey, setMeetingKey}){

    // meeting is the entire race weekend 

  //  const [selectedRace, setSelectedRace] = useState("");
    const [meetings, setMeetings] = useState([]);
    // race week user picks
    
   // sessions bleong to selected race week
   
    useEffect(() => {
        fetch(`https://api.openf1.org/v1/meetings`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (Array.isArray(data)) {
                setMeetings(data);
            } else {
                console.error(
                    "Meetings API did not return an array:",
                    data
                );
          
        }
    }); }, []);

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
                        {meeting.date_start}
                    </option>
                ))}
                
            </select>
    ); }

export default RaceSelector;