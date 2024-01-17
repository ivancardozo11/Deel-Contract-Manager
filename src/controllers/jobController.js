import { getUnpaidJobsForUser } from '../services/jobService.js';

const getUnpaidJobs = async (req, res) => {
    try {
        const profileId = req.profile.id;
        const unpaidJobs = await getUnpaidJobsForUser(profileId);

        if (unpaidJobs.length === 0) {
            return res.status(200).json({ message: 'This user has no outstanding unpaid jobs.' });
        }

        return res.json(unpaidJobs);
    } catch (error) {
        console.error('Error in getUnpaidJobs:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getUnpaidJobs };
