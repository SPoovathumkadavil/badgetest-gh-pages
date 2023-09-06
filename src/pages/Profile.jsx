import React from "react";
import Auth from '../modules/Auth'
import Account from '../modules/Account'
import { supabase } from "../modules/supabaseClient";
import { useState, useEffect } from "react";

export default function Profile() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    return(
        <div className="container" style={{ padding: '50px 0 100px 0', backgroundColor: 'light-blue' }}>
            {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
        </div>
    );
}