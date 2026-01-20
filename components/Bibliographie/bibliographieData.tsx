
export interface Branding {
    _id: string;
    titre: string;
    subTitle: string;
    description: string[];
}

export interface Bibliographie {
    _id: string;
    title: string;
    image: string;
    facts: Branding[];
}

export const bibliographieData: Bibliographie = {
    "_id": "biog_sombo_2024",
    "title": "S.E. Prof. Dr. Marie-Thérèse Sombo Ayanne Safi Mukuna",
    "image": "https://minesursi.gouv.cd/images/WhatsApp%20Image%202025-04-29%20at%2018.35.05.jpeg",
    "facts": [
        {
            "_id": "brand_01",
            "titre": "Formation Académique d'Élite",
            "subTitle": "Spécialisation en Neuro-sciences",
            "description": [
                "Agrégée en neuro-psychiatrie au Centre Neuro-Psychopathologique (CNPP) en 2020.",
                "Professeure à la Faculté de Médecine de l'Université de Kinshasa.",
                "Détentrice d'un doctorat en médecine avec une expertise reconnue à l'échelle internationale."
            ]
        },
        {
            "_id": "brand_02",
            "titre": "Expertise Clinique et Recherche",
            "subTitle": "Engagement pour la Santé Publique",
            "description": [
                "Neuro-psychiatre au Centre Hospitalier Monkole depuis 2012.",
                "Chercheuse à l'unité de morbidité complexe de l'Institut National de Recherche Biomédicale (INRB).",
                "Trésorière de l'Association pour la Promotion des Neurosciences (APRONES)."
            ]
        },
        {
            "_id": "brand_03",
            "titre": "Parcours Pédagogique",
            "subTitle": "Rayonnement National",
            "description": [
                "Auteure de plus de 20 publications scientifiques internationales sur les troubles neuro-développementaux et le VIH.",
                "Membre active du comité d'éthique de l'École de Santé Publique de l'UNIKIN."
            ]
        },
        {
            "_id": "brand_04",
            "titre": "Carrière Politique",
            "subTitle": "Ministre de l'ESURSI",
            "description": [
                "Initiatrice de la transformation du ministère vers une synergie entre enseignement, recherche scientifique et innovations technologiques.",
                "Gestionnaire de réformes majeures portant sur la promotion statutaire et la relève académique."
            ]
        }
    ]
};