'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Zap, Target, TrendingUp, Brain, RefreshCw, Heart, Dumbbell, Scale, Lock } from "lucide-react";
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';
import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function SelfDisciplineScienceArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <>
      <BlogArticleJsonLd
        headline="Self Discipline Tips That Actually Work: The Science of Identity Recode"
        description="Self discipline is not punishment or willpower — it is the highest form of self-love expressed through identity. Learn the science-backed approach to discipline that makes it automatic, not forced."
        slug="self-discipline-science"
        datePublished="2026-03-28"
        dateModified="2026-03-28"
        author="Abdallah Chouaf"
        keywords={["self discipline tips", "self discipline", "discipline science", "identity recode", "how to be disciplined", "discipline framework", "lasting discipline"]}
      />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Commitment", "الالتزام")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Self Discipline Tips That Actually Work: The Science of Identity Recode", "نصائح الانضباط الذاتي التي تعمل فعلاً: علم إعادة صياغة الهوية")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("10 min read", "١٠ دقائق قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Abdallah Chouaf", "عبدالله الشواف")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "Type 'self discipline tips' into any search engine and you will get the same recycled list: wake up early, set goals, remove distractions, use the Pomodoro Technique, hold yourself accountable. These tips are not wrong — they are simply incomplete. They address the mechanics of discipline without touching the engine that drives it. The result is a discipline that lasts exactly as long as your willpower holds out, which research shows is about as reliable as a phone battery at 2 PM. But there is a different approach — one rooted not in forcing behavior but in recoding identity. And it changes everything.",
                "اكتب 'نصائح الانضباط الذاتي' في أي محرك بحث وستحصل على نفس القائمة المعاد تدويرها: استيقظ مبكراً، ضع أهدافاً، أزل المشتتات، استخدم تقنية بومودورو، حاسب نفسك. هذه النصائح ليست خاطئة — إنها ببساطة غير مكتملة. إنها تعالج ميكانيكا الانضباط دون لمس المحرك الذي يحركه. النتيجة هي انضباط يدوم بالضبط ما تدوم إرادتك، والأبحاث تُظهر أنها موثوقة تقريباً كبطارية هاتف في الساعة 2 مساءً. لكن هناك نهجاً مختلفاً — متجذراً ليس في فرض السلوك بل في إعادة صياغة الهوية. وهو يغير كل شيء."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Myth of Willpower-Based Discipline", "خرافة الانضباط المبني على الإرادة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The conventional model of self-discipline treats it as a battle between your rational self (who wants to work, exercise, eat well) and your impulsive self (who wants to scroll, sleep, eat cake). In this model, discipline is the weapon the rational self uses to overpower the impulsive self. The stronger your discipline — meaning the more willpower you can deploy — the more battles you win. This model is intuitive, widely accepted, and almost entirely wrong.",
                "النموذج التقليدي للانضباط الذاتي يعامله كمعركة بين ذاتك العقلانية (التي تريد العمل، التمرن، الأكل الجيد) وذاتك الاندفاعية (التي تريد التصفح، النوم، أكل الكعك). في هذا النموذج، الانضباط هو السلاح الذي تستخدمه الذات العقلانية للتغلب على الذات الاندفاعية. كلما كان انضباطك أقوى — أي كلما استطعت نشر إرادة أكثر — ربحت معارك أكثر. هذا النموذج بديهي، مقبول على نطاق واسع، وشبه خاطئ بالكامل."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The ego depletion model, popularized by Baumeister's research, suggested that willpower is a depletable resource — use it on one task and less is available for the next. While recent meta-analyses have questioned the strength of this effect, the core insight remains valid: relying on conscious self-control is inherently unstable. Some days you have more, some days less. Stress, sleep, nutrition, social conflict, decision fatigue — all of these variables affect your available willpower on any given day. A discipline system that depends on a variable resource is not a system. It is a gamble.",
                "نموذج استنزاف الأنا، الذي شاعته أبحاث باومايستر، اقترح أن الإرادة مورد قابل للاستنزاف — استخدمها في مهمة واحدة وأقل متاح للتالية. بينما شككت التحليلات التلوية الحديثة في قوة هذا التأثير، الرؤية الأساسية لا تزال صالحة: الاعتماد على ضبط النفس الواعي غير مستقر بطبيعته. بعض الأيام لديك أكثر، بعضها أقل. التوتر، النوم، التغذية، الصراع الاجتماعي، إرهاق القرارات — كل هذه المتغيرات تؤثر على إرادتك المتاحة في أي يوم. نظام انضباط يعتمد على مورد متغير ليس نظاماً. إنه مقامرة."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "The problem with willpower-based discipline is not that it fails — it is that it succeeds just often enough to convince you it works, and fails just often enough to make you blame yourself instead of the system.",
                  "مشكلة الانضباط المبني على الإرادة ليست أنه يفشل — إنه أنه ينجح بالقدر الكافي لإقناعك بأنه يعمل، ويفشل بالقدر الكافي لجعلك تلوم نفسك بدلاً من النظام."
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Discipline as Identity: The Paradigm Shift", "الانضباط كهوية: التحول النمطي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Identity-based discipline operates on a fundamentally different principle. Instead of asking 'How can I force myself to do what I should?' it asks 'Who am I, and what would that person naturally do?' The difference is not philosophical — it is neurological. When discipline is an expression of identity rather than an act of willpower, it draws from a different energy source entirely. Identity operates in the background, guiding behavior without conscious effort, like an operating system running applications automatically. Willpower is the manual override — necessary sometimes, but never sustainable as the primary system.",
                "الانضباط المبني على الهوية يعمل على مبدأ مختلف جذرياً. بدلاً من السؤال 'كيف أجبر نفسي على فعل ما يجب؟' يسأل 'من أنا، وماذا سيفعل ذلك الشخص طبيعياً؟' الفرق ليس فلسفياً — إنه عصبي. عندما يكون الانضباط تعبيراً عن الهوية بدلاً من فعل إرادة، فإنه يسحب من مصدر طاقة مختلف بالكامل. الهوية تعمل في الخلفية، توجه السلوك بدون جهد واعٍ، مثل نظام تشغيل يشغل التطبيقات تلقائياً. الإرادة هي التجاوز اليدوي — ضرورية أحياناً، لكنها ليست مستدامة أبداً كنظام أساسي."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Consider two people facing the same task: writing a report due next week. The first person relies on willpower. They set reminders, create accountability, use blocking apps, and force themselves to sit down and write. It works — mostly. But it costs enormous mental energy, and some days the willpower simply is not there. The second person has an identity as a writer. They do not need to force themselves to write — they write because that is what writers do. The discipline is already baked into the identity. The report gets written not through force, but through the natural expression of who this person believes themselves to be.",
                "اعتبر شخصين يواجهان نفس المهمة: كتابة تقرير مستحق الأسبوع القادم. الشخص الأول يعتمد على الإرادة. يضع تذكيرات، يخلق مساءلة، يستخدم تطبيقات حجب، ويجبر نفسه على الجلوس والكتابة. إنها تعمل — في الغالب. لكنها تكلف طاقة عقلية هائلة، وبعض الأيام الإرادة ليست هناك ببساطة. الشخص الثاني لديه هوية ككاتب. لا يحتاج لإجبار نفسه على الكتابة — إنه يكتب لأن هذا ما يفعله الكتاب. الانضباط مُدمج بالفعل في الهوية. التقرير يُكتب ليس بالقوة، بل بالتعبير الطبيعي عمن يعتقد هذا الشخص أنه عليه."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Six Pillars of Identity-Based Discipline", "الأعمدة الستة للانضباط المبني على الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Identity-based discipline rests on six interconnected pillars. Each pillar strengthens the others, creating a self-reinforcing system that makes discipline not just possible but automatic.",
                "الانضباط المبني على الهوية يستند على ستة أعمدة مترابطة. كل عمود يقوي الآخرين، مما يخلق نظاماً ذاتي التعزيز يجعل الانضباط ليس فقط ممكناً بل تلقائياً."
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("1. Self-Love, Not Self-Punishment", "١. حب الذات، لا عقابها")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Traditional discipline says: force yourself. Identity discipline says: honor yourself. You do not force yourself to eat well because you hate your body — you eat well because you love it. The energy is fundamentally different.", "الانضباط التقليدي يقول: أجبر نفسك. انضباط الهوية يقول: أكرم نفسك. أنت لا تجبر نفسك على الأكل الجيد لأنك تكره جسدك — أنت تأكل جيداً لأنك تحبه. الطاقة مختلفة جذرياً.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Target className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("2. Identity Before Behavior", "٢. الهوية قبل السلوك")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Do not start with what you want to do — start with who you want to be. The behavior will follow the identity naturally, the way a runner naturally runs and a writer naturally writes.", "لا تبدأ بما تريد أن تفعل — ابدأ بمن تريد أن تكون. السلوك سيتبع الهوية طبيعياً، كما يركض العداء طبيعياً ويكتب الكاتب طبيعياً.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Scale className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("3. Small Consistent Wins Over Grand Gestures", "٣. الانتصارات الصغيرة المستمرة على الإيماءات الكبرى")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Ten minutes every day beats two hours once a week. Not because the total time is more, but because daily repetition rewires the brain while sporadic effort merely visits it.", "عشر دقائق كل يوم تتفوق على ساعتين مرة في الأسبوع. ليس لأن الوقت الإجمالي أكثر، بل لأن التكرار اليومي يعيد تشكيل الدماغ بينما الجهد المتقطع يزوره فقط.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("4. Environment Design Over Willpower", "٤. تصميم البيئة على الإرادة")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("The most disciplined people do not have the most willpower — they have the best-designed environments. Make the right choice the easiest choice, and discipline becomes automatic.", "الأشخاص الأكثر انضباطاً ليس لديهم أكثر إرادة — لديهم أفضل البيئات المصممة. اجعل الخيار الصحيح أسهل خيار، والانضباط يصبح تلقائياً.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Dumbbell className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("5. Progressive Identity Loading", "٥. التحميل التدريجي للهوية")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Like progressive overload in strength training, identity discipline starts light and increases gradually. You do not start with a four-hour deep work session — you start with twenty minutes and let the identity expand naturally.", "مثل التحميل التدريجي في تدريب القوة، انضباط الهوية يبدأ خفيفاً ويزداد تدريجياً. أنت لا تبدأ بجلسة عمل عميق لأربع ساعات — تبدأ بعشرين دقيقة وتدع الهوية تتوسع طبيعياً.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("6. Evidence-Based Self-Concept", "٦. المفهوم الذاتي المبني على الأدلة")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Your brain does not believe affirmations — it believes evidence. Track every act of discipline. Make the evidence undeniable. When the brain sees proof, it updates the identity automatically.", "دماغك لا يصدق التأكيدات — إنه يصدق الأدلة. تتبع كل فعل انضباط. اجعل الأدلة لا يمكن إنكارها. عندما يرى الدماغ الدليل، يحدّث الهوية تلقائياً.")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Neuroscience: Why Identity Discipline Is More Efficient", "علم الأعصاب: لماذا انضباط الهوية أكثر كفاءة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you exercise willpower, you activate the prefrontal cortex — the brain region responsible for conscious decision-making and impulse control. This is an energy-expensive process. The prefrontal cortex consumes disproportionate glucose relative to its size, and its capacity is limited. Every decision, every resistance, every forced choice drains this resource.",
                "عندما تمارس الإرادة، تنشط قشرة الفص الجبهي — منطقة الدماغ المسؤولة عن اتخاذ القرارات الواعية وضبط الاندفاع. هذه عملية مكلفة للطاقة. قشرة الفص الجبهي تستهلك جلوكوزاً غير متناسب مقارنة بحجمها، وقدرتها محدودة. كل قرار، كل مقاومة، كل اختيار قسري يستنزف هذا المورد."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you operate from identity, a different neural pathway is activated. The basal ganglia — the brain's automation center — takes over behaviors that have been consistently repeated and linked to self-concept. These behaviors require minimal prefrontal cortex involvement. They run like background processes on a computer, consuming far less energy than foreground applications. This is why the disciplined person seems to exert less effort than the struggling one — they are literally using less neural energy. Their discipline has been transferred from the expensive prefrontal cortex to the efficient basal ganglia. The behavior has become identity, and identity runs on autopilot.",
                "عندما تعمل من الهوية، يُنشط مسار عصبي مختلف. العقد القاعدية — مركز الأتمتة في الدماغ — تتولى السلوكيات التي تكررت باستمرار وربطت بمفهوم الذات. هذه السلوكيات تتطلب تدخلاً ضئيلاً من قشرة الفص الجبهي. إنها تعمل كعمليات خلفية على كمبيوتر، تستهلك طاقة أقل بكثير من التطبيقات الأمامية. لهذا يبدو الشخص المنضبط أنه يبذل جهداً أقل من الشخص الكافح — هو حرفياً يستخدم طاقة عصبية أقل. انضباطه نُقل من قشرة الفص الجبهي المكلفة إلى العقد القاعدية الفعالة. السلوك أصبح هوية، والهوية تعمل على الطيار الآلي."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Practical Self-Discipline Tips: The Identity Recode Method", "نصائح عملية للانضباط الذاتي: طريقة إعادة صياغة الهوية")}
            </h2>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">
                {getText("The 30-Day Identity Discipline Protocol", "بروتوكول انضباط الهوية لـ 30 يوماً")}
              </h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("Week 1: Define your disciplined identity. Write it down. 'I am someone who follows through on commitments to myself.' Say it aloud each morning. This is not an affirmation — it is an identity declaration that primes your neural circuits.", "الأسبوع ١: حدد هويتك المنضبطة. اكتبها. 'أنا شخص يتابع الالتزامات تجاه نفسه.' قلها بصوت عالٍ كل صباح. هذا ليس تأكيداً — إنه إعلان هوية يهيئ دوائرك العصبية.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("Week 2: Cast one identity vote per day. Choose one small action that the disciplined version of you would take. Not a grand gesture — a tiny, undeniable vote. Five minutes of focused work. One healthy meal. One early wake-up. Record each vote.", "الأسبوع ٢: صوّت صوت هوية واحد يومياً. اختر فعلاً صغيراً واحداً سيتخذه الإصدار المنضبط منك. ليس إيماءة كبيرة — صوت ضئيل لا يمكن إنكاره. خمس دقائق عمل مركز. وجبة صحية واحدة. استيقاظ مبكر واحد. سجل كل صوت.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("Week 3: Increase to two votes per day. Add a second disciplined action. Notice that the second vote feels slightly easier than the first — the identity is already starting to influence behavior. The brain is updating its self-model based on the evidence from week two.", "الأسبوع ٣: زد إلى صوتين يومياً. أضف فعلاً منضبطاً ثانياً. لاحظ أن الصوت الثاني يبدو أسهل قليلاً من الأول — الهوية بدأت بالفعل في التأثير على السلوك. الدماغ يحدّث نموذجه الذاتي بناءً على أدلة الأسبوع الثاني.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("Week 4: Let the identity take over. By now, you should notice that some disciplined behaviors feel natural rather than forced. This is the identity running on autopilot. Expand your practice, but let the growth be organic — driven by who you are becoming, not by what you think you should do.", "الأسبوع ٤: دع الهوية تتولى. الآن، يجب أن تلاحظ أن بعض السلوكيات المنضبطة تبدو طبيعية بدلاً من مفروضة. هذا هوية تعمل على الطيار الآلي. وسّع ممارستك، لكن دع النمو يكون عضوياً — مدفوعاً بمن تصبح، لا بما تعتقد أنه يجب عليك فعله.")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Discipline-Effort Curve", "منحنى الانضباط-الجهد")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "There is a critical insight about discipline that most people miss: the amount of effort required decreases over time if you are building identity, but stays constant or increases if you are relying on willpower. With willpower-based discipline, every day is a new battle. The resistance never diminishes because the identity never changes. The procrastinator who forces themselves to work today faces the same internal resistance tomorrow. With identity-based discipline, the effort curve slopes downward. Each day of aligned behavior makes the next day slightly easier, because each day strengthens the identity that makes the behavior automatic. Eventually, the effort approaches zero — not because the task became easier, but because the identity became stronger.",
                "هناك رؤية حاسمة حول الانضباط يفوتها معظم الناس: كمية الجهد المطلوبة تتناقص بمرور الوقت إذا كنت تبني الهوية، لكنها تبقى ثابتة أو تزداد إذا كنت تعتمد على الإرادة. مع الانضباط المبني على الإرادة، كل يوم معركة جديدة. المقاومة لا تتراجع أبداً لأن الهوية لا تتغير. المُماطل الذي يجبر نفسه على العمل اليوم يواجه نفس المقاومة الداخلية غداً. مع الانضباط المبني على الهوية، منحنى الجهد ينحدر نحو الأسفل. كل يوم من السلوك المتوافق يجعل اليوم التالي أسهل قليلاً، لأن كل يوم يقوي الهوية التي تجعل السلوك تلقائياً. في النهاية، يقترب الجهد من الصفر — ليس لأن المهمة أصبحت أسهل، بل لأن الهوية أصبحت أقوى."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is the path from effort to automaticity that we call the Identity Recode. It is not about being perfectly disciplined from day one — it is about progressively transferring behaviors from the willpower-intensive prefrontal cortex to the effortless basal ganglia. Each small win, each recorded vote, each aligned action is a step along this path. And the beautiful paradox is this: the less you rely on discipline as force, the more disciplined you become. Because discipline that flows from identity does not feel like discipline at all. It feels like being yourself.",
                "هذا هو الطريق من الجهد إلى التلقائية الذي نسميه إعادة صياغة الهوية. الأمر ليس حول أن تكون منضبطاً بشكل مثالي من اليوم الأول — إنه حول النقل التدريجي للسلوكيات من قشرة الفص الجبهي المكثفة للإرادة إلى العقد القاعدية بدون الجهد. كل انتصار صغير، كل صوت مسجل، كل فعل متوافق هو خطوة على هذا الطريق. والمفارقة الجميلة هي: كلما اعتمدت أقل على الانضباط كقوة، أصبحت أكثر انضباطاً. لأن الانضباط الذي يتدفق من الهوية لا يبدو كانضباط على الإطلاق. إنه يبدو كأنك تكون نفسك."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">{getText("The Bottom Line", "الخلاصة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Self discipline is not a trait you are born with or without. It is not a muscle you simply need to exercise harder. It is an identity you build — one vote at a time, one small win at a time, one piece of evidence at a time. When discipline becomes an expression of who you are rather than a weapon you use against yourself, everything changes. The effort decreases. The consistency increases. The results compound. And one day you wake up and realize that the things that once required enormous willpower are now just things you do — not because you have to, but because that is who you are. That is the power of identity recode. That is discipline as self-love. That is the science of lasting change.",
                "الانضباط الذاتي ليس سمة تولد بها أو بدونها. ليس عضلة تحتاج ببساطة لتمرينها بقوة أكبر. إنها هوية تبنيها — صوتاً تلو الآخر، انتصاراً صغيراً تلو الآخر، قطعة أدلة تلو الأخرى. عندما يصبح الانضباط تعبيراً عن من أنت بدلاً من سلاح تستخدمه ضد نفسك، يتغير كل شيء. الجهد يقل. الاتساق يزيد. النتائج تتضاعف. ويوماً ما تستيقظ وتدرك أن الأشياء التي كانت تتطلب إرادة هائلة أصبحت الآن أشياء تفعله ببساطة — ليس لأنك مضطر، بل لأن هذا من أنت. تلك هي قوة إعادة صياغة الهوية. ذلك هو الانضباط كحب للذات. ذلك هو علم التغيير الدائم."
              )}
            </p>

          </div>
        </div>
      </section>

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="self-discipline-science" />

      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {getText("Build Discipline Through Identity, Not Willpower", "ابنِ الانضباط من خلال الهوية، لا الإرادة")}
            </h2>
            <p className="text-slate-300 mb-6">
              {getText("The Identity Baseline and Recode System help you track the evidence that transforms discipline from forced effort into automatic identity.", "خط الأساس للهوية ونظام إعادة الصياغة يساعدانك على تتبع الأدلة التي تحول الانضباط من جهد مفروض إلى هوية تلقائية.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps/identity-baseline">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Take the Identity Baseline", "خذ خط أساس الهوية")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blog/redefining-discipline">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  {getText("Read: Redefining Discipline", "اقرأ: إعادة تعريف الانضباط")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
            <BlogConversionSection />
      </article>
    </>
  );
}
