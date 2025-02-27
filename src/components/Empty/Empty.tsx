import Button from '../Button/Button'
import './_empty.scss'

import React, { Dispatch, SetStateAction } from 'react'


interface Props {
    header: string
    text: string
}

const Empty: React.FC<Props> = ({ header, text }) => {

    return(
        <div className='empty'>
            <h2>{header}</h2>
            <p>{text}</p>
           {/*} <Button status='' text='Create group' normal={true} width='fit-content' />*/}
        </div>
    )
}

export default Empty