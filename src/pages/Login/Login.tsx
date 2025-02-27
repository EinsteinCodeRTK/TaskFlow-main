import './_login.scss'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import Rectangletop from '../../assets/rectangle-top.png'
import Rectanglebottom from '../../assets/rectangle-bottom.png'
import AddImage from '../../assets/gallery-add.svg'
import EmailVerify from '../../assets/email-verify.svg'
import EmailReset from '../../assets/email-reset.svg'
import Logo from '../../assets/TaskFlow_logo.png'
import Facebook from '../../assets/facebook.png'
import Google from '../../assets/google.png'
import Microsoft from '../../assets/microsoft.png'
import Logitech from '../../assets/logitech.png'
import Youtube from '../../assets/youtube.png'
import Etsy from '../../assets/etsy.png'
import Bankofamerica from '../../assets/bankofamerica.png'
import Thales from '../../assets/thales.png'
import Hulu from '../../assets/hulu.png'

interface LoginProps {
    initialMode?: 'login' | 'register';
}

const Login: React.FC<LoginProps> = ({ initialMode = 'login' }) => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    
    // State for form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [isLoginMode, setIsLoginMode] = useState<boolean>(initialMode === 'login');
    const [screen, setScreen] = useState<number>(1);

    // Atjaunojam isLoginMode, kad mainās initialMode
    useEffect(() => {
        setIsLoginMode(initialMode === 'login');
    }, [initialMode]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Lūdzu, ievadiet e-pastu un paroli");
            return;
        }

        try {
            setError("");
            setLoading(true);
            console.log("Mēģina pieslēgties ar:", email);
            await login(email, password);
            console.log("Pieslēgšanās veiksmīga, navigē uz /");
            navigate('/', { replace: true });
        } catch (error) {
            console.error("Pieteikšanās kļūda:", error);
            setError("Neizdevās pieslēgties. Pārbaudiet e-pastu un paroli.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Lūdzu, ievadiet e-pastu un paroli");
            return;
        }

        if (password.length < 6) {
            setError("Parolei jābūt vismaz 6 simbolus garai");
            return;
        }

        try {
            setError("");
            setLoading(true);
            console.log("Mēģina reģistrēt ar:", email);
            await register(email, password);
            console.log("Reģistrācija veiksmīga, navigē uz /login");
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Reģistrācijas kļūda:", error);
            setError("Neizdevās izveidot kontu. Iespējams, e-pasts jau ir reģistrēts.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAccount = async () => {
        if (!email || !password) {
            setError("Lūdzu, aizpildiet visus obligātos laukus");
            return;
        }

        if (password.length < 6) {
            setError("Parolei jābūt vismaz 6 simbolus garai");
            return;
        }

        try {
            setError("");
            setLoading(true);
            console.log("Mēģina izveidot kontu ar:", email);
            await register(email, password);
            console.log("Konts izveidots veiksmīgi, navigē uz /");
            navigate('/', { replace: true });
        } catch (error) {
            console.error("Reģistrācijas kļūda:", error);
            setError("Neizdevās izveidot kontu. Pārbaudiet ievadītos datus.");
        } finally {
            setLoading(false);
        }
    };

    const changeScreen = (up: boolean) => {
        if (up) {
            setScreen(screen + 1);
        } else {
            setScreen(screen - 1);
        }
    };

    let year: number = new Date().getFullYear();

    return (
        <div className='login'>
            <div className='col-l'>
                {!isLoginMode ? (
                    <div className='form'>
                        {screen === 1 && (
                            <div>
                                <img src={Logo} alt="TaskFlow Logo" />
                                <h2>Reģistrēties</h2>
                                {error && <div className="error-message">{error}</div>}

                                <p>TaskFlow palīdz uzlabot produktivitāti un sasniegt biznesa mērķus! Strādā gudrāk.</p>

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreateAccount();
                                }}>
                                    <div className='row'>
                                        <div style={{ marginRight: "9px" }}>
                                            <Input 
                                                hint="Vārds" 
                                                inputValue={name} 
                                                onInputValueChange={setName} 
                                                state={error ? "error" : ""} 
                                                error={error}
                                                type='text' 
                                                field='input'
                                            />
                                        </div>
                                        <div style={{ marginLeft: "9px" }}>
                                            <Input 
                                                hint="Uzvārds" 
                                                inputValue={surname} 
                                                onInputValueChange={setSurname} 
                                                state={error ? "error" : ""} 
                                                error={error}
                                                type='text' 
                                                field='input'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Input 
                                            hint="E-pasts" 
                                            inputValue={email} 
                                            onInputValueChange={setEmail} 
                                            state={error ? "error" : ""} 
                                            error={error}
                                            type='email' 
                                            field='input'
                                        />
                                    </div>

                                    <div>
                                        <Input 
                                            hint="Parole" 
                                            inputValue={password} 
                                            onInputValueChange={setPassword} 
                                            state={error ? "error" : ""} 
                                            error={error}
                                            type='password' 
                                            field='input'
                                        />
                                    </div>

                                    <div>
                                        <Button 
                                            type="submit"
                                            status={loading ? 'loading' : ''} 
                                            text='Turpināt' 
                                            normal={true} 
                                            width='inherit'
                                        />
                                    </div>
                                </form>

                                <div className='divider'></div>

                                <span>Jau ir konts?</span>&nbsp;
                                <span onClick={() => setIsLoginMode(true)} className='switch'>Pieslēgties</span>
                            </div>
                        )}

                        {screen === 2 && (
                            <div>
                                <img src={Logo} alt="TaskFlow Logo" />
                                <h2>Personalizēsim profilu</h2>

                                <p>Pievienojiet profila attēlu un segvārdu.</p>

                                <div className='add-image'>
                                    <div className='circle'>
                                        <img src={AddImage} alt="Add profile picture" />
                                    </div>
                                    <p>Profila attēls</p>
                                </div>

                                <div>
                                    <Input 
                                        hint="Segvārds" 
                                        inputValue={nickname} 
                                        onInputValueChange={setNickname} 
                                        state="" 
                                        error=""
                                        type='text' 
                                        field='input'
                                    />
                                </div>

                                <div onClick={() => navigate('/')}>
                                    <Button 
                                        status='' 
                                        text='Pabeigt' 
                                        normal={true} 
                                        width='inherit'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='form'>
                        <div>
                            <img src={Logo} alt="TaskFlow Logo" />
                            <h2>Pieslēgties</h2>
                            {error && <div className="error-message">{error}</div>}

                            <p>Pieslēdzieties savam TaskFlow kontam.</p>

                            <form onSubmit={handleLogin}>
                                <div>
                                    <Input 
                                        hint="E-pasts" 
                                        inputValue={email} 
                                        onInputValueChange={setEmail} 
                                        state={error ? "error" : ""} 
                                        error={error}
                                        type='email' 
                                        field='input'
                                    />
                                </div>

                                <div>
                                    <Input 
                                        hint="Parole" 
                                        inputValue={password} 
                                        onInputValueChange={setPassword} 
                                        state={error ? "error" : ""} 
                                        error={error}
                                        type='password' 
                                        field='input'
                                    />
                                </div>

                                <div>
                                    <Button 
                                        type="submit"
                                        status={loading ? 'loading' : ''} 
                                        text='Pieslēgties' 
                                        normal={true} 
                                        width='inherit'
                                    />
                                </div>
                            </form>

                            <div className='divider'></div>

                            <span>Nav konta?</span>&nbsp;
                            <span onClick={() => setIsLoginMode(false)} className='switch'>Reģistrēties</span>
                        </div>
                    </div>
                )}

                <div className='ltd'>
                    <span>©</span>&nbsp;<span>{year}</span>&nbsp;<span>TaskFlow</span>
                </div>
            </div>

            <div className='col-r'>
                <img className='rectangle-top' src={Rectangletop} alt="" />

                <div className='top'>
                    <p>
                        "TaskFlow palīdz man efektīvi organizēt darbu un komunicēt ar komandu. Tas ir vienkāršs, bet ļoti efektīvs rīks."
                    </p>
                    <p>
                        JĀNIS BĒRZIŅŠ
                    </p>
                    <p>
                        Projektu vadītājs
                    </p>
                    <img src={Facebook} alt="Facebook logo" />
                </div>

                <img className='rectangle-bottom' src={Rectanglebottom} alt="" />

                <div className='bottom'>
                    <p>Jau izmanto:</p>
                    <div className='icons'>
                        <img src={Google} alt="Google" />
                        <img src={Microsoft} alt="Microsoft" />
                        <img src={Logitech} alt="Logitech" />
                        <img src={Youtube} alt="Youtube" />
                        <img src={Etsy} alt="Etsy" />
                        <img src={Bankofamerica} alt="Bank of America" />
                        <img src={Thales} alt="Thales" />
                        <img src={Hulu} alt="Hulu" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;