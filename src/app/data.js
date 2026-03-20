const BASE_STYLE = "Civilisation ARA pre-diluvienne. Palette: beige froid, gris perle, pierre chaude, sable sombre, bleu eau efface, cuivre noirci, ivoire fume, noir mat. Lumiere analytique maitrisee. Matieres: geopolymeres mineraux, pierre ancienne, verre epais, cuivre assombri, ceramiques veinees, fibres tendues. Beaute par accord et fonction. Rendu photorealiste cinematographique, noble, grave, mineral."

const ARU_DESC = "Meme personnage ARU-NAEL: homme grande stature, peau brun-cendre reflets cuivres, visage long traits nobles, pommettes nettes, nez droit, yeux sombres. Cheveux nattes anneau metal mat. Sur-tunique gris nuit, tunique ecrue col droit, ceinture cuir noir, bandes bleu aux poignets."
const MAEL_DESC = "Meme personnage MAEL-IRA: femme peau brune chaude, longues tresses hautes. Tissus mineraux argile gris perle bleu eau. Grace fonctionnelle."
const KAEL_DESC = "Meme personnage KAEL: homme sec mobile beaute austere. Peau brun clair, traits nets, pommettes hautes, cheveux noirs tresses nuque. Manteau long fendu sable sombre ombres bleutees, brassards alliage mat."
const THO_DESC = "Meme personnage THO-AN: homme masse calme. Peau ambree, yeux sombres tres fixes, nez fort, pommettes larges. Cheveux noirs anneaux cuivre noirci longues meches epaules. Manteau sans manches toile minerale pierre chaude."
const RAKHAN_DESC = "Meme personnage RA-KHAN: homme peau sombre, crane ras, balafre machoire, traits larges. Armure souple brun-noir plaques mates bottes hautes."
const ENA_DESC = "Meme personnage ENA: femme claire grave. Peau cuivree claire, cheveux noirs lies bas, visage fin stable. Robe ivoire fume, voile lecture bleu pale."

