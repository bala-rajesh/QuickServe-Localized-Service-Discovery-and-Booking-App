import { useCallback, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { profileState } from '../state/atoms';
import { fetchProfileAPI, updateProfileAPI } from '../api/profileService';

/**
 * Hook to fetch and manage provider profile.
 */
export const useProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useRecoilState(profileState);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchProfileAPI();
            setProfile(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch profile:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setProfile]);

    const updateProfile = useCallback(async (updatedData) => {
        setLoading(true);
        try {
            const data = await updateProfileAPI(updatedData);
            setProfile(data);
            setError(null);
            return data;
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setProfile]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { loading, error, profile, fetchProfile, updateProfile };
};