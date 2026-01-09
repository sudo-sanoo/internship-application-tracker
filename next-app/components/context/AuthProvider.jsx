'use client'; // This is a client component, used to explicitly mark it as such, because Next.js defaults to server components.

/* 
"import { createContext, useState, useEffect } from "react";" uses ECMAScript module syntax to import specific functions from the React library.

- "createContext" is used to create a Context object.
    In React, Context provides a way to pass data through the component tree without having to pass props down manually at every level. 
    This is often used for global data like themes, authentication status, or user settings.

- "useState" is a React Hook that lets you add state (data that can change over time and affect rendering) to functional components.
    useState returns an array with two elements: the current state value and a function to update that state.

- "useEffect" is another React Hook that lets you perform side effects in functional components, 
    such as fetching data or directly manipulating the DOM.
    Side effects are things that happen outside the normal flow of the component's rendering, 
    such as fetching data from an API, subscribing to events, or directly manipulating the DOM. 
    The code inside useEffect runs after the component renders
*/
import { createContext, useState, useEffect } from "react";
import client from "@/api/client"; // Importing the Supabase client instance from a local module located at "@/api/client".

// Creating a Context object for authentication.
const AuthContext = createContext(null);

// Component to check whether a user is authenticated or not.
// children: Represents all components inside the app (pages, navbar, etc.) that will be wrapped by AuthProvider.
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds the specific user object (email, id, metadata, etc.) if logged in, or null if logged out.
    const [loading, setLoading] = useState(true); // Starts as true, it tells the app: "Don't render anything yet, we're still checking if the user is logged in or not."

    // useEffect: The brain of the AuthProvider component.
    // This is where the actual interaction with Supabase happens to check the user's authentication status.
    useEffect(() => {
        // Step 1: Initial session check. "Do we have an active session in local storage or a logged-in user right now?"
        client.auth.getSession().then(({data}) => {
            setUser(data.session?.user || null);
            setLoading(false);
        });
        
        // Step 2: Real-Time Listener, sets up a subcription to listen for events like SIGNED_IN, SIGNED_OUT or TOKEN_REFRESHED.
        // To continue listening for changes in authentication state (like login/logout events).
        // If the user is not logged in, and they want to log in later, we want to make sure we know of that event,
        //      so we can store our user in that state variable.
        const { data: listener} = client.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null); // Update the user state based on the new session information.
        });
        
        // Step 3: Cleanup function.
        //      If the user leaves the page or the component is destroyed, this code ensures the listener is unsubscribed (removed).
        //      Without this, we could end up with memory leaks or unwanted behavior from lingering listeners.
        // To make sure when the app gets unrendered, we stop listening for auth events.
        return () => {
            listener.subscription.unsubscribe();
        }

    }, []); // Empty dependency array means this effect runs only once when the component mounts.

    // return: This renders the AuthContext.Provider component.
    //      value = {{ user, loading }}: This is the actual data being broadcasted. Any component in the app can now tune in to AuthContext
    //      to access "user" and "loading" states without having to pass them down manually as props.
    return (
        <AuthContext.Provider
            value = {{
                user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Exporting both AuthContext and AuthProvider for use in other parts of the application.
// If not exported, other components won't be able to access the authentication context or wrap themselves with the provider.
export { AuthContext, AuthProvider };