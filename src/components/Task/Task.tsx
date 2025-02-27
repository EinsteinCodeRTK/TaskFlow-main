import React, { Dispatch, SetStateAction, useState } from 'react'
import './_task.scss'

import CalendarIcon from '../../assets/calendar-icon.svg'
import InfoCircle from '../../assets/info-circle.svg'
import Comment from '../../assets/comment.svg'


const Task: React.FC = () => {


    return (
        <div className='task'>
            <div className='agenda'>
                <p>Design handoff for developer</p>
            </div>
            <div className='row'>
                <div className='date'>
                    <img src={CalendarIcon} />
                    <p>21-09-2022</p>
                    <p style={{marginLeft: "10px"}}>16:30</p>
                </div>
                <div className='priority'>
                    <img src={InfoCircle} />
                    <p>High</p>
                </div>

            </div>

            <div className='persons'>
                <img style={{ left: "30px" }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80" />
                <img style={{ left: "60px" }} src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80" />
                <img style={{ left: "90px" }} src="https://pbs.twimg.com/profile_images/980145664712740864/aNWjR7MB_400x400.jpg" />
            </div>


            <div className='comment'>
                <img src={Comment} />
                <p>3 comments</p>
            </div>

        </div>
    )
}

export default Task;