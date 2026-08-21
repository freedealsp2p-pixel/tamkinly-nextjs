'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Heart, Sun, Unlock, Shield } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function FiveStepsToMiraclesArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "all-in-or-nothing", title: getText("All In or Nothing", "كل شيء أو لا شيء"), readTime: getText("7 min read", "٧ دقائق قراءة") },
    { slug: "work-on-yourself", title: getText("Work on Yourself: Psycho-Cybernetics", "اعمل على نفسك: سايبرانيكس النفسية"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "becoming-exceptional", title: getText("Becoming Exceptional", "أن تصبح استثنائياً"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Self-Liberation", "التحرر الذاتي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Five Steps to Miracles: A Framework for Identity Liberation", "خمس خطوات نحو المعجزات: إطار لتحرير الهوية")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("10 min read", "١٠ دقائق قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Tamkinly Team", "فريق تمكنلي")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "Miracles aren't supernatural events reserved for the chosen few. They're the natural result of liberating yourself from the identity you've been performing for others.",
                "المعجزات ليست أحداثاً خارقة للطبيعة مخصصة لقلة محظوظة. إنها النتيجة الطبيعية لتحرير نفسك من الهوية التي كنت تمثلها للآخرين."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Transformation begins with surrender—not surrender to defeat, but surrender of the roles, masks, and limitations you've been carrying. Here are five steps to immediate transformation.",
                "التحول يبدأ بالاستسلام — ليس استسلاماً للهزيمة، بل استسلاماً للأدوال والأقنعة والقيود التي كنت تحملها. إليك خمس خطوات للتحول الفوري."
              )}
            </p>

            <div className="space-y-8 my-10">
              {/* Step 1 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-lg">1</span>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Surrender", "الاستسلام")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        {getText("Release the Version Seeking Approval", "أطلق سراح النسخة التي تبحث عن الموافقة")}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {getText(
                          "Surrender to the part of you that was seeking people's approval. Instead, declare:",
                          "استسلم للجزء منك الذي كان يبحث عن موافقة الناس. بدلاً من ذلك، أعلن:"
                        )} <em>{getText("\"I only want the approval of my Creator.\"", "\"أريد فقط موافقة خالقي.")}</em>
                      </p>
                      <p className="text-slate-600">
                        {getText(
                          "This isn't about abandoning relationships or becoming self-centered. It's about recognizing that when you perform for approval, you're not being yourself—you're being what you think others want.",
                          "الأمر ليس عن التخلي عن العلاقات أو الأنانية. بل عن إدراك أنه عندما تمثل من أجل الموافقة، لست على طبيعتك — بل أنت ما يظنه الآخرون يريدونه."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary font-bold text-lg">2</span>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Own Your Light", "امتلك نورك")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        {getText("Stop Dimming Yourself for Others' Comfort", "توقف عن إخماد نفسك لراحة الآخرين")}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {getText(
                          "Surrender to the part of you that constantly dims your light so others don't feel insecure around you. Declare:",
                          "استسلم للجزء منك الذي يخفت نورك باستمرار حتى لا يشعر الآخرون بعدم الأمان حولك. أعلن:"
                        )} <em>{getText("\"My power is endless, and I will be honest with myself, even if it makes others uncomfortable.\"", "\"قوتي لا حدود لها، وسأكون صادقاً مع نفسي، حتى لو أزعج ذلك الآخرين.")}</em>
                      </p>
                      <p className="text-slate-600">
                        {getText(
                          "Your light doesn't diminish anyone else's. Dimming yours serves no one. Shine fully and let others adjust—or not.",
                          "نورك لا يقلل من نور الآخرين. إخفاء نورك لا يخدم أحداً. تألق بالكامل واترك الآخرين يتكيفون — أو لا."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-lg">3</span>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Speak Your Truth", "تكلم بحقيقتك")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        {getText("Break the Silence That Keeps Peace", "اكسر الصمت الذي يحافظ على السلام المزيف")}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {getText(
                          "Release the version of you that stays silent to keep the peace. Declare:",
                          "أطلق سراح النسخة منك التي تبقى صامتة للحفاظ على السلام. أعلن:"
                        )} <em>{getText("\"I desire to be a channel, and I will always speak from a place of care and love.\"", "\"أرغب في أن أكون قناة، وسأتحدث دائماً من مكان الرعاية والحب.")}</em>
                      </p>
                      <p className="text-slate-600">
                        {getText(
                          "Silence doesn't create peace—it creates distance. True peace comes from authentic expression. Your voice matters.",
                          "الصمت لا يخلق السلام — بل يخلق المسافة. السلام الحقيقي يأتي من التعبير الأصيل. صوتك مهم."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary font-bold text-lg">4</span>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Release False Burdens", "أطلق الأعباء الكاذبة")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        {getText("Stop Carrying What Isn't Yours", "توقف عن حمل ما ليس لك")}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {getText(
                          "Surrender to the part of you that takes blame for things that were never yours to carry. Declare:",
                          "استسلم للجزء منك الذي يتحمل اللوم عن أشياء لم تكن لك أبداً. أعلن:"
                        )} <em>{getText("\"I allow others to fall so they can experience their own process.\"", "\"أسمح للآخرين بالسقوط حتى يختبروا عمليتهم الخاصة.")}</em>
                      </p>
                      <p className="text-slate-600">
                        {getText(
                          "Rescuing others from their growth is not love. Your burden is yours alone—and others' burdens are theirs.",
                          "إنقاذ الآخرين من نموهم ليس حباً. عبؤك لك وحدك — وأعباء الآخرين لهم."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 5 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-lg">5</span>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Stand in Certainty", "قف باليقين")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        {getText("Own Your Infinite Light", "امتلك نورك اللامتناهي")}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {getText(
                          "Always maintain certainty in the light within you. The old version served its time. It was meant to be—but it's no longer who you are.",
                          "حافظ دائماً على اليقين في النور بداخلك. النسخة القديمة أدت دورها. كانت مقدرة لها — لكنها لم تعد أنت."
                        )}
                      </p>
                      <p className="text-slate-600">
                        {getText(
                          "You don't owe anyone your silence, your shrinking, or your suffering. You were not born to be an echo of anyone. You were born to reveal your infinite self—and the world will love you for it.",
                          "أنت لا تدين لأحد بصمتك، أو بتقلصك، أو بمعاناتك. لم تولد لتكون صدى لأحد. ولدت لتكشف ذاتك اللامتناهية — والعالم سيحبك لذلك."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Liberation Mantra", "مانترا التحرر")}
            </h2>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic text-lg">
                {getText(
                  "\"I have freed the roles I played for survival. I now rise as who I was born to be. Unapologetic, aligned, and knowing that I am whole from within.\"",
                  "\"لقد حررت الأدوار التي لعبتها من أجل البقاء. الآن أنهض كما ولدت لأكون. بلا اعتذار، متوافق، وعالم أني كامل من الداخل.\""
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This isn't affirmation. It's declaration. It's choosing to no longer be defined by what kept you safe but small. Each step is a shedding—of expectations, of fear, of false responsibilities.",
                "هذا ليس تأكيداً. إنه إعلان. إنه اختيار ألا تعود محدداً بما أبقاك آمناً لكن صغيراً. كل خطوة هي تجريد — من التوقعات، من الخوف، من المسؤوليات الكاذبة."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why \"Miracles\"?", "لماذا \"المعجزات\"؟")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you stop performing for approval, opportunities appear. When you stop dimming your light, the right people find you. When you speak your truth, the universe responds. These \"miracles\" aren't magic—they're the natural result of authenticity.",
                "عندما تتوقف عن التمثيل من أجل الموافقة، تظهر الفرص. عندما تتوقف عن إخفاء نورك، يجدك الأشخاص المناسبون. عندما تتكلم بحقيقتك، يستجيب الكون. هذه \"المعجزات\" ليست سحراً — إنها النتيجة الطبيعية للأصالة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The old version of you blocked these miracles by design. It was built for survival, not thriving. It protected you when you needed protection. But that season is over.",
                "النسخة القديمة منك حظرت هذه المعجزات عن قصد. بُنيت من أجل البقاء، لا الازدهار. حمتك عندما كنت بحاجة للحماية. لكن ذلك الموسم انتهى."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Practice of Liberation", "ممارسة التحرر")}</h3>
              <p className="text-slate-600 mb-4">{getText("Each morning, ask yourself:", "كل صباح، اسأل نفسك:")}</p>
              <ul className="space-y-2 text-slate-600">
                <li>{getText("• Where am I still seeking approval?", "• أين ما زلت أبحث عن الموافقة؟")}</li>
                <li>{getText("• Where am I dimming my light?", "• أين أخفت نوري؟")}</li>
                <li>{getText("• Where am I staying silent?", "• أين أبقى صامتاً؟")}</li>
                <li>{getText("• What am I carrying that isn't mine?", "• ماذا أحمل مما ليس لي؟")}</li>
                <li>{getText("• Am I standing in certainty or shrinking in doubt?", "• هل أقف باليقين أم أتقلص في الشك؟")}</li>
              </ul>
              <p className="text-slate-600 mt-4">
                {getText("Then make the declaration. Not as a wish—as a decision.", "ثم قم بالإعلان. ليس كأمنية — بل كقرار.")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Unlock className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة الأساسية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Miracles aren't about becoming someone new. They're about releasing everything that's not you. The you underneath is already miraculous. It's been waiting for permission to emerge.",
                "المعجزات ليست عن أن تصبح شخصاً جديداً. إنها عن إطلاق كل ما ليس أنت. أنت في الداخل معجز بالفعل. كان ينتظر الإذن ليظهر."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="five-steps-to-miracles" />

      {/* Related Articles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-primary mb-6">{getText("Related Articles", "مقالات ذات صلة")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
        <BlogConversionSection />
      </article>
  );
}

