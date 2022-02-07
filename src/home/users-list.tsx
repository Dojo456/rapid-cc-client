import { IndividualModel } from "./models"

interface UsersListsProps {
    users: IndividualModel[]
}

const UsersList = (props: UsersListsProps): JSX.Element => {
    return (
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor:"lightgray", overflow: "hidden" }}>
            <ul style={{
                    position: "absolute", 
                    left: "5%", top: "5%",
                    overflow:"auto", 
                    height:"80%", width: "90%", 
                    listStyle:"none", 
                    padding:0, margin:0, 
                    background: "white" 
                }}>
                {props.users.map((user) => {
                    return (        
                    <li key={user.name} style={{backgroundColor: "grey", border: "1px", marginBottom:"5px"}}>
                        <p>
                            Name: {user.name} <br></br>
                            Email: {user.email}
                        </p>
                    </li>)
                })}
            </ul>
            <button style={{
                    position: "absolute", 
                    left: "5%", bottom: "5%",
                    overflow:"auto", 
                    height:"10%", width: "90%", 
                    listStyle:"none", 
                    padding:0, margin:0, 
                    background: "white" 
                }}>
                Contact
            </button>
        </div>
    )
}

export default UsersList