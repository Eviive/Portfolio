import { Title } from "@/components/ui/title";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

import styles from "./skills.module.scss";

export type SkillsDictionary = DictionaryWithTitle;

type Props = {
    dict: SkillsDictionary;
};

export type Skill = {
    name: string;
    years: SkillYear[];
};

export type SkillYear = {
    name: string;
    apprentissages: string[];
};

const skills: Skill[] = [
    {
        name: "Réaliser",
        years: [
            {
                name: "Développer des applications informatiques simples",
                apprentissages: [
                    "Implémenter des conceptions simples",
                    "Élaborer des conceptions simples",
                    "Faire des essais et évaluer leurs résultats en regard des spécifications",
                    "Développer des interfaces utilisateurs"
                ]
            },
            {
                name: "Partir des exigences et aller jusqu’à une application complète",
                apprentissages: [
                    "Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences",
                    "Appliquer des principes d’accessibilité et d’ergonomie",
                    "Adopter de bonnes pratiques de conception et de programmation",
                    "Vérifier et valider la qualité de l’application par les tests"
                ]
            },
            {
                name: "Adapter des applications sur un essemble de support",
                apprentissages: [
                    "Choisir et implémenter les architectures adaptées",
                    "Faire évoluer une application existante",
                    "Intégrer des solutions dans un environnement de production"
                ]
            }
        ]
    },
    {
        name: "Optimiser",
        years: [
            {
                name: "Appréhender et construire des algorithmes",
                apprentissages: [
                    "Analyser un problème avec méthode",
                    "Comparer des algorithmes pour des problèmes classiques",
                    "Formaliser et mettre en œuvre des outils mathématiques pour l’informatique"
                ]
            },
            {
                name: "Sélectionner les algorithmes adéquats pour répondre à un problème donné",
                apprentissages: [
                    "Choisir des structures de données complexes adaptées au problème",
                    "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes",
                    "Comprendre les enjeux et moyens de sécurisation des données et du code",
                    "Évaluer l’impact environnemental et sociétal des solutions proposées"
                ]
            },
            {
                name: "Analyser et optimiser des applications",
                apprentissages: [
                    "Anticiper les résultats de diverses métriques (En cours d'apprentissage)",
                    "Profiler, analyser et justifier le comportement d'un code existant",
                    "Choisir et utiliser des bibliothèques et méthodes dédiées au domaine d'application"
                ]
            }
        ]
    },
    {
        name: "Administrer",
        years: [
            {
                name: "Installer et configurer un poste de travail",
                apprentissages: [
                    "Identifier les différents composants (matériels et logiciels) d’un système numérique",
                    "Utiliser les fonctionnalités de base d’un système multitâches / multiutilisateurs",
                    "Installer et configurer un système d’exploitation et des outils de développement",
                    "Configurer un poste de travail dans un réseau d’entreprise"
                ]
            },
            {
                name: "Déployer des services dans une architecture réseau",
                apprentissages: [
                    "Concevoir et développer des applications communicantes",
                    "Utiliser des serveurs et des services réseaux virtualisés",
                    "Sécuriser les services et données d’un système"
                ]
            }
        ]
    },
    {
        name: "Gérer",
        years: [
            {
                name: "Concevoir et mettre en place une base de données à partir d’un cahier des charges client",
                apprentissages: [
                    "Mettre à jour et interroger une base de données relationnelle",
                    "Visualiser des données",
                    "Concevoir une base de données relationnelle à partir d’un cahier des charges"
                ]
            },
            {
                name: "Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité",
                apprentissages: [
                    "Optimiser les modèles de données de l’entreprise",
                    "Assurer la sécurité des données (intégrité et confidentialité)",
                    "Organiser la restitution de données à travers la programmation et la visualisation",
                    "Manipuler des données hétérogènes"
                ]
            }
        ]
    },
    {
        name: "Gérer des projets",
        years: [
            {
                name: "Identifier les besoins métiers des clients et des utilisateurs",
                apprentissages: [
                    "Appréhender les besoins du client et de l'utilisateur",
                    "Mettre en place les outils de gestion de projet",
                    "Identifier les acteurs et les différentes phases d’un cycle de développement"
                ]
            },
            {
                name: "Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs",
                apprentissages: [
                    "Identifier les processus présents dans une organisation en vue d’améliorer les systèmes d’information",
                    "Formaliser les besoins du client et de l'utilisateur",
                    "Identifier les critères de faisabilité d’un projet informatique",
                    "Définir et mettre en œuvre une démarche de suivi de projet"
                ]
            }
        ]
    },
    {
        name: "Collaborer",
        years: [
            {
                name: "Identifier ses aptitudes pour travailler dans une équipe",
                apprentissages: [
                    "Appréhender l’écosystème numérique",
                    "Découvrir les aptitudes requises selon les différents secteurs informatiques",
                    "Identifier les statuts, les fonctions et les rôles de chaque membre d’une équipe pluridisciplinaire",
                    "Acquérir les compétences interpersonnelles pour travailler en équipe"
                ]
            },
            {
                name: "Situer son rôle et ses missions au sein d’une équipe informatique",
                apprentissages: [
                    "Comprendre la diversité, la structure et la dimension de l’informatique dans une organisation",
                    "Appliquer une démarche pour intégrer une équipe informatique au sein d’une organisation",
                    "Mobiliser les compétences interpersonnelles pour travailler dans une équipe informatique",
                    "Rendre compte de son activité professionnelle"
                ]
            },
            {
                name: "Manager une équipe informatique",
                apprentissages: [
                    "Organiser et partager une veille numérique",
                    "Identifier les enjeux de l'économie de l'innovation numérique",
                    "Guider la conduite de changement informatique au sein d'une organisation",
                    "Accompagner le management de projet informatique"
                ]
            }
        ]
    }
];

export const Skills: FC<Props> = ({ dict }) => {
    return (
        <section id="skills" className={styles.skills}>
            <Title title={dict.title} />
            <ul className={styles.cards}>
                {skills.map(skill => (
                    <li key={skill.name} className={styles.card}>
                        <h2 className={styles.title}>{skill.name}</h2>
                        <ul className={styles.years}>
                            {skill.years.map((year, i) => (
                                <li key={year.name}>
                                    <h3>
                                        <span className={styles.yname}>Année {i + 1} :</span>{" "}
                                        {year.name}
                                    </h3>
                                    <ul className={styles.apprentissage}>
                                        {year.apprentissages.map(apprentissage => (
                                            <li key={apprentissage}>{apprentissage}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
};
