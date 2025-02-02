"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import React from "react"
import { doSignInWithEmailAndPassword, } from "../firebase/auth"
import { useAuth } from "../contexts/authContext"


export default function AuthPage() {

    const { userLoggedIn } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSigningIn, setIsSigningIn] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }

        console.log(isLogin ? "Logging in" : "Signing up", { email, password, name })
    }


    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
                    <CardDescription>
                        {isLogin ? "Enter your credentials to access your account" : "Create an account to get started"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            {isLogin ? "Login" : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

