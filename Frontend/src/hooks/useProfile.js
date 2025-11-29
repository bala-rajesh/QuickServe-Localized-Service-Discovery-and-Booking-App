import { useCallback } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { profileState } from '../state/atoms';
import { fetchProfileDataAPI, updateProfileDataAPI } from '../api/profileService';

/**
 * A custom hook to manage profile data.
 * Provides functions to load and update the profile.
 */
export const useProfile = () => {
    const setProfile = useSetRecoilState(profileState);
    const profile = useRecoilValue(profileState);

    const loadProfile = useCallback(async () => {
        try {
            const data = await fetchProfileDataAPI();
            setProfile(data);
        } catch (error) {
            console.error("Failed to load profile data:", error);
        }
    }, [setProfile]);

    const updateProfile = useCallback(async (updatedData) => {
        try {
            const data = await updateProfileDataAPI(updatedData);
            setProfile(prevProfile => ({ ...prevProfile, ...data }));
        } catch (error) {
            console.error("Failed to update profile data:", error);
        }
    }, [setProfile]);

    return { profile, loadProfile, updateProfile };
};