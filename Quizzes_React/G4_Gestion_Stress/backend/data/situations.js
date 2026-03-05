// 17 Students
export const students = [
    "meknassi O", "talbi F", "bouzian A", "hilali A", "chelf F",
    "taha", "zehran S", "feri S", "benouri A", "abkhti A",
    "ait bnesaid a", "douah a", "mehdi", "al alaoui h", "amghar y",
    "babakouya  M", ""
];

// ═══════════════════════════════════════════════════════
// 5 Situations basées sur le PDF "Gestion du Stress au Travail"
// Sources du PDF: Surcharge, Délais, Manque d'organisation,
//                 Conflits, Insécurité de l'emploi, Environnement
// ═══════════════════════════════════════════════════════

export const situations = [
    // ─── SITUATION 1: La surcharge de travail ───
    {
        id: 1,
        title: "La Surcharge de Travail",
        text: "Ahmed est employé dans une entreprise de services. Chaque jour, son responsable lui confie de nouvelles tâches sans vérifier s'il a terminé les précédentes. Ahmed travaille souvent le soir et le week-end, mais il n'arrive jamais à tout finir. Il commence à faire des erreurs, se sent épuisé et a du mal à dormir.",
        source: [
            "La surcharge de travail",
            "Le manque de temps et les délais serrés",
            "Le manque d'organisation",
            "L'environnement de travail"
        ],
        questions: [
            "Quelle est la source principale du stress dans cette situation ?",
            "Quel est l'impact personnel direct de cette surcharge de travail sur Ahmed ?",
            "Quel facteur lié à l'organisation de l'entreprise cause concrètement cette surcharge ?",
            "Comment le comportement d'Ahmed aggrave-t-il son propre niveau de stress ?",
            "Quelles sont les conséquences négatives de ce stress sur la performance globale ?",
            "Quelle solution spécifique serait la plus appropriée pour éviter cette situation à l'avenir ?"
        ],
        whys: [
            // Why 1 — Analyse de l'impact personnel
            [
                "Il ressent de la fatigue et des maux de tête fréquents",
                "Il a perdu sa motivation et son envie de travailler",
                "Il devient irritable et s'énerve facilement avec ses collègues",
                "Il n'arrive plus à se concentrer sur ses tâches"
            ],
            // Why 2 — Analyse du facteur organisationnel
            [
                "Son responsable ne planifie pas la répartition des tâches",
                "Il n'y a pas de système de priorisation des projets",
                "Les objectifs de l'équipe ne sont pas clairement définis",
                "L'entreprise manque de personnel pour le volume de travail"
            ],
            // Why 3 — Analyse du comportement face au stress
            [
                "Il accepte toutes les tâches sans oser dire non",
                "Il essaie de tout faire seul sans demander de l'aide",
                "Il ne prend jamais de pauses pendant la journée",
                "Il ne communique pas ses difficultés à son responsable"
            ],
            // Why 4 — Analyse des conséquences sur la performance
            [
                "La qualité de son travail a nettement diminué",
                "Il fait de plus en plus d'erreurs dans ses rapports",
                "Ses collègues doivent corriger ses erreurs, ce qui crée des tensions",
                "Les projets prennent du retard à cause de sa surcharge"
            ],
            // Why 5 — Analyse de la solution possible
            [
                "Une meilleure organisation et planification des tâches",
                "Apprendre à communiquer ses limites à son responsable",
                "Prendre des pauses régulières pour récupérer de l'énergie",
                "Demander un recrutement supplémentaire pour répartir la charge"
            ]
        ]
    },

    // ─── SITUATION 2: Les délais serrés ───
    {
        id: 2,
        title: "Les Délais Serrés",
        text: "Samira travaille dans un cabinet de conseil. Son équipe doit préparer une présentation importante pour un client dans 48 heures, alors que le travail nécessite normalement une semaine. Le chef de projet refuse de repousser la date. Samira sent la pression monter, elle mange mal et n'arrive pas à se détendre même après le travail.",
        source: [
            "Le manque de temps et les délais serrés",
            "La surcharge de travail",
            "Les conflits au travail",
            "L'insécurité de l'emploi"
        ],
        questions: [
            "Quelle est la source principale du stress dans cette situation ?",
            "Comment ces délais serrés affectent-ils la santé et le bien-être de Samira ?",
            "Quelle défaillance dans la gestion de projet a conduit à ces délais impossibles ?",
            "Quel problème de communication empêche l'équipe de résoudre correctement cette situation ?",
            "Quel est l'impact direct de ce stress sur la dynamique de l'équipe de Samira ?",
            "Quelle mesure préventive le cabinet de conseil devrait-il adopter ?"
        ],
        whys: [
            // Why 1 — Analyse de l'impact physique et mental
            [
                "Elle souffre de troubles du sommeil et de maux de tête",
                "Elle ressent une anxiété permanente même en dehors du travail",
                "Elle a perdu l'appétit et se sent physiquement épuisée",
                "Elle a du mal à se concentrer et fait des erreurs inhabituelles"
            ],
            // Why 2 — Analyse de la cause organisationnelle
            [
                "Le client a changé ses exigences au dernier moment",
                "Le chef de projet n'a pas estimé correctement le temps nécessaire",
                "Il n'y a pas de processus de planification dans l'entreprise",
                "L'équipe est trop petite pour le nombre de projets en cours"
            ],
            // Why 3 — Analyse de la communication
            [
                "Personne n'a osé dire au client que le délai est irréaliste",
                "Le chef de projet ne consulte pas l'équipe avant d'accepter les délais",
                "Les employés n'expriment pas leurs difficultés par peur d'être mal vus",
                "Il n'y a pas de réunion régulière pour discuter de la charge de travail"
            ],
            // Why 4 — Analyse de l'impact sur l'équipe
            [
                "L'ambiance dans l'équipe est devenue tendue et stressante",
                "Les membres de l'équipe se reprochent mutuellement les retards",
                "Certains collègues pensent à quitter l'entreprise",
                "La qualité du travail livré au client risque d'être mauvaise"
            ],
            // Why 5 — Analyse de la prévention
            [
                "Mettre en place un système d'estimation réaliste des délais",
                "Encourager la communication ouverte entre l'équipe et la direction",
                "Apprendre des techniques de relaxation pour gérer la pression",
                "Négocier avec le client des délais raisonnables dès le départ"
            ]
        ]
    },

    // ─── SITUATION 3: Le manque d'organisation ───
    {
        id: 3,
        title: "Le Manque d'Organisation",
        text: "Karim vient de rejoindre une startup en pleine croissance. Il n'y a pas de descriptions de poste claires, les réunions sont fréquentes mais sans ordre du jour, et les priorités changent chaque semaine. Karim ne sait jamais sur quoi il doit travailler en premier. Il se sent perdu, anxieux, et commence à douter de ses compétences.",
        source: [
            "Le manque d'organisation",
            "La surcharge de travail",
            "L'insécurité de l'emploi",
            "Les conflits au travail"
        ],
        questions: [
            "Quelle est la source principale du stress dans cette situation ?",
            "Quel impact psychologique ce manque d'organisation a-t-il sur Karim ?",
            "Quelle est la cause organisationnelle fondamentale de toute cette confusion ?",
            "Comment ce désordre impacte-t-il spécifiquement le travail quotidien de Karim ?",
            "Par quel type de réaction personnelle Karim aggrave-t-il sa propre frustration ?",
            "Quelle solution concrète aiderait Karim à reprendre le contrôle de son travail ?"
        ],
        whys: [
            // Why 1 — Analyse de l'impact psychologique
            [
                "Il ressent de l'anxiété car il ne sait pas ce qu'on attend de lui",
                "Il a perdu confiance en ses capacités professionnelles",
                "Il se sent démotivé et n'a plus envie de prendre des initiatives",
                "Il est irritable et a du mal à rester concentré"
            ],
            // Why 2 — Analyse de la structure organisationnelle
            [
                "Il n'existe pas de fiche de poste ni d'objectifs clairs",
                "Les décisions sont prises sans consulter les employés concernés",
                "La direction change de stratégie trop souvent sans explication",
                "Il n'y a pas d'outil de gestion de projet pour suivre les tâches"
            ],
            // Why 3 — Analyse de l'impact sur le travail quotidien
            [
                "Il passe beaucoup de temps en réunions inutiles",
                "Il commence des tâches qu'il doit abandonner quand les priorités changent",
                "Il refait souvent le même travail à cause de consignes contradictoires",
                "Il travaille sur des choses urgentes au lieu de choses importantes"
            ],
            // Why 4 — Analyse de la réaction personnelle
            [
                "Il n'ose pas demander des clarifications à son manager",
                "Il essaie de deviner les attentes au lieu de poser des questions",
                "Il travaille plus longtemps pour compenser le manque de direction",
                "Il compare sa situation avec ses anciens collègues et se sent frustré"
            ],
            // Why 5 — Analyse de la solution adaptée
            [
                "Proposer à la direction de définir des objectifs clairs et mesurables",
                "Utiliser un outil de planification pour organiser ses propres tâches",
                "Demander des réunions structurées avec un ordre du jour précis",
                "Communiquer régulièrement avec son manager pour clarifier les priorités"
            ]
        ]
    },

    // ─── SITUATION 4: Les conflits au travail ───
    {
        id: 4,
        title: "Les Conflits au Travail",
        text: "Dans le département marketing, Nadia et son collègue Youssef ne s'entendent plus depuis un désaccord sur la stratégie d'un projet. Youssef critique ouvertement le travail de Nadia en réunion. L'ambiance est devenue toxique, les autres collègues prennent parti, et le travail d'équipe en souffre. Nadia redoute d'aller travailler chaque matin.",
        source: [
            "Les conflits au travail",
            "L'environnement de travail",
            "La surcharge de travail",
            "Le manque d'organisation"
        ],
        questions: [
            "Quelle est la source principale du stress dans cette situation ?",
            "Quel est l'impact émotionnel direct de ce conflit sur Nadia ?",
            "Qu'est-ce qui favorise ou permet que ce conflit persiste au sein du département ?",
            "Quelles sont les conséquences indirectes de ce désaccord sur le reste de l'équipe ?",
            "Quel est le principal manquement du management dans ce scénario de tension ?",
            "Quelle serait la meilleure solution pour rétablir une ambiance saine dans ce département ?"
        ],
        whys: [
            // Why 1 — Analyse de l'impact émotionnel
            [
                "Nadia ressent du stress et de l'anxiété avant chaque réunion",
                "Elle a perdu sa motivation et évite de participer aux discussions",
                "Elle se sent humiliée et a perdu confiance en elle",
                "Elle devient agressive et impatiente avec les autres collègues"
            ],
            // Why 2 — Analyse de l'origine du conflit
            [
                "Le désaccord professionnel n'a jamais été résolu de manière constructive",
                "Il n'y a pas de règles claires pour gérer les différences d'opinion",
                "Le manager n'intervient pas pour résoudre le conflit",
                "La compétition entre collègues est encouragée par le système d'évaluation"
            ],
            // Why 3 — Analyse de l'impact sur l'équipe
            [
                "Les autres collègues sont obligés de choisir un camp",
                "Les réunions d'équipe sont devenues improductives à cause des tensions",
                "La collaboration sur les projets communs est devenue impossible",
                "Certains employés envisagent de changer de département"
            ],
            // Why 4 — Analyse du rôle du management
            [
                "Le manager évite les confrontations et ignore le problème",
                "Il n'y a pas de médiation ou de processus de résolution de conflits",
                "Les évaluations individuelles créent de la rivalité au lieu de la coopération",
                "La direction ne valorise pas le travail d'équipe dans ses objectifs"
            ],
            // Why 5 — Analyse de la solution
            [
                "Organiser une médiation professionnelle entre les deux parties",
                "Établir des règles de communication respectueuse en équipe",
                "Former les managers à la gestion des conflits",
                "Mettre en place des activités de team building pour renforcer la cohésion"
            ]
        ]
    },

    // ─── SITUATION 5: L'environnement de travail ───
    {
        id: 5,
        title: "L'Environnement de Travail",
        text: "Fatima travaille dans un open space bruyant avec 30 personnes. Les téléphones sonnent constamment, les collègues parlent fort, et la climatisation est souvent en panne. Elle a des maux de tête quotidiens, n'arrive pas à se concentrer sur ses tâches, et sa productivité a chuté de manière significative ces derniers mois.",
        source: [
            "L'environnement de travail",
            "Le manque d'organisation",
            "La surcharge de travail",
            "Les conflits au travail"
        ],
        questions: [
            "Quelle est la source principale du stress dans cette situation ?",
            "Quelles sont les répercussions physiques du bruit et des conditions de l'open space sur la santé de Fatima ?",
            "Qu'est-ce qui rend cet espace de travail inadapté d'un point de vue matériel ou réglementaire ?",
            "Pourquoi la réaction initiale (ou l'absence de réaction) de Fatima n'aide-t-elle pas à résoudre le problème ?",
            "Quelle est la principale erreur de la direction de l'entreprise concernant ce type de stress ?",
            "Quel aménagement ou quelle règle pourrait le mieux réduire le stress dans cet open space ?"
        ],
        whys: [
            // Why 1 — Analyse de l'impact physique
            [
                "Elle souffre de maux de tête quotidiens à cause du bruit",
                "La chaleur provoque de la fatigue et une baisse d'énergie",
                "Le bruit constant l'empêche de se concentrer sur les tâches complexes",
                "Elle a développé des douleurs musculaires dues à un mauvais poste de travail"
            ],
            // Why 2 — Analyse des facteurs environnementaux
            [
                "L'open space n'est pas adapté au type de travail qui nécessite de la concentration",
                "Il n'y a pas de règles sur le niveau de bruit dans le bureau",
                "Les équipements (climatisation, éclairage) ne sont pas régulièrement entretenus",
                "L'espace de travail est trop petit pour le nombre d'employés"
            ],
            // Why 3 — Analyse de la réaction de l'employée
            [
                "Elle utilise des écouteurs pour essayer de bloquer le bruit",
                "Elle arrive très tôt le matin pour travailler dans le calme",
                "Elle n'a jamais signalé le problème à la direction",
                "Elle pense que c'est normal et qu'elle doit s'adapter"
            ],
            // Why 4 — Analyse de la responsabilité de l'entreprise
            [
                "L'entreprise n'a pas fait d'étude sur les conditions de travail",
                "Le budget pour améliorer l'espace de travail n'est pas une priorité",
                "La direction ne prend pas en compte le bien-être des employés",
                "Il n'y a pas de personne responsable de l'hygiène et sécurité au travail"
            ],
            // Why 5 — Analyse de la solution adaptée
            [
                "Créer des espaces calmes dédiés au travail qui nécessite de la concentration",
                "Installer une meilleure isolation phonique et des équipements adaptés",
                "Permettre le télétravail quelques jours par semaine",
                "Mettre en place des règles de respect du calme dans l'open space"
            ]
        ]
    }
];
