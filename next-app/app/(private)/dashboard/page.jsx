"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

import client from "@/api/client";

const Dashboard = () => {

  return (
    <div>
        <h1>Welcome to your Dashboard</h1>
        <Button onClick={() => {
            client.auth.signOut();
        }}
        >
            Log Out
        </Button>
    </div>
  )
};

export default Dashboard;