"use client";

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

const Signup = () => {
  const handleSignup = async (e) => {
    // Prevent the default form submission behavior
    // Lets developers to handle the form submission with custom logic.
    e.preventDefault();

    // Extract email and password values from the form inputs
    const email = e.target[0]?.value;
    const password = e.target[1]?.value;

    // Basic validation to ensure email and password are provided
    if (!email || !password) {
        toast.error("Email and password are required");
        return;
    };
    
    // Call Supabase's signUp method to create a new user
    const { data, error } = await client.auth.signUp({
        email,
        password,
    });

    // Now here's the interesting part: How does Supabase check for an existing email?
    // Understanding:
    //      Supabase has a security feature, "Identity Obsfucation", which prevents revealing whether an email is already registered.
    //      So, even if the email exists, it won't throw an error. Instead, it will behave as if the signup was successful.
    //      This is to prevent malicious actors from enumerating valid email addresses in the system.
    //      Therefore, we treat any response without an error as a successful signup.
    // Solution:
    //      When signup is successful (regardless of email existence), the `identities` array will contain data.
    //      If the email already exists and email confirmation is enabled, Supabase returns a "fake" success object where the
    //      `identities` array is empty.
    if (error) {
        console.error("Error during sign up:", error);
        toast.error(`Signup failed: ${error.message}`);
    } 
    else if (data.user && data.user.identities && data.user.identities.length === 0) {
        // Email already exists case, but was not revealed as an error for security reasons
        // This is only for production use, to inform the user without exposing email existence.
        // As for hobby project like this one, I will make it to skip this message and go to the else block.
        toast.success("Verification link sent! If an account exists with this email, you will receive a link shortly.");
    }
    else {
        // For hobby application only
        // Signup successful
        toast.success("Signup successful! Welcome aboard.");
    };

  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Enter email and password to sign up</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignup}>
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
                    <Button type="submit" className="w-full">Sign Up</Button>
                </div>
            </form>
        </CardContent>
    </Card>
  );
}

export default Signup;