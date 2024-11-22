import axios from "axios";
import { backendBaseUrl } from "../Utilities/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utilities/loggedInUserSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [error, setError] = useState("");
    const [loginToast, setLoginToast] = useState(false);
    const [loginStatus, setLoginStatus] = useState(true);

    const [fName, setFName] = useState("Srijan");
    const [lName, setLName] = useState("Sinha");
    const [email, setEmail] = useState("srijan@gmail.com");
    const [password, setPassword] = useState("k8dfh8c@Pfv0gB2");
    const [phoneNumber, setPhno] = useState("98087768765");
    const [age, setAge] = useState("23");
    const [gender, setGender] = useState("male");
    const [photoUrl, setPhotoUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    const logInRequest = async () => {
        try {
            setError("");
            const result = await axios.post(
                `${backendBaseUrl}/user/login`,
                { email, password },
                { withCredentials: true }
            );

            setLoginToast(true);
            dispatch(addUser(result.data.user));
            setTimeout(() => navigator("/"), 1500);
        } catch (err) {
            navigator("/login");
            setError(err.response.data.error);
        }
    };

    const SignUpRequest = async() =>{
        try{
            setError("");
            const result = await axios.post(`${backendBaseUrl}/user/register`,{fName,lName,email,password,phoneNumber,age,gender,photoUrl},{withCredentials:true})
            setLoginToast(true);
            dispatch(addUser(result.data.user));
            setTimeout(() => navigator("/"), 1500);
        }catch(err){
            setError(err.response.data.error);
        }
    }

    setTimeout(() => setLoginToast(false), 3000);

    return (
        <>
            {loginToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Logged in</span>
                    </div>
                </div>
            )}
            <div className="w-4/12 mx-auto my-24">
                <div className="card bg-base-200 w-96 shadow-xl p-10">
                    {loginStatus ? <span>Log in</span> : <span>Sign up</span>}
                    {/* Email Input */}
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {/* Password Input */}
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {/* First Name Input */}
                    {!loginStatus && (
                        <>
                            <label className="input input-bordered flex items-center gap-2 my-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={(e) => setFName(e.target.value)}
                                />
                            </label>
                            {/* Last Name Input */}
                            <label className="input input-bordered flex items-center gap-2 my-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Last Name"
                                    value={lName}
                                    onChange={(e) => setLName(e.target.value)}
                                />
                            </label>
                            {/* Phone Number Input */}
                            <label className="input input-bordered flex items-center gap-2 my-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhno(e.target.value)}
                                />
                            </label>
                            {/* Age Input */}
                            <label className="input input-bordered flex items-center gap-2 my-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            {/* Gender Input */}
                            <label className="input input-bordered flex items-center gap-2 my-2">
                                <select
                                    className="grow"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                            {/* Photo URL Input */}
                            <label className="input input-bordered flex items-center gap-2 my-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Photo URL"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                        </>
                    )}
                    {/* Error Message */}
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Actions */}
                    <div className="card-body items-center text-center">
                        <div className="card-actions">
                            <button
                                className="btn btn-primary"
                                onClick={loginStatus ? logInRequest : SignUpRequest}
                            >
                                {loginStatus ? "Log in" : "Sign up"}
                            </button>
                        </div>
                        <div
                            className="text-blue-500 cursor-pointer"
                            onClick={() => setLoginStatus(!loginStatus)}
                        >
                            {loginStatus ? (
                                <span>New user? Sign up here</span>
                            ) : (
                                <span>Already registered? Log in here</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
