
export type Language = 'en' | 'ta' | 'te' | 'hi';

export type TranslationSet = {
    SignalSage: string;
    Login: string;
    Logout: string;
    SelectLanguage: string;
    SignalStrengthPredictor: string;
    findBestNetwork: string;
    predictSignalInMyArea: string;
    Predicting: string;
    predictionResults: string;
    Frequency: string;
    Download: string;
    Upload: string;
    Error: string;
    Success: string;
    signalStrengthPredicted: string;
    GeolocationError: string;
    geolocationNotSupported: string;
    geolocationPermissionDenied: string;
    geolocationPositionUnavailable: string;
    geolocationTimeout: string;
    geolocationUnknownError: string;
    AINanban: string;
    welcomeMessage: string;
    typeYourMessage: string;
    Send: string;
    aiError: string;
    loginDescription: string;
    Email: string;
    Password: string;
    SignIn: string;
    dontHaveAccount: string;
    SignUp: string;
    loginSuccessful: string;
    welcomeBack: string;
    loginFailed: string;
    loginError: string;
    signupDescription: string;
    confirmPassword: string;
    createAccount: string;
    alreadyHaveAccount: string;
    signupFailed: string;
    passwordsDoNotMatch: string;
    signupSuccessful: string;
    accountCreated: string;
    signupError: string;
};

