//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Sign in or register

router.post('/id-verification/v3/intro-question', (req, res, next) => {
    const newOld = req.session.data['new-existing'];
    if (newOld === 'Yes') {
        res.redirect('/id-verification/v3/register-start');
    } else  {
        res.redirect("/id-verification/v3/sign-in");
    }
})
router.post('/id-verification/v3/intro-question-2', (req, res, next) => {
    const newOld = req.session.data['new-existing'];
    if (newOld === 'Yes') {
        res.redirect('/id-verification/v3/register-start');
    } else  {
        res.redirect("/id-verification/v3/sign-in-2");
    }
})

router.post('/id-verification/v4/intro-question', (req, res, next) => {
    const newOld = req.session.data['new-existing'];
    if (newOld === 'Yes') {
        res.redirect('/id-verification/v4/register-start');
    } else  {
        res.redirect("/id-verification/v4/sign-in");
    }
})

router.post('/id-verification/v5/intro-question', (req, res, next) => {
    const newOld = req.session.data['new-existing'];
    if (newOld === 'Yes') {
        res.redirect('/id-verification/v5/register-start');
    } else  {
        res.redirect("/id-verification/v5/sign-in");
    }
})

router.post('/id-verification/v6/intro-question', (req, res, next) => {
    const newOld = req.session.data['new-existing'];
    if (newOld === 'No') {
        res.redirect('/id-verification/v6/register-start');
    } else  {
        res.redirect("/id-verification/v6/sign-in");
    }
})

router.post('/id-verification/optionf-v1/intro-question', (req, res, next) => {
    const newOld = req.session.data['new-existing'];
    if (newOld === 'No') {
        res.redirect('/id-verification/optionf-v1/register-start');
    } else  {
        res.redirect("/id-verification/optionf-v1/sign-in");
    }
})

// Sign out pop up

router.post('/id-verification/v3/savepopup', (req, res, next) => {
  const saveExit = req.session.data['sign-out'];
  if (saveExit === 'Yes') {
    res.redirect('/id-verification/v3/sign-out');
  } else if (saveExit === 'No') {
    res.redirect("/id-verification/v3/live-pip1/about_your_health/hcp-1");
  } else {
    res.redirect('/id-verification/v3/live-pip1/about_your_health/hcp-1-popup-error')
  }
})

router.use((req, res, next) => {
  popupReset(req);
  if (req.query.saveExit) {
    req.session.saveExit = req.query.saveExit;
  }
  res.locals.saveExit = req.session.saveExit;
  next();
});

// OIDV reminders

router.post('/id-verification/v6/oidv-reminder/quantity', (req, res, next) => {
    const reminderQuant = req.session.data['reminder-quantity'];
    if (reminderQuant === 'One') {
        res.redirect('/id-verification/v6/oidv-reminder/blank');
    } else  {
        res.redirect("/id-verification/v6/oidv-reminder/repeat");
    }
})

// PIP2 - Planning and following a journey

router.post('/id-verification/v4/live-pip2/planning-and-following-a-journey', (req, res) => {
  const qplanning = req.session.data['planningandfollowingajourney-question'];

  if (qplanning == 'Yes') {
    res.redirect('details')
  } else {
    res.redirect('check')
  }
})

//PIP2 - Moving around

router.post('/id-verification/v4/live-pip2/moving-around', (req, res) => {
  const qmoving = req.session.data['movingaround-question'];

  if (qmoving == 'Yes') {
    res.redirect('info')
  } else {
    res.redirect('check')
  }
})
router.post('/id-verification/v4/live-pip2/moving-around/info', (req, res) => {
  const qmovinginfo = req.session.data['movingaround-info'];

  if (qmovinginfo == 'It varies') {
    res.redirect('varies')
  } else {
    res.redirect('details')
  }
})

// PIP2 - Sign back in

router.post('/id-verification/v4/pip2-next-step', (req, res, next) => {
    const nextStep = req.session.data['next-step'];
    if (nextStep === 'upload') {
        res.redirect('/id-verification/v4/live-pip2/supporting-evidence');
    } else if (nextStep === 'confirm') {
        res.redirect("/id-verification/v4/dth/re-sign-in");
    }
})

