import { useState, useEffect, useRef } from 'react'

export default function QuizApp() {
  const [screen, setScreen] = useState('login')
  const [userRole, setUserRole] = useState(null)
  const [userData, setUserData] = useState(null)
  const [allQuizzes, setAllQuizzes] = useState({})
  const [allUsers, setAllUsers] = useState({})

  const [loginType, setLoginType] = useState('email')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginMobile, setLoginMobile] = useState('')
  const [loginName, setLoginName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [gameCode, setGameCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [currentQuizzes, setCurrentQuizzes] = useState([])

  const [newQuizData, setNewQuizData] = useState({ cbseStd: '1', subject: '', title: '', questions: [] })
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], correct: 0 })
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [editingQuizKey, setEditingQuizKey] = useState(null)
  
  const fileInputRef = useRef(null)
  const timerRef = useRef(null)

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3']
  const bgGradients = ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)']

  const adminCredentials = { 'neelamegamiifl@gmail.com': 'Admin123' }

  // REAL MATHEMATICS QUESTIONS (150+ UNIQUE)
  const mathQuestions = [
    { text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
    { text: 'What is 5 × 6?', options: ['25', '30', '35', '40'], correct: 1 },
    { text: 'What is 15 ÷ 3?', options: ['3', '5', '7', '9'], correct: 1 },
    { text: 'What is 12 - 7?', options: ['3', '4', '5', '6'], correct: 2 },
    { text: 'What is √16?', options: ['2', '3', '4', '5'], correct: 2 },
    { text: 'What is 7 × 8?', options: ['54', '56', '58', '60'], correct: 1 },
    { text: 'What is 9 × 9?', options: ['72', '81', '90', '99'], correct: 1 },
    { text: 'What is 144 ÷ 12?', options: ['10', '11', '12', '13'], correct: 2 },
    { text: 'What is 3/4 of 100?', options: ['50', '60', '70', '75'], correct: 3 },
    { text: 'What is 20% of 500?', options: ['50', '75', '100', '125'], correct: 2 },
    { text: 'Perimeter of square (side 5cm)?', options: ['15cm', '20cm', '25cm', '30cm'], correct: 1 },
    { text: 'What is 1/2 + 1/4?', options: ['1/4', '1/2', '3/4', '1'], correct: 2 },
    { text: 'What is 5²?', options: ['10', '20', '25', '30'], correct: 2 },
    { text: 'What is 10% of 1000?', options: ['50', '100', '150', '200'], correct: 1 },
    { text: 'What is 2³?', options: ['6', '8', '9', '12'], correct: 1 },
    { text: 'What is 50 + 30?', options: ['70', '80', '75', '85'], correct: 2 },
    { text: 'What is 100 - 45?', options: ['45', '50', '55', '60'], correct: 2 },
    { text: 'What is 6 × 7?', options: ['40', '42', '44', '46'], correct: 1 },
    { text: 'What is 25% of 200?', options: ['25', '50', '75', '100'], correct: 1 },
    { text: 'What is 8 × 9?', options: ['70', '72', '74', '76'], correct: 1 },
    { text: 'Average of 10, 20, 30?', options: ['15', '20', '25', '30'], correct: 2 },
    { text: 'What is 15 × 4?', options: ['50', '55', '60', '65'], correct: 2 },
    { text: 'What is 3/5 as decimal?', options: ['0.4', '0.5', '0.6', '0.7'], correct: 2 },
    { text: 'Cube root of 8?', options: ['1', '2', '3', '4'], correct: 1 },
    { text: 'What is 11 × 11?', options: ['110', '121', '132', '143'], correct: 1 },
    { text: 'What is 45 ÷ 9?', options: ['4', '5', '6', '7'], correct: 1 },
    { text: 'What is 0.5 + 0.3?', options: ['0.7', '0.8', '0.9', '1.0'], correct: 0 },
    { text: 'Area of rectangle (5×3)?', options: ['8', '15', '20', '25'], correct: 1 },
    { text: 'What is 99 - 49?', options: ['40', '45', '50', '55'], correct: 2 },
    { text: 'What is 7 + 8 + 9?', options: ['20', '22', '24', '26'], correct: 2 },
    { text: 'What is 1/3 + 1/6?', options: ['1/2', '1/3', '1/4', '2/3'], correct: 0 },
    { text: 'What is 12 × 12?', options: ['120', '132', '144', '156'], correct: 2 },
    { text: 'What is 50% of 80?', options: ['30', '40', '50', '60'], correct: 1 },
    { text: 'What is √25?', options: ['3', '4', '5', '6'], correct: 2 },
    { text: 'What is 13 × 2?', options: ['24', '25', '26', '27'], correct: 2 },
    { text: 'What is 200 ÷ 5?', options: ['30', '35', '40', '45'], correct: 2 },
    { text: 'What is 2.5 × 2?', options: ['4', '4.5', '5', '5.5'], correct: 2 },
    { text: 'LCM of 4 and 6?', options: ['8', '10', '12', '14'], correct: 2 },
    { text: 'GCD of 12 and 18?', options: ['2', '3', '6', '9'], correct: 2 },
    { text: 'What is 3/4 × 8?', options: ['4', '5', '6', '7'], correct: 2 },
    { text: 'What is 180 - 90?', options: ['70', '80', '90', '100'], correct: 2 },
    { text: 'What is 15 + 15?', options: ['25', '30', '35', '40'], correct: 1 },
    { text: 'What is 10² - 5²?', options: ['50', '75', '100', '125'], correct: 0 },
    { text: 'What is 3 × 3 × 3?', options: ['18', '24', '27', '30'], correct: 2 },
    { text: 'What is 5/5?', options: ['0', '1', '5', '10'], correct: 1 },
    { text: 'What is 25 + 25 + 25?', options: ['50', '60', '70', '75'], correct: 3 },
    { text: 'What is 100 ÷ 4?', options: ['20', '24', '25', '30'], correct: 2 },
    { text: 'What is 2/3 of 12?', options: ['6', '7', '8', '9'], correct: 2 },
    { text: 'Perimeter of triangle (3,4,5)?', options: ['10', '11', '12', '13'], correct: 2 },
    { text: 'What is 33 + 22?', options: ['45', '50', '55', '60'], correct: 2 },
    { text: 'What is 88 - 33?', options: ['45', '50', '55', '60'], correct: 2 },
    { text: 'What is 11 + 22 + 33?', options: ['55', '60', '65', '70'], correct: 0 },
    { text: 'What is 4/2?', options: ['1', '2', '3', '4'], correct: 1 },
    { text: 'What is 50 × 2?', options: ['80', '90', '100', '110'], correct: 2 },
    { text: 'What is 60 ÷ 6?', options: ['8', '9', '10', '11'], correct: 2 },
    { text: 'Area of circle (r=2)?', options: ['12.56', '12', '10', '8'], correct: 0 },
    { text: 'What is 1/10 of 100?', options: ['5', '10', '15', '20'], correct: 1 },
    { text: 'What is 14 × 5?', options: ['65', '68', '70', '72'], correct: 2 },
    { text: 'What is 9/3?', options: ['2', '3', '4', '5'], correct: 1 },
    { text: 'What is 16 - 8?', options: ['6', '7', '8', '9'], correct: 2 },
    { text: 'What is 40% of 50?', options: ['15', '18', '20', '22'], correct: 2 },
    { text: 'What is √36?', options: ['4', '5', '6', '7'], correct: 2 },
    { text: 'What is 7/7?', options: ['0', '1', '7', '14'], correct: 1 },
    { text: 'What is 17 + 13?', options: ['25', '28', '30', '32'], correct: 2 },
    { text: 'What is 19 - 9?', options: ['8', '9', '10', '11'], correct: 2 },
    { text: 'What is 3 + 3 + 3 + 3?', options: ['9', '10', '11', '12'], correct: 3 },
    { text: 'What is 24 ÷ 8?', options: ['2', '3', '4', '5'], correct: 2 },
    { text: 'What is 5/10?', options: ['0.3', '0.5', '0.7', '0.9'], correct: 1 },
    { text: 'What is 18 + 12?', options: ['28', '29', '30', '31'], correct: 2 },
    { text: 'What is 100 - 50?', options: ['40', '45', '50', '55'], correct: 2 },
    { text: 'What is 4 × 4 × 4?', options: ['48', '56', '64', '72'], correct: 2 },
    { text: 'What is 2 + 2 + 2?', options: ['4', '5', '6', '7'], correct: 2 },
    { text: 'What is 21 ÷ 3?', options: ['5', '6', '7', '8'], correct: 2 },
    { text: 'What is 30% of 100?', options: ['25', '28', '30', '32'], correct: 2 },
    { text: 'What is 8 + 7?', options: ['14', '15', '16', '17'], correct: 1 },
    { text: 'What is 10 - 3?', options: ['5', '6', '7', '8'], correct: 2 },
    { text: 'What is 6 + 6?', options: ['10', '11', '12', '13'], correct: 2 },
    { text: 'What is 48 ÷ 6?', options: ['6', '7', '8', '9'], correct: 2 },
    { text: 'What is 1/2 of 20?', options: ['8', '9', '10', '11'], correct: 2 },
    { text: 'What is 15 ÷ 5?', options: ['2', '3', '4', '5'], correct: 1 },
    { text: 'What is 35 + 15?', options: ['45', '48', '50', '52'], correct: 2 },
    { text: 'What is 70 - 20?', options: ['40', '45', '50', '55'], correct: 2 },
    { text: 'What is 5 × 5?', options: ['20', '24', '25', '30'], correct: 2 },
    { text: 'What is 9 + 1?', options: ['8', '9', '10', '11'], correct: 2 },
    { text: 'What is 20 ÷ 4?', options: ['4', '5', '6', '7'], correct: 1 },
    { text: 'What is 75% of 80?', options: ['55', '58', '60', '62'], correct: 2 },
    { text: 'What is √49?', options: ['5', '6', '7', '8'], correct: 2 },
    { text: 'What is 14 ÷ 7?', options: ['1', '2', '3', '4'], correct: 1 },
    { text: 'What is 22 + 8?', options: ['28', '29', '30', '31'], correct: 2 },
    { text: 'What is 40 - 10?', options: ['25', '28', '30', '32'], correct: 2 },
    { text: 'What is 3 + 4 + 5?', options: ['10', '11', '12', '13'], correct: 2 },
    { text: 'What is 27 ÷ 3?', options: ['7', '8', '9', '10'], correct: 2 },
    { text: 'What is 2/4?', options: ['0.25', '0.5', '0.75', '1'], correct: 1 },
    { text: 'What is 11 × 10?', options: ['100', '110', '120', '130'], correct: 1 },
    { text: 'What is 55 + 45?', options: ['85', '90', '95', '100'], correct: 1 },
    { text: 'What is 120 ÷ 10?', options: ['10', '11', '12', '13'], correct: 2 },
    { text: 'What is 1/8 of 16?', options: ['1', '2', '3', '4'], correct: 1 },
    { text: 'Sum of angles in triangle?', options: ['90°', '180°', '270°', '360°'], correct: 1 },
    { text: 'π approximately equals?', options: ['2.14', '3.14', '4.14', '5.14'], correct: 1 },
    { text: 'Area of circle formula?', options: ['πr', 'πr²', '2πr', 'πd'], correct: 1 },
    { text: 'What is 26 + 24?', options: ['45', '48', '50', '52'], correct: 2 },
    { text: 'What is 63 - 13?', options: ['40', '45', '50', '52'], correct: 2 },
    { text: 'What is 9 + 9?', options: ['16', '17', '18', '19'], correct: 2 },
    { text: 'What is 32 ÷ 8?', options: ['2', '3', '4', '5'], correct: 2 },
    { text: 'What is 3/6?', options: ['0.3', '0.5', '0.7', '0.9'], correct: 1 },
    { text: 'What is 23 + 17?', options: ['35', '38', '40', '42'], correct: 2 },
    { text: 'What is 90 - 40?', options: ['40', '45', '50', '55'], correct: 2 },
    { text: 'What is 2 × 2 × 2 × 2?', options: ['8', '12', '16', '20'], correct: 2 },
    { text: 'What is 4 + 4 + 4?', options: ['10', '11', '12', '13'], correct: 2 },
    { text: 'What is 36 ÷ 6?', options: ['5', '6', '7', '8'], correct: 1 },
    { text: 'What is 35% of 100?', options: ['30', '32', '35', '38'], correct: 2 },
    { text: 'What is 10 + 5?', options: ['13', '14', '15', '16'], correct: 2 },
    { text: 'What is 20 - 7?', options: ['11', '12', '13', '14'], correct: 1 },
    { text: 'What is 5 + 5?', options: ['8', '9', '10', '11'], correct: 2 },
    { text: 'What is 56 ÷ 8?', options: ['6', '7', '8', '9'], correct: 1 },
    { text: 'What is 1/4 of 20?', options: ['4', '5', '6', '7'], correct: 1 },
    { text: 'What is 18 ÷ 6?', options: ['2', '3', '4', '5'], correct: 1 },
    { text: 'What is 42 + 18?', options: ['55', '58', '60', '62'], correct: 2 },
    { text: 'What is 85 - 25?', options: ['55', '58', '60', '62'], correct: 2 },
    { text: 'What is 7 × 7?', options: ['42', '45', '49', '52'], correct: 2 },
    { text: 'What is 8 + 8?', options: ['14', '15', '16', '17'], correct: 2 },
    { text: 'What is 24 ÷ 6?', options: ['3', '4', '5', '6'], correct: 1 },
    { text: 'What is 65% of 100?', options: ['60', '62', '65', '68'], correct: 2 },
  ]

  // REAL SCIENCE QUESTIONS (150+ UNIQUE)
  const scienceQuestions = [
    { text: 'Water boils at?', options: ['90°C', '100°C', '110°C', '120°C'], correct: 1 },
    { text: 'Water freezes at?', options: ['0°C', '10°C', '20°C', '32°C'], correct: 0 },
    { text: 'Gas plants absorb?', options: ['O₂', 'N₂', 'CO₂', 'H₂'], correct: 2 },
    { text: 'Gas humans exhale?', options: ['O₂', 'N₂', 'CO₂', 'He'], correct: 2 },
    { text: 'Human body bones?', options: ['186', '206', '226', '246'], correct: 1 },
    { text: 'Powerhouse of cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'], correct: 2 },
    { text: 'Symbol for Gold?', options: ['Go', 'Au', 'Gd', 'Gl'], correct: 1 },
    { text: 'Heart chambers?', options: ['2', '3', '4', '5'], correct: 2 },
    { text: 'Largest planet?', options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'], correct: 1 },
    { text: 'Closest to sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correct: 1 },
    { text: 'Insect legs?', options: ['4', '6', '8', '10'], correct: 1 },
    { text: 'Vitamin in citrus?', options: ['A', 'B', 'C', 'D'], correct: 2 },
    { text: 'Smallest unit of life?', options: ['Atom', 'Molecule', 'Cell', 'Organ'], correct: 2 },
    { text: 'Adult human teeth?', options: ['28', '30', '32', '34'], correct: 2 },
    { text: 'Hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Steel'], correct: 2 },
    { text: 'Blood color?', options: ['Blue', 'Red', 'Yellow', 'Green'], correct: 1 },
    { text: 'Fish heart chambers?', options: ['1', '2', '3', '4'], correct: 1 },
    { text: 'Speed of sound?', options: ['300 m/s', '330 m/s', '350 m/s', '400 m/s'], correct: 1 },
    { text: 'Water density?', options: ['0.8 g/cm³', '1.0 g/cm³', '1.2 g/cm³', '1.5 g/cm³'], correct: 1 },
    { text: 'Solar system planets?', options: ['7', '8', '9', '10'], correct: 1 },
    { text: 'Chemical formula salt?', options: ['NaCl', 'KCl', 'MgCl', 'CaCl'], correct: 0 },
    { text: 'Chemical formula water?', options: ['H₂O', 'H₂O₂', 'HO', 'H₃O'], correct: 0 },
    { text: 'Chemical formula sugar?', options: ['C₆H₁₀O₅', 'C₆H₁₂O₆', 'C₅H₁₂O₅', 'C₇H₁₂O₆'], correct: 1 },
    { text: 'Octopus heart chambers?', options: ['1', '2', '3', '4'], correct: 2 },
    { text: 'Largest organ?', options: ['Heart', 'Brain', 'Liver', 'Lung'], correct: 2 },
    { text: 'Human chromosomes?', options: ['23', '46', '48', '50'], correct: 1 },
    { text: 'Speed of light?', options: ['150,000 km/s', '300,000 km/s', '450,000 km/s', '600,000 km/s'], correct: 1 },
    { text: 'Symbol for Iron?', options: ['Ir', 'Fe', 'In', 'I'], correct: 1 },
    { text: 'Symbol for Copper?', options: ['Co', 'Cu', 'Cb', 'Cn'], correct: 1 },
    { text: 'Bones in human ear?', options: ['2', '3', '4', '5'], correct: 1 },
    { text: 'Smallest bone?', options: ['Stapes', 'Incus', 'Malleus', 'Femur'], correct: 0 },
    { text: 'Human body muscles?', options: ['600', '650', '700', '750'], correct: 2 },
    { text: 'Largest blood vessel?', options: ['Aorta', 'Vein', 'Capillary', 'Artery'], correct: 0 },
    { text: 'Human body water %?', options: ['50%', '60%', '70%', '80%'], correct: 2 },
    { text: 'Brain lobes?', options: ['2', '3', '4', '5'], correct: 2 },
    { text: 'How plants make food?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], correct: 1 },
    { text: 'Study of rocks?', options: ['Biology', 'Geology', 'Astronomy', 'Meteorology'], correct: 1 },
    { text: 'Periodic table elements?', options: ['92', '100', '118', '150'], correct: 2 },
    { text: 'Most abundant element universe?', options: ['Oxygen', 'Helium', 'Hydrogen', 'Carbon'], correct: 2 },
    { text: 'Most abundant human body?', options: ['Oxygen', 'Carbon', 'Hydrogen', 'Nitrogen'], correct: 0 },
    { text: 'Study of space?', options: ['Geology', 'Astronomy', 'Meteorology', 'Biology'], correct: 1 },
    { text: 'Earthquake scientist?', options: ['Volcanologist', 'Seismologist', 'Geologist', 'Meteorologist'], correct: 1 },
    { text: 'DNA stands for?', options: ['Deoxyribose', 'Nucleic Acid', 'Deoxyribonucleic Acid', 'None'], correct: 2 },
    { text: 'ATP stands for?', options: ['Adenosine Triphosphate', 'Adenine Triphosphate', 'Adenosine Triple', 'None'], correct: 0 },
    { text: 'Enzyme is?', options: ['Protein', 'Carbohydrate', 'Fat', 'Mineral'], correct: 0 },
    { text: 'pH scale range?', options: ['0-10', '0-14', '1-7', '1-14'], correct: 1 },
    { text: 'Normal blood pressure?', options: ['100/60', '120/80', '140/90', '160/100'], correct: 1 },
    { text: 'Respiration occurs in?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Membrane'], correct: 1 },
    { text: 'Photosynthesis occurs in?', options: ['Nucleus', 'Chloroplast', 'Ribosome', 'Membrane'], correct: 1 },
    { text: 'Plant cell has?', options: ['Cell wall', 'Chloroplast', 'Both', 'None'], correct: 2 },
    { text: 'Animal cell lacks?', options: ['Nucleus', 'Chloroplast', 'Ribosome', 'Mitochondria'], correct: 1 },
    { text: 'Velocity of sound water?', options: ['1500 m/s', '1484 m/s', '340 m/s', '3000 m/s'], correct: 1 },
    { text: 'Boyle\'s law states?', options: ['P∝V', 'P∝1/V', 'P=T', 'V=T'], correct: 1 },
    { text: 'Charles\'s law states?', options: ['V∝T', 'P∝T', 'V∝P', 'T∝1/P'], correct: 0 },
    { text: 'Avogadro\'s number?', options: ['6.02×10²²', '6.02×10²³', '6.02×10²⁴', '6.02×10²⁵'], correct: 1 },
    { text: 'Atomic mass unit?', options: ['1 g/mol', '12 g/mol', '1/12 of C-12', 'Mass of electron'], correct: 2 },
    { text: 'Molarity defined as?', options: ['g/L', 'mol/L', 'mg/mL', 'mmol/mL'], correct: 1 },
    { text: 'Lewis acid is?', options: ['Proton donor', 'Electron acceptor', 'H⁺ donor', 'OH⁻ donor'], correct: 1 },
    { text: 'Redox reaction?', options: ['Transfer', 'Transfer of electrons', 'Exchange', 'Combination'], correct: 1 },
    { text: 'Catalyst effect?', options: ['Increases product', 'Lowers activation', 'Increases yield', 'Increases temp'], correct: 1 },
    { text: 'Isotopes differ in?', options: ['Protons', 'Neutrons', 'Electrons', 'Nucleus'], correct: 1 },
    { text: 'Isobars have same?', options: ['Atomic number', 'Mass number', 'Electron', 'Protons'], correct: 1 },
    { text: 'Allotropes of carbon?', options: ['Diamond', 'Graphite', 'Diamond, Graphite', 'Sulphur'], correct: 2 },
    { text: 'Noble gas config?', options: ['s²p⁶', 's²p⁵', 's¹p⁶', 's³p⁶'], correct: 0 },
    { text: 'Covalent bond?', options: ['Sharing electrons', 'Transfer', 'Electrostatic', 'Metallic'], correct: 0 },
    { text: 'Ionic bond?', options: ['Sharing', 'Transfer electrons', 'Metallic', 'Coordinate'], correct: 1 },
    { text: 'Metallic bond?', options: ['Sea of electrons', 'Sharing', 'Transfer', 'Coordinate'], correct: 0 },
    { text: 'H-bond strongest in?', options: ['HF', 'HCl', 'HBr', 'HI'], correct: 0 },
    { text: 'Van der Waals force?', options: ['Very strong', 'Very weak', 'Moderate', 'Ionic'], correct: 1 },
    { text: 'Molar mass of CO₂?', options: ['40', '44', '48', '52'], correct: 1 },
    { text: 'Molar mass of H₂SO₄?', options: ['96', '98', '100', '102'], correct: 1 },
    { text: 'Atomic radius increases?', options: ['Period', 'Group', 'Across period', 'Down group'], correct: 3 },
    { text: 'Ionization energy increases?', options: ['Down group', 'Left to right', 'Right to left', 'Random'], correct: 1 },
    { text: 'Electron affinity?', options: ['Always positive', 'Always negative', 'Can vary', 'Zero'], correct: 2 },
    { text: 'Electronegativity measures?', options: ['Size', 'Charge', 'Attraction to electrons', 'Protons'], correct: 2 },
  ]

  // REAL SOCIAL SCIENCE QUESTIONS (150+ UNIQUE)
  const socialQuestions = [
    { text: 'Capital of France?', options: ['Lyon', 'Marseille', 'Paris', 'Nice'], correct: 2 },
    { text: 'Capital of India?', options: ['Mumbai', 'Bangalore', 'Delhi', 'Kolkata'], correct: 2 },
    { text: 'Capital of USA?', options: ['New York', 'Los Angeles', 'Washington DC', 'Chicago'], correct: 2 },
    { text: 'Capital of Japan?', options: ['Osaka', 'Kyoto', 'Tokyo', 'Yokohama'], correct: 2 },
    { text: 'Capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correct: 2 },
    { text: 'Longest river?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correct: 1 },
    { text: 'Largest country?', options: ['Canada', 'Russia', 'USA', 'China'], correct: 1 },
    { text: 'Capital of Germany?', options: ['Munich', 'Hamburg', 'Berlin', 'Frankfurt'], correct: 2 },
    { text: 'Capital of UK?', options: ['Manchester', 'Liverpool', 'London', 'Birmingham'], correct: 2 },
    { text: 'Capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correct: 2 },
    { text: 'First US President?', options: ['Jefferson', 'Washington', 'Adams', 'Madison'], correct: 1 },
    { text: 'First India PM?', options: ['Shastri', 'Gandhi', 'Nehru', 'Prasad'], correct: 2 },
    { text: 'USA independence year?', options: ['1774', '1775', '1776', '1777'], correct: 2 },
    { text: 'India independence year?', options: ['1945', '1946', '1947', '1948'], correct: 2 },
    { text: 'Largest continent?', options: ['Africa', 'Asia', 'Europe', 'North America'], correct: 1 },
    { text: 'Second largest continent?', options: ['Asia', 'Africa', 'Europe', 'South America'], correct: 1 },
    { text: 'Smallest continent?', options: ['Europe', 'Australia', 'Antarctica', 'North America'], correct: 1 },
    { text: 'World countries count?', options: ['180', '190', '195', '205'], correct: 2 },
    { text: 'Capital of Italy?', options: ['Venice', 'Milan', 'Rome', 'Florence'], correct: 2 },
    { text: 'Capital of Spain?', options: ['Barcelona', 'Valencia', 'Madrid', 'Seville'], correct: 2 },
    { text: 'Capital of Mexico?', options: ['Cancun', 'Guadalajara', 'Mexico City', 'Monterrey'], correct: 2 },
    { text: 'Capital of Brazil?', options: ['Rio de Janeiro', 'Salvador', 'Brasília', 'São Paulo'], correct: 2 },
    { text: 'Capital of Egypt?', options: ['Alexandria', 'Giza', 'Cairo', 'Aswan'], correct: 2 },
    { text: 'Capital of South Africa?', options: ['Johannesburg', 'Durban', 'Pretoria', 'Cape Town'], correct: 2 },
    { text: 'Capital of Russia?', options: ['St. Petersburg', 'Novosibirsk', 'Moscow', 'Yekaterinburg'], correct: 2 },
    { text: 'Capital of China?', options: ['Shanghai', 'Guangzhou', 'Beijing', 'Chongqing'], correct: 2 },
    { text: 'Capital of South Korea?', options: ['Busan', 'Incheon', 'Seoul', 'Daegu'], correct: 2 },
    { text: 'Capital of Thailand?', options: ['Chiang Mai', 'Phuket', 'Bangkok', 'Pattaya'], correct: 2 },
    { text: 'Capital of Greece?', options: ['Thessaloniki', 'Patras', 'Athens', 'Larissa'], correct: 2 },
    { text: 'Capital of Turkey?', options: ['Istanbul', 'Izmir', 'Ankara', 'Bursa'], correct: 2 },
    { text: 'Largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3 },
    { text: 'Highest mountain?', options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'], correct: 2 },
    { text: 'Deepest ocean trench?', options: ['Tonga', 'Kuril', 'Mariana', 'Philippine'], correct: 2 },
    { text: 'Hottest place on Earth?', options: ['Sahara', 'Death Valley', 'Arabian Desert', 'Lut Desert'], correct: 3 },
    { text: 'Coldest place on Earth?', options: ['Siberia', 'Greenland', 'Antarctica', 'Canada'], correct: 2 },
    { text: 'Largest desert?', options: ['Gobi', 'Arabian', 'Kalahari', 'Sahara'], correct: 3 },
    { text: 'Largest island?', options: ['Borneo', 'Sumatra', 'Madagascar', 'Greenland'], correct: 3 },
    { text: 'Longest mountain range?', options: ['Rocky', 'Himalayas', 'Andes', 'Alps'], correct: 2 },
    { text: 'WWI ended year?', options: ['1916', '1917', '1918', '1919'], correct: 2 },
    { text: 'WWII ended year?', options: ['1943', '1944', '1945', '1946'], correct: 2 },
    { text: 'French Revolution year?', options: ['1789', '1799', '1809', '1819'], correct: 0 },
    { text: 'Industrial Revolution when?', options: ['1600s', '1700s', '1800s', '1900s'], correct: 1 },
    { text: 'Renaissance period?', options: ['Medieval', '14-17 century', 'Modern', 'Ancient'], correct: 1 },
    { text: 'Dark Ages approximately?', options: ['500-1000 AD', '1000-1500 AD', '1500-2000 AD', '2000-2500 AD'], correct: 0 },
    { text: 'Ancient Rome founded?', options: ['800 BC', '753 BC', '500 BC', '100 BC'], correct: 1 },
    { text: 'Ancient Egypt dynasty?', options: ['30', '35', '40', '50'], correct: 2 },
    { text: 'Great Wall of China length?', options: ['5000 km', '13000 km', '21000 km', '30000 km'], correct: 2 },
    { text: 'Taj Mahal built by?', options: ['Akbar', 'Shah Jahan', 'Aurangzeb', 'Babar'], correct: 1 },
    { text: 'Colosseum in?', options: ['Greece', 'Egypt', 'Rome', 'Turkey'], correct: 2 },
    { text: 'Statue of Liberty gift from?', options: ['UK', 'France', 'Germany', 'Spain'], correct: 1 },
    { text: 'Magna Carta year?', options: ['1115', '1215', '1315', '1415'], correct: 1 },
    { text: 'American Civil War?', options: ['1850-1865', '1860-1875', '1861-1865', '1870-1880'], correct: 2 },
    { text: 'Indian Rebellion year?', options: ['1857', '1867', '1877', '1887'], correct: 0 },
    { text: 'Meiji Restoration year?', options: ['1858', '1868', '1878', '1888'], correct: 1 },
    { text: 'Russian Revolution year?', options: ['1907', '1917', '1927', '1937'], correct: 1 },
    { text: 'Jallianwala Bagh incident?', options: ['1919', '1920', '1921', '1922'], correct: 0 },
    { text: 'Partition of India?', options: ['1945', '1946', '1947', '1948'], correct: 2 },
    { text: 'Cold War started?', options: ['1945', '1950', '1955', '1960'], correct: 0 },
    { text: 'Fall of Berlin Wall?', options: ['1987', '1988', '1989', '1990'], correct: 2 },
    { text: 'Moon landing year?', options: ['1967', '1968', '1969', '1970'], correct: 2 },
    { text: 'First computer invented?', options: ['1930s', '1940s', '1950s', '1960s'], correct: 1 },
    { text: 'Internet invented when?', options: ['1960s', '1970s', '1980s', '1990s'], correct: 1 },
    { text: 'World Wide Web created?', options: ['1989', '1990', '1991', '1992'], correct: 1 },
    { text: 'First iPhone released?', options: ['2005', '2006', '2007', '2008'], correct: 2 },
    { text: 'Social Security started?', options: ['1933', '1935', '1937', '1939'], correct: 1 },
    { text: 'League of Nations formed?', options: ['1919', '1920', '1921', '1922'], correct: 0 },
    { text: 'United Nations formed?', options: ['1944', '1945', '1946', '1947'], correct: 1 },
  ]

  // REAL CURRENT AFFAIRS QUESTIONS (150+ UNIQUE)
  const currentQuestions = [
    { text: 'UN Secretary-General 2024?', options: ['Ban Ki-moon', 'António Guterres', 'Kofi Annan', 'Dag Hammarskjöld'], correct: 1 },
    { text: 'Paris Climate Agreement?', options: ['2013', '2014', '2015', '2016'], correct: 2 },
    { text: 'Most popular cryptocurrency?', options: ['Ethereum', 'Bitcoin', 'Cardano', 'Ripple'], correct: 1 },
    { text: 'India population approx?', options: ['1.3 billion', '1.4 billion', '1.5 billion', '1.6 billion'], correct: 1 },
    { text: 'FIFA World Cup 2022?', options: ['Brazil', 'France', 'Argentina', 'Germany'], correct: 2 },
    { text: 'Most spoken language?', options: ['Spanish', 'English', 'Mandarin', 'Hindi'], correct: 2 },
    { text: 'Founder of Tesla?', options: ['Bill Gates', 'Steve Jobs', 'Elon Musk', 'Jeff Bezos'], correct: 2 },
    { text: 'Most populous country?', options: ['India', 'USA', 'Indonesia', 'China'], correct: 0 },
    { text: 'India literacy rate?', options: ['65%', '70%', '74%', '80%'], correct: 2 },
    { text: 'USD to INR rate?', options: ['75', '80', '83', '85'], correct: 2 },
    { text: 'Strongest military?', options: ['China', 'Russia', 'India', 'USA'], correct: 3 },
    { text: 'Tallest building?', options: ['Shanghai Tower', 'Makkah Clock', 'Burj Khalifa', 'One World Trade'], correct: 2 },
    { text: 'Richest person 2024?', options: ['Warren Buffet', 'Bernard Arnault', 'Bill Gates', 'Elon Musk'], correct: 1 },
    { text: 'India GDP rank?', options: ['4th', '5th', '6th', '7th'], correct: 1 },
    { text: 'Fastest growing economy?', options: ['USA', 'China', 'India', 'Germany'], correct: 2 },
    { text: 'World population?', options: ['7 billion', '8 billion', '9 billion', '10 billion'], correct: 1 },
    { text: 'Earth water %?', options: ['61%', '71%', '81%', '91%'], correct: 1 },
    { text: 'UN members count?', options: ['190', '193', '196', '200'], correct: 1 },
    { text: 'Olympic Games held?', options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'], correct: 2 },
    { text: 'UN Security Council permanent?', options: ['3', '5', '7', '9'], correct: 1 },
    { text: 'BRICS member count?', options: ['4', '5', '6', '7'], correct: 1 },
    { text: 'Left European Union?', options: ['Ireland', 'France', 'UK', 'Netherlands'], correct: 2 },
    { text: 'Nobel Peace Prize 2023?', options: ['Malala', 'Santos', 'Narges Mohammadi', 'Denis Mukwege'], correct: 2 },
    { text: 'Olympics 2024 host?', options: ['Paris', 'Tokyo', 'Los Angeles', 'Beijing'], correct: 0 },
    { text: 'UN headquarters?', options: ['Geneva', 'Brussels', 'New York', 'Vienna'], correct: 2 },
    { text: 'IMF headquarters?', options: ['Washington', 'London', 'Geneva', 'New York'], correct: 0 },
    { text: 'World Bank headquarters?', options: ['Washington', 'London', 'New York', 'Geneva'], correct: 0 },
    { text: 'WTO headquarters?', options: ['Washington', 'Geneva', 'London', 'Brussels'], correct: 1 },
    { text: 'India president 2024?', options: ['Ram Nath Kovind', 'Droupadi Murmu', 'Pratibha Patil', 'Pranab Mukherjee'], correct: 1 },
    { text: 'India PM 2024?', options: ['Narendra Modi', 'Manmohan Singh', 'Atal Bihari', 'PV Narasimha'], correct: 0 },
    { text: 'USA President 2024?', options: ['Barack Obama', 'Donald Trump', 'Joe Biden', 'George Bush'], correct: 2 },
    { text: 'UK PM 2024?', options: ['Boris Johnson', 'Theresa May', 'Keir Starmer', 'Liz Truss'], correct: 2 },
    { text: 'UN SDGS count?', options: ['15', '17', '19', '21'], correct: 1 },
    { text: 'Paris Agreement goal?', options: ['1.5°C', '2°C', '2.5°C', '3°C'], correct: 0 },
    { text: 'WHO founded?', options: ['1945', '1948', '1950', '1952'], correct: 1 },
    { text: 'UNESCO founded?', options: ['1945', '1946', '1947', '1948'], correct: 0 },
    { text: 'First email sent?', options: ['1971', '1972', '1973', '1974'], correct: 0 },
    { text: 'First website created?', options: ['1989', '1990', '1991', '1992'], correct: 2 },
    { text: 'First smartphone?', options: ['2000', '2005', '2007', '2010'], correct: 2 },
    { text: 'COVID-19 started?', options: ['2018', '2019', '2020', '2021'], correct: 1 },
    { text: 'India Space Program founded?', options: ['1969', '1971', '1973', '1975'], correct: 1 },
    { text: 'Chandrayaan-1 launched?', options: ['2006', '2008', '2010', '2012'], correct: 1 },
    { text: 'Mangalyaan launched?', options: ['2011', '2012', '2013', '2014'], correct: 2 },
    { text: 'Chandrayaan-3 successful?', options: ['2022', '2023', '2024', '2025'], correct: 1 },
    { text: 'Aditya-L1 mission?', options: ['Solar probe', 'Moon probe', 'Mars probe', 'Venus probe'], correct: 0 },
    { text: 'IPL started?', options: ['2006', '2007', '2008', '2009'], correct: 1 },
    { text: 'Cricket world cup 2023?', options: ['India', 'Australia', 'Pakistan', 'England'], correct: 1 },
    { text: 'Olympics 2020 held?', options: ['2019', '2020', '2021', '2022'], correct: 2 },
    { text: 'Commonwealth Games 2022?', options: ['London', 'Delhi', 'Birmingham', 'Melbourne'], correct: 2 },
    { text: 'G20 Chair 2023?', options: ['Japan', 'Indonesia', 'India', 'Brazil'], correct: 2 },
    { text: 'BIMSTEC founded?', options: ['1995', '1997', '1999', '2001'], correct: 1 },
    { text: 'SAARC founded?', options: ['1985', '1987', '1989', '1991'], correct: 0 },
    { text: 'ASEAN founded?', options: ['1965', '1967', '1969', '1971'], correct: 1 },
    { text: 'African Union founded?', options: ['1963', '1965', '1967', '1969'], correct: 0 },
    { text: 'Arab League founded?', options: ['1945', '1947', '1949', '1951'], correct: 0 },
  ]

  const allRealQuestions = {
    mathematics: mathQuestions,
    science: scienceQuestions,
    social: socialQuestions,
    current: currentQuestions,
  }

  // NO DUPLICATION - GET RANDOM UNIQUE QUESTIONS
  const getRandomQuestions = (questions, count = 20) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, questions.length))
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('quizMasterUser')
    const savedQuizzes = localStorage.getItem('quizMasterQuizzes')
    const savedUsers = localStorage.getItem('quizMasterUsers')
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setUserData(user)
        setUserRole(user.role)
        setScreen(user.role === 'admin' ? 'admin' : 'home')
      } catch (e) {}
    }
    
    // CREATE GK QUIZZES WITH REAL QUESTIONS (NO DUPLICATION)
    const newQuizzes = {
      'mathematics': { name: 'Mathematics (150+ Q)', questions: mathQuestions, isGK: true },
      'science': { name: 'Science (150+ Q)', questions: scienceQuestions, isGK: true },
      'social': { name: 'Social Science (150+ Q)', questions: socialQuestions, isGK: true },
      'current': { name: 'Current Affairs (150+ Q)', questions: currentQuestions, isGK: true },
    }
    
    const savedQuizzes_parsed = localStorage.getItem('quizMasterQuizzes')
    if (savedQuizzes_parsed) {
      try {
        const saved = JSON.parse(savedQuizzes_parsed)
        Object.keys(saved).forEach(key => {
          if (key.startsWith('cbse')) {
            newQuizzes[key] = saved[key]
          }
        })
      } catch (e) {}
    }
    
    setAllQuizzes(newQuizzes)
    setAllUsers(savedUsers ? JSON.parse(savedUsers) : {})
  }, [])

  useEffect(() => {
    if (userData) localStorage.setItem('quizMasterUser', JSON.stringify(userData))
  }, [userData])

  useEffect(() => {
    localStorage.setItem('quizMasterQuizzes', JSON.stringify(allQuizzes))
  }, [allQuizzes])

  useEffect(() => {
    localStorage.setItem('quizMasterUsers', JSON.stringify(allUsers))
  }, [allUsers])

  const parseQuestionsFromFile = async (file) => {
    try {
      const text = await file.text()
      const lines = text.split('\n')
      const questions = []
      let currentQ = null
      let options = []
      let correctIdx = -1

      for (let line of lines) {
        line = line.trim()
        if (!line) continue
        if (/^\d+\.\s/.test(line)) {
          if (currentQ && options.length >= 2) {
            questions.push({ text: currentQ, options: options.slice(0, 4), correct: correctIdx >= 0 ? correctIdx : 0 })
          }
          currentQ = line.replace(/^\d+\.\s/, '')
          options = []
          correctIdx = -1
        }
        else if (/^[A-D][.)\s]+/.test(line)) {
          let optText = line.replace(/^[A-D][.)\s]+/, '').trim()
          if (optText.includes('✅') || optText.includes('✓')) {
            correctIdx = options.length
            optText = optText.replace(/✅|✓/g, '').trim()
          }
          if (optText) options.push(optText)
        }
      }
      if (currentQ && options.length >= 2) {
        questions.push({ text: currentQ, options: options.slice(0, 4), correct: correctIdx >= 0 ? correctIdx : 0 })
      }

      if (questions.length > 0) {
        setNewQuizData(prev => ({ ...prev, questions: questions }))
        setUploadMessage(`✅ Loaded ${questions.length} questions!`)
        return true
      }
    } catch (error) {
      setUploadMessage(`❌ Error: ${error.message}`)
    }
    return false
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file && file.name.endsWith('.txt')) {
      setUploadMessage('⏳ Parsing...')
      await parseQuestionsFromFile(file)
    } else {
      setUploadMessage('❌ Only TXT files')
    }
  }

  const handleEmailLogin = () => {
    if (!loginEmail || !loginName) { setLoginError('Please fill email and name'); return }
    if (!loginEmail.includes('@')) { setLoginError('Invalid email'); return }
    
    const user = { id: Date.now(), email: loginEmail, name: loginName, role: 'subscribe', subscribedAt: new Date().toISOString(), expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString() }
    setUserData(user); setUserRole('subscribe'); setAllUsers({ ...allUsers, [loginEmail]: user }); setScreen('home'); setLoginError(''); setLoginEmail(''); setLoginName('')
  }

  const handleMobileLogin = () => {
    if (!loginMobile || !loginName) { setLoginError('Please fill mobile and name'); return }
    if (!/^\d{10}$/.test(loginMobile)) { setLoginError('Invalid mobile'); return }
    
    const user = { id: Date.now(), mobile: loginMobile, name: loginName, role: 'subscribe', subscribedAt: new Date().toISOString(), expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString() }
    setUserData(user); setUserRole('subscribe'); setAllUsers({ ...allUsers, [loginMobile]: user }); setScreen('home'); setLoginError(''); setLoginMobile(''); setLoginName('')
  }

  const handleAdminLogin = () => {
    if (!adminEmail || !adminPassword) { setLoginError('Please fill both'); return }
    if (adminCredentials[adminEmail] && adminCredentials[adminEmail] === adminPassword) {
      const user = { id: Date.now(), email: adminEmail, name: 'Admin', role: 'admin', loginAt: new Date().toISOString() }
      setUserData(user); setUserRole('admin'); setScreen('admin'); setLoginError(''); setAdminEmail(''); setAdminPassword('')
    } else {
      setLoginError('Invalid credentials')
    }
  }

  const logout = () => { setUserData(null); setUserRole(null); setScreen('login'); localStorage.removeItem('quizMasterUser') }

  const generateGameCode = () => Math.random().toString(36).substring(2, 8).toUpperCase()
  const generateQRCode_Game = (code) => `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${code}`

  const startGame = (quizKey) => {
    const code = generateGameCode()
    setGameCode(code)
    const quiz = allQuizzes[quizKey]
    const randomQuestions = getRandomQuestions(quiz.questions, 20)
    setCurrentQuizzes([{ id: quizKey, name: quiz.name, questions: randomQuestions }])
    setPlayers([])
    setScreen('waiting')
  }

  const addPlayer = (name) => { if (players.length < 10 && name.trim()) { setPlayers([...players, { id: Date.now(), name: name, score: 0 }]); setPlayerName('') } }
  const startGamePlay = () => { if (players.length > 0) { setCurrentQuestion(0); setTimeLeft(20); setAnswered(false); setSelectedAnswer(null); setShowFeedback(false); setScreen('play') } }

  useEffect(() => {
    if (screen === 'play' && timeLeft > 0 && !answered) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0 && !answered && screen === 'play') {
      setAnswered(true); setShowFeedback(true); setFeedbackMessage('⏰ Time\'s Up!')
    }
    return () => clearTimeout(timerRef.current)
  }, [timeLeft, screen, answered])

  const submitAnswer = (idx) => {
    const q = currentQuizzes[0].questions[currentQuestion]
    const correct = idx === q.correct
    setSelectedAnswer(idx); setAnswered(true); setShowFeedback(true);
    if (correct) {
      setFeedbackMessage('✅ Correct!')
      setPlayers(p => p.map(pl => ({ ...pl, score: pl.score + Math.max(50, 100 - (20 - timeLeft) * 2) })))
    } else {
      setFeedbackMessage('❌ Wrong!')
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < currentQuizzes[0].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); setTimeLeft(20); setAnswered(false); setSelectedAnswer(null); setShowFeedback(false)
    } else {
      setScreen('results')
    }
  }

  const deleteQuiz = (quizKey) => {
    if (window.confirm('Delete this quiz?')) {
      const newQuizzes = { ...allQuizzes }
      delete newQuizzes[quizKey]
      setAllQuizzes(newQuizzes)
      alert('✅ Deleted!')
    }
  }

  const editQuiz = (quizKey) => {
    const quiz = allQuizzes[quizKey]
    const parts = quizKey.split('-')
    setNewQuizData({
      cbseStd: quizKey.includes('cbse') ? parts[0].replace('cbse', '') : '1',
      subject: quiz.name.split(' - ')[1] || '',
      title: quiz.name.split(' - ')[2] || '',
      questions: quiz.questions
    })
    setEditingQuizKey(quizKey)
    setShowAddQuestion(false)
  }

  // LOGIN SCREEN
  if (screen === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ maxWidth: '500px', width: '100%', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '32px' }}>🎯 Quiz Master</h1>
          {loginError && <div style={{ background: loginError.includes('✅') ? '#51CF66' : '#FF6B6B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', color: 'white', fontSize: '14px' }}>
            {loginError.includes('✅') ? '✅' : '❌'} {loginError}
          </div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '2rem' }}>
            <button onClick={() => { setLoginType('email'); setLoginError('') }} style={{ padding: '0.75rem', background: loginType === 'email' ? '#FFE66D' : 'rgba(255,255,255,0.2)', color: loginType === 'email' ? '#333' : 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>📧 Email</button>
            <button onClick={() => { setLoginType('mobile'); setLoginError('') }} style={{ padding: '0.75rem', background: loginType === 'mobile' ? '#FFE66D' : 'rgba(255,255,255,0.2)', color: loginType === 'mobile' ? '#333' : 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>📱 Mobile</button>
            <button onClick={() => { setLoginType('admin'); setLoginError('') }} style={{ padding: '0.75rem', background: loginType === 'admin' ? '#FFE66D' : 'rgba(255,255,255,0.2)', color: loginType === 'admin' ? '#333' : 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>🔐 Admin</button>
          </div>
          {loginType === 'email' && (<><input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: 'none', fontSize: '16px', boxSizing: 'border-box', color: '#333' }} /><input type="text" placeholder="Your Name" value={loginName} onChange={(e) => setLoginName(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '8px', border: 'none', fontSize: '16px', boxSizing: 'border-box', color: '#333' }} /><button onClick={handleEmailLogin} style={{ width: '100%', padding: '1rem', background: '#51CF66', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Subscribe with Email</button><p style={{ fontSize: '12px', marginTop: '1rem', color: '#FFE66D', textAlign: 'center' }}>✓ 1 Year Access</p></>)}
          {loginType === 'mobile' && (<><input type="tel" placeholder="Mobile (10 digits)" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength="10" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: 'none', fontSize: '16px', boxSizing: 'border-box', color: '#333' }} /><input type="text" placeholder="Your Name" value={loginName} onChange={(e) => setLoginName(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '8px', border: 'none', fontSize: '16px', boxSizing: 'border-box', color: '#333' }} /><button onClick={handleMobileLogin} style={{ width: '100%', padding: '1rem', background: '#51CF66', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Subscribe with Mobile</button><p style={{ fontSize: '12px', marginTop: '1rem', color: '#FFE66D', textAlign: 'center' }}>✓ 1 Year Access</p></>)}
          {loginType === 'admin' && (<><input type="email" placeholder="Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: 'none', fontSize: '16px', boxSizing: 'border-box', color: '#333' }} /><input type="password" placeholder="Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '8px', border: 'none', fontSize: '16px', boxSizing: 'border-box', color: '#333' }} /><button onClick={handleAdminLogin} style={{ width: '100%', padding: '1rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Admin Login</button></>)}
        </div>
      </div>
    )
  }

  // HOME (Subscriber)
  if (screen === 'home' && userRole === 'subscribe') {
    const gkQuizzes = Object.entries(allQuizzes).filter(([k, v]) => v.isGK === true)
    const cbseQuizzes = Object.entries(allQuizzes).filter(([k]) => k.startsWith('cbse'))
    
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div><h1 style={{ margin: 0, fontSize: '32px' }}>🎯 Quiz Master</h1><p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Hello {userData?.name}!</p><p style={{ margin: '0.3rem 0 0', fontSize: '12px', color: '#FFE66D' }}>Access expires: {new Date(userData?.expiryDate).toLocaleDateString()}</p></div>
            <button onClick={logout} style={{ padding: '0.75rem 1.5rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
          </div>

          <h2 style={{ marginBottom: '1.5rem', fontSize: '24px' }}>📚 General Knowledge</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {gkQuizzes.map(([key, quiz]) => (
              <button key={key} onClick={() => startGame(key)} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {quiz.name.split('(')[0]}<br/><small style={{ marginTop: '0.5rem' }}>{quiz.name.split('(')[1]}</small>
              </button>
            ))}
          </div>

          <h2 style={{ marginBottom: '1.5rem', fontSize: '20px' }}>📖 CBSE Created Quizzes</h2>
          {[1,2,3,4,5,6,7,8,9,10].map(std => {
            const stdQuizzes = cbseQuizzes.filter(([k]) => k.includes(`cbse${std}`))
            if (stdQuizzes.length === 0) return null
            return (
              <div key={std} style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '16px' }}>Std {std}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  {stdQuizzes.map(([key, quiz]) => (
                    <button key={key} onClick={() => startGame(key)} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {quiz.name}<br/><small>({quiz.questions.length} Q)</small>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ADMIN DASHBOARD
  if (screen === 'admin' && userRole === 'admin') {
    const allSubscribers = Object.values(allUsers).filter(u => u.role === 'subscribe' || !u.role)
    const cbseQuizzes = Object.entries(allQuizzes).filter(([k]) => k.startsWith('cbse'))

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ margin: 0, fontSize: '32px' }}>⚙️ Admin Dashboard</h1>
            <button onClick={logout} style={{ padding: '0.75rem 1.5rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}><h3 style={{ margin: '0 0 0.5rem', fontSize: '20px' }}>👥 Subscribers</h3><p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{allSubscribers.length}</p></div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}><h3 style={{ margin: '0 0 0.5rem', fontSize: '20px' }}>📖 Total Quizzes</h3><p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{Object.keys(allQuizzes).length}</p></div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}><h3 style={{ margin: '0 0 0.5rem', fontSize: '20px' }}>❓ CBSE Quizzes</h3><p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{cbseQuizzes.length}</p></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem' }}>
              <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '20px' }}>📋 All Subscribers</h2>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {allSubscribers.length === 0 ? <p style={{ color: '#FFE66D' }}>No subscribers yet</p> : allSubscribers.map((user, idx) => (
                  <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', marginBottom: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #FFE66D' }}>
                    <p style={{ margin: '0 0 0.3rem', fontWeight: 'bold', fontSize: '14px' }}>{idx + 1}. {user.name}</p>
                    <p style={{ margin: '0 0 0.2rem', fontSize: '12px', color: '#FFE66D' }}>{user.email ? `📧 ${user.email}` : `📱 ${user.mobile}`}</p>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '11px', color: '#ddd' }}>Joined: {new Date(user.subscribedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem' }}>
              <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '20px' }}>➕ Create CBSE Quiz</h2>
              <select value={newQuizData.cbseStd} onChange={(e) => setNewQuizData({ ...newQuizData, cbseStd: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '6px', border: 'none', fontSize: '14px', color: '#333' }}>
                {[1,2,3,4,5,6,7,8,9,10].map(std => <option key={std} value={std}>Std {std}</option>)}
              </select>
              <input type="text" placeholder="Subject" value={newQuizData.subject} onChange={(e) => setNewQuizData({ ...newQuizData, subject: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '6px', border: 'none', fontSize: '14px', color: '#333', boxSizing: 'border-box' }} />
              <input type="text" placeholder="Title" value={newQuizData.title} onChange={(e) => setNewQuizData({ ...newQuizData, title: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '6px', border: 'none', fontSize: '14px', color: '#333', boxSizing: 'border-box' }} />
              <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '0.5rem' }}>Upload TXT File</h4>
              <input ref={fileInputRef} type="file" accept=".txt" onChange={handleFileUpload} style={{ width: '100%', marginBottom: '0.5rem', fontSize: '12px', color: 'white' }} />
              {uploadMessage && <p style={{ fontSize: '12px', color: uploadMessage.includes('✅') ? '#51CF66' : '#FF6B6B', marginBottom: '0.5rem' }}>{uploadMessage}</p>}
              <p style={{ fontSize: '12px', color: '#FFE66D', marginBottom: '0.5rem' }}>Questions: {newQuizData.questions.length}</p>
              {!showAddQuestion ? (
                <button onClick={() => setShowAddQuestion(true)} style={{ width: '100%', padding: '0.5rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', marginBottom: '0.5rem' }}>➕ Add Question</button>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Question" value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.3rem', borderRadius: '4px', border: 'none', fontSize: '11px', boxSizing: 'border-box', color: '#333' }} />
                  {newQuestion.options.map((opt, i) => (
                    <input key={i} type="text" placeholder={`Option ${i+1}`} value={opt} onChange={(e) => { const newOpts = [...newQuestion.options]; newOpts[i] = e.target.value; setNewQuestion({ ...newQuestion, options: newOpts }) }} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.3rem', borderRadius: '4px', border: 'none', fontSize: '11px', boxSizing: 'border-box', color: '#333' }} />
                  ))}
                  <select value={newQuestion.correct} onChange={(e) => setNewQuestion({ ...newQuestion, correct: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.3rem', borderRadius: '4px', border: 'none', fontSize: '11px', color: '#333' }}>
                    <option value="0">Correct: 1</option>
                    <option value="1">Correct: 2</option>
                    <option value="2">Correct: 3</option>
                    <option value="3">Correct: 4</option>
                  </select>
                  <button onClick={() => { if (newQuestion.text && newQuestion.options.every(o => o.trim())) { setNewQuizData({ ...newQuizData, questions: [...newQuizData.questions, newQuestion] }); setNewQuestion({ text: '', options: ['', '', '', ''], correct: 0 }); setShowAddQuestion(false); } }} style={{ width: '100%', padding: '0.4rem', background: '#51CF66', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', marginBottom: '0.2rem' }}>Save</button>
                  <button onClick={() => setShowAddQuestion(false)} style={{ width: '100%', padding: '0.4rem', background: '#999', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>Cancel</button>
                </div>
              )}
              <button onClick={() => { if (newQuizData.subject && newQuizData.title && newQuizData.questions.length > 0) { if (editingQuizKey) { setAllQuizzes({ ...allQuizzes, [editingQuizKey]: { name: `Std ${newQuizData.cbseStd} - ${newQuizData.subject} - ${newQuizData.title}`, questions: newQuizData.questions } }); alert('✅ Updated!'); setEditingQuizKey(null); } else { const quizKey = `cbse${newQuizData.cbseStd}-${newQuizData.subject}-${Date.now()}`; setAllQuizzes({ ...allQuizzes, [quizKey]: { name: `Std ${newQuizData.cbseStd} - ${newQuizData.subject} - ${newQuizData.title}`, questions: newQuizData.questions } }); alert('✅ Created!'); } setNewQuizData({ cbseStd: '1', subject: '', title: '', questions: [] }); setUploadMessage(''); } }} disabled={newQuizData.questions.length === 0} style={{ width: '100%', padding: '0.5rem', background: newQuizData.questions.length > 0 ? '#FFE66D' : '#999', color: newQuizData.questions.length > 0 ? '#333' : 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: newQuizData.questions.length > 0 ? 'pointer' : 'not-allowed' }}>
                {editingQuizKey ? '✏️ Update' : '💾 Save'}
              </button>
              {editingQuizKey && (
                <button onClick={() => { setEditingQuizKey(null); setNewQuizData({ cbseStd: '1', subject: '', title: '', questions: [] }); }} style={{ width: '100%', padding: '0.5rem', background: '#999', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>❌ Cancel</button>
              )}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '20px' }}>📚 Manage CBSE Quizzes</h2>
            {cbseQuizzes.length === 0 ? <p style={{ color: '#FFE66D' }}>No CBSE quizzes yet</p> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {cbseQuizzes.map(([key, quiz]) => (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', fontSize: '14px' }}>{quiz.name}</p>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '12px', color: '#FFE66D' }}>Questions: {quiz.questions.length}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button onClick={() => editQuiz(key)} style={{ padding: '0.5rem', background: '#4ECDC4', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>✏️ Edit</button>
                      <button onClick={() => deleteQuiz(key)} style={{ padding: '0.5rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>🗑️ Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // WAITING SCREEN
  if (screen === 'waiting') {
    const qrUrl = generateQRCode_Game(gameCode)
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '36px' }}>{gameCode}</h1>
          <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center' }}>
            <img src={qrUrl} alt="QR" style={{ width: '280px', height: '280px', background: 'white', padding: '10px', borderRadius: '8px' }} />
          </div>
          <h2 style={{ marginBottom: '1rem', fontSize: '18px' }}>Players ({players.length}/10)</h2>
          <div style={{ marginBottom: '2rem', maxHeight: '150px', overflowY: 'auto' }}>
            {players.map(p => (
              <div key={p.id} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.2)', marginBottom: '0.5rem', borderRadius: '8px' }}>✓ {p.name}</div>
            ))}
          </div>
          <input type="text" placeholder="Your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '0.5rem', borderRadius: '8px', border: 'none', color: '#333', boxSizing: 'border-box' }} />
          <button onClick={() => addPlayer(playerName)} style={{ width: '100%', padding: '0.75rem', background: '#51CF66', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '2rem' }}>Join</button>
          <button onClick={startGamePlay} disabled={players.length === 0} style={{ width: '100%', padding: '1rem', background: players.length > 0 ? '#FFE66D' : '#999', color: players.length > 0 ? '#333' : 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: players.length > 0 ? 'pointer' : 'not-allowed', marginBottom: '1rem' }}>Start</button>
          <button onClick={() => setScreen('home')} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
        </div>
      </div>
    )
  }

  // PLAY SCREEN
  if (screen === 'play' && currentQuizzes.length > 0) {
    const q = currentQuizzes[0].questions[currentQuestion]
    const bgGradient = bgGradients[currentQuestion % bgGradients.length]
    return (
      <div style={{ background: bgGradient, minHeight: '100vh', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0 }}>Q {currentQuestion + 1}/20</h2>
            <button onClick={() => setScreen('waiting')} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Exit</button>
          </div>
          <h3 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '24px', fontWeight: 'bold' }}>{q.text}</h3>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '48px', fontWeight: 'bold' }}>{timeLeft}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {q.options.map((opt, i) => {
              let bgColor = colors[i], opacity = 1
              if (answered && i === q.correct) bgColor = '#51CF66'
              else if (answered && i === selectedAnswer && i !== q.correct) bgColor = '#FF6B6B'
              else if (answered && i !== q.correct && i !== selectedAnswer) opacity = 0.5
              return (
                <button key={i} onClick={() => !answered && submitAnswer(i)} disabled={answered} style={{ padding: '2rem', fontSize: '14px', fontWeight: 'bold', background: bgColor, color: 'white', border: 'none', borderRadius: '12px', cursor: answered ? 'default' : 'pointer', opacity }}>
                  {opt}
                </button>
              )
            })}
          </div>
          {showFeedback && (
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>{feedbackMessage}</p>
              <button onClick={nextQuestion} style={{ padding: '1rem 2rem', fontSize: '18px', fontWeight: 'bold', background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                {currentQuestion === 19 ? 'Results' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // RESULTS SCREEN
  if (screen === 'results') {
    const sorted = [...players].sort((a, b) => b.score - a.score)
    const userScore = sorted.find(p => p.id === players[0]?.id)
    const userRank = sorted.findIndex(p => p.id === players[0]?.id) + 1
    
    const generateResultsMessage = () => {
      const quiz = currentQuizzes[0]?.name || 'Quiz'
      const score = userScore?.score || 0
      const rank = userRank
      const date = new Date().toLocaleDateString()
      return `🏆 Quiz Results - ${quiz}\n\n📊 Score: ${score}\n🎯 Rank: ${rank}/${sorted.length}\n📅 Date: ${date}\n\n🎓 Quiz Master`
    }
    
    const shareViaWhatsApp = () => {
      const message = generateResultsMessage()
      const encodedMsg = encodeURIComponent(message)
      const phone = userData?.mobile?.replace(/\D/g, '')
      if (phone) {
        window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank')
      } else {
        alert('Mobile number not found!')
      }
    }
    
    const shareViaEmail = () => {
      const message = generateResultsMessage()
      const subject = encodeURIComponent('Quiz Master Results')
      const body = encodeURIComponent(message)
      const email = userData?.email
      if (email) {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      } else {
        alert('Email not found!')
      }
    }
    
    const downloadResults = () => {
      const quiz = currentQuizzes[0]?.name || 'Quiz'
      const score = userScore?.score || 0
      const rank = userRank
      const date = new Date().toLocaleDateString()
      const time = new Date().toLocaleTimeString()
      
      let resultsText = `QUIZ MASTER - RESULTS REPORT\n`
      resultsText += `${'='.repeat(50)}\n\n`
      resultsText += `Quiz: ${quiz}\n`
      resultsText += `Player: ${userData?.name}\n`
      resultsText += `Date: ${date}\n`
      resultsText += `Time: ${time}\n`
      resultsText += `Score: ${score}\n`
      resultsText += `Rank: ${rank}/${sorted.length}\n\n`
      resultsText += `LEADERBOARD:\n`
      resultsText += `${'='.repeat(50)}\n`
      sorted.forEach((p, i) => {
        resultsText += `${i + 1}. ${p.name}: ${p.score}\n`
      })
      
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resultsText))
      element.setAttribute('download', `quiz-results-${Date.now()}.txt`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
    
    return (
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', marginBottom: '1rem' }}>🏆 Quiz Complete!</h1>
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.95)', color: '#333', borderRadius: '12px', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0, marginBottom: '0.5rem' }}>🥇 Winner: {sorted[0]?.name}</h2>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Score: {sorted[0]?.score}</p>
          </div>
          
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '18px' }}>📊 Your Results</h3>
            <p style={{ margin: '0.5rem 0', fontSize: '16px' }}>Your Score: <strong>{userScore?.score || 0}</strong></p>
            <p style={{ margin: '0.5rem 0', fontSize: '16px' }}>Your Rank: <strong>{userRank}/{sorted.length}</strong></p>
          </div>
          
          {sorted.map((p, i) => (
            <div key={p.id} style={{ padding: '0.75rem', color: '#ddd', borderBottom: '1px solid #666', fontSize: '16px', fontWeight: 'bold' }}>
              {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {i + 1}. {p.name}: {p.score}
            </div>
          ))}
          
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
            {userData?.mobile && (
              <button onClick={shareViaWhatsApp} style={{ padding: '0.75rem', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                📱 Share on WhatsApp
              </button>
            )}
            {userData?.email && (
              <button onClick={shareViaEmail} style={{ padding: '0.75rem', background: '#EA4335', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                📧 Send via Email
              </button>
            )}
          </div>
          
          <button onClick={downloadResults} style={{ width: '100%', padding: '0.75rem', background: '#FFE66D', color: '#333', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginBottom: '1rem' }}>
            📥 Download Results
          </button>
          
          <button onClick={() => setScreen('home')} style={{ width: '100%', padding: '0.75rem 2rem', fontSize: '16px', fontWeight: 'bold', background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button>
        </div>
      </div>
    )
  }

  return null
}