export const translations: Record<Language, TranslationSet> = {
  en: {
    SignalSage: 'SignalSage',
    Login: 'Login',
    Logout: 'Log out',
    SelectLanguage: 'Select Language',
    SignalStrengthPredictor: 'Signal Strength Predictor',
    findBestNetwork: 'Find the best mobile network in your area. Click the button to get started.',
    predictSignalInMyArea: 'Predict Signal in My Area',
    Predicting: 'Predicting',
    predictionResults: 'Prediction Results',
    Frequency: 'Frequency',
    Download: 'Download',
    Upload: 'Upload',
    Error: 'Error',
    Success: 'Success!',
    signalStrengthPredicted: 'Signal strength predicted for your area.',
    GeolocationError: 'Geolocation Error',
    geolocationNotSupported: 'Geolocation is not supported by your browser.',
    geolocationPermissionDenied: 'Location access denied. Please enable it in your browser settings to use this feature.',
    geolocationPositionUnavailable: 'Location information is unavailable.',
    geolocationTimeout: 'The request to get user location timed out.',
    geolocationUnknownError: 'An unknown error occurred.',
    AINanban: 'AI Nanban',
    welcomeMessage: "Hi! I'm AI Nanban. Ask me anything!",
    typeYourMessage: 'Type your message...',
    Send: 'Send',
    aiError: "Sorry, something went wrong. Please try again.",
    loginDescription: 'Enter your email below to login to your account.',
    Email: 'Email',
    Password: 'Password',
    SignIn: 'Sign In',
    dontHaveAccount: "Don't have an account?",
    SignUp: 'Sign up',
    loginSuccessful: 'Login Successful',
    welcomeBack: 'Welcome back!',
    loginFailed: 'Login Failed',
    loginError: 'Please check your credentials and try again.',
    signupDescription: 'Enter your information to create an account.',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    signupFailed: 'Signup Failed',
    passwordsDoNotMatch: 'Passwords do not match.',
    signupSuccessful: 'Signup Successful',
    accountCreated: 'Your account has been created.',
    signupError: 'Could not create account. Please try again.',
  },
  ta: {
    SignalSage: 'சிக்னல்சேஜ்',
    Login: 'உள்நுழை',
    Logout: 'வெளியேறு',
    SelectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    SignalStrengthPredictor: 'சிக்னல் வலிமை முன்கணிப்பான்',
    findBestNetwork: 'உங்கள் பகுதியில் சிறந்த மொபைல் நெட்வொர்க்கைக் கண்டறியவும். தொடங்குவதற்கு பொத்தானைக் கிளிக் செய்யவும்.',
    predictSignalInMyArea: 'என் பகுதியில் சிக்னலை முன்கணி',
    Predicting: 'முன்கணிக்கிறது',
    predictionResults: 'முன்கணிப்பு முடிவுகள்',
    Frequency: 'அதிர்வெண்',
    Download: 'பதிவிறக்கம்',
    Upload: 'பதிவேற்றம்',
    Error: 'பிழை',
    Success: 'வெற்றி!',
    signalStrengthPredicted: 'உங்கள் பகுதிக்கு சிக்னல் வலிமை கணிக்கப்பட்டுள்ளது.',
    GeolocationError: 'புவிஇருப்பிடப் பிழை',
    geolocationNotSupported: 'உங்கள் உலாவியில் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.',
    geolocationPermissionDenied: 'இட அணுகல் மறுக்கப்பட்டது. இந்த அம்சத்தைப் பயன்படுத்த உங்கள் உலாவி அமைப்புகளில் அதை இயக்கவும்.',
    geolocationPositionUnavailable: 'இடத் தகவல் கிடைக்கவில்லை.',
    geolocationTimeout: 'பயனர் இருப்பிடத்தைப் பெறுவதற்கான கோரிக்கை நேரம் முடிந்தது.',
    geolocationUnknownError: 'அறியப்படாத பிழை ஏற்பட்டது.',
    AINanban: 'AI நண்பன்',
    welcomeMessage: 'வணக்கம்! நான் AI நண்பன். என்னிடம் எதையும் கேளுங்கள்!',
    typeYourMessage: 'உங்கள் செய்தியைத் தட்டச்சு செய்க...',
    Send: 'அனுப்பு',
    aiError: 'மன்னிக்கவும், ஏதோ தவறு జరిగింది. மீண்டும் முயற்சிக்கவும்.',
    loginDescription: 'உங்கள் கணக்கில் உள்நுழைய உங்கள் மின்னஞ்சலை கீழே உள்ளிடவும்.',
    Email: 'மின்னஞ்சல்',
    Password: 'கடவுச்சொல்',
    SignIn: 'உள்நுழை',
    dontHaveAccount: "கணக்கு இல்லையா?",
    SignUp: 'பதிவுபெறுக',
    loginSuccessful: 'உள்நுழைவு வெற்றி',
    welcomeBack: 'மீண்டும் வருக!',
    loginFailed: 'உள்நுழைவு தோல்வியடைந்தது',
    loginError: 'உங்கள் சான்றுகளை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    signupDescription: 'ஒரு கணக்கை உருவாக்க உங்கள் தகவலை உள்ளிடவும்.',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    createAccount: 'கணக்கை உருவாக்கு',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    signupFailed: 'பதிவு தோல்வியுற்றது',
    passwordsDoNotMatch: 'கடவுச்சொற்கள் பொருந்தவில்லை.',
    signupSuccessful: 'பதிவு வெற்றி',
    accountCreated: 'உங்கள் கணக்கு உருவாக்கப்பட்டது.',
    signupError: 'கணக்கை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
  },
  te: {
    SignalSage: 'సిగ్నల్‌సేజ్',
    Login: 'లాగిన్',
    Logout: 'లాగ్ అవుట్',
    SelectLanguage: 'భాషను ఎంచుకోండి',
    SignalStrengthPredictor: 'సిగ్నల్ స్ట్రెంత్ ప్రిడిక్టర్',
    findBestNetwork: 'మీ ప్రాంతంలో ఉత్తమ మొబైల్ నెట్‌వర్క్‌ను కనుగొనండి. ప్రారంభించడానికి బటన్‌ను క్లిక్ చేయండి.',
    predictSignalInMyArea: 'నా ప్రాంతంలో సిగ్నల్‌ను అంచనా వేయండి',
    Predicting: 'అంచనా వేస్తోంది',
    predictionResults: 'అంచనా ఫలితాలు',
    Frequency: 'ఫ్రీక్వెన్సీ',
    Download: 'డౌన్‌లోడ్',
    Upload: 'అప్‌లోడ్',
    Error: 'లోపం',
    Success: 'విజయం!',
    signalStrengthPredicted: 'మీ ప్రాంతానికి సిగ్నల్ బలం అంచనా వేయబడింది.',
    GeolocationError: 'జియోలొకేషన్ లోపం',
    geolocationNotSupported: 'మీ బ్రౌజర్‌లో జియోలొకేషన్ మద్దతు లేదు.',
    geolocationPermissionDenied: 'స్థాన ప్రాప్యత నిరాకరించబడింది. ఈ లక్షణాన్ని ఉపయోగించడానికి దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో దీన్ని ప్రారంభించండి.',
    geolocationPositionUnavailable: 'స్థాన సమాచారం అందుబాటులో లేదు.',
    geolocationTimeout: 'వినియోగదారు స్థానాన్ని పొందడానికి అభ్యర్థన సమయం ముగిసింది.',
    geolocationUnknownError: 'తెలియని లోపం సంభవించింది.',
    AINanban: 'AI నంబన్',
    welcomeMessage: 'హాయ్! నేను AI నంబన్. నన్ను ఏదైనా అడగండి!',
    typeYourMessage: 'మీ సందేశాన్ని టైప్ చేయండి...',
    Send: 'పంపు',
    aiError: 'క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    loginDescription: 'మీ ఖాతాకు లాగిన్ చేయడానికి మీ ఇమెయిల్‌ను క్రింద నమోదు చేయండి.',
    Email: 'ఇమెయిల్',
    Password: 'పాస్‌వర్డ్',
    SignIn: 'సైన్ ఇన్ చేయండి',
    dontHaveAccount: "ఖాతా లేదా?",
    SignUp: 'నమోదు చేసుకోండి',
    loginSuccessful: 'లాగిన్ విజయవంతమైంది',
    welcomeBack: 'తిరిగి స్వాగతం!',
    loginFailed: 'లాగిన్ విఫలమైంది',
    loginError: 'దయచేసి మీ ఆధారాలను తనిఖీ చేసి, మళ్లీ ప్రయత్నించండి.',
    signupDescription: 'ఖాతాను సృష్టించడానికి మీ సమాచారాన్ని నమోదు చేయండి.',
    confirmPassword: 'పాస్వర్డ్ను నిర్ధారించండి',
    createAccount: 'ఖాతాను సృష్టించండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    signupFailed: 'నమోదు విఫలమైంది',
    passwordsDoNotMatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.',
    signupSuccessful: 'నమోదు విజయవంతమైంది',
    accountCreated: 'మీ ఖాతా సృష్టించబడింది.',
    signupError: 'ఖాతాను సృష్టించడం సాధ్యం కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.',
  },
  hi: {
    SignalSage: 'सिग्नलसेज',
    Login: 'लॉग इन करें',
    Logout: 'लॉग आउट',
    SelectLanguage: 'भाषा चुनें',
    SignalStrengthPredictor: 'सिग्नल स्ट्रेंथ प्रेडिक्टर',
    findBestNetwork: 'अपने क्षेत्र में सबसे अच्छा मोबाइल नेटवर्क खोजें। आरंभ करने के लिए बटन पर क्लिक करें।',
    predictSignalInMyArea: 'मेरे क्षेत्र में सिग्नल का अनुमान लगाएं',
    Predicting: 'अनुमान लगाया जा रहा है',
    predictionResults: 'अनुमान परिणाम',
    Frequency: 'आवृत्ति',
    Download: 'डाउनलोड',
    Upload: 'अपलोड',
    Error: 'त्रुटि',
    Success: 'सफलता!',
    signalStrengthPredicted: 'आपके क्षेत्र के लिए सिग्नल की शक्ति का अनुमान लगाया गया है।',
    GeolocationError: 'जियोलोकेशन त्रुटि',
    geolocationNotSupported: 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है।',
    geolocationPermissionDenied: 'स्थान पहुंच अस्वीकृत। इस सुविधा का उपयोग करने के लिए कृपया इसे अपनी ब्राउज़र सेटिंग्स में सक्षम करें।',
    geolocationPositionUnavailable: 'स्थान की जानकारी अनुपलब्ध है।',
    geolocationTimeout: 'उपयोगकर्ता स्थान प्राप्त करने का अनुरोध समय समाप्त हो गया।',
    geolocationUnknownError: 'एक अज्ञात त्रुटि हुई।',
    AINanban: 'एआई नानबन',
    welcomeMessage: 'नमस्ते! मैं एआई नानबन हूं। मुझसे कुछ भी पूछें!',
    typeYourMessage: 'अपना संदेश टाइप करें...',
    Send: 'भेजें',
    aiError: 'क्षमा करें, कुछ गलत हो गया। कृपया पुन: प्रयास करें।',
    loginDescription: 'अपने खाते में लॉगिन करने के लिए नीचे अपना ईमेल दर्ज करें।',
    Email: 'ईमेल',
    Password: 'पासवर्ड',
    SignIn: 'साइन इन करें',
    dontHaveAccount: "खाता नहीं है?",
    SignUp: 'साइन अप करें',
    loginSuccessful: 'लॉगिन सफल',
    welcomeBack: 'वापसी पर स्वागत है!',
    loginFailed: 'लॉगिन विफल',
    loginError: 'कृपया अपनी क्रेडेंशियल जांचें और पुनः प्रयास करें।',
    signupDescription: 'खाता बनाने के लिए अपनी जानकारी दर्ज करें।',
    confirmPassword: 'पासवर्ड की पुष्टि कीजिये',
    createAccount: 'खाता बनाएं',
    alreadyHaveAccount: 'पहले से ही एक खाता है?',
    signupFailed: 'साइनअप विफल',
    passwordsDoNotMatch: 'पासवर्ड मेल नहीं खाते।',
    signupSuccessful: 'साइनअप सफल',
    accountCreated: 'आपका खाता बन गया है।',
    signupError: 'खाता नहीं बनाया जा सका। कृपया पुन: प्रयास करें।',
  },
};
