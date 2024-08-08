import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from "@nextui-org/react";
import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import api from "../helper/api";

const RegisterPage = () => {
    const navigate = useNavigate()


    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log({ email, password });

    const HandleLogin = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/register`, { username, email, password });
            // console.log(data);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://gallery.galileor.xyz/161641-823944406.mp4"
                autoPlay
                muted
                loop
            ></video>
            <div className="absolute inset-0 flex items-center justify-center">
                <Card isBlurred className="p-10  w-4/5 max-w-xl rounded-xl">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                        <p className="text-tiny uppercase font-bold">Welcome</p>
                        <small className="text-default-500 pb-5">Log in to potret to continue.</small>
                        <h1 className="font-bold text-4xl pb-2 justify-center">Login</h1>
                        <CardBody className="overflow-visible py-2 ">
                            <form onSubmit={HandleLogin} className="w-full flex flex-col items-center justify-center gap-y-3 py-3" action="">
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    isRequired
                                    type="username"
                                    label="Username"
                                    errorMessage="Please enter a valid username"
                                    className="max-w-sm"
                                />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired
                                    type="email"
                                    label="Email"
                                    errorMessage="Please enter a valid email"
                                    className="max-w-sm"
                                />
                                <Input
                                    label="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    endContent={
                                        <button className="focus:outline-none pb-2" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-sm"
                                />
                                <Button type="submit" color="primary" size="lg" className="text-white px-32 mt-4">Login</Button>
                                <Divider className="my-3" />
                                <GoogleLogin />
                            </form>
                        </CardBody>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default RegisterPage