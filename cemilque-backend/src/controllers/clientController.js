import * as clientService from '../services/clientServices.js';

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createClients = async (req, res) => {
    try {
        const clientsData = req.body;
        const newClients = await clientService.createClients(clientsData);
        res.status(200).json(newClients);

    } catch (err) {
        console.error('Error adding clients:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateClients = async (req, res) => {
    try {
        const clientId  = req.params.id;
        const clientData = req.body;
        const updatedClients = await clientService.updateClients(clientData, clientId);
        if (!updatedClients) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json(updatedClients);

    } catch (err) {
        console.error('Error updating clients:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteClients = async (req, res) => {
    try {
        const clientId  = req.params.id;
        const deleteClients = await clientService.deleteClients(clientId);
        if (!deleteClients) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.status(200).json({ message: 'Data deleted successfully' });

    } catch (err) {
        console.error('Error deleteing clients:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const searchClients = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const clients = await clientService.searchClients(searchTerm)
        res.status(200).json(clients);
    } catch (err) {
        console.error('Error searching clients:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}