router.post('/id-verification/v5/pip2-next-step', (req, res, next) => {
    const nextStep = req.session.data['next-step'];
    if (nextStep === 'upload') {
        res.redirect('/id-verification/v5/live-pip2/supporting-evidence');
    } else if (nextStep === 'confirm') {
        res.redirect("/id-verification/v5/idv-intro");
    }
})

router.post('/id-verification/optionf-v1/identity/what-do-you-want-to-do', (req, res, next) => {
    const nextStep = req.session.data['next-step'];
    if (nextStep === 'upload') {
        res.redirect('/id-verification/optionf-v1/submission/supporting-evidence');
    } else if (nextStep === 'confirm') {
        res.redirect("/id-verification/optionf-v1/identity/check-identity");
    }
})

// PIP2 upload uploadsupportingevidenceandapply

router.post('/id-verification/v6/live-pip2/supporting-evidence/supporting-evidence', (req, res) => {
  const upload = req.session.data['question'];

  if (upload == 'no') {
    res.redirect('/id-verification/v6/live-pip2/apply/declaration')
  } else {
    res.redirect('file-upload-help')
  }
})

router.post('/zero-confidence/v1/live-pip2/supporting-evidence/supporting-evidence', (req, res) => {
  const upload = req.session.data['question'];

  if (upload == 'no') {
    res.redirect('/zero-confidence/v1/live-pip2/apply/declaration')
  } else {
    res.redirect('file-upload-help')
  }
})

// Confirm ID online variations

router.post('/id-verification/v7/version-a/check-identity', (req, res, next) => {
    const nextStep = req.session.data['oidv'];
    if (nextStep === 'yes') {
        res.redirect('you-are-leaving-pip');
    } else if (nextStep === 'no') {
        res.redirect("call-to-confirm-identity");
    }
})

router.post('/id-verification/v7/version-b/check-identity', (req, res, next) => {
    const nextStep = req.session.data['oidv'];
    if (nextStep === 'yes') {
        res.redirect('you-are-leaving-pip');
    } else if (nextStep === 'no') {
        res.redirect("call-to-confirm-identity");
    }
})

router.post('/id-verification/v7/version-c/check-identity', (req, res, next) => {
    const nextStep = req.session.data['oidv'];
    if (nextStep === 'yes') {
        res.redirect('you-are-leaving-pip');
    } else if (nextStep === 'no') {
        res.redirect("call-to-confirm-identity");
    }
})

// IDV speed bump choice

router.post('/zero-confidence/v1/identity/check-identity', (req, res, next) => {
    const nextStep = req.session.data['oidv'];
    if (nextStep === 'yes') {
        res.redirect('/zero-confidence/v1/oidv-medium-confidence/collecting-your-personal-details');
    } else if (nextStep === 'no') {
        res.redirect("call-to-confirm-identity");
    }
})

// DTH HMRC IV

router.use((req, res, next) => {
  popupReset(req);
  if (req.query.saveExit) {
    req.session.saveExit = req.query.saveExit;
  }
  res.locals.saveExit = req.session.saveExit;
  next();
});

const popupReset = req => {
  req.session.data['sign-out'] = "";
  req.session.saveExit = false;
}

// ID verification

