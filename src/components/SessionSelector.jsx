import { useState, useEffect } from "react";

function SessionSelector({ race, sessionKey, setSessionKey }) {

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        if (!race) return;

        fetch(`https://api.openf1.org/v1/sessions?meeting_key=${race}`)
            .then(res => res.json())
            .then(data => {
                console.log("sessions:", data);
                setSessions(data);
                
            });
    }, [race]);

    return (
        <>
            <select
                value={sessionKey}
                onChange={(e)=> setSessionKey(e.target.value)}
                >
    {sessions.map(session => (
        <option key={session.session_key}>
            {session.session_name}
        </option>
    ))}
</select>
        </>
    );
}



export default SessionSelector;