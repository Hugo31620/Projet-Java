// Fonction pour récupérer les données depuis une API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Une erreur est survenue:', error);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la propager pour une gestion ultérieure
    }
}

// Utilisation de la fonction fetchData pour récupérer les données et les utiliser
fetchData()
    .then(data => {
        // Traitement des données récupérées
        console.log('Données récupérées:', data);
        // Vous pouvez effectuer d'autres opérations ici, comme la mise à jour de l'interface utilisateur
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Erreur de récupération de données:', error);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions en cas d'erreur
    });