router.post('/id-verification/v3/idvselection', (req, res) => {
  const passportConsent = req.session.data['passport-consent'];
  const payslipOrP60 = req.session.data['payslipOrP60'];
  const selfassessment = req.session.data['self-assessment'];
  const voiceID = req.session.data['tcOptions'];
  const tuConsent = req.session.data['cra-consent'];

  //Passport and payslip
  if (passportConsent == 'true' && payslipOrP60 == 'payslip') {
    res.redirect('./dth/passport-details?payslip=true')
  }
  //Passport and P60
  else if (passportConsent == 'true' && payslipOrP60 == 'p60') {
    res.redirect('./dth/passport-details?p60=true')
  }
  //Passport and Self assessment
  else if (passportConsent == 'true' && selfassessment == 'true') {
    res.redirect('./dth/passport-details?selfassessment=true')
  }
  //Passport and tax credits KBV
  else if (passportConsent == 'true' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/passport-details?tcKbv=true')
  }
  //Passport and tax credits voice ID
  else if (passportConsent == 'true' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/passport-details?voiceId=true')
  }
  //Passport and Transunion
  else if (passportConsent == 'true' && tuConsent == 'true') {
    res.redirect('./dth/passport-details?tuKbv=true')
  }
  //Payslip and Self assessment
  else if (payslipOrP60 == 'payslip' && selfassessment == 'true') {
    res.redirect('./dth/payslip-q1?selfassessment=true')
  }
  //Payslip and tax credits KBV
  else if (payslipOrP60 == 'payslip' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/payslip-q1?tcKbv=true');
  }
  //Payslip and tax credits voice ID
  else if (payslipOrP60 == 'payslip' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/payslip-q1?voiceId=true')
  }
  //Payslip and Transunion
  else if (payslipOrP60 == 'payslip' && tuConsent == 'true') {
    res.redirect('./dth/payslip-q1?tuKbv=true');
  }
  //P60 and Self assessment
  else if (payslipOrP60 == 'p60' && selfassessment == 'true') {
    res.redirect('./dth/p60-q1?selfassessment=true')
  }
  //P60 and tax credits KBV
  else if (payslipOrP60 == 'p60' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/p60-q1?tcKbv=true');
  }
  //P60 and tax credits voice ID
  else if (payslipOrP60 == 'p60' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/p60-q1?voiceId=true')
  }
  //P60 and Transunion
  else if (payslipOrP60 == 'p60' && tuConsent == 'true') {
    res.redirect('./dth/p60-q1?tuKbv=true');
  }
  //Self assessment and tax credits KBV
  else if (selfassessment == 'true' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/self-assessment?tcKbv=true')
  }
  //Self assessment and tax credits voice ID
  else if (selfassessment == 'true' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/self-assessment?voiceId=true')
  }
  //Self assessment and Transunion
  else if (selfassessment == 'true' && tuConsent == 'true') {
    res.redirect('./dth/self-assessment?tuKbv=true')
  }
  //Tax credits KBV and Transunion
  else if (voiceID == 'voiceIdNo' && tuConsent == 'true') {
    res.redirect('./dth/tax-credits-q1?tuKbv=true');
  }
  //Tax credits voice ID and Transunion
  else if (voiceID == 'voiceIdYes' && tuConsent == 'true') {
    res.redirect('./dth/voice-id?tuKbv=true')
  }
  // Fallback
  else {
    res.redirect('./dth/choose-2-items-error')
  }
})

router.post('/id-verification/v3/dth/payslip', (req, res) => {
  res.redirect('./payslip-q1');
})

router.post('/id-verification/v3/dth/p60', (req, res) => {
  res.redirect('./p60-q1');
})

router.post('/id-verification/v3/dth/selfassessment', (req, res) => {
  res.redirect('./self-assessment');
})

router.post('/id-verification/v3/dth/tcKbv', (req, res) => {
  res.redirect('./tax-credits-q1');
})

router.post('/id-verification/v3/dth/tuKbv', (req, res) => {
  res.redirect('./credit-ref-q1');
})

router.post('/id-verification/v3/voiceId', (req, res) => {
  res.redirect("/carers/voice-id");
})

router.post('/id-verification/v3/success', (req, res) => {
  res.redirect("/v3b/address");
})

