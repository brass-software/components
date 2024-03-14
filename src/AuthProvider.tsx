"use client";
import React, { useEffect, useState } from "react";

export default function AuthProvider(props: { children: any }) {
    const session = useSession();
    if (!session.IsLoggedIn) {
        return <LoginScreen
            sendCode={async (phone: string) => {
                await postAPI("/auth/send-login-code", {
                    phone,
                });
                return true;
            }}
            login={session.Login}
        />
    }
    return <body>{props.children}</body>
}

function LoginScreen(props: {
    sendCode: (phone: string) => Promise<boolean>,
    login: (phone: string, code: string) => Promise<boolean>,
}) {
    const [phone, setPhone] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState("");
    if (!codeSent) {
        return <Form onSubmit={async () => {
            await props.sendCode(phone);
            setCodeSent(true);
        }}>
            <FormField type="phone" id="phone" value={phone} onChange={setPhone} />
        </Form>
    }
    return <Form onSubmit={async () => {
        await props.login(phone, code);
    }}>
        <FormField type="login-code" id="code" value={code} onChange={setCode} />
    </Form>
}

function Form(props: {
    onSubmit: () => Promise<void>;
    children: any;
}) {
    const [loading, setLoading] = useState(false);

    return <div>
        {props.children}
        <button
            onClick={() => {
                setLoading(true);
                props.onSubmit().then(() => {
                    setLoading(false);
                });
            }}
            disabled={loading}
        >
            {loading ? <Spinner /> : 'Submit'}
        </button>
    </div>
}

function Spinner() {
    return 'Loading...'
}

function FormField(props: {
    type: "phone" | "login-code",
    id: string,
    value: string,
    onChange: (v: string) => void;
}) {
    switch (props.type) {
        case "phone":
            return <input type="text" id={props.id} value={props.value} onChange={e => props.onChange(e.target.value)} />
        case "login-code":
            return <input type="text" id={props.id} value={props.value} onChange={e => props.onChange(e.target.value)} />
    }
}

async function postAPI(endpoint: string, input: any) {
    const base = window.location.host.startsWith("localhost") ? "http://localhost:9000" : "https://api.brass.software";
    const res = await fetch(base+endpoint, {
        method: "POST",
        body: JSON.stringify(input),
    })
    return res.json();
}

function useSession() {
    const [Session, SetSession] = useState<Session>();
    const Login = async (phone: string, code: string) => {
        const session = await postAPI("/auth/login", {
            phone,
            code,
        });
        SetSession(session);
        return true;
    }
    useEffect(() => {
        const s = localStorage.getItem('session');
        if (s) {
            SetSession(JSON.parse(s));
        }
    }, []);
    return {
        Session,
        IsLoggedIn: Session ? true : false,
        Login,
    };
}

interface Session {
    UserID: string;
    Token: string;
}
