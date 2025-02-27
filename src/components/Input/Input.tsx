import React, { useState, Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faEye } from '@fortawesome/free-solid-svg-icons'

import './_input.scss'

interface Props {
    inputValue: string
    onInputValueChange: Dispatch<SetStateAction<string>>
    hint: string
    state: string
    error: string
    type: string
    field: string
    name?: string
    id?: string
}

const Input: React.FC<Props> = ({ 
    inputValue, 
    onInputValueChange, 
    hint, 
    state, 
    error, 
    type, 
    field,
    name,
    id 
}) => {
    const [hide, setHide] = useState<boolean>(true)

    return (
        <div className='input'>
            {field === "input" ? (
                <input 
                    className={state}
                    placeholder={hint}
                    type={!hide ? "text" : type}
                    value={inputValue}
                    onChange={(e) => onInputValueChange(e.target.value)}
                    name={name}
                    id={id}
                />
            ) : (
                <textarea 
                    className={state}
                    placeholder={hint}
                    value={inputValue}
                    onChange={(e) => onInputValueChange(e.target.value)}
                    name={name}
                    id={id}
                />
            )}

            {type === "password" && (
                <FontAwesomeIcon 
                    onClick={() => setHide(!hide)} 
                    className="icon" 
                    icon={faEye} 
                />
            )}

            {state === "error" && error && (
                <div className="error-message">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}

export default Input;