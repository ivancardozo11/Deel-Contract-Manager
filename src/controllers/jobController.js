import { getUnpaidJobsForUser, payForJob } from '../services/jobService.js';

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

const payJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.job_id, 10);
        if (isNaN(jobId)) {
            return res.status(400).json({ message: 'Invalid job ID.' });
        }
        const profileId = req.profile.id;

        const result = await payForJob(jobId, profileId);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ message: 'Payment successful.' });
    } catch (error) {
        console.error('Error in payJob:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export { getUnpaidJobs, payJob };
