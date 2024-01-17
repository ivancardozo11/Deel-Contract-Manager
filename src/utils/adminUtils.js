export const calculateEarningsByProfession = (jobs) => {
    return jobs.reduce((acc, job) => {
        const profession = job.Contract.Contractor.profession;
        acc[profession] = (acc[profession] || 0) + parseFloat(job.price);
        return acc;
    }, {});
};

export const findHighestEarningProfession = (earningsByProfession) => {
    let bestProfession = null;
    let maxEarning = 0;
    for (const [profession, earning] of Object.entries(earningsByProfession)) {
        if (earning > maxEarning) {
            maxEarning = earning;
            bestProfession = profession;
        }
    }
    return bestProfession;
};
