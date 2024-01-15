import { Profile } from '../models/Profile.js';

const getProfile = async (req, res, next) => {
    try {
        const profileId = req.get('profile_id') || 0;
        if (!profileId) {
            return res.status(400).json({ error: 'No profile ID provided' });
        }

        const profile = await Profile.findOne({ where: { id: profileId } });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        req.profile = profile;
        next();
    } catch (error) {
        console.error('Error in getProfile middleware:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { getProfile };
