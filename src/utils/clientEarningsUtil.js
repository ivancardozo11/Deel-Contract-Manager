export const calculateClientPayments = (jobs, contracts, clients) => {
    const clientPayments = {};
    jobs.forEach(job => {
        const contract = contracts.find(c => c.id === job.ContractId);
        if (contract) {
            const clientId = contract.ClientId;
            const client = clients.find(c => c.id === clientId);
            if (client) {
                const clientKey = `${client.firstName} ${client.lastName}`;
                if (!clientPayments[clientKey]) {
                    clientPayments[clientKey] = { clientId, name: clientKey, paid: 0 };
                }
                clientPayments[clientKey].paid += parseFloat(job.price);
            }
        }
    });
    return clientPayments;
};

export const sortAndLimitClients = (clientPayments, limit = 2) => {
    return Object.values(clientPayments)
        .sort((a, b) => b.paid - a.paid)
        .slice(0, limit);
};
