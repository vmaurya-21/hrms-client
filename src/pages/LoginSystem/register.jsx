import { useRef, useState, useEffect } from "react";
import axios from '../../lib/axios';

const userRegex = /^[A-z][A-z0-9-_]{3,18}$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!*@#$%]).{8,24}$/;

export const Register = () => {
    

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => { usernameRef.current.focus(); }, []);
    useEffect(() => { setValidUsername(userRegex.test(username)); }, [username]);

    useEffect(() => { setValidEmail(emailRegex.test(email)); }, [email]);

    useEffect(() => {
        setValidPassword(passwordRegex.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userRegex.test(username) || !passwordRegex.test(password)) { return setErrMsg("Invalid Entry"); } // Prevents JS hacks

        try {
            await axios.post('/user/register',
                JSON.stringify({ username, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);           
            setUsername('');
            setEmail('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if(!err?.response) {
                setErrMsg("The server didn't respond.");
                setTimeout(() => { setErrMsg(''); }, 4000);
            } else if(err.response?.status === 409) {
                setErrMsg(err.response?.data?.message);
                setTimeout(() => { setErrMsg(''); }, 4000);
            } else {
                setErrMsg('Registration failed.');
                setTimeout(() => { setErrMsg(''); }, 4000);
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {success 
                ? <h2 className="text-3xl font-bold text-center text-green-500">Success! Now, log in</h2>
                : <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h1 className="text-3xl font-bold text-center">Register</h1>
                        <p ref={errRef} className={`${errMsg ? "text-red-600" : "hidden"} text-center`} aria-live="assertive">{errMsg}</p>

                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <input
                                type="text" id="username" ref={usernameRef} autoComplete="off" placeholder='Enter a username'
                                onChange={(e) => setUsername(e.target.value)} required
                                onFocus={() => setUsernameFocus(true)} onBlur={() => setUsernameFocus(false)}
                                aria-invalid={validUsername ? "false" :"true"} aria-describedby="uidnote"
                                className="w-full outline-none"
                            />
                        </div>
                        <p id="uidnote" className={`${usernameFocus && username && !validUsername ? "text-red-600 text-sm mt-2" : "hidden"}`}>
                            4 to 24 characters (must begin with a letter).
                            <br/>Letters, numbers, underscores, or hyphens.
                        </p>

                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <input
                                type="email" id="email" autoComplete="off" placeholder='Enter your email'
                                onChange={(e) => setEmail(e.target.value)} required
                                onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
                                aria-invalid={validEmail ? "false" :"true"} aria-describedby="emailnote"
                                className="w-full outline-none"
                            />
                        </div>
                        <p id="emailnote" className={`${emailFocus && email && !validEmail ? "text-red-600 text-sm mt-2" : "hidden"}`}>
                            Must be a valid email.
                        </p>

                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <input
                                type="password" id="password" placeholder='Enter a password'
                                onChange={(e) => setPassword(e.target.value)} required
                                onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}
                                aria-invalid={validPassword ? "false" :"true"} aria-describedby="pwdnote"
                                className="w-full outline-none"
                            />
                        </div>
                        <p id="pwdnote" className={`${passwordFocus && !validPassword ? "text-red-600 text-sm mt-2" : "hidden"}`}>
                            8 to 24 characters.
                            <br/>Must include uppercase, lowercase letters, a number, and a special character (! * @ # $ %).
                        </p>

                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <input
                                type="password" id="password_confirm" placeholder='Confirm password'
                                onChange={(e) => setMatchPassword(e.target.value)} value={matchPassword} required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="w-full outline-none"
                            />
                        </div>
                        <p id="confirmnote" className={`${matchFocus && !validMatch ? "text-red-600 text-sm mt-2" : "hidden"}`}>
                            Must match the first password input field.
                        </p>

                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                            disabled={(!validUsername || !validEmail || !validPassword || !validMatch) ? true : false}
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        You already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                    </div>
                </div>
            }
        </div>
    );
};
