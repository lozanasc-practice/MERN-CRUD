import React from 'react';
import Axios from 'axios';
import './style/Menu.scss';

function Menu() {

    // State stuff 😁
    const [errors, setError] = React.useState(null);
    const [userName, setUserName] = React.useState('');
    const [userHobby, setUserHobby] = React.useState('');
    const [userArray, setUserArray] = React.useState([]);
    const [isLoaded, setLoadState] = React.useState(false);
    const [isDataChanged, setDataChanged] = React.useState(false);
    const [newName, setNewName] = React.useState('');
    const [newHobby, setNewHobby] = React.useState('');

    const editData = async(userid) => {
        try {
            const data = await Axios.post('/users/editUser', {
                user_id: userid,
                user_name: newName,
                user_hobby: newHobby,
            });
            const result = data.data;
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const addData = async(username, userhobby) => {
        try {
        const data = await Axios.post('/users/addUser', 
            {
                user_name: username,
                user_hobby: userhobby,
            });
        const result = data.data;
        return result;
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async() => {
        try {
            const data = await Axios.get('/users/viewUser?fields=user_id,user_name,user_hobby');
            const result = data.data;
            return result;   
        } catch (error) {
            console.log(error);
        }
    }

    const deleteData = async (userId) => {
        const data = await Axios.get(`users/deleteUser?user_id=${userId}`);
        const result = data.data;
        return result;
    }

    React.useEffect(() => {
        try {
            fetchData()
                .then(
                (data) => {
                    setTimeout(() => {
                        setLoadState(true);
                        setUserArray(data);
                    }, 900);
                    },
                    (err) => {
                        setLoadState(true);
                        setError(err);
                    }
                );   
        } catch (error) {
            console.log(error);
        }
        }
    ,[isDataChanged]
    );                             

    const outputData = () => {
        if(errors){
            return (<h1> Something went wrong 😢 </h1>);
        }
        else if (!isLoaded){
            return (<img style={{
                    margin: '10px auto',
                    height: '50px',
                    width: '50px',
            }} src='https://i.gifer.com/ZZ5H.gif' alt='Sorry for the wait, were still fetching the info you need...'></img>)
        }
        else {
            return (
                userArray.length > 0 ? userArray.map((data) => <div key={data.user_id} className='userCard'>
                    <h1>
                        Name: {data.user_name}
                    </h1>
                    <h2>
                    Hobby: {data.user_hobby}
                    </h2>
                        <button onClick={() => {
                            deleteData(data.user_id).then(
                                res => {console.log(res)
                                setDataChanged(prevState => (prevState ? false : true))}
                            )}}>
                            Delete
                        </button>
                        <h1>
                            Update Information:
                        </h1>
                        <input 
                        onChange={e => setNewName(e.target.value)}
                        placeholder='New name here:'
                        name='newName'
                        type="text" 
                        />
                        <input 
                        onChange={e => setNewHobby(e.target.value)}
                        placeholder='New hobby here:'
                        name='newHobby'
                        type="text" 
                        />         
                        <button
                        onClick={() => editData(data.user_id).then(res => {console.log(res);setDataChanged(prevState => (prevState ? false : true))})}
                        >
                            Edit
                        </button>
                </div>) : <h1> Its empty ⛔ </h1>
            )
        }
    }

    return (
        <div className="Menu">
            <h1>
                MERN CRUD Application
            </h1>
                <input 
                    onChange={(event) => setUserName(event.target.value)}
                    placeholder='Enter your Name'
                    type="text"/>
                <input 
                    onChange={(event) => setUserHobby(event.target.value)}
                    placeholder='Enter a Hobby'
                    type="text"/>
                <button
                onClick={() => addData(userName,userHobby).then(res => {console.log(res);setDataChanged(prevState => (prevState ? false : true))})}
                >
                    Add
            </button>
            <p>
                    {userName}
                    <br/>
                    {userHobby}
            </p>
            <h1>List :</h1>
            {outputData()}
        </div>
    )
}

export default Menu;
