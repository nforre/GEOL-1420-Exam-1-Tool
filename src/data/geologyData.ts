import { TopicId, TopicInfo, StudyItem, QuizQuestion } from '../types';

export const TOPICS: TopicInfo[] = [
  {
    id: 'taphonomy',
    name: 'Taphonomy & Fossil Life',
    shortName: 'Taphonomy',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
    accentHex: '#c9a46a',
    pdfPages: 'Pages 1–2',
    description: 'Post-mortem processes, direct vs indirect evidence, decay factors, and preservation potential.'
  },
  {
    id: 'preservation',
    name: 'Preservation Modes & Biases',
    shortName: 'Preservation',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800',
    accentHex: '#a8633f',
    pdfPages: 'Page 2',
    description: 'Mummification, tar, bogs, recrystallization, replacement, pyritization, permineralization, and Lagerstätten.'
  },
  {
    id: 'evolution',
    name: 'Evolution & Population Genetics',
    shortName: 'Evolution',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
    accentHex: '#2e7d4f',
    pdfPages: 'Pages 3–4',
    description: 'Alleles, genetic drift, Hox genes, speciation models, bottlenecking, and founder effects.'
  },
  {
    id: 'classification',
    name: 'Life & Biological Classification',
    shortName: 'Classification',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800',
    accentHex: '#2f6f73',
    pdfPages: 'Pages 3–4',
    description: 'Taxonomic hierarchy, life habits, skeletal frameworks (test, endo, exo), and ecological niches.'
  },
  {
    id: 'cladistics',
    name: 'Cladistics & Phylogenetics',
    shortName: 'Cladistics',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
    accentHex: '#6e7f86',
    pdfPages: 'Pages 4–5',
    description: 'Homoplasy vs homology, cladograms, character states, reversals, outgroups, and Consistency Index.'
  },
  {
    id: 'stratigraphy',
    name: 'Stratigraphy & Relative Dating',
    shortName: 'Stratigraphy',
    badgeColor: 'bg-stone-100 text-stone-900 border-stone-300 dark:bg-stone-900 dark:text-stone-200 dark:border-stone-700',
    accentHex: '#8e9a63',
    pdfPages: 'Pages 5–6, 7',
    description: 'Steno’s principles, lithostratigraphic units, faunal succession, correlation methods, and lithology spectrum.'
  },
  {
    id: 'isotopes',
    name: 'Isotopes & Geochemical Cycles',
    shortName: 'Isotopes & Carbon',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-800',
    accentHex: '#3b4a54',
    pdfPages: 'Pages 6–7',
    description: 'Carbon cycle influx/flux, half-lives, Zircon U-Pb dating, stable oxygen/carbon isotope shifts in glacial periods.'
  }
];

