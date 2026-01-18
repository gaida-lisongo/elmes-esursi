import BannerCarousel, { IArticle } from "./BannerCarousel";

const Banner = async () => {
    // Simulation of the data fetch as provided by the user
    // We use this hardcoded data to match the specific request and ensure the design receives the exact content expected.
    const fetchedData = {
        success: true,
        articles: [
            {
                _id: '696d18c15a49095278c98114',
                photo: 'https://photos.radiookapi.net/picture/20240916013442331852_Bib.jpeg?imgmax=800',
                titre: 'Plan de passation des marchés 2026',
                sousTitre: 'L’ESURSI invite les centres et instituts de recherche à soumettre leurs besoins et projets',
                description: 'Le Ministère de l’Enseignement Supérieur, Universitaire, de la Recherche Scientifique et de l’Innovation (ESURSI) informe les Directeurs généraux des Centres et Instituts de recherche du lancement du processus de collecte des besoins et des projets, en vue de l’élaboration du Plan de Passation des Marchés (PPM) de l’exercice 2026.',
                contenu: 'Conformément aux directives nationales visant à optimiser la planification et l’exécution des investissements publics...',
                annexes: [],
                createdAt: '2026-01-18T17:30:41.944Z',
                updatedAt: '2026-01-18T17:30:41.944Z',
            },
            {
                _id: '696d19c25a49095278c98118',
                photo: 'https://minesursi.gouv.cd/images/WhatsApp%20Image%202026-01-01%20at%2011.05.21.jpeg',
                titre: 'Rentrée académique 2025-2026',
                sousTitre: 'Le Ministère de l’Enseignement Supérieur, Universitaire, Recherche Scientifique et Innovations (ESURSI) informe l’ensemble des établissements publics et privés d’enseignement supérieur et universitaire du lancement officiel d’une mission d’évaluation des activités liées à la rentrée académique 2025-2026.',
                description: 'Cette décision est contenue dans la Note circulaire n°001/2026...',
                contenu: 'Conformément aux directives nationales visant à optimiser la planification et l’exécution des investissements publics...',
                annexes: [],
                createdAt: '2026-01-18T17:34:58.492Z',
                updatedAt: '2026-01-18T17:34:58.492Z',
            },
            {
                _id: '696d1b2c3989622dfb68704d',
                photo: 'https://minesursi.gouv.cd/images/WhatsApp%20Image%202026-01-01%20at%2011.05.23.jpeg',
                titre: 'ESURSI : Nominations, promotions et admissions à l’honorariat au sein des Centres et Instituts de Recherche',
                sousTitre: 'Le Ministère de l’Enseignement Supérieur, Universitaire, Recherche Scientifique et Innovations (ESURSI) informe la communauté scientifique nationale et le public de la signature de trois Arrêtés ministériels majeurs...',
                description: 'Ces Arrêtés, signés le 22 décembre 2025...',
                contenu: 'Arrêté ministériel n°194 : Cadre administratif des Centres et Instituts de Recherche...',
                annexes: [],
                createdAt: '2026-01-18T17:41:00.939Z',
                updatedAt: '2026-01-18T17:41:00.939Z',
            }
        ]
    };

    return (
        <BannerCarousel articles={fetchedData.articles} />
    );
};

export default Banner;