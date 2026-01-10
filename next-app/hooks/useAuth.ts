/*  This code creates a Custom Hook.
        A custom hook is a reusable JavaScript function that starts with "use" and extracts stateful logic from a component,
        allowing logic sharing (e.g. data fetching, form handling, authentication) across different components without duplicating code.
*/

//  Looks up the component tree to find the nearest AuthContext.Provider and retrieves its value.
//      Value is defined in AuthProvider component. { user, loading }
import { useContext } from 'react';
import { AuthContext } from '@/components/context/AuthProvider';

const useAuth = () => {
    // context will hold the value provided by AuthProvider 
    // context = { user, loading }
    const context = useContext(AuthContext);

    //  Safety check to ensure the hook is used within an AuthProvider.
    //  If useContext returns null or undefined, it means it failed to find a Provider.
    //      Imagine trying to use this hook in a component that is not wrapped by AuthProvider. (e.g. outside of layout.tsx),
    //      then context would be undefined, leading to potential runtime errors when trying to access properties on it.  
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export default useAuth;