export const STUDY_ITEMS: StudyItem[] = [
  // --- TAPHONOMY (Page 1) ---
  {
    id: 'tap-01',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Fossil',
    definition: 'Any remains, impression, or trace of an ancient organism.',
    pdfPage: 1,
    highlight: 'Foundation definition',
    tags: ['Core', 'Basics']
  },
  {
    id: 'tap-02',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Direct Evidence (Body Fossils)',
    definition: 'Preserved physical body parts of an organism, including bones, shells, leaves, cells, hair, skin, as well as their casts and molds. Provides significant morphological evidence.',
    pdfPage: 1,
    highlight: 'Provides morphological evidence',
    exampleOrNote: 'Bones, shells, leaves, cells, hair, skin, casts & molds'
  },
  {
    id: 'tap-03',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Indirect Evidence (Trace Fossils)',
    definition: 'Features produced by an ancient organism (e.g. tracks, burrows, poop / coprolites). Provides significant ecological evidence regarding behavior, diet, or movement speed.',
    pdfPage: 1,
    highlight: 'Provides ecological evidence',
    exampleOrNote: 'Tracks, burrows, coprolites (poop), resting impressions'
  },
  {
    id: 'tap-04',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Preservation Potential',
    definition: 'Likelihood an organism will be preserved as a fossil in the rock record.',
    pdfPage: 1,
    highlight: 'Rises with: 1. Faster burial, 2. Hard/biomineralized parts, 3. Abundance, 4. Oxygen-deprived settings, 5. Water-deprived settings',
    exampleOrNote: 'Soft tissues in warm humid environments have virtually zero preservation potential.'
  },
  {
    id: 'tap-05',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Soft Tissue Breakdown Agents',
    definition: 'Water + oxygen are the two primary agents responsible for breaking down soft organic tissues.',
    pdfPage: 1,
    highlight: 'Water + Oxygen',
    exampleOrNote: 'Depriving an environment of either stops rapid bacterial decomposition.'
  },
  {
    id: 'tap-06',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Dysoxic',
    definition: 'Low oxygen conditions in an aquatic or depositional environment.',
    pdfPage: 1,
    highlight: 'Low oxygen',
    exampleOrNote: 'Limits scavenger and decomposer activity, aiding preservation.'
  },
  {
    id: 'tap-07',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Desiccation',
    definition: 'Removal or freezing of water from organic material.',
    pdfPage: 1,
    highlight: 'Drying / Freezing',
    exampleOrNote: 'Prevents bacterial enzymes from hydrolyzing soft biological tissues.'
  },
  {
    id: 'tap-08',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Taphonomy',
    definition: 'Everything that happens to potential fossils after death through burial and subsequent discovery.',
    pdfPage: 1,
    highlight: 'Post-mortem history',
    exampleOrNote: 'Coined by Soviet paleontologist Ivan Efremov.'
  },
  {
    id: 'tap-09',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Abrasion',
    definition: 'The mechanical wearing down and rounding of hard body parts as they are transported by water, wind, or gravity.',
    pdfPage: 1,
    highlight: 'Wearing down during transport',
    exampleOrNote: 'Indicates high current velocity or long distance transport before burial.'
  },
  {
    id: 'tap-10',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Articulation vs. Disarticulation',
    definition: 'Articulation: Fossils preserved with bones or shell parts connected in their natural living alignment. Disarticulation: Separation and scattering of bones or shell components prior to burial, typically by currents or scavengers.',
    pdfPage: 1,
    highlight: 'Articulation = connected in life alignment; Disarticulation = separated and scattered',
    exampleOrNote: 'High articulation indicates rapid, quiet burial with minimal scavenging.'
  },
  {
    id: 'tap-11',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Bioerosion',
    definition: 'Corrosive biological processes caused by organisms boring or rooting through hard tissues. Indicates prolonged exposure before burial in a biologically diverse environment.',
    pdfPage: 1,
    highlight: 'Boring/rooting through hard tissue; shows long sea-floor exposure',
    exampleOrNote: 'Sponge borings (Entobia), worm tubes, or endolithic algae.'
  },
  {
    id: 'tap-12',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Dissolution',
    definition: 'Breakdown of shells by surrounding waters after biological protective processes cease. Accelerated by high acidity, temperature changes, or undersaturated waters (such as silica in seawater). Recognized by loss of fibrous/layered detailing or irregular/blocky crystals. Does not apply to soft tissues, vertebrates, or plants.',
    pdfPage: 1,
    highlight: 'Recognized by loss of fibrous detailing or blocky crystals; excludes soft tissue/vertebrates/plants',
    exampleOrNote: 'Common when calcite/aragonite compensation depth (CCD) is crossed.'
  },
  {
    id: 'tap-13',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Fragmentation',
    definition: 'Mechanical breaking or fracturing of hard tissues into fragments by wave energy, trampling, or scavengers before burial.',
    pdfPage: 1,
    highlight: 'Mechanical fracturing before burial',
    exampleOrNote: 'Broken bivalve shells in high-energy beach surf zones.'
  },
  {
    id: 'tap-14',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Encrustation',
    definition: 'Growth of epibionts (e.g., barnacles, bryozoans) onto hard shells or bones post-mortem or during life.',
    pdfPage: 1,
    highlight: 'Epibionts living on shell/bone',
    exampleOrNote: 'Barnacles encrusting ammonite shells or oyster valves.'
  },
  {
    id: 'tap-15',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Fossil Orientation',
    definition: 'Alignment pattern of fossils within sediment layers relative to paleocurrents (e.g., clam shells buried concave-down or imbricated in stable hydrodynamic positions).',
    pdfPage: 1,
    highlight: 'Concave-down or imbricated = hydrodynamic stability',
    exampleOrNote: 'Used by geologists as geopetal indicators (way-up indicators).'
  },
  {
    id: 'tap-16',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Concretions',
    definition: 'Spherical or ovular mineral nodules (commonly iron) formed around organic remains that act as an accretion nucleus.',
    pdfPage: 1,
    highlight: 'Organic remains act as accretion nucleus',
    exampleOrNote: 'Often preserve uncompacted 3D fossils inside resistant ironstone nodules.'
  },
  {
    id: 'tap-17',
    topicId: 'taphonomy',
    topicName: 'Taphonomy & Fossil Life',
    term: 'Stromatolites',
    definition: 'Laminated mounds/layers of limestone produced by cyanobacteria trapping carbonate mud in alternating algal-mud cycles.',
    pdfPage: 1,
    highlight: 'Cyanobacteria trapping mud in laminated layers',
    exampleOrNote: 'Oldest known evidence of macroscopic biogenic structures (~3.5 Ga).'
  },

  // --- PRESERVATION MODES (Page 2) ---
  {
    id: 'pres-01',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Mummification',
    definition: 'Preservation by rapid desiccation (drying) or chemical conditions that prevent decay, preserving original soft tissue and material.',
    pdfPage: 2,
    highlight: 'Rapid drying preventing decay',
    exampleOrNote: 'Desert mummies, Edmontosaurus "Dakota" dinosaur skin imprint.'
  },
  {
    id: 'pres-02',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Freezing',
    definition: 'Preservation in ice or permafrost, trapping original soft tissue, hair, skin, and internal organs without decomposition.',
    pdfPage: 2,
    highlight: 'Ice/permafrost preserves soft tissue, hair, skin, organs unaltered',
    exampleOrNote: 'Siberian Woolly Mammoths with intact blood, stomach contents, and fur.'
  },
  {
    id: 'pres-03',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Tar / Asphalt',
    definition: 'Heavy oil/asphalt seeps trapping organisms; hydrocarbons saturate bones and soft parts, preventing microbial decay.',
    pdfPage: 2,
    highlight: 'Hydrocarbons saturate bones & stop microbes',
    exampleOrNote: 'La Brea Tar Pits in California (Smilodon, dire wolves).'
  },
  {
    id: 'pres-04',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Bogs / Swamps',
    definition: 'Highly acidic, low-oxygen peat environments that preserve skin, organs, and soft tissue while dissolving internal calcium carbonate bones.',
    pdfPage: 2,
    highlight: 'Preserves skin/organs/soft tissue; DISSOLVES calcium carbonate bones',
    exampleOrNote: 'Tollund Man and other European peat bog bodies.'
  },
  {
    id: 'pres-05',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Amber',
    definition: 'Fossilized tree resin that encapsulates small organisms (insects, spiders) in unaltered, 3D details.',
    pdfPage: 2,
    highlight: 'Fossilized tree resin with unaltered 3D details',
    exampleOrNote: 'Insects, spiders, lizards, feathers trapped in Cretaceous/Tertiary resin.'
  },
  {
    id: 'pres-06',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Unaltered Body Parts',
    definition: 'Direct preservation of original skeletal or soft material without chemical alteration (e.g., aragonite shells, mammoth hair, amber inclusions).',
    pdfPage: 2,
    highlight: 'Zero chemical alteration of original material',
    exampleOrNote: 'Mother-of-pearl aragonite nacre in Cretaceous ammonites.'
  },
  {
    id: 'pres-07',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Recrystallization',
    definition: 'Conversion of original fragile shell minerals into a stable polymorph (e.g., aragonite converting to calcite) without changing chemical composition; destroys fine micro-structure detail.',
    pdfPage: 2,
    highlight: 'Polymorph swap (aragonite -> calcite); same formula, destroys micro-detail',
    exampleOrNote: 'Aragonite and calcite are both CaCO3, but calcite is thermodynamically stable.'
  },
  {
    id: 'pres-08',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Replacement',
    definition: 'Gradual, molecule-by-molecule dissolution of organic material paired with concurrent precipitation of a new mineral of a different chemical composition. Preserves rigid, porous materials like bone and wood.',
    pdfPage: 2,
    highlight: 'Molecule-by-molecule exchange with different mineral composition',
    exampleOrNote: 'Petrified wood, silicified corals, pyritized ammonites.'
  },
  {
    id: 'pres-09',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Pyritization',
    definition: 'Form of replacement using pyrite ("fool’s gold") occurring in low-oxygen, high-iron waters with sulfur-reducing bacteria; famous for preserving delicate soft tissue.',
    pdfPage: 2,
    highlight: 'Low-O2, high-Fe waters + sulfur-reducing bacteria; preserves soft tissue',
    exampleOrNote: 'Beecher’s Trilobite Bed (trilobite legs and gills preserved in gold pyrite).'
  },
  {
    id: 'pres-10',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Silicification (Sillification)',
    definition: 'Replacement of tissue by cryptocrystalline silica (chert, agate, opal), producing durable and highly detailed fossils.',
    pdfPage: 2,
    highlight: 'Cryptocrystalline silica (chert, agate, opal) replacement',
    exampleOrNote: 'Glass Mountain Permian brachiopods etched out with acid.'
  },
  {
    id: 'pres-11',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Permineralization (Petrification)',
    definition: 'Mineral-rich groundwater saturates microscopic pore spaces in porous rigid materials (bone, wood) and deposits minerals without dissolving original cell walls.',
    pdfPage: 2,
    highlight: 'Minerals fill internal pores WITHOUT dissolving cell walls',
    exampleOrNote: 'Dinosaur bones and petrified tree trunks where original cell walls remain intact.'
  },
  {
    id: 'pres-12',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Carbonization',
    definition: 'Burial heat and pressure drive off volatile elements (O, H, H2O), leaving behind a thin, dark film of flattened carbon. Preserves soft tissues, leaves, and graptolites in low-energy, low-oxygen shale or limestone.',
    pdfPage: 2,
    highlight: 'Volatiles driven off leaving dark carbon film; leaves, graptolites in shale',
    exampleOrNote: 'Pennsylvanian fern fronds and Paleozoic graptolites.'
  },
  {
    id: 'pres-13',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Mold, External Mold, Internal Mold & Cast',
    definition: 'Mold: A hole or impression left after original material dissolves. External Mold: Imprint of the outer surface preserved in surrounding rock. Internal Mold (Steinkern): Sediment fills inside an internal cavity (like a clam shell) recording internal surface details. Cast: Sediment fills in a mold, forming a solid replica.',
    pdfPage: 2,
    highlight: 'Internal mold = filled internal cavity; Cast = solid replica filling empty mold',
    exampleOrNote: 'Clam shells dissolve to leave internal muscle scar casts on internal steinkerns.'
  },
  {
    id: 'pres-14',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Lagerstätte',
    definition: 'A sedimentary deposit exhibiting extraordinary fossil preservation, often preserving soft tissues or rich fossil abundances (e.g., Burgess Shale, Solnhofen).',
    pdfPage: 2,
    highlight: 'Extraordinary preservation of soft anatomy or extreme abundance',
    exampleOrNote: 'Burgess Shale (Cambrian explosion) & Solnhofen (Archaeopteryx feather detail).'
  },
  {
    id: 'pres-15',
    topicId: 'preservation',
    topicName: 'Preservation Modes & Biases',
    term: 'Preservation Biases in Fossil Record',
    definition: 'The fossil record strongly favors: 1. Abundant species, 2. Hard tissues over soft tissues, 3. Low elevations (especially marine), 4. Cold/dry or boggy environments, and 5. Burrowing organisms. Rainforests experience quick decomposition.',
    pdfPage: 2,
    highlight: 'More fossils: Abundance, marine lowlands, cold/dry/bogs, burrowers',
    exampleOrNote: 'Rainforest floor leaves decay in weeks; clams in delta mud fossilize readily.'
  },

  // --- EVOLUTION & GENETICS (Page 3) ---
  {
    id: 'evo-01',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Evolution',
    definition: 'Change in allele frequencies or inherited traits within a population across successive generations.',
    pdfPage: 3,
    highlight: 'Change in allele frequencies across generations',
    exampleOrNote: 'Microevolution (population genetics) leads over deep time to macroevolution.'
  },
  {
    id: 'evo-02',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Vestigial Structures',
    definition: 'Structures or organs that have lost their primary ancestral function through evolutionary divergence (e.g., pelvic bones in whales, human tailbone / coccyx).',
    pdfPage: 3,
    highlight: 'Lost primary ancestral function',
    exampleOrNote: 'Whale hind-limb pelvis remnants, ostrich wings, human appendix.'
  },
  {
    id: 'evo-03',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Genes & Alleles',
    definition: 'Genes: Fundamental sequence units of DNA that code for specific functional proteins and traits. Allele: A variant form of a gene (e.g., B vs. b).',
    pdfPage: 3,
    highlight: 'Gene = DNA sequence for trait; Allele = specific variant',
    exampleOrNote: 'Two alleles per diploid gene locus.'
  },
  {
    id: 'evo-04',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Gene Flow',
    definition: 'Transfer of genetic alleles between populations through migration and interbreeding.',
    pdfPage: 3,
    highlight: 'Allele transfer between populations by migration/interbreeding',
    exampleOrNote: 'Reduces genetic differences between populations; counters speciation.'
  },
  {
    id: 'evo-05',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Chromosomes',
    definition: 'Thread-like structures of packaged DNA and proteins located in the nucleus, carrying genetic information.',
    pdfPage: 3,
    highlight: 'Packaged DNA + protein carrying hereditary instructions',
    exampleOrNote: 'Humans carry 23 homologous pairs (46 total).'
  },
  {
    id: 'evo-06',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Mutation',
    definition: 'A random change in DNA nucleotide sequences; the ultimate source of novel genetic variation.',
    pdfPage: 3,
    highlight: 'Ultimate source of novel genetic variation',
    exampleOrNote: 'Can be point mutations, insertions, deletions, or duplications.'
  },
  {
    id: 'evo-07',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Hox Genes',
    definition: 'Master regulatory genes controlling the structural body plan layout along the head-to-tail axis during embryonic development.',
    pdfPage: 3,
    highlight: 'Master regulatory genes for head-to-tail body plan layout',
    exampleOrNote: 'Conserved across all bilaterally symmetrical animals from flies to humans.'
  },
  {
    id: 'evo-08',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Body Plans',
    definition: 'The fundamental structural architecture and symmetry layout of an organism’s body.',
    pdfPage: 3,
    highlight: 'Structural architecture & symmetry layout',
    exampleOrNote: 'Radial (cnidarians), bilateral (arthropods/chordates), pentaradial (echinoderms).'
  },
  {
    id: 'evo-09',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Genetic Drift',
    definition: 'Random fluctuations in allele frequencies within a population due to chance events, impacting small populations most severely.',
    pdfPage: 3,
    highlight: 'Chance fluctuations; impacts small populations most severely',
    exampleOrNote: 'Alleles can get fixed or lost purely by luck, not selective fitness.'
  },
  {
    id: 'evo-10',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Bottlenecking',
    definition: 'Sharp reduction in population size caused by environmental disasters, severely reducing genetic diversity. (Bottle of marbles analogy).',
    pdfPage: 3,
    highlight: 'Sharp crash in population size -> dramatic drop in genetic diversity',
    exampleOrNote: 'Cheetahs underwent a severe bottleneck at the end of the Pleistocene.'
  },
  {
    id: 'evo-11',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Founder Effect',
    definition: 'Loss of genetic variation when a small subset of a population separates to establish a new isolated colony.',
    pdfPage: 3,
    highlight: 'Small subset forms new isolated colony with limited gene pool',
    exampleOrNote: 'Galápagos finch colonizers landing on volcanic islands.'
  },
  {
    id: 'evo-12',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Natural Selection',
    definition: 'Differential survival and reproductive success of individuals possessing traits better adapted to their environment (“reproduction of the fittest”).',
    pdfPage: 3,
    highlight: 'Differential survival & reproduction based on adapted traits',
    exampleOrNote: 'Acts on phenotype, shifting genotype frequencies over time.'
  },
  {
    id: 'evo-13',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Allopatric Speciation',
    definition: 'Speciation occurring when populations become geographically separated by a physical barrier (e.g., mountain, ocean, river).',
    pdfPage: 3,
    highlight: 'Geographic physical barrier isolates populations',
    exampleOrNote: 'Grand Canyon separating Kaibab and Abert squirrels.'
  },
  {
    id: 'evo-14',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Sympatric Speciation',
    definition: 'Speciation occurring within the same geographic area without physical isolation (e.g., behavioral isolation, polyploidy, temporal isolation).',
    pdfPage: 3,
    highlight: 'Same geographic area WITHOUT physical isolation',
    exampleOrNote: 'Cichlid fish divergence in Lake Victoria through mating preferences.'
  },
  {
    id: 'evo-15',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Adaptation',
    definition: 'An inherited physical or behavioral trait that increases selective fitness in a given environment.',
    pdfPage: 3,
    highlight: 'Inherited trait that boosts selective fitness',
    exampleOrNote: 'Thick fur in tundra mammals, succulent stems in desert cacti.'
  },
  {
    id: 'evo-16',
    topicId: 'evolution',
    topicName: 'Evolution & Population Genetics',
    term: 'Gene Flow Physical Barriers & Panmixia',
    definition: 'Barriers to gene flow include Isolation by Barrier, Isolation by Resistance, and Isolation by Distance. Panmixia is the null condition representing completely free, random mixing of genes across a population.',
    pdfPage: 3,
    highlight: 'Panmixia = null model of free random gene mixing',
    exampleOrNote: 'Physical barriers interrupt panmixia, driving divergence.'
  },

  // --- LIFE & CLASSIFICATION (Pages 3-4) ---
  {
    id: 'cls-01',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Life (Definition)',
    definition: 'A self-sustaining chemical system capable of metabolism, response to stimuli, growth, and reproduction.',
    pdfPage: 3,
    highlight: 'Metabolism, response, growth, reproduction',
    exampleOrNote: 'NASA definition: "A self-sustaining chemical system capable of Darwinian evolution."'
  },
  {
    id: 'cls-02',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Levels of Biological Organization',
    definition: 'Cells (fundamental unit) -> Tissue (similar cells working together for one function) -> Organs (tissues joined in a structural unit for a common complex function) -> Organisms (individual entity) -> Population (same species in defined area) -> Community (interacting populations of different species) -> Ecosystem (community + abiotic environment).',
    pdfPage: 3,
    highlight: 'Cell -> Tissue -> Organ -> Organism -> Population -> Community -> Ecosystem',
    exampleOrNote: 'Key hierarchy frequently tested in biological questions.'
  },
  {
    id: 'cls-03',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Niche',
    definition: 'The functional role an organism occupies within its environment, including its impact on the wider ecological community.',
    pdfPage: 4,
    highlight: 'Functional ecological role and community impact',
    exampleOrNote: 'Not just "where it lives" (habitat), but "what it does" and how it gets energy.'
  },
  {
    id: 'cls-04',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Skeletal Frameworks (Endoskeleton, Exoskeleton, Test)',
    definition: 'Endoskeleton: Internal skeletal support framework (e.g., vertebrate bones, echinoderm plates). Exoskeleton: External hard skeleton supporting and protecting an animal’s body (e.g., arthropods, trilobites). Test: A hard, protective shell or internal skeleton secreted by microorganisms or invertebrates (e.g., sea urchins, foraminifera).',
    pdfPage: 4,
    highlight: 'Test = microorganism/invertebrate shell; Endo = internal; Exo = external',
    exampleOrNote: 'Foraminifera tests form deep-sea chalk and ooze.'
  },
  {
    id: 'cls-05',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Functional Morphology (Functional Anatomy)',
    definition: 'The study of how physical body features contribute to selective fitness and performance in an environment.',
    pdfPage: 4,
    highlight: 'How body features contribute to selective fitness',
    exampleOrNote: 'Streamlined fusiform body shape of sharks, ichthyosaurs, and dolphins.'
  },
  {
    id: 'cls-06',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Convergent Evolution',
    definition: 'Independent evolution in separate lineages towards similar physical solutions for identical environmental problems (e.g., webbed toes in aquatic birds, mammals, and amphibians; wings in bats and birds).',
    pdfPage: 4,
    highlight: 'Separate lineages independently evolving similar solutions',
    exampleOrNote: 'Produces homoplasies rather than homologous traits.'
  },
  {
    id: 'cls-07',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Life Habits',
    definition: 'The ecological mode of living exhibited by an organism: Benthic (bottom-dwelling) vs. Planktonic (free-floating) vs. Nektonic (swimming); Sessile (immobile) vs. Vagile (mobile); Infaunal (living burrowed within sediment) vs. Epifaunal (living on sediment surface).',
    pdfPage: 4,
    highlight: 'Benthic vs Planktonic; Sessile vs Vagile; Infaunal vs Epifaunal',
    exampleOrNote: 'Clams are typically benthic, infaunal, sessile/slowly vagile.'
  },
  {
    id: 'cls-08',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Taxonomy Hierarchy Order',
    definition: 'Domain -> Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species. (Mnemonic: Dear King Philip Came Over For Good Soup).',
    pdfPage: 4,
    highlight: 'Domain > Kingdom > Phylum > Class > Order > Family > Genus > Species',
    exampleOrNote: 'Homo sapiens: Eukaryota, Animalia, Chordata, Mammalia, Primates, Hominidae, Homo, sapiens.'
  },
  {
    id: 'cls-09',
    topicId: 'classification',
    topicName: 'Life & Biological Classification',
    term: 'Prokaryote vs. Eukaryote',
    definition: 'Prokaryote: Unicellular organism lacking a membrane-bound nucleus and specialized organelles (e.g., Bacteria, Archaea). Eukaryote: Organism built from complex cells containing a distinct nucleus and membrane-bound organelles (e.g., Protists, Fungi, Plants, Animals).',
    pdfPage: 4,
    highlight: 'Prokaryote = no nucleus/organelles; Eukaryote = true nucleus + organelles',
    exampleOrNote: 'Cyanobacteria are prokaryotes; foraminifera and humans are eukaryotes.'
  },

  // --- CLADISTICS (Pages 4-5) ---
  {
    id: 'clad-01',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Homoplasy (Homoplastic Character)',
    definition: 'The independent acquisition of identical character states in separate evolutionary lineages. Examples include loss of shells in squids and octopuses, wings in birds and bats, and dorsal fins in dolphins and sharks.',
    pdfPage: 4,
    highlight: 'Independent character acquisition in separate lineages; NOT from common ancestor',
    exampleOrNote: 'Wings in bats and birds; dorsal fins in sharks and dolphins.'
  },
  {
    id: 'clad-02',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Homologous Character',
    definition: 'A shared character between species that is present due to inheritance from a common ancestor.',
    pdfPage: 4,
    highlight: 'Inherited from a common ancestor',
    exampleOrNote: 'Tetrapod pentadactyl limb architecture (human arm, bat wing, whale flipper).'
  },
  {
    id: 'clad-03',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Cladistics',
    definition: 'Framework for determining evolutionary relationships using defined characters and character states to find branching patterns with the minimum number of changes (parsimony).',
    pdfPage: 4,
    highlight: 'Parsimony: branching pattern with minimum number of changes',
    exampleOrNote: 'Founded by Willi Hennig to reconstruct rigorous testable phylogenies.'
  },
  {
    id: 'clad-04',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Clade(s)',
    definition: 'A group of related taxa that includes both their most recent common ancestor + ALL descendants (monophyletic group).',
    pdfPage: 4,
    highlight: 'Common ancestor + ALL descendants',
    exampleOrNote: 'Birds are part of the dinosaur clade because they descend from theropods.'
  },
  {
    id: 'clad-05',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Cladogram',
    definition: 'A tree diagram showing patterns of descent and attribute acquisition from a common ancestor. Emphasizes shared characters rather than exact timing and is treated as a testable hypothesis.',
    pdfPage: 5,
    highlight: 'Shows character acquisition; testable hypothesis, NOT calibrated to geologic time',
    exampleOrNote: 'Branches show relative divergence sequence, not absolute millions of years.'
  },
  {
    id: 'clad-06',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Character vs. Character States',
    definition: 'Character: An inherited physical feature or trait being analyzed (e.g., Shell). Character States: The specific condition or expression of a character (e.g., Shell: Present vs. Absent).',
    pdfPage: 5,
    highlight: 'Character = trait (Shell); Character State = specific condition (Present/Absent)',
    exampleOrNote: 'Coded as 0 (ancestral) and 1 (derived) in data matrices.'
  },
  {
    id: 'clad-07',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Character Reversal',
    definition: 'An evolutionary change back to an ancestral character state from a derived state (a specific form of homoplasy).',
    pdfPage: 5,
    highlight: 'Evolutionary change back to ancestral state from derived state',
    exampleOrNote: 'Loss of legs in snakes; loss of wings in fleas.'
  },
  {
    id: 'clad-08',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Polarizing & Outgroup',
    definition: 'Polarizing: Determining which character state came first (ancestral) and which came later (derived) using an outgroup. Outgroup: An external taxon used to polarize characters and establish baseline ancestral states.',
    pdfPage: 5,
    highlight: 'Outgroup sets baseline ancestral states to polarize traits',
    exampleOrNote: 'Using a lancelet to determine ancestral vs derived states in vertebrates.'
  },
  {
    id: 'clad-09',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Consistency Index (C.I.)',
    definition: 'A metric evaluating cladogram quality by comparing the minimum required number of character state changes to the actual changes on the tree. (C.I. = Min changes / Actual changes). Higher C.I. (closer to 1.0) indicates less homoplasy.',
    pdfPage: 5,
    highlight: 'C.I. = Min possible changes / Actual changes on tree (quality metric)',
    exampleOrNote: 'A C.I. of 1.0 means zero homoplasies or character reversals occur on the tree.'
  },
  {
    id: 'clad-10',
    topicId: 'cladistics',
    topicName: 'Cladistics & Phylogenetics',
    term: 'Evolutionary Radiation',
    definition: 'Rapid diversification of a single ancestral lineage into numerous ecologically varied species (e.g., adaptive radiation after mass extinctions).',
    pdfPage: 5,
    highlight: 'Rapid diversification of one lineage into many ecological niches',
    exampleOrNote: 'Mammalian radiation following the end-Cretaceous extinction of non-avian dinosaurs.'
  },

  // --- STRATIGRAPHY (Pages 5-6, 7) ---
  {
    id: 'str-01',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Relative vs. Absolute Dating',
    definition: 'Relative Dating: Determining whether an event or rock layer is older or younger relative to others without assigning numerical ages. Absolute Dating: Determining a specific numerical age in years using radioisotopes or absolute markers.',
    pdfPage: 5,
    highlight: 'Relative = order of events; Absolute = numerical age in years',
    exampleOrNote: 'Steno’s laws provide relative ages; U-Pb dating gives absolute ages.'
  },
  {
    id: 'str-02',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Stratigraphy & Strata',
    definition: 'Stratigraphy: The branch of geology studying layered rock sequences (strata) and their spatial/temporal relationships. Strata: Distinct layers of sedimentary or volcanic rocks.',
    pdfPage: 5,
    highlight: 'Study of layered rocks and their temporal/spatial relationships',
    exampleOrNote: 'Forms the framework of historical geology.'
  },
  {
    id: 'str-03',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Lithostratigraphic Units (Member, Formation, Group)',
    definition: 'Formation: Fundamental formal unit of lithostratigraphy; a mappable regional rock unit with distinct physical characteristics. Group: Stratigraphic unit combining two or more associated formations. Member: A named, distinct subunit within a single formation.',
    pdfPage: 5,
    highlight: 'Member < Formation (fundamental mappable unit) < Group',
    exampleOrNote: 'Formations must be lithologically distinct and thick enough to map regionally.'
  },
  {
    id: 'str-04',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Principle of Superposition',
    definition: 'In undeformed sedimentary rock layers, older beds lie at the bottom and younger beds lie at the top.',
    pdfPage: 5,
    highlight: 'Older beds at bottom, younger beds at top (in undeformed layers)',
    exampleOrNote: 'Formulated by Nicolas Steno in 1669.'
  },
  {
    id: 'str-05',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Principle of Original Horizontality',
    definition: 'Sediments are originally deposited in horizontal or near-horizontal beds under the pull of gravity.',
    pdfPage: 5,
    highlight: 'Sediment settles in horizontal flat layers under gravity',
    exampleOrNote: 'Tilted or folded strata indicate post-depositional tectonic deformation.'
  },
  {
    id: 'str-06',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Principle of Lateral Continuity',
    definition: 'Sedimentary beds originally extend laterally in all directions until reaching a basin edge or grading into another sediment type.',
    pdfPage: 5,
    highlight: 'Beds extend continuously until thinning out or hitting basin edge',
    exampleOrNote: 'Explains why canyons (like the Grand Canyon) expose matching strata on opposite walls.'
  },
  {
    id: 'str-07',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Principle of Inclusions',
    definition: 'Any rock fragment (inclusion / xenolith) enclosed within another rock must be older than the host rock containing it.',
    pdfPage: 5,
    highlight: 'Fragment inside another rock is OLDER than the surrounding host rock',
    exampleOrNote: 'Pebbles in a conglomerate are older than the conglomerate matrix.'
  },
  {
    id: 'str-08',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Principle of Cross-Cutting Relationships',
    definition: 'Any geologic feature (e.g., fault, igneous dike, unconformity) cutting across rock layers must be younger than the rocks it cuts.',
    pdfPage: 5,
    highlight: 'Feature that cuts is YOUNGER than the rocks being cut',
    exampleOrNote: 'An igneous dike cutting through limestone must be younger than the limestone.'
  },
  {
    id: 'str-09',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Principle of Faunal Succession',
    definition: 'Fossil assemblages succeed each other vertically through strata in a definite, predictable order globally.',
    pdfPage: 5,
    highlight: 'Fossil assemblages follow definite, predictable global vertical order',
    exampleOrNote: 'William Smith discovered this, enabling global rock correlation.'
  },
  {
    id: 'str-10',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Correlation Methods',
    definition: 'Lithologic Correlation: Matching units by physical composition, grain size, and mineralogy. Magnetostratigraphy (Magno-stratigraphy): Correlation based on global reversals in Earth’s magnetic field. Event Stratigraphy: Correlation using widespread, short-duration event deposits (e.g., volcanic ash beds/tuffs, impact ejecta). Isotope Stratigraphy: Correlation using systematic variations in stable isotope ratios.',
    pdfPage: 6,
    highlight: 'Event stratigraphy uses ash beds/tuffs; Magnetostratigraphy uses magnetic reversals',
    exampleOrNote: 'Ash beds form instantaneous chronostratigraphic marker horizons across entire continents.'
  },
  {
    id: 'str-11',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Cratonic Sequences & Mega Sequences',
    definition: 'Cratonic Sequences: Continent-scale sedimentary sequences bounded by major craton-wide unconformities. Mega Sequences: Really big transgression / regression cycles.',
    pdfPage: 6,
    highlight: 'Cratonic sequences bounded by major unconformities; Mega sequences = massive transgression/regression',
    exampleOrNote: 'Sauk, Tippecanoe, and Kaskaskia sequences in North America.'
  },
  {
    id: 'str-12',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Geochronologic Time Scale Order',
    definition: 'Eon -> Era -> Period -> Epoch -> Sub-epoch.',
    pdfPage: 6,
    highlight: 'Eon -> Era -> Period -> Epoch -> Sub-epoch',
    exampleOrNote: 'Phanerozoic Eon -> Cenozoic Era -> Quaternary Period -> Holocene Epoch.'
  },
  {
    id: 'str-13',
    topicId: 'stratigraphy',
    topicName: 'Stratigraphy & Relative Dating',
    term: 'Grain Size & Lithology Spectrum',
    definition: 'Coarse Sand -> Fine Sand -> Shale -> Limestone. Deposition reflects water energy and distance from shore (transgression puts offshore limestone over beach sand).',
    pdfPage: 7,
    highlight: 'Coarse Sand -> Fine Sand -> Shale -> Limestone (Offshore deepening)',
    exampleOrNote: 'During marine transgression (sea level rise), limestone deposits over shale, which deposits over sand.'
  },

  // --- ISOTOPES & CARBON (Pages 6-7) ---
  {
    id: 'iso-01',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Carbon Cycle & Biological Pump',
    definition: 'Carbon Cycle: Geochemical movement of carbon through Earth’s atmosphere, hydrosphere, biosphere, and lithosphere. Phytoplankton: Microscopic photosynthetic marine organisms that assimilate carbon and sink upon death, driving the biological carbon pump.',
    pdfPage: 6,
    highlight: 'Phytoplankton sink on death, driving the biological carbon pump',
    exampleOrNote: 'Transfers carbon from surface waters into deep ocean floor sediments.'
  },
  {
    id: 'iso-02',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Carbon Influx vs. Decomposition Rates',
    definition: 'Burial rate > decomposition rate: Lithospheric influx (carbon flows into rock record). Decomposition rate > burial rate: Atmospheric influx (carbon flows into the atmosphere).',
    pdfPage: 6,
    highlight: 'Burial > Decomp = Lithospheric influx; Decomp > Burial = Atmospheric influx',
    exampleOrNote: 'During Carboniferous, huge burial of un-decomposed plant matter led to massive coal deposits.'
  },
  {
    id: 'iso-03',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Methane Hydrates',
    definition: 'A hydrosphere reservoir for carbon in methane trapped in ice-like crystal cages under low temperature and high pressure conditions (continental shelves and deep ocean).',
    pdfPage: 6,
    highlight: 'Hydrosphere carbon reservoir under low temp & high pressure',
    exampleOrNote: 'Sudden release can trigger runaway greenhouse warming.'
  },
  {
    id: 'iso-04',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Isotopes (Stable vs. Unstable vs. Radiogenic)',
    definition: 'Isotopes: Atoms of the same element with the same proton count but different numbers of neutrons. Stable: Non-radioactive isotopes that do not decay over time. Unstable: Spontaneously break down over time into stable daughter products, emitting radiation. Radiogenic: Isotopes produced directly by radioactive parent decay.',
    pdfPage: 6,
    highlight: 'Same protons, different neutrons; Radiogenic = daughter product from parent decay',
    exampleOrNote: 'Lead-206 is radiogenic, produced by decay of Uranium-238.'
  },
  {
    id: 'iso-05',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Half-Life & Age of Sample',
    definition: 'Half-life: Time required for half of the initial parent radioactive nuclei in a sample to decay into daughter nuclei. Age of Sample is calculated using radioactive decay rate constants (lambda) and parent-to-daughter ratios.',
    pdfPage: 6,
    highlight: 'Time for 50% parent to decay; age calculated via lambda & parent-to-daughter ratio',
    exampleOrNote: 'After 1 half-life: 50% parent, 50% daughter. After 2 half-lives: 25% parent, 75% daughter.'
  },
  {
    id: 'iso-06',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Zircon (Dating Mineral & Superposition)',
    definition: 'Zircon: Extremely durable mineral commonly used for U-Pb radioactive dating because it incorporates uranium into its crystal lattice upon formation while strictly excluding lead. Found in felsic igneous rocks and volcanic ashes. Combined with superposition to date sedimentary layers.',
    pdfPage: 6,
    highlight: 'Incorporates U upon formation, strictly excludes Pb; found in felsic igneous & volcanic ash',
    exampleOrNote: 'Any lead found inside a zircon crystal must be radiogenic daughter product!'
  },
  {
    id: 'iso-07',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Stable Isotope Values & Glacial Cycles',
    definition: 'Positive Stable Isotopes: More heavy isotopes than standard today. Negative Stable Isotopes: More light isotopes than standard today. Higher Stable Isotopes: Enriched in heavy relative to light isotopes; occurs higher during glacial periods (16O trapped in ice caps). Lower Stable Isotopes: Seen during interglacial periods.',
    pdfPage: 6,
    highlight: 'Glacial periods = higher stable isotope values (ocean enriched in heavy 18O)',
    exampleOrNote: 'Light 16O evaporates preferentially and gets locked in continental ice sheets during ice ages.'
  },
  {
    id: 'iso-08',
    topicId: 'isotopes',
    topicName: 'Isotopes & Geochemical Cycles',
    term: 'Common Isotope Pairs & Regular Carbonate Accumulators',
    definition: 'Oxygen Isotopes: 16O and 18O. Carbon Isotopes: 12C and 13C. Carbonates that accumulate at a regular rate: Mollusk Shells & Corals.',
    pdfPage: 7,
    highlight: 'Oxygen (16O/18O), Carbon (12C/13C); Regular accumulators = Mollusk shells & Corals',
    exampleOrNote: 'Growth rings in coral heads record seasonal isotope ratios like tree rings.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-01',
    topicId: 'taphonomy',
    type: 'concept',
    question: 'Which of the following conditions INCREASES the preservation potential of an organism?',
    options: [
      'High dissolved oxygen and warm circulating water',
      'Faster burial, hard biomineralized parts, and water-deprived settings',
      'Slow burial in open rainforest soil',
      'Thin uncalcified cuticle in an active surf zone'
    ],
    correctIndex: 1,
    explanation: 'Preservation increases with: 1. Faster burial, 2. Hard/biomineralized parts, 3. Abundance, 4. Oxygen-deprived environments, and 5. Water-deprived environments (Exam Review Page 1).',
    pdfPage: 1
  },
  {
    id: 'q-02',
    topicId: 'taphonomy',
    type: 'scenario',
    question: 'A paleontologist finds clam shells buried in sediment layers oriented concave-down and imbricated in stable hydrodynamic positions. What taphonomic feature does this demonstrate?',
    options: [
      'Orientation relative to paleocurrents',
      'Bioerosion by endolithic algae',
      'Desiccation caused by rapid freezing',
      'Recrystallization of aragonite to calcite'
    ],
    correctIndex: 0,
    explanation: 'Orientation is the alignment pattern of fossils within sediment layers relative to paleocurrents (e.g. clam shells buried concave-down or imbricated in stable hydrodynamic positions) (Exam Review Page 1).',
    pdfPage: 1
  },
  {
    id: 'q-03',
    topicId: 'taphonomy',
    type: 'application',
    question: 'Which two environmental agents are specifically identified as breaking down soft organic tissue?',
    options: [
      'Water + oxygen',
      'Nitrogen + silica',
      'Carbon dioxide + methane',
      'Argon + uranium'
    ],
    correctIndex: 0,
    explanation: 'The review sheet specifically notes that Water + oxygen breaks down soft tissue; thus desiccation and dysoxic/anoxic conditions inhibit decay (Exam Review Page 1).',
    pdfPage: 1
  },
  {
    id: 'q-04',
    topicId: 'taphonomy',
    type: 'concept',
    question: 'How is dissolution recognized in fossil shells, and to which groups does it NOT apply?',
    options: [
      'Recognized by dark carbon films; does not apply to marine invertebrates',
      'Recognized by loss of fibrous/layered detailing or blocky crystals; does not apply to soft tissues, vertebrates, or plants',
      'Recognized by pyrite crusts; does not apply to mollusks',
      'Recognized by amber encapsulation; does not apply to insects'
    ],
    correctIndex: 1,
    explanation: 'Dissolution is recognized by a loss of fibrous/layered detailing or irregular/blocky crystals. It does NOT apply to soft tissues, vertebrates, or plants (Exam Review Page 1).',
    pdfPage: 1
  },
  {
    id: 'q-05',
    topicId: 'preservation',
    type: 'concept',
    question: 'In bogs and swamps, why do we commonly find preserved skin, organs, and hair, but dissolved bones?',
    options: [
      'The water is saturated with calcium carbonate that repels collagen',
      'Highly acidic, low-oxygen peat preserves soft tissue while dissolving internal calcium carbonate bones',
      'Sulfur bacteria consume bone minerals while depositing dark carbon coatings',
      'Hydrocarbons coat the skin and dissolve internal bones'
    ],
    correctIndex: 1,
    explanation: 'Bogs/Swamps are highly acidic, low-oxygen peat environments that preserve skin, organs, and soft tissue while dissolving internal calcium carbonate bones (Exam Review Page 2).',
    pdfPage: 2
  },
  {
    id: 'q-06',
    topicId: 'preservation',
    type: 'concept',
    question: 'What distinguishes recrystallization from mineral replacement in fossil preservation?',
    options: [
      'Recrystallization converts a fragile mineral into a stable polymorph with the SAME composition (e.g. aragonite to calcite), whereas replacement precipitates a NEW mineral of different chemical composition',
      'Recrystallization only occurs in plant wood, whereas replacement only occurs in vertebrate bones',
      'Recrystallization requires cryptocrystalline silica, whereas replacement requires molten tar',
      'Recrystallization preserves original cell walls perfectly without loss of detail'
    ],
    correctIndex: 0,
    explanation: 'Recrystallization converts original fragile shell minerals into a stable polymorph (aragonite to calcite) without changing chemical composition (destroys fine detail). Replacement is molecule-by-molecule dissolution paired with precipitation of a new mineral of different composition (Exam Review Page 2).',
    pdfPage: 2
  },
  {
    id: 'q-07',
    topicId: 'preservation',
    type: 'scenario',
    question: 'Delicate soft-bodied appendages and gills in Beecher’s Trilobite Bed are preserved in golden pyrite. What environmental conditions enabled this pyritization?',
    options: [
      'Arid desert conditions with intense evaporation',
      'Low-oxygen, high-iron waters with sulfur-reducing bacteria',
      'Acidic peat bogs rich in tannic acids',
      'High-energy gravel surf zones open to atmospheric air'
    ],
    correctIndex: 1,
    explanation: 'Pyritization is a form of replacement using pyrite ("fool’s gold") occurring in low-oxygen, high-iron waters with sulfur-reducing bacteria; famous for preserving delicate soft tissue (Exam Review Page 2).',
    pdfPage: 2
  },
  {
    id: 'q-08',
    topicId: 'preservation',
    type: 'application',
    question: 'What is the key difference between an internal mold (steinkern) and a cast?',
    options: [
      'An internal mold records external shell ribs, whereas a cast records internal organs',
      'An internal mold forms when sediment fills inside an internal cavity, whereas a cast is a solid replica filling the empty mold space',
      'A cast forms before burial, whereas an internal mold forms during metamorphism',
      'An internal mold is formed exclusively by tree resin'
    ],
    correctIndex: 1,
    explanation: 'Internal Mold: sediment fills inside an internal cavity (like a clam shell) showing internal surface details after shell dissolution. Cast: fills in mold; solid replica/representation (Exam Review Page 2).',
    pdfPage: 2
  },
  {
    id: 'q-09',
    topicId: 'evolution',
    type: 'concept',
    question: 'What are Hox genes and what primary role do they play in organismal development?',
    options: [
      'Enzymes that break down cellulose in herbivore stomachs',
      'Master regulatory genes controlling the structural body plan layout along the head-to-tail axis during embryonic development',
      'Proteins that precipitate aragonite inside clam shells',
      'Structural filaments that anchor muscles to exoskeletons'
    ],
    correctIndex: 1,
    explanation: 'Hox Genes: Master regulatory genes controlling the structural body plan layout along the head-to-tail axis during embryonic development (Exam Review Page 3).',
    pdfPage: 3
  },
  {
    id: 'q-10',
    topicId: 'evolution',
    type: 'scenario',
    question: 'A severe volcanic eruption kills 95% of a rabbit population at random, drastically shifting allele frequencies purely by chance. What evolutionary mechanism does this illustrate?',
    options: [
      'Sympatric speciation via polyploidy',
      'Bottlenecking (a sharp reduction in population size reducing genetic diversity)',
      'Artificial selection for predator evasion',
      'Panmixia equilibrium'
    ],
    correctIndex: 1,
    explanation: 'Bottlenecking is a sharp reduction in population size caused by environmental disasters, severely reducing genetic diversity ("bottle of marbles" analogy) (Exam Review Page 3).',
    pdfPage: 3
  },
  {
    id: 'q-11',
    topicId: 'evolution',
    type: 'concept',
    question: 'How does allopatric speciation differ from sympatric speciation?',
    options: [
      'Allopatric speciation requires physical geographic separation (mountain, ocean); sympatric occurs within the same geographic area without physical isolation',
      'Allopatric occurs without barriers; sympatric requires continental breakup',
      'Allopatric affects only plants; sympatric affects only marine organisms',
      'Allopatric is driven by Hox genes; sympatric is driven by zircon crystallization'
    ],
    correctIndex: 0,
    explanation: 'Allopatric Speciation: speciation occurring when populations become geographically separated by a physical barrier (e.g. mountain, ocean). Sympatric Speciation: speciation occurring within the same geographic area without physical isolation (Exam Review Page 3).',
    pdfPage: 3
  },
  {
    id: 'q-12',
    topicId: 'classification',
    type: 'concept',
    question: 'What is the correct hierarchical order of biological taxonomy from broadest to most specific?',
    options: [
      'Kingdom -> Domain -> Class -> Order -> Phylum -> Family -> Genus -> Species',
      'Domain -> Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species',
      'Domain -> Phylum -> Kingdom -> Order -> Class -> Family -> Genus -> Species',
      'Phylum -> Class -> Domain -> Kingdom -> Family -> Order -> Genus -> Species'
    ],
    correctIndex: 1,
    explanation: 'Taxonomy order: Domain -> Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species (Exam Review Page 4).',
    pdfPage: 4
  },
  {
    id: 'q-13',
    topicId: 'classification',
    type: 'concept',
    question: 'How does an exoskeleton differ from an endoskeleton and a test?',
    options: [
      'An exoskeleton is internal bone, while an endoskeleton is made of chitin',
      'An exoskeleton is an external hard skeleton supporting an animal’s body (e.g., trilobites), while an endoskeleton is internal (vertebrates) and a test is a hard shell/skeleton secreted by invertebrates/microorganisms (sea urchins, forams)',
      'A test is made of soft cartilage, while an exoskeleton is always made of pure quartz',
      'All three terms refer to identical structures in prokaryotes'
    ],
    correctIndex: 1,
    explanation: 'Exoskeleton: external hard skeleton (arthropods, trilobites). Endoskeleton: internal skeletal framework (vertebrate bones, echinoderm plates). Test: hard shell or internal skeleton secreted by microorganisms or invertebrates (sea urchins, forams) (Exam Review Page 4).',
    pdfPage: 4
  },
  {
    id: 'q-14',
    topicId: 'cladistics',
    type: 'concept',
    question: 'What is a homoplasy (homoplastic character), and which of the following is a classic example?',
    options: [
      'A character inherited from a common ancestor, such as the tetrapod limb in humans and whales',
      'The independent acquisition of identical character states in separate evolutionary lineages, such as wings in birds and bats',
      'A character that never changes across billions of years',
      'A tree diagram showing exact chronological radiometric dates'
    ],
    correctIndex: 1,
    explanation: 'Homoplasy/Homoplastic: The independent acquisition of identical character states in separate evolutionary lineages. Examples include loss of shells in squids and octopuses, wings in birds and bats, and dorsal fins in dolphins and sharks (Exam Review Page 4).',
    pdfPage: 4
  },
  {
    id: 'q-15',
    topicId: 'cladistics',
    type: 'application',
    question: 'What does a Consistency Index (C.I.) measure on a cladogram, and how is it calculated?',
    options: [
      'It measures the radiometric age in millions of years based on half-life',
      'It evaluates cladogram quality by comparing the minimum required number of character state changes to the actual changes on the tree',
      'It calculates the percentage of carbonate mud trapped in stromatolites',
      'It measures the ratio of uranium to lead in zircon crystals'
    ],
    correctIndex: 1,
    explanation: 'Consistency Index (C.I.): A metric evaluating cladogram quality by comparing the minimum required number of character state changes to the actual changes on the tree (Exam Review Page 5).',
    pdfPage: 5
  },
  {
    id: 'q-16',
    topicId: 'cladistics',
    type: 'concept',
    question: 'By definition, what constitutes a valid "clade"?',
    options: [
      'Any group of organisms sharing similar life habits regardless of ancestry',
      'A group of related taxa that includes both their most recent common ancestor + ALL descendants',
      'A collection of organisms living in the same geological epoch',
      'Only the extinct fossil ancestors of modern organisms'
    ],
    correctIndex: 1,
    explanation: 'Clade(s): A group of related taxa that includes both their most recent common ancestor + ALL descendants (Exam Review Page 4).',
    pdfPage: 4
  },
  {
    id: 'q-17',
    topicId: 'stratigraphy',
    type: 'concept',
    question: 'According to Nicolas Steno’s Principle of Superposition, what is true in undeformed sedimentary rock layers?',
    options: [
      'Older beds lie at the top and younger beds lie at the bottom',
      'Older beds lie at the bottom and younger beds lie at the top',
      'Beds cut by a fault are always younger than the fault itself',
      'Inclusions inside a layer are always younger than the host rock'
    ],
    correctIndex: 1,
    explanation: 'Superposition: In undeformed sedimentary rock layers, older beds lie at the bottom and younger beds lie at the top (Exam Review Page 5).',
    pdfPage: 5
  },
  {
    id: 'q-18',
    topicId: 'stratigraphy',
    type: 'scenario',
    question: 'An igneous basalt dike cuts through five horizontal layers of limestone and shale. Which principle proves that the dike is younger than the rock layers it cuts?',
    options: [
      'Principle of Superposition',
      'Principle of Cross-Cutting Relationships',
      'Principle of Inclusions',
      'Principle of Original Horizontality'
    ],
    correctIndex: 1,
    explanation: 'Cross-cutting: Any feature (e.g., fault, igneous dike) cutting across rock layers must be younger than the rocks it cuts (Exam Review Page 5).',
    pdfPage: 5
  },
  {
    id: 'q-19',
    topicId: 'stratigraphy',
    type: 'concept',
    question: 'What is the correct ordering of the lithology and grain size spectrum from nearshore/high-energy to offshore/deep-water?',
    options: [
      'Limestone -> Shale -> Fine Sand -> Coarse Sand',
      'Coarse Sand -> Fine Sand -> Shale -> Limestone',
      'Shale -> Coarse Sand -> Limestone -> Fine Sand',
      'Fine Sand -> Limestone -> Coarse Sand -> Shale'
    ],
    correctIndex: 1,
    explanation: 'Grain Size & Lithology Spectrum: Coarse Sand -> Fine Sand -> Shale -> Limestone (Exam Review Page 7).',
    pdfPage: 7
  },
  {
    id: 'q-20',
    topicId: 'stratigraphy',
    type: 'concept',
    question: 'What is the correct hierarchy for the geochronologic time scale from largest to smallest unit?',
    options: [
      'Era -> Eon -> Epoch -> Period -> Sub-epoch',
      'Eon -> Era -> Period -> Epoch -> Sub-epoch',
      'Period -> Era -> Eon -> Epoch -> Sub-epoch',
      'Epoch -> Period -> Era -> Eon -> Sub-epoch'
    ],
    correctIndex: 1,
    explanation: 'Geochronologic Time Scale: Eon -> Era -> Period -> Epoch -> Sub-epoch (Exam Review Page 6).',
    pdfPage: 6
  },
  {
    id: 'q-21',
    topicId: 'isotopes',
    type: 'concept',
    question: 'Why is the mineral Zircon commonly used for U-Pb radioactive dating of geologic units?',
    options: [
      'It dissolves rapidly in surface rainwater, leaving visible pores',
      'It incorporates uranium into its crystal lattice upon formation while strictly excluding lead',
      'It contains high amounts of organic carbon that decays with a short half-life',
      'It only forms inside sedimentary limestone at low temperatures'
    ],
    correctIndex: 1,
    explanation: 'Zircon: Extremely durable mineral commonly used for U-Pb radioactive dating because it incorporates uranium into its crystal lattice upon formation while strictly excluding lead (Exam Review Page 6).',
    pdfPage: 6
  },
  {
    id: 'q-22',
    topicId: 'isotopes',
    type: 'concept',
    question: 'In the geochemical carbon cycle, what occurs when burial rate exceeds decomposition rate?',
    options: [
      'Atmospheric influx (carbon flows into the atmosphere)',
      'Lithospheric influx (carbon flows into the rock record)',
      'Methane hydrates boil into oceanic surface waters',
      'Oxygen isotopes convert into radiogenic lead'
    ],
    correctIndex: 1,
    explanation: 'Burial rate > decomposition rate: Lithospheric influx. Conversely, Decomposition rate > burial rate: Atmospheric influx (Exam Review Page 6).',
    pdfPage: 6
  },
  {
    id: 'q-23',
    topicId: 'isotopes',
    type: 'scenario',
    question: 'During glacial periods (ice ages), what happens to ocean stable isotope ratios (e.g. 18O/16O)?',
    options: [
      'Values become lower because light isotopes are released from melting glaciers',
      'Values become higher (enriched in heavy 18O relative to light 16O) because light 16O is preferentially trapped in glacial ice sheets',
      'Stable isotopes cease to exist and are replaced by radiogenic decay',
      'Isotope ratios remain identical to modern interglacial baselines'
    ],
    correctIndex: 1,
    explanation: 'Higher stable isotopes: Enriched in heavy relative to light isotopes, higher during glacial periods. Lower stable isotopes: During interglacial periods (Exam Review Page 6).',
    pdfPage: 6
  },
  {
    id: 'q-24',
    topicId: 'isotopes',
    type: 'application',
    question: 'Which organisms secrete carbonates that accumulate at a regular rate, allowing high-resolution geochemical tracking?',
    options: [
      'Mollusk shells & corals',
      'Trilobite exoskeletons & graptolites',
      'Cyanobacterial stromatolites & permafrost mammoths',
      'Phytoplankton flagella & peat moss'
    ],
    correctIndex: 0,
    explanation: 'Carbonates that accumulate at a regular rate: Mollusk Shells & Corals (Exam Review Page 7).',
    pdfPage: 7
  },
  {
    id: 'q-25',
    topicId: 'stratigraphy',
    type: 'concept',
    question: 'What are Cratonic Sequences and Mega Sequences in stratigraphy?',
    options: [
      'Microscopic layers within zircon crystal grains',
      'Cratonic Sequences are continent-scale sedimentary sequences bounded by craton-wide unconformities; Mega Sequences are really big transgression/regression cycles',
      'Annual growth rings within bivalve clam shells',
      'Fossilized tracks and burrows left by trilobites'
    ],
    correctIndex: 1,
    explanation: 'Cratonic Sequences: Continent-scale sedimentary sequences bounded by major craton-wide unconformities. Mega Sequences: Really big transgression/regression cycles (Exam Review Page 6).',
    pdfPage: 6
  }
];

