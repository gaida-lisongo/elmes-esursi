export interface Structure {
    _id: string;
    designation: string;
    photo: string;
    description: string[];
}

export interface ESURSI {
    _id: string;
    sigle: string;
    logo: string;
    mission: string;
    organes: Structure[];
}

export const organisation: ESURSI = {
    "_id": "rdc_esursi_root_2026",
    "sigle": "ESURSI",
    "logo": "https://minesursi.gouv.cd/images/COMMUNIQUE%20OFFICIEL%20NUMERO%2007%20DU%2003%20JANVIER%202025.jpeg",
    "mission": "Doter le pays de cadres supérieurs capables de promouvoir l’esprit d’initiative et de créativité en vue de rendre service à la communauté et contribuer au développement de la société par une recherche scientifique organisée.",
    "organes": [
        {
            "_id": "str_001",
            "designation": "Cabinet du Ministre",
            "photo": "/images/logo_news.png",
            "description": [
                "Organe politique chargé de définir la vision et les orientations stratégiques pour la bonne marche du Ministère.",
                "Assure la supervision politique des réformes et la représentation officielle du secteur auprès des institutions."
            ]
        },
        {
            "_id": "str_002",
            "designation": "Secrétariat Général",
            "photo": "/images/logo_news.png",
            "description": [
                "Coordonne l'ensemble des activités administratives et assume la responsabilité de l'Administration Centrale.",
                "Gère les carrières du personnel, les infrastructures et les services académiques."
            ]
        },
        {
            "_id": "str_003",
            "designation": "Services Spécialisés",
            "photo": "/images/logo_news.png",
            "description": [
                "Unités techniques spécialisées comme les Presses Universitaires du Congo (PUC).",
                "Fournit un appui technique permanent pour l'édition scientifique et l'éducation continue."
            ]
        },
        {
            "_id": "str_004",
            "designation": "Conseils d’Administration",
            "photo": "/images/logo_news.png",
            "description": [
                "Organes collectifs de gestion des établissements d'Enseignement Supérieur et Universitaire.",
                "Veillent à l'application des lois et des instructions académiques dans tous les établissements publics et privés."
            ]
        },
        {
            "_id": "str_005",
            "designation": "ANAQ-ESU",
            "photo": "/images/logo_news.png",
            "description": [
                "Agence Nationale d'Assurance Qualité de l'Enseignement Supérieur et Universitaire.",
                "Élabore les référentiels, définit les normes de qualité et assure l'évaluation externe des établissements."
            ]
        },
        {
            "_id": "str_006",
            "designation": "Centres et Instituts de Recherche",
            "photo": "/images/logo_news.png",
            "description": [
                "Structures de recherche rattachées ou sous tutelle du Ministère.",
                "Responsables de la production scientifique et de l'innovation technologique appliquée aux besoins du pays."
            ]
        }
    ]
};