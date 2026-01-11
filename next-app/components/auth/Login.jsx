import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Car } from 'lucide-react';

import client from '@/api/client';

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0]?.value;
    const password = e.target[1]?.value;

    if (!email || !password) {
        toast.error("Email and password are required");
        return;
    };

    const { data, error } = await client.auth.signInWithPassword({ 
        email, 
        password,
    });
    
    // Confirm email is unchecked for hobby project purpose, in real production app, it is important to enforce email confirmation.
    if (error) {
        if (error.status == 400 && error.message.includes("email not confirmed")) {
            toast.error("Email not confirmed. Please check your inbox for the confirmation link.");
        }
        else {
            toast.error(`Login failed: ${error.message}`);
        }
        return;
    }

    toast.success("Login successful! Welcome back.");

  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter email and password to login</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter your password" />
                    </div>
                </div>
                <div className="mt-4">
                    <Button type="submit" className="w-full">Login</Button>
                </div>
            </form>
        </CardContent>
    </Card>
  );
};

export default Login;