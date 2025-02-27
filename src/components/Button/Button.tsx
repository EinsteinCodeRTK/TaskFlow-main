import './_button.scss'
import React, { MouseEvent } from 'react'

interface Props {
    status: string
    text: string
    normal: boolean
    width: string
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const Button: React.FC<Props> = ({ status, text, normal, width, onClick }) => {
    return (
        <>
            {normal ? (
                <div 
                    style={{width: `${width}`}} 
                    className={`button ${status}`}
                    onClick={onClick}
                >
                    <p>{text}</p>
                </div>
            ) : (
                <div 
                    style={{width: `${width}`}} 
                    className="button grey"
                    onClick={onClick}
                >
                    <p>{text}</p>
                </div>
            )}
        </>
    )
}

export default Button;