router.post('/id-verification/optionf-v1/idvselection', (req, res) => {
  const passportConsent = req.session.data['passport-consent'];
  const payslipOrP60 = req.session.data['payslipOrP60'];
  const selfassessment = req.session.data['self-assessment'];
  const voiceID = req.session.data['tcOptions'];
  const tuConsent = req.session.data['cra-consent'];

  //Passport and payslip
  if (passportConsent == 'true' && payslipOrP60 == 'payslip') {
    res.redirect('./dth/passport-details?payslip=true')
  }
  //Passport and P60
  else if (passportConsent == 'true' && payslipOrP60 == 'p60') {
    res.redirect('./dth/passport-details?p60=true')
  }
  //Passport and Self assessment
  else if (passportConsent == 'true' && selfassessment == 'true') {
    res.redirect('./dth/passport-details?selfassessment=true')
  }
  //Passport and tax credits KBV
  else if (passportConsent == 'true' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/passport-details?tcKbv=true')
  }
  //Passport and tax credits voice ID
  else if (passportConsent == 'true' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/passport-details?voiceId=true')
  }
  //Passport and Transunion
  else if (passportConsent == 'true' && tuConsent == 'true') {
    res.redirect('./dth/passport-details?tuKbv=true')
  }
  //Payslip and Self assessment
  else if (payslipOrP60 == 'payslip' && selfassessment == 'true') {
    res.redirect('./dth/payslip-q1?selfassessment=true')
  }
  //Payslip and tax credits KBV
  else if (payslipOrP60 == 'payslip' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/payslip-q1?tcKbv=true');
  }
  //Payslip and tax credits voice ID
  else if (payslipOrP60 == 'payslip' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/payslip-q1?voiceId=true')
  }
  //Payslip and Transunion
  else if (payslipOrP60 == 'payslip' && tuConsent == 'true') {
    res.redirect('./dth/payslip-q1?tuKbv=true');
  }
  //P60 and Self assessment
  else if (payslipOrP60 == 'p60' && selfassessment == 'true') {
    res.redirect('./dth/p60-q1?selfassessment=true')
  }
  //P60 and tax credits KBV
  else if (payslipOrP60 == 'p60' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/p60-q1?tcKbv=true');
  }
  //P60 and tax credits voice ID
  else if (payslipOrP60 == 'p60' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/p60-q1?voiceId=true')
  }
  //P60 and Transunion
  else if (payslipOrP60 == 'p60' && tuConsent == 'true') {
    res.redirect('./dth/p60-q1?tuKbv=true');
  }
  //Self assessment and tax credits KBV
  else if (selfassessment == 'true' && voiceID == 'voiceIdNo') {
    res.redirect('./dth/self-assessment?tcKbv=true')
  }
  //Self assessment and tax credits voice ID
  else if (selfassessment == 'true' && voiceID == 'voiceIdYes') {
    res.redirect('./dth/self-assessment?voiceId=true')
  }
  //Self assessment and Transunion
  else if (selfassessment == 'true' && tuConsent == 'true') {
    res.redirect('./dth/self-assessment?tuKbv=true')
  }
  //Tax credits KBV and Transunion
  else if (voiceID == 'voiceIdNo' && tuConsent == 'true') {
    res.redirect('./dth/tax-credits-q1?tuKbv=true');
  }
  //Tax credits voice ID and Transunion
  else if (voiceID == 'voiceIdYes' && tuConsent == 'true') {
    res.redirect('./dth/voice-id?tuKbv=true')
  }
  // Fallback
  else {
    res.redirect('./dth/choose-2-items-error')
  }
})

router.post('/id-verification/optionf-v1/dth/payslip', (req, res) => {
  res.redirect('./payslip-q1');
})

router.post('/id-verification/optionf-v1/dth/p60', (req, res) => {
  res.redirect('./p60-q1');
})

router.post('/id-verification/optionf-v1/dth/selfassessment', (req, res) => {
  res.redirect('./self-assessment');
})

router.post('/id-verification/optionf-v1/dth/tcKbv', (req, res) => {
  res.redirect('./tax-credits-q1');
})

router.post('/id-verification/optionf-v1/dth/tuKbv', (req, res) => {
  res.redirect('./credit-ref-q1');
})

router.post('/id-verification/optionf-v1/voiceId', (req, res) => {
  res.redirect("/carers/voice-id");
})

router.post('/id-verification/optionf-v1/success', (req, res) => {
  res.redirect("/v3b/address");
})

