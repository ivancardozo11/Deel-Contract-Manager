export const calculateProfessionEarnings = (jobs, contracts, profiles) => {
    const professionEarnings = {};

    jobs.forEach(job => {
        const contract = contracts.find(contract => contract.id === job.ContractId);
        const contractorProfile = profiles.find(profile => profile.id === contract?.ContractorId);
        const profession = contractorProfile?.profession;
        if (profession) {
            if (!professionEarnings[profession]) {
                professionEarnings[profession] = 0;
            }
            professionEarnings[profession] += parseFloat(job.price);
        }
    });

    return professionEarnings;
};

export const findHighestEarningProfession = (professionEarnings) => {
    let bestProfession = null;
    let maxEarning = 0;

    for (const [profession, earning] of Object.entries(professionEarnings)) {
        if (earning > maxEarning) {
            maxEarning = earning;
            bestProfession = profession;
        }
    }

    return bestProfession;
};
