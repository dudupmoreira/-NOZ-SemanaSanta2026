// API Route: GET /api/opportunities/search
// Proxy seguro para buscar oportunidades sem expor o token no frontend

export default async function handler(req, res) {
    // Apenas GET é permitido
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { location_id, limit } = req.query;

        if (!location_id) {
            return res.status(400).json({ error: 'location_id is required' });
        }

        // Buscar token das variáveis de ambiente
        const token = process.env.HIGHLEVEL_API_TOKEN;
        
        if (!token) {
            return res.status(500).json({ error: 'API token not configured' });
        }

        // Fazer a chamada para a API do HighLevel
        const response = await fetch(
            `https://services.leadconnectorhq.com/opportunities/search?location_id=${location_id}&limit=${limit || 100}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Version': '2021-07-28',
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('HighLevel API Error:', response.status, errorText);
            return res.status(response.status).json({ 
                error: 'HighLevel API error',
                status: response.status,
                details: errorText
            });
        }

        const data = await response.json();
        
        // Retornar os dados
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error in opportunities/search:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