router.post('/zero-confidence/v1/idvselection', (req, res) => {
  const passportConsent = req.session.data['passport-consent'];
  const payslipOrP60 = req.session.data['payslipOrP60'];
  const selfassessment = req.session.data['self-assessment'];
  const voiceID = req.session.data['tcOptions'];
  const tuConsent = req.session.data['cra-consent'];

  //Passport and payslip
  if (passportConsent == 'true' && payslipOrP60 == 'payslip') {
    res.redirect('./oidv-medium-confidence/passport-details?payslip=true')
  }
  //Passport and P60
  else if (passportConsent == 'true' && payslipOrP60 == 'p60') {
    res.redirect('./oidv-medium-confidence/passport-details?p60=true')
  }
  //Passport and Self assessment
  else if (passportConsent == 'true' && selfassessment == 'true') {
    res.redirect('./oidv-medium-confidence/passport-details?selfassessment=true')
  }
  //Passport and tax credits KBV
  else if (passportConsent == 'true' && voiceID == 'voiceIdNo') {
    res.redirect('./oidv-medium-confidence/passport-details?tcKbv=true')
  }
  //Passport and tax credits voice ID
  else if (passportConsent == 'true' && voiceID == 'voiceIdYes') {
    res.redirect('./oidv-medium-confidence/passport-details?voiceId=true')
  }
  //Passport and Transunion
  else if (passportConsent == 'true' && tuConsent == 'true') {
    res.redirect('./oidv-medium-confidence/passport-details?tuKbv=true')
  }
  //Payslip and Self assessment
  else if (payslipOrP60 == 'payslip' && selfassessment == 'true') {
    res.redirect('./oidv-medium-confidence/payslip-q1?selfassessment=true')
  }
  //Payslip and tax credits KBV
  else if (payslipOrP60 == 'payslip' && voiceID == 'voiceIdNo') {
    res.redirect('./oidv-medium-confidence/payslip-q1?tcKbv=true');
  }
  //Payslip and tax credits voice ID
  else if (payslipOrP60 == 'payslip' && voiceID == 'voiceIdYes') {
    res.redirect('./oidv-medium-confidence/payslip-q1?voiceId=true')
  }
  //Payslip and Transunion
  else if (payslipOrP60 == 'payslip' && tuConsent == 'true') {
    res.redirect('./oidv-medium-confidence/payslip-q1?tuKbv=true');
  }
  //P60 and Self assessment
  else if (payslipOrP60 == 'p60' && selfassessment == 'true') {
    res.redirect('./oidv-medium-confidence/p60-q1?selfassessment=true')
  }
  //P60 and tax credits KBV
  else if (payslipOrP60 == 'p60' && voiceID == 'voiceIdNo') {
    res.redirect('./oidv-medium-confidence/p60-q1?tcKbv=true');
  }
  //P60 and tax credits voice ID
  else if (payslipOrP60 == 'p60' && voiceID == 'voiceIdYes') {
    res.redirect('./oidv-medium-confidence/p60-q1?voiceId=true')
  }
  //P60 and Transunion
  else if (payslipOrP60 == 'p60' && tuConsent == 'true') {
    res.redirect('./oidv-medium-confidence/p60-q1?tuKbv=true');
  }
  //Self assessment and tax credits KBV
  else if (selfassessment == 'true' && voiceID == 'voiceIdNo') {
    res.redirect('./oidv-medium-confidence/self-assessment?tcKbv=true')
  }
  //Self assessment and tax credits voice ID
  else if (selfassessment == 'true' && voiceID == 'voiceIdYes') {
    res.redirect('./oidv-medium-confidence/self-assessment?voiceId=true')
  }
  //Self assessment and Transunion
  else if (selfassessment == 'true' && tuConsent == 'true') {
    res.redirect('./oidv-medium-confidence/self-assessment?tuKbv=true')
  }
  //Tax credits KBV and Transunion
  else if (voiceID == 'voiceIdNo' && tuConsent == 'true') {
    res.redirect('./oidv-medium-confidence/tax-credits-q1?tuKbv=true');
  }
  //Tax credits voice ID and Transunion
  else if (voiceID == 'voiceIdYes' && tuConsent == 'true') {
    res.redirect('./oidv-medium-confidence/voice-id?tuKbv=true')
  }
  // Fallback
  else {
    res.redirect('./oidv-medium-confidence/choose-2-items-error')
  }
})

