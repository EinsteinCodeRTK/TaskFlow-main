import './_login.scss'
import React, { Dispatch, SetStateAction, useState } from 'react'


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


const Login: React.FC = () => {

    const [value, changeValue] = useState<string>("");

    const [login, setLogin] = useState<boolean>(false)

    const [screen, setScreen] = useState<number>(1)

    function changeScreen(up: boolean) {
        if (up) {
            setScreen(screen + 1)
        } else {
            setScreen(screen - 1)
        }
    }

    let year: number = new Date().getFullYear();

    return (
        <div className='login'>

            <div className='col-l'>



                {!login ? <div className='form'>


                    {screen == 1 && <div>
                        <img src={Logo} />
                        <h2>Sign up</h2>

                        <p>Luxafor solutions help boost individual productivity to skyrocket any business goals! Work Smarter. Earn More.</p>

                        <div className='row'>
                            <div style={{ marginRight: "9px" }} >
                                <Input hint="Name" inputValue={value} onInputValueChange={changeValue} state="alert" error='Invalid name' type='text' field='input' />
                            </div>
                            <div style={{ marginLeft: "9px" }} >
                                <Input hint="Surname" inputValue={value} onInputValueChange={changeValue} state="good" error='' type='text' field='input' />
                            </div>

                        </div>
                        <div>
                            <Input hint="Email" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />
                        </div>

                        <div>
                            <Input hint="Password" inputValue={value} onInputValueChange={changeValue} state="" error='' type='password' field='input' />
                        </div>

                        <div onClick={() => changeScreen(true)}>
                            <Button status='' text='Continue' normal={true} width='inherit' />
                        </div>

                        <span>By continuing, you agree to our</span>&nbsp;<span> <a target='_blank' href='https://luxafor.com/terms/'>Terms & Privacy Policy.</a></span>

                        <div className='divider'></div>

                        <span>Already have an account?</span>&nbsp;<span onClick={() => setLogin(true)} className='switch'>Log in</span>

                    </div>}



                    {screen == 2 && <div>
                        <img src={Logo} />
                        <h2>Let’s get personalized</h2>

                        <p>Add your profile picture and nickname so it’s easier for others to know who you are.</p>

                        <div className='add-image'>
                            <div className='circle'>
                                <img src={AddImage} />
                            </div>

                            <p>Profile picture</p>

                        </div>
                        <div>
                            <Input hint="Nickname" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />
                        </div>

                        <div onClick={() => changeScreen(true)}>
                            <Button status='' text='Continue' normal={true} width='inherit' />
                        </div>

                    </div>}

                    {screen == 3 && <div>
                        <img src={Logo} />
                        <h2>Verify your email</h2>

                        <p>You will need to verify your email to complete the sign up process!</p>

                        <img src={EmailVerify} />

                        <div>
                            <span>An email has been sent to </span><span className='email'>sam.smith@twitter.com</span><span> with a link to verify your account. If you have not received it after a few minutes, please check your spam folder.</span>
                        </div>

                        <div className='divider'></div>

                        <a href="https://taskflow.io">Return to homepage</a>

                    </div>}

                </div>

                    :

                    <div className='form'>


                        {screen == 1 && <div>
                            <img src={Logo} />
                            <h2>Log in</h2>

                            <p>Luxafor solutions help boost individual productivity to skyrocket any business goals! Work Smarter. Earn More.</p>

                            <div>
                                <Input hint="Email" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />
                            </div>

                            <div>
                                <Input hint="Password" inputValue={value} onInputValueChange={changeValue} state="" error='' type='password' field='input' />
                            </div>


                            <p onClick={() => changeScreen(true)} className='forgot-p'>Forgot password?</p>

                            <Button status='' text='Continue' normal={true} width='inherit' />





                            <div className='divider'></div>



                            <span>Don't have an account?</span>&nbsp;<span onClick={() => setLogin(false)} className='switch'>Sign up</span>
                        </div>
                        }

                        {screen == 2 && <div>
                            <img src={Logo} />
                            <h2>Forgot password?</h2>

                            <p>Enter your email address and we’ll send you a secure link to reset your password.</p>

                            <div>
                                <Input hint="Email" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />
                            </div>


                            <div onClick={() => changeScreen(true)}>
                                <Button status='' text='Continue' normal={true} width='inherit' />
                            </div>

                            <div onClick={() => changeScreen(false)}>
                                <Button status='' text='Back' normal={false} width='inherit' />
                            </div>

                        </div>
                        }



                        {screen == 3 && <div>
                            <img src={Logo} />
                            <h2>Check your email</h2>

                            <p>You will need to verify your email to reset your password!</p>

                            <img src={EmailReset} />

                            <div>
                                <span>An email has been sent to </span><span className='email'>sam.smith@twitter.com</span><span>  with a password reset link. If you have not received it after a few minutes, please check your spam folder.</span>
                            </div>

                            <div className='divider'></div>

                            <a href="https://taskflow.io">Return to homepage</a>

                        </div>}


                    </div>
                }



                <div className='ltd'>
                    <span>©</span>&nbsp;<span>{year}</span>&nbsp;<span> Greynut LTD</span>
                </div>


            </div>








            <div className='col-r'>

                <img className='rectangle-top' src={Rectangletop} />

                <div className='top'>
                    <p>
                        “I can now tell everyone when I’m busy or free. It's been very effective. I use the red signal sparingly and no one interrupted me so far. My next goal is to play with the Webhook API :)”
                    </p>

                    <p>
                        MICHELE BERTOLI
                    </p>

                    <p>
                        Front End Engineer at Facebook
                    </p>

                    <img src={Facebook} />

                </div>


                <img className='rectangle-bottom' src={Rectanglebottom} />

                <div className='bottom'>
                    <p>Already used in the offices of:</p>

                    <div className='icons'>
                        <img src={Google} />
                        <img src={Microsoft} />
                        <img src={Logitech} />
                        <img src={Youtube} />
                        <img src={Etsy} />
                        <img src={Bankofamerica} />
                        <img src={Thales} />
                        <img src={Hulu} />
                    </div>
                </div>




            </div>

        </div>
    )
}

export default Login;