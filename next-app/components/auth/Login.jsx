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
import { Toaster } from "@/components/ui/sonner";
import { Car } from 'lucide-react';

const Login = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter email and password to login</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
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