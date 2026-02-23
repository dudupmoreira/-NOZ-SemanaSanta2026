// API Route: PUT /api/opportunities/[id]
// Proxy seguro para atualizar oportunidades sem expor o token no frontend

export default async function handler(req, res) {
    const { id } = req.query;

    // Apenas PUT é permitido
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!id) {
        return res.status(400).json({ error: 'opportunity id is required' });
    }

    try {
        // Buscar token das variáveis de ambiente
        const token = process.env.HIGHLEVEL_API_TOKEN;
        
        if (!token) {
            return res.status(500).json({ error: 'API token not configured' });
        }

        // Fazer a chamada para a API do HighLevel
        const response = await fetch(
            `https://services.leadconnectorhq.com/opportunities/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Version': '2021-07-28',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(req.body)
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
        console.error('Error in opportunities/[id]:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
