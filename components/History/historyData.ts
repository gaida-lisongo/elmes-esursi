export interface StoryTime {
  _id: string;
  title: string;
  time: string;
  description: string[];
}

export interface Story {
  _id: string;
  image: string;
  periode: string;
  event: string;
  faits: StoryTime[];
}

export const historyData: Story[] = [
  {
    "_id": "era_01",
    "image": "https://www.grandslacsnews.com/media/posts/62137c53cd14b467976905.jpg",
    "periode": "1954 - 1971",
    "event": "Fondation et Excellence Académique",
    "faits": [
      {
        "_id": "ft_01",
        "title": "Inauguration de l'Université Lovanium",
        "time": "12 octobre 1954",
        "description": [
          "Ouverture officielle au Mont Amba sous la direction de Monseigneur Luc Gillon.[1, 2]",
          "Pose de la première pierre du bâtiment de la Faculté des Sciences le 26 septembre 1954 ."
        ]
      },
      {
        "_id": "ft_02",
        "title": "Création de l'Université Officielle",
        "time": "11 novembre 1956",
        "description": [
          "Mise en place des premières facultés de droit et de philosophie à Elisabethville (Lubumbashi) ."
        ]
      }
    ]
  },
  {
    "_id": "era_02",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/UNAZA_logo.png",
    "periode": "1971 - 1981",
    "event": "L'Ère de l'Université Nationale du Zaïre (UNAZA)",
    "faits": [
      {
        "_id": "ft_03",
        "title": "Nationalisation des universités",
        "time": "1971",
        "description": [
          "Fusion des universités de Kinshasa, Kisangani et Lubumbashi en une seule entité (UNAZA).[4, 5]",
          "Politisation de l'appareil universitaire sous l'idéologie du MPR.[5, 4]"
        ]
      },
      {
        "_id": "ft_04",
        "title": "Standardisation des cycles",
        "time": "1972",
        "description": [
          "Organisation des études en trois cycles : graduat (3 ans), licence (2 ans) et doctorat .",
          "Unification des programmes sur l'ensemble du territoire national.[5]"
        ]
      }
    ]
  },
  {
    "_id": "era_03",
    "image": "https://www.une.cd/uploads/images/202407/image_870x_668ac793a0725.jpg",
    "periode": "1981 - 2014",
    "event": "Autonomie et Libéralisation du Secteur",
    "faits": [
      {
        "_id": "ft_05",
        "title": "Promulgation de l'Ordonnance-Loi 025-81",
        "time": "3 octobre 1981",
        "description": [
          "Éclatement de l'université unique et retour à l'autonomie de gestion des établissements.[6, 7]",
          "Création des conseils d'administration sectoriels pour les universités et instituts.[6, 4]"
        ]
      },
      {
        "_id": "ft_06",
        "title": "Fin du monopole d'État",
        "time": "29 avril 1989",
        "description": [
          "Autorisation légale pour les privés de créer des institutions d'enseignement supérieur.",
          "Prolifération des institutions sur toute l'étendue de la République."
        ]
      }
    ]
  },
  {
    "_id": "era_04",
    "image": "https://minesursi.gouv.cd/images/WhatsApp%20Image%202022-05-23%20at%2014.47.09.jpeg",
    "periode": "2014 - 2024",
    "event": "Modernisation et Passage au Système LMD",
    "faits": [
      {
        "_id": "ft_07",
        "title": "Loi-cadre de l'Enseignement National",
        "time": "11 février 2014",
        "description": [
          "Consécration du passage au système LMD pour l'harmonisation avec les standards internationaux.[8, 9]",
          "Reconnaissance de l'enseignement ouvert et à distance via les TIC.[9, 10]"
        ]
      },
      {
        "_id": "ft_08",
        "title": "Généralisation du système LMD",
        "time": "7 décembre 2021",
        "description": [
          "Arrêté ministériel rendant obligatoire le système LMD dans tous les établissements.[11]",
          "Lancement du projet de numérisation des cartes d'étudiants nationales ."
        ]
      }
    ]
  },
  {
    "_id": "era_05",
    "image": "https://minesursi.gouv.cd/images/WhatsApp%20Image%202025-12-20%20at%2018.03.00.jpeg",
    "periode": "2024 - Présent",
    "event": "Mutation vers l'ESURSI et l'Innovation",
    "faits": [
      {
        "_id": "ft_09",
        "title": "Création du Ministère de l'ESURSI",
        "time": "Mai 2024",
        "description": [
          "Transformation de l'ESU en ESURSI (Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante).",
          "Prise de fonction de la Prof. Marie-Thérèse Sombo Safi Mukuna le 13 juin 2024 ."
        ]
      },
      {
        "_id": "ft_10",
        "title": "Impulsion Scientifique et Numérique",
        "time": "Janvier 2026",
        "description": [
          "Lancement du programme de numérisation intégrale du système éducatif.",
          "Homologation massive des grades et régularisation de la carrière des enseignants.[12, 13, 14]"
        ]
      }
    ]
  }
];