router.post('/zero-confidence/v1/oidv-medium-confidence/payslip', (req, res) => {
  res.redirect('./payslip-q1');
})

router.post('/zero-confidence/v1/oidv-medium-confidence/p60', (req, res) => {
  res.redirect('./p60-q1');
})

router.post('/zero-confidence/v1/oidv-medium-confidence/selfassessment', (req, res) => {
  res.redirect('./self-assessment');
})

router.post('/zero-confidence/v1/oidv-medium-confidence/tcKbv', (req, res) => {
  res.redirect('./tax-credits-q1');
})

router.post('/zero-confidence/v1/oidv-medium-confidence/tuKbv', (req, res) => {
  res.redirect('./credit-ref-q1');
})

router.post('/zero-confidence/v1/oidv-medium-confidence/voiceId', (req, res) => {
  res.redirect("/carers/voice-id");
})

router.post('/zero-confidence/v1/oidv-medium-confidence/success', (req, res) => {
  res.redirect("/v3b/address");
})

router.use((req, res, next) => {
  idvReset(req);
  if (req.query.payslip) {
    req.session.payslip = req.query.payslip;
  }
  res.locals.payslip = req.session.payslip;
  next();
});

router.use((req, res, next) => {
  idvReset(req);
  if (req.query.p60) {
    req.session.p60 = req.query.p60;
  }
  res.locals.p60 = req.session.p60;
  next();
});

router.use((req, res, next) => {
  idvReset(req);
  if (req.query.tcKbv) {
    req.session.tcKbv = req.query.tcKbv;
  }
  res.locals.tcKbv = req.session.tcKbv;
  next();
});

router.use((req, res, next) => {
  idvReset(req);
  if (req.query.tuKbv) {
    req.session.tuKbv = req.query.tuKbv;
  }
  res.locals.tuKbv = req.session.tuKbv;
  next();
});

router.use((req, res, next) => {
  idvReset(req);
  if (req.query.selfassessment) {
    req.session.selfassessment = req.query.selfassessment;
  }
  res.locals.selfassessment = req.session.selfassessment;
  next();
});

router.use((req, res, next) => {
  idvReset(req);
  if (req.query.voiceId) {
    req.session.voiceId = req.query.voiceId;
  }
  res.locals.voiceId = req.session.voiceId;
  next();
});

const idvReset = req => {
  req.session.data['payslipOrP60'] = "";
  req.session.data['tcOptions'] = "";
  req.session.data['cra-consent'] = "";
  req.session.data['passport-consent'] = "";
  req.session.data['self-assessment'] = "";
  req.session.payslip = false;
  req.session.p60 = false;
  req.session.tcKbv = false;
  req.session.tuKbv = false;
  req.session.voiceId = false;
  req.session.selfassessment = false;
}

// routing for account recovery - create new pasword question
router.post('/current/account-recovery/password-reset', function (req, res) {
    const editChoice = req.session.data['reset-password']
    if (editChoice === 'yes') {
      res.redirect('/current/account-recovery/password-reset')
    } else if (editChoice === 'no') {
      res.redirect('/current/account-recovery/new-sign-in-details-created')
    }
  });

  // routing for security codes - speedbump
  router.post('/zero-confidence/v2-b-speedbump/verify/sign-in/security-code', (req, res, next) => {
          const codechoice = req.session.data['code-choice'];
            if (codechoice === 'Send me a text message') {
              res.redirect('/zero-confidence/v2-b-speedbump/verify/sign-in/code-text');
          } else {
              res.redirect('/zero-confidence/v2-b-speedbump/verify/sign-in/code-email');
          }
  });

  // routing for security codes - without speedbump
  router.post('/zero-confidence/v2-b-free-for-all/verify/sign-in/security-code', (req, res, next) => {
          const codechoice = req.session.data['code-choice'];
            if (codechoice === 'Send me a text message') {
              res.redirect('/zero-confidence/v2-b-free-for-all/verify/sign-in/code-text');
          } else {
              res.redirect('/zero-confidence/v2-b-free-for-all/verify/sign-in/code-email');
          }
  });
