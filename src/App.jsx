import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Users, Target, Briefcase, Calendar, Mail, ExternalLink, MapPin, Clock, AlertCircle, Ear, UserPlus, Activity, Globe, Shield, MessageCircle, Smartphone, CheckCircle, AlertTriangle, Heart, Phone } from 'lucide-react';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('accueil');
    const [activites, setActivites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || "https://docs.google.com/forms/d/e/1FAIpQLScaLXF0RLDpVjGatJd7JGNm93cWI2ObRT8bAY_dwWuquGsotg/viewform";
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    useEffect(() => {
        if (currentPage === 'actualites') {
            fetchActivites();
        }
    }, [currentPage]);

    const fetchActivites = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/activites`);
            if (!response.ok) throw new Error('Erreur lors du chargement des activités');
            const data = await response.json();
            setActivites(data);
        } catch (err) {
            setError(err.message);
            setActivites([]);
        } finally {
            setLoading(false);
        }
    };

    const navigation = [
        { id: 'accueil', label: 'Accueil' },
        { id: 'a-propos', label: 'À propos' },
        { id: 'agenda', label: 'Agenda' },
        { id: 'partenaires', label: 'Partenaires' },
        // { id: 'actualites', label: 'Actualités' },
        { id: 'contact', label: 'Contact' }
    ];

    const missions = [
        {
            icon: Ear,
            titre: "Écouter",
            description: "Recueillir les attentes et préoccupations de la jeunesse béninoise",
            bgColor: "from-green-50 to-green-100",
            borderColor: "border-green-200",
            iconBg: "bg-green-600"
        },
        {
            icon: UserPlus,
            titre: "Rassembler",
            description: "Créer un espace d'expression collective pour tous les jeunes",
            bgColor: "from-yellow-50 to-yellow-100",
            borderColor: "border-yellow-200",
            iconBg: "bg-yellow-500"
        },
        {
            icon: Activity,
            titre: "Agir",
            description: "Transmettre vos aspirations aux décideurs de demain",
            bgColor: "from-red-50 to-red-100",
            borderColor: "border-red-200",
            iconBg: "bg-red-600"
        }
    ];

    const partenaires = [
        {
            acronyme: "RJBD",
            nom: "Réseau des Jeunes Béninois de la Diaspora",
            role: "Organisation porteuse",
            description: "Promotion de la citoyenneté active et du leadership jeune",
            logo: "/images/logo-rjbd.jpeg",
            siteUrl: "https://www.rjbdbenin.com/"
        },
        {
            acronyme: "PJBenin",
            nom: "Parlement des Jeunes du Bénin",
            role: "Partenaire de mise en œuvre",
            description: "Représentation nationale et renforcement de la citoyenneté",
            logo: "/images/logo-pjb.jpg",
            siteUrl: "https://www.facebook.com/PJBenin"
        },
        {
            acronyme: "AMJB",
            nom: "Association Mairie des Jeunes du Benin",
            role: "Partenaire de mise en œuvre",
            description: "Gouvernance locale participative et implication des jeunes",
            logo: "/images/logo-amjb.jpg",
            siteUrl: "https://www.facebook.com/AMJBenin"
        },
        {
            acronyme: "FNEB",
            nom: "Fédération nationale des étudiants du Bénin",
            role: "Partenaire de mise en œuvre",
            description: "Organisation estudiantine représentant et défendant les intérêts des étudiants béninois",
            logo: "/images/logo-fneb.jpeg",
            siteUrl: "https://www.facebook.com/FNEBenin" // Ajout du lien pour FNEB
        }
    ];

    const getStatutBadge = (statut) => {
        const styles = {
            planifiee: 'bg-blue-100 text-blue-700',
            en_cours: 'bg-green-100 text-green-700',
            terminee: 'bg-gray-100 text-gray-700',
            annulee: 'bg-red-100 text-red-700'
        };
        const labels = {
            planifiee: 'Planifiée',
            en_cours: 'En cours',
            terminee: 'Terminée',
            annulee: 'Annulée'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[statut]}`}>
        {labels[statut]}
      </span>
        );
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('accueil')}>
                            <img
                                src="/images/logo-jmp.png"
                                alt="Jeunesse en Mouvement pour la Paix"
                                className="w-16 h-16 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="w-16 h-16 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-lg hidden items-center justify-center">
                                <span className="text-white font-bold text-xl">JMP</span>
                            </div>
                        </div>

                        <nav className="hidden md:flex space-x-1">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        currentPage === item.id
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <nav className="px-4 py-2 space-y-1">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setCurrentPage(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                        currentPage === item.id
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {currentPage === 'accueil' && (
                    <div className="space-y-16">
                        
                        {/* Hero Section */}
                        <div className="text-center py-20 rounded-2xl relative overflow-hidden">
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 bg-cover"
                                style={{ 
                                    backgroundImage: 'url("/images/background.jpeg")',
                                    backgroundPosition: 'center 5%',
                                    filter: 'brightness(1.2)'
                                }}
                            ></div>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-yellow-50/60"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                                    Jeunesse en Mouvement
                                </h1>
                                <h2 className="text-5xl md:text-7xl font-bold text-green-700 mb-8">
                                    pour la Paix
                                </h2>
                                <p className="text-2xl md:text-3xl text-gray-600 mb-10 max-w-4xl mx-auto px-4">
                                    Une plateforme pour recueillir les attentes et aspirations de la jeunesse béninoise
                                </p>
                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-10 py-4 bg-green-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all"
                                >
                                    Soumettre mes attentes
                                    <ChevronRight className="ml-2" size={24} />
                                </a>
                                <p className="mt-8 text-gray-800 text-xl md:text-2xl font-semibold">
                                    Faites entendre votre voix pour l'avenir du Bénin
                                </p>
                            </div>
                        </div>

                        {/* Notre Mission */}
                        <div className="py-12">
                            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Notre Mission</h2>

                            <div className="grid md:grid-cols-3 gap-8 mb-16">
                                {missions.map((mission, index) => {
                                    const IconComponent = mission.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`bg-gradient-to-br ${mission.bgColor} border-2 ${mission.borderColor} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow`}
                                        >
                                            <div className={`w-20 h-20 ${mission.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                                <IconComponent className="text-white" size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{mission.titre}</h3>
                                            <p className="text-gray-700 leading-relaxed">{mission.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Votre voix compte */}
                        <div className="bg-green-600 text-white rounded-2xl py-16 px-8 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Votre voix compte</h2>
                            <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
                                Participez à la construction d'un Bénin meilleur en partageant vos attentes pour le prochain Président de la République
                            </p>
                            <a
                                href={GOOGLE_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-10 py-4 bg-white text-green-600 text-lg font-bold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                Participer maintenant
                                <ChevronRight className="ml-2" size={24} />
                            </a>
                        </div>

                        {/* Statistiques - Logos des organisations */}
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Organisateurs</h3>
                            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {partenaires.map((partenaire, index) => (
                                    <div key={index} className="text-center p-6">
                                        <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                            {partenaire.siteUrl ? (
                                                <a href={partenaire.siteUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full object-contain hover:opacity-80 transition-opacity">
                                                    <img 
                                                        src={partenaire.logo} 
                                                        alt={partenaire.acronyme} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </a>
                                            ) : (
                                                <img 
                                                    src={partenaire.logo} 
                                                    alt={partenaire.acronyme} 
                                                    className="w-full h-full object-contain"
                                                />
                                            )}
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{partenaire.acronyme}</h4>
                                        <p className="text-sm text-gray-600">{partenaire.nom}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentPage === 'a-propos' && (
                    <div className="space-y-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">À propos du projet</h2>
                        </div>

                        {/* Introduction */}
                        <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl shadow-sm p-8 md:p-12 space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p>
                                Le projet <strong>Jeunesse en Mouvement pour la Paix</strong> est une initiative du <strong>Réseau des Jeunes Béninois de la Diaspora (RJBD)</strong>, en partenariat avec le <strong>Parlement des Jeunes du Bénin</strong>, l’<strong>Association Mairie des Jeunes du Benin (AMJB)</strong> et la <strong>Fédération nationale des étudiants du Bénin (FNEB)</strong>.
                            </p>
                            <p>
                                Dans un contexte préélectoral sensible, le projet a pour objectif de contribuer à la prévention des violences électorales et au renforcement de la cohésion sociale à travers l’implication active et responsable de la jeunesse. Il combine des actions de terrain (tournée de sensibilisation, dialogues communautaires, ateliers participatifs) et la mise en place d’une plateforme numérique nationale, destinée à recueillir directement les attentes, priorités et recommandations des jeunes vis-à-vis du prochain Président de la République.
                            </p>
                            <p>
                                Les contributions collectées en ligne et sur le terrain seront consolidées pour l’élaboration d’un mémorandum national de plaidoyer, qui sera officiellement soumis aux candidats à l’élection présidentielle ainsi qu’aux partis politiques, afin d’éclairer leurs engagements en matière de jeunesse, de paix et de gouvernance démocratique.
                            </p>
                        </div>

                        {/* Organisation Porteuse */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 shadow-sm">
                            <div className="flex items-center mb-8">
                                <div className="p-3 bg-green-600 rounded-lg mr-4">
                                    <Globe className="text-white" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Organisation Porteuse</h3>
                                    <p className="text-green-700 font-semibold">Réseau des Jeunes Béninois de la Diaspora (RJBD)</p>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                            <Users className="mr-2 text-green-600" size={20} /> Nature
                                        </h4>
                                        <p className="text-gray-700 pl-7">Réseau associatif de jeunesse</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                            <Heart className="mr-2 text-green-600" size={20} /> Vision
                                        </h4>
                                        <p className="text-gray-700 pl-7">Une jeunesse béninoise d’ici et d’ailleurs engagée, responsable et actrice de paix et de développement</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                            <Target className="mr-2 text-green-600" size={20} /> Mission
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-700 pl-7 space-y-1">
                                            <li>Promouvoir la citoyenneté et le leadership des jeunes</li>
                                            <li>Renforcer les liens entre la diaspora et le Bénin</li>
                                            <li>Contribuer à la paix, à la démocratie et à la cohésion sociale</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                            <Briefcase className="mr-2 text-green-600" size={20} /> Domaines d’intervention
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-700 pl-7 space-y-1">
                                            <li>Paix et prévention des conflits</li>
                                            <li>Engagement citoyen</li>
                                            <li>Dialogue jeunesse–institutions</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Partenaires */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Users className="mr-3 text-blue-600" size={28} /> Organisations Partenaires
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h4 className="font-bold text-gray-900">Parlement des Jeunes du Bénin (PJBenin)</h4>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h4 className="font-bold text-gray-900">Association Mairie des Jeunes du Benin (AMJB)</h4>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h4 className="font-bold text-gray-900">Fédération nationale des étudiants du Bénin (FNEB)</h4>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                Ces partenariats garantissent un fort ancrage territorial, institutionnel et une représentativité nationale de la jeunesse.
                            </p>
                        </div>

                        {/* Problématique */}
                        <div className="bg-orange-50 rounded-2xl p-8 md:p-12 border-l-4 border-orange-500">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <AlertTriangle className="mr-3 text-orange-600" size={28} /> Problématique
                            </h3>
                            <div className="space-y-4 text-gray-800">
                                <p>
                                    La jeunesse béninoise demeure insuffisamment intégrée aux mécanismes formels de dialogue politique et de gouvernance démocratique. Cette situation favorise son instrumentalisation en période électorale, en l’absence de cadres structurés d’expression de ses attentes et de ses priorités.
                                </p>
                                <p>
                                    Le faible dialogue entre la jeunesse et les acteurs politiques accentue les frustrations et augmente le risque de violences électorales. Il devient donc urgent de mettre en place des mécanismes inclusifs et innovants permettant aux jeunes de s’exprimer librement, pacifiquement et de manière structurée.
                                </p>
                            </div>
                        </div>

                        {/* Objectifs */}
                        <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                <Target className="mr-3 text-blue-600" size={28} /> Objectifs
                            </h3>
                            
                            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                                <h4 className="text-lg font-bold text-blue-800 mb-2">Objectif Général</h4>
                                <p className="text-gray-700">
                                    Contribuer à l’organisation d’une élection présidentielle apaisée au Bénin par l’implication active, responsable et constructive de la jeunesse.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-blue-800 mb-4">Objectifs Spécifiques</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        "Sensibiliser les jeunes à la paix et à la non-violence",
                                        "Prévenir les discours de haine et la manipulation politique",
                                        "Donner directement la parole aux jeunes à travers des cadres physiques et numériques",
                                        "Recueillir et formaliser les attentes de la jeunesse",
                                        "Mettre en réseau les associations de jeunesse",
                                        "Élaborer un mémorandum national de plaidoyer"
                                    ].map((obj, idx) => (
                                        <div key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                            <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                                            <span className="text-gray-700">{obj}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bénéficiaires */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-green-500">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <UserPlus className="mr-3 text-green-600" size={24} /> Bénéficiaires Directs
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-700">
                                        <ChevronRight className="text-green-500 mr-2" size={20} /> Jeunes de 18 à 35 ans
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <ChevronRight className="text-green-500 mr-2" size={20} /> Associations et organisations de jeunesse
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Users className="mr-3 text-blue-600" size={24} /> Bénéficiaires Indirects
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-700">
                                        <ChevronRight className="text-blue-500 mr-2" size={20} /> Communautés locales
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <ChevronRight className="text-blue-500 mr-2" size={20} /> Institutions publiques et acteurs politiques
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <ChevronRight className="text-blue-500 mr-2" size={20} /> Population béninoise dans son ensemble
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Activités et Méthodologie */}
                        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                <Activity className="mr-3 text-green-400" size={28} /> Activités et Méthodologie
                            </h3>
                            
                            <p className="text-gray-300 mb-8 text-lg">
                                Le projet repose sur une approche participative combinant actions physiques et outils numériques :
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mb-12">
                                <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-colors">
                                    <MapPin className="mx-auto text-green-400 mb-4" size={32} />
                                    <h4 className="font-bold mb-2">Tournée Nationale</h4>
                                    <p className="text-sm text-gray-400">Sensibilisation dans 15 communes</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-colors">
                                    <MessageCircle className="mx-auto text-yellow-400 mb-4" size={32} />
                                    <h4 className="font-bold mb-2">Dialogues</h4>
                                    <p className="text-sm text-gray-400">Ateliers participatifs et communautaires</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-colors">
                                    <Smartphone className="mx-auto text-blue-400 mb-4" size={32} />
                                    <h4 className="font-bold mb-2">Plateforme Numérique</h4>
                                    <p className="text-sm text-gray-400">Collecte des attentes en ligne</p>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                                <h4 className="text-xl font-bold text-green-400 mb-4">Focus : Plateforme Numérique</h4>
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    La plateforme permettra aux jeunes, sur des thématiques clairement définies (emploi, gouvernance, paix, éducation, inclusion, participation citoyenne), de formuler directement leurs attentes, priorités et recommandations à l’endroit du futur Président de la République.
                                </p>
                                <p className="text-gray-400 italic text-sm">
                                    Les contributions recueillies en ligne seront consolidées avec celles collectées sur le terrain pour l’élaboration d’un mémorandum national.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {currentPage === 'activites' && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900">Nos Activités</h2>
                            <button
                                onClick={fetchActivites}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                            >
                                <Calendar size={20} />
                                <span>Actualiser</span>
                            </button>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <AlertCircle className="text-yellow-600 mr-3" size={24} />
                                    <p className="text-yellow-700">Aucune activité disponible pour le moment</p>
                                </div>
                            </div>
                        )}

                        {!loading && activites.length === 0 && !error && (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <Briefcase className="mx-auto text-gray-400 mb-4" size={64} />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune activité programmée</h3>
                                <p className="text-gray-600">Les comptes rendus d'activités seront publiés ici après chaque événement</p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activites.map((activite) => (
                                <div key={activite.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
                                    <div className="relative h-56 bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
                                        {activite.imageUrl ? (
                                            <img
                                                src={`${API_BASE_URL}${activite.imageUrl}`}
                                                alt={activite.titre}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Briefcase className="text-gray-300" size={64} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            {getStatutBadge(activite.statut)}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{activite.titre}</h3>
                                        <p className="text-gray-700 mb-4 line-clamp-3">{activite.description}</p>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="text-green-600 flex-shrink-0" size={16} />
                                                <span className="line-clamp-1">
                          {formatDate(activite.dateDebut)}
                                                    {activite.dateFin && activite.dateDebut !== activite.dateFin && ` - ${formatDate(activite.dateFin)}`}
                        </span>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <MapPin className="text-green-600 flex-shrink-0" size={16} />
                                                <span className="line-clamp-1">{activite.lieu}</span>
                                            </div>

                                            {activite.nombreParticipants > 0 && (
                                                <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                                                    <Users className="text-green-600 flex-shrink-0" size={16} />
                                                    <span className="font-semibold text-green-700">{activite.nombreParticipants} participants</span>
                                                </div>
                                            )}
                                        </div>

                                        {activite.communes && activite.communes.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                                                {activite.communes.slice(0, 3).map((commune, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                                                    >
                            {commune}
                          </span>
                                                ))}
                                                {activite.communes.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{activite.communes.length - 3}
                          </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentPage === 'agenda' && (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Calendrier des Activités</h2>

                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Planning de la Caravane Nationale</h3>

                            <div className="space-y-6">
                                <div className="border-l-4 border-green-600 pl-6 py-4 hover:bg-green-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-green-600 mb-1">15 Février - 15 Mars 2026</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Collecte numérique des attentes</h4>
                                    <p className="text-gray-700">Collecte des contributions via la plateforme Google Forms</p>
                                </div>

                                <div className="border-l-4 border-yellow-500 pl-6 py-4 hover:bg-yellow-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-yellow-600 mb-1">6 - 16 Mars 2026</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Tournée nationale</h4>
                                    <p className="text-gray-700">Caravane de sensibilisation et consultations terrain dans 15 communes</p>
                                </div>

                                <div className="border-l-4 border-red-600 pl-6 py-4 hover:bg-red-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-red-600 mb-1">17 - 19 Mars 2026</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Analyse et rédaction</h4>
                                    <p className="text-gray-700">Consolidation des contributions et rédaction du mémorandum national</p>
                                </div>

                                <div className="border-l-4 border-green-700 pl-6 py-4 hover:bg-green-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-green-700 mb-1">20 Mars 2026</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Restitution et plaidoyer</h4>
                                    <p className="text-gray-700">Diffusion du mémorandum auprès des acteurs politiques et institutionnels</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentPage === 'partenaires' && (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Nos Partenaires</h2>

                        <div className="space-y-6">
                            {partenaires.map((partenaire, index) => (
                                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-6">
                                        <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg p-2">
                                            {partenaire.siteUrl ? (
                                                <a href={partenaire.siteUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full object-contain hover:opacity-80 transition-opacity">
                                                    <img 
                                                        src={partenaire.logo} 
                                                        alt={partenaire.acronyme} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </a>
                                            ) : (
                                                <img 
                                                    src={partenaire.logo} 
                                                    alt={partenaire.acronyme} 
                                                    className="w-full h-full object-contain"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{partenaire.nom} ({partenaire.acronyme})</h3>
                                            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-3">
                                                {partenaire.role}
                                            </div>
                                            <p className="text-gray-700">{partenaire.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentPage === 'contact' && (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Contactez-nous</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl shadow-md p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Mail className="text-green-600 mt-1" size={20} />
                                        <div>
                                            <div className="font-semibold text-gray-900">Email</div>
                                            <div className="text-gray-700">rjbd@rjbdbenin.com</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Phone className="text-green-600 mt-1" size={20} />
                                        <div>
                                            <div className="font-semibold text-gray-900">Téléphone</div>
                                            <div className="text-gray-700">+221 77 190 69 57</div>
                                            <div className="text-gray-700">+229 01 52 36 35 78</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Users className="text-green-600 mt-1" size={20} />
                                        <div>
                                            <div className="font-semibold text-gray-900">Organisation</div>
                                            <div className="text-gray-700">Réseau des Jeunes Béninois de la Diaspora (RJBD)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-8">
                                <h3 className="text-2xl font-bold mb-4">Rejoignez le mouvement</h3>
                                <p className="mb-6 leading-relaxed">
                                    Participez activement à la construction d'un Bénin apaisé et démocratique en soumettant vos attentes pour le prochain Président de la République.
                                </p>
                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Soumettre mes attentes
                                    <ExternalLink className="ml-2" size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Jeunesse en Mouvement pour la Paix</h3>
                            <p className="text-gray-400">
                                Contribuer à une élection présidentielle apaisée au Bénin
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Navigation rapide</h4>
                            <div className="space-y-2">
                                {navigation.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setCurrentPage(item.id);
                                            window.scrollTo(0, 0);
                                        }}
                                        className="block text-gray-400 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Contact</h4>
                            <p className="text-gray-400">
                                Réseau des Jeunes Béninois de la Diaspora (RJBD)
                            </p>
                            <p className="text-gray-400 mt-2">
                                rjbd@rjbdbenin.com
                            </p>
                            <p className="text-gray-400 mt-1">
                                +221 77 190 69 57
                            </p>
                            <p className="text-gray-400">
                                +229 01 52 36 35 78
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2026 Jeunesse en Mouvement pour la Paix. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;