export const CHARACTERS = [
  {
    id: 'aru-nael',
    name: 'ARU-NAËL',
    role: 'Régulateur supérieur',
    location: 'Talar',
    images: [
      {
        id: 'aru-1',
        label: 'Portrait référence',
        ratio: '2:3',
        isRef: true,
        prompt: `Portrait frontal. Homme grande stature, peau brun-cendre reflets cuivrés, visage long traits nobles, pommettes nettes, nez droit, yeux sombres. Cheveux nattés anneau métal mat. Sur-tunique gris nuit, tunique écrue col droit, ceinture cuir noir, bandes bleu aux poignets. Fond Talar pierre claire, lumière analytique froide. ${BASE_STYLE}`,
      },
      {
        id: 'aru-2',
        label: 'Bassin primaire',
        ratio: '2:3',
        isRef: false,
        prompt: `ARU-NAËL accroupi bord bassin primaire Talar. Eau immobile anormale. Globes de mesure suspendus. Lumière matinale. ${ARU_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'aru-3',
        label: 'Tablette minérale',
        ratio: '2:3',
        isRef: false,
        prompt: `ARU-NAËL tenant tablette minérale inclinée. Surface révèle courbes correspondances. Expression lit valeur identique trois cycles. ${ARU_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'aru-4',
        label: 'Seuil du Conseil',
        ratio: '2:3',
        isRef: false,
        prompt: `ARU-NAËL franchissant seuil salles Conseil Talar. Porte monumentale minérale. Posture sobre souveraine. ${ARU_DESC} ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'mael-ira',
    name: 'MAËL-IRA',
    role: 'Régulatrice des flux',
    location: 'Vara-Ind',
    images: [
      {
        id: 'mael-1',
        label: 'Portrait référence',
        ratio: '2:3',
        isRef: true,
        prompt: `Portrait frontal. Femme rivage bassin grâce fonctionnelle. Peau brune chaude, longues tresses hautes. Tissus minéraux argile gris perle bleu eau. Fond Vara-Ind, lumière aube humide. ${BASE_STYLE}`,
      },
      {
        id: 'mael-2',
        label: 'Plateforme orientale',
        ratio: '2:3',
        isRef: false,
        prompt: `MAËL-IRA debout plateforme orientale pieds nus basalte clair. Yeux mi-clos écoute profonde. Terrasses hydrauliques gradins. Aube. ${MAEL_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'mael-3',
        label: 'Tablette composite',
        ratio: '2:3',
        isRef: false,
        prompt: `MAËL-IRA mains sur tablette composite anormalement sèche. Expression légère inquiétude. Gros plan mi-corps. ${MAEL_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'mael-4',
        label: 'Bassins en gradins',
        ratio: '2:3',
        isRef: false,
        prompt: `MAËL-IRA profil observant bassins en gradins Vara-Ind. Posture autorité organique. ${MAEL_DESC} ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'kael',
    name: 'KAËL',
    role: 'Navigateur de grand rayon',
    location: 'Ora-Mu',
    images: [
      {
        id: 'kael-1',
        label: 'Portrait référence',
        ratio: '2:3',
        isRef: true,
        prompt: `Portrait frontal. Homme sec mobile beauté austère. Peau brun clair, traits nets, pommettes hautes, cheveux noirs tressés nuque. Manteau long fendu sable sombre ombres bleutées, brassards alliage mat. Lumière marine Ora-Mu. ${BASE_STYLE}`,
      },
      {
        id: 'kael-2',
        label: 'Terrasse arrimage',
        ratio: '2:3',
        isRef: false,
        prompt: `KAËL terrasse haute aire arrimage Ora-Mu. Regard vimanas en préparation. Falaises mer. ${KAEL_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'kael-3',
        label: 'Coursive sud',
        ratio: '2:3',
        isRef: false,
        prompt: `KAËL coursive sud Ora-Mu face jeune navigateur. Pierre noire autour. ${KAEL_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'kael-4',
        label: 'Navigation vimana',
        ratio: '2:3',
        isRef: false,
        prompt: `KAËL navigation bord vimana. Mains interface tablette ciel. Chambre sombre nacrée. ${KAEL_DESC} ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'tho-an',
    name: 'THO-AN',
    role: 'Architecte de profondeur',
    location: 'An-Ka',
    images: [
      {
        id: 'tho-1',
        label: 'Portrait référence',
        ratio: '2:3',
        isRef: true,
        prompt: `Portrait frontal. Homme plateau masse calme. Peau ambrée, yeux sombres très fixes, nez fort, pommettes larges. Cheveux noirs anneaux cuivre noirci longues mèches épaules. Manteau sans manches toile minérale pierre chaude. Lumière dure An-Ka. ${BASE_STYLE}`,
      },
      {
        id: 'tho-2',
        label: 'Garde-corps composite',
        ratio: '2:3',
        isRef: false,
        prompt: `THO-AN main sur garde-corps composite bleuté An-Ka. Pierre répond mémoire contrainte. ${THO_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'tho-3',
        label: 'Tablette trois lames',
        ratio: '2:3',
        isRef: false,
        prompt: `THO-AN observant tablette trois lames déployées. Lignes charge visibles. ${THO_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'tho-4',
        label: 'Berceaux lithiques',
        ratio: '2:3',
        isRef: false,
        prompt: `THO-AN devant berceaux lithiques vimanas altitude An-Ka. Coques renforcées derrière. ${THO_DESC} ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'ra-khan',
    name: 'RA-KHAN',
    role: 'Gardien de frontière',
    location: 'Ka-Ur',
    images: [
      {
        id: 'rakhan-1',
        label: 'Portrait référence',
        ratio: '2:3',
        isRef: true,
        prompt: `Portrait frontal. Peau sombre, crâne ras, balafre mâchoire, traits larges. Armure souple campagne brun-noir plaques mates bottes hautes. Lumière sèche Ka-Ur. ${BASE_STYLE}`,
      },
      {
        id: 'rakhan-2',
        label: 'Poste crête',
        ratio: '2:3',
        isRef: false,
        prompt: `RA-KHAN poste crête Ka-Ur. Vue territoire pierre rousse. ${RAKHAN_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'rakhan-3',
        label: 'Distribution rations',
        ratio: '2:3',
        isRef: false,
        prompt: `RA-KHAN distribution couloirs ration Ka-Ur. ${RAKHAN_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'rakhan-4',
        label: 'Silhouette nocturne',
        ratio: '2:3',
        isRef: false,
        prompt: `RA-KHAN silhouette nuit crête Ka-Ur. Ciel étoilé. ${RAKHAN_DESC} ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'ena',
    name: 'ENA',
    role: 'Archiviste de la Mémoire',
    location: 'Elen-Ar',
    images: [
      {
        id: 'ena-1',
        label: 'Portrait référence',
        ratio: '2:3',
        isRef: true,
        prompt: `Portrait frontal. Femme claire grave. Peau cuivrée claire, cheveux noirs liés bas, visage fin stable. Robe ivoire fumé, voile lecture bleu pâle. Fond Elen-Ar pierre pâle, lumière amortie. ${BASE_STYLE}`,
      },
      {
        id: 'ena-2',
        label: 'Cylindre archival',
        ratio: '2:3',
        isRef: false,
        prompt: `ENA ouvrant cylindre archival salle des strates Elen-Ar. Tables elliptiques autour. ${ENA_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'ena-3',
        label: 'Texte fondateur',
        ratio: '2:3',
        isRef: false,
        prompt: `ENA lisant voix basse texte fondateur. Ilys de profil arrière-plan. ${ENA_DESC} ${BASE_STYLE}`,
      },
      {
        id: 'ena-4',
        label: 'Escalier chambres basses',
        ratio: '2:3',
        isRef: false,
        prompt: `ENA descendant escalier chambres basses Elen-Ar, lames et cylindre tenus. ${ENA_DESC} ${BASE_STYLE}`,
      },
    ],
  },
]

export const VILLES = [
  {
    id: 'talar',
    name: 'TALAR',
    role: 'Capitale lecture systémique',
    location: '',
    images: [
      {
        id: 'talarv-1',
        label: 'Vue aérienne',
        ratio: '16:9',
        isRef: true,
        prompt: `Vue aérienne TALAR. Ville plateaux axes civiques horizontale. Pierre claire beige froid gris perle cuivre assombri. Terrasses vers mer paliers. Bassins régulation passerelles tours courtes. Vimanas. Lumière claire analytique. ${BASE_STYLE}`,
      },
      {
        id: 'talarv-2',
        label: 'Bassin primaire',
        ratio: '16:9',
        isRef: false,
        prompt: `TALAR bassin primaire analyse. Anneau pierre sombre veiné argent. Globes mesure suspendus. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
      {
        id: 'talarv-3',
        label: 'Salle convergence',
        ratio: '16:9',
        isRef: false,
        prompt: `TALAR salle convergence. Carte volumétrique planète suspendue. Haute baie mer. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'vara-ind',
    name: 'VARA-IND',
    role: 'Ville hydraulique majeure',
    location: '',
    images: [
      {
        id: 'varaindv-1',
        label: 'Vue ensemble',
        ratio: '16:9',
        isRef: true,
        prompt: `VARA-IND vue ensemble. Terrasses hydrauliques gradins canaux disciplinés. Basalte clair pierre argile eau gris-bleu. Lumière aube humide. ${BASE_STYLE}`,
      },
      {
        id: 'varaindv-2',
        label: 'Plateforme orientale',
        ratio: '16:9',
        isRef: false,
        prompt: `VARA-IND plateforme orientale. Disque basalte veiné. Aube. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
      {
        id: 'varaindv-3',
        label: 'Bassins internes',
        ratio: '16:9',
        isRef: false,
        prompt: `VARA-IND bassins internes vannes minérales. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'ora-mu',
    name: 'ORA-MU',
    role: 'Ville du ciel et des arrimages',
    location: '',
    images: [
      {
        id: 'oramuv-1',
        label: 'Vue ensemble',
        ratio: '16:9',
        isRef: true,
        prompt: `ORA-MU vue ensemble. Terrasses hautes falaises côtières. Pierre noire ivoire mat. Vimanas berceaux et vol. Lumière marine embruns. ${BASE_STYLE}`,
      },
      {
        id: 'oramuv-2',
        label: 'Plateforme arrimage',
        ratio: '16:9',
        isRef: false,
        prompt: `ORA-MU plateforme arrimage. Rainures berceaux vimanas. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
      {
        id: 'oramuv-3',
        label: 'Vimana décollant',
        ratio: '16:9',
        isRef: false,
        prompt: `ORA-MU vimana décollant. Coque sombre nacrée. Mer falaises. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'an-ka',
    name: 'AN-KA',
    role: 'Ville architecturale de plateau',
    location: '',
    images: [
      {
        id: 'ankav-1',
        label: 'Vue ensemble',
        ratio: '16:9',
        isRef: true,
        prompt: `AN-KA vue ensemble haut plateau. Plateformes trapézoïdales ponts minéraux puits axe. Pierre chaude gris bleu cuivre noirci. Lumière dure air sec. ${BASE_STYLE}`,
      },
      {
        id: 'ankav-2',
        label: 'Terrasse noyaux',
        ratio: '16:9',
        isRef: false,
        prompt: `AN-KA terrasse noyaux. Volumes étagés garde-corps composite bleuté. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
      {
        id: 'ankav-3',
        label: 'Puits axe profond',
        ratio: '16:9',
        isRef: false,
        prompt: `AN-KA puits axe profond. Chambres charge profondes anneaux pierre. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'ka-ur',
    name: 'KA-UR',
    role: 'Ville frontière',
    location: '',
    images: [
      {
        id: 'kaurv-1',
        label: 'Vue ensemble',
        ratio: '16:9',
        isRef: true,
        prompt: `KA-UR vue ensemble. Crêtes plaines routes convoi. Pierre rousse sable compacté métal mat. Lumière sèche poussière vent. ${BASE_STYLE}`,
      },
      {
        id: 'kaurv-2',
        label: 'Poste crête',
        ratio: '16:9',
        isRef: false,
        prompt: `KA-UR poste crête. Territoire frontière. Gardiens silhouettes. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
      {
        id: 'kaurv-3',
        label: 'Nuit étoilée',
        ratio: '16:9',
        isRef: false,
        prompt: `KA-UR nuit. Ciel étoilé. Vimana surveillance discret. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
    ],
  },
  {
    id: 'elen-ar',
    name: 'ELEN-AR',
    role: 'Ville de mémoire et archives',
    location: '',
    images: [
      {
        id: 'elenarv-1',
        label: 'Vue ensemble',
        ratio: '16:9',
        isRef: true,
        prompt: `ELEN-AR vue ensemble. Salles longues cours ombre lumière galeries suspendues bassins silencieux. Pierre pâle ivoire fumé. Lumière très amortie atmosphère fraîche. ${BASE_STYLE}`,
      },
      {
        id: 'elenarv-2',
        label: 'Salle des strates',
        ratio: '16:9',
        isRef: false,
        prompt: `ELEN-AR salle des strates. Table elliptique plaques superposées puits fraîcheur. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
      {
        id: 'elenarv-3',
        label: 'Chambre basse',
        ratio: '16:9',
        isRef: false,
        prompt: `ELEN-AR chambre basse recoupements. Tables anciennes. Lumière très rare fraîcheur profonde. Meme architecture, meme palette que vue reference. ${BASE_STYLE}`,
      },
    ],
  },
]