export const GEOLOGICAL_TIMELINE_STRATA = [
  {
    name: 'Limestone Bed (Deep Offshore)',
    age: 'Transgressive Maximum',
    rockType: 'Biogenic Limestone / Micrite',
    color: '#3b4a54',
    pattern: 'brick',
    fossilTypes: 'Corals, Foraminifera tests, Mollusk shells (18O/16O records)',
    principles: 'Deepest quiet water marine facies in the spectrum'
  },
  {
    name: 'Shale Unit (Offshore Shelf)',
    age: 'Intermediate Transgression',
    rockType: 'Fissile Mudstone / Shale',
    color: '#6e7f86',
    pattern: 'horizontal-stripes',
    fossilTypes: 'Carbonized Graptolites, Pyritized trilobites, Ammonite internal molds',
    principles: 'Low-energy, dysoxic bottom waters favoring carbonization & pyritization'
  },
  {
    name: 'Fine Sandstone Bed (Distal Shoreface)',
    age: 'Shallowing Transition',
    rockType: 'Quartzose Fine Sandstone',
    color: '#8e9a63',
    pattern: 'fine-dots',
    fossilTypes: 'Trace fossils (burrows, crawl tracks), articulated bivalves',
    principles: 'Moderate wave energy; sediment transport creates bedding planes'
  },
  {
    name: 'Coarse Sandstone & Conglomerate',
    age: 'Nearshore / Beach / Delta',
    rockType: 'Cross-bedded Arkosic Sandstone',
    color: '#c9a46a',
    pattern: 'coarse-dots',
    fossilTypes: 'Fragmented & abraded bone fragments, disarticulated shell lags',
    principles: 'High hydrodynamic energy: causes abrasion and disarticulation'
  },
  {
    name: 'Felsic Volcanic Ash Bed (Tuff Horizon)',
    age: 'Instantaneous Chronostratigraphic Event',
    rockType: 'Rhyolitic Ash / Tuff with Zircon Crystals',
    color: '#a8633f',
    pattern: 'crystallite',
    fossilTypes: 'Zircons for U-Pb absolute dating (incorporates U, excludes Pb)',
    principles: 'Event stratigraphy marker; provides absolute radiometric calibration across continents'
  }
];
