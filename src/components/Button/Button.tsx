import './_button.scss'
import React, { MouseEvent } from 'react'

interface Props {
    status: string
    text: string
    normal: boolean
    width: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({ status, text, normal, width, onClick, type = 'button' }) => {
    return (
        <>
            {normal ? (
                <button 
                    style={{width: `${width}`}} 
                    className={`button ${status}`}
                    onClick={onClick}
                    type={type}
                >
                    <p>{text}</p>
                </button>
            ) : (
                <button 
                    style={{width: `${width}`}} 
                    className="button grey"
                    onClick={onClick}
                    type={type}
                >
                    <p>{text}</p>
                </button>
            )}
        </>
    )
}

export default Button;