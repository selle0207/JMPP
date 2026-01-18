import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Users, Target, Briefcase, Calendar, Mail, ExternalLink, MapPin, Clock, AlertCircle, Ear, UserPlus, Activity } from 'lucide-react';

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
        { id: 'actualites', label: 'Actualités' },
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
            logo: "/images/logo-rjbd.jpeg"
        },
        {
            acronyme: "AMJB",
            nom: "Association des Jeunes Maires du Bénin",
            role: "Partenaire de mise en œuvre",
            description: "Gouvernance locale participative et implication des jeunes",
            logo: "/images/logo-amjb.jpg"
        },
        {
            acronyme: "PJB",
            nom: "Parlement des Jeunes du Bénin",
            role: "Partenaire de mise en œuvre",
            description: "Représentation nationale et renforcement de la citoyenneté",
            logo: "/images/logo-pjb.jpg"
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
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold text-gray-800">Jeunesse en Mouvement</h1>
                                <p className="text-sm text-gray-600">pour la Paix</p>
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
                        <div className="text-center py-20 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl">
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                                Jeunesse en Mouvement
                            </h1>
                            <h2 className="text-5xl md:text-7xl font-bold text-green-700 mb-8">
                                pour la Paix
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto px-4">
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
                            <p className="mt-6 text-gray-500 text-sm">
                                Faites entendre votre voix pour l'avenir du Bénin
                            </p>
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
                            <div className="grid md:grid-cols-3 gap-8">
                                {partenaires.map((partenaire, index) => (
                                    <div key={index} className="text-center p-6">
                                        <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                            <img 
                                                src={partenaire.logo} 
                                                alt={partenaire.acronyme} 
                                                className="w-full h-full object-contain"
                                            />
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

                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p>
                                Le projet <strong>Jeunesse en Mouvement pour la Paix</strong> est une initiative du <strong>Réseau des Jeunes Béninois de la Diaspora (RJBD)</strong>, en partenariat avec l’<strong>Association des Jeunes Maires du Bénin (AMJB)</strong> et le <strong>Parlement des Jeunes du Bénin</strong>.
                            </p>
                            <p>
                                Dans un contexte préélectoral sensible, le projet a pour objectif de contribuer à la prévention des violences électorales et au renforcement de la cohésion sociale à travers l’implication active et responsable de la jeunesse. Il combine des actions de terrain (tournée de sensibilisation, dialogues communautaires, ateliers participatifs) et la mise en place d’une plateforme numérique nationale, destinée à recueillir directement les attentes, priorités et recommandations des jeunes vis-à-vis du prochain Président de la République.
                            </p>
                            <p>
                                Les contributions collectées en ligne et sur le terrain seront consolidées pour l’élaboration d’un mémorandum national de plaidoyer, qui sera officiellement soumis aux candidats à l’élection présidentielle ainsi qu’aux partis politiques, afin d’éclairer leurs engagements en matière de jeunesse, de paix et de gouvernance démocratique.
                            </p>
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
                                    <div className="text-sm font-semibold text-green-600 mb-1">15 Février - 15 Mars 2025</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Collecte numérique des attentes</h4>
                                    <p className="text-gray-700">Collecte des contributions via la plateforme Google Forms</p>
                                </div>

                                <div className="border-l-4 border-yellow-500 pl-6 py-4 hover:bg-yellow-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-yellow-600 mb-1">6 - 16 Mars 2025</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Tournée nationale</h4>
                                    <p className="text-gray-700">Caravane de sensibilisation et consultations terrain dans 15 communes</p>
                                </div>

                                <div className="border-l-4 border-red-600 pl-6 py-4 hover:bg-red-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-red-600 mb-1">17 - 19 Mars 2025</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Analyse et rédaction</h4>
                                    <p className="text-gray-700">Consolidation des contributions et rédaction du mémorandum national</p>
                                </div>

                                <div className="border-l-4 border-green-700 pl-6 py-4 hover:bg-green-50 transition-colors rounded-r-lg">
                                    <div className="text-sm font-semibold text-green-700 mb-1">20 Mars 2025</div>
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
                                            <img 
                                                src={partenaire.logo} 
                                                alt={partenaire.acronyme} 
                                                className="w-full h-full object-contain"
                                            />
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
                                            <div className="text-gray-700">contact@jmp-benin.org</div>
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
                                contact@jmp-benin.org
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Jeunesse en Mouvement pour la Paix. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;