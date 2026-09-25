module.exports=[848782,e=>{"use strict";let t="https://tamkinly.com",i="#0F1C2E",a="#1F6F78",o="#3DD4B0",n="#F6F8FA",r="#FFFFFF",s="#333333",l="#999999",d=`
  body { font-family: 'Segoe UI', Arial, sans-serif; background-color: ${n}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  .container { max-width: 600px; margin: 0 auto; background-color: ${r}; border-radius: 0; overflow: hidden; }
  .header { background: linear-gradient(135deg, ${i} 0%, #1a2d42 100%); padding: 40px 30px; text-align: center; }
  .header h1 { color: ${r}; margin: 0; font-size: 26px; font-weight: 700; }
  .header .subtitle { color: ${o}; margin: 8px 0 0; font-size: 16px; font-weight: 400; }
  .content { padding: 40px 30px; }
  .content h2 { color: ${i}; font-size: 22px; margin-bottom: 16px; font-weight: 700; }
  .content p { color: ${s}; line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
  .content ul { color: ${s}; line-height: 1.8; padding-left: 20px; }
  .content li { margin-bottom: 6px; }
  .button { display: inline-block; background: linear-gradient(135deg, ${a} 0%, ${o} 100%); color: ${r}; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 16px 0; }
  .button:hover { opacity: 0.9; }
  .button-dark { background: linear-gradient(135deg, ${i} 0%, #1a2d42 100%); }
  .access-box { background: linear-gradient(135deg, ${i} 0%, #1a2d42 100%); border-radius: 12px; padding: 25px; margin: 24px 0; text-align: center; }
  .access-box h3 { color: ${o}; margin: 0 0 12px 0; font-size: 16px; font-weight: 600; }
  .access-box .code { color: ${r}; font-size: 26px; font-weight: bold; letter-spacing: 3px; font-family: 'Courier New', monospace; }
  .access-box p { color: ${l}; font-size: 13px; margin-top: 12px; }
  .highlight-box { background: ${n}; border-left: 4px solid ${a}; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0; }
  .highlight-box h3 { color: ${i}; margin: 0 0 10px 0; font-size: 16px; }
  .highlight-box a { color: ${a}; font-weight: 600; }
  .apps-box { background: rgba(31,111,120,0.06); border: 2px solid ${a}; border-radius: 12px; padding: 20px; margin: 24px 0; }
  .apps-box h3 { color: ${a}; margin: 0 0 12px 0; font-size: 16px; }
  .apps-box ul { margin: 0; padding-left: 20px; color: ${s}; }
  .apps-box li { margin-bottom: 6px; font-size: 14px; }
  .vip-badge { display: inline-block; background: ${o}; color: ${i}; padding: 4px 14px; border-radius: 20px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  .footer { background-color: ${i}; padding: 30px; text-align: center; }
  .footer p { color: ${l}; font-size: 12px; margin: 4px 0; }
  .footer a { color: ${o}; text-decoration: none; }
  .social-links { margin: 12px 0; }
  .social-links a { color: ${l}; text-decoration: none; margin: 0 8px; font-size: 12px; }
  .divider { border: none; border-top: 1px solid #e0e0e0; margin: 24px 0; }
  .tip-box { background: rgba(61,212,176,0.08); border-radius: 8px; padding: 16px; margin: 16px 0; }
  .tip-box strong { color: ${a}; }
  .stat-row { display: table; width: 100%; margin: 16px 0; }
  .stat-item { display: table-cell; text-align: center; padding: 12px; }
  .stat-number { font-size: 28px; font-weight: 700; color: ${a}; }
  .stat-label { font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px; }
`,p=`
  [dir="rtl"] .highlight-box { border-left: none; border-right: 4px solid ${a}; border-radius: 8px 0 0 8px; }
  [dir="rtl"] .content ul { padding-left: 0; padding-right: 20px; }
  [dir="rtl"] .apps-box ul { padding-left: 0; padding-right: 20px; }
`;function c(e,t){return`<!DOCTYPE html>
<html dir="${e}" lang="${"rtl"===e?"ar":"en"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${d}${p}</style>
</head>
<body>
  <div class="container">
    ${t}
  </div>
</body>
</html>`}function u(){return`<div class="footer">
  <p>&copy; 2025 Tamkinly. All rights reserved.</p>
  <p><a href="${t}/privacy-policy/">Privacy Policy</a> &middot; <a href="${t}/terms/">Terms</a></p>
  <div class="social-links">
    <a href="${t}">Website</a> &middot; <a href="mailto:support@tamkinly.com">Support</a>
  </div>
</div>`}function h(e,n,r,s="basic",l="en"){let d="ar"===l,p={trial:{en:["7-Day Guided Discipline Journey","Daily identity prompts","Evidence tracking basics","Progress dashboard","7 Days System PDF (downloadable)"],ar:["رحلة انضباط موجهة لمدة 7 أيام","مطالبات الهوية اليومية","أساسيات تتبع الأدلة","لوحة تتبع التقدم","PDF نظام 7 أيام (قابل للتحميل)","PDF عرض خاص (خصم الترقية)"]},basic:{en:["Identity Gap Assessment","Values Clarification Tool","30-Day Transformation Journey","Daily Planner & Tracker"],ar:["تقييم فجوة الهوية","أداة توضيح القيم","رحلة تحول 30 يوماً","المخطط والمتابع اليومي"]},premium:{en:["Identity Gap Assessment","Values Clarification Tool","30-Day Transformation Journey","Daily Planner & Tracker","Decision Pattern Analysis","Evidence Tracking System","Progress Dashboard"],ar:["تقييم فجوة الهوية","أداة توضيح القيم","رحلة تحول 30 يوماً","المخطط والمتابع اليومي","تحليل أنماط القرارات","نظام تتبع الأدلة","لوحة التقدم"]},bundle:{en:["Identity Gap Assessment","Values Clarification Tool","30-Day Transformation Journey","Daily Planner & Tracker","Decision Pattern Analysis","Evidence Tracking System","Progress Dashboard","AI Identity Coach","Transformation Community"],ar:["تقييم فجوة الهوية","أداة توضيح القيم","رحلة تحول 30 يوماً","المخطط والمتابع اليومي","تحليل أنماط القرارات","نظام تتبع الأدلة","لوحة التقدم","مدرب الهوية بالذكاء الاصطناعي","مجتمع التحول"]}},y=p[s]||p.basic,g=(d?y.ar:y.en).map(e=>`<li>${e}</li>`).join(""),$="bundle"===s;return c("ar"===l?"rtl":"ltr",`
    <div class="header">
      <h1>${$?d?"مرحباً بك في VIP! 👑":"Welcome to VIP! 👑":d?"شكراً لشرائك! 🙏":"Thank You for Your Purchase! 🙏"}</h1>
      ${$?`<p class="subtitle"><span class="vip-badge">${d?"عضو الباقة الشاملة":"MASTERY MEMBER"}</span></p>`:""}
    </div>
    <div class="content">
      <h2>${d?`تم تأكيد طلبك: ${r}`:`Your Order is Confirmed: ${r}`}</h2>
      <p>${d?`عزيزي/عزيزتي ${e}،`:`Dear ${e},`}</p>
      <p>${d?"شكراً لاختيارك تمكنلي! منتجك جاهز ويمكنك الوصول إليه الآن.":"Thank you for choosing Tamkinly! Your product is ready and you can access it now."}</p>

      <div class="access-box">
        <h3>${d?"🔑 مفتاح الوصول الخاص بك":"🔑 Your Access Key"}</h3>
        <div class="code">${n}</div>
        <p>${d?"استخدم هذا المفتاح للوصول إلى تطبيقاتك":"Use this key to access your apps below"}</p>
      </div>

      <div class="apps-box">
        <h3>${d?"📱 التطبيقات المتاحة لك:":"📱 Apps You Can Access:"}</h3>
        <ul>${g}</ul>
      </div>
      ${"mastery"===s||"bundle"===s?`
      <div style="background: linear-gradient(135deg, #0F1C2E 0%, #1F6F78 100%); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; border: 2px solid #3DD4B0;">
        <h3 style="color: #3DD4B0; margin: 0 0 8px 0; font-size: 16px;">${d?"🎧 تواصل مباشر مع المؤسس":"🎧 Direct Access to the Founder"}</h3>
        <p style="color: #ffffff; font-size: 13px; margin: 0 0 12px 0; line-height: 1.5;">${d?"بصفتك مشترك MASTERY، لديك وصول مباشر للمراسلة مع عبدالله، مؤسس Tamkinly.":"As a MASTERY subscriber, you have direct messaging access to Abdallah, founder of Tamkinly."}</p>
        <a href="https://t.me/tribute/app?startapp=i42v" style="display: inline-block; background: #3DD4B0; color: #0F1C2E; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">${d?"📨 مراسلة مباشرة":"📨 Message Directly"}</a>
      </div>
      `:""}
      ${"trial"===s||"basic"===s?`
      <div style="background: linear-gradient(135deg, ${o} 0%, #2BC49E 100%); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <h3 style="color: ${i}; margin: 0 0 12px 0; font-size: 16px;">${d?"📥 ملفاتك القابلة للتحميل:":"📥 Your Downloadable Files:"}</h3>
        <div style="background: white; border-radius: 8px; padding: 12px; margin: 8px 0;">
          <p style="margin: 0; color: ${i}; font-weight: 600;">${d?"📘 نظام 7 أيام (PDF)":"📘 7 Days System (PDF)"}</p>
          <a href="${t}/7-Days-System.pdf" download style="display: inline-block; background: ${a}; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; margin-top: 6px;">${d?"تحميل":"Download"}</a>
        </div>

      </div>
      `:""}

      <div class="highlight-box">
        <h3>${d?"📥 التنزيلات:":"📥 Your Downloads:"}</h3>
        <p><a href="${t}/my-account/downloads/">${d?"تنزيل ملفاتك":"Download Your Files"}</a></p>
      </div>

      <p style="text-align: center;">
        <a href="${t}/apps/?code=${n}" class="button">${d?"الوصول إلى تطبيقاتك الآن":"Access Your Apps Now"}</a>
      </p>

      <p>${d?"هل لديك أسئلة؟ رد على هذا البريد أو تواصل معنا على support@tamkinly.com":"Questions? Reply to this email or contact us at support@tamkinly.com"}</p>
    </div>
    ${u()}`)}e.s(["default",0,{welcome:function(e,i="en"){let a="ar"===i;return c("ar"===i?"rtl":"ltr",`
    <div class="header">
      <h1>${a?"مرحباً بك في تمكنلي! 🎯":"Welcome to Tamkinly! 🎯"}</h1>
      <p class="subtitle">${a?"رحلة التحول تبدأ الآن":"Your transformation journey starts now"}</p>
    </div>
    <div class="content">
      <h2>${a?"شكراً لاشتراكك!":"You're In! Thank You for Subscribing"}</h2>
      <p>${a?`عزيزي/عزيزتي ${e}،`:`Dear ${e},`}</p>
      <p>${a?"مرحباً بك في مجتمع تمكنلي! لقد اتخذت الخطوة الأولى نحو تحويل هويتك وتحقيق أهدافك.":"Welcome to the Tamkinly community! You've just taken the first step toward transforming your identity and achieving your goals."}</p>
      <p>${a?"كمشترك، ستتلقى:":"As a subscriber, you'll receive:"}</p>
      <ul>
        <li>${a?"رؤى أسبوعية حول التطوير الشخصي":"Weekly insights on personal development"}</li>
        <li>${a?"نصائح واستراتيجيات حصرية":"Exclusive tips and strategies"}</li>
        <li>${a?"وصول مبكر للمنتجات والعروض الجديدة":"Early access to new products and special offers"}</li>
        <li>${a?"تقييم مجاني للهوية":"Free identity assessment tools"}</li>
      </ul>
      <p style="text-align: center;">
        <a href="${t}/shop/" class="button">${a?"استكشف منتجاتنا":"Explore Our Products"}</a>
      </p>
      <div class="tip-box">
        <strong>${a?"💡 نصيحة:":"💡 Pro Tip:"}</strong>
        ${a?"ابدأ بتقييم فجوة الهوية المجاني لمعرفة نقطة بدايتك.":"Start with the free Identity Gap Assessment to discover your starting point."}
      </div>
      <p>${a?"هل أنت مستعد لبدء رحلة التحول؟":"Ready to start your transformation journey?"}</p>
    </div>
    ${u()}`)},trialPurchase:function(e,t,i="en"){return h(e,t,"7-Day Identity System","trial",i)},plannerPurchase:function(e,t,i="en"){return h(e,t,"Identity Recode Planner","basic",i)},premiumPurchase:function(e,t,i="en"){return h(e,t,"Premium Transformation Package","premium",i)},bundlePurchase:function(e,t,i="en"){return h(e,t,"Mastery (Monthly)","bundle",i)},purchaseConfirmation:h,day3FollowUp:function(e,i="en"){let a="ar"===i;return c("ar"===i?"rtl":"ltr",`
    <div class="header">
      <h1>${a?"كيف رحلتك؟ 🌱":"How's Your Identity Journey? 🌱"}</h1>
      <p class="subtitle">${a?"ثلاثة أيام من التحول":"Three days into transformation"}</p>
    </div>
    <div class="content">
      <h2>${a?`${e}، أنت في اليوم الثالث!`:`${e}, You're on Day 3!`}</h2>
      <p>${a?"مرت ثلاثة أيام منذ بدأت رحلتك مع تمكنلي. هذا هو الوقت الذي يبدأ فيه الكثيرون يشعرون بأولى علامات التغيير.":"It's been three days since you started your Tamkinly journey. This is when many people start feeling the first signs of change."}</p>

      <div class="tip-box">
        <strong>${a?"🔑 حقيقة عن التغيير:":"🔑 Change Fact:"}</strong>
        ${a?"الأبحاث تظهر أن اليوم 3-5 هو عندما تبدأ أنماط التفكير الجديدة بالتشكل. أنت في اللحظة الحاسمة!":"Research shows days 3-5 are when new thought patterns start forming. You're at the pivotal moment!"}
      </div>

      <h3>${a?"نصائح لليوم الثالث:":"Day 3 Tips:"}</h3>
      <ul>
        <li>${a?"راجع قيمك الأساسية - هل لاحظت أي أنماط؟":"Review your core values — notice any patterns?"}</li>
        <li>${a?"سجّل لحظة واحدة شعرت فيها بالثقة اليوم":"Journal one moment you felt confident today"}</li>
        <li>${a?"أكمل تمرين فجوة الهوية إذا لم تفعل بعد":"Complete the Identity Gap exercise if you haven't yet"}</li>
      </ul>

      <p style="text-align: center;">
        <a href="${t}/apps/" class="button">${a?"استمر في الرحلة":"Continue Your Journey"}</a>
      </p>

      <p>${a?"نحن هنا لدعمك في كل خطوة. رد على هذا البريد إذا كان لديك أي سؤال!":"We're here to support you every step of the way. Reply to this email if you have any questions!"}</p>
    </div>
    ${u()}`)},day7FollowUp:function(e,i="en"){let a="ar"===i;return c("ar"===i?"rtl":"ltr",`
    <div class="header">
      <h1>${a?"أنت تبني الزخم! 🚀":"You're Building Momentum! 🚀"}</h1>
      <p class="subtitle">${a?"أسبوع كامل من التحول":"One full week of transformation"}</p>
    </div>
    <div class="content">
      <h2>${a?`${e}، أسبوع كامل!`:`${e}, One Full Week!`}</h2>
      <p>${a?"لقد أكملت أسبوعاً كاملاً في رحلة تحويل الهوية. هذا إنجاز حقيقي يستحق الاحتفال!":"You've completed a full week on your identity transformation journey. That's a real achievement worth celebrating!"}</p>

      <div class="stat-row">
        <div class="stat-item">
          <div class="stat-number">7</div>
          <div class="stat-label">${a?"أيام":"Days"}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">168</div>
          <div class="stat-label">${a?"ساعة":"Hours"}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">∞</div>
          <div class="stat-label">${a?"إمكانيات":"Possibilities"}</div>
        </div>
      </div>

      <div class="tip-box">
        <strong>${a?"🎯 نصيحة الأسبوع:":"🎯 Weekly Tip:"}</strong>
        ${a?"في نهاية الأسبوع الأول، خذ وقتاً لمراجعة تقدمك. ما الذي تغير في طريقة تفكيرك؟ ما الذي تريد التركيز عليه الأسبوع القادم؟":"At the end of week one, take time to review your progress. What has shifted in your thinking? What do you want to focus on next week?"}
      </div>

      <h3>${a?"حافظ على الزخم:":"Keep the Momentum Going:"}</h3>
      <ul>
        <li>${a?"أكمل تقييم الأسبوع الأول في التطبيق":"Complete the Week 1 assessment in the app"}</li>
        <li>${a?"حدد هدفاً واحداً للأسبوع القادم":"Set one goal for next week"}</li>
        <li>${a?"شارك رؤيتك مع مجتمع تمكنلي":"Share your insights with the Tamkinly community"}</li>
      </ul>

      <p style="text-align: center;">
        <a href="${t}/apps/" class="button">${a?"شاهد تقدمك":"View Your Progress"}</a>
      </p>
    </div>
    ${u()}`)},day14FollowUp:function(e,i="basic",a="en"){let o="ar"===a,n={trial:{en:"Basic (Monthly)",ar:"أساسي (شهري)",price:"$7/mo"},basic:{en:"Premium (Monthly)",ar:"مميز (شهري)",price:"$17/mo"},premium:{en:"Mastery (Monthly)",ar:"إتقان (شهري)",price:"$27/mo"}},r=n[i]||n.basic;return c("ar"===a?"rtl":"ltr",`
    <div class="header">
      <h1>${o?"هل أنت مستعد للمستوى التالي? ⬆️":"Ready for the Next Level? ⬆️"}</h1>
      <p class="subtitle">${o?"أسبوعان من التحول المتواصل":"Two weeks of continuous transformation"}</p>
    </div>
    <div class="content">
      <h2>${o?`${e}، لقد وصلت إلى الأسبوع الثاني!`:`${e}, You've Reached Week Two!`}</h2>
      <p>${o?"أسبوعان من العمل المتواصل على تحويل هويتك. لقد أثبتّ التزامك بالتغيير الحقيقي.":"Two weeks of dedicated work on your identity transformation. You've proven your commitment to real change."}</p>

      <div class="tip-box">
        <strong>${o?"📊 مكانك الآن:":"📊 Where You Stand:"}</strong>
        ${o?"في الأسبوع الثاني، تبدأ التغييرات بالترسخ. لكن الأدوات المتقدمة يمكن أن تسرّع تقدمك بشكل كبير.":"By week two, changes start to solidify. But advanced tools can significantly accelerate your progress."}
      </div>

      <div class="apps-box">
        <h3>${o?`✨ ارتقِ إلى ${r.ar}`:`✨ Upgrade to ${r.en}`}</h3>
        <p>${o?`احصل على أدوات تحليل أعمق وتتبع متقدم ودعم شخصي مع ${r.ar} بسعر خاص ${r.price}`:`Get deeper analysis tools, advanced tracking, and personal support with ${r.en} at a special price of ${r.price}`}</p>
        <ul>
          <li>${o?"تحليل أنماط القرارات":"Decision Pattern Analysis"}</li>
          <li>${o?"نظام تتبع الأدلة":"Evidence Tracking System"}</li>
          <li>${o?"لوحة تقدم شاملة":"Comprehensive Progress Dashboard"}</li>
        </ul>
      </div>

      <p style="text-align: center;">
        <a href="${t}/shop/" class="button">${o?`ارتقِ الآن - ${r.price}`:`Upgrade Now - ${r.price}`}</a>
      </p>

      <p>${o?"ملاحظة: هذا العرض الحصري متاح فقط لمشتركي تمكنلي النشطين.":"Note: This exclusive offer is only available to active Tamkinly subscribers."}</p>
    </div>
    ${u()}`)},abandonedCart1h:function(e,i="",a="en"){let o="ar"===a;return c("ar"===a?"rtl":"ltr",`
    <div class="header">
      <h1>${o?"منتظرك! 🛒":"You're Almost There! 🛒"}</h1>
      <p class="subtitle">${o?"رحلتك على بعد خطوة واحدة":"Your journey is one step away"}</p>
    </div>
    <div class="content">
      <h2>${o?`${e}، توقفنا عنك!`:`${e}, We Noticed You Left Something Behind`}</h2>
      <p>${o?"بدأت عملية الشراء لكنك لم تكملها. نحن نفهم - الحياة مشغولة! لكن رحلة التحول لا يجب أن تنتظر.":"You started the checkout but didn't complete it. We get it — life gets busy! But your transformation journey shouldn't have to wait."}</p>

      ${i?`
      <div class="highlight-box">
        <h3>${o?"📦 في سلتك:":"📦 In Your Cart:"}</h3>
        <p>${i}</p>
      </div>
      `:""}

      <div class="tip-box">
        <strong>${o?"⏰ تذكير:":"⏰ Reminder:"}</strong>
        ${o?"كل يوم تؤجله هو يوم آخر تعيش فيه بنمط الهوية القديم. ابدأ التغيير اليوم!":"Every day you delay is another day living with your old identity pattern. Start the change today!"}
      </div>

      <p style="text-align: center;">
        <a href="${t}/checkout/" class="button">${o?"أكمل الشراء الآن":"Complete Your Purchase"}</a>
      </p>

      <p>${o?"هل لديك سؤال يمنعك من المتابعة؟ نحن هنا للمساعدة - رد على هذا البريد!":"Have a question holding you back? We're here to help — just reply to this email!"}</p>
    </div>
    ${u()}`)},abandonedCart24h:function(e,i="",a="en"){let o="ar"===a;return c("ar"===a?"rtl":"ltr",`
    <div class="header">
      <h1>${o?"لا تؤجل تحولك 💫":"Don't Put Your Transformation on Hold 💫"}</h1>
      <p class="subtitle">${o?"عرض خاص بانتظارك":"A special offer awaits you"}</p>
    </div>
    <div class="content">
      <h2>${o?`${e}، ما زال بإمكانك البدء!`:`${e}, It's Not Too Late to Start!`}</h2>
      <p>${o?"مرت 24 ساعة منذ زرت متجرنا. نريد أن نتأكد من أنك لا تفوت الفرصة لبدء رحلة التحول.":"It's been 24 hours since you visited our shop. We want to make sure you don't miss the opportunity to start your transformation."}</p>

      ${i?`
      <div class="highlight-box">
        <h3>${o?"📦 ما زال في سلتك:":"📦 Still in Your Cart:"}</h3>
        <p>${i}</p>
      </div>
      `:""}

      <div class="apps-box">
        <h3>${o?"🎁 عرض خاص لك":"🎁 Special Offer Just for You"}</h3>
        <p>${o?'أكمل الشراء خلال 48 ساعة واحصل على دليل إضافي مجاني: "5 أنماط تفكير تدمر هويتك - وكيف تكسرها"':'Complete your purchase within 48 hours and get a free bonus guide: "5 Thinking Patterns That Destroy Your Identity — And How to Break Them"'}</p>
      </div>

      <p style="text-align: center;">
        <a href="${t}/checkout/" class="button">${o?"أكمل الشراء واحصل على المكافأة":"Complete Purchase & Claim Bonus"}</a>
      </p>

      <p>${o?"هل تحتاج مساعدة في اختيار المنتج المناسب؟ تواصل معنا على support@tamkinly.com":"Need help choosing the right product? Reach out at support@tamkinly.com"}</p>
    </div>
    ${u()}`)},quizResults:function(e,i,o,n=[],r="en"){let s="ar"===r,d={identity_gap:{en:"Identity Gap Assessment",ar:"تقييم فجوة الهوية"},values_alignment:{en:"Values Alignment",ar:"توافق القيم"},self_authorship:{en:"Self-Authorship Scale",ar:"مقياس تأليف الذات"},locus_of_control:{en:"Locus of Control",ar:"مركز التحكم"},erq:{en:"Emotion Regulation Questionnaire",ar:"استبيان تنظيم المشاعر"},environmental_audit:{en:"Environmental Audit",ar:"تدقيق البيئة المحيطة"}}[i]||{en:i,ar:i},p=o>=70?a:o>=40?"#E6A817":"#D64545",h=n.length>0?n.map(e=>`<li>${e}</li>`).join(""):`<li>${s?"استمر في استخدام أدوات تمكنلي لتطوير نقاط قوتك":"Keep using Tamkinly tools to develop your strengths"}</li>`;return c("ar"===r?"rtl":"ltr",`
    <div class="header">
      <h1>${s?"نتائج تقييمك جاهزة! 📊":"Your Assessment Results Are In! 📊"}</h1>
      <p class="subtitle">${s?d.ar:d.en}</p>
    </div>
    <div class="content">
      <h2>${s?`${e}، إليك نتائجك`:`${e}, Here Are Your Results`}</h2>
      <p>${s?`أكملت ${d.ar}! إليك نظرة شاملة على مكانك في رحلة تحويل الهوية.`:`You completed the ${d.en}! Here's a comprehensive look at where you stand in your identity transformation journey.`}</p>

      <div class="access-box">
        <h3>${s?"درجتك":"Your Score"}</h3>
        <div class="code" style="color: ${p};">${o}<span style="font-size: 16px; color: ${l};">/100</span></div>
        <p style="color: ${p};">${o>=70?s?"ممتاز":"Excellent":o>=40?s?"جيد - مجال للنمو":"Good — Room for Growth":s?"يحتاج تحسين":"Needs Improvement"}</p>
      </div>

      <h3>${s?"🔍 رؤى مخصصة لك:":"🔍 Personalized Insights:"}</h3>
      <ul>${h}</ul>

      <div class="tip-box">
        <strong>${s?"💡 الخطوة التالية:":"💡 Next Step:"}</strong>
        ${s?"استخدم أدواتنا التفاعلية لتحسين نقاطك الضعيفة وبناء نقاط قوتك.":"Use our interactive tools to improve your weak areas and build on your strengths."}
      </div>

      <p style="text-align: center;">
        <a href="${t}/apps/" class="button">${s?"ابدأ العمل على نتائجك":"Start Working on Your Results"}</a>
      </p>

      <p>${s?"هل تريد نتائج أكثر تفصيلاً؟ ارتقِ للحصول على تحليل متعمق وتوصيات مخصصة.":"Want more detailed results? Upgrade for in-depth analysis and personalized recommendations."}</p>
      <p style="text-align: center;">
        <a href="${t}/shop/" class="button button-dark">${s?"شاهد خيارات الارتقاء":"See Upgrade Options"}</a>
      </p>
    </div>
    ${u()}`)},identityMilestone:function(e,i,a="en"){let o="ar"===a,n={7:{titleEn:"Week 1 Complete! 🌟",titleAr:"الأسبوع الأول مكتمل! 🌟",subtitleEn:"You've built your foundation",subtitleAr:"لقد بنيت أساسك",messageEn:"You've completed the first phase of awareness. Your identity baseline is set and you're ready for active recoding.",messageAr:"أكملت المرحلة الأولى من الوعي. خط أساس هويتك محدد وأنت مستعد لإعادة البرمجة الفعالة.",tipEn:"Focus on one identity shift this week — consistency beats intensity.",tipAr:"ركز على تحول واحد في الهوية هذا الأسبوع — الاتساق يتفوق على الكثافة."},14:{titleEn:"Two Weeks Strong! 💪",titleAr:"أسبوعان بقوة! 💪",subtitleEn:"You're in the active recoding phase",subtitleAr:"أنت في مرحلة إعادة البرمجة الفعالة",messageEn:"Halfway through the core transformation! Your neural pathways are rewiring and new identity patterns are taking hold.",messageAr:"في منتصف التحول الأساسي! مساراتك العصبية يعاد توصيلها وأنماط هوية جديدة تترسخ.",tipEn:"Notice moments when your new identity naturally emerges — that's real change.",tipAr:"لاحظ اللحظات التي تظهر فيها هويتك الجديدة بشكل طبيعي — هذا هو التغيير الحقيقي."},21:{titleEn:"Three Weeks In! 🔥",titleAr:"ثلاثة أسابيع! 🔥",subtitleEn:"The turning point",subtitleAr:"نقطة التحول",messageEn:"Day 21 is the legendary turning point. Research shows this is when new habits start feeling automatic. Your new identity is becoming who you are.",messageAr:"اليوم 21 هو نقطة التحول الأسطورية. الأبحاث تظهر أن هذا هو الوقت الذي تبدأ العادات الجديدة بالشعور بالتلقائية. هويتك الجديدة تصبح أنت.",tipEn:"Write down three ways your thinking has changed since Day 1.",tipAr:"اكتب ثلاث طرق تغيرت فيها طريقة تفكيرك منذ اليوم الأول."},30:{titleEn:"30 Days! You Did It! 🏆",titleAr:"30 يوماً! لقد فعلتها! 🏆",subtitleEn:"Transformation complete",subtitleAr:"التحول مكتمل",messageEn:"Congratulations! You've completed the full 30-day identity transformation journey. Your new identity patterns are now integrated into who you are.",messageAr:"تهانينا! أكملت رحلة تحويل الهوية الكاملة لمدة 30 يوماً. أنماط هويتك الجديدة أصبحت الآن جزءاً منك.",tipEn:"Take the Identity Gap Assessment again to measure your transformation. Share your results!",tipAr:"أعد تقييم فجوة الهوية لقياس تحولك. شارك نتائجك!"}}[i];return c("ar"===a?"rtl":"ltr",`
    <div class="header">
      <h1>${o?n.titleAr:n.titleEn}</h1>
      <p class="subtitle">${o?n.subtitleAr:n.subtitleEn}</p>
    </div>
    <div class="content">
      <h2>${o?`${e}، اليوم ${i}!`:`${e}, Day ${i}!`}</h2>
      <p>${o?n.messageAr:n.messageEn}</p>

      <div class="stat-row">
        <div class="stat-item">
          <div class="stat-number">${i}</div>
          <div class="stat-label">${o?"أيام":"Days"}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${i>=14?"✓":"→"}</div>
          <div class="stat-label">${o?i>=14?"تقدم رائع":"استمر":i>=14?"On Track":"Keep Going"}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${Math.round(i/30*100)}%</div>
          <div class="stat-label">${o?"مكتمل":"Complete"}</div>
        </div>
      </div>

      <div class="tip-box">
        <strong>${o?"💡 نصيحة اليوم:":"💡 Day Tip:"}</strong>
        ${o?n.tipAr:n.tipEn}
      </div>

      ${30===i?`
      <div class="apps-box">
        <h3>${o?"🏆 ما التالي؟":"🏆 What's Next?"}</h3>
        <ul>
          <li>${o?"أعد التقييم لقياس تحولك":"Re-take assessments to measure your transformation"}</li>
          <li>${o?"شارك قصتك مع مجتمع تمكنلي":"Share your story with the Tamkinly community"}</li>
          <li>${o?"ارتقِ للحصول على أدوات متقدمة مستمرة":"Upgrade for continued advanced tools"}</li>
        </ul>
      </div>
      `:""}

      <p style="text-align: center;">
        <a href="${t}/apps/" class="button">${o?"شاهد تقدمك":"View Your Progress"}</a>
      </p>
    </div>
    ${u()}`)},reEngagement:function(e,i=7,o="en"){let n="ar"===o;return c("ar"===o?"rtl":"ltr",`
    <div class="header">
      <h1>${n?"نفتقدك! 💙":"We Miss You! 💙"}</h1>
      <p class="subtitle">${n?"رحلتك لا تزال مهمة":"Your journey still matters"}</p>
    </div>
    <div class="content">
      <h2>${n?`${e}، أين أنت؟`:`${e}, Where Have You Been?`}</h2>
      <p>${n?`لم نقم بزيارتك منذ ${i} يوماً. نحن نفهم أن الحياة قد تكون مشغولة، لكن رحلة تحويل الهوية تستحق المتابعة.`:`We haven't seen you in ${i} days. We understand life gets busy, but your identity transformation journey is worth continuing.`}</p>

      <div class="tip-box">
        <strong>${n?"🔄 حقيقة مهمة:":"🔄 Important Fact:"}</strong>
        ${n?"حتى التوقف القصير لا يمحو تقدمك. أنماطك الجديدة لا تزال محفوظة - تحتاج فقط لإعادة تفعيلها.":"Even a short break doesn't erase your progress. Your new patterns are still stored — you just need to reactivate them."}
      </div>

      <h3>${n?"3 خطوات سهلة للعودة:":"3 Easy Steps to Get Back:"}</h3>
      <ul>
        <li>${n?"سجّل مشاعرك اليوم في دفتر اليوميات":"Journal your feelings today"}</li>
        <li>${n?"أكمل تمريناً واحداً من أي تطبيق":"Complete one exercise from any app"}</li>
        <li>${n?"حدد نية واحدة للأسبوع القادم":"Set one intention for next week"}</li>
      </ul>

      <p style="text-align: center;">
        <a href="${t}/apps/" class="button">${n?"عد إلى رحلتك":"Return to Your Journey"}</a>
      </p>

      <p>${n?'لا تريد تلقي هذه التذكيرات؟ يمكنك <a href="${BASE_URL}/unsubscribe/" style="color: '+a+';">إلغاء الاشتراك</a> في أي وقت.':'Don\'t want these reminders? You can <a href="${BASE_URL}/unsubscribe/" style="color: '+a+';">unsubscribe</a> at any time.'}</p>
    </div>
    ${u()}`)}}])}];

//# sourceMappingURL=src_lib_email-templates_ts_1292fdw._.js.map