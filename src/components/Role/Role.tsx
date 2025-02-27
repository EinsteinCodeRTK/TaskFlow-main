import "./_role.scss"

const Role: React.FC = () => {


    return (
        <div className="role">

            <div className="row">
                <div className="checkbox">

                </div>
                <div>
                    <h2>Owner</h2>
                    <p>Has access to all of the network. Can administrate your network, determine user roles, and update billing details.</p>
                </div>
            </div>

            <div className="row">
                <div className="checkbox">

                </div>
                <div>
                    <h2>Administrator</h2>
                    <p>Has access to the majority of network features, can determine user roles, and update billing details.</p>
                </div>
            </div>

            <div className="row">
                <div className="checkbox">

                </div>
                <div>
                    <h2>Member</h2>
                    <p>Has access to the majority of network features</p>
                </div>
            </div>

        </div>
    )
}

export default Role;