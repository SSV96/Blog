// const user=useUser();

import { useState, useEffect } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useUser = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(getAuth(), (user: any) => {
			setUser(user);
			setIsLoading(false);
		});
		return unSubscribe;
	}, []);
	return { user, isLoading };
};
/*
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { user, isLoading };
}

export default useUser;
*/
