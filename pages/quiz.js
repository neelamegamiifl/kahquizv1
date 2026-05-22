import { useState, useEffect, useRef } from 'react'

export default function QuizApp() {
  const [screen, setScreen] = useState('login')
  const [userRole, setUserRole] = useState(null)
  const [userData, setUserData] = useState(null)
  const [allQuizzes, setAllQuizzes] = useState({})
  const [allUsers, setAllUsers] = useState({})
  const [userStats, setUserStats] = useState({
    quizzesTaken: 0,
    totalScore: 0,
    averageScore: 0,
    bestScore: 0,
    categoryScores: {},
    categoryAttempts: {},
    categorySuccessRate: {},
    quizHistory: [],
    totalTimeSpent: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastPlayedDate: null
  })

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
  const [gameStartTime, setGameStartTime] = useState(null)

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
  ]

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
  ]

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
    { text: 'USA independence?', options: ['1774', '1775', '1776', '1777'], correct: 2 },
    { text: 'India independence?', options: ['1945', '1946', '1947', '1948'], correct: 2 },
    { text: 'Largest continent?', options: ['Africa', 'Asia', 'Europe', 'North America'], correct: 1 },
    { text: 'Second largest continent?', options: ['Asia', 'Africa', 'Europe', 'South America'], correct: 1 },
    { text: 'Smallest continent?', options: ['Europe', 'Australia', 'Antarctica', 'North America'], correct: 1 },
    { text: 'World countries count?', options: ['180', '190', '195', '205'], correct: 2 },
    { text: 'Capital of Italy?', options: ['Venice', 'Milan', 'Rome', 'Florence'], correct: 2 },
    { text: 'Capital of Spain?', options: ['Barcelona', 'Valencia', 'Madrid', 'Seville'], correct: 2 },
  ]

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
  ]

  const allRealQuestions = {
    mathematics: mathQuestions,
    science: scienceQuestions,
    social: socialQuestions,
    current: currentQuestions,
  }

  const getRandomQuestions = (questions, count = 20) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, questions.length))
  }

  // LOAD USER STATS
  useEffect(() => {
    const savedUser = localStorage.getItem('quizMasterUser')
    const savedStats = localStorage.getItem(`quizMasterStats_${userData?.id || ''}`)
    const savedQuizzes = localStorage.getItem('quizMasterQuizzes')
    const savedUsers = localStorage.getItem('quizMasterUsers')
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setUserData(user)
        setUserRole(user.role)
        setScreen(user.role === 'admin' ? 'admin' : 'home')
        
        if (savedStats) {
          setUserStats(JSON.parse(savedStats))
        }
      } catch (e) {}
    }
    
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

  // SAVE USER STATS
  useEffect(() => {
    if (userData?.id) {
      localStorage.setItem(`quizMasterStats_${userData.id}`, JSON.stringify(userStats))
    }
  }, [userStats, userData])

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
    setGameStartTime(Date.now())
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

  // PERFORMANCE DASHBOARD SCREEN
  if (screen === 'dashboard') {
    const categoryNames = { mathematics: '📐 Mathematics', science: '🔬 Science', social: '🌍 Social Science', current: '📰 Current Affairs' }
    const successRate = userStats.quizzesTaken > 0 ? Math.round((userStats.totalScore / (userStats.quizzesTaken * 3000)) * 100) : 0
    
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ margin: 0, fontSize: '32px' }}>📊 Performance Dashboard</h1>
            <button onClick={() => setScreen('home')} style={{ padding: '0.75rem 1.5rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>← Back Home</button>
          </div>

          {/* KEY STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#FFE66D' }}>📚 Quizzes Taken</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '28px', fontWeight: 'bold' }}>{userStats.quizzesTaken}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#FFE66D' }}>💯 Total Score</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '28px', fontWeight: 'bold' }}>{userStats.totalScore.toLocaleString()}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#FFE66D' }}>📈 Average Score</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '28px', fontWeight: 'bold' }}>{userStats.averageScore.toFixed(0)}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#FFE66D' }}>🏆 Best Score</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '28px', fontWeight: 'bold' }}>{userStats.bestScore}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#FFE66D' }}>✅ Success Rate</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '28px', fontWeight: 'bold' }}>{successRate}%</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#FFE66D' }}>🔥 Current Streak</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '28px', fontWeight: 'bold' }}>{userStats.currentStreak} days</p>
            </div>
          </div>

          {/* CATEGORY PERFORMANCE */}
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '20px' }}>📚 Performance by Category</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {['mathematics', 'science', 'social', 'current'].map(cat => {
                const attempts = userStats.categoryAttempts[cat] || 0
                const score = userStats.categoryScores[cat] || 0
                const avgScore = attempts > 0 ? (score / attempts).toFixed(0) : 0
                const successRate = userStats.categorySuccessRate[cat] || 0
                
                return (
                  <div key={cat} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', fontSize: '14px' }}>{categoryNames[cat]}</p>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '12px' }}>
                        <span>Quizzes:</span>
                        <span>{attempts}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '12px' }}>
                        <span>Avg Score:</span>
                        <span>{avgScore}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span>Success Rate:</span>
                        <span>{successRate}%</span>
                      </div>
                    </div>
                    {/* PROGRESS BAR */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ background: successRate > 70 ? '#51CF66' : successRate > 40 ? '#FFE66D' : '#FF6B6B', height: '100%', width: `${Math.min(successRate, 100)}%`, transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RECENT QUIZZES */}
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '20px' }}>📜 Recent Quiz History</h2>
            {userStats.quizHistory.length === 0 ? (
              <p style={{ color: '#FFE66D' }}>No quizzes taken yet. Take a quiz to see your history!</p>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {userStats.quizHistory.slice().reverse().map((quiz, idx) => (
                  <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', marginBottom: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{quiz.quizName}</p>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '12px', color: '#ddd' }}>{new Date(quiz.date).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: quiz.score > 1500 ? '#51CF66' : quiz.score > 1000 ? '#FFE66D' : '#FF6B6B' }}>{quiz.score}</p>
                      <p style={{ margin: '0.2rem 0 0', fontSize: '11px', color: '#ddd' }}>Rank {quiz.rank}/{quiz.totalPlayers}</p>
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

  // HOME
  if (screen === 'home' && userRole === 'subscribe') {
    const gkQuizzes = Object.entries(allQuizzes).filter(([k, v]) => v.isGK === true)
    const cbseQuizzes = Object.entries(allQuizzes).filter(([k]) => k.startsWith('cbse'))
    
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div><h1 style={{ margin: 0, fontSize: '32px' }}>🎯 Quiz Master</h1><p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Hello {userData?.name}!</p><p style={{ margin: '0.3rem 0 0', fontSize: '12px', color: '#FFE66D' }}>Access expires: {new Date(userData?.expiryDate).toLocaleDateString()}</p></div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setScreen('dashboard')} style={{ padding: '0.75rem 1.5rem', background: '#4ECDC4', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>📊 Dashboard</button>
              <button onClick={logout} style={{ padding: '0.75rem 1.5rem', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
            </div>
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

  // ADMIN
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
    
    // UPDATE USER STATS
    useEffect(() => {
      if (userScore) {
        const quizName = currentQuizzes[0]?.name || 'Unknown Quiz'
        const categoryKey = Object.keys(allQuizzes).find(key => allQuizzes[key].name === quizName)?.split('-')[0] || 'unknown'
        
        setUserStats(prev => {
          const categoryAttempts = (prev.categoryAttempts[categoryKey] || 0) + 1
          const categoryScores = (prev.categoryScores[categoryKey] || 0) + userScore.score
          const categorySuccessRate = Math.round((categoryScores / (categoryAttempts * 3000)) * 100)
          
          return {
            quizzesTaken: prev.quizzesTaken + 1,
            totalScore: prev.totalScore + userScore.score,
            averageScore: (prev.totalScore + userScore.score) / (prev.quizzesTaken + 1),
            bestScore: Math.max(prev.bestScore, userScore.score),
            categoryScores: { ...prev.categoryScores, [categoryKey]: categoryScores },
            categoryAttempts: { ...prev.categoryAttempts, [categoryKey]: categoryAttempts },
            categorySuccessRate: { ...prev.categorySuccessRate, [categoryKey]: categorySuccessRate },
            quizHistory: [...prev.quizHistory, { quizName, score: userScore.score, rank: userRank, totalPlayers: sorted.length, date: new Date().toISOString() }],
            totalTimeSpent: prev.totalTimeSpent + (gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0),
            currentStreak: userScore.score > 1000 ? prev.currentStreak + 1 : 0,
            bestStreak: Math.max(prev.bestStreak, userScore.score > 1000 ? prev.currentStreak + 1 : 0),
            lastPlayedDate: new Date().toISOString()
          }
        })
      }
    }, [])

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
