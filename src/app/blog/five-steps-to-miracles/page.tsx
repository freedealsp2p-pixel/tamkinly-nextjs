'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Heart, Sun, Unlock, Shield } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "all-in-or-nothing", title: "All In or Nothing", readTime: "7 min read" },
  { slug: "work-on-yourself", title: "Work on Yourself: Psycho-Cybernetics", readTime: "10 min read" },
  { slug: "becoming-exceptional", title: "Becoming Exceptional", readTime: "8 min read" }
];

export default function FiveStepsToMiraclesArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Self-Liberation
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Five Steps to Miracles: A Framework for Identity Liberation
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                10 min read
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Tamkinly Team
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
              Miracles aren&apos;t supernatural events reserved for the chosen few. 
              They&apos;re the natural result of liberating yourself from the identity 
              you&apos;ve been performing for others.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Transformation begins with surrender—not surrender to defeat, but surrender 
              of the roles, masks, and limitations you&apos;ve been carrying. Here are five 
              steps to immediate transformation.
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
                      <Badge variant="secondary" className="mb-2">Surrender</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        Release the Version Seeking Approval
                      </h3>
                      <p className="text-slate-600 mb-3">
                        Surrender to the part of you that was seeking people&apos;s approval. 
                        Instead, declare: <em>&quot;I only want the approval of my Creator.&quot;</em>
                      </p>
                      <p className="text-slate-600">
                        This isn&apos;t about abandoning relationships or becoming self-centered. 
                        It&apos;s about recognizing that when you perform for approval, you&apos;re 
                        not being yourself—you&apos;re being what you think others want.
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
                      <Badge variant="secondary" className="mb-2">Own Your Light</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        Stop Dimming Yourself for Others&apos; Comfort
                      </h3>
                      <p className="text-slate-600 mb-3">
                        Surrender to the part of you that constantly dims your light so 
                        others don&apos;t feel insecure around you. Declare: <em>&quot;My power 
                        is endless, and I will be honest with myself, even if it makes 
                        others uncomfortable.&quot;</em>
                      </p>
                      <p className="text-slate-600">
                        Your light doesn&apos;t diminish anyone else&apos;s. Dimming yours serves 
                        no one. Shine fully and let others adjust—or not.
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
                      <Badge variant="secondary" className="mb-2">Speak Your Truth</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        Break the Silence That Keeps Peace
                      </h3>
                      <p className="text-slate-600 mb-3">
                        Release the version of you that stays silent to keep the peace. 
                        Declare: <em>&quot;I desire to be a channel, and I will always speak 
                        from a place of care and love.&quot;</em>
                      </p>
                      <p className="text-slate-600">
                        Silence doesn&apos;t create peace—it creates distance. True peace 
                        comes from authentic expression. Your voice matters.
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
                      <Badge variant="secondary" className="mb-2">Release False Burdens</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        Stop Carrying What Isn&apos;t Yours
                      </h3>
                      <p className="text-slate-600 mb-3">
                        Surrender to the part of you that takes blame for things that were 
                        never yours to carry. Declare: <em>&quot;I allow others to fall so they 
                        can experience their own process.&quot;</em>
                      </p>
                      <p className="text-slate-600">
                        Rescuing others from their growth is not love. Your burden is yours 
                        alone—and others&apos; burdens are theirs.
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
                      <Badge variant="secondary" className="mb-2">Stand in Certainty</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">
                        Own Your Infinite Light
                      </h3>
                      <p className="text-slate-600 mb-3">
                        Always maintain certainty in the light within you. The old version 
                        served its time. It was meant to be—but it&apos;s no longer who you are.
                      </p>
                      <p className="text-slate-600">
                        You don&apos;t owe anyone your silence, your shrinking, or your suffering. 
                        You were not born to be an echo of anyone. You were born to reveal 
                        your infinite self—and the world will love you for it.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Liberation Mantra
            </h2>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic text-lg">
                &quot;I have freed the roles I played for survival. I now rise as who I was 
                born to be. Unapologetic, aligned, and knowing that I am whole from within.&quot;
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t affirmation. It&apos;s declaration. It&apos;s choosing to no longer 
              be defined by what kept you safe but small. Each step is a shedding—of 
              expectations, of fear, of false responsibilities.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why &quot;Miracles&quot;?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you stop performing for approval, opportunities appear. When you stop 
              dimming your light, the right people find you. When you speak your truth, 
              the universe responds. These &quot;miracles&quot; aren&apos;t magic—they&apos;re the natural 
              result of authenticity.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The old version of you blocked these miracles by design. It was built 
              for survival, not thriving. It protected you when you needed protection. 
              But that season is over.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Practice of Liberation</h3>
              <p className="text-slate-600 mb-4">Each morning, ask yourself:</p>
              <ul className="space-y-2 text-slate-600">
                <li>• Where am I still seeking approval?</li>
                <li>• Where am I dimming my light?</li>
                <li>• Where am I staying silent?</li>
                <li>• What am I carrying that isn&apos;t mine?</li>
                <li>• Am I standing in certainty or shrinking in doubt?</li>
              </ul>
              <p className="text-slate-600 mt-4">
                Then make the declaration. Not as a wish—as a decision.
              </p>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Unlock className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Miracles aren&apos;t about becoming someone new. They&apos;re about releasing 
              everything that&apos;s not you. The you underneath is already miraculous. 
              It&apos;s been waiting for permission to emerge.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="five-steps-to-miracles" />

      {/* Related Articles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-primary mb-6">Related Articles</h3>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Liberate Your True Identity
            </h2>
            <p className="text-slate-300 mb-6">
              Get the tools to shed what&apos;s not you and become who you were born to be.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
